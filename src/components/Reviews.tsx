import Reveal from './Reveal';
import { SITE, isConfigured } from '../config/site';
import { getReviews } from '../lib/reviews';

const REVIEWS = getReviews();

/**
 * Shows REAL reviews from src/reviews/reviews.txt (plus the REVIEWS list in site.ts).
 * While that list is empty, a clearly labeled placeholder is shown instead —
 * nothing here is invented.
 */
export default function Reviews() {
  const hasReviews = REVIEWS.length > 0;
  const hasGoogle = isConfigured(SITE.googleReviewUrl);

  return (
    <section aria-labelledby="reviews-title" className="bg-ink py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Reviews</p>
          <h2 id="reviews-title" className="section-title">
            What our customers say
          </h2>
        </Reveal>

        {hasReviews ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <li key={`${r.name}-${r.quote.slice(0, 24)}`}>
                <figure className="flex h-full flex-col border border-line bg-charcoal p-8">
                  {r.rating ? (
                    <p className="mb-4 text-sm tracking-widest text-white" aria-label={`${r.rating} out of 5 stars`}>
                      {'★'.repeat(r.rating)}
                      <span className="text-line">{'★'.repeat(5 - r.rating)}</span>
                    </p>
                  ) : null}
                  <blockquote className="flex-1 leading-relaxed text-white/90">“{r.quote}”</blockquote>
                  <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.18em]">
                    {r.name}
                    {r.detail ? <span className="block font-normal text-silver">{r.detail}</span> : null}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 border border-dashed border-line bg-charcoal p-8 text-center sm:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-silver">Placeholder — no reviews added yet</p>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-silver">
              Real customer reviews will appear here. Add them in <code className="text-white">src/reviews/reviews.txt</code>.
            </p>
          </div>
        )}

        {hasGoogle ? (
          <div className="mt-10 text-center">
            <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              LEAVE A GOOGLE REVIEW
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
