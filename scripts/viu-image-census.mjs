// VIU Image Roadmap — Phase 1 (read-only visual census) — VLM census of every lesson page.
//
// For each lesson page render (pdftoppm 120 DPI JPEG, produced in /tmp only), the vision
// model decides whether the page presents non-text visual material and of which type.
// Types recorded (owner taxonomy — roadmap فاز ۱):
//   picture-dictionary  illustrated word panel (واژه‌نامهٔ تصویری)
//   drawing             illustration / cartoon / sketch (نقاشی)
//   photo               photographic image
//   chart-diagram       chart / graph / diagram (نمودار)
//   table               significant table (جدول) — recorded even though a text table is
//                       typography, not artwork; the report separates it from visuals
//   none                text-only page
//
// Usage: bun scripts/viu-image-census.mjs <elem|preint|upper> [imagesDir] [batchSize] [delayMs]
// Output: /tmp/viu-img/census-images-<key>.json → [{pdfPage, visual, kinds, area, desc}, ...]
// Resume mode: pages already present in the output file are kept; only missing/failed pages
// are re-censused. Cross-check against viu-image-metrics.py output is done by the operator
// after the run (see docs/qa report).
//
// READ-ONLY w.r.t. the repository: reads /tmp renders, writes only /tmp JSON.

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, statSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const KEY = process.argv[2];
const DIR = process.argv[3] || `/tmp/viu-img/${KEY}`;
const BATCH = Number(process.argv[4] || 8);
const DELAY = Number(process.argv[5] || 12000);

if (!KEY) {
  console.error("usage: viu-image-census.mjs <elem|preint|upper> [imagesDir] [batchSize] [delayMs]");
  process.exit(1);
}

const OUT = `/tmp/viu-img/census-images-${KEY}.json`;

const PROMPT = `You will receive ${BATCH} scanned pages from an English Vocabulary in Use book (in order). For EACH image i (1-based) decide whether the page presents non-text visual material (illustrations, cartoons, picture panels, photos, diagrams, charts, or a significant table/figure). Classify ONLY what is genuinely visible on that page.

Return ONLY a compact JSON array of ${BATCH} objects:
[{"i":1,"visual":true,"kinds":["drawing"],"area":"medium","desc":"cartoon scene: airport check-in"},...]

- "visual": true if the page contains any illustration/cartoon/picture-panel/photo/diagram/chart or a significant table occupying a notable part of the page; false for text-only pages (plain text, plain exercise lists, plain text tables without graphics are false).
- "kinds": subset of ["picture-dictionary","drawing","photo","chart-diagram","table"] (empty array when visual=false).
- "area": "none"|"small"|"medium"|"large" = approximate share of the page covered by the visuals (small<20%, medium 20-50%, large>50%).
- "desc": at most 10 English words describing the visual content ("" when visual=false).
Rules: judge each page independently; never invent content; a page with only 2-3 tiny decorative icons is still visual=true with area "small".`;

const pad3 = (n) => String(n).padStart(3, "0");

function extractJsonArray(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function callVision(images) {
  const args = ["vision", "-p", PROMPT];
  for (const img of images) args.push("-i", img);
  args.push("-o", "/tmp/viu-img/_last_response.json");
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 240000 });
      const raw = JSON.parse(readFileSync("/tmp/viu-img/_last_response.json", "utf8"));
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const arr = extractJsonArray(content);
      if (arr && arr.length >= 1) return arr;
    } catch {
      /* retry */
    }
  }
  return null;
}

function loadExisting() {
  if (!existsSync(OUT)) return new Map();
  try {
    const arr = JSON.parse(readFileSync(OUT, "utf8"));
    return new Map(arr.map((r) => [r.pdfPage, r]));
  } catch {
    return new Map();
  }
}

function pageNeedsWork(existing, q) {
  const r = existing.get(q);
  if (!r) return true;
  return r.visual === null || r.visual === undefined; // previously failed
}

const existing = loadExisting();
const results = new Map(existing);
let batchNo = 0;
const files = [];
const allPages = [];
for (const f of (await import("node:fs")).readdirSync(DIR).sort()) {
  if (!f.startsWith("p-") || !f.endsWith(".jpg")) continue;
  const q = Number(f.split("-")[1].split(".")[0]);
  if (!pageNeedsWork(existing, q)) continue;
  const img = `${DIR}/${f}`;
  if (existsSync(img) && statSync(img).size > 1000) {
    allPages.push(q);
  }
}
allPages.sort((a, b) => a - b);

for (let i = 0; i < allPages.length; i += BATCH) {
  batchNo++;
  const pages = allPages.slice(i, i + BATCH);
  const images = pages.map((q) => `${DIR}/p-${pad3(q)}.jpg`);
  const arr = await callVision(images);
  if (!arr) {
    console.error(`BATCH ${batchNo} (p${pages[0]}..${pages[pages.length - 1]}) FAILED — recording nulls`);
    for (const q of pages) results.set(q, { pdfPage: q, visual: null, kinds: null, area: null, desc: null });
    continue;
  }
  for (let k = 0; k < pages.length; k++) {
    const rec = arr.find((r) => Number(r?.i) === k + 1) || arr[k] || {};
    results.set(pages[k], {
      pdfPage: pages[k],
      visual: rec.visual === true,
      kinds: Array.isArray(rec.kinds) ? rec.kinds : [],
      area: typeof rec.area === "string" ? rec.area : "none",
      desc: typeof rec.desc === "string" ? rec.desc : "",
    });
  }
  const lastQ = pages[pages.length - 1];
  process.stdout.write(`batch ${batchNo}: p${pages[0]}..${lastQ} done (${results.size} records)\n`);
  writeFileSync(OUT, JSON.stringify([...results.values()].sort((a, b) => a.pdfPage - b.pdfPage), null, 1));
  if (i + BATCH < allPages.length) await sleep(DELAY);
}

writeFileSync(OUT, JSON.stringify([...results.values()].sort((a, b) => a.pdfPage - b.pdfPage), null, 1));

// summary
const ordered = [...results.values()].sort((a, b) => a.pdfPage - b.pdfPage);
const vis = ordered.filter((r) => r.visual === true);
const visualPages = vis.length;
const perKind = {};
for (const r of vis) for (const k of r.kinds) perKind[k] = (perKind[k] || 0) + 1;
console.log(`\nIMAGE CENSUS ${KEY} COMPLETE: ${ordered.length} pages · visual=${visualPages} · text-only=${ordered.filter((r) => r.visual === false).length} · failed=${ordered.filter((r) => r.visual === null).length}`);
console.log(`kinds across visual pages: ${JSON.stringify(perKind)}`);
