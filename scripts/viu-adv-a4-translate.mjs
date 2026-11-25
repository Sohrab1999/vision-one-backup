// VIU Book 4 (AVU-3) — Phase A4-1 — Persian translation layer FA-NEW (GLM pipeline — pattern of
// the three-book fa-cache / vocab `meaning` / readings `fa` contract).
// Owner mandate (this session): explicit «ادامه بده» command after the G3 six-item vote closed the
// gate (gate report §۴) — گام مجاز ② فاز A4 (ترجمهٔ فارسی FA-NEW) پس از اجرای اصلاح جراحی A3-KA-2.
//
// Roadmap mapping (§۴ فاز A4):
//   A4-1 translation base   — GLM pipeline, class FA-NEW. Population = display-facing capture
//                             segments only, per the A2 runtimeMapping contract:
//                               P1 unit titles        (ChapterMeta.titleFa)
//                               P2 mini-dict entries  (VocabWord.meaning — 68 candidates)
//                               P3 prose paragraphs   (Reading paragraph fa — 309 blocks)
//                               P4 margin gloss notes (study-view glosses — 183)
//                               P5 exercise instructions (455 — incl. the 42 honest keyless ones)
//                               P6 section titles     (study-view A..E headers)
//                             NOT translated (contracts): quiz item texts/options/answers (the
//                             three-book rule «سؤال‌های آزمون بدون ترجمه»), printed key rows
//                             (verbatim), Index headwords/IPA (A5 dictionary — printed form),
//                             U+E022 glyph (owner vote ⑤ — verbatim until manual review).
//   Honesty: class stays FA-NEW (machine translation — never FA-REVIEWED without the owner's
//   human adjudication, roadmap principle ۳ §۳); «پوشش ≠ صحت» is mandatory in every report.
//
// Reproducibility/resume: every segment carries a stable key; translations land in
//   docs/qa/viu-adv-capture/fa-cache.json (`segments`) and are skipped on re-run — the pipeline
//   is idempotent and resumable after any interruption or sandbox reset.
// Backend-only: uses z-ai-web-dev-sdk (never imported from client code).

import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";

const CAP = "docs/qa/viu-adv-capture";
const FA_OUT = `${CAP}/fa-cache.json`;
const UNITS = 101;
const CONCURRENCY = 1; // the GLM endpoint rate-limits (429) — sequential with backoff is reliable

const SYSTEM = `تو مترجم حرفه‌ای محتوای آموزشی کتاب «English Vocabulary in Use — Advanced» هستی و بخش‌های نمایشی آن را به فارسی روانِ آموزشی ترجمه می‌کنی.
قواعد الزامی:
۱) فقط JSON معتبر برگردان؛ هیچ توضیح، متن اضافه یا بک‌تینگل نباشد.
۲) جای‌خالی‌های «____» (چهار زیرخط پیوسته) را عیناً و به همان تعداد نگه دار.
۳) ارقام، حروف گزینه (A/B/C/…)، نقطه‌گذاری معنایی و علائم مثل «•» را حفظ کن.
۴) نام‌های خاص، واژه‌های فنی بدون معادل مصطلح و نمادهای IPA (بین /…/) را عیناً کپی کن؛ هیچ کاراکتر ناشناخته‌ای را بازسازی یا حذف نکن.
۵) فارسی طبیعی و روان بنویس؛ برای مدخل‌های واژه‌نامه‌ای، معنی فشرده و دقیقِ همان حسِ رایج بده.
۶) طول ترجمه باید هم‌ترازِ متن مبدأ باشد؛ هیچ چیزی اضافه یا کم نکن.`;

const buildSegments = () => {
  const segs = [];
  for (let n = 1; n <= UNITS; n++) {
    const id = String(n).padStart(3, "0");
    const c = JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8"));
    const push = (k, text) => { if (text && String(text).trim()) segs.push({ k, en: String(text).replace(/\s+/g, " ").trim(), unit: n }); };
    push(`t-${n}`, c.title);                                  // P1 unit title
    for (const s of c.leftPage.sections) {
      push(`s-${n}-${s.letter}`, s.title);                    // P6 section title
      for (const b of s.blocks) if (b.kind === "paragraph") push(`p-${n}-${s.letter}-${b.y}`, b.text); // P3 prose
      for (const m of s.marginNotes) push(`m-${n}-${s.letter}-${m.y}`, m.text);  // P4 margin gloss
    }
    for (const e of c.leftPage.miniDict) push(`d-${n}-${e.n}`, e.text);          // P2 mini-dict entry
    for (const ex of c.rightPage.exercises) push(`i-${n}-${ex.no}`, ex.instruction); // P5 instruction
  }
  return segs;
};

const extractJson = (s) => {
  const t = String(s).replace(/```json|```/g, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  return JSON.parse(t.slice(a, b + 1));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const translateBatch = async (zai, batch, attempt = 1) => {
  const payload = batch.map((s, i) => ({ i, k: s.k, text: s.en }));
  const user = `فهرست قطعه‌های زیر را به فارسی ترجمه کن. خروجی: هر خط دقیقاً یک شیء JSON مستقل به شکل {"k":"کلید","fa":"ترجمه"} — بدون شماره، بدون بک‌تیک، بدون هیچ متن دیگر. برای هر کلیدِ ورودی دقیقاً یک خط، به همان ترتیب.
قطعه‌ها:
${JSON.stringify(payload)}`;
  let raw = "";
  // rate-limit resilient API loop: 429/5xx → exponential backoff (20s·attempt), up to 6 tries
  for (let apiTry = 1; apiTry <= 6; apiTry++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [{ role: "assistant", content: SYSTEM }, { role: "user", content: user }],
        thinking: { type: "disabled" },
      });
      raw = completion.choices[0]?.message?.content ?? "";
      break;
    } catch (e) {
      const retryable = /429|5\d\d|timeout|ECONN/i.test(String(e.message));
      if (!retryable || apiTry === 6) throw e;
      await sleep(20000 * apiTry);
    }
  }
  // JSONL parse — line-by-line salvage: a truncated tail only loses its own line
  const map = new Map();
  for (const line of raw.split(/\n+/)) {
    const t = line.trim().replace(/^,+|,+$/g, "");
    if (!t.startsWith("{")) continue;
    try {
      const row = JSON.parse(t);
      if (row && typeof row.k === "string" && typeof row.fa === "string" && row.fa.trim()) map.set(row.k, row.fa.replace(/\s+/g, " ").trim());
    } catch { /* skip malformed line */ }
  }
  const missing = batch.filter((s) => !map.has(s.k)).map((s) => s.k);
  if (missing.length && attempt < 3) {
    const retry = batch.filter((s) => missing.includes(s.k));
    const more = await translateBatch(zai, retry, attempt + 1);
    for (const [k, v] of more) map.set(k, v);
  }
  return map;
};

// ---------- run ----------
const segs = buildSegments();
const cache = JSON.parse(readFileSync(FA_OUT, "utf8"));
cache.segments ??= {};
const pending = segs.filter((s) => !cache.segments[s.k]);
console.log(`A4-1 population: ${segs.length} segments (${[...new Set(segs.map((s) => s.unit))].length} units) — pending: ${pending.length} — cached: ${segs.length - pending.length}`);
if (!pending.length) { console.log("fa-cache complete — nothing to translate"); process.exit(0); }

const zai = await ZAI.create();
// char-budget batches (~5000 chars per call) — reliable JSONL output per call
const batches = [];
let cur = [], curLen = 0;
for (const s of pending) {
  if (curLen + s.en.length > 5000 && cur.length) { batches.push(cur); cur = []; curLen = 0; }
  cur.push(s); curLen += s.en.length;
}
if (cur.length) batches.push(cur);
console.log(`batches: ${batches.length} (char-budget 5000, JSONL)`);
let done = 0;
const failedKeys = [];
for (const batch of batches) {
  let ok = false;
  for (let round = 1; round <= 4 && !ok; round++) {
    try {
      const map = await translateBatch(zai, batch, 1);
      for (const s of batch) {
        const fa = map.get(s.k);
        if (fa) cache.segments[s.k] = { en: s.en, fa, unit: s.unit, cls: "FA-NEW" };
      }
      ok = batch.every((s) => cache.segments[s.k]);
    } catch (e) {
      console.error(`batch ${done + 1} round ${round} failed: ${e.message}`);
      await sleep(60000 * round);
    }
  }
  if (!ok) failedKeys.push(...batch.filter((s) => !cache.segments[s.k]).map((s) => s.k));
  done++;
  writeFileSync(FA_OUT, JSON.stringify(cache, null, 2) + "\n");
  console.log(`  progress ${done}/${batches.length} batches — translated ${Object.keys(cache.segments).length}/${segs.length} — failed ${failedKeys.length}`);
  if (!ok) await sleep(60000); // cooldown before the next batch after a failed one
  else await sleep(20000); // gentle pacing — the endpoint 429s under rapid successive calls
}

// final sweep: retry rounds for all failed keys, small batches of 5, backoff between rounds
const failed = segs.filter((s) => failedKeys.includes(s.k) && !cache.segments[s.k]);
for (let i = 0; i < failed.length; i += 5) {
  for (let round = 1; round <= 4; round++) {
    try {
      const map = await translateBatch(zai, failed.slice(i, i + 5), 1);
      for (const s of failed.slice(i, i + 5)) {
        const fa = map.get(s.k);
        if (fa) cache.segments[s.k] = { en: s.en, fa, unit: s.unit, cls: "FA-NEW" };
      }
      break;
    } catch (e) {
      console.error(`sweep ${i} round ${round} failed: ${e.message}`);
      await sleep(60000 * round);
    }
  }
  await sleep(20000);
}

writeFileSync(FA_OUT, JSON.stringify(cache, null, 2) + "\n");
const translated = Object.keys(cache.segments).length;
const missing = segs.filter((s) => !cache.segments[s.k]).map((s) => s.k);
cache.status = missing.length === 0 ? "A4-FA-NEW-complete" : `A4-FA-NEW-partial(${missing.length}-missing)`;
cache.faNew = translated;
cache.faReviewed = 0;
cache.meta = {
  generator: "scripts/viu-adv-a4-translate.mjs (A4-1)",
  generatedAt: new Date().toISOString(),
  population: segs.length,
  translated,
  missing: missing.length,
  missingKeys: missing.slice(0, 20),
  law: "پوشش ≠ صحت — کلاس FA-NEW (ترجمهٔ ماشینی GLM)؛ FA-REVIEWED فقط با داوری انسانی مالک",
  populationNote: "P1 titles · P2 mini-dict meanings · P3 prose · P4 margin glosses · P5 exercise instructions · P6 section titles — quiz items/options/answers stay verbatim per the three-book quiz translation contract (سؤال‌های آزمون بدون ترجمه) · key rows + Index + U+E022 untouched",
};
writeFileSync(FA_OUT, JSON.stringify(cache, null, 2) + "\n");
console.log(`A4-1 done: ${translated}/${segs.length} segments FA-NEW — missing ${missing.length}`);
if (missing.length) { console.log("missing keys:", missing.slice(0, 30).join(", ")); process.exit(2); }
