import type { Reading } from "../types";

/**
 * متن‌های کوتاه (ریدینگ) جزوه «زبان انگلیسی پایه هشتم» (دکتر حسن لطفی) — برگرفته از
 * متون واقعی نمونه سؤالات امتحانی خود جزوه (صفحات ۷۴، ۸۸ و ۹۱).
 * جزوه برای این متون ترجمه چاپی ندارد؛ ترجمه فارسی هر پاراگراف، ترجمه روان و ساده از روی متن انگلیسی است.
 *
 * اصلاحیه غلط چاپی جزوه:
 * - صفحه ۷۴ (متن مبین): «I can tack photos» ← اصلاح به «I can take photos»
 */
export const READING_LIST: Reading[] = [
  {
    id: "r8-1",
    lesson: 1,
    title: "All About Me",
    titleFa: "همه‌چیز درباره من",
    source: "نمونه سؤال امتحانی — صفحه ۷۴ جزوه",
    paragraphs: [
      {
        en: "Hi. My name is Mobin. I'm thirteen years old. I'm from Iran.",
        fa: "سلام. اسم من مبین است. من سیزده ساله هستم و اهل ایرانم.",
      },
      {
        en: "I go to English class on Sundays and Wednesdays. I go swimming on Fridays. I play football on Thursdays.",
        fa: "یکشنبه‌ها و چهارشنبه‌ها به کلاس زبان انگلیسی می‌روم. جمعه‌ها به شنا می‌روم و پنجشنبه‌ها فوتبال بازی می‌کنم.",
      },
      {
        en: "I can ride a bicycle and I can take photos. I am good at drawing, too. I can't ride a horse. I search the web at night.",
        fa: "می‌توانم دوچرخه‌سواری کنم و می‌توانم عکاسی کنم؛ در نقاشی هم خوب هستم. اما نمی‌توانم اسب‌سواری کنم. شب‌ها در اینترنت جستجو می‌کنم.",
      },
    ],
  },
  {
    id: "r8-2",
    lesson: 4,
    title: "My Health",
    titleFa: "سلامتی من",
    source: "نمونه سؤال امتحانی — صفحه ۸۸ جزوه",
    paragraphs: [
      {
        en: "Ali and Reza are classmates. Reza is thirteen years old and Ali is 14.",
        fa: "علی و رضا هم‌کلاسی هستند. رضا سیزده ساله است و علی ۱۴ سال دارد.",
      },
      {
        en: "Today Ali is sick. He has a temperature. He should see a doctor.",
        fa: "امروز علی مریض است. او تب دارد و باید به پزشک مراجعه کند.",
      },
      {
        en: "Reza has a toothache and he should go to the dentist.",
        fa: "رضا دندان‌درد دارد و باید به دندان‌پزشک برود.",
      },
    ],
  },
  {
    id: "r8-3",
    lesson: 7,
    title: "Tom Anderson",
    titleFa: "تام اندرسون",
    source: "نمونه سؤال امتحانی — صفحه ۹۱ جزوه",
    paragraphs: [
      {
        en: "Hi. My name is Tom Anderson. I am 12 years old. I am Spanish. I am a student.",
        fa: "سلام. اسم من تام اندرسون است. من ۱۲ ساله‌ام، اسپانیایی هستم و دانش‌آموزم.",
      },
      {
        en: "I can search the Web very well. I usually read books in my free time.",
        fa: "من می‌توانم خیلی خوب در اینترنت جستجو کنم. معمولاً در وقت آزادم کتاب می‌خوانم.",
      },
      {
        en: "I like swimming as my hobby.",
        fa: "شنا کردن را به‌عنوان سرگرمی‌ام دوست دارم.",
      },
    ],
  },
];
