/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import { featurePages, type FeatureCategory } from '@/lib/features';
import { tradePages } from '@/lib/trades';

const links = [
  { href: '/blog', label: 'Resources' },
  { href: '/trust', label: 'Trust' },
  { href: '/pricing', label: 'Pricing' },
];

const featureGroups: FeatureCategory[] = ['Calls', 'Workflow', 'Service'];

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
          <details className="desktop-trade-menu desktop-feature-menu">
            <summary>Features <span aria-hidden="true">⌄</span></summary>
            <div className="desktop-trade-panel desktop-feature-panel">
              <a href="/features" className="desktop-trade-overview desktop-feature-overview"><strong>All features</strong><span>See every feature on one page</span></a>
              {featureGroups.map((group) => (
                <section className="desktop-feature-group" key={group} aria-label={`${group} features`}>
                  <p>{group}</p>
                  {featurePages.filter((feature) => feature.category === group).map((feature) => (
                    <a href={`/features/${feature.slug}`} key={feature.slug}><strong>{feature.name}</strong><span>{feature.menuLine}</span></a>
                  ))}
                </section>
              ))}
            </div>
          </details>
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a href="/book" className="button button-small header-cta">Book a 15-min call</a>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="/how-it-works">How it works</a>
            <a href="/trades">All trades</a>
            <p className="mobile-menu-label">TRADE PAGES</p>
            {tradePages.map((trade) => <a className="mobile-trade-link" key={trade.slug} href={`/trades/${trade.slug}`}>{trade.name}</a>)}
            <a href="/features">All features</a>
            <p className="mobile-menu-label">FEATURE PAGES</p>
            {featurePages.map((feature) => <a className="mobile-trade-link mobile-feature-link" key={feature.slug} href={`/features/${feature.slug}`}>{feature.name}</a>)}
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <a href="/book">Book a call</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
