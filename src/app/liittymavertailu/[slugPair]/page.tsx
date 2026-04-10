import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, ArrowLeft } from 'lucide-react';
import { comparisonPairs, getComparisonBySlug } from '@/data/comparisons';
import { getOperatorById } from '@/data/operators';
import { getPlansByOperator } from '@/data/mobile-plans';
import { MobilePlanCard } from '@/components/ui/PlanCard';

interface Props {
  params: Promise<{ slugPair: string }>;
}

export async function generateStaticParams() {
  return comparisonPairs.map((pair) => ({ slugPair: pair.slugPair }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugPair } = await params;
  const pair = getComparisonBySlug(slugPair);
  if (!pair) return {};
  const op1 = getOperatorById(pair.operator1Id);
  const op2 = getOperatorById(pair.operator2Id);
  if (!op1 || !op2) return {};

  return {
    title: `${op1.name} vs ${op2.name} — Kumpi on parempi?`,
    description: `Vertailu: ${op1.name} vs ${op2.name}. Kumpi tarjoaa paremmat liittymät, hinnat ja verkon? Kattava operaattorivertailu.`,
    alternates: { canonical: `/liittymavertailu/${slugPair}` },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slugPair } = await params;
  const pair = getComparisonBySlug(slugPair);
  if (!pair) notFound();

  const op1 = getOperatorById(pair.operator1Id);
  const op2 = getOperatorById(pair.operator2Id);
  if (!op1 || !op2) notFound();

  const plans1 = getPlansByOperator(op1.id);
  const plans2 = getPlansByOperator(op2.id);

  const cheapest1 = plans1.length > 0 ? Math.min(...plans1.map((p) => p.monthlyPrice)) : 0;
  const cheapest2 = plans2.length > 0 ? Math.min(...plans2.map((p) => p.monthlyPrice)) : 0;

  const has5G1 = plans1.some((p) => p.has5G);
  const has5G2 = plans2.some((p) => p.has5G);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/operaattorit"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" /> Kaikki operaattorit
        </Link>

        <h1 className="mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {op1.name} vs {op2.name}
        </h1>
        <p className="mb-10 max-w-3xl text-lg text-slate-600">
          Kattava vertailu: {op1.name} vastaan {op2.name}. Kumpi tarjoaa paremmat liittymät,
          hinnat ja verkon? Selvitä, kumpi sopii sinulle.
        </p>

        {/* Quick comparison table */}
        <div className="mb-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ominaisuus</th>
                <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: op1.color }}>{op1.name}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: op2.color }}>{op2.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-6 py-3 text-sm font-medium text-slate-700">Tyyppi</td>
                <td className="px-6 py-3 text-center text-sm">{op1.type === 'MNO' ? 'Verkko-operaattori' : 'MVNO'}</td>
                <td className="px-6 py-3 text-center text-sm">{op2.type === 'MNO' ? 'Verkko-operaattori' : 'MVNO'}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm font-medium text-slate-700">Perustettu</td>
                <td className="px-6 py-3 text-center text-sm">{op1.founded}</td>
                <td className="px-6 py-3 text-center text-sm">{op2.founded}</td>
              </tr>
              {(op1.marketShare || op2.marketShare) && (
                <tr>
                  <td className="px-6 py-3 text-sm font-medium text-slate-700">Markkinaosuus</td>
                  <td className="px-6 py-3 text-center text-sm">{op1.marketShare ? `~${op1.marketShare} %` : '—'}</td>
                  <td className="px-6 py-3 text-center text-sm">{op2.marketShare ? `~${op2.marketShare} %` : '—'}</td>
                </tr>
              )}
              <tr>
                <td className="px-6 py-3 text-sm font-medium text-slate-700">Liittymien määrä</td>
                <td className="px-6 py-3 text-center text-sm">{plans1.length}</td>
                <td className="px-6 py-3 text-center text-sm">{plans2.length}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm font-medium text-slate-700">Halvin liittymä</td>
                <td className="px-6 py-3 text-center text-sm font-semibold">{cheapest1.toFixed(2).replace('.', ',')} €/kk</td>
                <td className="px-6 py-3 text-center text-sm font-semibold">{cheapest2.toFixed(2).replace('.', ',')} €/kk</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-sm font-medium text-slate-700">5G-liittymiä</td>
                <td className="px-6 py-3 text-center">
                  {has5G1 ? <Check className="mx-auto h-5 w-5 text-emerald-500" /> : <X className="mx-auto h-5 w-5 text-slate-300" />}
                </td>
                <td className="px-6 py-3 text-center">
                  {has5G2 ? <Check className="mx-auto h-5 w-5 text-emerald-500" /> : <X className="mx-auto h-5 w-5 text-slate-300" />}
                </td>
              </tr>
              {(op1.network || op2.network) && (
                <tr>
                  <td className="px-6 py-3 text-sm font-medium text-slate-700">Verkko</td>
                  <td className="px-6 py-3 text-center text-sm">{op1.network ? `${op1.network}:n verkko` : 'Oma verkko'}</td>
                  <td className="px-6 py-3 text-center text-sm">{op2.network ? `${op2.network}:n verkko` : 'Oma verkko'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Operator 1 plans */}
        <h2 className="mb-6 text-2xl font-bold text-slate-900">{op1.name} — liittymät</h2>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans1.map((plan) => (
            <MobilePlanCard key={plan.id} plan={plan} showOperator={false} />
          ))}
        </div>

        {/* Operator 2 plans */}
        <h2 className="mb-6 text-2xl font-bold text-slate-900">{op2.name} — liittymät</h2>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans2.map((plan) => (
            <MobilePlanCard key={plan.id} plan={plan} showOperator={false} />
          ))}
        </div>

        {/* Conclusion */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2>Yhteenveto: {op1.name} vs {op2.name}</h2>
            {(() => {
              const cheaper = cheapest1 < cheapest2 ? op1 : cheapest2 < cheapest1 ? op2 : null;
              const pricier = cheaper === op1 ? op2 : cheaper === op2 ? op1 : null;
              const isMvno1 = op1.type === 'MVNO';
              const isMvno2 = op2.type === 'MVNO';

              const points: string[] = [];

              if (cheaper && pricier) {
                points.push(`Halvimmalla hinnalla mitattuna ${cheaper.name} (${Math.min(cheapest1, cheapest2).toFixed(2).replace('.', ',')} €/kk) on edullisempi kuin ${pricier.name} (${Math.max(cheapest1, cheapest2).toFixed(2).replace('.', ',')} €/kk).`);
              } else {
                points.push(`Molemmat operaattorit tarjoavat liittymiä samasta lähtöhinnasta (${cheapest1.toFixed(2).replace('.', ',')} €/kk).`);
              }

              if (has5G1 && !has5G2) {
                points.push(`${op1.name} tarjoaa 5G-liittymiä, kun taas ${op2.name}n valikoimasta 5G puuttuu.`);
              } else if (!has5G1 && has5G2) {
                points.push(`${op2.name} tarjoaa 5G-liittymiä, kun taas ${op1.name}n valikoimasta 5G puuttuu.`);
              } else if (has5G1 && has5G2) {
                points.push('Molemmat tarjoavat 5G-liittymiä.');
              }

              if (isMvno1 && !isMvno2) {
                points.push(`${op1.name} on virtuaalioperaattori (MVNO), joka käyttää ${op1.network}:n verkkoa. ${op2.name} on verkko-operaattori (MNO) omalla verkollaan.`);
              } else if (!isMvno1 && isMvno2) {
                points.push(`${op2.name} on virtuaalioperaattori (MVNO), joka käyttää ${op2.network}:n verkkoa. ${op1.name} on verkko-operaattori (MNO) omalla verkollaan.`);
              } else if (isMvno1 && isMvno2) {
                points.push(`Molemmat ovat virtuaalioperaattoreita (MVNO): ${op1.name} käyttää ${op1.network}:n verkkoa ja ${op2.name} käyttää ${op2.network}:n verkkoa.`);
              }

              if (cheaper && isMvno1 !== isMvno2) {
                const mvno = isMvno1 ? op1 : op2;
                const mno = isMvno1 ? op2 : op1;
                points.push(`Jos haluat edullisimman liittymän, ${mvno.name} on todennäköisesti parempi valinta. ${mno.name} tarjoaa kuitenkin oman verkon ja laajemman palveluvalikoiman.`);
              }

              return (
                <>
                  {points.map((point, i) => (
                    <p key={i}>{point}</p>
                  ))}
                </>
              );
            })()}
            <p>
              Vertaa tarkemmin{' '}
              <Link href="/vertaa" className="text-cyan-600 hover:text-cyan-700">
                vertailutyökalullamme
              </Link>{' '}
              ja löydä juuri sinulle sopiva liittymä.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
