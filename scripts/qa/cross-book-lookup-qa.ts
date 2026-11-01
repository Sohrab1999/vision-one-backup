/**
 * QA فقط‌خواندنی — F-CV-1 (Cross-Book Vocabulary Lookup)
 *
 * اجرا:  bun run scripts/qa/cross-book-lookup-qa.ts
 * هیچ فایلی نوشته نمی‌شود؛ هیچ شبکه‌ای در دسترس نیست (fetch عمداً منفجر می‌شود تا هر
 * درخواست پنهانی فوراً آشکار شود) — آزمون «آفلاین بودن کامل» به‌شکل مثبت.
 *
 * پوشش معیارهای پذیرش مأموریت §۸ (موارد قابل آزمون در سطح سرویس):
 *   ۲) واژهٔ غایب در کتاب فعال ولی موجود در کتاب دیگر → معنی منبع
 *   ۳) منبع کتاب و درس درست
 *   ۴) چند نتیجه با اولویت پایهٔ تحصیلی مرتب
 *   ۵) معنی‌های متفاوت یک املای یکسان مخلوط نشوند (هر ردیف معنی خودش را نگه می‌دارد)
 *   ۶) شکل‌های بی‌قاعده فقط با نگاشت معتبر جدول فعل کتاب منبع شناسایی شوند
 *   ۷) عدم وجود نتیجه → آرایهٔ خالی (رفتار فعلی پاپ‌آپ را نمی‌شکند)
 *   ۹+۱۰) آفلاین واقعی و صفر درخواست شبکه برای Lookup اصلی
 *   ۱۱) عملکرد: اولین lookup (بارگذاری chunk) در برابر lookup گرم (کش ماژولی)
 *   ۱۲) کتاب‌های آینده: لودرها جدول‌محورند (ساختار ثابت LIGHT_LOADERS)
 *   + جلوگیری از بارگذاری غیرضروری کتاب‌ها (موج ۲ فقط در صورت خالی بودن موج ۱)
 *   + کتاب فعال هرگز در نتایج بین‌کتابی نمی‌آید (لایهٔ محلی مالک آن است — §۲-۱۲)
 */

import { lookupCrossBook, proximityRank, loadedIndexCount, allBookMetas, CROSS_BOOK_MAX_HITS, type CrossBookHit } from "../../src/lib/cross-book-vocab";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  const mark = cond ? "✅" : "❌";
  if (!cond) failures += 1;
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ""}`);
}

function summarize(tag: string, hits: CrossBookHit[]) {
  console.log(`   ${tag}: ${hits.length} نتیجه`);
  for (const h of hits) {
    console.log(
      `     · [${h.kind}] ${h.bookId} — ${h.lessonLabel ?? "بدون درس"} — «${h.word}» = ${h.meaning || h.definition?.slice(0, 60) || "—"}${h.pos ? ` (${h.pos})` : ""}`,
    );
  }
}

async function main() {
  // ── آتش‌سوزی شبکه: هر fetch = شکست فوری (آزمون آفلاین بودن §۸-۹/۱۰) ──
  const realFetch = globalThis.fetch;
  globalThis.fetch = (() => {
    throw new Error("NETWORK CALL FORBIDDEN — lookup must be fully offline");
  }) as typeof fetch;

  try {
    console.log("═ F-CV-1 QA — سرویس بین‌کتابی (فقط‌خواندنی، بدون شبکه) ═");

    // T1 — واژهٔ غایب در فعال، موجود در کتاب دیگر (نمونهٔ واقعی گزارش کشف)
    const t0 = performance.now();
    const accidental = await lookupCrossBook("vision-one", "accidental");
    const tFirstMs = performance.now() - t0;
    summarize("accidental @vision-one", accidental);
    check("T1 accidental در grade-12 یافت شد", accidental.some((h) => h.bookId === "grade-12"));
    const g12 = accidental.find((h) => h.bookId === "grade-12");
    check("T1 منبع = درس ۱ دوازدهم", g12?.lessonLabel === "درس ۱", g12?.lessonLabel);
    check("T1 معنی چاپی حفظ شده", !!g12 && g12.meaning.includes("تصادفی"), g12?.meaning);
    check("T1 کتاب فعال در نتایج نیست", !accidental.some((h) => h.bookId === "vision-one"));

    // T2 — چند نتیجه مرتب بر نزدیکی پایه («strong» در چند کتاب مدرسه‌ای)
    const strong = await lookupCrossBook("vision-one", "strong");
    summarize("strong @vision-one", strong);
    check("T2 حداقل دو منبع مدرسه‌ای", strong.filter((h) => h.bookId !== "vision-one").length >= 2);
    const ranks = strong.map((h) => proximityRank("vision-one", h.bookId));
    check("T2 ترتیب صعودی نزدیکی پایه", ranks.every((r, i) => i === 0 || ranks[i - 1] <= r), ranks.join(" ≤ "));
    check("T2 فقط موج ۱ (کتاب‌های مدرسه‌ای)", strong.every((h) => !h.bookId.startsWith("hill") && h.bookId !== "collocations"));
    const meanings = new Set(strong.map((h) => `${h.bookId}::${h.meaning}`));
    check("T2 معنی هر کتاب مستقل نگه داشته شد (بدون ادغام)", meanings.size === strong.length);
    check("T2 سقف نتایج", strong.length <= CROSS_BOOK_MAX_HITS);
    const idxAfterWave1 = loadedIndexCount();
    check("T2 موج ۲ بارگذاری نشد (بهینه‌سازی بارگذاری)", idxAfterWave1 === 5, `loaded=${idxAfterWave1} (۶ مدرسه‌ای − فعال)`);

    // T3 — فعل بی‌قاعده فقط با نگاشت معتبر جدول فعل (went → go)
    const went = await lookupCrossBook("vision-one", "went");
    summarize("went @vision-one", went);
    check("T3 همهٔ نتایج = شکل پایه «go»", went.every((h) => h.word === "go"), went.map((h) => h.word).join(","));
    check("T3 معنی پایه present است", went.every((h) => h.meaning.length > 0));

    // T4 — کتاب فعال بی‌پایه (کالوکیشن‌ها) → کتاب‌های مدرسه‌ای به‌ترتیب پایه ۷→۱۲
    const strongColloc = await lookupCrossBook("collocations", "strong");
    summarize("strong @collocations", strongColloc);
    const collocRanks = strongColloc.map((h) => proximityRank("collocations", h.bookId));
    check("T4 ترتیب صعودی برای فعالِ بی‌پایه", collocRanks.every((r, i) => i === 0 || collocRanks[i - 1] <= r), collocRanks.join(" ≤ "));
    check("T4 فعال در نتایج نیست", !strongColloc.some((h) => h.bookId === "collocations"));

    // T5 — بدون نتیجه: رفتار فعلی پاپ‌آپ مختل نمی‌شود (آرایهٔ خالی)
    const tNone0 = performance.now();
    const none = await lookupCrossBook("vision-one", "zzqxv");
    const tNoneMs = performance.now() - tNone0;
    summarize("zzqxv @vision-one", none);
    check("T5 واژهٔ بی‌معنا = صفر نتیجه", none.length === 0);
    check("T5 واژهٔ تک‌حرفی رد می‌شود", (await lookupCrossBook("vision-one", "a")).length === 0);

    // T6 — عبارت چندواژه‌ای (موج ۲: کالوکیشن‌ها) — «make a decision» در vocab-lesson-44 کالوکیشن‌ها
    const tWave2 = await lookupCrossBook("vision-one", "make a decision");
    summarize("make a decision @vision-one", tWave2);
    check("T6 عبارت چندواژه‌ای از کالوکیشن‌ها", tWave2.some((h) => h.bookId === "collocations" && h.lessonLabel?.startsWith("درس ۴۴")), tWave2[0]?.lessonLabel ?? "");

    // T7 — عملکرد: lookup گرم (کش ماژولی) باید فوری باشد
    const t1 = performance.now();
    await lookupCrossBook("vision-one", "accidental");
    const warmMs = performance.now() - t1;
    check("T7 lookup گرم < 50ms", warmMs < 50, `${warmMs.toFixed(1)}ms`);
    console.log(`   ⏱ اولین lookup (بارگذاری chunk موج ۱): ${tFirstMs.toFixed(0)}ms · گرم: ${warmMs.toFixed(1)}ms · miss کامل: ${tNoneMs.toFixed(1)}ms`);

    // T8 — پایداری ترتیب: دو فراخوانی متوالی همان خروجی
    const again = await lookupCrossBook("vision-one", "strong");
    check("T8 نتیجهٔ تکراری پایدار", JSON.stringify(again) === JSON.stringify(strong));

    // T9 — قرارداد آینده: همهٔ ۱۱ کتاب متادیتا + لودر دارند (الگوی کتاب جدید)
    check("T9 متادیتای ۱۱ کتاب", allBookMetas().length === 11, `count=${allBookMetas().length}`);

    console.log(failures === 0 ? "\n═ همهٔ بررسی‌ها سبز — F-CV-1 سرویس تأیید شد ═" : `\n═ ${failures} بررسی قرمز ═`);
  } finally {
    globalThis.fetch = realFetch;
  }
  if (failures > 0) process.exit(1);
}

void main();
