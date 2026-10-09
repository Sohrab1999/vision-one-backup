import type { GrammarLesson } from "../types";

/**
 * درسنامه‌های گرامر جزوه پایه نهم — مطابق صفحات ۱۶ تا ۹۴ جزوه دکتر حسن لطفی.
 * هر درس کتاب ممکن است چند درسنامه گرامری داشته باشد.
 */
export const GRAMMAR_LESSON_LIST: GrammarLesson[] = [
  // ─────────────────────── درس ۱ — Personality ───────────────────────
  {
    id: "g9-1-1",
    lesson: 1,
    title: "Word Order & Subject Pronouns",
    titleFa: "ترتیب اجزای جمله و ضمایر فاعلی",
    summary:
      "ترتیب اجزای یک جمله ساده و کامل در جملات مثبت و خبری زبان انگلیسی + معرفی ضمایر فاعلی (صفحه ۱۶ و ۱۷ جزوه).",
    blocks: [
      {
        kind: "formula",
        title: "ترتیب اجزای جمله خبری",
        items: [
          { en: "Subject + Auxiliary + Main Verb + Object + Adverb of Manner + Place + Time", fa: "فاعل + فعل کمکی + فعل اصلی + مفعول + قید حالت + قید مکان + قید زمان" },
        ],
      },
      {
        kind: "note",
        title: "سه نکته مهم",
        text: "۱) مهم‌ترین فعل‌های کمکی: am, is, are, was, were, do, does, did, can, could, should, may, might, will, shall, would, have, has, had. ۲) برای منفی کردن، قید منفی‌ساز not (یا مخفف n't) را به فعل کمکی اضافه می‌کنیم. ۳) در جملاتی که فعل کمکی دارند، برای سوالی کردن کافی است جای فاعل و فعل کمکی را عوض کنیم.",
      },
      {
        kind: "text",
        title: "تعریف فاعل و ضمیر فاعلی",
        text: "فاعل کسی یا چیزی است که جمله درباره آن صحبت می‌کند و انجام‌دهنده عمل جمله است؛ بنابراین فاعل همیشه در ابتدای جمله می‌آید. ضمایر فاعلی در جمله به جای فاعل قرار می‌گیرند. برای اشیا و غیرجانداران از ضمیر it استفاده می‌کنیم؛ it همچنین برای حیواناتی که جنسیتشان مشخص نیست و برای بیان آب‌وهوا، دما و زمان به کار می‌رود.",
      },
      {
        kind: "table",
        title: "ضمایر فاعلی مفرد و جمع",
        headers: ["ضمیر", "معنی", "نوع"],
        rows: [
          ["I", "من", "اول شخص مفرد"],
          ["You", "تو", "دوم شخص مفرد"],
          ["He / She / It", "او (مذکر / مؤنث / غیرجاندار)", "سوم شخص مفرد"],
          ["We", "ما", "اول شخص جمع"],
          ["You", "شما", "دوم شخص جمع"],
          ["They", "آنها", "سوم شخص جمع"],
        ],
      },
      {
        kind: "examples",
        title: "مثال‌های جزوه (صفحه ۱۷)",
        items: [
          { en: "I study English every night.", fa: "من هر شب انگلیسی مطالعه می‌کنم." },
          { en: "You are very beautiful.", fa: "تو خیلی زیبا هستی." },
          { en: "Alex is my classmate. He is very clever.", fa: "الکس همکلاسی من است. او خیلی باهوش است." },
          { en: "Sara is absent today. I think she is sick.", fa: "سارا امروز غایب است. فکر کنم او مریض است." },
          { en: "There's a dog in the yard. It is very big.", fa: "یک سگ در حیاط است. آن خیلی بزرگ است." },
          { en: "We are going to cinema tonight. Do you like to come?", fa: "ما امشب قصد داریم به سینما برویم. شما هم دوست دارید بیایید؟" },
          { en: "Reza and Mahdi are wealthy. They work for a famous company.", fa: "رضا و مهدی ثروتمند هستند. آنها برای یک شرکت معروف کار می‌کنند." },
        ],
      },
    ],
  },
  {
    id: "g9-1-2",
    lesson: 1,
    title: "The Verb To Be",
    titleFa: "فعل to be (مصدر بودن)",
    summary:
      "ابتدایی‌ترین و پرکاربردترین فعل زبان انگلیسی با همه شکل‌های حال، گذشته، سوالی و منفی (صفحه ۱۸ و ۱۹ جزوه).",
    blocks: [
      {
        kind: "text",
        text: "فعل to be به معنای «بودن» است: am به معنای «هستم»، is به معنای «هست» و are به معنای «هستیم، هستید، هستند» (برای زمان حال). شکل گذشته ساده آن: was (بودم، بود) شکل گذشته am و is است و were (بودی، بودیم، بودید، بودند) شکل گذشته are است (برای زمان گذشته).",
      },
      {
        kind: "note",
        title: "قواعد طلایی",
        text: "برای سوالی کردن جملات دارای to be فقط کافی است فعل to be را به اول جمله بیاوریم. برای منفی کردن فقط بعد از فعل to be کلمه not یا n't بیاوریم.",
      },
      {
        kind: "table",
        title: "جدول کامل to be — حال ساده",
        headers: ["جمله مثبت", "جمله سوالی", "جمله منفی"],
        rows: [
          ["I am", "Am I?", "I am not / I'm not"],
          ["You are", "Are you?", "You are not / aren't"],
          ["He/She/It is", "Is he/she/it?", "He/She/It is not / isn't"],
          ["We are", "Are we?", "We are not / aren't"],
          ["They are", "Are they?", "They are not / aren't"],
        ],
      },
      {
        kind: "table",
        title: "گذشته ساده be",
        headers: ["جمله مثبت", "جمله منفی", "جمله سوالی"],
        rows: [
          ["I / He / She / It was", "I was not", "Was I?"],
          ["You / We / They were", "you were not", "Were you?"],
        ],
      },
      {
        kind: "table",
        title: "شکل‌های مخفف",
        headers: ["ضمیر فاعلی", "فعل", "مخفف"],
        rows: [
          ["I", "am", "I'm"],
          ["You", "are", "You're"],
          ["He", "is", "He's"],
          ["She", "is", "She's"],
          ["It", "is", "It's"],
          ["We", "are", "We're"],
          ["They", "are", "They're"],
        ],
      },
    ],
  },
  {
    id: "g9-1-3",
    lesson: 1,
    title: "Articles & Determiners",
    titleFa: "حروف تعریف: a/an، some/any و the",
    summary:
      "کاربرد کامل حروف تعریف معین و نامعین — مهم‌ترین بخش درسنامه درس اول (صفحات ۱۹ تا ۲۶ جزوه).",
    blocks: [
      {
        kind: "table",
        title: "نشانه‌های اسم در انگلیسی",
        headers: ["حرف تعریف", "مثال"],
        rows: [
          ["a / an", "a hunter, a leopard, an elephant, an ear"],
          ["the", "the child, the boy, the women, the cars"],
          ["this / that", "this bird, this door, that tiger, that chair"],
          ["these / those", "these chairs, these children, those men, those mice"],
          ["my / your / our / his / her / its / their", "his goat, our car, my friends, their towns"],
        ],
      },
      {
        kind: "examples",
        title: "کاربرد a و an",
        text: "هر دو فقط قبل از اسم مفرد قابل شمارش می‌آیند و معادل «یک» نکره در فارسی هستند. an قبل از اسمی می‌آید که با حرف صدادار (a, e, i, o, u) شروع شود.",
        items: [
          { en: "We have a big classroom.", fa: "ما یک کلاس بزرگ داریم." },
          { en: "She wants to buy an umbrella.", fa: "او می‌خواهد یک چتر بخرد." },
          { en: "Ramin is watching an American movie.", fa: "رامین دارد یک فیلم آمریکایی تماشا می‌کند." },
        ],
      },
      {
        kind: "note",
        title: "نکته: a/an همیشه معنی «یک» نمی‌دهد",
        text: "گاهی a/an نشان‌دهنده طبقه‌بندی است: My mother is a doctor. (مادر من یک دکتر است) — در اینجا doctor نامعین نیست؛ نویسنده می‌گوید مادرش در طبقه دکترها قرار دارد.",
      },
      {
        kind: "examples",
        title: "کاربرد some و any",
        text: "some به معنای «تعدادی، مقداری» در جملات خبری مثبت می‌آید. any به معنای «هیچ» در جملات سوالی و منفی می‌آید.",
        items: [
          { en: "My brother wants to read some books.", fa: "برادرم می‌خواهد تعدادی کتاب بخواند. (جمله مثبت)" },
          { en: "He doesn't have any money.", fa: "او هیچ پولی ندارد. (جمله منفی)" },
          { en: "Do you want any water?", fa: "آیا آب می‌خواهید؟ (جمله سوالی)" },
        ],
      },
      {
        kind: "note",
        text: "اگر در جملات سوالی بدانیم جواب مثبت است یا انتظار جواب مثبت داریم، از some استفاده می‌کنیم: I think you are hungry. Do you want some food?",
      },
      {
        kind: "table",
        title: "چه زمانی از the استفاده کنیم؟ (خلاصه ۱۴ مورد جزوه)",
        headers: ["مورد", "مثال"],
        rows: [
          ["۱. اسمی که قبلاً به آن اشاره شده", "Mike was driving a car yesterday. The car was very modern."],
          ["۲. چیزی که در یک محل فقط یک مورد از آن وجود دارد", "Where is the bathroom of this house?"],
          ["۳. معرفی یا شناسایی چیز خاص", "The writer of this book is famous."],
          ["۴. اسامی منحصربه‌فرد", "The sun rose at 6:17 this morning."],
          ["۵. قبل از صفت عالی و اعداد ترتیبی", "Saeid is the happiest person I've ever seen."],
          ["۶. با صفاتی که به کل یک گروه اشاره دارند", "She has given a lot of money to the poor."],
          ["۷. همراه نام دهه‌ها", "He was born in the seventies."],
          ["۸. در جمله‌ای که با only توصیف شده", "You are the only person he will listen to."],
          ["۹. مکان‌های جغرافیایی (رود، رشته‌کوه، اقیانوس)", "The Nile is the longest river in the world."],
          ["۱۰. کشورهایی که شکل جمع دارند", "I have never been to the Netherlands."],
          ["۱۱. کشورهایی با republic / kingdom / states", "They work in the United States."],
          ["۱۲. نام روزنامه‌ها", "She works for the New York Times."],
          ["۱۳. قبل از university و college در اسم خاص", "Julia graduated from the University of California."],
          ["۱۴. ساختمان‌های معروف، موزه‌ها و بناهای یادبود", "We went to the Louvre and saw the Mona Lisa."],
        ],
      },
      {
        kind: "table",
        title: "چه زمانی از the استفاده نکنیم؟ (خلاصه ۱۰ مورد جزوه)",
        headers: ["مورد", "مثال"],
        rows: [
          ["۱. با اسامی کشورها (به‌جز موارد استثنا)", "Iran is a beautiful country."],
          ["۲. با نام زبان‌ها", "English is taught in many countries."],
          ["۳. با اسم وعده‌های غذایی", "What do you have for lunch?"],
          ["۴. با اسم افراد", "John is my best friend."],
          ["۵. عناوینی که با اسم ترکیب شده‌اند", "President Kennedy was assassinated in Dallas."],
          ["۶. با اسم شغل‌ها و حرفه‌ها", "He'll probably study medicine."],
          ["۷. با سال‌ها", "2018 was a wonderful year for Luka Modric."],
          ["۸. با اسامی غیرقابل شمارش در حالت کلی", "Rice is an important food in Iran."],
          ["۹. جزایر، کوه‌ها و دریاچه‌های منحصربه‌فرد", "Mount Damavand is the highest mountain of Iran."],
          ["۱۰. اکثر اسامی شهرها، خیابان‌ها، ایستگاه‌ها و فرودگاه‌ها", "Victoria Station is in the center of London."],
        ],
      },
      {
        kind: "note",
        title: "نکته",
        text: "اگر کلمات mount (کوه)، sea (دریا) و lake (دریاچه) قبل از اسم بیایند دیگر از the استفاده نمی‌شود: Mount Everest is the highest mount in the world.",
      },
    ],
  },
  {
    id: "g9-1-4",
    lesson: 1,
    title: "There is / There are, Demonstratives & Plurals",
    titleFa: "There is/are، صفات اشاره و جمع بستن اسامی",
    summary: "ساختار «وجود داشتن»، صفات اشاره، قواعد صفت و جمع بستن اسامی (صفحات ۲۷ تا ۳۰ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "کاربرد There is و There are",
        text: "این ساختارها هیچ رابطه‌ای با مکان ندارند و برای نمایش «وجود داشتن» به کار می‌روند. There is برای اسامی مفرد قابل شمارش و غیرقابل شمارش به معنای (وجود دارد / هست) و There are برای اسامی جمع قابل شمارش به معنای (وجود دارند / هستند) است. برای سوالی کردن، جای فعل be و there را عوض می‌کنیم و برای منفی کردن not یا n't به فعل be اضافه می‌شود.",
      },
      {
        kind: "table",
        headers: ["There", "فعل", "مقدار", "اسم", "مکان"],
        rows: [
          ["There", "is", "an / a / one", "eraser / computer", "in the classroom."],
          ["There", "are", "two / three / many / some", "students", "in the classroom."],
        ],
      },
      {
        kind: "examples",
        items: [
          { en: "Are there fifty books in your library?", fa: "آیا پنجاه کتاب در کتابخانه‌ات هست؟" },
          { en: "Is there any water in the jug?", fa: "آیا آب در کوزه هست؟" },
        ],
      },
      {
        kind: "table",
        title: "صفات اشاره",
        headers: ["اشاره به نزدیک", "معنی", "اشاره به دور", "معنی"],
        rows: [
          ["This", "این (مفرد)", "That", "آن (مفرد)"],
          ["These", "اینها (جمع)", "Those", "آنها (جمع)"],
        ],
      },
      {
        kind: "examples",
        title: "مثال صفات اشاره",
        items: [
          { en: "This is a toy car.", fa: "این یک ماشین اسباب‌بازی است." },
          { en: "That money is in my pocket.", fa: "آن پول در جیبم است." },
          { en: "These boys are my brothers.", fa: "این پسرها برادران من هستند." },
          { en: "Those men play ping pong very well.", fa: "آن مردها به‌خوبی پینگ‌پنگ بازی می‌کنند." },
        ],
      },
      {
        kind: "text",
        title: "صفات",
        text: "صفت کلمه‌ای است که افراد، اشیا و حیوانات را توصیف می‌کند. سه قانون: ۱) صفت‌ها معمولاً پس از فعل to be می‌آیند: He is polite. ۲) صفت قبل از اسم می‌آید: He is a kind boy. ۳) صفت جمع نمی‌پذیرد.",
      },
      {
        kind: "text",
        title: "روش جمع بستن اسامی",
        text: "برای تبدیل اسم مفرد به جمع، حرف a/an را حذف و به آخر اسم s اضافه می‌کنیم. اگر آخر اسم به (ch, sh, z, x, ss, s, o) ختم شود es اضافه می‌شود: boxes, watches (اما استثنا: radios). تلفظ: بعد از صداهای (p, t, k, f) پسوند s صدای /s/ می‌دهد و بعد از صداهای دیگر /z/؛ اگر آخر کلمه یکی از (s, sh, ch, x, z) باشد es صدای /iz/ می‌دهد.",
      },
      {
        kind: "table",
        headers: ["مفرد", "جمع", "تلفظ"],
        rows: [
          ["A book / A cat / A map", "books / cats / maps", "/s/"],
          ["A pen / A boy / A teacher", "pens / boys / teachers", "/z/"],
          ["A bus / A watch / A box", "buses / watches / boxes", "/iz/"],
          ["An apple / A dish", "apples / dishes", "—"],
        ],
      },
    ],
  },

  // ─────────────────────── درس ۲ — Travel ───────────────────────
  {
    id: "g9-2-1",
    lesson: 2,
    title: "Present Continuous Tense",
    titleFa: "زمان حال استمراری",
    summary: "کارِ در حال انجام در لحظه صحبت — ساختار، سوالی و منفی، قواعد ing و کاربردها (صفحات ۴۱ تا ۴۴ جزوه).",
    blocks: [
      {
        kind: "formula",
        title: "فرمول",
        items: [
          { en: "Subject + am/is/are + Verb + ing + Object + Adverb of Manner + Place + Time", fa: "فاعل + یکی از افعال to be در زمان حال + فعل اصلی با ing + بقیه اجزا" },
        ],
      },
      {
        kind: "text",
        text: "زمان حال استمراری نشان‌دهنده کاری است که در لحظه صحبت کردن در حال انجام است و هنوز تمام نشده است. در فارسی به صورت (دارم، داری و ...) ترجمه می‌شود. برای اسم مفرد و ضمایر سوم شخص از is، برای اول شخص مفرد از am و برای اسم‌های جمع و سایر ضمایر از are استفاده می‌کنیم.",
      },
      {
        kind: "table",
        title: "مثال‌های کامل",
        headers: ["جمله", "معنی"],
        rows: [
          ["I am eating dinner.", "من دارم شام می‌خورم."],
          ["He is eating dinner.", "او (مذکر) دارد شام می‌خورد."],
          ["We are eating dinner.", "ما داریم شام می‌خوریم."],
          ["They are eating dinner.", "آنها دارند شام می‌خورند."],
        ],
      },
      {
        kind: "table",
        title: "شکل سوالی — جابه‌جایی فاعل و فعل be",
        headers: ["حالت خبری", "حالت سوالی"],
        rows: [
          ["I'm running.", "Am I running?"],
          ["You're writing.", "Are you writing?"],
          ["He's sleeping.", "Is he sleeping?"],
          ["It's snowing.", "Is it snowing?"],
          ["They're singing.", "Are they singing?"],
        ],
      },
      {
        kind: "table",
        title: "شکل منفی — not بعد از فعل be",
        headers: ["جمله خبری", "جمله منفی", "اختصاری منفی"],
        rows: [
          ["I am cooking.", "I am not cooking.", "—"],
          ["You are studying.", "You are not studying.", "You aren't studying."],
          ["He is coming.", "He is not coming.", "He isn't coming."],
          ["They are watching TV.", "They are not watching TV.", "They aren't watching TV."],
        ],
      },
      {
        kind: "table",
        title: "نکات افزودن ing به آخر فعل",
        headers: ["قاعده", "مثال"],
        rows: [
          ["اگر فعل به e ختم شود، e حذف می‌شود", "type → typing، write → writing، drive → driving"],
          ["اگر فعل به یک حرف بی‌صدا ختم شود و قبل از آن فقط یک حرف صدادار باشد، حرف آخر تکرار می‌شود", "hit → hitting، sit → sitting، swim → swimming"],
        ],
      },
      {
        kind: "text",
        title: "کاربردها",
        text: "۱) کاری که در لحظه صحبت در حال انجام است: Look at those dogs. They are chasing a rabbit. ۲) کاری که برای مدتی به طور مداوم در حال انجام است یا تبدیل به گرایش شده: They are still working for that company. ۳) کاری که از قبل برنامه‌ریزی شده و در آینده انجام می‌شود: I'm meeting my friends tonight. ۴) موقعیت یا اتفاق موقت: The weather forecast was good, but it's raining at the moment. ۵) همراه always و constantly و forever برای تأکید: Jack and Julia are always laughing.",
      },
      {
        kind: "table",
        title: "نشانه‌های زمان حال استمراری",
        headers: ["نشانه", "معنی"],
        rows: [
          ["now / right now", "الان / همین الان"],
          ["at this moment / at this time", "در این لحظه / در این زمان"],
          ["at present", "در حال حاضر"],
          ["look / listen", "نگاه کن / گوش کن (ابتدای جمله)"],
          ["just / still", "الساعه، در شرف / هنوز (بعد از فعل be)"],
        ],
      },
    ],
  },
  {
    id: "g9-2-2",
    lesson: 2,
    title: "Possession: 's and of",
    titleFa: "بیان مالکیت انسان و اشیاء",
    summary: "دو روش اصلی بیان مالکیت با 's (جنتیو) و حرف اضافه of (صفحات ۴۵ و ۴۶ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "استفاده از 's",
        text: "هنگامی که مالکیت متعلق به اشخاص، حیوانات، کشورها و سازمان‌ها باشد از 's (که به آن genitive نیز می‌گویند) استفاده می‌شود.",
      },
      {
        kind: "table",
        headers: ["مثال", "معنی"],
        rows: [
          ["Dog's collar (dog+'s)", "قلاده سگ"],
          ["Sister's backpack (sister+'s)", "کوله‌پشتی خواهر"],
          ["Car's engine (car+'s)", "موتور ماشین"],
        ],
      },
      {
        kind: "note",
        title: "چند نکته",
        text: "۱) اگر اسم جمع باشد فقط آپاستروف (') را اضافه می‌کنیم نه s: Dogs' collars، Sisters' backpacks، Cars' engines. ۲) اگر اسمی به s ختم شود ولی جمع نباشد (مثل Charles)، اکثر افراد از 's استفاده می‌کنند و برخی فقط از آپاستروف.",
      },
      {
        kind: "examples",
        title: "استفاده از of",
        text: "اگر مالکیت متعلق به اشیاء (objects) باشد از of استفاده می‌کنیم. of فقط برای تعلق شیء به شیء دیگر به کار می‌رود و برای تعلق شیء به انسان به کار نمی‌رود.",
        items: [
          { en: "What is the name of that street?", fa: "اسم آن خیابان چیست؟" },
          { en: "I'm on the roof of the house.", fa: "من روی پشت‌بام خانه هستم." },
          { en: "The door of the class", fa: "درب کلاس" },
          { en: "The legs of the table", fa: "پایه‌های میز" },
        ],
      },
    ],
  },

  // ─────────────────────── درس ۳ — Festivals and Ceremonies ───────────────────────
  {
    id: "g9-3-1",
    lesson: 3,
    title: "Simple Present Tense",
    titleFa: "زمان حال ساده",
    summary: "پرکاربردترین زمان زبان انگلیسی برای حقایق، عادت‌ها و برنامه‌ها (صفحات ۵۷ تا ۵۹ جزوه).",
    blocks: [
      {
        kind: "formula",
        title: "فرمول",
        items: [
          { en: "Subject + Simple Verb (+s/es) + Object + Adverb of Manner + Place + Time", fa: "فاعل + فعل ساده (برای سوم شخص مفرد با s/es) + بقیه اجزا" },
        ],
      },
      {
        kind: "text",
        text: "زمان حال ساده برای کارهایی که در زمان حال یک بار یا چند بار به صورت تکراری اتفاق می‌افتند به کار می‌رود؛ حقایق علمی و عادی غیرقابل تغییر، کارهای از روی عادت و روزمره و کارهای برنامه‌ریزی‌شده. در جملات مثبت فقط برای سوم شخص مفرد فعل صرف می‌شود و پسوند s می‌گیرد. در شکل منفی و سوالی از فعل کمکی do (و برای سوم شخص مفرد does) استفاده می‌شود و فعل اصلی همیشه به صورت ساده می‌آید.",
      },
      {
        kind: "table",
        headers: ["فاعل", "جمله مثبت", "جمله منفی", "جمله سوالی"],
        rows: [
          ["I / you / we / they", "I speak", "I do not speak", "Do I speak?"],
          ["he / she / it", "he speaks", "he does not speak", "Does he speak?"],
        ],
      },
      {
        kind: "table",
        title: "استثناهای سوم شخص مفرد",
        headers: ["قاعده", "مثال"],
        rows: [
          ["اگر فعل به o، sh، ch، ss، x یا z ختم شود از es استفاده می‌کنیم", "do → he does، wash → she washes"],
          ["اگر فعل به y بعد از حرف بی‌صدا ختم شود، y به ie تبدیل و سپس s اضافه می‌شود", "worry → he worries"],
          ["اگر قبل از y حرف صدادار باشد y تغییر نمی‌کند", "play → he plays"],
        ],
      },
      {
        kind: "text",
        title: "کاربردها",
        text: "۱) کارها یا اتفاقاتی که به طور منظم یا به خاطر عادت تکرار می‌شوند (همراه قیدهای تکرار مثل always, never, rarely, often): He plays football every Tuesday. ۲) دو یا چند اتفاق پشت سر هم در زمان حال: After school Colin goes home, packs his bag, puts on his football shirt and then he goes to football training. ۳) یک واقعیت یا قاعده عمومی: A forward tries to score goals for his team. ۴) برنامه‌های آینده برنامه‌ریزی‌شده: The bus leaves at half past four. ۵) فعل‌های حالت، افکار و شخصیت: Colin likes football. / He is a forward.",
      },
      {
        kind: "table",
        title: "قیدهای تکرار (از ۰٪ تا ۱۰۰٪)",
        headers: ["قید", "معنی", "درصد تقریبی"],
        rows: [
          ["never", "هرگز", "۰٪"],
          ["rarely", "به‌ندرت", "کم"],
          ["sometimes", "گاهی اوقات", "۳۰٪"],
          ["often", "اغلب", "۶۰٪"],
          ["usually", "معمولاً", "۸۰٪"],
          ["always", "همیشه", "۱۰۰٪"],
        ],
      },
      {
        kind: "examples",
        items: [
          { en: "I usually play football with my friends.", fa: "من معمولاً با دوستانم فوتبال بازی می‌کنم." },
          { en: "Sometimes she plays piano for us.", fa: "گاهی اوقات او برای ما پیانو می‌نوازد." },
        ],
      },
    ],
  },
  {
    id: "g9-3-2",
    lesson: 3,
    title: "Possessive Adjectives",
    titleFa: "صفات ملکی",
    summary: "۸ صفت ملکی زبان انگلیسی و تفاوت آن‌ها با ضمایر (صفحات ۵۹ و ۶۰ جزوه).",
    blocks: [
      {
        kind: "text",
        text: "صفات ملکی ضمیر نیستند و جزء تعیین‌کننده‌ها (determiners) هستند اما مانند ضمایر ملکی عمل می‌کنند. صفات ملکی مانند بقیه صفت‌ها قبل از اسمی می‌آیند که آن را توصیف می‌کنند، اما مانند ضمیرها جایگزین اسم نمی‌شوند. در انگلیسی ۸ صفت ملکی وجود دارد.",
      },
      {
        kind: "table",
        headers: ["ضمیر فاعلی", "صفت ملکی", "معنی"],
        rows: [
          ["I", "my", "مال من"],
          ["you", "your", "مال تو"],
          ["he", "his", "مال او (مذکر)"],
          ["she", "her", "مال او (مؤنث)"],
          ["it", "its", "مال آن"],
          ["we", "our", "مال ما"],
          ["you", "your", "مال شما"],
          ["they", "their", "مال آنها"],
        ],
      },
      {
        kind: "examples",
        items: [
          { en: "My car is in the yard.", fa: "ماشین من در حیاط است." },
          { en: "Your book is so boring.", fa: "کتاب تو خیلی کسل‌کننده است." },
          { en: "His cat is very quiet.", fa: "گربه او (مذکر) خیلی آرام است." },
          { en: "Her dog is small.", fa: "سگ او (مؤنث) کوچک است." },
          { en: "Look at that fox. Its tail is short.", fa: "آن روباه را نگاه کن. دم آن کوتاه است." },
          { en: "Their room is clean.", fa: "اتاق آنها تمیز است." },
          { en: "Whose wallet is this?", fa: "این کیف کیه؟" },
        ],
      },
    ],
  },

  // ─────────────────────── درس ۴ — Services ───────────────────────
  {
    id: "g9-4-1",
    lesson: 4,
    title: "Wh Questions",
    titleFa: "سؤال پرسیدن با کلمات پرسشی",
    summary: "دو دسته کلمات پرسشی و روش ساختن سؤال با Wh Questions (صفحات ۷۰ و ۷۱ جزوه).",
    blocks: [
      {
        kind: "text",
        text: "در زبان انگلیسی دو دسته سؤال وجود دارد: دسته اول yes/no questions که با بله یا خیر پاسخ داده می‌شوند و دسته دوم information questions که نمی‌توان با بله یا خیر به آن‌ها پاسخ داد و باید اطلاعات درباره موضوع سؤال ارائه شود. کلمات پرسشی به دو دسته تقسیم می‌شوند.",
      },
      {
        kind: "table",
        title: "الف) کلمات پرسشی دسته اول — بعد از آن‌ها ابتدا اسم می‌آید",
        headers: ["کلمه پرسشی", "معنی", "کلمه حذفی", "مثال برای جواب"],
        rows: [
          ["How many", "چند تا", "صفت مقدار", "two - many - some"],
          ["How much", "چه مقدار", "صفت مقدار", "much - a little"],
          ["Whose", "مال چه کسی", "صفت ملکی 's", "my - his - Ali's"],
          ["Which", "کدام", "صفت", "little - thin - clever"],
        ],
      },
      {
        kind: "table",
        title: "ب) کلمات پرسشی دسته دوم — بعد از آن‌ها جمله به شکل سوالی می‌آید",
        headers: ["کلمه پرسشی", "معنی", "کلمه حذفی", "مثال برای جواب"],
        rows: [
          ["what", "چه چیز، چه کار", "شغل، شیء", "a book - a doctor"],
          ["What color", "چه رنگی", "رنگ", "green - blue - white"],
          ["What time", "چه ساعت", "ساعت", "at 5 o'clock - at 10"],
          ["What day", "چه روزی", "روز هفته", "Monday - Saturday"],
          ["How", "چگونه، چطور", "قید حالت", "slowly - hard - rapidly"],
          ["When", "کی، چه وقت", "قید زمان", "every day - yesterday"],
          ["Where", "کجا", "قید مکان", "at home - in the park"],
          ["Who", "چه کسی", "شخص", "Ali - Mr. Irani"],
          ["How old", "چند ساله", "سن", "six years old"],
        ],
      },
      {
        kind: "text",
        title: "مراحل سوالی کردن با کلمات پرسشی",
        text: "۱) کلمه پرسشی مورد نظر را در ابتدای جمله سوالی قرار می‌دهیم. ۲) پس از کلمه پرسشی، جمله را به شکل سوالی درمی‌آوریم. ۳) با توجه به معنی کلمه پرسشی، کلمه یا کلمات حذفی را از جمله حذف می‌کنیم. ۴) اگر کلمه پرسشی جزء دسته دوم باشد، اسم را در جمله پیدا کرده و آن را پس از کلمه پرسشی قرار می‌دهیم (اسم همیشه بعد از کلمه حذفی قرار دارد).",
      },
      {
        kind: "examples",
        items: [
          { en: "There is a book on the table. → What is there on the table?", fa: "چه چیزی روی میز است؟" },
          { en: "They saw him yesterday. → When did they see him?", fa: "او را کی دیدند؟" },
          { en: "My father is at home. → Where is he?", fa: "او کجاست؟" },
          { en: "He is Mr Irani. → Who is he?", fa: "او کیست؟" },
        ],
      },
    ],
  },
  {
    id: "g9-4-2",
    lesson: 4,
    title: "Adverbs of Frequency",
    titleFa: "قیدهای تکرار و جایگاه آن‌ها",
    summary: "چهار قانون طلایی جایگاه قید تکرار در جمله (صفحه ۷۲ جزوه).",
    blocks: [
      {
        kind: "table",
        headers: ["always", "usually", "often", "sometimes", "never"],
        rows: [["همیشه", "معمولاً", "اغلب", "گاهی اوقات", "هرگز"]],
      },
      {
        kind: "text",
        title: "چهار قانون طلایی",
        text: "۱) قید تکرار قبل از فعل اصلی قرار می‌گیرد: Adverb + Main verb. ۲) بعد از فعل to be می‌آید: To Be + Adverb. ۳) اگر فعل کمکی در جمله باشد (have, can, must, could, would, should, might, will)، قید بین فعل کمکی و فعل اصلی قرار می‌گیرد: Auxiliary + Adverb + Main verb. ۴) در جملات سوالی، قید تکرار بعد از فاعل استفاده می‌شود.",
      },
      {
        kind: "examples",
        items: [
          { en: "I always watch TV in the morning.", fa: "من همیشه صبح‌ها تلویزیون تماشا می‌کنم. (قبل از فعل اصلی)" },
          { en: "She never listens to music because she is a real Muslim.", fa: "او هرگز به موسیقی گوش نمی‌دهد چون یک مسلمان واقعی است." },
          { en: "He is always ill.", fa: "او همیشه مریض است. (بعد از to be)" },
          { en: "We were never tired as break layers.", fa: "ما در زنگ تفریح هرگز خسته نبودیم." },
          { en: "He can never learn English.", fa: "او هرگز نمی‌تواند انگلیسی یاد بگیرد. (بین فعل کمکی و اصلی)" },
          { en: "I have always been tired in my classes.", fa: "من در کلاس‌هایم همیشه خسته بوده‌ام." },
          { en: "Why do you always get up so early?", fa: "چرا تو همیشه این‌قدر زود بیدار می‌شوی؟ (بعد از فاعل در سؤال)" },
        ],
      },
    ],
  },

  // ─────────────────────── درس ۵ — Media ───────────────────────
  {
    id: "g9-5-1",
    lesson: 5,
    title: "Simple Past Tense",
    titleFa: "زمان گذشته ساده",
    summary: "بیان وقایع تمام‌شده در گذشته — ساختار، افعال باقاعده و بی‌قاعده و فعل be در گذشته (صفحات ۸۳ و ۸۴ جزوه).",
    blocks: [
      {
        kind: "formula",
        title: "فرمول",
        items: [
          { en: "Subject + Past Verb (2nd form) + Object + Adverb of Manner + Place + Time", fa: "فاعل + قسمت دوم فعل + مفعول + قید حالت + قید مکان + قید زمان" },
        ],
      },
      {
        kind: "text",
        text: "زمان گذشته ساده معمولاً برای بیان وقایعی به کار می‌رود که یک یا چند بار در گذشته اتفاق افتاده‌اند و دیگر تمام شده‌اند. اگر فعل باقاعده باشد با افزودن پسوند ed گذشته می‌شود و در صورت بی‌قاعده بودن باید شکل گذشته آن را از جدول افعال بی‌قاعده پیدا کنید. برای منفی یا سوالی کردن از فعل کمکی did استفاده می‌کنیم؛ پس از اضافه شدن فعل کمکی، فعل اصلی در شکل عادی (زمان حال) می‌آید.",
      },
      {
        kind: "table",
        headers: ["جمله سوالی", "جمله منفی", "جمله مثبت", "نوع فعل"],
        rows: [
          ["Did I play?", "I did not play", "I played", "افعال با قاعده"],
          ["Did I speak?", "I did not speak", "I spoke", "افعال بی‌قاعده"],
        ],
      },
      {
        kind: "text",
        title: "کاربردها",
        text: "الف) بیان عمل یا حالتی که در یک زمان مشخص در گذشته شروع و تمام شده است: She met Sarah three weeks ago. ب) بیان کارهایی که در گذشته یکی پس از دیگری اتفاق افتاده‌اند: I got up early in the morning, washed my face, ate breakfast, got dressed, and went to school. ج) بیان عملی که در طول مدتی در گذشته شروع و پایان یافته است: Mina lived in Japan for seven years. د) بیان عادت‌ها و واقعیت‌های گذشته که اکنون انجام نمی‌شوند (همراه always, often, sometimes, never و used to): My father always listened to classical music.",
      },
      {
        kind: "table",
        title: "فعل be (بودن) در گذشته",
        headers: ["جمله مثبت", "جمله منفی", "جمله سوالی"],
        rows: [
          ["I / he / she / it was", "I was not", "Was I?"],
          ["you / we / they were", "you were not", "Were you?"],
        ],
      },
      {
        kind: "note",
        title: "نکته",
        text: "فعل be یک فعل کاملاً بی‌قاعده است؛ وقتی به عنوان فعل اصلی در جمله باشد، دیگر برای سوالی یا منفی کردن فعل کمکی اضافه نمی‌کنیم و از همین فعل استفاده می‌شود.",
      },
    ],
  },

  // ─────────────────────── درس ۶ — Health and Injuries ───────────────────────
  {
    id: "g9-6-1",
    lesson: 6,
    title: "Object Pronouns",
    titleFa: "ضمایر مفعولی",
    summary: "ضمایری که در نقش مفعول در جمله به کار می‌روند (صفحه ۹۴ جزوه).",
    blocks: [
      {
        kind: "text",
        text: "از ضمایر شخصی (Personal Pronouns) برای جایگزین کردن اسامی استفاده می‌شود. ضمایر مفعولی (Object Pronouns) ضمایری هستند که در نقش مفعول در جمله به کار می‌روند؛ یعنی عملی توسط فاعل روی آن‌ها صورت گرفته است.",
      },
      {
        kind: "table",
        headers: ["معنی فارسی", "ضمیر مفعولی", "ضمیر فاعلی"],
        rows: [
          ["به من / مرا", "me", "I"],
          ["به تو / تو را", "you", "you"],
          ["به او / او را (مذکر)", "him", "he"],
          ["به او / او را (مؤنث)", "her", "she"],
          ["به آن / آن را", "it", "it"],
          ["به ما / ما را", "us", "we"],
          ["به شما / شما را", "you", "you"],
          ["به آنها / آنها را", "them", "they"],
        ],
      },
      {
        kind: "text",
        title: "نکات کاربرد",
        text: "الف) ضمایر مفعولی به‌جز در جای مفعول، در جای دیگری هم می‌توانند قرار بگیرند؛ مثلاً بعد از فعل یا بعد از حرف اضافه. ب) هنگام استفاده از ضمایر شخصی همراه and، مؤدبانه‌تر این است که I و we را بعد از اسامی و ضمایر دیگر به کار ببریم: you and I، my father and I، them and us. ج) you باید قبل از اسامی و ضمایر دیگر به کار رود: you and your wife، you and her.",
      },
      {
        kind: "examples",
        items: [
          { en: "Our teacher was angry with us.", fa: "معلم‌مان از دست ما عصبانی بود." },
          { en: "Give me a ring tomorrow.", fa: "فردا به من زنگ بزن." },
          { en: "When he comes in, please tell him I phoned.", fa: "هر وقت آمد، لطفاً به او بگویید که من زنگ زدم." },
          { en: "I'm older than you.", fa: "من از تو بزرگ‌ترم." },
          { en: "'I'm hungry.' 'Me too.'", fa: "«من گرسنه‌ام.» «من هم همین‌طور.»" },
        ],
      },
    ],
  },
];

export function grammarOfLesson(lesson: number): GrammarLesson[] {
  return GRAMMAR_LESSON_LIST.filter((g) => g.lesson === lesson);
}
