import { and, eq } from 'drizzle-orm';
import { getD1, getDb, getRuntimeEnv } from '@/db';
import { customers, events, tenantSettings, tenantUsers, tenants, webhookEvents } from '@/db/schema';
import { extractJobRecord } from '@/lib/providers/ai';
import { sendSms } from '@/lib/providers/sms';
import { createId, createOpaqueToken, hashOpaqueToken } from './ids';
import { resolveNotificationRoutes } from './routing';

export type CompletedCallInput = {
  provider: string;
  providerEventId: string;
  providerCallId: string;
  tenantId?: string | null;
  toNumber?: string | null;
  fromNumber?: string | null;
  callerName?: string | null;
  transcript: string;
  recordingUrl?: string | null;
  durationSeconds?: number | null;
  outcome?: string | null;
  costCents?: number | null;
};

export async function ingestCompletedCall(input: CompletedCallInput, appOrigin: string) {
  const alreadyProcessed = await getDb().query.webhookEvents.findFirst({
    where: and(eq(webhookEvents.provider, input.provider), eq(webhookEvents.providerEventId, input.providerEventId)),
  });
  if (alreadyProcessed?.status === 'processed') return { duplicate: true, jobId: (alreadyProcessed.payload.jobId as string | undefined) ?? null };

  const tenant = input.tenantId
    ? await getDb().query.tenants.findFirst({ where: eq(tenants.id, input.tenantId) })
    : input.toNumber
      ? await getDb().query.tenants.findFirst({ where: eq(tenants.voiceNumber, input.toNumber) })
      : null;
  if (!tenant) throw new Error('TENANT_NOT_FOUND');

  const now = new Date().toISOString();
  const extraction = await extractJobRecord(input.transcript, input.fromNumber);
  const phone = extraction.phone_e164 ?? input.fromNumber ?? 'unknown';
  const existingCustomer = phone === 'unknown' ? null : await getDb().query.customers.findFirst({ where: and(eq(customers.tenantId, tenant.id), eq(customers.phoneE164, phone)) });
  const customerId = existingCustomer?.id ?? createId('cus');
  const callId = createId('cal');
  const jobId = createId('job');
  const owner = await getDb().query.tenantUsers.findFirst({ where: and(eq(tenantUsers.tenantId, tenant.id), eq(tenantUsers.role, 'owner')) });
  const settings = await getDb().query.tenantSettings.findFirst({ where: eq(tenantSettings.tenantId, tenant.id) });
  const tradieToken = createOpaqueToken();
  const customerToken = phone === 'unknown' ? null : createOpaqueToken();
  const pepper = getRuntimeEnv().TOKEN_PEPPER ?? '';
  const tradieHash = await hashOpaqueToken(tradieToken, pepper);
  const customerHash = customerToken ? await hashOpaqueToken(customerToken, pepper) : null;
  const jobSummary = extraction.summary || input.transcript.slice(0, 220);
  const confidenceAverage = Math.round(((extraction.confidence.caller_name + extraction.confidence.job + extraction.confidence.suburb + extraction.confidence.urgency) / 4) * 100);
  const db = getD1();
  const statements: D1PreparedStatement[] = [];

  if (!existingCustomer) {
    statements.push(db.prepare('INSERT INTO customers (id, tenant_id, phone_e164, name, address, suburb, notes, sms_opted_out_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(customerId, tenant.id, phone, extraction.caller_name ?? input.callerName ?? null, extraction.address, extraction.suburb, null, null, now, now));
  } else {
    statements.push(db.prepare('UPDATE customers SET name = COALESCE(?, name), address = COALESCE(?, address), suburb = COALESCE(?, suburb), updated_at = ? WHERE id = ? AND tenant_id = ?')
      .bind(extraction.caller_name ?? input.callerName ?? null, extraction.address, extraction.suburb, now, customerId, tenant.id));
  }
  statements.push(
    db.prepare('INSERT INTO calls (id, tenant_id, customer_id, provider, provider_call_id, started_at, ended_at, duration_seconds, outcome, recording_url, transcript, extraction, confidence, cost_cents, needs_human_review, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(callId, tenant.id, customerId, input.provider, input.providerCallId, new Date(Date.now() - (input.durationSeconds ?? 0) * 1000).toISOString(), now, input.durationSeconds ?? null, input.outcome ?? 'completed', input.recordingUrl ?? null, input.transcript, JSON.stringify(extraction), confidenceAverage, input.costCents ?? 0, extraction.needs_human_review ? 1 : 0, now, now),
    db.prepare('INSERT INTO jobs (id, tenant_id, customer_id, source_call_id, status, trade_category, title, description, summary, urgency, suburb, address, access_notes, preferred_windows, field_confidence, acknowledged_at, closed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(jobId, tenant.id, customerId, callId, 'new', extraction.trade_category, extraction.title, extraction.description, jobSummary, extraction.urgency, extraction.suburb, extraction.address, extraction.access_notes, JSON.stringify(extraction.preferred_windows), JSON.stringify(extraction.confidence), null, null, now, now),
    db.prepare('INSERT INTO magic_tokens (id, tenant_id, token_hash, scope, resource_id, actor_type, actor_id, expires_at, used_at, revoked_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('tok'), tenant.id, tradieHash, 'view_job', jobId, 'tenant_user', owner?.id ?? null, new Date(Date.now() + 7 * 86_400_000).toISOString(), null, null, now),
    db.prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('evt'), tenant.id, 'voice_provider', input.providerCallId, 'call.completed', 'call', callId, JSON.stringify({ jobId, outcome: input.outcome ?? 'completed', confidence: confidenceAverage }), now),
    db.prepare('INSERT INTO webhook_events (id, provider, provider_event_id, event_type, payload, status, error, processed_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(provider, provider_event_id) DO UPDATE SET payload = excluded.payload, status = excluded.status, error = excluded.error, processed_at = excluded.processed_at')
      .bind(createId('whk'), input.provider, input.providerEventId, 'call.completed', JSON.stringify({ ...input, jobId, callId }), 'processed', null, now, now),
  );
  if (customerHash) {
    statements.push(db.prepare('INSERT INTO magic_tokens (id, tenant_id, token_hash, scope, resource_id, actor_type, actor_id, expires_at, used_at, revoked_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('tok'), tenant.id, customerHash, 'upload_photos', jobId, 'customer', customerId, new Date(Date.now() + 48 * 60 * 60_000).toISOString(), null, null, now));
  }
  await db.batch(statements);

  const base = appOrigin.replace(/\/$/u, '');
  if (owner) {
    const prefix = extraction.urgency === 'emergency' || extraction.urgency === 'urgent' ? 'URGENT — ' : '';
    const alertBody = `${prefix}${extraction.caller_name ?? phone}: ${extraction.title}, ${extraction.suburb ?? 'suburb not confirmed'}. ${jobSummary.slice(0, 160)} ${base}/app?token=${encodeURIComponent(tradieToken)}`;
    const primaryRoute = resolveNotificationRoutes({ ownerPhone: owner.phoneE164, notificationPhone: settings?.notificationPhone, callRules: settings?.callRules, urgency: extraction.urgency })[0];
    let primaryFailed = false;
    if (primaryRoute) {
      try { await sendSms({ tenantId: tenant.id, to: primaryRoute.phone, from: tenant.smsNumber, body: alertBody, jobId }); }
      catch { primaryFailed = true; }
    }
    const routes = resolveNotificationRoutes({ ownerPhone: owner.phoneE164, notificationPhone: settings?.notificationPhone, callRules: settings?.callRules, urgency: extraction.urgency, primaryDeliveryFailed: primaryFailed }).slice(1);
    for (const route of routes) {
      try { await sendSms({ tenantId: tenant.id, to: route.phone, from: tenant.smsNumber, body: `${route.reason === 'delivery_fallback' ? 'PRIMARY ALERT FAILED — ' : ''}${alertBody}`, jobId }); }
      catch { /* Delivery failures remain visible in the message log and operator console. */ }
    }
    if (primaryFailed) {
      await getDb().insert(events).values({ id: createId('evt'), tenantId: tenant.id, actorType: 'system', actorId: null, type: 'notification.primary_failed', resourceType: 'job', resourceId: jobId, payload: { fallbackAttempted: routes.length > 0 }, createdAt: new Date().toISOString() });
    }
  }
  if (customerToken && phone !== 'unknown') {
    try { await sendSms({ tenantId: tenant.id, to: phone, from: tenant.smsNumber, body: `${tenant.businessName}: add photos for ${extraction.title} here: ${base}/customer/photos?token=${encodeURIComponent(customerToken)} Reply STOP to opt out.`, jobId }); }
    catch { await getDb().insert(events).values({ id: createId('evt'), tenantId: tenant.id, actorType: 'system', actorId: null, type: 'customer.photo_link_delivery_failed', resourceType: 'job', resourceId: jobId, payload: {}, createdAt: new Date().toISOString() }); }
  }
  return { duplicate: false, tenantId: tenant.id, callId, jobId, confidence: confidenceAverage, needsHumanReview: extraction.needs_human_review };
}
