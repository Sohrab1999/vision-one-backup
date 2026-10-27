import { VOCAB_LESSON_16 } from "../src/data/collocations/vocab-lesson-16.ts";
import { VOCAB_LESSON_17 } from "../src/data/collocations/vocab-lesson-17.ts";
import { VOCAB_LESSON_18 } from "../src/data/collocations/vocab-lesson-18.ts";
import { VOCAB_LESSON_19 } from "../src/data/collocations/vocab-lesson-19.ts";
import { VOCAB_LESSON_20 } from "../src/data/collocations/vocab-lesson-20.ts";
import { READINGS_PART_4 } from "../src/data/collocations/readings-part-4.ts";
import { QUIZ_PART_4 } from "../src/data/collocations/quiz-part-4.ts";

let errors = 0;
const fail = (msg: string) => { errors++; console.log("  ✗ " + msg); };
const ok = (msg: string) => console.log("  ✓ " + msg);

// ---- vocab ----
const vocabSets: [string, any[], number][] = [
  ["16", VOCAB_LESSON_16, 16], ["17", VOCAB_LESSON_17, 17], ["18", VOCAB_LESSON_18, 18],
  ["19", VOCAB_LESSON_19, 19], ["20", VOCAB_LESSON_20, 20],
];
let totalVocab = 0;
console.log("VOCAB:");
for (const [n, list, lesson] of vocabSets) {
  const words = list.map((w) => w.word);
  const dupes = words.filter((w, i) => words.indexOf(w) !== i);
  if (list.length < 15 || list.length > 30) fail(`L${n}: count ${list.length} outside 15..30`);
  if (dupes.length) fail(`L${n} duplicates: ${dupes.join(", ")}`);
  for (const w of list) {
    if (w.lesson !== lesson) fail(`L${n}: wrong lesson on "${w.word}"`);
    if ("grade" in w) fail(`L${n}: has grade on "${w.word}"`);
    if (!w.meaning?.trim()) fail(`L${n}: empty meaning on "${w.word}"`);
    if (!w.pos?.trim()) fail(`L${n}: empty pos on "${w.word}"`);
  }
  totalVocab += list.length;
  ok(`L${n}: ${list.length} entries`);
}
console.log(`  TOTAL vocab = ${totalVocab}`);

// ---- readings ----
console.log("READINGS:");
let totalParas = 0;
const expectedLessons = [16, 17, 18, 19, 20];
if (READINGS_PART_4.length !== 5) fail(`readings count = ${READINGS_PART_4.length}, expected 5`);
READINGS_PART_4.forEach((r, i) => {
  if (r.id !== `r-loc-${expectedLessons[i]}`) fail(`reading ${i}: id=${r.id}`);
  if (r.lesson !== expectedLessons[i]) fail(`reading ${i}: lesson=${r.lesson}`);
  if (!r.paragraphs.length) fail(`reading ${r.id}: no paragraphs`);
  for (const p of r.paragraphs) {
    if (!p.en?.trim() || !p.fa?.trim()) fail(`reading ${r.id}: empty en/fa`);
  }
  totalParas += r.paragraphs.length;
  ok(`${r.id} "${r.title}" / ${r.titleFa}: ${r.paragraphs.length} paragraphs`);
});
console.log(`  TOTAL paragraphs = ${totalParas}`);

// ---- quiz ----
console.log("QUIZ:");
const perLesson: Record<number, number> = {};
const seenTexts = new Set<string>();
let totalQ = 0;
for (const q of QUIZ_PART_4) {
  const L = q.lesson;
  perLesson[L] = (perLesson[L] ?? 0) + 1;
  totalQ++;
  const id = `L${L} "${q.text.slice(0, 45)}..."`;
  if (![16, 17, 18, 19, 20].includes(L)) fail(`${id}: bad lesson ${L}`);
  if (q.scope !== `درس ${["۱۶","۱۷","۱۸","۱۹","۲۰"][L - 16]}`) fail(`${id}: scope="${q.scope}"`);
  if (q.level !== "متوسط") fail(`${id}: level="${q.level}"`);
  if (q.category !== "vocabulary") fail(`${id}: category="${q.category}"`);
  if ("explanation" in q) fail(`${id}: has explanation`);
  if (q.options.length !== 4) fail(`${id}: ${q.options.length} options`);
  if (new Set(q.options).size !== 4) fail(`${id}: duplicate options`);
  if (q.answer < 0 || q.answer > 3) fail(`${id}: answer=${q.answer}`);
  const blanks = q.text.match(/_+/g) ?? [];
  if (blanks.length !== 1) fail(`${id}: ${blanks.length} blanks in text`);
  if (blanks.length === 1 && blanks[0].length !== 8) fail(`${id}: blank width ${blanks[0].length}`);
  if (seenTexts.has(q.text)) fail(`${id}: duplicate question text`);
  seenTexts.add(q.text);
}
for (const L of [16, 17, 18, 19, 20]) ok(`L${L}: ${perLesson[L] ?? 0} questions`);
console.log(`  TOTAL questions = ${totalQ}`);

// L19: every bank word used exactly once as an answer, within its own bank
const bank1 = ["clear","let up","muggy","perfect","storm","high","mild","wild","forecast","light","oppressively","record","torrential","partly","scattered"];
const bank2 = ["cleared","heavy","nasty","flurries","driving","icy","thaw","unseasonably"];
const l19 = QUIZ_PART_4.filter((q) => q.lesson === 19);
const answers1 = l19.slice(0, 15).map((q) => q.options[q.answer]);
const answers2 = l19.slice(15).map((q) => q.options[q.answer]);
for (const w of bank1) if (!answers1.includes(w)) fail(`L19 bank1: "${w}" never used as answer`);
for (const [i, a] of answers1.entries()) if (!bank1.includes(a)) fail(`L19 bank1 Q${i + 1}: answer "${a}" not in bank1`);
for (const w of bank2) if (!answers2.includes(w)) fail(`L19 bank2: "${w}" never used as answer`);
for (const [i, a] of answers2.entries()) if (!bank2.includes(a)) fail(`L19 bank2 Q${i + 1}: answer "${a}" not in bank2`);
ok("L19 bank coverage one-to-one (15 + 8)");

// L17 match + L20 match: correct right-half used exactly once per set
const l20correct = QUIZ_PART_4.filter((q) => q.lesson === 20).map((q) => q.options[q.answer]);
if (new Set(l20correct).size !== 10) fail("L20: correct right-halves are not 10 unique");
const l17matchCorrect = QUIZ_PART_4.filter((q) => q.lesson === 17 && q.text.endsWith("________") && q.text.length > 60).map((q) => q.options[q.answer]);
if (new Set(l17matchCorrect).size !== 10) fail("L17 match: correct right-halves are not 10 unique");
ok("L17/L20 match: 10 unique correct right-halves each");

console.log(errors === 0 ? "\nALL CHECKS PASSED ✅" : `\n${errors} PROBLEM(S) FOUND ❌`);
