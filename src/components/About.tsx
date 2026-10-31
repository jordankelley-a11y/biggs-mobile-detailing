import Reveal from './Reveal';
import { SITE } from '../config/site';

const COPY = [
  "I'm Jordan Kelley, owner of BIGGS Mobile Detailing in Lubbock, Texas. I started detailing because I enjoy transforming vehicles and taking pride in the small details that make a big difference.",
  'My goal is to provide a convenient, professional detailing experience that makes customers feel confident about the care their vehicles receive.',
  'At BIGGS, we bring the service to you and treat every vehicle with care.',
];

export default function About() {
  const { aboutImage } = SITE;
  return (
    <section id="about" aria-labelledby="about-title" className="bg-charcoal py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow mb-4">About</p>
          <h2 id="about-title" className="section-title">
            Built on passion. Backed by detail.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-silver sm:text-lg">
            {COPY.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em]">
            {SITE.owner}
            <span className="block text-xs font-semibold text-silver">Owner, {SITE.name}</span>
          </p>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={100}>
          <figure className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden bg-panel lg:max-w-none">
            <img
              src={aboutImage.image}
              alt={aboutImage.alt}
              width={920}
              height={518}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {aboutImage.isSample ? (
              <figcaption className="absolute left-3 top-3 bg-black/80 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]">
                Sample — add a real photo of Jordan at work
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
