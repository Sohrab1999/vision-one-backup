// VIU Book 4 (AVU-3) — Phase A4-2 — statistical QA sampling of the FA-NEW translation layer.
// Roadmap §A4-2: stratified sampling, pattern of the three-book R4 (per-unit-band × length-band)
// with the finite-population-corrected n for ±5% at 95% confidence over the NEW population
// (n0 = 384; adjusted n = n0 / (1 + (n0−1)/N)). PRNG mulberry32, fixed seed — reproducible,
// without replacement inside every stratum. Zero fabrication: population = fa-cache segments only.
// The GLM judge scores each sampled segment with the FOUR fixed R4 criteria (adapted for AVU-3 —
// the mini-dict prints no POS, so criterion 1 is consistency with the headword/unit context):
//   1. سازگاری معنی با headword و بستر واحد
//   2. دقت معنایی حس رایج/حس درس
//   3. طبیعی‌بودن فارسی و صفر typo
//   4. مردود قطعی: معنی بی‌ارتباط/خراب/گمراه‌کنندهٔ جدی
// Stop rule (roadmap): failure rate > 25% ⇒ the fix wave stops and a policy report goes to the owner.

import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";

const FA_OUT = "docs/qa/viu-adv-capture/fa-cache.json";
const OUT = "docs/qa/viu-adv-a4-fa-sample-2026-11-21.json";
const N0 = 384;
const SEED = 20261121;
const FAIL_RATE_STOP = 0.25;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[j], a[i]] = [a[i], a[j]];
  }
  return a;
}

const cache = JSON.parse(readFileSync(FA_OUT, "utf8"));
const entries = Object.entries(cache.segments ?? {});
const N = entries.length;
if (!N) { console.error("fa-cache has no segments — run viu-adv-a4-translate.mjs first"); process.exit(1); }
const n = Math.min(N, Math.round(N0 / (1 + (N0 - 1) / N)));

// strata: kind (t/s/d/p/m/i) × unit-band (U01-25 / U26-50 / U51-75 / U76-101) × length band
const kindOf = (k) => (k.startsWith("t-") ? "title" : k.startsWith("s-") ? "sectionTitle" : k.startsWith("d-") ? "dictMeaning" : k.startsWith("p-") ? "prose" : k.startsWith("m-") ? "margin" : "instruction");
const unitBand = (u) => (u <= 25 ? "U01-25" : u <= 50 ? "U26-50" : u <= 75 ? "U51-75" : "U76-101");
const lenBand = (faLen) => (faLen <= 60 ? "short" : faLen <= 180 ? "medium" : "long");

const strata = new Map();
for (const [k, v] of entries) {
  const key = `${kindOf(k)}|${unitBand(v.unit)}|${lenBand(v.fa.length)}`;
  if (!strata.has(key)) strata.set(key, []);
  strata.get(key).push({ k, ...v, kind: kindOf(k), unitBand: unitBand(v.unit), lengthBand: lenBand(v.fa.length), faLen: v.fa.length });
}
// proportional allocation per stratum, largest-remainder rounding to hit n exactly
const alloc = [];
let allocated = 0;
for (const [key, items] of strata) {
  const exact = (items.length / N) * n;
  alloc.push({ key, items, exact, base: Math.floor(exact) });
  allocated += Math.floor(exact);
}
const remainder = [...alloc].sort((a, b) => (b.exact - b.base) - (a.exact - a.base) || b.key.localeCompare(a.key));
let r = n - allocated;
for (const a of remainder) { if (r <= 0) break; a.base++; r--; }
const sample = [];
for (const a of alloc) {
  const picked = shuffle(a.items).slice(0, a.base);
  picked.forEach((p, i) => sample.push({ id: `A4S-${String(sample.length + 1).padStart(3, "0")}`, ...p }));
}

// ---------- GLM adjudication (4 fixed R4 criteria; adapted criterion 1 for AVU-3) ----------
const SYSTEM = `تو داور کیفیت ترجمهٔ ماشینی (فارسی) برای کتاب آموزشی «English Vocabulary in Use — Advanced» هستی.
هر مورد را با چهار معیار ثابت داوری کن:
۱) سازگاری معنی با واژهٔ کلیدی/headword و بسترِ بخش (unit) — برای مدخل‌های واژه‌نامه‌ای معنی باید با واژهٔ انگلیسیِ ابتدای متن سازگار باشد
۲) دقت معنایی حس رایج/حس درس — انحراف معنایی جدی = خطا
۳) طبیعی‌بودن فارسی و صفر غلط تایپی/نگارشی
۴) مردودِ قطعی: معنی بی‌ارتباط، متن خراب یا گمراه‌کنندهٔ جدی
قواعد خروجی: فقط JSON معتبر؛ هیچ توضیح اضافه نده. برای هر مورد فقط «pass» یا «fail» و اگر مردود است دلیل کوتاه (حداکثر ۱۲ کلمه) بنویس.
توجه: جای‌خالی‌های «____»، ارقام و نمادهای IPA باید در ترجمه حفظ شده باشند؛ فقدانش خطا دارد.`;

const extractJson = (s) => {
  const t = String(s).replace(/```json|```/g, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  return JSON.parse(t.slice(a, b + 1));
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const judgeBatch = async (zai, rows, round = 1) => {
  const payload = rows.map((r) => ({ id: r.id, en: r.en, fa: r.fa }));
  const user = `موارد زیر را داوری کن. خروجی: هر خط دقیقاً یک شیء JSON مستقل به شکل {"id":"…","verdict":"pass"|"fail","reason":"…"} — reason فقط برای fail — بدون بک‌تیک و متن دیگر.
موارد:
${JSON.stringify(payload)}`;
  let raw = "";
  for (let apiTry = 1; apiTry <= 6; apiTry++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [{ role: "assistant", content: SYSTEM }, { role: "user", content: user }],
        thinking: { type: "disabled" },
      });
      raw = completion.choices[0]?.message?.content ?? "";
      break;
    } catch (e) {
      if (!/429|5\d\d|timeout|ECONN/i.test(String(e.message)) || apiTry === 6) throw e;
      await sleep(30000 * apiTry);
    }
  }
  const map = new Map();
  for (const line of raw.split(/\n+/)) {
    const t = line.trim().replace(/^,+|,+$/g, "");
    if (!t.startsWith("{")) continue;
    try {
      const v = JSON.parse(t);
      if (v && typeof v.id === "string") map.set(v.id, { verdict: v.verdict === "fail" ? "fail" : "pass", reason: String(v.reason ?? "") });
    } catch { /* skip malformed line */ }
  }
  const missing = rows.filter((r) => !map.has(r.id));
  if (missing.length && round < 3) {
    const more = await judgeBatch(zai, missing, round + 1);
    for (const [id, v] of more) map.set(id, v);
  }
  return map;
};

const zai = await ZAI.create();
const verdicts = new Map();
// checkpoint/resume — judge verdicts survive process interruptions (chunked foreground runs)
const CKPT = "/tmp/a4-judge-checkpoint.json";
try { for (const [id, v] of Object.entries(JSON.parse(readFileSync(CKPT, "utf8")))) verdicts.set(id, v); console.log(`resumed ${verdicts.size} judge verdicts from checkpoint`); } catch { /* fresh */ }
const saveCkpt = () => writeFileSync(CKPT, JSON.stringify(Object.fromEntries(verdicts)));
const JUDGE_BATCH = 12;
for (let i = 0; i < sample.length; i += JUDGE_BATCH) {
  const rows = sample.slice(i, i + JUDGE_BATCH).map((r) => ({ ...r, id: r.id }));
  const todo = rows.filter((r) => !verdicts.has(r.id));
  if (!todo.length) continue;
  let ok = false;
  for (let round = 1; round <= 3 && !ok; round++) {
    try {
      const map = await judgeBatch(zai, todo);
      for (const r of todo) if (map.has(r.id)) verdicts.set(r.id, map.get(r.id));
      ok = todo.every((r) => verdicts.has(r.id));
    } catch (e) {
      console.error(`judge batch ${i} round ${round} failed: ${e.message}`);
      await sleep(45000 * round);
    }
  }
  saveCkpt();
  console.log(`judged ${Math.min(i + JUDGE_BATCH, sample.length)}/${sample.length}`);
  await sleep(15000);
}

// ---------- report ----------
const judged = sample.map((r) => ({ ...r, verdict: verdicts.get(r.id)?.verdict ?? "unjudged", reason: verdicts.get(r.id)?.reason ?? "" }));
const fails = judged.filter((r) => r.verdict === "fail");
const unjudged = judged.filter((r) => r.verdict === "unjudged");
const failRate = judged.length ? fails.length / judged.filter((r) => r.verdict !== "unjudged").length : 0;
const byKind = {};
for (const r of judged) {
  byKind[r.kind] ??= { total: 0, fail: 0, unjudged: 0 };
  byKind[r.kind].total++;
  if (r.verdict === "fail") byKind[r.kind].fail++;
  if (r.verdict === "unjudged") byKind[r.kind].unjudged++;
}
const report = {
  meta: {
    phase: "A4-2",
    date: "2026-11-21",
    seed: SEED,
    prng: "mulberry32(seed) — Fisher-Yates — بدون جایگذاری در هر استراتوم",
    population: N,
    n0: N0,
    n: n,
    method: "استراتیفای عین R4: kind × unit-band × طول معنی — تخصیص متناسب + بزرگ‌ترین باقیمانده",
    judge: "GLM — ۴ معیار ثابت R4 (معیار ۱ برای AVU-3 به headword/بستر واحد اقتباس شد — واژه‌نامهٔ چاپی pos ندارد)",
    classRule: "هیچ کلاسی به FA-REVIEWED تغییر نمی‌کند — فقط با داوری انسانی مالک (A4-4/G4)",
    stopRule: `مردودی > ۲۵٪ ⇒ توقف موج اصلاح و گزارش سیاست به مالک`,
    law: "پوشش ≠ صحت",
  },
  stats: {
    sampled: judged.length,
    pass: judged.length - fails.length - unjudged.length,
    fail: fails.length,
    unjudged: unjudged.length,
    failRate: Math.round(failRate * 1000) / 1000,
    stopRuleTriggered: failRate > FAIL_RATE_STOP,
    byKind,
  },
  fails: fails.map((r) => ({ id: r.id, k: r.k, en: r.en.slice(0, 120), fa: r.fa.slice(0, 120), reason: r.reason })),
  sample: judged.map((r) => ({ id: r.id, k: r.k, kind: r.kind, unit: r.unit, unitBand: r.unitBand, lengthBand: r.lengthBand, faLen: r.faLen, verdict: r.verdict, reason: r.reason })),
};
writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");
console.log(`A4-2: population=${N} n=${n} sampled=${judged.length} fail=${fails.length} unjudged=${unjudged.length} failRate=${(failRate * 100).toFixed(1)}% stopRule=${report.stats.stopRuleTriggered}`);
console.log(`out: ${OUT}`);
