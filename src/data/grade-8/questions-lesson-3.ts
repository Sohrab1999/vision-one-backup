import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس سوم پایه هشتم — نمونه سوالات امتحانی صفحه ۳۵
 * (اصطلاح تصاویر، جاهای خالی با کلمات داده شده، کلمه ناهماهنگ،
 * کامل کردن واژه و پاسخ کامل با تصویر) و درسنامه صفحه ۳۴
 * (be good at + ing، can + فعل ساده، صفت‌های ملکی).
 *
 * اصلاحیه: در سؤال جاهای خالی «All my classmate» → «All my classmates» (جمع فاعل).
 *
 * تبدیل: سؤالات تصویری جزوه به تست هم‌موضوع با توصیف فارسی تصویر تبدیل شدند.
 */
export const QUESTIONS_LESSON_3: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): اصطلاح مربوط به هر تصویر
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: پسری در حال بازی بدمینتون است. اصطلاح درست کدام است؟", options: ["play badminton", "make badminton", "do badminton", "take badminton"], answer: 0, level: "آموزشی", explanation: "برای ورزش‌ها از play استفاده می‌شود: play badminton." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: حل کردن جدول کلمات (پازل). اصطلاح درست کدام است؟", options: ["do a puzzle", "make a puzzle", "play a puzzle", "take a puzzle"], answer: 0, level: "آموزشی", explanation: "حل کردن جدول → do a puzzle." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: عکس گرفتن با دوربین. اصطلاح درست کدام است؟", options: ["take photos", "make photos", "draw photos", "do photos"], answer: 0, level: "آموزشی", explanation: "عکس گرفتن → take photos." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: دم کردن چای. اصطلاح درست کدام است؟", options: ["make tea", "do tea", "take tea", "cook tea"], answer: 0, level: "آموزشی", explanation: "چای درست کردن → make tea." },
  // سؤال ۲ امتحان: جاهای خالی با کلمات داده شده (Cook – do – type – speak – take)
  { category: "vocabulary", lesson: 3, scope: "جاهای خالی — کلمات داده شده", text: "How do you ________ a hard puzzle?", options: ["do", "cook", "type", "speak"], answer: 0, level: "آموزشی", explanation: "حل کردن جدول سخت → do a puzzle." },
  { category: "vocabulary", lesson: 3, scope: "جاهای خالی — کلمات داده شده", text: "All my classmates can ________ English well.", options: ["speak", "type", "cook", "draw"], answer: 0, level: "آموزشی", explanation: "صحبت کردن به زبان انگلیسی → speak English." },
  { category: "vocabulary", lesson: 3, scope: "جاهای خالی — کلمات داده شده", text: "What do you need to ________ some food?", options: ["cook", "type", "speak", "do"], answer: 0, level: "آموزشی", explanation: "پختن غذا → cook food." },
  { category: "vocabulary", lesson: 3, scope: "جاهای خالی — کلمات داده شده", text: "I like to learn how to ________ fast.", options: ["type", "cook", "speak", "make"], answer: 0, level: "آموزشی", explanation: "سریع تایپ کردن → type fast." },
  // سؤال ۳ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Swimming – running – buying – riding)", options: ["Swimming", "running", "buying", "riding"], answer: 2, level: "متوسط", explanation: "buying (خریدن) مربوط به خرید است؛ بقیه فعالیت‌های ورزشی هستند." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Badminton – ping pong – draw – tennis)", options: ["Badminton", "ping pong", "draw", "tennis"], answer: 2, level: "آموزشی", explanation: "draw (نقاشی کشیدن) فعل است؛ بقیه ورزش‌ها هستند." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Speak – read – type – chess)", options: ["Speak", "read", "type", "chess"], answer: 3, level: "متوسط", explanation: "chess (شطرنج) نام بازی است؛ بقیه مهارت‌های قابل انجام هستند." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Playing – doing – speaking – morning)", options: ["Playing", "doing", "speaking", "morning"], answer: 3, level: "آموزشی", explanation: "morning اسم زمان است؛ بقیه فعل + ing هستند." },
  // سؤال ۴ امتحان (تصویری): کامل کردن کلمات ناقص
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: نوشتن با رایانه. کلمهٔ ناقص «ty__» کدام واژه است؟", options: ["type", "tape", "take", "tale"], answer: 0, level: "آموزشی", explanation: "تایپ کردن → type." },
  { category: "vocabulary", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: شنا کردن در استخر. کلمهٔ ناقص «sw__» کدام واژه است؟", options: ["swim", "same", "some", "stem"], answer: 0, level: "آموزشی", explanation: "شنا کردن → swim." },
  // سؤال ۵ امتحان (تصویری): پاسخ کامل به سؤال
  { category: "grammar", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: دختری در حال شنا کردن. کدام پاسخ کامل به سؤال «Can she swim?» درست است؟", options: ["Yes, she can.", "Yes, she is.", "Yes, I can.", "No, she can."], answer: 0, level: "آموزشی", explanation: "سؤال با can و فاعل she → پاسخ: Yes, she can." },
  { category: "grammar", lesson: 3, scope: "نمونه سوالات امتحانی درس ۳ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: پسری در حال نقاشی کشیدن. کدام پاسخ کامل به سؤال «What can he do?» درست است؟", options: ["He can draw.", "He can to draw.", "He cans draw.", "He can draws."], answer: 0, level: "متوسط", explanation: "بعد از can فعل ساده می‌آید: He can draw." },
  // درسنامه صفحه ۳۴: be good at / can / صفت ملکی
  { category: "grammar", lesson: 3, scope: "درسنامه — be good at + ing", text: "I am good at ________.", options: ["drawing", "draw", "to draw", "draws"], answer: 0, level: "آموزشی", explanation: "بعد از good at فعل + ing می‌آید: good at drawing." },
  { category: "grammar", lesson: 3, scope: "درسنامه — can + فعل ساده", text: "They can ________ basketball.", options: ["play", "playing", "plays", "to play"], answer: 0, level: "آموزشی", explanation: "بعد از can فعل ساده می‌آید: can play." },
  { category: "grammar", lesson: 3, scope: "درسنامه — صفت‌های ملکی", text: "She has two pens. ________ pens are on the table.", options: ["Her", "His", "Their", "Our"], answer: 0, level: "آموزشی", explanation: "صفت ملکی she → her." },
  { category: "grammar", lesson: 3, scope: "درسنامه — صفت‌های ملکی", text: "I have a bag. ________ bag is yellow.", options: ["My", "Me", "I", "Mine"], answer: 0, level: "آموزشی", explanation: "صفت ملکی I → my." },
];
