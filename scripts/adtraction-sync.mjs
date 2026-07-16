#!/usr/bin/env node
/**
 * Adtraction offers & program-state sync (weekly, GitHub Actions).
 *
 * 1. Fetches our APPROVED programs for this channel (allowlist — the offers
 *    endpoint can leak offers from non-approved programs).
 * 2. Fetches active offers, keeps only: approved program + currently valid
 *    + mapped to an operator in our comparison + passes the text sanitizer.
 * 3. Writes src/data/partner-offers.json (stable order). The workflow
 *    commits only when the file actually changed → Vercel deploys → cards
 *    render the offers. Display is INFO-ONLY: offers never affect ranking.
 * 4. Detects program-state changes (new approvals / losses) vs the committed
 *    src/data/adtraction-programs.json and prints them for the drift report
 *    — this is how we hear that a pending application got approved.
 *
 * Env: ADTRACTION_API_TOKEN (account token), ADTRACTION_CHANNEL_ID.
 * Exit codes: 0 = ok (files possibly updated), 4 = API/config failure.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const API = 'https://api.adtraction.com';
const TOKEN = process.env.ADTRACTION_API_TOKEN;
const CHANNEL = Number(process.env.ADTRACTION_CHANNEL_ID);
if (!TOKEN || !Number.isFinite(CHANNEL) || CHANNEL <= 0) {
  console.error('ADTRACTION-SYNC SKIP: token/channel env missing');
  process.exit(4);
}

// programId → operator id in src/data/operators.ts. Only mapped programs
// render on the site; unmapped approved programs are listed in the program
// inventory so the weekly issue reminds us to wire them.
const PROGRAM_TO_PROVIDER = {
  // Program IDs are resolved dynamically by name below (Adtraction program
  // IDs are stable but name-matching keeps this file readable); add a
  // numeric override here if a rename ever breaks matching.
};
const NAME_TO_PROVIDER = [
  [/^telia/i, 'telia'],
  [/^moi/i, 'moi'],
  [/^valoo/i, 'valoo'],
  // Viaplay / MTV Katsomo / BookBeat / SkyShowtime are approved media/streaming
  // programs in this channel, deliberately left UNMAPPED — they are not
  // liittymä (mobile/broadband) comparison content, so they must never render
  // on operator cards. They log as OFFER-UNMAPPED, which is expected.
];

// Conservative text rules: no HTML, bounded length, no shouting claims.
const BANNED = /takuu|varma(sti)?\s|100\s?%|ilman luottotietoja|maksuhäiriö/i;
function sanitize(text) {
  const clean = String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
  return BANNED.test(clean) ? null : clean;
}

async function call(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'X-Token': TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Adtraction ${path} HTTP ${res.status}`);
  return res.json();
}

try {
  // ── Approved programs (allowlist + inventory) ──
  const approvedRaw = await call(
    `/v2/partner/programs/?channelId=${CHANNEL}&market=FI&approvalStatus=1`
  );
  const approved = Array.isArray(approvedRaw) ? approvedRaw : [];
  const approvedIds = new Set(approved.map((p) => p.programId));
  const inventory = approved
    .map((p) => ({ programId: p.programId, programName: p.programName }))
    .sort((a, b) => a.programId - b.programId);

  // ── Program-state change detection ──
  const invPath = new URL('../src/data/adtraction-programs.json', import.meta.url);
  if (existsSync(invPath)) {
    const prev = JSON.parse(readFileSync(invPath, 'utf8'));
    const prevIds = new Set(prev.map((p) => p.programId));
    const gained = inventory.filter((p) => !prevIds.has(p.programId));
    const lost = prev.filter((p) => !approvedIds.has(p.programId));
    for (const g of gained)
      console.log(`PROGRAM-CHANGE: UUSI HYVÄKSYTTY OHJELMA → ${g.programName} (${g.programId}) — lisää operaattori/deeplink.`);
    for (const l of lost)
      console.log(`PROGRAM-CHANGE: OHJELMA POISTUNUT → ${l.programName} (${l.programId}) — tarkista linkit.`);
  }
  writeFileSync(invPath, JSON.stringify(inventory, null, 2) + '\n');

  // ── Offers ──
  const offersRaw = await call('/v2/partner/offers/', { channelId: CHANNEL, market: 'FI' });
  const offers = Array.isArray(offersRaw) ? offersRaw : [];
  const now = Date.now();
  const out = [];
  for (const o of offers) {
    if (!approvedIds.has(o.programId)) continue;
    const from = o.validFrom ? Date.parse(o.validFrom) : 0;
    const to = o.validTo ? Date.parse(o.validTo) : 0;
    if (!to || now < from || now > to) continue;
    const rule = NAME_TO_PROVIDER.find(([re]) => re.test(o.programName || ''));
    // Field name providerId stays for parity with the shared accessor; here the
    // value is an operator id (src/data/operators.ts), not an electricity provider.
    const providerId = PROGRAM_TO_PROVIDER[o.programId] || (rule ? rule[1] : null);
    if (!providerId) {
      console.log(`OFFER-UNMAPPED: [${o.programName}] ${String(o.offerDescription || '').slice(0, 60)}`);
      continue;
    }
    const description = sanitize(o.offerDescription);
    if (!description) {
      console.log(`OFFER-DROPPED (sanitizer): [${o.programName}]`);
      continue;
    }
    out.push({
      id: o.offerId,
      providerId,
      programName: o.programName,
      description,
      coupon: o.offerCoupon || null,
      trackingUrl: o.trackingURL || null,
      validTo: (o.validTo || '').slice(0, 10),
    });
  }
  out.sort((a, b) => a.id - b.id);
  const offersPath = new URL('../src/data/partner-offers.json', import.meta.url);
  writeFileSync(offersPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`ADTRACTION-SYNC OK: ${approved.length} approved programs, ${out.length} mapped active offers.`);
} catch (e) {
  console.error(`ADTRACTION-SYNC SKIP: ${e.message}`);
  process.exit(4);
}
