import type { Metadata } from 'next';
import { operators } from '@/data/operators';
import { mobilePlans, getCheapestPlans } from '@/data/mobile-plans';
import { getLatestPosts } from '@/data/blog-posts';
import { cities } from '@/data/cities';
import { faqPageSchema } from '@/lib/schema';
import { HOMEPAGE_FAQ } from './faq-data';
import HomeContent from './home-content';

export const metadata: Metadata = {
  title: 'Valitse Liittymä — Vertaa puhelinliittymiä ja laajakaistoja Suomessa',
  description:
    'Vertaa puhelinliittymiä ja laajakaistoja Suomessa. Löydä halvin liittymä Elisan, DNA:n, Telian ja budjettioperaattoreiden valikoimista. Ilmainen ja kattava vertailu.',
  openGraph: {
    title: 'Valitse Liittymä — Vertaa puhelinliittymiä ja löydä halvin liittymä',
    description:
      'Vertaa puhelinliittymiä ja laajakaistoja. Löydä halvin liittymä. Ilmainen ja kattava.',
    url: '/',
    type: 'website',
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const cheapPlans = getCheapestPlans(3);
  const latestPosts = getLatestPosts(3);
  const totalPlans = mobilePlans.length;

  const faqLd = faqPageSchema(HOMEPAGE_FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomeContent
        cheapPlans={cheapPlans}
        latestPosts={latestPosts}
        operatorCount={operators.length}
        totalPlans={totalPlans}
        cityCount={cities.length}
        operators={operators.map((op) => ({
          id: op.id,
          name: op.name,
          slug: op.slug,
          color: op.color,
          type: op.type,
        }))}
      />
    </>
  );
}
