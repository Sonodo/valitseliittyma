import type { Metadata } from 'next';
import Link from 'next/link';
import { broadbandPlans, getCheapestBroadband, getFiberPlans, get5GBroadband } from '@/data/broadband-plans';
import { BroadbandPlanCard } from '@/components/ui/PlanCard';

export const metadata: Metadata = {
  title: 'Paras laajakaista 2026 — Vertaa laajakaistaliittymiä',
  description:
    'Löydä paras laajakaista kotiin. Vertailussa valokuitu, 4G-kotinetti ja 5G-kotinetti. Halvin ja nopein laajakaista Suomessa.',
  alternates: { canonical: '/paras-laajakaista' },
};

export default function ParasLaajakaistaPage() {
  const cheapest = getCheapestBroadband(3);
  const fiberPlans = getFiberPlans().sort((a, b) => a.monthlyPrice - b.monthlyPrice).slice(0, 3);
  const plans5G = get5GBroadband().sort((a, b) => a.monthlyPrice - b.monthlyPrice);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Paras laajakaista 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vertaa laajakaistoja ja löydä paras vaihtoehto kotiisi: valokuitu, 4G- tai 5G-kotinetti.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Halvimmat laajakaistat</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cheapest.map((plan) => (
              <BroadbandPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Parhaat valokuituliittymät</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {fiberPlans.map((plan) => (
              <BroadbandPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">5G-kotinetit</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans5G.map((plan) => (
              <BroadbandPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2>Miten valita laajakaista?</h2>
            <p>
              Laajakaistan valinta riippuu käyttötarpeistasi, asuinpaikasta ja budjetista.
              Valokuitu on luotettavin ja nopein, mutta vaatii kaapeloinnin. 5G-kotinetti on
              hyvä vaihtoehto alueille, joissa kuitua ei ole.
            </p>
            <p>
              <Link href="/blogi/laajakaistan-valinta-opas" className="text-cyan-600 hover:text-cyan-700">
                Lue kattava laajakaistan valintaopas &rarr;
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
