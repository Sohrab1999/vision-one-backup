import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس اول پایه نهم (Personality) — تست گرامری صفحه ۲۸
 * و سؤالات امتحانی صفحات ۳۱ تا ۳۳ جزوه.
 */
export const QUESTIONS_LESSON_1: QuizQuestionSeed[] = [
  // تست گرامری — صفحه ۲۸ (There is / are)
  { category: "grammar", lesson: 1, scope: "تست گرامری — There is/are", text: "February normally has twenty-eight days, but every four years ________ twenty-nine.", options: ["There is", "it is", "it has", "there are"], answer: 3, level: "استاندارد", explanation: "«twenty-nine (days)» جمع است؛ پس از there are استفاده می‌شود." },
  { category: "grammar", lesson: 1, scope: "تست گرامری — There is/are", text: "The sun, the moon, and earth have magnetic fields, and ________ evidence that the stellar galaxy has fields that extend through vast regions of space.", options: ["There are", "is", "are", "there is"], answer: 3, level: "کنکوری", explanation: "مفعول بعدی (evidence) مفرد و غیرقابل شمارش است؛ پس there is درست است." },
  { category: "grammar", lesson: 1, scope: "تست گرامری — There is/are", text: "________ fish in the Dead Sea because of the high salt content of the water.", options: ["it is not", "there are not", "there doesn't", "they are not"], answer: 1, level: "استاندارد", explanation: "fish در اینجا جمع است؛ «there are not any fish» یعنی هیچ ماهی‌ای وجود ندارد." },
  { category: "grammar", lesson: 1, scope: "تمرین جاهای خالی", text: "There ________ a whiteboard on the wall.", options: ["is", "are", "am", "be"], answer: 0, level: "آموزشی", explanation: "a whiteboard مفرد است → is." },
  { category: "grammar", lesson: 1, scope: "تمرین جاهای خالی", text: "There ________ 8 chairs in the classroom.", options: ["is", "are", "was", "has"], answer: 1, level: "آموزشی", explanation: "8 chairs جمع است → are." },
  { category: "grammar", lesson: 1, scope: "تمرین جاهای خالی", text: "There ________ a computer on the desk.", options: ["are", "is", "were", "have"], answer: 1, level: "آموزشی", explanation: "a computer مفرد است → is." },
  { category: "grammar", lesson: 1, scope: "تمرین جاهای خالی", text: "There ________ two windows in the room.", options: ["is", "are", "am", "does"], answer: 1, level: "آموزشی", explanation: "two windows جمع است → are." },
  { category: "grammar", lesson: 1, scope: "تست گرامری", text: "He is an ________ student.", options: ["rude", "brave", "quiet", "angry"], answer: 3, level: "متوسط", explanation: "بعد از «an» باید کلمه‌ای با حرف صدادار شروع شود؛ فقط angry با a شروع می‌شود." },
  { category: "grammar", lesson: 1, scope: "تست گرامری", text: "________ are not in the classroom.", options: ["A student", "An student", "Students", "A students"], answer: 2, level: "آموزشی", explanation: "فعل جمع (are) با فاعل جمع (Students) هماهنگ است." },
  { category: "grammar", lesson: 1, scope: "تست گرامری", text: "There ________ a picture in the classroom.", options: ["are", "is", "are many", "many"], answer: 1, level: "آموزشی", explanation: "a picture مفرد است → is." },
  // سؤالات امتحانی — گزینه صحیح
  { category: "vocabulary", lesson: 1, scope: "گزینه صحیح", text: "My sister is ________. She is not quiet.", options: ["neat", "talkative", "kind", "pleasant"], answer: 1, level: "آموزشی", explanation: "پرحرف بودن (talkative) نقطه مقابل ساکت بودن (quiet) است." },
  { category: "vocabulary", lesson: 1, scope: "گزینه صحیح", text: "Sina is ________. Everybody likes him.", options: ["lazy", "cruel", "serious", "kind"], answer: 3, level: "آموزشی", explanation: "مهربان بودن باعث می‌شود همه او را دوست داشته باشند." },
  { category: "grammar", lesson: 1, scope: "گزینه صحیح", text: "There is ________ apple in my bag.", options: ["a", "some", "an", "6"], answer: 2, level: "آموزشی", explanation: "apple با حرف صدادار شروع می‌شود؛ پس از an استفاده می‌کنیم." },
  // کلمه ناهماهنگ
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (serious – help – quiet – neat)", options: ["serious", "help", "quiet", "neat"], answer: 1, level: "متوسط", explanation: "help فعل است؛ بقیه صفت‌های شخصیت هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (rude – polite – angry – selfish)", options: ["rude", "polite", "angry", "selfish"], answer: 1, level: "متوسط", explanation: "polite (مودب) صفت مثبت است؛ بقیه صفات منفی هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (kind – cruel – patient – helpful)", options: ["kind", "cruel", "patient", "helpful"], answer: 1, level: "متوسط", explanation: "cruel (بی‌رحم) صفت منفی است؛ بقیه صفات مثبت هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (selfish – generous – shy – person)", options: ["selfish", "generous", "shy", "person"], answer: 3, level: "متوسط", explanation: "person (شخص) اسم است؛ بقیه صفت‌های شخصیتی هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (office – library – company – homework)", options: ["office", "library", "company", "homework"], answer: 3, level: "متوسط", explanation: "homework (تکلیف) مربوط به درس است؛ بقیه مکان یا سازمان هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (nervous – hardworking – careful – brave)", options: ["nervous", "hardworking", "careful", "brave"], answer: 0, level: "متوسط", explanation: "nervous (مضطرب) حالت موقتی و منفی است؛ بقیه ویژگی‌های مثبت شخصیت هستند." },
  { category: "vocabulary", lesson: 1, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (hardworking – clever – careless – careful)", options: ["hardworking", "clever", "careless", "careful"], answer: 2, level: "متوسط", explanation: "careless (بی‌دقت) صفت منفی است؛ بقیه صفات مثبت هستند." },
  // آهنگ زبان
  { category: "grammar", lesson: 1, scope: "آهنگ زبان", text: "آهنگ صدای جمله «She works for a big company.» چگونه است؟", options: ["افتان (falling)", "خیزان (rising)", "اول افتان بعد خیزان", "اول خیزان بعد افتان"], answer: 0, level: "آموزشی", explanation: "جملات مثبت و خبری آهنگ افتان دارند." },
  { category: "grammar", lesson: 1, scope: "آهنگ زبان", text: "آهنگ صدای جمله «I do my homework.» چگونه است؟", options: ["افتان (falling)", "خیزان (rising)", "اول افتان بعد خیزان", "اول خیزان بعد افتان"], answer: 0, level: "آموزشی", explanation: "جمله خبری است؛ آهنگ صدا در انتها کاهش می‌یابد (افتان)." },
  // تکمیل مکالمه با لغات داده‌شده
  { category: "vocabulary", lesson: 1, scope: "تکمیل مکالمه", text: "A: Who is your best ________ at school?  B: Zahra.", options: ["friend", "selfish", "lesson", "patient"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 1, scope: "تکمیل مکالمه", text: "A: What's she ________?  B: She is really great. She is not selfish.", options: ["like", "friend", "helpful", "really"], answer: 0, level: "آموزشی", explanation: "الگوی پرسش شخصیت: What's she like?" },
  { category: "vocabulary", lesson: 1, scope: "تکمیل مکالمه", text: "A: Is she clever?  B: Yes! And she's ________.", options: ["helpful", "like", "friend", "lessons"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 1, scope: "تکمیل مکالمه", text: "A: How?  B: She always helps me with my ________.", options: ["lessons", "like", "patient", "really"], answer: 0, level: "آموزشی" },
  // جواب درست سؤال — صفحه ۳۳
  { category: "grammar", lesson: 1, scope: "مکالمه و پاسخ", text: "کدام پاسخ به سؤال «Are you angry?» (خطاب به ما) درست است؟", options: ["Yes, he is.", "No, we are not.", "She is a careful girl.", "I'm brave."], answer: 1, level: "متوسط", explanation: "فاعل we → پاسخ با we: No, we are not." },
  { category: "grammar", lesson: 1, scope: "مکالمه و پاسخ", text: "کدام پاسخ به سؤال «Is your uncle careful?» درست است؟", options: ["Yes, he is.", "No, she isn't.", "I'm brave.", "No, we are not."], answer: 0, level: "متوسط", explanation: "فاعل he (uncle) → پاسخ با he." },
  { category: "grammar", lesson: 1, scope: "مکالمه و پاسخ", text: "کدام پاسخ به سؤال «What are you like?» درست است؟", options: ["I'm brave.", "Yes, he is.", "She is a careful girl.", "No, we are not."], answer: 0, level: "متوسط", explanation: "پرسش از شخصیت خودم → پاسخ با I'm." },
  { category: "grammar", lesson: 1, scope: "مکالمه و پاسخ", text: "کدام پاسخ به سؤال «What is your sister like?» درست است؟", options: ["Yes, he is.", "No, we are not.", "She is a careful girl.", "I'm brave."], answer: 2, level: "متوسط", explanation: "پرسش از شخصیت خواهر → پاسخ با She + صفت شخصیت." },
  // تکمیل متن صفحه ۳۳
  { category: "vocabulary", lesson: 1, scope: "تکمیل متن", text: "Elham is a ________ student, but she is a bit selfish.", options: ["neat", "lazy", "rude", "shy"], answer: 0, level: "آموزشی", explanation: "«اما کمی خودخواه است» → تضاد با خودخواهی، مرتب بودن (neat) است." },
  { category: "grammar", lesson: 1, scope: "تکمیل متن", text: "Mahsa is a helpful and funny girl. Everybody ________ her.", options: ["likes", "like", "are like", "liking"], answer: 0, level: "متوسط", explanation: "Everybody فاعل مفرد است؛ فعل سوم شخص مفرد می‌گیرد (likes)." },
  { category: "vocabulary", lesson: 1, scope: "تکمیل متن", text: "Fatemeh is my ________ friend. She is clever and generous.", options: ["best", "good", "better", "worse"], answer: 0, level: "آموزشی", explanation: "«بهترین دوست» = best friend." },
];
