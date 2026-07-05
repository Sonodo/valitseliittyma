# Valitse Liittymä — Site Review 2026-07-05
*Osa Valitse Group -strategiakatselmusta (ks. `_PROJECTS/valitse-group/STRATEGIC_REVIEW_2026-07-05.md`). Read-only-katselmus: koodi + live-sivusto. Agenttiraportti verbatim alla. Hub-osuus: `_PROJECTS/valitse/SITE_REVIEW_2026-07-05.md`.*

---

## LAKIMAATTI ISOLATION CHECK — CLEAN
Zero references anywhere (`src/`, config, markdown).

**Inventory**: 8 operators (`src/data/operators.ts`), 28 mobile + 20 broadband plans (`mobile-plans.ts`, `broadband-plans.ts`), operator pages, 10 city pages, 12 operator-vs pages, 2 calculators, guides (5G / numeron-siirto / vaihto), sanasto, blog, methodology. Data is **100% hardcoded static TypeScript — no automation, no feed, no scrape.** Live = repo (STATUS.md "redirect shell" caveat is stale; production serves current data). GA4 `G-Q3MR58J1E7` + Clarity `w9nc8umkc7` both live.

## A) Scorecard (1-10)

| Dimension | Score | One-line justification |
|---|---|---|
| Data correctness & freshness | **6** | Prices plausible + internally consistent for 2026; benchmark layer genuinely well-sourced (Speedtest H1 2025 + Traficom 10/2025, verified 2026-06-04) — but data is static and the site claims "weekly updated," which is untrue. |
| Content depth/quality | **7** | Broad and real: 48 plans, operator/city/vs pages, 2 calculators, guides, glossary, methodology. |
| UX & conversion path | **7** | Clean plan cards, benchmark badges, correct `rel="sponsored nofollow"` + inline "mainoslinkki" disclosure on paid CTAs. |
| Monetization readiness | **4** | Adtraction wired for only 3 of 8 operators; the two market leaders (69% of the market) earn nothing. |
| SEO / technical | **7** | Next 16 static, sitemap/robots, Service+FAQ+breadcrumb schema, sound IA, dated methodology. |
| Overall user value vs best FI competitor | **6** | Benchmark badges beat most FI comparison sites incl. puhelinliittymat.net; undercut by the false "kaikki operaattorit" claim. |

## B) What actually earns money today (evidence)
- **Affiliate rails live for 3 operators only**, via Adtraction (`src/data/operators.ts`): **Telia** `go.adt291.com` (line 81), **Moi** `in.moi.fi` (line 108), **Valoo** `go.adt246.net` (line 204). Rendering confirmed in `src/components/ui/PlanCard.tsx` (lines 28-35) and live.
- **Elisa (38% share), DNA (31%), Giga, Oomi, Globetel earn €0** — CTAs point to operator's own site. **~69% of the Finnish market monetized at zero.** *(HUOM CEO: agentti väittää Elisa+DNA-ohjelmien olevan Adtractionissa — toukokuun 2026 Phase-2-tutkimus totesi päinvastaista (walled gardens). VERIFIOI Adtraction-paneelista ennen toimenpiteitä.)*
- **No AdSense** (`ca-pub` absent). GA4 fires `affiliate_click` with `partner` flag (`src/lib/analytics.ts`).
- **Realized revenue ≈ €0** because traffic is ≈0, but the rails work for 3 partners.

## C) Top elevation moves (user-value × revenue × effort)
1. **Wire Elisa + DNA affiliate programs (Adtraction) — S.** Highest revenue lever in the property IF the programs exist (verify — see note above). Code already supports it (add `isAffiliate`/`affiliateUrl` to two records in `operators.ts`).
2. **Make freshness true, then claim it — S→M.** Per-plan `lastChecked` date + monthly review cadence; replace the "weekly" language (see E).
3. **Fix coverage gap — M.** Add the real missing operators or stop saying "kaikki operaattorit." More operators = more affiliate surface.
4. **Address-level 5G/fibre availability lookup — L.** Genuine differentiator; pairs with existing Traficom Bittimittari sourcing.
5. **Semi-automate data ingestion — L.** Removes rot risk permanently.

## D) Quick wins (<1 day each)
1. "Kaikki operaattorit" → "Suomen merkittävimmät operaattorit" (`src/app/home-content.tsx:82, 322`; `src/lib/constants.ts:43`).
2. Replace freshness overclaims (`home-content.tsx:72-73, 225, 251, 555`) with a dated "Hinnat tarkistettu {date}" stamp.
3. Land Elisa + DNA `affiliateUrl` additions in `operators.ts` the moment programs are approved (trivial change).

## E) Claims we could NOT proudly defend (file paths)
- **"Tarkistamme liittymätiedot viikoittain" / "Viikoittain päivitetty" / "Aina ajan tasalla"** — `src/app/home-content.tsx:72-73, 225, 251, 555`. Data is static hardcoded TS; no weekly process exists. Confirmed live on homepage. **#1 defensibility risk.**
- **"Kaikki operaattorit"** — `home-content.tsx:82, 322`; `constants.ts:43`. Only 8 operators; several real FI players missing.
- **Per-plan prices unverified** (`STATUS.md` next-step #7). Plausible, not source-stamped per plan.

## F) Verdict — MAINTAIN (leaning INVEST-lite)
The stronger of the two reviewed properties and closest to genuinely earning. Real content, working affiliate rails, and a data-quality differentiator (independent Speedtest/Traficom badges) most Finnish competitors lack. Throttled by two fixable things: ~69% of the market unmonetized (Elisa/DNA — availability to verify), and a freshness claim it cannot back. Fix those and it becomes a defensible, revenue-capable asset — worth light investment, not subtraction.
