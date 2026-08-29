import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/cta-band';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI RECEPTIONIST + QUOTE FOLLOW-UP FOR AUSTRALIAN TRADIES</p>
            <h1>Turn missed calls into booked jobs.</h1>
            <p className="hero-lede">
              TradieRelay answers when you can&apos;t, follows up open quotes and
              hands you the hot jobs—without changing how you work.
            </p>
            <div className="hero-actions">
              <Link href="/book" className="button">Book a 15-min call</Link>
              <Link href="/how-it-works" className="text-link">See how it works <span aria-hidden="true">→</span></Link>
            </div>
            <ul className="quick-proof" aria-label="Key benefits">
              <li><span aria-hidden="true">✓</span> Your number</li>
              <li><span aria-hidden="true">✓</span> Your rules</li>
              <li><span aria-hidden="true">✓</span> You stay in control</li>
            </ul>
          </div>

          <div className="hero-visual">
            <Image
              src="/tradie-van-hero.jpg"
              alt="Australian tradie checking a customer enquiry beside his work van"
              width={1536}
              height={1024}
              priority
              className="hero-image"
            />
            <div className="relay-card relay-card-top">
              <span className="status-dot" />
              <div><strong>Missed call handled</strong><small>Customer details captured</small></div>
            </div>
            <div className="relay-card relay-card-bottom">
              <span className="relay-icon" aria-hidden="true">↗</span>
              <div><strong>Hot lead sent to you</strong><small>You decide what happens next</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-strip" aria-label="The problem TradieRelay solves">
        <div className="shell strip-grid">
          <p className="strip-kicker">THE PHONE DOESN&apos;T CARE THAT YOUR HANDS ARE FULL.</p>
          <p className="strip-statement">If you don&apos;t answer, the next tradie might.</p>
          <Link href="/what-it-handles" className="strip-link">See what gets handled <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section problem-section">
        <div className="shell split-grid">
          <div className="image-frame offset-frame">
            <Image src="/missed-call-plumber.jpg" alt="Plumber unable to answer a ringing phone while working" width={1536} height={1024} className="section-image" />
            <div className="image-label"><strong>Hands full.</strong><span>Phone ringing.</span></div>
          </div>
          <div className="section-copy">
            <p className="eyebrow">GOOD WORK SHOULD NOT COST YOU THE NEXT JOB</p>
            <h2>You can&apos;t answer every call and do the job properly.</h2>
            <p className="large-copy">Customers rarely leave a useful voicemail. Quotes go quiet. And the follow-up ends up happening from the ute or after dinner.</p>
            <ul className="pain-list">
              <li><span>01</span><div><strong>Missed calls disappear</strong><p>They try the next business before you&apos;re free.</p></div></li>
              <li><span>02</span><div><strong>Quotes go cold</strong><p>Not because the customer said no—because nobody followed up.</p></div></li>
              <li><span>03</span><div><strong>Admin steals your evening</strong><p>The workday finishes. The phone work doesn&apos;t.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">ONE SIMPLE RELAY BETWEEN THE CUSTOMER AND YOU</p>
            <h2>Every good enquiry gets a proper next step.</h2>
            <p>TradieRelay handles the repeatable phone work and brings you in when your judgement is needed.</p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <span className="service-number">01</span>
              <h3>Missed-call recovery</h3>
              <p>When you can&apos;t pick up, the customer gets a fast response and a clear next step.</p>
              <Link href="/what-it-handles#missed-calls">What happens after the ring <span>→</span></Link>
            </article>
            <article className="service-card featured">
              <span className="service-number">02</span>
              <h3>AI receptionist</h3>
              <p>Common questions, job details and urgency are handled using the rules you approve.</p>
              <Link href="/what-it-handles#receptionist">See what it can answer <span>→</span></Link>
            </article>
            <article className="service-card">
              <span className="service-number">03</span>
              <h3>Quote follow-up</h3>
              <p>Open quotes get a polite nudge. You hear about replies that need a real decision.</p>
              <Link href="/what-it-handles#quotes">See the follow-up flow <span>→</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section guide-section">
        <div className="shell split-grid reverse-on-mobile">
          <div className="section-copy">
            <p className="eyebrow">BUILT AROUND HOW TRADIES ACTUALLY WORK</p>
            <h2>Your customers get looked after. You keep control.</h2>
            <p className="large-copy">We know a trade business can&apos;t run from a rigid call-centre script. During setup, Noah learns how you quote, what jobs you want and when a call needs to reach you.</p>
            <div className="guide-points">
              <div><span aria-hidden="true">✓</span><p><strong>No mystery answers.</strong> You approve the information and hand-off rules.</p></div>
              <div><span aria-hidden="true">✓</span><p><strong>No forced overhaul.</strong> Start with missed calls and add more only when it helps.</p></div>
              <div><span aria-hidden="true">✓</span><p><strong>No pretending to be human.</strong> The service is clear about being an automated assistant.</p></div>
            </div>
            <Link href="/about" className="text-link">Meet Noah and Jake <span aria-hidden="true">→</span></Link>
          </div>
          <div className="image-frame">
            <Image src="/customer-call.jpg" alt="Australian homeowner speaking on the phone while a tradie finishes a repair" width={1536} height={1024} className="section-image" />
          </div>
        </div>
      </section>

      <section className="section plan-section">
        <div className="shell">
          <div className="section-heading centered narrow">
            <p className="eyebrow">START WITHOUT THE TECH HEADACHE</p>
            <h2>Up and running in three clear steps.</h2>
          </div>
          <div className="plan-grid">
            <article><span>1</span><h3>Book a quick call</h3><p>Tell Noah how your calls, quotes and bookings work now.</p></article>
            <article><span>2</span><h3>Set your rules</h3><p>Choose what gets answered, what gets collected and when you step in.</p></article>
            <article><span>3</span><h3>Catch more work</h3><p>TradieRelay responds, follows up and sends the useful details to you.</p></article>
          </div>
          <div className="centered-action"><Link href="/how-it-works" className="button button-outline">See the full call flow</Link></div>
        </div>
      </section>

      <section className="section success-section">
        <div className="shell success-panel">
          <Image src="/tradie-day-done.jpg" alt="Gold Coast electrician packing away at the end of a well-organised day" width={1568} height={1003} className="success-image" />
          <div className="success-copy">
            <p className="eyebrow light">THE JOBS ARE STILL YOURS. SO IS YOUR TIME.</p>
            <h2>Finish the day without wondering who slipped through.</h2>
            <p>Calls are handled. Quote replies are surfaced. The customers who need you are easy to see.</p>
            <Link href="/pricing" className="button">See founding pricing</Link>
          </div>
        </div>
      </section>

      <section className="section pricing-teaser">
        <div className="shell teaser-grid">
          <div>
            <p className="eyebrow">GOLD COAST FOUNDING CUSTOMER PILOT</p>
            <h2>Start with the calls you are already missing.</h2>
            <p>Founding plans start at <strong>$399 a month + GST</strong>. Setup, call flow and support are kept clear from day one.</p>
          </div>
          <div className="teaser-actions">
            <Link href="/pricing" className="button">See pricing</Link>
            <span>No long-term lock-in during the pilot.</span>
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
