'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type QuoteView = { id: string; status: string; customer: string; business: string; phone: string; licence: string | null; job: string; suburb: string; note: string; validUntil: string; subtotal: number; gst: number; total: number; lines: { id: string; description: string; quantity: number; unit: string; total: number }[] };

const demoQuote: QuoteView = { id: 'demo', status: 'viewed', customer: 'Sarah', business: "Bob's Handyman", phone: '0418 555 204', licence: 'QBCC 1234567', job: 'Replace burst flexi hose', suburb: 'Burleigh Waters', note: 'Includes isolation, removal and replacement. Subject to confirming there is no cabinet damage.', validUntil: '12 September 2026', subtotal: 25500, gst: 2550, total: 28050, lines: [{ id: '1', description: 'Call-out & assessment', quantity: 1, unit: 'job', total: 10000 }, { id: '2', description: 'Replace kitchen flexi hose', quantity: 1, unit: 'job', total: 15500 }] };

export function CustomerQuote({ accessToken = null, demo = false }: { accessToken?: string | null; demo?: boolean }) {
  const [quote, setQuote] = useState<QuoteView | null>(demo ? demoQuote : null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);
  const [changeNote, setChangeNote] = useState('');
  const [result, setResult] = useState<'accepted' | 'change_requested' | null>(null);

  useEffect(() => {
    if (demo) return;
    async function load() {
      if (!accessToken) { setError('This quote link is missing or has expired. Ask the tradie for a new link.'); return; }
      const session = await fetch('/api/session', { method: 'POST', headers: { authorization: `Bearer ${accessToken}` } });
      if (!session.ok) { setError('This quote link is invalid or has expired. Ask the tradie for a new link.'); return; }
      window.history.replaceState(null, '', '/customer/quote');
      const response = await fetch('/api/customer/quote', { cache: 'no-store' });
      const data = await response.json() as { quote?: unknown; error?: { message?: string } };
      if (!response.ok || !data.quote) { setError(data.error?.message ?? 'This quote could not be loaded.'); return; }
      setQuote(normaliseCustomerQuote(data.quote));
    }
    void load();
  }, [accessToken, demo]);

  async function respond(action: 'accept' | 'request_change') {
    if (action === 'request_change' && !changeNote.trim()) { setError('Tell the tradie what you would like changed.'); return; }
    setWorking(true); setError(null);
    if (!demo) {
      const response = await fetch('/api/customer/quote', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, note: changeNote }) });
      const data = await response.json() as { error?: { message?: string } };
      if (!response.ok) { setError(data.error?.message ?? 'Your response could not be saved.'); setWorking(false); return; }
    }
    setResult(action === 'accept' ? 'accepted' : 'change_requested'); setWorking(false);
  }

  if (error && !quote) return <QuoteState title="That quote link has stopped working" body={error} />;
  if (!quote) return <QuoteState title="Opening your quote…" body="Checking the secure link and loading the latest version." />;
  if (result) return <QuoteState success title={result === 'accepted' ? 'Quote accepted.' : 'Change request sent.'} body={result === 'accepted' ? `${quote.business} has been told. They’ll contact you to arrange the job.` : `${quote.business} has your note and will send an updated quote.`} />;

  return <main className="customer-flow"><header><Link href="/" className="relay-app-brand">TradieRelay</Link><span>Quote from {quote.business}</span></header><section className="customer-card quote-card"><span className="customer-kicker">YOUR QUOTE</span><h1>{quote.job}</h1><p>{quote.suburb} · Valid until {quote.validUntil}</p><div className="quote-business"><div className="quote-avatar">BH</div><div><strong>{quote.business}</strong><span>{quote.licence ?? 'Business details confirmed by TradieRelay'}</span></div><a href={`tel:${quote.phone.replaceAll(' ', '')}`}>Call</a></div><h2>What’s included</h2><div className="customer-lines">{quote.lines.map((line) => <div key={line.id}><span>{line.description}<small>{line.quantity} {line.unit}</small></span><strong>{money(line.total)}</strong></div>)}</div>{quote.note && <div className="quote-note"><strong>Note from the tradie</strong><span>{quote.note}</span></div>}<div className="customer-totals"><div><span>Subtotal</span><b>{money(quote.subtotal)}</b></div>{quote.gst > 0 && <div><span>GST</span><b>{money(quote.gst)}</b></div>}<div><span>Total</span><b>{money(quote.total)}</b></div></div><p className="quote-disclaimer">Estimate subject to site inspection. If the job changes, the tradie must discuss the price with you before doing extra work.</p>{error && <p className="relay-form-error">{error}</p>}{changeOpen ? <div className="change-panel"><label><span>What would you like changed?</span><textarea autoFocus maxLength={1000} value={changeNote} onChange={(event) => setChangeNote(event.target.value)} placeholder="For example: Please remove the optional item…" /></label><div><button type="button" onClick={() => setChangeOpen(false)}>Cancel</button><button type="button" disabled={working} onClick={() => void respond('request_change')}>Send request</button></div></div> : <div className="quote-actions"><button type="button" className="customer-primary" disabled={working || !['sent', 'viewed'].includes(quote.status)} onClick={() => void respond('accept')}>{working ? 'Saving…' : `Accept quote · ${money(quote.total)}`}</button><button type="button" className="customer-secondary" onClick={() => setChangeOpen(true)}>Ask for a change</button></div>}<p className="customer-privacy">Nothing is paid on this page. Accepting tells the tradie you want to proceed.</p></section></main>;
}

function normaliseCustomerQuote(value: unknown): QuoteView {
  const row = record(value); const quote = record(row.quote); const customer = record(row.customer); const tenant = record(row.tenant); const job = record(row.job);
  return { id: String(quote.id), status: String(quote.status), customer: String(customer.name ?? 'Customer'), business: String(tenant.businessName), phone: String(tenant.smsNumber ?? ''), licence: tenant.licenceNo ? String(tenant.licenceNo) : null, job: String(job.title), suburb: String(job.suburb ?? ''), note: String(quote.customerNote ?? ''), validUntil: new Date(String(quote.validUntil)).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }), subtotal: Number(quote.subtotalExGstCents ?? 0), gst: Number(quote.gstCents ?? 0), total: Number(quote.totalCents ?? 0), lines: Array.isArray(row.items) ? row.items.map((value) => { const item = record(value); return { id: String(item.id), description: String(item.description), quantity: Number(item.quantityMilli) / 1000, unit: String(item.unit), total: Number(item.lineTotalExGstCents ?? 0) }; }) : [] };
}
function money(cents: number) { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100); }
function QuoteState({ title, body, success = false }: { title: string; body: string; success?: boolean }) { return <main className="customer-flow"><header><Link href="/" className="relay-app-brand">TradieRelay</Link></header><section className="customer-card customer-state"><span className={success ? 'customer-success-icon' : 'photo-icon'}>{success ? '✓' : '↗'}</span><h1>{title}</h1><p>{body}</p>{!success && <Link href="/book">Contact TradieRelay</Link>}</section></main>; }
function record(value: unknown): Record<string, unknown> { return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}; }
