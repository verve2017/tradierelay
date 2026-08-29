import { requireMagicAccess } from '@/lib/server/access';
import { getBearerToken, json, problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const token = getBearerToken(request);
  if (!token) return problem(400, 'missing_token', 'A secure access token is required.');
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job', 'upload_photos', 'review_quote', 'operator']);
  if (!access) return problem(401, 'invalid_link', 'This secure link is invalid or has expired.');
  const maxAge = Math.max(60, Math.min(30 * 86_400, Math.floor((Date.parse(access.expiresAt) - Date.now()) / 1000)));
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return json({ ok: true, scope: access.scope, resourceId: access.resourceId, expiresAt: access.expiresAt }, {
    headers: { 'set-cookie': `tr_access=${encodeURIComponent(token)}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${maxAge}` },
  });
}

export async function DELETE(request: Request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return json({ ok: true }, { headers: { 'set-cookie': `tr_access=; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=0` } });
}
