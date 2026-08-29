import { eq } from 'drizzle-orm';
import { getDb, getRuntimeEnv } from '@/db';
import { tenants } from '@/db/schema';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { twiml, xmlEscape } from '@/lib/providers/twiml';
import { problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const runtime = getRuntimeEnv();
  const valid = await validateTwilioFormSignature({ url: request.url, rawBody, signature: request.headers.get('x-twilio-signature'), authToken: runtime.TWILIO_AUTH_TOKEN });
  if (!valid) return problem(401, 'invalid_signature', 'The Twilio webhook signature is invalid.');
  const form = new URLSearchParams(rawBody);
  const to = form.get('To') ?? '';
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.voiceNumber, to) });
  if (!tenant) return twiml('<Say>Sorry, this service is not configured yet. Please call the business directly.</Say>');

  const greeting = `Hi, you have reached ${tenant.businessName}. I am an AI receptionist and this call may be recorded. How can I help with the job?`;
  const origin = runtime.APP_ORIGIN ?? new URL(request.url).origin;
  if (!runtime.VOICE_WEBSOCKET_URL) {
    const action = `${origin.replace(/\/$/u, '')}/api/webhooks/twilio/voicemail`;
    return twiml(`<Say>${xmlEscape(greeting)}</Say><Say>Our receptionist is in message mode. Please leave your name, suburb and what you need after the tone.</Say><Record action="${xmlEscape(action)}" method="POST" maxLength="120" playBeep="true"/><Say>Thanks. We will pass that on now.</Say>`);
  }

  const websocketUrl = runtime.VOICE_WEBSOCKET_URL;
  const action = `${origin.replace(/\/$/u, '')}/api/webhooks/twilio/conversation-ended`;
  return twiml(
    `<Connect action="${xmlEscape(action)}" method="POST"><ConversationRelay url="${xmlEscape(websocketUrl)}" welcomeGreeting="${xmlEscape(greeting)}" language="en-AU" transcriptionLanguage="en-AU" ttsLanguage="en-AU" interruptible="speech" reportInputDuringAgentSpeech="speech" speechTimeout="1000"><Parameter name="tenantId" value="${xmlEscape(tenant.id)}"/><Parameter name="appOrigin" value="${xmlEscape(origin)}"/></ConversationRelay></Connect>`,
  );
}
