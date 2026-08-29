import { eq } from 'drizzle-orm';
import { getDb, getRuntimeEnv } from '@/db';
import { messages } from '@/db/schema';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { json, problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const valid = await validateTwilioFormSignature({ url: request.url, rawBody, signature: request.headers.get('x-twilio-signature'), authToken: getRuntimeEnv().TWILIO_AUTH_TOKEN });
  if (!valid) return problem(401, 'invalid_signature', 'The Twilio webhook signature is invalid.');
  const form = new URLSearchParams(rawBody);
  const sid = form.get('MessageSid');
  if (sid) {
    await getDb().update(messages).set({ deliveryStatus: form.get('MessageStatus') ?? 'unknown', errorCode: form.get('ErrorCode'), updatedAt: new Date().toISOString() }).where(eq(messages.providerMessageId, sid));
  }
  return json({ ok: true });
}
