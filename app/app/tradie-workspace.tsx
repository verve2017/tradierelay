'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type LineItem = { id?: string; description: string; quantityMilli: number; unit: string; unitRateExGstCents: number | null };
type QuoteState = { id: string; status: string; note: string; lines: LineItem[]; totalCents: number; validUntil: string };
type WorkspaceJob = {
  id: string; customerId: string; customer: string; phone: string; suburb: string; title: string; description: string;
  summary: string; age: string; urgency: 'emergency' | 'urgent' | 'standard' | 'flexible'; status: string;
  preferredWindows: string[]; quote: QuoteState | null;
};
type WorkspaceData = { businessName: string; ownerName: string; gstRegistered: boolean; jobs: WorkspaceJob[] };

const demoData: WorkspaceData = {
  businessName: "Bob's Handyman", ownerName: 'Bob', gstRegistered: true,
  jobs: [
    { id: 'job-sarah', customerId: 'customer-sarah', customer: 'Sarah Mitchell', phone: '0412 345 678', suburb: 'Burleigh Waters', title: 'Burst flexi hose', description: 'Burst flexi hose under the kitchen sink. Water is leaking. The caller has shut off the mains.', summary: 'Noticed leaking this morning. Access is clear under the sink. Needs help today if possible.', age: '2 min ago', urgency: 'urgent', status: 'New', preferredWindows: ['This arvo', 'Friday morning'], quote: null },
    { id: 'job-emma', customerId: 'customer-emma', customer: 'Emma Taylor', phone: '0421 620 118', suburb: 'Palm Beach', title: 'Tap leaking', description: 'Kitchen tap has been leaking for two days. No flooding and the isolation valve still works.', summary: 'Routine repair. Customer is available Tuesday or Wednesday afternoon.', age: '28 min ago', urgency: 'standard', status: 'Callback due', preferredWindows: ['Tuesday arvo', 'Wednesday arvo'], quote: null },
    { id: 'job-james', customerId: 'customer-james', customer: 'James Ryan', phone: '0403 555 014', suburb: 'Miami', title: 'Toilet not flushing', description: 'Upstairs toilet will not flush. The other toilet is working.', summary: 'Customer sent a photo and wants an estimate before booking.', age: '1 hr ago', urgency: 'standard', status: 'Draft quote', preferredWindows: ['Thursday morning'], quote: { id: 'demo-quote-james', status: 'draft', note: '', validUntil: '12 September 2026', totalCents: 25500, lines: [
      { id: 'demo-line-1', description: 'Call-out & assessment', quantityMilli: 1000, unit: 'job', unitRateExGstCents: 10000 },
      { id: 'demo-line-2', description: 'Cistern repair allowance', quantityMilli: 1000, unit: 'job', unitRateExGstCents: 13182 },
    ] } },
  ],
};

export function TradieWorkspace({ accessToken = null, demo = false }: { accessToken?: string | null; demo?: boolean }) {
  const [workspace, setWorkspace] = useState<WorkspaceData>(demo ? demoData : { businessName: '', ownerName: '', gstRegistered: false, jobs: [] });
  const [selectedId, setSelectedId] = useState(demo ? demoData.jobs[0].id : '');
  const [section, setSection] = useState<'jobs' | 'quotes' | 'customers' | 'rules'>('jobs');
  const [screen, setScreen] = useState<'detail' | 'edit_quote' | 'review_quote' | 'sent'>('detail');
  const [quote, setQuote] = useState<QuoteState | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [loading, setLoading] = useState(!demo);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (demo) return;
    let cancelled = false;
    async function load() {
      try {
        if (accessToken) {
          const session = await fetch('/api/session', { method: 'POST', headers: { authorization: `Bearer ${accessToken}` } });
          if (!session.ok) throw new Error('This secure link has expired. Ask for a new TradieRelay SMS.');
          window.history.replaceState(null, '', '/app');
        }
        const response = await fetch('/api/app/workspace', { cache: 'no-store' });
        const result = await response.json() as { workspace?: unknown; error?: { message?: string } };
        if (!response.ok || !result.workspace) throw new Error(result.error?.message ?? 'The workspace could not be loaded.');
        const normalised = normaliseWorkspace(result.workspace);
        if (!cancelled) { setWorkspace(normalised); setSelectedId(normalised.jobs[0]?.id ?? ''); setLoading(false); }
      } catch (loadError) {
        if (!cancelled) { setError(loadError instanceof Error ? loadError.message : 'The workspace could not be loaded.'); setLoading(false); }
      }
    }
    void load();
    return () => { cancelled = true; };
  }, [accessToken, demo]);

  const selected = workspace.jobs.find((job) => job.id === selectedId) ?? workspace.jobs[0];
  const quoteJobs = workspace.jobs.filter((job) => job.quote);
  const customerJobs = useMemo(() => Array.from(new Map(workspace.jobs.map((job) => [job.customerId, job])).values()), [workspace.jobs]);
  const subtotal = quote?.lines.reduce((sum, line) => sum + Math.round(((line.unitRateExGstCents ?? 0) * line.quantityMilli) / 1000), 0) ?? 0;
  const gst = workspace.gstRegistered ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + gst;

  function selectJob(id: string) { setSelectedId(id); setScreen('detail'); setQuote(null); setAcknowledged(false); setMobileDetailOpen(true); }
  function updateJobQuote(jobId: string, next: QuoteState) { setWorkspace((current) => ({ ...current, jobs: current.jobs.map((job) => job.id === jobId ? { ...job, status: next.status === 'sent' ? 'Quote sent' : 'Draft quote', quote: next } : job) })); }

  async function openQuote(job: WorkspaceJob) {
    setError(null);
    let next = job.quote;
    if (next && !demo) {
      const response = await fetch(`/api/app/quotes/${next.id}`, { cache: 'no-store' });
      const result = await response.json() as { quote?: unknown; error?: { message?: string } };
      if (!response.ok || !result.quote) { setError(result.error?.message ?? 'The quote could not be loaded.'); return; }
      next = normaliseQuoteBundle(result.quote);
    }
    if (!next) {
      if (demo) next = { id: `demo-quote-${job.id}`, status: 'draft', note: '', validUntil: '12 September 2026', totalCents: 28050, lines: [
        { description: 'Call-out & assessment', quantityMilli: 1000, unit: 'job', unitRateExGstCents: 10000 },
        { description: job.title, quantityMilli: 1000, unit: 'job', unitRateExGstCents: 15500 },
      ] };
      else {
        const response = await fetch(`/api/app/jobs/${job.id}/quotes`, { method: 'POST' });
        const result = await response.json() as { quote?: unknown; error?: { message?: string } };
        if (!response.ok || !result.quote) { setError(result.error?.message ?? 'The draft quote could not be created.'); return; }
        next = normaliseQuoteBundle(result.quote);
      }
    }
    setQuote(next); setScreen('edit_quote'); setMobileDetailOpen(true);
  }

  function updateLine(index: number, changes: Partial<LineItem>) { setQuote((current) => current ? { ...current, lines: current.lines.map((line, lineIndex) => lineIndex === index ? { ...line, ...changes } : line) } : current); }
  function addLine() { setQuote((current) => current ? { ...current, lines: [...current.lines, { description: 'New item', quantityMilli: 1000, unit: 'job', unitRateExGstCents: null }] } : current); }

  async function saveAndReview() {
    if (!quote || !selected) return;
    if (quote.lines.some((line) => !line.description.trim() || line.unitRateExGstCents === null)) { setError('Add a price to every line before review.'); return; }
    setError(null);
    let next = { ...quote, totalCents: total };
    if (!demo) {
      const response = await fetch(`/api/app/quotes/${quote.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ note: quote.note, lines: quote.lines }) });
      const result = await response.json() as { quote?: unknown; error?: { message?: string } };
      if (!response.ok || !result.quote) { setError(result.error?.message ?? 'The quote could not be saved.'); return; }
      next = normaliseQuoteBundle(result.quote);
    }
    setQuote(next); setScreen('review_quote'); updateJobQuote(selected.id, next);
  }

  async function approveQuote() {
    if (!quote || !selected || !acknowledged) return;
    setError(null);
    if (!demo) {
      const response = await fetch(`/api/app/quotes/${quote.id}/approve`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ acknowledged: true }) });
      const result = await response.json() as { error?: { message?: string } };
      if (!response.ok) { setError(result.error?.message ?? 'The quote could not be sent.'); return; }
    }
    const next = { ...quote, status: 'sent', totalCents: total };
    setQuote(next); updateJobQuote(selected.id, next); setScreen('sent'); setNotice(`Quote sent to ${selected.customer}.`);
  }

  if (loading) return <AccessState title="Opening your jobs…" body="Checking the secure link and loading the latest call details." />;
  if (error && !selected) return <AccessState title="This link needs replacing" body={error} />;

  return <main className="relay-app-shell">
    <header className="relay-demo-bar"><Link href="/" aria-label="TradieRelay home" className="relay-app-brand">TradieRelay</Link><span>{demo ? 'Working pilot · demo data' : workspace.businessName}</span><Link href={demo ? '/operator/demo' : '/features'}>{demo ? 'Operator view' : 'Help'}</Link></header>
    {notice && <button className="relay-toast" type="button" onClick={() => setNotice(null)}>{notice}<span>×</span></button>}
    <div className={`relay-workspace ${mobileDetailOpen ? 'is-detail-open' : ''}`}>
      <aside className="relay-job-list" aria-label="Tradie workspace">
        <div className="relay-list-heading"><div><p>Good morning, {workspace.ownerName}</p><h1>{sectionLabel(section)}</h1></div><button type="button" aria-label="Open workspace menu">•••</button></div>
        {section === 'jobs' && <><div className="relay-list-summary"><strong>{workspace.jobs.filter((job) => job.status.toLowerCase().includes('new')).length} new</strong><span>{workspace.jobs.filter((job) => ['urgent', 'emergency'].includes(job.urgency)).length} urgent</span></div><div className="relay-job-cards">{workspace.jobs.map((job) => <JobCard key={job.id} job={job} selected={selectedId === job.id} onClick={() => selectJob(job.id)} />)}</div></>}
        {section === 'quotes' && <div className="relay-job-cards relay-section-list">{quoteJobs.length ? quoteJobs.map((job) => <button type="button" key={job.id} className="relay-job-card" onClick={() => { selectJob(job.id); void openQuote(job); }}><span className="relay-card-row"><strong>{job.quote?.status.toUpperCase()}</strong><small>{money(job.quote?.totalCents ?? 0)}</small></span><b>{job.customer}</b><span>{job.title}</span></button>) : <EmptyList text="No quotes yet. Create one from a captured job." />}</div>}
        {section === 'customers' && <div className="relay-job-cards relay-section-list">{customerJobs.map((job) => <button type="button" key={job.customerId} className="relay-job-card" onClick={() => selectJob(job.id)}><b>{job.customer}</b><span>{job.phone}</span><span className="relay-suburb">● {job.suburb}</span></button>)}</div>}
        {section === 'rules' && <div className="relay-rules-card"><span>YOUR ANSWERING RULES</span><h2>Missed calls + after hours</h2><dl><div><dt>AI disclosure</dt><dd>Always on</dd></div><div><dt>Prices by phone</dt><dd>Never</dd></div><div><dt>Failed questions</dt><dd>Message mode after 2</dd></div><div><dt>Urgent jobs</dt><dd>Immediate SMS</dd></div></dl><a href="/setup">Review setup guide</a></div>}
        <nav className="relay-mobile-nav" aria-label="Workspace navigation">
          <button className={section === 'jobs' ? 'is-active' : ''} onClick={() => setSection('jobs')}>▣<span>Jobs</span></button><button className={section === 'quotes' ? 'is-active' : ''} onClick={() => setSection('quotes')}>▤<span>Quotes</span></button><button className={section === 'customers' ? 'is-active' : ''} onClick={() => setSection('customers')}>◎<span>Customers</span></button><button className={section === 'rules' ? 'is-active' : ''} onClick={() => setSection('rules')}>•••<span>Rules</span></button>
        </nav>
      </aside>
      {selected && <section className="relay-job-detail" aria-live="polite"><button className="relay-mobile-back" type="button" onClick={() => { setMobileDetailOpen(false); setScreen('detail'); }}>← Back to {sectionLabel(section).toLowerCase()}</button>
        {screen === 'detail' && <JobDetail job={selected} onCreateQuote={() => void openQuote(selected)} />}
        {screen === 'edit_quote' && quote && <QuoteEditor quote={quote} gstRegistered={workspace.gstRegistered} subtotal={subtotal} gst={gst} total={total} onChange={setQuote} onLineChange={updateLine} onAddLine={addLine} onReview={() => void saveAndReview()} onBack={() => setScreen('detail')} error={error} />}
        {screen === 'review_quote' && quote && <QuoteReview job={selected} quote={quote} gstRegistered={workspace.gstRegistered} total={total} acknowledged={acknowledged} onAcknowledge={setAcknowledged} onApprove={() => void approveQuote()} onBack={() => setScreen('edit_quote')} error={error} />}
        {screen === 'sent' && quote && <QuoteSent job={selected} quote={quote} onDone={() => { setScreen('detail'); setMobileDetailOpen(false); }} />}
      </section>}
    </div>
  </main>;
}

function JobCard({ job, selected, onClick }: { job: WorkspaceJob; selected: boolean; onClick: () => void }) { return <button type="button" className={`relay-job-card ${selected ? 'is-selected' : ''} ${['urgent', 'emergency'].includes(job.urgency) ? 'is-urgent' : ''}`} onClick={onClick}><span className="relay-card-row"><strong>{['urgent', 'emergency'].includes(job.urgency) ? 'URGENT' : job.status}</strong><small>{job.age}</small></span><b>{job.customer}</b><span>{job.title}</span><span className="relay-suburb">● {job.suburb || 'Suburb not confirmed'}</span></button>; }

function JobDetail({ job, onCreateQuote }: { job: WorkspaceJob; onCreateQuote: () => void }) { return <><div className="relay-detail-head"><div><p>{job.status} · captured by AI</p><h2>{job.customer}</h2><span>{job.suburb}</span></div><a href={`tel:${job.phone.replaceAll(' ', '')}`} className="relay-call-link">Call {job.phone}</a></div>{['urgent', 'emergency'].includes(job.urgency) && <div className="relay-urgent-banner"><strong>{job.title}</strong><span>{job.urgency === 'emergency' ? 'Potential safety risk—review immediately' : 'Customer needs help promptly'}</span></div>}<div className="relay-ai-label"><span>✦</span> AI captured · check anything marked uncertain</div><div className="relay-detail-grid"><article><span>WHAT THEY NEED</span><p>{job.description}</p></article><article><span>CALL SUMMARY</span><p>{job.summary}</p></article><article><span>DETAILS CAPTURED</span><dl><div><dt>Job</dt><dd>{job.title}</dd></div><div><dt>Suburb</dt><dd>{job.suburb || 'Not confirmed'}</dd></div><div><dt>Urgency</dt><dd>{job.urgency}</dd></div><div><dt>Best time</dt><dd>{job.preferredWindows.join(' or ') || 'Not confirmed'}</dd></div></dl></article></div><div className="relay-detail-actions"><a href={`tel:${job.phone.replaceAll(' ', '')}`} className="relay-secondary-action">Call customer</a><button type="button" className="relay-primary-action" onClick={onCreateQuote}>{job.quote ? 'Open draft quote' : 'Create draft quote'}</button></div></>; }

function QuoteEditor({ quote, gstRegistered, subtotal, gst, total, onChange, onLineChange, onAddLine, onReview, onBack, error }: { quote: QuoteState; gstRegistered: boolean; subtotal: number; gst: number; total: number; onChange: (quote: QuoteState) => void; onLineChange: (index: number, changes: Partial<LineItem>) => void; onAddLine: () => void; onReview: () => void; onBack: () => void; error: string | null }) { return <div className="relay-quote-editor"><div className="relay-editor-head"><button type="button" onClick={onBack}>← Job</button><div><span>DRAFT QUOTE</span><h2>Edit scope and price</h2></div></div><div className="relay-draft-warning">Draft only—the customer cannot see this yet.</div>{error && <p className="relay-form-error">{error}</p>}<div className="relay-line-items">{quote.lines.map((line, index) => <div className="relay-line-item" key={line.id ?? index}><label><span>Description</span><input value={line.description} onChange={(event) => onLineChange(index, { description: event.target.value })} /></label><label><span>Qty</span><input type="number" min="0.001" step="0.25" value={line.quantityMilli / 1000} onChange={(event) => onLineChange(index, { quantityMilli: Math.round(Number(event.target.value) * 1000) })} /></label><label><span>Rate ex GST</span><div className="relay-money-input"><b>$</b><input type="number" min="0" step="1" value={line.unitRateExGstCents === null ? '' : line.unitRateExGstCents / 100} onChange={(event) => onLineChange(index, { unitRateExGstCents: event.target.value === '' ? null : Math.round(Number(event.target.value) * 100) })} /></div></label></div>)}<button type="button" className="relay-add-line" onClick={onAddLine}>+ Add line item</button></div><label className="relay-note-field"><span>Note to customer (optional)</span><textarea maxLength={1000} value={quote.note} onChange={(event) => onChange({ ...quote, note: event.target.value })} placeholder="Add anything the customer should know…" /></label><div className="relay-totals"><div><span>Subtotal</span><b>{money(subtotal)}</b></div>{gstRegistered && <div><span>GST</span><b>{money(gst)}</b></div>}<div className="is-total"><span>Total {gstRegistered ? 'inc. GST' : ''}</span><b>{money(total)}</b></div></div><div className="relay-detail-actions"><button type="button" className="relay-primary-action" onClick={onReview}>Review quote</button></div></div>; }

function QuoteReview({ job, quote, gstRegistered, total, acknowledged, onAcknowledge, onApprove, onBack, error }: { job: WorkspaceJob; quote: QuoteState; gstRegistered: boolean; total: number; acknowledged: boolean; onAcknowledge: (value: boolean) => void; onApprove: () => void; onBack: () => void; error: string | null }) { return <div className="relay-review-screen"><div className="relay-editor-head"><button type="button" onClick={onBack}>← Edit</button><div><span>EXACT CUSTOMER PREVIEW</span><h2>Approve and send</h2></div></div>{error && <p className="relay-form-error">{error}</p>}<article className="relay-customer-preview"><div><strong>{job.customer}</strong><span>{job.suburb}</span></div><h3>Scope of works</h3><ul>{quote.lines.map((line, index) => <li key={line.id ?? index}><span>{line.description}</span><b>{money(Math.round(((line.unitRateExGstCents ?? 0) * line.quantityMilli) / 1000))}</b></li>)}</ul><div className="relay-preview-total"><span>Total</span><b>{money(total)}</b><small>{gstRegistered ? 'incl. GST' : 'GST not charged'}</small></div><p>Estimate valid for 14 days and subject to site inspection.</p></article><label className="relay-approval-check"><input type="checkbox" checked={acknowledged} onChange={(event) => onAcknowledge(event.target.checked)} /><span><strong>I reviewed the scope and price.</strong><small>TradieRelay will not send until you confirm.</small></span></label><div className="relay-detail-actions"><button type="button" className="relay-primary-action" disabled={!acknowledged} onClick={onApprove}>Approve &amp; send {money(total)}</button></div></div>; }

function QuoteSent({ job, quote, onDone }: { job: WorkspaceJob; quote: QuoteState; onDone: () => void }) { return <div className="relay-success-screen"><span className="relay-success-tick">✓</span><p>QUOTE SENT</p><h2>{money(quote.totalCents)}</h2><h3>{job.customer} has the review link.</h3><span>They can accept or request a change. You will get a plain SMS when they respond.</span><button type="button" className="relay-primary-action" onClick={onDone}>Back to jobs</button></div>; }
function AccessState({ title, body }: { title: string; body: string }) { return <main className="relay-access-state"><Link href="/" className="relay-app-brand">TradieRelay</Link><div><span>SECURE WORKSPACE</span><h1>{title}</h1><p>{body}</p><Link href="/book">Contact TradieRelay</Link></div></main>; }
function EmptyList({ text }: { text: string }) { return <div className="relay-empty-list"><strong>Nothing waiting</strong><span>{text}</span></div>; }
function sectionLabel(section: 'jobs' | 'quotes' | 'customers' | 'rules') { return section === 'rules' ? 'Your rules' : section[0].toUpperCase() + section.slice(1); }
function money(cents: number) { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100); }

function normaliseWorkspace(value: unknown): WorkspaceData {
  const source = value as { tenant: Record<string, unknown>; user?: Record<string, unknown> | null; jobs: Array<Record<string, unknown>> };
  return { businessName: String(source.tenant.businessName ?? 'Tradie business'), ownerName: String(source.user?.name ?? source.tenant.ownerName ?? 'there'), gstRegistered: Boolean(source.tenant.gstRegistered), jobs: (source.jobs ?? []).map((entry) => {
    const customer = entry.customer as Record<string, unknown>; const rawQuote = entry.quote as Record<string, unknown> | null;
    return { id: String(entry.id), customerId: String(customer.id), customer: String(customer.name ?? customer.phoneE164 ?? 'Unknown caller'), phone: String(customer.phoneE164 ?? ''), suburb: String(entry.suburb ?? customer.suburb ?? ''), title: String(entry.title), description: String(entry.description), summary: String(entry.summary), age: relativeAge(String(entry.createdAt)), urgency: entry.urgency as WorkspaceJob['urgency'], status: String(entry.status).replaceAll('_', ' '), preferredWindows: Array.isArray(entry.preferredWindows) ? entry.preferredWindows.map(String) : [], quote: rawQuote ? { id: String(rawQuote.id), status: String(rawQuote.status), note: String(rawQuote.customerNote ?? ''), lines: [], totalCents: Number(rawQuote.totalCents ?? 0), validUntil: String(rawQuote.validUntil ?? '') } : null };
  }) };
}
function normaliseQuoteBundle(value: unknown): QuoteState { const source = value as { quote: Record<string, unknown>; items: Array<Record<string, unknown>> }; return { id: String(source.quote.id), status: String(source.quote.status), note: String(source.quote.customerNote ?? ''), totalCents: Number(source.quote.totalCents ?? 0), validUntil: String(source.quote.validUntil ?? ''), lines: (source.items ?? []).map((item) => ({ id: String(item.id), description: String(item.description), quantityMilli: Number(item.quantityMilli), unit: String(item.unit), unitRateExGstCents: item.unitRateExGstCents === null ? null : Number(item.unitRateExGstCents) })) }; }
function relativeAge(value: string) { const minutes = Math.max(0, Math.round((Date.now() - Date.parse(value)) / 60_000)); if (minutes < 2) return 'Just now'; if (minutes < 60) return `${minutes} min ago`; if (minutes < 1440) return `${Math.round(minutes / 60)} hr ago`; return `${Math.round(minutes / 1440)} d ago`; }
