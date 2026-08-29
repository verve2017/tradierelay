import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Website privacy notice', 'What information the TradieRelay launch website collects and how call requests are handled.', '/privacy');

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="legal-hero"><div className="shell"><p className="eyebrow">WEBSITE PRIVACY NOTICE</p><h1>A short notice for a simple launch site.</h1><p>Last updated 29 August 2026</p></div></section>
      <article className="shell legal-content">
        <section><h2>What this notice covers</h2><p>This notice covers the public TradieRelay website and its “Book a call” form. A future live receptionist service will require a separate service-specific privacy and data-handling agreement before customer information is processed.</p></section>
        <section><h2>Information you choose to provide</h2><p>The call-request form asks for your name, business name, trade, mobile number, email address, preferred call time and a short description of the phone or follow-up problem.</p></section>
        <section><h2>How the form works today</h2><p>Submitting the form prepares an email in your device’s email application. You review and send that email to <a href="mailto:hello@tradierelay.com.au">hello@tradierelay.com.au</a>. The website does not currently save the form contents to its own database.</p></section>
        <section><h2>Why the information is used</h2><p>The information is used to respond to your request, understand whether TradieRelay may suit your business and prepare a useful introductory call.</p></section>
        <section><h2>Cookies and advertising</h2><p>The launch site does not include advertising pixels, behavioural advertising or an analytics-cookie product. The hosting service may process standard technical request information needed to deliver and protect the website.</p></section>
        <section><h2>Sharing</h2><p>TradieRelay does not sell enquiry information. Information may be handled by the email and hosting providers needed to receive your message and operate the site.</p></section>
        <section><h2>Access, correction or deletion</h2><p>To ask what enquiry information is held, correct it or request deletion, email <a href="mailto:hello@tradierelay.com.au">hello@tradierelay.com.au</a>.</p></section>
        <section><h2>Before the live service launches</h2><p>The phone-service pilot will document what caller information is collected, where it is sent, who can access it, how long it is retained, how recording is handled if used and how incidents or deletion requests are managed.</p></section>
        <aside>This is the operational notice for the current launch website. It is not a substitute for legal advice or the customer contract and privacy documentation required before the live phone service expands.</aside>
      </article>
      <SiteFooter />
    </main>
  );
}
