import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Smartphone,
  Signal,
  Wifi,
  Check,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { operators } from '@/data/operators';
import { mobilePlans, getCheapestPlans } from '@/data/mobile-plans';
import { getLatestPosts } from '@/data/blog-posts';
import { cities } from '@/data/cities';
import { comparisonPairs } from '@/data/comparisons';
import { MobilePlanCard } from '@/components/ui/PlanCard';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Valitse Liittymä — Vertaa puhelinliittymiä ja laajakaistoja Suomessa',
  description:
    'Vertaa puhelinliittymiä ja laajakaistoja Suomessa. Löydä halvin liittymä Elisan, DNA:n, Telian ja budjettioperaattoreiden valikoimista. Ilmainen ja puolueeton vertailu.',
  openGraph: {
    title: 'Valitse Liittymä — Vertaa puhelinliittymiä ja löydä halvin liittymä',
    description:
      'Vertaa puhelinliittymiä ja laajakaistoja. Löydä halvin liittymä. Ilmainen ja puolueeton.',
    url: '/',
    type: 'website',
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const cheapPlans = getCheapestPlans(3);
  const latestPosts = getLatestPosts(3);
  const totalPlans = mobilePlans.length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0C1222] via-[#0F1A2E] to-[#162540]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
              </span>
              {operators.length} operaattoria &middot; {totalPlans}+ liittymää vertailussa
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Vertaa{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                puhelinliittymiä
              </span>{' '}
              ja säästä
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Löydä halvin puhelinliittymä tai laajakaista Suomesta.
              Vertaa Elisan, DNA:n, Telian ja budjettioperaattoreiden hintoja — ilmaiseksi ja puolueettomasti.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/puhelinliittymat"
                className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-600/25 transition-all hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.98]"
              >
                Vertaa puhelinliittymiä
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/laajakaista"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
              >
                Vertaa laajakaistoja
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Shield className="h-5 w-5 text-cyan-600" />
            Riippumaton vertailu
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Check className="h-5 w-5 text-emerald-500" />
            Ilmainen palvelu
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Users className="h-5 w-5 text-violet-500" />
            {operators.length} operaattoria
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Zap className="h-5 w-5 text-amber-500" />
            Säännöllisesti tarkistettu data
          </div>
        </div>
      </section>

      {/* Cheapest plans */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Halvimmat puhelinliittymät
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Suomen edullisimmat liittymät rajattomalla puheella ja viesteillä
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cheapPlans.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/puhelinliittymat"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Näytä kaikki {totalPlans} liittymää
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Liittymien hinnat ja ehdot voivat muuttua. Tarkista aina ajantasainen hinta operaattorin sivuilta.
          </p>
        </div>
      </section>

      {/* Quick categories */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Mitä etsit?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Smartphone, title: 'Halvin liittymä', desc: 'Alle 10 €/kk liittymät rajattomalla puheella', href: '/halvin-puhelinliittyma' },
              { icon: Signal, title: '5G-liittymä', desc: 'Nopein verkko ja rajaton data', href: '/paras-5g-liittyma' },
              { icon: Wifi, title: 'Laajakaista', desc: 'Kuitu, 4G ja 5G-kotinetti', href: '/laajakaista' },
              { icon: Star, title: 'Vertaa operaattoreita', desc: 'Elisa vs DNA vs Telia ja muut', href: '/operaattorit' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
              >
                <item.icon className="mb-4 h-8 w-8 text-cyan-600" />
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Operator logos */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Operaattorit vertailussa
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Vertailemme kaikkia Suomen suurimpia operaattoreita
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {operators.map((op) => (
              <Link
                key={op.id}
                href={`/operaattorit/${op.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
              >
                <div
                  className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold"
                  style={{ backgroundColor: op.color }}
                >
                  {op.name.charAt(0)}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{op.name}</h3>
                <span className="mt-1 text-xs text-slate-500">
                  {op.type === 'MNO' ? 'Verkko-operaattori' : 'Budjettioperaattori'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog posts */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-slate-900">Ajankohtaista</h2>
            <Link
              href="/blogi"
              className="hidden items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700 sm:flex"
            >
              Kaikki artikkelit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogi/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <span className="text-xs font-medium text-cyan-600">{post.category}</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-cyan-700">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.description}</p>
                <p className="mt-4 text-xs text-slate-400">
                  {new Date(post.date).toLocaleDateString('fi-FI')} &middot; {post.readingTime} min lukuaika
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/blogi" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700">
              Kaikki artikkelit &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* City pages */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Liittymät kaupungeittain
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Katso liittymätarjonta ja 5G-kattavuus kaupungissasi
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/kaupunki/${city.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:text-cyan-700 hover:shadow-md"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Operator comparisons */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Operaattorivertailut
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Vertaile operaattoreita keskenään
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {comparisonPairs.map((pair) => {
              const names = pair.slugPair.replace(/-vs-/, ' vs ').split(' vs ');
              const label = names.map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(' vs ');
              return (
                <Link
                  key={pair.slugPair}
                  href={`/liittymavertailu/${pair.slugPair}`}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:text-cyan-700 hover:shadow-md"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-700 to-cyan-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Valmis säästämään liittymäkuluissa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cyan-100">
            Vertaa liittymiä ilmaiseksi ja löydä juuri sinulle sopiva liittymä parhaaseen hintaan.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/puhelinliittymat"
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-cyan-700 transition-colors hover:bg-cyan-50"
            >
              Vertaa puhelinliittymiä
            </Link>
            <Link
              href="/vertaa"
              className="rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              Vertaa rinnakkain
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
