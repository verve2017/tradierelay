import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('How it works', 'See how TradieRelay handles a missed call, collects useful job details and hands the right enquiries back to you.', '/how-it-works');

const flow = [
  { time: '00:00', title: 'Your phone rings', body: 'You are on a ladder, under a sink or talking to the customer in front of you.' },
  { time: '00:20', title: 'TradieRelay steps in', body: 'Your approved greeting explains that the automated assistant can help right away.' },
  { time: '01:00', title: 'The useful details are captured', body: 'Name, suburb, job type, urgency, access and the best time to call—based on your rules.' },
  { time: '01:30', title: 'The customer gets a clear next step', body: 'They know whether you will call, whether they can book, or what information is needed first.' },
  { time: '02:00', title: 'You get the short version', body: 'The enquiry arrives in a format you can scan quickly and act on when you are free.' },
];

export default function HowItWorksPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="HOW IT WORKS"
        title="The call gets handled. You get the useful bit."
        body="TradieRelay sits between a ringing phone and a lost job. It handles the repeatable questions, then brings you in when your experience matters."
        note="Built around your current number and workflow"
      />

      <section className="section">
        <div className="shell detail-intro">
          <div>
            <p className="eyebrow">A MISSED CALL, STEP BY STEP</p>
            <h2>What happens while your hands are full.</h2>
          </div>
          <p>There is no giant software change for you to learn. We agree the call rules first, test them with you and keep the customer experience simple.</p>
        </div>
        <div className="shell call-flow">
          {flow.map((item, index) => (
            <article key={item.time} className="flow-row">
              <div className="flow-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="flow-time">{item.time}</div>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          ))}
        </div>
        <div className="shell centered-action"><Link href="/call-flow" className="button button-outline">Open the complete 10-step call flow</Link></div>
      </section>

      <section className="section soft-section">
        <div className="shell split-grid">
          <div className="image-frame">
            <Image src="/customer-call.jpg" alt="Customer receiving a clear response while a tradie completes the work" width={1536} height={1024} className="section-image" />
          </div>
          <div className="section-copy">
            <p className="eyebrow">YOUR BUSINESS RULES THE CONVERSATION</p>
            <h2>It learns your way of doing business—not the other way around.</h2>
            <p className="large-copy">Before going live, we map the questions you already ask and the decisions you already make.</p>
            <ul className="plain-checks">
              <li><span>✓</span>Which suburbs and job types you cover</li>
              <li><span>✓</span>What counts as urgent</li>
              <li><span>✓</span>Which jobs you do not want</li>
              <li><span>✓</span>When to take a message, book or transfer</li>
              <li><span>✓</span>What your customers should never be promised</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section boundary-section">
        <div className="shell boundary-grid">
          <div className="section-heading">
            <p className="eyebrow">AUTOMATION WITH A SHORT LEASH</p>
            <h2>You stay in charge of the jobs and the judgement calls.</h2>
          </div>
          <div className="boundary-cards">
            <article><span className="mini-label">RELAY HANDLES</span><h3>Repeatable phone work</h3><p>Basic questions, detail collection, polite follow-up and routing.</p></article>
            <article><span className="mini-label">YOU HANDLE</span><h3>Trade decisions</h3><p>Pricing, diagnosis, exceptions, difficult customers and final commitments.</p></article>
          </div>
        </div>
      </section>

      <section className="section system-section">
        <div className="shell">
          <div className="section-heading centered"><p className="eyebrow">THE WORKING PARTS</p><h2>Five layers make the relay useful.</h2><p>Each layer is configured, tested and reviewable. The system is more than a voice on the phone.</p></div>
          <div className="system-grid">
            <article><span>01</span><h3>Routing</h3><p>Defines when TradieRelay answers and where a live transfer or callback goes.</p></article>
            <article><span>02</span><h3>Approved knowledge</h3><p>Your services, areas, hours, job rules, common questions and clear exclusions.</p></article>
            <article><span>03</span><h3>Conversation logic</h3><p>The required questions, branches, stop conditions and human hand-off triggers.</p></article>
            <article><span>04</span><h3>Lead delivery</h3><p>A structured summary sent to the person who can actually decide the next step.</p></article>
            <article><span>05</span><h3>Review loop</h3><p>Real conversations reveal missing rules, confusing wording and the next useful improvement.</p></article>
          </div>
        </div>
      </section>

      <section className="section next-links-section">
        <div className="shell next-links-grid">
          <Link href="/setup"><span>READY TO GO DEEPER?</span><strong>See how the system is configured and tested</strong><em>Setup &amp; onboarding →</em></Link>
          <Link href="/trust"><span>CHECK THE CONTROLS</span><strong>See what happens when it does not know</strong><em>Trust &amp; safeguards →</em></Link>
        </div>
      </section>

      <CtaBand title="See how it would work for your calls." body="Bring one recent missed call or quiet quote. Noah will map the practical TradieRelay version with you." />
      <SiteFooter />
    </main>
  );
}
