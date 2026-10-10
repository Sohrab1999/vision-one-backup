import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس دوم پایه هشتم — نمونه سوالات امتحانی صفحه ۲۷
 * (کامل کردن واژه با تصویر، جاهای خالی با کلمات داده شده، انتخاب جواب صحیح،
 * کلمه ناهماهنگ، ص/غ تصویری) و نکات درسنامه صفحات ۱۹ تا ۲۶ (افعال روزمره،
 * قیدهای زمان، When/What days، حروف اضافه on/in).
 *
 * اصلاحیه: «thursday» → «Thursday»، «wednesday» → «Wednesday»
 * (بزرگ‌نویس روزهای هفته) و «on Sunday's morning» → «on Sunday morning».
 *
 * تبدیل: سؤال ص/غ تصویری به تست شکل پاسخ (Yes, she can / Yes, she is) تبدیل شد.
 */
export const QUESTIONS_LESSON_2: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان (تصویری): کامل کردن کلمات
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: شخصی در حال تماشای تلویزیون است. کلمهٔ ناقص «w_tch TV» با کدام حرف کامل می‌شود؟", options: ["a", "e", "o", "i"], answer: 0, level: "آموزشی", explanation: "watch TV = تلویزیون تماشا کردن." },
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — تصویری (تبدیل به چهارگزینه‌ای)", text: "تصویر: کوهنوردی روی کوه. کلمهٔ ناقص «cli_b» با کدام حرف کامل می‌شود؟", options: ["m", "n", "p", "k"], answer: 0, level: "آموزشی", explanation: "climb a mountain = کوهنوردی کردن." },
  // سؤال ۲ امتحان: جاهای خالی با کلمات داده شده (Mountain – know – pronunciation – relax – relative)
  { category: "vocabulary", lesson: 2, scope: "جاهای خالی — کلمات داده شده", text: "I stay at home and ________ on Fridays.", options: ["relax", "know", "climb", "visit"], answer: 0, level: "آموزشی", explanation: "در خانه می‌مانم و استراحت می‌کنم → relax." },
  { category: "vocabulary", lesson: 2, scope: "جاهای خالی — کلمات داده شده", text: "What is the correct ________ for «study»?", options: ["pronunciation", "relax", "mountain", "week"], answer: 0, level: "متوسط", explanation: "تلفظ درستِ «study» → the correct pronunciation." },
  { category: "vocabulary", lesson: 2, scope: "جاهای خالی — کلمات داده شده", text: "I climb a ________ on Sunday morning.", options: ["mountain", "pronunciation", "relative", "library"], answer: 0, level: "آموزشی", explanation: "climb a mountain = کوهنوردی کردن." },
  { category: "vocabulary", lesson: 2, scope: "جاهای خالی — کلمات داده شده", text: "We visit our ________ on Thursdays.", options: ["relatives", "mountains", "pronunciations", "weekends"], answer: 0, level: "آموزشی", explanation: "visit our relatives = ملاقات اقوام." },
  { category: "vocabulary", lesson: 2, scope: "جاهای خالی — کلمات داده شده", text: "That is fine. I will let her ________.", options: ["know", "relax", "start", "stay"], answer: 0, level: "آموزشی", explanation: "«او را در جریان خواهم گذاشت» → I will let her know." },
  // سؤال ۳ امتحان: انتخاب جواب صحیح
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — انتخاب گزینه صحیح", text: "________ is the weekend.", options: ["Saturday", "Wednesday", "Friday", "Tuesday"], answer: 0, level: "استاندارد", explanation: "طبق نکتهٔ جزوه، در فرهنگ غربی آخر هفته شنبه و یکشنبه است؛ پس Saturday جزو weekend است." },
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — انتخاب گزینه صحیح", text: "I study my ________ in the morning.", options: ["lessons", "well", "library", "relax"], answer: 0, level: "آموزشی", explanation: "درس‌ها را می‌خوانم → study my lessons." },
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — انتخاب گزینه صحیح", text: "What is «شروع کردن» in English? It is ________.", options: ["start", "help", "stay", "study"], answer: 0, level: "آموزشی", explanation: "شروع کردن = start." },
  // سؤال ۴ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Midday – midnight – sunset – noon)", options: ["Midday", "midnight", "sunset", "noon"], answer: 2, level: "متوسط", explanation: "sunset غروب آفتاب است؛ بقیه زمان‌های مشخص وسط روز و شب هستند." },
  { category: "vocabulary", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (Monday – Sunday – midday – Friday)", options: ["Monday", "Sunday", "midday", "Friday"], answer: 2, level: "آموزشی", explanation: "midday زمان روز است؛ بقیه روزهای هفته هستند." },
  // سؤال ۵ امتحان (ص/غ تصویری): شکل پاسخ
  { category: "grammar", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — ص/غ تصویری (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «Can she work with a computer?» درست است؟", options: ["Yes, she can.", "Yes, she is.", "Yes, I can.", "Yes, he can."], answer: 0, level: "آموزشی", explanation: "سؤال با can و فاعل she → پاسخ: Yes, she can." },
  { category: "grammar", lesson: 2, scope: "نمونه سوالات امتحانی درس ۲ — ص/غ تصویری (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «Is she good at playing football?» درست است؟", options: ["Yes, she is.", "Yes, she can.", "Yes, it is.", "Yes, they are."], answer: 0, level: "آموزشی", explanation: "سؤال با is و فاعل she → پاسخ: Yes, she is." },
  // درسنامه صفحه ۲۶: When / What days
  { category: "grammar", lesson: 2, scope: "درسنامه — When ...?", text: "When do you go shopping?  →  ________", options: ["Every Sunday afternoon.", "At the library.", "By bus.", "It is fine."], answer: 0, level: "آموزشی", explanation: "پرسش زمان انجام فعالیت → پاسخ با قید زمان: Every Sunday afternoon." },
  { category: "grammar", lesson: 2, scope: "درسنامه — What days ...?", text: "What days do you play sports?  →  ________", options: ["On Mondays and Fridays.", "Every Sunday afternoon.", "At 6 o'clock.", "In the library."], answer: 0, level: "متوسط", explanation: "پرسش روزهای انجام فعالیت → پاسخ با On + روزها." },
  { category: "grammar", lesson: 2, scope: "درسنامه — حروف اضافه on/in", text: "I play sports ________ Mondays.", options: ["on", "in", "at", "of"], answer: 0, level: "آموزشی", explanation: "قبل از روزهای هفته از on استفاده می‌شود." },
  { category: "grammar", lesson: 2, scope: "درسنامه — حروف اضافه on/in", text: "I watch TV ________ the evening.", options: ["in", "on", "at", "for"], answer: 0, level: "آموزشی", explanation: "قبل از صبح و ظهر و عصر از in استفاده می‌شود." },
  { category: "grammar", lesson: 2, scope: "درسنامه — on Sunday mornings", text: "I go to the gym ________ Sunday mornings.", options: ["on", "in", "at", "by"], answer: 0, level: "متوسط", explanation: "قبل از عبارت زمانی روز هفته (Sunday mornings) از on استفاده می‌شود." },
  // نکته ۲ صفحه ۲۶: weekdays / weekend
  { category: "vocabulary", lesson: 2, scope: "درسنامه — weekdays / weekend", text: "پنج روز غیرتعطیل هفته (دوشنبه تا جمعه در فرهنگ غربی) چه نامیده می‌شوند؟", options: ["weekdays", "weekend", "Wednesday", "midnight"], answer: 0, level: "متوسط", explanation: "روزهای هفته (غیر آخر هفته) weekdays نام دارند." },
];
