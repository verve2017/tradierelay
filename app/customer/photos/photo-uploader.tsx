'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { announceDemoPhoto, saveDemoPhoto } from '@/lib/demo-photo-store';

type UploadedPhoto = { id: string; name: string; preview: string; size: number };

export function CustomerPhotos({ accessToken = null, demo = false }: { accessToken?: string | null; demo?: boolean }) {
  const [ready, setReady] = useState(demo);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (demo) return;
    async function establishSession() {
      if (!accessToken) { setError('This photo link is missing or has expired. Ask the tradie for a new link.'); return; }
      const response = await fetch('/api/session', { method: 'POST', headers: { authorization: `Bearer ${accessToken}` } });
      if (!response.ok) { setError('This photo link is invalid or has expired. Ask the tradie for a new link.'); return; }
      window.history.replaceState(null, '', '/customer/photos');
      setReady(true);
    }
    void establishSession();
  }, [accessToken, demo]);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true); setError(null);
    for (const file of Array.from(files).slice(0, Math.max(0, 6 - photos.length))) {
      if (file.size > 8_000_000) { setError(`${file.name} is over 8 MB.`); continue; }
      const preview = URL.createObjectURL(file);
      if (demo) {
        try {
          const saved = await saveDemoPhoto('job-sarah', file);
          URL.revokeObjectURL(preview);
          setPhotos((current) => [...current, { id: saved.id, name: saved.name, preview: saved.url, size: saved.sizeBytes }]);
          announceDemoPhoto('job-sarah');
        } catch {
          URL.revokeObjectURL(preview);
          setError('This browser could not save the demo photo. Try a normal browser tab.');
        }
        continue;
      }
      const response = await fetch('/api/customer/photos', { method: 'POST', headers: { 'content-type': file.type || 'image/jpeg' }, body: file });
      const result = await response.json() as { photo?: { id: string }; error?: { message?: string } };
      if (!response.ok || !result.photo) { URL.revokeObjectURL(preview); setError(result.error?.message ?? `${file.name} could not be uploaded.`); continue; }
      setPhotos((current) => [...current, { id: result.photo!.id, name: file.name, preview, size: file.size }]);
    }
    setUploading(false);
  }

  if (error && !ready) return <CustomerState title="That link has stopped working" body={error} />;
  if (!ready) return <CustomerState title="Opening your photo request…" body="Checking the secure link." />;
  if (done) return <CustomerState title="Photos sent. Nice one." body="The tradie can now see them on Sarah Mitchell’s job, under Customer photos." success action={demo ? { href: '/app/demo', label: 'Open the tradie app' } : undefined} />;

  return <main className="customer-flow"><header><Link href="/" className="relay-app-brand">TradieRelay</Link><span>Secure photo request</span></header><section className="customer-card"><span className="customer-kicker">HELP THE TRADIE ARRIVE READY</span><h1>Show us what’s going on.</h1><p>Take a clear photo of the problem and one wider photo showing the area around it. Don’t get close to anything unsafe.</p><label className="photo-drop"><input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple capture="environment" onChange={(event) => void addFiles(event.target.files)} disabled={uploading || photos.length >= 6} /><span className="photo-icon">+</span><strong>{uploading ? 'Uploading…' : 'Take or choose photos'}</strong><small>Up to 6 photos · 8 MB each</small></label>{error && <p className="relay-form-error">{error}</p>}{photos.length > 0 && <div className="photo-grid">{photos.map((photo) => <figure key={photo.id}><Image unoptimized src={photo.preview} alt="Selected job" width={180} height={180} /><figcaption>{photo.name}</figcaption></figure>)}</div>}<div className="customer-safety"><strong>Stay safe</strong><span>Don’t touch live wires, gas fittings, hot surfaces or anything under pressure. Step away and call 000 if there’s immediate danger.</span></div><button type="button" className="customer-primary" disabled={!photos.length || uploading} onClick={() => setDone(true)}>Done — send {photos.length || ''} photo{photos.length === 1 ? '' : 's'}</button><p className="customer-privacy">Only the tradie and TradieRelay support can access these photos.</p></section></main>;
}

function CustomerState({ title, body, success = false, action }: { title: string; body: string; success?: boolean; action?: { href: string; label: string } }) {
  return <main className="customer-flow"><header><Link href="/" className="relay-app-brand">TradieRelay</Link></header><section className="customer-card customer-state"><span className={success ? 'customer-success-icon' : 'photo-icon'}>{success ? '✓' : '↗'}</span><h1>{title}</h1><p>{body}</p>{action ? <Link href={action.href} className="customer-state-action">{action.label} →</Link> : !success && <Link href="/book">Contact TradieRelay</Link>}</section></main>;
}
