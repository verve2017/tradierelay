import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function NotFound() {
  return <main><SiteHeader /><section className="not-found-section"><div className="shell"><p className="eyebrow">404 — WRONG TURN</p><h1>This page has knocked off early.</h1><p>The useful pages are still on the job.</p><div className="hero-actions"><Link href="/" className="button">Back to the homepage</Link><Link href="/call-flow" className="text-link">See the full call flow <span>→</span></Link></div></div></section><SiteFooter /></main>;
}
