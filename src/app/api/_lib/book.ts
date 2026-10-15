// قرارداد چندکتابی — کمکی‌های سمت سرور برای اعتبارسنجی شناسه کتاب و پرامپت هوش مصنوعی
// این پوشه با پیشوند _ از روتینگ App Router مستثنی است.

import type { BookId } from "@/data/books/types";

/** همه شناسه‌های مجاز جزوه — هماهنگ با BookId در src/data/books/types.ts */
const BOOK_IDS: readonly string[] = [
  "vision-one",
  "grade-7",
  "grade-8",
  "grade-9",
  "grade-11",
  "grade-12",
];

/** شناسه پیش‌فرض — کتاب فعلی که محتوا دارد */
export const DEFAULT_BOOK_ID = "vision-one" as const;

/**
 * اعتبارسنجی ورودی `book` از query/body.
 * ورودی نامعتبر (نوع اشتباه، رشتهٔ ناشناس، خالی) → "vision-one" تا رفتار قدیمی حفظ شود.
 */
export function normalizeBookId(input: unknown): BookId {
  if (typeof input === "string") {
    const value = input.trim();
    if (BOOK_IDS.includes(value)) return value as BookId;
  }
  return DEFAULT_BOOK_ID;
}

/** برچسب فارسی پایه برای شناسه‌های جزوه‌های مقطعی */
const GRADE_LABELS: Record<Exclude<BookId, "vision-one">, string> = {
  "grade-7": "پایه هفتم",
  "grade-8": "پایه هشتم",
  "grade-9": "پایه نهم",
  "grade-11": "پایه یازدهم",
  "grade-12": "پایه دوازدهم",
  collocations: "۱۰۰۰ کالوکیشن کاربردی (مکالمه طبیعی)",
};

/**
 * خط فارسی «کتاب فعلی کاربر» برای تزریق به پرامپت سیستمِ مسیرهای هوش مصنوعی (tutor / explain).
 * - vision-one → «کتاب فعلی کاربر: جزوه جامع زبان انگلیسی پایه دهم — ویژن وان»
 * - سایر شناسه‌های شناخته‌شده → «کتاب فعلی کاربر: جزوه زبان انگلیسی پایه …»
 * - شناسه ناشناس ولی title/grade ارسال‌شده → ترکیب از همان مقادیر
 * - خالی/نامعلوم → خط عمومی «کتاب فعلی کاربر: جزوه زبان انگلیسی متوسطه»
 */
export function bookPromptLine(
  book?: { id?: string; title?: string; grade?: string },
): string {
  const id = typeof book?.id === "string" ? book.id.trim() : "";
  const title = typeof book?.title === "string" ? book.title.trim() : "";
  const grade = typeof book?.grade === "string" ? book.grade.trim() : "";

  if (BOOK_IDS.includes(id)) {
    if (id === "vision-one") {
      return "کتاب فعلی کاربر: جزوه جامع زبان انگلیسی پایه دهم — ویژن وان";
    }
    if (id === "collocations") {
      return "کتاب فعلی کاربر: کتاب ۱۰۰۰ کالوکیشن کاربردی زبان انگلیسی (Espresso English) — تمرکز بر ترکیب طبیعی واژگان";
    }
    return `کتاب فعلی کاربر: جزوه زبان انگلیسی ${GRADE_LABELS[id as Exclude<BookId, "vision-one">]}`;
  }

  if (title || grade) {
    return `کتاب فعلی کاربر: ${title || "جزوه زبان انگلیسی"}${grade ? ` (${grade})` : ""}`;
  }

  return "کتاب فعلی کاربر: جزوه زبان انگلیسی متوسطه";
}
