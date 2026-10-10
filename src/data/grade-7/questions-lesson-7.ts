import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس هفتم پایه هفتم — تست‌های امتحانی صفحه ۹۷
 * و درسنامهٔ درس هفتم (ساعت، شماره تلفن، آدرس، a.m./p.m.).
 */
export const QUESTIONS_LESSON_7: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: کامل کردن با لغات داده‌شده (یک کلمه اضافی) — صفحه ۹۷
  { category: "vocabulary", lesson: 7, scope: "تکمیل مکالمه با کلمات داده‌شده (تبدیل به چهارگزینه‌ای)", text: "A: What is your ________?  B: 545-7845.", options: ["phone number", "address", "e-mail address", "birthday"], answer: 0, level: "آموزشی", explanation: "پاسخ یک شمارهٔ تلفن است؛ پس سؤال از phone number بوده است." },
  { category: "vocabulary", lesson: 7, scope: "تکمیل مکالمه با کلمات داده‌شده (تبدیل به چهارگزینه‌ای)", text: "A: And your ________?  B: hasanlotfi1392@gmail.com.", options: ["e-mail address", "phone number", "first name", "street"], answer: 0, level: "آموزشی", explanation: "آدرس ایمیل با علامت @ مشخص می‌شود." },
  { category: "grammar", lesson: 7, scope: "تکمیل مکالمه با کلمات داده‌شده (تبدیل به چهارگزینه‌ای)", text: "A: Where do you ________?  B: 32 Mahan Street.", options: ["live", "lives", "living", "lived"], answer: 0, level: "آموزشی", explanation: "بعد از do فعل به شکل ساده می‌آید: Where do you live?" },
  { category: "vocabulary", lesson: 7, scope: "تکمیل مکالمه با کلمات داده‌شده (تبدیل به چهارگزینه‌ای)", text: "A: What ________ are you going?  B: At 4:40 p.m.", options: ["time", "day", "month", "color"], answer: 0, level: "متوسط", explanation: "پاسخ ساعت است؛ پس سؤال با What time پرسیده شده است." },
  // سؤال ۲ امتحان: کامل کردن جاهای خالی با حروف مناسب
  { category: "vocabulary", lesson: 7, scope: "تکمیل حروف (تبدیل به چهارگزینه‌ای)", text: "کلمهٔ «موبایل» (m________bile) را کامل کنید.", options: ["o", "a", "e", "u"], answer: 0, level: "آموزشی", explanation: "mobile = تلفن همراه." },
  { category: "vocabulary", lesson: 7, scope: "تکمیل حروف (تبدیل به چهارگزینه‌ای)", text: "کلمهٔ «خیابان» (str________t) را کامل کنید.", options: ["ee", "ea", "oo", "ii"], answer: 0, level: "آموزشی", explanation: "street = خیابان." },
  { category: "vocabulary", lesson: 7, scope: "تکمیل حروف (تبدیل به چهارگزینه‌ای)", text: "کلمهٔ «دفتر» (________ffice) را کامل کنید.", options: ["o", "a", "u", "e"], answer: 0, level: "آموزشی", explanation: "office = دفتر/اداره." },
  // سؤال ۳ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 7, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (garden – bedroom – reading – living room)", options: ["garden", "bedroom", "reading", "living room"], answer: 2, level: "متوسط", explanation: "reading فعل است؛ بقیه مکان هستند." },
  { category: "vocabulary", lesson: 7, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (stair – studying – working – reading)", options: ["stair", "studying", "working", "reading"], answer: 0, level: "متوسط", explanation: "stair (پله) اسم مکان است؛ بقیه فعل‌های ing‌دار هستند." },
  { category: "vocabulary", lesson: 7, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (friend – teacher – classmate – notebook)", options: ["friend", "teacher", "classmate", "notebook"], answer: 3, level: "آموزشی", explanation: "notebook شیء است؛ بقیه اشخاص هستند." },
  { category: "vocabulary", lesson: 7, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (visit – hungry – fix – cook)", options: ["visit", "hungry", "fix", "cook"], answer: 1, level: "متوسط", explanation: "hungry (گرسنه) صفت است؛ بقیه فعل هستند." },
  // سؤال ۴ امتحان + درسنامه صفحه ۹۵: گفتن ساعت
  { category: "grammar", lesson: 7, scope: "گفتن ساعت", text: "با توجه به تصویر ساعت (۹:۱۵)، کدام گزینه درست است؟", options: ["It's quarter past nine.", "It's quarter to nine.", "It's half past nine.", "It's quarter to ten."], answer: 0, level: "متوسط", explanation: "۱۵ دقیقهٔ گذشته از ساعت = quarter past nine." },
  { category: "grammar", lesson: 7, scope: "گفتن ساعت", text: "ساعت ۲:۳۰ به انگلیسی کدام است؟", options: ["It's half past two.", "It's half to two.", "It's two half past.", "It's half past three."], answer: 0, level: "آموزشی", explanation: "۳۰ دقیقهٔ گذشته = half past two." },
  { category: "grammar", lesson: 7, scope: "گفتن ساعت", text: "ساعت ۶:۵۰ به انگلیسی کدام است؟", options: ["It's ten to seven.", "It's ten past seven.", "It's fifty to six.", "It's ten to six."], answer: 0, level: "متوسط", explanation: "۵۰ دقیقه یعنی ۱۰ دقیقه به ۷ مانده = ten to seven." },
  { category: "grammar", lesson: 7, scope: "گفتن ساعت", text: "ساعت ۴:۴۰ به انگلیسی کدام است؟", options: ["It's twenty to five.", "It's twenty past five.", "It's twenty to four.", "It's forty to five."], answer: 0, level: "متوسط", explanation: "۴۰ دقیقه یعنی ۲۰ دقیقه به ۵ مانده = twenty to five." },
  { category: "grammar", lesson: 7, scope: "گفتن ساعت — روش دوم", text: "ساعت دیجیتال ۱۰:۱۰ به روش دوم چگونه گفته می‌شود؟", options: ["It's ten ten.", "It's ten and ten.", "It's past ten ten.", "It's ten to ten."], answer: 0, level: "متوسط", explanation: "در روش دوم ابتدا ساعت و سپس دقیقه خوانده می‌شود: ten ten." },
  { category: "grammar", lesson: 7, scope: "گفتن ساعت", text: "ساعت ۷:۴۵ به انگلیسی کدام است؟", options: ["It's a quarter to eight.", "It's a quarter past eight.", "It's a quarter past seven.", "It's half past seven."], answer: 0, level: "استاندارد", explanation: "۴۵ دقیقه یعنی یک‌ربع به ۸ مانده = a quarter to eight." },
  // درسنامه صفحه ۹۶: خواندن شماره تلفن
  { category: "vocabulary", lesson: 7, scope: "خواندن شماره تلفن", text: "شمارهٔ تلفن 433-7851 چگونه خوانده می‌شود؟", options: ["four three three, seven eight five one", "four thirty-three, seventy-eight fifty-one", "fourteen thirty-three, seven eight fifty-one", "four three three, seventeen eighty-five one"], answer: 0, level: "متوسط", explanation: "اعداد شماره تلفن پشت‌سرهم و یک‌به‌یک تلفظ می‌شوند." },
  { category: "vocabulary", lesson: 7, scope: "خواندن شماره تلفن", text: "در خواندن شماره تلفن، عدد صفر معمولاً به‌جای zero چگونه تلفظ می‌شود؟", options: ["oh (O)", "double zero", "hundred", "thirty"], answer: 0, level: "متوسط", explanation: "به‌جای صفر در شماره تلفن می‌توان حرف O (اُ) را گفت." },
  // درسنامه صفحه ۹۶: آدرس‌دهی
  { category: "grammar", lesson: 7, scope: "آدرس‌دهی", text: "کدام آدرس به سبک انگلیسی (از کوچک به بزرگ) نوشته شده است؟", options: ["15 Shahid Hakim Street, Manzarieh.", "Manzarieh, 15 Shahid Hakim Street.", "Street Shahid Hakim 15, Manzarieh.", "Manzarieh Street, 15 Shahid Hakim."], answer: 0, level: "متوسط", explanation: "در انگلیسی آدرس از کوچک‌ترین واحد (شمارهٔ پلاک و خیابان) شروع می‌شود." },
  // واژگان درس هفتم — صفحه ۹۱
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "a.m. به چه معناست؟", options: ["قبل از ظهر", "بعد از ظهر", "ساعت دقیق", "نیمه‌شب"], answer: 0, level: "آموزشی", explanation: "a.m. = قبل از ظهر." },
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "p.m. به چه معناست؟", options: ["بعد از ظهر", "قبل از ظهر", "نیمروز", "آخر هفته"], answer: 0, level: "آموزشی", explanation: "p.m. = بعد از ظهر." },
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "«street» به فارسی کدام است؟", options: ["خیابان", "کوچه", "میدان", "محله"], answer: 0, level: "آموزشی", explanation: "street = خیابان؛ alley یعنی کوچه." },
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "«alley» به فارسی کدام است؟", options: ["کوچه", "خیابان", "اتوبان", "پل"], answer: 0, level: "آموزشی", explanation: "alley = کوچه/خیابان کوچک." },
  { category: "vocabulary", lesson: 7, scope: "واژگان درس هفتم", text: "«married» به فارسی کدام است؟", options: ["متأهل", "مجرد", "جوان", "مشهور"], answer: 0, level: "آموزشی", explanation: "married = متأهل." },
];
