// VIU Phase-4 (Pre-intermediate & intermediate) — VLM content extraction from scanned pages.
// Owner mandate: "فاز ۴ — استخراج و افزودن Pre-intermediate & intermediate (۱۰۰ درس)" —
// chunked extraction with real count QA per chunk (same proven pipeline as Phase-3 Elementary).
//
// Source: upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf (SHA256 0dfdab2e…)
// Structure proven by Phase-1 census (docs/qa/viu-phase1-census-preint-2026-11-09.json) and
// the Phase-1 audit (docs/qa/viu-phase1-structural-audit-2026-11-09.md §F/§H):
//   271 PDF pages · 100/100 units · unit N left page = 2N+9 (right = left+1) ·
//   Answer key = PDF 211-248 (PS@249 · PP@250 · IX@251-269 · Ack@270) ·
//   unit N book page = 2N+2 · zero footer-sequence breaks in the scan.
//
// The PDF has ZERO text layer (pdftotext=0 chars, pdffonts=0 fonts) ⇒ all text is
// extracted visually: pages rendered with pdftoppm (200 DPI JPEG) and read by the
// vision model via CLI `z-ai vision` (same pipeline as the committed Phase-1 census).
//
// Modes:
//   bun scripts/viu-preint-extract.mjs render                 → render all 271 pages (skip existing)
//   bun scripts/viu-preint-extract.mjs key                    → answer key pass (PDF 211-248, batches of 4)
//   bun scripts/viu-preint-extract.mjs chunk <start> <end>    → extract units [start..end] (resume-safe)
//   bun scripts/viu-preint-extract.mjs qa <start> <end>       → real counts QA for a chunk
//   bun scripts/viu-preint-extract.mjs all <start> <end>      → key (if needed) + chunk, with delays
//
// Outputs (all under /tmp/viu/preint-extract/):
//   answer-key.json  → [{pdfPage, units:[{unit, answers:{ "1.1": "…" }}]}]
//   unit-NNN.json    → {unit, title, vocab:[{w,fa,pos?,forms?}], lines:[{en,fa}], exercises:[{no,instr,kind,bank,items:[{en,opts}]}], failed?}
//
// Honesty rules (Phase-2 design §E/§F): English text = exactly as printed (never invented);
// fa fields = GLM machine translation, class FA-NEW; answers never invented here —
// quiz answers are joined to the book's own printed Answer key at build time.
// This tool changes no product code/data/db — it only reads rendered JPEGs and writes /tmp JSON.

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, statSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MODE = process.argv[2];
const A1 = Number(process.argv[3] || 0);
const A2 = Number(process.argv[4] || 0);

const IMG_DIR = "/tmp/viu/preint";
const OUT_DIR = "/tmp/viu/preint-extract";
const TOTAL_PAGES = 271;
const UNIT1_LEFT = 11; // PDF page of unit 1 left page (proven: PDF 2N+9)
const KEY_FIRST = 211;
const KEY_LAST = 248;

const pad3 = (n) => String(n).padStart(3, "0");

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function save(path, data) {
  writeFileSync(path, JSON.stringify(data));
}

function extractJsonText(text) {
  // slice from first { or [ to last } or ] — vision models sometimes wrap in prose/fences
  const s = text.search(/[[{]/);
  const e = Math.max(text.lastIndexOf("]"), text.lastIndexOf("}"));
  if (s === -1 || e === -1 || e <= s) return null;
  try {
    return JSON.parse(text.slice(s, e + 1));
  } catch {
    return null;
  }
}

async function callVision(images, prompt, timeoutMs = 300000) {
  const args = ["vision", "-p", prompt];
  for (const img of images) args.push("-i", img);
  args.push("-o", `${OUT_DIR}/_last_response.json`);
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: timeoutMs });
      const raw = readJson(`${OUT_DIR}/_last_response.json`);
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const parsed = extractJsonText(content);
      if (parsed) return parsed;
    } catch {
      /* retry */
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: render
// ─────────────────────────────────────────────────────────────────────────────
function modeRender() {
  if (!existsSync(IMG_DIR)) execFileSync("mkdir", ["-p", IMG_DIR]);
  let missing = 0;
  for (let p = 1; p <= TOTAL_PAGES; p++) {
    const f = `${IMG_DIR}/p-${pad3(p)}.jpg`;
    if (!existsSync(f) || statSync(f).size < 1000) missing++;
  }
  if (missing === 0) {
    console.log(`render: all ${TOTAL_PAGES} pages already present in ${IMG_DIR}`);
    return;
  }
  console.log(`render: ${missing} pages missing — running pdftoppm -r 200 …`);
  execFileSync(
    "pdftoppm",
    ["-jpeg", "-r", "200", `${process.cwd()}/upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf`, `${IMG_DIR}/p`],
    { stdio: "inherit" },
  );
  const done = Array.from({ length: TOTAL_PAGES }, (_, i) => `${IMG_DIR}/p-${pad3(i + 1)}.jpg`).filter((f) => existsSync(f)).length;
  console.log(`render: ${done}/${TOTAL_PAGES} pages present`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: key (answer key, PDF 211-248)
// ─────────────────────────────────────────────────────────────────────────────
const KEY_PROMPT_BATCH = (n) => `You will receive ${n} scanned pages from the Answer key section of "English Vocabulary in Use — Pre-intermediate & intermediate" (2nd edition, Stuart Redman). Each page contains the printed answers for one or more units ("Unit 1", "Unit 2", …). For EACH image i (1-based, in order) report the units it covers:
[{"i":1,"units":[{"unit":1,"answers":{"1.1":"…","1.2":"…"}}, …]}, …]
Rules: "unit" = the unit number printed as a heading; "answers" = a compact object mapping printed exercise numbers (like "1.1", "1.2") to the exact printed answer text (keep blanks as ________, keep alternate answers separated by slashes exactly as printed, join multi-part answers with " | "). If an exercise has no printed answer for that unit, omit its key. Never invent answers; unreadable answer → null. Return ONLY compact JSON, no markdown.`;

function loadKey() {
  const path = `${OUT_DIR}/answer-key.json`;
  const arr = readJson(path);
  const map = new Map();
  if (Array.isArray(arr)) for (const r of arr) map.set(r.pdfPage, r);
  return { path, map };
}

async function modeKey() {
  const { path, map } = loadKey();
  const BATCH = 4;
  for (let p = KEY_FIRST; p <= KEY_LAST; p += BATCH) {
    const pages = [];
    const images = [];
    for (let q = p; q < p + BATCH && q <= KEY_LAST; q++) {
      const img = `${IMG_DIR}/p-${pad3(q)}.jpg`;
      const existing = map.get(q);
      if (existing && !existing.failed) continue;
      if (existsSync(img) && statSync(img).size > 1000) {
        pages.push(q);
        images.push(img);
      }
    }
    if (images.length === 0) continue;
    const arr = await callVision(images, KEY_PROMPT_BATCH(images.length));
    if (!Array.isArray(arr)) {
      console.error(`KEY p${p}: FAILED`);
      for (const q of pages) map.set(q, { pdfPage: q, units: [], failed: true });
      save(path, [...map.values()].sort((a, b) => a.pdfPage - b.pdfPage));
      continue;
    }
    for (let k = 0; k < pages.length; k++) {
      const rec = arr.find((r) => Number(r?.i) === k + 1) || arr[k] || {};
      const units = Array.isArray(rec.units) ? rec.units.filter((u) => Number.isFinite(Number(u?.unit))) : [];
      map.set(pages[k], { pdfPage: pages[k], units, failed: units.length === 0 });
    }
    save(path, [...map.values()].sort((a, b) => a.pdfPage - b.pdfPage));
    console.log(`KEY p${p}..${pages[pages.length - 1]} done (${map.size}/${KEY_LAST - KEY_FIRST + 1})`);
    if (p + BATCH <= KEY_LAST) await sleep(10000);
  }
  // summary
  const all = [...map.values()].sort((a, b) => a.pdfPage - b.pdfPage);
  const unitsCovered = new Set();
  let ansCount = 0;
  for (const pg of all) {
    for (const u of pg.units || []) {
      unitsCovered.add(Number(u.unit));
      ansCount += Object.keys(u.answers || {}).length;
    }
  }
  console.log(`KEY COMPLETE: pages=${all.length} unitsCovered=${unitsCovered.size} answerKeys=${ansCount}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: chunk (units)
// ─────────────────────────────────────────────────────────────────────────────
const UNIT_PROMPT = (left, right, expectedUnit) => `You see two scanned pages (image 1 = LEFT page = presentation, image 2 = RIGHT page = exercises) of ONE complete unit from "English Vocabulary in Use — Pre-intermediate & intermediate" (2nd edition, Stuart Redman). The unit header square shows unit number ${expectedUnit}. Transcribe faithfully. Return ONLY compact JSON (no markdown) with exactly this shape:
{"unit":${expectedUnit},"title":"<unit title exactly as printed>","vocab":[{"w":"<English word/phrase exactly as printed>","fa":"<ترجمه فارسی روان>","pos":"<n.|v.|adj.|adv.|phr. — only if printed or obvious; omit otherwise>","forms":["base","past","participle"]}],"lines":[{"en":"<example sentence/mini-dialogue line exactly as printed>","fa":"<ترجمه فارسی>"}],"exercises":[{"no":"<printed number like 3.1>","instr":"<English instruction exactly as printed>","instrFa":"<ترجمه فارسی دستور>","kind":"gap|choose|odd|match|truefalse|table|other","bank":["<word bank or choice words printed with the exercise, if any>"],"items":[{"en":"<item text exactly as printed, blank shown as ________>","fa":"<ترجمه فارسی جملهٔ تمرین>","opts":["<printed choices for THIS item, if printed>"]}]}]}
Rules:
- "vocab": EVERY vocabulary item taught on the LEFT page (bold words, table cells, diagram labels, word-family members). Keep exact spelling and parentheses. Do NOT invent items. For irregular-verb tables set "forms":[base,past,participle] and keep "w" = base form.
- "lines": the numbered example sentences / short dialogues under the tables on the left page, in printed order. If none, [].
- "exercises": ALL exercises on the RIGHT page in printed order, each with its printed number, instruction (+ Persian "instrFa"), kind, and every item text (+ Persian "fa" per item). "bank" = the printed word box/choices for the whole exercise (empty array if none). "opts" only when the item itself prints choices.
- fa fields = natural Persian translation (machine translation). English text must be copied exactly — NEVER invented. If something is unreadable, use null for that string. Required top-level keys: unit,title,vocab,lines,exercises (empty arrays allowed). Keep JSON compact (no newlines inside strings except necessary).`;

function unitValid(rec, n) {
  if (!rec || rec.failed) return false;
  if (Number(rec.unit) !== n) return false;
  if (typeof rec.title !== "string" || rec.title.trim().length === 0) return false;
  if (!Array.isArray(rec.vocab) || !Array.isArray(rec.lines) || !Array.isArray(rec.exercises)) return false;
  return true;
}

function loadKeyAnswers() {
  const { map } = loadKey();
  const byUnit = new Map();
  for (const pg of map.values()) {
    for (const u of pg.units || []) {
      const n = Number(u.unit);
      // merge — a unit's key can span two adjacent pages
      byUnit.set(n, { ...(byUnit.get(n) || {}), ...(u.answers || {}) });
    }
  }
  return byUnit;
}

async function extractUnit(n, keyByUnit) {
  const left = UNIT1_LEFT + 2 * (n - 1);
  const right = left + 1;
  const imgs = [`${IMG_DIR}/p-${pad3(left)}.jpg`, `${IMG_DIR}/p-${pad3(right)}.jpg`];
  let rec = await callVision(imgs, UNIT_PROMPT(left, right, n));
  if (rec && typeof rec === "object" && !Array.isArray(rec) && unitValid({ ...rec, unit: Number(rec.unit) }, n)) {
    return { rec, split: false };
  }
  // fallback: two separate calls (left = vocab+lines, right = exercises)
  const LEFT_PROMPT = UNIT_PROMPT(left, right, n) + `\nIMPORTANT: this call reports ONLY the LEFT page (image 1). Return the same JSON shape with "exercises":[] and ignore the right page.`;
  const RIGHT_PROMPT = UNIT_PROMPT(left, right, n) + `\nIMPORTANT: this call reports ONLY the RIGHT page (image 2). Return the same JSON shape; keep "vocab" and "lines" as empty arrays; fill "exercises" completely.`;
  const l = await callVision([imgs[0]], LEFT_PROMPT);
  const r = await callVision([imgs[1]], RIGHT_PROMPT);
  if (!l || !r) return null;
  rec = {
    unit: Number(r.unit) === n ? Number(r.unit) : Number(l.unit) || n,
    title: (typeof l.title === "string" && l.title) || (typeof r.title === "string" ? r.title : null),
    vocab: Array.isArray(l.vocab) ? l.vocab : [],
    lines: Array.isArray(l.lines) ? l.lines : [],
    exercises: Array.isArray(r.exercises) ? r.exercises : [],
    splitFallback: true,
  };
  if (!unitValid(rec, n)) return null;
  return { rec, split: true };
}

async function modeChunk(start, end) {
  const keyByUnit = loadKeyAnswers();
  let done = 0;
  let failed = 0;
  for (let n = start; n <= end; n++) {
    const f = `${OUT_DIR}/unit-${pad3(n)}.json`;
    const existing = readJson(f);
    if (existing && unitValid(existing, n)) {
      done++;
      continue;
    }
    const res = await extractUnit(n, keyByUnit);
    if (!res) {
      console.error(`UNIT ${n}: FAILED (2-image + split fallback)`);
      save(f, { unit: n, title: null, vocab: [], lines: [], exercises: [], failed: true });
      failed++;
    } else {
      save(f, res.rec);
      done++;
      const k = Object.keys(keyByUnit.get(n) || {}).length;
      console.log(
        `UNIT ${n} ok${res.split ? " (split)" : ""}: vocab=${res.rec.vocab.length} lines=${res.rec.lines.length} ex=${res.rec.exercises.length} keyEx=${k}${res.rec.splitFallback ? " :: " + res.rec.title : ""}`,
      );
    }
    await sleep(10000);
  }
  console.log(`CHUNK ${start}-${end} COMPLETE: done=${done}/${end - start + 1} failed=${failed}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: qa (real counts for a chunk)
// ─────────────────────────────────────────────────────────────────────────────
function modeQa(start, end) {
  const keyByUnit = loadKeyAnswers();
  let units = 0;
  let failedUnits = [];
  let vocab = 0;
  let faAbsent = 0;
  let lines = 0;
  let exercises = 0;
  let items = 0;
  let verbsForms = 0;
  let keyMissingItems = 0;
  let keyMissingEx = [];
  const perUnit = [];
  for (let n = start; n <= end; n++) {
    const rec = readJson(`${OUT_DIR}/unit-${pad3(n)}.json`);
    if (!rec || !unitValid(rec, n)) {
      failedUnits.push(n);
      continue;
    }
    units++;
    let uVocab = 0;
    for (const v of rec.vocab || []) {
      if (!v || typeof v.w !== "string" || !v.w.trim()) continue;
      uVocab++;
      if (typeof v.fa !== "string" || !v.fa.trim()) faAbsent++;
      if (Array.isArray(v.forms) && v.forms.length === 3) verbsForms++;
    }
    vocab += uVocab;
    lines += (rec.lines || []).length;
    let uEx = 0;
    let uItems = 0;
    let uMissing = 0;
    for (const ex of rec.exercises || []) {
      if (!ex || !Array.isArray(ex.items)) continue;
      uEx++;
      const answers = keyByUnit.get(n) || {};
      for (const it of ex.items || []) {
        uItems++;
        const no = String(ex.no || "");
        if (!(no in answers) || answers[no] == null) uMissing++;
      }
    }
    exercises += uEx;
    items += uItems;
    if (uMissing > 0) {
      keyMissingItems += uMissing;
      keyMissingEx.push(`${n}(${uMissing})`);
    }
    perUnit.push(`  unit ${n}: vocab=${uVocab} lines=${(rec.lines || []).length} ex=${uEx} items=${uItems} keyMissingItems=${uMissing}${rec.splitFallback ? " [split]" : ""}`);
  }
  console.log(`QA ${start}-${end}: units=${units}/${end - start + 1} failedUnits=[${failedUnits.join(",")}]`);
  console.log(`  vocabRows=${vocab} (faAbsent=${faAbsent}) verbsForms=${verbsForms} lines=${lines} exercises=${exercises} items=${items}`);
  console.log(`  keyMissingItems=${keyMissingItems} in units: ${keyMissingEx.join(" ") || "—"}`);
  console.log(perUnit.join("\n"));
}

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  execFileSync("mkdir", ["-p", OUT_DIR], { stdio: "ignore" });
  if (MODE === "render") return modeRender();
  if (MODE === "key") return modeKey();
  if (MODE === "chunk" && A1 && A2) return modeChunk(A1, A2);
  if (MODE === "qa" && A1 && A2) return modeQa(A1, A2);
  if (MODE === "all" && A1 && A2) {
    await modeKey();
    await modeChunk(A1, A2);
    modeQa(A1, A2);
    return;
  }
  console.error("usage: viu-preint-extract.mjs <render|key|chunk|qa|all> [start] [end]");
  process.exit(1);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
