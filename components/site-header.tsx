/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import { tradePages } from '@/lib/trades';

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/features', label: 'Features' },
  { href: '/blog', label: 'Resources' },
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
          <a href="/how-it-works">How it works</a>
          <details className="desktop-trade-menu">
            <summary>Trades <span aria-hidden="true">⌄</span></summary>
            <div className="desktop-trade-panel">
              <a href="/trades" className="desktop-trade-overview"><strong>All trades</strong><span>See every trade we support</span></a>
              {tradePages.map((trade) => (
                <a href={`/trades/${trade.slug}`} key={trade.slug}><strong>{trade.name}</strong><span>{trade.cardLine}</span></a>
              ))}
            </div>
          </details>
          {links.slice(1).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a href="/book" className="button button-small header-cta">Book a 15-min call</a>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="/how-it-works">How it works</a>
            <a href="/trades">All trades</a>
            <p className="mobile-menu-label">TRADE PAGES</p>
            {tradePages.map((trade) => <a className="mobile-trade-link" key={trade.slug} href={`/trades/${trade.slug}`}>{trade.name}</a>)}
            {links.slice(1).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <a href="/book">Book a call</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
