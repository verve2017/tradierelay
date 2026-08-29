import type { Metadata } from 'next';
import { CustomerQuote } from './quote-review';

export const metadata: Metadata = { title: 'Review quote | TradieRelay', robots: { index: false, follow: false } };

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <CustomerQuote accessToken={token ?? null} />;
}
