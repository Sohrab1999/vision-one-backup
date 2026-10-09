import type { ChapterMeta, BookInfo } from "../types";

/** اطلاعات درس‌های جزوه کامل زبان انگلیسی پایه هشتم — دکتر حسن لطفی (Prospect 2) */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    number: "درس ۱",
    title: "My Nationality",
    titleFa: "ملیت من",
    quote: {
      en: "Iran is great! I love it. It's a beautiful country.",
      fa: "ایران عالیه! عاشقشم. ایران کشور زیبایی است.",
      source: "مکالمه درس اول — سام",
    },
    minutes: 30,
    color: "emerald",
    grammarTopics: [
      "بیان ملیت با to be و دو الگوی پرسش کشور/ملیت",
      "from با کشور و ملیت بدون from",
      "جملات مثبت، منفی و سوالی با am / is / are",
      "پاسخ‌های کوتاه yes / no",
    ],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "My Week",
    titleFa: "هفته من",
    quote: {
      en: "That sounds great! When can you start?",
      fa: "عالی به نظر می‌رسد. کی می‌توانی شروع کنی؟",
      source: "مکالمه درس دوم — معلم",
    },
    minutes: 35,
    color: "amber",
    grammarTopics: [
      "زمان حال ساده: عادات روزانه و بیان حقایق طبیعی",
      "سوالی و منفی کردن با do / does",
      "ایام هفته و قسمت‌های شبانه‌روز با on / in",
      "weekdays و weekend",
    ],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "My Abilities",
    titleFa: "توانایی‌های من",
    quote: {
      en: "Wow! Your drawing is very good.",
      fa: "عجب! نقاشی شما خیلی خوبه.",
      source: "مکالمه درس سوم — الهام",
    },
    minutes: 35,
    color: "teal",
    grammarTopics: [
      "صفت‌های ملکی my / your / his / her / its / our / their",
      "بیان توانایی با be good at + فعل ing",
      "بیان توانایی با can + فعل ساده",
    ],
  },
  {
    id: 4,
    number: "درس ۴",
    title: "My Health",
    titleFa: "سلامتی من",
    quote: {
      en: "Don't worry. I'll talk to your teacher.",
      fa: "نگران نباش. من با معلم کلاس شما صحبت خواهم کرد.",
      source: "مکالمه درس چهارم — معلم",
    },
    minutes: 30,
    color: "violet",
    grammarTopics: [
      "احوالپرسی سلامتی: What's wrong / the matter / the problem",
      "الگوی Are / is + ضمیر + OK / all right",
      "توصیه‌های بهداشتی: You should / Why don't you / Go to",
    ],
  },
  {
    id: 5,
    number: "درس ۵",
    title: "My City",
    titleFa: "شهر من",
    quote: {
      en: "It's a big and clean city.",
      fa: "شهر بزرگ و تمیزی است.",
      source: "مکالمه درس پنجم — مرتضی",
    },
    minutes: 35,
    color: "orange",
    grammarTopics: [
      "پرسش مکان شهر با Where is",
      "توصیف شهر با What's … like",
      "وجود امکانات: Is there a/an …? و Are there any …?",
      "معروف بودن با What is … famous for و تلفظ th /θ/",
    ],
  },
  {
    id: 6,
    number: "درس ۶",
    title: "My Village",
    titleFa: "روستای من",
    quote: {
      en: "It sounds to be a very interesting place.",
      fa: "به نظر می‌رسد مکان بسیار جالبی باشد.",
      source: "مکالمه درس ششم — سام",
    },
    minutes: 35,
    color: "rose",
    grammarTopics: [
      "پرسش آب‌وهوا: What's the weather like in …? و Is it … in (فصل)?",
      "توصیف روستا و شغل مردم",
      "جایگزین پرسش‌ها: What about / How about",
      "تلفظ th صدای /ð/ در mother, father…",
    ],
  },
  {
    id: 7,
    number: "درس ۷",
    title: "My Hobbies",
    titleFa: "سرگرمی‌های من",
    quote: {
      en: "Well, I love reading.",
      fa: "خب، من عاشق خواندن هستم.",
      source: "مکالمه درس هفتم — سمیرا",
    },
    minutes: 30,
    color: "emerald",
    grammarTopics: [
      "پرسش وقت آزاد: What do you do in your free time?",
      "بیان سرگرمی با as a hobby",
      "بیان علاقه با love / enjoy + فعل ing",
      "پرسش پیوسته How about you?",
    ],
  },
];

export const BOOK_INFO: BookInfo = {
  title: "جزوه کامل زبان انگلیسی پایه هشتم",
  subtitle: "Prospect 2",
  author: "تألیف و گردآوری: دکتر حسن لطفی",
  edition: "ویرایش جدید — تابستان ۱۴۰۳",
  price: "ویژه دانش‌آموزان پایه هشتم متوسطه اول",
  telegram: "09141842803",
};
