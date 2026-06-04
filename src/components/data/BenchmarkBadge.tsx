'use client';

import { useId, useState } from 'react';

/**
 * BenchmarkBadge — pill showing a value with a colored delta vs a benchmark.
 *
 * Used inside comparison row cards to anchor a number to an authoritative
 * reference (e.g. Suomen Pankki keskikorko, Bittimittari keskiarvo).
 *
 * Direction-aware:
 * - goodDirection="lower"  → below benchmark is green
 * - goodDirection="higher" → above benchmark is green
 *
 * If `benchmark` is null/undefined, renders the value cleanly with no delta.
 */
export interface BenchmarkBadgeProps {
  /** The value being shown (e.g. an offer's interest rate). */
  value: number;
  /** Reference value to compare against. Null if no benchmark available. */
  benchmark: number | null | undefined;
  /** Short attribution, e.g. "Suomen Pankki 4/2026". */
  benchmarkLabel: string;
  /** Display unit, e.g. "%", "snt/kWh", "Mbit/s", "€/kk". */
  unit: string;
  /** Which direction is "good" relative to the benchmark. */
  goodDirection: 'lower' | 'higher';
  /** Optional extra context shown in the tooltip. */
  tooltip?: string;
  /** Optional additional class names (composed last). */
  className?: string;
  /** Decimal places to show. Defaults to 2 (1 for kWh-scale values). */
  decimals?: number;
}

export default function BenchmarkBadge({
  value,
  benchmark,
  benchmarkLabel,
  unit,
  goodDirection,
  tooltip,
  className,
  decimals = 2,
}: BenchmarkBadgeProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const hasBenchmark =
    typeof benchmark === 'number' && Number.isFinite(benchmark);

  const delta = hasBenchmark ? value - (benchmark as number) : null;
  const isBetter =
    delta === null
      ? null
      : goodDirection === 'lower'
        ? delta < 0
        : delta > 0;
  const isNeutral = delta !== null && Math.abs(delta) < 1e-9;

  const tone =
    isNeutral || delta === null
      ? 'bg-slate-100 text-slate-700 ring-slate-200'
      : isBetter
        ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
        : 'bg-rose-50 text-rose-800 ring-rose-200';

  const arrow =
    isNeutral || delta === null
      ? ''
      : delta < 0
        ? '↓'
        : '↑';

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('fi-FI', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);

  return (
    <span
      className={[
        'relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        tone,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="font-mono tabular-nums">
        {formatNumber(value)} {unit}
      </span>

      {hasBenchmark && delta !== null && !isNeutral && (
        <span
          className="font-mono tabular-nums opacity-80"
          aria-label={`${isBetter ? 'Parempi' : 'Heikompi'} kuin vertailuarvo ${
            arrow
          } ${formatNumber(Math.abs(delta))} ${unit}`}
        >
          {arrow} {formatNumber(Math.abs(delta))}
        </span>
      )}

      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label={`Lähde: ${benchmarkLabel}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-current/10 text-[10px] font-bold leading-none ring-1 ring-inset ring-current/20 transition hover:bg-current/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        i
      </button>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-left text-[11px] font-normal leading-snug text-white shadow-xl"
        >
          <span className="block font-semibold text-white">Vertailuarvo</span>
          <span className="mt-0.5 block text-white/80">
            {hasBenchmark
              ? `${formatNumber(benchmark as number)} ${unit}`
              : 'Ei saatavilla'}
          </span>
          <span className="mt-1 block text-white/60">
            Lähde: {benchmarkLabel}
          </span>
          {tooltip && (
            <span className="mt-1.5 block border-t border-white/10 pt-1.5 text-white/70">
              {tooltip}
            </span>
          )}
        </span>
      )}
    </span>
  );
}