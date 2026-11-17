// VIU Phase R3-a/R3-b — printed word-table dictionary census + two-pass verbatim verification.
// Wave 1 (ELEM — DONE 2026-11-17): 60 units · 1,110 census entries · dictionary 197 admitted.
// Wave 2 (owner approved 2026-11-17 "بله موافقم" — R3-WAVE2): preint (100 units) + upper (99 units, 52 owner-excluded).
//
// Owner mandate (trace 1a1eb2190f5570f9): "برو سراغ فاز بعدی" — next phase after R2 = R3
// (roadmap: نقشه راه ها/نقشه-راه-کیفیت-استخراج-سه-کتاب-VIU-2026-11-16.md §بخش ۳ فاز R3).
//
// R3-a route ① Exact-Sense Curated from the book itself (route ② Verified Sense-Aware AI needs a
//   separate owner gate and is NOT executed here). R3-b architecture option (a) — the roadmap's own
//   recommendation: DICTIONARY per book dir (DictEntry model), compatible with cross-book-vocab loader.
//
// Census: for each unit, extract the printed vocabulary presentation table VERBATIM:
//   word (as printed) · pos (as printed) · printed English definition · printed IPA (if printed) ·
//   first printed example sentence · printed sense number (only if the table explicitly numbers senses) ·
//   printed group/section heading above the entry (e.g. "Verbs" / "Phrasal verbs" — WAVE2 addition for
//   R3-c UPPER pos-header derivation; null when the printed table has no such heading).
// Second INDEPENDENT pass verifies every field verbatim against the same pages (بازخوانی دوگذر —
//   the same two-pass QA pattern as phases 3-5 and R2-a).
//
// Honesty rules (roadmap principles): English text = exactly as printed (never invented/normalized);
//   nothing here touches product code/data/db — reads renders, writes /tmp JSON + final docs/qa report;
//   unmatched/missing fields stay honest (null / excluded and reported), never filled in.
//
// Pipeline (same as phases 1/3-5/R2 — PDF has ZERO text layer):
//   pdftoppm 200 DPI JPEG renders → vision model via CLI `z-ai vision`.
//
// Modes (resume-safe — each unit's raw response is cached and skipped on re-run):
//   bun scripts/viu-r3-dict-census.mjs render [book]        → render all unit pages (skip existing)
//   bun scripts/viu-r3-dict-census.mjs census [book] [range]→ census pass (resume-safe; range "1-25")
//   bun scripts/viu-r3-dict-census.mjs verify [book] [range]→ second independent pass (resume-safe)
//   bun scripts/viu-r3-dict-census.mjs censusverify [book] [range] → census then verify for a range (parallel worker mode —
//                                                             launched via scripts/dev-server-daemon.mjs with DAEMON_NO_GUARD=1 + DAEMON_LOG,
//                                                             the only background pattern proven to survive between tool invocations)
//   bun scripts/viu-r3-dict-census.mjs archive [book]       → copy /tmp census+verify raw responses into
//                                                             tracked docs/qa capture dirs (progress guard)
//   bun scripts/viu-r3-dict-census.mjs report [book]        → assemble docs/qa JSON report per book
//   bun scripts/viu-r3-dict-census.mjs all [book]           → render+census+verify+report

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, statSync, mkdirSync, readdirSync, renameSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad3 = (n) => String(n).padStart(3, "0");

const ROOT = process.cwd();
const TMP = "/tmp/viu/r3";
const TODAY = "2026-11-17";

const BOOKS = {
  elem: {
    label: "Elementary",
    pdf: `${ROOT}/upload/Vocabulary In Use-Elementary 2nd Edition.pdf`,
    sha256: "35ea1b5be92eef4ceed99e7a59fad3099e36c85673b88f3de9c25c2921cd51ab",
    units: 60,
    // proven bands (phase-1 audit §G/§H) — same as R2 pipeline
    leftPage: (n) => 2 * n + 7,
    rightMissing: new Set(),
    excluded: new Set(),
    captureBookDir: "elem",
  },
  preint: {
    label: "Pre-int & Int",
    pdf: `${ROOT}/upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf`,
    sha256: "0dfdab2ef0730596b56a9a95b534846610319b0bee7f1091233f360178f91a1f",
    units: 100,
    // proven bands (phase-1 audit §G/§H) — same as R2 pipeline
    leftPage: (n) => 2 * n + 9,
    rightMissing: new Set(),
    excluded: new Set(),
    captureBookDir: "preint",
  },
  upper: {
    label: "Upper-int",
    pdf: `${ROOT}/upload/Vocabulary In Use-Upper Intermediate 2nd Edition.pdf`,
    sha256: "415fc9856e16afb7460376bca5897c894234cffec9e4af0ebb044b93cde6dd13",
    units: 100,
    // proven bands (phase-1 audit §G/§H): scan-missing book pages 35 (unit 16 right) · 106-107 (unit 52) · 280
    leftPage: (n) => (n <= 16 ? 2 * n + 7 : n <= 51 ? 2 * n + 6 : 2 * n + 4),
    rightMissing: new Set([16]), // unit 16 right (book 35) MISSING
    excluded: new Set([52]), // unit 52 COMPLETELY MISSING from the scan — owner-only
    captureBookDir: "upper",
  },
};

function captureDir(bookId) {
  return `${ROOT}/docs/qa/viu-r3-capture-${BOOKS[bookId].captureBookDir}`;
}

function parseRange(range) {
  if (!range) return null;
  const m = String(range).match(/^(\d+)-(\d+)$/);
  if (!m) throw new Error(`bad range: ${range}`);
  return [Number(m[1]), Number(m[2])];
}

function inRange(n, range) {
  return !range || (n >= range[0] && n <= range[1]);
}

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

function unitPages(bookId, n) {
  const cfg = BOOKS[bookId];
  const left = cfg.leftPage(n);
  const pages = [left];
  if (!cfg.rightMissing.has(n)) pages.push(left + 1);
  return pages;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: render — pdftoppm appends page numbers to the output name; normalize to p-NNN.jpg
// ─────────────────────────────────────────────────────────────────────────────
function normalizeRenderNames(imgDir) {
  if (!existsSync(imgDir)) return;
  for (const f of readdirSync(imgDir)) {
    const m = f.match(/^p-(\d+)-\d+\.jpg$/);
    if (m && !existsSync(`${imgDir}/p-${m[1]}.jpg`)) {
      renameSync(`${imgDir}/${f}`, `${imgDir}/p-${m[1]}.jpg`);
    }
  }
}

async function modeRender(bookFilter) {
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookId !== bookFilter) continue;
    const cfg = BOOKS[bookId];
    const imgDir = `${TMP}/render/${bookId}`;
    mkdirSync(imgDir, { recursive: true });
    normalizeRenderNames(imgDir);
    const lessons = [];
    for (let n = 1; n <= cfg.units; n++) {
      if (cfg.excluded.has(n)) continue;
      lessons.push(n);
    }
    const need = new Set();
    for (const n of lessons) for (const p of unitPages(bookId, n)) need.add(p);
    let done = 0;
    for (const p of [...need].sort((a, b) => a - b)) {
      const f = `${imgDir}/p-${pad3(p)}.jpg`;
      if (existsSync(f) && statSync(f).size > 1000) continue;
      execFileSync("pdftoppm", ["-f", String(p), "-l", String(p), "-r", "200", "-jpeg", cfg.pdf, `${imgDir}/p-${pad3(p)}`], {
        stdio: ["ignore", "ignore", "ignore"],
      });
      normalizeRenderNames(imgDir);
      if (!existsSync(f)) throw new Error(`render failed: ${f}`);
      done++;
      if (done % 10 === 0) console.log(`render ${bookId}: ${done} new pages…`);
      await sleep(120);
    }
    console.log(`render ${bookId}: ${lessons.length} lessons · ${need.size} pages total · ${done} rendered now`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VLM call (same pattern as phases 3-5 / R2 extract scripts)
// ─────────────────────────────────────────────────────────────────────────────
function extractJsonText(text) {
  const s = text.search(/[[{]/);
  const e = Math.max(text.lastIndexOf("]"), text.lastIndexOf("}"));
  if (s === -1 || e === -1 || e <= s) return null;
  try {
    return JSON.parse(text.slice(s, e + 1));
  } catch {
    return null;
  }
}

async function callVision(images, prompt, outDir, timeoutMs = 300000) {
  const args = ["vision", "-p", prompt];
  for (const img of images) args.push("-i", img);
  args.push("-o", `${outDir}/_last_response.json`);
  // WAVE2: با ورکرهای موازی سقف نرخ API (HTTP 429) زده شد — backoff بلندتر و صبورتر شد
  const backoffs = [0, 15000, 40000, 80000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: timeoutMs });
      const raw = readJson(`${outDir}/_last_response.json`);
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
// MODE: census — verbatim extraction of the printed word table
// ─────────────────────────────────────────────────────────────────────────────
function censusPrompt(bookId, n) {
  return `You are extracting the printed VOCABULARY PRESENTATION from two scanned pages (200 DPI JPEG) of the printed book "English Vocabulary in Use — ${BOOKS[bookId].label} 2nd edition", unit ${n}.

TASK — honest verbatim extraction:
1. Find the vocabulary PRESENTATION on the LEFT page (the right page is exercises — do NOT extract exercise items, exercise instructions, or exercise word banks). The presentation may take different shapes in this book:
   - a word table / word list (headwords with meanings/definitions and examples),
   - a "word: definition" list (e.g. "cyberspace: the realm where ..."),
   - bold headwords inside explanatory sentences with a printed bracket gloss — usually "(= ...)" for meanings or "(e.g. ...)" for examples,
   - suffix/prefix tables (e.g. "-ness: goodness, readiness"),
   - labelled pictures with printed labels (labels usually have NO definition — include only if a definition is actually printed).
2. For EVERY printed vocabulary entry/headword of the presentation extract VERBATIM:
   - "word": the headword exactly as printed (keep printed parenthetical markers like "(pl)", "(opp strong)", "(also 'do')" inside the word string — copy as printed)
   - "pos": the printed part-of-speech marker exactly as printed (e.g. "n.", "v.", "adj.", "prep.", "(nouns)", "(adjectives)") — null if not printed for that entry
   - "def": the printed English meaning/definition exactly as printed (for bracket glosses starting with "=" copy the WHOLE bracket including the parentheses, e.g. "(= room where you eat meals)") — null if the entry has no printed English definition
   - "ipa": the printed IPA/pronunciation exactly as printed if present — null otherwise
   - "example": the FIRST printed example sentence for this headword exactly as printed (for bracket examples starting with "e.g." copy the whole bracket including parentheses, e.g. "(e.g. My hair's long; I need a haircut.)") — null otherwise
   - "sense": the printed sense number (1/2/3…) ONLY if the printed table explicitly numbers multiple senses for this headword — null otherwise
   - "group": the printed section/category heading DIRECTLY ABOVE this entry inside the presentation (e.g. "Verbs", "Adjective suffixes", "Science, technology and medicine") exactly as printed — null if there is no such heading directly above the entry. Copy the heading exactly as printed; do NOT guess a heading that is not visibly printed.
3. English text MUST be copied exactly as printed — NEVER invented, normalized, translated or spell-corrected. If a string is unreadable, use null.
4. Do not invent entries. Only entries actually printed in the presentation.

Required JSON (compact):
{"unit":${n},"entries":[{"word":"...","pos":"n.","def":"...","ipa":null,"example":"...","sense":null,"group":"..."}],"note":"short honest note"}`;
}

function unitRangeList(cfg, range) {
  const out = [];
  for (let n = 1; n <= cfg.units; n++) {
    if (cfg.excluded.has(n)) continue;
    if (inRange(n, range)) out.push(n);
  }
  return out;
}

async function modeCensus(bookFilter, range) {
  let newCount = 0, skipCount = 0, failCount = 0;
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookId !== bookFilter) continue;
    const cfg = BOOKS[bookId];
    const outDir = `${TMP}/census/${bookId}`;
    mkdirSync(outDir, { recursive: true });
    const imgDir = `${TMP}/render/${bookId}`;
    // WAVE2: دو sweep resume-safe — sweep دوم فقط واحدهای بی‌فایل را دوباره می‌کوشد (خطای گذرای 429)
    for (let sweep = 1; sweep <= 2; sweep++) {
      for (const n of unitRangeList(cfg, range)) {
        const outFile = `${outDir}/unit-${pad3(n)}.json`;
        if (existsSync(outFile) && statSync(outFile).size > 50) {
          if (sweep === 1) skipCount++;
          continue;
        }
        const pages = unitPages(bookId, n);
        const images = pages.map((p) => `${imgDir}/p-${pad3(p)}.jpg`);
        for (const img of images) {
          if (!existsSync(img)) throw new Error(`missing render: ${img}`);
        }
        const parsed = await callVision(images, censusPrompt(bookId, n), outDir);
        if (parsed) {
          save(outFile, parsed);
          newCount++;
          console.log(`census ${bookId} unit ${n} OK (${censusEntries(parsed)} entries)`);
        } else {
          failCount++;
          console.log(`census FAIL unit ${bookId} ${n} (sweep ${sweep})`);
        }
        await sleep(12000);
      }
    }
    console.log(`census ${bookId}: ${newCount} new · ${skipCount} cached · ${failCount} failed`);
  }
}

function censusEntries(parsed) {
  return Array.isArray(parsed?.entries) ? parsed.entries.length : -1;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: verify — second INDEPENDENT pass (verbatim QA, same pattern as phases 3-5/R2)
// ─────────────────────────────────────────────────────────────────────────────
function verifyPrompt(bookId, n, extracted) {
  return `You are auditing an extraction against two scanned pages (200 DPI JPEG) of the printed book "English Vocabulary in Use — ${BOOKS[bookId].label} 2nd edition", unit ${n}.

The extraction below claims to be the unit's printed vocabulary presentation (word table / word: definition list / bold headwords with bracket glosses on the LEFT page), copied VERBATIM. Verify HONESTLY, field by field, against the printed pages:
1. For each entry: is "word" exactly the printed headword? Is "pos" the printed marker (or correctly null)? Is "def" the printed English meaning EXACTLY as printed (bracket glosses including the parentheses)? Is "ipa" the printed IPA (or correctly null)? Is "example" a printed example sentence for that headword EXACTLY as printed (or correctly null)? Is "group" the printed section heading above the entry (or correctly null)?
2. List every entry of the printed presentation that is MISSING from the extraction — give its verbatim fields.
3. Flag every entry that is NOT from the printed presentation (exercise item, invented, wrong unit).

Extracted data:
${JSON.stringify(extracted)}

Required JSON (compact):
{"unit":${n},"ok":true|false,"issues":[{"type":"mismatch|missing|extra","field":"word|pos|def|ipa|example|group|entry","extracted":"...","printed":"...","note":"..."}],"missingEntries":[],"note":"short honest note"}`;
}

async function modeVerify(bookFilter, range) {
  let newCount = 0, skipCount = 0, failCount = 0;
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookId !== bookFilter) continue;
    const cfg = BOOKS[bookId];
    const outDir = `${TMP}/verify/${bookId}`;
    mkdirSync(outDir, { recursive: true });
    const imgDir = `${TMP}/render/${bookId}`;
    // WAVE2: دو sweep resume-safe — عین الگوی census (خطای گذرای 429)
    for (let sweep = 1; sweep <= 2; sweep++) {
      for (const n of unitRangeList(cfg, range)) {
        const outFile = `${outDir}/unit-${pad3(n)}.json`;
        if (existsSync(outFile) && statSync(outFile).size > 50) {
          if (sweep === 1) skipCount++;
          continue;
        }
        const census = readJson(`${TMP}/census/${bookId}/unit-${pad3(n)}.json`);
        if (!census || !Array.isArray(census.entries)) {
          if (sweep === 1) console.log(`verify SKIP unit ${bookId} ${n} — no census data`);
          continue;
        }
        const pages = unitPages(bookId, n);
        const images = pages.map((p) => `${imgDir}/p-${pad3(p)}.jpg`);
        const parsed = await callVision(images, verifyPrompt(bookId, n, census), outDir);
        if (parsed) {
          save(outFile, parsed);
          newCount++;
          console.log(`verify ${bookId} unit ${n} OK (${(parsed.issues ?? []).length} issues)`);
        } else {
          failCount++;
          console.log(`verify FAIL unit ${bookId} ${n} (sweep ${sweep})`);
        }
        await sleep(12000);
      }
    }
    console.log(`verify ${bookId}: ${newCount} new · ${skipCount} cached · ${failCount} failed`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: archive — copy current /tmp raw responses into tracked capture dirs
// (progress guard: /tmp is lost on sandbox reset — tracked capture = reproducible evidence)
// ─────────────────────────────────────────────────────────────────────────────
async function modeArchive(bookFilter) {
  let archived = 0;
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookId !== bookFilter) continue;
    mkdirSync(`${captureDir(bookId)}/census`, { recursive: true });
    mkdirSync(`${captureDir(bookId)}/verify`, { recursive: true });
    for (const kind of ["census", "verify"]) {
      const src = `${TMP}/${kind}/${bookId}`;
      if (!existsSync(src)) continue;
      for (const f of readdirSync(src)) {
        if (!f.startsWith("unit-")) continue;
        const dst = `${captureDir(bookId)}/${kind}/${f}`;
        const a = readFileSync(`${src}/${f}`);
        if (existsSync(dst) && readFileSync(dst).equals(a)) continue;
        writeFileSync(dst, a);
        archived++;
      }
    }
  }
  console.log(`archive: ${archived} files copied to tracked capture dirs`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: report — honest mismatch accounting, archive raw capture, write docs/qa JSON
// ─────────────────────────────────────────────────────────────────────────────
function norm(s) {
  if (s == null) return "";
  return String(s).replace(/\s+/g, " ").trim().toLowerCase();
}

function fieldDiff(a, b) {
  return norm(a) !== norm(b);
}

async function modeReport(bookFilter) {
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookId !== bookFilter) continue;
    const cfg = BOOKS[bookId];
    const report = {
      generatedAt: TODAY,
      book: `viu-${bookId}`,
      wave: bookId === "elem" ? "R3-wave1" : "R3-wave2",
      pipeline: "pdftoppm 200dpi + z-ai vision two-pass verbatim",
      units: {},
    };
    let unitsOk = 0, unitsWithIssues = 0, unitsFailed = 0, totalEntries = 0, totalIssues = 0, totalMissing = 0;

    for (let n = 1; n <= cfg.units; n++) {
      if (cfg.excluded.has(n)) continue;
      const census = readJson(`${TMP}/census/${bookId}/unit-${pad3(n)}.json`);
      const verify = readJson(`${TMP}/verify/${bookId}/unit-${pad3(n)}.json`);
      if (!census || !Array.isArray(census.entries)) {
        report.units[n] = { status: "census-missing" };
        unitsFailed++;
        continue;
      }
      totalEntries += census.entries.length;
      const issues = verify && Array.isArray(verify.issues) ? verify.issues : null;
      if (!verify) {
        report.units[n] = { status: "verify-missing", entries: census.entries.length };
        unitsFailed++;
        continue;
      }
      totalIssues += issues.length;
      const missingEntries = Array.isArray(verify.missingEntries) ? verify.missingEntries : [];
      totalMissing += missingEntries.length;
      const ok = verify.ok === true && issues.length === 0 && missingEntries.length === 0;
      report.units[n] = {
        status: ok ? "verified" : "issues",
        entries: census.entries.length,
        issues,
        missingEntries,
        note: verify.note ?? null,
      };
      if (ok) unitsOk++;
      else unitsWithIssues++;
    }

    report.summary = {
      unitsTotal: [...cfg.excluded].length === 0 ? cfg.units : cfg.units - cfg.excluded.size,
      unitsVerified: unitsOk,
      unitsWithIssues: unitsWithIssues,
      unitsFailed: unitsFailed,
      censusEntriesTotal: totalEntries,
      verifyIssuesTotal: totalIssues,
      missingEntriesTotal: totalMissing,
    };

    // archive raw capture (census + verify responses) into the tracked capture dir
    mkdirSync(`${captureDir(bookId)}/census`, { recursive: true });
    mkdirSync(`${captureDir(bookId)}/verify`, { recursive: true });
    let archived = 0;
    for (const kind of ["census", "verify"]) {
      const src = `${TMP}/${kind}/${bookId}`;
      if (!existsSync(src)) continue;
      for (const f of readdirSync(src)) {
        if (!f.startsWith("unit-")) continue;
        const dst = `${captureDir(bookId)}/${kind}/${f}`;
        writeFileSync(dst, readFileSync(`${src}/${f}`));
        archived++;
      }
    }
    report.captureArchived = { files: archived, dir: `docs/qa/viu-r3-capture-${cfg.captureBookDir}` };

    save(`${ROOT}/docs/qa/viu-r3-dictionary-census-${bookId}-${TODAY}.json`, report);
    console.log(`${bookId}: ${JSON.stringify(report.summary)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
const mode = process.argv[2] || "all";
const bookFilter = process.argv[3] || null;
const range = parseRange(process.argv[4]);
(async () => {
  if (mode === "render") return modeRender(bookFilter);
  if (mode === "census") return modeCensus(bookFilter, range);
  if (mode === "verify") return modeVerify(bookFilter, range);
  if (mode === "censusverify") { await modeCensus(bookFilter, range); return modeVerify(bookFilter, range); }
  if (mode === "archive") return modeArchive(bookFilter);
  if (mode === "report") return modeReport(bookFilter);
  if (mode === "all") {
    await modeRender(bookFilter);
    await modeCensus(bookFilter, range);
    await modeVerify(bookFilter, range);
    return modeReport(bookFilter);
  }
  throw new Error(`unknown mode: ${mode}`);
})();
