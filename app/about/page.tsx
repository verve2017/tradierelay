import Image from 'next/image';
import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('About', 'Meet the Gold Coast team behind TradieRelay and see the practical principles guiding the founding-customer pilot.', '/about');

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="BUILT ON THE GOLD COAST"
        title="A local team fixing a clear business leak."
        body="TradieRelay is being built by Noah and Jake for trade businesses that are good at the work but cannot be everywhere at once."
        note="Founding-customer pilot now open"
      />

      <section className="section">
        <div className="shell split-grid">
          <div className="section-copy">
            <p className="eyebrow">WHY TRADIERELAY EXISTS</p>
            <h2>Good tradies should not lose work because they are busy doing the work.</h2>
            <p className="large-copy">A ringing phone creates the same bad choice every day: interrupt the job in front of you, or risk losing the next one.</p>
            <p>TradieRelay is designed to remove that choice. The service catches the enquiry, keeps the customer moving and leaves the trade decision with the person who knows the work.</p>
          </div>
          <div className="image-frame">
            <Image src="/tradie-day-done.jpg" alt="Australian tradie organising tools beside his van on the Gold Coast" width={1568} height={1003} className="section-image" />
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="shell">
          <div className="section-heading centered narrow">
            <p className="eyebrow">WHO YOU WILL DEAL WITH</p>
            <h2>Two people. Two clear jobs.</h2>
          </div>
          <div className="team-grid">
            <article>
              <span className="team-initial">N</span>
              <p className="mini-label">CUSTOMER SETUP + SALES</p>
              <h3>Noah</h3>
              <p>Noah learns how your business handles calls and quotes, turns that into a clear setup and stays your point of contact.</p>
            </article>
            <article>
              <span className="team-initial">J</span>
              <p className="mini-label">SYSTEM BUILD + IMPROVEMENT</p>
              <h3>Jake</h3>
              <p>Jake builds the workflows, tests the edge cases and improves the system as the pilot reveals what customers actually need.</p>
            </article>
          </div>
          <div className="founder-note"><strong>Young founders. Visible accountability.</strong><p>Noah and Jake both hold diplomas in business studies. Noah’s strength is sales and understanding the customer’s working problem. Jake’s is fast software building and testing. The pilot earns trust through clear rules, controlled scope and direct founder support—not borrowed logos or made-up experience.</p></div>
        </div>
      </section>

      <section className="section founder-model-section">
        <div className="shell founder-model-grid">
          <div><p className="eyebrow">THE FOUNDING CUSTOMER MODEL</p><h2>You should know who owns the result.</h2></div>
          <div>
            <article><span>BEFORE</span><p><strong>Noah owns the scope.</strong> He documents the missed-call or quote problem and the result the pilot must prove.</p></article>
            <article><span>DURING</span><p><strong>Jake owns the behaviour.</strong> He builds the approved rules, tests edge cases and fixes what does not behave correctly.</p></article>
            <article><span>AFTER</span><p><strong>Both review the evidence.</strong> Useful leads, customer friction, time saved and wrong answers decide whether the pilot expands.</p></article>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="shell values-grid">
          <div><p className="eyebrow">HOW WE ARE BUILDING IT</p><h2>Useful before impressive.</h2></div>
          <div className="value-list">
            <article><span>01</span><div><h3>Start with one leak</h3><p>Fix missed calls first. Add reception or follow-up when the first job is working.</p></div></article>
            <article><span>02</span><div><h3>Say what the AI is</h3><p>No fake human act. Customers get a clear, respectful automated assistant.</p></div></article>
            <article><span>03</span><div><h3>Keep the tradie in control</h3><p>The system handles repetition. The business owner controls trade judgement and promises.</p></div></article>
            <article><span>04</span><div><h3>Earn the next step</h3><p>The pilot has to save time or recover work before anything more gets added.</p></div></article>
          </div>
        </div>
      </section>

      <CtaBand title="Help shape the founding pilot." body="If you run a Gold Coast trade business, show Noah where calls or quotes are falling over. You will get a practical pilot—not a software sales pitch." />
      <SiteFooter />
    </main>
  );
}
