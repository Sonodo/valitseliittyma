import type { Metadata } from 'next';
import { broadbandPlans } from '@/data/broadband-plans';
import BroadbandPlanFilters from '@/components/plans/BroadbandPlanFilters';
import { plansToItemListSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL, DATA_REVIEWED_AT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Laajakaista — Vertaa laajakaistaliittymiä Suomessa',
  description:
    'Vertaa laajakaistaliittymiä: valokuitu, 4G-kotinetti ja 5G-kotinetti. Löydä halvin ja nopein laajakaista kotiin.',
  openGraph: {
    title: 'Laajakaista — Vertaa laajakaistaliittymiä Suomessa',
    description: 'Vertaa valokuitua, 4G-kotinettiä ja 5G-kotinettiä. Löydä paras laajakaista.',
  },
  alternates: { canonical: '/laajakaista' },
};

function fmt(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €/kk`;
}

export default function LaajakaistaPage() {
  const byPrice = [...broadbandPlans].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const cheapest = byPrice[0];
  const fastest = [...broadbandPlans].sort((a, b) => b.downloadSpeed - a.downloadSpeed)[0];

  const itemListLd = plansToItemListSchema(
    broadbandPlans,
    `${SITE_URL}/laajakaista`,
    'Laajakaistaliittymät — Valitse Liittymä',
  );

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Laajakaista', url: '/laajakaista' },
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
              Laajakaistaliittymät
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Vertaa {broadbandPlans.length} laajakaistaliittymää. Valokuitu, 4G-kotinetti ja 5G-kotinetti
              Suomen merkittävimmiltä operaattoreilta.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Liittymätiedot tarkistettu {DATA_REVIEWED_AT}. Tarkista lopulliset hinnat operaattorilta.
            </p>
          </div>

          {/* Answer capsule — data-driven direct answer for readers and AI crawlers */}
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/70 px-5 py-4">
            <p className="text-[15px] leading-relaxed text-slate-700">
              Edullisin kodin nettiliittymä vertailussa on{' '}
              <span className="font-semibold text-slate-900">
                {cheapest.name} ({fmt(cheapest.monthlyPrice)})
              </span>{' '}
              ja nopein {fastest.name} ({fastest.downloadSpeed} Mbit/s,{' '}
              {fmt(fastest.monthlyPrice)}). Hinnat ovat normaalihintoja ilman
              kampanja-alennuksia — voimassa olevat kampanjahinnat näytetään
              korteilla erikseen.
            </p>
          </div>

          {/* Honest coverage note: address-priced fiber is not listable */}
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm leading-relaxed text-amber-900">
              <span className="font-semibold">Huom:</span> Elisan, DNA:n ja Telian
              kiinteiden valokuituliittymien hinnat ovat osoitekohtaisia, eikä niille
              ole julkista listahintaa — siksi ne eivät ole tässä vertailussa.
              Tarkista kuidun saatavuus ja hinta osoitteellesi suoraan operaattorilta.
              Vertailussa näytetään valtakunnallisesti hinnoitellut kodin
              nettiliittymät (5G-kotinetit ja Valoon kuitu).
            </p>
          </div>

          <BroadbandPlanFilters plans={broadbandPlans} />
        </div>
      </div>
    </>
  );
}
