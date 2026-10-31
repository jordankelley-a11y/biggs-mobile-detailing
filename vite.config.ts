import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SITE, isConfigured } from './src/config/site';

/**
 * Fills the <head> (title, description, social-sharing tags, local-business data)
 * from src/config/site.ts so there is only ONE place to edit.
 * Also prints reminders at build time about anything still set to a placeholder.
 */
function siteMeta(): Plugin {
  const hasDomain = isConfigured(SITE.siteUrl);
  const base = hasDomain ? SITE.siteUrl.replace(/\/$/, '') : '';
  const abs = (p: string) => (base ? `${base}${p}` : p);

  // Only verified details go into structured data. Unknown fields are left out, never invented.
  const sameAs = [SITE.instagramUrl, SITE.facebookUrl].filter(isConfigured);
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: SITE.name,
    description: SITE.seo.description,
    founder: { '@type': 'Person', name: SITE.owner },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.stateAbbr,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: `${SITE.city}, ${SITE.stateAbbr}` },
    ...(hasDomain ? { url: base, image: abs(SITE.seo.ogImage) } : {}),
    ...(isConfigured(SITE.phone) ? { telephone: SITE.phone } : {}),
    ...(isConfigured(SITE.contactEmail) ? { email: SITE.contactEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return {
    name: 'biggs-site-meta',
    buildStart() {
      const todo: string[] = [];
      if (!isConfigured(SITE.squareBookingUrl)) todo.push('Square booking URL (booking buttons are NOT live yet)');
      if (!hasDomain) todo.push('siteUrl (needed for social-sharing + search data)');
      if (!isConfigured(SITE.phone)) todo.push('phone number');
      if (todo.length) {
        console.warn(`\n⚠  BIGGS config reminder — still placeholders in src/config/site.ts:\n   - ${todo.join('\n   - ')}\n`);
      }
    },
    transformIndexHtml(html) {
      const out = html
        .replaceAll('__TITLE__', SITE.seo.title)
        .replaceAll('__DESCRIPTION__', SITE.seo.description)
        .replaceAll('__SITE_NAME__', SITE.name)
        .replaceAll('__OG_IMAGE__', abs(SITE.seo.ogImage));
      return {
        html: hasDomain
          ? out.replace('<!--CANONICAL-->', `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />`)
          : out.replace('<!--CANONICAL-->', ''),
        tags: [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(jsonLd),
            injectTo: 'head',
          },
        ],
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
