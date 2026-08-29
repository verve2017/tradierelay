import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = 'https://tradie-relay.verve-9089.chatgpt.site';
  const routes = ['', '/how-it-works', '/call-flow', '/what-it-handles', '/trades', '/setup', '/trust', '/pricing', '/faq', '/about', '/book', '/privacy'];
  return routes.map((route) => ({
    url: `${origin}${route}`,
    lastModified: new Date('2026-08-29'),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/book' ? 0.9 : 0.7,
  }));
}
