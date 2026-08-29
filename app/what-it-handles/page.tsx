import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('What it handles', 'Missed-call recovery, AI reception, lead details, booking hand-off and automated quote follow-up for trade businesses.', '/what-it-handles');

export default function WhatItHandlesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="WHAT TRADIERELAY HANDLES"
        title="The phone work that falls between the actual jobs."
        body="Start with one leak in the process—usually missed calls or quiet quotes. Add more only when the first part is working."
        note="No big-bang software rollout"
      />

      <section className="section feature-detail-section">
        <div className="shell feature-stack">
          <article id="missed-calls" className="feature-detail">
            <div className="feature-title"><span>01</span><div><p className="mini-label">MISSED-CALL RECOVERY</p><h2>Respond before they ring the next number.</h2></div></div>
            <div className="feature-body"><p>When a call is missed, TradieRelay starts a clear conversation while the customer is still looking for help.</p><ul className="plain-checks"><li><span>✓</span>Fast text or voice response</li><li><span>✓</span>Name, suburb and job details captured</li><li><span>✓</span>Urgent jobs flagged</li><li><span>✓</span>A next step sent to the customer</li></ul></div>
          </article>
          <article id="receptionist" className="feature-detail dark-detail">
            <div className="feature-title"><span>02</span><div><p className="mini-label">AI RECEPTIONIST</p><h2>Answer the common questions without stopping the job.</h2></div></div>
            <div className="feature-body"><p>The receptionist works from the information and boundaries you approve. It can help after hours or when you do not pick up.</p><ul className="plain-checks"><li><span>✓</span>Service area and opening hours</li><li><span>✓</span>Basic job qualification</li><li><span>✓</span>Booking or callback preferences</li><li><span>✓</span>Clear hand-off when a human is needed</li></ul></div>
          </article>
          <article id="quotes" className="feature-detail">
            <div className="feature-title"><span>03</span><div><p className="mini-label">QUOTE FOLLOW-UP</p><h2>Find out which quotes are alive, without chasing all of them yourself.</h2></div></div>
            <div className="feature-body"><p>Open quotes receive a polite follow-up based on your timing. The replies that matter are brought back to you.</p><ul className="plain-checks"><li><span>✓</span>Friendly scheduled nudges</li><li><span>✓</span>Questions and objections surfaced</li><li><span>✓</span>Interested customers flagged</li><li><span>✓</span>Follow-up stops when they say no</li></ul></div>
          </article>
          <article className="feature-detail dark-detail">
            <div className="feature-title"><span>04</span><div><p className="mini-label">LEAD SORTING</p><h2>See the hot jobs first.</h2></div></div>
            <div className="feature-body"><p>Instead of a pile of vague messages, enquiries arrive with the facts you need to decide what gets attention.</p><ul className="plain-checks"><li><span>✓</span>Job type and location</li><li><span>✓</span>Urgency and timing</li><li><span>✓</span>Photos or useful notes where available</li><li><span>✓</span>Clear callback request</li></ul></div>
          </article>
        </div>
      </section>

      <section className="section capability-matrix-section">
        <div className="shell">
          <div className="detail-intro"><div><p className="eyebrow">CAPABILITY MATRIX</p><h2>What can be configured in each workflow.</h2></div><p>Availability depends on the phone, messaging, calendar and job tools agreed for the pilot. The setup scope names what is live before anyone pays.</p></div>
          <div className="capability-table" role="table" aria-label="TradieRelay capability comparison">
            <div className="capability-row capability-head" role="row"><strong role="columnheader">Capability</strong><strong role="columnheader">Missed calls</strong><strong role="columnheader">Reception</strong><strong role="columnheader">Quote follow-up</strong></div>
            {[
              ['Automated customer response', 'Yes', 'Yes', 'Yes'],
              ['Name, suburb and job details', 'Yes', 'Yes', 'From quote record'],
              ['Urgency and suitability rules', 'Yes', 'Yes', 'Not required'],
              ['Common business questions', 'Limited', 'Yes', 'Quote questions routed'],
              ['Photo or document request', 'Where supported', 'Where supported', 'Where supported'],
              ['Live transfer or callback', 'Yes', 'Yes', 'Callback request'],
              ['Stop and opt-out rules', 'Yes', 'Yes', 'Yes'],
              ['Structured owner summary', 'Yes', 'Yes', 'Yes'],
              ['Conversation review', 'Yes', 'Yes', 'Yes'],
            ].map((row) => <div className="capability-row" role="row" key={row[0]}>{row.map((cell, index) => index === 0 ? <strong role="cell" key={cell}>{cell}</strong> : <span role="cell" key={`${row[0]}-${index}`}>{cell}</span>)}</div>)}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell detail-intro">
          <div><p className="eyebrow">WHAT IT DOES NOT DO</p><h2>It does not pretend to be the licensed tradie.</h2></div>
          <div><p>TradieRelay does not diagnose work, promise a final price, give safety advice or commit you to a job unless you have explicitly approved that action.</p><p>When the situation needs your experience, it hands over.</p></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div><p className="eyebrow">COMMON QUESTIONS</p><h2>Before you hand over a call.</h2></div>
          <div className="faq-list">
            <details><summary>Do I need a new phone number?</summary><p>Usually not. We plan the simplest routing around the number your customers already know.</p></details>
            <details><summary>Will customers know it is automated?</summary><p>Yes. The greeting is clear, brief and written in your business voice.</p></details>
            <details><summary>Can I choose which calls it handles?</summary><p>Yes. After-hours only, missed calls only, overflow, or a broader reception role—the rules are agreed with you.</p></details>
            <details><summary>What if it does not know the answer?</summary><p>It says so, captures the question and routes it to the right person. It does not make up a trade answer.</p></details>
          </div>
        </div>
      </section>

      <section className="section next-links-section">
        <div className="shell next-links-grid">
          <a href="/call-flow"><span>SEE IT IN MOTION</span><strong>Follow the full missed-call and quote sequence</strong><em>Full call flow →</em></a>
          <a href="/trades"><span>MAKE IT SPECIFIC</span><strong>See example questions for your trade</strong><em>Built for trades →</em></a>
        </div>
      </section>

      <CtaBand title="Pick the first phone problem to fix." body="Most businesses start with missed calls. We will map the smallest useful pilot from there." />
      <SiteFooter />
    </main>
  );
}
