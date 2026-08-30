'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type BlogCardArticle = {
  slug: string;
  number: number;
  category: string;
  title: string;
  description: string;
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  searchText: string;
};

export function BlogDirectory({ articles }: { articles: BlogCardArticle[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((article) => article.category)))], [articles]);
  const normalisedQuery = query.trim().toLowerCase();
  const isBrowsing = category === 'All' && normalisedQuery.length === 0;
  const results = useMemo(() => articles.filter((article) => {
    const categoryMatches = category === 'All' || article.category === category;
    const queryMatches = normalisedQuery.length === 0 || article.searchText.includes(normalisedQuery);
    return categoryMatches && queryMatches;
  }), [articles, category, normalisedQuery]);
  const featured = articles[0];
  const cards = isBrowsing ? articles.slice(1) : results;

  function clearFilters() {
    setQuery('');
    setCategory('All');
  }

  return (
    <>
      <div className="blog-explorer" aria-label="Find a TradieRelay guide">
        <div className="blog-search-wrap">
          <span aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="blog-search">Search practical guides</label>
          <input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search calls, bookings, quotes, safety, local growth…" autoComplete="off" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}
        </div>
        <div className="blog-filter-row" aria-label="Filter guides by topic">
          {categories.map((item) => {
            const count = item === 'All' ? articles.length : articles.filter((article) => article.category === item).length;
            return <button type="button" className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}<span>{count}</span></button>;
          })}
        </div>
        <div className="blog-result-summary" aria-live="polite">
          <strong>{isBrowsing ? `${articles.length} practical guides` : `${results.length} guide${results.length === 1 ? '' : 's'} found`}</strong>
          {!isBrowsing && <button type="button" onClick={clearFilters}>Reset search and filters</button>}
        </div>
      </div>

      {isBrowsing && featured && (
        <div className="blog-start-here">
          <div className="blog-hub-heading">
            <div><p className="eyebrow">START HERE</p><h2>Foundational guides</h2></div>
            <p>Each guide gives the short answer first, then shows exactly how the idea works in a trade business.</p>
          </div>
          <Link className="blog-feature-card" href={`/blog/${featured.slug}`}>
            <Image src={featured.heroImage} alt={featured.heroAlt} width={1200} height={800} />
            <div><span>{String(featured.number).padStart(2, '0')} · {featured.category}</span><h3>{featured.title}</h3><p>{featured.description}</p><strong>Read the guide →</strong></div>
          </Link>
        </div>
      )}

      {cards.length > 0 ? (
        <div className="blog-card-grid">
          {cards.map((article) => (
            <Link className="blog-card" href={`/blog/${article.slug}`} key={article.slug}>
              <Image src={article.heroImage} alt="" width={1200} height={800} />
              <div><span>{String(article.number).padStart(2, '0')} · {article.category}</span><h3>{article.title}</h3><p>{article.description}</p><strong>{article.readMinutes} min read →</strong></div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="blog-no-results">
          <span aria-hidden="true">⌕</span><h2>No guide matches that yet.</h2><p>Try a shorter phrase or clear the topic filter.</p><button type="button" onClick={clearFilters}>Show every guide</button>
        </div>
      )}
    </>
  );
}
