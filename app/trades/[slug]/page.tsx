/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getTrade, tradePages } from '@/lib/trades';

const origin = 'https://tradie-relay.verve-9089.chatgpt.site';

type TradePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tradePages.map((trade) => ({ slug: trade.slug }));
}

export async function generateMetadata({ params }: TradePageProps): Promise<Metadata> {
  const { slug } = await params;
  const trade = getTrade(slug);
  if (!trade) return {};

  const url = `${origin}/trades/${trade.slug}`;
  return {
    title: trade.metaTitle,
    description: trade.metaDescription,
    alternates: { canonical: url },
    keywords: [
      `AI receptionist for ${trade.name.toLowerCase()}`,
      `${trade.shortName.toLowerCase()} answering service Australia`,
      `${trade.shortName.toLowerCase()} missed call service`,
      `${trade.shortName.toLowerCase()} quote follow up`,
      'Tradie AI receptionist',
    ],
    openGraph: {
      title: `${trade.metaTitle} — TradieRelay`,
      description: trade.metaDescription,
      url,
      siteName: 'TradieRelay',
      type: 'website',
      locale: 'en_AU',
      images: [{ url: trade.image, width: 1200, height: 800, alt: trade.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${trade.metaTitle} — TradieRelay`,
      description: trade.metaDescription,
      images: [trade.image],
    },
  };
}

export default async function TradeDetailPage({ params }: TradePageProps) {
  const { slug } = await params;
  const trade = getTrade(slug);
  if (!trade) notFound();

  const url = `${origin}/trades/${trade.slug}`;
  const relatedTrades = tradePages.filter((item) => item.slug !== trade.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: trade.metaTitle,
        description: trade.metaDescription,
        inLanguage: 'en-AU',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.trade-fast-answer p', '.trade-detail-faq'],
        },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `TradieRelay for ${trade.name}`,
        serviceType: `AI receptionist and quote follow-up for ${trade.name.toLowerCase()}`,
        description: trade.quickAnswer,
        provider: { '@type': 'Organization', name: 'TradieRelay', url: origin },
        areaServed: { '@type': 'Country', name: 'Australia' },
        audience: { '@type': 'BusinessAudience', audienceType: `Australian ${trade.name.toLowerCase()}` },
        url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: trade.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
          { '@type': 'ListItem', position: 2, name: 'Trades', item: `${origin}/trades` },
          { '@type': 'ListItem', position: 3, name: trade.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className="trade-detail-page">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />

      <section className="trade-detail-hero">
        <div className="shell trade-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span>›</span><a href="/trades">Trades</a><span>›</span><strong>{trade.name}</strong>
        </div>
        <div className="shell trade-detail-hero-grid">
          <div className="trade-detail-hero-copy">
            <p className="eyebrow">AI RECEPTIONIST FOR AUSTRALIAN {trade.name.toUpperCase()}</p>
            <h1>{trade.heroTitle}</h1>
            <p className="trade-detail-lede">{trade.heroBody}</p>
            <div className="hero-actions">
              <a href={`/book?trade=${trade.slug}`} className="button">Map my missed-call flow</a>
              <a href="#how-it-works-for-this-trade" className="text-link">See the exact details <span>↓</span></a>
            </div>
            <ul className="quick-proof">
              <li><span>✓</span>Starts with missed or after-hours calls</li>
              <li><span>✓</span>Your questions and boundaries</li>
              <li><span>✓</span>Human-approved quotes</li>
            </ul>
          </div>
          <figure className="trade-detail-visual">
            <Image src={trade.image} alt={trade.imageAlt} fill priority sizes="(max-width: 900px) calc(100vw - 48px), 560px" />
            <figcaption>
              <span className="status-dot" />
              <div><strong>{trade.heroAlert}</strong><small>Summary, evidence and next step ready</small></div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="trade-answer-section">
        <div className="shell trade-fast-answer">
          <div><span>SHORT ANSWER</span><h2>What is TradieRelay for {trade.name.toLowerCase()}?</h2></div>
          <p>{trade.quickAnswer}</p>
        </div>
      </section>

      <section className="section trade-pain-section">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">THE COSTLY GAP</p>
            <h2>The work does not pause when the phone rings.</h2>
            <p>TradieRelay handles the repeatable first step so the person doing the skilled work can decide with context.</p>
          </div>
          <div className="trade-pain-grid">
            {trade.painPoints.map((point, index) => (
              <article key={point.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{point.title}</h3><p>{point.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trade-call-types" id="how-it-works-for-this-trade">
        <div className="shell">
          <div className="detail-intro">
            <div><p className="eyebrow">CALLS IT CAN SORT</p><h2>Different jobs get different questions.</h2></div>
            <p>The flow is configured around the work you want, the calls that need attention and the promises an automated assistant must never make.</p>
          </div>
          <div className="trade-use-grid">
            {trade.callTypes.map((item) => (
              <article key={item.title}><span aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trade-question-section">
        <div className="shell trade-question-layout">
          <div className="trade-question-copy">
            <p className="eyebrow light">THE USEFUL QUESTIONS</p>
            <h2>Enough detail to choose the next move.</h2>
            <p>These are example fields. Your live flow uses the shortest set that gives your business a useful decision.</p>
            <a href="/call-flow" className="button">See the full call flow</a>
          </div>
          <ol className="trade-question-grid">
            {trade.questions.map((question, index) => (
              <li key={question}><span>{String(index + 1).padStart(2, '0')}</span><p>{question}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section trade-example-section">
        <div className="shell">
          <div className="detail-intro">
            <div><p className="eyebrow">WHAT LANDS WITH THE TRADIE</p><h2>A job tile—not another mystery missed call.</h2></div>
            <p>The summary keeps the caller’s own words, structured fields, urgency reason, evidence and requested next action together.</p>
          </div>
          <div className="trade-example-grid">
            <article className="trade-lead-card">
              <div className="trade-lead-top"><span>QUALIFIED {trade.shortName.toUpperCase()} ENQUIRY</span><strong>{trade.example.urgency}</strong></div>
              <h3>{trade.example.customer}</h3>
              <p className="trade-lead-location">{trade.example.suburb}</p>
              <dl>
                <div><dt>Job</dt><dd>{trade.example.job}</dd></div>
                <div><dt>Caller said</dt><dd>{trade.example.description}</dd></div>
                <div><dt>Evidence</dt><dd>{trade.example.evidence}</dd></div>
                <div><dt>Next step</dt><dd>{trade.example.nextStep}</dd></div>
              </dl>
              <div className="trade-lead-actions"><span>Call customer</span><span>Review photos</span><b>Choose next step →</b></div>
            </article>
            <figure className="trade-photo-proof">
              <Image src="/app-screens/customer-photo-tile.png" alt="TradieRelay working prototype showing a customer job photo attached to the matching dashboard tile" width={640} height={500} />
              <figcaption><strong>Customer photo attached</strong><span>The text link tells the caller where to upload. The image stays with the matching job.</span></figcaption>
            </figure>
          </div>
          <p className="prototype-disclaimer">Working product prototype shown with fake demonstration data. Live fields and wording are approved during setup.</p>
        </div>
      </section>

      <section className="section trade-quote-section">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">AFTER THE QUOTE</p>
            <h2>Follow-up moves the decision without taking over your judgement.</h2>
          </div>
          <div className="trade-quote-grid">
            {trade.quoteSteps.map((step, index) => (
              <article key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trade-boundary-section">
        <div className="shell trade-boundary-panel">
          <div><p className="eyebrow light">THE SAFETY BOUNDARY</p><h2>Automation handles the repeatable work. The {trade.singular} keeps the judgement.</h2></div>
          <p>{trade.boundary}</p>
        </div>
      </section>

      <section className="section trade-detail-faq" id="frequently-asked-questions">
        <div className="shell faq-grid">
          <div><p className="eyebrow">QUESTIONS {trade.name.toUpperCase()} ASK</p><h2>Clear answers before you hand over the phone.</h2></div>
          <div className="faq-list">
            {trade.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="section related-trades-section">
        <div className="shell">
          <div className="related-trades-heading"><div><p className="eyebrow">OTHER TRADE FLOWS</p><h2>See how the questions change.</h2></div><a href="/trades" className="text-link">View all trades <span>→</span></a></div>
          <div className="related-trades-grid">
            {relatedTrades.map((item) => (
              <a href={`/trades/${item.slug}`} key={item.slug}>
                <figure><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 1040px) 45vw, 220px" /></figure>
                <div><strong>{item.name}</strong><span>See the call flow →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band-inner">
          <div><p className="eyebrow light">MAP YOUR REAL CALLS</p><h2>Show Noah one {trade.shortName.toLowerCase()} call you wish had been handled better.</h2><p>He will map the smallest safe missed-call flow and tell you whether a founding pilot is worth testing.</p></div>
          <a href={`/book?trade=${trade.slug}`} className="button">Book a 15-min call</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
