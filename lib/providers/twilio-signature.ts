import { timingSafeEqual } from '@/lib/server/ids';

const encoder = new TextEncoder();

async function hmacSha1Base64(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  let binary = '';
  for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function signaturePayload(url: string, params: URLSearchParams) {
  const keys = [...new Set(params.keys())].sort();
  return keys.reduce((payload, key) => {
    const values = params.getAll(key).sort();
    return `${payload}${key}${values.join('')}`;
  }, url);
}

export async function validateTwilioFormSignature(input: {
  url: string;
  rawBody: string;
  signature: string | null;
  authToken: string | undefined;
}) {
  if (!input.signature || !input.authToken) return false;
  const expected = await hmacSha1Base64(input.authToken, signaturePayload(input.url, new URLSearchParams(input.rawBody)));
  return timingSafeEqual(expected, input.signature);
}
