// VIU Phase R2-b — surgical build: add verified printed prose to the no-paragraph lessons.
// Owner mandate (trace 1a1ea4c36ad93c9): next roadmap phase = R2 (بستن شکاف نثر Context).
//
// Inputs:
//   docs/qa/viu-r2-prose-census-2026-11-17.json   (census + two-pass verification — R2-a)
//   /tmp/viu/r2-census/{book}/unit-NNN.json       (verbatim prose capture per lesson)
//   /tmp/viu/r2-fa/{book}-fa-cache.json           (resume-safe GLM fa cache — built here)
//
// Target lessons: hasProse=true · verified=true · zero mismatches · ≥1 prose line AFTER
//   the mechanical honesty guards (see below). Lessons with verification mismatches are
//   EXCLUDED honestly (details stay in the committed census JSON for owner review).
//   extraLines from the verify pass are NOT added (not themselves two-pass verified).
//
// Mechanical honesty guards (reproducible — full provenance written to
//   docs/qa/viu-r2-prose-guards-2026-11-17.json BEFORE any patch):
//   a prose line is DROPPED when it (a) duplicates an exercise instruction/item/option/bank
//   of the same lesson already captured in the committed phase JSON (equal or contains an
//   exercise text ≥30 normalized chars), (b) contains a "________" gap (exercise item
//   pattern), or (c) starts with printed exercise numbering "N.N" (e.g. "30.1").
//   Guards prevent over-capture (prose labeled on exercise content) — presentation
//   numbering ("1", "2"…), dialogue lines and example sentences are kept.
//
// What this script changes — and only this:
//   src/data/viu-{book}/readings-part-N.ts : the `paragraphs: [],` of a target lesson
//   becomes the verified prose paragraphs array. Every other byte of every file is
//   untouched (surgical text replace on the lesson object found by its `id:` anchor).
//   fa = GLM machine translation, class FA-NEW (same class as ALL existing viu fa) —
//   en = verbatim printed text from the census (never invented).
//
// No db change (readings are src/data only) · no quiz/vocab/WAVE2/hook change.
// Run: bun scripts/viu-r2-build.mjs            (patch + fa)
//      bun scripts/viu-r2-build.mjs --dry     (show plan only, no writes)

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad3 = (n) => String(n).padStart(3, "0");
const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const CENSUS = `${ROOT}/docs/qa/viu-r2-prose-census-2026-11-17.json`;
const GUARDS_OUT = `${ROOT}/docs/qa/viu-r2-prose-guards-2026-11-17.json`;
const FA_DIR = "/tmp/viu/r2-fa";

const PHASE_DIRS = {
  elem: `${ROOT}/docs/qa/viu-phase3-elem`,
  preint: `${ROOT}/docs/qa/viu-phase4-preint`,
  upper: `${ROOT}/docs/qa/viu-phase5-upper`,
};

// committed per-lesson capture (census + verify + fa cache) — reproduces the wave from
// a fresh Clone without re-running any VLM call; /tmp copies kept as runtime fallback
function capturePath(bookId, kind, unit) {
  const base = `${ROOT}/docs/qa/viu-r2-capture-${bookId}`;
  const name = kind === "verify" ? `verify-unit-${pad3(unit)}.json` : `unit-${pad3(unit)}.json`;
  const committed = `${base}/${name}`;
  if (existsSync(committed)) return committed;
  return `${TMP}/${kind}/${bookId}/unit-${pad3(unit)}.json`;
}

const BOOKS = {
  elem: { label: "Elementary", dataDir: `${ROOT}/src/data/viu-elem` },
  preint: { label: "Pre-int & Int", dataDir: `${ROOT}/src/data/viu-preint` },
  upper: { label: "Upper-int", dataDir: `${ROOT}/src/data/viu-upper` },
};

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

// ── mechanical honesty guards ─────────────────────────────────────────────────
function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function exerciseTexts(rec) {
  const texts = [];
  for (const ex of rec.exercises || []) {
    if (typeof ex?.instr === "string" && ex.instr.trim()) texts.push(ex.instr);
    for (const it of ex?.items || []) {
      if (typeof it?.en === "string" && it.en.trim()) texts.push(it.en);
      if (Array.isArray(it?.opts)) for (const o of it.opts) if (typeof o === "string" && o.trim()) texts.push(o);
    }
    if (Array.isArray(ex?.bank)) for (const b of ex.bank) if (typeof b === "string" && b.trim()) texts.push(b);
  }
  return texts.map(norm).filter(Boolean);
}

function guardLine(en, exTexts) {
  const n = norm(en);
  if (!n) return "empty";
  if (en.includes("________")) return "gap-item-pattern";
  if (/^\s*\d+\.\d+\s/.test(en)) return "exercise-numbering";
  for (const t of exTexts) {
    if (n === t) return "duplicate-exercise-text";
    if (t.length >= 30 && n.includes(t)) return "contains-exercise-text";
  }
  return null;
}

// ── fa translation (GLM via z-ai chat — same pattern as phase builds) ─────────
function extractJsonObj(text) {
  const s = text.indexOf("{");
  const e = text.lastIndexOf("}");
  if (s === -1 || e <= s) return null;
  try {
    return JSON.parse(text.slice(s, e + 1));
  } catch {
    return null;
  }
}

async function translateBatch(items) {
  const prompt =
    `Translate these ${items.length} English strings to natural Persian (Farsi). These are printed presentation prose lines from an English vocabulary textbook (example sentences, short dialogues, definition sentences). Return ONLY a compact JSON object mapping each id to its Persian translation: {"${items[0].id}":"…",…}. Keep blanks "________" unchanged. Do NOT include any leading printed sentence numbers in the Persian translation (translate the sentence content only). Never omit any id.`;
  const body = items.map((it) => `${it.id}: ${it.en}`).join("\n");
  const args = ["chat", "-p", `${prompt}\n\n${body}`, "-o", `${FA_DIR}/_last_chat.json`];
  const backoffs = [0, 30000, 60000, 90000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 420000 });
      const raw = readJson(`${FA_DIR}/_last_chat.json`);
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const obj = extractJsonObj(content);
      if (obj) return obj;
    } catch {
      /* retry */
    }
  }
  return null;
}

async function translateSingle(en) {
  const prompt =
    `Translate this English string to natural Persian (Farsi). It is a printed presentation prose line from an English vocabulary textbook (example sentence, short dialogue, or definition sentence). Return ONLY a compact JSON object: {"t0":"…"}. Keep blanks "________" unchanged. Do NOT include any leading printed sentence numbers in the Persian translation.`;
  const args = ["chat", "-p", `${prompt}\n\nt0: ${en}`, "-o", `${FA_DIR}/_last_chat.json`];
  const backoffs = [0, 30000, 60000, 90000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 420000 });
      const raw = readJson(`${FA_DIR}/_last_chat.json`);
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const obj = extractJsonObj(content);
      if (obj && typeof obj.t0 === "string" && obj.t0.trim()) return obj.t0.trim();
    } catch {
      /* retry */
    }
  }
  return null;
}

async function ensureFa(bookId, strings) {
  mkdirSync(FA_DIR, { recursive: true });
  const cachePath = `${FA_DIR}/${bookId}-fa-cache.json`;
  // seed from the committed capture fa-cache first (clone reproducibility), then tmp
  const committed = readJson(`${ROOT}/docs/qa/viu-r2-capture-${bookId}/fa-cache.json`) || {};
  const cache = Object.assign({}, committed, existsSync(cachePath) ? readJson(cachePath) || {} : {});
  const todo = [...new Set(strings)].filter((s) => s && !(s in cache));
  console.log(`fa ${bookId}: ${todo.length} strings to translate (cache ${Object.keys(cache).length})`);
  const BATCH = 20;
  const MAX_ROUNDS = 3; // per-batch resilient retry with cooldown (transient GLM failures)
  const refused = []; // lines GLM refuses (e.g. printed slang vocabulary) — excluded honestly
  for (let i = 0; i < todo.length; i += BATCH) {
    const items = todo.slice(i, i + BATCH).map((en, k) => ({ id: `t${i + k}`, en }));
    let map = null;
    for (let round = 1; round <= MAX_ROUNDS; round++) {
      if (round > 1) {
        console.log(`fa ${bookId} batch ${i / BATCH}: cooldown before retry #${round}`);
        await sleep(120000);
      }
      map = await translateBatch(items);
      if (map) break;
    }
    if (!map) {
      // batch-level failure → per-item fallback (a single refused string can poison a batch)
      console.log(`fa ${bookId} batch ${i / BATCH}: falling back to single-string translation`);
      for (const it of items) {
        const fa = await translateSingle(it.en);
        if (fa) cache[it.en] = fa;
        else refused.push(it.en);
      }
      writeFileSync(cachePath, JSON.stringify(cache));
      continue;
    }
    items.forEach((it) => {
      const fa = map[it.id];
      if (typeof fa === "string" && fa.trim()) cache[it.en] = fa.trim();
      else refused.push(it.en);
    });
    writeFileSync(cachePath, JSON.stringify(cache));
  }
  return { cache, failed: false, refused };
}

// ── surgical patch ────────────────────────────────────────────────────────────
function buildParagraphsArray(lines, faCache, bookId) {
  const entries = lines.map((l) => {
    const fa = faCache[l.en];
    if (typeof fa !== "string" || !fa.trim()) {
      throw new Error(`missing fa for ${bookId} line: ${l.en.slice(0, 60)}…`);
    }
    return `      {\n        en: ${JSON.stringify(l.en)},\n        fa: ${JSON.stringify(fa)}\n      }`;
  });
  return `    paragraphs: [\n${entries.join(",\n")}\n    ],`;
}

function patchLesson(bookId, unit, proseLines, faCache, initialText) {
  const dir = BOOKS[bookId].dataDir;
  const partFiles = readdirSync(dir).filter((f) => /^readings-part-\d+\.ts$/.test(f)).sort();
  const anchor = `id: "viu-${bookId}-l${unit}",`;
  for (const f of partFiles) {
    const path = `${dir}/${f}`;
    const text = initialText ?? readFileSync(path, "utf8");
    const idx = text.indexOf(anchor);
    if (idx === -1) continue;
    // the marker search is BOUNDED to this lesson's own record — the record ends at
    // the next lesson's `    id:` anchor. Without the bound, an already-patched lesson
    // would let the search spill into the NEXT record's empty marker (duplication bug).
    const nextId = text.indexOf('    id: "viu-', idx + anchor.length);
    const recordEnd = nextId === -1 ? text.length : nextId;
    const record = text.slice(idx, recordEnd);
    const emptyMarker = "    paragraphs: [],";
    const pIdx = record.indexOf(emptyMarker);
    if (pIdx === -1) {
      if (record.includes("    paragraphs: [")) return { file: f, status: "already-patched" };
      return { file: f, status: "unexpected-structure" };
    }
    const arr = buildParagraphsArray(proseLines, faCache, bookId);
    const abs = idx + pIdx;
    const patched = text.slice(0, abs) + arr + text.slice(abs + emptyMarker.length);
    return { file: f, status: "patched", path, patched };
  }
  return { file: null, status: "record-not-found" };
}

async function main() {
  const report = readJson(CENSUS);
  if (!report) {
    console.error(`census report missing: ${CENSUS}`);
    process.exit(1);
  }
  // 1) select targets from the committed report
  const targets = [];
  for (const [bookId, book] of Object.entries(report.books)) {
    for (const rec of book.lessons) {
      if (rec.failed) continue;
      if (rec.hasProse && rec.verified && (rec.mismatches?.length ?? 0) === 0 && (rec.lines ?? 0) > 0) {
        targets.push({ bookId, unit: rec.unit });
      }
    }
  }
  console.log(`targets from report: ${targets.map((t) => `${t.bookId}#${t.unit}`).join(", ") || "(none)"}`);

  // 2) verbatim prose capture (resume-safe tmp census files) + mechanical guards
  const keptBy = new Map();
  const guardsLog = { generated: "2026-11-17", method: "mechanical honesty guards — duplicate/gap/numbering patterns vs committed phase exercise texts", books: {} };
  for (const t of targets) {
    const tmp = readJson(capturePath(t.bookId, "census", t.unit));
    if (!tmp || !Array.isArray(tmp.prose) || tmp.prose.length === 0) continue;
    const phaseRec = readJson(`${PHASE_DIRS[t.bookId]}/unit-${pad3(t.unit)}.json`);
    const exTexts = exerciseTexts(phaseRec || {});
    const kept = [];
    const dropped = [];
    for (const p of tmp.prose) {
      const rule = guardLine(p.en, exTexts);
      if (rule) dropped.push({ en: p.en, rule });
      else kept.push(p);
    }
    // multi-line captures (section blocks) split into separate paragraph lines —
    // matches the existing readings-part style (one printed line = one paragraph)
    const keptSplit = kept
      .flatMap((l) => l.en.split(/\n+/).map((s) => s.trim()).filter(Boolean))
      .map((en) => ({ en }));
    keptBy.set(`${t.bookId}#${t.unit}`, keptSplit);
    guardsLog.books[t.bookId] = guardsLog.books[t.bookId] || {};
    guardsLog.books[t.bookId][String(t.unit)] = {
      captured: tmp.prose.length,
      kept: kept.length,
      keptAfterSplit: keptSplit.length,
      dropped,
    };
    console.log(`  capture ${t.bookId}#${t.unit}: ${tmp.prose.length} captured → ${kept.length} kept → ${keptSplit.length} after split · ${dropped.length} dropped`);
  }
  mkdirSync(`${ROOT}/docs/qa`, { recursive: true });
  writeFileSync(GUARDS_OUT, JSON.stringify(guardsLog));
  console.log(`guards provenance → ${GUARDS_OUT}`);

  const effective = targets.filter((t) => (keptBy.get(`${t.bookId}#${t.unit}`)?.length ?? 0) > 0);
  const missing = effective.filter((t) => !keptBy.has(`${t.bookId}#${t.unit}`));
  if (missing.length) {
    console.error(`MISSING prose capture for: ${missing.map((m) => `${m.bookId}#${m.unit}`).join(", ")}`);
    process.exit(1);
  }
  const preFaEffectiveCount = effective.length;
  console.log(`targets surviving guards: ${preFaEffectiveCount}`);

  if (DRY) {
    console.log(`dry-run: would patch up to ${preFaEffectiveCount} lessons · fa strings=${[...keptBy.values()].reduce((s, v) => s + v.length, 0)}`);
    return;
  }

  // 3) fa translations (per book, resume-safe caches) — refused lines excluded honestly
  const faCaches = new Map();
  let anyRefused = false;
  for (const bookId of Object.keys(BOOKS)) {
    const strings = effective
      .filter((t) => t.bookId === bookId)
      .flatMap((t) => keptBy.get(`${bookId}#${t.unit}`).map((p) => p.en));
    if (strings.length === 0) continue;
    const { cache, refused } = await ensureFa(bookId, strings);
    faCaches.set(bookId, cache);
    for (const en of refused) {
      anyRefused = true;
      console.log(`fa ${bookId}: REFUSED — excluding line honestly: ${en.slice(0, 70)}…`);
      for (const [key, lines] of [...keptBy]) {
        if (!key.startsWith(`${bookId}#`)) continue;
        const filtered = lines.filter((l) => l.en !== en);
        keptBy.set(key, filtered);
        const unit = key.split("#")[1];
        const gl = guardsLog.books[bookId]?.[unit];
        if (gl) {
          gl.refused = gl.refused || [];
          gl.refused.push(en);
          gl.keptAfterSplit = filtered.length;
        }
      }
    }
  }
  if (anyRefused) {
    writeFileSync(GUARDS_OUT, JSON.stringify(guardsLog));
    console.log(`guards provenance updated (refusals) → ${GUARDS_OUT}`);
  }

  // 4) final target set (after guards AND refusals)
  const finalTargets = effective.filter((t) => (keptBy.get(`${t.bookId}#${t.unit}`)?.length ?? 0) > 0);
  const emptied = effective.filter((t) => !finalTargets.includes(t));
  if (emptied.length) console.log(`honestly excluded after fa refusals: ${emptied.map((t) => `${t.bookId}#${t.unit}`).join(", ")}`);
  if (finalTargets.length === 0) {
    console.log("nothing to patch — stop rule 1 (no printed prose survives guards) — honest outcome");
    return;
  }
  console.log(`final wave: ${finalTargets.map((t) => `${t.bookId}#${t.unit}`).join(", ")}`);

  // 5) surgical patch — sequential in-memory staging (multiple patches to the same
  //    part file compose); write only after every target resolved cleanly
  const pending = new Map(); // path → full file text (with all earlier patches applied)
  const staged = [];
  for (const t of finalTargets) {
    const prose = keptBy.get(`${t.bookId}#${t.unit}`);
    // locate the owning file from disk state; the actual merge applies against the
    // latest pending base so consecutive patches to the same part file compose
    const res = patchLesson(t.bookId, t.unit, prose, faCaches.get(t.bookId), undefined);
    if (res.status === "patched") {
      const path = res.path;
      const base = pending.get(path) ?? readFileSync(path, "utf8");
      // re-apply on top of the pending base — SAME record-bounded rule as patchLesson
      const anchor = `id: "viu-${t.bookId}-l${t.unit}",`;
      const idx = base.indexOf(anchor);
      if (idx === -1) {
        console.error(`aborting — anchor lost in staged base for ${t.bookId}#${t.unit}`);
        process.exit(1);
      }
      const nextId = base.indexOf('    id: "viu-', idx + anchor.length);
      const recordEnd = nextId === -1 ? base.length : nextId;
      const record = base.slice(idx, recordEnd);
      const marker = "    paragraphs: [],";
      const pIdx = record.indexOf(marker);
      if (pIdx === -1) {
        console.error(`aborting — empty paragraphs marker not found within record for ${t.bookId}#${t.unit}`);
        process.exit(1);
      }
      const arr = buildParagraphsArray(prose, faCaches.get(t.bookId), t.bookId);
      const abs = idx + pIdx;
      const merged = base.slice(0, abs) + arr + base.slice(abs + marker.length);
      pending.set(path, merged);
      staged.push({ ...t, path, paragraphs: prose.length });
      console.log(`patch ${t.bookId} u${t.unit}: staged (${res.file} · ${prose.length} paragraphs)`);
    } else if (res.status === "already-patched") {
      console.log(`patch ${t.bookId} u${t.unit}: already-patched (kept)`);
    } else {
      console.log(`patch ${t.bookId} u${t.unit}: ${res.status} (${res.file ?? "-"})`);
      if (["record-not-found", "unexpected-structure"].includes(res.status)) {
        console.error("aborting — no file written (atomicity)");
        process.exit(1);
      }
    }
  }
  for (const [path, text] of pending) writeFileSync(path, text);
  console.log(`done: ${staged.length} lessons patched (write phase · ${pending.size} files written)`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
