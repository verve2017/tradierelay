/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/cta-band';
import { ProductScreen } from '@/components/product-screen';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { featurePages, getFeature, type FeaturePage } from '@/lib/features';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featurePages.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};

  const url = `${origin}/features/${feature.slug}`;
  return {
    title: feature.metaTitle,
    description: feature.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${feature.metaTitle} — TradieRelay`,
      description: feature.metaDescription,
      url,
      siteName: 'TradieRelay',
      type: 'article',
      locale: 'en_AU',
      images: [{ url: feature.heroImage, width: 1200, height: 800, alt: feature.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${feature.metaTitle} — TradieRelay`,
      description: feature.metaDescription,
      images: [feature.heroImage],
    },
  };
}

function FeatureVisual({ feature }: { feature: FeaturePage }) {
  const visual = feature.productVisual;
  return (
    <figure className={`feature-detail-product${visual.kind === 'image' && visual.portrait ? ' is-portrait' : ''}`}>
      <div className="feature-detail-product-bar"><i /><i /><i /><span>TRADIERELAY · WORKING PRODUCT</span></div>
      <div className="feature-detail-product-stage">
        {visual.kind === 'screen' ? (
          <ProductScreen type={visual.screen} />
        ) : (
          <Image src={visual.src} alt={visual.alt} width={visual.portrait ? 430 : 1280} height={visual.portrait ? 932 : 720} sizes="(max-width: 900px) 100vw, 560px" />
        )}
      </div>
      <figcaption><span>{visual.label}</span><strong>{visual.caption}</strong></figcaption>
    </figure>
  );
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const url = `${origin}/features/${feature.slug}`;
  const related = feature.relatedSlugs.map(getFeature).filter((item): item is FeaturePage => Boolean(item));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: feature.metaTitle, description: feature.metaDescription, inLanguage: 'en-AU' },
      { '@type': 'Service', '@id': `${url}#service`, name: feature.name, serviceType: `${feature.name} for Australian trade businesses`, description: feature.shortAnswer, provider: { '@type': 'Organization', name: 'TradieRelay', url: origin }, areaServed: { '@type': 'Country', name: 'Australia' } },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: feature.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
        { '@type': 'ListItem', position: 2, name: 'All features', item: `${origin}/features` },
        { '@type': 'ListItem', position: 3, name: feature.name, item: url },
      ] },
    ],
  };

  return (
    <main className="feature-detail-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <section className="feature-detail-hero">
        <div className="shell feature-breadcrumbs"><a href="/">Home</a><span>›</span><a href="/features">All features</a><span>›</span><strong>{feature.name}</strong></div>
        <div className="shell feature-detail-hero-grid">
          <div className="feature-detail-hero-copy">
            <p className="eyebrow">FEATURE {feature.number} · {feature.category.toUpperCase()}</p>
            <h1>{feature.heroTitle}</h1>
            <p>{feature.heroBody}</p>
            <div className="hero-actions"><a href="/app/demo" className="button">Try the working software</a><a href="/book" className="text-link">Map it with Noah <span>→</span></a></div>
            <ul className="quick-proof"><li><span>✓</span>Your wording</li><li><span>✓</span>Your rules</li><li><span>✓</span>Human-controlled promises</li></ul>
          </div>
          <figure className="feature-detail-hero-visual">
            <Image src={feature.heroImage} alt={feature.heroImageAlt} fill priority sizes="(max-width: 900px) calc(100vw - 48px), 560px" />
            <figcaption><span>{feature.number}</span><div><strong>{feature.name}</strong><small>{feature.menuLine}</small></div></figcaption>
          </figure>
        </div>
      </section>

      <section className="feature-answer-section"><div className="shell feature-fast-answer"><div><span>SHORT ANSWER</span><h2>What does {feature.name.toLowerCase()} do?</h2></div><p>{feature.shortAnswer}</p></div></section>

      <section className="section feature-problem-section">
        <div className="shell feature-problem-layout"><div><p className="eyebrow">THE PROBLEM IT REMOVES</p><h2>{feature.painTitle}</h2><p>{feature.painBody}</p></div><div className="feature-outcome-grid">{feature.outcomes.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div>
      </section>

      <section className="section feature-steps-section">
        <div className="shell"><div className="section-heading centered"><p className="eyebrow">HOW IT WORKS</p><h2>Four clear steps. No mystery behaviour.</h2></div><div className="feature-steps-grid">{feature.steps.map((step, index) => <article key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></div>
      </section>

      <section className="section feature-product-section">
        <div className="shell feature-product-grid"><div className="feature-product-copy"><p className="eyebrow light">WHAT YOU ACTUALLY SEE</p><h2>{feature.visualTitle}</h2><p>{feature.visualBody}</p><a href="/app/demo" className="button">Open the working demo</a></div><FeatureVisual feature={feature} /></div>
      </section>

      <section className="section feature-experience-section">
        <div className="shell"><div className="detail-intro"><div><p className="eyebrow">CUSTOMER EXPERIENCE</p><h2>Clear for the caller. Useful for the tradie.</h2></div><p>The feature is judged by the hand-off it creates, not by how clever the automation sounds.</p></div><div className="feature-experience-grid">{feature.customerExperience.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div></div>
      </section>

      <section className="section feature-control-section">
        <div className="shell feature-control-grid"><div><p className="eyebrow light">YOU STAY IN CONTROL</p><h2>The live setup follows written rules.</h2><p>{feature.overview.control}</p></div><ul>{feature.controls.map((control) => <li key={control}><span>✓</span>{control}</li>)}</ul></div>
      </section>

      <section className="section feature-example-section">
        <div className="shell"><div className="section-heading"><p className="eyebrow">WORKED EXAMPLE · {feature.example.trade.toUpperCase()}</p><h2>{feature.example.situation}</h2></div><div className="feature-example-flow"><article><span>CUSTOMER</span><p>{feature.example.customer}</p></article><b aria-hidden="true">→</b><article><span>RELAY</span><p>{feature.example.relay}</p></article><b aria-hidden="true">→</b><article><span>TRADIE</span><p>{feature.example.tradie}</p></article></div></div>
      </section>

      <section className="section feature-boundary-section"><div className="shell feature-boundary-panel"><div><p className="eyebrow light">THE BOUNDARY</p><h2>Automation with a short leash.</h2></div><p>{feature.boundary}</p></div></section>

      <section className="section feature-detail-faq" id="frequently-asked-questions"><div className="shell faq-grid"><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Before this feature goes live.</h2></div><div className="faq-list">{feature.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      {related.length > 0 && <section className="section related-features-section"><div className="shell"><div className="related-features-heading"><div><p className="eyebrow">RELATED FEATURES</p><h2>See how the pieces connect.</h2></div><a href="/features" className="text-link">View all features <span>→</span></a></div><div className="related-features-grid">{related.map((item) => <a href={`/features/${item.slug}`} key={item.slug}><span>{item.number}</span><strong>{item.name}</strong><p>{item.menuLine}</p><em>Open feature →</em></a>)}</div></div></section>}

      <CtaBand title={`See ${feature.name.toLowerCase()} on one of your real enquiries.`} body="Bring Noah a recent missed call, quote or routing problem. He will map the smallest useful version and show where the human stays in control." />
      <SiteFooter />
    </main>
  );
}
