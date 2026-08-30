import Image from 'next/image';
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
  const featured = blogArticles[0];
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TradieRelay Field Guide',
    description: 'Practical AI reception and missed-call recovery guides for Australian trade businesses.',
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
                <span>AI receptionist basics</span><span>Missed-call recovery</span><span>Call handling</span>
              </div>
            </div>
            <Image src="/blog/trade-crew-routing.webp" alt="Australian trade team reviewing incoming job enquiries" width={1200} height={800} priority />
          </div>
        </section>

        <section className="section blog-hub-section">
          <div className="shell">
            <div className="blog-hub-heading">
              <div><p className="eyebrow">START HERE</p><h2>Foundational guides</h2></div>
              <p>Each guide gives the short answer first, then shows exactly how the idea works in a trade business.</p>
            </div>
            {featured && (
              <a className="blog-feature-card" href={`/blog/${featured.slug}`}>
                <Image src={featured.heroImage} alt={featured.heroAlt} width={1200} height={800} />
                <div><span>{String(featured.number).padStart(2, '0')} · {featured.category}</span><h3>{featured.title}</h3><p>{featured.description}</p><strong>Read the guide →</strong></div>
              </a>
            )}
            <div className="blog-card-grid">
              {blogArticles.slice(1).map((article) => (
                <a className="blog-card" href={`/blog/${article.slug}`} key={article.slug}>
                  <Image src={article.heroImage} alt="" width={1200} height={800} />
                  <div><span>{String(article.number).padStart(2, '0')} · {article.category}</span><h3>{article.title}</h3><p>{article.description}</p><strong>{article.readMinutes} min read →</strong></div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <CtaBand title="Want to see the phone flow with your own rules?" body="Noah will map one real call from ring to useful lead. No jargon, and no obligation." />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </>
  );
}
