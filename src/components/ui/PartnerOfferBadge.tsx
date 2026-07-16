'use client';

import { Tag } from 'lucide-react';
import { trackAffiliateClick } from '@/lib/analytics';
import type { PartnerOffer } from '@/lib/partner-offers';

// Timezone-safe fi date for a YYYY-MM-DD string.
function fiDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}.${m}.${y}`;
}

/**
 * Informational campaign line for an operator, sourced from the weekly
 * Adtraction offers sync. Never affects ranking — pure card info. When the
 * offer carries its own tracking URL the whole line links out (sponsored).
 */
export default function PartnerOfferBadge({
  offer,
  operatorName,
}: {
  offer: PartnerOffer;
  operatorName: string;
}) {
  const body = (
    <span className="inline-flex flex-wrap items-center gap-1.5 text-[13px] leading-snug">
      <Tag className="h-3.5 w-3.5 shrink-0" />
      <span>
        <span className="font-semibold">Kampanja:</span> {offer.description}
        {offer.coupon && (
          <>
            {' '}
            — koodi{' '}
            <code className="rounded bg-emerald-100 px-1 py-0.5 font-mono text-[12px]">
              {offer.coupon}
            </code>
          </>
        )}{' '}
        <span className="opacity-75">({fiDate(offer.validTo)} asti)</span>
      </span>
    </span>
  );

  const className =
    'mt-2 block rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900';

  if (offer.trackingUrl) {
    return (
      <a
        href={offer.trackingUrl}
        target="_blank"
        rel="sponsored noopener noreferrer nofollow"
        onClick={() =>
          trackAffiliateClick(operatorName, 'offer', {
            contract_id: `offer-${offer.id}`,
            surface: 'partner-offer',
            partner: true,
            is_affiliate: true,
            affiliate_type: 'direct',
          })
        }
        className={`${className} transition-colors hover:bg-emerald-100`}
      >
        {body}
      </a>
    );
  }
  return <div className={className}>{body}</div>;
}
