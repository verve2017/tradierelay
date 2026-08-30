import type { MetadataRoute } from 'next';
import { tradePages } from '@/lib/trades';
import { blogArticles } from '@/lib/blog';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/blog',
    '/book',
    '/call-flow',
    '/faq',
    '/features',
    '/how-it-works',
    '/pricing',
    '/privacy',
    '/setup',
    '/trades',
    '/trust',
    '/what-it-handles',
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${origin}${path}`,
      changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
      priority: path === '' ? 1 : path === '/trades' ? 0.9 : 0.7,
    })),
    ...tradePages.map((trade) => ({
      url: `${origin}/trades/${trade.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...blogArticles.map((article) => ({
      url: `${origin}/blog/${article.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
