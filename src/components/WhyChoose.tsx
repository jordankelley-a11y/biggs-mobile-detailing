import Reveal from './Reveal';

const BENEFITS = [
  {
    title: 'MOBILE CONVENIENCE',
    body: 'We bring the detail to your home or workplace, saving you the trip to a detailing shop.',
  },
  {
    title: 'ATTENTION TO DETAIL',
    body: 'We take our time with the areas that make the biggest difference, delivering a thorough and professional finish.',
  },
  {
    title: 'PERSONAL SERVICE',
    body: 'As an owner-operated business, we focus on clear communication, dependable service, and results our customers can appreciate.',
  },
];

export default function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-ink py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Why BIGGS</p>
          <h2 id="why-title" className="section-title">
            Quality you can see. Convenience you can feel.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b.title} className="bg-ink">
              <Reveal delay={i * 100} className="h-full">
                <div className="h-full bg-charcoal p-8 sm:p-10">
                  <p aria-hidden="true" className="text-sm font-bold tracking-[0.2em] text-accent">
                    0{i + 1}
                  </p>
                  <h3 className="mt-5 text-lg font-black uppercase tracking-wide">{b.title}</h3>
                  <p className="mt-4 leading-relaxed text-silver">{b.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
