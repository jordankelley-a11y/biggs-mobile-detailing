// Runs after "vite build": writes the fully rendered page into dist/index.html
// so search engines see all text and links immediately.
// If anything goes wrong it leaves the normal site untouched (the site still works).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const htmlPath = resolve('dist/index.html');
try {
  const { render } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href);
  const html = readFileSync(htmlPath, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('root element not found');
  writeFileSync(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
  console.log('Prerender: page HTML written to dist/index.html');
} catch (err) {
  console.warn('Prerender skipped (site still works normally):', err?.message ?? err);
} finally {
  rmSync(resolve('dist-server'), { recursive: true, force: true });
}
