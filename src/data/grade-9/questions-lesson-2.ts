import type { QuizQuestionSeed } from "../types";

/** سؤالات درس دوم پایه نهم (Travel) — سؤالات امتحانی صفحات ۴۷ تا ۴۹ جزوه. */
export const QUESTIONS_LESSON_2: QuizQuestionSeed[] = [
  { category: "grammar", lesson: 2, scope: "گزینه صحیح", text: "He ________ a ticket.", options: ["buy", "is buy", "buying", "is buying"], answer: 3, level: "آموزشی", explanation: "حال استمراری: is/am/are + فعل با ing → is buying." },
  { category: "grammar", lesson: 2, scope: "گزینه صحیح", text: "That man ________ the passport.", options: ["is praying", "is checking", "is playing", "is landing"], answer: 1, level: "متوسط", explanation: "«بررسی کردن گذرنامه» = check the passport." },
  // تکمیل مکالمه با لغات داده‌شده (Standing, book, reservation, enjoy, visiting, help, wife, staying, key)
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "A: Welcome to our hotel, how can I ________ you?", options: ["help", "visit", "book", "stay"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "B: I have a ________ here.", options: ["reservation", "key", "ticket", "plane"], answer: 0, level: "آموزشی", explanation: "«من یک رزرو داشتم» = I have a reservation." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "A: Are you ________ for 5 days?", options: ["staying", "standing", "landing", "booking"], answer: 0, level: "متوسط", explanation: "ماندن در هتل = stay." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "B: No, we are ________ Isfahan for 3 nights.", options: ["visiting", "checking", "packing", "exchanging"], answer: 0, level: "متوسط", explanation: "دیدن کردن از شهر = visit (حال استمراری: are visiting)." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "A: Where is your ________?", options: ["wife", "map", "stamp", "shift"], answer: 0, level: "متوسط", explanation: "پاسخ: «او آنجا ایستاده است» → منظور همسر (wife) است." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "B: She's ________ by the table.", options: ["standing", "booking", "landing", "taking off"], answer: 0, level: "متوسط", explanation: "ایستادن = stand (حال استمراری: is standing)." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "A: This is your ________.", options: ["key", "book", "ticket", "stamp"], answer: 0, level: "آموزشی", explanation: "کلید اتاق هتل = key." },
  { category: "vocabulary", lesson: 2, scope: "تکمیل مکالمه", text: "Hope you ________ your stay in Isfahan.", options: ["enjoy", "visit", "check", "stay"], answer: 0, level: "آموزشی", explanation: "لذت بردن از اقامت = enjoy your stay." },
  // جاهای خالی با حال استمراری
  { category: "grammar", lesson: 2, scope: "حال استمراری", text: "He ________ the reservation form.", options: ["is filling out", "fills out", "fill out", "filled out"], answer: 0, level: "متوسط", explanation: "حال استمراری → is + filling out." },
  { category: "grammar", lesson: 2, scope: "حال استمراری", text: "I ________ the timetable.", options: ["am checking", "check", "checks", "checked"], answer: 0, level: "متوسط", explanation: "حال استمراری با I → am + فعل با ing." },
  // وصل کردن سؤال به جواب
  { category: "grammar", lesson: 2, scope: "سؤال و پاسخ", text: "پاسخ «Is Kate reading a guide book?» کدام است؟", options: ["Yes, she is.", "He's checking the map.", "Paul.", "No, they are boarding the plane."], answer: 0, level: "متوسط", explanation: "سؤال بله/خیری با she → Yes, she is." },
  { category: "grammar", lesson: 2, scope: "سؤال و پاسخ", text: "پاسخ «What is he doing?» کدام است؟", options: ["Yes, she is.", "He's checking the map.", "Paul.", "No, they are boarding the plane."], answer: 1, level: "متوسط", explanation: "پرسش از کار در حال انجام با he → He's + فعل با ing." },
  { category: "grammar", lesson: 2, scope: "سؤال و پاسخ", text: "پاسخ «Are they taking an express train?» کدام است؟", options: ["Yes, she is.", "He's checking the map.", "Paul.", "No, they are boarding the plane."], answer: 3, level: "متوسط", explanation: "پاسخ منفی با they → No, they are boarding the plane." },
  { category: "grammar", lesson: 2, scope: "سؤال و پاسخ", text: "پاسخ «Who is speaking to the teacher now?» کدام است؟", options: ["Yes, she is.", "He's checking the map.", "Paul.", "No, they are boarding the plane."], answer: 2, level: "متوسط", explanation: "پرسش با Who جواب یک شخص است: Paul." },
  // کلمه ناهماهنگ
  { category: "vocabulary", lesson: 2, scope: "کلمه ناهماهنگ", text: "کدام کلمه ناهماهنگ است؟ (shopkeeper – tourist – check in – teacher)", options: ["shopkeeper", "tourist", "check in", "teacher"], answer: 2, level: "متوسط", explanation: "check in عبارتی است (پذیرش شدن)؛ بقیه شغل یا شخص هستند." },
  { category: "grammar", lesson: 2, scope: "کلمه ناهماهنگ", text: "کدام عبارت از نظر ساختار مالکیت ناهماهنگ است؟", options: ["the wheels of the car", "the shirt of the Jack", "the legs of the chair", "the door of the class"], answer: 1, level: "کنکوری", explanation: "برای اشخاص از 's استفاده می‌شود نه of: the shirt of the Jack → Jack's shirt." },
  // ترجمه عبارات — صفحه ۴۹
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «exchange money» کدام است؟", options: ["تبدیل پول", "خرید بلیط", "چک کردن پاسپورت", "رزرو هتل"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «check the timetable» کدام است؟", options: ["چک کردن جدول زمانی", "پر کردن فرم", "سوار شدن قطار", "پیاده شدن"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «book a hotel» کدام است؟", options: ["رزرو هتل", "خرید بلیط", "پر کردن فرم", "بستن چمدان"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «take off» کدام است؟", options: ["برخاستن (هواپیما)", "فرود آمدن", "پر کردن فرم", "سوار شدن"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «land» کدام است؟", options: ["فرود آمدن", "برخاستن", "خرید بلیط", "رزرو کردن"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «talk to a receptionist» کدام است؟", options: ["صحبت با مسئول پذیرش", "چک کردن پاسپورت", "تبدیل پول", "خرید بلیط"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «buy a ticket» کدام است؟", options: ["خرید بلیط", "رزرو هتل", "پر کردن فرم", "بستن چمدان"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «check in» کدام است؟", options: ["پذیرش شدن", "تسویه حساب کردن", "پیاده شدن", "سوار شدن"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «pack for a trip» کدام است؟", options: ["آماده‌شدن (بستن چمدان) برای سفر", "خرید بلیط سفر", "رزرو هتل سفر", "برخاستن از سفر"], answer: 0, level: "آموزشی" },
  { category: "vocabulary", lesson: 2, scope: "ترجمه عبارات", text: "معنی عبارت «fill out the form» کدام است؟", options: ["پر کردن فرم", "چک کردن فرم", "پاک کردن فرم", "فرستادن فرم"], answer: 0, level: "آموزشی" },
];
