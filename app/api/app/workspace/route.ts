import { requireMagicAccess } from '@/lib/server/access';
import { problem, json } from '@/lib/server/http';
import { getWorkspace } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const workspace = await getWorkspace(access.tenantId, access.scope === 'view_job' ? access.resourceId : null);
  if (!workspace) return problem(404, 'workspace_not_found', 'The workspace could not be found.');
  return json({ ok: true, workspace, accessScope: access.scope });
}
