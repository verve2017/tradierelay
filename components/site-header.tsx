/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/trades', label: 'Trades' },
  { href: '/features', label: 'Features' },
  { href: '/trust', label: 'Trust' },
  { href: '/pricing', label: 'Pricing' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <a href="/" aria-label="TradieRelay home" className="brand-link">
          <Image
            src="/tradierelay-logo.png"
            alt="TradieRelay"
            width={280}
            height={93}
            priority
            className="brand-logo"
          />
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a href="/book" className="button button-small header-cta">Book a 15-min call</a>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <a href="/book">Book a call</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
