import type { Conversation } from "../types";

/**
 * مکالمه‌های جزوه «جزوه جامع کمک آموزش زبان انگلیسی پایه دوازدهم» (Vision Three — تألیف جمال احمدی و همکاران).
 * ترجمه سطر به سطر عین جزوه (بخش Conversation هر درس) با ترجمه‌های فارسی چاپی خود جزوه.
 * منابع: درس ۱ ← جزوه ص ۱۲ و ۱۳ (کتاب درسی ص ۱۹ و ۲۰)، درس ۲ ← جزوه ص ۶۵ و ۶۶ (کتاب درسی ص ۴۷ و ۴۸)، درس ۳ ← جزوه ص ۱۲۰ (کتاب درسی ص ۷۵ و ۷۶).
 *
 * نکات وفاداری به متن جزوه:
 * - ترجمه‌های محاوره‌ای جزوه (نمی‌شناسی، می‌تونید، جالبه، جای افسوس داره، هماهنگ کنیم و…) عیناً حفظ شده‌اند.
 * - نویسه‌های جهت (RTL/LTR) لایه متن PDF حذف و ترتیب سطرها طبق چاپ بازچینی شده است.
 * - علامت سؤال/تعجب انگلیسی که در لایه متن به ابتدای جمله منتقل شده بود (مثل «?Sara: …» یا «!students») به انتهای جمله بازگردانده شد.
 *
 * اصلاحیه (کلمه‌های شکسته/جابه‌جای لایه متن PDF — ترمیم بر اساس بافت):
 * - الگوی مشترک حروف هم‌شکل: دکی ← دکتر، رصب/رشیط/ریسمان، درمات ← درمان، آنفوالنزا ← آنفولانزا (لیگاتور «لا»)،
 *   عکیس ← عکس، حایل ← حالی، رشوع ← شروع، یم ← می، کیس ← کسی، چیی ← چیزی، مطمی ← مطمئن، زندیک ← زندگی،
 *   پزشگ ← پزشکی، فرصن ← فرصت، دریغ (فرصن برای … دری غ ← دریغ)، صمییم ← صمیمی، بزریک ← بزرگ، چنی ← چنین،
 *   فاریس ← فارسی، بدات ← بدانی، یگ ← یکی، دانشجوهای ← دانشجویان، بهی ← بهتر/بهبود، دکیی ایثارگر ← دکتر ایثارگر
 * - درس ۱: «مرکز درمات کودکان» ← «مرکز درمان کودکان»؛ «برای بهی شدن» ← «برای بهبود شدن» (to get better)
 * - درس ۲: «یک شی اطالعات» ← «یک سری اطلاعات»؛ «دیکشیی یک زبانه» ← «دیکشنری یک‌زبانه» (monolingual)؛
 *   «دیکشیی جین» ← «دیکشنری جیبی» (pocket dictionary)؛ «مقدمات» ← «مقدماتی» (elementary)؛
 *   «دبیستات» ← «پیشرفته» (advanced)؛ «میتوات … یبیی» ← «می‌توانی … ببری»؛ «آنالین» ← «آنلاین»؛
 *   «گویس هوشمند» ← «گوشی‌های هوشمند»؛ «شخض» ← «شخصی»
 * - درس ۳: «گیالن» ← «گیلان»؛ «یط ر» ← «طول» (در طول مسیر)؛ «توربی» ← «توربین»؛ «بزریک» ← «بزرگ»؛
 *   «بر خالف» ← «بر خلاف»؛ «چییکه» ← «چیزی که»؛ «برجهای بادی» (wind towers) عین چاپ
 */
export const CONVERSATION_LIST: Conversation[] = [
  // ─── درس اول: Style and Identity — دکتر محمد قریب (سارا و پرستار) ───
  {
    id: "c12-1",
    lesson: 1,
    title: "مکالمه درس ۱",
    titleFa: "مکالمه درس ۱ — بیمارستان کودکان (سارا و پرستار)",
    source: "کتاب درسی — صفحه ۱۹ و ۲۰ (جزوه ص ۱۲ و ۱۳)",
    intro: {
      en: "Sara has been in the Children’s Medical Center for a week. She has caught a terrible flu. The doctor told her to stay there to get better. There is a photograph of an old man on the wall. While the nurse is taking her temperature, they start talking.",
      fa: "سارا به مدت یک هفته در مرکز درمان کودکان بوده است. او یک آنفولانزای وحشتناک گرفته است. دکتر به او گفته است که برای بهبود شدن باید در بیمارستان بماند. بر روی دیوار عکسی از یک مرد مسن وجود دارد. در حالی که پرستار درجه‌ی تب او را می‌گیرد، آنها شروع به صحبت کردن می‌کنند.",
    },
    lines: [
      { speaker: "Sara", en: "Excuse me, who is that man in the picture?", fa: "ببخشید، آن مرد داخل عکس چه کسی است؟" },
      { speaker: "Nurse", en: "Oh, don’t you know him? Have you ever heard of Dr. Mohammad Gharib?", fa: "او را نمی‌شناسی؟ آیا هیچ‌وقت در مورد دکتر محمد قریب چیزی شنیده‌ای؟" },
      { speaker: "Sara", en: "I guess I have only seen his name in my English book, but I’m not sure about it.", fa: "حدس می‌زنم که فقط اسم او را در کتاب زبان انگلیسی‌ام دیده‌ام، اما در موردش مطمئن نیستم." },
      { speaker: "Nurse", en: "Dr. Gharib was a famous physician.", fa: "دکتر قریب یک پزشک معروف بود." },
      { speaker: "Sara", en: "Oh,… can you tell me a little about his life?", fa: "می‌توانید کمی در مورد زندگی ایشان به من بگوئید." },
      { speaker: "Nurse", en: "Dr. Gharib was born in Tehran in 1288. After receiving his diploma, he went abroad to study medicine. In 1316 he became a physician and then came back to his homeland. In 1347 this center was founded by Dr. Gharib and one of his close friends.", fa: "دکتر قریب در سال 1288 در تهران متولد شد. او پس از دریافت مدرک دیپلم، به خارج از کشور رفت که پزشکی بخواند. در سال 1316 ایشان پزشک شد (مدرک پزشکی را دریافت کرد) و به زادگاهش بازگشت. در سال 1347 دکتر قریب و یکی از دوستان نزدیکش این مرکز را تاسیس کردند." },
      { speaker: "Sara", en: "Really? I didn’t know that.", fa: "واقعاً؟ من این را نمی‌دانستم." },
      { speaker: "Nurse", en: "Dr. Gharib was also a generous man. He spared no pains to cure sick children. He was very friendly and helpful to poor families. Not surprisingly, he was regarded as a dedicated physician.", fa: "همچنین دکتر قریب مرد سخاوتمندی بود. او از هیچ فرصتی برای درمان کودکان بیمار دریغ نمی‌کرد. او نسبت به خانواده‌های فقیر بسیار صمیمی و یاری‌رسان بود. دور از انتظار هم نیست که به عنوان دکتر ایثارگر در نظر گرفته شود." },
      { speaker: "Sara", en: "It’s a pity! I didn’t know such a great man.", fa: "جای افسوس داره. من چنین مرد بزرگی را نمی‌شناختم." },
      { speaker: "Nurse", en: "He was known as a distinguished university professor, too. The first Persian textbook on children’s diseases was written by him. He taught medicine to thousands of students.", fa: "او همچنین به عنوان یک پروفسور برجسته دانشگاه شناخته شده بود. اولین کتاب درباره‌ی بیماری‌های کودکان به زبان فارسی توسط ایشان نوشته شد. او علم پزشکی را به هزاران دانشجو تدریس کرد." },
      { speaker: "Sara", en: "Oh, what a great man he was!", fa: "چه مرد بزرگی بوده است!" },
      { speaker: "Nurse", en: "By the way, it might be interesting to know that your physician was one of Dr. Gharib’s students!", fa: "راستش، همچنین ممکنه جالب باشد که بدانی، دکتر شما یکی از دانشجویان دکتر قریب بوده است." },
      { speaker: "Sara", en: "Really?! That’s interesting!", fa: "واقعاً؟ جالبه!" },
    ],
  },

  // ─── درس دوم: Gastronomy — انتخاب دیکشنری (مجید و آقای ایرانمهر) ───
  {
    id: "c12-2",
    lesson: 2,
    title: "مکالمه درس ۲",
    titleFa: "مکالمه درس ۲ — انتخاب دیکشنری (مجید و آقای ایرانمهر)",
    source: "کتاب درسی — صفحه ۴۷ و ۴۸ (جزوه ص ۶۵ و ۶۶)",
    intro: {
      en: "Majid is going to choose a suitable dictionary for his English class. He is talking to his English teacher during the break.",
      fa: "مجید می‌خواهد که یک دیکشنری مناسب برای کلاس زبان خودش انتخاب کند. در زنگ تفریح مشغول صحبت کردن با معلم زبانش است.",
    },
    lines: [
      { speaker: "Majid", en: "Excuse me Mr. Iranmehr, I wonder if you could help me.", fa: "ببخشید آقای ایرانمهر، نمی‌دونم که آیا شما می‌تونید به من کمک کنید." },
      { speaker: "Mr. Iranmehr", en: "Sure. How can I help you?", fa: "حتماً. چطور می‌توانم به تو کمک کنم؟" },
      { speaker: "Majid", en: "I’d like some information about a good English dictionary.", fa: "من یک سری اطلاعات در مورد یک دیکشنری خوب می‌خواستم." },
      { speaker: "Mr. Iranmehr", en: "Oh, well. Have you ever used a dictionary?", fa: "آه، خوب... تا حالا از دیکشنری استفاده کردی؟" },
      { speaker: "Majid", en: "Actually, I haven’t. But I’ve heard that using a good dictionary can really help me learn English better.", fa: "در واقع نه، تا حالا استفاده نکرده‌ام. اما من شنیده‌ام که استفاده کردن از یک دیکشنری خوب می‌تواند در یادگیری بهتر زبان خیلی به من کمک کنه." },
      { speaker: "Mr. Iranmehr", en: "That’s right. First, I recommend a learner’s dictionary.", fa: "درسته. در اول من به تو یک دیکشنری یادگیرنده (learner) را توصیه می‌کنم." },
      { speaker: "Majid", en: "What is a learner’s dictionary?", fa: "دیکشنری یادگیرنده چیه؟" },
      { speaker: "Mr. Iranmehr", en: "It is designed for foreign students. It also helps them learn English better.", fa: "این دیکشنری برای دانش‌آموزانِ خارجی طراحی شده است. همچنین به آنها کمک می‌کند که بهتر انگلیسی را یاد بگیرند." },
      { speaker: "Majid", en: "Is there only one type of it?", fa: "فقط یک نوع از آن وجود دارد؟" },
      { speaker: "Mr. Iranmehr", en: "No, in fact dictionaries have different types, levels, and sizes.", fa: "نه. در واقع دیکشنری‌ها انواع و سطوح و اندازه‌های متفاوت دارند." },
      { speaker: "Majid", en: "What type do you suggest?", fa: "کدام نوع را شما پیشنهاد می‌کنید؟" },
      { speaker: "Mr. Iranmehr", en: "I suppose a monolingual dictionary is more suitable for you, because you can find word information in English.", fa: "گمان می‌کنم دیکشنری یک‌زبانه برای تو مفیدتر خواهد بود زیرا می‌توانی اطلاعات در مورد لغات را به انگلیسی پیدا کنی." },
      { speaker: "Majid", en: "And what about levels?", fa: "در مورد سطح‌ها چطور؟" },
      { speaker: "Mr. Iranmehr", en: "Well, there are usually three levels: elementary, intermediate and advanced. For you as a high school student, an elementary one is OK.", fa: "خوب، معمولاً سه سطح وجود دارد: مقدماتی، متوسط و پیشرفته. برای تو به عنوان دانش‌آموز، مقدماتی مناسب است." },
      { speaker: "Majid", en: "Do I need a small size one?", fa: "آیا من به اندازه کوچیکش نیاز دارم؟" },
      { speaker: "Mr. Iranmehr", en: "Yes, a pocket dictionary. You can carry it wherever you go.", fa: "بله، یک دیکشنری جیبی. تو می‌توانی آن را هر جایی که می‌روی، با خودت ببری." },
      { speaker: "Majid", en: "Oh, it’s very good. And hmm …, is it expensive?", fa: "این خیلی عالیه. و ...، گران است؟" },
      { speaker: "Mr. Iranmehr", en: "No, such dictionaries are not expensive. By the way, you can use a free online dictionary, too. And also, there are some free dictionaries for PCs and apps for smart phones.", fa: "نه، راستش چنین دیکشنری‌هایی گران قیمت نیستند. راستش، همچنین تو می‌توانی از دیکشنری آنلاین رایگان هم استفاده کنی. و همچنین دیکشنری‌های دیگری برای کامپیوترهای شخصی و نرم‌افزارهایی برای گوشی‌های هوشمند وجود دارند." },
      { speaker: "Majid", en: "Thanks, that’s a good idea, but I’d like to use a pocket dictionary!", fa: "ممنونم، ایده‌ی خوبیه، اما من دوست دارم از دیکشنری جیبی استفاده کنم!" },
    ],
  },

  // ─── درس سوم: Energy — توربین‌های بادی منجیل (عماد و پدرش) ───
  {
    id: "c12-3",
    lesson: 3,
    title: "مکالمه درس ۳",
    titleFa: "مکالمه درس ۳ — توربین‌های بادی منجیل (عماد و پدرش)",
    source: "کتاب درسی — صفحه ۷۵ و ۷۶ (جزوه ص ۱۲۰)",
    intro: {
      en: "Emad and his father are traveling to Guilan. On the way, in Manjeel, Emad sees huge wind turbines.",
      fa: "عماد و پدرش در حال سفر به گیلان هستند. عماد در طول مسیر در منجیل، توربین‌های بادی بزرگی را می‌بیند.",
    },
    lines: [
      { speaker: "Emad", en: "Daddy, look at those big fans!", fa: "پدر، به آن پنکه‌های بزرگ نگاه کن!" },
      { speaker: "Father", en: "They are actually wind turbines.", fa: "در واقع آنها توربین‌های بادی هستند." },
      { speaker: "Emad", en: "Wind turbines?", fa: "توربین‌های بادی؟" },
      { speaker: "Father", en: "Yes, wind turbines are used to produce electricity from wind power.", fa: "بله، توربین‌های بادی برای تولید برق از انرژی باد مورد استفاده قرار می‌گیرند." },
      { speaker: "Emad", en: "I know electricity can be produced from water and sunlight. How might it be generated from wind?", fa: "من می‌دانم که انرژی برق می‌تواند از نور خورشید و آب تولید شود. اما چگونه ممکن است از باد تولید شود؟" },
      { speaker: "Father", en: "Well, a wind turbine works the opposite of a fan. Instead of using electricity to make wind, a turbine uses wind to make electricity. It is a type of clean energy.", fa: "خوب، یک توربین بادی بر خلاف یک پنکه عمل می‌کند. به جای استفاده از برق برای تولید باد، توربین از باد برای تولید برق استفاده می‌کند. این یک نوع انرژی پاک است." },
      { speaker: "Emad", en: "These wind turbines remind me of what I read about using wind power in Yazd’s buildings.", fa: "این توربین‌های بادی، چیزی که درباره استفاده از انرژی باد در ساختمان‌های یزد خوانده بودم را به خاطرم می‌آورد." },
      { speaker: "Father", en: "You mean wind towers?", fa: "منظور تو برج‌های بادی است؟" },
      { speaker: "Emad", en: "Yes, they are natural air-cooling systems and can be used instead of electrical air conditioners. This is another source of clean energy, isn’t it?", fa: "بله، آنها سیستم‌های خنک‌کننده طبیعی هوا هستند و می‌توانند به جای دستگاه‌های تهویه‌ی هوای برقی استفاده شوند. این نوع دیگری از انرژی پاک است، اینطور نیست؟" },
      { speaker: "Father", en: "Yes, it is. An excellent type of clean energy!", fa: "بله، اینطور است. یک نوع عالی از انرژی پاک!" },
      { speaker: "Emad", en: "Daddy, can we travel to Yazd this Norooz?", fa: "پدر، ما می‌توانیم این نوروز به یزد سفر کنیم؟" },
      { speaker: "Father", en: "That’s OK with me. Let’s check it with others.", fa: "من مشکلی ندارم. بیا با بقیه هماهنگ کنیم." },
    ],
  },
];
