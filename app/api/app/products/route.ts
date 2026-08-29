import { asc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { priceItems } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { createId } from '@/lib/server/ids';

export const dynamic = 'force-dynamic';

function parseProduct(body: Record<string, unknown>) {
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 140) : '';
  const unit = typeof body.unit === 'string' ? body.unit.trim().slice(0, 30) : '';
  const rate = typeof body.rateExGstCents === 'number' && Number.isFinite(body.rateExGstCents) ? Math.round(body.rateExGstCents) : -1;
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 500) : '';
  if (!name || !unit || rate < 0) return null;
  return { name, unit, rateExGstCents: rate, notes: notes || null };
}

export async function GET(request: Request) {
  const access = await requireMagicAccess(request, ['tradie_workspace']);
  if (!access) return problem(401, 'account_access_required', 'Open your main TradieRelay workspace to manage saved products.');
  const products = await getDb().select().from(priceItems).where(eq(priceItems.tenantId, access.tenantId)).orderBy(asc(priceItems.name));
  return json({ ok: true, products });
}

export async function POST(request: Request) {
  const access = await requireMagicAccess(request, ['tradie_workspace']);
  if (!access) return problem(401, 'account_access_required', 'Open your main TradieRelay workspace to add products.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The product details could not be read.'); }
  const input = parseProduct(body);
  if (!input) return problem(400, 'invalid_product', 'Add a product name, unit and valid price.');
  const now = new Date().toISOString();
  const product = { id: createId('pri'), tenantId: access.tenantId, ...input, active: body.active !== false, verifiedBy: access.actorId ?? access.id, verifiedAt: now, createdAt: now, updatedAt: now };
  await getDb().insert(priceItems).values(product);
  await audit({ tenantId: access.tenantId, actorType: 'tenant_user', actorId: access.actorId, type: 'product.created', resourceType: 'price_item', resourceId: product.id, payload: { name: product.name, unit: product.unit, rateExGstCents: product.rateExGstCents } });
  return json({ ok: true, product }, { status: 201 });
}
