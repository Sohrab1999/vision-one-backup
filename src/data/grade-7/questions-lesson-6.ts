import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس ششم پایه هفتم — تست‌های امتحانی صفحه ۹۰
 * و درسنامهٔ درس ششم (Where، حال استمراری، اتاق‌های خانه).
 */
export const QUESTIONS_LESSON_6: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: کامل کردن جمله‌ها با کلمات داده‌شده — صفحه ۹۰
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه با کلمات داده‌شده", text: "A: Where are you?  B: I am in the ________.", options: ["bedroom", "football", "yellow", "driver"], answer: 0, level: "آموزشی", explanation: "پاسخ مکان با «in the + اتاق/مکان» داده می‌شود؛ bedroom = اتاق خواب." },
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه با کلمات داده‌شده", text: "A: What are you ________?  B: I am washing the dishes.", options: ["doing", "do", "does", "did"], answer: 0, level: "آموزشی", explanation: "الگوی حال استمراری: What are you doing?" },
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه با کلمات داده‌شده", text: "________ is he?  B: He's in the living room.", options: ["Where", "What", "Who", "When"], answer: 0, level: "آموزشی", explanation: "پاسخ دربارهٔ مکان است؛ پس سؤال با Where پرسیده می‌شود." },
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه با کلمات داده‌شده", text: "________ is she doing?  B: She is watching TV.", options: ["What", "Where", "Who", "When"], answer: 0, level: "آموزشی", explanation: "پرسش از کارِ در حال انجام با What ... doing? ساخته می‌شود." },
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه با کلمات داده‌شده", text: "She is ________ TV.", options: ["watching", "watch", "watches", "watched"], answer: 0, level: "آموزشی", explanation: "در حال استمراری بعد از is فعل ing‌دار می‌آید." },
  // سؤال ۲ امتحان: پاسخ با توجه به تصاویر
  { category: "grammar", lesson: 6, scope: "پاسخ با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر (بچه‌ها در حال بازی فوتبال): «What are they doing?»", options: ["They are playing football.", "They are eating breakfast.", "She is fixing the car.", "He is watching TV."], answer: 0, level: "متوسط", explanation: "تصویر بازی فوتبال است → They are playing football." },
  { category: "grammar", lesson: 6, scope: "پاسخ با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر (دختر در حال خوردن صبحانه): «What is she doing?»", options: ["She is eating breakfast.", "She is playing football.", "He is eating breakfast.", "They are drinking tea."], answer: 0, level: "متوسط", explanation: "تصویر خوردن صبحانه است → She is eating breakfast." },
  { category: "grammar", lesson: 6, scope: "پاسخ با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر (مرد در حال تعمیر ماشین): «What is he doing?»", options: ["He is fixing the car.", "He is washing the dishes.", "She is fixing the car.", "He is reading a newspaper."], answer: 0, level: "متوسط", explanation: "تصویر تعمیر ماشین است → He is fixing the car." },
  // سؤال ۳ امتحان: انتخاب کلمه مناسب با توجه به تصاویر
  { category: "vocabulary", lesson: 6, scope: "انتخاب کلمه مناسب با توجه به تصویر", text: "با توجه به تصویر «ساعت دیواری»، کدام کلمه درست است؟", options: ["clock", "television", "computer", "radio"], answer: 0, level: "آموزشی", explanation: "clock = ساعت (دیواری/رومیزی)." },
  { category: "vocabulary", lesson: 6, scope: "انتخاب کلمه مناسب با توجه به تصویر", text: "با توجه به تصویر «تلویزیون»، کدام کلمه درست است؟", options: ["television", "clock", "table", "comb"], answer: 0, level: "آموزشی", explanation: "television = تلویزیون." },
  { category: "vocabulary", lesson: 6, scope: "انتخاب کلمه مناسب با توجه به تصویر", text: "با توجه به تصویر «روزنامه»، کدام کلمه درست است؟", options: ["newspaper", "television", "mirror", "comb"], answer: 0, level: "آموزشی", explanation: "newspaper = روزنامه." },
  // واژگان درس ششم — صفحات ۸۵ و ۸۶
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "«آینه» به انگلیسی کدام است؟", options: ["mirror", "comb", "newspaper", "radio"], answer: 0, level: "آموزشی", explanation: "mirror = آینه." },
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "«شانه» به انگلیسی کدام است؟", options: ["comb", "mirror", "clock", "blanket"], answer: 0, level: "آموزشی", explanation: "comb = شانه (و شانه کردن)." },
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "«روزنامه» به انگلیسی کدام است؟", options: ["newspaper", "television", "paper", "news"], answer: 0, level: "آموزشی", explanation: "newspaper = روزنامه؛ paper یعنی کاغذ و news یعنی خبر." },
  // درسنامه: Where — صفحه ۸۹
  { category: "grammar", lesson: 6, scope: "درسنامه درس ششم — Where", text: "Where ________ they? — They are in the garage.", options: ["are", "is", "am", "do"], answer: 0, level: "آموزشی", explanation: "فاعل جمع (they) → are." },
  { category: "grammar", lesson: 6, scope: "درسنامه درس ششم — Where", text: "Where is Dad? — He ________ in the garage.", options: ["is", "are", "am", "be"], answer: 0, level: "آموزشی", explanation: "فاعل مفرد (He) → is." },
  // واژگان خانه — صفحه ۸۵
  { category: "vocabulary", lesson: 6, scope: "واژگان خانه", text: "Mom is cooking lunch in the ________.", options: ["kitchen", "bedroom", "garage", "yard"], answer: 0, level: "آموزشی", explanation: "آشپزی در آشپزخانه (kitchen) انجام می‌شود." },
  { category: "vocabulary", lesson: 6, scope: "واژگان خانه", text: "The car is in the ________.", options: ["garage", "kitchen", "bathroom", "bedroom"], answer: 0, level: "آموزشی", explanation: "ماشین در گاراژ (garage) است." },
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "«I'm so hungry.» یعنی چه؟", options: ["من خیلی گرسنه‌ام", "من خیلی تشنه‌ام", "من خیلی خسته‌ام", "من خیلی خوشحالم"], answer: 0, level: "آموزشی", explanation: "hungry = گرسنه." },
  { category: "vocabulary", lesson: 6, scope: "واژگان درس ششم", text: "«I am thirsty.» یعنی چه؟", options: ["من تشنه‌ام", "من گرسنه‌ام", "من خسته‌ام", "من سردم است"], answer: 0, level: "آموزشی", explanation: "thirsty = تشنه." },
  // درسنامه: حال استمراری — فعل کمکی
  { category: "grammar", lesson: 6, scope: "حال استمراری — فعل کمکی", text: "What ________ she doing?", options: ["is", "are", "am", "do"], answer: 0, level: "آموزشی", explanation: "فاعل مفرد (she) → is." },
  { category: "grammar", lesson: 6, scope: "حال استمراری — فعل کمکی", text: "They ________ playing football now.", options: ["are", "is", "am", "do"], answer: 0, level: "آموزشی", explanation: "فاعل جمع (they) → are." },
  { category: "vocabulary", lesson: 6, scope: "واژه به فارسی", text: "«living room» به فارسی کدام است؟", options: ["اتاق نشیمن", "اتاق خواب", "آشپزخانه", "انبار"], answer: 0, level: "آموزشی", explanation: "living room = اتاق نشیمن." },
];
