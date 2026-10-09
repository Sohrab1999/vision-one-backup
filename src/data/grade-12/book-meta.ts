import type { ChapterMeta, BookInfo } from "../types";

/** شناسنامه چاپی جزوه «Vision Three» — پایه دوازدهم (از جلد و صفحه شناسنامه جزوه) */
export const BOOK_INFO: BookInfo = {
  title: "جزوه جامع کمک آموزش زبان انگلیسی",
  subtitle: "Vision Three — English for 12th Grade",
  author: "جمال احمدی (با همکاری وحید حشمت، حسن خاکپور و اساتید بزرگوار)",
  edition: "ویرایش سوم — مهر ماه ۱۴۰۱",
  price: "رایگان",
  telegram: "@JamalAhmadi1984",
};

/** فصل‌های جزوه — درس ۱ تا ۳ (عناوین عین چاپ جزوه) */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    number: "درس ۱",
    title: "Sense of Appreciation",
    titleFa: "حس قدردانی",
    quote: {
      en: "And of Allah’s Signs of Power is the creation of the heavens and the earth and also the variation of the languages and the color of you people; verily, in all these are Signs for men of knowledge.",
      fa: "و از نشانه‌های قدرت خداوند، آفرینش آسمان‌ها و زمین و نیز تفاوت زبان‌ها و رنگ‌های شماست؛ و به تحقیق در همه اینها نشانه‌ای از حکمت او برای دانشمندان نهفته است.",
      source: "سوره روم، آیه ۲۲ (ابتدای درس در جزوه)",
    },
    minutes: 45,
    color: "amber",
    grammarTopics: [
      "جملات معلوم و مجهول (Passive Voice) در زمان‌های مختلف",
      "عبارات الحاق (Tag Questions) و قواعد ساخت آن‌ها",
      "کلمات هم‌آیندی (Collocations) و نگارش با کلمات ربط همپایه‌ساز",
      "مجهول کردن افعال دو مفعولی و جملات امری",
    ],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "Look it Up",
    titleFa: "معنی آن کلمه را پیدا کن",
    quote: {
      en: "Look it Up — “Find the meaning of the word”",
      fa: "معنی آن کلمه را پیدا کن",
      source: "سرصفحه درس دوم جزوه",
    },
    minutes: 45,
    color: "teal",
    grammarTopics: [
      "ضمایر موصولی (Relative Pronouns): who، whom، which، whose، that",
      "حذف ضمایر موصولی (زبان تخصصی)",
      "جملات شرطی نوع دوم (بخش See Also جزوه)",
      "نگارش: پاراگراف‌نویسی (Topic و Supporting و Concluding Sentence)",
    ],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "Renewable Energy",
    titleFa: "انرژی تجدیدپذیر",
    quote: {
      en: "Renewable Energy — clean, renewable and cheap electricity",
      fa: "انرژی تجدیدپذیر",
      source: "سرصفحه درس سوم جزوه",
    },
    minutes: 45,
    color: "rose",
    grammarTopics: [
      "زمان گذشته کامل (Past Perfect) و مشخصه‌های آن",
      "مرور زمان‌ها (گذشته ساده، استمراری، حال کامل و گذشته کامل)",
      "مجهول جملاتی که افعال ناقص دارند (Modals + be + p.p.)",
      "ضرب‌المثل‌ها (Proverbs) و کاربرد آن‌ها",
    ],
  },
];
