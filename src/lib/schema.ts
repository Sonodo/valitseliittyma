/**
 * AEO / Schema.org helpers for Valitse Liittymä.
 *
 * Generates structured data (JSON-LD) for telecom plans (mobile + broadband)
 * so AI assistants and search engines can read provider, price, data caps,
 * speed and contract terms reliably.
 */

import type { MobilePlan, BroadbandPlan, Operator } from '@/types';
import { getOperatorById } from '@/data/operators';
import { SITE_URL, SITE_NAME } from './constants';

type SchemaObject = Record<string, unknown>;

/* ── Operator → Provider (Organization) ──────────────────────────── */

function operatorToProvider(operator: Operator): SchemaObject {
  return {
    '@type': 'Organization',
    name: operator.name,
    url: operator.website,
    ...(operator.brand ? { brand: operator.brand } : {}),
  };
}

/* ── Mobile plan → Service ───────────────────────────────────────── */

export function mobilePlanToServiceSchema(plan: MobilePlan): SchemaObject | null {
  const operator = getOperatorById(plan.operatorId);
  if (!operator) return null;

  const dataLabel =
    plan.dataAmount === 'unlimited'
      ? 'Rajaton data'
      : `${plan.dataAmount} Gt / kk`;

  const contractLabel =
    plan.contractType === '24-month' ? 'Sopimusaika 24 kk' : 'Toistaiseksi voimassa';

  const additionalProperty: SchemaObject[] = [
    {
      '@type': 'PropertyValue',
      name: 'Datamäärä',
      value: dataLabel,
    },
    {
      '@type': 'PropertyValue',
      name: 'Verkkotekniikka',
      value: plan.has5G ? '5G' : '4G LTE',
    },
    {
      '@type': 'PropertyValue',
      name: 'Maksiminopeus',
      value: `${plan.maxSpeed} Mbit/s`,
      unitCode: 'E20', // Megabit per second (UN/CEFACT)
    },
    {
      '@type': 'PropertyValue',
      name: 'Sopimusaika',
      value: contractLabel,
    },
    {
      '@type': 'PropertyValue',
      name: 'Puhelut Suomeen',
      value: plan.callsIncluded,
    },
    {
      '@type': 'PropertyValue',
      name: 'EU-roaming-data',
      value: `${plan.euRoamingData} Gt / kk`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobiililiittymä',
    name: plan.name,
    description: `${operator.name} ${plan.name} — ${dataLabel}, ${plan.has5G ? '5G' : '4G LTE'}, ${contractLabel}.`,
    category: 'Telecommunications',
    provider: operatorToProvider(operator),
    areaServed: {
      '@type': 'Country',
      name: 'Finland',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Consumer',
    },
    additionalProperty,
    offers: {
      '@type': 'Offer',
      price: plan.monthlyPrice.toFixed(2),
      priceCurrency: 'EUR',
      url: plan.url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.monthlyPrice.toFixed(2),
        priceCurrency: 'EUR',
        unitText: 'MONTH',
        billingDuration: 'P1M',
      },
    },
  };
}

/* ── Broadband plan → Service ────────────────────────────────────── */

export function broadbandPlanToServiceSchema(plan: BroadbandPlan): SchemaObject | null {
  const operator = getOperatorById(plan.operatorId);
  if (!operator) return null;

  const techLabel =
    plan.technology === 'fiber'
      ? 'Valokuitu'
      : plan.technology === '5G'
        ? '5G-kotinetti'
        : '4G-kotinetti';

  const contractLabel =
    plan.contractType === '24-month' ? 'Sopimusaika 24 kk' : 'Toistaiseksi voimassa';

  const additionalProperty: SchemaObject[] = [
    {
      '@type': 'PropertyValue',
      name: 'Liittymätyyppi',
      value: techLabel,
    },
    {
      '@type': 'PropertyValue',
      name: 'Latausnopeus',
      value: `${plan.downloadSpeed} Mbit/s`,
      unitCode: 'E20',
    },
    {
      '@type': 'PropertyValue',
      name: 'Lähetysnopeus',
      value: `${plan.uploadSpeed} Mbit/s`,
      unitCode: 'E20',
    },
    {
      '@type': 'PropertyValue',
      name: 'Datamäärä',
      value: 'Rajaton',
    },
    {
      '@type': 'PropertyValue',
      name: 'Sopimusaika',
      value: contractLabel,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Laajakaista',
    name: plan.name,
    description: `${operator.name} ${plan.name} — ${techLabel}, ${plan.downloadSpeed} Mbit/s lataus, ${contractLabel}.`,
    category: 'Telecommunications',
    provider: operatorToProvider(operator),
    areaServed: {
      '@type': 'Country',
      name: 'Finland',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Consumer',
    },
    additionalProperty,
    offers: {
      '@type': 'Offer',
      price: plan.monthlyPrice.toFixed(2),
      priceCurrency: 'EUR',
      url: plan.url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.monthlyPrice.toFixed(2),
        priceCurrency: 'EUR',
        unitText: 'MONTH',
        billingDuration: 'P1M',
      },
    },
  };
}

/* ── ItemList wrapper for plan listing pages ─────────────────────── */

export function plansToItemListSchema(
  plans: Array<MobilePlan | BroadbandPlan>,
  pageUrl: string,
  pageName: string,
): SchemaObject {
  const itemListElement = plans
    .map((plan, index) => {
      const service =
        plan.category === 'mobile'
          ? mobilePlanToServiceSchema(plan as MobilePlan)
          : broadbandPlanToServiceSchema(plan as BroadbandPlan);
      if (!service) return null;
      // Strip context from inner items — only the wrapper holds @context
      const { ['@context']: _ctx, ...rest } = service;
      void _ctx;
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: rest,
      };
    })
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageName,
    url: pageUrl,
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}

/* ── BreadcrumbList helper ───────────────────────────────────────── */

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/* ── Publisher Organization (Sonodo / Valitse Liittymä) ──────────── */

export const PUBLISHER_ORGANIZATION_SCHEMA: SchemaObject = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'Sonodo',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  legalName: 'Sonodo',
  taxID: '2887416-4',
  vatID: 'FI28874164',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'FI Y-tunnus',
    value: '2887416-4',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Finland',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@valitseliittyma.fi',
    availableLanguage: 'Finnish',
  },
};

/* ── FAQ Page helper ─────────────────────────────────────────────── */

export function faqPageSchema(
  qas: Array<{ q: string; a: string }>,
): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
