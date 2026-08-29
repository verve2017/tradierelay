import type { Metadata } from 'next';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${origin}${pathname}` },
    openGraph: {
      title: `${title} — TradieRelay`,
      description,
      type: 'website',
      locale: 'en_AU',
      url: `${origin}${pathname}`,
      images: [{ url: '/og-tradierelay.jpg', width: 1730, height: 909, alt: 'TradieRelay for Australian tradies' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — TradieRelay`,
      description,
      images: ['/og-tradierelay.jpg'],
    },
  };
}
