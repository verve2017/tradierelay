import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/how-it-works">How it works</Link>
          <Link href="/call-flow">Full call flow</Link>
          <Link href="/setup">Setup &amp; onboarding</Link>
          <Link href="/trades">Built for trades</Link>
        </div>
        <div>
          <strong>Confidence</strong>
          <Link href="/what-it-handles">What it handles</Link>
          <Link href="/trust">Trust &amp; safeguards</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">Questions answered</Link>
        </div>
        <div>
          <strong>TradieRelay</strong>
          <Link href="/book">Book a 15-minute call</Link>
          <a href="mailto:hello@tradierelay.com.au">hello@tradierelay.com.au</a>
          <Link href="/about">About Noah &amp; Jake</Link>
          <Link href="/privacy">Website privacy</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 TradieRelay</span>
        <span>Gold Coast, Queensland</span>
      </div>
    </footer>
  );
}
