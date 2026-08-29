import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { jobs } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { json, problem, readJsonObject } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

const transitions: Record<string, string[]> = {
  new: ['contacted', 'booked', 'not_proceeding'],
  callback_due: ['contacted', 'booked', 'not_proceeding'],
  contacted: ['booked', 'not_proceeding'],
  draft_quote: ['booked', 'not_proceeding'],
  quoted: ['booked', 'not_proceeding'],
  accepted: ['booked'],
  change_requested: ['draft_quote', 'not_proceeding'],
  booked: ['completed', 'not_proceeding'],
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id } = await context.params;
  if (access.scope === 'view_job' && access.resourceId !== id) return problem(404, 'job_not_found', 'This job could not be found.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request, 8_000); } catch { return problem(400, 'invalid_request', 'The job update could not be read.'); }
  const status = typeof body.status === 'string' ? body.status : '';
  const job = await getDb().query.jobs.findFirst({ where: and(eq(jobs.id, id), eq(jobs.tenantId, access.tenantId)) });
  if (!job) return problem(404, 'job_not_found', 'This job could not be found.');
  if (!(transitions[job.status] ?? []).includes(status)) {
    return problem(409, 'invalid_status_change', `This job cannot move from ${job.status.replaceAll('_', ' ')} to ${status.replaceAll('_', ' ')}.`);
  }
  const now = new Date().toISOString();
  const closedAt = ['completed', 'not_proceeding'].includes(status) ? now : null;
  await getDb().update(jobs).set({ status, acknowledgedAt: job.acknowledgedAt ?? now, closedAt, updatedAt: now }).where(and(eq(jobs.id, id), eq(jobs.tenantId, access.tenantId)));
  await audit({
    tenantId: access.tenantId,
    actorType: 'tenant_user',
    actorId: access.actorId ?? access.id,
    type: 'job.status_updated',
    resourceType: 'job',
    resourceId: id,
    payload: { from: job.status, to: status },
  });
  return json({ ok: true, job: { ...job, status, acknowledgedAt: job.acknowledgedAt ?? now, closedAt, updatedAt: now } });
}
