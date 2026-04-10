import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { operators, getOperatorBySlug, getOperatorById } from '@/data/operators';
import { mobilePlans, getPlansByOperator } from '@/data/mobile-plans';
import { broadbandPlans, getBroadbandByOperator } from '@/data/broadband-plans';
import { comparisonPairs } from '@/data/comparisons';
import { MobilePlanCard, BroadbandPlanCard } from '@/components/ui/PlanCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return operators.map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const operator = getOperatorBySlug(slug);
  if (!operator) return {};

  return {
    title: `${operator.name} — liittymät, arvostelu ja tiedot`,
    description: `${operator.name}: kaikki puhelinliittymät ja laajakaistat. ${operator.description.slice(0, 120)}`,
    alternates: { canonical: `/operaattorit/${slug}` },
  };
}

export default async function OperatorPage({ params }: Props) {
  const { slug } = await params;
  const operator = getOperatorBySlug(slug);
  if (!operator) notFound();

  const opMobilePlans = getPlansByOperator(operator.id);
  const opBroadbandPlans = getBroadbandByOperator(operator.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: operator.name,
    url: operator.website,
    description: operator.description,
    foundingDate: operator.founded.toString(),
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link
          href="/operaattorit"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" /> Kaikki operaattorit
        </Link>

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold text-white"
            style={{ backgroundColor: operator.color }}
          >
            {operator.name.charAt(0)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{operator.name}</h1>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {operator.type === 'MNO' ? 'Verkko-operaattori' : 'MVNO'}
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-lg text-slate-600">{operator.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>Perustettu: {operator.founded}</span>
              {operator.marketShare && <span>Markkinaosuus: ~{operator.marketShare} %</span>}
              {operator.network && <span>Verkko: {operator.network}</span>}
              <a
                href={operator.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700"
              >
                Verkkosivut <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="mb-4 text-lg font-bold text-emerald-800">Vahvuudet</h2>
            <ul className="space-y-2">
              {operator.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-emerald-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" /> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="mb-4 text-lg font-bold text-red-800">Heikkoudet</h2>
            <ul className="space-y-2">
              {operator.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                  <X className="mt-0.5 h-4 w-4 shrink-0" /> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile plans */}
        {opMobilePlans.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              {operator.name} — Puhelinliittymät
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opMobilePlans.map((plan) => (
                <MobilePlanCard key={plan.id} plan={plan} showOperator={false} />
              ))}
            </div>
          </div>
        )}

        {/* Broadband plans */}
        {opBroadbandPlans.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              {operator.name} — Laajakaistat
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opBroadbandPlans.map((plan) => (
                <BroadbandPlanCard key={plan.id} plan={plan} showOperator={false} />
              ))}
            </div>
          </div>
        )}

        {/* Comparison cross-links */}
        {(() => {
          const relevantPairs = comparisonPairs.filter(
            (p) => p.operator1Id === operator.id || p.operator2Id === operator.id
          );
          if (relevantPairs.length === 0) return null;
          return (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Vertaa {operator.name} muihin operaattoreihin
              </h2>
              <div className="flex flex-wrap gap-3">
                {relevantPairs.map((pair) => {
                  const otherId = pair.operator1Id === operator.id ? pair.operator2Id : pair.operator1Id;
                  const other = getOperatorById(otherId);
                  if (!other) return null;
                  return (
                    <Link
                      key={pair.slugPair}
                      href={`/liittymavertailu/${pair.slugPair}`}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-cyan-200 hover:text-cyan-700 hover:shadow-md"
                    >
                      {operator.name} vs {other.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
