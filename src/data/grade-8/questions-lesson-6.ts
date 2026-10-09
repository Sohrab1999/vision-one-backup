import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس ششم پایه هشتم — نمونه سوالات امتحانی صفحه ۶۰
 * (واژه تصاویر آب‌وهوا، اسم تصاویر مکان‌ها، کلمه ناهماهنگ)
 * و درسنامه صفحات ۵۱ تا ۵۹ (What's the weather like?، How about ...?،
 * توصیف روستا، تلفظ th).
 *
 * اصلاحیه: در سؤال اول «Suuny» → «Sunny» و در سؤال کلمه ناهماهنگ
 * «einter» → «winter» (غلط‌های چاپی جزوه).
 */
export const QUESTIONS_LESSON_6: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): کلمات آب‌وهوا (Sunny – hot – rainy – windy)
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: آسمان صاف با خورشید. کدام واژه مناسب است؟", options: ["sunny", "rainy", "windy", "cloudy"], answer: 0, level: "آموزشی", explanation: "آفتابی → sunny." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: آسمان ابری و بارانی. کدام واژه مناسب است؟", options: ["rainy", "sunny", "icy", "windy"], answer: 0, level: "آموزشی", explanation: "بارانی → rainy." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: درخت خمیده به دلیل باد شدید. کدام واژه مناسب است؟", options: ["windy", "rainy", "hot", "wet"], answer: 0, level: "آموزشی", explanation: "بادی → windy." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: آفتاب سوزان و دمای بالا. کدام واژه مناسب است؟", options: ["hot", "cold", "icy", "snowy"], answer: 0, level: "آموزشی", explanation: "گرم/داغ → hot." },
  // سؤال ۲ امتحان (تصویری): اسم تصاویر مکان‌ها (farm – stadium – mosque – bridge – palace – metro system)
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: زمین کشاورزی با محصولات. کدام واژه مناسب است؟", options: ["farm", "stadium", "palace", "zoo"], answer: 0, level: "آموزشی", explanation: "مزرعه → farm." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: بنای باشکوه سلطنتی. کدام واژه مناسب است؟", options: ["palace", "farm", "bridge", "store"], answer: 0, level: "آموزشی", explanation: "کاخ → palace." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: شبکه قطارهای شهری. کدام واژه مناسب است؟", options: ["metro system", "farm", "shrine", "gym"], answer: 0, level: "آموزشی", explanation: "سیستم مترو → metro system." },
  // سؤال ۳ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Father – mother – brother – weather)", options: ["Father", "mother", "brother", "weather"], answer: 3, level: "آموزشی", explanation: "weather آب‌وهواست؛ بقیه اعضای خانواده هستند." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (River – summer – winter – fall)", options: ["River", "summer", "winter", "fall"], answer: 0, level: "آموزشی", explanation: "river رودخانه است؛ بقیه فصل‌ها هستند." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Wet – rainy – snowy – story)", options: ["Wet", "rainy", "snowy", "story"], answer: 3, level: "آموزشی", explanation: "story داستان است؛ بقیه حالت‌های آب‌وهوا هستند." },
  { category: "vocabulary", lesson: 6, scope: "نمونه سوالات امتحانی درس ۶ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Icy – snowy – cold – hot)", options: ["Icy", "snowy", "cold", "hot"], answer: 3, level: "متوسط", explanation: "hot گرم است؛ بقیه مربوط به سرما هستند." },
  // درسنامه صفحه ۵۹: الگوهای آب‌وهوا
  { category: "grammar", lesson: 6, scope: "درسنامه — What's the weather like?", text: "A: What's the weather like in Rasht?   B: ________", options: ["It's rainy and wet in spring.", "It's in the north.", "Yes, it is.", "On Mondays."], answer: 0, level: "آموزشی", explanation: "پاسخ با It's + صفت آب‌وهوا (+ فصل) داده می‌شود." },
  { category: "grammar", lesson: 6, scope: "درسنامه — How about ...?", text: "عبارت «How about winter?» جایگزین کدام سؤال است (برای جلوگیری از تکرار سؤال)؟", options: ["What's the weather like in winter?", "Where is winter?", "Do you like winter?", "Is winter your hobby?"], answer: 0, level: "متوسط", explanation: "How about ...? و What about ...? جایگزین تکرار سؤال می‌شوند." },
  { category: "grammar", lesson: 6, scope: "درسنامه — پاسخ کوتاه با it", text: "A: Is it cold in winter?   B: No, ________.", options: ["it isn't", "it is", "there isn't", "it doesn't"], answer: 0, level: "آموزشی", explanation: "پاسخ منفی سؤال با it → No, it isn't." },
  { category: "grammar", lesson: 6, scope: "درسنامه — حرف اضافه فصل‌ها", text: "What's the weather like in Tabriz ________ summer?", options: ["in", "on", "at", "of"], answer: 0, level: "آموزشی", explanation: "قبل از فصل‌ها از in استفاده می‌شود." },
  { category: "grammar", lesson: 6, scope: "درسنامه — What's the people's job?", text: "A: What's the people's job?   B: ________", options: ["They work on farms.", "They are on farms.", "Yes, they do.", "It is a farm."], answer: 0, level: "متوسط", explanation: "پرسش شغل مردم → They work on farms (and raise animals)." },
  // واژگان درس ششم
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "Farmers work on farms and ________ animals.", options: ["raise", "take", "make", "play"], answer: 0, level: "آموزشی", explanation: "raise animals = پرورش دادن حیوانات." },
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "It's a mountain ________ with many farms and a river.", options: ["village", "stadium", "weather", "palace"], answer: 0, level: "آموزشی", explanation: "روستای کوهستانی → a mountain village." },
];
