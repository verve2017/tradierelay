import { describe, expect, it } from 'vitest';
import { hmacSha256Hex, validateHmacSha256 } from '@/lib/providers/webhook-signature';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { createOpaqueToken, hashOpaqueToken, timingSafeEqual } from '@/lib/server/ids';

async function twilioSignature(secret: string, url: string, rawBody: string) {
  const params = new URLSearchParams(rawBody);
  const payload = [...new Set(params.keys())].sort().reduce((text, key) => `${text}${key}${params.getAll(key).sort().join('')}`, url);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
  return Buffer.from(bytes).toString('base64');
}

describe('secure access primitives', () => {
  it('creates opaque, URL-safe, high-entropy tokens', () => {
    const token = createOpaqueToken();
    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/u);
    expect(createOpaqueToken()).not.toBe(token);
  });

  it('binds token hashes to the configured pepper', async () => {
    const first = await hashOpaqueToken('same-token', 'pepper-one');
    expect(first).toHaveLength(64);
    expect(await hashOpaqueToken('same-token', 'pepper-one')).toBe(first);
    expect(await hashOpaqueToken('same-token', 'pepper-two')).not.toBe(first);
  });

  it('uses length-safe constant-time comparison', () => {
    expect(timingSafeEqual('abc123', 'abc123')).toBe(true);
    expect(timingSafeEqual('abc123', 'abc124')).toBe(false);
    expect(timingSafeEqual('short', 'longer')).toBe(false);
  });
});

describe('signed provider callbacks', () => {
  it('accepts an exact Twilio form signature and rejects tampering', async () => {
    const url = 'https://example.com/api/webhooks/twilio/voice';
    const body = 'CallSid=CA123&From=%2B61412345678&To=%2B61755512040';
    const signature = await twilioSignature('test-auth-token', url, body);
    await expect(validateTwilioFormSignature({ url, rawBody: body, signature, authToken: 'test-auth-token' })).resolves.toBe(true);
    await expect(validateTwilioFormSignature({ url, rawBody: `${body}9`, signature, authToken: 'test-auth-token' })).resolves.toBe(false);
  });

  it('accepts an exact internal HMAC and rejects a changed payload', async () => {
    const signature = await hmacSha256Hex('voice-secret', '{"call":"CA123"}');
    await expect(validateHmacSha256('voice-secret', '{"call":"CA123"}', signature)).resolves.toBe(true);
    await expect(validateHmacSha256('voice-secret', '{"call":"CA124"}', signature)).resolves.toBe(false);
  });
});
