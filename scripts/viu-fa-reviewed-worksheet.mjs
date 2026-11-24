// FA-REVIEWED — بستهٔ داوری مالک (اجرای مجازی — آخرین گام مکانیکی پیش از گیت انسانی)
// ورودی فقط‌خواندنی: docs/qa/viu-r4a-translation-review-2026-11-19.json (۳۹۷ سطر per-item — داور GLM)
// + اسکن فقط‌خواندنی runtime (src/data/viu-*/vocab-part-*.ts) برای راستی‌آزمایی تطابق review↔runtime پس از R4-b.
// خروجی: docs/qa/viu-fa-reviewed-adjudication-worksheet-<date>.json — برگهٔ داوری ساختاریافته با فیلدهای
// ownerDecision/ownerNote خالی — پرکردن آن‌ها فقط با فرمان/بازخوانی انسانی مالک انجام می‌شود.
// کلاس FA-REVIEWED با این اسکریپت اعطا نمی‌شود — صفر تغییر دادهٔ محصولی.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const DATE = "2026-11-20";
const REVIEW = "docs/qa/viu-r4a-translation-review-2026-11-19.json";
const FIX_SCRIPT = "scripts/viu-r4-b-translation-fix.mjs";
const OUT = `docs/qa/viu-fa-reviewed-adjudication-worksheet-${DATE}.json`;

// ---- استخراج مکانیکی جدول FIXES از اسکریپت جراحی R4-b (بدون اجرای آن — فقط خواندن متن) ----
const fixSrc = readFileSync(FIX_SCRIPT, "utf8");
const blockRe = /id: "(R4A-\d+)", book: "(\w+)", lesson: (\d+), word: "((?:[^"\\]|\\.)*)",\s*\n\s*old: "((?:[^"\\]|\\.)*)",\s*\n\s*new: "((?:[^"\\]|\\.)*)", reason: "((?:[^"\\]|\\.)*)"/g;
const FIXES = new Map();
let m;
while ((m = blockRe.exec(fixSrc)) !== null) {
  FIXES.set(m[1], { book: m[2], lesson: Number(m[3]), word: m[4], oldMeaning: m[5], newMeaning: m[6], reason: m[7] });
}

// ---- بارگذاری vocab runtime per-book (فقط‌خواندنی) ----
function loadBook(book) {
  const dir = `src/data/viu-${book}`;
  const files = readdirSync(dir).filter((f) => /^vocab-part-\d+\.ts$/.test(f)).sort();
  return files.map((f) => ({ file: `${dir}/${f}`, src: readFileSync(`${dir}/${f}`, "utf8") }));
}
const runtime = { elem: loadBook("elem"), preint: loadBook("preint"), upper: loadBook("upper") };

function tsEscape(s) {
  // مطابق لفظِ درون فایل TS (quoteهای درون رشته با \" گریخته می‌شوند — عین همان در جست‌وجوی زیررشته)
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function countOccurrences(book, needle) {
  let n = 0;
  for (const { src } of runtime[book]) n += src.split(needle).length - 1;
  return n;
}

// ---- ساخت worksheet ----
const j = JSON.parse(readFileSync(REVIEW, "utf8"));
if (!Array.isArray(j.review) || j.review.length !== 397) {
  console.error(`FATAL: review rows = ${j.review?.length} (expected 397)`);
  process.exit(1);
}

const items = [];
let okVerified = 0, fixVerified = 0, mismatches = [];
for (const r of j.review) {
  const base = {
    id: r.id, book: r.book, lesson: r.lesson, word: r.word,
    meaningAtReview: r.meaning, verdict: r.verdict,
  };
  if (r.note) base.note = r.note;
  const fix = r.verdict === "FIX" ? FIXES.get(r.id) : null;
  if (r.verdict === "FIX" && !fix) {
    console.error(`FATAL: FIX row ${r.id} بدون متناظر در جدول R4-b`);
    process.exit(1);
  }
  if (fix) {
    // راستی‌آزمایی دوطرفه: old حذف شده · new در runtime حاضر (عین قواعد جراحی R4-b)
    const oldCount = countOccurrences(r.book, `meaning: "${tsEscape(fix.oldMeaning)}"`);
    const newCount = countOccurrences(r.book, `meaning: "${tsEscape(fix.newMeaning)}"`);
    const wordPresent = countOccurrences(r.book, `word: "${tsEscape(fix.word)}"`);
    const check = { oldMeaningStillInRuntime: oldCount, newMeaningInRuntime: newCount, wordInRuntime: wordPresent };
    const verified = oldCount === 0 && newCount >= 1 && wordPresent >= 1;
    if (verified) fixVerified++; else mismatches.push({ id: r.id, check });
    items.push({
      ...base,
      fix: { oldMeaning: fix.oldMeaning, currentMeaning: fix.newMeaning, reason: fix.reason, sourceScript: FIX_SCRIPT },
      runtimeCheck: check,
      runtimeVerified: verified,
      ownerDecision: null,
      ownerNote: null,
    });
  } else {
    const occ = countOccurrences(r.book, `meaning: "${tsEscape(r.meaning)}"`);
    const check = { meaningOccurrencesInRuntime: occ };
    const verified = occ >= 1;
    if (verified) okVerified++; else mismatches.push({ id: r.id, check });
    items.push({
      ...base,
      runtimeCheck: check,
      runtimeVerified: verified,
      ownerDecision: null,
      ownerNote: null,
    });
  }
}

const notes = items.filter((x) => x.note).map((x) => x.id);
const worksheet = {
  meta: {
    phase: "FA-REVIEWED — بستهٔ داوری مالک (اجرای مجازی — گام مکانیکی آخر)",
    date: DATE,
    purpose: "برگهٔ داوری ساختاریافتهٔ نمونهٔ ۳۹۷تایی R4-a برای بازخوانی انسانی مالک — تنها مسیر اعطای کلاس FA-REVIEWED",
    sources: [REVIEW, FIX_SCRIPT, "src/data/viu-*/vocab-part-*.ts"],
    judgeAtReview: j.meta.judge,
    criteria: j.meta.criteria,
    classRule: "هیچ آیتمی با این بسته FA-REVIEWED نمی‌شود — کلاس فقط با فرمان داوری مالک اعطا می‌شود",
    howToAdjudicate: {
      decisionVocabulary: "APPROVE (تأیید عین معنی حاضر) | EDIT (مالک معنی جایگزین می‌دهد) | REJECT (مردود — معنی جایگزین الزامی)",
      priorityOrder: "۱) آیتم‌های FIX (۱۰ — پیش‌تر توسط GLM اصلاح شده‌اند و نیازمند تأیید مالک) ۲) آیتم‌های note‌دار (۱۰ — «قبول با نکته») ۳) مابقی OK (۳۷۷)",
      commandGrammar: "پس از پر کردن ownerDecision (+ ownerNote اختیاری) در همین JSON یا ارسال فهرست «id: decision [note]»، اجرای اعمال فقط با فرمان صریح مالک انجام می‌شود (اسکریپت اعمال آینده gated)",
    },
  },
  stats: {
    n: items.length,
    ok: items.filter((x) => x.verdict === "OK").length,
    fix: items.filter((x) => x.verdict === "FIX").length,
    withNote: notes.length,
    runtimeVerifiedOk: okVerified,
    runtimeVerifiedFix: fixVerified,
    runtimeMismatches: mismatches,
    byBook: items.reduce((acc, x) => { acc[x.book] = (acc[x.book] || 0) + 1; return acc; }, {}),
  },
  items,
};

writeFileSync(OUT, JSON.stringify(worksheet, null, 2) + "\n", "utf8");
console.log(`worksheet items = ${items.length} (ok=${worksheet.stats.ok} fix=${worksheet.stats.fix} notes=${worksheet.stats.withNote})`);
console.log(`runtime-verified: ok=${okVerified}/${worksheet.stats.ok} fix=${fixVerified}/${worksheet.stats.fix} mismatches=${mismatches.length}`);
mismatches.slice(0, 10).forEach((x) => console.log("MISMATCH", JSON.stringify(x)));
console.log(`OUT: ${OUT}`);
