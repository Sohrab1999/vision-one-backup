import type { ChapterMeta, BookInfo } from "../types";

/** اطلاعات درس‌های جزوه کامل زبان انگلیسی پایه نهم — دکتر حسن لطفی */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    number: "درس ۱",
    title: "Personality",
    titleFa: "شخصیت",
    quote: {
      en: "He is really great! He's clever and kind.",
      fa: "اوه، او واقعاً عالی است! او زرنگ و مهربان است.",
      source: "مکالمه درس اول — پرهام",
    },
    minutes: 45,
    color: "emerald",
    grammarTopics: [
      "ترتیب اجزای جمله خبری",
      "فعل to be (حال و گذشته)",
      "حروف تعریف a/an/the و some/any",
      "ساختار There is / There are",
      "صفات اشاره و جمع بستن اسامی",
    ],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "Travel",
    titleFa: "مسافرت",
    quote: {
      en: "Hope you enjoy your stay in Tehran.",
      fa: "امیدوارم از اقامت‌تان در تهران لذت ببرید.",
      source: "مکالمه درس دوم — مسئول پذیرش",
    },
    minutes: 45,
    color: "teal",
    grammarTopics: [
      "زمان حال استمراری",
      "قواعد افزودن ing به فعل",
      "کاربردها و نشانه‌های حال استمراری",
      "بیان مالکیت با 's و of",
    ],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "Festivals and Ceremonies",
    titleFa: "جشن‌ها و مراسم‌ها",
    quote: {
      en: "I just love New Year holidays!",
      fa: "من واقعاً تعطیلات سال نو را دوست دارم!",
      source: "مکالمه درس سوم — الهام",
    },
    minutes: 40,
    color: "amber",
    grammarTopics: [
      "زمان حال ساده",
      "استثناهای s/es سوم شخص مفرد",
      "کاربردهای حال ساده",
      "قیدهای تکرار",
      "صفات ملکی",
    ],
  },
  {
    id: 4,
    number: "درس ۴",
    title: "Services",
    titleFa: "خدمات",
    quote: {
      en: "Actually it's near here. It's just round the corner.",
      fa: "در واقع نزدیک اینجاست. دقیقاً سر نبش است.",
      source: "مکالمه درس چهارم — پدرام",
    },
    minutes: 40,
    color: "violet",
    grammarTopics: [
      "سؤال با Wh Questions",
      "کلمات پرسشی دسته اول و دوم",
      "قیدهای تکرار و جایگاه آن‌ها",
    ],
  },
  {
    id: 5,
    number: "درس ۵",
    title: "Media",
    titleFa: "رسانه",
    quote: {
      en: "That's great! Could you please give me the website address?",
      fa: "عالیه! می‌شود لطفاً آدرس وب‌سایت را بدهی؟",
      source: "مکالمه درس پنجم — مینا",
    },
    minutes: 40,
    color: "orange",
    grammarTopics: [
      "زمان گذشته ساده",
      "افعال باقاعده و بی‌قاعده",
      "فعل be در گذشته (was / were)",
    ],
  },
  {
    id: 6,
    number: "درس ۶",
    title: "Health and Injuries",
    titleFa: "سلامتی و آسیب‌دیدگی‌ها",
    quote: {
      en: "I learned how to take care of myself.",
      fa: "یاد گرفتم چطور از خودم مراقبت کنم.",
      source: "مکالمه درس ششم — رضا",
    },
    minutes: 40,
    color: "rose",
    grammarTopics: [
      "ضمایر مفعولی (Object Pronouns)",
      "کاربرد ضمایر مفعولی بعد از فعل و حرف اضافه",
    ],
  },
];

export const BOOK_INFO: BookInfo = {
  title: "جزوه کامل زبان انگلیسی پایه نهم",
  subtitle: "Prospect 3",
  author: "تألیف و گردآوری: دکتر حسن لطفی",
  edition: "ویرایش جدید — تابستان ۱۴۰۳",
  price: "ویژه دانش‌آموزان پایه نهم متوسطه اول",
  telegram: "09141842803",
};
