/**
 * display-text.ts — لایهٔ نمایش: جدا کردن شمارهٔ چاپی تمرین از متن سؤال/آیتم (R0-4 نقشه راه VIU)
 *
 * دادهٔ خام (db + src/data/viu-*) هرگز تغییر نمی‌کند — این فقط یک پاک‌ساز نمایشی است.
 *
 * الگوی خطا: استخراج فاز ۳ شمارهٔ آیتم چاپی را در ابتدای متن نگه داشته است
 * («1 I must write…»، «4 mean / thrifty»، «1 A: ________ ?») — عین چیدمان PDF.
 *
 * چرا regex سادهٔ `^\d+[ .]` ممنوع است — شواهد داده‌ای (ممیزی ۲۰۲۶-۱۱-۱۷):
 *  - viu-elem درس ۳۹ تمرین ۳۹٫۲: «20 kilometres from the village there is a small ________ .»
 *    ← عدد ۲۰ بخشی از محتوای جمله است، نه شمارهٔ آیتم؛ strip ساده متن را خراب می‌کند.
 *  - viu-upper درس ۲۸: «200 people work at the hospital; they will lose their jobs.» ← محتوا.
 *  پس سقف هر کتاب فقط از دادهٔ واقعی مشتق شده (بیشینهٔ شمارهٔ چاپی مشاهده‌شده در سؤال‌ها و
 *  آیتم‌های تمرین همان کتاب) و اعداد بزرگ‌تر از سقف دست‌نخورده می‌مانند.
 *
 * سقف‌ها (بیشینهٔ شمارهٔ چاپی مشاهده‌شده per book — ممیزی runtime ۲۰۲۶-۱۱-۱۷):
 *  - viu-elem: 17  (پیشوندهای مشاهده‌شده: quiz 1..8 + 20 محتوایی، آیتم تمرین 1..17)
 *  - viu-preint: 20 (پیشوندهای مشاهده‌شده: quiz و آیتم تمرین 1..20 — همگی شمارهٔ چاپی)
 *  - viu-upper: 16  (پیشوندهای مشاهده‌شده: quiz 1..12، آیتم تمرین 1..16 + «200» محتوایی)
 *  - بقیهٔ کتاب‌ها: 20 (پیش‌فرض محافظه‌کار)
 */

const MAX_PRINTED_NUMBER: Record<string, number> = {
  "viu-elem": 17,
  "viu-preint": 20,
  "viu-upper": 16,
};
const DEFAULT_MAX = 20;

/** عدد ۱ تا ۳ رقمی + فاصله — شمارهٔ چاپی آیتم؛ نقطه/پرانتز الزاماً ندارد (الگوی استخراج فاز ۳) */
const PRINTED_NUMBER_RE = /^(\d{1,3})\s+(?=\S)/;

/**
 * حذف شمارهٔ چاپی تمرین از ابتدای متن — فقط در لایهٔ نمایش.
 * اگر کتاب شناخته نباشد سقف پیش‌فرض ۲۰ اعمال می‌شود؛ اعداد بالای سقف (مثل «200 people…»)
 * و متنی که با عدد+نقطه شروع می‌شود (مثل «2.5 kilometres» در آینده) دست‌نخورده می‌مانند.
 */
export function stripPrintedExerciseNumber(text: string, bookId?: string): string {
  if (!text) return text;
  const m = text.match(PRINTED_NUMBER_RE);
  if (!m) return text;
  const n = Number(m[1]);
  const max = (bookId && MAX_PRINTED_NUMBER[bookId]) || DEFAULT_MAX;
  if (!Number.isInteger(n) || n < 1 || n > max) return text;
  return text.slice(m[0].length);
}
