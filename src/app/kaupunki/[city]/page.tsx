import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Signal, Wifi, ArrowLeft, Check, X } from 'lucide-react';
import { cities, getCityBySlug } from '@/data/cities';
import { getOperatorById } from '@/data/operators';
import { mobilePlans, get5GPlans } from '@/data/mobile-plans';
import { broadbandPlans } from '@/data/broadband-plans';
import { MobilePlanCard } from '@/components/ui/PlanCard';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title: `Puhelinliittymät ja laajakaistat ${city.name} — 5G-kattavuus ja tarjonta`,
    description: `Puhelinliittymät ja laajakaistat ${city.name}: 5G-kattavuus, valokuitu ja parhaat liittymätarjoukset. Vertaa operaattoreita ${city.name}.`,
    alternates: { canonical: `/kaupunki/${citySlug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const best5GPlans = get5GPlans()
    .sort((a, b) => a.monthlyPrice - b.monthlyPrice)
    .slice(0, 3);

  const cheapestMobile = [...mobilePlans]
    .sort((a, b) => a.monthlyPrice - b.monthlyPrice)
    .slice(0, 3);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/operaattorit"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" /> Takaisin
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cyan-600" />
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Puhelinliittymät ja laajakaistat — {city.name}
            </h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {city.description}
          </p>
        </div>

        {/* City stats */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Väkiluku</p>
            <p className="text-2xl font-bold text-slate-900">
              {city.population.toLocaleString('fi-FI')}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">5G-kattavuus</p>
            <p className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              {city.has5G ? (
                <><Check className="h-6 w-6 text-emerald-500" /> Kyllä</>
              ) : (
                <><X className="h-6 w-6 text-slate-300" /> Ei vielä</>
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Valokuitu</p>
            <p className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              {city.fiberAvailable ? (
                <><Check className="h-6 w-6 text-emerald-500" /> Saatavilla</>
              ) : (
                <><X className="h-6 w-6 text-slate-300" /> Rajoitettu</>
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">5G-operaattorit</p>
            <p className="text-lg font-bold text-slate-900">
              {city.operators5G.map((id) => getOperatorById(id)?.name).filter(Boolean).join(', ')}
            </p>
          </div>
        </div>

        {/* Best 5G plans for the city */}
        {city.has5G && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              <Signal className="mr-2 inline h-6 w-6 text-cyan-600" />
              Halvimmat 5G-liittymät — {city.name}
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Kaikki liittymät ovat saatavilla valtakunnallisesti. {city.name} on {city.operators5G.map((id) => getOperatorById(id)?.name).filter(Boolean).join(', ')} 5G-verkon piirissä.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {best5GPlans.map((plan) => (
                <MobilePlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </section>
        )}

        {/* Cheapest plans */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Halvimmat puhelinliittymät — {city.name}
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Kaikki liittymät ovat saatavilla valtakunnallisesti. Hinnat ovat samat kaikkialla Suomessa.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cheapestMobile.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Vertaa kaikkia liittymiä {city.name}
          </h2>
          <p className="mt-2 text-slate-600">
            Suodata liittymiä hinnan, datan ja operaattorin mukaan.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/puhelinliittymat"
              className="rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
            >
              Puhelinliittymät
            </Link>
            <Link
              href="/laajakaista"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Laajakaista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
