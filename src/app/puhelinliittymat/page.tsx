import type { Metadata } from 'next';
import { mobilePlans } from '@/data/mobile-plans';
import MobilePlanFilters from '@/components/plans/MobilePlanFilters';
import { plansToItemListSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL, DATA_REVIEWED_AT } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Puhelinliittymät — Vertaa ${mobilePlans.length} liittymää Suomessa`,
  description: `Vertaa ${mobilePlans.length} puhelinliittymää Suomen merkittävimmiltä operaattoreilta. Suodata hinnan, datan, operaattorin ja 5G:n mukaan. Löydä halvin liittymä.`,
  openGraph: {
    title: `Puhelinliittymät — Vertaa ${mobilePlans.length} liittymää Suomessa`,
    description: 'Vertaa puhelinliittymiä ja löydä halvin. Suodata ja lajittele.',
  },
  alternates: { canonical: '/puhelinliittymat' },
};

function fmt(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €/kk`;
}

export default function PuhelinliittymatPage() {
  const byPrice = [...mobilePlans].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const cheapest = byPrice[0];
  const cheapestUnlimitedData = byPrice.find((p) => p.dataAmount === 'unlimited');
  const cheapestAllUnlimited = byPrice.find(
    (p) => p.dataAmount === 'unlimited' && p.callsIncluded.startsWith('Rajaton'),
  );
  const operatorCount = new Set(mobilePlans.map((p) => p.operatorId)).size;

  const itemListLd = plansToItemListSchema(
    mobilePlans,
    `${SITE_URL}/puhelinliittymat`,
    'Puhelinliittymät — Valitse Liittymä',
  );

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Puhelinliittymät', url: '/puhelinliittymat' },
  ]);

  return (
    <>
      <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Puhelinliittymät
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Vertaa {mobilePlans.length} puhelinliittymää Suomen merkittävimmiltä operaattoreilta.
            Suodata hinnan, datamäärän, operaattorin ja verkkotyypin mukaan.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Liittymätiedot tarkistettu {DATA_REVIEWED_AT}. Tarkista lopulliset hinnat operaattorilta.
          </p>
        </div>

        {/* Answer capsule — data-driven direct answer for readers and AI crawlers */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/70 px-5 py-4">
          <p className="text-[15px] leading-relaxed text-slate-700">
            Edullisin liittymä vertailussa on{' '}
            <span className="font-semibold text-slate-900">
              {cheapest.name} ({fmt(cheapest.monthlyPrice)})
            </span>
            {cheapestUnlimitedData && (
              <>
                , edullisin rajattoman datan liittymä {cheapestUnlimitedData.name} (
                {fmt(cheapestUnlimitedData.monthlyPrice)})
              </>
            )}
            {cheapestAllUnlimited && cheapestAllUnlimited.id !== cheapestUnlimitedData?.id && (
              <>
                {' '}
                ja edullisin rajattomalla datalla ja puheluilla {cheapestAllUnlimited.name} (
                {fmt(cheapestAllUnlimited.monthlyPrice)})
              </>
            )}
            . Vertailussa on {mobilePlans.length} liittymää {operatorCount} operaattorilta —
            hinnat ovat normaalihintoja ilman kampanja-alennuksia, ja voimassa olevat
            kampanjahinnat näytetään korteilla erikseen.
          </p>
        </div>

        <MobilePlanFilters plans={mobilePlans} />
      </div>
    </div>
    </>
  );
}
