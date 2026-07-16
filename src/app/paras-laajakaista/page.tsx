import type { Metadata } from 'next';
import Link from 'next/link';
import { broadbandPlans, getCheapestBroadband, getFiberPlans, get5GBroadband } from '@/data/broadband-plans';
import { operators } from '@/data/operators';
import { BroadbandPlanCard } from '@/components/ui/PlanCard';
import MethodologyBox from '@/components/ui/MethodologyBox';
import { plansToItemListSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Paras laajakaista 2026 — Vertaa laajakaistaliittymiä',
  description:
    'Löydä paras laajakaista kotiin. Vertailussa 5G-kotinetit ja symmetrinen valokuitu. Halvin ja nopein valtakunnallisesti hinnoiteltu laajakaista Suomessa.',
  alternates: { canonical: '/paras-laajakaista' },
};

export default function ParasLaajakaistaPage() {
  const cheapest = getCheapestBroadband(3);
  const fiberPlans = getFiberPlans().sort((a, b) => a.monthlyPrice - b.monthlyPrice).slice(0, 3);
  const plans5G = get5GBroadband().sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const cheapestOverall = cheapest[0];
  const fastestOverall = [...broadbandPlans].sort((a, b) => b.downloadSpeed - a.downloadSpeed)[0];

  const itemListLd = plansToItemListSchema(
    broadbandPlans,
    `${SITE_URL}/paras-laajakaista`,
    'Laajakaistat — Valitse Liittymä',
  );
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Paras laajakaista', url: '/paras-laajakaista' },
  ]);

  return (
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
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Paras laajakaista 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vertaa laajakaistoja ja löydä sopivin vaihtoehto kotiisi: 5G-kotinetti tai symmetrinen valokuitu.
          </p>
          {cheapestOverall && fastestOverall && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 px-5 py-4">
              <p className="text-[15px] leading-relaxed text-slate-700">
                Edullisin laajakaista vertailussa on{' '}
                <span className="font-semibold text-slate-900">
                  {cheapestOverall.name} (
                  {cheapestOverall.monthlyPrice.toFixed(2).replace('.', ',')} €/kk)
                </span>{' '}
                ja nopein {fastestOverall.name} ({fastestOverall.downloadSpeed} Mbit/s).
                Suurten operaattorien kiinteät kuituhinnat ovat osoitekohtaisia eivätkä
                siksi ole listassa — vertailussa näytetään valtakunnallisesti
                hinnoitellut liittymät normaalihinnoin.
              </p>
            </div>
          )}
        </div>

        <MethodologyBox
          superlative="paras laajakaista"
          operatorCount={operators.filter((op) => broadbandPlans.some((p) => p.operatorId === op.id)).length}
          planCount={broadbandPlans.length}
          methodology="Laajakaistat on ryhmitelty kolmeen kategoriaan (halvin, valokuitu, 5G-kotinetti) ja listattu kunkin sisällä perushinnan (€/kk) mukaan. &quot;Paras&quot; kategoriassa tarkoittaa edullisinta listattua; kuituyhteydet vaativat tarkistuksen oman osoitteesi saatavuudelta."
        />

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Edullisimmat laajakaistat</h2>
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
