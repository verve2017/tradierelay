
import Image from 'next/image';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  image?: string;
  imageAlt?: string;
  imageBadge?: string;
  imageCaption?: string;
};

export function PageHero({ eyebrow, title, body, note, image, imageAlt, imageBadge, imageCaption }: PageHeroProps) {
  return (
    <section className={`page-hero${image ? ' page-hero-has-visual' : ''}`}>
      <div className={`shell page-hero-inner${image ? ' page-hero-grid' : ''}`}>
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-lede">{body}</p>
          <div className="hero-actions">
            <a href="/book" className="button">Book a 15-min call</a>
            {note && <span className="hero-note"><span aria-hidden="true">✓</span>{note}</span>}
          </div>
        </div>
        {image && (
          <figure className="page-hero-visual">
            <Image
              src={image}
              alt={imageAlt ?? ''}
              fill
              priority
              sizes="(max-width: 900px) calc(100vw - 48px), 520px"
            />
            {(imageBadge || imageCaption) && (
              <figcaption>
                {imageBadge && <span>{imageBadge}</span>}
                {imageCaption && <strong>{imageCaption}</strong>}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  );
}
