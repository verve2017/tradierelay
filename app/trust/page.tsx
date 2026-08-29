import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Trust and safeguards', 'How TradieRelay controls answers, handles uncertainty, protects customer information and keeps trade judgement with the business owner.', '/trust');

export default function TrustPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="TRUST & SAFEGUARDS"
        title="Competent automation knows where it must stop."
        body="TradieRelay is designed to handle repeatable phone work while keeping pricing, diagnosis, safety and final commitments with the trade business."
        note="Every live rule is reviewable and changeable"
      />

      <section className="section trust-principles-section">
        <div className="shell trust-principles-grid">
          <article><span>01</span><h3>It identifies itself</h3><p>Customers are told they are speaking with an automated assistant. The wording stays brief and useful.</p></article>
          <article><span>02</span><h3>It uses approved facts</h3><p>Service areas, hours, job types, fees and policies come from the information you approved.</p></article>
          <article><span>03</span><h3>It does not diagnose</h3><p>It can collect what the caller sees and hears. It does not provide licensed trade advice or a remote diagnosis.</p></article>
          <article><span>04</span><h3>It does not invent certainty</h3><p>If the answer is missing or the situation is unclear, the response is recorded and handed to a person.</p></article>
          <article><span>05</span><h3>It records the promise</h3><p>The customer confirmation and your lead summary show what was—and was not—committed.</p></article>
          <article><span>06</span><h3>You can narrow or stop it</h3><p>Change the questions, remove a job type, shorten the hours or turn routing off.</p></article>
        </div>
      </section>

      <section className="section control-section">
        <div className="shell control-grid">
          <div><p className="eyebrow light">CONTROL MODEL</p><h2>Four layers between a caller and a bad promise.</h2></div>
          <div className="control-layers">
            <article><span>1</span><div><strong>Approved knowledge</strong><p>Only the business facts and policies you supplied.</p></div></article>
            <article><span>2</span><div><strong>Conversation boundaries</strong><p>Explicit “may answer”, “must ask” and “must hand over” rules.</p></div></article>
            <article><span>3</span><div><strong>Fallback behaviour</strong><p>When uncertain, capture details and escalate instead of filling the gap.</p></div></article>
            <article><span>4</span><div><strong>Human review</strong><p>Real conversations drive approved improvements to wording and routing.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section data-section">
        <div className="shell detail-intro">
          <div><p className="eyebrow">CUSTOMER INFORMATION</p><h2>Collect what helps the job. Leave the rest alone.</h2></div>
          <p>The exact data flow depends on the phone, messaging and job tools chosen for the pilot. It is documented before launch.</p>
        </div>
        <div className="shell data-grid">
          <article><h3>Data minimisation</h3><p>The flow asks for the fields needed to qualify, route or follow up the enquiry—not a broad customer profile.</p></article>
          <article><h3>Clear purpose</h3><p>Caller details are used to respond to their trade-service enquiry and operate the agreed workflow.</p></article>
          <article><h3>Access by role</h3><p>Lead summaries and conversations go only to the people and systems agreed during setup.</p></article>
          <article><h3>Retention choice</h3><p>The pilot records what is retained, for how long and how deletion requests are handled.</p></article>
          <article><h3>Recording transparency</h3><p>If any call-recording feature is used, the required notice and consent approach must be agreed before activation.</p></article>
          <article><h3>Incident response</h3><p>Unexpected access, incorrect output or a failed hand-off is recorded, contained and reviewed before the flow expands.</p></article>
        </div>
        <p className="legal-note">TradieRelay does not claim that one setup automatically meets every business’s legal or industry obligations. Your final workflow, notices and retention settings must suit your business.</p>
      </section>

      <section className="section reliability-section">
        <div className="shell reliability-grid">
          <div><p className="eyebrow">WHEN SOMETHING GOES WRONG</p><h2>A known fallback beats a clever failure.</h2></div>
          <div className="reliability-table">
            <div><strong>Cannot understand the caller</strong><span>Ask once more, then capture callback details and flag the incomplete enquiry.</span></div>
            <div><strong>Knowledge does not contain the answer</strong><span>Say the team needs to confirm; never improvise the business policy.</span></div>
            <div><strong>Transfer is unavailable</strong><span>Explain that the transfer could not complete, confirm callback details and alert the nominated person.</span></div>
            <div><strong>Customer disputes the summary</strong><span>Keep the conversation context together, correct the record and route it for review.</span></div>
            <div><strong>Automation is unavailable</strong><span>Use the agreed provider fallback or voicemail route so the call does not vanish silently.</span></div>
          </div>
        </div>
      </section>

      <section className="section pilot-proof-section">
        <div className="shell pilot-proof-grid">
          <div><p className="eyebrow light">WHAT THE PILOT MUST PROVE</p><h2>Confidence comes from evidence, not an AI badge.</h2></div>
          <div className="proof-scorecard">
            <article><strong>Useful enquiries recovered</strong><span>Did the flow capture work that would otherwise have been a voicemail or lost call?</span></article>
            <article><strong>Customer friction</strong><span>Where did callers repeat themselves, abandon or need a person sooner?</span></article>
            <article><strong>Owner time saved</strong><span>Which repeat questions and follow-ups no longer required manual effort?</span></article>
            <article><strong>Wrong promises</strong><span>Did the assistant step beyond an approved fact or commitment? The target is zero.</span></article>
          </div>
        </div>
      </section>

      <section className="section privacy-link-section">
        <div className="shell privacy-link-panel"><div><p className="eyebrow">CURRENT WEBSITE PRIVACY</p><h2>See what this website collects today.</h2><p>The launch website uses no advertising pixels or analytics cookies. The call-request form prepares an email in your own email app.</p></div><a href="/privacy" className="button button-outline">Read the privacy notice</a></div>
      </section>

      <CtaBand title="Ask the difficult questions before you start." body="Noah will walk through the rules, fallbacks and data path for your proposed pilot. If a control is unclear, it does not go live." />
      <SiteFooter />
    </main>
  );
}
