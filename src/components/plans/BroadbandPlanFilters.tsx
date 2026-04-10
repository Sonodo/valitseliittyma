'use client';

import { useState, useMemo } from 'react';
import { BroadbandPlan, BroadbandTechnology } from '@/types';
import { operators } from '@/data/operators';
import { BroadbandPlanCard } from '@/components/ui/PlanCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface Props {
  plans: BroadbandPlan[];
}

type SortOption = 'price-asc' | 'price-desc' | 'speed-desc';

export default function BroadbandPlanFilters({ plans }: Props) {
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [technology, setTechnology] = useState<BroadbandTechnology | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('price-asc');

  // Only show operators that have broadband plans
  const bbOperatorIds = [...new Set(plans.map((p) => p.operatorId))];
  const bbOperators = operators.filter((op) => bbOperatorIds.includes(op.id));

  const filtered = useMemo(() => {
    let result = plans.filter((p) => p.monthlyPrice <= maxPrice);
    if (selectedOperator !== 'all') {
      result = result.filter((p) => p.operatorId === selectedOperator);
    }
    if (technology !== 'all') {
      result = result.filter((p) => p.technology === technology);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
        break;
      case 'speed-desc':
        result.sort((a, b) => b.downloadSpeed - a.downloadSpeed);
        break;
    }

    return result;
  }, [plans, maxPrice, selectedOperator, technology, sort]);

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-bold">Suodata laajakaistoja</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="bb-filter-max-price" className="mb-1 block text-sm font-medium text-slate-700">
              Maksimihinta: {maxPrice} €/kk
            </label>
            <input
              id="bb-filter-max-price"
              type="range"
              min={15}
              max={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div>
            <label htmlFor="bb-filter-operator" className="mb-1 block text-sm font-medium text-slate-700">Operaattori</label>
            <select
              id="bb-filter-operator"
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">Kaikki operaattorit</option>
              {bbOperators.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bb-filter-technology" className="mb-1 block text-sm font-medium text-slate-700">Tekniikka</label>
            <select
              id="bb-filter-technology"
              value={technology}
              onChange={(e) => setTechnology(e.target.value as BroadbandTechnology | 'all')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">Kaikki</option>
              <option value="fiber">Valokuitu</option>
              <option value="4G">4G-kotinetti</option>
              <option value="5G">5G-kotinetti</option>
            </select>
          </div>

          <div>
            <label htmlFor="bb-filter-sort" className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Järjestä
            </label>
            <select
              id="bb-filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="price-asc">Halvin ensin</option>
              <option value="price-desc">Kallein ensin</option>
              <option value="speed-desc">Nopein ensin</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-500">{filtered.length} laajakaistaa löydetty</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plan) => (
            <BroadbandPlanCard key={plan.id} plan={plan} />
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
