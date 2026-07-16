#!/usr/bin/env node
/**
 * IndexNow ping — notify Bing, Yandex and other IndexNow search engines that
 * our core pages changed, so they recrawl promptly after a deploy.
 *
 * No dependencies (Node 18+ global fetch + top-level await). Run manually
 * AFTER a production deploy: `npm run indexnow`.
 *
 * Prerequisite: the key file must be live at
 *   https://valitseliittyma.fi/c62b4fea184fabad02021ff5032f5656.txt
 * (served from public/c62b4fea184fabad02021ff5032f5656.txt).
 */

const HOST = 'valitseliittyma.fi';
const KEY = 'c62b4fea184fabad02021ff5032f5656';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Core, high-value pages worth an explicit recrawl nudge.
const paths = [
  '/',
  '/puhelinliittymat',
  '/laajakaista',
  '/halvin-puhelinliittyma',
  '/paras-5g-liittyma',
  '/paras-laajakaista',
  '/operaattorit',
  '/menetelma',
];

const urlList = paths.map((p) => `https://${HOST}${p}`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
});

console.log(`IndexNow → ${res.status} ${res.statusText}`);
const text = await res.text();
if (text) console.log(text);

// IndexNow returns 200 or 202 on success.
if (!res.ok) process.exit(1);
