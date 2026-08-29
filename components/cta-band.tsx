
type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
};

export function CtaBand({
  eyebrow = 'READY TO STOP LOSING GOOD ENQUIRIES?',
  title = 'Keep working. We’ll catch the call.',
  body = 'Book a quick call with Noah. We’ll learn how your business handles enquiries and show you the simplest setup.',
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="shell cta-band-inner">
        <div>
          <p className="eyebrow light">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <a href="/book" className="button">Book a 15-min call</a>
      </div>
    </section>
  );
}
