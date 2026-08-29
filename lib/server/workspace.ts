import { and, asc, desc, eq, inArray, isNull, or } from 'drizzle-orm';
import { getD1, getDb, getRuntimeEnv } from '@/db';
import {
  customers,
  calls,
  events,
  followUps,
  jobPhotos,
  jobs,
  priceItems,
  quoteLineItems,
  quotes,
  tenantSettings,
  tenantUsers,
  tenants,
} from '@/db/schema';
import { sendSms } from '@/lib/providers/sms';
import { createId, createOpaqueToken, hashOpaqueToken } from './ids';

export async function getWorkspace(tenantId: string, resourceId?: string | null) {
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.id, tenantId) });
  if (!tenant) return null;

  const settings = await getDb().query.tenantSettings.findFirst({ where: eq(tenantSettings.tenantId, tenantId) });
  const user = await getDb().query.tenantUsers.findFirst({
    where: and(eq(tenantUsers.tenantId, tenantId), eq(tenantUsers.status, 'active')),
  });
  const jobRows = await getDb()
    .select({ job: jobs, customer: customers })
    .from(jobs)
    .innerJoin(customers, eq(customers.id, jobs.customerId))
    .where(resourceId ? and(eq(jobs.tenantId, tenantId), eq(jobs.id, resourceId)) : eq(jobs.tenantId, tenantId))
    .orderBy(desc(jobs.createdAt));

  const jobIds = jobRows.map(({ job }) => job.id);
  const quoteRows = jobIds.length
    ? await getDb().select().from(quotes).where(and(eq(quotes.tenantId, tenantId), inArray(quotes.jobId, jobIds))).orderBy(desc(quotes.version))
    : [];
  const photoRows = jobIds.length
    ? await getDb().select().from(jobPhotos).where(and(eq(jobPhotos.tenantId, tenantId), inArray(jobPhotos.jobId, jobIds))).orderBy(desc(jobPhotos.createdAt))
    : [];
  const latestQuoteByJob = new Map<string, typeof quoteRows[number]>();
  for (const quote of quoteRows) if (!latestQuoteByJob.has(quote.jobId)) latestQuoteByJob.set(quote.jobId, quote);
  const photosByJob = new Map<string, typeof photoRows>();
  for (const photo of photoRows) photosByJob.set(photo.jobId, [...(photosByJob.get(photo.jobId) ?? []), photo]);

  return {
    tenant,
    settings,
    user,
    jobs: jobRows.map(({ job, customer }) => ({ ...job, customer, quote: latestQuoteByJob.get(job.id) ?? null, photos: (photosByJob.get(job.id) ?? []).map((photo) => ({ id: photo.id, contentType: photo.contentType, sizeBytes: photo.sizeBytes, caption: photo.caption, createdAt: photo.createdAt, url: `/api/app/jobs/${job.id}/photos/${photo.id}` })) })),
  };
}

export async function getQuoteBundle(tenantId: string, quoteId: string) {
  const row = await getDb()
    .select({ quote: quotes, job: jobs, customer: customers, tenant: tenants })
    .from(quotes)
    .innerJoin(jobs, eq(jobs.id, quotes.jobId))
    .innerJoin(customers, eq(customers.id, jobs.customerId))
    .innerJoin(tenants, eq(tenants.id, quotes.tenantId))
    .where(and(eq(quotes.tenantId, tenantId), eq(quotes.id, quoteId)))
    .get();
  if (!row) return null;
  const items = await getDb().select().from(quoteLineItems).where(eq(quoteLineItems.quoteId, quoteId)).orderBy(asc(quoteLineItems.position));
  return { ...row, items };
}

export async function createDraftQuote(input: { tenantId: string; jobId: string; actorId: string }) {
  const existing = await getDb().query.quotes.findFirst({
    where: and(eq(quotes.tenantId, input.tenantId), eq(quotes.jobId, input.jobId), or(eq(quotes.status, 'draft'), eq(quotes.status, 'awaiting_approval'))),
    orderBy: desc(quotes.version),
  });
  if (existing) return getQuoteBundle(input.tenantId, existing.id);

  const job = await getDb().query.jobs.findFirst({ where: and(eq(jobs.tenantId, input.tenantId), eq(jobs.id, input.jobId)) });
  if (!job) return null;
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.id, input.tenantId) });
  if (!tenant) return null;

  const prices = await getDb().select().from(priceItems).where(and(eq(priceItems.tenantId, input.tenantId), eq(priceItems.active, true))).orderBy(asc(priceItems.name));
  const searchable = `${job.title} ${job.description}`.toLowerCase();
  const callout = prices.find((price) => /call.?out|assessment/u.test(price.name.toLowerCase()));
  const matched = prices.filter((price) => {
    if (price.id === callout?.id) return false;
    return price.name.toLowerCase().split(/\s+/u).some((word) => word.length > 4 && searchable.includes(word));
  }).slice(0, 2);
  const chosen = [...(callout ? [callout] : []), ...matched];
  const quoteId = createId('quo');
  const now = new Date().toISOString();
  const validUntil = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);
  const lineValues = chosen.length
    ? chosen.map((price, position) => ({
        id: createId('qli'), tenantId: input.tenantId, quoteId, priceItemId: price.id, description: price.name,
        quantityMilli: 1000, unit: price.unit, unitRateExGstCents: price.rateExGstCents,
        lineTotalExGstCents: price.rateExGstCents, needsInput: false, source: 'price_list', position, createdAt: now, updatedAt: now,
      }))
    : [{
        id: createId('qli'), tenantId: input.tenantId, quoteId, priceItemId: null, description: job.title,
        quantityMilli: 1000, unit: 'job', unitRateExGstCents: null, lineTotalExGstCents: null,
        needsInput: true, source: 'ai_suggested', position: 0, createdAt: now, updatedAt: now,
      }];
  const subtotal = lineValues.reduce((sum, item) => sum + (item.lineTotalExGstCents ?? 0), 0);
  const gst = tenant.gstRegistered ? Math.round(subtotal * 0.1) : 0;

  await getDb().insert(quotes).values({
    id: quoteId,
    tenantId: input.tenantId,
    jobId: input.jobId,
    version: 1,
    status: 'draft',
    subtotalExGstCents: subtotal,
    gstCents: gst,
    totalCents: subtotal + gst,
    customerNote: null,
    validUntil,
    approvalAcknowledged: false,
    approvedBy: null,
    approvedAt: null,
    sentAt: null,
    viewedAt: null,
    acceptedAt: null,
    changeRequestedAt: null,
    changeRequest: null,
    disclaimerVersion: 'pilot-v1',
    publicTokenHash: null,
    createdAt: now,
    updatedAt: now,
  });
  await getDb().insert(quoteLineItems).values(lineValues);
  await getDb().insert(events).values({
    id: createId('evt'), tenantId: input.tenantId, actorType: 'tenant_user', actorId: input.actorId,
    type: 'quote.draft_created', resourceType: 'quote', resourceId: quoteId, payload: { jobId: input.jobId }, createdAt: now,
  });
  await getDb().insert(followUps).values([
    { id: createId('fup'), tenantId: input.tenantId, jobId: input.jobId, quoteId, kind: 'tradie_draft_reminder', dueAt: new Date(Date.now() + 4 * 60 * 60_000).toISOString(), status: 'scheduled', attemptCount: 0, lastError: null, completedAt: null, createdAt: now, updatedAt: now },
    { id: createId('fup'), tenantId: input.tenantId, jobId: input.jobId, quoteId, kind: 'tradie_draft_reminder', dueAt: new Date(Date.now() + 24 * 60 * 60_000).toISOString(), status: 'scheduled', attemptCount: 0, lastError: null, completedAt: null, createdAt: now, updatedAt: now },
  ]);
  await getDb().update(jobs).set({ status: 'draft_quote', updatedAt: now }).where(and(eq(jobs.id, input.jobId), eq(jobs.tenantId, input.tenantId)));
  return getQuoteBundle(input.tenantId, quoteId);
}

type EditableLine = { id?: string; priceItemId?: string; description: string; quantityMilli: number; unit: string; unitRateExGstCents: number | null };

export async function saveDraftQuote(input: { tenantId: string; quoteId: string; actorId: string; note: string; lines: EditableLine[] }) {
  const quote = await getDb().query.quotes.findFirst({ where: and(eq(quotes.tenantId, input.tenantId), eq(quotes.id, input.quoteId)) });
  if (!quote || !['draft', 'awaiting_approval', 'change_requested'].includes(quote.status)) return null;
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.id, input.tenantId) });
  if (!tenant) return null;
  const now = new Date().toISOString();
  const lines = input.lines.slice(0, 30).map((line, position) => {
    const quantityMilli = Math.max(1, Math.round(line.quantityMilli));
    const rate = line.unitRateExGstCents === null ? null : Math.max(0, Math.round(line.unitRateExGstCents));
    const total = rate === null ? null : Math.round((rate * quantityMilli) / 1000);
    return {
      id: line.id ?? createId('qli'), tenantId: input.tenantId, quoteId: input.quoteId, priceItemId: line.priceItemId ?? null,
      description: line.description.trim().slice(0, 180), quantityMilli, unit: line.unit.slice(0, 30),
      unitRateExGstCents: rate, lineTotalExGstCents: total, needsInput: rate === null,
      source: line.priceItemId ? 'price_list' : 'manual', position, createdAt: now, updatedAt: now,
    };
  });
  const subtotal = lines.reduce((sum, line) => sum + (line.lineTotalExGstCents ?? 0), 0);
  const gst = tenant.gstRegistered ? Math.round(subtotal * 0.1) : 0;
  const db = getD1();
  const statements: D1PreparedStatement[] = [
    db.prepare('DELETE FROM quote_line_items WHERE quote_id = ? AND tenant_id = ?').bind(input.quoteId, input.tenantId),
    db.prepare('UPDATE quotes SET customer_note = ?, subtotal_ex_gst_cents = ?, gst_cents = ?, total_cents = ?, status = ?, approval_acknowledged = 0, change_request = NULL, change_requested_at = NULL, updated_at = ? WHERE id = ? AND tenant_id = ?')
      .bind(input.note.slice(0, 1000), subtotal, gst, subtotal + gst, 'awaiting_approval', now, input.quoteId, input.tenantId),
  ];
  for (const line of lines) {
    statements.push(db.prepare('INSERT INTO quote_line_items (id, tenant_id, quote_id, price_item_id, description, quantity_milli, unit, unit_rate_ex_gst_cents, line_total_ex_gst_cents, needs_input, source, position, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(line.id, line.tenantId, line.quoteId, line.priceItemId, line.description, line.quantityMilli, line.unit, line.unitRateExGstCents, line.lineTotalExGstCents, line.needsInput ? 1 : 0, line.source, line.position, line.createdAt, line.updatedAt));
  }
  statements.push(db.prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(createId('evt'), input.tenantId, 'tenant_user', input.actorId, 'quote.draft_updated', 'quote', input.quoteId, JSON.stringify({ lineCount: lines.length, savedProductIds: lines.flatMap((line) => line.priceItemId ? [line.priceItemId] : []) }), now));
  await db.batch(statements);
  return getQuoteBundle(input.tenantId, input.quoteId);
}

export async function approveAndSendQuote(input: { tenantId: string; quoteId: string; actorId: string; acknowledged: boolean; appOrigin: string }) {
  if (!input.acknowledged) throw new Error('APPROVAL_REQUIRED');
  const bundle = await getQuoteBundle(input.tenantId, input.quoteId);
  if (!bundle || !['draft', 'awaiting_approval'].includes(bundle.quote.status)) return null;
  if (bundle.items.length === 0 || bundle.items.some((item) => item.needsInput || item.unitRateExGstCents === null)) throw new Error('QUOTE_HAS_UNPRICED_ITEMS');

  const subtotal = bundle.items.reduce((sum, item) => sum + Math.round(((item.unitRateExGstCents ?? 0) * item.quantityMilli) / 1000), 0);
  const gst = bundle.tenant.gstRegistered ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + gst;
  if (total <= 0) throw new Error('QUOTE_TOTAL_INVALID');
  if (total > 330_000 && !bundle.tenant.licenceNo) throw new Error('QBCC_LICENCE_ACK_REQUIRED');

  const publicToken = createOpaqueToken();
  const tokenHash = await hashOpaqueToken(publicToken, getRuntimeEnv().TOKEN_PEPPER ?? '');
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 21 * 86_400_000).toISOString();
  const db = getD1();
  await db.batch([
    db.prepare("UPDATE quotes SET status = 'sent', subtotal_ex_gst_cents = ?, gst_cents = ?, total_cents = ?, approval_acknowledged = 1, approved_by = ?, approved_at = ?, sent_at = ?, public_token_hash = ?, updated_at = ? WHERE id = ? AND tenant_id = ? AND status IN ('draft','awaiting_approval')")
      .bind(subtotal, gst, total, input.actorId, now, now, tokenHash, now, input.quoteId, input.tenantId),
    db.prepare("UPDATE jobs SET status = 'quoted', updated_at = ? WHERE id = ? AND tenant_id = ?").bind(now, bundle.job.id, input.tenantId),
    db.prepare('INSERT INTO magic_tokens (id, tenant_id, token_hash, scope, resource_id, actor_type, actor_id, expires_at, used_at, revoked_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('tok'), input.tenantId, tokenHash, 'review_quote', input.quoteId, 'customer', bundle.customer.id, expiresAt, null, null, now),
    db.prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('evt'), input.tenantId, 'tenant_user', input.actorId, 'quote.approved', 'quote', input.quoteId, JSON.stringify({ totalCents: total }), now),
    db.prepare('INSERT INTO follow_ups (id, tenant_id, job_id, quote_id, kind, due_at, status, attempt_count, last_error, completed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('fup'), input.tenantId, bundle.job.id, input.quoteId, 'customer_quote_followup', new Date(Date.now() + 24 * 60 * 60_000).toISOString(), 'scheduled', 0, null, null, now, now),
    db.prepare("UPDATE follow_ups SET status = 'cancelled', completed_at = ?, updated_at = ? WHERE quote_id = ? AND tenant_id = ? AND kind = 'tradie_draft_reminder' AND status = 'scheduled'")
      .bind(now, now, input.quoteId, input.tenantId),
  ]);

  const quoteUrl = `${input.appOrigin.replace(/\/$/u, '')}/customer/quote?token=${encodeURIComponent(publicToken)}`;
  await sendSms({
    tenantId: input.tenantId,
    to: bundle.customer.phoneE164,
    from: bundle.tenant.smsNumber,
    body: `${bundle.tenant.businessName}: your estimate for ${bundle.job.title} is ready. Review it here: ${quoteUrl} Reply STOP to opt out.`,
    jobId: bundle.job.id,
    quoteId: input.quoteId,
  });

  return { bundle: await getQuoteBundle(input.tenantId, input.quoteId), quoteUrl };
}

export async function acceptCustomerQuote(input: { tenantId: string; quoteId: string; customerId: string }) {
  const bundle = await getQuoteBundle(input.tenantId, input.quoteId);
  if (!bundle || bundle.customer.id !== input.customerId || !['sent', 'viewed'].includes(bundle.quote.status)) return null;
  const now = new Date().toISOString();
  const db = getD1();
  await db.batch([
    db.prepare("UPDATE quotes SET status = 'accepted', accepted_at = ?, updated_at = ? WHERE id = ? AND tenant_id = ? AND status IN ('sent','viewed')").bind(now, now, input.quoteId, input.tenantId),
    db.prepare("UPDATE jobs SET status = 'accepted', updated_at = ? WHERE id = ? AND tenant_id = ?").bind(now, bundle.job.id, input.tenantId),
    db.prepare('UPDATE follow_ups SET status = ?, completed_at = ?, updated_at = ? WHERE quote_id = ? AND tenant_id = ? AND status = ?').bind('cancelled', now, now, input.quoteId, input.tenantId, 'scheduled'),
    db.prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('evt'), input.tenantId, 'customer', input.customerId, 'quote.accepted', 'quote', input.quoteId, JSON.stringify({ totalCents: bundle.quote.totalCents }), now),
  ]);
  const owner = await getDb().query.tenantUsers.findFirst({ where: and(eq(tenantUsers.tenantId, input.tenantId), eq(tenantUsers.role, 'owner')) });
  if (owner) await sendSms({ tenantId: input.tenantId, to: owner.phoneE164, from: bundle.tenant.smsNumber, body: `ACCEPTED: ${bundle.customer.name ?? 'Customer'} accepted ${bundle.job.title} for $${(bundle.quote.totalCents / 100).toFixed(2)}. Open TradieRelay to arrange a time.`, jobId: bundle.job.id, quoteId: input.quoteId });
  return getQuoteBundle(input.tenantId, input.quoteId);
}

export async function requestQuoteChange(input: { tenantId: string; quoteId: string; customerId: string; note: string }) {
  const bundle = await getQuoteBundle(input.tenantId, input.quoteId);
  if (!bundle || bundle.customer.id !== input.customerId || !['sent', 'viewed'].includes(bundle.quote.status)) return null;
  const now = new Date().toISOString();
  await getD1().batch([
    getD1().prepare("UPDATE quotes SET status = 'change_requested', change_request = ?, change_requested_at = ?, updated_at = ? WHERE id = ? AND tenant_id = ?").bind(input.note.slice(0, 1000), now, now, input.quoteId, input.tenantId),
    getD1().prepare("UPDATE follow_ups SET status = 'cancelled', completed_at = ?, updated_at = ? WHERE quote_id = ? AND tenant_id = ? AND status = 'scheduled'").bind(now, now, input.quoteId, input.tenantId),
    getD1().prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(createId('evt'), input.tenantId, 'customer', input.customerId, 'quote.change_requested', 'quote', input.quoteId, JSON.stringify({ note: input.note.slice(0, 1000) }), now),
  ]);
  const owner = await getDb().query.tenantUsers.findFirst({ where: and(eq(tenantUsers.tenantId, input.tenantId), eq(tenantUsers.role, 'owner')) });
  if (owner) await sendSms({ tenantId: input.tenantId, to: owner.phoneE164, from: bundle.tenant.smsNumber, body: `CHANGE REQUESTED: ${bundle.customer.name ?? 'Customer'} left a note on the quote for ${bundle.job.title}. Open TradieRelay to review it.`, jobId: bundle.job.id, quoteId: input.quoteId });
  return getQuoteBundle(input.tenantId, input.quoteId);
}

export async function listOperatorOverview() {
  const [tenantRows, callRows, jobRows, quoteRows, eventRows] = await Promise.all([
    getDb().select().from(tenants).orderBy(asc(tenants.businessName)),
    getDb().select({ call: calls, tenant: tenants, customer: customers }).from(calls).innerJoin(tenants, eq(tenants.id, calls.tenantId)).leftJoin(customers, eq(customers.id, calls.customerId)).orderBy(desc(calls.startedAt)).limit(80),
    getDb().select({ job: jobs, customer: customers, tenant: tenants }).from(jobs).innerJoin(customers, eq(customers.id, jobs.customerId)).innerJoin(tenants, eq(tenants.id, jobs.tenantId)).where(isNull(jobs.closedAt)).orderBy(desc(jobs.createdAt)).limit(80),
    getDb().select({ quote: quotes, tenant: tenants }).from(quotes).innerJoin(tenants, eq(tenants.id, quotes.tenantId)).orderBy(desc(quotes.updatedAt)).limit(80),
    getDb().select().from(events).orderBy(desc(events.createdAt)).limit(80),
  ]);
  return { tenants: tenantRows, calls: callRows, jobs: jobRows, quotes: quoteRows, events: eventRows };
}
