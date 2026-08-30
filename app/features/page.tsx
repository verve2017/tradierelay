import Image from 'next/image';
import { CtaBand } from '@/components/cta-band';
import { ProductScreen } from '@/components/product-screen';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { featurePages, type FeaturePage } from '@/lib/features';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'All features',
  'See exactly what every TradieRelay feature does, what the customer experiences and what stays under the tradie’s control.',
  '/features',
);

const callFeatures = featurePages.filter((feature) => feature.category === 'Calls');
const workflowFeatures = featurePages.filter((feature) => feature.category === 'Workflow');
const serviceFeatures = featurePages.filter((feature) => feature.category === 'Service');

function DefinitionCard({ feature }: { feature: FeaturePage }) {
  return (
    <article className="definition-card" id={feature.slug}>
      <div className="definition-heading">
        <span>{feature.number}</span>
        <div><p>PLAIN ENGLISH</p><h3>{feature.name}</h3></div>
      </div>
      <p className="definition-plain">{feature.overview.plain}</p>
      <div className="definition-answers">
        <div><strong>What the customer gets</strong><p>{feature.overview.customer}</p></div>
        <div><strong>What lands with you</strong><p>{feature.overview.tradie}</p></div>
        <div><strong>You stay in control of</strong><p>{feature.overview.control}</p></div>
      </div>
      <a className="definition-detail-link" href={`/features/${feature.slug}`}>See the complete feature <span>→</span></a>
    </article>
  );
}

export default function FeaturesPage() {
  return (
    <main>
      <SiteHeader />

      <section className="feature-hero">
        <div className="shell feature-hero-grid">
          <div>
            <p className="eyebrow">ALL FEATURES · SEE THE SERVICE BEFORE YOU BUY</p>
            <h1>A tick on a pricing page doesn’t tell you what happens after the phone rings.</h1>
            <p className="feature-hero-lede">You do not need another tech list. You need to know what the customer hears, what lands with you and what TradieRelay will never decide without you.</p>
            <div className="hero-actions">
              <a href="/app/demo" className="button">Try the working software</a>
              <a href="/book" className="text-link">Talk it through with Noah <span>→</span></a>
            </div>
            <p className="prototype-note"><span>✓</span> Screens below use fake demo data. Your live wording and rules are approved by you.</p>
          </div>
          <div className="feature-hero-screen" aria-label="TradieRelay qualified lead preview">
            <ProductScreen type="lead" />
            <div className="screen-callout screen-callout-top"><strong>Caller sorted</strong><span>Job, suburb and urgency captured</span></div>
            <div className="screen-callout screen-callout-bottom"><strong>You choose</strong><span>Book, quote, call back or decline</span></div>
          </div>
        </div>
      </section>

      <section className="feature-plan-strip">
        <div className="shell feature-plan-grid">
          <article><span>1</span><div><strong>The customer calls</strong><p>Your normal routing rule decides when TradieRelay answers.</p></div></article>
          <article><span>2</span><div><strong>The useful details are collected</strong><p>Your questions and boundaries shape the conversation.</p></div></article>
          <article><span>3</span><div><strong>You get the decision—not the admin</strong><p>The right person receives a clear next action.</p></div></article>
        </div>
      </section>

      <section className="section app-screens-section" id="app-screens">
        <div className="shell">
          <div className="detail-intro screen-intro">
            <div><p className="eyebrow">LIVE PRODUCT PREVIEWS · FAKE DATA</p><h2>See what “handled” actually looks like.</h2></div>
            <p>These previews are rendered from the working interface, so every word stays sharp. The customer gets a quick response and you get a short decision screen—using fake names and jobs, never invented customer results.</p>
          </div>
          <div className="app-screen-grid">
            <article>
              <div className="app-screen-frame"><ProductScreen type="alert" /></div>
              <div className="app-screen-copy"><span>01 · HOT LEAD ALERT</span><h3>No more “missed call” with no clue.</h3><p>The alert tells you who called, the job, suburb, urgency, preferred timing and whether evidence is attached.</p><a href="#hot-lead-alerts">Exactly what this feature does →</a></div>
            </article>
            <article>
              <div className="app-screen-frame"><ProductScreen type="lead" /></div>
              <div className="app-screen-copy"><span>02 · QUALIFIED JOB</span><h3>Make the call-back decision quickly.</h3><p>See the caller’s own words, job type, location, urgency, preferred times and recording before deciding the next step.</p><a href="#lead-qualification">Exactly what this feature does →</a></div>
            </article>
            <article>
              <div className="app-screen-frame"><ProductScreen type="pipeline" /></div>
              <div className="app-screen-copy"><span>03 · ACTION PIPELINE</span><h3>See what needs you—and ignore the rest.</h3><p>Jobs sit under Needs you, Waiting on customer or Booked. Quote status stays with the job instead of disappearing into texts.</p><a href="#quote-follow-up-flow">Exactly what this feature does →</a></div>
            </article>
          </div>
          <p className="prototype-disclaimer">Product prototype shown with fake demonstration data. Final screens may change as the founding pilot is tested.</p>
        </div>
      </section>

      <section className="section definitions-section">
        <div className="shell">
          <div className="definition-group-heading">
            <div><p className="eyebrow">WHEN THE PHONE RINGS</p><h2>Calls are answered by your rules—not a mystery bot.</h2></div>
            <p>These four features work together. Reception starts the conversation, your rules set the boundaries, qualification gathers the useful facts and the alert tells the right person what to do.</p>
          </div>
          <div className="definition-grid">{callFeatures.map((feature) => <DefinitionCard feature={feature} key={feature.slug} />)}</div>
        </div>
      </section>

      <section className="section page-visual-break page-visual-break-dark" aria-labelledby="feature-visual-heading">
        <div className="shell">
          <div className="page-visual-heading">
            <div><p className="eyebrow light">FROM CALL TO DECISION</p><h2 id="feature-visual-heading">The software gives the team something they can act on.</h2></div>
            <p>Relay does not replace the trade decision. It removes the hunting, replaying and retyping that happens before it.</p>
          </div>
          <div className="page-visual-grid">
            <figure className="page-visual-card page-visual-photo">
              <Image src="/blog/trade-team-reviewing-quote-results.webp" alt="Australian trade team reviewing customer enquiries and quote results together" width={1200} height={800} sizes="(max-width: 900px) 100vw, 50vw" />
              <figcaption><span>THE TEAM VIEW</span><strong>Everyone works from the same job and next step.</strong></figcaption>
            </figure>
            <figure className="page-visual-card page-visual-screenshot">
              <Image src="/blog/tradierelay-quote-editor-v2.png" alt="TradieRelay working quote editor with saved items, quantities and customer notes" width={1280} height={720} sizes="(max-width: 900px) 100vw, 50vw" />
              <figcaption><span>WORKING PRODUCT · FAKE DATA</span><strong>Build the quote from the captured job without starting again.</strong></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section definitions-section workflow-definition-section">
        <div className="shell">
          <div className="definition-group-heading">
            <div><p className="eyebrow">AFTER THE FIRST CALL</p><h2>The follow-up keeps moving without losing your judgement.</h2></div>
            <p>TradieRelay can chase an answer and move information to the right person. It cannot choose your price, diagnose a job or invent a promise.</p>
          </div>
          <div className="definition-grid definition-grid-three">{workflowFeatures.map((feature) => <DefinitionCard feature={feature} key={feature.slug} />)}</div>
        </div>
      </section>

      <section className="section service-definition-section">
        <div className="shell">
          <div className="definition-group-heading light-heading">
            <div><p className="eyebrow light">THE PEOPLE BEHIND THE SOFTWARE</p><h2>Some valuable features are service—not buttons.</h2></div>
            <p>Setup support, included usage and optimisation do not need fake app screens. They need a clear promise, a named owner and a written boundary.</p>
          </div>
          <div className="service-definition-grid">
            {serviceFeatures.map((feature) => (
              <article id={feature.slug} key={feature.slug}>
                <span>{feature.number}</span>
                <h3>{feature.name}</h3>
                <p>{feature.overview.plain}</p>
                <div><strong>What you get</strong><p>{feature.overview.outcome}</p></div>
                <div><strong>The boundary</strong><p>{feature.overview.boundary}</p></div>
                <a className="service-detail-link" href={`/features/${feature.slug}`}>See the complete feature <span>→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section no-mystery-section">
        <div className="shell no-mystery-grid">
          <div><p className="eyebrow">WHAT THESE FEATURES DO NOT MEAN</p><h2>No guessing. No spam. No silent surprises.</h2><p>The quickest way to trust the service is to know where it stops.</p></div>
          <div className="boundary-list">
            <div><strong>AI reception</strong><span>does not diagnose, give trade advice or promise an attendance time unless you supplied that time.</span></div>
            <div><strong>Quote follow-up</strong><span>does not keep chasing after a decline, opt-out, booking or your approved limit.</span></div>
            <div><strong>Call routing</strong><span>does not trap a caller in automation when they ask for a person or the flow is uncertain.</span></div>
            <div><strong>Higher usage</strong><span>does not mean an unlimited blank cheque. The allowance and extra-use rate are agreed first.</span></div>
            <div><strong>Optimisation</strong><span>does not let us rewrite your live business rules without your approval.</span></div>
          </div>
        </div>
      </section>

      <section className="section feature-success-section">
        <div className="shell feature-success-grid">
          <div><p className="eyebrow light">THE RESULT</p><h2>Finish the job without wondering who slipped through.</h2></div>
          <div><p>Good enquiries are caught. Useful details are ready. Quotes get a proper next step. You spend your time deciding—not digging through missed calls and loose messages.</p><a href="/pricing" className="button">See which plan includes what</a></div>
        </div>
      </section>

      <CtaBand title="Bring us one real missed call." body="Noah will map it through the exact features your business needs—and leave out the ones that add no value." />
      <SiteFooter />
    </main>
  );
}
