import type { Metadata } from 'next';
import { CustomerPhotos } from './photo-uploader';

export const metadata: Metadata = { title: 'Add job photos | TradieRelay', robots: { index: false, follow: false } };

export default async function PhotosPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <CustomerPhotos accessToken={token ?? null} />;
}
