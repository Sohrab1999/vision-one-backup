import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس اول پایه هفتم — تست‌های امتحانی صفحه ۵۰
 * و درسنامهٔ گرامر درس اول (to be، نام و فامیل، Mr/Mrs/Miss/Ms، حروف بزرگ و کوچک).
 */
export const QUESTIONS_LESSON_1: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: شکل کوچک و بزرگ حروف — صفحه ۵۰
  { category: "grammar", lesson: 1, scope: "حروف کوچک و بزرگ (تبدیل به چهارگزینه‌ای)", text: "کدام جفت «حرف بزرگ – حرف کوچک» درست است؟", options: ["A – a", "K – n", "R – v", "D – o"], answer: 0, level: "آموزشی", explanation: "جفت صحیح A با a است؛ بقیهٔ جفت‌ها نادرست‌اند." },
  { category: "grammar", lesson: 1, scope: "حروف کوچک و بزرگ (تبدیل به چهارگزینه‌ای)", text: "شکل بزرگ (capital) حرف «q» کدام است؟", options: ["Q", "G", "O", "D"], answer: 0, level: "آموزشی", explanation: "شکل بزرگ حرف q، حرف Q است." },
  { category: "grammar", lesson: 1, scope: "حروف کوچک و بزرگ (تبدیل به چهارگزینه‌ای)", text: "شکل کوچک (small) حرف «R» کدام است؟", options: ["r", "m", "v", "o"], answer: 0, level: "آموزشی", explanation: "شکل کوچک حرف R، حرف r است." },
  { category: "grammar", lesson: 1, scope: "حروف کوچک و بزرگ (تبدیل به چهارگزینه‌ای)", text: "کدام جفت حروف نادرست است؟", options: ["K – k", "X – x", "Q – q", "D – b"], answer: 3, level: "متوسط", explanation: "شکل کوچک حرف D، حرف d است؛ نه b." },
  // سؤال ۲ امتحان: واژه‌ای که با B شروع می‌شود
  { category: "vocabulary", lesson: 1, scope: "کلمه با حرف B (تبدیل به چهارگزینه‌ای)", text: "کدام کلمه با حرف B شروع می‌شود؟", options: ["apple", "desk", "ball", "pen"], answer: 2, level: "آموزشی", explanation: "فقط ball با حرف B شروع می‌شود." },
  // سؤال ۳ امتحان: کلمه متفاوت
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (green – blue – black – book)", options: ["green", "blue", "black", "book"], answer: 3, level: "آموزشی", explanation: "green، blue و black رنگ هستند؛ book وسیله است." },
  // سؤال ۴ امتحان: نام و فامیل + درسنامه صفحه ۴۹
  { category: "grammar", lesson: 1, scope: "نام و فامیل — first/last name", text: "در جمله «I am Hassan Lotfi.» نام کوچک (first name) کدام است؟", options: ["Hassan", "Lotfi", "am", "I"], answer: 0, level: "آموزشی", explanation: "حسن نام کوچک است و لطفی نام خانوادگی." },
  { category: "grammar", lesson: 1, scope: "نام و فامیل — first/last name", text: "در جمله «I am Hassan Lotfi.» نام خانوادگی (last name) کدام است؟", options: ["Hassan", "Lotfi", "I", "am"], answer: 1, level: "آموزشی", explanation: "لطفی (Lotfi) نام خانوادگی/family name است." },
  { category: "grammar", lesson: 1, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «What is your first name?» درست است؟", options: ["My first name is Ali.", "My last name is Ahmadi.", "I am fine, thanks.", "Yes, it is."], answer: 0, level: "متوسط", explanation: "پاسخ نام کوچک با «My first name is ...» داده می‌شود." },
  { category: "grammar", lesson: 1, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «What is your last name?» درست است؟", options: ["My last name is Lotfi.", "My first name is Sara.", "I am a student.", "Nice to meet you."], answer: 0, level: "متوسط", explanation: "پاسخ فامیل با «My last name is ...» داده می‌شود." },
  // درسنامه: صرف فعل to be — صفحه ۴۹
  { category: "grammar", lesson: 1, scope: "تکمیل جاهای خالی", text: "What ________ your last name?", options: ["is", "are", "am", "be"], answer: 0, level: "آموزشی", explanation: "your last name مفرد است؛ پس از is استفاده می‌شود (What is = What's)." },
  { category: "grammar", lesson: 1, scope: "تکمیل جاهای خالی", text: "I ________ a student.", options: ["am", "is", "are", "be"], answer: 0, level: "آموزشی", explanation: "فاعل I همیشه فعل am می‌گیرد." },
  { category: "grammar", lesson: 1, scope: "تکمیل جاهای خالی", text: "She ________ my English teacher.", options: ["is", "am", "are", "be"], answer: 0, level: "آموزشی", explanation: "He/She/It فعل is می‌گیرند." },
  { category: "grammar", lesson: 1, scope: "تکمیل جاهای خالی", text: "We ________ in the classroom.", options: ["are", "is", "am", "be"], answer: 0, level: "آموزشی", explanation: "We/You/They فعل are می‌گیرند." },
  { category: "grammar", lesson: 1, scope: "مخفف to be", text: "مخفف درست «What is» کدام است؟", options: ["What's", "Whats'", "What'is", "W'hat is"], answer: 0, level: "آموزشی", explanation: "What is = What's" },
  { category: "grammar", lesson: 1, scope: "مخفف to be", text: "مخفف درست «They are» کدام است؟", options: ["They're", "Thier", "They is", "Them're"], answer: 0, level: "متوسط", explanation: "They are = They're" },
  // سؤال ۵ امتحان: Mr/Miss با تصویر — توضیحی (صفحه ۵۰)
  { category: "grammar", lesson: 1, scope: "Mr./Mrs./Miss/Ms. — توضیحی (تبدیل به چهارگزینه‌ای)", text: "برای احترام، قبل از نام آقایان از کدام لفظ استفاده می‌شود؟", options: ["Mr.", "Mrs.", "Miss.", "Ms."], answer: 0, level: "آموزشی", explanation: "قبل از اسم آقایان از Mr. استفاده می‌کنیم." },
  { category: "grammar", lesson: 1, scope: "Mr./Mrs./Miss/Ms. — توضیحی (تبدیل به چهارگزینه‌ای)", text: "قبل از نام خانمی که ازدواج کرده است از کدام لفظ استفاده می‌شود؟", options: ["Mr.", "Mrs.", "Miss.", "Ms."], answer: 1, level: "آموزشی", explanation: "قبل از نام خانم‌های متأهل از Mrs. استفاده می‌کنیم." },
  { category: "grammar", lesson: 1, scope: "Mr./Mrs./Miss/Ms. — توضیحی (تبدیل به چهارگزینه‌ای)", text: "قبل از نام خانمِ مجرد از کدام لفظ استفاده می‌شود؟", options: ["Mr.", "Mrs.", "Miss.", "Ms."], answer: 2, level: "آموزشی", explanation: "قبل از نام خانم‌های مجرد از Miss. استفاده می‌کنیم." },
  { category: "grammar", lesson: 1, scope: "Mr./Mrs./Miss/Ms. — توضیحی (تبدیل به چهارگزینه‌ای)", text: "وقتی از مجرد یا متأهل بودن خانمی اطلاع نداریم، از کدام لفظ استفاده می‌کنیم؟", options: ["Mr.", "Mrs.", "Miss.", "Ms."], answer: 3, level: "متوسط", explanation: "وقتی وضعیت تأهل نامشخص است از Ms. استفاده می‌کنیم." },
  { category: "grammar", lesson: 1, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «How are you?» درست است؟", options: ["I'm fine, thanks.", "My name is Reza.", "I am twelve.", "Yes, I am."], answer: 0, level: "آموزشی", explanation: "پاسخ احوال‌پرسی با I'm fine، thanks است." },
  // واژگان درس اول — صفحات ۴۱ تا ۴۴
  { category: "vocabulary", lesson: 1, scope: "واژگان درس اول", text: "معنی کلمهٔ «library» چیست؟", options: ["کتابخانه", "کتابدار", "کلاس", "دفتر"], answer: 0, level: "آموزشی", explanation: "library = کتابخانه و librarian = کتابدار." },
  { category: "vocabulary", lesson: 1, scope: "واژگان درس اول", text: "معنی کلمهٔ «classmate» چیست؟", options: ["همکلاسی", "معلم", "کتابدار", "همسایه"], answer: 0, level: "آموزشی", explanation: "classmate = همکلاسی/هم‌درس." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (teacher – student – librarian – classroom)", options: ["teacher", "student", "librarian", "classroom"], answer: 3, level: "متوسط", explanation: "classroom مکان است؛ بقیه نام اشخاص هستند." },
];
