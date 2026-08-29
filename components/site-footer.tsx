import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Image src="/tradierelay-logo.png" alt="TradieRelay" width={250} height={83} className="footer-logo" />
          <p>Missed-call recovery, AI reception and quote follow-up for Australian trade businesses.</p>
          <p className="local-note">Built on the Gold Coast.</p>
        </div>
        <div>
          <strong>How it works</strong>
          <a href="/how-it-works">How it works</a>
          <a href="/call-flow">Full call flow</a>
          <a href="/setup">Setup &amp; onboarding</a>
          <a href="/trades">Built for trades</a>
        </div>
        <div>
          <strong>Confidence</strong>
          <a href="/what-it-handles">What it handles</a>
          <a href="/trust">Trust &amp; safeguards</a>
          <a href="/pricing">Pricing</a>
          <a href="/faq">Questions answered</a>
        </div>
        <div>
          <strong>TradieRelay</strong>
          <a href="/book">Book a 15-minute call</a>
          <a href="mailto:hello@tradierelay.com.au">hello@tradierelay.com.au</a>
          <a href="/about">About Noah &amp; Jake</a>
          <a href="/privacy">Website privacy</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 TradieRelay</span>
        <span>Gold Coast, Queensland</span>
      </div>
    </footer>
  );
}
