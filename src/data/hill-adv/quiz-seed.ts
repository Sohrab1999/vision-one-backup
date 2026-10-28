// سؤالات درست/نادرست درک مطلب — از خود داستان‌های Advanced Steps to Understanding
// گزینه‌ها ۲تایی هستند (True/False) و پاسخ‌ها از متن داستان استخراج شده‌اند.
// سؤال‌های داستان‌های ۳، ۱۴، ۱۸ و ۲۴ تا ۳۰ در quiz-seed-extra.ts هستند.
import type { QuizQuestionSeed } from "../types";
import { EXTRA_QUIZ } from "./quiz-seed-extra";

const BASE_QUIZ: QuizQuestionSeed[] = [
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "People who wanted a driving-licence had to have a test first.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "داستان می‌گوید هری مارش کارشناس آزمون رانندگی بود که باید افرادی را که می‌خواستند گواهینانه بگیرند، امتحان می‌کرد."
  },
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "If a driver could check all the things like lights and brakes, Harry passed him.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "هری فقط چک کردن وسایل را امتحان نکرد، بلکه از راننده خواست که رانندگی کند و چند مانور انجام دهد."
  },
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "The young man had a lot of faults in his performance.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "راننده همه چیز را سریع و بدون هیچ نقصی انجام داد و حتی یک کلمه هم نگفت."
  },
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "Harry gave the young man a driving test by mistake.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "راننده فقط برای نگاه کردن به نقشه متوقف شده بود و اصلاً برای آزمون رانندگی نیامده بود."
  },
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "Harry asked the young man to drive him to his office because he was late.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "هری نمی‌داند که راننده برای آزمون نیامده است، بلکه فکر می‌کند او متقاضی گواهینامه است."
  },
  {
    "category": "grammar",
    "lesson": 1,
    "scope": "داستان ۱ — درست/نادرست",
    "text": "The young man had not really come to have a driving test.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "راننده به هری می‌گوید که فقط برای نگاه کردن به نقشه متوقف شده بود و برای آزمون نیامده است."
  },
  {
    "category": "grammar",
    "lesson": 2,
    "scope": "داستان ۲ — درست/نادرست",
    "text": "George was a journalist.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "جرج روزنامه‌نگار بود و برای یک روزنامه کار می‌کرد."
  },
  {
    "category": "grammar",
    "lesson": 2,
    "scope": "داستان ۲ — درست/نادرست",
    "text": "James Bright was a reporter too.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "جیمز برایت یک سیاستمدار بود، نه یک روزنامه‌نگار."
  },
  {
    "category": "grammar",
    "lesson": 2,
    "scope": "داستان ۲ — درست/نادرست",
    "text": "George did not have a high opinion of James Bright.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "جرج گفت برایت یک پیرمرد احمق است و هرگز چیزی نمی‌گوید که ارزش گزارش کردن داشته باشد."
  },
  {
    "category": "grammar",
    "lesson": 2,
    "scope": "داستان ۲ — درست/نادرست",
    "text": "James Bright spoke for a long time.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "برایت دو ساعت بدون توقف صحبت کرد."
  },
  {
    "category": "grammar",
    "lesson": 2,
    "scope": "داستان ۲ — درست/نادرست",
    "text": "George's boss told him to write quite a lot about his speech.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مدیر به جرگ گفت بیش از دو و نیم ستون ننویسد، یعنی کم بنویسد، نه زیاد."
  },
  {
    "category": "grammar",
    "lesson": 4,
    "scope": "داستان ۴ — درست/نادرست",
    "text": "Mr Edwards was for the Labour Party.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف اول明确提到 آقای ادواردز از حزب کارگران حمایت می‌کرد."
  },
  {
    "category": "grammar",
    "lesson": 4,
    "scope": "داستان ۴ — درست/نادرست",
    "text": "The third man was on Mr Edwards's side.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم明确提到 مرد سوم از محافظه‌کاران حمایت می‌کرد، نه از حزب کارگران."
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "Part of the show at the Scala Theatre was a popular entertainment by a young man who played the trumpet.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "موسیقی‌دان مستقل بود و بخشی از نمایش تئاتر نبود."
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "The young musician got quite a lot of money from the people in the queue.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "متن می‌گوید «صف از موسیقی او لذت بردند و مقدار پول خوبی را در جعبه‌ای قرار دادند»."
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "He played better than the usual beggars.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مرد صف به او گفت: «تو آنقدر خوب می‌نوازی که نباید گدایی کنی.»"
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "He played the trumpet in the band at the Scala Theatre.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او در حال تحصیل برای نوازندگی در یک ارکستر بزرگ بود، نه اینکه در ارکستر تئاتر اسکالا نوازندگی کند."
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "He played in his small room in good weather with his windows open to get fresh air.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او در هوای آزاد تمرین می‌کرد، نه در اتاقش با پنجره‌های باز."
  },
  {
    "category": "grammar",
    "lesson": 5,
    "scope": "داستان ۵ — درست/نادرست",
    "text": "When the weather was nice, he always used to go to the bank to get a bit of money.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او در خیابان برای تمرین و کسب درآمد نواختن می‌کرد، نه در بانک."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "An old gentleman brought a hearing-aid into the shop where Mr Richards worked.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مرد مسن یک دستگاه کم‌شنوایی را به فروشگاه آورد."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "The man did not answer Mr Richards's question because he was deaf.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مرد جواب نداد چون ناشنوا نبود، بلکه نمی‌توانست حرف بزند."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "Mr Richards wrote his question down because the old gentleman could not hear him.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "آقای ریچاردز سوالش را گفت، نه اینکه بنویسد."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "The old gentleman answered Mr Richards's question in writing.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مرد مسن با نوشتن روی کاغذ به آقای ریچاردز پاسخ داد."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "The hearing-aid was the old gentleman's.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "دستگاه کم‌شنوایی همسر مرد بود، نه خودش."
  },
  {
    "category": "grammar",
    "lesson": 6,
    "scope": "داستان ۶ — درست/نادرست",
    "text": "The old gentleman couldn't speak.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مرد مسن نمی‌توانست حرف بزند چون تازه عمل گلو داشته است."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "Mrs Grey's dogs had run after a neighbour's chickens.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در متن آمده است که سگ‌های همسایه به باغ خانم گری آمده‌اند و سبزی‌های او را خراب کرده‌اند."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "The judge was afraid that Mrs Grey and her neighbour might settle the matter between themselves.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "قاضی امیدوار بود خانم گری و همسایه‌شان بتوانند مسئله را حل کنند، نه اینکه از آن بترسند."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "Mrs Grey's lawyer asked her how much money she wanted.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "وکیل خانم گری از او پرسید چقدر پول می‌خواهد، نه اینکه خودش پول خواسته باشد."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "Mrs Grey did not understand him, because she was deaf.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در متن آمده است که خانم گری ناشنوا بود و چیزی که وکیل می‌گفت نشنید."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "She thought the judge had offered her a drink.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "خانم گری فکر کرد قاضی به او پیشنهاد نوشیدنی داده است، در حالی که منظور قاضی پول بود."
  },
  {
    "category": "grammar",
    "lesson": 7,
    "scope": "داستان ۷ — درست/نادرست",
    "text": "The judge had really asked her what she would like to drink.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "قاضی از خانم گری پخواست بداند چقدر پول می‌خواهد، نه اینکه از او بخواهد چیزی بنوشد."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "The man in this story wanted to live in the country, but work in London.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مرد می‌خواست در روستا زندگی کند اما در لندن کار کند."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "He wanted to live near a station.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او به دنبال خانه‌ای بود که به ایستگاه قطار نزدیک باشد."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "He saw an advertisement for a house near a station.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او آگهی خانه‌ای در همپشایر را دید که ادعا می‌کرد نزدیک ایستگاه است."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "He saw an advertisement for a house near his office.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "آگهی درباره خانه‌ای نزدیک دفتر کار او نبود، بلکه نزدیک ایستگاه قطار بود."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "He went from London to Hampshire with the house agent.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او با قطار به همپشایر رفت، نه با نماینده آژانس."
  },
  {
    "category": "grammar",
    "lesson": 8,
    "scope": "داستان ۸ — درست/نادرست",
    "text": "The house was not really only a stone's throw from the station.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "خانه حداقل یک کیلومتر با ایستگاه فاصله داشت، نه یک پرتاب سنگ."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "The famous writer spoke Japanese well.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "از متن داستان برمی‌آید که دانشجویان انگلیسی شفاهی را درک نمی‌کردند."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "He told the students a long funny story.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم آمده است که او یک داستان خنده‌دار و طولانی تعریف کرد."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "The interpreter took rather a long time to tell the story.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مترجم داستان را در چند ثانیه ترجمه کرد، نه مدت طولانی."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "The interpreter told the students a different funny story.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مترجم داستان نویسنده را به ژاپنی کوتاه کرد، نه یک داستان متفاوت."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "The students did not understand the lecturer's funny story at all.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "دانجویان انگلیسی را نمی‌فهمیدند و فقط به دستور مترجم خندیدند."
  },
  {
    "category": "grammar",
    "lesson": 9,
    "scope": "داستان ۹ — درست/نادرست",
    "text": "The students laughed because the interpreter told them to.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "مترجم به آن‌ها گفت بخندند و آن‌ها هم خندیدند، نه به خاطر داستان."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mrs Elphinstone was better at gardening than Mr Williams.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان می‌گوید خانم الفینستون هیچی درباره باغ‌ها نمی‌دانست."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mrs Elphinstone interfered in gardening affairs, because she knew nothing about gardening, and wanted to learn.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "خانم الفینستون مداخله می‌کرد چون فکر می‌کرد خیلی می‌داند، نه برای اینکه یاد بگیرد."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mr Williams called her an elephant because she was old and rich.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان نمی‌گوید آقویلیامز به خاطر پیر بودن و ثروتمند بودن او را فیل خواند."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mr Williams called her an elephant because she was fat and because her name was Elphinstone.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "داستان می‌گوید خانم الفینستون چاق بود و نامش الفینستون بود."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mrs Elphinstone sent Mr Williams to a lawyer.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "خانم الفینستون خودش به وکیل مراجعه کرد، نه اینکه آقویلیامز را بفرستد."
  },
  {
    "category": "grammar",
    "lesson": 10,
    "scope": "داستان ۱۰ — درست/نادرست",
    "text": "Mrs Elphinstone won the court case.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "قاضی آقویلیامز را مجرم شناخت، پس خانم الفینستون دادگاه را برنده شد."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "The Christian group's motto meant that life is full of hope.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "شعار گروه مسیحی که می‌گفت «هیچ مشکلی وجود ندارد. فقط فرصت‌ها وجود دارند» نشان‌دهنده امیدواری به زندگی است."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "The Christian group believed that one should think more about what can be done than about what can't be done.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "گروه معتقد بودند مردم باید بیشتر درباره چیزهایی که به انجام کارهای نیک کمک می‌کنند فکر کنند نه موانع."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "The Christian group believed that it was very difficult to do good deeds.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان نشان نمی‌دهد که گروه مسیحی انجام کارهای نیک را دشوار می‌دانستند، بلکه معتقد بودند روی فرصت‌ها تمرکز کنند."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "A man came to the inquiries desk to ask some questions about the conference.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مرد به میز اطلاعات آمد تا مشکلش را گزارش دهد، نه برای پرسیدن سؤالات درباره کنفرانس."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "The girl behind the desk refused to accept that the man had a problem.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "دختر پشت میز با اشاره به شعار گروه، گفت که مرد مشکلی ندارد و فقط یک فرصت دارد."
  },
  {
    "category": "grammar",
    "lesson": 11,
    "scope": "داستان ۱۱ — درست/نادرست",
    "text": "The man thought the young woman in his room was an opportunity not a problem.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مرد در واقع مشکل داشت و حضور زن در اتاقش را مشکل می‌دانست، نه فرصت."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "The captain knew that coast well, but he was a careful man.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "کاپیتان با ساحل ناآشنا بود، نه با آن آشنا."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "He went into a port to find someone who knew the coast.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او به خشکی رفت تا کسی را پیدا کند که با ساحل آشنا باشد."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "He found a qualified pilot to guide him.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او یک ماهیگیر بود که وانمود می‌کرد ناخدا است، نه یک ناخدا واقعی."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "A fisherman wanted to earn some money by acting as a pilot.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او به پول نیاز داشت و با نقش ناخدا پول به دست می‌آورد."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "The fisherman knew every rock on that part of the coast.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او ادعا کرد که هر صخره‌ای را در آن قسمت از ساحل می‌شناسد."
  },
  {
    "category": "grammar",
    "lesson": 12,
    "scope": "داستان ۱۲ — درست/نادرست",
    "text": "He let the captain steer the ship right on to a rock.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او کشتی را مستقیماً به یک صخره هدایت کرد که باعث ترکیدن کشتی شد."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "A seaside holiday town found a band to entertain visitors.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف اول آمده است که شهرهای مختلف برای تعطیل‌کنندگان برنامه‌های تفریزی ترتیب می‌دهند."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "It played indoors when it rained.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم آمده است که گروه موسیقی در فضای باز پارک اجرا می‌کرد، نه در داخل."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "The band were protected from rain.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم آمده است که گروه موسیقی زیر سرپناه بود، اما تماشاچیان نبودند."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "There were a lot of people in the audience.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم آمده است که تنها یک نفر در تماشاچیان حضور داشت."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "The conductor of the band asked the keeper of the park to lock the gates when they finished.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "رهبر گروه از نگهبان پارک پرسید که آیا درخواست خاصی دارد، نه اینکه از او بخواهد درها را قفل کند."
  },
  {
    "category": "grammar",
    "lesson": 13,
    "scope": "داستان ۱۳ — درست/نادرست",
    "text": "The keeper could not leave until the band finished.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف چهارم آمده است که نگهبان پارک می‌خواهد درها را قفل کند و به خانه برود، پس نمی‌تواند تا پایان اجرا بماند."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "Nobody wanted to annoy the admiral because he was a nice old man.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "امیر به خاطر خلق بدش معروف بود، نه به خاطر اینکه مرد خوبی بود."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "His cruiser was going to take part in an exercise with ships of other countries.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "داستان می‌گوید کشتی‌هایش قرار بود در یک تمرین بین‌المللی شرکت کنند."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "On the first morning he could not find the second cruiser.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "امیر فقط یک ناوچه را در گروهش دید و از نبودن دومی ناراحت شد."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "Nobody dared tell him that it had not arrived.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان نمی‌گوید ناوچه نرسیده بود، بلکه نشان می‌دهد امیر خودش روی ناوچه دوم بود."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "At last a young sailor told him that the cruiser was hiding.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "ملوان گفت امیر روی ناوچه دوم است، نه اینکه آن پنهان شده باشد."
  },
  {
    "category": "grammar",
    "lesson": 15,
    "scope": "داستان ۱۵ — درست/نادرست",
    "text": "The old admiral was on the second cruiser.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "امیر روی ناوچه اول بود، نه روی ناوچه دوم که خودش به دنبالش می‌گشت."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "Miss Jones helps her pupils to enjoy their work.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او همیشه تلاش می‌کند کار را جالب و خنده‌دار کند."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "One day she asked them to buy her some carrots in the market.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او از آن‌ها خواسته بود مسئله ریاضی را حل کنند، نه برایش هویج بخرند."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "The pupils worked very fast.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "برای مدت طولانی کسی حرفی نزد و بعد یکی از بچه‌ها درخواست تکرار سوال کرد."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "One boy thought she had not heard Miss Jones's question correctly.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او فکر نکرده بود سوال را اشتباه شنیده باشد، بلکه خواسته بود دوباره بشنود."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "He thought she had said 'cabbages' instead of 'carrots'.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او فکر می‌کرده خانم جونز گفته بود «کلم» به جای «هویج»."
  },
  {
    "category": "grammar",
    "lesson": 16,
    "scope": "داستان ۱۶ — درست/نادرست",
    "text": "The reason why he had not been able to get the answer was that he had been trying to work it out in 'cabbages'.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او در حال تلاش برای حل مسئله با کلم بود، نه هویج، و به همین دلیل نمی‌توانست جواب را پیدا کند."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "Mr Andrews was unemployed after he left the university.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "آقاندروز پس از دانشگاه شغل خوبی در شرکت نفت پیدا کرد، بیکار نبود."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "Mr Andrews was an ambitious man.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او به دنبال جایگاه مهم‌تر، پول بیشتر و کار جالب‌تر بود که نشون‌دهنده‌ی طمع و جاه‌طلبی است."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "He preferred a quiet, easy job.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او به دنبال شغل مهم‌تر و جالب‌تری بود، نه شغل آرام و آسان."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "He was willing to take responsibility.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او به دنبال موقعیت مهم‌تری بود که نشان می‌دهد حاضر به مسئولیت بیشتر است."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "The man who wrote to him was satisfied with his own job at that time.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مرد دیگر به دنبال شغل آقاندروز بود، نه اینکه از شغل خودش راضی باشد."
  },
  {
    "category": "grammar",
    "lesson": 17,
    "scope": "داستان ۱۷ — درست/نادرست",
    "text": "The other man was looking for a better job than Mr Andrews was.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مرد دیگر به دنبال شغل مشابه شغل آقاندروز بود، نه شغل بهتر."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "Miss Richards was a science teacher.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "خانم ریچاردز شیمی و فیزیک تدریس می‌کرد که علوم هستند."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "She only taught the classes of small children.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او از پایه‌ترین تا پیشرفته‌ترین کلاس‌ها را تدریس می‌کرد، نه فقط کلاس‌های کوچکان."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "Some of the lowest classes learn fast, and some learnt slowly.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "متن می‌گوید گاهی کلاس‌های جدید به سرعت یاد می‌گیرند و گاهی بسیار کند هستند."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "Miss Richards was unhappy when the children could not answer her questions.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "وقتی چند ثانیه سکوت شد، خانم ریچاردز احساس ناامیدی کرد."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "She was happiest when one of the least clever children could answer.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "او خوشحال بود که دیک می‌تواند جواب دهد، زیرا او یکی از باهوش‌ترین بچه‌ها نبود."
  },
  {
    "category": "grammar",
    "lesson": 19,
    "scope": "داستان ۱۹ — درست/نادرست",
    "text": "Dick gave the answer Miss Richards expected.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "دیکی پاسخ داد که آب سیاه می‌شود، در حالی که خانم ریچاردز انتظار پاسخ درستی داشت."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "Mrs Edwards saw a car crash into a tree, and two other cars run into each other.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "دو ماشین به هم برخورد کردند، نه اینکه یکی به درخت برخورد کند."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "She told a policeman that she had seen the crash.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "خانم ادواردز یکی از کسانی بود که گفت تصادف را دیده است."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "She refused to go to court to be a witness.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "خانم ادواردز حاضر بود در دادگاه شهادت دهد."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "The lawyer did not want to give Mrs Edwards time to think before she answered his questions.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "وکیل از خانم ادواردز خواست بدون فکر کردن پاسخ دهد."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "The lawyer meant that he wanted Mrs Edwards to give facts, not opinions.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "وکیل می‌خواست حقایق را بشنود، نه نظرات شخصی."
  },
  {
    "category": "grammar",
    "lesson": 20,
    "scope": "داستان ۲۰ — درست/نادرست",
    "text": "Mrs Edwards was suggesting that lawyers say things without thinking.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "خانم ادواردز اشاره کرد که وکلا ممکن است بدون فکر حرف بزنند، نه اینکه این کار را انجام می‌دهند."
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "Joan was in the armed forces during World War Two.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف اول داستان آمده است که جوان فیلیپس یکی از زنانی بود که در جنگ جهانی دوم در ارتش بریتانیا بود."
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "Joan knew Captain Humphreys for a long time.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان نشان می‌دهد که جوان فقط یک شب با کاپیتان همفریز ملاقات کرد و سپس فقط برای چند ماه با او نامه نوشت."
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "The Captain stopped writing to Joan.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف سوم آمده است که نامه‌های کاپیتان متوقف شد."
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "Joan went to visit the Captain.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف چهارم مشخص است که جوان به بیمارستان نظامی برای دیدن کاپیتان همفریز رفت."
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "Only relations could see officers in the hospital.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "ماترون در پاراگراف پنجم گفت: «فقط اعضای خانواده اجازه دارند بیماران را اینجا ملاقات کنند.»"
  },
  {
    "category": "grammar",
    "lesson": 21,
    "scope": "داستان ۲۱ — درست/نادرست",
    "text": "Joan was the matron's daughter.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "ماترون در پاراگراف هفتم گفت: «من مادر او هستم!» نه اینکه جوان دختر او باشد."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "Mrs Black sent notices to her relatives and friends.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف اول آمده که اطلاعیه‌ها برای اقوام و دوستان فرستاده شد."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "A lot of people came to the funeral.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "در پاراگراف اول اشاره شده که اقوام و دوستان از دور و نزدیک آمدند."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "Mrs Black was buried in her old church.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم آمده که خانم بلک در کلیسا دفن نشد، بلکه در باغش به خاک سپرده شد."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "The men walked behind the hearse, but the women and children did not.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در پاراگراف دوم گفته شده که زنان و کودکان در ماشین‌ها و مردان پیاده پشت تابوت حرکت می‌کردند."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "The poorly dressed man had been a cousin of Mrs Black's.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "در داستان اشاره نشده که مرد فقیر فاملی از خانم بلک بوده باشد."
  },
  {
    "category": "grammar",
    "lesson": 22,
    "scope": "داستان ۲۲ — درست/نادرست",
    "text": "The poorly dressed man was crying because he would not get anything from the dead woman.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "از پاسخ مرد در پاراگراف هفبر مشخص است که او به این دلیل گریه می‌کرد که چیزی از زن مرده به ارث نمی‌برد."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "John decided to go south because he was out of work and had no money.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "جان تصمیم به رفتن به جنوب گرفت چون بیکار بود و پولش تمام شده بود."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "He had heard that there were more jobs to be found in southern England.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "او شنیده بود که در جنوب انگلیس پیدا کردن کار آسان‌تر است."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "He bought a ticket and went by train.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "داستان مشخص نمی‌کند که جان بلیت خریده باشد، در واقع بعداً مشخص می‌شود او بلیت نداشته است."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "A man who was sitting beside him in the train asked him for his money.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "مردی که وارد compartments شد کنار او نمی‌نشست، بلکه با اسلحه وارد compartments او شد."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "John was trembling because he was afraid of the man's gun.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "level": "آموزشی",
    "explanation": "جان از ترس اسلحه لرزید، اما دلیل اصلی لرزشش ترس از بلیت‌بین بود."
  },
  {
    "category": "grammar",
    "lesson": 23,
    "scope": "داستان ۲۳ — درست/نادرست",
    "text": "John was trembling because he was afraid of the ticket-collector.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "level": "آموزشی",
    "explanation": "جان به دلیل نداشتن بلیت از بلیت‌بین می‌ترسید، نه از مرد مسلح."
  }
];

export const QUIZ_SEED: QuizQuestionSeed[] = [...BASE_QUIZ, ...EXTRA_QUIZ];

export const QUESTION_COUNTS: Record<string, number> = {
  grammar: QUIZ_SEED.filter((q) => q.category === "grammar").length,
  vocabulary: QUIZ_SEED.filter((q) => q.category === "vocabulary").length,
};
