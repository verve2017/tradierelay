import { getDb } from '@/db';
import { events } from '@/db/schema';
import { createId } from './ids';

export async function audit(input: {
  tenantId: string;
  actorType: string;
  actorId?: string | null;
  type: string;
  resourceType: string;
  resourceId: string;
  payload?: Record<string, unknown>;
}) {
  await getDb().insert(events).values({
    id: createId('evt'),
    tenantId: input.tenantId,
    actorType: input.actorType,
    actorId: input.actorId ?? null,
    type: input.type,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    payload: input.payload ?? {},
    createdAt: new Date().toISOString(),
  });
}
