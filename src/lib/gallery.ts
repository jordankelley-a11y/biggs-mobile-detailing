import { GALLERY, type GalleryItem } from '../config/site';

/**
 * Your own photos: just drop image files into the  src/gallery  folder.
 * No code or config editing needed — see src/gallery/HOW-TO-ADD-PHOTOS.txt.
 *
 * Naming:
 *   leather-seats.jpg                 → one photo titled "Leather seats"
 *   02-wheels.jpg                     → "Wheels" (the number only controls the order)
 *   truck-before.jpg + truck-after.jpg → one tile with a before/after view titled "Truck"
 *
 * If the folder has no photos, the labeled SAMPLE placeholders from site.ts are shown instead.
 */
const modules = import.meta.glob('/src/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

interface Group {
  key: string;
  single?: string;
  before?: string;
  after?: string;
}

function titleFrom(key: string): string {
  const cleaned = key
    .replace(/^\d+[-_.\s]*/, '') // drop leading ordering number
    .replace(/[-_]+/g, ' ')
    .trim();
  if (!cleaned) return 'Our work';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function getGallery(): GalleryItem[] {
  const groups = new Map<string, Group>();

  for (const [path, url] of Object.entries(modules)) {
    const file = path.split('/').pop() ?? '';
    const base = file.replace(/\.[^.]+$/, '');
    const m = base.match(/^(.*?)[-_ ](before|after)$/i);
    const key = (m ? m[1] : base).trim();
    const g = groups.get(key) ?? { key };
    if (m && m[2].toLowerCase() === 'before') g.before = url;
    else if (m) g.after = url;
    else g.single = url;
    groups.set(key, g);
  }

  const items: GalleryItem[] = [...groups.values()]
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
    .map((g) => {
      const title = titleFrom(g.key);
      const src = g.after ?? g.single ?? g.before!;
      const hasPair = Boolean(g.before && (g.after ?? g.single));
      return {
        src,
        beforeSrc: hasPair ? g.before : undefined,
        title,
        category: 'Our work',
        alt: `${title} — detailing by BIGGS Mobile Detailing`,
      };
    });

  return items.length > 0 ? items : GALLERY;
}
