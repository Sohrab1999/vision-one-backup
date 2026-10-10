import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس پنجم پایه هشتم — نمونه سوالات امتحانی صفحه ۵۰
 * (واژه تصاویر، کامل کردن کلمات ناقص، جهت‌های جغرافیایی، تلفظ th)
 * و درسنامه صفحات ۴۲ تا ۴۹ (مکان‌های شهری، What's it famous for?،
 * What's it like?).
 *
 * تبدیل: سؤال تلفظ صفحه ۵۰ چون چند پاسخ درست داشت (south، math، three،
 * toothache، thirty) به دو تست جداگانه با یک پاسخ درست بازسازی شد؛
 * سؤالات تصویری و کلمات ناقص به چهارگزینه‌ای تبدیل شدند.
 */
export const QUESTIONS_LESSON_5: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): کلمات مربوط به تصاویر (mosque – bridge – stadium – metro – zoo)
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: بنای مسجد با مناره. کدام واژه مناسب است؟", options: ["mosque", "church", "stadium", "palace"], answer: 0, level: "آموزشی", explanation: "مسجد → mosque." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: پل روی رودخانه. کدام واژه مناسب است؟", options: ["bridge", "building", "zoo", "store"], answer: 0, level: "آموزشی", explanation: "پل → bridge." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: ورزشگاه فوتبال. کدام واژه مناسب است؟", options: ["stadium", "library", "cinema", "mosque"], answer: 0, level: "آموزشی", explanation: "ورزشگاه → stadium." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: قطار شهری (مترو). کدام واژه مناسب است؟", options: ["metro", "airport", "bus station", "zoo"], answer: 0, level: "آموزشی", explanation: "مترو → metro." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: باغ وحش. کدام واژه مناسب است؟", options: ["zoo", "farm", "park", "gym"], answer: 0, level: "آموزشی", explanation: "باغ وحش → zoo." },
  // سؤال ۲ امتحان: کامل کردن کلمات ناقص (Airp_rt، cin_ma، shr_ne، pal_ce)
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — کلمات ناقص (تبدیل به چهارگزینه‌ای)", text: "کلمهٔ ناقص «cin_ma» با کدام حرف کامل می‌شود؟", options: ["e", "a", "o", "u"], answer: 0, level: "آموزشی", explanation: "cinema = سینما." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — کلمات ناقص (تبدیل به چهارگزینه‌ای)", text: "کلمهٔ ناقص «pal_ce» با کدام حرف کامل می‌شود؟", options: ["a", "e", "o", "u"], answer: 0, level: "آموزشی", explanation: "palace = کاخ." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — کلمات ناقص (تبدیل به چهارگزینه‌ای)", text: "واژهٔ «shrine» یعنی چه؟", options: ["آرامگاه", "فرودگاه", "استادیوم", "کلیسا"], answer: 0, level: "آموزشی", explanation: "shrine = آرامگاه." },
  // سؤال ۳ امتحان: جهت‌های جغرافیایی (south west – north west – south east – north east)
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — جهت‌های جغرافیایی", text: "«شمال‌غربی» به انگلیسی کدام است؟", options: ["north west", "north east", "south west", "south east"], answer: 0, level: "آموزشی", explanation: "north = شمال، west = غرب → north west." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — جهت‌های جغرافیایی", text: "«جنوب‌شرقی» به انگلیسی کدام است؟", options: ["south east", "south west", "north east", "north west"], answer: 0, level: "آموزشی", explanation: "south = جنوب، east = شرق → south east." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — جهت‌های جغرافیایی", text: "«جنوب‌غربی» به انگلیسی کدام است؟", options: ["south west", "south east", "north west", "north east"], answer: 0, level: "آموزشی", explanation: "south = جنوب، west = غرب → south west." },
  { category: "vocabulary", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — جهت‌های جغرافیایی", text: "«شمال‌شرقی» به انگلیسی کدام است؟", options: ["north east", "north west", "south east", "south west"], answer: 0, level: "آموزشی", explanation: "north = شمال، east = شرق → north east." },
  // سؤال ۴ امتحان: تلفظ th (بازسازی‌شده)
  { category: "grammar", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تلفظ th", text: "در کدام کلمه حرف th صدای «ث» (/θ/) می‌دهد؟", options: ["three", "brother", "this", "then"], answer: 0, level: "متوسط", explanation: "three، south، math، thirty و toothache صدای /θ/ دارند." },
  { category: "grammar", lesson: 5, scope: "نمونه سوالات امتحانی درس ۵ — تلفظ th", text: "در کدام کلمه حرف th صدای «ذ» (/ð/) می‌دهد؟", options: ["this", "three", "thank", "thirty"], answer: 0, level: "متوسط", explanation: "this، mother، brother، they و weather صدای /ð/ دارند." },
  // درسنامه صفحه ۴۹: What is ... famous for? / What's it like?
  { category: "grammar", lesson: 5, scope: "درسنامه — What is ... famous for?", text: "A: What is Isfahan famous for?   B: ________", options: ["It's famous for its old mosques.", "It's in the west.", "It's warm.", "Yes, there is."], answer: 0, level: "متوسط", explanation: "الگوی پرسش معروفیت: What is ... famous for? → It's famous for ..." },
  { category: "grammar", lesson: 5, scope: "درسنامه — What's it like?", text: "A: What's Tabriz like?   B: ________", options: ["It's a big and old city.", "It's in the west.", "It is famous for its bazaars.", "Yes, it is."], answer: 0, level: "متوسط", explanation: "What's ... like? برای توصیف ظاهر و حالت شهر به کار می‌رود." },
  { category: "grammar", lesson: 5, scope: "درسنامه — Is it ... in winter?", text: "A: Is it snowy in winter?   B: ________", options: ["Yes, it is.", "Yes, there is.", "Yes, it does.", "Yes, I am."], answer: 0, level: "آموزشی", explanation: "سؤال با it (آب‌وهوا) → پاسخ کوتاه: Yes, it is." },
  { category: "grammar", lesson: 5, scope: "درسنامه — What's the weather like?", text: "What's the weather ________ in Ardabil?", options: ["like", "likes", "liking", "look"], answer: 0, level: "آموزشی", explanation: "الگوی ثابت: What's the weather like?" },
];
