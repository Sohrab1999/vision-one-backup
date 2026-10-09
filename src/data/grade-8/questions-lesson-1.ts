import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس اول پایه هشتم — نمونه سوالات امتحانی صفحه ۱۸
 * (کلمه ناهماهنگ، جاهای خالی با کلمات داده شده، جدول ترجمه، تصاویر)
 * و نکات درسنامه صفحات ۱۵ تا ۱۷ (be + from، ملیت‌ها، پاسخ کوتاه).
 *
 * اصلاحیه: در تمرین جاهای خالی جزوه «alittle» → «a little» و «british» → «British»
 * اصلاح شد؛ در سؤال کلمه ناهماهنگ «china» → «China» (بزرگ‌نویس نام کشور).
 *
 * تبدیل: سؤالات ص/غ و تصویری جزوه به تست چهارگزینه‌ای هم‌موضوع (ملیت و be + from) تبدیل شدند.
 */
export const QUESTIONS_LESSON_1: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): پاسخ کامل به Where are you from?
  { category: "grammar", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — تصویری (تبدیل به چهارگزینه‌ای)", text: "Where are you from?  →  I ________ from Italy.", options: ["am", "is", "are", "be"], answer: 0, level: "آموزشی", explanation: "فاعل I فعل am می‌گیرد؛ پاسخ کامل: I am from Italy." },
  { category: "grammar", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — تصویری (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ کامل برای سؤال «Where are you from?» درست است؟", options: ["I am from Italy.", "I am Italy.", "I from Italy am.", "Me is from Italy."], answer: 0, level: "آموزشی", explanation: "پاسخ با «I am from + نام کشور» داده می‌شود." },
  // سؤال ۲ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Indonesia – Iraq – Egypt – Spanish)", options: ["Indonesia", "Iraq", "Egypt", "Spanish"], answer: 3, level: "آموزشی", explanation: "Spanish صفت ملیت است؛ بقیه نام کشور هستند." },
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Australia – China – Europe – Italy)", options: ["Australia", "China", "Europe", "Italy"], answer: 2, level: "آموزشی", explanation: "Europe قاره است؛ بقیه نام کشور هستند." },
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Asia – Europe – China – Africa)", options: ["Asia", "Europe", "China", "Africa"], answer: 2, level: "آموزشی", explanation: "China نام کشور است؛ بقیه نام قاره هستند." },
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Chinese – French – Britain – Brazilian)", options: ["Chinese", "French", "Britain", "Brazilian"], answer: 2, level: "متوسط", explanation: "Britain نام کشور است؛ بقیه صفت ملیت هستند." },
  // سؤال ۳ امتحان: جاهای خالی با کلمات داده شده (Beautiful – a little – cousin – originally – British)
  { category: "vocabulary", lesson: 1, scope: "جاهای خالی — کلمات داده شده", text: "I speak French, English and ________ Persian.", options: ["a little", "beautiful", "originally", "cousin"], answer: 0, level: "آموزشی", explanation: "«کمی» فارسی صحبت می‌کنم → a little Persian." },
  { category: "vocabulary", lesson: 1, scope: "جاهای خالی — کلمات داده شده", text: "I am ________ Australian but I live in England.", options: ["originally", "a little", "beautiful", "British"], answer: 0, level: "متوسط", explanation: "«اصالتاً استرالیایی هستم» → originally Australian." },
  { category: "vocabulary", lesson: 1, scope: "جاهای خالی — کلمات داده شده", text: "Spain is a ________ country. I love it.", options: ["beautiful", "originally", "a little", "cousin"], answer: 0, level: "آموزشی", explanation: "«کشوری زیبا» → a beautiful country." },
  { category: "vocabulary", lesson: 1, scope: "جاهای خالی — کلمات داده شده (کلمات اضافی)", text: "در تمرین جاهای خالی جزوه دو کلمه اضافی بودند؛ کدام گزینه یکی از آن دو است؟", options: ["cousin", "beautiful", "originally", "a little"], answer: 0, level: "متوسط", explanation: "cousin (پسر/دخترخاله) و British به کار نرفتند." },
  // سؤال ۴ امتحان (ص/غ تصویری): جمله‌سازی با ملیت‌ها
  { category: "grammar", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — ص/غ تصویری (تبدیل به چهارگزینه‌ای)", text: "She is from Italy. She is ________.", options: ["Italian", "Italy", "Iranian", "Indian"], answer: 0, level: "آموزشی", explanation: "از Italy صفت ملیت Italian ساخته می‌شود." },
  { category: "grammar", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — ص/غ تصویری (تبدیل به چهارگزینه‌ای)", text: "He is from Brazil. He is ________.", options: ["Britain", "Brazil", "Brazilian", "British"], answer: 2, level: "آموزشی", explanation: "Brazil → Brazilian (برزیلی)." },
  // سؤال ۵ امتحان: جدول ترجمه
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — متن — جدول کامل کنید", text: "ترجمهٔ انگلیسی واژهٔ «قاره» کدام است؟", options: ["continent", "country", "capital", "city"], answer: 0, level: "آموزشی", explanation: "continent = قاره." },
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — متن — جدول کامل کنید", text: "واژهٔ «سال» به انگلیسی کدام است؟", options: ["week", "month", "year", "day"], answer: 2, level: "آموزشی", explanation: "year = سال." },
  { category: "vocabulary", lesson: 1, scope: "نمونه سوالات امتحانی درس ۱ — متن — جدول کامل کنید", text: "ترجمهٔ درست «از دیدن شما خوشحالم» کدام است؟", options: ["Nice to see you.", "You are welcome.", "See you later.", "How about you?"], answer: 0, level: "متوسط", explanation: "در جدول جزوه: از دیدن شما خوشحالم = Nice to see you." },
  // درسنامه صفحه ۱۷: پرسش و پاسخ با be + from
  { category: "grammar", lesson: 1, scope: "درسنامه — Where ... from?", text: "Where is Ronaldo from?  →  ________", options: ["He is from Brazil.", "He is Brazil.", "He from Brazil.", "She is from Brazil."], answer: 0, level: "آموزشی", explanation: "پاسخ با He is from + نام کشور داده می‌شود." },
  { category: "grammar", lesson: 1, scope: "درسنامه — ملیت بدون from", text: "برای بیان ملیت از from استفاده نمی‌شود؛ کدام جمله درست است؟", options: ["They are Chinese.", "They are from Chinese.", "They are China.", "They are the China."], answer: 0, level: "متوسط", explanation: "ملیت با صفت ملیت بیان می‌شود: They are Chinese." },
  { category: "grammar", lesson: 1, scope: "درسنامه — پاسخ کوتاه", text: "Are you from Brazil?  →  Yes, ________.", options: ["I am", "I is", "I are", "I do"], answer: 0, level: "آموزشی", explanation: "پاسخ کوتاه سؤال با are: Yes, I am." },
  { category: "grammar", lesson: 1, scope: "درسنامه — پاسخ کوتاه", text: "Is Reza from England?  →  No, ________.", options: ["he isn't", "he is", "he doesn't", "he aren't"], answer: 0, level: "آموزشی", explanation: "پاسخ منفی سؤال با is: No, he isn't." },
  { category: "grammar", lesson: 1, scope: "درسنامه — Where ... from?", text: "Where ________ they from?", options: ["are", "is", "am", "be"], answer: 0, level: "آموزشی", explanation: "فاعل جمع they فعل are می‌گیرد." },
];
