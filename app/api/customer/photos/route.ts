import { getDb, getFileStore } from '@/db';
import { jobPhotos } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { json, problem } from '@/lib/server/http';
import { createId } from '@/lib/server/ids';
import { audit } from '@/lib/server/audit';

export const dynamic = 'force-dynamic';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

export async function POST(request: Request) {
  const access = await requireMagicAccess(request, ['upload_photos']);
  if (!access?.resourceId) return problem(401, 'invalid_link', 'This photo link is invalid or has expired.');
  const contentType = request.headers.get('content-type')?.split(';')[0]?.toLowerCase() ?? '';
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (!allowedTypes.has(contentType)) return problem(415, 'unsupported_photo', 'Use a JPG, PNG, WebP or HEIC photo.');
  if (!Number.isFinite(contentLength) || contentLength > 8_000_000) return problem(413, 'photo_too_large', 'Each photo must be under 8 MB.');
  const bytes = await request.arrayBuffer();
  if (bytes.byteLength <= 0) return problem(400, 'missing_photo', 'Choose a photo to upload.');
  if (bytes.byteLength > 8_000_000) return problem(413, 'photo_too_large', 'Each photo must be under 8 MB.');

  const photoId = createId('pho');
  const extension = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : contentType.includes('hei') ? 'heic' : 'jpg';
  const storageKey = `${access.tenantId}/jobs/${access.resourceId}/${photoId}.${extension}`;
  await getFileStore().put(storageKey, bytes, { httpMetadata: { contentType }, customMetadata: { jobId: access.resourceId, tenantId: access.tenantId } });
  await getDb().insert(jobPhotos).values({ id: photoId, tenantId: access.tenantId, jobId: access.resourceId, storageKey, contentType, sizeBytes: bytes.byteLength, caption: request.headers.get('x-photo-caption')?.slice(0, 240) ?? null, createdAt: new Date().toISOString() });
  await audit({ tenantId: access.tenantId, actorType: 'customer', actorId: access.actorId, type: 'job.photo_uploaded', resourceType: 'job', resourceId: access.resourceId, payload: { photoId, contentType, sizeBytes: bytes.byteLength } });
  return json({ ok: true, photo: { id: photoId, contentType, sizeBytes: bytes.byteLength } }, { status: 201 });
}
