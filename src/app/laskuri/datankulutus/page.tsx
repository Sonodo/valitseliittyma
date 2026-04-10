import type { Metadata } from 'next';
import DataCalculator from './DataCalculator';

export const metadata: Metadata = {
  title: 'Datankulutuslaskuri — Paljonko dataa tarvitset?',
  description:
    'Laske, paljonko mobiilidataa tarvitset kuukaudessa. Arvioi käyttösi ja selvitä, riittääkö 5, 10, 50 Gt vai tarvitsetko rajattoman datan.',
  alternates: { canonical: '/laskuri/datankulutus' },
};

export default function DatanKulutusPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Datankulutuslaskuri
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Arvioi, paljonko mobiilidataa tarvitset kuukaudessa. Syötä käyttötottumuksesi
          ja saat suosituksen sopivasta datamäärästä.
        </p>
        <div className="mt-10">
          <DataCalculator />
        </div>
      </div>
    </div>
  );
}
