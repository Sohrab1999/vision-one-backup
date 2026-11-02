/**
 * QA فقط‌خواندنی — F-CV-3 / Phase 14 Step 2 (موج ۲ بین‌کتابی «در متن‌های واقعی»)
 *
 * اجرا:  bun run scripts/qa/word-in-context-wave2-qa.ts
 * هیچ فایلی نوشته نمی‌شود؛ fetch عمداً منفجر می‌شود (آزمون مثبت آفلاین بودن — الگوی گام ۱).
 *
 * پوشش مأموریت §۸-۱ (تست سرویس موج دوم):
 *   - کتاب فعال از موج ۲ حذف است؛ فقط پایه‌دارهای ۷→۱۲ (hill/collocations هرگز — D1)
 *   - |Δپایه| صحیح و صعودی؛ ترتیب deterministic؛ tie-breaker = پایهٔ صعودی (§۶ سند UX)
 *   - ادغام §۶-۴: ① نتایج کتاب فعال (پیشوند دست‌نخورده) ② سپس کتاب‌های دیگر —
 *     «Miss با موج اول و دوم» (§۸-۲ مأموریت)؛ سقف ۱۲ در سطح کل سکشن (§۳-۵)
 *   - مسیر hit (includeWave2=false) بایت‌به‌بایت موج ۱ — بدون نشت موج ۲
 *   - حذف تکرار با کلید ۴جزئی؛ D7 (fa خالی/چینی حذف)؛ mark درون مرزها؛ سطح سازگار
 *   - فعالِ بی‌پایه (hill) = ترتیب صعودی پایه (رفتار proximityRank)
 *   - پیش‌شرط نشان «نزدیک‌ترین پایه»: اولین آیتم کتاب خارج از فعال = نزدیک‌ترین کتابِ حاضر
 */

import {
  lookupSentencesInActiveBook,
  lookupSentencesWithStatus,
  gradedWave2Order,
  hasValidFa,
  WORD_CONTEXT_MAX_RESULTS,
  type ContextSentence,
} from "../../src/lib/word-in-context";
import { isGradedBookId, proximityRank } from "../../src/lib/cross-book-vocab";
import { READING_LIST as G7_READINGS } from "../../src/data/grade-7/readings";
import { CONVERSATION_LIST as G7_CONVERSATIONS } from "../../src/data/grade-7/conversations";
import { READING_LIST as G8_READINGS } from "../../src/data/grade-8/readings";
import { CONVERSATION_LIST as G8_CONVERSATIONS } from "../../src/data/grade-8/conversations";
import { READING_LIST as G9_READINGS } from "../../src/data/grade-9/readings";
import { CONVERSATION_LIST as G9_CONVERSATIONS } from "../../src/data/grade-9/conversations";
import { ALL_VOCAB as G8_VOCAB } from "../../src/data/grade-8/vocab";
import { DICTIONARY as G8_DICT } from "../../src/data/grade-8/dictionary";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  const mark = cond ? "✅" : "❌";
  if (!cond) failures += 1;
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ""}`);
}

function norm(s: string): string {
  return s
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

const GRADE_OF: Record<string, number> = { "grade-7": 7, "grade-8": 8, "grade-9": 9, "vision-one": 10, "grade-11": 11, "grade-12": 12 };
const KIND_RANK = { conversation: 0, grammar: 1, reading: 2, quote: 3 } as const;

function gradeOfBook(id: string): number {
  return GRADE_OF[id] ?? -1;
}

/** آیا ترتیب قطعه‌های هم‌کتاب با |Δپایه| صعودی و tie-breaker پایهٔ صعودی سازگار است؟ */
function bookOrderOk(active: string, sentences: ContextSentence[]): boolean {
  let prevRank = -Infinity;
  let prevGrade = -Infinity;
  for (const s of sentences) {
    const r = proximityRank(active as never, s.bookId);
    const g = gradeOfBook(s.bookId);
    if (r < prevRank) return false;
    if (r === prevRank && g < prevGrade) return false; // فاصلهٔ برابر → پایهٔ صعودی
    prevRank = r;
    prevGrade = g;
  }
  return true;
}

/** کلید ۴جزئی §۶ با bookId */
const key4 = (s: ContextSentence) => `${s.bookId}::${s.refKind}::${s.refId}::${s.sentIdx}`;

/** واژه‌های نامزد آزمون از دادهٔ واقعی (۷/۸/۹) — بدون حدس */
function collectCandidateWords(): string[] {
  const words = new Set<string>();
  const add = (en: string) => {
    for (const m of en.matchAll(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)) {
      const w = norm(m[0]);
      if (w.length >= 4) words.add(w);
    }
  };
  for (const r of G7_READINGS) for (const p of r.paragraphs) add(p.en);
  for (const c of G7_CONVERSATIONS) for (const l of c.lines) add(l.en);
  for (const r of G8_READINGS) for (const p of r.paragraphs) add(p.en);
  for (const c of G8_CONVERSATIONS) for (const l of c.lines) add(l.en);
  for (const r of G9_READINGS) for (const p of r.paragraphs) add(p.en);
  for (const c of G9_CONVERSATIONS) for (const l of c.lines) add(l.en);
  return [...words];
}

/** پیش‌شرط miss کامل پاپ‌آپ برای واژه در grade-8: نه در واژگان، نه در دیکشنری */
function popupMissProxyG8(word: string): boolean {
  const w = norm(word);
  if (G8_VOCAB.some((v) => norm(v.word) === w)) return false;
  if (G8_DICT.some((d) => norm(d.word) === w)) return false;
  return true;
}

/** قواعد مشترک هر نتیجهٔ موج ۲ (D7/سطح/mark/تکرار/سقف/دامنه) */
function assertCommonRules(tag: string, active: string, result: ContextSentence[]) {
  check(`${tag} دامنه D1: فقط پایه‌دارهای ۷→۱۲ (hill/collocations هرگز)`, result.every((s) => isGradedBookId(s.bookId)));
  check(`${tag} ترتیب کتاب‌ها = |Δپایه| صعودی + tie پایهٔ صعودی`, bookOrderOk(active, result));
  const keys = result.map(key4);
  check(`${tag} کلید ۴جزئی یکتا (حذف تکرار)`, new Set(keys).size === keys.length);
  check(`${tag} سقف ۱۲ سطح سکشن`, result.length <= WORD_CONTEXT_MAX_RESULTS, `=${result.length}`);
  check(`${tag} D7: fa همهٔ نتایج معتبر (غیرخالی/غیرچینی)`, result.every((s) => hasValidFa(s.fa)));
  check(`${tag} بدون کاراکتر چینی در fa`, result.every((s) => !/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(s.fa)));
  check(`${tag} mark درون مرزهای متن`, result.every((s) => s.spanStart >= 0 && s.spanEnd > s.spanStart && s.spanEnd <= s.en.length));
  check(`${tag} سطح ترجمه سازگار با ساختار`, result.every((s) => (s.level === "paragraph" ? s.paraEn !== undefined && s.paraFa !== undefined : s.paraEn === undefined)));
  // درون هر قطعهٔ هم‌کتاب: ترتیب §۶ (مکالمه>گرامر>ریدینگ>نقل‌قول)
  let inBookOrderOk = true;
  let prevBook = "";
  let prevKind = -1;
  for (const s of result) {
    if (s.bookId !== prevBook) {
      prevBook = s.bookId;
      prevKind = -1;
    }
    const k = KIND_RANK[s.refKind];
    if (k < prevKind) inBookOrderOk = false;
    prevKind = k;
  }
  check(`${tag} درون هر کتاب ترتیب §۶`, inBookOrderOk);
}

async function main() {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (() => {
    throw new Error("NETWORK CALL FORBIDDEN — word-in-context wave2 must be fully offline");
  }) as typeof fetch;

  try {
    console.log("═ F-CV-3 / Phase 14 Step 2 QA — موج ۲ بین‌کتابی (فقط‌خواندنی، بدون شبکه) ═");

    // ── W1 — ترتیب پایهٔ موج ۲: قواعد D1/§۶ به‌صورت خالص ──
    const allIds = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12", "collocations", "hill-intro", "hill-elem", "hill-inter", "hill-adv"] as const;
    for (const active of allIds) {
      const o1 = gradedWave2Order(active);
      const o2 = gradedWave2Order(active);
      check(`W1 ${active}: deterministic`, JSON.stringify(o1) === JSON.stringify(o2), o1.join(","));
      check(`W1 ${active}: فعال حذف`, !o1.includes(active));
      check(`W1 ${active}: فقط پایه‌دارهای ۷→۱۲`, o1.every((id) => isGradedBookId(id)), o1.join(","));
      check(`W1 ${active}: |Δپایه| صعودی`, bookOrderOk(active, o1.map((b) => ({ bookId: b } as ContextSentence))), o1.map((b) => `${b}(Δ${proximityRank(active, b)})`).join(","));
    }
    check("W1 grade-8 ترتیب دقیق (tie ۷/۹ → صعودی)", JSON.stringify(gradedWave2Order("grade-8")) === JSON.stringify(["grade-7", "grade-9", "vision-one", "grade-11", "grade-12"]), gradedWave2Order("grade-8").join(","));
    check("W1 vision-one ترتیب دقیق (tie ۹/۱۱ و ۸/۱۲ → صعودی)", JSON.stringify(gradedWave2Order("vision-one")) === JSON.stringify(["grade-9", "grade-11", "grade-8", "grade-12", "grade-7"]), gradedWave2Order("vision-one").join(","));
    check("W1 فعال بی‌پایه (hill-intro) = صعودی پایه", JSON.stringify(gradedWave2Order("hill-intro")) === JSON.stringify(["grade-7", "grade-8", "grade-9", "vision-one", "grade-11", "grade-12"]), gradedWave2Order("hill-intro").join(","));
    check("W1 سقف داخلی ۱۲ دست‌نخورده", WORD_CONTEXT_MAX_RESULTS === 12, `=${WORD_CONTEXT_MAX_RESULTS}`);

    // ── W2 — گیت‌های اجرای موج ۲ ──
    // مسیر hit (includeWave2=false یا بدون options) ≡ موج ۱ بایت‌به‌بایت
    for (const [book, word] of [["grade-8", "went"], ["vision-one", "the"], ["hill-elem", "forest"]] as const) {
      const w1 = await lookupSentencesInActiveBook(book, word);
      const gated = await lookupSentencesWithStatus(book, word, { includeWave2: false });
      check(`W2 includeWave2=false ≡ موج ۱ (${word}@${book})`, JSON.stringify(gated) === JSON.stringify(w1), `${w1.sentences.length} جمله`);
      const noOpts = await lookupSentencesWithStatus(book, word);
      check(`W2 بدون options ≡ موج ۱ (${word}@${book})`, JSON.stringify(noOpts) === JSON.stringify(w1));
    }
    const short = await lookupSentencesWithStatus("grade-8", "a", { includeWave2: true });
    check("W2 کوئری تک‌حرفی = خالی (نگهبان <۲ حتی با موج ۲)", short.sentences.length === 0 && short.degraded === false);

    // ادغام: hit موج ۱ + includeWave2=true → پیشوند موج ۱ دست‌نخورده + دنبالهٔ بین‌کتابی
    const famW1 = await lookupSentencesInActiveBook("grade-7", "family");
    const famMerged = await lookupSentencesWithStatus("grade-7", "family", { includeWave2: true });
    check("W2 پیشوند موج ۱ در ادغام دست‌نخورده", JSON.stringify(famMerged.sentences.slice(0, famW1.sentences.length)) === JSON.stringify(famW1.sentences), `wave1=${famW1.sentences.length} merged=${famMerged.sentences.length}`);
    check("W2 دنبالهٔ ادغام فقط از کتاب‌های دیگرِ پایه‌دار", famMerged.sentences.slice(famW1.sentences.length).every((s) => s.bookId !== "grade-7" && isGradedBookId(s.bookId)));
    check("W2 ادغام: ترتیب |Δپایه| در دنباله", bookOrderOk("grade-7", famMerged.sentences.slice(famW1.sentences.length)));
    assertCommonRules("W2-merged(family@grade-7):", "grade-7", famMerged.sentences);

    // ── W3 — یافتن واژه‌های آزمونی (داده‌محور — بدون حدس) ──
    const candidates = collectCandidateWords();
    console.log(`   نامزدهای واژه از دادهٔ واقعی: ${candidates.length}`);
    // (الف) واژهٔ miss موج ۱ با نتیجهٔ موج ۲ — سکشن «فقط موج ۲»
    let w2Only: { word: string; result: ContextSentence[] } | null = null;
    let w2OnlyMultiBook: { word: string; result: ContextSentence[] } | null = null;
    let capDemo: { word: string; count: number } | null = null;
    // (ب) واژهٔ مرئی grade-8 با miss کامل پاپ‌آپ که هم موج ۱ دارد هم موج ۲ — سکشن ادغامی
    let mergedDemo: { word: string; wave1: number; result: ContextSentence[] } | null = null;
    let scanned = 0;
    for (const w of candidates) {
      if (scanned >= 700) break;
      const w1 = await lookupSentencesInActiveBook("grade-8", w);
      const w2 = await lookupSentencesWithStatus("grade-8", w, { includeWave2: true });
      const cross = w2.sentences.filter((s) => s.bookId !== "grade-8");
      if (!w2Only && w1.sentences.length === 0 && cross.length > 0) w2Only = { word: w, result: cross };
      if (!w2OnlyMultiBook && w1.sentences.length === 0 && cross.length > 0 && new Set(cross.map((s) => s.bookId)).size >= 2) {
        w2OnlyMultiBook = { word: w, result: cross };
      }
      if (!mergedDemo && w1.sentences.length > 0 && cross.length > 0 && popupMissProxyG8(w)) {
        mergedDemo = { word: w, wave1: w1.sentences.length, result: w2.sentences };
      }
      if (!capDemo && w2.sentences.length >= WORD_CONTEXT_MAX_RESULTS) capDemo = { word: w, count: w2.sentences.length };
      scanned += 1;
      if (w2OnlyMultiBook && mergedDemo && capDemo) break;
    }
    const use = w2OnlyMultiBook ?? w2Only;
    check("W3 الف — واژهٔ فقط-موج-۲ یافت شد (miss موج ۱، نتیجه از کتاب‌های دیگر)", !!use, use ? `${use.word} — ${use.result.length} جمله از ${new Set(use.result.map((s) => s.bookId)).size} کتاب` : "هیچ");
    check("W3 ب — واژهٔ ادغامی یافت شد (مرئی grade-8، miss پاپ‌آپ، موج ۱+۲)", !!mergedDemo, mergedDemo ? `${mergedDemo.word} — موج۱=${mergedDemo.wave1}، کل=${mergedDemo.result.length}` : "هیچ");
    if (capDemo) check("W3 نمونهٔ رسیدن به سقف ۱۲ یافت شد", true, `${capDemo.word} = ${capDemo.count}`);
    else console.log("   ⚠️ W3: هیچ واژه‌ای در نمونه‌ها به سقف ۱۲ نرسید (بررسی ≤۱۲ همچنان روی همهٔ نتایج اجرا می‌شود)");

    // ── W4 — قواعد نتیجهٔ فقط-موج-۲ ──
    if (use) {
      const { word, result } = use;
      console.log(`   واژهٔ آزمونی فقط-موج-۲: «${word}» @grade-8 → ${result.length} جمله از: ${[...new Set(result.map((s) => s.bookId))].join(", ")}`);
      for (const s of result.slice(0, 3)) {
        console.log(`     · [${s.bookId}/${s.refKind}/${s.level}] ${s.refId}#${s.sentIdx} — «${s.en.slice(0, 50)}…» mark=[${s.en.slice(s.spanStart, s.spanEnd)}]`);
      }
      check("W4 کتاب فعال حذف", result.every((s) => s.bookId !== "grade-8"));
      assertCommonRules("W4:", "grade-8", result);
      // پیش‌شرط نشان: اولین آیتم = نزدیک‌ترین کتابِ حاضر در نتایج
      const booksInResult = [...new Set(result.map((s) => s.bookId))];
      const minRank = Math.min(...booksInResult.map((b) => proximityRank("grade-8", b)));
      check("W4 اولین نتیجه = نزدیک‌ترین کتابِ حاضر (پیش‌شرط نشان)", result.length > 0 && proximityRank("grade-8", result[0].bookId) === minRank, `${result[0].bookId} (Δ${proximityRank("grade-8", result[0].bookId)})`);
      const again = await lookupSentencesWithStatus("grade-8", word, { includeWave2: true });
      check("W4 deterministic (اجرای دوم = JSON برابر)", JSON.stringify(again.sentences) === JSON.stringify(result));
      check("W4 degraded=false (ایندکس‌ها بارگذاری شدند)", again.degraded === false);
    }

    // ── W5 — سکشن ادغامی واقعی (miss پاپ‌آپ + موج ۱ و موج ۲ همزمان — §۸-۲ مأموریت) ──
    if (mergedDemo) {
      const { word, wave1, result } = mergedDemo;
      console.log(`   واژهٔ آزمونی ادغامی: «${word}» @grade-8 → موج۱=${wave1}، کل=${result.length} از: ${[...new Set(result.map((s) => s.bookId))].join(", ")}`);
      const w1 = await lookupSentencesInActiveBook("grade-8", word);
      check("W5 پیشوند موج ۱ در سکشن ادغامی دست‌نخورده", JSON.stringify(result.slice(0, w1.sentences.length)) === JSON.stringify(w1.sentences));
      check("W5 دنباله از کتاب‌های دیگرِ پایه‌دار", result.slice(w1.sentences.length).every((s) => s.bookId !== "grade-8" && isGradedBookId(s.bookId)));
      // پیش‌شرط نشان در ادغام: اولین آیتمِ کتاب خارج از فعال = نزدیک‌ترین کتابِ حاضر در دنبالهٔ بین‌کتابی
      const firstCross = result.findIndex((s) => s.bookId !== "grade-8");
      const crossBooks = [...new Set(result.filter((s) => s.bookId !== "grade-8").map((s) => s.bookId))];
      const minCrossRank = Math.min(...crossBooks.map((b) => proximityRank("grade-8", b)));
      check("W5 اولین آیتم بین‌کتابی = نزدیک‌ترین کتابِ حاضر (پیش‌شرط نشان)", firstCross >= 0 && proximityRank("grade-8", result[firstCross].bookId) === minCrossRank, `idx=${firstCross} book=${result[firstCross]?.bookId}`);
      assertCommonRules("W5:", "grade-8", result);
    }

    // ── W6 — فعال بی‌پایه (hill-intro): موج ۲ = ۶ کتاب مدرسه‌ای به‌ترتیب پایه ──
    let hillDemo: { word: string; result: ContextSentence[] } | null = null;
    let scanned2 = 0;
    for (const w of candidates) {
      if (scanned2 >= 300) break;
      const w1 = await lookupSentencesInActiveBook("hill-intro", w);
      if (w1.sentences.length > 0) continue;
      scanned2 += 1;
      const w2 = await lookupSentencesWithStatus("hill-intro", w, { includeWave2: true });
      if (w2.sentences.length > 0) {
        hillDemo = { word: w, result: w2.sentences };
        break;
      }
    }
    if (hillDemo) {
      console.log(`   واژهٔ آزمونی فعال بی‌پایه: «${hillDemo.word}» @hill-intro → ${hillDemo.result.length} جمله`);
      check("W6 hill فعال: نتیجه فقط از پایه‌دارها", hillDemo.result.every((s) => isGradedBookId(s.bookId)));
      check("W6 hill فعال: ترتیب صعودی پایه (۷→۱۲)", bookOrderOk("hill-intro", hillDemo.result), hillDemo.result.map((s) => s.bookId).join(","));
      check("W6 hill فعال: D7 و کلید یکتا", hillDemo.result.every((s) => hasValidFa(s.fa)) && new Set(hillDemo.result.map(key4)).size === hillDemo.result.length);
    } else {
      check("W6 واژهٔ موج ۲ برای hill-intro یافت نشد (ثبت — نه شکست قاعده)", false, "هیچ نامزدی نتیجه نداشت");
    }

    // ── W7 — کارایی: موج ۲ گرم باید سریع بماند (۵ ایندکس کش‌شده + ۵ جست‌وجو) ──
    if (use) {
      const t0 = performance.now();
      await lookupSentencesWithStatus("grade-8", use.word, { includeWave2: true });
      const warmMs = performance.now() - t0;
      check("W7 موج ۲ گرم < 150ms", warmMs < 150, `${warmMs.toFixed(1)}ms`);
    }

    // جمع‌بندی
    console.log("═ جمع‌بندی ═");
    if (failures === 0) {
      console.log("✅ همهٔ بررسی‌های موج ۲ سبز — رتبه‌بندی deterministic، دامنهٔ D1، ادغام §۶-۴، سقف سکشن و D7 برقرار است.");
    } else {
      console.log(`❌ ${failures} بررسی قرمز — قبل از ادامه رفع شود.`);
    }
  } finally {
    globalThis.fetch = realFetch;
  }
  process.exit(failures === 0 ? 0 : 1);
}

main();
