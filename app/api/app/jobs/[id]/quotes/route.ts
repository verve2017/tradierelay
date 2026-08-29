import { requireMagicAccess } from '@/lib/server/access';
import { json, problem } from '@/lib/server/http';
import { createDraftQuote } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id } = await context.params;
  if (access.scope === 'view_job' && access.resourceId !== id) return problem(403, 'wrong_job', 'This link does not allow access to that job.');
  const quote = await createDraftQuote({ tenantId: access.tenantId, jobId: id, actorId: access.actorId ?? access.id });
  if (!quote) return problem(404, 'job_not_found', 'The job could not be found.');
  return json({ ok: true, quote }, { status: 201 });
}
