'use client';

import { useMemo, useState } from 'react';

export type SavedProduct = { id: string; name: string; unit: string; rateExGstCents: number; notes: string | null; active: boolean };

export const demoProducts: SavedProduct[] = [
  { id: 'demo-product-callout', name: 'Call-out & assessment', unit: 'job', rateExGstCents: 10000, notes: 'Standard local call-out and initial assessment.', active: true },
  { id: 'demo-product-flexi', name: 'Replace flexi hose', unit: 'item', rateExGstCents: 15500, notes: 'Supply and replace a standard braided hose.', active: true },
  { id: 'demo-product-hour', name: 'General labour', unit: 'hour', rateExGstCents: 9500, notes: null, active: true },
  { id: 'demo-product-disposal', name: 'Waste disposal', unit: 'job', rateExGstCents: 4500, notes: 'Small-load disposal allowance.', active: false },
];

type ProductDraft = { name: string; unit: string; price: string; notes: string; active: boolean };
const emptyDraft: ProductDraft = { name: '', unit: 'job', price: '', notes: '', active: true };

export function ProductManager({ products, onProductsChange, demo, onNotice }: { products: SavedProduct[]; onProductsChange: (products: SavedProduct[]) => void; demo: boolean; onNotice: (message: string) => void }) {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.notes ?? ''}`.toLowerCase().includes(search.toLowerCase())), [products, search]);

  function beginAdd() { setEditingId('new'); setDraft(emptyDraft); setDeleteId(null); setError(null); }
  function beginEdit(product: SavedProduct) { setEditingId(product.id); setDraft({ name: product.name, unit: product.unit, price: (product.rateExGstCents / 100).toFixed(2), notes: product.notes ?? '', active: product.active }); setDeleteId(null); setError(null); }
  function commit(next: SavedProduct[]) { onProductsChange(next); if (demo) localStorage.setItem('tradierelay-demo-products', JSON.stringify(next)); }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rateExGstCents = Math.round(Number(draft.price) * 100);
    if (!draft.name.trim() || !Number.isFinite(rateExGstCents) || rateExGstCents < 0) { setError('Add a product name and valid ex-GST price.'); return; }
    setSaving(true); setError(null);
    const input = { name: draft.name.trim(), unit: draft.unit, rateExGstCents, notes: draft.notes.trim(), active: draft.active };
    if (demo) {
      const product: SavedProduct = editingId === 'new' ? { id: crypto.randomUUID(), ...input } : { id: editingId!, ...input };
      commit(editingId === 'new' ? [...products, product] : products.map((item) => item.id === editingId ? product : item));
    } else {
      const url = editingId === 'new' ? '/api/app/products' : `/api/app/products/${editingId}`;
      const response = await fetch(url, { method: editingId === 'new' ? 'POST' : 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });
      const result = await response.json() as { product?: SavedProduct; error?: { message?: string } };
      if (!response.ok || !result.product) { setError(result.error?.message ?? 'That product could not be saved.'); setSaving(false); return; }
      commit(editingId === 'new' ? [...products, result.product] : products.map((item) => item.id === editingId ? result.product! : item));
    }
    onNotice(editingId === 'new' ? 'Product saved to your account.' : 'Product changes saved.');
    setEditingId(null); setDraft(emptyDraft); setSaving(false);
  }

  async function toggleProduct(product: SavedProduct) {
    const active = !product.active;
    if (!demo) {
      const response = await fetch(`/api/app/products/${product.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active }) });
      if (!response.ok) { setError('That product could not be updated.'); return; }
    }
    commit(products.map((item) => item.id === product.id ? { ...item, active } : item));
    onNotice(active ? `${product.name} is available in quotes.` : `${product.name} is paused.`);
  }

  async function deleteProduct(product: SavedProduct) {
    if (deleteId !== product.id) { setDeleteId(product.id); return; }
    if (!demo) {
      const response = await fetch(`/api/app/products/${product.id}`, { method: 'DELETE' });
      if (!response.ok) { setError('That product could not be deleted.'); return; }
    }
    commit(products.filter((item) => item.id !== product.id));
    setDeleteId(null); setEditingId(null); onNotice(`${product.name} deleted. Existing quotes are unchanged.`);
  }

  return <div className="relay-products"><div className="relay-products-head"><div><span>SAVED TO YOUR ACCOUNT</span><h2>Products &amp; prices</h2><p>Add common services, parts and labour once, then drop them straight into a quote.</p></div><button type="button" onClick={beginAdd}>+ Add product</button></div><div className="relay-product-tools"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products…" aria-label="Search saved products" /><span>{products.filter((product) => product.active).length} active · Prices exclude GST</span></div>{error && <p className="relay-form-error">{error}</p>}{editingId && <form className="relay-product-form" onSubmit={saveProduct}><div className="relay-product-form-head"><strong>{editingId === 'new' ? 'Add a product or service' : 'Edit saved product'}</strong><button type="button" onClick={() => setEditingId(null)}>×</button></div><div><label><span>Name</span><input autoFocus required maxLength={140} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Replace kitchen mixer" /></label><label><span>Charge per</span><select value={draft.unit} onChange={(event) => setDraft({ ...draft, unit: event.target.value })}><option value="job">job</option><option value="hour">hour</option><option value="item">item</option><option value="metre">metre</option><option value="day">day</option></select></label><label><span>Price ex GST</span><div className="relay-money-input"><b>$</b><input required type="number" min="0" step="0.01" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} /></div></label><label className="is-wide"><span>Description or internal note</span><input maxLength={500} value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="What this normally includes" /></label></div><label className="relay-product-active"><input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} /><span>Available to add to new quotes</span></label><div className="relay-product-form-actions"><button type="button" onClick={() => setEditingId(null)}>Cancel</button><button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save product'}</button></div></form>}<div className="relay-product-list">{filtered.map((product) => <article key={product.id} className={!product.active ? 'is-paused' : ''}><div className="relay-product-main"><span>{product.unit.toUpperCase()}</span><div><strong>{product.name}</strong><small>{product.notes || 'No description added'}</small></div></div><div className="relay-product-price"><strong>{money(product.rateExGstCents)}</strong><small>ex GST / {product.unit}</small></div><div className="relay-product-actions"><button type="button" onClick={() => void toggleProduct(product)}>{product.active ? 'Pause' : 'Activate'}</button><button type="button" onClick={() => beginEdit(product)}>Edit</button><button type="button" className={deleteId === product.id ? 'confirm-delete' : ''} onClick={() => void deleteProduct(product)}>{deleteId === product.id ? 'Confirm delete' : 'Delete'}</button></div></article>)}{filtered.length === 0 && <EmptyProducts onAdd={beginAdd} />}</div><div className="relay-products-note"><strong>Saved prices are private.</strong><span>Customers only see items after you add them to a quote and approve the exact scope and total.</span></div></div>;
}

function EmptyProducts({ onAdd }: { onAdd: () => void }) { return <div className="relay-empty-products"><strong>No products found</strong><span>Add a saved item or change your search.</span><button type="button" onClick={onAdd}>Add product</button></div>; }
function money(cents: number) { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100); }
