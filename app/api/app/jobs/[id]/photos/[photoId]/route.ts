import { and, eq } from 'drizzle-orm';
import { getDb, getFileStore } from '@/db';
import { jobPhotos } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { audit } from '@/lib/server/audit';
import { problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string; photoId: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id, photoId } = await context.params;
  if (access.scope === 'view_job' && access.resourceId !== id) return problem(403, 'job_access_denied', 'This link cannot open photos from another job.');
  const photo = await getDb().query.jobPhotos.findFirst({ where: and(eq(jobPhotos.id, photoId), eq(jobPhotos.jobId, id), eq(jobPhotos.tenantId, access.tenantId)) });
  if (!photo) return problem(404, 'photo_not_found', 'That customer photo could not be found.');
  const object = await getFileStore().get(photo.storageKey);
  if (!object?.body) return problem(404, 'photo_missing', 'That customer photo is no longer available.');
  await audit({ tenantId: access.tenantId, actorType: 'tenant_user', actorId: access.actorId, type: 'job.photo_viewed', resourceType: 'job_photo', resourceId: photoId, payload: { jobId: id } });
  return new Response(object.body, { headers: { 'content-type': photo.contentType, 'content-length': String(photo.sizeBytes), 'cache-control': 'private, max-age=300', 'content-disposition': 'inline', 'x-content-type-options': 'nosniff' } });
}
