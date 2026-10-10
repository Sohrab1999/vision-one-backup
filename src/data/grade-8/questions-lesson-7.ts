import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس هفتم پایه هشتم — نمونه سوالات امتحانی صفحه ۷۲
 * (تطبیق جمله با تصویر، کامل کردن جمله با تصویر، ترجمه واژه‌ها)
 * و واژگان/مکالمه و تلفظ صفحات ۶۱ تا ۶۵ (سرگرمی‌ها، as a hobby،
 * enjoy/like + ing، تلفظ -ing).
 *
 * اصلاحیه: در سؤال اول جزوه «I like playing computer game» مطابق متن کتاب
 * به شکل جمع «computer games» اصلاح شد.
 *
 * تبدیل: سؤالات تصویری به تست با توصیف فارسی تصویر تبدیل شدند.
 */
export const QUESTIONS_LESSON_7: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): تطبیق جمله با تصویر
  { category: "grammar", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: دختری در حال خواندن کتاب است. کدام جمله با تصویر هماهنگ است؟", options: ["I like reading.", "I like playing computer games.", "I go horse riding.", "I go shopping."], answer: 0, level: "آموزشی", explanation: "خواندن کتاب → I like reading." },
  { category: "grammar", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: پسری در حال بازی با رایانه است. کدام جمله با تصویر هماهنگ است؟", options: ["I like playing computer games.", "I like reading.", "I walk in the park.", "I watch movies as a hobby."], answer: 0, level: "آموزشی", explanation: "بازی‌های رایانه‌ای → I like playing computer games." },
  { category: "grammar", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: سوارکاری روی اسب. کدام جمله با تصویر هماهنگ است؟", options: ["I go horse riding.", "I go shopping.", "I like reading.", "I search the web."], answer: 0, level: "آموزشی", explanation: "اسب‌سواری → I go horse riding." },
  { category: "grammar", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: قدم زدن در پارک. کدام جمله با تصویر هماهنگ است؟", options: ["I walk in the park.", "I go horse riding.", "I play tennis.", "I watch movies."], answer: 0, level: "آموزشی", explanation: "قدم زدن در پارک → I walk in the park." },
  // سؤال ۲ امتحان (تصویری): کامل کردن جمله‌های ناقص
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: اسکی روی برف. I like ________ in winter.", options: ["skiing", "reading", "cooking", "shopping"], answer: 0, level: "آموزشی", explanation: "اسکی → skiing." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: ماهی‌گیری با قلاب کنار رودخانه. He enjoys ________.", options: ["fishing", "skiing", "typing", "writing"], answer: 0, level: "آموزشی", explanation: "ماهی‌گیری → fishing." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: مجله‌ای روی میز. I usually buy a ________.", options: ["magazine", "mountain", "medicine", "museum"], answer: 0, level: "آموزشی", explanation: "مجله → magazine." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: راکت و توپ تنیس. My hobby is playing ________.", options: ["tennis", "the radio", "story", "poem"], answer: 0, level: "آموزشی", explanation: "تنیس بازی کردن → playing tennis." },
  // سؤال ۳ امتحان: ترجمه واژه‌ها
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — ترجمه واژه‌ها", text: "واژهٔ «poem» یعنی چه؟", options: ["شعر", "مجله", "باشگاه", "سرگرمی"], answer: 0, level: "آموزشی", explanation: "poem = شعر." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — ترجمه واژه‌ها", text: "واژهٔ «magazine» یعنی چه؟", options: ["مجله", "شعر", "کتاب", "روزنامه"], answer: 0, level: "آموزشی", explanation: "magazine = مجله." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — ترجمه واژه‌ها", text: "«باشگاه» به انگلیسی کدام است؟", options: ["gym", "poem", "magazine", "hobby"], answer: 0, level: "آموزشی", explanation: "باشگاه (ورزشی) → gym." },
  { category: "vocabulary", lesson: 7, scope: "نمونه سوالات امتحانی درس ۷ — ترجمه واژه‌ها", text: "واژهٔ «searching» یعنی چه؟", options: ["جستجو کردن", "خواندن", "خرید کردن", "تماشا کردن"], answer: 0, level: "آموزشی", explanation: "searching = جستجو کردن." },
  // درسنامه/مکالمه درس هفتم (صفحات ۶۱ تا ۶۳)
  { category: "grammar", lesson: 7, scope: "درسنامه — Do you have any hobbies?", text: "A: Do you have any hobbies?   B: ________", options: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, there is."], answer: 0, level: "آموزشی", explanation: "سؤال با do → پاسخ کوتاه: Yes, I do." },
  { category: "grammar", lesson: 7, scope: "درسنامه — as a hobby", text: "A: What do you do as a hobby?   B: ________", options: ["I watch movies as a hobby.", "I am fine.", "Yes, I do.", "It is rainy."], answer: 0, level: "آموزشی", explanation: "پاسخ با فعل سرگرمی + as a hobby داده می‌شود." },
  { category: "grammar", lesson: 7, scope: "درسنامه — What's your hobby?", text: "کدام پاسخ به سؤال «What's your hobby?» درست است؟", options: ["My hobby is reading.", "I have thirteen years.", "I am from Spain.", "Yes, very much."], answer: 0, level: "آموزشی", explanation: "My hobby is + فعل ing / اسم سرگرمی." },
  { category: "grammar", lesson: 7, scope: "درسنامه — enjoy + ing", text: "I enjoy ________ the Web.", options: ["searching", "search", "to search", "searched"], answer: 0, level: "متوسط", explanation: "بعد از enjoy فعل + ing می‌آید: enjoy searching." },
  { category: "grammar", lesson: 7, scope: "درسنامه — like + ing", text: "I like ________ computer games.", options: ["playing", "play", "to playing", "plays"], answer: 0, level: "آموزشی", explanation: "بعد از like فعل + ing می‌آید: like playing." },
  { category: "grammar", lesson: 7, scope: "درسنامه — تلفظ -ing", text: "طبق درسنامهٔ تلفظ جزوه، در کلمه‌های reading، playing و searching حرف g پایانی (-ing) چگونه تلفظ می‌شود؟", options: ["تلفظ نمی‌شود؛ فقط صدای /ŋ/ شنیده می‌شود", "کامل تلفظ می‌شود /g/", "مثل /dʒ/ تلفظ می‌شود", "مثل /ʃ/ تلفظ می‌شود"], answer: 0, level: "متوسط", explanation: "طبق صفحهٔ تلفظ جزوه: there's no /g/ at the end." },
  // واژگان درس هفتم
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "Actually, I don't have any hobbies. But I usually go to the ________ in my free time.", options: ["gym", "net", "radio", "story"], answer: 0, level: "آموزشی", explanation: "از مکالمهٔ درس: go to the gym = رفتن به باشگاه." },
];
