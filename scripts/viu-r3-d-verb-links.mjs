// VIU R3-d — mechanical verb-table link report (NO VLM — pure tracked-data analysis).
// Roadmap R3-d: "گره جدول افعال ELEM به درس‌های مصرف‌کننده" (رفع اذعان سند الگوی آموزشی ۲۰۲۶-۱۱-۱۶:
//   "Word Formation (جدول فعل بی‌قاعده به درس متصل نیست)").
// Mechanism (honest, zero invention): the active book's tracked IRREGULAR_VERBS table
//   (base/past/participle — as printed in the book's own verb table) is keyed into the word-lookup
//   maps (src/components/book/word-lookup.tsx LookupMaps.verbs) — clicking ANY of the three printed
//   forms (or their capitalization/quote variants) inside any lesson's English text surfaces the
//   printed verb row in the popup ("فعل بی‌قاعده — جدول افعال کتاب"). The runtime link therefore
//   covers every consuming lesson of the table for every book that ships a verbs table.
// This report is the mechanical EVIDENCE of that link for viu-elem (the roadmap's named case):
//   per lesson, which printed verb-table verbs appear in that lesson's tracked vocabulary
//   (exact normalized match; printed parenthetical markers like "say (say/said/said)" are stripped
//   for matching only — the stored data is never modified).
// Mode: bun scripts/viu-r3-d-verb-links.mjs  → writes docs/qa/viu-r3-d-verb-links-2026-11-17.json
import { writeFileSync } from "node:fs";

const ROOT = process.cwd();
const TODAY = "2026-11-17";

const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const bare = (s) => norm(s).replace(/\s*\(.*\)\s*$/, "").trim();

const { VOCAB_ALL } = await import(`${ROOT}/src/data/viu-elem/vocab.ts`);
const { VERBS } = await import(`${ROOT}/src/data/viu-elem/verbs.ts`);

const forms = new Map(); // normalized form → verb row
for (const v of VERBS) {
  for (const f of [v.base, v.past, v.participle]) {
    const k = norm(f);
    if (k && !forms.has(k)) forms.set(k, v);
  }
}

const baseSet = new Set(VERBS.map((v) => norm(v.base)));
const lessons = {};
let baseMatches = 0, anyFormMatches = 0;
for (const w of VOCAB_ALL) {
  const b = bare(w.word);
  if (baseSet.has(b)) {
    baseMatches++;
    (lessons[w.lesson] ||= { baseMatches: [], otherForms: [] }).baseMatches.push(w.word);
  } else if (forms.has(b)) {
    anyFormMatches++;
    (lessons[w.lesson] ||= { baseMatches: [], otherForms: [] }).otherForms.push(w.word);
  }
}

const report = {
  generatedAt: TODAY,
  mission: "R3-d — verb-table link (roadmap R3-d; teaching-model admission fix)",
  mechanism: "word-lookup.tsx LookupMaps.verbs keyed by printed base/past/participle of the active book's tracked verb table — popup block «فعل بی‌قاعده — جدول افعال کتاب» (read-only, zero stores writes)",
  book: "viu-elem",
  verbTableLessons: [20],
  verbsInTable: VERBS.length,
  vocabEntriesTotal: VOCAB_ALL.length,
  baseMatches,
  anyFormMatches,
  consumingLessons: Object.keys(lessons).map(Number).sort((a, b) => a - b),
  consumingLessonCount: Object.keys(lessons).length,
  perLesson: lessons,
  note: "lessons < 20 are lessons where the verb is first met (the printed table in lesson 20 summarizes them); lessons > 20 consume the table downstream — both directions are linked at the word level by the popup mechanism",
};

writeFileSync(`${ROOT}/docs/qa/viu-r3-d-verb-links-${TODAY}.json`, JSON.stringify(report));
console.log(JSON.stringify({ verbs: VERBS.length, baseMatches, anyFormMatches, consumingLessons: report.consumingLessonCount }));
