import { requireMagicAccess } from '@/lib/server/access';
import { json, problem, readJsonObject } from '@/lib/server/http';
import { getQuoteBundle, saveDraftQuote } from '@/lib/server/workspace';

export const dynamic = 'force-dynamic';

type QuoteLineInput = { id?: string; priceItemId?: string; description: string; quantityMilli: number; unit: string; unitRateExGstCents: number | null };

function parseLines(value: unknown): QuoteLineInput[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 30) return null;
  const lines: QuoteLineInput[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const line = item as Record<string, unknown>;
    if (typeof line.description !== 'string' || line.description.trim().length === 0 || line.description.length > 180) return null;
    if (typeof line.quantityMilli !== 'number' || !Number.isFinite(line.quantityMilli) || line.quantityMilli <= 0) return null;
    if (typeof line.unit !== 'string' || line.unit.length > 30) return null;
    if (line.unitRateExGstCents !== null && (typeof line.unitRateExGstCents !== 'number' || !Number.isFinite(line.unitRateExGstCents) || line.unitRateExGstCents < 0)) return null;
    lines.push({
      id: typeof line.id === 'string' ? line.id : undefined,
      priceItemId: typeof line.priceItemId === 'string' ? line.priceItemId : undefined,
      description: line.description,
      quantityMilli: line.quantityMilli,
      unit: line.unit,
      unitRateExGstCents: line.unitRateExGstCents,
    });
  }
  return lines;
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id } = await context.params;
  const quote = await getQuoteBundle(access.tenantId, id);
  if (!quote || (access.scope === 'view_job' && access.resourceId !== quote.job.id)) {
    return problem(404, 'quote_not_found', 'This quote could not be found.');
  }
  return json({ ok: true, quote });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireMagicAccess(request, ['tradie_workspace', 'view_job']);
  if (!access) return problem(401, 'invalid_link', 'This secure workspace link is invalid or has expired.');
  const { id } = await context.params;
  let body: Record<string, unknown>;
  try { body = await readJsonObject(request); } catch { return problem(400, 'invalid_request', 'The quote changes could not be read.'); }
  const lines = parseLines(body.lines);
  if (!lines) return problem(400, 'invalid_lines', 'Add at least one valid quote line.');
  const note = typeof body.note === 'string' ? body.note : '';
  const quote = await saveDraftQuote({ tenantId: access.tenantId, quoteId: id, actorId: access.actorId ?? access.id, note, lines });
  if (!quote) return problem(404, 'quote_not_found', 'This draft quote could not be edited.');
  return json({ ok: true, quote });
}
