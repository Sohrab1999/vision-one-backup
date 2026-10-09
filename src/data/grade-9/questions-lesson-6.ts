import type { QuizQuestionSeed } from "../types";

/** سؤالات درس ششم پایه نهم (Health and Injuries) — سؤالات امتحانی صفحات ۹۵ تا ۹۷ جزوه. */
export const QUESTIONS_LESSON_6: QuizQuestionSeed[] = [
  // تکمیل مکالمه — صفحه ۹۵ (broke, did, stay, twisted, participated, advice, do, learn, stayed)
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه", text: "A: ________ you like school trips?  B: No, I don't.", options: ["Do", "Did", "Does", "Are"], answer: 0, level: "آموزشی", explanation: "سؤال حال با do؛ پاسخ No, I don't هم حال است." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "B: No, I don't. Last winter I fell and ________ my leg.", options: ["broke", "twisted", "stayed", "learned"], answer: 0, level: "متوسط", explanation: "شکستن پا = break my leg (گذشته: broke)." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "A: Really? I ________ my ankle last summer.", options: ["twisted", "broke", "stayed", "participated"], answer: 0, level: "متوسط", explanation: "پیچ خوردن قوزک پا = twist my ankle." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "A: Yes, I ________ home for 10 days.", options: ["stayed", "did", "twisted", "do"], answer: 0, level: "متوسط", explanation: "ماندن در خانه = stay home (گذشته: stayed)." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "B: But after that, I ________ in Helal-e-Ahmar first aid classes.", options: ["participated", "broke", "stayed", "learned"], answer: 0, level: "متوسط", explanation: "شرکت کردن در کلاس‌ها = participate in classes." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "A: I like that. Did you ________ how to take care of yourself?", options: ["learn", "do", "stay", "twist"], answer: 0, level: "آموزشی", explanation: "یاد گرفتن چگونگی = learn how to." },
  { category: "grammar", lesson: 6, scope: "تکمیل مکالمه", text: "B: Yes, I ________.", options: ["did", "do", "learned", "stayed"], answer: 0, level: "آموزشی", explanation: "پاسخ کوتاه سؤال با Did → Yes, I did." },
  { category: "vocabulary", lesson: 6, scope: "تکمیل مکالمه", text: "I can give you some ________ if you like.", options: ["advice", "stays", "twists", "breaks"], answer: 0, level: "آموزشی", explanation: "چندتا توصیه = some advice (غیرقابل شمارش، بدون s)." },
  // کلمه ناهماهنگ — صفحه ۹۵
  { category: "grammar", lesson: 6, scope: "کلمه ناهماهنگ", text: "کدام کلمه ناهماهنگ است؟ (her – my – them – him)", options: ["her", "my", "them", "him"], answer: 1, level: "استاندارد", explanation: "my صفت ملکی است؛ بقیه ضمایر مفعولی هستند." },
  { category: "vocabulary", lesson: 6, scope: "کلمه ناهماهنگ", text: "کدام کلمه ناهماهنگ است؟ (cut – hurt – break – health)", options: ["cut", "hurt", "break", "health"], answer: 3, level: "متوسط", explanation: "health (سلامتی) اسم است؛ بقیه فعل هستند." },
  // مرتب کردن کلمات — صفحه ۹۵
  { category: "grammar", lesson: 6, scope: "مرتب کردن کلمات", text: "جمله درست با کلمات «learnt / last / English / summer / I» کدام است؟", options: ["I learnt English last summer.", "I English learnt last summer.", "I last summer learnt English.", "I learnt last English summer."], answer: 0, level: "متوسط", explanation: "ترتیب: فاعل + فعل + مفعول + قید زمان." },
  { category: "grammar", lesson: 6, scope: "مرتب کردن کلمات", text: "جمله درست با کلمات «saw / the / in / him / they / park» کدام است؟", options: ["They saw him in the park.", "They him saw in the park.", "They in the park saw him.", "They saw in the park him."], answer: 0, level: "متوسط", explanation: "ترتیب: فاعل + فعل + مفعول + قید مکان." },
  // وصل کردن سؤال به پاسخ — صفحه ۹۶
  { category: "grammar", lesson: 6, scope: "سؤال و پاسخ", text: "پاسخ «Where did she hurt her back?» کدام است؟", options: ["She hit it in the park.", "I took care of my father last year.", "Yes, she did.", "My sister."], answer: 0, level: "متوسط" },
  { category: "grammar", lesson: 6, scope: "سؤال و پاسخ", text: "پاسخ «Why did they have an accident?» کدام است؟", options: ["Because they drove fast.", "She hit it in the park.", "Yes, she did.", "My sister."], answer: 0, level: "متوسط", explanation: "پرسش با Why پاسخ با because می‌گیرد." },
  { category: "grammar", lesson: 6, scope: "سؤال و پاسخ", text: "پاسخ «Who cut her finger?» کدام است؟", options: ["My sister.", "Because they drove fast.", "Yes, she did.", "She hit it in the park."], answer: 0, level: "متوسط" },
  { category: "grammar", lesson: 6, scope: "سؤال و پاسخ", text: "پاسخ «When did you take care of your father?» کدام است؟", options: ["I took care of my father last year.", "My sister.", "Because they drove fast.", "She hit it in the park."], answer: 0, level: "متوسط" },
  // جاهای خالی — صفحه ۹۶
  { category: "grammar", lesson: 6, scope: "جاهای خالی", text: "We went to the party, because they invited ________. (them / us / our)", options: ["us", "them", "our", "we"], answer: 0, level: "استاندارد", explanation: "بعد از فعل، ضمیر مفعولی می‌آید: invited us." },
  { category: "grammar", lesson: 6, scope: "جاهای خالی", text: "A: ________ did he burn his hand?  B: He burnt his hand last Monday. (When / Where / How)", options: ["When", "Where", "How", "Why"], answer: 0, level: "استاندارد", explanation: "پاسخ زمانی است (last Monday) → سؤال با When." },
  { category: "grammar", lesson: 6, scope: "جاهای خالی", text: "A: Why did you hurt your knee?  B: ________ I fell. (hurry up / yeah / because)", options: ["Because", "Hurry up", "Yeah", "Also"], answer: 0, level: "آموزشی" },
  // گزینه صحیح — صفحه ۹۶
  { category: "grammar", lesson: 6, scope: "گزینه صحیح", text: "A: Did you read the books?  B: Yes, I enjoyed ________ very much.", options: ["them", "us", "its", "it"], answer: 0, level: "استاندارد", explanation: "books جمع است → ضمیر مفعولی جمع them." },
  { category: "grammar", lesson: 6, scope: "گزینه صحیح", text: "A: Did she ________ a scar?  B: Yes, she had a scar on her face.", options: ["have", "has", "had", "her"], answer: 0, level: "استاندارد", explanation: "بعد از فعل کمکی did فعل به شکل ساده می‌آید: have." },
  { category: "grammar", lesson: 6, scope: "گزینه صحیح", text: "He ________ his coat yesterday.", options: ["found", "finded", "founded", "did found"], answer: 0, level: "استاندارد", explanation: "find فعل بی‌قاعده است: find → found (نه finded)." },
  // آهنگ زبان — صفحه ۹۶
  { category: "grammar", lesson: 6, scope: "آهنگ زبان", text: "آهنگ صدای جمله «Do you have your lunch at school?» چگونه است؟", options: ["افتان (falling)", "خیزان (rising)", "اول افتان بعد خیزان", "اول خیزان بعد افتان"], answer: 1, level: "متوسط", explanation: "سؤال بله/خیری با فعل کمکی → خیزان." },
  { category: "grammar", lesson: 6, scope: "آهنگ زبان", text: "آهنگ صدای جمله «Please hurry up!» چگونه است؟", options: ["افتان (falling)", "خیزان (rising)", "اول افتان بعد خیزان", "اول خیزان بعد افتان"], answer: 0, level: "متوسط", explanation: "جمله امری مانند جمله خبری آهنگ افتان دارد." },
  { category: "grammar", lesson: 6, scope: "آهنگ زبان", text: "آهنگ صدای جمله «Hamid cut his finger.» چگونه است؟", options: ["افتان (falling)", "خیزان (rising)", "اول افتان بعد خیزان", "اول خیزان بعد افتان"], answer: 0, level: "متوسط", explanation: "جمله خبری → افتان." },
  // گزینه صحیح با توجه به تصویر — صفحه ۹۷
  { category: "vocabulary", lesson: 6, scope: "گزینه صحیح", text: "His hand is ________.", options: ["bleeding", "burning", "twisting", "breaking"], answer: 0, level: "آموزشی", explanation: "خونریزی کردن = bleed (اینجا صفت مفعولی: is bleeding)." },
  { category: "vocabulary", lesson: 6, scope: "گزینه صحیح", text: "It ________ a lot.", options: ["hurts", "takes", "wants", "plans"], answer: 0, level: "آموزشی", explanation: "«خیلی درد می‌کند» = It hurts a lot." },
  { category: "vocabulary", lesson: 6, scope: "گزینه صحیح", text: "We attended in Helal-e-Ahmar ________ classes.", options: ["first aid", "heart attack", "take care", "black eye"], answer: 0, level: "متوسط", explanation: "کلاس‌های کمک‌های اولیه = first aid classes." },
  { category: "vocabulary", lesson: 6, scope: "گزینه صحیح", text: "He has some ________ on his face.", options: ["plasters", "casts", "scars", "bruises"], answer: 3, level: "متوسط", explanation: "کبودی‌های روی صورت = bruises." },
];
