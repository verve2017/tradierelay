import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { BookingForm } from './booking-form';

export const metadata: Metadata = {
  title: 'Book a call',
  description: 'Book a practical 15-minute call with Noah to map missed-call recovery or quote follow-up for your trade business.',
};

export default function BookPage() {
  return (
    <main>
      <SiteHeader />
      <section className="book-section">
        <div className="shell book-grid">
          <div className="book-copy">
            <p className="eyebrow">BOOK A 15-MINUTE CALL</p>
            <h1>Show us where the calls are falling over.</h1>
            <p className="page-hero-lede">Noah will ask a few useful questions, map the smallest sensible setup and tell you if TradieRelay is a fit.</p>
            <div className="call-expectations">
              <article><span>1</span><div><strong>Your current setup</strong><p>What happens when you miss a call now?</p></div></article>
              <article><span>2</span><div><strong>The costly gap</strong><p>Which calls or quotes most often go nowhere?</p></div></article>
              <article><span>3</span><div><strong>A practical next step</strong><p>A pilot recommendation—or a clear no if it is not useful.</p></div></article>
            </div>
            <div className="book-trust"><span aria-hidden="true">✓</span><p><strong>Gold Coast founding pilot</strong>No long-term lock-in. No invented promises.</p></div>
          </div>
          <div className="form-card">
            <div className="form-card-heading"><span className="status-dot" /><div><strong>Founding customer calls open</strong><small>Gold Coast trade businesses</small></div></div>
            <BookingForm />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
