import type { Reading } from "../types";

/**
 * متن‌های کوتاه (ریدینگ) جزوه «جزوه جامع کمک آموزش زبان انگلیسی پایه دوازدهم» (Vision Three — تألیف جمال احمدی و همکاران).
 * هر ریدینگ از بخش Reading خود جزوه استخراج شده و ترجمه فارسی هر پاراگراف، ترجمه چاپی خود جزوه است (نه ترجمه‌ی ما):
 * - درس ۱: «Respect your Parents» (جزوه ص ۱۴ — کتاب درسی ص ۲۴ و ۲۵) و «Respecting Our Elders» (جزوه ص ۱۵ — کتاب کار ص ۱۰)
 * - درس ۲: «How to Use a Dictionary» (جزوه ص ۶۷ و ۶۸ — کتاب درسی ص ۵۲ و ۵۳) و «Dictionaries» (جزوه ص ۶۹ و ۷۰ — کتاب کار ص ۲۸ و ۲۹)
 * - درس ۳: «Earth for our Children» (جزوه ص ۱۲۱ و ۱۲۲ — کتاب درسی ص ۸۰ و ۸۱) و «Electric Cars» (جزوه ص ۱۲۳ — کتاب کار ص ۴۷ و ۴۸)
 *
 * نکات وفاداری به متن جزوه:
 * - ترجمه‌های فارسی عین جزوه است؛ فقط نویسه‌های جابه‌جاشده لایه متن PDF ترمیم شده‌اند (فهرست اصلاحیه پایین).
 * - در ریدینگ‌های کتاب کار (r12-2 و r12-4) جزوه عنوان چاپی ندارد؛ عنوان انگلیسی/فارسی از بافت متن ساخته شده است.
 * - در r12-3، هر «نکته» شماره‌دار جزوه (1 تا 7) یک پاراگراف جداگانه ثبت شده است.
 *
 * اصلاحیه (کلمه‌های شکسته/جابه‌جای لایه متن PDF که در این فایل ترمیم شده‌اند):
 * - لیگاتور «لا»: اطالعات ← اطلاعات، بالکن، خالل ← خلال، اصأل ← اصلاً، حتمأ ← حتماً، مکررأ ← مکرراً، معات ← معانی،
 *   امالء ← املاء، سالمن ← سلامتی، تالش ← تلاش، طوالنی ← طولانی، آوال ← ابتدا، دیال ← داخلی (دوربین دیجیتال)
 * - حروف جابه‌جا (ر/ی، ت/ی، ب/ت، ب/ن، ر/ز، س/ش): احیام ← احترام، رپی ← پیر، پش/پشش ← پسر/پسرش، پشم ← پسرم،
 *   رشوع ← شروع، یم ← می، مییسید ← می‌پرسید، ییح ← چیست، خوشحایل ← خوشحالی، دفی/دفیچه ← دفتر/دفترچه،
 *   وقن ← وقتی، مهربات ← مهربانی، نگایه ← نگاهی، مکن ← مکث، خونشدی ← خونسردی، کسات ← کسانی، زمات ← زمانی،
 *   کوچگ ← کوچک، شنوات ← شنوایی، شاوار ← شایان، زندیک ← زندگی، اولی ← اولین، چیهای ← چیزهای، خییل ← خیلی،
 *   یت قید و رشط ← بی‌قید و شرط، کاق ← کافی، تنهات ← تنهایی، هنگایم ← هنگامی، بزرگیها ← بزرگان، رنی ← نیز،
 *   گیند ← بگیرند، دیکشیی ← دیکشنری، عمویم ← عمومی، معات ← معانی، میادف ← مترادف، تخصض ← تخصص، زبات ← زبان،
 *   الملیل ← بین‌المللی، رربند/ربی ← بر/برند، برآیند، یافتن (یافی ← یافتن)، فاریس ← فارسی، رشکت ← شرکت،
 *   گسیده ← گسترده، پاکیه ← پاکیزه، ذخیه ← ذخیره، الکییگ ← الکتریکی، شیمیات ← شیمیایی، هستهای ← هسته‌ای،
 *   مرص ← مضر، رمی ← برمی، اخی ← اخیر، طرایح ← طرح‌ها، گرمایشس ← گرمایشی، ساخی ← ساختن، کنیل ← کنترل،
 *   شارژی ← شارژ، حمیل ← حمل، مویس ← موسیقی (پخش‌کننده موسیقی)، عالقه ← علاقه، تعطیالت ← تعطیلات،
 *   پیامه ← پیژامه (pajamas)، آوات ← آوانگاری
 * - r12-1: ترجمه‌های چاپی جزوه به‌صورت سطرهای به‌هم‌ریخته چاپ شده بودند؛ بر اساس توالی منطقی جمله‌ها بازچینی شدند.
 */
export const READING_LIST: Reading[] = [
  // ─── درس اول ───
  {
    id: "r12-1",
    lesson: 1,
    title: "Respect your Parents",
    titleFa: "به والدین خود احترام بگذارید",
    source: "کتاب درسی — صفحه ۲۴ و ۲۵ (جزوه ص ۱۴)",
    paragraphs: [
      {
        en: "On a spring morning, an old woman was sitting on the sofa in her house. Her young son was reading a newspaper. Suddenly a pigeon sat on the window.",
        fa: "در یک صبح بهاری یک زن پیر در خانه‌اش بر روی کاناپه نشسته بود. پسر جوانش در حال روزنامه خواندن بود. ناگهان یک کبوتر بر روی پنجره نشست.",
      },
      {
        en: "The mother asked her son quietly, “What is this?” The son replied: “It is a pigeon”. After a few minutes, she asked her son for the second time, “What is this?” The son said, “Mom, I have just told you, “It is a pigeon, a pigeon”. After a little while, the old mother asked her son for the third time, “What is this?” This time the son shouted at his mother, “Why do you keep asking me the same question again and again? Are you hard of hearing?”",
        fa: "مادر به آرامی از پسرش پرسید «این چیه؟» پسر جواب داد: «این یک کبوتر است.» بعد از چند دقیقه برای بار دوم از پسرش پرسید «این چیه؟» پسر گفت «تازه من به تو گفتم این یک کبوتر است، کبوتر.» مادر پیر برای بار سوم از پسرش پرسید «این چیه؟» این بار پسر بر سر مادرش فریاد کشید «چرا همش داری سؤال‌های تکراری می‌پرسی؟ مگه مشکل شنوایی داری؟»",
      },
      {
        en: "A little later, the mother went to her room and came back with an old diary. She said, “My dear son, I bought this diary when you were born”. Then, she opened a page and kindly asked her son to read that page. The son looked at the page, paused and started reading it aloud:",
        fa: "کمی بعد، مادر به اتاقش رفت و با یک دفترچه خاطرات برگشت. او گفت «پسر عزیزم، من این دفتر خاطرات را وقتی که تو متولد شدی خریدم.» سپس او صفحه‌ای را باز کرد و با مهربانی از پسرش خواست که آن را بخواند. پسر به صفحه نگاهی انداخت و کمی مکث کرد و شروع به خواندن نمود:",
      },
      {
        en: "Today my little son was sitting on my lap, when a pigeon sat on the window. My son asked me what it was 15 times, and I replied to him all 15 times that it was a pigeon. I hugged him lovingly each time when he asked me the same question again and again. I did not feel angry at all. I was actually feeling happy for my lovely child.",
        fa: "امروز پسر کوچکم بر روی پایم نشسته بود. زمانی که یک کبوتر بر روی پنجره نشست، پسرم ۱۵ بار از من پرسید که این چیست و من هر ۱۵ بار برای او تکرار کردم که این یک کبوتر است. هر بار که او همان سؤال تکراری را از من می‌پرسید من او را با مهربانی در آغوش می‌گرفتم. من اصلاً احساس عصبانیت نکردم. در واقع من به خاطر فرزند دوست‌داشتنی‌ام احساس خوشحالی می‌کردم.",
      },
      {
        en: "Suddenly the son burst into tears, hugged his old mother and said repeatedly, “Mom, mom, forgive me; please forgive me.” The old woman hugged her son, kissed him and said calmly, “We must care for those who once cared for us. We all know how parents cared for their children for every little thing. Children must love them, respect them, and care for them”.",
        fa: "ناگهان پسر شروع به گریه کردن کرد و مادر پیرش را در آغوش گرفت و مکرراً تکرار می‌کرد که «مادر، مادر من را ببخش، لطفاً من را ببخشید.» زن پیر پسرش را در آغوش گرفت و او را بوسید و با خونسردی گفت: «ما باید از کسانی که یک زمانی از ما مراقبت کرده‌اند مراقبت کنیم. ما همه می‌دانیم که پدر و مادر برای هر مسئله‌ی کوچک چگونه به فرزندانشان اهمیت می‌دهند. بچه‌ها باید آنها را دوست داشته باشند و به آنها احترام بگذارند و از آنها مراقبت کنند.»",
      },
    ],
  },
  {
    id: "r12-2",
    lesson: 1,
    title: "Respecting Our Elders",
    titleFa: "احترام به بزرگان",
    source: "کتاب کار — صفحه ۱۰ (جزوه ص ۱۵)",
    paragraphs: [
      {
        en: "It is very important for us to respect our elders. It is also important to note that elders were not born elders; they were kids like us and now have grown old. A few years hence we will also grow older. If today we respect them, our present and future generations will carry those values and will learn to respect us as well when we grow old.",
        fa: "برای ما بسیار مهم است که به بزرگانمان احترام بگذاریم. همچنین مهم است که بدانیم بزرگان، بزرگ (مسن) به دنیا نیامده‌اند. آنها همانند ما کودک بوده‌اند و اکنون بزرگ شده‌اند. چند سال بعد ما نیز مسن‌تر خواهیم شد. اگر امروز ما به آن‌ها احترام بگذاریم، نسل امروز و آینده‌ی ما نیز آن ارزش‌ها را حفظ خواهند کرد و یاد می‌گیرند هنگامی که ما هم پیر شدیم، به ما احترام بگذارند.",
      },
      {
        en: "Elders have a lot to share with us: their life experiences, their failures, their successes and many more. Thus, we need to care for them because they deserve to be cared for. Respect and care for elders start with our parents as they are our first teachers in our life.",
        fa: "بزرگان چیزهای زیادی برای تقسیم کردن با ما دارند: تجربه‌های زندگیشان، شکست‌هایشان، موفقیت‌هایشان و خیلی چیزهای دیگر. بنابراین ما باید که به آنها اهمیت بدهیم چونکه (آن‌ها) شایان مراقبت کردن هستند. احترام و مراقبت کردن از بزرگان، با پدر و مادرمان شروع می‌شود زیرا آنها اولین معلم‌های ما در زندگی هستند.",
      },
      {
        en: "No matter what we do in our lives, who we are, and where we live, we must love them as they love us unconditionally. They feel honored when we appreciate their love and respect them. So, it is our duty to help them when they need us because they are not young enough to handle things on their own like before.",
        fa: "مهم نیست چه کاری را در زندگیمان انجام می‌دهیم، چه کسی هستیم، کجا زندگی می‌کنیم، ما باید آنها را همان گونه که آنها ما را بی‌قید و شرط دوست دارند، دوست داشته باشیم. آنها احساس افتخار می‌کنند هنگامی که ما قدردان عشق آنها هستیم و به آنها احترام می‌گذاریم. پس این وظیفه‌ی ما است که هنگامی که به ما نیاز دارند به آنها کمک کنیم زیرا آنها به اندازه‌ی کافی جوان نیستند که مانند قبل بتوانند به تنهایی از عهده‌ی کارها برآیند.",
      },
    ],
  },

  // ─── درس دوم ───
  {
    id: "r12-3",
    lesson: 2,
    title: "How to Use a Dictionary",
    titleFa: "چگونه از یک دیکشنری استفاده کنیم",
    source: "کتاب درسی — صفحه ۵۲ و ۵۳ (جزوه ص ۶۷ و ۶۸)",
    paragraphs: [
      {
        en: "A good dictionary gives the user information about words such as spellings, pronunciations and definitions. It also gives examples of how to use the words in sentences correctly. Therefore, it is essential to know how to use a dictionary. In this lesson, we provide you with some helpful tips on how to use a dictionary effectively.",
        fa: "یک دیکشنری خوب اطلاعات درباره‌ی کلمات از قبیل املاءها و تلفظ‌ها و معانی را به استفاده کننده می‌دهد. همچنین مثال‌هایی را ارائه می‌دهد که چگونه از کلمات به درستی در جملات استفاده کنیم. بنابراین مهم است که بدانیم چطور از دیکشنری استفاده کنیم. در این درس، ما برای شما نکات مفیدی را در رابطه با استفاده مؤثرتر از دیکشنری فراهم کرده‌ایم.",
      },
      {
        en: "1. Choose the Right Dictionary. There are many different types of dictionaries such as learner’s dictionaries, general dictionaries, picture dictionaries, etc. Therefore, first identify your needs. Without choosing the right one you cannot meet your language needs.",
        fa: "۱. دیکشنری درست را انتخاب کنید. انواع مختلف از دیکشنری‌ها وجود دارند از قبیل دیکشنری‌های یادگیرنده، دیکشنری‌های عمومی، دیکشنری‌های تصویری و .... بنابراین در ابتدا نیازهای خود را مشخص کنید. بدون انتخاب دیکشنری مناسب، شما نمی‌توانید نیازهای زبانیتان را برطرف نمائید.",
      },
      {
        en: "2. Read the Introduction. The best way to learn how to use your dictionary effectively is to read its introduction. This section explains issues like how entries are arranged, what information is offered in entries and what abbreviations and pronunciation symbols are used throughout the entries.",
        fa: "۲. مقدمه را بخوانید. بهترین راه برای اینکه بدانید چگونه به طور مؤثر از دیکشنری‌تان استفاده کنید این است که مقدمه آن را بخوانید. این بخش، مسائلی همانند اینکه با چه ترتیبی کلمات چیده شده‌اند، چه اطلاعاتی در مورد لغات ارائه شده و چه علائم اختصاری و نشانه‌های تلفظ برای آن لغات به کار برده شده را توضیح می‌دهد.",
      },
      {
        en: "3. Learn the Abbreviations. Different types of abbreviations are often used in the definitions for a word. This can be confusing if you do not know what the abbreviations stand for.",
        fa: "۳. علائم اختصاری را یاد بگیرید. انواع مختلف از اختصارات اغلب برای معانی یک لغت به کار برده می‌شوند. اگر شما ندانید که این اختصارات، نماد چه کلمات هستند، ممکن است برای شما گیج‌کننده باشند.",
      },
      {
        en: "4. Learn the Guide to Pronunciation. If you immediately jump into using the dictionary without understanding the pronunciation guide, it can be difficult to figure it out.",
        fa: "۴. راهنمای تلفظ را یاد بگیرید. اگر شما شروع به استفاده کردن از دیکشنری، قبل از درک (یادگیری) راهنمای تلفظ بروید، فهمیدن آن برایتان سخت خواهد بود.",
      },
      {
        en: "5. Read the Guide Words. These are the two words at the top of each page that show the first and last entries on the page. These words will help you find the word you are looking for in the right letter section.",
        fa: "۵. کلمات راهنما را بخوانید. کلمات راهنما دو کلمه در بالای هر صفحه هستند که کلمه‌ی اول و کلمه‌ی آخر در صفحه را نشان می‌دهد. این‌ها به شما در پیدا کردن کلمه‌ای که می‌خواهید در بخش مناسب حرف کمک می‌کنند.",
      },
      {
        en: "6. Read the Definitions. Once you find an entry, you can find the exact meaning of the word, its pronunciation, part of speech, synonyms, antonyms, and probably its origin.",
        fa: "۶. معنی را بخوانید. وقتی شما لغت را پیدا کردید، می‌توانید معنای دقیق آن کلمه، تلفظش، نقش آن کلمه در جمله، مترادف‌ها، متضادها و احتمالاً ریشه آن را پیدا کنید.",
      },
      {
        en: "7. Look for Collocations. Learning the meaning of a single word is not usually enough. Through sentence examples, try to learn ‘words in combination’ to expand your vocabulary.",
        fa: "۷. دنبال کلمات هم‌نشین بگردید. یادگیری معنای یک کلمه‌ی تنها، معمولاً کافی نیست. در طریق مثال‌های جمله، سعی کنید کلمات ترکیبی را یاد بگیرید تا دایره لغاتتان رشد پیدا کند.",
      },
    ],
  },
  {
    id: "r12-4",
    lesson: 2,
    title: "Dictionaries",
    titleFa: "دیکشنری‌ها",
    source: "کتاب کار — صفحه ۲۸ و ۲۹ (جزوه ص ۶۹ و ۷۰)",
    paragraphs: [
      {
        en: "A dictionary is a book which explains the meanings of words and expressions. You can find words easily because dictionaries put them in alphabetical order. The word ‘dictionary’ comes from the Latin ‘dictio’ (‘saying’).",
        fa: "دیکشنری یک کتاب است که معنای لغات و اصطلاحات را توضیح می‌دهد. شما می‌توانید کلمات را به راحتی پیدا کنید زیرا دیکشنری‌ها آن‌ها را با ترتیب الفبا قرار داده‌اند. کلمه دیکشنری از کلمه لاتین \"dictio\" به معنای \"گفتن\" گرفته شده است.",
      },
      {
        en: "There are several types of dictionaries. Dictionaries which explain words and how they are used; dictionaries which translate words from one language to another; dictionaries of biography which tell about famous people; and technical dictionaries which explain the meanings of technical words.",
        fa: "انواع مختلف از دیکشنری‌ها وجود دارند: دیکشنری‌هایی که کلمات و چگونگی استفاده از آن‌ها را توضیح می‌دهند، دیکشنری‌هایی که کلمات را از یک زبان به زبان دیگر ترجمه می‌کنند، دیکشنری زندگینامه که درباره‌ی افراد مشهور هستند و دیکشنری‌های تخصصی که معنای کلمه‌های فن را توضیح می‌دهند.",
      },
      {
        en: "Dictionaries which explain what words mean give a clear ‘definition’ of them. A good dictionary also gives more information about words. For instance, it explains how they are pronounced. Usually the International Phonetic Alphabet (IPA) is used for this purpose.",
        fa: "دیکشنری‌هایی که توضیح می‌دهند کلمات به چه معنا هستند، تعریف روشنی از آنها را بیان می‌کنند. یک دیکشنری خوب همچنین اطلاعات بیشتری را درباره‌ی کلمات می‌دهد. برای مثال، توضیح می‌دهد که آنها چگونه تلفظ می‌شوند. معمولاً الفبای بین‌المللی آوانگاری (فونتیک) برای این هدف استفاده می‌شود.",
      },
      {
        en: "There are also dictionaries which translate words into other languages. Very often one volume translates both ways; for example, half of the book is from English to Persian and the other half from Persian to English.",
        fa: "همچنین دیکشنری‌هایی وجود دارند که کلمات را از زبانی به زبان دیگر ترجمه می‌کنند. بیشتر اوقات پیش می‌آید که یک جلد با هر دو روش ترجمه کند؛ برای مثال، نصف کتاب ترجمه‌ی انگلیسی به فارسی است و نصف کتاب ترجمه فارسی به انگلیسی.",
      },
      {
        en: "When using a dictionary to find out how to say something in another language, one has to be careful to choose the right meaning.",
        fa: "وقتی از دیکشنری برای دانستن اینکه چگونه باید چیزی را به زبان دیگری گفت استفاده شود، شخص باید مراقب باشد که معنای درست را انتخاب کند.",
      },
      {
        en: "A word like ‘right’ has several meanings in English, for example, ‘correct’ and ‘the opposite of left’. A word like ‘present’ may be used as an adjective, meaning ‘not absent’, as a noun, meaning ‘gift’ or as a verb, meaning ‘give’. Words with different meanings exist in other languages, too. A good dictionary lists all the meanings of words to help people find the meaning that they look for.",
        fa: "برای واژه \"right\" معانی متفاوتی در انگلیسی وجود دارد، برای مثال \"درست و صحیح\" و \"مخالف چپ\". \"present\" ممکن است به عنوان صفت به معنای \"غائب نبودن\" استفاده شود، یا به عنوان اسم به معنای \"کادو\"، یا فعل به معنای \"ارائه دادن\" به کار برده شود. کلمات با معانی متفاوت نیز در زبان‌های دیگر وجود دارند. یک دیکشنری خوب، تمامی معانی یک کلمه را می‌نویسد که به مردم برای پیدا کردن معنایی که به دنبالش می‌گردند، کمک کند.",
      },
      {
        en: "A complete dictionary also tells you about the origin of words and the story behind them. For example, the words like ‘pajamas’, ‘bazaar’ and ‘paradise’ entered English from Persian.",
        fa: "یک دیکشنری کامل هم چنین درباره‌ی ریشه‌ی یک کلمه و داستانی که در پس آن است، به شما می‌گوید. برای مثال کلمات مانند \"پیژامه\"، \"بازار\" و \"بهشت\" از فارسی به انگلیسی وارد شده‌اند.",
      },
    ],
  },

  // ─── درس سوم ───
  {
    id: "r12-5",
    lesson: 3,
    title: "Earth for our Children",
    titleFa: "زمین برای بچه‌هایمان",
    source: "کتاب درسی — صفحه ۸۰ و ۸۱ (جزوه ص ۱۲۱ و ۱۲۲)",
    paragraphs: [
      {
        en: "Energy is the ability to do work. It can take a variety of forms: mechanical, electrical, chemical, and nuclear. To produce any type of energy, the resources of the earth are used. The main resources of the earth are fossil fuels such as natural gas, oil, and coal.",
        fa: "انرژی توانایی برای انجام کار است. انرژی می‌تواند شکل‌های متفاوت داشته باشد: مکانیکی، الکتریکی، شیمیایی و هسته‌ای. برای تولید هر نوع انرژی، منابع کره زمین مورد استفاده قرار می‌گیرند. منابع اصلی کره زمین سوخت‌های فسیلی از قبیل گاز طبیعی، نفت و زغال‌سنگ هستند.",
      },
      {
        en: "We get most of our energy from these fossil fuels, but this is harmful to the environment. Fossil fuels are nonrenewable and cannot be replaced easily. Once we use them up, they’re gone forever. They are not clean as they pollute water or air",
        fa: "ما بیشتر انرژی‌مان را از این سوخت‌های فسیلی می‌گیریم، اما این (سوخت) برای محیط زیست مضر است. سوخت‌های فسیلی تجدیدناپذیر هستند و به راحتی نمی‌توان آنها را جایگزین کرد. اگر یک بار از آنها استفاده کنیم، آنها برای همیشه از بین می‌روند. (سوخت‌های فسیلی) پاک نیستند، چون آب و هوا را آلوده می‌کنند.",
      },
      {
        en: "In recent years, scientists try to use other types of energy resources. They call them clean energy resources because they do not pollute the earth. Clean energy is renewable. It is made from resources that can be replaced, like wind, water, sunshine, tides, and plants. When renewable energy resources are used, the demand for fossil fuels is reduced.",
        fa: "در سال‌های اخیر، دانشمندان سعی کرده‌اند از منابع دیگر انرژی استفاده کنند. چونکه آنها کره زمین را آلوده نمی‌کنند، دانشمندان آنها را منابع انرژی پاک نامیده‌اند. انرژی پاک، تجدیدپذیر است. این (نوع از انرژی) از منابعی تشکیل شده است که می‌تواند جایگزین شود، مانند باد، آب، نور خورشید، جزر و مد و گیاهان. هنگامی که منابع انرژی تجدیدپذیر استفاده شود، نیاز به سوخت‌های فسیلی کاهش پیدا می‌کند.",
      },
      {
        en: "The most common type of clean energy is the solar power. Solar energy is produced by the radiation that reaches the earth. People have used the sun as a heat source for thousands of years. Iranians, for instance, use special designs and arrangements of windows, balconies and yards to get the most sunshine. Different types of materials might also be used in building the houses. This keeps people warm during cold seasons and cool during hot days of the year.",
        fa: "رایج‌ترین نوع انرژی پاک، انرژی خورشیدی است. انرژی خورشیدی از تابش‌هایی که به کره زمین می‌رسد تولید می‌شود. مردم سال‌ها است که از خورشید به عنوان منبع گرمایشی استفاده کرده‌اند. ایرانی‌ها به عنوان مثال از چیدمان و طرح‌های خاص برای پنجره‌ها، بالکن‌ها و حیاط‌ها استفاده می‌کنند تا بیشترین نور خورشید را جذب کنند. انواع متفاوت از مواد هم ممکن است برای ساختمان‌ها استفاده شوند. این (کار) مردم را در طول فصل‌های سرد گرم کرده و در طول روزهای گرم سال، خنک نگه می‌دارد.",
      },
      {
        en: "Nowadays, solar energy can be converted into other forms of energy, such as heat and electricity. Solar energy might be used for heating water and air in homes, buildings, or swimming pools. Maybe you’ve seen buildings or houses with big shiny panels on the roof. These are solar collectors that collect heat by absorbing sunlight and producing solar power. Also, solar energy can be used in generating electricity to provide power for watches, highway signs, houses and even space stations.",
        fa: "امروزه انرژی خورشیدی می‌تواند به انواع دیگر انرژی تبدیل شود، از قبیل گرما و الکتریسیته. انرژی خورشیدی ممکن است برای گرم کردن آب و هوا در خانه‌ها، ساختمان‌ها، یا استخرهای شنا استفاده شود. ممکن است شما ساختمان‌ها یا خانه‌هایی با صفحه‌های بزرگ درخشان در پشت بام دیده باشید. این صفحه‌ها گردآورنده انرژی خورشیدی هستند که گرما را با جذب کردن نور آفتاب جمع‌آوری کرده و انرژی خورشیدی تولید می‌کنند. همچنین انرژی خورشیدی می‌تواند برای تولید برق برای ساعت‌ها، تابلوهای بزرگراه‌ها، خانه‌ها و حتی ایستگاه‌های فضایی استفاده شود.",
      },
      {
        en: "Clean energy resources are widely used in many countries to keep cities and villages clean. As a result, fewer fossil fuels are consumed each year and they are saved for the future generations.",
        fa: "منابع انرژی پاک به صورت گسترده‌ای در بسیاری از کشورها برای پاکیزه نگه داشتن روستاها و شهرها استفاده می‌شوند. در نتیجه، هر ساله سوخت‌های فسیلی کمتری استفاده شده و برای نسل‌های آینده ذخیره می‌شود.",
      },
    ],
  },
  {
    id: "r12-6",
    lesson: 3,
    title: "Electric Cars",
    titleFa: "اتومبیل‌های برقی",
    source: "کتاب کار — صفحه ۴۷ و ۴۸ (جزوه ص ۱۲۳)",
    paragraphs: [
      {
        en: "Many countries now think that cars that burn fossil fuels should be replaced by electric cars. Electric cars don’t burn gasoline in the engine, so they don’t pollute the air. They use electricity stored on the car in batteries.",
        fa: "امروزه بسیاری از کشورها فکر می‌کنند که اتومبیل‌های برقی باید جایگزین اتومبیل‌هایی شوند که سوخت فسیلی مصرف می‌کنند. اتومبیل‌های برقی بنزین را در موتور نمی‌سوزانند، بنابراین هوا را آلوده نمی‌کنند. آنها از برق استفاده می‌کنند که در باطری‌های ماشین ذخیره شده است.",
      },
      {
        en: "Sometimes, 12 or 24 batteries, or more, are needed to power the car. Just like a remote-controlled car, an electric car has an electric motor that turns the wheels and a battery to run the motor.",
        fa: "گاهی اوقات ۱۲ یا ۲۴ باطری، یا بیشتر، مورد نیاز است تا اتومبیل (به حرکت درآید). دقیقاً همانند یک اتومبیل کنترل از راه دور، اتومبیل برقی یک موتور برق دارد که چرخ‌ها را می‌چرخاند و (دارای) یک باطری است که موتور را به جریان می‌اندازد.",
      },
      {
        en: "Electricity, the same energy that lights your lamps and runs your TV, is stored in batteries on an electric car. The batteries can be like the batteries you find in flashlights or in regular gasoline cars.",
        fa: "برق که در باطری‌های یک اتومبیل برقی ذخیره شده است، همان انرژی است که لامپ‌هایتان را روشن کرده و تلویزیون‌تان را به کار می‌اندازد. باطری‌ها می‌توانند مشابه باطری‌هایی باشند که در چراغ‌قوه‌ها یا ماشین‌های بنزینی معمولی می‌بینید.",
      },
      {
        en: "To get the battery ready to roll, you have to charge it. This process isn’t much different from the way you charge the portable devices you carry around every day: your cell phone, MP3 player, or digital camera. The difference is that you deal with a much bigger gadget that carries you around instead.",
        fa: "برای اینکه باطری آماده کار شود باید آنرا شارژ کنید. این پروسه چندان با شیوه‌ای که هر روزه وسایل قابل حمل که با خود به اطراف می‌برید، متفاوت نیست: گوشی موبایل‌تان، پخش‌کننده موسیقی و دوربین دیجیتال. تفاوت این است که شما با یک وسیله‌ی بزرگی در ارتباط هستید که شما را با خود به اطراف می‌برد.",
      },
      {
        en: "The electric car is usually plugged in at night. The car can be plugged into a special charging unit even at houses. Some electric cars can be plugged right into a regular electrical wall outlet. Others need a larger outlet, like the kind that a stove or a vacuum cleaner plugs into.",
        fa: "اتومبیل برقی معمولاً در شب به برق وصل می‌شود. اتومبیل می‌تواند به یک واحد شارژ مخصوص حتی در خانه‌ها وصل شود. بعضی از اتومبیل‌های برقی می‌توانند به پریزهای معمولی برق روی دیوار وصل شوند. بقیه به یک پریز بزرگی نیاز دارند، همانند پریزهایی که گاز یا جاروبرق به آنها وصل می‌شوند.",
      },
      {
        en: "The engineers are trying to make better batteries that hold more energy and last longer. To overcome the problem of charging electric cars, hybrid cars are also available. Hybrid cars combine the benefits of gasoline engines and electric motors. They can be designed to meet different goals, such as better fuel economy or more power.",
        fa: "مهندسان دارند تلاش می‌کنند که باطری‌های بهتری را تولید کنند که انرژی بیشتری را در خود ذخیره کرده و بیشتر دوام داشته باشند. برای غلبه بر مشکل شارژ کردن اتومبیل‌های برق، اتومبیل‌های هیبریدی نیز موجود هستند. اتومبیل‌های هیبریدی مزیتهای موتورهای بنزینی و موتورهای برقی را با هم ترکیب کرده‌اند. آنها می‌توانند برای رسیدن به اهداف متفاوت، از قبیل راندمان بهتر سوخت و قدرت بیشتر، طراحی شوند.",
      },
    ],
  },
];
