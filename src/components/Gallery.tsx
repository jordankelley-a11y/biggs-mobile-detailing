import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { getGallery } from '../lib/gallery';

// Photos dropped into src/gallery (or the sample placeholders if that folder is empty).
const GALLERY = getGallery();
const INITIAL_COUNT = 9; // photos shown before "View all"

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = (index: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setActive(index);
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setActive((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length));
  }, []);

  // Show / hide the native <dialog> (gives us focus trapping + Escape for free).
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (active !== null && !dlg.open) {
      dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
  }, [active]);

  const onClosed = () => {
    setActive(null);
    document.documentElement.style.overflow = '';
    lastTrigger.current?.focus();
  };

  // Arrow-key navigation while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, step]);

  const item = active !== null ? GALLERY[active] : null;

  return (
    <section id="work" aria-labelledby="work-title" className="bg-charcoal py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Our Work</p>
          <h2 id="work-title" className="section-title">
            The results speak for themselves.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {GALLERY.slice(0, showAll ? GALLERY.length : INITIAL_COUNT).map((g, i) => (
            <li key={g.src}>
              <Reveal delay={(i % 3) * 90}>
                <button
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden bg-panel text-left"
                  aria-label={`Enlarge photo: ${g.title}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    width={900}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-black/65 px-4 py-3">
                    <span>
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-silver">{g.category}</span>
                      <span className="block text-sm font-bold uppercase tracking-wide">{g.title}</span>
                    </span>
                    {g.beforeSrc ? <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-silver">Before / After</span> : null}
                  </span>
                  {g.isSample ? (
                    <span className="absolute left-3 top-3 bg-black/80 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white">
                      Sample
                    </span>
                  ) : null}
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        {!showAll && GALLERY.length > INITIAL_COUNT ? (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setShowAll(true)} className="btn-outline">
              VIEW ALL {GALLERY.length} PHOTOS
            </button>
          </div>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        onClose={onClosed}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // click on the dark backdrop
        }}
        aria-label={item ? `Photo: ${item.title}` : 'Photo viewer'}
        className="m-0 h-full max-h-none w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-black"
      >
        {item ? (
          <div className="flex h-full w-full flex-col items-center justify-center px-4 py-16 sm:px-12" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className={`grid w-full max-w-6xl gap-3 ${item.beforeSrc ? 'md:grid-cols-2' : ''}`}>
              {item.beforeSrc ? (
                <figure>
                  <img src={item.beforeSrc} alt={`Before: ${item.alt}`} className="max-h-[70vh] w-full object-contain" />
                  <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-silver">Before</figcaption>
                </figure>
              ) : null}
              <figure>
                <img src={item.src} alt={item.beforeSrc ? `After: ${item.alt}` : item.alt} className="mx-auto max-h-[70vh] w-full object-contain" />
                <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-silver">
                  {item.beforeSrc ? 'After — ' : ''}
                  {item.title}
                  {item.isSample ? ' · SAMPLE IMAGE' : ''}
                </figcaption>
              </figure>
            </div>
          </div>
        ) : null}

        <button type="button" onClick={close} aria-label="Close photo viewer" className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center text-3xl leading-none hover:text-silver">
          <span aria-hidden="true">×</span>
        </button>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl hover:text-silver">
          <span aria-hidden="true">‹</span>
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl hover:text-silver">
          <span aria-hidden="true">›</span>
        </button>
      </dialog>
    </section>
  );
}
