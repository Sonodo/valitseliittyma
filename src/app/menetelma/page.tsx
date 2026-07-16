import type { Metadata } from 'next';
import MethodologyPage from '@/components/methodology/MethodologyPage';
import config from '@/content/methodology.config';

export const metadata: Metadata = {
  title: 'Menetelmä — Miten teemme rankingit',
  description:
    'Avoin kuvaus vertailumme datalähteistä, arviointikriteereistä ja kaupallisista suhteista.',
  alternates: { canonical: `${config.siteUrl}/menetelma` },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Etusivu',
      item: config.siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Menetelmä',
      item: `${config.siteUrl}/menetelma`,
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Miten teemme rankingit',
  description:
    'Avoin kuvaus vertailumme datalähteistä, arviointikriteereistä ja kaupallisista suhteista.',
  author: { '@type': 'Organization', name: config.siteName },
  publisher: { '@type': 'Organization', name: config.siteName, url: config.siteUrl },
  mainEntityOfPage: `${config.siteUrl}/menetelma`,
  ...(config.lastReviewedAt && { dateModified: config.lastReviewedAt }),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <MethodologyPage config={config} />
    </>
  );
}
