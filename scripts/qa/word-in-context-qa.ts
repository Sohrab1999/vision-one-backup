/**
 * QA فقط‌خواندنی — F-CV-3 / Phase 14 Step 1 (Word in Real Context — موج ۱: کتاب فعال)
 *
 * اجرا:  bun run scripts/qa/word-in-context-qa.ts
 * هیچ فایلی نوشته نمی‌شود؛ هیچ شبکه‌ای در دسترس نیست (fetch عمداً منفجر می‌شود تا هر
 * درخواست پنهانی فوراً آشکار شود) — آزمون «آفلاین بودن کامل» به‌شکل مثبت.
 *
 * پوشش معیارهای سند UX §۱۴ (موارد قابل آزمون در سطح سرویس) و مأموریت §۷:
 *   ۲) متن جمله = عین رشتهٔ داده (بدون بازنویسی — مقایسه با خود فایل داده)
 *   ۳) تطبیق صرفی: went→go (جدول چاپی)، books→book (زنجیرهٔ پسوندی)، عبارت ۲واژه‌ای
 *   ۴) ترجمه فقط جمله‌به‌جملهٔ چاپی یا برچسب پاراگراف (سطح از ساختار واقعی داده)
 *   ۶) D7: fa خالی/چینی هرگز در نتایج نیست (texture در collo-31 = صفر نتیجه؛ collo-15 p1/p2 چینی = حذف)
 *   ۷) بدون درخواست شبکه (fetch منفجر)
 *   + سقف داخلی ۱۲، حذف تکرار با کلید یکتا، ترتیب مکالمه>گرامر>ریدینگ>نقل‌قول
 *   + خطای کتاب‌ها: ۱۱/۱۱ کتاب به‌عنوان فعال حداقل یک نتیجهٔ واقعی
 *   + degraded: شکست بارگذاری ≠ یافت‌نشده (در سطح سرویس: catch → null)
 */

import {
  lookupSentencesInActiveBook,
  hasValidFa,
  loadedSentenceIndexCount,
  WORD_CONTEXT_MAX_RESULTS,
  type ContextSentence,
} from "../../src/lib/word-in-context";
import { READING_LIST as G8_READINGS } from "../../src/data/grade-8/readings";
import { CHAPTERS as G8_CHAPTERS } from "../../src/data/grade-8/book-meta";
import { GRAMMAR_LESSON_LIST as G7_GRAMMAR } from "../../src/data/grade-7/grammar";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  const mark = cond ? "✅" : "❌";
  if (!cond) failures += 1;
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ""}`);
}

function summarize(tag: string, sentences: ContextSentence[]) {
  console.log(`   ${tag}: ${sentences.length} جمله`);
  for (const s of sentences.slice(0, 3)) {
    console.log(
      `     · [${s.refKind}/${s.level}] ${s.refId}#${s.sentIdx} — «${s.en.slice(0, 55)}${s.en.length > 55 ? "…" : ""}» mark=[${s.en.slice(s.spanStart, s.spanEnd)}]`,
    );
  }
}

function norm(s: string): string {
  return s
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

async function main() {
  // ── آتش‌سوزی شبکه: هر fetch = شکست فوری (آزمون آفلاین بودن — مأموریت §۷) ──
  const realFetch = globalThis.fetch;
  globalThis.fetch = (() => {
    throw new Error("NETWORK CALL FORBIDDEN — word-in-context must be fully offline");
  }) as typeof fetch;

  try {
    console.log("═ F-CV-3 / Phase 14 Step 1 QA — سرویس «در متن‌های واقعی» (فقط‌خواندنی، بدون شبکه) ═");

    // T1 — hit واقعی (family در grade-7: مثال گرامر عین جزوه + ریدینگ) + عین رشتهٔ داده
    const t0 = performance.now();
    const family = await lookupSentencesInActiveBook("grade-7", "family");
    const tColdMs = performance.now() - t0;
    summarize("family @grade-7", family.sentences);
    check("T1 حداقل یک نتیجه", family.sentences.length > 0);
    const famFirst = family.sentences[0];
    check("T1 سطح ترجمه = جمله‌به‌جمله", famFirst?.level === "sentence", famFirst?.level);
    // «family → families» عین مدخل examples خود جزوه است (دادهٔ واقعی — بدون بازنویسی)
    const dataItem = G7_GRAMMAR.flatMap((g) => g.blocks).flatMap((b) => (b.kind === "examples" && b.items ? b.items : [])).find((it) => norm(it.en).includes("family"));
    check("T1 متن گرامر = عین رشتهٔ داده (مقایسه با فایل)", !!famFirst && !!dataItem && famFirst.en === dataItem.en, dataItem?.en);
    const famMark = famFirst ? norm(famFirst.en.slice(famFirst.spanStart, famFirst.spanEnd)) : "";
    check("T1 mark روی واژهٔ family", famMark === "family", famMark);
    check("T1 fa معتبر غیرخالی", !!famFirst && famFirst.fa.length > 0);

    // T2 — فعل بی‌قاعده فقط از جدول چاپی خود کتاب (went → go) + ترتیب + سقف ۱۲
    const went = await lookupSentencesInActiveBook("grade-8", "went");
    summarize("went @grade-8", went.sentences);
    check("T2 سقف داخلی ۱۲", went.sentences.length === WORD_CONTEXT_MAX_RESULTS, `=${went.sentences.length}`);
    const wentMarks = went.sentences.map((s) => norm(s.en.slice(s.spanStart, s.spanEnd)));
    check("T2 همهٔ markها خانوادهٔ go از جدول چاپی", wentMarks.every((m) => ["go", "goes", "going", "gone", "went"].includes(m)), wentMarks.join(","));
    check("T2 ترتیب: مکالمه اول (§۶)", went.sentences[0]?.refKind === "conversation");
    const kindsOrder = went.sentences.map((s) => s.refKind);
    const rank = { conversation: 0, grammar: 1, reading: 2, quote: 3 } as const;
    check("T2 ترتیب صعودی رتبهٔ منبع", kindsOrder.every((k, i) => i === 0 || rank[kindsOrder[i - 1]] <= rank[k]));

    // T3 — صرف منظم (books → book/books) — عین متن
    const books = await lookupSentencesInActiveBook("grade-8", "books");
    summarize("books @grade-8", books.sentences);
    check("T3 نتیجهٔ صرف منظم", books.sentences.length > 0);
    const booksMarks = books.sentences.map((s) => norm(s.en.slice(s.spanStart, s.spanEnd)));
    check("T3 mark = book یا books", booksMarks.every((m) => m === "book" || m === "books"), booksMarks.join(","));

    // T4 — عبارت ۲واژه‌ای (n-gram با احترام به علائم)
    const phrase = await lookupSentencesInActiveBook("grade-8", "go to");
    summarize("«go to» @grade-8", phrase.sentences);
    const phraseSpans = phrase.sentences.map((s) => s.en.slice(s.spanStart, s.spanEnd).toLowerCase());
    check("T4 span عبارت دقیقاً «go to»", phrase.sentences.some((s) => s.en.slice(s.spanStart, s.spanEnd).toLowerCase() === "go to"), phraseSpans.join(" | ").slice(0, 120));

    // T5 — سطح پاراگراف + برش عین رشته از پاراگراف (mobin در ریدینگ grade-8)
    const mobin = await lookupSentencesInActiveBook("grade-8", "mobin");
    summarize("mobin @grade-8", mobin.sentences);
    const mob = mobin.sentences[0];
    check("T5 سطح = پاراگراف (برچسب C-3 در UI)", mob?.level === "paragraph");
    check("T5 paraEn/paraFa موجود", !!mob && !!mob.paraEn && !!mob.paraFa);
    const src = G8_READINGS.flatMap((r) => r.paragraphs).find((p) => p.en.includes("Mobin"));
    check(
      "T5 جمله برش عین پاراگراف است",
      !!mob && !!src && src.en.includes(mob.en) && src.en.slice(mob.paraSentenceStart ?? -1, (mob.paraSentenceStart ?? -1) + mob.en.length) === mob.en,
    );
    check("T5 ترجمه = ترجمهٔ همان پاراگراف (بدون اتصال به رکورد بیگانه)", !!mob && !!src && mob.fa === src.fa);

    // T6 — D7: fa خالی و چینی هرگز در نتایج نیست
    const texture = await lookupSentencesInActiveBook("collocations", "texture");
    summarize("texture @collocations (همهٔ پاراگراف‌ها بی‌fa)", texture.sentences);
    check("T6 texture (collo-31 — ۷ پاراگراف بی‌fa) = صفر نتیجه", texture.sentences.length === 0, `${texture.sentences.length}`);
    check("T6 degraded=false (جست‌وجو انجام شد)", texture.degraded === false);
    const aroma = await lookupSentencesInActiveBook("collocations", "aroma");
    const badIds = aroma.sentences.filter((s) => s.refId === "collo-15#p1" || s.refId === "collo-15#p2");
    check("T6 پاراگراف‌های fa چینی (collo-15 p1/p2) حذف‌اند", badIds.length === 0, `hits=${badIds.length}`);
    check("T6 aroma از پاراگراف‌های سالم می‌آید", aroma.sentences.every((s) => s.refId !== "collo-15#p1" && s.refId !== "collo-15#p2"));
    const smell = await lookupSentencesInActiveBook("collocations", "smell");
    check("T6 کنترل: واژهٔ پاراگراف سالم نتیجه دارد", smell.sentences.length > 0 && smell.sentences[0]?.refId.startsWith("collo-32"), smell.sentences[0]?.refId);
    check("T6 hasValidFa: خالی", hasValidFa("") === false && hasValidFa("   ") === false);
    check("T6 hasValidFa: چینی (VLM)", hasValidFa("这是中文") === false && hasValidFa("استعفا دهید 自愿 خارج شوید") === false);
    check("T6 hasValidFa: فارسی معتبر", hasValidFa("خوراکی‌ها را در کیسه گذاشت.") === true);
    check("T6 hasValidFa: بدون حرف فارسی", hasValidFa("not persian") === false);

    // T7 — نقل‌قول فصل‌ها در دامنه است (واژه‌ای که نتایجش به سقف ۱۲ نرسد انتخاب می‌شود)
    let quoteHit: ContextSentence | undefined;
    let quoteWord = "";
    outer: for (const ch of G8_CHAPTERS) {
      for (const w of ch.quote.en.split(/\s+/)) {
        const nw = norm(w);
        if (nw.length < 4) continue;
        const res = await lookupSentencesInActiveBook("grade-8", nw);
        const hit = res.sentences.find((s) => s.refKind === "quote");
        if (hit) {
          quoteHit = hit;
          quoteWord = nw;
          break outer;
        }
      }
    }
    check("T7 نقل‌قول فصل در نتایج", !!quoteHit, `word=${quoteWord} quoteRef=${quoteHit?.refId}`);
    if (quoteHit) {
      const ch = G8_CHAPTERS.find((c) => `ch${c.id}` === quoteHit!.refId);
      check("T7 متن نقل‌قول = عین دادهٔ فصل", !!ch && ch.quote.en === quoteHit!.en);
    }

    // T8 — بدون نتیجه ≠ degraded؛ کوئری کوتاه
    const zz = await lookupSentencesInActiveBook("grade-8", "zzqxv");
    check("T8 واژهٔ بی‌جمله = خالی و degraded=false", zz.sentences.length === 0 && zz.degraded === false);
    const single = await lookupSentencesInActiveBook("grade-8", "a");
    check("T8 کوئری تک‌حرفی = خالی (نگهبان <۲)", single.sentences.length === 0);

    // T9 — ۱۱/۱۱ کتاب به‌عنوان فعال حداقل یک نتیجهٔ واقعی دارند (معیار §۱۴-۲ در سطح سرویس)
    const allIds = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12", "collocations", "hill-intro", "hill-elem", "hill-inter", "hill-adv"] as const;
    let booksOk = 0;
    for (const id of allIds) {
      const res = await lookupSentencesInActiveBook(id, "the");
      // «the» در همهٔ متن‌ها هست؛ اگر سرویس/ایندکس کتاب درست ساخته شده باشد ≥۱ نتیجه دارد
      if (res.sentences.length > 0 && !res.degraded) booksOk += 1;
      else console.log(`     ⚠️ ${id}: ${res.sentences.length} نتیجه (degraded=${res.degraded})`);
    }
    check("T9 هر ۱۱ کتاب به‌عنوان فعال نتیجه دارد", booksOk === 11, `${booksOk}/11`);

    // T10 — سلامت خط منبع و کلید یکتا «درون هر نتیجه» (تکرار میان کوئری‌های مختلف طبیعی است)
    const sampleLookups = [family.sentences, went.sentences, mobin.sentences, aroma.sentences, smell.sentences, books.sentences];
    for (const [i, arr] of sampleLookups.entries()) {
      const keys = arr.map((s) => `${s.bookId}::${s.refKind}::${s.refId}::${s.sentIdx}`);
      check(`T10-${i + 1} کلید یکتا درون نتیجه`, new Set(keys).size === keys.length);
    }
    const samples = sampleLookups.flat();
    const kinds = new Set(samples.map((s) => s.refKind));
    check("T10 فقط ۴ منبع مجاز", [...kinds].every((k) => ["conversation", "grammar", "reading", "quote"].includes(k)));
    check("T10 contentType برای همه موجود", samples.every((s) => s.source.contentType.length > 0));
    check("T10 بازهٔ mark درون مرزهای متن", samples.every((s) => s.spanStart >= 0 && s.spanEnd > s.spanStart && s.spanEnd <= s.en.length));
    check("T10 ترجمه خالی نیست (D7)", samples.every((s) => hasValidFa(s.fa)));

    // T11 — کارایی: ایندکس گرم باید فوری باشد (الگوی ۲۴ms در F-CV-1)
    const t1 = performance.now();
    await lookupSentencesInActiveBook("grade-7", "school");
    const warmMs = performance.now() - t1;
    check("T11 lookup گرم < 100ms", warmMs < 100, `${warmMs.toFixed(1)}ms (cold T1: ${tColdMs.toFixed(1)}ms)`);
    check("T11 ایندکس‌های بارگذاری‌شده", loadedSentenceIndexCount() >= 8, `loaded=${loadedSentenceIndexCount()}`);

    // جمع‌بندی
    console.log("═ جمع‌بندی ═");
    if (failures === 0) {
      console.log("✅ همهٔ بررسی‌ها سبز — سرویس آفلاین، عین متن، سطح‌دار و D7-سازگار است.");
    } else {
      console.log(`❌ ${failures} بررسی قرمز — قبل از ادامه رفع شود.`);
    }
  } finally {
    globalThis.fetch = realFetch;
  }
  process.exit(failures === 0 ? 0 : 1);
}

main();
