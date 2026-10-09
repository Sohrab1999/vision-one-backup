// رجیستری مرکزی کتابخانه — فهرست همه جزوه‌ها + دسترسی به داده کتاب فعال.
// افزودن جزوه جدید (مثلاً فاز ۲): (۱) عضو جدید در BookId، (۲) ورودی در BOOKS،
// (۳) پوشه src/data/grade-7/ با BookData، (۴) یک case در getBookData.

import type { BookId, BookData, BookMeta } from "./types";
import { VISION_ONE_BOOK } from "../vision-one";
import { GRADE_SEVEN_BOOK } from "../grade-7";
import { GRADE_EIGHT_BOOK } from "../grade-8";
import { GRADE_NINE_BOOK } from "../grade-9";
import { GRADE_ELEVEN_BOOK } from "../grade-11";
import { GRADE_TWELVE_BOOK } from "../grade-12";

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

export function getBookMeta(id: BookId): BookMeta | undefined {
  return BOOKS.find((b) => b.id === id);
}

/** داده کامل کتاب؛ برای جزوه‌های هنوز آپلودنشده null برمی‌گرداند */
export function getBookData(id: BookId): BookData | null {
  switch (id) {
    case "vision-one":
      return VISION_ONE_BOOK;
    case "grade-7":
      return GRADE_SEVEN_BOOK;
    case "grade-8":
      return GRADE_EIGHT_BOOK;
    case "grade-9":
      return GRADE_NINE_BOOK;
    case "grade-11":
      return GRADE_ELEVEN_BOOK;
    case "grade-12":
      return GRADE_TWELVE_BOOK;
    default:
      return null;
  }
}

export const DEFAULT_BOOK_ID: BookId = "vision-one";
