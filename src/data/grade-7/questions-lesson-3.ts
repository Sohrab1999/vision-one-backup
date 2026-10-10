import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس سوم پایه هفتم — تست‌های امتحانی صفحه ۶۵
 * و درسنامهٔ درس سوم (اعداد، روزها، ماه‌ها، اعداد ترتیبی، in/on).
 */
export const QUESTIONS_LESSON_3: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: کامل کردن با en/ten — صفحه ۶۵
  { category: "vocabulary", lesson: 3, scope: "تکمیل حروف en/ten (تبدیل به چهارگزینه‌ای)", text: "حروف جاافتادهٔ عدد «Sev________» (۷) کدام است؟", options: ["en", "ten", "een", "in"], answer: 0, level: "آموزشی", explanation: "۷ = seven." },
  { category: "vocabulary", lesson: 3, scope: "تکمیل حروف en/ten (تبدیل به چهارگزینه‌ای)", text: "حروف جاافتادهٔ عدد «Elev________» (۱۱) کدام است؟", options: ["en", "teen", "ten", "ing"], answer: 0, level: "آموزشی", explanation: "۱۱ = eleven." },
  { category: "vocabulary", lesson: 3, scope: "تکمیل حروف en/ten (تبدیل به چهارگزینه‌ای)", text: "حروف جاافتادهٔ عدد «Nine________» (۱۹) کدام است؟", options: ["teen", "ten", "en", "ty"], answer: 0, level: "آموزشی", explanation: "۱۹ = nineteen؛ اعداد ۱۳ تا ۱۹ با پسوند teen ساخته می‌شوند." },
  { category: "vocabulary", lesson: 3, scope: "تکمیل حروف en/ten (تبدیل به چهارگزینه‌ای)", text: "حروف جاافتادهٔ عدد «Six________» (۱۶) کدام است؟", options: ["teen", "ty", "en", "ten"], answer: 0, level: "آموزشی", explanation: "۱۶ = sixteen." },
  // سؤال ۲ امتحان: عدد به حروف انگلیسی
  { category: "vocabulary", lesson: 3, scope: "عدد به حروف (تبدیل به چهارگزینه‌ای)", text: "«۴۱» به حروف انگلیسی کدام است؟", options: ["forty-one", "four-one", "fourteen", "forty"], answer: 0, level: "متوسط", explanation: "۴۱ = forty-one؛ fourteen یعنی ۱۴." },
  { category: "vocabulary", lesson: 3, scope: "عدد به حروف (تبدیل به چهارگزینه‌ای)", text: "«۲۰» به حروف انگلیسی کدام است؟", options: ["twenty", "twelve", "ten", "twenteen"], answer: 0, level: "آموزشی", explanation: "۲۰ = twenty؛ twelve یعنی ۱۲." },
  { category: "vocabulary", lesson: 3, scope: "عدد به حروف (تبدیل به چهارگزینه‌ای)", text: "«۱۰» به حروف انگلیسی کدام است؟", options: ["ten", "teen", "nine", "twelve"], answer: 0, level: "آموزشی", explanation: "۱۰ = ten." },
  { category: "vocabulary", lesson: 3, scope: "عدد به حروف (تبدیل به چهارگزینه‌ای)", text: "«۵» به حروف انگلیسی کدام است؟", options: ["five", "nine", "fine", "four"], answer: 0, level: "آموزشی", explanation: "۵ = five؛ four یعنی ۴." },
  // سؤال ۳ امتحان: پاسخ دادن به سؤالات با ستون سمت راست
  { category: "grammar", lesson: 3, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is your first name?» درست است؟", options: ["My name is Saro.", "I am 13 years old.", "It is in Bahman.", "My last name is Lotfi."], answer: 0, level: "متوسط", explanation: "پاسخ نام کوچک با My name is ... داده می‌شود." },
  { category: "grammar", lesson: 3, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is your last name?» درست است؟", options: ["My last name is Lotfi.", "My name is Saro.", "I am 13 years old.", "It is in Bahman."], answer: 0, level: "متوسط", explanation: "پاسخ نام خانوادگی با My last name is ... داده می‌شود." },
  { category: "grammar", lesson: 3, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «How old are you?» درست است؟", options: ["I am 13 years old.", "My name is Saro.", "It is in Bahman.", "My last name is Lotfi."], answer: 0, level: "متوسط", explanation: "پاسخ سؤال سن با I am ... years old داده می‌شود." },
  { category: "grammar", lesson: 3, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is your birthday?» درست است؟", options: ["It is in Bahman.", "I am 13 years old.", "My name is Saro.", "My last name is Lotfi."], answer: 0, level: "متوسط", explanation: "تاریخ تولد با It is in + ماه داده می‌شود." },
  // سؤال ۴ امتحان: جاهای خالی ترتیب روزها و اعداد
  { category: "grammar", lesson: 3, scope: "تکمیل ترتیب روزها (تبدیل به چهارگزینه‌ای)", text: "«Saturday, ________, Monday, Tuesday» — کدام گزینه ترتیب روزها را کامل می‌کند؟", options: ["Sunday", "Friday", "Thursday", "Wednesday"], answer: 0, level: "آموزشی", explanation: "ترتیب: شنبه (Saturday)، یکشنبه (Sunday)، دوشنبه (Monday)، سه‌شنبه (Tuesday)." },
  { category: "vocabulary", lesson: 3, scope: "تکمیل جاهای خالی", text: "«One, two, three, ________, five» — کدام عدد ترتیب را کامل می‌کند؟", options: ["four", "nine", "ten", "six"], answer: 0, level: "آموزشی", explanation: "ترتیب اعداد: one, two, three, four, five." },
  { category: "vocabulary", lesson: 3, scope: "تکمیل جاهای خالی", text: "«five, ________, seven» — کدام عدد ترتیب را کامل می‌کند؟", options: ["six", "eight", "four", "nine"], answer: 0, level: "آموزشی", explanation: "ترتیب اعداد: five, six, seven." },
  // سؤال ۶ امتحان: جمعه به انگلیسی
  { category: "vocabulary", lesson: 3, scope: "واژه به انگلیسی", text: "«جمعه» به انگلیسی کدام است؟", options: ["Friday", "Thursday", "Saturday", "Sunday"], answer: 0, level: "آموزشی", explanation: "جمعه = Friday؛ پنج‌شنبه = Thursday." },
  // درسنامه: in/on — صفحات ۶۳ و ۶۴
  { category: "grammar", lesson: 3, scope: "درسنامه درس سوم — in/on", text: "My birthday is ________ Azar.", options: ["in", "on", "at", "of"], answer: 0, level: "آموزشی", explanation: "قبل از نام ماه‌ها از حرف اضافهٔ in استفاده می‌کنیم." },
  { category: "grammar", lesson: 3, scope: "درسنامه درس سوم — in/on", text: "We go to school ________ Saturday.", options: ["on", "in", "at", "of"], answer: 0, level: "آموزشی", explanation: "قبل از روزهای هفته از حرف اضافهٔ on استفاده می‌کنیم." },
  // درسنامه: ترتیب روزها و ماه‌ها
  { category: "grammar", lesson: 3, scope: "ترتیب روزها", text: "کدام روز بعد از سه‌شنبه (Tuesday) می‌آید؟", options: ["Wednesday", "Thursday", "Monday", "Friday"], answer: 0, level: "آموزشی", explanation: "بعد از سه‌شنبه، چهارشنبه (Wednesday) است." },
  { category: "grammar", lesson: 3, scope: "ترتیب روزها", text: "کدام روز بعد از جمعه (Friday) می‌آید؟", options: ["Saturday", "Sunday", "Monday", "Thursday"], answer: 0, level: "آموزشی", explanation: "بعد از جمعه، شنبه (Saturday) است." },
  { category: "vocabulary", lesson: 3, scope: "ترتیب ماه‌ها", text: "کدام ماه بعد از January می‌آید؟", options: ["February", "March", "April", "December"], answer: 0, level: "آموزشی", explanation: "ترتیب: January، February، March، ..." },
  { category: "vocabulary", lesson: 3, scope: "ماه‌ها", text: "یازدهمین ماه سال میلادی کدام است؟", options: ["November", "September", "October", "December"], answer: 0, level: "متوسط", explanation: "ماه یازدهم = November (نوامبر)." },
  // درسنامه: اعداد ترتیبی — صفحه ۶۱
  { category: "vocabulary", lesson: 3, scope: "اعداد ترتیبی", text: "«سوم» به انگلیسی کدام است؟", options: ["third", "three", "thirty", "thirteen"], answer: 0, level: "آموزشی", explanation: "اول/دوم/سوم = first/second/third." },
  { category: "grammar", lesson: 3, scope: "عدد اصلی و ترتیبی", text: "در کدام جمله از عدد ترتیبی (ordinal) استفاده شده است؟", options: ["My birthday is on the third of May.", "I have three books.", "She is ten years old.", "Two boys are here."], answer: 0, level: "متوسط", explanation: "third (سوم) عدد ترتیبی است؛ بقیه اعداد اصلی (cardinal) هستند." },
  // درسنامه: بعد از one اسم مفرد — صفحه ۶۴
  { category: "grammar", lesson: 3, scope: "درسنامه درس سوم — عدد و جمع", text: "Two ________ are in the classroom.", options: ["students", "student", "studentes", "a student"], answer: 0, level: "آموزشی", explanation: "بعد از همهٔ اعداد جز one، اسم به صورت جمع می‌آید." },
  { category: "grammar", lesson: 3, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «How old is your brother?» درست است؟", options: ["He is thirteen.", "He is a doctor.", "Yes, he is.", "It is in Aban."], answer: 0, level: "متوسط", explanation: "پاسخ سن با He is + عدد داده می‌شود." },
];
