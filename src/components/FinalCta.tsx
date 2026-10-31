import BookButton from './BookButton';
import Reveal from './Reveal';
import { SITE } from '../config/site';

export default function FinalCta() {
  const { ctaImage } = SITE;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <img
        src={ctaImage.image}
        alt={ctaImage.alt}
        aria-hidden={ctaImage.alt ? undefined : true}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      <Reveal className="container-page text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-4xl font-black uppercase leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
          Your next detail starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Give your vehicle the attention it deserves. Book your premium mobile detail with BIGGS today.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <BookButton />
          <a href="#contact" className="btn-outline">
            QUESTIONS? CONTACT US
          </a>
        </div>
      </Reveal>

      {ctaImage.isSample ? (
        <p className="absolute bottom-3 right-3 hidden rounded bg-black/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-silver sm:block">
          Sample image — replace in src/config/site.ts
        </p>
      ) : null}
    </section>
  );
}
