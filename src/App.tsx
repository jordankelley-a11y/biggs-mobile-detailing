import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import Gallery from './components/Gallery';
import WhyChoose from './components/WhyChoose';
import About from './components/About';
import Reviews from './components/Reviews';
import FinalCta from './components/FinalCta';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyBook from './components/StickyBook';
import NotFound from './components/NotFound';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Single-page site: any path other than the home page gets the custom 404.
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/' && path !== '/index.html') return <NotFound />;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-white px-4 py-3 text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <Header onMenuChange={setMenuOpen} />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <Gallery />
        <WhyChoose />
        <About />
        <Reviews />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <StickyBook hidden={menuOpen} />
    </>
  );
}
