import { useEffect, useState } from 'react';
import BookButton from './BookButton';

interface StickyBookProps {
  /** Hide while the mobile menu is open. */
  hidden?: boolean;
}

/**
 * Slim booking bar pinned to the bottom of phones/tablets.
 * Appears only after the visitor scrolls past the hero (which has its own booking button),
 * and hides on desktop where the header button is always visible.
 */
export default function StickyBook({ hidden = false }: StickyBookProps) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const show = past && !hidden;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-4 pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <BookButton className="w-full" />
    </div>
  );
}
