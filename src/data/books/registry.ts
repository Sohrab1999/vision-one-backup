// رجیستری مرکزی کتابخانه — فهرست همه جزوه‌ها + دسترسی به داده کتاب فعال.
// افزودن جزوه جدید (مثلاً فاز ۲): (۱) عضو جدید در BookId، (۲) ورودی در BOOKS،
// (۳) پوشه src/data/grade-7/ با BookData، (۴) یک case در getBookData.

import type { BookId, BookData, BookMeta } from "./types";
import { VISION_ONE_BOOK } from "../vision-one";
import { GRADE_NINE_BOOK } from "../grade-9";

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
    author: "—",
    tagline: "در انتظار آپلود فایل جزوه",
    color: "amber",
    emoji: "📙",
    available: false,
  },
  {
    id: "grade-8",
    title: "زبان انگلیسی هشتم",
    gradeLabel: "پایه هشتم",
    author: "—",
    tagline: "در انتظار آپلود فایل جزوه",
    color: "teal",
    emoji: "📘",
    available: false,
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
    author: "—",
    tagline: "در انتظار آپلود فایل جزوه",
    color: "orange",
    emoji: "📒",
    available: false,
  },
  {
    id: "grade-12",
    title: "زبان انگلیسی دوازدهم",
    gradeLabel: "پایه دوازدهم",
    author: "—",
    tagline: "در انتظار آپلود فایل جزوه",
    color: "rose",
    emoji: "📓",
    available: false,
  },
];

export function getBookMeta(id: BookId): BookMeta | undefined {
  return BOOKS.find((b) => b.id === id);
}

/** داده کامل کتاب؛ برای جزوه‌های هنوز آپلودنشده null برمی‌گرداند */
export function getBookData(id: BookId): BookData | null {
  switch (id) {
    case "vision-one":
      return VISION_ONE_BOOK;
    case "grade-9":
      return GRADE_NINE_BOOK;
    // فازهای بعدی: case "grade-7": return GRADE_SEVEN_BOOK; و به همین ترتیب
    default:
      return null;
  }
}

export const DEFAULT_BOOK_ID: BookId = "vision-one";
