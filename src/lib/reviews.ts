import raw from '../reviews/reviews.txt?raw';
import { REVIEWS, type Review } from '../config/site';

/**
 * Reads real reviews from  src/reviews/reviews.txt  (plain text, no code needed),
 * then adds any listed in REVIEWS inside src/config/site.ts.
 */
export function parseReviews(text: string): Review[] {
  const out: Review[] = [];

  for (const block of text.split(/\r?\n[ \t]*\r?\n/)) {
    const lines = block
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
    if (lines.length < 2) continue;

    const last = lines[lines.length - 1];
    if (!/^[-–—]\s*\S/.test(last)) continue; // needs a "- Name" line

    const quote = lines.slice(0, -1).join(' ').replace(/^["“”]+|["“”]+$/g, '').trim();
    const [name, detail, stars] = last
      .replace(/^[-–—]\s*/, '')
      .split('|')
      .map((s) => s.trim());
    if (!quote || !name) continue;

    const n = Number(stars);
    out.push({
      quote,
      name,
      detail: detail || undefined,
      rating: Number.isInteger(n) && n >= 1 && n <= 5 ? (n as Review['rating']) : undefined,
    });
  }
  return out;
}

export function getReviews(): Review[] {
  return [...parseReviews(raw), ...REVIEWS];
}
