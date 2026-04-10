import type { Metadata } from 'next';
import { broadbandPlans } from '@/data/broadband-plans';
import BroadbandPlanFilters from '@/components/plans/BroadbandPlanFilters';

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

export default function LaajakaistaPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Laajakaistaliittymät
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Vertaa {broadbandPlans.length} laajakaistaliittymää. Valokuitu, 4G-kotinetti ja 5G-kotinetti
            kaikilta operaattoreilta.
          </p>
        </div>

        <BroadbandPlanFilters plans={broadbandPlans} />
      </div>
    </div>
  );
}
