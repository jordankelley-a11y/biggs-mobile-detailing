/**
 * ============================================================================
 *  BIGGS MOBILE DETAILING — SITE CONFIGURATION
 *  This is the ONE file you edit to update business details, links and images.
 * ============================================================================
 *
 *  QUICK START
 *  1. Paste your Square booking link into `squareBookingUrl` below.
 *  2. Fill in phone, social links, contact email and Google review link.
 *  3. Drop your photos into /public/images and update the paths further down.
 *
 *  Anything still set to a placeholder (e.g. "https://YOUR-...", "(XXX) ...")
 *  is treated as "not set yet" — the site will not link to it as if it worked.
 */

export interface PriceRow {
  label: string; // e.g. "Sedan"
  price: string; // e.g. "$200"
}

export interface IncludeGroup {
  /** Small heading above the list, e.g. "Interior". Omit for a single plain list. */
  title?: string;
  items: string[];
}

export interface AddOn {
  name: string;
  /** Leave '' to show "Contact us for pricing". Never guess a price. */
  price: string;
  /** Add-ons are HIDDEN until you set this to true. */
  confirmed: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  /** What's included, in one or more groups (e.g. Interior / Exterior). */
  groups: IncludeGroup[];
  /** Per-vehicle prices (Sedan / SUV / Truck). */
  prices?: PriceRow[];
  /** Big "Starting at" price. If omitted, the first entry of `prices` is used. */
  startingPrice?: string;
  buttonLabel: string;
  /** 'book' (default) opens Square. 'contact' scrolls to the contact form instead. */
  action?: 'book' | 'contact';
  /** Highlights this card as the premium option. */
  featured?: boolean;
  /**
   * OPTIONAL: a Square link that opens this specific service.
   * Leave empty ('') to use the main `squareBookingUrl`.
   * (In Square Appointments you can copy a link for an individual service
   *  from your Online Booking settings — paste it here.)
   */
  bookingUrl: string;
}

export interface GalleryItem {
  /** Image shown in the grid and lightbox (the "after" / finished result). */
  src: string;
  /** OPTIONAL: a real "before" photo. If set, the lightbox shows before + after. */
  beforeSrc?: string;
  /** Describe what the photo shows (used for accessibility + SEO). */
  alt: string;
  /** Short label on the tile, e.g. "Leather seats". */
  title: string;
  category: string;
  /**
   * `true` = temporary sample image. The tile shows a "SAMPLE" badge.
   * Set to `false` (or delete the line) once you swap in your own real photo.
   */
  isSample?: boolean;
}

export interface Review {
  quote: string; // the customer's real words
  name: string; // real customer name (or first name + initial, with their OK)
  detail?: string; // e.g. "Ultimate Reset" or "Google review"
  rating?: 1 | 2 | 3 | 4 | 5; // only add if the review really has a star rating
}

export const SITE = {
  // ---------------------------------------------------------------- Business
  name: 'BIGGS Mobile Detailing',
  shortName: 'BIGGS',
  owner: 'Jordan Kelley',
  city: 'Lubbock',
  state: 'Texas',
  stateAbbr: 'TX',
  serviceArea: 'Lubbock and surrounding areas',

  /**
   * Your live website address (no trailing slash), e.g. "https://biggsdetailing.com".
   * Used for canonical link, social sharing and search-engine data.
   * Leave as-is until you have a domain.
   */
  siteUrl: 'https://biggsmobiledetaing.com',

  // -------------------------------------------------------------- Booking ⭐
  /**
   * ⭐⭐⭐  PASTE YOUR SQUARE BOOKING URL HERE  ⭐⭐⭐
   * Every "BOOK YOUR DETAIL" button on the site uses this one value.
   * Set to the BIGGS Square booking page (the services list).
   */
  squareBookingUrl: 'https://book.squareup.com/appointments/oegmv8fd8z77i6/location/LV6J2J74H2605/services',

  // ------------------------------------------------------- Contact + social
  /** Format however you like, e.g. "(806) 555-0123". */
  phone: '(806) 218-8468',
  /** Public contact email. Leave '' if you don't want one shown. Used by the contact form (see below). */
  contactEmail: 'jordankelley@biggsmobiledetailing.com',
  instagramUrl: 'https://www.instagram.com/lubbockautodetailer/',
  facebookUrl: '', // not used — leave empty to hide Facebook everywhere
  /** Your Google Business Profile "write a review" link. Shows a button in the Reviews section once set. */
  googleReviewUrl: 'https://share.google/c4wbd5h81GGOdhDGi',

  /**
   * CONTACT FORM — pick ONE way to receive messages (there is no backend):
   *  A) `contactFormEndpoint`: a form service URL (e.g. Formspree: https://formspree.io/f/xxxxxxx).
   *     The form posts there and the service emails you. Easiest + most reliable.
   *  B) `contactEmail` (above): with no endpoint, the form opens the visitor's email app,
   *     pre-filled and addressed to you.
   *  If neither is set, the form validates but tells the visitor it isn't connected yet
   *  and points them to booking/phone — it never pretends a message was sent.
   */
  contactFormEndpoint: '',

  // -------------------------------------------------------------------- SEO
  seo: {
    title: 'Mobile Car Detailing in Lubbock, TX | BIGGS Mobile Detailing',
    description:
      'Premium mobile car detailing in Lubbock, TX. Interior and exterior detailing brought to your home or work. Book your detail online with BIGGS Mobile Detailing.',
    /** 1200×630 image used when the site is shared on social media. */
    ogImage: '/og-image.png',
  },

  // ----------------------------------------------------------------- Images
  /**
   * Put your own files in /public/images and point to them like "/images/my-hero.jpg".
   * Tip: compress photos first (about 1920px wide, under ~400 KB) — squoosh.app is free.
   */
  hero: {
    image: '/images/hero-panamera.jpg', // previous hero (interior vacuuming still): '/images/hero.jpg'
    alt: 'Black Porsche Panamera with a glossy finish after a detail',
    /** OPTIONAL: path to a short looping MP4 (muted, ~10 sec). Image above is used as the poster. */
    video: '',
    isSample: false, // true shows a "sample image" label
  },
  ctaImage: {
    image: '/images/cta.jpg',
    alt: '',
    isSample: false,
  },
  aboutImage: {
    image: '/images/about.jpg',
    alt: 'Detailer pressure washing a black vehicle',
    isSample: false,
  },
} as const;

const sizes = (sedan: string, suv: string, truck: string): PriceRow[] => [
  { label: 'Sedan', price: sedan },
  { label: 'SUV', price: suv },
  { label: 'Truck', price: truck },
];

/**
 * SERVICE MENU — edit names, descriptions, bullet lists and prices here.
 * Every package's `bookingUrl` is optional: leave '' to use the main Square link.
 */

/** FULL DETAILS — shown large at the top. Ultimate Reset is the featured premium package. */
export const FULL_DETAILS: ServicePackage[] = [
  {
    id: 'ultimate-refresh',
    name: 'ULTIMATE REFRESH',
    description:
      "A thorough interior and exterior detail designed to restore your vehicle's clean, fresh appearance.",
    prices: sizes('$200', '$225', '$250'),
    groups: [
      {
        title: 'Interior',
        items: [
          'Thorough interior vacuuming',
          'Blowout of accessible cracks and crevices',
          'Cleaning of dashboard, console, door panels, and interior surfaces',
          'Interior glass cleaning',
          'Cleaning of rubber floor mats',
          'Leather seat cleaning where applicable',
          'Interior finishing and dressing appropriate for the surface',
        ],
      },
      {
        title: 'Exterior',
        items: ['Hand wash', 'Wheel and tire cleaning', 'Exterior glass cleaning', 'Cleaning of door jambs', 'Wax protection', 'Tire dressing'],
      },
    ],
    buttonLabel: 'BOOK ULTIMATE REFRESH',
    bookingUrl: '',
  },
  {
    id: 'ultimate-reset',
    name: 'ULTIMATE RESET',
    description:
      'Our premium full detail for vehicles needing deeper interior cleaning and enhanced exterior protection.',
    prices: sizes('$275', '$325', '$350'),
    groups: [
      {
        title: 'Interior',
        items: [
          'Thorough interior vacuuming and blowout',
          'Deep cleaning of interior surfaces',
          'Interior steam cleaning where appropriate',
          'Carpet and fabric seat shampooing when needed and suitable',
          'Leather cleaning and conditioning where applicable',
          'Cleaning of rubber floor mats',
          'Detailed cleaning of cracks, crevices, and hard-to-reach areas',
          'Interior glass cleaning',
          'Cleaning of door jambs',
          'Interior surface protection and finishing',
        ],
      },
      {
        title: 'Exterior',
        items: [
          'Thorough hand wash',
          'Wheel and tire cleaning',
          'Clay bar paint decontamination',
          'Cleaning of exterior glass',
          'Cleaning of door jambs',
          'Three-month sealant protection',
          'Exterior trim treatment where included',
          'Tire dressing',
        ],
      },
    ],
    buttonLabel: 'BOOK ULTIMATE RESET',
    featured: true,
    bookingUrl: '',
  },
];

/** INTERIOR-ONLY packages */
export const INTERIOR_PACKAGES: ServicePackage[] = [
  {
    id: 'interior-refresh',
    name: 'INTERIOR REFRESH',
    description: 'A thorough interior cleaning for vehicles that need a fresh, clean appearance.',
    prices: sizes('$125', '$145', '$165'),
    groups: [
      {
        items: [
          'Interior vacuuming',
          'Blowout of accessible cracks and crevices',
          'Dashboard, console, and door panel cleaning',
          'Interior surface wipe-down',
          'Interior glass cleaning',
          'Rubber floor mat cleaning',
          'Leather seat wipe-down where applicable',
        ],
      },
    ],
    buttonLabel: 'BOOK INTERIOR REFRESH',
    bookingUrl: '',
  },
  {
    id: 'interior-reset',
    name: 'INTERIOR RESET',
    description: 'A deeper interior detail designed to address accumulated dirt and grime and refresh the cabin.',
    prices: sizes('$165', '$185', '$210'),
    groups: [
      {
        items: [
          'Thorough interior vacuuming and blowout',
          'Detailed cleaning of interior surfaces',
          'Steam cleaning where appropriate',
          'Carpet and fabric seat shampooing when needed and suitable',
          'Leather cleaning and conditioning where applicable',
          'Detailed cleaning of cracks and crevices',
          'Interior glass cleaning',
          'Rubber floor mat cleaning',
          'Interior surface protection and finishing',
        ],
      },
    ],
    buttonLabel: 'BOOK INTERIOR RESET',
    bookingUrl: '',
  },
];

/** EXTERIOR-ONLY packages */
export const EXTERIOR_PACKAGES: ServicePackage[] = [
  {
    id: 'exterior-refresh',
    name: 'EXTERIOR REFRESH',
    description: 'A professional exterior cleaning with wax protection to keep your vehicle looking clean and glossy.',
    prices: sizes('$85', '$100', '$115'),
    groups: [
      {
        items: ['Exterior hand wash', 'Wheel and tire cleaning', 'Exterior glass cleaning', 'Cleaning of door jambs', 'Wax protection', 'Tire dressing'],
      },
    ],
    buttonLabel: 'BOOK EXTERIOR REFRESH',
    bookingUrl: '',
  },
  {
    id: 'exterior-reset',
    name: 'EXTERIOR RESET',
    description: 'A more thorough exterior service with paint decontamination and extended protection.',
    prices: sizes('$175', '$200', '$225'),
    groups: [
      {
        items: [
          'Thorough exterior hand wash',
          'Wheel and tire cleaning',
          'Clay bar paint decontamination',
          'Exterior glass cleaning',
          'Cleaning of door jambs',
          'Three-month sealant protection',
          'Exterior trim treatment where included',
          'Tire dressing',
        ],
      },
    ],
    buttonLabel: 'BOOK EXTERIOR RESET',
    bookingUrl: '',
  },
];

/**
 * MAINTENANCE — "Starting at $70". Per-vehicle-size prices are not set yet:
 * once confirmed, add `prices: sizes('$70', '$__', '$__')` and they'll appear automatically.
 */
export const MAINTENANCE: ServicePackage = {
  id: 'maintenance-wash',
  name: 'MAINTENANCE WASH',
  description:
    'A maintenance service intended to keep a previously detailed vehicle looking its best between full details.',
  startingPrice: '$70',
  groups: [
    {
      items: [
        'Exterior hand wash',
        'Wax protection',
        'Quick interior vacuum',
        'Dashboard and interior surface wipe-down',
        'Interior glass cleaning',
      ],
    },
  ],
  buttonLabel: 'ASK ABOUT MAINTENANCE',
  action: 'contact',
  bookingUrl: '',
};

export const MAINTENANCE_PLANS: PriceRow[] = [
  { label: 'Monthly maintenance', price: '$150' },
  { label: 'Biweekly maintenance', price: '$120 per visit' },
];
export const MAINTENANCE_PLAN_NOTE =
  'The maintenance plan begins with an initial full detail to bring the vehicle to a maintainable condition.';

/**
 * ADD-ONS — nothing shows until you set `confirmed: true` on an item.
 * Leave `price: ''` to display "Contact us for pricing" (never guess a price).
 * If NO add-on is confirmed, the whole add-ons section stays hidden.
 */
export const ADDONS: AddOn[] = [
  { name: 'Engine bay cleaning', price: '', confirmed: false },
  { name: 'Additional stain treatment', price: '', confirmed: false },
  { name: 'Additional pet hair removal', price: '', confirmed: false },
  { name: 'Additional paint decontamination', price: '', confirmed: false },
  { name: 'Additional exterior protection', price: '', confirmed: false },
];

/** Every package, in menu order (used by the contact form's service list). */
export const ALL_PACKAGES: ServicePackage[] = [...FULL_DETAILS, ...INTERIOR_PACKAGES, ...EXTERIOR_PACKAGES, MAINTENANCE];

/** Shown under the menu. Edit freely. */
export const PRICING_NOTE =
  'All prices are starting prices. Final pricing depends on vehicle size and condition.';
export const RESULTS_NOTE =
  'Services such as stain treatment, pet hair removal, and shampooing are performed where needed and suitable. Results depend on the vehicle’s condition and are not guaranteed.';

/**
 * GALLERY
 * Replace each sample with your real work: change `src` to your file in /public/images,
 * write a true `alt` description, and remove `isSample: true`.
 * To add a real before photo, set `beforeSrc` — the lightbox will show before + after side by side.
 * Add or delete items freely; the grid adjusts.
 */
export const GALLERY: GalleryItem[] = [
  {
    src: '/images/gallery-1-interior.svg',
    alt: 'Detailed vehicle interior',
    title: 'Clean interiors',
    category: 'Interior',
    isSample: true,
  },
  {
    src: '/images/gallery-2-leather.svg',
    alt: 'Cleaned and conditioned leather seats',
    title: 'Leather seats',
    category: 'Leather',
    isSample: true,
  },
  {
    src: '/images/gallery-3-carpet.svg',
    alt: 'Carpet and floor mats after detailing',
    title: 'Carpet & floor mats',
    category: 'Carpet & mats',
    isSample: true,
  },
  {
    src: '/images/gallery-4-paint.svg',
    alt: 'Exterior paint after detailing',
    title: 'Exterior paint',
    category: 'Exterior',
    isSample: true,
  },
  {
    src: '/images/gallery-5-wheels.svg',
    alt: 'Wheels and tires after detailing',
    title: 'Wheels & tires',
    category: 'Wheels',
    isSample: true,
  },
  {
    src: '/images/gallery-6-vehicle.svg',
    alt: 'A vehicle detailed by BIGGS Mobile Detailing',
    title: 'Vehicles we have detailed',
    category: 'Our work',
    isSample: true,
  },
];

/**
 * CUSTOMER REVIEWS
 * Leave this list EMPTY until you have real reviews — the site then shows a clearly
 * labeled placeholder. To add a real review, copy this pattern inside the brackets:
 *
 *   { quote: "Exact words from the customer.", name: "Customer Name", detail: "Google review" },
 *
 * Only add `rating: 5` (or other 1–5) if the customer really left that star rating.
 * Never write or edit reviews on a customer's behalf.
 */
export const REVIEWS: Review[] = [];

// ---------------------------------------------------------------- helpers
/** True when a value is a real, filled-in value rather than a placeholder. */
export function isConfigured(value: string | undefined): boolean {
  if (!value) return false;
  return !/YOUR-|XXX|REPLACE/i.test(value);
}

/** Booking link for a package (falls back to the main Square URL). */
export function bookingUrlFor(pkg?: Pick<ServicePackage, 'bookingUrl'>): string {
  return pkg?.bookingUrl ? pkg.bookingUrl : SITE.squareBookingUrl;
}

/** Opens an Instagram direct-message chat with your account (built from `instagramUrl`). '' if not set. */
export function instagramDmUrl(): string {
  if (!isConfigured(SITE.instagramUrl)) return '';
  const m = SITE.instagramUrl.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
  return m ? `https://ig.me/m/${m[1]}` : '';
}
