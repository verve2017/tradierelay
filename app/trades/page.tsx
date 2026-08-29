import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Built for trade businesses', 'See how missed-call recovery and quote follow-up can be configured for electricians, plumbers, HVAC, builders, landscapers and property-service businesses.', '/trades');

const trades = [
  { name: 'Electricians', line: 'Sort urgent faults from planned work.', asks: ['Suburb and property type', 'Power status and visible issue', 'Emergency indicators using approved wording', 'Access and callback availability'], avoids: 'No remote electrical diagnosis or safety instruction.' },
  { name: 'Plumbers', line: 'Capture the leak, location and containment status.', asks: ['Suburb and affected fixture', 'Whether water is still flowing', 'What has been safely isolated', 'Photos and site access'], avoids: 'No diagnosis, repair instruction or attendance promise.' },
  { name: 'Air conditioning', line: 'Get the unit and symptom details before the callback.', asks: ['Home or commercial site', 'Unit type and model if known', 'Cooling, power or noise symptom', 'Preferred service timing'], avoids: 'No technical troubleshooting beyond approved basic checks.' },
  { name: 'Builders & renovations', line: 'Separate real project opportunities from vague price shopping.', asks: ['Project type and suburb', 'Stage, plans and target timing', 'Budget band if you choose to ask', 'Who owns the decision'], avoids: 'No ballpark quote or availability promise without approval.' },
  { name: 'Landscapers', line: 'Qualify area, scope and timing without a long site-call interruption.', asks: ['Property location and approximate area', 'New build, redesign or maintenance', 'Photos or plans available', 'Timing and access'], avoids: 'No design, material or price commitment.' },
  { name: 'Property services', line: 'Route recurring, urgent and tenant work to the right person.', asks: ['Agency, owner or tenant', 'Property and access contact', 'Job category and urgency', 'Work-order or approval reference'], avoids: 'No authority or cost assumption when approval is unclear.' },
];

export default function TradesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="BUILT FOR TRADE BUSINESSES" title="The same engine. Different questions and boundaries." body="A plumber’s urgent call should not sound like a landscaper’s project enquiry. Your flow is configured around the decisions your trade actually makes." note="Other trades can be scoped during the pilot call" />
      <section className="section trades-section">
        <div className="shell trades-grid">
          {trades.map((trade, index) => (
            <article key={trade.name}>
              <div className="trade-card-head"><span>{String(index + 1).padStart(2, '0')}</span><h2>{trade.name}</h2></div>
              <p className="trade-line">{trade.line}</p>
              <strong>USEFUL QUESTIONS</strong>
              <ul>{trade.asks.map((ask) => <li key={ask}><span>✓</span>{ask}</li>)}</ul>
              <div className="trade-boundary"><small>BOUNDARY</small><p>{trade.avoids}</p></div>
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
