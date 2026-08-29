import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { priceItems } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace']);
  if (!access) return problem(401, 'account_access_required', 'Open your main TradieRelay workspace to edit products.');
  const { id } = await context.params;
  const existing = await getDb().query.priceItems.findFirst({ where: and(eq(priceItems.id, id), eq(priceItems.tenantId, access.tenantId)) });
  if (!existing) return problem(404, 'product_not_found', 'That saved product could not be found.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The product changes could not be read.'); }
  const name = typeof body.name === 'string' && body.name.trim() ? body.name.trim().slice(0, 140) : existing.name;
  const unit = typeof body.unit === 'string' && body.unit.trim() ? body.unit.trim().slice(0, 30) : existing.unit;
  const rate = typeof body.rateExGstCents === 'number' && Number.isFinite(body.rateExGstCents) && body.rateExGstCents >= 0 ? Math.round(body.rateExGstCents) : existing.rateExGstCents;
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 500) || null : existing.notes;
  const active = typeof body.active === 'boolean' ? body.active : existing.active;
  const now = new Date().toISOString();
  const changes = { name, unit, rateExGstCents: rate, notes, active, verifiedBy: access.actorId ?? access.id, verifiedAt: now, updatedAt: now };
  await getDb().update(priceItems).set(changes).where(and(eq(priceItems.id, id), eq(priceItems.tenantId, access.tenantId)));
  await audit({ tenantId: access.tenantId, actorType: 'tenant_user', actorId: access.actorId, type: 'product.updated', resourceType: 'price_item', resourceId: id, payload: { name, unit, rateExGstCents: rate, active } });
  return json({ ok: true, product: { ...existing, ...changes } });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace']);
  if (!access) return problem(401, 'account_access_required', 'Open your main TradieRelay workspace to delete products.');
  const { id } = await context.params;
  const existing = await getDb().query.priceItems.findFirst({ where: and(eq(priceItems.id, id), eq(priceItems.tenantId, access.tenantId)) });
  if (!existing) return problem(404, 'product_not_found', 'That saved product could not be found.');
  await getDb().delete(priceItems).where(and(eq(priceItems.id, id), eq(priceItems.tenantId, access.tenantId)));
  await audit({ tenantId: access.tenantId, actorType: 'tenant_user', actorId: access.actorId, type: 'product.deleted', resourceType: 'price_item', resourceId: id, payload: { name: existing.name, rateExGstCents: existing.rateExGstCents } });
  return json({ ok: true, deletedId: id });
}
