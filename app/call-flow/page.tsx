import Image from 'next/image';
import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('The full call flow', 'See every step TradieRelay takes after a missed call, during an after-hours enquiry and while following up an open quote.', '/call-flow');

const callSteps = [
  ['01', 'Call rings', 'Your normal number rings first. TradieRelay only steps in under the routing rule you approve: no-answer, busy, overflow or after-hours.'],
  ['02', 'Clear introduction', 'The caller hears your business name and is told they are speaking with an automated assistant that can take the job details.'],
  ['03', 'Caller intent', 'The assistant establishes whether this is a new job, an existing booking, a quote question, a supplier call or something else.'],
  ['04', 'Job basics', 'It collects the caller’s name, callback number, suburb, job type and a plain-English description of what is happening.'],
  ['05', 'Urgency check', 'It asks only the urgency questions you approved. It does not diagnose, give trade advice or promise attendance.'],
  ['06', 'Fit check', 'Service area, job type, timing and any jobs you exclude are checked against your rules.'],
  ['07', 'Useful evidence', 'Where your setup allows it, the customer is asked to send photos, model details or access notes by text.'],
  ['08', 'Next step', 'The caller is told what will happen next: a callback, a booking request, an urgent hand-off or a polite decline.'],
  ['09', 'Your summary', 'You receive a short structured summary with the caller, job, location, urgency, evidence and requested next action.'],
  ['10', 'Closed loop', 'The customer receives confirmation. If they reply or the status changes, the same enquiry stays together instead of creating another loose message.'],
];

const visualSteps = [
  ['01', '☎', 'Call rings', 'Your number rings first'],
  ['02', '✦', 'Relay answers', 'Missed, busy or after hours'],
  ['03', '▤', 'Job captured', 'Who, what, where and urgency'],
  ['04', '↗', 'Right next step', 'Callback, transfer or polite decline'],
  ['05', '✓', 'Lead lands', 'Summary, photos and what to do next'],
];

const quoteSteps = [
  ['DAY 0', 'Quote sent', 'The follow-up clock starts only after the quote is marked as sent.'],
  ['DAY 2–3', 'Useful check-in', 'A short message checks that the quote arrived and asks whether anything needs explaining.'],
  ['ON REPLY', 'Intent sorted', 'Interested, question, timing issue, price concern, already chosen someone else, or no longer proceeding.'],
  ['HAND-OFF', 'You get the decision point', 'Questions, objections and ready-to-book replies come to you with the quote context.'],
  ['STOP', 'No unwanted chasing', 'The sequence stops on a decline, opt-out, booking or the maximum follow-up count you approved.'],
];

export default function CallFlowPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="THE FULL CALL FLOW"
        title="Here is exactly what happens after you miss the call."
        body="No black box. Every question, branch, promise and hand-off is agreed before a real customer hears it."
        note="You approve the live script and rules"
      />

      <section className="section flow-overview-section">
        <div className="shell detail-intro">
          <div><p className="eyebrow">MISSED-CALL RECOVERY</p><h2>From missed call to useful lead.</h2></div>
          <p>Five clear stages. Your wording, service area and job rules are set up before Relay speaks to a customer.</p>
        </div>

        <div className="shell call-flow-visual" aria-label="TradieRelay missed-call recovery flow">
          <div className="call-flow-track">
            {visualSteps.map(([number, icon, title, body]) => (
              <article className="call-flow-stage" key={number}>
                <span className="call-flow-icon" aria-hidden="true">{icon}</span>
                <div><small>STEP {number}</small><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="call-flow-result">
            <span>THE RESULT</span>
            <strong>You know who called, what they need and what happens next.</strong>
            <div><b>✓ No phone-tree loops</b><b>✓ No made-up prices</b><b>✓ No promises outside your rules</b></div>
          </div>
        </div>

        <div className="shell call-photo-grid" aria-label="The missed-call journey in real life">
          <figure className="call-photo-main">
            <Image src="/missed-call-plumber.jpg" alt="Plumber working under a kitchen sink while his phone rings nearby" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 65vw" />
            <figcaption><span>01</span><div><strong>You keep working</strong><small>Relay catches the call you cannot.</small></div></figcaption>
          </figure>
          <figure>
            <Image src="/customer-call.jpg" alt="Australian customer speaking on the phone while a plumber works in her kitchen" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 35vw" />
            <figcaption><span>02</span><div><strong>The customer gets help</strong><small>A clear response, straight away.</small></div></figcaption>
          </figure>
          <figure>
            <Image src="/customer-sends-job-photo.jpg" alt="Australian homeowner photographing a contained leak beneath her kitchen sink" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 35vw" />
            <figcaption><span>03</span><div><strong>You get useful evidence</strong><small>Photos and details stay with the job.</small></div></figcaption>
          </figure>
        </div>

        <details className="shell flow-details">
          <summary><span><small>WANT THE EXACT LOGIC?</small><strong>See every check inside the call</strong></span><b aria-hidden="true">+</b></summary>
          <div className="flow-detail-grid">
            {callSteps.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
          </div>
        </details>
      </section>

      <section className="section photo-handoff-section">
        <div className="shell photo-handoff-grid">
          <div className="photo-handoff-copy">
            <p className="eyebrow">FROM CALL TO PHOTO</p>
            <h2>The customer gets a text. You get the photos on the job.</h2>
            <p className="large-copy">No need to explain an app or chase attachments. Relay sends a secure link after the call and keeps every photo with the right customer and job.</p>
            <div className="photo-sms-preview">
              <span>TEXT TO CUSTOMER</span>
              <p><strong>Coastwide Plumbing:</strong> add photos for the burst flexi hose here: <u>Open secure link</u></p>
              <small>The private upload link expires after 48 hours.</small>
            </div>
            <div className="photo-handoff-steps">
              <article><span aria-hidden="true">1</span><div><strong>SMS arrives</strong><p>The customer is told exactly what the photos are for.</p></div></article>
              <article><span aria-hidden="true">2</span><div><strong>They tap and upload</strong><p>Take or choose up to six photos. No account needed.</p></div></article>
              <article><span aria-hidden="true">3</span><div><strong>Photos land on the job</strong><p>The job card shows a photo count; the job opens to image tiles.</p></div></article>
            </div>
          </div>
          <figure className="dashboard-photo-preview">
            <div className="dashboard-window-bar"><i /><i /><i /><span>TRADIE WORKSPACE</span></div>
            <Image src="/app-screens/customer-photo-tile.png" alt="TradieRelay tradie dashboard showing Sarah Mitchell's burst flexi hose photo attached to the job" width={640} height={500} sizes="(max-width: 900px) 100vw, 48vw" />
            <figcaption><span>WORKING DEMO</span><strong>The photo appears inside Sarah&apos;s job under Customer photos.</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="section conversation-section">
        <div className="shell conversation-grid">
          <div className="conversation-copy">
            <p className="eyebrow light">SAMPLE CONVERSATION — PLUMBER</p>
            <h2>Natural enough for the customer. Structured enough for you.</h2>
            <p>This example shows the intent, not a fixed script. Your version uses your business name, service area and approved language.</p>
            <div className="sample-disclaimer"><strong>Sample only</strong><span>No customer or result is being represented.</span></div>
          </div>
          <div className="phone-mockup" aria-label="Example TradieRelay customer conversation">
            <div className="phone-top"><span className="status-dot" /><div><strong>TradieRelay</strong><small>Automated assistant</small></div></div>
            <div className="messages">
              <p className="message relay">Hi, you’ve reached Coastwide Plumbing. I’m their automated assistant. I can take the details now so the right person can call you back. What’s happening?</p>
              <p className="message caller">There’s water coming from under the kitchen sink.</p>
              <p className="message relay">Thanks. Are you able to safely turn off the tap or local isolation valve, and is water currently spreading through the house?</p>
              <p className="message caller">The valve is off. It’s stopped, but the cupboard is wet.</p>
              <p className="message relay">Got it. What suburb are you in, and what’s the best number for the plumber to call?</p>
              <p className="message caller">Carrara. This number is best.</p>
              <p className="message relay">Thanks. I’ve marked this as a contained leak in Carrara and requested a callback. I haven’t booked a time yet. You’ll receive a text confirming the details.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section lead-output-section">
        <div className="shell output-grid">
          <div>
            <p className="eyebrow">WHAT LANDS WITH YOU</p>
            <h2>One lead card. No replaying a two-minute voicemail.</h2>
            <p className="large-copy">The summary is designed to answer the first six questions you would ask yourself before calling back.</p>
            <a href="/setup" className="text-link">See how your fields are configured <span>→</span></a>
          </div>
          <article className="lead-card large-lead-card">
            <div className="lead-card-top"><span className="lead-badge">CALLBACK REQUESTED</span><span className="lead-age">Just now</span></div>
            <h3>Contained leak under kitchen sink</h3>
            <div className="lead-meta-grid">
              <div><small>CALLER</small><strong>Sarah M.</strong></div>
              <div><small>SUBURB</small><strong>Carrara</strong></div>
              <div><small>URGENCY</small><strong className="amber-text">Same day requested</strong></div>
              <div><small>STATUS</small><strong>Water isolated</strong></div>
              <div><small>ACCESS</small><strong>Home after 2pm</strong></div>
              <div><small>EVIDENCE</small><strong>2 photos requested</strong></div>
            </div>
            <div className="lead-note"><small>CUSTOMER TOLD</small><p>Details received. A booking time has not been promised. Plumber will call to confirm.</p></div>
            <div className="lead-actions"><span>Call customer</span><span>Open conversation</span><span>Mark not suitable</span></div>
          </article>
        </div>
      </section>

      <section className="section quote-flow-section">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">AUTOMATED QUOTE FOLLOW-UP</p>
            <h2>Persistent enough to get an answer. Smart enough to stop.</h2>
            <p>A quote sequence is not five copies of “just following up.” Each step has a reason and a stop condition.</p>
          </div>
          <div className="quote-timeline">
            {quoteSteps.map(([time, title, body]) => (
              <article key={time}><span>{time}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
          <div className="stop-rules">
            <strong>THE SEQUENCE STOPS WHEN</strong>
            <span>They book</span><span>They decline</span><span>They opt out</span><span>You pause it</span><span>The limit is reached</span>
          </div>
        </div>
      </section>

      <section className="section exception-section">
        <div className="shell exception-grid">
          <div><p className="eyebrow light">WHEN THE FLOW DOES NOT FIT</p><h2>Uncertainty triggers a hand-off—not a guess.</h2></div>
          <div className="exception-list">
            <article><strong>Unknown question</strong><p>It records the question and tells the customer the team will confirm.</p></article>
            <article><strong>Safety-sensitive situation</strong><p>It does not diagnose or coach the caller. Your approved safety and escalation wording applies.</p></article>
            <article><strong>Upset customer</strong><p>The flow switches from qualification to acknowledgement, detail capture and human escalation.</p></article>
            <article><strong>Caller wants a person</strong><p>It follows your transfer or callback rule instead of trapping them in the automation.</p></article>
            <article><strong>Out-of-area or unwanted job</strong><p>The caller gets a polite, accurate response without being promised service.</p></article>
            <article><strong>System cannot complete the flow</strong><p>A fail-safe message captures the best callback details and flags the interrupted conversation.</p></article>
          </div>
        </div>
      </section>

      <section className="section next-links-section">
        <div className="shell next-links-grid">
          <a href="/setup"><span>NOW SEE</span><strong>How we configure and test it</strong><em>Setup &amp; onboarding →</em></a>
          <a href="/trust"><span>THEN CHECK</span><strong>How control, privacy and failure handling work</strong><em>Trust &amp; safeguards →</em></a>
        </div>
      </section>

      <CtaBand title="Map this flow to your business." body="Bring one missed call and one recent quote. Noah will show you which questions, rules and hand-offs your version needs." />
      <SiteFooter />
    </main>
  );
}
