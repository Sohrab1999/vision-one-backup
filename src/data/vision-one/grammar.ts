// درسنامه‌های گرامر جزوه «ویژن وان» — خلاصه‌شده و ساختاریافته از صفحات ۲۲ تا ۱۶۰ جزوه

import type { GrammarLesson } from "../types";

export const GRAMMAR_LESSON_LIST: GrammarLesson[] = [
  // ─────────────────────── مرور پایه ۷ تا ۹ ───────────────────────
  {
    id: "r1",
    lesson: 0,
    title: "Present Simple & Present Continuous",
    titleFa: "زمان حال ساده و حال استمراری (مرور پایه ۷ تا ۹)",
    summary:
      "حال ساده برای عادت‌ها، تکرار و حقایق علمی؛ حال استمراری برای کاری که هم‌اکنون در حال انجام است.",
    blocks: [
      {
        kind: "formula",
        title: "فرمول حال ساده",
        text: "فاعل + شکل ساده فعل (برای he/she/it ← فعل + s) + مفعول + قید حالت + قید مکان + قید زمان",
      },
      {
        kind: "note",
        title: "مشخصه‌های حال ساده",
        text: "every/each + قید زمان • روزهای هفته به صورت جمع (on Fridays) • قیدهای تکرار: always، usually، often، sometimes، hardly، never (قبل از فعل اصلی و بعد از افعال کمکی). برای سوالی/منفی کردن از do/does و don't/doesn't استفاده می‌شود و بعد از آن‌ها همیشه شکل ساده فعل می‌آید.",
      },
      {
        kind: "formula",
        title: "فرمول حال استمراری",
        text: "فاعل + am/is/are + فعل ing‌دار + مفعول + قید حالت + قید مکان + قید زمان",
      },
      {
        kind: "note",
        title: "مشخصه‌های حال استمراری",
        text: "now، right now، at the moment، at the present. سوالی: جابجایی am/is/are؛ منفی: isn't/aren't.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "He plays football in the park each day.", fa: "او هر روز در پارک فوتبال بازی می‌کند." },
          { en: "They are eating dinner right now.", fa: "آن‌ها هم‌اکنون در حال خوردن شام هستند." },
          { en: "Does she usually eat pizza for lunch?", fa: "آیا او معمولاً برای نهار پیتزا می‌خورد؟" },
        ],
      },
    ],
  },
  {
    id: "r2",
    lesson: 0,
    title: "Simple Past Tense",
    titleFa: "زمان گذشته ساده (مرور پایه ۷ تا ۹)",
    summary:
      "برای کاری که در گذشته انجام شده و به پایان رسیده. افعال باقاعده «ed» می‌گیرند؛ بی‌قاعده‌ها را باید حفظ کرد.",
    blocks: [
      {
        kind: "formula",
        title: "فرمول",
        text: "فاعل + شکل دوم فعل + مفعول + قید حالت + قید مکان + قید زمان",
      },
      {
        kind: "note",
        title: "مشخصه‌ها",
        text: "yesterday • ترکیب last (last year) • ترکیب ago (3 months ago) • شکل دوم فعل. سوالی با did و منفی با didn't — بعد از آن‌ها شکل ساده فعل می‌آید. اگر فعل جمله was/were باشد از خود آن‌ها استفاده می‌شود.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "I played football in the park yesterday.", fa: "دیروز در پارک فوتبال بازی کردم." },
          { en: "We ate a good dinner at this restaurant last night.", fa: "دیشب در این رستوران شام خوبی خوردیم." },
          { en: "Did she drink some milk last night?", fa: "آیا او دیشب مقداری شیر نوشید؟" },
        ],
      },
    ],
  },
  // ─────────────────────── درس ۱ ───────────────────────
  {
    id: "l1-g1",
    lesson: 1,
    title: "Simple Future Tense — will / be going to",
    titleFa: "زمان آینده ساده",
    summary:
      "will برای عملِ بدون برنامه قبلی، تصمیم لحظه‌ای، قول، پیش‌بینی با حدس شخصی و شرط نوع اول؛ be going to برای قصد و برنامه از پیش تعیین‌شده و پیش‌بینی بر اساس شواهد.",
    blocks: [
      {
        kind: "formula",
        title: "فرمول will",
        text: "فاعل + will + شکل ساده فعل + مفعول + قید حالت + قید مکان + قید زمان",
      },
      {
        kind: "note",
        title: "کاربردهای will",
        text: "۱) عمل آینده بدون برنامه قبلی ۲) تصمیم لحظه‌ای و بدون فکر قبلی ۳) پیشنهاد، خواهش و تقاضا ۴) درخواست مؤدبانه و دعوت ۵) اطمینان به رخ‌دادن ۶) پیش‌بینی با حدس شخصی (Maybe, I think) ۷) جمله شرطی نوع اول ۸) تهدید ۹) قول و قسم",
      },
      {
        kind: "formula",
        title: "فرمول be going to",
        text: "فاعل + am/is/are + going to + شکل ساده فعل + ...",
      },
      {
        kind: "note",
        title: "نکته کنکوری will یا be going to؟",
        text: "اگر I know یا معادل آن در جمله باشد ← از قبل برنامه داشته ← be going to. اگر I forgot، maybe، I don't know، guess یا I'm not sure باشد ← تصمیم لحظه‌ای ← will.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "He'll visit his grandparents tomorrow.", fa: "او فردا از پدربزرگ و مادربزرگش دیدن خواهد کرد." },
          { en: "My parents are going to buy a big house in Yazd next month.", fa: "والدینم قصد دارند ماه آینده در یزد خانه بزرگی بخرند." },
          { en: "There are a lot of dark clouds in the sky! It is going to rain.", fa: "ابرهای تیره زیادی در آسمان است! قرار است باران ببارد." },
          { en: "A: Did you mail that letter? B: Sorry, I completely forgot. I will do it soon.", fa: "الف: آن نامه را پست کردی؟ ب: متأسفانه کاملاً فراموش کردم. بزودی انجامش می‌دهم." },
        ],
      },
      {
        kind: "note",
        title: "نکته ویژه (زبان تخصیصی)",
        text: "برای برنامه‌های قطعی طبق جدول زمانی (پرواز، فیلم سینما) حتی با قید آینده، از حال ساده استفاده می‌شود: My flight leaves at 9:30 tomorrow.",
      },
    ],
  },
  {
    id: "l1-g2",
    lesson: 1,
    title: "Nouns, Plurals & Determiners",
    titleFa: "انواع اسم، جمع بستن و معرف‌ها",
    summary:
      "اسم عام و خاص، قواعد جمع بستن (s/es/ves/ies)، اسامی بی‌قاعده، حروف تعریف a/an/the و ترتیب صفات قبل از اسم.",
    blocks: [
      {
        kind: "table",
        title: "قواعد جمع بستن",
        headers: ["قاعده", "مثال مفرد", "جمع"],
        rows: [
          ["s ss sh ch x z ← es", "a bus / a box", "buses / boxes"],
          ["f یا fe ← ves", "a wife / a knife", "wives / knives"],
          ["استثنای f: فقط s", "a roof / a belief", "roofs / beliefs"],
          ["y بعد صامت ← ies", "a city / a baby", "cities / babies"],
          ["y بعد مصوت ← s", "a day / a boy", "days / boys"],
          ["o بعد صامت ← es (استثنا: فقط s)", "a tomato / a piano", "tomatoes / pianos"],
          ["بی‌قاعده", "a man / a child / a mouse", "men / children / mice"],
          ["مفرد و جمع یکسان", "sheep / series / species", "sheep / series / species"],
        ],
      },
      {
        kind: "note",
        title: "حروف تعریف a / an",
        text: "فقط قبل از اسم مفرد قابل شمارشِ نکره. انتخاب a یا an بر اساس «تلفظ» اولین صدا است: an hour, an umbrella, a unit, a one-penny coin.",
      },
      {
        kind: "note",
        title: "حرف تعریف the",
        text: "قبل از اسم معرفه (مفرد/جمع/غیرقابل‌شمارش). اسم در بار اول نکره (a/an) و در بار دوم معرفه (the) است.",
      },
      {
        kind: "formula",
        title: "ترتیب صفات قبل از اسم — رمز «جمرساک» (از سمت اسم)",
        text: "جنس ← ملت ← رنگ ← سن ← اندازه ← کیفیت | معرف‌ها (a، the، this، اعداد، صفت ملکی) همیشه قبل از همه صفات می‌آیند.",
      },
      {
        kind: "examples",
        title: "مثال ترتیب صفات",
        items: [
          {
            en: "I bought a nice big new blue Italian cotton shirt.",
            fa: "من یک پیراهن پنبه‌ای ایتالیایی آبی تازه بزرگ قشنگ خریدم. (کیفیت+اندازه+سن+رنگ+ملیت+جنس)",
          },
        ],
      },
    ],
  },
  // ─────────────────────── درس ۲ ───────────────────────
  {
    id: "l2-g1",
    lesson: 2,
    title: "Adjectives — Comparative & Superlative",
    titleFa: "انواع صفت و کاربردهای آن",
    summary:
      "صفت ساده، برتری (er/more + than)، برترین (the + est/most) و برابری (as … as) — بر اساس تعداد بخش‌های صفت.",
    blocks: [
      {
        kind: "table",
        title: "ساخت صفت برتری و برترین",
        headers: ["نوع صفت", "برتری", "برترین"],
        rows: [
          ["یک‌بخشی", "tall → taller than", "the tallest"],
          ["دوبخشی با y (y←i)", "easy → easier than", "the easiest"],
          ["دوبخشی بدون y / چندبخشی", "useful → more useful than", "the most useful"],
          ["بی‌قاعده", "good → better than | bad → worse than | far → farther than | little → less than | many/much → more than", "the best / the worst / the farthest / the least / the most"],
        ],
      },
      {
        kind: "note",
        title: "قواعد املایی",
        text: "صفت یک‌بخشی با ساختار صامت+مصوت+صامت: حرف آخر تکرار می‌شود (big→bigger, hot→hottest). صفات به e ختم‌شده فقط r/st می‌گیرند (large→larger).",
      },
      {
        kind: "formula",
        title: "صفت برابری",
        text: "as + صفت + as (مثبت) | not so/as + صفت + as (منفی) — برای دو اسم: صفت می‌آید؛ برای دو فعل: قید حالت می‌آید.",
      },
      {
        kind: "note",
        title: "نکات کنکوری",
        text: "قبل از صفت برتری برای «خیلی» از much/a lot و برای «یه‌کم» از a little/a bit استفاده می‌شود (نه very). صفات ed/ing همیشه more/most می‌گیرند. برای اعضای خانواده: elder/eldest (بدون than). ساختار «دو برابر»: twice as … as.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "Gold is more expensive than silver.", fa: "طلا گران‌قیمت‌تر از نقره است." },
          { en: "My mother is as kind as your mother.", fa: "مادر من به اندازه مادر تو مهربان است." },
          { en: "This bicycle is a lot cheaper than that car.", fa: "این دوچرخه خیلی ارزان‌تر از آن ماشین است." },
        ],
      },
    ],
  },
  // ─────────────────────── درس ۳ ───────────────────────
  {
    id: "l3-g1",
    lesson: 3,
    title: "Past Continuous Tense",
    titleFa: "زمان گذشته استمراری",
    summary:
      "برای عملی که در گذشته برای مدتی در جریان بوده؛ معمولاً با گذشته ساده ترکیب می‌شود (پس‌زمینه‌ی عمل قطع‌شده).",
    blocks: [
      {
        kind: "formula",
        title: "فرمول",
        text: "فاعل + was/were + فعل ing‌دار + مفعول + قید حالت + قید مکان + قید زمان",
      },
      {
        kind: "table",
        title: "فرمول‌های ترکیب (حفظ کنید!)",
        headers: ["ساختار", "مثال زمانی"],
        rows: [
          ["When + گذشته ساده، گذشته استمراری", "When the phone rang, she was writing a letter."],
          ["While + گذشته استمراری، گذشته ساده", "While John was sleeping, someone stole his car."],
          ["When/As/While + گذشته استمراری، گذشته استمراری (دو عمل همزمان)", "While my mother was cooking, I was studying."],
        ],
      },
      {
        kind: "note",
        title: "نکته",
        text: "فعل بعد از when معمولاً گذشته ساده و بعد از while معمولاً گذشته استمراری است؛ اما when می‌تواند قبل از هر دو بیاید. افعال حالتی (want، know، need و…) استمراری نمی‌شوند.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "She was cleaning her room when somebody knocked at the door.", fa: "او داشت اتاقش را تمیز می‌کرد که یک نفر در زد." },
          { en: "This time last year we were visiting Spain.", fa: "همین موقع سال گذشته در حال دیدن از اسپانیا بودیم." },
        ],
      },
    ],
  },
  {
    id: "l3-g2",
    lesson: 3,
    title: "Reflexive & Emphatic Pronouns",
    titleFa: "ضمایر انعکاسی و تأکیدی",
    summary: "خودم، خودت، خودش… — تأکیدی قابل حذف است، انعکاسی هرگز (چون نقش مفعول را دارد).",
    blocks: [
      {
        kind: "table",
        title: "جدول ضمایر",
        headers: ["مفرد", "جمع"],
        rows: [
          ["myself — خودم", "ourselves — خودمان"],
          ["yourself — خودت", "yourselves — خودتان"],
          ["himself — خودش (مذکر)", "themselves — خودشان"],
          ["herself — خودش (مؤنث)", "—"],
          ["itself — خودش (غیرانسان)", "—"],
        ],
      },
      {
        kind: "note",
        title: "نکات مهم",
        text: "۱) تأکیدی: بعد از فاعل یا انتهای جمله (They themselves cleaned the room.) ۲) جمله با Let's ← همواره ourselves ۳) by + ضمیر = «به‌تنهایی» ۴) انعکاسی بعد از فعل در نقش مفعول (I saw myself in the mirror.) ۵) بعد از حروف اضافه‌ی مکان ضمیر مفعولی می‌آید نه انعکاسی: They divided the money among them. ۶) اصطلاحات: enjoy yourself، help yourself، make yourself at home ۷) each other/one another یعنی «همدیگر».",
      },
    ],
  },
  {
    id: "l3-g3",
    lesson: 3,
    title: "State Verbs vs Action Verbs",
    titleFa: "افعال حالتی و کنشی",
    summary: "فعل کنشی قابل استمراری‌شدن است؛ فعل حالتی (احساس، فکر، مالکیت، حسی) هرگز ing نمی‌گیرد.",
    blocks: [
      {
        kind: "table",
        title: "چهار دسته فعل حالتی",
        headers: ["دسته", "افعال پرکاربرد"],
        rows: [
          ["افکار و عقاید", "know، believe، understand، remember، forget، imagine، mean، notice، recognize"],
          ["مالکیت و داشتن", "have، own، possess، belong، contain، include، consist، depend on، owe"],
          ["ربطی و حسی", "be، seem، look، appear، become، get، feel، taste، smell، sound، stay، remain، see، hear"],
          ["احساسات و عواطف", "love، like، hate، need، want، hope، wish، mind، doubt"],
        ],
      },
      {
        kind: "note",
        title: "افعال دو‌معنایی",
        text: "بعضی افعال در یک معنا حالتی و در معنای دیگر کنشی‌اند: have (داشتن←حالتی / خوردن←کنشی)، think (عقیده←حالتی / فکر کردن←کنشی)، taste، smell، look، see، appear، feel، weigh.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "They own a big house. (NOT: They are owning…)", fa: "آن‌ها خانه بزرگی دارند." },
          { en: "I am having dinner now. (خوردن ← کنشی)", fa: "من الان دارم شام می‌خورم." },
        ],
      },
    ],
  },
  // ─────────────────────── درس ۴ ───────────────────────
  {
    id: "l4-g1",
    lesson: 4,
    title: "Modals — can / may / should / must",
    titleFa: "افعال ناقص (وجهی)",
    summary:
      "بعد از همه افعال ناقص همیشه شکل ساده فعل می‌آید؛ این افعال to، s، ed و ing نمی‌گیرند.",
    blocks: [
      {
        kind: "table",
        title: "جدول افعال ناقص",
        headers: ["فعل ناقص", "معنی", "کاربرد"],
        rows: [
          ["can / could", "توانستن", "توانایی + اجازه و درخواست (could ← گذشته)"],
          ["may / might", "ممکن بودن", "احتمال + اجازه (might احتمال ضعیف‌تر یا گذشته)"],
          ["should", "باید، بهتر است", "توصیه، پیشنهاد و وظیفه"],
          ["must", "باید", "اجبار شدید، قوانین و علامت‌های هشدار"],
        ],
      },
      {
        kind: "note",
        title: "have to / has to / had to",
        text: "برای اجبار ناشی از عامل بیرونی. have to/has to در زمان حال ساده است (سوالی/منفی با do/does) و had to شکل گذشته است (با did/didn't). در منفی و سوالی همیشه has به have و had به have تبدیل می‌شود.",
      },
      {
        kind: "note",
        title: "نکته کنکوری",
        text: "حدس منطقی مثبت ← must (They must be very tired.) • حدس منطقی منفی ← can't (You can't be hungry.) • بعد از فعل ناقص اگر فعل be بیاید فقط خودِ be می‌آید نه am/is/are.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "Their son can speak Japanese very well.", fa: "پسرشان می‌تواند ژاپنی را خیلی خوب صحبت کند." },
          { en: "My sister has to wash all dirty dishes after dinner.", fa: "خواهرم مجبور است بعد از شام تمام ظرف‌های کثیف را بشوید." },
          { en: "You mustn't forget to turn off the lights.", fa: "تو نباید فراموش کنی چراغ‌ها را خاموش کنی." },
        ],
      },
    ],
  },
  {
    id: "l4-g2",
    lesson: 4,
    title: "Prepositions of Time & Place",
    titleFa: "حروف اضافه زمان و مکان",
    summary: "in برای دوره‌ها و مکان‌های بزرگ، on برای روزها و سطوح، at برای ساعت‌ها و نقاط مشخص.",
    blocks: [
      {
        kind: "table",
        title: "زمان",
        headers: ["حرف اضافه", "کاربرد", "مثال"],
        rows: [
          ["in", "دوره‌ها، ماه‌ها، فصل‌ها، سال‌ها، دهه، قرن، صبح/بعدازظهر/عصر", "in April / in summer / in 1984 / in the morning"],
          ["on", "روزهای هفته، تاریخ‌ها، روز+بخش روز، تعطیلات", "on Monday / on 18th of June / on Friday evening / on vacation"],
          ["at", "ساعت، ظهر، شب، طلوع/غروب، سن", "at 8 o'clock / at noon / at night / at the age of 26"],
        ],
      },
      {
        kind: "note",
        title: "استثنای بسیار مهم",
        text: "قبل از today، yesterday، tomorrow، tonight، nowadays و عبارت‌های ساخته‌شده با every/last/next هرگز حرف اضافه نمی‌آید: at last night ❌ ← last night ✓",
      },
      {
        kind: "table",
        title: "مکان",
        headers: ["حرف اضافه", "کاربرد", "مثال"],
        rows: [
          ["in", "شهر، کشور، قاره، داخل فضای بسته", "in Tehran / in Iran / in the room"],
          ["on", "روی سطح، در تلویزیون/رادیو/تلفن، وسایل نقلیه با سقف", "on the table / on TV / on the bus"],
          ["at", "در منزل/مدرسه/کار، آدرس، نقطه مشخص", "at home / at school / at work / at 159 Main Street"],
        ],
      },
      {
        kind: "note",
        title: "نکات دیگر",
        text: "وسیله نقلیه ← by (by car) • مسیر ← from … to (from Tehran to Bukan) • بین دو چیز ← between، بین چند چیز ← among.",
      },
    ],
  },
  {
    id: "l4-g3",
    lesson: 4,
    title: "Adverbs of Manner",
    titleFa: "قیدهای حالت",
    summary: "چگونگی انجام فعل را نشان می‌دهند؛ معمولاً با افزودن ly به صفت ساخته می‌شوند.",
    blocks: [
      {
        kind: "formula",
        title: "ساختن قید حالت",
        text: "صفت + ly ← قید حالت (slow→slowly، final→finally) • y←ily (happy→happily) • able/ible←ibly (comfortable→comfortably) • ic←ically (scientific→scientifically)",
      },
      {
        kind: "table",
        title: "قیدهای بی‌قاعده",
        headers: ["صفت", "قید حالت", "معنی قید"],
        rows: [
          ["fast", "fast", "به سرعت"],
          ["hard", "hard", "به سختی"],
          ["good", "well", "به خوبی"],
          ["late", "late", "با تأخیر (lately ← اخیراً)"],
          ["early / fast / long / high / straight …", "خود صفت", "—"],
        ],
      },
      {
        kind: "note",
        title: "محل قید حالت",
        text: "بعد از «فعل + مفعول» یا قبل از فعل اصلی — هرگز بین فعل و مفعول نمی‌آید: The people of the town generously helped poor people. (نه: helped generously poor people)",
      },
      {
        kind: "note",
        title: "نکته کنکوری",
        text: "hardly قید تکرار است به معنی «به ندرت» و خودش جمله را منفی می‌کند: He could hardly walk. • friend+ly←friendly صفت است نه قید. بعد از افعال ربطی (be, seem, look…) صفت می‌آید نه قید.",
      },
      {
        kind: "examples",
        title: "مثال",
        items: [{ en: "Reza is a hard worker. He works hard.", fa: "رضا کارگر سخت‌کوشی است. او به سختی کار می‌کند." }],
      },
    ],
  },
];

export function grammarOfLesson(lesson: number): GrammarLesson[] {
  return GRAMMAR_LESSON_LIST.filter((g) => g.lesson === lesson);
}
