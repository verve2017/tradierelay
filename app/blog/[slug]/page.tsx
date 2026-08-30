/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProductScreen } from '@/components/product-screen';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { blogArticles, getBlogArticle } from '@/lib/blog';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};
  const url = `${origin}/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, type: 'article', locale: 'en_AU', url, images: [{ url: article.heroImage, width: 1200, height: 800, alt: article.heroAlt }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [article.heroImage] },
  };
}

function ProductVisual({ article }: { article: NonNullable<ReturnType<typeof getBlogArticle>> }) {
  if (article.productVisual === 'alert' || article.productVisual === 'lead' || article.productVisual === 'pipeline') {
    return <div className="blog-product-native"><ProductScreen type={article.productVisual} /></div>;
  }
  const images = {
    dashboard: { src: '/blog/tradierelay-dashboard.png', width: 1280, height: 720 },
    rules: { src: '/blog/tradierelay-call-rules.png', width: 1280, height: 720 },
    'photo-request': { src: '/blog/tradierelay-photo-request.png', width: 430, height: 932 },
    'quote-editor': { src: '/blog/tradierelay-quote-editor-v2.png', width: 1280, height: 720 },
    'products-prices': { src: '/blog/tradierelay-products-prices-v2.png', width: 1280, height: 720 },
    'customer-quote': { src: '/blog/tradierelay-customer-quote-v2.png', width: 430, height: 932 },
  };
  const image = images[article.productVisual];
  return <Image className={`blog-product-shot blog-product-shot-${article.productVisual}`} src={image.src} alt="TradieRelay working product screen using fictional demo data" width={image.width} height={image.height} />;
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();
  const relatedArticles = article.related.map(getBlogArticle).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, image: `${origin}${article.heroImage}`, datePublished: '2026-08-30', dateModified: '2026-08-30', author: { '@type': 'Organization', name: 'TradieRelay product team' }, publisher: { '@type': 'Organization', name: 'TradieRelay', url: origin }, mainEntityOfPage: `${origin}/blog/${article.slug}` };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${origin}/blog` },
    { '@type': 'ListItem', position: 3, name: article.title, item: `${origin}/blog/${article.slug}` },
  ] };

  return (
    <>
      <SiteHeader />
      <main>
        <article className="blog-article">
          <header className="blog-article-hero">
            <div className="shell blog-article-hero-grid">
              <div>
                <nav className="blog-breadcrumb" aria-label="Breadcrumb"><a href="/blog">Resources</a><span>›</span><span>{article.category}</span></nav>
                <p className="eyebrow">TRADIERELAY FIELD GUIDE · {String(article.number).padStart(2, '0')}</p>
                <h1>{article.title}</h1>
                <p className="blog-article-deck">{article.description}</p>
                <div className="blog-article-meta"><span>{article.readMinutes} minute read</span><span>Updated 30 August 2026</span><span>Australian context</span></div>
              </div>
              <Image src={article.heroImage} alt={article.heroAlt} width={1200} height={800} priority style={{ objectPosition: article.heroPosition || 'center' }} />
            </div>
          </header>

          <div className="shell blog-article-layout">
            <aside className="blog-article-aside">
              <strong>IN THIS GUIDE</strong>
              <a href="#short-answer">Short answer</a>
              {article.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{section.heading}</a>)}
              <a href="#faqs">Common questions</a>
            </aside>
            <div className="blog-article-body">
              <section className="blog-answer-box" id="short-answer"><span>SHORT ANSWER</span><p>{article.directAnswer}</p></section>
              <div className="blog-key-points">{article.keyPoints.map((point) => <div key={point}><span>✓</span><p>{point}</p></div>)}</div>
              {article.sections.map((section, index) => (
                <section className="blog-copy-section" id={`section-${index + 1}`} key={section.heading}>
                  {!/^\d\./.test(section.heading) && <span className="blog-section-number">{String(index + 1).padStart(2, '0')}</span>}<h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  {section.callout && <div className="blog-callout"><strong>{section.callout.label}</strong><p>{section.callout.text}</p></div>}
                </section>
              ))}
              <figure className="blog-field-figure">
                <Image src={article.secondaryImage} alt={article.secondaryAlt} width={1400} height={900} />
                <figcaption>{article.secondaryCaption}</figcaption>
              </figure>
              <section className="blog-example"><span>WORKED EXAMPLE</span><h2>{article.example.title}</h2><p>{article.example.text}</p></section>
              <figure className="blog-product-figure"><div className="blog-product-frame"><div className="blog-demo-label">WORKING DEMO · FAKE DATA</div><ProductVisual article={article} /></div><figcaption>{article.productCaption}</figcaption></figure>
              {article.table && <section className="blog-data-block"><h2>At a glance</h2><div className="blog-table-wrap"><table><thead><tr>{article.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{article.table.rows.map((row) => <tr key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>}
              {article.checklist && <section className="blog-checklist"><p className="eyebrow">USE THIS CHECKLIST</p><h2>Put it into practice</h2>{article.checklist.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</section>}
              <section className="blog-faqs" id="faqs"><p className="eyebrow">COMMON QUESTIONS</p><h2>Quick answers</h2>{article.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</section>
              {article.sources && <section className="blog-sources"><strong>SOURCES &amp; FURTHER READING</strong>{article.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}</section>}
              {relatedArticles.length > 0 && <section className="blog-related"><p className="eyebrow">KEEP READING</p><h2>Related practical guides</h2><div>{relatedArticles.map((related) => <a href={`/blog/${related.slug}`} key={related.slug}><span>{String(related.number).padStart(2, '0')}</span><strong>{related.title}</strong><b>→</b></a>)}</div></section>}
              <section className="blog-article-cta"><span>NEXT STEP</span><h2>See how this would handle one of your calls.</h2><p>Noah can map your current number, your rules and the exact hand-off you want.</p><a className="button" href="/book">Book a 15-minute call</a></section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
