import Image from 'next/image';
import Link from 'next/link';

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/call-flow', label: 'Full call flow' },
  { href: '/what-it-handles', label: 'Solutions' },
  { href: '/trust', label: 'Trust' },
  { href: '/pricing', label: 'Pricing' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link href="/" aria-label="TradieRelay home" className="brand-link">
          <Image
            src="/tradierelay-logo.png"
            alt="TradieRelay"
            width={280}
            height={93}
            priority
            className="brand-logo"
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link href="/book" className="button button-small header-cta">Book a 15-min call</Link>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/book">Book a call</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
