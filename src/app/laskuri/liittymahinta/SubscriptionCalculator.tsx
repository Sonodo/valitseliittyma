'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, TrendingDown } from 'lucide-react';
import { mobilePlans } from '@/data/mobile-plans';

export default function SubscriptionCalculator() {
  const [currentPrice, setCurrentPrice] = useState<number>(30);

  const { cheapestMarket, cheapestPlanName } = useMemo(() => {
    const plansWithData = mobilePlans.filter(
      (p) => p.dataAmount === 'unlimited' || (typeof p.dataAmount === 'number' && p.dataAmount > 0)
    );
    const cheapest = plansWithData.reduce((min, p) =>
      p.monthlyPrice < min.monthlyPrice ? p : min
    , plansWithData[0]);
    return { cheapestMarket: cheapest.monthlyPrice, cheapestPlanName: cheapest.name };
  }, []);

  const yearlyCurrent = currentPrice * 12;
  const yearlyCheapest = cheapestMarket * 12;
  const yearlySavings = yearlyCurrent - yearlyCheapest;
  const fiveYearSavings = yearlySavings * 5;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-cyan-600" />
          <h2 className="text-xl font-bold text-slate-900">Nykyinen liittymäsi</h2>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Kuukausihinta: {currentPrice.toFixed(2).replace('.', ',')} €/kk
          </label>
          <input
            type="range"
            min={5}
            max={60}
            step={0.5}
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value))}
            aria-label="Nykyinen kuukausihinta"
            className="w-full accent-cyan-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>5 €</span>
            <span>60 €</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-cyan-700" />
          <h2 className="text-xl font-bold text-cyan-900">Laskelman tulokset</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">Nykyinen vuosikustannus</p>
            <p className="text-2xl font-extrabold text-slate-900">
              {yearlyCurrent.toFixed(2).replace('.', ',')} €
            </p>
          </div>
          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">Halvin vaihtoehto (vuosi)</p>
            <p className="text-2xl font-extrabold text-emerald-600">
              {yearlyCheapest.toFixed(2).replace('.', ',')} €
            </p>
          </div>
          <div className="rounded-xl bg-emerald-100 p-4">
            <p className="text-sm text-emerald-700">Mahdollinen säästö/vuosi</p>
            <p className="text-2xl font-extrabold text-emerald-700">
              {yearlySavings > 0 ? yearlySavings.toFixed(2).replace('.', ',') : '0,00'} €
            </p>
          </div>
          <div className="rounded-xl bg-emerald-100 p-4">
            <p className="text-sm text-emerald-700">Säästö 5 vuodessa</p>
            <p className="text-2xl font-extrabold text-emerald-700">
              {fiveYearSavings > 0 ? fiveYearSavings.toFixed(2).replace('.', ',') : '0,00'} €
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          * Halvin datallinen liittymä on tällä hetkellä {cheapestMarket.toFixed(2).replace('.', ',')} €/kk
          ({cheapestPlanName}). Todellinen säästö riippuu valitsemastasi liittymästä ja datantarpeistasi.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/puhelinliittymat"
          className="inline-block rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          Katso halvimmat liittymät
        </Link>
      </div>
    </div>
  );
}
