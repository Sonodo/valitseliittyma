import { NavigationItem } from '@/types';

// Site metadata
export const SITE_NAME = 'Valitse Liittymä';
export const SITE_URL = 'https://valitseliittyma.fi';
export const SITE_DESCRIPTION =
  'Vertaa puhelinliittymiä ja laajakaistoja Suomessa. Löydä halvin liittymä Elisan, DNA:n, Telian ja budjettioperaattoreiden valikoimista. Ilmainen ja kattava vertailu.';
export const SITE_TAGLINE = 'Vertaa ja säästä liittymäkuluissa';

// Data freshness — the date the plan data (src/data/mobile-plans.ts +
// broadband-plans.ts) was last substantively reviewed against operator sites.
// UPDATE THIS whenever plan data is checked or revised. Rendered on the
// homepage trust sections, listing pages, methodology and editorial pages.
// 2026-07-16 full re-verification: all operators checked against official
// pages (Elisa via cross-corroborated secondary source); lineups rebranded
// (Elisa Huoleton, DNA Huoleton Plus, Telia Rajaton, Moi Kevyt–Super),
// campaign prices captured separately, unverifiable fixed-fiber rows removed.
export const DATA_REVIEWED_AT = '16.7.2026';

// Colors — teal/blue telecom theme
export const COLORS = {
  primary: '#0891B2', // cyan-600
  primaryDark: '#0E7490', // cyan-700
  primaryLight: '#22D3EE', // cyan-400
  dark: '#0C1222',
  darkSecondary: '#1A2540',
  accent: '#8B5CF6', // violet for accents
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F8FAFC',
  backgroundDark: '#0C1222',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
} as const;

// Navigation
export const NAVIGATION: NavigationItem[] = [
  {
    label: 'Puhelinliittymät',
    href: '/puhelinliittymat',
    description: 'Vertaa puhelinliittymiä',
  },
  {
    label: 'Laajakaista',
    href: '/laajakaista',
    description: 'Vertaa laajakaistaliittymiä',
  },
  {
    label: 'Operaattorit',
    href: '/operaattorit',
    description: 'Suomen merkittävimmät operaattorit',
  },
  {
    label: 'Vertaa',
    href: '/vertaa',
    description: 'Vertaa liittymiä rinnakkain',
  },
  {
    label: 'Oppaat',
    href: '/opas',
    description: 'Hyödylliset oppaat ja vinkit',
  },
  {
    label: 'Blogi',
    href: '/blogi',
    description: 'Ajankohtaista liittymämarkkinoilta',
  },
  {
    label: 'Menetelmä',
    href: '/menetelma',
    description: 'Miten teemme rankingit',
  },
];

// Valitse network cross-links
export const VALITSE_SITES = [
  { name: 'Valitse.fi', url: 'https://valitse.fi', description: 'Vertaa ja valitse' },
  { name: 'Valitse Sähkö', url: 'https://valitsesahko.fi', description: 'Sähkövertailu' },
  { name: 'Valitse Laina', url: 'https://valitselaina.fi', description: 'Lainavertailu' },
  { name: 'Valitse Vakuutus', url: 'https://valitsevakuutus.fi', description: 'Vakuutusvertailu' },
];

// Other empire cross-links
export const EMPIRE_SITES = [
  { name: 'Asuntomaatti', url: 'https://asuntomaatti.fi', description: 'Etsi asuntoja' },
  { name: 'Alennuskartta', url: 'https://alennuskartta.fi', description: 'Löydä tarjoukset' },
];
