import BookButton from './BookButton';
import Reveal from './Reveal';
import {
  ADDONS,
  ALL_PACKAGES,
  EXTERIOR_PACKAGES,
  FULL_DETAILS,
  INTERIOR_PACKAGES,
  MAINTENANCE,
  MAINTENANCE_PLANS,
  MAINTENANCE_PLAN_NOTE,
  PRICING_NOTE,
  RESULTS_NOTE,
  type ServicePackage,
} from '../config/site';

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 flex-none text-silver" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="square" />
    </svg>
  );
}

function IncludeList({ pkg, compact = false }: { pkg: ServicePackage; compact?: boolean }) {
  return (
    <div className={compact ? 'space-y-5' : 'space-y-7'}>
      {pkg.groups.map((g, gi) => (
        <div key={g.title ?? gi}>
          {g.title ? <p className="eyebrow mb-3 !text-white">{g.title}</p> : null}
          <ul className="space-y-2.5">
            {g.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.92rem] leading-snug text-white/90">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Sedan / SUV / Truck prices side by side. */
function PriceRows({ pkg, big = false }: { pkg: ServicePackage; big?: boolean }) {
  if (!pkg.prices?.length) return null;
  return (
    <dl className={`grid grid-cols-3 divide-x divide-line border border-line ${big ? 'text-center' : 'text-center'}`}>
      {pkg.prices.map((p) => (
        <div key={p.label} className="px-2 py-3">
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-silver">{p.label}</dt>
          <dd className={`mt-1 font-black tracking-tight ${big ? 'text-2xl' : 'text-xl'}`}>{p.price}</dd>
        </div>
      ))}
    </dl>
  );
}

function Action({ pkg, className = '' }: { pkg: ServicePackage; className?: string }) {
  if (pkg.action === 'contact') {
    return (
      <a href="#contact" className={`btn-outline ${className}`}>
        {pkg.buttonLabel}
      </a>
    );
  }
  return (
    <BookButton pkg={pkg} className={className}>
      {pkg.buttonLabel}
    </BookButton>
  );
}

const startingOf = (pkg: ServicePackage) => pkg.startingPrice ?? pkg.prices?.[0]?.price ?? '';

/** Large card for the two full-detail packages. */
function FeaturedCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <article
      aria-labelledby={`${pkg.id}-name`}
      className={`relative flex w-full flex-col p-7 sm:p-10 ${pkg.featured ? 'border border-white/25 bg-panel' : 'border border-line bg-charcoal'}`}
    >
      {pkg.featured ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-accent" /> : null}
      <p className={`eyebrow mb-3 ${pkg.featured ? '!text-white' : ''}`}>{pkg.featured ? 'Premium package' : 'Full detail'}</p>
      <h3 id={`${pkg.id}-name`} className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
        {pkg.name}
      </h3>
      <p className="mt-4 leading-relaxed text-silver">{pkg.description}</p>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver">Starting at</p>
        <p className="mb-4 mt-1 text-5xl font-black tracking-tight">{startingOf(pkg)}</p>
        <PriceRows pkg={pkg} big />
      </div>

      <div className="mt-8 border-t border-line pt-7">
        <IncludeList pkg={pkg} />
      </div>

      <div className="mt-auto pt-9">
        <Action pkg={pkg} className="w-full" />
      </div>
    </article>
  );
}

/** Compact card for interior-only / exterior-only packages. Details collapse to keep the menu scannable. */
function CompactCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <article aria-labelledby={`${pkg.id}-name`} className="flex h-full flex-col border border-line bg-charcoal p-6 sm:p-8">
      <h4 id={`${pkg.id}-name`} className="text-xl font-black uppercase tracking-tight">
        {pkg.name}
      </h4>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-silver">{pkg.description}</p>
      <div className="mt-5">
        <PriceRows pkg={pkg} />
      </div>
      <details className="group mt-5 border-t border-line pt-4">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
          What’s included
          <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-2 pt-3">
          <IncludeList pkg={pkg} compact />
        </div>
      </details>
      <div className="mt-auto pt-6">
        <Action pkg={pkg} className="w-full" />
      </div>
    </article>
  );
}

function GroupHeading({ children }: { children: string }) {
  return <h3 className="mb-6 border-b border-line pb-3 text-sm font-bold uppercase tracking-[0.22em]">{children}</h3>;
}

export default function Services() {
  const confirmedAddOns = ADDONS.filter((a) => a.confirmed);
  const comparable = ALL_PACKAGES.filter((p) => p.prices?.length);

  return (
    <section id="services" aria-labelledby="services-title" className="bg-ink py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Services</p>
          <h2 id="services-title" className="section-title">
            Detailing that goes beyond the surface.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
            Whether your vehicle needs a refresh or a deeper reset, we bring professional detailing directly to you.
          </p>
        </Reveal>

        {/* Full details */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          {FULL_DETAILS.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 120} className="flex">
              <FeaturedCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        {/* Compare */}
        <Reveal className="mt-20">
          <GroupHeading>Compare our services</GroupHeading>
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Starting prices by vehicle type</caption>
            <thead>
              <tr className="text-[0.65rem] uppercase tracking-[0.16em] text-silver sm:text-xs">
                <th scope="col" className="py-3 pr-2 font-semibold">
                  Service
                </th>
                {['Sedan', 'SUV', 'Truck'].map((h) => (
                  <th key={h} scope="col" className="px-1 py-3 text-right font-semibold sm:px-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparable.map((p) => (
                <tr key={p.id} className={`border-t border-line ${p.featured ? 'bg-panel' : ''}`}>
                  <th scope="row" className="py-3.5 pr-2 text-[0.72rem] font-bold uppercase leading-tight tracking-wide sm:text-sm">
                    {p.name}
                  </th>
                  {p.prices!.map((pr) => (
                    <td key={pr.label} className="px-1 py-3.5 text-right font-semibold tabular-nums sm:px-4">
                      {pr.price}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-line">
                <th scope="row" className="py-3.5 pr-2 text-[0.72rem] font-bold uppercase leading-tight tracking-wide sm:text-sm">
                  {MAINTENANCE.name}
                </th>
                <td colSpan={3} className="px-1 py-3.5 text-right font-semibold sm:px-4">
                  Starting at {startingOf(MAINTENANCE)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm leading-relaxed text-silver">{PRICING_NOTE}</p>
        </Reveal>

        {/* Interior */}
        <div className="mt-20">
          <Reveal>
            <GroupHeading>Interior detail packages</GroupHeading>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {INTERIOR_PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <CompactCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Exterior */}
        <div className="mt-16">
          <Reveal>
            <GroupHeading>Exterior detail packages</GroupHeading>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {EXTERIOR_PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <CompactCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="mt-16">
          <Reveal>
            <GroupHeading>Maintenance</GroupHeading>
            <article aria-labelledby={`${MAINTENANCE.id}-name`} className="grid gap-8 border border-line bg-charcoal p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h4 id={`${MAINTENANCE.id}-name`} className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                  {MAINTENANCE.name}
                </h4>
                <p className="mt-3 leading-relaxed text-silver">{MAINTENANCE.description}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-silver">Starting at</p>
                <p className="mt-1 text-4xl font-black tracking-tight">{startingOf(MAINTENANCE)}</p>
                {MAINTENANCE.prices ? (
                  <div className="mt-4">
                    <PriceRows pkg={MAINTENANCE} />
                  </div>
                ) : null}
                <div className="mt-6">
                  <IncludeList pkg={MAINTENANCE} compact />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="eyebrow mb-4 !text-white">Maintenance plan options</p>
                <dl className="divide-y divide-line border-y border-line">
                  {MAINTENANCE_PLANS.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-sm">{m.label}</dt>
                      <dd className="text-lg font-black tracking-tight">{m.price}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm leading-relaxed text-silver">{MAINTENANCE_PLAN_NOTE}</p>
                <div className="mt-auto pt-8">
                  <Action pkg={MAINTENANCE} className="w-full sm:w-auto" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Add-ons: hidden until you confirm at least one in src/config/site.ts */}
        {confirmedAddOns.length > 0 ? (
          <div className="mt-16">
            <Reveal>
              <GroupHeading>Optional add-ons</GroupHeading>
              <ul className="grid gap-px bg-line sm:grid-cols-2">
                {confirmedAddOns.map((a) => (
                  <li key={a.name} className="flex items-baseline justify-between gap-4 bg-charcoal px-6 py-4">
                    <span className="text-sm">{a.name}</span>
                    <span className="text-sm font-semibold text-silver">{a.price || 'Contact us for pricing'}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ) : null}

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-silver">{RESULTS_NOTE}</p>
      </div>
    </section>
  );
}
