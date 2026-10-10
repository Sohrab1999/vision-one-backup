import type { ChapterMeta, BookInfo } from "../types";

/** اطلاعات درس‌های جزوه کامل زبان انگلیسی پایه هفتم — دکتر حسن لطفی (Prospect 1) */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    number: "درس ۱",
    title: "My Name",
    titleFa: "اسم من",
    quote: {
      en: "My name is Ahmad Karimi.",
      fa: "اسم من احمد کریمی است.",
      source: "مکالمه درس اول — معلم",
    },
    minutes: 30,
    color: "emerald",
    grammarTopics: [
      "معرفی خود و پرسش اسم و نام خانوادگی",
      "صرف و مخفف‌های فعل to be",
      "القاب احترام Mr / Mrs / Miss / Ms",
    ],
  },
  {
    id: 2,
    number: "درس ۲",
    title: "My Classmates",
    titleFa: "هم‌کلاسی‌های من",
    quote: {
      en: "That's Erfan. He's our new classmate.",
      fa: "آن عرفان است. او هم‌کلاسی جدید ماست.",
      source: "مکالمه درس دوم — پرهام",
    },
    minutes: 30,
    color: "amber",
    grammarTopics: [
      "صفات اشاره this / that / these / those",
      "کلمه پرسشی Who و فعل کمکی can",
      "کلمه Too و ضمایر He / She",
      "مالکیت با 's (student's name)",
    ],
  },
  {
    id: 3,
    number: "درس ۳",
    title: "My Age",
    titleFa: "سن من",
    quote: {
      en: "It's in Mehr.",
      fa: "در ماه مهر است.",
      source: "مکالمه درس سوم — نرگس",
    },
    minutes: 30,
    color: "teal",
    grammarTopics: [
      "اعداد اصلی و اعداد ترتیبی",
      "خواندن اعشار، کسر و درصد",
      "روزهای هفته و ماه‌ها با in / on",
      "پرسش How old are you؟",
    ],
  },
  {
    id: 4,
    number: "درس ۴",
    title: "My Family",
    titleFa: "خانواده من",
    quote: {
      en: "He's a mechanic.",
      fa: "او مکانیک است.",
      source: "مکالمه درس چهارم — دانش‌آموز ۲",
    },
    minutes: 35,
    color: "violet",
    grammarTopics: [
      "حرف تعریف an با حروف صدادار",
      "سوالی و منفی کردن to be و پاسخ کوتاه",
      "تبدیل y به ies در جمع بستن",
      "مالکیت 's برای جانداران",
    ],
  },
  {
    id: 5,
    number: "درس ۵",
    title: "My Appearance",
    titleFa: "ظاهر من",
    quote: {
      en: "He's wearing a gray suit.",
      fa: "او کت‌وشلوار خاکستری پوشیده است.",
      source: "مکالمه درس پنجم — دانش‌آموز",
    },
    minutes: 35,
    color: "orange",
    grammarTopics: [
      "اجزای دوتایی همیشه جمع (shoes، trousers…)",
      "زمان حال ساده و s / es سوم شخص مفرد",
      "زمان حال استمراری am / is / are + ing",
      "صفت رنگی قبل از اسم",
    ],
  },
  {
    id: 6,
    number: "درس ۶",
    title: "My House",
    titleFa: "خانه من",
    quote: {
      en: "I'm in the kitchen.",
      fa: "من در آشپزخانه هستم.",
      source: "مکالمه درس ششم — مادر",
    },
    minutes: 30,
    color: "rose",
    grammarTopics: [
      "کلمات پرسشی Where و What",
      "ساختار جمله با قید مکان",
    ],
  },
  {
    id: 7,
    number: "درس ۷",
    title: "My Address",
    titleFa: "آدرس من",
    quote: {
      en: "5 Azadi Street.",
      fa: "خیابان آزادی، پلاک ۵",
      source: "مکالمه درس هفتم — امید",
    },
    minutes: 35,
    color: "emerald",
    grammarTopics: [
      "بیان ساعت به دو روش (past / to و رقمی)",
      "خواندن شماره تلفن رقم‌به‌رقم",
      "آدرس دادن از واحد کوچک به بزرگ",
    ],
  },
  {
    id: 8,
    number: "درس ۸",
    title: "My Favorite Food",
    titleFa: "غذای مورد علاقه من",
    quote: {
      en: "Let's have some cake and milk.",
      fa: "بیا مقداری کیک و شیر بخوریم.",
      source: "مکالمه درس هشتم — دانش‌آموز ۲",
    },
    minutes: 30,
    color: "amber",
    grammarTopics: [
      "پیشنهاد دادن با Let's و How about",
      "ساختار I'd like و کاربرد some",
    ],
  },
];

export const BOOK_INFO: BookInfo = {
  title: "جزوه کامل زبان انگلیسی پایه هفتم",
  subtitle: "Prospect 1",
  author: "تألیف و گردآوری: دکتر حسن لطفی",
  edition: "ویرایش جدید — تابستان ۱۴۰۳",
  price: "ویژه دانش‌آموزان پایه هفتم متوسطه اول",
  telegram: "09141842803",
};
