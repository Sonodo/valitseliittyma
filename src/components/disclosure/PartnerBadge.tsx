'use client';

import { useState } from 'react';
import { DISCLOSURE_COPY, SITE_CONFIG } from './copy';

type Variant = 'kumppani' | 'markkinahinta';

interface PartnerBadgeProps {
  variant: Variant;
  /** Position class — default upper-right of card. Override if card already uses that corner. */
  className?: string;
}

/**
 * Per-card disclosure pill.
 * - "Kumppanitarjous" (kumppani) — affiliate offer, neutral grey-blue
 * - "Markkinahinta" (markkinahinta) — non-affiliate, slightly lighter
 *
 * 11px, neutral palette (#E8EEF6 bg / #3B5266 text). Tap/hover reveals tooltip.
 */
export function PartnerBadge({ variant, className }: PartnerBadgeProps) {
  const [open, setOpen] = useState(false);
  const isPartner = variant === 'kumppani';
  const label = isPartner ? DISCLOSURE_COPY.badgePartner : DISCLOSURE_COPY.badgeMarket;
  const tooltip = isPartner
    ? DISCLOSURE_COPY.partnerTooltip(SITE_CONFIG.siteName)
    : DISCLOSURE_COPY.marketTooltip;

  const positionClass = className ?? 'absolute top-2 right-2 z-10';

  return (
    <span className={`${positionClass} inline-block`}>
      <button
        type="button"
        aria-label={`${label} — lisätietoa`}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none transition-colors ${
          isPartner
            ? 'bg-[#E8EEF6] text-[#3B5266] hover:bg-[#DCE5F0]'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
      >
        {label}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute right-0 top-full z-20 mt-1.5 w-60 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-normal leading-snug text-white shadow-lg"
        >
          {tooltip}
        </span>
      )}
    </span>
  );
}
