/**
 * Disclosure copy — single source of truth for affiliate-disclosure strings.
 *
 * Per-vertical ranking criteria string is the only thing that changes
 * between sites in the Valitse network. Everything else is identical.
 *
 * Compliance baseline: KKV (Kuluttaja-asiamies) + EU DSA Art. 26 commercial
 * communication transparency. We exceed the FI market norm — partner offers
 * are pill-tagged on every card, with hover-expandable detail and a
 * persistent /luotettavuus reference.
 */

export type DisclosureSiteConfig = {
  /** Display name used in tooltip + /luotettavuus copy. */
  siteName: string;
  /** Short ranking-criteria phrase, e.g. "hinta + sopimuskausi". */
  rankingCriteria: string;
};

export const SITE_CONFIG: DisclosureSiteConfig = {
  siteName: 'Valitse Liittymä',
  rankingCriteria: 'hinta + sopimuskausi',
};

export const DISCLOSURE_COPY = {
  badgePartner: 'Kumppanitarjous',
  badgeMarket: 'Markkinahinta',
  ctaPartner: 'Siirry kumppanin sivulle',
  ctaMarket: 'Siirry tarjoajan sivulle',
  barText: 'Vertailu sisältää kumppanitarjouksia',
  barLinkText: 'näin ansaitsemme rahaa',
  /** Tooltip body — interpolates siteName. */
  partnerTooltip: (siteName: string) =>
    `Tämä tarjous on ${siteName}:n kaupallinen kumppani. Saamme palkkion solmituista sopimuksista. Järjestys perustuu hintaan, ei palkkioon.`,
  marketTooltip:
    'Tätä tarjoajaa ei makseta esiin nostamisesta. Hinta haetaan julkisista lähteistä — voi sisältää viiveitä.',
} as const;
