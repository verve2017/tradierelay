import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { priceItems, tenantSettings, tenantUsers, tenants } from '@/db/schema';
import { requireOperatorAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  const { id } = await context.params;
  const [tenant, settings, prices, users] = await Promise.all([
    getDb().query.tenants.findFirst({ where: eq(tenants.id, id) }),
    getDb().query.tenantSettings.findFirst({ where: eq(tenantSettings.tenantId, id) }),
    getDb().select().from(priceItems).where(eq(priceItems.tenantId, id)),
    getDb().select().from(tenantUsers).where(eq(tenantUsers.tenantId, id)),
  ]);
  if (!tenant || !settings) return problem(404, 'tenant_not_found', 'The tenant could not be found.');
  return json({ ok: true, tenant, settings, prices, users });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  const { id } = await context.params;
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request, 64_000); } catch { return problem(400, 'invalid_request', 'The settings could not be read.'); }
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.id, id) });
  const settings = await getDb().query.tenantSettings.findFirst({ where: eq(tenantSettings.tenantId, id) });
  if (!tenant || !settings) return problem(404, 'tenant_not_found', 'The tenant could not be found.');
  const now = new Date().toISOString();
  const businessName = typeof body.businessName === 'string' ? body.businessName.trim().slice(0, 180) : tenant.businessName;
  const serviceSuburbs = Array.isArray(body.serviceSuburbs) ? body.serviceSuburbs.filter((value): value is string => typeof value === 'string').map((value) => value.trim().slice(0, 80)).filter(Boolean).slice(0, 40) : tenant.serviceSuburbs;
  const callRules = body.callRules && typeof body.callRules === 'object' && !Array.isArray(body.callRules) ? body.callRules as Record<string, unknown> : settings.callRules;
  const greetingName = typeof body.greetingName === 'string' && body.greetingName.trim() ? body.greetingName.trim().slice(0, 120) : settings.greetingName;
  const notificationPhone = typeof body.notificationPhone === 'string' && body.notificationPhone.trim() ? body.notificationPhone.trim().slice(0, 30) : settings.notificationPhone;
  await getDb().update(tenants).set({ businessName, serviceSuburbs, updatedAt: now }).where(eq(tenants.id, id));
  await getDb().update(tenantSettings).set({ callRules, greetingName, notificationPhone, updatedAt: now }).where(and(eq(tenantSettings.tenantId, id)));
  await audit({ tenantId: id, actorType: 'operator', actorId: access.actorId, type: 'tenant.settings_updated', resourceType: 'tenant', resourceId: id, payload: { businessName, serviceSuburbs, callRules, greetingName, notificationPhone } });
  return json({ ok: true, tenant: { ...tenant, businessName, serviceSuburbs, updatedAt: now }, settings: { ...settings, callRules, greetingName, notificationPhone, updatedAt: now } });
}
