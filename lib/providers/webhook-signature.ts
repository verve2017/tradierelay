import { timingSafeEqual } from '@/lib/server/ids';

const encoder = new TextEncoder();

export async function hmacSha256Hex(secret: string, body: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function validateHmacSha256(secret: string | undefined, body: string, supplied: string | null) {
  if (!secret || !supplied) return false;
  const expected = await hmacSha256Hex(secret, body);
  return timingSafeEqual(expected, supplied.toLowerCase());
}
