# Valitse Liittymä (valitseliittyma.fi) — Status

**Project**: Valitse Liittymä — Finnish mobile subscription comparison (formerly Puhelinvertailu → Valitse Puhelin → Valitse Liittymä)
**Status**: LIVE — full product source lives in this folder
**Health**: GREEN
**Domain**: valitseliittyma.fi (Valitse Liittymä brand)
**GA4**: G-Q3MR58J1E7
**Clarity**: w9nc8umkc7
**Last Updated**: 2026-07-05 (claim-integrity fixes — media defensibility)

## Current State — LIVE

- **Custom domain**: valitseliittyma.fi (Valitse Liittymä brand)
- **GA4**: G-Q3MR58J1E7 active
- **Clarity**: w9nc8umkc7 active
- **GSC**: Verification tag added
- **Cross-links**: Links to other Valitse sites maintained in `src/lib/constants.ts`
- ~56 pages, 8 operators (Elisa, DNA, Telia, Moi, Giga Mobiili, Oomi, Globetel, Valoo), 28 mobile + 20 broadband plans, 12 operator-vs pages, 3+ blog articles, 3 guides, 2 calculators, 10 city pages
- Next.js 16 + TypeScript + Tailwind CSS v4

## Recent Changes

### 2026-07-05 — Claim-integrity fixes (media defensibility)
- **Freshness overclaims killed**: "Tarkistamme liittymätiedot viikoittain" / "Viikoittain päivitetty" / "Aina ajan tasalla" (homepage ×4), "päivitämme liittymätiedot kuukausittain" (FAQ + FAQPage JSON-LD), "vähintään kerran kuukaudessa" (/tietoa) and the fabricated "hinnat päivittyvät automaattisesti kumppanin järjestelmästä useamman kerran viikossa" (/sivuston-ansainta) — data is hardcoded static TS with no update process; none of these were true.
- **Replaced with dated truth**: new `DATA_REVIEWED_AT = '20.4.2026'` in `src/lib/constants.ts` (git evidence: last substantive plan-data commits are `3d4fa94` 2026-04-14 mobile-plans and `f306c10` 2026-04-20 broadband-plans; the 2026-06-04 commit touched only benchmarks/disclosure). Stamp rendered on homepage (hero metric + trust bar + value prop), /puhelinliittymat, /laajakaista, /menetelma summary, /tietoa and /sivuston-ansainta. **Update the constant whenever plan data is reviewed.**
- **Coverage overclaims killed**: "Kaikki operaattorit" (homepage ×3, nav), "kaikilta 7 operaattorilta" (hero — count was also wrong), "Vertaa kaikkia (puhelin)liittymiä Suomessa" (listing metadata/OG, blogi/opas/kaupunki CTAs), "kaikki Suomen merkittävät operaattorit" (/sivuston-ansainta) → truthful "Suomen merkittävimmät operaattorit" / real counts ("8 operaattoria, 48 liittymää"). Hero "+"-suffixes dropped (8 and 48 are exact). Scoped filter/back-link labels rephrased so `grep "aikki operaattorit"` stays at 0.
- **Stale caveat removed**: the Session #087 "redirect shell / Sonodo/liittyma-deploy divergence" caveat is obsolete — this folder is the canonical source, pushes to `Sonodo/valitseliittyma`, and live production serves current repo data (verified in 2026-07-05 site review).
- Benchmark layer (Speedtest H1/2025 + Traficom 10/2025, verified 2026-06-04) untouched — it was already honest and dated.

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

1. **Monthly data-refresh routine** — check all 48 plans against operator sites once a month, bump `DATA_REVIEWED_AT` in `src/lib/constants.ts`; once the cadence has actually held for 2-3 cycles, the site may claim it
2. **Verify remaining operator data accuracy** — Elisa, DNA, Telia plans (pairs with refresh routine)
3. **Wire Elisa + DNA affiliate programs** — verify Adtraction availability first (see SITE_REVIEW_2026-07-05.md §B note)
4. **Submit sitemap to Google Search Console** — accelerate indexing
5. **Apply for AdSense** — organic traffic monetization
6. **Post-launch SEO monitoring** — Track keyword rankings

## Blockers

- None
