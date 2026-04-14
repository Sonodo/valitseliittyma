'use client';

import { useState, useMemo } from 'react';
import { MobilePlan } from '@/types';
import { operators } from '@/data/operators';
import { MobilePlanCard } from '@/components/ui/PlanCard';
import { formatData, formatSpeed } from '@/lib/utils';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface Props {
  plans: MobilePlan[];
}

type SortOption = 'price-asc' | 'price-desc' | 'data-desc' | 'speed-desc';

export default function MobilePlanFilters({ plans }: Props) {
  // Derive slider bounds from the actual dataset, with a small buffer — avoids the
  // "Max: 50 €/kk" nonsense when the priciest plan is 44,90 €.
  const priceBounds = useMemo(() => {
    if (plans.length === 0) return { min: 5, max: 50 };
    const prices = plans.map((p) => p.monthlyPrice);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices) + 1),
    };
  }, [plans]);

  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [only5G, setOnly5G] = useState(false);
  const [onlyUnlimited, setOnlyUnlimited] = useState(false);
  const [sort, setSort] = useState<SortOption>('price-asc');

  const filtered = useMemo(() => {
    let result = plans.filter((p) => p.monthlyPrice <= maxPrice);
    if (selectedOperator !== 'all') {
      result = result.filter((p) => p.operatorId === selectedOperator);
    }
    if (only5G) {
      result = result.filter((p) => p.has5G);
    }
    if (onlyUnlimited) {
      result = result.filter((p) => p.dataAmount === 'unlimited');
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        // Bubble data-less (0 Gt) plans to the bottom so naive users don't land on
        // "cheapest" plans that have no data included — bad UX and bad affiliate economics.
        result.sort((a, b) => {
          const aNoData = a.dataAmount === 0;
          const bNoData = b.dataAmount === 0;
          if (aNoData !== bNoData) return aNoData ? 1 : -1;
          return a.monthlyPrice - b.monthlyPrice;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
        break;
      case 'data-desc':
        result.sort((a, b) => {
          const aData = a.dataAmount === 'unlimited' ? Infinity : a.dataAmount;
          const bData = b.dataAmount === 'unlimited' ? Infinity : b.dataAmount;
          return bData - aData;
        });
        break;
      case 'speed-desc':
        result.sort((a, b) => b.maxSpeed - a.maxSpeed);
        break;
    }

    return result;
  }, [plans, maxPrice, selectedOperator, only5G, onlyUnlimited, sort]);

  return (
    <div>
      {/* Filters bar */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-bold">Suodata liittymiä</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Max price */}
          <div>
            <label htmlFor="filter-max-price" className="mb-1 block text-sm font-medium text-slate-700">
              Maksimihinta: {maxPrice} €/kk
            </label>
            <input
              id="filter-max-price"
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          {/* Operator */}
          <div>
            <label htmlFor="filter-operator" className="mb-1 block text-sm font-medium text-slate-700">Operaattori</label>
            <select
              id="filter-operator"
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">Kaikki operaattorit</option>
              {operators.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}
            </select>
          </div>

          {/* 5G filter */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={only5G}
                onChange={(e) => setOnly5G(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
              />
              Vain 5G-liittymät
            </label>
          </div>

          {/* Unlimited filter */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyUnlimited}
                onChange={(e) => setOnlyUnlimited(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
              />
              Vain rajaton data
            </label>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="filter-sort" className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Järjestä
            </label>
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="price-asc">Halvin ensin</option>
              <option value="price-desc">Kallein ensin</option>
              <option value="data-desc">Eniten dataa</option>
              <option value="speed-desc">Nopein ensin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-slate-500">
        {filtered.length} liittymää löydetty
      </p>

      {/* Plan grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plan) => (
            <MobilePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">Ei tuloksia</p>
          <p className="mt-2 text-slate-500">Kokeile muuttaa hakuehtoja.</p>
        </div>
      )}
    </div>
  );
}
