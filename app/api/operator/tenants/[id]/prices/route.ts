import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { priceItems, tenants } from '@/db/schema';
import { requireOperatorAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { createId } from '@/lib/server/ids';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  const { id } = await context.params;
  if (!await getDb().query.tenants.findFirst({ where: eq(tenants.id, id) })) return problem(404, 'tenant_not_found', 'The tenant could not be found.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The price item could not be read.'); }
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 140) : '';
  const unit = typeof body.unit === 'string' ? body.unit.trim().slice(0, 30) : '';
  const rate = typeof body.rateExGstCents === 'number' && Number.isFinite(body.rateExGstCents) ? Math.round(body.rateExGstCents) : -1;
  if (!name || !unit || rate < 0) return problem(400, 'invalid_price', 'Name, unit and a valid ex-GST rate are required.');
  const now = new Date().toISOString();
  const price = { id: createId('pri'), tenantId: id, name, unit, rateExGstCents: rate, notes: typeof body.notes === 'string' ? body.notes.trim().slice(0, 500) : null, active: true, verifiedBy: access.actorId, verifiedAt: now, createdAt: now, updatedAt: now };
  await getDb().insert(priceItems).values(price);
  await audit({ tenantId: id, actorType: 'operator', actorId: access.actorId, type: 'price.verified', resourceType: 'price_item', resourceId: price.id, payload: { name, unit, rateExGstCents: rate } });
  return json({ ok: true, price }, { status: 201 });
}
