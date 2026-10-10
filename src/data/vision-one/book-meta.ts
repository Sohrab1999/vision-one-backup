import type { ChapterMeta, BookInfo } from "../types";

/** اطلاعات فصل‌های کتاب — مطابق فهرست جزوه (صفحه ۴۱) */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 0,
    number: "بخش اول",
    title: "Prospects Review",
    titleFa: "مرور پایه هفتم تا نهم",
    quote: {
      en: "Failure is a part of life. If you don't fail, you won't learn. If you don't learn, you will never succeed.",
      fa: "شکست بخشی از زندگیست. اگر شکست نخوری، یاد نمی‌گیری. اگر یاد نگیری، هرگز موفق نخواهی شد.",
      source: "صفحه ۳ جزوه",
    },
    minutes: 25,
    color: "amber",
    grammarTopics: ["حال ساده", "حال استمراری", "گذشته ساده", "ضمایر", "ساختار There is/are"],
  },
  {
    id: 1,
    number: "درس ۱",
    title: "Saving Nature",
    titleFa: "نجات طبیعت",
    quote: {
      en: "We made from water every living thing.",
      fa: "و هر چیز زنده‌ای را از آب پدید آوردیم.",
      source: "سوره انبیاء، آیه ۳۰",
    },
    minutes: 45,
    color: "emerald",
    grammarTopics: ["زمان آینده ساده (will / be going to)", "انواع اسم و معرف‌ها", "آهنگ صدای افتان و خیزان"],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "Wonders of Creation",
    titleFa: "شگفتی‌های آفرینش",
    quote: {
      en: "We made from water every living thing.",
      fa: "و هر چیز زنده‌ای را از آب پدید آوردیم.",
      source: "سوره انبیاء، آیه ۳۰",
    },
    minutes: 40,
    color: "teal",
    grammarTopics: ["انواع صفت و کاربردهای آن", "ترتیب صفات (جمرساک)"],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "The Value of Knowledge",
    titleFa: "ارزش دانش",
    quote: {
      en: "Say: Are those equal, those who know and those who do not know?",
      fa: "بگو: آیا کسانی که می‌دانند با کسانی که نمی‌دانند برابرند؟",
      source: "سوره الزمر، آیه ۹",
    },
    minutes: 35,
    color: "violet",
    grammarTopics: ["زمان گذشته استمراری", "ضمایر انعکاسی و تأکیدی", "افعال حالتی و کنشی"],
  },
  {
    id: 4,
    number: "درس ۴",
    title: "Traveling the World",
    titleFa: "سفر در دنیا",
    quote: {
      en: "Say: Travel through the Earth and see how Allah did originate creation.",
      fa: "بگو: در زمین به سیاحت بپردازید و بنگرید که خداوند چگونه خلقت را آغاز نموده است.",
      source: "سوره عنکبوت، آیه ۲۰",
    },
    minutes: 40,
    color: "orange",
    grammarTopics: ["افعال ناقص (Modals)", "حروف اضافه زمان و مکان", "قیدهای حالت"],
  },
];

export const BOOK_INFO: BookInfo = {
  title: "جزوه جامع زبان انگلیسی پایه دهم",
  subtitle: "Vision One",
  author: "تألیف و گردآوری: جمال احمدی و همکاران",
  edition: "ویرایش سوم — مهر ماه ۱۴۰۱",
  price: "رایــگان",
  telegram: "@PracticalEnglishInKonkour",
};
