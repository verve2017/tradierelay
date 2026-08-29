import type { Metadata } from 'next';
import { OperatorConsole } from './operator-console';

export const metadata: Metadata = { title: 'Operator console | TradieRelay', robots: { index: false, follow: false } };

export default async function OperatorPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <OperatorConsole accessToken={token ?? null} />;
}
