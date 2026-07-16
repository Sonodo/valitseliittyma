import { mobilePlans } from '@/data/mobile-plans';
import { broadbandPlans } from '@/data/broadband-plans';
import { operators } from '@/data/operators';
import { DATA_REVIEWED_AT, SITE_URL } from '@/lib/constants';

export async function GET() {
  const content = `# Valitse Liittymä

> Finnish mobile and broadband subscription comparison. Independent, editorial
> comparison of ${mobilePlans.length} mobile plans and ${broadbandPlans.length} home-internet plans from
> ${operators.length} Finnish operators. Plans are listed at normal list prices (perushinta);
> current operator campaign prices are shown separately. Prices verified ${DATA_REVIEWED_AT}.

## Key pages

- ${SITE_URL}/puhelinliittymat: All mobile plans, filterable (price, data, operator, 5G)
- ${SITE_URL}/laajakaista: Home internet plans (5G home internet + fiber with national pricing)
- ${SITE_URL}/halvin-puhelinliittyma: Cheapest mobile plans
- ${SITE_URL}/paras-5g-liittyma: Best 5G plans
- ${SITE_URL}/paras-laajakaista: Best home broadband
- ${SITE_URL}/operaattorit: Operator directory (${operators.length} operators)
- ${SITE_URL}/menetelma: Methodology — how rankings work (price-first, no weighted composite score)
- ${SITE_URL}/sivuston-ansainta: How the site earns money (affiliate disclosure)

## Editorial principles

- Ordering is always by an objective metric (default: normal monthly price, cheapest first) — never by commercial partnership.
- Both normal and campaign prices are shown; ordering uses the normal price.
- Independent measurement data (Speedtest, Traficom) is displayed as context and never affects ordering.
- Only plans whose prices can be verified from public sources are listed.
- Operated by Sonodo (Finnish sole trader). Some outbound operator links are affiliate links (rel="sponsored").

## Contact

Website: ${SITE_URL}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
