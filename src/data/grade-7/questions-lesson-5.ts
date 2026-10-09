import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس پنجم پایه هفتم — تست‌های امتحانی صفحه ۸۴
 * و درسنامهٔ درس پنجم (حال ساده، حال استمراری، اشیای همیشه جمع، صفت قبل از اسم).
 */
export const QUESTIONS_LESSON_5: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: وصل کردن ستون A به ستون B (یک جواب اضافی)
  { category: "grammar", lesson: 5, scope: "وصل کردن ستون A به B (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «How are you today?» درست است؟", options: ["Great, thanks.", "He is a worker.", "She is my teacher, Mrs. Amini.", "It's in Farvardin."], answer: 0, level: "آموزشی", explanation: "پاسخ احوال‌پرسی: Great, thanks." },
  { category: "grammar", lesson: 5, scope: "وصل کردن ستون A به B (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is his job?» درست است؟", options: ["He is a worker.", "Great, thanks.", "He is sixteen years old.", "It's in Farvardin."], answer: 0, level: "آموزشی", explanation: "سؤال از شغل با What is his job? پرسیده و با He is a ... پاسخ داده می‌شود." },
  { category: "grammar", lesson: 5, scope: "وصل کردن ستون A به B (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «Who is that woman?» درست است؟", options: ["She is my teacher, Mrs. Amini.", "Great, thanks.", "He is a worker.", "He is sixteen years old."], answer: 0, level: "آموزشی", explanation: "سؤال با Who دربارهٔ هویت است؛ پاسخ با She است چون woman مؤنث است." },
  { category: "grammar", lesson: 5, scope: "وصل کردن ستون A به B (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «How old is your uncle?» درست است؟", options: ["He is sixteen years old.", "He is a worker.", "Great, thanks.", "It's in Farvardin."], answer: 0, level: "آموزشی", explanation: "پاسخ سؤال سن با He is + عدد داده می‌شود." },
  // سؤال ۲ امتحان: کامل کردن فرم (Reza Pakzad، پیشخدمت، آذر)
  { category: "vocabulary", lesson: 5, scope: "تکمیل فرم (تبدیل به چهارگزینه‌ای)", text: "«Hello. My name is Reza Pakzad.» — در فرم، First name کدام است؟", options: ["Reza", "Pakzad", "waiter", "Azar"], answer: 0, level: "آموزشی", explanation: "Reza نام کوچک و Pakzad نام خانوادگی است." },
  { category: "vocabulary", lesson: 5, scope: "تکمیل فرم (تبدیل به چهارگزینه‌ای)", text: "«Hello. My name is Reza Pakzad.» — در فرم، Last name کدام است؟", options: ["Pakzad", "Reza", "waiter", "Azar"], answer: 0, level: "آموزشی", explanation: "نام خانوادگی او Pakzad است." },
  { category: "vocabulary", lesson: 5, scope: "تکمیل فرم (تبدیل به چهارگزینه‌ای)", text: "«I am a waiter.» — در فرم، Job کدام است؟", options: ["waiter", "Reza", "Pakzad", "Azar"], answer: 0, level: "آموزشی", explanation: "شغل او پیشخدمت (waiter) است." },
  { category: "vocabulary", lesson: 5, scope: "تکمیل فرم (تبدیل به چهارگزینه‌ای)", text: "«My birthday is in Azar.» — در فرم، Month of birth کدام است؟", options: ["Azar", "Reza", "Pakzad", "waiter"], answer: 0, level: "آموزشی", explanation: "ماه تولد او آذر (Azar) است." },
  // سؤال ۳ امتحان: هر کلمه زیر تصویر خودش (یک کلمه اضافی) — Backpack-Thirteen-Engineer-Thirty-Nurse
  { category: "vocabulary", lesson: 5, scope: "کلمه و تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر «کوله‌پشتی»، کدام کلمه درست است؟", options: ["backpack", "engineer", "nurse", "thirty"], answer: 0, level: "آموزشی", explanation: "backpack = کوله‌پشتی." },
  { category: "vocabulary", lesson: 5, scope: "کلمه ناهماهنگ", text: "در فهرست «engineer – nurse – thirty – waiter» کدام کلمه از نظر معنی ناهماهنگ است؟", options: ["engineer", "nurse", "thirty", "waiter"], answer: 2, level: "متوسط", explanation: "thirty عدد است؛ بقیه شغل هستند." },
  // سؤال ۴ امتحان: رنگ‌ها به انگلیسی
  { category: "vocabulary", lesson: 5, scope: "رنگ‌ها به انگلیسی", text: "«زرد» به انگلیسی کدام است؟", options: ["yellow", "green", "blue", "brown"], answer: 0, level: "آموزشی", explanation: "yellow = زرد." },
  { category: "vocabulary", lesson: 5, scope: "رنگ‌ها به انگلیسی", text: "«آبی» به انگلیسی کدام است؟", options: ["blue", "black", "gray", "white"], answer: 0, level: "آموزشی", explanation: "blue = آبی؛ black سیاه است." },
  { category: "vocabulary", lesson: 5, scope: "رنگ‌ها به انگلیسی", text: "«سیاه» به انگلیسی کدام است؟", options: ["black", "blue", "brown", "pink"], answer: 0, level: "آموزشی", explanation: "black = سیاه." },
  { category: "vocabulary", lesson: 5, scope: "رنگ‌ها به انگلیسی", text: "«قهوه‌ای» به انگلیسی کدام است؟", options: ["brown", "red", "orange", "gray"], answer: 0, level: "آموزشی", explanation: "brown = قهوه‌ای." },
  // سؤال ۵ امتحان: کلمات به انگلیسی (کفش، چادر، کت‌وشلوار، روسری)
  { category: "vocabulary", lesson: 5, scope: "واژه به انگلیسی", text: "«کفش» به انگلیسی کدام است؟", options: ["shoes", "gloves", "belt", "sock"], answer: 0, level: "آموزشی", explanation: "shoes = کفش‌ها (همیشه جمع به کار می‌رود)." },
  { category: "vocabulary", lesson: 5, scope: "واژه به انگلیسی", text: "«چادر» به انگلیسی کدام است؟", options: ["chador", "scarf", "coat", "cap"], answer: 0, level: "آموزشی", explanation: "chador = چادر؛ scarf روسری است." },
  { category: "vocabulary", lesson: 5, scope: "واژه به انگلیسی", text: "«کت‌وشلوار» به انگلیسی کدام است؟", options: ["suit", "shirt", "jacket", "sweater"], answer: 0, level: "آموزشی", explanation: "suit = یکدست لباس/کت‌وشلوار." },
  { category: "vocabulary", lesson: 5, scope: "واژه به انگلیسی", text: "«روسری» به انگلیسی کدام است؟", options: ["scarf", "shoes", "hat", "belt"], answer: 0, level: "آموزشی", explanation: "scarf = روسری (جمع آن: scarves)." },
  // درسنامه صفحه ۸۲: حال ساده — s/es سوم شخص مفرد
  { category: "grammar", lesson: 5, scope: "حال ساده", text: "Mr. Lotfi ________ us English.", options: ["teaches", "teach", "teaching", "is teach"], answer: 0, level: "آموزشی", explanation: "فاعل سوم شخص مفرد است؛ به فعل es/s اضافه می‌شود." },
  // درسنامه صفحه ۸۳: حال استمراری — am/is/are + ing
  { category: "grammar", lesson: 5, scope: "حال استمراری", text: "I ________ a brown scarf now.", options: ["am wearing", "is wearing", "are wearing", "wears"], answer: 0, level: "آموزشی", explanation: "فاعل I → am + فعل ing‌دار." },
  { category: "grammar", lesson: 5, scope: "حال استمراری", text: "They ________ football now.", options: ["are playing", "is playing", "am playing", "plays"], answer: 0, level: "آموزشی", explanation: "فاعل جمع → are + فعل ing‌دار." },
  // درسنامه صفحه ۸۲: اشیای دوبخشی همیشه جمع
  { category: "grammar", lesson: 5, scope: "اشیای همیشه جمع", text: "My ________ are new.", options: ["shoes", "shoe", "shoeses", "a shoe"], answer: 0, level: "آموزشی", explanation: "shoes همیشه به صورت جمع به کار می‌رود (فعل are)." },
  { category: "grammar", lesson: 5, scope: "اشیای همیشه جمع", text: "It is cold. Wear your ________.", options: ["gloves", "glove", "gloveses", "a glove"], answer: 0, level: "آموزشی", explanation: "gloves (دستکش‌ها) همیشه جمع است." },
  // درسنامه صفحه ۸۳: صفت قبل از اسم
  { category: "grammar", lesson: 5, scope: "صفت قبل از اسم", text: "You have a ________ car.", options: ["blue", "car blue", "blues", "bluecar"], answer: 0, level: "آموزشی", explanation: "رنگ‌ها صفت هستند و قبل از اسم می‌آیند: a blue car." },
];
