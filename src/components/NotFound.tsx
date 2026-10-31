import BookButton from './BookButton';
import { SITE } from '../config/site';

/** Custom 404 — shown for any address other than the home page. */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">This page took a wrong turn.</h1>
      <p className="mt-5 max-w-md text-silver">
        The page you’re looking for doesn’t exist. Head back to {SITE.name} or book your detail directly.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a href="/" className="btn-outline">
          BACK TO HOME
        </a>
        <BookButton />
      </div>
    </main>
  );
}
