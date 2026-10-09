// Conversations — "Vision One" (جزوه جامع زبان انگلیسی پایه دهم)
// منبع: رونویسی VLM از جزوه — متن انگلیسی و ترجمه فارسی عیناً بدون تغییر رونویسی شده‌اند
// نام گوینده (انگلیسی/فارسی) از ابتدای هر خط به فیلد speaker منتقل شده است

import type { Conversation, ConversationLine } from "../types";

export const CONVERSATION_LIST: Conversation[] = [
  // ————— Lesson One —————
  {
    id: "c1",
    lesson: 1,
    title: "Conversation — Lesson One",
    titleFa: "مکالمه درس اول",
    source: "کتاب درسی — صفحه ۱۹",
    intro: {
      en: "Maryam is visiting the museum of Nature and Wildlife. She’s talking to Mr. Razavi, who works in the museum.",
      fa: "مریم در حال بازدید از موزه طبیعت و حیات وحش است. او با آقای رضوی که در موزه کار می‌کند، صحبت می‌کند.",
    },
    lines: [
      {
        speaker: "Maryam",
        en: "Excuse me, what is it? Is it a leopard?",
        fa: "ببخشید، این چیست؟ آیا این پلنگ است؟",
      },
      {
        speaker: "Mr. Razavi",
        en: "No, it is a cheetah.",
        fa: "نه، این یوزپلنگ است.",
      },
      {
        speaker: "Maryam",
        en: "Oh, a cheetah?",
        fa: "اوه، یک یوزپلنگ؟",
      },
      {
        speaker: "Mr. Razavi",
        en: "Yeah, an Iranian cheetah. It is an endangered animal.",
        fa: "بله، یک یوزپلنگ ایرانی است. (یوزپلنگ ایرانی) به حیوانی در خطر انقراض تبدیل شده است.",
      },
      {
        speaker: "Maryam",
        en: "I know. I heard around 70 of them are alive. Yes?",
        fa: "می‌دانم. من شنیده‌ام حدود ۷۰ تا از آن‌ها زنده هستند. درسته؟",
      },
      {
        speaker: "Mr. Razavi",
        en: "Right, but the number will increase.",
        fa: "درست است، اما این تعداد افزایش خواهد یافت.",
      },
      {
        speaker: "Maryam",
        en: "Really?! How?",
        fa: "واقعاً! چطور؟",
      },
      {
        speaker: "Mr. Razavi",
        en: "Well, we have some plans. For example, we are going to protect their homes, to make movies about their life, and to teach people how to take more care of them.",
        fa: "خوب، ما برخی از برنامه‌ها را داریم. ما قصد داریم از خانه‌های آن‌ها محافظت کنیم، فیلم‌هایی درباره زندگی آن‌ها بسازیم و به مردم بیاموزیم که چگونه بیشتر از آن‌ها مراقبت کنند.",
      },
    ] satisfies ConversationLine[],
  },
  // ————— Lesson Two —————
  {
    id: "c2",
    lesson: 2,
    title: "Conversation — Lesson Two",
    titleFa: "مکالمه درس دوم",
    source: "کتاب درسی — صفحه ۴۷",
    intro: {
      en: "Alireza is visiting an observatory. He is talking to Ms. Tabesh who works there.",
      fa: "علیرضا در حال بازدید از یک رصدخانه است. او با خانم طبش که آنجا کار می‌کند، صحبت می‌کند.",
    },
    lines: [
      {
        speaker: "Ms. Tabesh",
        en: "Are you interested in the planets?",
        fa: "آیا به سیاره‌ها علاقه‌مند هستید؟",
      },
      {
        speaker: "Alireza",
        en: "Yes! They are really interesting for me, but I don’t know much about them.",
        fa: "بله! آنها برای من واقعاً جالب هستند، ولی خیلی درباره‌شان نمی‌دانم.",
      },
      {
        speaker: "Ms. Tabesh",
        en: "Planets are really amazing but not so much alike. Do you know how they are different?",
        fa: "سیاره‌ها واقعاً شگفت‌انگیز هستند اما خیلی شبیه هم نیستند... آیا می‌دانید چگونه با هم متفاوت هستند؟",
      },
      {
        speaker: "Alireza",
        en: "Umm... I know they go around the Sun in different orbits.",
        fa: "هوم... من می‌دانم که آنها در مدارهای مختلف به دور خورشید می‌چرخند.",
      },
      {
        speaker: "Ms. Tabesh",
        en: "That’s right. They have different colors and sizes, too. Some are rocky like Mars; some have rings like Saturn and some have moons like Uranus.",
        fa: "درست است. آنها رنگ و اندازه‌های متفاوتی نیز دارند. برخی سنگی مثل مریخ هستند، برخی حلقه دارند مانند زحل و برخی قمر دارند مانند اورانوس.",
      },
      {
        speaker: "Alireza",
        en: "How wonderful! Can we see them without a telescope?",
        fa: "چقدر شگفت‌انگیز! آیا ما می‌توانیم بدون تلسکوپ آن‌ها را ببینیم؟",
      },
      {
        speaker: "Ms. Tabesh",
        en: "Yeah..., we can see the planets nearer to us without a telescope, such as Mercury, Venus, Mars, Jupiter and Saturn. We can see Uranus and Neptune only with powerful telescopes.",
        fa: "آره ... ما می‌توانیم سیارات نزدیک‌تر را بدون تلسکوپ ببینیم، مانند عطارد، زهره، مریخ، مشتری و زحل. فقط با تلسکوپ‌های قدرتمند می‌توانیم اورانوس و نپتون را ببینیم.",
      },
      {
        speaker: "Alireza",
        en: "And which planet is the largest of all?",
        fa: "کدام سیاره از همه بزرگتر است؟",
      },
      {
        speaker: "Ms. Tabesh",
        en: "Jupiter is the largest one. It has more than 60 moons. Do you want to look at it?",
        fa: "مشتری بزرگترین سیاره است. بیش از ۶۰ قمر دارد. می‌خواهید به آن نگاه کنید؟",
      },
      {
        speaker: "Alireza",
        en: "I really like that.",
        fa: "واقعاً دوست دارم (که این کار را کنم).",
      },
    ] satisfies ConversationLine[],
  },
  // ————— Lesson Three —————
  {
    id: "c3",
    lesson: 3,
    title: "Conversation — Lesson Three",
    titleFa: "مکالمه درس سوم",
    source: "کتاب درسی — صفحه ۷۶",
    intro: {
      en: "Roya and Mahsa are leaving the library.",
      fa: "رویا و مهسا در حال ترک کتابخانه‌اند.",
    },
    lines: [
      {
        speaker: "Roya",
        en: "When I came in, you were reading a book. What was it?",
        fa: "وقتی که وارد شدم، تو داری یک کتاب می‌خواندی (آیا کد) چی بود؟",
      },
      {
        speaker: "Mahsa",
        en: "I was reading a book about famous Iranian scientists.",
        fa: "من داشتم کتابی درباره دانشمندان معروف ایرانی می‌خواندم.",
      },
      {
        speaker: "Roya",
        en: "But such books are not very interesting.",
        fa: "اما اینجور کتاب‌ها خیلی جالب نیستند.",
      },
      {
        speaker: "Mahsa",
        en: "At first, I had the same idea, believe me!",
        fa: "در ابتدا من هم همین فکر را داشتم، باور کن!",
      },
      {
        speaker: "Roya",
        en: "Did you find it useful?",
        fa: "آیا [آن را] مفید یافتی؟ (بهمون مفید بود)",
      },
      {
        speaker: "Mahsa",
        en: "Oh yes. Actually, I learned many interesting things about our scientists’ lives.",
        fa: "آره داره. در واقع من چیزهای جالب زیادی درباره زندگی دانشمندانمان یاد گرفتم.",
      },
      {
        speaker: "Roya",
        en: "Like what?",
        fa: "مثل چی؟",
      },
      {
        speaker: "Mahsa",
        en: "For example, Razi taught medicine to many young people while he was working in Ray Hospital. Or Nasireddin Toosi built Maragheh Observatory when he was studying the planets.",
        fa: "برای مثال، رازی علم پزشکی را به جوانان زیادی یاد می‌داد، وقتی که در بیمارستان ری \"کار\" می‌کرد. یا نصیرالدین طوسی با ساختن رصدخانه مراغه، \"لازمه\" لا اکمه کرد، و در حال مطالعه سیارات بود. ساکن",
      },
      {
        speaker: "Roya",
        en: "Cool! What was the name of the book?",
        fa: "جالبه اسم کتاب چی بود؟",
      },
      {
        speaker: "Mahsa",
        en: "Famous Iranian Scientists.",
        fa: "دانشمندان معروف ایرانی.",
      },
    ] satisfies ConversationLine[],
  },
  // ————— Lesson Four —————
  {
    id: "c4",
    lesson: 4,
    title: "Conversation — Lesson Four",
    titleFa: "مکالمه درس چهارم",
    source: "کتاب درسی — صفحه ۱۰۲",
    intro: {
      en: "\"Diego\" is a Spanish tourist who is planning for his summer vacation. He is talking to \"Carlos Sabato\", a travel agent in Madrid.",
      fa: "\"دیگو\" یک گردشگر اسپانیایی است که در حال برنامه‌ریزی برای تعطیلات تابستانی خود است. او با \"کارلوس ساباتو\"، یک نماینده مسافرتی در مادرید صحبت می‌کند.",
    },
    lines: [
      {
        speaker: "Diego",
        en: "Excuse me, sir! I am planning for my summer vacation.",
        fa: "ببخشید آقا! من دارم برای تعطیلات تابستانی‌ام برنامه‌ریزی می‌کنم.",
      },
      {
        speaker: "Carlos",
        en: "How can I help you?",
        fa: "چطور می‌تونم کمکتون کنم؟",
      },
      {
        speaker: "Diego",
        en: "Actually, I want to visit Asia, but I am not sure about my destination. Do you have any suggestion?",
        fa: "در واقع می‌خوام به خاورمیانه یا آسيا سفر کنم، اما مطمئن نیستم. آیا پیشنهادی دارید؟",
      },
      {
        speaker: "Carlos",
        en: "Well, you may have some choices. You can visit China. It's famous for the Great Wall.",
        fa: "خوب، شما ممکن است گزینه‌هایی داشته باشید. می‌توانید به \"چین\" که به \"دیوار بزرگ\" معروف است، سفر کنید.",
      },
      {
        speaker: "Diego",
        en: "Yes, but I was in Beijing two years ago.",
        fa: "بله، اما من دو سال پیش در شهر \"پکن\" بودم.",
      },
      {
        speaker: "Carlos",
        en: "What about India? In fact, the Taj Mahal is a popular destination, but it is hot in summer. Probably Iran is the best choice.",
        fa: "نظرت راجع به هند چیه؟ این مقصد بسیار محبوبی هست اما تابستانش خیلی گرمه. شاید ایران بهترین انتخاب باشه.",
      },
      {
        speaker: "Diego",
        en: "I heard Iran is a great and beautiful country, but I don't know much about it.",
        fa: "من شنیدم ایران کشور بزرگی و زیباست، ولی زیاد درباره‌اش نمی‌دانم.",
      },
      {
        speaker: "Carlos",
        en: "Well, Iran is a four-season country. It has many historical sites and amazing nature. Also, its people are very kind and hospitable.",
        fa: "ایران کشوری چهارفصل است که دارای بسیاری از سایت‌های تاریخی و طبیعت شگفت‌انگیز است و مردم آن نیز مهربان و مهمان‌نواز هستند.",
      },
      {
        speaker: "Diego",
        en: "It seems a suitable choice. But how can I get more information about Iran?",
        fa: "به نظر میاد یه انتخاب مناسب باشه.اما از کجا می‌تونم اطلاعات بیشتری درباره ایران پیدا کنم؟",
      },
      {
        speaker: "Carlos",
        en: "You can check this booklet or may see our website.",
        fa: "شما می‌توانید این جزوه را بررسی کرده و یا وب‌سایت ما را ببینید.",
      },
    ] satisfies ConversationLine[],
  },
];
