import Image from 'next/image';
import { BlogDirectory } from '@/components/blog-directory';
import { CtaBand } from '@/components/cta-band';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { blogArticles } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Practical AI & Phone Guides for Tradies',
  'Plain-English guides to AI reception, missed-call recovery and better quote follow-up for Australian trade businesses.',
  '/blog',
);

export default function BlogPage() {
  const directoryArticles = blogArticles.map((article) => ({
    slug: article.slug,
    number: article.number,
    category: article.category,
    title: article.title,
    description: article.description,
    readMinutes: article.readMinutes,
    heroImage: article.heroImage,
    heroAlt: article.heroAlt,
    searchText: [article.title, article.description, article.directAnswer, article.category, ...article.keyPoints].join(' ').toLowerCase(),
  }));
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TradieRelay Field Guide',
    description: 'Practical AI reception, lead qualification, missed-call recovery and quote follow-up guides for Australian trade businesses.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: blogArticles.length,
      itemListElement: blogArticles.map((article, index) => ({ '@type': 'ListItem', position: index + 1, name: article.title, url: `https://tradie-relay.verve-9089.chatgpt.site/blog/${article.slug}` })),
    },
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="blog-hub-hero">
          <div className="shell blog-hub-hero-grid">
            <div>
              <p className="eyebrow">THE TRADIERELAY FIELD GUIDE</p>
              <h1>Fewer phone dramas. More useful jobs.</h1>
              <p className="blog-hub-lede">Clear answers for Australian tradies who want to stop losing good enquiries—without adding another complicated system to the day.</p>
              <div className="blog-topic-pills" aria-label="Guide topics">
                <span>AI receptionist basics</span><span>Missed-call recovery</span><span>Lead qualification</span><span>Quote follow-up</span>
              </div>
            </div>
            <Image src="/blog/trade-crew-routing.webp" alt="Australian trade team reviewing incoming job enquiries" width={1200} height={800} priority />
          </div>
        </section>

        <section className="section blog-hub-section">
          <div className="shell">
            <BlogDirectory articles={directoryArticles} />
          </div>
        </section>
        <CtaBand title="Want to see the phone flow with your own rules?" body="Noah will map one real call from ring to useful lead. No jargon, and no obligation." />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </>
  );
}
