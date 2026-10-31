import { SITE } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-24 pt-10 lg:pb-10">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-center text-xs text-silver sm:flex-row sm:text-left">
        <p className="font-semibold uppercase tracking-[0.2em] text-white">{SITE.name}</p>
        <p>
          {SITE.city}, {SITE.state} · {SITE.serviceArea}
        </p>
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
