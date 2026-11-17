// VIU Phase R3-b — build per-book DICTIONARY from the two-pass verified census (+ honest inline-pos parse report for elem wave-1).
// Wave 1 (ELEM — DONE 2026-11-17): 60 units → 197 admitted entries.
// Wave 2 (owner approved 2026-11-17 "بله موافقم" — R3-WAVE2): --book preint | --book upper.
//
// MECHANICAL entry-level admission rules (documented, reproducible — no invention):
//   per unit, each verify issue maps DIRECTLY to a census entry by normalized field value:
//     · mismatch word/entry (extracted != null)  → entry REMOVED (word uncertainty)
//     · mismatch def                              → entry REMOVED (def uncertainty — def is the dictionary core)
//     · mismatch pos/ipa                          → that field nulled (pos-unverified) — entry kept if def intact
//     · mismatch example prefix-extension         → example replaced by the LONGER verified (printed) text
//     · mismatch example other                    → example nulled (uncertain) — entry kept if def intact
//     · type=missing issues / missingEntries      → NOT built (they are printed example lines under the table
//                                                   or real gaps; without a verified def we do NOT invent) — reported only
//     · type=extra                                → that entry REMOVED
//     · entries with no printed def               → NOT built (reported: no-printed-definition)
//   admitted entries only carry fields with two-pass evidence (census + independent verify).
//
// Honesty rules: word/def/example = exactly as printed (verbatim census), never normalized in the data;
//   pos/ipa stay EMPTY when not printed; no invented values anywhere.
//   printed "group" headings (WAVE2 census addition) are stored ONLY in the provenance report —
//   the DictEntry product contract is unchanged (word/phonetic/pos/definition/examples/lesson).
//
// Modes:
//   bun scripts/viu-r3-build.mjs --book elem     → build viu-elem dictionary (wave 1 — rerun-safe)
//   bun scripts/viu-r3-build.mjs --book preint   → build viu-preint dictionary (wave 2)
//   bun scripts/viu-r3-build.mjs --book upper    → build viu-upper dictionary (wave 2)
//   --dry                                        → compute and print stats without writing product file

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const ROOT = process.cwd();
const TMP = "/tmp/viu/r3";
const TODAY = "2026-11-17";

const BOOKS = {
  elem: {
    label: "Elementary",
    units: 60,
    excluded: new Set(),
    captureDir: "docs/qa/viu-r3-capture-elem",
    censusReport: `docs/qa/viu-r3-dictionary-census-elem-${TODAY}.json`,
    buildReport: `docs/qa/viu-r3-dictionary-build-elem-${TODAY}.json`,
    dictPath: `src/data/viu-elem/dictionary.ts`,
    wave: "R3-wave1",
    bookFa: "Elementary",
  },
  preint: {
    label: "Pre-int & Int",
    units: 100,
    excluded: new Set(),
    captureDir: "docs/qa/viu-r3-capture-preint",
    censusReport: `docs/qa/viu-r3-dictionary-census-preint-${TODAY}.json`,
    buildReport: `docs/qa/viu-r3-dictionary-build-preint-${TODAY}.json`,
    dictPath: `src/data/viu-preint/dictionary.ts`,
    wave: "R3-wave2",
    bookFa: "Pre-intermediate & Intermediate",
  },
  upper: {
    label: "Upper-int",
    units: 100,
    excluded: new Set([52]), // scan-missing 106-107 — owner-only (standing principle 4)
    captureDir: "docs/qa/viu-r3-capture-upper",
    censusReport: `docs/qa/viu-r3-dictionary-census-upper-${TODAY}.json`,
    buildReport: `docs/qa/viu-r3-dictionary-build-upper-${TODAY}.json`,
    dictPath: `src/data/viu-upper/dictionary.ts`,
    wave: "R3-wave2",
    bookFa: "Upper-Intermediate",
  },
};

const pad3 = (n) => String(n).padStart(3, "0");

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

const norm = (s) => (s == null ? "" : String(s).replace(/\s+/g, " ").trim().toLowerCase());
const isPrefix = (short, long) => {
  const a = norm(short);
  const b = norm(long);
  if (!a || !b) return false;
  return b.startsWith(a) || a.startsWith(b);
};

// ── inline-pos parse (R3-c part 1 — mechanical, from the printed word string itself) ──
// (elem wave-1 behavior preserved — only written when --book elem)
async function inlinePosParse() {
  const { VOCAB_ALL: E } = await import(`${ROOT}/src/data/viu-elem/vocab.ts`);
  const { VOCAB_ALL: P } = await import(`${ROOT}/src/data/viu-preint/vocab.ts`);
  const { VOCAB_ALL: U } = await import(`${ROOT}/src/data/viu-upper/vocab.ts`);
  const rx = /\(([^)]{1,40})\)/;
  const posOnly = (s) => /^(n|v|adj|adv|prep|conj|pron|phr|pl)\.?$/i.test(s.trim());
  const posish = (s) =>
    /^(n|v|adj|adv|prep|conj|pron|phr|sb|sth|opp|syn|pl|sing|also|informal|neg)\b[., ]?/i.test(s.trim()) ||
    /^(opp|also|informal|neg)\s/i.test(s.trim());
  const rows = [];
  for (const [name, list] of [["viu-elem", E], ["viu-preint", P], ["viu-upper", U]]) {
    for (const v of list) {
      const m = v.word.match(rx);
      if (m && posish(m[1])) {
        const inner = m[1];
        const parseablePos = posOnly(inner) ? (inner.endsWith(".") ? inner : inner + ".") : null;
        rows.push({
          book: name,
          word: v.word,
          posCurrent: v.pos ?? null,
          parenthetical: inner,
          action: !v.pos && parseablePos ? "fill-pos" : "report-only",
          filledPos: !v.pos && parseablePos ? parseablePos : null,
          note: !v.pos && !parseablePos ? "parenthetical is not a pos marker (also/informal) — left untouched" : v.pos ? "pos already present — left untouched" : null,
        });
      }
    }
  }
  return rows;
}

(async () => {
  const dry = process.argv.includes("--dry");
  const bookArg = process.argv[process.argv.indexOf("--book") + 1];
  if (!bookArg || !BOOKS[bookArg]) {
    console.error("usage: bun scripts/viu-r3-build.mjs --book elem|preint|upper [--dry]");
    process.exit(1);
  }
  const cfg = BOOKS[bookArg];
  const unitsTotal = cfg.units - cfg.excluded.size;

  const issuesByUnit = {};
  let unitsVerified = 0, unitsPartially = 0;

  const entries = [];
  const groupsByUnit = {}; // printed group headings per unit (provenance only — NOT in DictEntry)
  const provenance = {
    generatedAt: TODAY,
    book: `viu-${bookArg}`,
    wave: cfg.wave,
    source: `${cfg.censusReport} + ${cfg.captureDir}/`,
    rules: "mechanical entry-level admission (see script header)",
    units: {},
    stats: null,
  };
  let admitted = 0, removed = 0, noDef = 0, fieldNullPos = 0, fieldNullIpa = 0, exampleExtended = 0, exampleNulled = 0;

  for (let n = 1; n <= cfg.units; n++) {
    if (cfg.excluded.has(n)) continue;
    const census = readJson(`${TMP}/census/${bookArg}/unit-${pad3(n)}.json`);
    const verify = readJson(`${TMP}/verify/${bookArg}/unit-${pad3(n)}.json`);
    if (!census || !Array.isArray(census.entries) || !verify) {
      provenance.units[n] = { status: "missing-data", admitted: 0 };
      continue;
    }
    const uStats = { censusEntries: census.entries.length, admitted: 0, removed: [], noDef: [], adjusted: [], missingReported: Array.isArray(verify.missingEntries) ? verify.missingEntries.length : 0 };
    // index issues by normalized extracted value + field
    const issues = Array.isArray(verify.issues) ? verify.issues : [];
    let unitHasIssue = issues.length > 0 || (verify.missingEntries?.length ?? 0) > 0;
    for (const e of census.entries) {
      const tags = [];
      for (const i of issues) {
        if (i.type === "missing") continue; // printed example lines / gaps — reported only
        if (i.type === "extra" && i.field === "entry" && norm(i.printed ?? i.extracted) === norm(e.word)) { tags.push("extra"); continue; }
        if (i.type === "extra") continue;
        if (i.field === "entry" && norm(i.extracted) === norm(e.word)) { tags.push("entry-mismatch"); continue; }
        if (i.field === "word" && norm(i.extracted) === norm(e.word)) { tags.push("word-mismatch"); continue; }
        if (i.field === "def" && norm(i.extracted) === norm(e.def)) { tags.push(["def-mismatch", i]); continue; }
        if (i.field === "pos" && norm(i.extracted) === norm(e.pos)) { tags.push(["pos-mismatch", i]); continue; }
        if (i.field === "ipa" && norm(i.extracted) === norm(e.ipa)) { tags.push(["ipa-mismatch", i]); continue; }
        if (i.field === "example" && norm(i.extracted) === norm(e.example)) { tags.push(["example-mismatch", i]); continue; }
      }
      const hasTag = (t) => tags.some((x) => (Array.isArray(x) ? x[0] : x) === t);
      const tagOf = (t) => tags.find((x) => (Array.isArray(x) ? x[0] : x) === t);

      if (hasTag("entry-mismatch") || hasTag("word-mismatch") || hasTag("extra")) {
        removed++;
        uStats.removed.push({ word: e.word, reason: hasTag("extra") ? "verify-extra" : "word-uncertainty" });
        continue;
      }
      const defIssue = tagOf("def-mismatch");
      if (defIssue) {
        removed++;
        uStats.removed.push({ word: e.word, reason: "def-uncertainty", printed: defIssue[1].printed, extracted: defIssue[1].extracted });
        continue;
      }
      if (e.def == null || !String(e.def).trim()) {
        noDef++;
        uStats.noDef.push({ word: e.word, reason: "no-printed-definition" });
        continue;
      }
      let pos = e.pos ?? "";
      let ipa = e.ipa ?? "";
      let example = e.example ?? "";
      if (hasTag("pos-mismatch")) { pos = ""; fieldNullPos++; uStats.adjusted.push({ word: e.word, field: "pos", action: "nulled-unverified" }); }
      if (hasTag("ipa-mismatch")) { ipa = ""; fieldNullIpa++; uStats.adjusted.push({ word: e.word, field: "ipa", action: "nulled-unverified" }); }
      const exIssue = tagOf("example-mismatch");
      if (exIssue) {
        const printed = exIssue[1].printed ?? "";
        if (isPrefix(e.example, printed)) { example = printed; exampleExtended++; uStats.adjusted.push({ word: e.word, field: "example", action: "extended-to-verified-printed" }); }
        else { example = ""; exampleNulled++; uStats.adjusted.push({ word: e.word, field: "example", action: "nulled-unverified" }); }
      }
      entries.push({ word: e.word, phonetic: ipa, pos, definition: e.def, examples: example ? [example] : [], lesson: n });
      if (e.group != null && String(e.group).trim()) {
        groupsByUnit[n] = groupsByUnit[n] || [];
        groupsByUnit[n].push({ word: e.word, group: e.group });
      }
      admitted++;
      uStats.admitted++;
    }
    provenance.units[n] = { status: unitHasIssue ? (uStats.removed.length + uStats.noDef.length === 0 ? "verified-with-reported-gaps" : "partially-admitted") : "fully-verified", ...uStats };
    if (unitHasIssue) unitsPartially++;
    else unitsVerified++;
  }

  provenance.stats = {
    unitsTotal,
    unitsFullyVerified: unitsVerified,
    unitsPartially: unitsPartially,
    censusEntries: admitted + removed + noDef,
    admitted,
    removed,
    noPrintedDef: noDef,
    posNulled: fieldNullPos,
    ipaNulled: fieldNullIpa,
    exampleExtended: exampleExtended,
    exampleNulled: exampleNulled,
  };
  provenance.printedGroups = groupsByUnit; // provenance-only (R3-c analysis input) — NOT part of DictEntry

  console.log(JSON.stringify(provenance.stats));

  // ── R3-c inline-pos parse report — elem wave-1 file only (preserved byte-behavior) ──
  if (bookArg === "elem") {
    const posRows = await inlinePosParse();
    const posReport = { generatedAt: TODAY, rule: "printed parenthetical pos marker inside the word string (word string kept byte-identical — only the empty pos FIELD is filled, from the printed marker itself)", scanTotal: posRows.length, actionable: posRows.filter((r) => r.action === "fill-pos"), reportOnly: posRows.filter((r) => r.action === "report-only"), note: "roadmap audit estimated ~37 parseable cases with a wider pattern; this mechanical scan with the documented parenthesis pattern finds " + posRows.length + " — the delta is honest method difference, recorded here" };
    if (dry) {
      console.log("fill-pos:", JSON.stringify(posReport.actionable));
      return;
    }
    writeFileSync(`${ROOT}/docs/qa/viu-r3-inline-pos-parse-${TODAY}.json`, JSON.stringify(posReport));
    console.log(`written: docs/qa/viu-r3-inline-pos-parse-${TODAY}.json (fill-pos: ${posReport.actionable.length})`);
  }

  if (dry) return;

  // ── write dictionary.ts (product) ──
  const ts = `// دیکشنری Exact-Sense Curated کتاب English Vocabulary in Use — ${cfg.bookFa} (فاز R3 — ${cfg.wave === "R3-wave1" ? "موج اول ELEM" : "موج دوم"})
// منبع: جدول واژهٔ چاپی هر درس — استخراج verbatim با دوگذر مستقل (census + verify) — اسکریپت بازتولیدپذیر
//   scripts/viu-r3-dict-census.mjs (رندر 200dpi + z-ai vision) و scripts/viu-r3-build.mjs --book ${bookArg} (قواعد ورود مکانیکی)
// گزارش ممیزی: docs/qa/viu-r3-dictionary-census-${bookArg}-${TODAY}.json + docs/qa/viu-r3-dictionary-build-${bookArg}-${TODAY}.json
// کپچر خام (بازتولید بدون VLM): docs/qa/viu-r3-capture-${bookArg}/
// صداقت: word/definition/example عین چاپ کتاب — pos/phonetic فقط اگر چاپی (وگرنه خالی) — صفر مقدار ساختگی.
// مسیر ① Exact-Sense Curated طبق O1 — مسیر ② Verified Sense-Aware AI نیازمند دروازهٔ مالک است و اجرا نشده است.
import type { DictEntry } from "../types";

export const DICTIONARY: DictEntry[] = [
${entries
  .map(
    (e) => `  { word: ${JSON.stringify(e.word)}, phonetic: ${JSON.stringify(e.phonetic)}, pos: ${JSON.stringify(e.pos)}, definition: ${JSON.stringify(e.definition)}, examples: ${JSON.stringify(e.examples)}, lesson: ${e.lesson} },`
  )
  .join("\n")}
];
`;
  writeFileSync(`${ROOT}/${cfg.dictPath}`, ts);
  console.log(`written: ${cfg.dictPath} (${entries.length} entries)`);

  // ── write provenance report ──
  mkdirSync(`${ROOT}/docs/qa`, { recursive: true });
  writeFileSync(`${ROOT}/${cfg.buildReport}`, JSON.stringify(provenance));
  console.log(`written: ${cfg.buildReport}`);
})();
