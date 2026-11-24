// VIU Phase-1 structural audit — page-by-page VLM census of the three scanned PDFs
// Purpose: the three PDFs have ZERO text layer (pdftotext=0 chars/page, pdffonts=0 fonts),
// so page-by-page structure extraction (unit starts + printed footer numbers) is done
// visually: pages are rendered with pdftoppm (150 DPI JPEG) and read by the vision model.
//
// Usage: bun scripts/viu-vlm-census.mjs <elem|preint|upper> [imagesDir] [totalPages] [batchSize] [startPage] [delayMs]
// Output: /tmp/viu/census-<key>.json  →  [{pdfPage, unit, title, footer}, ...]
// If the output file already exists, previously-censused pages are preserved (resume mode)
// and only pages outside it (or with nulls) are re-censused within the requested range.
// Verification rule applied after the run: consecutive non-null footers must increase by 1.
//
// This tool is READ-ONLY with respect to the repository: it only reads rendered JPEGs
// and writes its JSON result to /tmp. It changes no product code, no data, no db.

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, statSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const KEY = process.argv[2];
const DIR = process.argv[3] || `/tmp/viu/${KEY}`;
const TOTAL = Number(process.argv[4] || 0);
const BATCH = Number(process.argv[5] || 8);
const START = Number(process.argv[6] || 1);
const DELAY = Number(process.argv[7] || 12000);

if (!KEY || !TOTAL) {
  console.error("usage: viu-vlm-census.mjs <elem|preint|upper> <imagesDir> <totalPages> [batchSize] [startPage] [delayMs]");
  process.exit(1);
}

function loadExisting() {
  const path = `/tmp/viu/census-${KEY}.json`;
  if (!existsSync(path)) return new Map();
  try {
    const arr = JSON.parse(readFileSync(path, "utf8"));
    return new Map(arr.map((r) => [r.pdfPage, r]));
  } catch {
    return new Map();
  }
}

function pageNeedsWork(existing, q) {
  const r = existing.get(q);
  if (!r) return true;
  return r.unit === null && r.title === null && r.footer === null; // previously failed
}

const PROMPT = `You will receive ${BATCH} scanned book pages (in order). For EACH image i (1-based), report:
1) "unit": the big unit/lesson number shown in the coloured/black square header at the top-left IF this page begins a numbered unit, else null;
2) "title": the unit title (English, short) if unit is not null, else null;
3) "footer": the printed page number at the bottom of the page (integer, or roman-numeral string like "vi") if visible, else null.
Return ONLY a compact JSON array of ${BATCH} objects like [{"i":1,"unit":null,"title":null,"footer":12},...].
Rules: use null when unclear; never invent numbers; the footer is the number printed by the book (bottom corner), not the image index.`;

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
  args.push("-o", "/tmp/viu/_last_response.json");
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 180000 });
      const raw = JSON.parse(readFileSync("/tmp/viu/_last_response.json", "utf8"));
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const arr = extractJsonArray(content);
      if (arr && arr.length >= 1) return arr;
    } catch {
      /* retry */
    }
  }
  return null;
}

const existing = loadExisting();
const results = new Map(existing); // preserve previously successful pages
let batchNo = 0;
for (let p = START; p <= TOTAL; p += BATCH) {
  batchNo++;
  const pages = [];
  const images = [];
  for (let q = p; q < p + BATCH && q <= TOTAL; q++) {
    if (!pageNeedsWork(existing, q)) continue;
    const img = `${DIR}/p-${pad3(q)}.jpg`;
    if (existsSync(img) && statSync(img).size > 1000) {
      pages.push(q);
      images.push(img);
    }
  }
  if (images.length === 0) continue;
  const arr = await callVision(images);
  if (!arr) {
    console.error(`BATCH ${batchNo} (p${p}) FAILED — recording nulls`);
    for (const q of pages)
      results.set(q, { pdfPage: q, unit: null, title: null, footer: null });
    continue;
  }
  for (let k = 0; k < pages.length; k++) {
    const rec = arr.find((r) => Number(r?.i) === k + 1) || arr[k] || {};
    results.set(pages[k], {
      pdfPage: pages[k],
      unit: rec.unit === undefined ? null : rec.unit,
      title: rec.title === undefined ? null : rec.title,
      footer: rec.footer === undefined ? null : rec.footer,
    });
  }
  const lastQ = pages[pages.length - 1];
  process.stdout.write(`batch ${batchNo}: p${p}..${lastQ} done (${results.size}/${TOTAL})\n`);
  writeFileSync(`/tmp/viu/census-${KEY}.json`, JSON.stringify([...results.values()].sort((a, b) => a.pdfPage - b.pdfPage), null, 1));
  if (p + BATCH <= TOTAL) await sleep(DELAY);
}

writeFileSync(`/tmp/viu/census-${KEY}.json`, JSON.stringify([...results.values()].sort((a, b) => a.pdfPage - b.pdfPage), null, 1));

// post-run verification: footer contiguity report
const ordered = [...results.values()].sort((a, b) => a.pdfPage - b.pdfPage);
const breaks = [];
let prev = null;
for (const r of ordered) {
  const f = r.footer;
  const isInt = typeof f === "number" && Number.isFinite(f);
  if (isInt && typeof prev === "number" && f !== prev + 1) {
    breaks.push({ at: r.pdfPage, prev, now: f });
  }
  prev = isInt ? f : null; // roman/null pages reset the chain
}
console.log(`\nCENSUS ${KEY} COMPLETE: ${results.size} pages`);
console.log(`footer contiguity breaks: ${breaks.length}`);
for (const b of breaks.slice(0, 50)) console.log(`  break at pdfPage ${b.at}: ${b.prev} -> ${b.now}`);
const units = ordered.filter((r) => r.unit !== null && r.unit !== undefined);
console.log(`unit-start detections: ${units.length}`);
for (const u of units) console.log(`  unit ${u.unit} @ pdfPage ${u.pdfPage} (footer ${u.footer}) :: ${u.title ?? ""}`);
