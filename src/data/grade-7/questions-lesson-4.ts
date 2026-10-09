import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات درس چهارم پایه هفتم — تست‌های امتحانی صفحات ۷۴ و ۷۵
 * و درسنامهٔ درس چهارم (an/a، y→ies، سؤالی کردن، پاسخ کوتاه، مالکیت 's).
 */
export const QUESTIONS_LESSON_4: QuizQuestionSeed[] = [
  // سؤال ۱ امتحان صفحه ۷۴: شغل هر وسیله (یک شغل اضافی)
  { category: "vocabulary", lesson: 4, scope: "وصل کردن شغل به تصویر (تبدیل به چهارگزینه‌ای)", text: "کدام شغل به گل‌فروشی مربوط است؟", options: ["florist", "painter", "pilot", "dentist"], answer: 0, level: "آموزشی", explanation: "florist = گل‌فروش؛ با گل سروکار دارد." },
  { category: "vocabulary", lesson: 4, scope: "وصل کردن شغل به تصویر (تبدیل به چهارگزینه‌ای)", text: "«خلبان» به انگلیسی کدام است؟", options: ["pilot", "driver", "farmer", "baker"], answer: 0, level: "آموزشی", explanation: "pilot = خلبان/ناخدا." },
  { category: "vocabulary", lesson: 4, scope: "وصل کردن شغل به تصویر (تبدیل به چهارگزینه‌ای)", text: "«نقاش» به انگلیسی کدام است؟", options: ["painter", "mechanic", "worker", "cook"], answer: 0, level: "آموزشی", explanation: "painter = نقاش/رنگ‌کار." },
  { category: "vocabulary", lesson: 4, scope: "وصل کردن شغل به تصویر (تبدیل به چهارگزینه‌ای)", text: "کدام شغل با دندان سروکار دارد؟", options: ["dentist", "doctor", "driver", "florist"], answer: 0, level: "آموزشی", explanation: "dentist = دندان‌پزشک." },
  // سؤال ۲ امتحان صفحه ۷۴: کامل کردن جمله با نام کنار تصاویر
  { category: "grammar", lesson: 4, scope: "تکمیل جمله با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر آقای کریمی (راننده): «________ is a driver.»", options: ["Mr. Karimi", "Mina", "Mrs. Ahmadi", "Ali"], answer: 0, level: "آموزشی", explanation: "تصویر آقای کریمی است؛ قبل از نام مرد از Mr. استفاده می‌شود." },
  { category: "grammar", lesson: 4, scope: "تکمیل جمله با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر مینا (دختر ۵ ساله): «________ is 5 years old.»", options: ["Mina", "Mr. Karimi", "Mr. Amini", "Reza"], answer: 0, level: "آموزشی", explanation: "تصویر مینا است؛ پس فاعل جمله Mina است." },
  { category: "grammar", lesson: 4, scope: "تکمیل جمله با توجه به تصویر (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر آقای امینی (معلم): «________ is a teacher.»", options: ["Mr. Amini", "Mrs. Amini", "Mina", "My brother"], answer: 0, level: "آموزشی", explanation: "تصویر آقای امینی است؛ پس Mr. Amini درست است." },
  // سؤال ۳ امتحان صفحه ۷۴: ص/غ (تبدیل به گزینه صحیح)
  { category: "grammar", lesson: 4, scope: "ص/غ (تبدیل به چهارگزینه‌ای)", text: "با توجه به تصویر خانم امینی، کدام جمله درست است؟", options: ["Hello, Mrs. Amini.", "Hello, Mr. Amini.", "Hello, Miss Karimi.", "Hello, Mrs. Karimi."], answer: 0, level: "متوسط", explanation: "قبل از نام خانم از Mrs./Ms. استفاده می‌شود و فامیل او Amini است." },
  // سؤال ۲ امتحان صفحه ۷۵: کامل کردن با بانک کلمه (Mechanic – birthday – Mrs – florist – housewife – Bahman – meet)
  { category: "vocabulary", lesson: 4, scope: "تکمیل جاهای خالی", text: "My mother is a ________.", options: ["housewife", "mechanic", "pilot", "waiter"], answer: 0, level: "آموزشی", explanation: "housewife = زن خانه‌دار." },
  { category: "vocabulary", lesson: 4, scope: "تکمیل جاهای خالی", text: "My uncle is a ________. He fixes cars.", options: ["mechanic", "housewife", "florist", "nurse"], answer: 0, level: "آموزشی", explanation: "کسی که ماشین تعمیر می‌کند mechanic است." },
  { category: "vocabulary", lesson: 4, scope: "تکمیل جاهای خالی", text: "Happy ________ to you!", options: ["birthday", "Sunday", "month", "morning"], answer: 0, level: "آموزشی", explanation: "عبارت ثابت: Happy birthday to you = تولدت مبارک." },
  { category: "grammar", lesson: 4, scope: "تکمیل جاهای خالی", text: "She is ________ Ahmadi. (خانم متأهل)", options: ["Mrs.", "Mr.", "Miss.", "Ms."], answer: 0, level: "آموزشی", explanation: "قبل از نام خانم متأهل از Mrs. استفاده می‌شود." },
  { category: "grammar", lesson: 4, scope: "تکمیل جاهای خالی", text: "Nice to ________ you.", options: ["meet", "met", "meeting", "meets"], answer: 0, level: "آموزشی", explanation: "عبارت ثابت: Nice to meet you = از دیدارتان خوشحالم." },
  { category: "vocabulary", lesson: 4, scope: "تکمیل جاهای خالی", text: "My sister works in a flower shop. She is a ________.", options: ["florist", "farmer", "pilot", "dentist"], answer: 0, level: "متوسط", explanation: "کسی که در گل‌فروشی کار می‌کند florist است." },
  // سؤال ۳ امتحان صفحه ۷۵: مذکر و مؤنث با He/She
  { category: "grammar", lesson: 4, scope: "مذکر/مؤنث (تبدیل به چهارگزینه‌ای)", text: "کدام گروه همگی مذکر (He) هستند؟", options: ["father, brother, grandfather", "mother, sister, grandmother", "father, mother, uncle", "brother, sister, aunt"], answer: 0, level: "متوسط", explanation: "father، brother و grandfather همگی مذکر هستند." },
  { category: "grammar", lesson: 4, scope: "مذکر/مؤنث (تبدیل به چهارگزینه‌ای)", text: "کدام گروه همگی مؤنث (She) هستند؟", options: ["mother, sister, grandmother", "father, brother, uncle", "grandfather, mother, aunt", "uncle, sister, grandmother"], answer: 0, level: "متوسط", explanation: "mother، sister و grandmother همگی مؤنث هستند." },
  { category: "grammar", lesson: 4, scope: "مذکر/مؤنث (تبدیل به چهارگزینه‌ای)", text: "ضمیر مناسب برای کلمهٔ «uncle» کدام است؟", options: ["He", "She", "It", "They"], answer: 0, level: "آموزشی", explanation: "uncle (عمو/دایی) مذکر است؛ پس ضمیر آن He است." },
  // سؤال ۴ امتحان صفحه ۷۵: شغل‌ها به فارسی و انگلیسی
  { category: "vocabulary", lesson: 4, scope: "شغل به فارسی/انگلیسی", text: "«معلم» به انگلیسی کدام است؟", options: ["teacher", "pilot", "worker", "cook"], answer: 0, level: "آموزشی", explanation: "teacher = معلم." },
  { category: "vocabulary", lesson: 4, scope: "شغل به فارسی/انگلیسی", text: "«آشپز» به انگلیسی کدام است؟", options: ["cook", "worker", "teacher", "clerk"], answer: 0, level: "آموزشی", explanation: "cook = آشپز/پختن." },
  { category: "vocabulary", lesson: 4, scope: "شغل به فارسی/انگلیسی", text: "«کارگر» به انگلیسی کدام است؟", options: ["worker", "farmer", "painter", "pilot"], answer: 0, level: "آموزشی", explanation: "worker = کارگر؛ farmer کشاورز است." },
  { category: "vocabulary", lesson: 4, scope: "شغل به فارسی/انگلیسی", text: "«pilot» به فارسی کدام است؟", options: ["خلبان", "راننده", "ملوان", "خادم مدرسه"], answer: 0, level: "آموزشی", explanation: "pilot = خلبان/ناخدا." },
  // درسنامه صفحه ۷۳: an/a
  { category: "grammar", lesson: 4, scope: "درسنامه درس چهارم — an/a", text: "This is ________ apple.", options: ["an", "a", "two", "some"], answer: 0, level: "آموزشی", explanation: "apple با حرف صدادار (a) شروع می‌شود؛ پس an می‌آید." },
  { category: "grammar", lesson: 4, scope: "درسنامه درس چهارم — an/a", text: "She is ________ English teacher.", options: ["an", "a", "one", "two"], answer: 0, level: "متوسط", explanation: "اگر صفتِ قبل از اسم با حرف صدادار شروع شود (English) باز هم an می‌آید." },
  // درسنامه صفحه ۷۳: y → ies
  { category: "grammar", lesson: 4, scope: "درسنامه درس چهارم — y→ies", text: "جمع کلمهٔ «family» کدام است؟", options: ["families", "familys", "familyes", "family"], answer: 0, level: "متوسط", explanation: "اسمي که به y ختم شود و قبل از آن حرف بی‌صدا باشد، در جمع y به ies تبدیل می‌شود." },
  // درسنامه صفحه ۷۳: سؤالی کردن و پاسخ کوتاه
  { category: "grammar", lesson: 4, scope: "پاسخ کوتاه", text: "کدام پاسخ کوتاه به سؤال «Is that your mother?» درست است؟", options: ["Yes, she is.", "Yes, he is.", "Yes, it is.", "Yes, they are."], answer: 0, level: "آموزشی", explanation: "mother مؤنث است؛ پاسخ کوتاه با she: Yes, she is." },
  // درسنامه صفحه ۷۳: مالکیت 's
  { category: "grammar", lesson: 4, scope: "مالکیت 's", text: "This is Ali ________ book.", options: ["'s", "s'", "s", "of"], answer: 0, level: "متوسط", explanation: "برای نسبت دادن چیزی به جاندار، بین دو اسم از 's استفاده می‌کنیم: Ali's book." },
];
