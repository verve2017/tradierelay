import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { quotes } from '@/db/schema';
import { requireMagicAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { acceptCustomerQuote, getQuoteBundle, requestQuoteChange } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const access = await requireMagicAccess(request, ['review_quote']);
  if (!access?.resourceId || !access.actorId) return problem(401, 'invalid_link', 'This quote link is invalid or has expired.');
  const bundle = await getQuoteBundle(access.tenantId, access.resourceId);
  if (!bundle || bundle.customer.id !== access.actorId) return problem(404, 'quote_not_found', 'The quote could not be found.');
  if (bundle.quote.status === 'sent') {
    const now = new Date().toISOString();
    await getDb().update(quotes).set({ status: 'viewed', viewedAt: now, updatedAt: now }).where(eq(quotes.id, bundle.quote.id));
    bundle.quote.status = 'viewed';
    bundle.quote.viewedAt = now;
  }
  return json({ ok: true, quote: bundle });
}

export async function POST(request: Request) {
  const access = await requireMagicAccess(request, ['review_quote']);
  if (!access?.resourceId || !access.actorId) return problem(401, 'invalid_link', 'This quote link is invalid or has expired.');
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The response could not be read.'); }
  if (body.action === 'accept') {
    const quote = await acceptCustomerQuote({ tenantId: access.tenantId, quoteId: access.resourceId, customerId: access.actorId });
    if (!quote) return problem(409, 'quote_not_available', 'This quote is no longer available to accept.');
    return json({ ok: true, quote });
  }
  if (body.action === 'request_change' && typeof body.note === 'string' && body.note.trim()) {
    const quote = await requestQuoteChange({ tenantId: access.tenantId, quoteId: access.resourceId, customerId: access.actorId, note: body.note.trim() });
    if (!quote) return problem(409, 'quote_not_available', 'This quote is no longer available for changes.');
    return json({ ok: true, quote });
  }
  return problem(400, 'invalid_action', 'Choose accept or request a change.');
}
