import Image from 'next/image';
import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';
import { tradePages } from '@/lib/trades';

export const metadata = pageMetadata('AI receptionist for Australian trade businesses', 'See trade-specific missed-call recovery and quote follow-up flows for plumbers, electricians, air conditioning, carpenters, painters and landscapers.', '/trades');

export default function TradesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="BUILT FOR TRADE BUSINESSES" title="The same engine. Different questions and boundaries." body="A plumber’s urgent call should not sound like a landscaper’s project enquiry. Open your trade to see the calls, questions, evidence, quote follow-up and safety boundaries in detail." note="Six complete trade flows—other trades can be scoped during the pilot call" />
      <section className="section trades-section">
        <div className="shell trades-grid">
          {tradePages.map((trade, index) => (
            <article key={trade.name}>
              <div className="trade-card-head"><span>{String(index + 1).padStart(2, '0')}</span><h2><a href={`/trades/${trade.slug}`}>{trade.name}</a></h2></div>
              <a href={`/trades/${trade.slug}`} className="trade-thumbnail" aria-label={`See TradieRelay for ${trade.name}`}><Image src={trade.image} alt={trade.imageAlt} fill sizes="(max-width: 680px) calc(100vw - 52px), (max-width: 1240px) 45vw, 550px" /></a>
              <p className="trade-line">{trade.cardLine}</p>
              <strong>USEFUL QUESTIONS</strong>
              <ul>{trade.cardQuestions.map((question) => <li key={question}><span>✓</span>{question}</li>)}</ul>
              <div className="trade-boundary"><small>BOUNDARY</small><p>{trade.boundary}</p></div>
              <a href={`/trades/${trade.slug}`} className="trade-card-link">Explore the {trade.shortName.toLowerCase()} flow <span>→</span></a>
            </article>
          ))}
        </div>
      </section>
      <section className="section fit-section">
        <div className="shell fit-grid"><div><p className="eyebrow light">BEST FIT</p><h2>TradieRelay works best when the calls repeat.</h2></div><div><p>It is a strong fit when customers ask similar first questions, job suitability can be described clearly and missed response time is costing work.</p><p>It is a poor fit when nearly every call requires immediate licensed judgement, the business cannot define its service boundaries, or nobody is responsible for acting on the lead summaries.</p></div></div>
      </section>
      <CtaBand title="Show us the calls your trade gets." body="Noah will identify the repeatable questions, the judgement calls and whether there is a useful pilot at all." />
      <SiteFooter />
    </main>
  );
}
