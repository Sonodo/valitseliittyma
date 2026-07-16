import offersJson from '@/data/partner-offers.json';

/**
 * Active partner campaign offers, synced weekly from Adtraction by
 * scripts/adtraction-sync.mjs (GitHub Actions). Display is informational
 * only — offers NEVER affect comparison ranking.
 *
 * The `providerId` field carries an operator id (src/data/operators.ts). The
 * field name is kept for parity with the sync script and the sibling sites.
 */
export interface PartnerOffer {
  id: number;
  providerId: string;
  programName: string;
  description: string;
  coupon: string | null;
  trackingUrl: string | null;
  validTo: string; // YYYY-MM-DD
}

const offers = offersJson as PartnerOffer[];

/** First still-valid offer for an operator, or null. */
export function getOfferForOperator(operatorId: string): PartnerOffer | null {
  const today = new Date().toISOString().slice(0, 10);
  return offers.find((o) => o.providerId === operatorId && o.validTo >= today) ?? null;
}
