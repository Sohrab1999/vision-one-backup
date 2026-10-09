import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس چهارم پایه هشتم — نمونه سوالات امتحانی صفحه ۴۱
 * (پاسخ سؤال با تصویر، اصطلاح تصاویر، کلمه ناهماهنگ، انتخاب کلمه برای تصویر،
 * تلفظ ch) و درسنامه صفحات ۳۶ تا ۴۰ (بیماری‌ها، What's the matter؟
 * توصیه با should / Why don't you؟ تلفظ ch و ea).
 *
 * تبدیل: سؤالات تصویری جزوه به تست با توصیف فارسی تصویر تبدیل شدند؛
 * سؤال تلفظ صفحه ۴۱ چون دو پاسخ درست داشت (school و toothache)
 * با واژه‌های درس بازسازی شد.
 */
export const QUESTIONS_LESSON_4: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): پاسخ کامل به سؤال
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: پسری در حال سرفه کردن است. What's the matter?  →  He has a ________.", options: ["cough", "headache", "backache", "earache"], answer: 0, level: "آموزشی", explanation: "سرفه → cough: He has a cough." },
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: دختری دست روی لُپش گذاشته (دندان‌درد). What's wrong?  →  She has a ________.", options: ["toothache", "sore throat", "cold", "fever"], answer: 0, level: "آموزشی", explanation: "دندان‌درد → toothache." },
  // سؤال ۲ امتحان (تصویری): اصطلاح / توصیه
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "I have a toothache.  →  Go to the ________.", options: ["dentist", "library", "airport", "stadium"], answer: 0, level: "آموزشی", explanation: "برای دندان‌درد به دندانپزشک (dentist) مراجعه می‌کنیم." },
  { category: "grammar", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — توصیه (تبدیل به چهارگزینه‌ای)", text: "I have a running nose.  →  Why don't you ________?", options: ["get some rest", "take photos", "climb a mountain", "watch a movie"], answer: 0, level: "متوسط", explanation: "الگوی پیشنهاد: Why don't you + فعل ساده؛ واژه درس: get some rest (استراحت کردن)." },
  // سؤال ۳ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Health – sore eyes – headache – measles)", options: ["Health", "sore eyes", "headache", "measles"], answer: 0, level: "آموزشی", explanation: "health حالت عمومی سلامتی است؛ بقیه مشکل یا بیماری هستند." },
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Sneeze – cough – mumps – nurse)", options: ["Sneeze", "cough", "mumps", "nurse"], answer: 3, level: "آموزشی", explanation: "nurse (پرستار) نام شخص است؛ بقیه علامت یا بیماری هستند." },
  // سؤال ۴ امتحان (تصویری): انتخاب کلمه برای هر تصویر
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: چشم‌های قرمز و دردناک. کدام واژه مناسب است؟", options: ["sore eyes", "fever", "running nose", "mumps"], answer: 0, level: "آموزشی", explanation: "چشم‌درد → sore eyes." },
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: کودک با دماسنج و دمای بالای بدن. کدام واژه مناسب است؟", options: ["fever", "cough", "sore eyes", "running nose"], answer: 0, level: "آموزشی", explanation: "تب → fever." },
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: بینی آبریزش‌دار (سرماخوردگی). کدام واژه مناسب است؟", options: ["running nose", "sore eyes", "mumps", "backache"], answer: 0, level: "آموزشی", explanation: "آب‌ریزش بینی → running nose." },
  { category: "vocabulary", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: کودکی با ورم غده در فک و گردن (اوریون). کدام واژه مناسب است؟", options: ["mumps", "fever", "cough", "sore throat"], answer: 0, level: "متوسط", explanation: "اوریون → mumps." },
  // سؤال ۵ امتحان: تلفظ ch (بازسازی‌شده)
  { category: "grammar", lesson: 4, scope: "نمونه سوالات امتحانی درس ۴ — تلفظ ch", text: "در کدام کلمه حرف ch صدای «ک» (k) می‌دهد؟", options: ["teacher", "chair", "mechanic", "watch"], answer: 2, level: "متوسط", explanation: "در mechanic مانند school و backache صدای k می‌دهد." },
  { category: "grammar", lesson: 4, scope: "درسنامه — تلفظ ea", text: "در کدام کلمه حروف ea صدای «e» می‌دهند؟", options: ["bread", "meat", "eat", "tea"], answer: 0, level: "متوسط", explanation: "bread، headache، health، weather: صدای e می‌دهند." },
  // درسنامه صفحات ۳۶ و ۴۰
  { category: "vocabulary", lesson: 4, scope: "درسنامه — بیماری‌ها", text: "I have the ________. (آنفولانزا)", options: ["flu", "cold", "fever", "measles"], answer: 0, level: "آموزشی", explanation: "It is the flu / I have the flu = آنفولانزا." },
  { category: "grammar", lesson: 4, scope: "درسنامه — Are you OK?", text: "A: Is Ali OK?   B: No, ________.", options: ["he has a backache", "he has a hospital", "he has the dentist", "he is a doctor"], answer: 0, level: "متوسط", explanation: "پاسخ به Are you OK؟ بیان مشکل سلامتی است: have a backache (کمر درد)." },
  { category: "grammar", lesson: 4, scope: "درسنامه — توصیه با should", text: "کدام جمله برای توصیه (پیشنهاد درمان) درست است؟", options: ["You should see a doctor.", "You should seeing a doctor.", "You should to see a doctor.", "You shoulds see a doctor."], answer: 0, level: "متوسط", explanation: "بعد از should فعل ساده می‌آید: should see." },
  { category: "grammar", lesson: 4, scope: "درسنامه — What's wrong?", text: "کدام پاسخ به سؤال «What's wrong?» درست است؟", options: ["I have a sore throat.", "I am thirteen.", "I can swim.", "There is a bridge."], answer: 0, level: "آموزشی", explanation: "پاسخ این سؤال بیان مشکل سلامتی است." },
];
