import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Pricing', 'Clear founding-customer pricing for TradieRelay missed-call recovery, AI receptionist and quote follow-up plans.', '/pricing');

const plans = [
  {
    name: 'Catch',
    price: '$399',
    setup: '$499 setup',
    description: 'For a sole trader who mainly needs missed calls caught quickly.',
    items: ['Missed-call response', 'Customer details captured', 'Hot lead alerts', 'Your call rules', 'Monthly tune-up'],
  },
  {
    name: 'Relay',
    price: '$699',
    setup: '$999 setup',
    description: 'For a busy trade business that wants reception and quote follow-up together.',
    items: ['Everything in Catch', 'AI phone reception', 'Lead qualification', 'Quote follow-up flow', 'Priority setup support'],
    featured: true,
  },
  {
    name: 'Crew',
    price: '$999',
    setup: '$1,499 setup',
    description: 'For a growing team with more calls, more routing and more than one person on the tools.',
    items: ['Everything in Relay', 'Multi-person call routing', 'Different job-type rules', 'Higher included usage', 'Fortnightly optimisation'],
  },
];

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="FOUNDING CUSTOMER PRICING"
        title="Cost less than one decent job."
        body="Clear monthly plans for the Gold Coast pilot. We start with the smallest setup that can recover real work for your business."
        note="No long-term lock-in during the pilot"
      />

      <section className="section pricing-section">
        <div className="shell pricing-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={`price-card${plan.featured ? ' price-featured' : ''}`}>
              {plan.featured && <span className="popular-tag">MOST USEFUL FOR BUSY TRADIES</span>}
              <p className="plan-name">{plan.name}</p>
              <div className="price"><strong>{plan.price}</strong><span>/month + GST</span></div>
              <p className="setup-price">{plan.setup} + GST</p>
              <p className="plan-description">{plan.description}</p>
              <ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
              <a href="/book" className={`button ${plan.featured ? '' : 'button-outline'}`}>Talk through this plan</a>
            </article>
          ))}
        </div>
        <div className="shell usage-note">
          <strong>About usage</strong>
          <p>Each plan includes an agreed allowance based on your normal call volume. If usage changes, we tell you before the bill does. Exact inclusions are confirmed in the setup call.</p>
        </div>
        <div className="shell plan-comparison">
          <div className="section-heading"><p className="eyebrow">PLAN DETAIL</p><h2>Compare what is actually configured.</h2></div>
          <div className="comparison-table" role="table" aria-label="TradieRelay plan comparison">
            <div className="comparison-row comparison-head" role="row"><strong role="columnheader">Included</strong><strong role="columnheader">Catch</strong><strong role="columnheader">Relay</strong><strong role="columnheader">Crew</strong></div>
            {[
              ['Primary workflow', 'Missed calls', 'Reception + quotes', 'Multi-route reception'],
              ['Routing modes', '1', 'Up to 2', 'Up to 4'],
              ['People or teams routed', '1', 'Up to 3', 'Up to 8'],
              ['Quote follow-up', '—', '1 sequence', 'Up to 3 sequences'],
              ['Business-rule review', 'Monthly', 'Monthly', 'Fortnightly'],
              ['Lead summary format', 'Standard', 'Custom', 'Custom by route'],
              ['Pre-launch test pack', 'Core', 'Expanded', 'Expanded + team routes'],
              ['Pilot review', '14 days', '14 days', '14 days'],
            ].map((row) => <div className="comparison-row" role="row" key={row[0]}>{row.map((cell, index) => index === 0 ? <strong role="cell" key={cell}>{cell}</strong> : <span role="cell" key={`${row[0]}-${index}`}>{cell}</span>)}</div>)}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell included-grid">
          <div><p className="eyebrow">EVERY PLAN INCLUDES</p><h2>A setup that sounds like your business.</h2></div>
          <div className="included-list">
            <div><span>01</span><p><strong>Call-flow workshop</strong>We map the questions, boundaries and hand-offs with you.</p></div>
            <div><span>02</span><p><strong>Testing before launch</strong>You hear how it behaves before a customer does.</p></div>
            <div><span>03</span><p><strong>Plain-English support</strong>No ticket maze. Noah owns your setup and feedback.</p></div>
            <div><span>04</span><p><strong>Changes as you learn</strong>We tune the rules using real conversations from the pilot.</p></div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div><p className="eyebrow">PRICING QUESTIONS</p><h2>No surprises in the fine print.</h2></div>
          <div className="faq-list">
            <details><summary>Why is there a setup fee?</summary><p>The useful part is not a generic bot. We map your jobs, rules, hand-offs and tone, then test the flow before launch.</p></details>
            <details><summary>Can I change plans?</summary><p>Yes. Start narrow, prove the value and change the plan when your call volume or team changes.</p></details>
            <details><summary>Is there a contract?</summary><p>The founding pilot has no long-term lock-in. Final service terms are reviewed with you before you start.</p></details>
            <details><summary>Can I try missed calls first?</summary><p>Yes. That is the recommended starting point for most sole traders.</p></details>
          </div>
        </div>
      </section>

      <section className="section price-confidence-section">
        <div className="shell price-confidence-grid">
          <div><p className="eyebrow light">BEFORE YOU PAY</p><h2>The scope is written down.</h2><p>Noah confirms the routing mode, live features, usage allowance, setup work, support rhythm and anything your current tools cannot support.</p></div>
          <div className="price-confidence-list"><span>One agreed pilot problem</span><span>Named workflow owner</span><span>Approved test checklist</span><span>Documented fallback</span><span>14-day keep/change review</span><span>No silent overage</span></div>
        </div>
      </section>

      <CtaBand title="Not sure which plan fits?" body="Bring your rough weekly call volume and the biggest phone headache. Noah will recommend the smallest sensible starting point." />
      <SiteFooter />
    </main>
  );
}
