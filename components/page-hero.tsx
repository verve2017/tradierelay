import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
};

export function PageHero({ eyebrow, title, body, note }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-lede">{body}</p>
        <div className="hero-actions">
          <Link href="/book" className="button">Book a 15-min call</Link>
          {note && <span className="hero-note"><span aria-hidden="true">✓</span>{note}</span>}
        </div>
      </div>
    </section>
  );
}
