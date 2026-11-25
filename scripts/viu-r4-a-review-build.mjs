// R4-a ارزیابی نمونهٔ ۳۹۷تایی + آمار (صفر دست‌محاسبه — Wilson CI مکانیکی)
// داور = GLM (مکانیکی-معنایی با دانش واژه‌ای + pos + بستر درس) — بازخوانی انسانی مالک برای FA-REVIEWED لازم است
import { readFileSync, writeFileSync } from "node:fs";

const sample = JSON.parse(readFileSync("docs/qa/viu-r4a-translation-sample-2026-11-19.json", "utf8"));

const FIXES = {
  "R4A-136": { reason: "typo «دوپسر عمو» — متن خراب", newMeaning: "پسرعمو/دخترعمو/پسرخاله/دخترخاله و..." },
  "R4A-219": { reason: "typo «پسادربیمی‌گرا» — نام جنبش صحیح پساامپرسیونیست", newMeaning: "پساامپرسیونیست" },
  "R4A-240": { reason: "«موقردن» نامأنوس و بی‌سابقهٔ لغوی", newMeaning: "موق گفتن (صدای گاو)" },
  "R4A-245": { reason: "«would = خواهد» گمراه‌کننده — would آیندهٔ ساده نیست", newMeaning: "فعل کمکی شرطی (گذشتهٔ will)" },
  "R4A-262": { reason: "عبارت آشفته با اعراب نابجا («گفتنِ»)", newMeaning: "خیلی خوب است که... اما (برای بیان انتقاد)" },
  "R4A-266": { reason: "بخش دوم «به‌جز اینکه اگر» آشفته و زائد", newMeaning: "مگر اینکه" },
  "R4A-277": { reason: "«پرانگیزه» انحراف معنایی (motivated ≠ assertive)", newMeaning: "صریح، قاطع و مطمئن (با اعتماد به نفس)" },
  "R4A-291": { reason: "«قلم خبر» ناتمام (کاربرد قلم در حسابداری)", newMeaning: "یک بند از خبر / مورد خبر" },
  "R4A-301": { reason: "typo «اقرار معاش» — بی‌معنا", newMeaning: "گذران زندگی کردن (به‌قدر کافی درآمد داشتن)" },
  "R4A-345": { reason: "«قفل کردن» کاملاً غلط — appal به معنای lock نیست", newMeaning: "وحشت‌زده و حیرت‌زده کردن" },
};

// نکات مرزی ثبت‌شده — قبول با نکته (بدون تغییر؛ کاندید بازخوانی انسانی آینده)
const NOTES = {
  "R4A-031": "پرانتز توضیحی «(تقریباً منفی)» — ملاک چاپی کتاب است؛ قابل‌قبول",
  "R4A-086": "gloss چاپی EN در meaning (= remove it/throw it away) — عین چاپی، بدون تغییر",
  "R4A-091": "«حق با توئه» — املا غیررسمی؛ متن چاپی informal است؛ قابل‌قبول",
  "R4A-097": "pos=adj. با معنی فعلی «ترسیدن از» — کارکردی و درست در بستر collocation",
  "R4A-059": "«آپرا صابونی» واژه‌به‌واژه؛ معنی اصلی «سریال» درست",
  "R4A-062": "«نانوا / نانوایی» — دومین حس خلط با bakery؛ حس اصلی درست",
  "R4A-110": "pos دوگانه n.|v. با پوشش هر دو حس در معنی — درست",
  "R4A-146": "pos=n. با حس دوم فعل‌گونه «زخم کردن» — پوشش دو حس چاپی",
  "R4A-298": "idiom چاپی با معنی دقیق — درست",
  "R4A-321": "«کرسی پرتنش/نزدیک» — قابل‌قبول؛ کاندید بازخوانی انسانی برای صیقل",
};

const review = sample.sample.map((it) => {
  const fx = FIXES[it.id];
  if (fx) return { id: it.id, book: it.book, lesson: it.lesson, word: it.word,
    meaning: it.meaning, verdict: "FIX", reason: fx.reason, proposedNew: fx.newMeaning };
  const note = NOTES[it.id];
  return { id: it.id, book: it.book, lesson: it.lesson, word: it.word,
    meaning: it.meaning, verdict: "OK", ...(note ? { note } : {}) };
});

const n = review.length;
const fail = review.filter((r) => r.verdict === "FIX").length;
const p = fail / n;
const z = 1.959963984540054; // 95%
const denom = 1 + (z * z) / n;
const center = (p + (z * z) / (2 * n)) / denom;
const half = (z / denom) * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
const ciLo = Math.max(0, center - half), ciHi = Math.min(1, center + half);

const byBook = {};
for (const r of review) {
  byBook[r.book] ??= { n: 0, fail: 0 };
  byBook[r.book].n++;
  if (r.verdict === "FIX") byBook[r.book].fail++;
}

const STOP_THRESHOLD = 0.25; // §R4 نقشه راه: >۲۵٪ مردود ⇒ توقف و گزارش به مالک
const decision = p > STOP_THRESHOLD
  ? "STOP — نسبت مردود بالاتر از ۲۵٪ — توقف موج اصلاح و ارائهٔ گزارش تصمیم به مالک"
  : "CONTINUE — نسبت مردود ≤ ۲۵٪ — موج اصلاح هدفمند R4-b مجاز است (فقط موارد مردود نمونه)";

const out = {
  meta: {
    phase: "R4-a ارزیابی",
    date: "2026-11-19",
    judge: "GLM — سنجش مکانیکی-معنایی (دانش واژه‌ای + pos + بستر lessonLabel) — بدون کلید چاپی فارسی (کتاب فارسی ندارد)",
    criteria: [
      "سازگاری معنی با pos چاپی",
      "دقت معنایی حس رایج/حس درس",
      "طبیعی‌بودن فارسی و صفر typo",
      "مردود قطعی: معنی بی‌ارتباط/خراب/گمراه‌کنندهٔ جدی",
    ],
    classRule: "هیچ تغییر کلاس FA-NEW → FA-REVIEWED انجام نشد — فقط با بازخوانی انسانی (R4-b نقشه راه)",
    sampleFile: "docs/qa/viu-r4a-translation-sample-2026-11-19.json",
    seed: sample.meta.seed,
  },
  stats: {
    n, fail, failRate: p,
    failRatePct: +(p * 100).toFixed(2),
    wilson95: { lo: +(ciLo * 100).toFixed(2), hi: +(ciHi * 100).toFixed(2) },
    stopThresholdPct: 25,
    decision,
    byBook,
  },
  review,
};

const outPath = "docs/qa/viu-r4a-translation-review-2026-11-19.json";
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`n=${n} fail=${fail} rate=${(p * 100).toFixed(2)}% CI95=[${(ciLo * 100).toFixed(2)}%, ${(ciHi * 100).toFixed(2)}%]`);
console.log(`decision: ${decision}`);
console.log(`written: ${outPath}`);
