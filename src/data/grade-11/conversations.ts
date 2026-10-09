import type { Conversation } from "../types";

/**
 * مکالمه‌های جزوه «جزوه جامع کمک آموزش زبان انگلیسی پایه یازدهم» (Vision Two — تألیف جمال احمدی و همکاران).
 * ترجمه سطر به سطر عین جزوه (بخش Conversation هر درس) با ترجمه‌های فارسی چاپی خود جزوه.
 * منابع: درس ۱ ← جزوه ص ۱۱ (کتاب درسی ص ۱۹ و ۲۰)، درس ۲ ← جزوه ص ۴۹ (کتاب درسی ص ۵۳ و ۵۴)، درس ۳ ← جزوه ص ۸۴ (کتاب درسی ص ۸۵ و ۸۶).
 *
 * نکات وفاداری به متن جزوه:
 * - ترجمه‌های محاوره‌ای جزوه (می‌دونید، بشه، بخوای، خونه، باشه و…) عیناً حفظ شده‌اند.
 * - لایه متن PDF حروف هم‌شکل (ت/ی، ب/ت، ب/ن، ر/ز، س/ش، ض) را جابه‌جا استخراج می‌کرد؛
 *   کلمه‌های شکسته (میر بان ← میزبانی، ستات ← دبیرستانی، اسالیم ← اسلامی، دالر ← دلار،
 *   قشقاتی ← قشقایی، کویس ← کوشی، هاتی ← هایی و…) بر اساس بافت جمله ترمیم شده‌اند.
 * - جاهای خالی متن انگلیسی «______» عین جزوه است (جزوه برای این مکالمه‌ها جای خالی ندارد — همه خطوط کامل‌اند).
 *
 * اصلاحیه غلط‌ها و کاستی‌های چاپی/استخراجی:
 * - درس ۲: «Atually» ← اصلاح به «Actually» (جمله Sina)
 * - درس ۲: ترجمه جمله What?! چاپی «یحی؟» ← «چی؟»
 * - درس ۲: ترجمه جمله پایانی چاپی «گ و کجا باید همدیگر را ببینیم» ← «کی و کجا باید همدیگر را ببینیم»
 * - درس ۲: «کمی چاق هسن» ← «کمی چاق هستی» (you are a bit fat now)
 * - درس ۳: «گبه» (در ترجمه Wow! How touching this Gabbeh is! لایه متن چاپی «سب» را برگردانده بود ← بازخوانی با بافت: «این گبه چقدر تاثیرگذاره»)
 * - درس ۳: «هی» ← «هنر» (فرهنگ و هنر ایران را ارج می‌نهم)
 */
export const CONVERSATION_LIST: Conversation[] = [
  // ─── درس اول: Understanding People — مصاحبه با مترجم صدا و سیما ───
  {
    id: "c11-1",
    lesson: 1,
    title: "مکالمه درس ۱",
    titleFa: "مکالمه درس ۱ — مصاحبه با مترجم (میثم و آقای صابریان)",
    source: "کتاب درسی — صفحه ۱۹ و ۲۰ (جزوه ص ۱۱)",
    intro: {
      en: "Babak Saberian is a translator who works for IRIB. Today, he is hosting Meysam in his office. Meysam is a high school student. He is interviewing Mr. Saberian for his school project.",
      fa: "بابک صابریان یک مترجم است که برای صدا و سیمای جمهوری اسلامی ایران کار می‌کند. او امروز در دفتر کارش میزبانی میثم است. میثم یک دانش‌آموز دبیرستانی است. او در حال مصاحبه با آقای صابریان برای پروژه‌ی مدرسه‌اش است.",
    },
    lines: [
      { speaker: "Meysam", en: "Thank you Mr. Saberian for inviting me to your office.", fa: "آقای صابریان، از دعوت من به دفتر کارتان متشکرم." },
      { speaker: "Mr. Saberian", en: "You're welcome!", fa: "خواهش می‌کنم!" },
      { speaker: "Meysam", en: "I heard you know three languages. Is that right?", fa: "من شنیدم شما ۳ زبان بلد هستید. درسته؟" },
      { speaker: "Mr. Saberian", en: "Well, actually four languages.", fa: "خُب، راستش چهار زبان بلدم." },
      { speaker: "Meysam", en: "Four! Really?! What languages do you know?", fa: "چهار (زبان)! واقعاً؟ چه زبان‌هایی را می‌دونید؟" },
      { speaker: "Mr. Saberian", en: "Besides my mother tongue, Persian, I know English, French and Russian well.", fa: "من علاوه بر زبان مادری‌ام فارسی، انگلیسی، فرانسوی و روسی را به خوبی می‌دانم." },
      { speaker: "Meysam", en: "Interesting! And when did you learn them?", fa: "جالبه! و شما چه موقع این زبان‌ها را یاد گرفتید؟" },
      { speaker: "Mr. Saberian", en: "I began learning English at school when I was thirteen. Then I began learning French in a language institute when I was fifteen. And I learned Russian when I was a university student in Moscow.", fa: "من در مدرسه وقتی سیزده ساله بودم شروع به یادگیری انگلیسی کردم. بعد، وقتی پانزده ساله بودم در یک مؤسسه‌ی زبان شروع به یادگیری زبان فرانسوی کردم و هنگامی که در مسکو دانشجو بودم، روسی یاد گرفتم." },
      { speaker: "Meysam", en: "Can you use all of them fluently?", fa: "آیا شما می‌توانید از همه‌ی آنها به طور روان استفاده کنید؟" },
      { speaker: "Mr. Saberian", en: "I know all of them well, but I use English more.", fa: "من همه‌ی آنها رو خوب بلدم، اما از انگلیسی بیشتر استفاده می‌کنم." },
      { speaker: "Meysam", en: "OK. Do you think language learning should start as early as possible?", fa: "بسیار خُب. آیا شما فکر می‌کنید یادگیری زبان باید خیلی زود شروع بشه؟" },
      { speaker: "Mr. Saberian", en: "My experience says interest and hard work are really more important than age.", fa: "تجربه‌ی من میگه (نشان می‌دهد) علاقه و سخت‌کوشی واقعاً مهم‌تر از سن هستند." },
      { speaker: "Meysam", en: "Hmm… that's an important point. May I know what your favorite language is? English, French, or Russian?", fa: "هوم… این نکته‌ی مهمیه. آیا ممکنه بدونم زبان مورد علاقه‌ی شما چیه؟ انگلیسی، فرانسوی یا روسی؟" },
      { speaker: "Mr. Saberian", en: "To be honest, I enjoy using them all, but my favorite language is absolutely my mother tongue!", fa: "صادقانه (بگم)، من از به کار بردن همه‌ی آنها لذت می‌برم. اما زبان مورد علاقه‌ی من قطعاً زبان مادریه!" },
    ],
  },

  // ─── درس دوم: A Healthy Lifestyle — دعوت به دربند ───
  {
    id: "c11-2",
    lesson: 2,
    title: "مکالمه درس ۲",
    titleFa: "مکالمه درس ۲ — دعوت به دربند (سینا و بهزاد)",
    source: "کتاب درسی — صفحه ۵۳ و ۵۴ (جزوه ص ۴۹)",
    intro: {
      en: "Sina and Behzad are old friends. They have not seen each other for about three months. Behzad has called Sina.",
      fa: "سینا و بهزاد دوستان قدیمی هستند. آنها حدود سه ماه است که یکدیگر را ندیده‌اند. بهزاد به سینا زنگ زده است.",
    },
    lines: [
      { speaker: "Behzad", en: "Hi Sina. How is it going? I haven't seen you since Norooz.", fa: "سلام سینا. حالت چطوره؟ من تو را از نوروز ندیده‌ام." },
      { speaker: "Sina", en: "Hi Behzad. Thanks for calling. I am home most of the time. I do different things like surfing the net and playing computer games.", fa: "سلام بهزاد. از تماست متشکرم. من بیشتر اوقات در خانه هستم. من چیزهای مختلفی انجام می‌دهم مثل گشت و گذار در اینترنت و انجام بازی‌های کامپیوتری." },
      { speaker: "Behzad", en: "How about your free time? Going out, jogging, playing football, ...?", fa: "در اوقات فراغتت چطور؟ بیرون می‌روی، می‌دوی، فوتبال بازی می‌کنی، ...؟" },
      { speaker: "Sina", en: "Nope. I rarely go out and hang out with my friends.", fa: "نه، من به ندرت بیرون می‌روم و با دوستانم وقت می‌گذرانم." },
      { speaker: "Behzad", en: "I see. Reza and I are going to Darband for climbing and walking this Thursday. We really like to see you. Will you come with us?", fa: "متوجه شدم. رضا و من این پنجشنبه قصد داریم برای کوهنوردی و پیاده‌روی به دربند برویم. ما واقعاً دوست داریم تو را ببینیم. آیا با ما خواهی آمد؟" },
      { speaker: "Sina", en: "What?! Oh, no, I haven't been there for a long time. I prefer to stay home and watch my movies on the weekend. I've bought lots of things to eat, too.", fa: "چی؟ اوه، نه، برای مدت طولانی است که آنجا نرفته‌ام. من ترجیح می‌دهم در آخر هفته در خونه بمانم و فیلم‌هایم را تماشا کنم. من همچنین چیزهای زیادی برای خوردن خریده‌ام." },
      { speaker: "Behzad", en: "Come on! Stop being a couch potato! I guess you haven't exercised for a long time. I think you are a bit fat now.", fa: "برو بابا (دست بردار)! این قدر خوره‌ی تلویزیون نباش! من حدس می‌زنم تو برای مدت طولانی ورزش نکرده‌ای. من فکر می‌کنم الان کمی چاق هستی." },
      { speaker: "Sina", en: "Actually, you're right. I've gained five kilos in three months. I really do not like to move!", fa: "راستش رو بخوای، درست می‌گی. من در ۳ ماه ۵ کیلو چاق شدم! من واقعاً دوست ندارم تحرک داشته باشم." },
      { speaker: "Behzad", en: "See? I told you. Working with computers for a long time makes people sick and depressed. I've read about this somewhere.", fa: "می‌بینی! من به تو گفتم. کار کردن با کامپیوتر برای مدت طولانی افراد را بیمار و افسرده می‌کند. من در این باره در جایی مطلبی خوانده‌ام." },
      { speaker: "Sina", en: "All right. You won! When and where should we meet?", fa: "باشه، تو بردی. کی و کجا باید همدیگر را ببینیم؟" },
    ],
  },

  // ─── درس سوم: Art and Culture — خرید سوغات ایرانی ───
  {
    id: "c11-3",
    lesson: 3,
    title: "مکالمه درس ۳",
    titleFa: "مکالمه درس ۳ — خرید سوغات ایرانی (رضا و گردشگر)",
    source: "کتاب درسی — صفحه ۸۵ و ۸۶ (جزوه ص ۸۴)",
    intro: {
      en: "Listen to the conversation between Reza and a tourist.",
      fa: "به مکالمه‌ی بین رضا و یک گردشگر توجه کنید.",
    },
    lines: [
      { speaker: "Reza", en: "How can I help you, sir?", fa: "چطور می‌توانم به شما کمک کنم، آقا؟" },
      { speaker: "Tourist", en: "I am looking for some Iranian handicrafts.", fa: "من به دنبال تعدادی صنایع دستی ایرانی هستم." },
      { speaker: "Reza", en: "Here you can find a range of Iranian hand-made products, from carpets to pottery and tilework, but we don't sell metalwork.", fa: "اینجا می‌توانید طیفی از محصولات دست‌ساز ایرانی را پیدا کنید؛ از فرش (گرفته) تا سفال و کاشی‌کاری شده، اما کارهای فلزی نمی‌فروشیم." },
      { speaker: "Tourist", en: "I'd like to buy a Persian carpet, but it seems too expensive.", fa: "من دوست دارم فرش ایرانی بخرم، اما به نظر می‌رسه بیش از حد گران باشه." },
      { speaker: "Reza", en: "The price depends on its size. Instead, you can take an Isfahan Termeh or a Qashqai Gabbeh.", fa: "قیمت بستگی به اندازه‌اش داره. به جاش، می‌توانید ترمه‌ی اصفهان یا گبه‌ی قشقایی بردارید." },
      { speaker: "Tourist", en: "Wow! How touching this Gabbeh is! How much is it?", fa: "وای، این گبه چقدر تاثیرگذاره! قیمتش چقدره؟" },
      { speaker: "Reza", en: "It is 85 dollars. If you buy more than 100 dollars, you'll get a 20 percent discount. You can take this calligraphic tile for only 30 dollars.", fa: "اون ۸۵ دلاره. اگر بیشتر از ۱۰۰ دلار بخرید، ۲۰ درصد تخفیف خواهید گرفت. شما می‌توانید این کاشی خوش‌نویسی شده را فقط ۳۰ دلار بردارید." },
      { speaker: "Tourist", en: "Well, I'll take both. Please pack them for me.", fa: "خُب، من هر دو رو برمی‌دارم. لطفاً آنها را برای من بسته‌بندی کنید." },
      { speaker: "Reza", en: "Yes, sure.", fa: "بله، حتماً." },
      { speaker: "Tourist", en: "Do you work for this shop? Who has made these beautiful items?", fa: "آیا شما برای این فروشگاه کار می‌کنید؟ چه کسی این اشیاء زیبا را ساخته؟" },
      { speaker: "Reza", en: "Actually, it is my father's workshop and store. I work here after school. All my family members work here to help our family business.", fa: "در واقع، اینجا کارگاه و فروشگاه پدر من است. من بعد از مدرسه این‌جا کار می‌کنم. همه‌ی اعضای خانواده‌ی من برای کمک به کسب‌وکار خانواده این‌جا کار می‌کنند." },
      { speaker: "Tourist", en: "Well done! How lucky you are to work in such a lovely shop. I really appreciate the culture and art of Iran.", fa: "آفرین! شما چقدر خوش‌شانس هستید که در چنین فروشگاه قشنگی کار می‌کنید. واقعاً فرهنگ و هنر ایران را ارج می‌نهم." },
      { speaker: "Reza", en: "Thank you very much. If you are interested in knowing more about our products, you can check this booklet.", fa: "خیلی متشکرم. اگه علاقمندی که بیشتر در مورد محصولات ما بدانید، می‌توانید این کتابچه (راهنما) را مطالعه کنید." },
    ],
  },
];
