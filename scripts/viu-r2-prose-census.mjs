// VIU Phase R2-a/R2-b — prose census + two-pass verification for the no-paragraph lessons.
// Owner mandate (trace 1a1ea4c36ad93c9): "برو سراغ فاز بعدی نقشه راه" — next phase after R1 = R2
// (roadmap: نقشه-راه-کیفیت-استخراج-سه-کتاب-VIU-2026-11-16.md §بخش ۳ فاز R2).
//
// R2-a prose census: for the 52 lessons whose Reading record has ZERO paragraphs
//   (elem 30/36/56/58 · preint 21 · upper 27), determine honestly whether the printed
//   unit pages contain presentation prose (numbered example sentences / short dialogues /
//   definition sentences / reading passages — the teaching content, NOT exercise
//   instructions/items which are already captured) or are inherently exercise-only.
//   Upper lesson 52 is EXCLUDED (whole unit missing from the scan, book pages 106-107 —
//   owner-only supply, standing principle 4).
//
// R2-b capture: when the census finds prose, the same pass extracts it verbatim and a
//   second independent VLM pass verifies every line verbatim against the pages
//   (بازخوانی دوگذر — same two-pass QA pattern as phases 3-5).
//
// Pipeline (same as phases 1/3-5 — PDF has ZERO text layer):
//   pdftoppm 200 DPI JPEG renders → vision model via CLI `z-ai vision`.
//
// Honesty rules (roadmap principles): English text = exactly as printed (never invented);
// fa = GLM machine translation, class FA-NEW (added later by viu-r2-build.mjs);
// nothing here touches product code/data/db — reads renders, writes /tmp JSON + final report.
//
// Modes:
//   bun scripts/viu-r2-prose-census.mjs render              → render needed pages (skip existing)
//   bun scripts/viu-r2-prose-census.mjs census [book]       → census pass (resume-safe)
//   bun scripts/viu-r2-prose-census.mjs verify [book]       → two-pass verbatim QA (resume-safe)
//   bun scripts/viu-r2-prose-census.mjs report              → assemble docs/qa JSON
//   bun scripts/viu-r2-prose-census.mjs all                 → render+census+verify+report

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, statSync, mkdirSync, readdirSync, renameSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad3 = (n) => String(n).padStart(3, "0");

const ROOT = process.cwd();
const TMP = "/tmp/viu/r2";

const BOOKS = {
  elem: {
    label: "Elementary",
    pdf: `${ROOT}/upload/Vocabulary In Use-Elementary 2nd Edition.pdf`,
    sha256: "35ea1b5be92eef4ceed99e7a59fad3099e36c85673b88f3de9c25c2921cd51ab",
    phaseDir: `${ROOT}/docs/qa/viu-phase3-elem`,
    units: 60,
    leftPage: (n) => 2 * n + 7,
    rightMissing: new Set(),
  },
  preint: {
    label: "Pre-int & Int",
    pdf: `${ROOT}/upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf`,
    sha256: "0dfdab2ef0730596b56a9a95b534846610319b0bee7f1091233f360178f91a1f",
    phaseDir: `${ROOT}/docs/qa/viu-phase4-preint`,
    units: 100,
    leftPage: (n) => 2 * n + 9,
    rightMissing: new Set(),
  },
  upper: {
    label: "Upper-int",
    pdf: `${ROOT}/upload/Vocabulary In Use-Upper Intermediate 2nd Edition.pdf`,
    sha256: "415fc9856e16afb7460376bca5897c894234cffec9e4af0ebb044b93cde6dd13",
    phaseDir: `${ROOT}/docs/qa/viu-phase5-upper`,
    units: 100,
    // proven bands (phase-1 audit §G/§H): scan-missing book pages 35 · 106-107 (unit 52) · 280
    leftPage: (n) => (n <= 16 ? 2 * n + 7 : n <= 51 ? 2 * n + 6 : 2 * n + 4),
    rightMissing: new Set([16]), // unit 16 right (book 35) MISSING
    excluded: new Set([52]), // unit 52 COMPLETELY MISSING from the scan — owner-only
  },
};

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

// ── no-prose lesson list from the committed phase JSONs (ground truth) ────────
function noProseLessons(bookId) {
  const cfg = BOOKS[bookId];
  const out = [];
  for (let n = 1; n <= cfg.units; n++) {
    if (cfg.excluded?.has(n)) continue;
    const rec = readJson(`${cfg.phaseDir}/unit-${pad3(n)}.json`);
    if (!rec) continue;
    const lines = (rec.lines || []).filter((l) => l && typeof l.en === "string" && l.en.trim());
    if (lines.length === 0) out.push(n);
  }
  return out;
}

function unitPages(bookId, n) {
  const cfg = BOOKS[bookId];
  const left = cfg.leftPage(n);
  const pages = [left];
  if (!cfg.rightMissing.has(n)) pages.push(left + 1);
  return pages;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: render
// ─────────────────────────────────────────────────────────────────────────────
// pdftoppm always appends the page number to the output name (e.g. prefix-067.jpg) —
// normalize to a stable `p-NNN.jpg` name so census/verify can find renders.
function normalizeRenderNames(imgDir) {
  if (!existsSync(imgDir)) return;
  for (const f of readdirSync(imgDir)) {
    const m = f.match(/^p-(\d+)-\d+\.jpg$/);
    if (m && !existsSync(`${imgDir}/p-${m[1]}.jpg`)) {
      renameSync(`${imgDir}/${f}`, `${imgDir}/p-${m[1]}.jpg`);
    }
  }
}

async function modeRender() {
  for (const bookId of Object.keys(BOOKS)) {
    const cfg = BOOKS[bookId];
    const imgDir = `${TMP}/render/${bookId}`;
    mkdirSync(imgDir, { recursive: true });
    normalizeRenderNames(imgDir);
    const lessons = noProseLessons(bookId);
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
    console.log(`render ${bookId}: ${lessons.length} lessons · ${need.size} pages · ${done} rendered now`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VLM call (same pattern as phases 3-5 extract scripts)
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
  const backoffs = [0, 20000, 45000];
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
// MODE: census
// ─────────────────────────────────────────────────────────────────────────────
function censusPrompt(bookId, n) {
  return `You are auditing two scanned pages (200 DPI JPEG) of the printed book "English Vocabulary in Use — ${BOOKS[bookId].label} 2nd edition", unit ${n}.

This unit was previously extracted. Its EXERCISES (right page: numbered instructions, items, word banks) were already captured separately. Its PRESENTATION PROSE was captured as EMPTY — this audit checks whether that was correct.

TASK — look at BOTH pages and answer honestly:
1. Does the unit contain printed PRESENTATION PROSE: numbered example sentences, short dialogues, definition/example sentences, or a reading passage that TEACHES vocabulary in context?
   - NOT exercise instructions/items (right-page numbered exercises are already captured — exclude them).
   - NOT bare tables, diagram labels or word lists alone (a table WITHOUT example sentences under/near it is NOT prose).
2. If YES: extract every prose passage VERBATIM, in printed order, keeping the printed numbering exactly as printed. English text must be copied exactly as printed — NEVER invented or normalized. If a string is unreadable, use null for it.
3. If NO: say why in one short note (e.g. "diagram + exercises only", "word table without example sentences").

Required JSON (compact, no newlines inside strings except necessary):
{"unit":${n},"hasProse":true|false,"prose":[{"en":"..."}],"note":"..."}`;
}

async function modeCensus(bookFilter) {
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookFilter !== bookId) continue;
    const cfg = BOOKS[bookId];
    const outDir = `${TMP}/census/${bookId}`;
    mkdirSync(outDir, { recursive: true });
    const imgDir = `${TMP}/render/${bookId}`;
    const lessons = noProseLessons(bookId);
    let done = 0;
    for (const n of lessons) {
      const out = `${outDir}/unit-${pad3(n)}.json`;
      if (existsSync(out)) {
        const prev = readJson(out);
        if (prev && !prev.failed) continue;
      }
      const images = unitPages(bookId, n).map((p) => `${imgDir}/p-${pad3(p)}.jpg`);
      if (images.some((f) => !existsSync(f))) {
        console.log(`census ${bookId} u${n}: RENDER MISSING — skipping (run render mode)`);
        continue;
      }
      const res = await callVision(images, censusPrompt(bookId, n), outDir);
      if (!res || typeof res.hasProse !== "boolean") {
        save(out, { unit: n, failed: true });
        console.log(`census ${bookId} u${n}: FAILED (will retry on next run)`);
        continue;
      }
      const prose = Array.isArray(res.prose)
        ? res.prose.filter((p) => p && typeof p.en === "string" && p.en.trim()).map((p) => ({ en: p.en.trim() }))
        : [];
      save(out, { unit: n, hasProse: !!res.hasProse, prose, note: typeof res.note === "string" ? res.note : "" });
      done++;
      console.log(`census ${bookId} u${n}: hasProse=${res.hasProse} lines=${prose.length}${res.note ? " · " + res.note : ""}`);
      await sleep(1500);
    }
    console.log(`census ${bookId}: ${done} new verdicts (lessons=${lessons.length})`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: verify (two-pass verbatim QA — only for hasProse lessons)
// ─────────────────────────────────────────────────────────────────────────────
function verifyPrompt(bookId, n, prose) {
  return `You are verifying a prose extraction against the same two scanned pages (200 DPI JPEG) of "English Vocabulary in Use — ${BOOKS[bookId].label} 2nd edition", unit ${n}.

FIRST PASS extracted these presentation-prose lines (JSON):
${JSON.stringify(prose)}

TASK — read the pages and check EVERY extracted line:
1. For each line: does it appear VERBATIM on the pages (same words, spelling, punctuation, printed numbering)? Minor OCR differences in obvious scan artifacts may be noted but must be reported.
2. Report any ADDITIONAL presentation prose on the pages that the first pass MISSED (extraLines, verbatim).
3. English text must be copied exactly — NEVER invented.

Required JSON (compact):
{"unit":${n},"ok":true|false,"mismatches":[{"index":1,"reason":"..."}],"extraLines":[{"en":"..."}]}`;
}

async function modeVerify(bookFilter) {
  for (const bookId of Object.keys(BOOKS)) {
    if (bookFilter && bookFilter !== bookId) continue;
    const cfg = BOOKS[bookId];
    const censusDir = `${TMP}/census/${bookId}`;
    const outDir = `${TMP}/verify/${bookId}`;
    mkdirSync(outDir, { recursive: true });
    const imgDir = `${TMP}/render/${bookId}`;
    const lessons = noProseLessons(bookId).filter((n) => {
      const c = readJson(`${censusDir}/unit-${pad3(n)}.json`);
      return c && !c.failed && c.hasProse && Array.isArray(c.prose) && c.prose.length > 0;
    });
    let done = 0;
    for (const n of lessons) {
      const out = `${outDir}/unit-${pad3(n)}.json`;
      if (existsSync(out)) {
        const prev = readJson(out);
        if (prev && !prev.failed) continue;
      }
      const c = readJson(`${censusDir}/unit-${pad3(n)}.json`);
      const images = unitPages(bookId, n).map((p) => `${imgDir}/p-${pad3(p)}.jpg`);
      const res = await callVision(images, verifyPrompt(bookId, n, c.prose), outDir);
      if (!res || typeof res.ok !== "boolean") {
        save(out, { unit: n, failed: true });
        console.log(`verify ${bookId} u${n}: FAILED (will retry on next run)`);
        continue;
      }
      save(out, {
        unit: n,
        ok: !!res.ok,
        mismatches: Array.isArray(res.mismatches) ? res.mismatches : [],
        extraLines: Array.isArray(res.extraLines)
          ? res.extraLines.filter((p) => p && typeof p.en === "string" && p.en.trim()).map((p) => ({ en: p.en.trim() }))
          : [],
      });
      done++;
      console.log(`verify ${bookId} u${n}: ok=${res.ok} mismatches=${(res.mismatches || []).length} extra=${(res.extraLines || []).length}`);
      await sleep(1500);
    }
    console.log(`verify ${bookId}: ${done} new verdicts (prose lessons=${lessons.length})`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE: report — assemble the committed docs/qa JSON
// ─────────────────────────────────────────────────────────────────────────────
function modeReport() {
  const generated = "2026-11-17";
  const books = {};
  const summary = { censusLessons: 0, proseFound: [], inherentlyNoProse: [], failed: [], excluded: [] };
  for (const [bookId, cfg] of Object.entries(BOOKS)) {
    const excluded = [...(cfg.excluded || [])];
    const lessons = noProseLessons(bookId);
    const census = [];
    for (const n of lessons) {
      const c = readJson(`${TMP}/census/${bookId}/unit-${pad3(n)}.json`);
      const v = readJson(`${TMP}/verify/${bookId}/unit-${pad3(n)}.json`);
      const rec = {
        unit: n,
        pages: unitPages(bookId, n),
        title: readJson(`${cfg.phaseDir}/unit-${pad3(n)}.json`)?.title ?? null,
        hasProse: c ? !!c.hasProse : null,
        lines: c && Array.isArray(c.prose) ? c.prose.length : null,
        note: c?.note ?? null,
        verified: v ? !!v.ok : null,
        mismatches: v?.mismatches ?? null,
        extraLines: v?.extraLines ?? null,
        failed: c?.failed === true || v?.failed === true,
      };
      census.push(rec);
      summary.censusLessons++;
      if (rec.failed) summary.failed.push(`${bookId}#${n}`);
      else if (rec.hasProse) summary.proseFound.push(`${bookId}#${n}`);
      else summary.inherentlyNoProse.push(`${bookId}#${n}`);
    }
    books[bookId] = {
      label: cfg.label,
      pdfSha256: cfg.sha256,
      excludedOwnerOnly: excluded.map((n) => ({ unit: n, reason: "missingInScan book pages 106-107 — owner-only supply (standing principle 4)" })),
      lessons: census,
    };
  }
  const outPath = `${ROOT}/docs/qa/viu-r2-prose-census-2026-11-17.json`;
  save(outPath, { generated, method: "pdftoppm 200dpi + z-ai vision — census pass + independent two-pass verbatim QA (بازخوانی دوگذر)", summary, books });
  console.log(`report → ${outPath}`);
  console.log(`summary: census=${summary.censusLessons} proseFound=${summary.proseFound.length} inherentlyNoProse=${summary.inherentlyNoProse.length} failed=${summary.failed.length}`);
}

const MODE = process.argv[2] || "all";
const FILTER = process.argv[3] || "";

async function main() {
  if (MODE === "render") await modeRender();
  else if (MODE === "census") await modeCensus(FILTER);
  else if (MODE === "verify") await modeVerify(FILTER);
  else if (MODE === "report") modeReport();
  else if (MODE === "all") {
    await modeRender();
    await modeCensus(FILTER);
    await modeVerify(FILTER);
    modeReport();
  } else {
    console.log("modes: render | census [book] | verify [book] | report | all");
  }
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
