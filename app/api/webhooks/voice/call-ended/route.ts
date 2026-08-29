import { getRuntimeEnv } from '@/db';
import { validateHmacSha256 } from '@/lib/providers/webhook-signature';
import { ingestCompletedCall } from '@/lib/server/call-ingestion';
import { json, problem } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-tradierelay-signature');
  if (!(await validateHmacSha256(getRuntimeEnv().VOICE_WEBHOOK_SECRET, rawBody, signature))) {
    return problem(401, 'invalid_signature', 'The voice webhook signature is invalid.');
  }
  let body: Record<string, unknown>;
  try { body = JSON.parse(rawBody) as Record<string, unknown>; } catch { return problem(400, 'invalid_json', 'The voice webhook body is invalid.'); }
  const providerCallId = typeof body.providerCallId === 'string' ? body.providerCallId : '';
  const providerEventId = typeof body.providerEventId === 'string' ? body.providerEventId : providerCallId;
  const transcript = typeof body.transcript === 'string' ? body.transcript.slice(0, 120_000) : '';
  if (!providerCallId || !providerEventId) return problem(400, 'missing_call_id', 'A provider call ID is required.');
  const result = await ingestCompletedCall({
    provider: typeof body.provider === 'string' ? body.provider.slice(0, 40) : 'voice-worker',
    providerCallId,
    providerEventId,
    tenantId: typeof body.tenantId === 'string' ? body.tenantId : null,
    toNumber: typeof body.toNumber === 'string' ? body.toNumber : null,
    fromNumber: typeof body.fromNumber === 'string' ? body.fromNumber : null,
    callerName: typeof body.callerName === 'string' ? body.callerName : null,
    transcript,
    recordingUrl: typeof body.recordingUrl === 'string' ? body.recordingUrl : null,
    durationSeconds: typeof body.durationSeconds === 'number' ? Math.max(0, Math.round(body.durationSeconds)) : null,
    outcome: typeof body.outcome === 'string' ? body.outcome.slice(0, 40) : 'completed',
    costCents: typeof body.costCents === 'number' ? Math.max(0, Math.round(body.costCents)) : 0,
  }, getRuntimeEnv().APP_ORIGIN ?? new URL(request.url).origin);
  return json({ ok: true, result });
}
