import Link from 'next/link';
import { memo } from 'react';
import { Signal, Wifi, Check, X, ExternalLink } from 'lucide-react';
import { MobilePlan, BroadbandPlan } from '@/types';
import { getOperatorById } from '@/data/operators';
import { formatData, formatSpeed } from '@/lib/utils';

function formatPriceDisplay(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

interface MobilePlanCardProps {
  plan: MobilePlan;
  showOperator?: boolean;
}

export const MobilePlanCard = memo(function MobilePlanCard({ plan, showOperator = true }: MobilePlanCardProps) {
  const operator = getOperatorById(plan.operatorId);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {plan.has5G && (
        <span className="absolute -top-3 right-4 rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
          5G
        </span>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          {showOperator && operator && (
            <Link
              href={`/operaattorit/${operator.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-cyan-600"
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
        </div>
      </div>

      <div className={`mb-4 grid gap-3 ${plan.maxSpeed === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <Signal className="mx-auto mb-1 h-4 w-4 text-cyan-600" />
          <p className="text-sm font-semibold text-slate-900">{formatData(plan.dataAmount)}</p>
          <p className="text-xs text-slate-500">Data</p>
        </div>
        {plan.maxSpeed > 0 && (
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <Wifi className="mx-auto mb-1 h-4 w-4 text-cyan-600" />
            <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.maxSpeed)}</p>
            <p className="text-xs text-slate-500">Maksiminopeus</p>
          </div>
        )}
      </div>

      <ul className="mb-5 flex-1 space-y-2">
        {plan.specialFeatures.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
        {plan.euRoamingData > 0 ? (
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            EU-roaming {plan.euRoamingData} Gt
          </li>
        ) : (
          <li className="flex items-center gap-2 text-sm text-slate-400">
            <X className="h-4 w-4 shrink-0 text-slate-400" />
            Ei EU-roaming-dataa
          </li>
        )}
      </ul>

      <a
        href={plan.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
      >
        Katso tarjous
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
  const techLabel =
    plan.technology === 'fiber' ? 'Valokuitu' : plan.technology === '5G' ? '5G-kotinetti' : '4G-kotinetti';

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="absolute -top-3 right-4 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">
        {techLabel}
      </span>

      <div className="mb-4 flex items-start justify-between">
        <div>
          {showOperator && operator && (
            <Link
              href={`/operaattorit/${operator.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-cyan-600"
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
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.downloadSpeed)}</p>
          <p className="text-xs text-slate-500">Lataus</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-sm font-semibold text-slate-900">{formatSpeed(plan.uploadSpeed)}</p>
          <p className="text-xs text-slate-500">Lähetys</p>
        </div>
      </div>

      <ul className="mb-5 flex-1 space-y-2">
        {plan.specialFeatures.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={plan.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
      >
        Katso tarjous
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
});
