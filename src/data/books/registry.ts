// رجیستری مرکزی کتابخانه — فهرست همه جزوه‌ها + بارگذاری تنبل داده کتاب فعال.
// افزودن جزوه جدید (مثلاً فاز جدید): (۱) عضو جدید در BookId، (۲) ورودی در BOOKS،
// (۳) پوشه src/data/grade-X/ با BookData، (۴) یک loader در LOADERS.
//
// فاز ۷: داده جزوه‌ها دیگر import استاتیک نمی‌شوند — هر جزوه یک chunk جداگانه
// است که فقط هنگام ورود به آن جزوه بارگذاری می‌شود (lazy-load با dynamic import).
// متادیتای قفسه (BOOKS) استاتیک و سبک می‌ماند.

import type { BookId, BookData, BookMeta } from "./types";

export const BOOKS: BookMeta[] = [
  {
    id: "vision-one",
    title: "ویژن وان",
    gradeLabel: "پایه دهم",
    author: "جمال احمدی و همکاران",
    tagline: "جزوه جامع — واژگان، گرامر، ۵۳۰ تست، ریدینگ و مکالمه",
    color: "emerald",
    emoji: "📗",
    available: true,
  },
  {
    id: "grade-7",
    title: "زبان انگلیسی هفتم",
    gradeLabel: "پایه هفتم",
    author: "دکتر حسن لطفی",
    tagline: "جزوه کامل Prospect 1 — ۸ درس، واژگان، درسنامه، مکالمه و تست امتحانی",
    color: "amber",
    emoji: "📙",
    available: true,
  },
  {
    id: "grade-8",
    title: "زبان انگلیسی هشتم",
    gradeLabel: "پایه هشتم",
    author: "دکتر حسن لطفی",
    tagline: "جزوه کامل Prospect 2 — ۷ درس، واژگان، درسنامه، مکالمه و تست امتحانی",
    color: "teal",
    emoji: "📘",
    available: true,
  },
  {
    id: "grade-9",
    title: "زبان انگلیسی نهم",
    gradeLabel: "پایه نهم",
    author: "دکتر حسن لطفی",
    tagline: "جزوه کامل — ۶ درس، واژگان، درسنامه، تست امتحانی و مرور جامع",
    color: "violet",
    emoji: "📕",
    available: true,
  },
  {
    id: "grade-11",
    title: "زبان انگلیسی یازدهم",
    gradeLabel: "پایه یازدهم",
    author: "جمال احمدی و همکاران",
    tagline: "جزوه جامع Vision Two — ۳ درس، واژگان، درسنامه، مکالمه و بانک تست",
    color: "orange",
    emoji: "📒",
    available: true,
  },
  {
    id: "grade-12",
    title: "زبان انگلیسی دوازدهم",
    gradeLabel: "پایه دوازدهم",
    author: "جمال احمدی و همکاران",
    tagline: "جزوه جامع Vision Three — ۳ درس، واژگان، درسنامه، تست امتحان نهایی و ضمیمه",
    color: "rose",
    emoji: "📓",
    available: true,
  },
];

// ─── بارگذارهای تنبل هر جزوه — هر جزوه یک chunk مستقل ───

const LOADERS: Record<BookId, () => Promise<BookData | null>> = {
  "vision-one": () => import("../vision-one").then((m) => m.VISION_ONE_BOOK),
  "grade-7": () => import("../grade-7").then((m) => m.GRADE_SEVEN_BOOK),
  "grade-8": () => import("../grade-8").then((m) => m.GRADE_EIGHT_BOOK),
  "grade-9": () => import("../grade-9").then((m) => m.GRADE_NINE_BOOK),
  "grade-11": () => import("../grade-11").then((m) => m.GRADE_ELEVEN_BOOK),
  "grade-12": () => import("../grade-12").then((m) => m.GRADE_TWELVE_BOOK),
};

export function getBookMeta(id: BookId): BookMeta | undefined {
  return BOOKS.find((b) => b.id === id);
}

/** همه واژه‌های همه جزوه‌ها — فقط سمت سرور (API جست‌وجوی سراسری) استفاده می‌شود */
export async function loadBookData(id: BookId): Promise<BookData | null> {
  try {
    return await LOADERS[id]();
  } catch (err) {
    console.error(`registry: خطا در بارگذاری جزوه ${id}`, err);
    return null;
  }
}

export const DEFAULT_BOOK_ID: BookId = "vision-one";
