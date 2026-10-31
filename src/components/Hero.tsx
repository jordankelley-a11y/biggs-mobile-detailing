import BookButton from './BookButton';
import { SITE } from '../config/site';

export default function Hero() {
  const { hero } = SITE;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink lg:min-h-[100svh] lg:items-center">
      {/* Background: optional looping video (hidden for reduced-motion users) over the image/poster */}
      <img
        src={hero.image}
        alt={hero.alt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {hero.video ? (
        <video
          className="absolute inset-0 -z-20 hidden h-full w-full object-cover motion-safe:block"
          src={hero.video}
          poster={hero.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : null}

      {/* Dark overlay keeps the text readable on any photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-page pb-16 pt-32 sm:pb-20 lg:pb-0 lg:pt-24">
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          LUBBOCK, TEXAS
        </p>

        <h1
          id="hero-title"
          className="max-w-4xl text-[2.6rem] font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl"
        >
          Your vehicle.
          <br />
          Reset to perfection.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Premium mobile detailing brought directly to your driveway. Experience the difference with BIGGS Mobile Detailing.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <BookButton className="w-full sm:w-auto" />
          <a href="#services" className="btn-outline w-full sm:w-auto">
            EXPLORE OUR SERVICES
          </a>
        </div>
      </div>

      {hero.isSample ? (
        <p className="absolute bottom-3 right-3 z-10 hidden rounded bg-black/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-silver sm:block">
          Sample hero image — replace in src/config/site.ts
        </p>
      ) : null}
    </section>
  );
}
