import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Signal } from 'lucide-react';
import { operators } from '@/data/operators';
import { mobilePlans } from '@/data/mobile-plans';

export const metadata: Metadata = {
  title: 'Operaattorit Suomessa — Kaikki matkapuhelinoperaattorit',
  description:
    'Kaikki Suomessa toimivat matkapuhelinoperaattorit: Elisa, DNA, Telia, Moi Mobiili, Giga Mobiili, Oomi ja Globetel. Vertaile operaattoreita ja niiden liittymiä.',
  alternates: { canonical: '/operaattorit' },
};

export default function OperaattoritPage() {
  const mnos = operators.filter((o) => o.type === 'MNO');
  const mvnos = operators.filter((o) => o.type === 'MVNO');

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Operaattorit Suomessa
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Suomessa toimii kolme suurta verkko-operaattoria ja useita budjettioperaattoreita (MVNO).
            Tutki operaattoreita ja niiden liittymiä.
          </p>
        </div>

        {/* MNOs */}
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          <Signal className="mr-2 inline h-6 w-6 text-cyan-600" />
          Verkko-operaattorit (MNO)
        </h2>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {mnos.map((op) => {
            const planCount = mobilePlans.filter((p) => p.operatorId === op.id).length;
            return (
              <Link
                key={op.id}
                href={`/operaattorit/${op.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold"
                    style={{ backgroundColor: op.color }}
                  >
                    {op.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700">{op.name}</h3>
                    {op.marketShare && (
                      <span className="text-sm text-slate-500">~{op.marketShare} % markkinaosuus</span>
                    )}
                  </div>
                </div>
                <p className="mb-4 line-clamp-3 text-sm text-slate-600">{op.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">{planCount} liittymää</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700">
                    Katso <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* MVNOs */}
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          <Globe className="mr-2 inline h-6 w-6 text-violet-500" />
          Budjettioperaattorit (MVNO)
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mvnos.map((op) => {
            const planCount = mobilePlans.filter((p) => p.operatorId === op.id).length;
            return (
              <Link
                key={op.id}
                href={`/operaattorit/${op.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold"
                  style={{ backgroundColor: op.color }}
                >
                  {op.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700">{op.name}</h3>
                {op.network && (
                  <span className="text-xs text-slate-500">{op.network}:n verkko</span>
                )}
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{op.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">{planCount} liittymää</span>
                  <ArrowRight className="h-4 w-4 text-cyan-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
