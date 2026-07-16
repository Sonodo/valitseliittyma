#!/usr/bin/env node
/**
 * Weekly data-freshness & drift check (runs in GitHub Actions, Mondays).
 *
 * Guards:
 *  1. PINNED SOURCE STRINGS — normal-price strings verified from operator
 *     pages at the last manual review (2026-07-16). A missing pin means the
 *     operator likely changed prices/lineup → open a drift issue. Presence
 *     check only — we never auto-write prices.
 *  2. CAMPAIGN EXPIRY — campaignNote dates ("31.7.2026 asti") that have
 *     passed → the campaign field must be refreshed or removed.
 *  3. FRESHNESS STAMP AGE — DATA_REVIEWED_AT must be < MAX_AGE_DAYS old
 *     (enforces the monthly manual verification routine).
 *
 * Exit codes: 0 = OK, 2 = drift/stale → workflow opens/updates a GitHub issue.
 */
import { readFileSync } from 'node:fs';

const MAX_AGE_DAYS = 35;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 ValitsuDataCheck/1.0';

// Pins captured at the 2026-07-16 verification. Each entry: page URL + price
// strings (with alternate formats) that must all be present. Update pins
// whenever plan data is re-verified.
const CHECKS = [
  {
    name: 'Moi — mallisto',
    url: 'https://moi.fi',
    pins: [['Kevyt'], ['Fiksu'], ['Teho'], ['Nopea'], ['Super']],
  },
  {
    name: 'Giga Mobiili — normaalihinnat',
    url: 'https://gigamobiili.fi',
    pins: [['23,99', '23.99'], ['26,99', '26.99'], ['28,99', '28.99'], ['39,99', '39.99']],
  },
  {
    name: 'Oomi Mobiili — hinnat',
    url: 'https://oomi.fi/mobiili/',
    pins: [['19,99'], ['21,99'], ['26,99'], ['29,99']],
  },
  {
    name: 'Globetel — liittymät',
    url: 'https://globetel.fi/liittymat',
    pins: [['6,99'], ['9,99'], ['11,99'], ['13,99']],
  },
  {
    name: 'Valoo — normaalihinnat',
    url: 'https://valoo.fi',
    pins: [['49,90'], ['52,90'], ['79,90']],
  },
  {
    name: 'DNA — Huoleton Plus',
    url: 'https://www.dna.fi/puhelinliittymat',
    pins: [['Huoleton Plus'], ['19,99']],
  },
  {
    name: 'Telia — Rajaton-hinnat',
    url: 'https://kauppa.telia.fi/yksityisille/tuotteet/puhelinliittymat.aspx',
    pins: [['20,99'], ['32,99'], ['49,99']],
  },
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const drift = [];
const warnings = [];
const ok = [];

// ── Guard 1: pinned source strings ──
for (const check of CHECKS) {
  try {
    const html = (await fetchText(check.url)).replace(/\s+/g, ' ');
    const missing = check.pins.filter((variants) => !variants.some((v) => html.includes(v)));
    if (missing.length > 0) {
      drift.push(
        `**${check.name}**: pinnatut merkkijonot puuttuvat sivulta ${check.url} → ${missing
          .map((m) => m[0])
          .join(', ')} — hinnat/mallisto ovat todennäköisesti muuttuneet. Verifioi ja päivitä src/data/*.ts + pinnit.`
      );
    } else {
      ok.push(`${check.name}: pinnit OK`);
    }
  } catch (e) {
    warnings.push(`${check.name}: sivua ei voitu hakea (${e.message}) — tarkista käsin jos toistuu.`);
  }
}

// ── Guard 2: campaign expiry ──
const dataFiles = ['../src/data/mobile-plans.ts', '../src/data/broadband-plans.ts'];
const now = new Date();
for (const rel of dataFiles) {
  const src = readFileSync(new URL(rel, import.meta.url), 'utf8');
  for (const match of src.matchAll(/campaignNote:\s*'[^']*?(\d{1,2})\.(\d{1,2})\.(\d{4})[^']*'/g)) {
    const [, d, mo, y] = match;
    const end = new Date(Number(y), Number(mo) - 1, Number(d), 23, 59);
    if (end < now) {
      drift.push(
        `**Kampanja umpeutunut** (${d}.${mo}.${y}) tiedostossa ${rel.replace('../', '')} — poista tai päivitä campaignPrice/campaignNote (rivi: \`${match[0].slice(0, 80)}...\`).`
      );
    }
  }
}
if (!drift.some((d) => d.includes('Kampanja umpeutunut'))) ok.push('Kampanjapäivämäärät OK');

// ── Guard 3: freshness stamp age (format '16.7.2026') ──
const constants = readFileSync(new URL('../src/lib/constants.ts', import.meta.url), 'utf8');
const m = constants.match(/DATA_REVIEWED_AT = '(\d{1,2})\.(\d{1,2})\.(\d{4})'/);
if (!m) {
  drift.push('DATA_REVIEWED_AT ei löytynyt constants.ts:stä — tarkista tiedosto.');
} else {
  const reviewed = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  const ageDays = Math.floor((now.getTime() - reviewed.getTime()) / 86400000);
  if (ageDays > MAX_AGE_DAYS) {
    drift.push(
      `**Liittymädata on ${ageDays} pv vanhaa** (tarkistettu ${m[1]}.${m[2]}.${m[3]}, raja ${MAX_AGE_DAYS} pv) — kuukausiverifiointi on myöhässä.`
    );
  } else {
    ok.push(`Tuoreusleima OK (${ageDays} pv)`);
  }
}

// ── Report ──
console.log(`## Valitse Liittymä — viikkodatatarkistus ${now.toLocaleDateString('fi-FI')}\n`);
if (drift.length) {
  console.log('### ⚠️ Toimenpiteitä vaativat\n');
  for (const d of drift) console.log(`- ${d}`);
  console.log('');
}
if (warnings.length) {
  console.log('### Huomiot (ei hälytystä)\n');
  for (const w of warnings) console.log(`- ${w}`);
  console.log('');
}
console.log('### OK\n');
for (const o of ok) console.log(`- ${o}`);

process.exit(drift.length ? 2 : 0);
