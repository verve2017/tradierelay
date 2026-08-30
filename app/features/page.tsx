import Image from 'next/image';
import { CtaBand } from '@/components/cta-band';
import { ProductScreen } from '@/components/product-screen';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Features in action',
  'See exactly what every TradieRelay feature does, what the customer experiences and what stays under the tradie’s control.',
  '/features',
);

const callFeatures = [
  {
    id: 'ai-phone-reception',
    number: '01',
    title: 'AI phone reception',
    plain: 'When a call follows the rule you chose—missed, busy, overflow or after hours—the assistant answers using your business name and clearly says it is automated.',
    customer: 'They can explain the job straight away instead of reaching a dead-end voicemail.',
    tradie: 'A call record and useful next step without stopping the job in front of you.',
    control: 'The greeting, hours, transfer rules, approved answers and anything the assistant must never promise.',
  },
  {
    id: 'your-call-rules',
    number: '02',
    title: 'Your call rules',
    plain: 'TradieRelay follows a written rulebook for your service area, job types, opening hours, preferred work, exclusions and hand-offs.',
    customer: 'A clear answer that matches how your business actually works.',
    tradie: 'Fewer unsuitable enquiries and fewer awkward promises to unwind later.',
    control: 'Every live rule. Nothing changes because the AI “felt like it”.',
  },
  {
    id: 'lead-qualification',
    number: '03',
    title: 'Lead qualification',
    plain: 'The assistant collects the caller’s name, callback number, suburb, job type, plain-English problem, urgency, timing and any evidence your flow needs.',
    customer: 'They tell the story once and know what happens next.',
    tradie: 'Enough detail to decide whether to call, book, quote, route or politely decline.',
    control: 'Which questions are asked, what counts as a fit and when uncertainty goes to a person.',
  },
  {
    id: 'hot-lead-alerts',
    number: '04',
    title: 'Hot lead alerts',
    plain: 'When an enquiry matches the urgency and fit rules you approved, a short alert lands with the important details already pulled out.',
    customer: 'A quicker response from the right person.',
    tradie: 'Who called, where they are, what is wrong, why it is urgent and the requested next step.',
    control: 'What earns a hot label, who receives it and what happens if the first person does not respond.',
  },
];

const workflowFeatures = [
  {
    id: 'quote-follow-up-flow',
    number: '05',
    title: 'Quote follow-up flow',
    plain: 'After a quote is marked as sent, TradieRelay sends the agreed check-ins, sorts the reply and stops when the customer books, declines, opts out or reaches the follow-up limit.',
    customer: 'A useful reminder and an easy way to ask a question—not the same “just following up” text five times.',
    tradie: 'Questions, objections and ready-to-book replies surfaced with the quote context.',
    control: 'Timing, wording, maximum attempts, stop conditions and every message that needs human approval.',
  },
  {
    id: 'multi-person-call-routing',
    number: '06',
    title: 'Multi-person call routing',
    plain: 'Different enquiries can go to different people or teams based on the rules you set—then follow a fallback if nobody takes it.',
    customer: 'They reach the person most likely to help without being bounced around blindly.',
    tradie: 'The right lead reaches the right estimator, office person, technician or owner.',
    control: 'Routing order, working hours, fallback person, transfer limits and when to take a message instead.',
  },
  {
    id: 'different-job-type-rules',
    number: '07',
    title: 'Different job-type rules',
    plain: 'An emergency leak should not follow the same questions as a bathroom quote. Each job type can have its own questions, fit checks, urgency rules and next step.',
    customer: 'A shorter, more relevant conversation.',
    tradie: 'Better information without making every caller sit through every question.',
    control: 'Which job types exist, what each flow asks and which jobs are escalated, booked or declined.',
  },
];

const serviceFeatures = [
  {
    id: 'priority-setup-support',
    number: '08',
    title: 'Priority setup support',
    plain: 'Noah personally maps your call flow, chases the information needed to finish it and keeps your launch moving ahead of standard setup work.',
    outcome: 'You know who owns the setup and who to call when a rule is unclear.',
    boundary: 'Priority means a faster, named setup path. It does not mean unsafe changes go live without testing.',
  },
  {
    id: 'higher-included-usage',
    number: '09',
    title: 'Higher included usage',
    plain: 'The Crew plan includes a larger agreed pool of answered call time, messages and active follow-up work before extra usage applies.',
    outcome: 'A growing team can handle more enquiries without treating every extra call as a surprise bill.',
    boundary: 'It is not “unlimited”. Your allowance and any extra-use rate are written into the proposal before launch.',
  },
  {
    id: 'fortnightly-optimisation',
    number: '10',
    title: 'Fortnightly optimisation',
    plain: 'Every two weeks, Noah and Jake review what callers asked, where the assistant handed off, which leads were useful and what created avoidable work.',
    outcome: 'The service gets clearer as real calls show what your customers actually need.',
    boundary: 'They recommend changes; you approve changes to live wording, qualification or routing rules.',
  },
];

type DefinedFeature = (typeof callFeatures)[number];

function DefinitionCard({ feature }: { feature: DefinedFeature }) {
  return (
    <article className="definition-card" id={feature.id}>
      <div className="definition-heading">
        <span>{feature.number}</span>
        <div><p>PLAIN ENGLISH</p><h3>{feature.title}</h3></div>
      </div>
      <p className="definition-plain">{feature.plain}</p>
      <div className="definition-answers">
        <div><strong>What the customer gets</strong><p>{feature.customer}</p></div>
        <div><strong>What lands with you</strong><p>{feature.tradie}</p></div>
        <div><strong>You stay in control of</strong><p>{feature.control}</p></div>
      </div>
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
            <p className="eyebrow">SEE THE SERVICE BEFORE YOU BUY</p>
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
          <div className="definition-grid">{callFeatures.map((feature) => <DefinitionCard feature={feature} key={feature.id} />)}</div>
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
          <div className="definition-grid definition-grid-three">{workflowFeatures.map((feature) => <DefinitionCard feature={feature} key={feature.id} />)}</div>
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
              <article id={feature.id} key={feature.id}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.plain}</p>
                <div><strong>What you get</strong><p>{feature.outcome}</p></div>
                <div><strong>The boundary</strong><p>{feature.boundary}</p></div>
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
