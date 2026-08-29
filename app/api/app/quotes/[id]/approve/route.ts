import { getRuntimeEnv } from '@/db';
import { requireMagicAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { approveAndSendQuote } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id } = await context.params;
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The approval could not be read.'); }
  const origin = getRuntimeEnv().APP_ORIGIN ?? new URL(request.url).origin;
  try {
    const result = await approveAndSendQuote({
      tenantId: access.tenantId,
      quoteId: id,
      actorId: access.actorId ?? access.id,
      acknowledged: body.acknowledged === true,
      appOrigin: origin,
    });
    if (!result) return problem(404, 'quote_not_found', 'This quote could not be approved.');
    return json({ ok: true, ...result });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'APPROVAL_FAILED';
    const messages: Record<string, string> = {
      APPROVAL_REQUIRED: 'Confirm that you reviewed the scope and price.',
      QUOTE_HAS_UNPRICED_ITEMS: 'Every line needs a price before this quote can be sent.',
      QUOTE_TOTAL_INVALID: 'The quote total must be more than zero.',
      QBCC_LICENCE_ACK_REQUIRED: 'A licence check is required before this higher-value quote can be sent.',
    };
    return problem(409, code.toLowerCase(), messages[code] ?? 'The quote could not be approved.');
  }
}
