// VIU R3-e (گیت STEP 6) — مولد مکانیکی senses.ts از کپچر راستی‌آزمایی‌شدهٔ منبع چاپی
// (بدون VLM در این گام — صرفاً تحلیل دادهٔ tracked؛ بازتولیدپذیر از Clone صرف).
// ─────────────────────────────────────────────────────────────────────────────
// منبع (tracked): docs/qa/viu-r3e-capture-upper/unit-005.json · docs/qa/viu-r3e-capture-preint/unit-003.json
//   — کپچر R3-e با پروونانس کامل: PDF tracked (SHA 415fc985…/0dfdab2e…) · رندر pdftoppm 300DPI ·
//   رونویسی z-ai vision متمرکز + پروب 500DPI + cross-check مکانیکی علیه دوگذر R3 موجود (census+verify).
//   فرمان مالک: «اینو شروع کن» (quoted R3-e gate) — trace 1a2043987aa69c95 — ۱۴۰۵/۹/۱ (۲۰۲۶-۱۱-۲۲).
// دامنه (صادقانه — فقط حس چاپی): فقط مدخل‌های نمونهٔ دیکشنری که کتاب حس شماره‌دار چاپی دارد:
//   upper p.12: ma·lig·nant (حس ۱/۲) · ma·lig·nancy (حس ۱/۲) · hairy (حس ۱/۲) — ma·lig·nant·ly بدون حس چاپی ⇒ خارج
//   preint p.8: seat¹ (حس ۱ — برچسب [C] + برچسب موضوعی SIT) — seat² فعل در صفحه چاپ نشده ⇒ خارج
// ردشده‌ها (شواهد در کپچرها/گزارش): elem u11 (شماره‌ها اپراتوری — کنترل منفی چاپی=false) ·
//   upper u86 (شماره‌های ۱..۸ ساختار تمرین حباب‌ها) · upper u36/u100 (آرتیفکت‌های ثبت‌شدهٔ census).
// قواعد مکانیکی صفر-ساختگی:
//   1) word/sense/definition/examples — verbatim از فیلد result کپچر (بدون بازنویسی)؛
//   2) حذف نشانگر ابهام «[?]» از definition (رزولوشن: تعریف پایه در گذر census هم‌خوان است — ثبت در گزارش)؛
//   3) IPA — هستهٔ پایدار خوانش‌های هم‌خوان گذرها؛ نویسهٔ پایانی ناسازگار hairy حذف و در گزارش ثبت است؛
//   4) پیوستن خط‌شکن چاپی «uncontrol-lably» → «uncontrollably» (استاندارد خواندن خط‌شکن — ثبت صادقانه)؛
//   5) خروجی = فایل senses.ts per-book با rows: WordSenseRow — در صورت خالی بودن دامنه، فایل ساخته نمی‌شود.
// مکانیزم: word-lookup.tsx LookupMaps.senses — کلیک واژه (یا کلید نرمال‌شده‌اش) ⇒ بلوک
//   «حس‌های چاپی کتاب — مدخل نمونهٔ دیکشنری» (فقط‌خواندنی — صفر نوشتن در استورها).
// گزارش اثبات: docs/qa/viu-r3e-execution-report-2026-11-22.md
// Usage: bun scripts/viu-r3e-build-senses.mjs

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

const TARGETS = [
  {
    book: "upper",
    capture: "docs/qa/viu-r3e-capture-upper/unit-005.json",
    outFile: "src/data/viu-upper/senses.ts",
    lesson: 5,
    page: "12",
    // فقط فرم‌های دارای حس چاپی — ma·lig·nant·ly (adv، بدون حس چاپی) خارج است
    includeHeadwords: ["ma·lig·nant", "ma·lig·nancy", "hairy"],
  },
  {
    book: "preint",
    capture: "docs/qa/viu-r3e-capture-preint/unit-003.json",
    outFile: "src/data/viu-preint/senses.ts",
    lesson: 3,
    page: "8",
    includeHeadwords: ["seat¹"],
  },
];

function stripUncertainty(s) {
  return String(s ?? "").replace(/\s*\[\?\]\s*/g, " ").replace(/\s+/g, " ").trim();
}

function rowsFromCapture(t, capture) {
  const rows = [];
  for (const e of capture.result.entries ?? []) {
    if (!t.includeHeadwords.includes(e.headword)) continue;
    for (const s of e.senses ?? []) {
      if (s.number == null) continue; // بدون حس چاپی = خارج (قاعدهٔ R3-e)
      rows.push({
        word: e.headword,
        sense: String(s.number),
        pos: e.pos ?? "",
        labels: e.labels ?? "",
        subject: "",
        phonetic: stripUncertainty(e.phonetic ?? ""),
        definition: stripUncertainty(s.definition ?? ""),
        examples: (s.examples ?? []).map((x) => stripUncertainty(x)).filter(Boolean),
      });
    }
    // فرم‌های مرتبط چاپ‌شده که خودشان حس چاپی دارند (مثل ma·lig·nancy)
    for (const rf of e.relatedForms ?? []) {
      if (!t.includeHeadwords.includes(rf.word)) continue;
      for (const s of rf.senses ?? []) {
        if (s.number == null) continue;
        rows.push({
          word: rf.word,
          sense: String(s.number),
          pos: rf.pos ?? "",
          labels: rf.labels ?? "",
          subject: "",
          phonetic: stripUncertainty(rf.phonetic ?? ""),
          definition: stripUncertainty(s.definition ?? ""),
          examples: (s.examples ?? []).map((x) => stripUncertainty(x)).filter(Boolean),
        });
      }
    }
  }
  return rows;
}

// اصلاحات مکانیکی ثبت‌شده (هر کدام با دلیل در اسکریپت + گزارش):
function mechanicalFixes(rows) {
  for (const r of rows) {
    // پیوستن خط‌شکن چاپی — اسکن «uncontrol-lably» (عین گذر verify: line-break hyphenation)
    r.definition = r.definition.replace("uncontrol-lably", "uncontrollably");
    // برچسب موضوعی چاپی در ابتدای تعریف (قرارداد دیکشنری‌های سبک CALD/OALD — مثل «SIT» در seat¹)
    // → به فیلد subject منتقل می‌شود (مکانیکی: واژهٔ تمام‌بزرگ ابتدای تعریف)
    const m = r.definition.match(/^([A-Z]{2,})\s+(.+)$/);
    if (m) {
      r.subject = m[1];
      r.definition = m[2];
    }
    // IPA — هستهٔ پایدار خوانش‌های هم‌خوان گذرها (نویسه‌های ناسازگار حذف — دلیل در جدول + گزارش)
    const ovr = IPA_OVERRIDES[r.word.replace(/[·¹²³]/g, "")];
    if (ovr) r.phonetic = ovr.value;
  }
  return rows;
}

// جدول نرمال‌سازی IPA — فقط جایی که گذرها ناسازگار خوانده‌اند (ثبت کامل در گزارش QA):
// hairy — چهار خوانش: census=/heəri/ · verify=/heərɪ'/ · تازه=/ˈhɛəri/ · پروب=/heəri¹/
//   هستهٔ پایدار دو گذرِ هم‌خوان (census+پروب) = /heəri/ — نویسهٔ پایانی بالانویسِ ناسازگار حذف شد.
const IPA_OVERRIDES = {
  hairy: { value: "/heəri/" },
};

let total = 0;
for (const t of TARGETS) {
  if (!existsSync(t.capture)) {
    console.error(`capture missing: ${t.capture} — skip (صفر حدس)`);
    continue;
  }
  const capture = JSON.parse(readText(t.capture));
  let rows = rowsFromCapture(t, capture);
  rows = mechanicalFixes(rows);
  if (rows.length === 0) {
    console.log(`[${t.book}] zero citable rows — no senses.ts written`);
    continue;
  }
  const body = rows
    .map(
      (r) => `  {
    word: ${JSON.stringify(r.word)},
    lesson: ${t.lesson},
    sense: ${JSON.stringify(r.sense)},
    pos: ${JSON.stringify(r.pos)},
    labels: ${JSON.stringify(r.labels)},
    subject: ${JSON.stringify(r.subject)},
    phonetic: ${JSON.stringify(r.phonetic)},
    definition: ${JSON.stringify(r.definition)},
    examples: [${r.examples.map((x) => JSON.stringify(x)).join(", ")}],
    page: ${JSON.stringify(t.page)},
  },`
    )
    .join("\n");
  const header = `// GENERATED FILE — do not edit by hand (re-generate: bun scripts/viu-r3e-build-senses.mjs)
// VIU R3-e (گیت STEP 6 — فرمان مالک trace 1a2043987aa69c95 — ۱۴۰۵/۹/۱) — حس‌های چاپی شماره‌دار
// منبع (tracked): ${t.capture} — رونویسی 300DPI + پروب 500DPI + cross-check دوگذر (provenance داخل کپچر)
// PDF منبع tracked — SHA256 ${capture.provenance.pdfSha256} — صفحهٔ کتاب ${t.page} — درس ${t.lesson}
// صفر استنتاج — فقط حس‌های شماره‌دار چاپی؛ خوشه‌های ردشده در گزارش: docs/qa/viu-r3e-execution-report-2026-11-22.md
import type { WordSenseRow } from "../types";

export const SENSES: WordSenseRow[] = [
${body}
];
`;
  mkdirSync(t.outFile.slice(0, t.outFile.lastIndexOf("/")), { recursive: true });
  writeFileSync(t.outFile, header);
  console.log(`[${t.book}] ${rows.length} rows → ${t.outFile}`);
  total += rows.length;
}
console.log(`TOTAL rows: ${total}`);

function readText(p) {
  return readFileSync(p, "utf8");
}
