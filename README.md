# BIGGS Mobile Detailing — Website

React + Vite + TypeScript + Tailwind CSS single-page site. Bookings are handled by Square; there is no backend.

## 1. Preview it on your computer

Requires [Node.js](https://nodejs.org) 18.18+ (20 LTS or newer recommended).

```bash
npm install
npm run dev        # opens a live preview at http://localhost:5173
```

Other commands:

```bash
npm run build      # checks types + creates the publishable /dist folder
npm run preview    # serves the built /dist folder locally
```

## 2. Where to paste your Square booking URL

Open **`src/config/site.ts`** and find:

```ts
squareBookingUrl: 'https://YOUR-SQUARE-BOOKING-URL',
```

Replace it with your real link. **Every** "BOOK YOUR DETAIL" button (header, hero, sticky mobile bar, final call-to-action, contact section, 404 page) reads this one value. Buttons open Square in a new tab.

Want each package to open its own Square service page? In the same file, put that service's Square link in `bookingUrl` for **ULTIMATE REFRESH** / **ULTIMATE RESET**. Leave it `''` to use the main link.

## 3. Everything else you can edit in `src/config/site.ts`

| What | Where in the file |
| --- | --- |
| Phone, email, Instagram, Facebook, Google review link | `SITE` |
| Website address (`siteUrl`) — needed for sharing + search data | `SITE.siteUrl` |
| Service menu: packages, Sedan/SUV/Truck prices, maintenance, add-ons | `FULL_DETAILS`, `INTERIOR_PACKAGES`, `EXTERIOR_PACKAGES`, `MAINTENANCE`, `ADDONS` |
| Gallery photos | `GALLERY` |
| Customer reviews | plain text file `src/reviews/reviews.txt` (instructions inside) |
| Page title / description for Google | `SITE.seo` |

Placeholders (`YOUR-…`, `(XXX)…`) are treated as "not set": the site won't pretend a phone number or social link works, and structured data for Google only includes details you've actually filled in.

## 4. Replace the sample images with your own photos

1. Put your photos in **`public/images/`** (JPG, WebP or PNG; ~1920px wide for big photos, ~1200px for gallery, under ~400 KB each — [squoosh.app](https://squoosh.app) compresses for free).
2. In `src/config/site.ts`, change the path, e.g. `image: '/images/my-hero.jpg'`.
3. Set `isSample: false` (or delete that line) so the "SAMPLE" labels disappear.

- **Hero:** `SITE.hero.image` (optional looping video: `SITE.hero.video: '/images/hero.mp4'`).
- **Final call-to-action background:** `SITE.ctaImage`.
- **About photo (you working on a vehicle):** `SITE.aboutImage`.
- **Gallery (easiest):** just drop photos into the `src/gallery/` folder — no code editing. The file name becomes the caption (`leather-seats.jpg` → "Leather seats"); `name-before.jpg` + `name-after.jpg` make a before/after tile. Delete a file to remove it. Full instructions: `src/gallery/HOW-TO-ADD-PHOTOS.txt`. While that folder is empty, the labeled SAMPLE placeholders from `GALLERY` in `site.ts` are shown.
- **Social share image:** replace `public/og-image.png` (1200×630).
- **Favicon:** replace `public/favicon.svg` with your logo.

## 5. Contact form (no backend)

The form validates input, but a website can't send email by itself. Choose one in `src/config/site.ts`:

- **Best:** create a free form at [formspree.io](https://formspree.io), then paste its URL into `contactFormEndpoint`. Messages are emailed to you.
- **Simplest:** set `contactEmail`. The form then opens the visitor's email app with the message pre-filled.
- If neither is set, the form tells visitors it isn't connected yet and that their message was **not** sent.

## 6. Customer reviews

No reviews are listed on purpose. When you have real ones, add them to `src/reviews/reviews.txt` (instructions are at the top of that file). Never write reviews for customers. Set `googleReviewUrl` to show a "Leave a Google review" button.

## 7. Publish it

Any of these is free for a site like this; each runs `npm run build` and serves the `dist` folder:

**Netlify / Cloudflare Pages / Vercel (recommended)**
1. Put this folder in a GitHub repository.
2. Import the repo on the host. Build command: `npm run build`. Output folder: `dist`.
3. Add your domain in the host's settings. Then set `siteUrl` in `src/config/site.ts` to that address and redeploy.

**Drag-and-drop (Netlify):** run `npm run build` locally, then drag the generated `dist` folder onto netlify.com/drop.

`public/_redirects` makes unknown addresses load the site's custom 404 page on Netlify and Cloudflare Pages. On Vercel, add a `vercel.json` with a rewrite of `/(.*)` to `/index.html` if you want the custom 404 there.

## 8. Before launch checklist

- [ ] Square booking URL pasted and tested on a phone
- [ ] Real phone number, Instagram, Facebook, Google review link
- [ ] Contact form connected (Formspree endpoint or email)
- [ ] Real hero, gallery, about and call-to-action photos (all `isSample` flags removed)
- [ ] Real reviews added (or leave the section as-is until you have them)
- [ ] `siteUrl` set to your domain; `og-image.png` and favicon replaced
- [ ] Confirm package lists and starting prices match what you actually offer
- [ ] Submit the finished site to Google Business Profile and Google Search Console

## Project structure

```
src/
  config/site.ts      ← all editable business content (start here)
  components/         ← Header, Hero, Services, Gallery, Reviews, Contact, …
  index.css           ← Tailwind + small global styles
public/
  images/             ← your photos (samples are labeled placeholders)
vite.config.ts        ← fills page title, social tags and local-business data from site.ts
```
