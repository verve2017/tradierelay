import { and, eq } from 'drizzle-orm';
import { getDb, getRuntimeEnv } from '@/db';
import { customers, messages, tenants } from '@/db/schema';
import { validateTwilioFormSignature } from '@/lib/providers/twilio-signature';
import { twiml } from '@/lib/providers/twiml';
import { createId } from '@/lib/server/ids';
import { problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const valid = await validateTwilioFormSignature({ url: request.url, rawBody, signature: request.headers.get('x-twilio-signature'), authToken: getRuntimeEnv().TWILIO_AUTH_TOKEN });
  if (!valid) return problem(401, 'invalid_signature', 'The Twilio webhook signature is invalid.');
  const form = new URLSearchParams(rawBody);
  const to = form.get('To') ?? '';
  const from = form.get('From') ?? '';
  const body = (form.get('Body') ?? '').trim();
  const tenant = await getDb().query.tenants.findFirst({ where: eq(tenants.smsNumber, to) });
  if (!tenant) return twiml('');
  const now = new Date().toISOString();
  const customer = await getDb().query.customers.findFirst({ where: and(eq(customers.tenantId, tenant.id), eq(customers.phoneE164, from)) });
  await getDb().insert(messages).values({
    id: createId('msg'), tenantId: tenant.id, direction: 'inbound', channel: 'sms', fromAddress: from, toAddress: to,
    body: body.slice(0, 1600), provider: 'twilio', providerMessageId: form.get('MessageSid'), jobId: null, quoteId: null,
    deliveryStatus: 'received', errorCode: null, createdAt: now, updatedAt: now,
  });
  if (/^(stop|unsubscribe|cancel|end|quit)$/iu.test(body) && customer) {
    await getDb().update(customers).set({ smsOptedOutAt: now, updatedAt: now }).where(eq(customers.id, customer.id));
  }
  return twiml('');
}
