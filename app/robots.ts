import type { MetadataRoute } from 'next';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/app/', '/operator/', '/customer/'],
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
