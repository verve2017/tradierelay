import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://tradie-relay.verve-9089.chatgpt.site/sitemap.xml',
  };
}
