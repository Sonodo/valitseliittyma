import type { Metadata } from 'next';
import SubscriptionCalculator from './SubscriptionCalculator';

export const metadata: Metadata = {
  title: 'Liittymälaskuri — Laske liittymäsi todellinen hinta',
  description:
    'Laske puhelinliittymäsi todellinen vuosikustannus. Vertaa nykyistä liittymääsi edullisempiin vaihtoehtoihin ja selvitä, paljonko voit säästää.',
  alternates: { canonical: '/laskuri/liittymahinta' },
};

export default function LiittymaLaskuriPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Liittymälaskuri
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Laske, paljonko puhelinliittymäsi todella maksaa vuodessa, ja selvitä, paljonko
          voisit säästää vaihtamalla edullisempaan.
        </p>
        <div className="mt-10">
          <SubscriptionCalculator />
        </div>
      </div>
    </div>
  );
}
