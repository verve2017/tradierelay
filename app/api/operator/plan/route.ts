import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { operatorPlanProgress } from '@/db/schema';
import { requireOperatorAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  const progress = await getDb().select().from(operatorPlanProgress);
  return json({ ok: true, progress });
}

export async function PATCH(request: Request) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request, 8_000); } catch { return problem(400, 'invalid_request', 'The plan update could not be read.'); }
  const itemId = typeof body.itemId === 'string' ? body.itemId.trim().slice(0, 80) : '';
  if (!/^growth-(10|50)-[a-z0-9-]+$/u.test(itemId) || typeof body.completed !== 'boolean') {
    return problem(400, 'invalid_plan_item', 'Choose a valid plan item and completion state.');
  }
  const now = new Date().toISOString();
  await getDb().insert(operatorPlanProgress).values({
    itemId,
    completed: body.completed,
    completedAt: body.completed ? now : null,
    updatedBy: access.actorId,
    updatedAt: now,
  }).onConflictDoUpdate({
    target: operatorPlanProgress.itemId,
    set: { completed: body.completed, completedAt: body.completed ? now : null, updatedBy: access.actorId, updatedAt: now },
  });
  const progress = await getDb().query.operatorPlanProgress.findFirst({ where: eq(operatorPlanProgress.itemId, itemId) });
  return json({ ok: true, progress });
}
