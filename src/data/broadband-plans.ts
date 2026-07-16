import { BroadbandPlan } from '@/types';

// Price convention: monthlyPrice = operator's NORMAL list price (perushinta);
// campaignPrice/campaignNote carry the current campaign as secondary info.
//
// 2026-07-16 verification note: Elisa, DNA and Telia no longer publish
// national list prices for fixed fiber (valokuitu) — pricing is address-
// specific ("tarkista saatavuus osoitteellasi"). The old per-speed fiber rows
// (100M/200M/400M/1000M) could not be traced to any official page and were
// REMOVED rather than kept unverifiable. The comparison now lists nationally
// priced home-internet products (5G kotinetti + Valoo fiber) that can be
// verified from public pages. Elisa's home products are currently address- or
// webshop-gated and are therefore not listed until they can be verified.
export const broadbandPlans: BroadbandPlan[] = [
  // ═══════════════════════════════════════
  // DNA — kotinetti (5G)
  // 2026-07-16: dna.fi/laajakaista — "DNA Netti Huoleton 5G 400M Takuukaista"
  // normal 40,99 €/kk (campaign 35,99). Upload not published — omitted.
  // ═══════════════════════════════════════
  {
    id: 'dna-netti-huoleton-5g-400',
    operatorId: 'dna',
    name: 'DNA Netti Huoleton 5G 400M Takuukaista',
    category: 'broadband',
    monthlyPrice: 40.99,
    campaignPrice: 35.99,
    campaignNote: 'kampanjahinta',
    technology: '5G',
    downloadSpeed: 400,
    contractType: 'no-commitment',
    specialFeatures: ['5G-kotinetti', 'Takuukaista-nopeuslupaus', 'Rajaton data'],
    url: 'https://www.dna.fi/laajakaista',
  },
  // ═══════════════════════════════════════
  // TELIA — "Telia Yhteys kotiin" (rebranded home internet)
  // 2026-07-16: prices via parasnetti-listing (secondary source; telia.fi
  // gates prices behind an address check). Upload not published — omitted.
  // ═══════════════════════════════════════
  {
    id: 'telia-yhteys-kotiin-5g-300',
    operatorId: 'telia',
    name: 'Telia Yhteys kotiin 5G 300M',
    category: 'broadband',
    monthlyPrice: 29.35,
    technology: '5G',
    downloadSpeed: 300,
    contractType: 'no-commitment',
    specialFeatures: ['5G-kotinetti', 'Rajaton data', 'Ei määräaikaisuutta'],
    url: 'https://www.telia.fi/laajakaista',
  },
  {
    id: 'telia-yhteys-kotiin-5g-600',
    operatorId: 'telia',
    name: 'Telia Yhteys kotiin 5G+ 600M',
    category: 'broadband',
    monthlyPrice: 34.41,
    technology: '5G',
    downloadSpeed: 600,
    contractType: 'no-commitment',
    specialFeatures: ['5G-kotinetti', 'Rajaton data', 'Ei määräaikaisuutta'],
    url: 'https://www.telia.fi/laajakaista',
  },
  {
    id: 'telia-yhteys-kotiin-kiintea-5g-600',
    operatorId: 'telia',
    name: 'Telia Yhteys kotiin kiinteä 5G XL+ 600M',
    category: 'broadband',
    monthlyPrice: 39.9,
    technology: '5G',
    downloadSpeed: 600,
    contractType: '24-month',
    specialFeatures: ['Kiinteä 5G — antenniasennus', 'Rajaton data', '24 kk sopimus'],
    url: 'https://www.telia.fi/laajakaista',
  },
  {
    id: 'telia-yhteys-kotiin-kiintea-5g-1000',
    operatorId: 'telia',
    name: 'Telia Yhteys kotiin kiinteä 5G XXL 1000M',
    category: 'broadband',
    monthlyPrice: 44.9,
    technology: '5G',
    downloadSpeed: 1000,
    contractType: '24-month',
    specialFeatures: ['Kiinteä 5G — antenniasennus', 'Rajaton data', '1000 Mbit/s', '24 kk sopimus'],
    url: 'https://www.telia.fi/laajakaista',
  },
  // ═══════════════════════════════════════
  // VALOO — symmetric fiber (M/L/XL)
  // 2026-07-16: verified from valoo.fi — normal 49,90 / 52,90 / 79,90 €/kk,
  // campaign 24,00 €/kk (12 kk) until 31.7.2026. WiFi 7 router included.
  // Fiber availability is address-specific.
  // ═══════════════════════════════════════
  {
    id: 'valoo-netti-m-500',
    operatorId: 'valoo',
    name: 'Valoo Netti M 500/500',
    category: 'broadband',
    monthlyPrice: 49.9,
    campaignPrice: 24.0,
    campaignNote: 'kampanjahinta 12 kk (31.7.2026 asti)',
    technology: 'fiber',
    downloadSpeed: 500,
    uploadSpeed: 500,
    contractType: 'no-commitment',
    specialFeatures: ['Symmetrinen valokuitu', 'WiFi 7 -reititin sisältyy', 'Saatavuus osoitekohtainen'],
    url: 'https://valoo.fi',
  },
  {
    id: 'valoo-netti-l-1000',
    operatorId: 'valoo',
    name: 'Valoo Netti L 1000/1000',
    category: 'broadband',
    monthlyPrice: 52.9,
    campaignPrice: 24.0,
    campaignNote: 'kampanjahinta 12 kk (31.7.2026 asti)',
    technology: 'fiber',
    downloadSpeed: 1000,
    uploadSpeed: 1000,
    contractType: 'no-commitment',
    specialFeatures: ['Symmetrinen valokuitu', 'WiFi 7 -reititin sisältyy', 'Gigabitin nopeus', 'Saatavuus osoitekohtainen'],
    url: 'https://valoo.fi',
  },
  {
    id: 'valoo-netti-xl-2000',
    operatorId: 'valoo',
    name: 'Valoo Netti XL 2000/2000',
    category: 'broadband',
    monthlyPrice: 79.9,
    campaignPrice: 24.0,
    campaignNote: 'kampanjahinta 12 kk (31.7.2026 asti)',
    technology: 'fiber',
    downloadSpeed: 2000,
    uploadSpeed: 2000,
    contractType: 'no-commitment',
    specialFeatures: ['Symmetrinen valokuitu', 'WiFi 7 -reititin sisältyy', '2 Gbit/s', 'Saatavuus osoitekohtainen'],
    url: 'https://valoo.fi',
  },
];

// Helpers
export function getBroadbandByOperator(operatorId: string): BroadbandPlan[] {
  return broadbandPlans.filter((p) => p.operatorId === operatorId);
}

export function getCheapestBroadband(limit: number = 5): BroadbandPlan[] {
  return [...broadbandPlans].sort((a, b) => a.monthlyPrice - b.monthlyPrice).slice(0, limit);
}

export function getFiberPlans(): BroadbandPlan[] {
  return broadbandPlans.filter((p) => p.technology === 'fiber');
}

export function get5GBroadband(): BroadbandPlan[] {
  return broadbandPlans.filter((p) => p.technology === '5G');
}
