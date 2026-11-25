// R4-b موج اصلاح هدفمند — فقط موارد مردود نمونهٔ R4-a (۱۰ مورد از ۳۹۷ ≈ ۲٫۵٪)
// نقشه راه §فاز R4: «فقط اصلاح موارد مردود» · کلاس FA-REVIEWED فقط با بازخوانی انسانی (این موج اعطا نمی‌کند)
// قواعد جراحی: idempotent · match دقیق meaning قدیمی + word + lesson در فایل صحیح · صفر تغییر دیگر
// db دست‌نخورده (واژگان در db نیست — schema فاقد جدول vocab)
import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";

const FIXES = [
  { id: "R4A-136", book: "preint", lesson: 51, word: "cousin(s)",
    old: "پسرخاله/دوپسر عمو و... (پسرعمو/دخترعمو)",
    new: "پسرعمو/دخترعمو/پسرخاله/دخترخاله و...", reason: "typo «دوپسر عمو»" },
  { id: "R4A-219", book: "upper", lesson: 9, word: "post-impressionist",
    old: "پسادربیمی‌گرا",
    new: "پساامپرسیونیست", reason: "typo «دربیمی» — نام‌گذاری جنبش صحیح" },
  { id: "R4A-240", book: "upper", lesson: 19, word: "moo",
    old: "صدا کردن (گاو: موقردن)",
    new: "موق گفتن (صدای گاو)", reason: "«موقردن» نامأنوس" },
  { id: "R4A-245", book: "upper", lesson: 18, word: "would",
    old: "خواهد (فعل کمکی)",
    new: "فعل کمکی شرطی (گذشتهٔ will)", reason: "معنی «خواهد» گمراه‌کننده — would آیندهٔ ساده نیست" },
  { id: "R4A-262", book: "upper", lesson: 24, word: "it's all very well ... but",
    old: "خوب است گفتنِ... اما (انتقاد آمیخته با تقابل)",
    new: "خیلی خوب است که... اما (برای بیان انتقاد)", reason: "عبارت آشفته با اعراب نابجا" },
  { id: "R4A-266", book: "upper", lesson: 22, word: "unless",
    old: "مگر اینکه، به‌جز اینکه اگر",
    new: "مگر اینکه", reason: "بخش دوم آشفته و زائد" },
  { id: "R4A-277", book: "upper", lesson: 38, word: "assertive",
    old: "پرانگیزه و با اعتماد به نفس",
    new: "صریح، قاطع و مطمئن (با اعتماد به نفس)", reason: "«پرانگیزه» انحراف معنایی (motivated ≠ assertive)" },
  { id: "R4A-291", book: "upper", lesson: 33, word: "item of news",
    old: "قلم خبر",
    new: "یک بند از خبر / مورد خبر", reason: "«قلم» ناتمام (کاربرد حسابداری)" },
  { id: "R4A-301", book: "upper", lesson: 44, word: "make a living",
    old: "اقرار معاش کردن (به‌قدر کافی درآمد داشتن)",
    new: "گذران زندگی کردن (به‌قدر کافی درآمد داشتن)", reason: "typo «اقرار معاش» — بی‌معنا" },
  { id: "R4A-345", book: "upper", lesson: 65, word: "appal",
    old: "قفل کردن، وحشت‌زده کردن",
    new: "وحشت‌زده و حیرت‌زده کردن", reason: "«قفل کردن» کاملاً غلط (appal ≠ lock)" },
];

const results = [];
for (const fix of FIXES) {
  const dir = `src/data/viu-${fix.book}`;
  const files = globSync(`${dir}/vocab-part-*.ts`);
  let applied = 0, targetFile = null, ambiguous = 0;
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    const occurrences = src.split(`meaning: "${fix.old}"`).length - 1;
    if (occurrences === 0) continue;
    // راستی‌آزمایی رکورد: word + lesson در همان فایل
    const hasWord = src.includes(`word: "${fix.word}"`);
    if (!hasWord) { ambiguous++; continue; }
    if (occurrences > 1) { ambiguous += occurrences; continue; }
    const next = src.replace(`meaning: "${fix.old}"`, `meaning: "${fix.new}"`);
    writeFileSync(f, next, "utf8");
    applied++; targetFile = f;
  }
  results.push({ id: fix.id, book: fix.book, lesson: fix.lesson, word: fix.word,
    file: targetFile, applied, ambiguous, reason: fix.reason,
    old: fix.old, new: fix.new });
}

let ok = 0, fail = 0;
for (const r of results) {
  if (r.applied === 1 && r.ambiguous === 0) { ok++; console.log(`OK   ${r.id} ${r.book} L${r.lesson} ${r.word} -> ${r.file}`); }
  else { fail++; console.log(`FAIL ${r.id} applied=${r.applied} ambiguous=${r.ambiguous} ${r.word}`); }
}
console.log(`\napplied=${ok}/${FIXES.length} failed=${fail}`);
if (fail > 0) process.exit(1);
