# Valitse Liittymä (valitseliittyma.fi) — Status

**Project**: Valitse Liittymä — Finnish mobile subscription comparison (formerly Puhelinvertailu → Valitse Puhelin → Valitse Liittymä)
**Status**: LIVE — full product source lives in this folder
**Health**: GREEN
**Domain**: valitseliittyma.fi (Valitse Liittymä brand)
**GA4**: G-Q3MR58J1E7
**Clarity**: w9nc8umkc7
**Last Updated**: Session #088 — 2026-04-14 (audit fix sweep)

## Current State — LIVE

- **Custom domain**: valitseliittyma.fi (Valitse Liittymä brand)
- **GA4**: G-Q3MR58J1E7 active
- **Clarity**: w9nc8umkc7 active
- **GSC**: Verification tag added
- **Cross-links**: Links to other Valitse sites maintained in `src/lib/constants.ts`
- ~56 pages, 7 operators (Elisa, DNA, Telia, Moi, Giga Mobiili, Oomi, Globetel), 30 mobile + 20 broadband plans, 12 operator-vs pages, 3+ blog articles, 3 guides, 2 calculators, 10 city pages
- Next.js 16 + TypeScript + Tailwind CSS v4

## KNOWN CAVEAT — Deploy repo divergence

- A previous session (#087) marked this folder as a 308 redirect shell and moved the live
  product to `Sonodo/liittyma-deploy`. Subsequent work has re-hydrated the product source
  in this folder without mirroring changes to the deploy repo. Any fix applied here must
  also be mirrored in `Sonodo/liittyma-deploy` before it reaches production, OR the
  `next.config.ts` redirect block here must be removed and this folder re-deployed as the
  canonical source.
- **Decision pending Chairman direction**: consolidate to a single source of truth
  (recommended: this folder) and retire the standalone deploy repo.
- Until that decision lands, STATUS assumes the empire source-of-truth is this folder
  and any audit fixes should be re-applied to the deploy repo manually.

## Recent Changes

### Session #088 — Audit Fix Sweep (2026-04-14)
- **Full quality audit applied** (`_EMPIRE_HQ/AUDITS/2026-04-14-empire-quality-audit/valitseliittyma.md`)
- **SITE_NAME**: `Liittymävertailu` → `Valitse Liittymä` — fixes brand across titles, OG, JSON-LD
- **Auth stack removed**: Google OAuth / UserMenu / Neon DB integration deleted entirely (vestigial on static comparison site)
- **Dependencies cleaned**: dropped `@neondatabase/serverless` and `jose` from `package.json`
- **Superlative pages**: KKV-compliant MethodologyBox added to `/halvin-puhelinliittyma`, `/paras-5g-liittyma`, `/paras-laajakaista`
- **SubscriptionCalculator**: data-tier selector + 5-plan average benchmark replaces single-plan anchor
- **DataCalculator**: HD streaming uplifted from 1 GB/h → 3 GB/h (2026 realistic); recommendation floor raised
- **Yhteystiedot page created**: broken `/yhteystiedot` links on About and Privacy now resolve
- **Finnish fixes**: `pidätetaan` → `pidätetään`, `Valitse Puhelimen blogi` → `Valitse Liittymän blogi`, `parantaaksemme palvelua` → `parantaaksemme palveluamme`
- **Telia Rajaton 4G 10/50 Gt**: renamed to `Telia Mobiili 4G …` (rajaton + capped data was a semantic contradiction)
- **PlanCard**: `rel="sponsored"` added to outbound affiliate links (Google link spam compliance); inline "mainoslinkki" disclosure
- **MobilePlanFilters**: price-asc sort now sorts data-less plans to the bottom; Infinity replaces `99999` magic number
- **Footer**: Globetel added to operator list
- **Cookie consent**: re-opener added (footer "Muuta evästeasetuksia" link) for GDPR withdrawal-of-consent
- **ComparisonTool**: React anti-pattern fixed (uncontrolled select via ref/useState)
- **Operator genitive**: special-case helper prevents `DNAn` → outputs `DNA:n`

### Session #087 — Retired to Redirect Shell (2026-04-12) — **SUPERSEDED**
- Previously marked RETIRED as standalone site (see caveat above)
- `next.config.ts` redirect block still present but product source has been re-hydrated in this folder

### Session #083 — Rebrand to Valitse Liittymä (2026-04-10)
- **Rebranded**: valitsepuhelin.fi → valitseliittyma.fi, "Valitse Puhelin" → "Valitse Liittymä"
- **New Vercel project**: liittyma-deploy created, deployed
- **New deploy repo**: Sonodo/liittyma-deploy
- **Microsoft Clarity**: w9nc8umkc7 added with GDPR ConsentV2

### Session #080 — Compliance Audit (2026-04-07)
- **Cookie consent added**: GDPR-compliant cookie banner implemented
- **False claims fixed**: Removed misleading or inaccurate marketing claims
- **Guides page added**: New /oppaat guides section

### Session #079 — Live Deployment + MVNO Data Rewrite (2026-04-07)
- **LIVE at valitsepuhelin.fi**: Custom domain configured (later rebranded to valitseliittyma.fi)
- **GA4 G-Q3MR58J1E7 active**: Tracking confirmed
- **Major data rewrite**: 4 MVNO operators (Moi, Giga Mobiili, Oomi, Globetel) rewritten with real 2025-2026 plan data

### Session #075 — MVP Complete (2026-04-01)
- Complete telecom comparison MVP built — 56 pages, build clean

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- Static data layer (MVP, no database)
- Deploy: Vercel

## Next Steps

1. **Resolve deploy-repo divergence** — consolidate to a single canonical source
2. **Mirror Session #088 fixes to deploy repo** (or retire deploy repo)
3. **Submit sitemap to Google Search Console** — accelerate indexing
4. **Apply for AdSense** — organic traffic monetization
5. **Apply for Adtraction programs (5 unwired operators)** — Elisa/Saunalahti, DNA, Giga Mobiili, Oomi Mobiili, Globetel. Once approved, paste the tracking URL into `src/data/operators.ts` (see top-of-file note); two-line edit per operator, no code changes needed. Currently wired: Telia, Moi, Valoo.
6. **Post-launch SEO monitoring** — Track keyword rankings
7. **Verify remaining operator data accuracy** — Elisa, DNA, Telia plans

## Blockers

- Deploy-repo divergence (see caveat) — low urgency operationally, high urgency for correctness
