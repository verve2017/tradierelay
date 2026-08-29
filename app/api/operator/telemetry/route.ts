import { getDb } from '@/db';
import { operatorEvents } from '@/db/schema';
import { requireOperatorAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { createId } from '@/lib/server/ids';

export const dynamic = 'force-dynamic';

const allowedTypes = new Set(['operator.tab_viewed', 'operator.audit_viewed', 'operator.growth_plan_viewed']);

export async function POST(request: Request) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request, 8_000); } catch { return problem(400, 'invalid_request', 'The usage event could not be read.'); }
  const type = typeof body.type === 'string' ? body.type : '';
  if (!allowedTypes.has(type)) return problem(400, 'invalid_event', 'That usage event is not supported.');
  const tab = typeof body.tab === 'string' ? body.tab.slice(0, 40) : null;
  await getDb().insert(operatorEvents).values({
    id: createId('ope'),
    actorId: access.actorId,
    type,
    payload: { tab },
    createdAt: new Date().toISOString(),
  });
  return json({ ok: true }, { status: 201 });
}
