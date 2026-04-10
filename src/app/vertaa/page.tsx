import type { Metadata } from 'next';
import ComparisonTool from '@/components/comparison/ComparisonTool';

export const metadata: Metadata = {
  title: 'Vertaa liittymiä rinnakkain',
  description:
    'Vertaa puhelinliittymiä rinnakkain. Valitse 2–3 liittymää ja näe erot hinnassa, datassa, nopeudessa ja ominaisuuksissa.',
  alternates: { canonical: '/vertaa' },
};

export default function VertaaPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Vertaa liittymiä rinnakkain
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Valitse 2–3 puhelinliittymää ja vertaa niitä rinnakkain.
            Näe erot hinnassa, datamäärässä, nopeudessa ja muissa ominaisuuksissa.
          </p>
        </div>

        <ComparisonTool />
      </div>
    </div>
  );
}
