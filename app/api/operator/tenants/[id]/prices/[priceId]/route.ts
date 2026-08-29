import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { priceItems } from '@/db/schema';
import { requireOperatorAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string; priceId: string }> }) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  const { id, priceId } = await context.params;
  const existing = await getDb().query.priceItems.findFirst({ where: and(eq(priceItems.id, priceId), eq(priceItems.tenantId, id)) });
  if (!existing) return problem(404, 'price_not_found', 'The price item could not be found.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The price change could not be read.'); }
  const now = new Date().toISOString();
  const changes = {
    name: typeof body.name === 'string' && body.name.trim() ? body.name.trim().slice(0, 140) : existing.name,
    unit: typeof body.unit === 'string' && body.unit.trim() ? body.unit.trim().slice(0, 30) : existing.unit,
    rateExGstCents: typeof body.rateExGstCents === 'number' && Number.isFinite(body.rateExGstCents) && body.rateExGstCents >= 0 ? Math.round(body.rateExGstCents) : existing.rateExGstCents,
    active: typeof body.active === 'boolean' ? body.active : existing.active,
    verifiedBy: access.actorId,
    verifiedAt: now,
    updatedAt: now,
  };
  await getDb().update(priceItems).set(changes).where(and(eq(priceItems.id, priceId), eq(priceItems.tenantId, id)));
  await audit({ tenantId: id, actorType: 'operator', actorId: access.actorId, type: 'price.updated', resourceType: 'price_item', resourceId: priceId, payload: changes });
  return json({ ok: true, price: { ...existing, ...changes } });
}
