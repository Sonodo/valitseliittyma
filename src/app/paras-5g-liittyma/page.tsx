import type { Metadata } from 'next';
import Link from 'next/link';
import { mobilePlans, get5GPlans } from '@/data/mobile-plans';
import { MobilePlanCard } from '@/components/ui/PlanCard';

export const metadata: Metadata = {
  title: 'Paras 5G-liittymä 2026 — Vertaa 5G-puhelinliittymiä',
  description:
    'Löydä paras 5G-liittymä Suomessa. Vertailussa Elisan, DNA:n, Telian ja budjettioperaattoreiden 5G-liittymät hintojen ja nopeuksien mukaan.',
  alternates: { canonical: '/paras-5g-liittyma' },
};

export default function Paras5GPage() {
  const plans5G = get5GPlans().sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const cheapest5G = plans5G.slice(0, 3);
  const fastest5G = [...plans5G].sort((a, b) => b.maxSpeed - a.maxSpeed).slice(0, 3);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Paras 5G-liittymä 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            5G-verkko tarjoaa huippunopeat yhteydet ja pienen viiveen. Vertaa kaikkia
            5G-puhelinliittymiä ja löydä paras vaihtoehto juuri sinulle.
          </p>
        </div>

        {/* Cheapest 5G */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Halvimmat 5G-liittymät</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cheapest5G.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Fastest 5G */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Nopeimmat 5G-liittymät</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {fastest5G.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* All 5G plans */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Kaikki 5G-liittymät</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans5G.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* 5G Guide content */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2>Miksi valita 5G-liittymä?</h2>
            <p>
              5G tarjoaa merkittävästi nopeammat yhteydet kuin 4G. Käytännössä 5G:llä lataat
              elokuvan sekunneissa, videopuhelut toimivat sujuvammin ja mobiilipelaamisen viive
              pienenee.
            </p>
            <h3>5G-liittymän valintakriteerit</h3>
            <ul>
              <li><strong>Nopeus:</strong> 200M riittää useimmille, 600M–1000M vaativaan käyttöön</li>
              <li><strong>Hinta:</strong> 5G alkaen ~27 €/kk (Oomi, DNA)</li>
              <li><strong>Kattavuus:</strong> Tarkista, toimiiko 5G alueellasi</li>
              <li><strong>Puhelin:</strong> Tarvitset 5G-yhteensopivan puhelimen</li>
            </ul>
            <p>
              <Link href="/opas/5g-opas" className="text-cyan-600 hover:text-cyan-700">
                Lue kattava 5G-oppaamme &rarr;
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
