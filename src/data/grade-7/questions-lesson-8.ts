import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس هشتم پایه هفتم — تست‌های امتحانی صفحه ۱۰۳
 * و درسنامهٔ درس هشتم (غذا و نوشیدنی، پیشنهاد دادن، some، should).
 */
export const QUESTIONS_LESSON_8: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان: پاسخ با توجه به تصاویر
  { category: "vocabulary", lesson: 8, scope: "پاسخ با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر (برنج و مرغ): «What is your favorite food? — Rice and ________.»", options: ["chicken", "apple", "bread", "cheese"], answer: 0, level: "آموزشی", explanation: "تصویر برنج و مرغ است → Rice and chicken." },
  { category: "vocabulary", lesson: 8, scope: "پاسخ با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر (آب‌پرتقال): «What is your favorite drink? — ________ juice.»", options: ["Orange", "Apple", "Rice", "Egg"], answer: 0, level: "آموزشی", explanation: "آب‌پرتقال = orange juice." },
  // سؤال ۲ امتحان: نام هر تصویر (یک کلمه اضافی) — Potato – banana – dates – ice cream – tomato
  { category: "vocabulary", lesson: 8, scope: "نام تصاویر (تبدیل به چهارگزینه‌ای)", text: "«سیب‌زمینی» به انگلیسی کدام است؟", options: ["potato", "tomato", "banana", "carrot"], answer: 0, level: "آموزشی", explanation: "potato = سیب‌زمینی؛ tomato گوجه‌فرنگی است." },
  { category: "vocabulary", lesson: 8, scope: "نام تصاویر (تبدیل به چهارگزینه‌ای)", text: "«موز» به انگلیسی کدام است؟", options: ["banana", "potato", "dates", "ice cream"], answer: 0, level: "آموزشی", explanation: "banana = موز." },
  { category: "vocabulary", lesson: 8, scope: "نام تصاویر (تبدیل به چهارگزینه‌ای)", text: "«خرما» به انگلیسی کدام است؟", options: ["dates", "nuts", "coconut", "quince"], answer: 0, level: "آموزشی", explanation: "dates = خرما." },
  { category: "vocabulary", lesson: 8, scope: "نام تصاویر (تبدیل به چهارگزینه‌ای)", text: "«بستنی» به انگلیسی کدام است؟", options: ["ice cream", "jelly", "milk", "cream"], answer: 0, level: "آموزشی", explanation: "ice cream = بستنی؛ jelly ژله و cream خامه است." },
  { category: "vocabulary", lesson: 8, scope: "نام تصاویر (تبدیل به چهارگزینه‌ای)", text: "«گوجه‌فرنگی» به انگلیسی کدام است؟", options: ["tomato", "potato", "carrot", "onion"], answer: 0, level: "آموزشی", explanation: "tomato = گوجه‌فرنگی." },
  // سؤال ۳ امتحان: وصل کردن پاسخ‌ها به سؤالات (یک جواب اضافی)
  { category: "grammar", lesson: 8, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ برای جملهٔ «I feel hungry.» مناسب است؟", options: ["How about some cake?", "Let's have something to drink.", "That is my favorite.", "Tea, please."], answer: 0, level: "متوسط", explanation: "برای گرسنه، پیشنهاد غذا داده می‌شود: How about some cake?" },
  { category: "grammar", lesson: 8, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is your favorite drink?» درست است؟", options: ["Tea.", "Rice and kebab.", "How about some cake?", "I am thirsty."], answer: 0, level: "متوسط", explanation: "پاسخ نوشیدنی مورد علاقه: Tea. / Orange juice." },
  { category: "grammar", lesson: 8, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ برای جملهٔ «I am thirsty.» مناسب است؟", options: ["Let's have something to drink.", "How about some cake?", "Rice and kebab.", "I am a student."], answer: 0, level: "متوسط", explanation: "برای تشنگی، پیشنهاد نوشیدنی داده می‌شود." },
  { category: "grammar", lesson: 8, scope: "وصل کردن سؤال به پاسخ (تبدیل به چهارگزینه‌ای)", text: "کدام پاسخ به سؤال «What is your favorite food?» درست است؟", options: ["Rice and kebab.", "Tea and milk.", "Let's have something to drink.", "I am hungry."], answer: 0, level: "متوسط", explanation: "پاسخ غذای مورد علاقه: Rice and kebab." },
  { category: "grammar", lesson: 8, scope: "پاسخ پیشنهاد", text: "کدام پاسخ برای پیشنهاد «How about some cake and milk?» درست است؟", options: ["Sounds good!", "I am twelve years old.", "My address is 32 Mahan Street.", "It is Monday."], answer: 0, level: "متوسط", explanation: "در پاسخ به پیشنهاد می‌گوییم: Sounds good!" },
  // سؤال ۴ امتحان: کلمه ناهماهنگ
  { category: "vocabulary", lesson: 8, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (favorite – carrot – quince – jelly)", options: ["favorite", "carrot", "quince", "jelly"], answer: 0, level: "متوسط", explanation: "favorite صفت است؛ بقیه غذا/میوه هستند." },
  { category: "vocabulary", lesson: 8, scope: "کلمه ناهماهنگ", text: "کدام کلمه از نظر معنی ناهماهنگ است؟ (kebab – fish – coconut – spaghetti)", options: ["kebab", "fish", "coconut", "spaghetti"], answer: 2, level: "استاندارد", explanation: "coconut (نارگیل) میوه است؛ بقیه غذا هستند." },
  // سؤال ۵ امتحان + واژگان درس هشتم — صفحات ۹۸ و ۹۹
  { category: "vocabulary", lesson: 8, scope: "واژه به انگلیسی", text: "«تخم‌مرغ» به انگلیسی کدام است؟", options: ["egg", "milk", "cheese", "honey"], answer: 0, level: "آموزشی", explanation: "egg = تخم‌مرغ." },
  // درسنامه صفحه ۱۰۰ و ۱۰۲: پیشنهاد دادن
  { category: "grammar", lesson: 8, scope: "پیشنهاد دادن", text: "Let's ________ some cake and milk.", options: ["have", "has", "having", "had"], answer: 0, level: "آموزشی", explanation: "بعد از let's فعل به شکل ساده می‌آید." },
  { category: "grammar", lesson: 8, scope: "پیشنهاد دادن", text: "How ________ some cake and milk?", options: ["about", "much", "many", "old"], answer: 0, level: "آموزشی", explanation: "الگوی پیشنهاد: How about ...?" },
  { category: "grammar", lesson: 8, scope: "I'd like", text: "I'd ________ some tea with my cake.", options: ["like", "likes", "liked", "liking"], answer: 0, level: "آموزشی", explanation: "I'd like = I would like (تمایل داشتن)؛ بعد از آن فعل ساده/اسم می‌آید." },
  { category: "grammar", lesson: 8, scope: "some", text: "I'd like ________ tea, please.", options: ["some", "a", "an", "many"], answer: 0, level: "آموزشی", explanation: "برای مقدار نامشخص از some استفاده می‌کنیم." },
  { category: "grammar", lesson: 8, scope: "should", text: "You ________ eat fruit and vegetables every day.", options: ["should", "should not", "do", "are"], answer: 0, level: "متوسط", explanation: "should = باید (توصیه)؛ بعد از آن فعل ساده می‌آید." },
  // واژگان درس هشتم
  { category: "vocabulary", lesson: 8, scope: "واژگان مکالمه", text: "«How about you?» به فارسی کدام است؟", options: ["شما چطور؟", "شما کجا هستید؟", "شما چند سال دارید؟", "چه خبر؟"], answer: 0, level: "آموزشی", explanation: "How about you? = شما چطور/نظر شما چیست؟" },
  { category: "vocabulary", lesson: 8, scope: "واژه به فارسی", text: "«rice» به فارسی کدام است؟", options: ["برنج", "نان", "گوشت", "پنیر"], answer: 0, level: "آموزشی", explanation: "rice = برنج." },
  { category: "vocabulary", lesson: 8, scope: "واژه به فارسی", text: "«milk» به فارسی کدام است؟", options: ["شیر", "چای", "قهوه", "آبمیوه"], answer: 0, level: "آموزشی", explanation: "milk = شیر." },
  { category: "vocabulary", lesson: 8, scope: "واژه به فارسی", text: "«cheese» به فارسی کدام است؟", options: ["پنیر", "ماست", "عسل", "شکر"], answer: 0, level: "آموزشی", explanation: "cheese = پنیر؛ yoghurt ماست و honey عسل است." },
];
