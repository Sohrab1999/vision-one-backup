// VIU R3-d (motive 2) — mechanical word-family builder for viu-upper word formation lessons
// (NO VLM — pure tracked-data analysis; reproducible from Clone alone).
// Roadmap R3-d remainder (ثبت سربرگ ۹۱مین): «word family درس‌های word formation Upper —
//   census موج دوم کامل شد — دادهٔ census group در پروونانس آماده — گام بعدی مجاز».
// Scope (honest, printed-only): viu-upper units 8 (suffixes) / 9 (prefixes) / 10 (roots+word families) —
//   the book's word formation lessons. Units 16 (abbreviations) and 100 (signs/notices) are NOT
//   word formation and are excluded. Unit 22 (-ever) is a grammar row, excluded.
// Sources (all tracked): docs/qa/viu-r3-capture-upper/census/unit-008.json / -009 / -010
//   — verbatim two-pass census captures (census + verify — zero FAIL, سربرگ ۹۱مین).
// Mechanism (analogous to R3-d verb-table link, scripts/viu-r3-d-verb-links.mjs):
//   the printed affix/root rows are keyed into word-lookup.tsx LookupMaps.family — clicking ANY
//   printed family member (or its inflection-stripped variant, same rules as the popup's own
//   morphological simplification) inside any lesson's English text surfaces the printed row in
//   the popup block «خانوادهٔ واژه — جدول word formation کتاب» (read-only, zero store writes).
// Member extraction rules (conservative — zero invention, precision over recall):
//   units 8/9 → members come ONLY from the printed example string of the affix row:
//     1) balanced (...) and [...] segments are removed (glosses like «[can be eaten]», «(nouns)»);
//     2) if a residual bracket char remains (OCR damage), the whole comma-segment containing it
//        is DROPPED and disclosed verbatim in the report (e.g. unit 8 «-ise (or -ize)» — the
//        damaged segment «e.g. modernise ake modern]» is dropped; real member «modernise» is
//        therefore NOT admitted — honest cost, disclosed);
//     3) tokens split on whitespace and slashes (printed pairs like «employer/employee»);
//     4) accepted only if /^[A-Za-z][A-Za-z'-]*[A-Za-z]$/ and length ≥ 3 and not a meta token
//        (e.g./i.e.); everything else is disclosed as skipped-nonword in the report;
//   unit 10 → members come ONLY from census group field (printed layout): entries whose group
//     equals a root row's word are members of that root (18 members, each with its own printed
//     example sentence). The 18 word-class rows (verb/person noun/adjective/abstract noun) are
//     printed members of the word-family table themselves — each becomes its own row keyed by
//     its own word; root↔word-class association is NOT encoded in the census group field and is
//     therefore NOT derived (zero invention).
// Keys per member = the member verbatim + the inflection-stripped variants computed with the
//   SAME rules the popup uses for morphological simplification (-s/-es/-ies/-ed/-ing) — mirrors
//   the verb-table keying (went → go). Collisions across rows: first wins, disclosed.
// Outputs:
//   src/data/viu-upper/word-families.ts                 — generated data (tracked)
//   docs/qa/viu-r3-d-wordfamily-upper-2026-11-19.json   — mechanical evidence report (tracked)
// Mode: bun scripts/viu-r3-d-wordfamily-upper.mjs
import { writeFileSync, readFileSync } from "node:fs";

const ROOT = process.cwd();
const TODAY = "2026-11-19";
const CENSUS_DIR = `${ROOT}/docs/qa/viu-r3-capture-upper/census`;

const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const bare = (s) => norm(s).replace(/\s*\(.*\)\s*$/, "").trim();

// ── same simplification rules as src/components/book/word-lookup.tsx lookup() ──
function inflectionVariants(word) {
  const w = norm(word);
  const out = new Set();
  if (w.endsWith("'s")) out.add(w.slice(0, -2));
  if (w.endsWith("ies")) out.add(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.add(w.slice(0, -2));
  if (w.endsWith("s") && !w.endsWith("ss")) out.add(w.slice(0, -1));
  if (w.endsWith("ed")) {
    out.add(w.slice(0, -2));
    out.add(w.slice(0, -1));
  }
  if (w.endsWith("ing")) {
    out.add(w.slice(0, -3));
    out.add(w.slice(0, -3) + "e");
  }
  return [...out].filter((v) => v && v !== w && v.length >= 3);
}

// ── conservative member tokenizer (see header rules) ──
function extractMembers(example) {
  const droppedSegments = [];
  const skippedNonWords = [];
  const members = [];
  let s = String(example ?? "");
  // 1) balanced glosses
  s = s.replace(/\([^()]*\)/g, " ").replace(/\[[^\][]*\]/g, " ");
  // 2) comma-segments; damaged ones dropped + disclosed
  for (const seg of s.split(",")) {
    if (/[()[\]]/.test(seg)) {
      droppedSegments.push(seg.trim());
      continue;
    }
    // 3) whitespace + slash splitting
    for (const t of seg.split(/[\s/]+/)) {
      if (!t) continue;
      const tok = t.replace(/^[’'"]+/, "").replace(/[’'",.;:!?"]+$/, "").trim();
      if (!tok) continue;
      if (/^(e\.?g\.?|i\.?e\.?|eg|ie)$/i.test(tok)) continue;
      if (!/^[A-Za-z][A-Za-z'-]*[A-Za-z]$/.test(tok) || tok.length < 3) {
        skippedNonWords.push(t);
        continue;
      }
      members.push(tok);
    }
  }
  return { members, droppedSegments, skippedNonWords };
}

const rows = [];
const damageLog = [];
const collisionLog = [];

function pushRow(row) {
  rows.push(row);
}

// dedupe members inside a single row
function dedupe(list) {
  const seen = new Set();
  const out = [];
  for (const m of list) {
    const k = norm(m.word);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(m);
  }
  return out;
}

// ── unit 8: suffix rows (word starts with «-») — members from printed examples ──
const u8 = JSON.parse(readFileSync(`${CENSUS_DIR}/unit-008.json`, "utf8"));
for (const e of u8.entries) {
  if (!e.word.startsWith("-")) continue;
  const ex = extractMembers(e.example);
  for (const d of ex.droppedSegments) damageLog.push({ unit: 8, entry: e.word, segment: d });
  for (const n of ex.skippedNonWords) damageLog.push({ unit: 8, entry: e.word, nonword: n });
  pushRow({
    entry: e.word,
    lesson: 8,
    group: e.group ?? "",
    pos: e.pos ?? "",
    definition: e.def ?? "",
    phonetic: e.ipa ?? "",
    example: e.example ?? "",
    members: dedupe(ex.members.map((w) => ({ word: w, example: "", keys: [norm(w), ...inflectionVariants(w)] }))),
  });
}

// ── unit 9: the printed page is entirely prefix rows — all census entries taken verbatim ──
const u9 = JSON.parse(readFileSync(`${CENSUS_DIR}/unit-009.json`, "utf8"));
for (const e of u9.entries) {
  const ex = extractMembers(e.example);
  for (const d of ex.droppedSegments) damageLog.push({ unit: 9, entry: e.word, segment: d });
  for (const n of ex.skippedNonWords) damageLog.push({ unit: 9, entry: e.word, nonword: n });
  pushRow({
    entry: e.word,
    lesson: 9,
    group: e.group ?? "",
    pos: e.pos ?? "",
    definition: e.def ?? "",
    phonetic: e.ipa ?? "",
    example: e.example ?? "",
    members: dedupe(ex.members.map((w) => ({ word: w, example: "", keys: [norm(w), ...inflectionVariants(w)] }))),
  });
}

// ── unit 10: roots (uppercase rows with printed definition) + members from census group field ──
const u10 = JSON.parse(readFileSync(`${CENSUS_DIR}/unit-010.json`, "utf8"));
const ROOT_RE = /^[A-Z][A-Z ,]+$/;
const rootNames = new Set(u10.entries.filter((e) => ROOT_RE.test(e.word) && (e.def ?? "").length > 0).map((e) => e.word));
const CLASS_GROUPS = new Set(["verb", "person noun", "adjective", "abstract noun"]);
for (const e of u10.entries) {
  if (rootNames.has(e.word)) {
    const root = e.word;
    const memberEntries = u10.entries.filter((x) => x.group === root);
    pushRow({
      entry: root,
      lesson: 10,
      group: "",
      pos: "",
      definition: e.def ?? "",
      phonetic: "",
      example: "",
      members: memberEntries.map((m) => ({
        word: m.word,
        example: m.example ?? "",
        keys: [norm(m.word), ...inflectionVariants(m.word)],
      })),
    });
  } else if (CLASS_GROUPS.has(e.group ?? "")) {
    // printed word-family table row (word class recorded by census group) — keyed by its own word
    pushRow({
      entry: e.word,
      lesson: 10,
      group: e.group ?? "",
      pos: "",
      definition: "",
      phonetic: "",
      example: e.example ?? "",
      members: [{ word: e.word, example: e.example ?? "", keys: [norm(e.word), ...inflectionVariants(e.word)] }],
    });
  }
}

// ── collision check across all rows (first wins, disclosed) ──
const seenKeys = new Map(); // key → entry
for (const r of rows) {
  for (const m of r.members) {
    for (const k of m.keys) {
      if (seenKeys.has(k)) {
        collisionLog.push({ key: k, firstEntry: seenKeys.get(k), secondEntry: r.entry, winner: "first" });
      } else {
        seenKeys.set(k, r.entry);
      }
    }
  }
}

// ── consuming evidence: members present in the book's tracked vocab/dictionary ──
const { VOCAB_ALL } = await import(`${ROOT}/src/data/viu-upper/vocab.ts`);
const { DICTIONARY } = await import(`${ROOT}/src/data/viu-upper/dictionary.ts`);
const vocabByWord = new Map();
for (const v of VOCAB_ALL) {
  const k = bare(v.word);
  if (!vocabByWord.has(k)) vocabByWord.set(k, v);
}
const dictByWord = new Map();
for (const d of DICTIONARY) {
  const k = bare(d.word);
  if (!dictByWord.has(k)) dictByWord.set(k, d);
}

const perRow = rows.map((r) => {
  const vocabHits = r.members.filter((m) => vocabByWord.has(norm(m.word))).map((m) => ({ word: m.word, lesson: vocabByWord.get(norm(m.word)).lesson }));
  const dictHits = r.members.filter((m) => dictByWord.has(norm(m.word))).map((m) => ({ word: m.word, lesson: dictByWord.get(norm(m.word)).lesson }));
  const lessons = [...new Set([...vocabHits, ...dictHits].map((h) => h.lesson))].sort((a, b) => a - b);
  return {
    entry: r.entry,
    lesson: r.lesson,
    group: r.group,
    memberCount: r.members.length,
    members: r.members.map((m) => m.word),
    vocabHits,
    dictHits,
    consumingLessons: lessons,
  };
});

// ── write generated data file ──
const tsHeader = `// GENERATED FILE — do not edit by hand (re-generate: bun scripts/viu-r3-d-wordfamily-upper.mjs)
// VIU R3-d (motive 2) — خانوادهٔ واژگانی چاپی درس‌های word formation کتاب English Vocabulary in Use — Upper-Intermediate
// منبع (tracked): docs/qa/viu-r3-capture-upper/census/unit-008.json / unit-009.json / unit-010.json
//   — کپچر دوگذر verbatim (census + verify — صفر FAIL — سربرگ ۹۱مین SNAPSHOT)
// قواعد استخراج صفر-ساختگی (گزارش اثبات: docs/qa/viu-r3-d-wordfamily-upper-2026-11-19.json):
//   واحدهای ۸/۹ — اعضا فقط از رشتهٔ مثال چاپی خود سطر affix با توکنایزر محافظه‌کار: حذف glossهای
//   براکتی balanced (مثل «[can be eaten]» و gloss آسیب‌دیدهٔ OCR چاپی «[ake modern]» = [make modern])؛
//   اگر براکت unbalanced در سگمنت باقی می‌ماند کل سگمنت حذف و verbatim در گزارش افشا می‌شود
//   (در این موج: صفر مورد — damageLog خالی — همهٔ براکت‌های کپچر balanced بودند)؛
//   واحد ۱۰ — اعضا فقط از فیلد group خود census (چیدمان چاپی کتاب): ۱۹ عضو group=ریشه + ۲۴ سطر
//   کلاس-واژه جدول خانواده (verb/person noun/adjective/abstract noun ×۶)؛ ارتباط ریشه↔کلاس-واژه در
//   census ثبت نشده و بنابراین استنتاج نمی‌شود (صفر استنتاج).
// کلیدها = عضو verbatim + واریانت‌های صرفی با همان قواعد ساده‌سازی پاپ‌آپ (عین الگوی جدول افعال R3-d).
// مکانیزم: word-lookup.tsx LookupMaps.family — کلیک روی عضو در متن هر درس ⇒ بلوک
//   «خانوادهٔ واژه — جدول word formation کتاب» (فقط‌خواندنی — صفر نوشتن در استورها).
import type { WordFamilyRow } from "../types";

export const WORD_FAMILIES: WordFamilyRow[] = [
`;

const serializeRow = (r) => {
  const members = r.members
    .map((m) => {
      const ex = m.example ? `, example: ${JSON.stringify(m.example)}` : "";
      return `    { word: ${JSON.stringify(m.word)}, keys: ${JSON.stringify(m.keys)}${ex} }`;
    })
    .join(",\n");
  return [
    "  {",
    `    entry: ${JSON.stringify(r.entry)},`,
    `    lesson: ${r.lesson},`,
    `    group: ${JSON.stringify(r.group)},`,
    `    pos: ${JSON.stringify(r.pos)},`,
    `    definition: ${JSON.stringify(r.definition)},`,
    `    phonetic: ${JSON.stringify(r.phonetic)},`,
    `    example: ${JSON.stringify(r.example)},`,
    `    members: [`,
    members,
    `    ],`,
    "  },",
  ].join("\n");
};

const ts = tsHeader + rows.map(serializeRow).join("\n") + "\n];\n";
writeFileSync(`${ROOT}/src/data/viu-upper/word-families.ts`, ts);

// ── evidence report ──
const report = {
  generatedAt: TODAY,
  mission: "R3-d (motive 2) — word family of viu-upper word formation lessons (roadmap R3-d remainder, سربرگ ۹۱مین «گام بعدی مجاز»)",
  book: "viu-upper",
  source: "docs/qa/viu-r3-capture-upper/census/unit-008.json + unit-009.json + unit-010.json (tracked two-pass census — zero FAIL)",
  scope: "units 8 (suffixes) / 9 (prefixes) / 10 (roots + word-family table) — units 16 (abbreviations) and 100 (signs) excluded: not word formation",
  rules: "conservative printed-only extraction — see script header; damaged OCR segments dropped verbatim + disclosed; root↔word-class association NOT derived (not encoded in census group)",
  mechanism: "word-lookup.tsx LookupMaps.family keyed by member verbatim + inflection-stripped variants (same rules as popup morphological simplification — mirrors R3-d verb-table keying); popup block «خانوادهٔ واژه — جدول word formation کتاب» (read-only, zero store writes)",
  totals: {
    rows: rows.length,
    unit8Rows: rows.filter((r) => r.lesson === 8).length,
    unit9Rows: rows.filter((r) => r.lesson === 9).length,
    unit10RootRows: rows.filter((r) => r.lesson === 10 && rootNames.has(r.entry)).length,
    unit10ClassRows: rows.filter((r) => r.lesson === 10 && !rootNames.has(r.entry)).length,
    membersTotal: rows.reduce((a, r) => a + r.members.length, 0),
    lookupKeysTotal: seenKeys.size,
    damagedSegmentsDropped: damageLog.filter((d) => d.segment).length,
    collisionsFirstWins: collisionLog.length,
  },
  rows: perRow,
  damageLog,
  collisions: collisionLog,
};

writeFileSync(`${ROOT}/docs/qa/viu-r3-d-wordfamily-upper-${TODAY}.json`, JSON.stringify(report));

console.log(
  JSON.stringify({
    rows: report.totals.rows,
    members: report.totals.membersTotal,
    keys: report.totals.lookupKeysTotal,
    damagedDropped: report.totals.damagedSegmentsDropped,
    collisions: report.totals.collisionsFirstWins,
  }),
);
