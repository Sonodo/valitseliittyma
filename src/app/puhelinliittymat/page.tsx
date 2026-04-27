import type { Metadata } from 'next';
import { mobilePlans } from '@/data/mobile-plans';
import MobilePlanFilters from '@/components/plans/MobilePlanFilters';
import { plansToItemListSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Puhelinliittymät — Vertaa kaikkia liittymiä Suomessa',
  description:
    'Vertaa kaikkia puhelinliittymiä Suomessa. Suodata hinnan, datan, operaattorin ja 5G:n mukaan. Löydä halvin liittymä.',
  openGraph: {
    title: 'Puhelinliittymät — Vertaa kaikkia liittymiä Suomessa',
    description: 'Vertaa kaikkia puhelinliittymiä ja löydä halvin. Suodata ja lajittele.',
  },
  alternates: { canonical: '/puhelinliittymat' },
};

export default function PuhelinliittymatPage() {
  const itemListLd = plansToItemListSchema(
    mobilePlans,
    `${SITE_URL}/puhelinliittymat`,
    'Puhelinliittymät — Valitse Liittymä',
  );

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Puhelinliittymät', url: '/puhelinliittymat' },
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
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Puhelinliittymät
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Vertaa {mobilePlans.length} puhelinliittymää Suomen kaikilta operaattoreilta.
            Suodata hinnan, datamäärän, operaattorin ja verkkotyypin mukaan.
          </p>
        </div>

        <MobilePlanFilters plans={mobilePlans} />
      </div>
    </div>
  );
}
