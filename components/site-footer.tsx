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
          <strong>Explore</strong>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/what-it-handles">What it handles</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div>
          <strong>Talk to us</strong>
          <Link href="/book">Book a 15-minute call</Link>
          <a href="mailto:hello@tradierelay.com.au">hello@tradierelay.com.au</a>
          <Link href="/about">About Noah &amp; Jake</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 TradieRelay</span>
        <span>Gold Coast, Queensland</span>
      </div>
    </footer>
  );
}
