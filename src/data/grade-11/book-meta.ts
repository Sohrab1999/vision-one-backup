import type { ChapterMeta, BookInfo } from "../types";

/** شناسنامه چاپی جزوه «Vision Two» — پایه یازدهم (از جلد و صفحه شناسنامه جزوه) */
export const BOOK_INFO: BookInfo = {
  title: "جزوه جامع کمک آموزش زبان انگلیسی",
  subtitle: "Vision Two — English for 11th Grade",
  author: "جمال احمدی (با همکاری اساتید بزرگوار)",
  edition: "ویرایش سوم — مهر ماه ۱۴۰۱",
  price: "رایگان",
  telegram: "@PracticalEnglishInKonkour",
};

/** فصل‌های جزوه — درس ۱ تا ۳ (عناوین عین چاپ جزوه) */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    number: "درس ۱",
    title: "Understanding People",
    titleFa: "فهمیدن مردم",
    quote: {
      en: "And among His signs is the creation of the heavens and the earth, and the variations in your languages and your colors: verily in that are signs for those who know.",
      fa: "و از آیات او آفرینش آسمان‌ها و زمین و گوناگونی زبان‌ها و رنگ‌های شماست؛ همانا در این امر نشانه‌هایی برای دانایان وجود دارد.",
      source: "سوره روم، آیه ۲۲ (ابتدای درس در جزوه)",
    },
    minutes: 45,
    color: "amber",
    grammarTopics: [
      "اسم‌های قابل شمارش و غیرقابل شمارش و واحدهای شمارش (a loaf of، a piece of، ...)",
      "صفت‌های کمی: many / much / a lot of / plenty of / some / a few / few / a little / little",
      "اعداد پیش از اسم؛ hundred و thousand و million جمع نمی‌گیرند؛ خط‌تیره اعداد مرکب",
      "ترتیب اجزای جمله و جای قیدهای تکرار (always، usually، never، ...)",
    ],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "A healthy Lifestyle",
    titleFa: "یک شیوه زندگی سالم",
    quote: {
      en: "Eat of the things which Allah has provided for you, lawful and good; but fear Allah, in whom you believe.",
      fa: "و از آنچه خداوند روزی شما گردانیده، حلال و پاکیزه را بخورید، و از خدایی که به او ایمان دارید پروا دارید.",
      source: "سوره مائده، آیه ۸۸ (ابتدای درس در جزوه)",
    },
    minutes: 45,
    color: "orange",
    grammarTopics: [
      "زمان حال کامل (Present Perfect) با have / has + اسم مفعول",
      "قیدهای حال کامل: since، for، just، already، yet، ever، so far، recently",
      "افعال دوکلمه‌ای جدا نشدنی (با حرف اضافه ثابت) و جدا شدنی (ضمیر مفعولی بین فعل و ذره)",
      "اسم مصدر (Gerund) و شش محل اصلی به‌کارگیری آن",
    ],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "Art and Culture",
    titleFa: "هنر و فرهنگ",
    quote: {
      en: "So, blessed be Allah, the best to create.",
      fa: "بزرگ است خدایی که بهترین خلق‌کنندگان است.",
      source: "سوره مؤمنون، آیه ۱۴ (ابتدای درس در جزوه)",
    },
    minutes: 45,
    color: "rose",
    grammarTopics: [
      "جملات شرطی نوع اول: If + زمان حال ساده ، زمان آینده ساده",
      "صفات فاعیلی (-ing) و مفعویلی (-ed) و افعال ربطی",
      "مصدر با to: بعد از صفت‌ها، ساختار It + be + صفت + (for + مفعول) + to ...",
      "افعالی که بعدشان شکل ساده می‌آید (make / let / help) و هر دو شکلی‌ها (stop، like، ...)",
    ],
  },
];
