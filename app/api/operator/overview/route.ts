import { requireOperatorAccess } from '@/lib/server/access';
import { json, problem } from '@/lib/server/http';
import { listOperatorOverview } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireOperatorAccess(request);
  if (!access) return problem(401, 'operator_access_required', 'Operator access is required.');
  return json({ ok: true, overview: await listOperatorOverview() });
}
