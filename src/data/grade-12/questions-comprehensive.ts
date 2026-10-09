import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات جامع جزوه جامع پایه دوازدهم (Vision Three — تألیف جمال احمدی و همکاران).
 *
 * منبع (۲۰ سؤال): «بخش چهارم — آزمون‌های نهایی با کلید» جزوه:
 * - امتحان نهایی خرداد ۱۴۰۱ (۱۴۰۱/۰۳/۲۵ — «سؤالات پاسخ‌نامه دارد»): سؤال‌های ۲۱-۲۳ (تکمیل
 *   جمله با بانک واژگان communicative/replaced/suppose/effectively — یک واژه اضافی)،
 *   ۲۴-۲۶ (تطبیق تعریف — یک تعریف اضافی) و ۲۸-۳۱ (گرامر چهارگزینه‌ای).
 * - امتحان نهایی شهریور ۱۴۰۱ (۱۴۰۱/۰۶/۲۱ — «سؤالات پاسخ‌نامه دارد»): سؤال‌های ۲۳-۲۵
 *   (بانک واژگان identify/shouted/diary/turbine)، ۲۶-۲۸ (تطبیق تعریف) و ۳۱-۳۴ (گرامر).
 * پاسخ هر سؤال عین «راهنمای تصحیح» چاپی همان امتحان است.
 *
 * نکته قالب: بانک‌های ۴ واژه‌ای و جدول‌های تطبیق ۴ تعریفی جزوه به گزینه‌های چهارگزینه‌ای
 * استاندارد همین آزمون تبدیل شدند (متن و گزینه‌ها عین چاپ امتحان است).
 *
 * نکته سطح: همه سؤال‌های رسمی امتحان نهایی با سطح «استاندارد» ثبت شدند.
 */
export const QUESTIONS_COMPREHENSIVE: QuizQuestionSeed[] = [
  // ─── امتحان نهایی خرداد ۱۴۰۱ — واژگان (بانک واژگان و تطبیق تعریف) ───
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "If students know how to study more ________, they'll be able to learn more.", options: ["communicative", "replaced", "suppose", "effectively"], answer: 3, level: "استاندارد", explanation: "اگر دانش‌آموزان بدانند چگونه مؤثرتر درس بخوانند، بیشتر یاد می‌گیرند." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "He wasn't very ________ and kept to himself.", options: ["communicative", "replaced", "suppose", "effectively"], answer: 0, level: "استاندارد", explanation: "او خیلی اهل معاشرت نبود و در لاک خودش بود." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "Mina carefully ________ the glasses on the shelf.", options: ["communicative", "replaced", "suppose", "effectively"], answer: 1, level: "استاندارد", explanation: "مینا با دقت لیوان‌ها را روی قفسه جایگزین کرد." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "They have to arrange the chairs around the table for the party.", options: ["the rise and fall of the sea", "take something in, especially gradually", "put things in a neat, attractive, or useful order", "tell somebody that something is good"], answer: 2, level: "استاندارد", explanation: "arrange یعنی چیدن و مرتب کردن اشیاء به شکلی منظم." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "The teacher recommended a learner's dictionary to his students.", options: ["the rise and fall of the sea", "take something in, especially gradually", "put things in a neat, attractive, or useful order", "tell somebody that something is good"], answer: 3, level: "استاندارد", explanation: "recommend یعنی چیزی را به کسی پیشنهاد و توصیه کردن." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "Here you can see two high and two low tides each day.", options: ["the rise and fall of the sea", "take something in, especially gradually", "put things in a neat, attractive, or useful order", "tell somebody that something is good"], answer: 0, level: "استاندارد", explanation: "tide یعنی جزر و مد، بالا و پایین رفتن آب دریا." },
  // ─── امتحان نهایی خرداد ۱۴۰۱ — گرامر ───
  { category: "grammar", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "A: Hamid has not come to school. I've heard he is not well, ________? B: Oh, yes. He has got a flu.", options: ["has he", "have I", "hasn't Hamid", "is he"], answer: 3, level: "استاندارد", explanation: "عبارت الحاق برای جمله اول با فعل کمکی has و منفی، مثبت کوتاه می‌شود... پاسخ کلید: گزینه d." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "The woman ________ my sister met in the hospital is a nurse.", options: ["which", "whom", "whose", "where"], answer: 1, level: "استاندارد", explanation: "ضمیر موصولی مفعولی برای انسان: whom." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "This book ________ into countless languages including German, English and French.", options: ["has been translated", "had translated", "may translate", "were translated"], answer: 0, level: "استاندارد", explanation: "مجهول حال کامل: has been + شکل سوم فعل." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی خرداد ۱۴۰۱", text: "A: This summer is really hot and lots of animals are in danger. B: Something ________ about global warming, or some types of animals will die out.", options: ["must do", "were done", "should be done", "are doing"], answer: 2, level: "استاندارد", explanation: "مجهول با افعال ناقص: should be + شکل سوم فعل." },
  // ─── امتحان نهایی شهریور ۱۴۰۱ — واژگان ───
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "This wind ________ is able to generate a lot of electricity each day.", options: ["identify", "shouted", "diary", "turbine"], answer: 3, level: "استاندارد", explanation: "توربین بادی قادر است روزانه برق زیادی تولید کند." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "To choose the best dictionary, first ________ your needs.", options: ["identify", "shouted", "diary", "turbine"], answer: 0, level: "استاندارد", explanation: "برای انتخاب بهترین فرهنگ لغت، اول نیازهایت را شناسایی کن." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "When my mother saw my score, she ________ at me angrily.", options: ["identify", "shouted", "diary", "turbine"], answer: 1, level: "استاندارد", explanation: "وقتی مادرم نمره‌ام را دید، با عصبانیت به من فریاد زد." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "I really appreciate the culture and art of Iran.", options: ["to change in a form", "to be grateful for", "to have something inside", "to think and believe"], answer: 1, level: "استاندارد", explanation: "appreciate یعنی قدردانی کردن، شکرگزار بودن." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "I suppose we shouldn't give up trying after a failure.", options: ["to change in a form", "to be grateful for", "to have something inside", "to think and believe"], answer: 3, level: "استاندارد", explanation: "suppose یعنی فکر و باور کردن، گمان کردن." },
  { category: "vocabulary", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "Pizza contains a lot of fat.", options: ["to change in a form", "to be grateful for", "to have something inside", "to think and believe"], answer: 2, level: "استاندارد", explanation: "contain یعنی چیزی را در خود داشتن." },
  // ─── امتحان نهایی شهریور ۱۴۰۱ — گرامر ───
  { category: "grammar", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "The boy ________ you invited arrived very late.", options: ["which", "whom", "who", "whose"], answer: 1, level: "استاندارد", explanation: "ضمیر موصولی مفعولی برای انسان: whom." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "English ________ in many countries.", options: ["speaks", "is speaking", "is spoken", "has spoken"], answer: 2, level: "استاندارد", explanation: "مجهول حال ساده: is + شکل سوم فعل." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "His sister never behaves politely, ________?", options: ["does she", "doesn't she", "does he", "doesn't he"], answer: 0, level: "استاندارد", explanation: "عبارت الحاق جمله منفی، مثبت کوتاه است؛ فاعل sister → she." },
  { category: "grammar", lesson: 0, scope: "امتحان نهایی شهریور ۱۴۰۱", text: "Zahra ________ chess before, so I showed her what to do.", options: ["didn't play", "wasn't playing", "hasn't played", "hadn't played"], answer: 3, level: "استاندارد", explanation: "عملی که قبل از عمل گذشته انجام شده: گذشته کامل (hadn't played)." },
];
