import { getRuntimeEnv } from '@/db';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { twiml } from '@/lib/providers/twiml';
import { ingestCompletedCall } from '@/lib/server/call-ingestion';
import { problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const runtime = getRuntimeEnv();
  const valid = await validateTwilioFormSignature({ url: request.url, rawBody, signature: request.headers.get('x-twilio-signature'), authToken: runtime.TWILIO_AUTH_TOKEN });
  if (!valid) return problem(401, 'invalid_signature', 'The Twilio webhook signature is invalid.');
  const form = new URLSearchParams(rawBody);
  const callSid = form.get('CallSid') ?? '';
  if (!callSid) return problem(400, 'missing_call_id', 'The Twilio call ID is missing.');
  await ingestCompletedCall({
    provider: 'twilio-voicemail',
    providerEventId: `${callSid}:voicemail`,
    providerCallId: callSid,
    toNumber: form.get('To'),
    fromNumber: form.get('From'),
    transcript: 'The caller left a voice message. Listen to the recording and call back to confirm the job.',
    recordingUrl: form.get('RecordingUrl'),
    durationSeconds: Number(form.get('RecordingDuration') ?? '0'),
    outcome: 'message_taken',
  }, runtime.APP_ORIGIN ?? new URL(request.url).origin);
  return twiml('<Say>Thanks. Your message has been sent through.</Say>');
}
