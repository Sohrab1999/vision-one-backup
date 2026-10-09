// Reading passages — "Vision One" (جزوه جامع زبان انگلیسی پایه دهم)
// منبع: رونویسی VLM از جزوه — متن انگلیسی و ترجمه فارسی عیناً بدون تغییر رونویسی شده‌اند
// هر درس: یک متن کتاب درسی + یک متن کتاب کار

import type { Reading, ReadingParagraph } from "./types";

export const READING_LIST: Reading[] = [
  // ————— Lesson One —————
  {
    id: "r1-student",
    lesson: 1,
    title: "Endangered Animals",
    titleFa: "حیوانات در خطر انقراض",
    source: "کتاب درسی — صفحه ۲۲",
    paragraphs: [
      {
        en: "Today, there are some endangered animals on Earth. It means that we can find only a few of them around us. Some examples are whales, pandas, tigers and Asian elephants.",
        fa: "امروزه تعدادی از حیوانات روی زمین در خطر انقراض هستند (کم) یعنی ما فقط می‌توانیم تعداد کمی از آن‌ها را اطرافمان پیدا کنیم. برخی مثال‌ها نهنگ، پاندا، ببر و فیل آسیایی هستند. این به این معنی است که تعداد آن‌ها بسیار کم شده است.",
      },
      {
        en: "Humans destroy the natural homes of the animals in the forests, lakes and plains. When the number of people on earth increases, they need more places for living. They cut down trees and destroy lakes. They make homes and roads instead. Then the animals won’t have a place to live. They will die out.",
        fa: "انسان‌ها زیستگاه طبیعی حیوانات را در جنگل‌ها و دریاچه‌ها و دشت‌ها نابود می‌کنند. وقتی تعداد مردم روی زمین افزایش می‌یابد، آن‌ها به مکان‌های بیشتری برای زندگی نیاز دارند. آن‌ها درختان را قطع می‌کنند و دریاچه‌ها را نابود می‌کنند. آن‌ها به جای آن‌ها خانه و جاده می‌سازند. در این صورت حیوانات مکانی برای زندگی نخواهند داشت. آن‌ها منقرض خواهند شد.",
      },
      {
        en: "The Iranian cheetah is among these animals. This wild animal lives only in the plain of Iran. Now there are only a few Iranian cheetahs alive. If people take care of them, there is hope for this beautiful animal to live.",
        fa: "یوزپلنگ ایرانی یکی از این حیوانات است. این حیوان وحشی فقط در دشت‌های ایران زندگی می‌کند. الان تنها چند یوزپلنگ ایرانی زنده هستند. اگر مردم از آن‌ها مراقبت کنند، امید است که این حیوان زیبا زنده بماند.",
      },
      {
        en: "Recently, families pay more attention to nature, students learn about saving wildlife, and some hunters don’t go hunting anymore. In this way, the number of cheetahs is going to increase in the future.",
        fa: "اخیراً خانواده‌ها توجه بیشتری به طبیعت می‌کنند، دانش‌آموزان درباره نجات حیات وحش (ماهیان) و شکارچیان و شکار نمی‌روند. در این راه، تعداد یوزپلنگ‌ها در آینده افزایش خواهد یافت.",
      },
    ] satisfies ReadingParagraph[],
  },
  {
    id: "r1-workbook",
    lesson: 1,
    title: "Simple ways to protect wildlife",
    titleFa: "شناخت ساده راه‌های محافظت از حیات وحش",
    source: "کتاب کار — صفحه ۸",
    paragraphs: [
      {
        en: "One easy way to protect wildlife is learning about the endangered animals that live around you. Teach your friends and family about the wonderful birds, fish and plants that live near your home. In this way, they are going to be more careful about nature. You can also visit a national wildlife museum or park. These places give good information about how to protect endangered animals and their homes. You can do voluntary work in these places to help animals and their babies.",
        fa: "یک روش ساده برای محافظت از حیوانات، یادگیری درباره حیوانات در خطر انقراض (منقرض) است که در اطراف شما زندگی می‌کنند. به دوستان و خانواده خود درباره پرندگان، ماهیان و گیاهان شگفت‌انگیزی که نزدیک خانه شما زندگی می‌کنند، آموزش دهید. با این روش، آن‌ها (دوستان و خانواده) نسبت به طبیعت بیشتر مراقب خواهند بود. همچنین می‌توانید از موزه یا پارک ملی حیات وحش دیدن کنید. این مکان‌ها اطلاعات خوبی درباره نحوه محافظت از حیوانات در خطر انقراض و خانه‌های آن‌ها ارائه می‌دهند. این کار داوطلبانه را در این مکان‌ها انجام دهید تا به حیوانات و بچه‌هایشان کمک کنید.",
      },
      {
        en: "Another thing you can do is protecting the natural home of the endangered animals. When you keep nature clean and safe, the animals will live longer. Protecting the trees of forests is also helpful. If you live in a village, you need to be very careful about the hunters who come to your village to hurt animals. Whenever you see these people, you need to call the police. These are simple things, but they will help nature a lot.",
        fa: "کار دیگری که می‌توانید انجام دهید، محافظت از خانه طبیعی حیوانات در خطر انقراض است. وقتی طبیعت را تمیز و امن نگه دارید، حیوانات عمر طولانی‌تری خواهند داشت. محافظت از درختان جنگل‌ها نیز مفید است. اگر در روستا زندگی می‌کنید، باید بسیار مراقب شکارچیانی باشید که به روستای شما می‌آیند تا به حیوانات آسیب برسانند. هر زمان که این افراد را دیدید، باید با پلیس تماس بگیرید. این‌ها کارهای ساده‌ای هستند، اما به طبیعت خیلی کمک خواهند کرد.",
      },
    ] satisfies ReadingParagraph[],
  },
  // ————— Lesson Two —————
  {
    id: "r2-student",
    lesson: 2,
    title: "A Wonderful Liquid",
    titleFa: "یک مایع شگفت‌انگیز",
    source: "کتاب درسی — صفحه ۵۰",
    paragraphs: [
      {
        en: "The human body is a real wonder. It is sometimes good to think about our body and how it works. Our body is doing millions of jobs all the time.",
        fa: "بدن انسان واقعاً یک شگفت‌انگیز است. گاهی اوقات خوب است که درباره بدن خود و نحوه کارکرد آن فکر کنیم. بدن ما در هر لحظه میلیون‌ها کار را انجام می‌دهد.",
      },
      {
        en: "One of the most important parts of the body is blood. The heart pumps this red liquid around the body. This keeps us healthy and alive.",
        fa: "یکی از مهم‌ترین بخش‌های بدن، خون است. قلب، این مایع قرمز را در اطراف بدن پمپاژ می‌کند. این ما را سالم و زنده نگه می‌دارد.",
      },
      {
        en: "More than half of blood is plasma. This is a clear and yellow liquid. It carries red and white cells. There are millions of red blood cells in one small drop of blood. They carry oxygen round the body and collect carbon dioxide from body parts. There are thousands of white cells in a drop of blood. They are bigger than red cells. They defend our body against microbes.",
        fa: "بیش از نصف خون، پلاسما است. این یک مایع شفاف و زرد است. سلول‌های قرمز و سفید را حمل می‌کند. میلیون‌ها سلول خونی قرمز در یک قطره کوچک خون وجود دارند. آنها اکسیژن را در اطراف بدن حمل می‌کنند و دی‌اکسید کربن را از بخش‌های مختلف بدن جمع‌آوری می‌کنند. هزاران سلول سفید در یک قطره خون وجود دارند. آنها بزرگتر از سلول‌های قرمز هستند. آنها از بدن ما در برابر میکروب‌ها دفاع می‌کنند.",
      },
      {
        en: "This wonderful liquid is a great gift from Allah. We can thank Allah by keeping our body healthy. One way to do that is eating healthy food and doing daily exercises. Another way is to donate our blood to those who need it.",
        fa: "این مایع شگفت‌انگیز یک هدیه بزرگ از طرف خداوند است. ما می‌توانیم با حفظ سلامتی بدنمان از خداوند تشکر کنیم. یکی از راه‌های انجام این کار، خوردن غذای سالم و انجام ورزش روزانه است. راه دیگر اهدای خون ما به کسانی است که به آن نیاز دارند.",
      },
    ] satisfies ReadingParagraph[],
  },
  {
    id: "r2-workbook",
    lesson: 2,
    title: "Microbes",
    titleFa: "میکروب‌ها",
    source: "کتاب کار — صفحه ۲۶",
    paragraphs: [
      {
        en: "Microbes are really wonderful. They are everywhere! They live all around you, on you and inside you! Microbes are very small, so you can’t see them. But don’t worry. Some microbes make you sick but most others keep you healthy and even help you to fight disease.",
        fa: "میکروب‌ها واقعاً شگفت‌انگیز هستند... آن‌ها همه جا هستند! آن‌ها دور و بر شما، روی شما و حتی درون شما زندگی می‌کنند. میکروب‌ها خیلی کوچک هستند، پس نمی‌توانید آن‌ها را ببینید... اما نگران نباشید، برخی میکروب‌ها باعث بیماری شما می‌شوند اما اکثر دیگران شما را سالم نگه می‌دارند و حتی به شما در مبارزه با بیماری کمک می‌کنند.",
      },
      {
        en: "There are so many different types of microbes. We still don’t really know how many there are, but we know that microbes do lots of different things. Bacteria and viruses are two important types of microbes.",
        fa: "انواع مختلفی از میکروب‌ها وجود دارد. ما هنوز واقعاً نمی‌دانیم چند نوع هستند، اما می‌دانیم که میکروب‌ها کارهای مختلفی انجام می‌دهند (آفرین!). باکتری و ویروس دو نوع مهم میکروب‌ها هستند.",
      },
      {
        en: "Bacteria are really important microbes. They are very small. They have only one cell. Bacteria can live in any area of the earth. They aren’t all bad; in fact, you couldn’t live without some bacteria!",
        fa: "باکتری‌ها میکروب‌های واقعاً مهمی هستند. آن‌ها خیلی کوچک هستند. فقط یک سلول دارند. باکتری‌ها می‌توانند در هر ناحیه‌ای از زمین زندگی کنند. آن‌ها همه بد نیستند؛ در واقع، شما بدون برخی باکتری‌ها نمی‌توانید زندگی کنید!",
      },
      {
        en: "Viruses are among the smallest microbes on the earth, even smaller than bacteria. They are different from bacteria because they cannot live on their own. Viruses need to be inside a living cell to live and grow. There aren’t many good things about viruses - they usually attack your body and make you sick!",
        fa: "ویروس‌ها از جمله کوچک‌ترین میکروب‌ها روی زمین هستند، حتی کوچکتر از باکتری‌ها. آن‌ها با باکتری‌ها متفاوت هستند چون نمی‌توانند به تنهایی زندگی کنند. ویروس‌ها برای زنده ماندن و رشد کردن نیاز دارند که درون یک سلول زنده باشند (میزبان). چیزهای خوب زیادی درباره ویروس‌ها وجود ندارد - آن‌ها معمولاً به بدن شما حمله کرده و شما را بیمار می‌کنند!",
      },
    ] satisfies ReadingParagraph[],
  },
  // ————— Lesson Three —————
  {
    id: "r3-student",
    lesson: 3,
    title: "No Pain No Gain",
    titleFa: "بدون رنج نمی‌توان به دست آورد.",
    source: "کتاب درسی — صفحه ۸۰",
    paragraphs: [
      {
        en: "Human knowledge develops with scientists’ hard work. Many great men and women try hard to find facts, solve problems and invent things.",
        fa: "دانش بشری با تلاش دانشمندان توسعه می‌یابد. بسیاری از زنان و مردان بزرگ تلاش می‌کنند تا حقایق را کشف کنند، مشکلات را حل کنند و اختراعاتی انجام دهند.",
      },
      {
        en: "Some of these scientists did not have easy lives. But they tried hard when they were working on problems. They never felt weak when they were studying. They never gave up when they were doing research.",
        fa: "برخی از این دانشمندان زندگی آسانی نداشتند. اما آن‌ها هنگام تلاش برای حل مشکلات کوتاه نیامدند. آن‌ها هرگز هنگام مطالعه احساس ضعف نکردند. آن‌ها هرگز هنگام تحقیق تسلیم نشدند.",
      },
      {
        en: "There are great stories about scientists and their lives. One such a story is about Thomas Edison. As a young boy, Edison was very interested in science. He was very energetic and always asked questions. Sadly, young Edison lost his hearing at the age of 12. He did not attend school and learned science by reading books in the library himself.",
        fa: "داستان‌های بزرگی درباره دانشمندان و زندگی آن‌ها وجود دارد. یکی از این داستان‌ها درباره توماس ادیسون است. ادیسون در دوران کودکی بسیار به علم علاقه داشت. او بسیار پرانرژی بود و همیشه سؤال می‌پرسید. متأسفانه، ادیسون جوان در سن ۱۲ سالگی شنوایی خود را از دست داد. او به مدرسه نرفت و با خواندن کتاب‌ها در کتابخانه، خودش را آموزش دید.",
      },
      {
        en: "When he grew up, he worked in different places, but he never lost his interest for making things. Edison was famous for doing thousands of experiments to find answers to problems. He said, “I never quit until I get what I’m after”.",
        fa: "وقتی بزرگ شد، در مکان‌های مختلف کار کرد، اما هرگز علاقه خود را برای ساخت چیزها از دست نداد. ادیسون به دلیل انجام هزاران آزمایش برای پیدا کردن پاسخ مسائل مشهور بود. او گفت: «هرگز تسلیم نمی‌شوم تا اینکه به چیزی که می‌خواهم برسم».",
      },
      {
        en: "Edison had more than 1,000 inventions and was very successful at the end of his life. Many great names had stories like this.",
        fa: "ادیسون بیش از ۱۰۰۰ اختراع داشت و در پایان زندگی خود بسیار موفق بود. اسامی بزرگی زیادی داستان‌هایی مانند ادیسون دارند.",
      },
      {
        en: "But the key to their success is their hard work and belief in themselves. If you want to get what you want, work hard and never give up.",
        fa: "اما کلید موفقیت آن‌ها تلاش سخت و ایمان به خودشان است. اگر می‌خواهید به چیزی که می‌خواهید برسید، ایستادگی کنید و هرگز تسلیم نشوید.",
      },
    ] satisfies ReadingParagraph[],
  },
  {
    id: "r3-workbook",
    lesson: 3,
    title: "Who is a scientist?",
    titleFa: "کی دانشمند است؟",
    source: "کتاب کار — صفحه ۴۴",
    paragraphs: [
      {
        en: "The world around us is full of amazing things. Knowing this beautiful world is very interesting for humans. One group of people who study the world are scientists. A scientist studies nature, animals, or people. Scientists work hard and do research to solve problems, find facts or invent new things. Scientists learn about the world by observing and experimenting.",
        fa: "جهان اطراف ما پر از چیزهای شگفت‌انگیز است. شناخت این دنیای زیبا برای انسان‌ها بسیار جالب است. یک گروه از افرادی که دنیا را مطالعه می‌کنند، دانشمندان هستند. دانشمند طبیعت، حیوانات یا انسان‌ها را مطالعه می‌کند. دانشمندان سخت کار می‌کنند و تحقیق می‌کنند تا مشکلات را حل کنند، حقایق را پیدا کنند یا چیزهای جدید اختراع کنند. دانشمندان با مشاهده و آزمایش کردن دربارهٔ جهان یاد می‌گیرند.",
      },
      {
        en: "There are different types of scientists. Some of them study plants, earth, seas, or animals. Others study people and how they behave and learn. Some scientists like to study history or languages. Others are interested in making new things. They want to make people's lives easier.",
        fa: "انواع مختلفی از دانشمندان وجود دارد. برخی از آن‌ها گیاهان، زمین، دریاها یا حیوانات را مطالعه می‌کنند. دیگران انسان‌ها و اینکه چگونه رفتار می‌کنند و یاد می‌گیرند را مطالعه می‌کنند. برخی دانشمندان دوست دارند تاریخ یا زبان‌ها را مطالعه کنند. دیگران علاقه‌مند به ساختن چیزهای جدید هستند. آن‌ها می‌خواهند زندگی مردم را آسان‌تر کنند.",
      },
      {
        en: "Some scientists become very rich and famous. Many people around the world may remember their names and faces. But this is not what they call 'success'. They feel successful when they solve problems and find answers to their questions.",
        fa: "برخی از دانشمندان بسیار ثروتمند و مشهور می‌شوند. بسیاری از مردم در سراسر جهان ممکن است نام و صورت آن‌ها را به خاطر بسپارند. اما این چیزی نیست که آن‌ها آن را \"موفقیت\" می‌نامند. آن‌ها وقتی مشکل را حل می‌کنند و به سوالات خود پاسخ می‌یابند، احساس موفقیت می‌کنند.",
      },
    ] satisfies ReadingParagraph[],
  },
  // ————— Lesson Four —————
  {
    id: "r4-student",
    lesson: 4,
    title: "Iran: A True Paradise",
    titleFa: "ایران: یک بهشت واقعی",
    source: "کتاب درسی — صفحه ۱۰۵",
    paragraphs: [
      {
        en: "Every year, about one billion tourists travel around the world. Tourism is traveling for entertainment, health, sport or learning about the culture of a nation. Tourism can be domestic or international. Domestic tourists travel to different parts of their own country. International tourists travel abroad.",
        fa: "هر ساله حدود یک میلیارد گردشگر در سراسر جهان سفر می‌کنند. گردشگری، سفر به منظور سرگرمی، سلامتی، ورزش یا یادگیری فرهنگ یک ملت است. گردشگری می‌تواند داخلی یا بین‌المللی باشد. گردشگران داخلی به نقاط مختلف کشور خود سفر می‌کنند. گردشگران بین‌المللی به خارج از کشور سفر می‌کنند.",
      },
      {
        en: "Some countries attract a lot of tourists every year. Egypt is one of the oldest countries of Africa. It is famous for its wonderful pyramids.",
        fa: "برخی از کشورها هر ساله تعداد زیادی گردشگر را جذب می‌کنند. مصر یکی از قدیمی‌ترین کشورهای آفریقا است. این کشور به دلیل هرم‌های شگفت‌انگیزش معروف است.",
      },
      {
        en: "France, Italy and Spain are three beautiful European countries. They attract many tourists from other parts of the world. Brazil, Peru and Chile are in South America. They are famous for their ancient history and amazing nature.",
        fa: "فرانسه، ایتالیا و اسپانیا سه کشور زیبای اروپایی هستند. آن‌ها گردشگران زیادی را از نقاط دیگر جهان جذب می‌کنند. برزیل، پرو و شیلی در آمریکای جنوبی قرار دارند. آن‌ها به خاطر تاریخ باستانی و طبیعت شگفت‌انگیزشان معروف هستند.",
      },
      {
        en: "In Asia, Iran is a great destination for tourists. This beautiful country is a true paradise for people of the world. Each year, many people from all parts of the world visit Iran’s attractions. Iran is a four- season country and tourists can find a range of activities from skiing to desert touring in different parts of the country. Many Muslims also travel to Iran and go to holy shrines in Mashhad, Qom and Shiraz. Iranian people are hospitable and kind to travelers and tourists.",
        fa: "در آسیا، ایران مقصدی عالی برای گردشگران است. این کشور زیبا، یک بهشت واقعی برای مردم جهان است. هر ساله، افراد بسیاری از تمام نقاط جهان از جاذبه‌های ایران دیدن می‌کنند. ایران کشوری چهارفصل است و گردشگران می‌توانند مجموعه‌ای از فعالیت‌ها را از اسکی تا گردشگری در بیابان در نقاط مختلف کشور پیدا کنند. بسیاری از مسلمانان نیز به ایران سفر می‌کنند و به اماکن مقدس در مشهد، قم و شیراز می‌روند. مردم ایرانی با مهمان‌نوازی و مهربانی با مسافران و گردشگران رفتار می‌کنند.",
      },
    ] satisfies ReadingParagraph[],
  },
  {
    id: "r4-workbook",
    lesson: 4,
    title: "How to be a good traveler",
    titleFa: "چگونه مسافر خوبی باشیم",
    source: "کتاب کار — صفحه ۶۲",
    paragraphs: [
      {
        en: "Travel is about visiting new places and meeting new people. When visiting a destination, a traveler should take care of people, places and cultures. So, before any travel, we must pay attention to some points.",
        fa: "مسافرت (به معنی) بازدید کردن از مکان‌ها و ملاقات افراد جدید است. هنگام بازدید از یک مقصد، مسافر باید به افراد، مکان‌ها و فرهنگ‌ها توجه داشته باشد. بنابراین، ما باید قبل از هر سفر به چند نکته توجه کنیم.",
      },
      {
        en: "First, we must read as much as possible about the main tourist attractions we are going to visit. Searching the Internet is an easy way to know about them. Also, learning a few words and phrases of the local language can be very useful, especially when we meet new people there.",
        fa: "اول از همه، ما باید تا جایی که امکان دارد درباره جاذبه‌های اصلی گردشگری که قصد دیدن آن‌ها را داریم، مطالعه کنیم. جستجو در اینترنت ساده‌ترین راه برای آگاهی پیدا کردن درباره آن‌ها است. همچنین، یادگیری چند کلمه و عبارت زبان محلی می‌تواند بسیار مفید باشد، به خصوص زمانی که با افراد جدیدی آنجا ملاقات می‌کنیم.",
      },
      {
        en: "When we meet local people, we must not forget that we are guests! So, we must respect their way of living. When visiting historical and especially holy places, we must respect them, too. When we visit natural places such as lakes, forests and deserts, we must protect the plants and wild animals. In this way, every travel can be a great experience for us.",
        fa: "وقتی که با مردم محلی ملاقات می‌کنیم، نباید فراموش کنیم که ما مهمان هستیم! پس، ما باید به سبک زندگی آن‌ها احترام بگذاریم. در حال بازدید از مکان‌های تاریخی و به خصوص مقدس نیز باید به آن‌ها احترام بگذاریم. وقتی که از مکان‌های طبیعی مانند دریاچه‌ها، جنگل‌ها و بیابان‌ها دیدن می‌کنیم، باید گیاهان و حیوانات وحشی را حفظ کنیم. در این صورت، هر سفر می‌تواند یک تجربه بزرگ برای ما باشد.",
      },
    ] satisfies ReadingParagraph[],
  },
];
