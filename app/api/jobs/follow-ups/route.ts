import { and, asc, eq, lte } from 'drizzle-orm';
import { getDb, getRuntimeEnv } from '@/db';
import { followUps, tenantUsers } from '@/db/schema';
import { sendSms } from '@/lib/providers/sms';
import { getBearerToken, json, problem } from '@/lib/server/http';
import { timingSafeEqual } from '@/lib/server/ids';
import { getQuoteBundle } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const secret = getRuntimeEnv().CRON_SECRET;
  const supplied = getBearerToken(request);
  if (!secret || !supplied || !timingSafeEqual(secret, supplied)) return problem(401, 'job_access_required', 'Scheduled-job access is required.');
  const due = await getDb().select().from(followUps).where(and(eq(followUps.status, 'scheduled'), lte(followUps.dueAt, new Date().toISOString()))).orderBy(asc(followUps.dueAt)).limit(50);
  const results: Array<{ id: string; status: string }> = [];

  for (const followUp of due) {
    if (!followUp.quoteId) {
      await complete(followUp.id, 'cancelled');
      results.push({ id: followUp.id, status: 'cancelled' });
      continue;
    }
    const bundle = await getQuoteBundle(followUp.tenantId, followUp.quoteId);
    if (!bundle) {
      await complete(followUp.id, 'cancelled');
      results.push({ id: followUp.id, status: 'cancelled' });
      continue;
    }
    try {
      if (followUp.kind === 'tradie_draft_reminder' && ['draft', 'awaiting_approval'].includes(bundle.quote.status)) {
        const owner = await getDb().query.tenantUsers.findFirst({ where: and(eq(tenantUsers.tenantId, followUp.tenantId), eq(tenantUsers.role, 'owner')) });
        if (owner) await sendSms({ tenantId: followUp.tenantId, to: owner.phoneE164, from: bundle.tenant.smsNumber, body: `Draft waiting: ${bundle.customer.name ?? 'Customer'} — ${bundle.job.title}. Review it in TradieRelay; nothing has been sent to the customer.`, jobId: bundle.job.id, quoteId: bundle.quote.id });
      } else if (followUp.kind === 'customer_quote_followup' && ['sent', 'viewed'].includes(bundle.quote.status) && !bundle.customer.smsOptedOutAt) {
        await sendSms({ tenantId: followUp.tenantId, to: bundle.customer.phoneE164, from: bundle.tenant.smsNumber, body: `${bundle.tenant.businessName}: just checking you received the estimate for ${bundle.job.title}. Open the original link to accept or request a change. Reply STOP to opt out.`, jobId: bundle.job.id, quoteId: bundle.quote.id });
      }
      await complete(followUp.id, 'completed');
      results.push({ id: followUp.id, status: 'completed' });
    } catch (error) {
      await getDb().update(followUps).set({ status: 'failed', attemptCount: followUp.attemptCount + 1, lastError: error instanceof Error ? error.message.slice(0, 240) : 'unknown_error', updatedAt: new Date().toISOString() }).where(eq(followUps.id, followUp.id));
      results.push({ id: followUp.id, status: 'failed' });
    }
  }
  return json({ ok: true, processed: results.length, results });
}

async function complete(id: string, status: string) {
  const now = new Date().toISOString();
  await getDb().update(followUps).set({ status, completedAt: now, updatedAt: now }).where(eq(followUps.id, id));
}
