// Used only at build time: turns the page into plain HTML so Google can read
// every word without running any code. See scripts/prerender.mjs.
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(): string {
  return renderToString(<App />);
}
