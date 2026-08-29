import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Setup and onboarding', 'See how TradieRelay maps your call rules, connects to your workflow, tests edge cases and launches a controlled pilot.', '/setup');

const launchStages = [
  { day: 'STEP 1', title: 'Map the leak', body: 'We review recent missed calls, the job types you want and where follow-up currently stops.', output: 'Output: one-page pilot scope' },
  { day: 'STEP 2', title: 'Write the rules', body: 'Service area, questions, exclusions, urgency language, transfers and promises are documented.', output: 'Output: approved call-rule sheet' },
  { day: 'STEP 3', title: 'Build the flow', body: 'Jake configures the conversation, lead summary, messages and hand-off points.', output: 'Output: test-ready private flow' },
  { day: 'STEP 4', title: 'Try to break it', body: 'We run normal calls, vague callers, interruptions, unwanted jobs and questions it cannot answer.', output: 'Output: passed launch checklist' },
  { day: 'STEP 5', title: 'Controlled go-live', body: 'Start with missed calls, after-hours or a limited call window instead of switching everything at once.', output: 'Output: live pilot with a fallback' },
  { day: 'STEP 6', title: 'Tune from evidence', body: 'The first conversations show what callers actually say. We adjust wording and rules with your approval.', output: 'Output: 14-day keep/change decision' },
];

export default function SetupPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="SETUP & ONBOARDING"
        title="We learn the business before we answer for it."
        body="A useful receptionist is built from your real calls, service rules and judgement—not a generic trade-business template."
        note="Nothing goes live until you approve the test flow"
      />

      <section className="section launch-section">
        <div className="shell detail-intro">
          <div><p className="eyebrow">THE LAUNCH PROCESS</p><h2>Six controlled steps. No switch-and-hope.</h2></div>
          <p>The founding pilot is deliberately narrow. We prove one call problem before adding reception, quote follow-up or more complicated routing.</p>
        </div>
        <div className="shell launch-grid">
          {launchStages.map((stage) => (
            <article key={stage.day}><span>{stage.day}</span><h3>{stage.title}</h3><p>{stage.body}</p><small>{stage.output}</small></article>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell setup-input-grid">
          <div><p className="eyebrow">WHAT WE NEED FROM YOU</p><h2>The facts already in your head.</h2><p>You do not need to write a manual. Noah pulls the information out in a practical working session.</p></div>
          <div className="setup-checklist">
            <article><span>01</span><div><strong>Jobs you want</strong><p>Trade categories, service area, minimum job size and preferred work.</p></div></article>
            <article><span>02</span><div><strong>Jobs you do not want</strong><p>Locations, work types, hours or customer requests you decline.</p></div></article>
            <article><span>03</span><div><strong>How you decide urgency</strong><p>The approved questions and wording—not automated diagnosis.</p></div></article>
            <article><span>04</span><div><strong>Your real availability</strong><p>When to offer a callback, request a booking or simply take a message.</p></div></article>
            <article><span>05</span><div><strong>Your promises and limits</strong><p>What it may say about fees, timing, warranties and attendance.</p></div></article>
            <article><span>06</span><div><strong>Who gets what</strong><p>Which person receives new work, existing-customer issues and urgent flags.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section routing-section">
        <div className="shell">
          <div className="section-heading centered"><p className="eyebrow">CHOOSE THE SAFEST STARTING MODE</p><h2>Your existing number. A routing rule you can reverse.</h2><p>The exact connection depends on your phone provider. We confirm feasibility before taking payment.</p></div>
          <div className="routing-grid">
            <article><span className="mode-tag">RECOMMENDED START</span><h3>No-answer recovery</h3><p>Your phone rings normally. TradieRelay answers only when nobody picks up within the agreed time.</p><strong>Best for: sole traders and small crews</strong></article>
            <article><span className="mode-tag">CONTROLLED HOURS</span><h3>After-hours cover</h3><p>Your normal daytime flow stays unchanged. The assistant handles enquiries outside the hours you set.</p><strong>Best for: protecting evenings</strong></article>
            <article><span className="mode-tag">GROWING TEAM</span><h3>Overflow reception</h3><p>Calls go to the team first, then overflow when everyone is already speaking or unavailable.</p><strong>Best for: busy offices and crews</strong></article>
          </div>
        </div>
      </section>

      <section className="section test-section">
        <div className="shell test-grid">
          <div><p className="eyebrow light">THE PRE-LAUNCH TEST</p><h2>We test the awkward calls, not just the easy demo.</h2><a href="/trust" className="text-link light-link">See all safeguards <span>→</span></a></div>
          <div className="test-cases">
            <span>Caller talks over the assistant</span><span>Unknown suburb</span><span>Job outside scope</span><span>Caller asks for price</span><span>Existing customer complaint</span><span>Supplier or spam call</span><span>Unclear urgency</span><span>Caller requests a person</span><span>Silence or disconnect</span><span>Question not in the rules</span><span>Wrong number</span><span>Customer opts out</span>
          </div>
        </div>
      </section>

      <section className="section scope-section">
        <div className="shell scope-grid">
          <div><p className="eyebrow">WHAT YOU RECEIVE</p><h2>A working service and the rules behind it.</h2></div>
          <div className="deliverables-table">
            <div><strong>Call-rule sheet</strong><span>Plain-English record of questions, promises, exclusions and hand-offs</span></div>
            <div><strong>Test script</strong><span>The cases used to check normal, awkward and failed conversations</span></div>
            <div><strong>Routing plan</strong><span>What happens when the phone is answered, missed, busy or after-hours</span></div>
            <div><strong>Lead summary format</strong><span>The exact information you receive after each handled enquiry</span></div>
            <div><strong>Fallback plan</strong><span>How calls are captured if the normal automation cannot complete</span></div>
            <div><strong>Review point</strong><span>A 14-day decision using saved time, useful leads and customer friction</span></div>
          </div>
        </div>
      </section>

      <CtaBand title="Bring your current call setup." body="Noah will map the simplest routing mode and show you exactly what information is needed before a pilot can go live." />
      <SiteFooter />
    </main>
  );
}
