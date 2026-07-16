'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Signal, Wifi, Check, X, ExternalLink } from 'lucide-react';
import { MobilePlan, BroadbandPlan } from '@/types';
import { getOperatorById } from '@/data/operators';
import {
  getOperatorBenchmark,
  buildBenchmarkTooltip,
} from '@/data/operator-benchmarks';
import { formatData, formatSpeed } from '@/lib/utils';
import { trackAffiliateClick } from '@/lib/analytics';
import { getOfferForOperator } from '@/lib/partner-offers';
import { DISCLOSURE_COPY } from '@/components/disclosure';
import BenchmarkBadge from '@/components/data/BenchmarkBadge';
import PartnerOfferBadge from '@/components/ui/PartnerOfferBadge';

function formatPriceDisplay(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

interface MobilePlanCardProps {
  plan: MobilePlan;
  showOperator?: boolean;
}

export const MobilePlanCard = memo(function MobilePlanCard({ plan, showOperator = true }: MobilePlanCardProps) {
  const operator = getOperatorById(plan.operatorId);
  // Info-only partner campaign line (weekly Adtraction sync) — never ranks.
  const offer = getOfferForOperator(plan.operatorId);
  const isAffiliate = Boolean(operator?.isAffiliate);
  const targetUrl = isAffiliate && operator?.affiliateUrl ? operator.affiliateUrl : plan.url;
  // Only affiliate operators get rel="sponsored nofollow". Non-affiliate CTAs
  // (Elisa, DNA, Moi non-affiliate, Giga, Oomi, Globetel) get a clean rel
  // attribute so we don't mislabel editorial outbound links as paid.
  const relAttr = isAffiliate
    ? 'noopener noreferrer nofollow sponsored'
    : 'noopener noreferrer';

  const benchmark = getOperatorBenchmark(plan.operatorId);
  // Show 5G-specific Speedtest value when the plan itself is a 5G plan.
  const speedtestValue =
    plan.has5G && typeof benchmark?.speedtest5gMbps === 'number'
      ? benchmark.speedtest5gMbps
      : benchmark?.speedtestDownloadMbps ?? null;
  const speedtestLabel = plan.has5G && benchmark?.speedtest5gMbps
    ? `Speedtest 5G · ${benchmark.speedtestPeriod}`
    : `Speedtest · ${benchmark?.speedtestPeriod ?? ''}`.trim();

  return (
    <div className="card group relative flex flex-col">
      {plan.has5G && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
          5G
        </span>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          {showOperator && operator && (
            <Link
              href={`/operaattorit/${operator.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-accent"
            >
              {operator.name}
            </Link>
          )}
          <h3 className="mt-1 text-lg font-bold text-slate-900">{plan.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-slate-900">
            {formatPriceDisplay(plan.monthlyPrice)}
          </span>
          <span className="text-sm text-slate-500"> €/kk</span>
          {typeof plan.campaignPrice === 'number' && (
            <p className="mt-0.5 text-xs text-slate-500">
              {plan.campaignNote ?? 'kampanjahinta'}:{' '}
              <span className="font-semibold text-emerald-700">
                {formatPriceDisplay(plan.campaignPrice)} €/kk
              </span>
            </p>
          )}
        </div>
      </div>

      {benchmark && typeof speedtestValue === 'number' && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <BenchmarkBadge
            value={speedtestValue}
            benchmark={null}
            benchmarkLabel={speedtestLabel}
            unit="Mbit/s"
            goodDirection="higher"
            decimals={0}
            tooltip={buildBenchmarkTooltip(benchmark)}
          />
          {benchmark.trafficomQualityNote && (
            <a
              href={benchmark.trafficomQualityUrl ?? 'https://bittimittari.fi/fi/laatututkimus'}
              target="_blank"
              rel="noopener noreferrer"
              title={benchmark.trafficomQualityNote}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <span className="font-semibold">Traficom</span>
              <span className="hidden sm:inline text-slate-500">· laatumittaus 10/2025</span>
            </a>
          )}
        </div>
      )}

      <div className={`mb-4 grid gap-3 ${plan.maxSpeed === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div className="rounded-lg bg-accent-50 p-3 text-center">
          <Signal className="mx-auto mb-1 h-4 w-4 text-accent" />
          <p className="text-sm font-semibold text-slate-900">{formatData(plan.dataAmount)}</p>
          <p className="text-xs text-slate-500">Data</p>
        </div>
        {plan.maxSpeed > 0 && (
          <div className="rounded-lg bg-accent-50 p-3 text-center">
            <Wifi className="mx-auto mb-1 h-4 w-4 text-accent" />
            <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.maxSpeed)}</p>
            <p className="text-xs text-slate-500">Maksiminopeus</p>
          </div>
        )}
      </div>

      {/* Partner campaign (info only — never affects ranking) */}
      {offer && (
        <div className="mb-4">
          <PartnerOfferBadge offer={offer} operatorName={operator?.name ?? plan.operatorId} />
        </div>
      )}

      <ul className="mb-5 flex-1 space-y-2">
        {plan.specialFeatures.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
        {typeof plan.euRoamingData === 'number' &&
          (plan.euRoamingData > 0 ? (
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              EU-roaming {plan.euRoamingData} Gt
            </li>
          ) : (
            <li className="flex items-center gap-2 text-sm text-slate-400">
              <X className="h-4 w-4 shrink-0 text-slate-400" />
              Ei EU-roaming-dataa
            </li>
          ))}
      </ul>

      <a
        href={targetUrl}
        target="_blank"
        rel={relAttr}
        onClick={() =>
          trackAffiliateClick(operator?.name ?? plan.operatorId, 'mobile', {
            plan_id: plan.id,
            plan_name: plan.name,
            monthly_price: plan.monthlyPrice,
            partner: isAffiliate,
            is_affiliate: isAffiliate,
          })
        }
        className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 min-h-[44px]"
      >
        {DISCLOSURE_COPY.cta}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
});

interface BroadbandPlanCardProps {
  plan: BroadbandPlan;
  showOperator?: boolean;
}

export const BroadbandPlanCard = memo(function BroadbandPlanCard({ plan, showOperator = true }: BroadbandPlanCardProps) {
  const operator = getOperatorById(plan.operatorId);
  // Info-only partner campaign line (weekly Adtraction sync) — never ranks.
  const offer = getOfferForOperator(plan.operatorId);
  const isAffiliate = Boolean(operator?.isAffiliate);
  const targetUrl = isAffiliate && operator?.affiliateUrl ? operator.affiliateUrl : plan.url;
  // Only affiliate operators get rel="sponsored nofollow"; clean rel otherwise.
  const relAttr = isAffiliate
    ? 'noopener noreferrer nofollow sponsored'
    : 'noopener noreferrer';
  const techLabel =
    plan.technology === 'fiber' ? 'Valokuitu' : plan.technology === '5G' ? '5G-kotinetti' : '4G-kotinetti';

  // Speedtest Intelligence reports the mobile network — relevant only for
  // 4G/5G home-broadband (kotinetti). Fixed fiber sits outside that dataset.
  const benchmark =
    plan.technology !== 'fiber' ? getOperatorBenchmark(plan.operatorId) : null;
  const speedtestValue =
    plan.technology === '5G' && typeof benchmark?.speedtest5gMbps === 'number'
      ? benchmark.speedtest5gMbps
      : benchmark?.speedtestDownloadMbps ?? null;
  const speedtestLabel =
    plan.technology === '5G' && benchmark?.speedtest5gMbps
      ? `Speedtest 5G · ${benchmark.speedtestPeriod}`
      : `Speedtest · ${benchmark?.speedtestPeriod ?? ''}`.trim();

  return (
    <div className="card group relative flex flex-col">
      <span className="absolute -top-3 right-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
        {techLabel}
      </span>

      <div className="mb-4 flex items-start justify-between">
        <div>
          {showOperator && operator && (
            <Link
              href={`/operaattorit/${operator.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-accent"
            >
              {operator.name}
            </Link>
          )}
          <h3 className="mt-1 text-lg font-bold text-slate-900">{plan.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-slate-900">
            {formatPriceDisplay(plan.monthlyPrice)}
          </span>
          <span className="text-sm text-slate-500"> €/kk</span>
          {typeof plan.campaignPrice === 'number' && (
            <p className="mt-0.5 text-xs text-slate-500">
              {plan.campaignNote ?? 'kampanjahinta'}:{' '}
              <span className="font-semibold text-emerald-700">
                {formatPriceDisplay(plan.campaignPrice)} €/kk
              </span>
            </p>
          )}
        </div>
      </div>

      {benchmark && typeof speedtestValue === 'number' && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <BenchmarkBadge
            value={speedtestValue}
            benchmark={null}
            benchmarkLabel={speedtestLabel}
            unit="Mbit/s"
            goodDirection="higher"
            decimals={0}
            tooltip={buildBenchmarkTooltip(benchmark)}
          />
        </div>
      )}

      <div className={`mb-4 grid gap-3 ${typeof plan.uploadSpeed === 'number' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="rounded-lg bg-accent-50 p-3 text-center">
          <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.downloadSpeed)}</p>
          <p className="text-xs text-slate-500">Lataus</p>
        </div>
        {typeof plan.uploadSpeed === 'number' && (
          <div className="rounded-lg bg-accent-50 p-3 text-center">
            <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.uploadSpeed)}</p>
            <p className="text-xs text-slate-500">Lähetys</p>
          </div>
        )}
      </div>

      {/* Partner campaign (info only — never affects ranking) */}
      {offer && (
        <div className="mb-4">
          <PartnerOfferBadge offer={offer} operatorName={operator?.name ?? plan.operatorId} />
        </div>
      )}

      <ul className="mb-5 flex-1 space-y-2">
        {plan.specialFeatures.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={targetUrl}
        target="_blank"
        rel={relAttr}
        onClick={() =>
          trackAffiliateClick(operator?.name ?? plan.operatorId, 'broadband', {
            plan_id: plan.id,
            plan_name: plan.name,
            monthly_price: plan.monthlyPrice,
            technology: plan.technology,
            partner: isAffiliate,
            is_affiliate: isAffiliate,
          })
        }
        className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 min-h-[44px]"
      >
        {DISCLOSURE_COPY.cta}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
});
