import { useEffect, useRef, useState } from 'react';
import BookButton from './BookButton';
import { SITE } from '../config/site';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  /** Reports menu state so the sticky mobile booking bar can get out of the way. */
  onMenuChange?: (open: boolean) => void;
}

export default function Header({ onMenuChange }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    onMenuChange?.(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onMenuChange]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-ink/95 backdrop-blur' : 'border-transparent bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" onClick={close} className="flex flex-col leading-none" aria-label={`${SITE.name} — home`}>
          <span className="text-xl font-black tracking-[0.12em] sm:hidden">{SITE.shortName}</span>
          <span className="text-[0.62rem] font-semibold tracking-[0.3em] text-silver sm:hidden">MOBILE DETAILING</span>
          <span className="hidden text-sm font-black tracking-[0.2em] sm:inline">BIGGS MOBILE DETAILING</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <BookButton className="!min-h-[42px] !px-5 !text-xs" />
        </nav>

        {/* Mobile menu button */}
        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-6 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-ink lg:hidden">
        <nav aria-label="Mobile" className="container-page py-4">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[54px] items-center text-sm font-semibold uppercase tracking-[0.18em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <BookButton className="mt-5 w-full" />
        </nav>
      </div>
    </header>
  );
}
