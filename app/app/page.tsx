import type { Metadata } from 'next';
import { TradieWorkspace } from './tradie-workspace';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tradie workspace',
  description: 'Review captured jobs, approve quotes and keep customer work moving.',
  robots: { index: false, follow: false },
};

export default async function TradieWorkspacePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <TradieWorkspace accessToken={token ?? null} />;
}
