const ITEMS = ['MOBILE CONVENIENCE', 'PROFESSIONAL ATTENTION TO DETAIL', 'PERSONALIZED SERVICE'];

export default function TrustBar() {
  return (
    <section aria-label="What to expect" className="border-y border-line bg-charcoal">
      <ul className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {ITEMS.map((item) => (
          <li key={item} className="py-5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/90 sm:px-4 sm:py-7 sm:text-xs">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
