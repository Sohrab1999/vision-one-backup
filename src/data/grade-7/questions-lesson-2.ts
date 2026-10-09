import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس دوم پایه هفتم — تست‌های امتحانی صفحه ۵۶
 * و درسنامهٔ گرامر درس دوم (this/that/these/those، who، can، He/She، مالکیت 's).
 */
export const QUESTIONS_LESSON_2: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: دایره دور نام‌ها و خط زیر فامیل‌ها — صفحه ۵۶
  { category: "vocabulary", lesson: 2, scope: "تشخیص نام و فامیل (تبدیل به چهارگزینه‌ای)", text: "در فهرست «Kamali – Mobina – Mohammadi – Majidi» کدام‌یک نام کوچک (first name) است؟", options: ["Kamali", "Mobina", "Mohammadi", "Majidi"], answer: 1, level: "آموزشی", explanation: "Mobina نام کوچک است؛ سه کلمهٔ دیگر نام خانوادگی‌اند." },
  { category: "vocabulary", lesson: 2, scope: "تشخیص نام و فامیل (تبدیل به چهارگزینه‌ای)", text: "در فهرست «Mahsa – Ayda – Mohammadi – Hani» کدام‌یک نام خانوادگی (last name) است؟", options: ["Mahsa", "Ayda", "Mohammadi", "Hani"], answer: 2, level: "آموزشی", explanation: "Mohammadi نام خانوادگی است؛ بقیه نام کوچک‌اند." },
  // سؤال ۲ امتحان: ساختن اسم از حروف به‌هم‌ریخته
  { category: "vocabulary", lesson: 2, scope: "حروف به‌هم‌ریخته (تبدیل به چهارگزینه‌ای)", text: "با حروف «a-n-a-h-m» کدام نام ساخته می‌شود؟", options: ["Sara", "Hana", "Mona", "Mahsa"], answer: 1, level: "متوسط", explanation: "Hana = h + a + n + a؛ از این حروف فقط Hana ساخته می‌شود." },
  { category: "vocabulary", lesson: 2, scope: "حروف به‌هم‌ریخته (تبدیل به چهارگزینه‌ای)", text: "با حروف «a-y-d-a» کدام نام ساخته می‌شود؟", options: ["Ayda", "Maryam", "Hani", "Saro"], answer: 0, level: "متوسط", explanation: "Ayda = a + y + d + a." },
  // سؤال ۳ امتحان: ص/غ با تصاویر (تبدیل به گزینه صحیح)
  { category: "grammar", lesson: 2, scope: "ص/غ (تبدیل به چهارگزینه‌ای)", text: "کدام جمله از نظر گرامری درست است؟", options: ["This is my sister.", "This are my sister.", "These is my sister.", "This am my sister."], answer: 0, level: "آموزشی", explanation: "This مفرد است و با is به کار می‌رود." },
  // سؤال ۴ امتحان: کامل کردن با he/she
  { category: "grammar", lesson: 2, scope: "he/she (تبدیل به چهارگزینه‌ای)", text: "Ali is my brother. ________ is ten years old.", options: ["He", "She", "It", "They"], answer: 0, level: "آموزشی", explanation: "برای مرد/پسر از ضمیر He استفاده می‌کنیم." },
  { category: "grammar", lesson: 2, scope: "he/she (تبدیل به چهارگزینه‌ای)", text: "Sara is my sister. ________ is a student.", options: ["She", "He", "It", "They"], answer: 0, level: "آموزشی", explanation: "برای زن/دختر از ضمیر She استفاده می‌کنیم." },
  // سؤال ۵ امتحان: وصل کردن بخش پایانی جمله‌ها
  { category: "grammar", lesson: 2, scope: "وصل کردن (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «Who is that boy?» درست است؟", options: ["That's Erfan.", "He is twelve.", "Yes, he can.", "It is Monday."], answer: 0, level: "متوسط", explanation: "سؤال با Who دربارهٔ هویت است؛ پاسخ: That's Erfan." },
  { category: "grammar", lesson: 2, scope: "وصل کردن (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به جملهٔ «Welcome to our school.» درست است؟", options: ["Thank you.", "Nice to meet you.", "Yes, I can.", "I am fine."], answer: 0, level: "آموزشی", explanation: "در پاسخ به خوش‌آمد می‌گوییم Thank you." },
  { category: "grammar", lesson: 2, scope: "وصل کردن (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به جملهٔ «Nice to meet you.» درست است؟", options: ["Nice to meet you, too.", "Welcome home.", "Yes, please.", "Good night."], answer: 0, level: "آموزشی", explanation: "پاسخ متقابل: Nice to meet you, too." },
  // درسنامه: صفات اشاره — صفحه ۵۵
  { category: "grammar", lesson: 2, scope: "درسنامه درس دوم — صفات اشاره", text: "________ is my pen. (نزدیک)", options: ["This", "That", "These", "Those"], answer: 0, level: "آموزشی", explanation: "This برای مفرد نزدیک به کار می‌رود." },
  { category: "grammar", lesson: 2, scope: "درسنامه درس دوم — صفات اشاره", text: "________ are my books. (نزدیک، جمع)", options: ["These", "This", "That", "Those"], answer: 0, level: "آموزشی", explanation: "These برای جمعِ نزدیک به کار می‌رود." },
  { category: "grammar", lesson: 2, scope: "درسنامه درس دوم — صفات اشاره", text: "________ is my teacher over there. (دور)", options: ["That", "This", "These", "Those"], answer: 0, level: "آموزشی", explanation: "That برای مفردِ دور به کار می‌رود." },
  { category: "grammar", lesson: 2, scope: "درسنامه درس دوم — صفات اشاره", text: "________ are my friends in that yard. (دور، جمع)", options: ["Those", "These", "This", "That"], answer: 0, level: "آموزشی", explanation: "Those برای جمعِ دور به کار می‌رود." },
  // درسنامه: can — صفحه ۵۴
  { category: "grammar", lesson: 2, scope: "can — توانایی", text: "Saro ________ play football very well.", options: ["can", "is", "are", "does"], answer: 0, level: "آموزشی", explanation: "بعد از can فعل اصلی به شکل ساده می‌آید." },
  { category: "grammar", lesson: 2, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «Can I help you?» درست است؟", options: ["Yes, please. I need my library card.", "No, I am twelve.", "Yes, she can.", "It is a book."], answer: 0, level: "متوسط", explanation: "پاسخ درست درخواست کمک: Yes, please + درخواست." },
  { category: "grammar", lesson: 2, scope: "who — چه کسی", text: "________ is your new classmate? — Erfan.", options: ["Who", "What", "Where", "How"], answer: 0, level: "آموزشی", explanation: "Who کلمهٔ پرسشی برای پرسیدن هویت فاعل است." },
  // درسنامه: مالکیت 's — صفحه ۵۵
  { category: "vocabulary", lesson: 2, scope: "مالکیت 's (تبدیل به چهارگزینه‌ای)", text: "«اسم دانش‌آموز» (مالکیت یک نفر) به انگلیسی کدام است؟", options: ["student's name", "students' names", "students name", "student name"], answer: 0, level: "متوسط", explanation: "برای مالکیت انسان، آپاستروف + s بعد از اسم مفرد می‌آید: student's name." },
  { category: "vocabulary", lesson: 2, scope: "مالکیت 's (تبدیل به چهارگزینه‌ای)", text: "«اسامی دانش‌آموزان» به انگلیسی کدام است؟", options: ["students' names", "student's name", "students name's", "student names'"], answer: 0, level: "متوسط", explanation: "اگر اسم جمع باشد، آپاستروف بعد از s جمع می‌آید: students' names." },
  { category: "grammar", lesson: 2, scope: "پاسخ صحیح سؤال", text: "کدام پاسخ به سؤال «What's your last name again?» درست است؟", options: ["It's Mohammadi. M-O-H-A-M-M-A-D-I.", "I am fine, thank you.", "Yes, it is.", "Nice to meet you, too."], answer: 0, level: "متوسط", explanation: "پاسخ: فامیل + هجی کردن حروف آن." },
  // درسنامه: too — صفحه ۵۵
  { category: "grammar", lesson: 2, scope: "too — هم/نیز", text: "I am a student, and my sister is a student, ________.", options: ["too", "two", "to", "do"], answer: 0, level: "آموزشی", explanation: "too به معنای «هم/نیز» در انتهای جمله می‌آید." },
  // واژگان درس دوم — صفحات ۵۱ و ۵۲
  { category: "vocabulary", lesson: 2, scope: "واژگان درس دوم", text: "معنی کلمهٔ «introduce» چیست؟", options: ["معرفی کردن", "احوال‌پرسی کردن", "تلفن کردن", "تمرین کردن"], answer: 0, level: "متوسط", explanation: "introduce = معرفی/آشنا کردن." },
];
