'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, TrendingDown } from 'lucide-react';
import { mobilePlans } from '@/data/mobile-plans';
import { DATA_REVIEWED_AT } from '@/lib/constants';

type DataTier = 'small' | 'medium' | 'large' | 'unlimited';

interface TierConfig {
  label: string;
  description: string;
  match: (plan: (typeof mobilePlans)[number]) => boolean;
}

// Feature-parity tiers so the comparison benchmark matches the user's actual need.
const TIERS: Record<DataTier, TierConfig> = {
  small: {
    label: 'Alle 10 Gt/kk (kevyt käyttö)',
    description: '≤ 10 Gt/kk',
    match: (p) =>
      p.dataAmount !== 'unlimited' &&
      typeof p.dataAmount === 'number' &&
      p.dataAmount > 0 &&
      p.dataAmount <= 10,
  },
  medium: {
    label: '10–50 Gt/kk (perussuomalainen käyttö)',
    description: '10–50 Gt/kk',
    match: (p) =>
      p.dataAmount !== 'unlimited' &&
      typeof p.dataAmount === 'number' &&
      p.dataAmount >= 10 &&
      p.dataAmount <= 50,
  },
  large: {
    label: 'Yli 50 Gt/kk tai rajaton 4G',
    description: '> 50 Gt/kk',
    match: (p) =>
      p.dataAmount === 'unlimited' ||
      (typeof p.dataAmount === 'number' && p.dataAmount > 50),
  },
  unlimited: {
    label: 'Rajaton data (5G)',
    description: 'Rajaton 5G',
    match: (p) => p.dataAmount === 'unlimited' && p.has5G,
  },
};

export default function SubscriptionCalculator() {
  const [currentPrice, setCurrentPrice] = useState<number>(20);
  const [tier, setTier] = useState<DataTier>('medium');

  const { benchmarkPrice, sampleSize, sampleNames } = useMemo(() => {
    const config = TIERS[tier];
    const matching = mobilePlans
      .filter(config.match)
      .sort((a, b) => a.monthlyPrice - b.monthlyPrice);

    // Use the average of the top 5 cheapest matching plans — avoids anchoring on a
    // single outlier (KKV methodology friendly).
    const sample = matching.slice(0, 5);
    const avg =
      sample.length > 0
        ? sample.reduce((sum, p) => sum + p.monthlyPrice, 0) / sample.length
        : 0;
    return {
      benchmarkPrice: avg,
      sampleSize: sample.length,
      sampleNames: sample.map((p) => p.name).join(', '),
    };
  }, [tier]);

  const yearlyCurrent = currentPrice * 12;
  const yearlyBenchmark = benchmarkPrice * 12;
  const yearlySavings = yearlyCurrent - yearlyBenchmark;
  const fiveYearSavings = yearlySavings * 5;
  const savingsPositive = yearlySavings > 0;

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
            step={0.1}
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

        <div className="mt-6">
          <label htmlFor="tier-select" className="mb-2 block text-sm font-medium text-slate-700">
            Datantarpeesi
          </label>
          <select
            id="tier-select"
            value={tier}
            onChange={(e) => setTier(e.target.value as DataTier)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {Object.entries(TIERS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-slate-500">
            Vertailuhinta lasketaan samasta datakategoriasta — näet todellisen säästön, et
            ylimitoitettua arviota.
          </p>
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
            <p className="text-sm text-slate-500">
              Markkinavertailu ({TIERS[tier].description}, vuosi)
            </p>
            <p className="text-2xl font-extrabold text-emerald-600">
              {yearlyBenchmark.toFixed(2).replace('.', ',')} €
            </p>
          </div>
          <div className={`rounded-xl ${savingsPositive ? 'bg-emerald-100' : 'bg-slate-100'} p-4`}>
            <p className={`text-sm ${savingsPositive ? 'text-emerald-700' : 'text-slate-600'}`}>
              {savingsPositive ? 'Mahdollinen säästö/vuosi' : 'Nykyinen hintasi on markkinan alapäässä'}
            </p>
            <p
              className={`text-2xl font-extrabold ${savingsPositive ? 'text-emerald-700' : 'text-slate-700'}`}
            >
              {savingsPositive ? `${yearlySavings.toFixed(2).replace('.', ',')} €` : '0,00 €'}
            </p>
          </div>
          <div className={`rounded-xl ${savingsPositive ? 'bg-emerald-100' : 'bg-slate-100'} p-4`}>
            <p className={`text-sm ${savingsPositive ? 'text-emerald-700' : 'text-slate-600'}`}>
              Säästö 5 vuodessa
            </p>
            <p
              className={`text-2xl font-extrabold ${savingsPositive ? 'text-emerald-700' : 'text-slate-700'}`}
            >
              {savingsPositive ? `${fiveYearSavings.toFixed(2).replace('.', ',')} €` : '0,00 €'}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          * Vertailuhinta on valitsemasi datakategorian {sampleSize} halvimman liittymän keskiarvo
          ({benchmarkPrice.toFixed(2).replace('.', ',')} €/kk)
          {sampleSize > 0 && `: ${sampleNames}`}. Todellinen säästö riippuu valitsemastasi
          liittymästä ja operaattorin kulloisestakin kampanjasta. Hintatiedot tarkistettu viimeksi{' '}
          {DATA_REVIEWED_AT}.
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
