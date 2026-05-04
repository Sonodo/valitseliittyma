'use client';

import { ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';
import { DISCLOSURE_COPY } from './copy';
import { trackEvent } from '@/lib/analytics';

interface OutboundCTAProps {
  href: string;
  partner: boolean;
  /** Provider/operator name for GA4 event payload. */
  provider: string;
  /** Product type, e.g. "mobile" | "broadband" | "loan" | "electricity". */
  productType?: string;
  /** Extra GA4 payload (plan id, price, etc.). */
  extras?: Record<string, unknown>;
  /** Override label. Defaults to partner-aware copy. */
  label?: ReactNode;
  className?: string;
}

/**
 * Partner-aware outbound CTA.
 * - Renders "Siirry kumppanin sivulle →" if partner=true, otherwise "Siirry tarjoajan sivulle →".
 * - Adds rel="sponsored" on partner links (always combined with noopener noreferrer).
 * - Fires GA4 `affiliate_click` with `partner: boolean` payload.
 */
export function OutboundCTA({
  href,
  partner,
  provider,
  productType,
  extras,
  label,
  className,
}: OutboundCTAProps) {
  const text = label ?? (partner ? DISCLOSURE_COPY.ctaPartner : DISCLOSURE_COPY.ctaMarket);
  const rel = partner
    ? 'sponsored noopener noreferrer nofollow'
    : 'noopener noreferrer';

  const finalClass =
    className ??
    'flex items-center justify-center gap-2 rounded-xl bg-accent py-3 px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-600 min-h-[44px]';

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      onClick={() =>
        trackEvent('affiliate_click', {
          provider,
          partner,
          ...(productType ? { product_type: productType } : {}),
          ...(extras ?? {}),
        })
      }
      className={finalClass}
    >
      {text}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
