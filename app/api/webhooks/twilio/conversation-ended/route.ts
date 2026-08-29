import { getRuntimeEnv } from '@/db';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { twiml } from '@/lib/providers/twiml';
import { problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const valid = await validateTwilioFormSignature({ url: request.url, rawBody, signature: request.headers.get('x-twilio-signature'), authToken: getRuntimeEnv().TWILIO_AUTH_TOKEN });
  if (!valid) return problem(401, 'invalid_signature', 'The Twilio webhook signature is invalid.');
  const form = new URLSearchParams(rawBody);
  if (form.get('SessionStatus') === 'failed') {
    return twiml('<Say>Sorry, the receptionist connection dropped. Please leave your name, number and the job after the tone.</Say><Record maxLength="120" playBeep="true"/><Say>Thanks. We will pass that on.</Say>');
  }
  return twiml('<Say>Thanks for calling. The details have been sent through.</Say>');
}
