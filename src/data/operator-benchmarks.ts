/**
 * Operator benchmarks — Speedtest Intelligence + Traficom Bittimittari.
 *
 * Anchors each operator card to an independent, authoritative measurement so
 * users can compare like-for-like without trusting marketing copy.
 *
 * Data sources (verified 2026-06-04):
 * - Speedtest Intelligence Finland H1 2025 (Jan–Jun 2025), published 2025-09-18
 *   via Mobiili.fi. Picked over H2 2024 because it is the freshest published
 *   measurement period as of this date.
 *   https://mobiili.fi/2025/09/18/tuttu-nimi-jatkaa-karjessa-yksi-mobiilioperaattori-tarjoaa-edelleen-speedtestin-mukaan-selvasti-nopeimmat-yhteydet-suomessa/
 * - Traficom matkaviestinverkon liittymät — market share 2025 (FiCom / Traficom
 *   semiannual). Elisa 38 %, DNA 31 %, Telia 30 %.
 * - Traficom Bittimittari laatututkimus 10/2025 — region-by-region quality
 *   indicators (Porvoo 4/5, Posio 2/5).
 *   https://www.traficom.fi/fi/ajankohtaista/matkaviestinverkon-yhteyksissa-suuria-operaattorikohtaisia-eroja-eri-alueilla
 *
 * MVNOs (Moi, Valoo*, Globetel, Oomi, Giga) do not get standalone Speedtest
 * publication. Their effective network speed is set to the parent MNO's
 * Speedtest value with a tooltip note. Valoo is broadband-only (fiber) — no
 * Speedtest mobile equivalent.
 */

export type OperatorSlug =
  | 'telia'
  | 'dna'
  | 'elisa'
  | 'moi'
  | 'valoo'
  | 'globetel'
  | 'oomi'
  | 'giga';

export interface OperatorBenchmark {
  slug: OperatorSlug;
  /** Speedtest overall mean download (Mbit/s) for the freshest published period. */
  speedtestDownloadMbps: number | null;
  /** Speedtest 5G-only mean download (Mbit/s) when published. */
  speedtest5gMbps?: number | null;
  /** Period label, e.g. 'H1 2025'. */
  speedtestPeriod: string;
  /** Public-facing source link. */
  speedtestSourceUrl: string;
  /** Traficom market share, % of mobile subscriptions. */
  marketSharePct: number | null;
  /** Optional Bittimittari / Traficom quality finding (≤120 chars). */
  trafficomQualityNote?: string;
  /** Public-facing source link for the quality finding. */
  trafficomQualityUrl?: string;
  /** If this operator rides another MNO's network, the parent slug. */
  parentNetworkSlug?: OperatorSlug;
}

const SPEEDTEST_SRC =
  'https://mobiili.fi/2025/09/18/tuttu-nimi-jatkaa-karjessa-yksi-mobiilioperaattori-tarjoaa-edelleen-speedtestin-mukaan-selvasti-nopeimmat-yhteydet-suomessa/';

const TRAFICOM_QUALITY_SRC =
  'https://www.traficom.fi/fi/ajankohtaista/matkaviestinverkon-yhteyksissa-suuria-operaattorikohtaisia-eroja-eri-alueilla';

export const OPERATOR_BENCHMARKS: Record<OperatorSlug, OperatorBenchmark> = {
  // === Tier 1 — Mobile network operators (MNO) ===
  dna: {
    slug: 'dna',
    speedtestDownloadMbps: 135.95,
    speedtest5gMbps: 242.64,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: 31,
    trafficomQualityNote:
      'Posion testissä 10/2025: puhelut toimivat moitteetta. Porvoossa 5G-latausnopeus jopa 311 Mbit/s.',
    trafficomQualityUrl: TRAFICOM_QUALITY_SRC,
  },
  telia: {
    slug: 'telia',
    speedtestDownloadMbps: 131.38,
    speedtest5gMbps: 215.69,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: 30,
    trafficomQualityNote:
      'Porvoon testissä 10/2025: 4G-latausnopeus jopa 194 Mbit/s. Posion testissä seitsemän epäonnistunutta puhelua.',
    trafficomQualityUrl: TRAFICOM_QUALITY_SRC,
  },
  elisa: {
    slug: 'elisa',
    speedtestDownloadMbps: 107.6,
    speedtest5gMbps: 209.49,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: 38,
    trafficomQualityNote:
      'Posion testissä 10/2025: latausnopeudet 3,6–24 Mbit/s, puhelut toimivat. Porvoossa vaihtelua paikkakohtaisesti.',
    trafficomQualityUrl: TRAFICOM_QUALITY_SRC,
  },

  // === Tier 2 — MVNOs reusing an MNO network ===
  // Speedtest does not publish per-MVNO numbers — we surface the underlying
  // MNO's measurement and disclose that in the tooltip.
  moi: {
    slug: 'moi',
    speedtestDownloadMbps: 135.95, // DNA H1 2025
    speedtest5gMbps: 242.64,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: null,
    parentNetworkSlug: 'dna',
  },
  giga: {
    slug: 'giga',
    speedtestDownloadMbps: 135.95, // DNA H1 2025
    speedtest5gMbps: 242.64,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: null,
    parentNetworkSlug: 'dna',
  },
  oomi: {
    slug: 'oomi',
    speedtestDownloadMbps: 107.6, // Elisa H1 2025
    speedtest5gMbps: 209.49,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: null,
    parentNetworkSlug: 'elisa',
  },
  globetel: {
    slug: 'globetel',
    speedtestDownloadMbps: 131.38, // Telia H1 2025
    speedtest5gMbps: null, // Globetel does not sell 5G plans.
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: null,
    parentNetworkSlug: 'telia',
  },

  // === Tier 3 — Fixed-line only (no mobile Speedtest counterpart) ===
  valoo: {
    slug: 'valoo',
    speedtestDownloadMbps: null,
    speedtestPeriod: 'H1 2025',
    speedtestSourceUrl: SPEEDTEST_SRC,
    marketSharePct: null,
  },
};

/**
 * Lookup helper that accepts any string id (caller may pass an arbitrary
 * operator id). Returns null when no benchmark is registered.
 */
export function getOperatorBenchmark(
  slug: string | null | undefined,
): OperatorBenchmark | null {
  if (!slug) return null;
  const key = slug.toLowerCase() as OperatorSlug;
  return OPERATOR_BENCHMARKS[key] ?? null;
}

const OPERATOR_DISPLAY_NAMES: Record<OperatorSlug, string> = {
  dna: 'DNA',
  telia: 'Telia',
  elisa: 'Elisa',
  moi: 'Moi Mobiili',
  valoo: 'Valoo',
  globetel: 'Globetel',
  oomi: 'Oomi Mobiili',
  giga: 'Giga Mobiili',
};

/**
 * Build the tooltip body shown when the user hovers/focuses the badge.
 * Mentions the parent network for MVNOs so the comparison is honest.
 *
 * No industry-average anchor — the previous SPEEDTEST_AVG_MBPS constant was
 * the mean of DNA+Telia+Elisa, which made the badge compare each MNO against
 * an average derived from itself (mathematically circular). Card now shows
 * the operator's own Speedtest value with sourcing, no delta.
 */
export function buildBenchmarkTooltip(b: OperatorBenchmark): string {
  if (b.parentNetworkSlug) {
    const parentName = OPERATOR_DISPLAY_NAMES[b.parentNetworkSlug];
    return `Käyttää ${parentName}-verkkoa — Speedtest ${b.speedtestPeriod} ${b.speedtestDownloadMbps?.toFixed(1).replace('.', ',')} Mbit/s. Lähde: Speedtest Intelligence H1 2025 (Mobiili.fi 18.9.2025).`;
  }
  return `Operaattorin oma Speedtest-keskiarvo (${b.speedtestPeriod}). Lähde: Speedtest Intelligence H1 2025 (Mobiili.fi 18.9.2025).`;
}
