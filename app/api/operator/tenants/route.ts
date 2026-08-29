import { getD1, getRuntimeEnv } from '@/db';
import { requireOperatorAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { createId, createOpaqueToken, hashOpaqueToken } from '@/lib/server/ids';
import { normaliseAustralianMobile } from '@/lib/server/phone';

export const dynamic = 'force-dynamic';

type PriceInput = { name: string; unit: string; rateExGstCents: number };

function textValue(value: unknown, max = 180) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function stringArray(value: unknown, maxItems = 40) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim().slice(0, 80)).filter(Boolean).slice(0, maxItems);
}

function priceArray(value: unknown): PriceInput[] {
  if (!Array.isArray(value)) return [];
  const prices: PriceInput[] = [];
  for (const entry of value.slice(0, 100)) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
    const item = entry as Record<string, unknown>;
    if (typeof item.name !== 'string' || typeof item.unit !== 'string' || typeof item.rateExGstCents !== 'number') continue;
    if (!Number.isFinite(item.rateExGstCents) || item.rateExGstCents < 0) continue;
    prices.push({ name: item.name.trim().slice(0, 140), unit: item.unit.trim().slice(0, 30), rateExGstCents: Math.round(item.rateExGstCents) });
  }
  return prices;
}

export async function POST(request: Request) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request, 96_000); } catch { return problem(400, 'invalid_request', 'The tenant details could not be read.'); }

  const businessName = textValue(body.businessName);
  const ownerName = textValue(body.ownerName);
  const ownerPhone = normaliseAustralianMobile(body.ownerPhone);
  const trade = textValue(body.trade, 80);
  const suburbs = stringArray(body.serviceSuburbs);
  if (!businessName || !ownerName || !ownerPhone || !trade || suburbs.length === 0) {
    return problem(400, 'missing_required_details', 'Business, owner, a valid Australian mobile, trade and service suburbs are required.');
  }

  const tenantId = createId('ten');
  const userId = createId('usr');
  const now = new Date().toISOString();
  const rawToken = createOpaqueToken();
  const tokenHash = await hashOpaqueToken(rawToken, getRuntimeEnv().TOKEN_PEPPER ?? '');
  const expiresAt = new Date(Date.now() + 90 * 86_400_000).toISOString();
  const prices = priceArray(body.priceItems);
  const db = getD1();
  const statements: D1PreparedStatement[] = [
    db.prepare('INSERT INTO tenants (id, business_name, owner_name, trade, abn, licence_no, gst_registered, service_suburbs, forwarding_from_number, voice_number, sms_number, plan, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(tenantId, businessName, ownerName, trade, textValue(body.abn, 30) || null, textValue(body.licenceNo, 60) || null, body.gstRegistered === true ? 1 : 0, JSON.stringify(suburbs), textValue(body.forwardingFromNumber, 30) || null, textValue(body.voiceNumber, 30) || null, textValue(body.smsNumber, 30) || null, textValue(body.plan, 30) || 'founding', 'pilot', now, now),
    db.prepare('INSERT INTO tenant_users (id, tenant_id, name, phone_e164, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(userId, tenantId, ownerName, ownerPhone, 'owner', 'active', now, now),
    db.prepare('INSERT INTO tenant_settings (tenant_id, greeting_name, categories, urgency_keywords, quiet_hours, call_rules, notification_phone, weekly_report_day, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(tenantId, ownerName, JSON.stringify(stringArray(body.categories).length ? stringArray(body.categories) : [trade]), JSON.stringify(stringArray(body.urgencyKeywords).length ? stringArray(body.urgencyKeywords) : ['gas leak', 'live wire', 'flooding', 'no power']), JSON.stringify({ start: '17:00', end: '07:00' }), JSON.stringify({ answerWhen: 'missed_or_after_hours', askOneQuestionAtATime: true, discloseAi: true, discloseRecording: true, neverQuoteByPhone: true, maxMinutes: 6, handoffAfterFailedClarifications: 2 }), ownerPhone, 0, now, now),
    db.prepare('INSERT INTO magic_tokens (id, tenant_id, token_hash, scope, resource_id, actor_type, actor_id, expires_at, used_at, revoked_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('tok'), tenantId, tokenHash, 'tradie_workspace', null, 'tenant_user', userId, expiresAt, null, null, now),
    db.prepare('INSERT INTO events (id, tenant_id, actor_type, actor_id, type, resource_type, resource_id, payload, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('evt'), tenantId, 'operator', access.actorId, 'tenant.created', 'tenant', tenantId, JSON.stringify({ businessName, trade }), now),
  ];
  for (const price of prices) {
    statements.push(db.prepare('INSERT INTO price_items (id, tenant_id, name, unit, rate_ex_gst_cents, notes, active, verified_by, verified_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(createId('pri'), tenantId, price.name, price.unit, price.rateExGstCents, null, 1, access.actorId, now, now, now));
  }
  await db.batch(statements);
  const origin = getRuntimeEnv().APP_ORIGIN ?? new URL(request.url).origin;
  return json({ ok: true, tenant: { id: tenantId, businessName, ownerName, trade }, workspaceUrl: `${origin.replace(/\/$/u, '')}/app?token=${encodeURIComponent(rawToken)}`, tokenExpiresAt: expiresAt }, { status: 201 });
}
