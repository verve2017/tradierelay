import { getDb, getRuntimeEnv } from '@/db';
import { customers, messages } from '@/db/schema';
import { createId } from '@/lib/server/ids';
import { and, eq } from 'drizzle-orm';

type SendSmsInput = {
  tenantId: string;
  to: string;
  body: string;
  from?: string | null;
  jobId?: string | null;
  quoteId?: string | null;
};

type TwilioMessageResponse = { sid?: string; status?: string; code?: number; message?: string };

export async function sendSms(input: SendSmsInput) {
  const runtime = getRuntimeEnv();
  const from = input.from ?? runtime.TWILIO_FROM_NUMBER ?? 'TradieRelay demo';
  const messageId = createId('msg');
  const now = new Date().toISOString();
  const hasLiveProvider = Boolean(runtime.TWILIO_ACCOUNT_SID && runtime.TWILIO_AUTH_TOKEN && from.startsWith('+'));
  const customer = await getDb().query.customers.findFirst({ where: and(eq(customers.tenantId, input.tenantId), eq(customers.phoneE164, input.to)) });
  const optedOut = Boolean(customer?.smsOptedOutAt);

  await getDb().insert(messages).values({
    id: messageId,
    tenantId: input.tenantId,
    direction: 'outbound',
    channel: 'sms',
    fromAddress: from,
    toAddress: input.to,
    body: input.body,
    provider: optedOut ? 'suppressed' : hasLiveProvider ? 'twilio' : 'demo',
    providerMessageId: null,
    jobId: input.jobId ?? null,
    quoteId: input.quoteId ?? null,
    deliveryStatus: optedOut ? 'suppressed_opt_out' : hasLiveProvider ? 'sending' : 'simulated',
    errorCode: null,
    createdAt: now,
    updatedAt: now,
  });

  if (optedOut) return { messageId, status: 'suppressed_opt_out' as const };
  if (!hasLiveProvider) return { messageId, status: 'simulated' as const };

  const body = new URLSearchParams({ To: input.to, From: from, Body: input.body });
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${runtime.TWILIO_ACCOUNT_SID}/Messages.json`;
  const authorization = btoa(`${runtime.TWILIO_ACCOUNT_SID}:${runtime.TWILIO_AUTH_TOKEN}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Basic ${authorization}`,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json() as TwilioMessageResponse;
    const deliveryStatus = response.ok ? (result.status ?? 'queued') : 'failed';
    await getDb().update(messages).set({
      providerMessageId: result.sid ?? null,
      deliveryStatus,
      errorCode: response.ok ? null : String(result.code ?? response.status),
      updatedAt: new Date().toISOString(),
    }).where(eq(messages.id, messageId));

    if (!response.ok) throw new Error(`Twilio SMS failed with ${result.code ?? response.status}`);
    return { messageId, status: deliveryStatus };
  } catch (error) {
    await getDb().update(messages).set({
      deliveryStatus: 'failed',
      errorCode: error instanceof Error ? error.message.slice(0, 120) : 'unknown_error',
      updatedAt: new Date().toISOString(),
    }).where(eq(messages.id, messageId));
    throw error;
  }
}
