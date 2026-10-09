import type { GrammarLesson } from "../types";

/**
 * درسنامه‌های گرامر جزوه «زبان انگلیسی پایه هشتم» — دکتر حسن لطفی.
 * درس ۰ = مرور مکمل از ضمائم خود جزوه (صفحات ۹۵ تا ۹۷) و درس ۱ تا ۷ = دستور زبان درس اول تا هفتم (صفحات ۱۵ تا ۷۰).
 * هر درس کتاب ممکن است چند درسنامه گرامری داشته باشد.
 *
 * نکات وفاداری به متن جزوه:
 * - ترجمه‌های فارسی عین جزوه است؛ لیگاتور «لا» ترمیم شده (لازم، معمولاً، ...) و اعدادِ متن‌های توضیحی فارسی‌اند.
 * - آپاستروف جزوه (`) در مخفف‌ها با آپاستروف استاندارد (') بازنویسی شده است (What`s → What's).
 * - جزوه در جدول‌های تصویری (رنگ‌ها ص ۹۶ و فعالیت‌های وقت فراغت ص ۶۶) فقط نام انگلیسی چاپ کرده؛
 *   معنی فارسی این سطرها برای کاربرد درسنامه افزوده شده است.
 *
 * اصلاحیه (غلط‌های چاپی جزوه که در این فایل اصلاح شده‌اند):
 * - ص ۹۷: نام ماه‌های June و July چاپی «جان» و «جوالی» ← «ژوئن» و «ژوئیه».
 * - ص ۳۴: ترجمه He can take photos. چاپی «او می‌تواند عکس بگیرید» ← «او می‌تواند عکس بگیرد».
 * - ص ۳۴: ترجمه They can play basketball. چاپی «آنها می‌توانند بسکتبال بازی می‌کنند» ← «آنها می‌توانند بسکتبال بازی کنند».
 * - ص ۴۰: جمله is Ali, ok? ← Is Ali OK?
 */
export const GRAMMAR_LESSON_LIST: GrammarLesson[] = [
  // ─────────────────────── درس ۰ — مرور مکمل از ضمائم جزوه ───────────────────────
  {
    id: "g8-0-1",
    lesson: 0,
    title: "Appendix Review: Numbers, Colors, Days & Months",
    titleFa: "ضمائم — اعداد، رنگ‌ها، روزها و ماه‌ها",
    summary:
      "مرور مکمل از ضمائم خود جزوه (صفحات ۹۵ تا ۹۷): جدول اعداد ۱ تا ۱۰۰، جدول حروف ترکیبی، روزهای هفته با ریشه لاتین، جدول تبدیل ماه‌های میلادی به شمسی و رنگ‌ها.",
    blocks: [
      {
        kind: "note",
        title: "منبع این درسنامه",
        text: "محتوای این درسنامه از ضمائم پایانی خود جزوه (صفحات ۹۵ تا ۹۷) انتخاب شده و یک مرور مکمل برای کل کتاب است؛ نه بخش دستوری درس خاصی.",
      },
      {
        kind: "table",
        title: "اعداد در زبان انگلیسی (Numbers) — صفحات ۹۵ جزوه",
        headers: ["عدد", "کلمه انگلیسی", "عدد", "کلمه انگلیسی"],
        rows: [
          ["1", "one", "2", "two"],
          ["3", "three", "4", "four"],
          ["5", "five", "6", "six"],
          ["7", "seven", "8", "eight"],
          ["9", "nine", "10", "ten"],
          ["11", "eleven", "12", "twelve"],
          ["13", "thirteen", "14", "fourteen"],
          ["15", "fifteen", "16", "sixteen"],
          ["17", "seventeen", "18", "eighteen"],
          ["19", "nineteen", "20", "twenty"],
          ["30", "thirty", "40", "forty"],
          ["50", "fifty", "60", "sixty"],
          ["70", "seventy", "80", "eighty"],
          ["90", "ninety", "100", "one hundred"],
        ],
      },
      {
        kind: "table",
        title: "حروف ترکیبی — صفحات ۹۵ جزوه",
        headers: ["حروف ترکیبی", "مثال‌ها"],
        rows: [
          ["St", "First – street"],
          ["Ch", "Teacher – chair"],
          ["Ee", "See – meet"],
          ["Sh", "Spanish – shoes"],
          ["Ay", "Play – Saturday"],
          ["Fr", "France – fresh"],
          ["Oo", "Look – too"],
          ["Sp", "Speak – sports"],
          ["Ll", "Ball – tall"],
          ["Br", "Brother – break"],
          ["Sw", "Swim – sweater"],
          ["Pl", "Play – plow"],
          ["Ea", "Clean – tea"],
          ["Th", "Tooth – weather"],
          ["Ph", "Photo – elephant"],
          ["Qu", "Quit – question"],
          ["ch", "Mechanic – technology"],
          ["wh", "When – who"],
        ],
      },
      {
        kind: "text",
        title: "روزها — تقسیم‌بندی weekdays و weekends (صفحه ۹۶)",
        text: "طبق استاندارد بین‌المللی آغاز هفته روز دوشنبه است، ولی در چندین کشور از جمله ایالات متحده آمریکا و کانادا روز آغازین هفته یکشنبه است. روزهای هفته به دو دسته تقسیم می‌شوند؛ weekdays و weekends. Weekdays به معنی روزهای کاری است و بنابراین شامل ۵ روزی است که تعطیل نمی‌باشند (دوشنبه تا جمعه). از سوی دیگر weekends به معنی روزهای آخر هفته است که تعطیل می‌باشند (Saturday و Sunday). برای برخی از ایام هفته ممکن است با مخفف‌های دیگری نیز برخورد کنید؛ مثلاً برای Tuesday از Tues. نیز استفاده می‌شود یا برای Thursday از Thur. یا Thurs.",
      },
      {
        kind: "note",
        title: "دو نکته درباره روزها (صفحه ۹۶)",
        text: "۱) اسامی روزها همیشه با حروف بزرگ (capital letters) نوشته می‌شوند. ۲) به طور کلی برای ایام هفته از حرف اضافه on استفاده می‌شود.",
      },
      {
        kind: "table",
        title: "روزهای هفته و ریشه لاتین آنها — صفحات ۹۷ جزوه",
        headers: ["روز", "ریشه لاتین", "ترجمه انگلیسی", "ترجمه فارسی"],
        rows: [
          ["Sunday", "dies solis", "Day of the Sun", "روز خورشید"],
          ["Monday", "dies Lunae", "Day of the Moon", "روز ماه"],
          ["Tuesday", "dies Martis", "Day of Mars", "روز مریخ"],
          ["Wednesday", "dies Mercurii", "Day of Mercury", "روز عطارد"],
          ["Thursday", "dies Iovis", "Day of Jupiter", "روز مشتری"],
          ["Friday", "dies Veneris", "Day of Venus", "روز زهره"],
          ["Saturday", "diēs saturnī", "Day of Saturn", "روز زحل"],
        ],
      },
      {
        kind: "text",
        title: "ریشه روزهای هفته (صفحه ۹۶)",
        text: "اسامی روزهای هفته در بیشتر زبان‌هایی که ریشه آنها زبان لاتین است از تقویم رومی (Roman Calendar) گرفته شده است که براساس نام سیارات (planets) است و نام روزهای هفته از طریق این زبان‌ها وارد زبان انگلیسی شده‌اند.",
      },
      {
        kind: "table",
        title: "جدول تبدیل ماه میلادی به ماه شمسی — صفحات ۹۷ جزوه",
        headers: ["شماره", "ماه میلادی", "معادل فارسی", "ماه شمسی (بازه)", "تعداد روز"],
        rows: [
          ["۱", "January", "ژانویه", "۱۱ دی تا ۱۱ بهمن", "۳۱"],
          ["۲", "February", "فوریه", "۱۲ بهمن تا ۹ اسفند", "۲۸"],
          ["۳", "March", "مارس", "۱۰ اسفند تا ۱۱ فروردین", "۳۱"],
          ["۴", "April", "آوریل", "۱۲ فروردین تا ۱۰ اردیبهشت", "۳۰"],
          ["۵", "May", "می", "۱۱ اردیبهشت تا ۱۰ خرداد", "۳۱"],
          ["۶", "June", "ژوئن", "۱۱ خرداد تا ۹ تیر", "۳۰"],
          ["۷", "July", "ژوئیه", "۱۰ تیر تا ۹ مرداد", "۳۱"],
          ["۸", "August", "آگوست", "۱۰ مرداد تا ۹ شهریور", "۳۱"],
          ["۹", "September", "سپتامبر", "۱۰ شهریور تا ۸ مهر", "۳۰"],
          ["۱۰", "October", "اکتبر", "۹ مهر تا ۹ آبان", "۳۱"],
          ["۱۱", "November", "نوامبر", "۱۰ آبان تا ۹ آذر", "۳۰"],
          ["۱۲", "December", "دسامبر", "۱۰ آذر تا ۱۰ دی", "۳۱"],
        ],
      },
      {
        kind: "table",
        title: "رنگ‌ها در زبان انگلیسی (Colors) — صفحات ۹۶ جزوه",
        headers: ["رنگ انگلیسی", "معنی فارسی"],
        rows: [
          ["pink", "صورتی"],
          ["purple", "بنفش"],
          ["red", "قرمز"],
          ["green", "سبز"],
          ["yellow", "زرد"],
          ["blue", "آبی"],
          ["orange", "نارنجی"],
          ["brown", "قهوه‌ای"],
          ["black", "سیاه"],
          ["white", "سفید"],
          ["grey", "خاکستری"],
          ["silver", "نقره‌ای"],
          ["cream", "کرم"],
          ["beige", "بژ"],
          ["gold", "طلایی"],
        ],
      },
      {
        kind: "note",
        title: "یادآوری",
        text: "در جدول رنگ‌ها جزوه فقط نام انگلیسی هر رنگ را کنار تصویر چاپ کرده است؛ معنی‌های فارسی سطرها برای کاربرد درسنامه افزوده شده‌اند.",
      },
    ],
  },

  // ─────────────────────── درس ۱ ───────────────────────
  {
    id: "g8-1-1",
    lesson: 1,
    title: "Talking about Nationalities",
    titleFa: "بیان ملیت‌ها",
    summary:
      "بیان ملیت افراد با فعل to be: جدول صرف ضمیرها، دو الگوی پرسش کشور و ملیت (Where are you from? و What's ... nationality?)، جملات مثبت و منفی و سوالی، پاسخ کوتاه، سوال با where و مقایسه from + کشور با صفت ملیت (صفحات ۱۵ تا ۱۷ جزوه).",
    blocks: [
      {
        kind: "table",
        title: "فعل to be با ضمایر (صفحه ۱۵)",
        headers: ["ضمیر + فعل", "معنی"],
        rows: [
          ["I am …", "من ... هستم"],
          ["We are …", "ما ... هستیم"],
          ["You are …", "شما ... هستید"],
          ["You are …", "تو ... هستی"],
          ["He is … / She is …", "او ... است"],
          ["They are …", "آنها ... هستند"],
        ],
      },
      {
        kind: "text",
        title: "الگوهای پرسیدن کشور و ملیت",
        text: "۱) برای پرسیدن کشور یا ملیت طرف مقابل از الگوی Where are you from? استفاده می‌کنیم. اگر همین سوال را در مورد اشخاص دیگر بپرسیم جمله‌ها کمی تغییر پیدا می‌کنند: Where is (he / she / اسم یک نفر) from? و What's his / her / اسم یک نفر's nationality?",
      },
      {
        kind: "examples",
        title: "مثال‌های الگوی اول — Where is ... from?",
        items: [
          { en: "Where is he from?", fa: "او اهل کجاست؟" },
          { en: "Where is Mohammad from?", fa: "محمد اهل کجاست؟" },
          { en: "Where is the tourist from?", fa: "گردشگر اهل کجاست؟" },
        ],
      },
      {
        kind: "examples",
        title: "مثال‌های الگوی دوم — What's ... nationality?",
        items: [
          { en: "What's her nationality?", fa: "ملیت او (مؤنث) چیست؟" },
          { en: "What is John's nationality?", fa: "ملیت جان چیست؟" },
          { en: "What's the player's nationality?", fa: "ملیت بازیکن چیست؟" },
        ],
      },
      {
        kind: "note",
        title: "کشور با from، ملیت بدون from",
        text: "۲) در جواب سوالات بالا اگر فقط به کشور اشاره شود، قبل از کشور کلمه from نوشته می‌شود، اما اگر ملیت گفته شود کلمه from لازم نیست؛ یعنی: I am from … (کشور) و I am … (ملیت).",
      },
      {
        kind: "examples",
        title: "پاسخ با کشور و سپس با ملیت",
        items: [
          { en: "A: Where are you from? — B: I'm from Iran. → B: I am Iranian.", fa: "اهل کجا هستی؟ — من اهل ایرانم. → من ایرانی‌ام." },
          { en: "A: Where is Mary from? — B: She is from England. → B: She is English.", fa: "مری اهل کجاست؟ — او اهل انگلیس است. → او انگلیسی است." },
        ],
      },
      {
        kind: "text",
        title: "بیان جملات مثبت",
        text: "برای بیان این که شخص اهل کدام کشور است کافی است در جای خالی پس از کلمه‌ی from نام کشور مورد نظر را یادداشت کنیم.",
      },
      {
        kind: "examples",
        title: "مثال‌های جملات مثبت",
        items: [
          { en: "I am from Iran.", fa: "من اهل ایران هستم." },
          { en: "She is from France.", fa: "او اهل فرانسه است." },
          { en: "They are from China.", fa: "آنها اهل چین هستند." },
        ],
      },
      {
        kind: "text",
        title: "بیان جملات منفی",
        text: "برای منفی کردن جملات کافی است پس از am، is، are از not استفاده کنیم. لازم به ذکر است که می‌توانیم از مخفف کلمات نیز استفاده کنیم: Is not: isn't / Are not: aren't / Am not: مخفف ندارد.",
      },
      {
        kind: "examples",
        title: "مثال‌های جملات منفی",
        items: [
          { en: "You aren't from Spain.", fa: "شما اهل اسپانیا نیستید." },
          { en: "He isn't from England.", fa: "او اهل انگلیس نیست." },
          { en: "I'm not from China.", fa: "من اهل چین نیستم." },
        ],
      },
      {
        kind: "text",
        title: "بیان جملات سوالی",
        text: "برای پرسشی کردن جملات کافی است am، is، are را در ابتدای جمله بیاوریم؛ به عبارت دیگر اگر جای am، is، are را با ضمیرهای فاعلی عوض کنیم جمله سوالی می‌شود.",
      },
      {
        kind: "examples",
        title: "مثال‌های جملات سوالی",
        items: [
          { en: "Are they from Spain?", fa: "آیا آنها اهل اسپانیا هستند؟" },
          { en: "Is she from Iran?", fa: "آیا او اهل ایران است؟" },
          { en: "Is Hossein from England?", fa: "آیا حسین اهل انگلیس است؟" },
        ],
      },
      {
        kind: "text",
        title: "بیان پاسخ کوتاه",
        text: "برای این که به سوالات پاسخ کوتاه داده شود کافی است در ابتدا yes یا No بگذاریم و سپس عبارت مناسب را یادداشت کنیم (برای هر سوال هم پاسخ مثبت و هم پاسخ منفی ارائه شده است).",
      },
      {
        kind: "examples",
        title: "پاسخ‌های کوتاه",
        items: [
          { en: "Are they from Iran? — Yes, they are. / No, they aren't.", fa: "آیا آنها اهل ایران هستند؟ — بله، هستند / نه، نیستند." },
          { en: "Is Reza from England? — Yes, he is. / No, he isn't.", fa: "آیا رضا اهل انگلیس است؟ — بله، است / نه، نیست." },
          { en: "Are you from Brazil? — Yes, I am. / No, I'm not.", fa: "آیا تو اهل برزیل هستی؟ — بله، هستم / نه، نیستم." },
        ],
      },
      {
        kind: "text",
        title: "بیان سوال با where",
        text: "کافی است در ابتدای سوال از where استفاده کنیم. برای پاسخ به چنین سوالاتی نیز به راحتی از همان جملات مثبت که قبلاً اشاره شد استفاده می‌کنیم.",
      },
      {
        kind: "examples",
        title: "سوال با where و پاسخ",
        items: [
          { en: "Where are you from?", fa: "شما اهل کجا هستید؟" },
          { en: "Where is she from?", fa: "او اهل کجاست؟" },
          { en: "Where is Ronaldo from? — He is from Brazil.", fa: "رونالدو اهل کجاست؟ — او اهل برزیل است." },
          { en: "Where are they from? — They are from Iran.", fa: "آنها اهل کجا هستند؟ — آنها اهل ایران هستند." },
          { en: "Where are you from? — I'm from France.", fa: "شما اهل کجا هستید؟ — من اهل فرانسه‌ام." },
        ],
      },
      {
        kind: "note",
        title: "نکته: ملیت بدون from",
        text: "برای بیان ملیت‌ها دیگر نباید از from استفاده کنیم. برای درک بهتر جملات زیر را مقایسه کنید: You are from Brazil. در برابر You are Brazilian. و She is from Spain. در برابر She is Spanish.",
      },
      {
        kind: "examples",
        title: "مثال‌های بیان ملیت",
        items: [
          { en: "They are Chinese.", fa: "آنها چینی هستند." },
          { en: "She is Spanish.", fa: "او اسپانیایی است." },
          { en: "You are Brazilian. ↔ You are from Brazil.", fa: "تو برزیلی هستی. ↔ تو اهل برزیل هستی." },
          { en: "She is Spanish. ↔ She is from Spain.", fa: "او اسپانیایی است. ↔ او اهل اسپانیا است." },
        ],
      },
    ],
  },

  // ─────────────────────── درس ۲ ───────────────────────
  {
    id: "g8-2-1",
    lesson: 2,
    title: "Simple Present Tense",
    titleFa: "زمان حال ساده",
    summary:
      "زمان حال ساده و دو کاربرد اصلی آن: بیان فعالیت‌های معمول و عادات روزانه (usual activities و daily habits) و بیان حقایق طبیعی (general statement of fact) با مثال‌های جزوه (صفحه ۲۴ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "کاربرد زمان حال ساده",
        text: "همان‌طور که می‌دانید، فعالیت‌هایی که تداوم دارند و به صورت روتین در حال انجام هستند را با این زمان بیان می‌کنیم. دو کاربرد اصلی این زمان: الف) فعالیت‌های معمول (usual activities) و عادات روزانه (daily habits)؛ ب) بیان حقایق طبیعی (general statement of fact).",
      },
      {
        kind: "examples",
        title: "الف) فعالیت‌های معمول و عادات روزانه",
        items: [
          { en: "Ali takes a shower every day.", fa: "علی هر روز دوش می‌گیرد." },
          { en: "I usually read the newspaper in the morning.", fa: "من معمولاً در صبح روزنامه می‌خونم." },
        ],
      },
      {
        kind: "examples",
        title: "ب) بیان حقایق طبیعی",
        items: [
          { en: "Babies cry.", fa: "بچه‌ها گریه می‌کنند." },
          { en: "Birds fly.", fa: "پرنده‌ها پرواز می‌کنند." },
        ],
      },
    ],
  },
  {
    id: "g8-2-2",
    lesson: 2,
    title: "Questions & Negatives with Do / Does",
    titleFa: "سوالی و منفی کردن حال ساده با do و does",
    summary:
      "سوالی کردن جملات حال ساده با قرار دادن do و does در ابتدای جمله (does برای سوم شخص مفرد و do برای سایر ضمایر) و منفی کردن آنها با do/does + not (صفحه ۲۴ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "سوالی کردن زمان حال ساده",
        text: "برای سؤالی کردن جملات زمان حال ساده دو فعل کمکی do و does را در ابتدای جمله قبل از فاعل قرار می‌دهیم؛ بدین ترتیب که از does برای سوم شخص مفرد و برای سایر ضمایر از do استفاده می‌شود.",
      },
      {
        kind: "examples",
        title: "مثال‌های سوالی کردن",
        items: [
          { en: "Does she drink tea very often?", fa: "آیا او اغلب اوقات چای می‌نوشد؟" },
          { en: "Do I come from Iran?", fa: "آیا من اهل ایرانم؟" },
          { en: "Do workers clean here every Monday?", fa: "آیا کارگران هر دوشنبه اینجا را نظافت می‌کنند؟" },
        ],
      },
      {
        kind: "text",
        title: "منفی کردن زمان حال ساده",
        text: "برای منفی کردن زمان حال ساده از دو فعل کمکی do و does با کمک کلمهٔ not استفاده می‌گردد؛ بدین ترتیب که از does برای سوم شخص مفرد و برای سایر ضمایر از do استفاده می‌گردد.",
      },
      {
        kind: "examples",
        title: "مثال‌های منفی کردن",
        items: [
          { en: "He doesn't work for I.R.I.B.", fa: "او برای صدا و سیما کار نمی‌کند." },
          { en: "Your dog doesn't bark loudly.", fa: "سگ شما با صدای بلند پارس نمی‌کند." },
        ],
      },
    ],
  },
  {
    id: "g8-2-3",
    lesson: 2,
    title: "Important Notes of Lesson Two",
    titleFa: "نکات مهم درس دوم — ایام هفته، شبانه‌روز و الگوها",
    summary:
      "یادآوری ایام هفته و قسمت‌های مختلف شبانه‌روز، الگوی What do you do in ...? برای پرسیدن فعالیت‌ها، الگوی When / What days do you ...? برای پرسیدن زمان انجام فعالیت، نکته‌های on و in، weekend و weekdays و تلفظ st (صفحات ۲۵ و ۲۶ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "یادآوری",
        text: "۱) قبل از هر چیز یکبار دیگر ایام هفته و قسمت‌های مختلف شبانه‌روز را یادآوری می‌کنیم:",
      },
      {
        kind: "table",
        title: "ایام هفته (صفحه ۲۵)",
        headers: ["روز انگلیسی", "معنی فارسی"],
        rows: [
          ["Saturday", "شنبه"],
          ["Sunday", "یکشنبه"],
          ["Monday", "دوشنبه"],
          ["Tuesday", "سه‌شنبه"],
          ["Wednesday", "چهارشنبه"],
          ["Thursday", "پنجشنبه"],
          ["Friday", "جمعه"],
        ],
      },
      {
        kind: "table",
        title: "قسمت‌های مختلف شبانه‌روز (صفحه ۲۵)",
        headers: ["کلمه انگلیسی", "معنی فارسی"],
        rows: [
          ["morning", "صبح"],
          ["noon (midday)", "وسط روز"],
          ["afternoon", "بعدازظهر"],
          ["evening", "عصر"],
          ["night", "شب"],
          ["midnight", "نیمه‌شب"],
        ],
      },
      {
        kind: "text",
        title: "الگوی پرسیدن فعالیت‌ها در طول هفته",
        text: "۲) برای پرسیدن فعالیت‌های اشخاص در طول هفته از الگوی What do you do ………………? استفاده می‌کنیم (چه کار انجام می‌دهید در ...؟) و در جواب باید به فعالیت‌های خودمان اشاره کنیم.",
      },
      {
        kind: "examples",
        title: "مثال الگوی اول",
        items: [
          { en: "What do you do in the mornings? — I go to school.", fa: "صبح‌ها چه کار می‌کنید؟ — به مدرسه می‌روم." },
        ],
      },
      {
        kind: "text",
        title: "الگوی پرسیدن زمان یا روزهای انجام یک فعالیت خاص",
        text: "۳) برای پرسیدن زمان یا روزهای انجام یک فعالیت خاص الگو را به شکل When / What days do you ………...? تغییر می‌دهیم (چه موقع / چه روزهایی ...؟) و در پاسخ باید به روز یا زمان انجام آن فعالیت اشاره کنیم.",
      },
      {
        kind: "examples",
        title: "مثال‌های الگوی دوم",
        items: [
          { en: "A: When do you go shopping? — B: Every Sunday afternoon.", fa: "چه موقع خرید می‌کنید؟ — هر یکشنبه بعدازظهر." },
          { en: "A: What days do you play sports? — B: On Mondays and Fridays.", fa: "چه روزهایی ورزش می‌کنید؟ — دوشنبه‌ها و جمعه‌ها." },
        ],
      },
      {
        kind: "note",
        title: "نکته ۱ — حروف اضافه on و in",
        text: "قبل از ایام هفته حرف اضافه On و قبل از صبح و ظهر و عصر In به کار می‌رود.",
      },
      {
        kind: "note",
        title: "نکته ۲ — weekend و weekdays",
        text: "دو روز آخر هفته را Weekend یا آخر هفته می‌نامیم و پنج روز دیگر را Weekdays می‌گوییم.",
      },
      {
        kind: "note",
        title: "نکته ۳ — آغاز هفته در فرهنگ غربی",
        text: "در فرهنگ غربی شروع هفته از دوشنبه و پایان و روز تعطیل رسمی هفتگی یکشنبه‌هاست.",
      },
      {
        kind: "note",
        title: "نکته ۴ — تلفظ st",
        text: "در تلفظ St در اول کلمات صدای /e/ وجود ندارد و کلمه با صدای /s/ شروع می‌شود. طرز خواندن کلمات زیر را یاد بگیرید: street – study – start – stand up – stay",
      },
    ],
  },

  // ─────────────────────── درس ۳ ───────────────────────
  {
    id: "g8-3-1",
    lesson: 3,
    title: "Possessive Adjectives",
    titleFa: "صفت‌های ملکی",
    summary:
      "صفت‌های ملکی my، your، his، her، its، our، their و مطابقت آنها با ضمایر فاعلی + سه مثال مطابقت و نکته «صفت ملکی به تنهایی معنی ندارد و باید قبل از اسم بیاید» (صفحات ۳۳ و ۳۴ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "صفت‌های ملکی",
        text: "صفت‌های ملکی برای نشان دادن مالکیت به کار می‌روند و عبارتند از: my – your – his – her – its – our – their که در مطابقت با ضمایر فاعلی به صورت زیر می‌باشند.",
      },
      {
        kind: "table",
        title: "مطابقت ضمایر فاعلی و صفت‌های ملکی (صفحه ۳۳)",
        headers: ["ضمیر فاعلی", "معنی", "صفت ملکی", "معنی"],
        rows: [
          ["I", "من", "my", "مال من"],
          ["you", "تو", "your", "مال تو"],
          ["she", "او (مؤنث)", "her", "مال او"],
          ["he", "او (مذکر)", "his", "مال او"],
          ["it", "آن (شی)", "its", "مال آن"],
          ["we", "ما", "our", "مال ما"],
          ["you", "شما", "your", "مال شما"],
          ["they", "آنها", "their", "مال آنها"],
        ],
      },
      {
        kind: "examples",
        title: "مثال‌های مطابقت ضمیر فاعلی و صفت ملکی (صفحه ۳۴)",
        items: [
          { en: "I have a bag. My bag is yellow.", fa: "من یک کیف دارم. کیف من زرد است." },
          { en: "She has two pens. Her pens are on the table.", fa: "او دو خودکار دارد. خودکارهای او روی میز هستند." },
          { en: "We have a house. Our house is in this street.", fa: "ما یک خانه داریم. خانه‌مان در این خیابان است." },
        ],
      },
      {
        kind: "note",
        title: "نکته ۱ — صفت ملکی تنها معنی ندارد",
        text: "صفت‌های ملکی به تنهایی معنی ندارند و باید قبل از اسم بیایند.",
      },
    ],
  },
  {
    id: "g8-3-2",
    lesson: 3,
    title: "Expressing Abilities",
    titleFa: "بیان توانایی‌ها",
    summary:
      "دو روش بیان توانایی‌های خود یا دیگران: الف) ساختار be + good at + فعل ing و ب) فعل can + فعل ساده، همراه با فرمول و مثال‌های جزوه (صفحه ۳۴ جزوه).",
    blocks: [
      {
        kind: "note",
        title: "دو روش بیان توانایی",
        text: "نکته ۲: برای بیان توانایی‌های خود یا دیگران از دو روش استفاده می‌کنیم: الف) با استفاده از افعال be و good at؛ ب) با استفاده از فعل Can (توانستن).",
      },
      {
        kind: "formula",
        title: "روش الف — good at",
        text: "فاعل + be (am / is / are) + good at + فعل ing",
      },
      {
        kind: "examples",
        title: "مثال‌های روش الف",
        items: [
          { en: "I am good at drawing.", fa: "من در نقاشی کشیدن خوب هستم." },
          { en: "He is good at taking photos.", fa: "او در عکس گرفتن خوب است." },
        ],
      },
      {
        kind: "formula",
        title: "روش ب — can",
        text: "فاعل + can + فعل + ……….",
      },
      {
        kind: "examples",
        title: "مثال‌های روش ب",
        items: [
          { en: "I can draw.", fa: "من می‌توانم نقاشی بکشم." },
          { en: "He can take photos.", fa: "او می‌تواند عکس بگیرد." },
          { en: "They can play basketball.", fa: "آنها می‌توانند بسکتبال بازی کنند." },
        ],
      },
    ],
  },

  // ─────────────────────── درس ۴ ───────────────────────
  {
    id: "g8-4-1",
    lesson: 4,
    title: "Health & Giving Advice",
    titleFa: "احوالپرسی سلامتی و توصیه",
    summary:
      "سه جمله پرسیدن احوال سلامتی (What's wrong? و What's the matter? و What's the problem?)، احوالپرسی با Are/is + ضمیر + OK/all right و پاسخ با yes و No، الگوهای توصیه و تلفظ ch با صدای «ک» و ea با صدای /e/ (صفحه ۴۰ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "پرسیدن احوال و سلامتی",
        text: "برای جویا شدن احوال و سلامتی اشخاص سه جملهٔ زیر را می‌توان به کار برد که تقریباً معنای یکسان دارند. در جواب باید مشکل سلامتی یا بیماری را بیان کنیم.",
      },
      {
        kind: "examples",
        title: "سه جمله پرسیدن احوال سلامتی",
        items: [
          { en: "What's wrong?", fa: "چه اتفاقی افتاده؟" },
          { en: "What's the matter?", fa: "چه شده؟" },
          { en: "What's the problem?", fa: "مشکل چیست؟" },
        ],
      },
      {
        kind: "examples",
        title: "پاسخ با بیان مشکل سلامتی",
        items: [
          { en: "A: What's wrong? — B: I have a headache.", fa: "چه شده؟ — سردرد دارم." },
          { en: "A: What's the problem? — B: I have the flu.", fa: "مشکل چیست؟ — آنفلوانزا دارم." },
        ],
      },
      {
        kind: "formula",
        title: "احوالپرسی با am / is / are",
        text: "همچنین می‌توان با آوردن فعل‌های (am / is / are) به شکل زیر احوالپرسی کرد: Are / is + ضمیر یا اسم + ok / all right? — در جواب این سوال باید yes و No به کار ببریم.",
      },
      {
        kind: "examples",
        title: "مثال‌ها",
        items: [
          { en: "Are you OK?", fa: "حالت خوب است؟" },
          { en: "Is he all right?", fa: "حالش خوب است؟" },
          { en: "A: Is Ali OK? — B: No, he has a backache.", fa: "حال علی خوب است؟ — نه، کمردرد دارد." },
        ],
      },
      {
        kind: "text",
        title: "الگوهای توصیه",
        text: "پس از شنیدن مشکل سلامتی افراد می‌توانید توصیه‌های مناسبی را مانند الگوهای زیر ارائه دهید: Why don't you …? (چرا شما نه) و (You should …) شما باید و (Go to ………...) برو به.",
      },
      {
        kind: "examples",
        title: "مثال‌های توصیه",
        items: [
          { en: "A: I have a toothache. — B: Go to the dentist.", fa: "دنداندرد دارم. — به دندانپزشک برو." },
          { en: "A: I have a running nose. — B: Why don't you get some rest?", fa: "آبریزش بینی دارم. — چرا کمی استراحت نمی‌کنی؟" },
        ],
      },
      {
        kind: "note",
        title: "تلفظ ch با صدای «ک»",
        text: "در بعضی از کلمات حرف /ch/ صدای (ک) می‌دهد. مانند: school – backache – mechanic – zucchini – stomachache",
      },
      {
        kind: "note",
        title: "تلفظ ea با صدای /e/",
        text: "در بعضی از کلمات حروف /ea/ صدای /e/ می‌دهد. مانند: headache – bread – health – sweater – weather",
      },
    ],
  },

  // ─────────────────────── درس ۵ ───────────────────────
  {
    id: "g8-5-1",
    lesson: 5,
    title: "Asking about Places & Describing a City",
    titleFa: "پرسش مکان و توصیف شهر",
    summary:
      "نکات مهم درس پنجم: الگوی Where is + شهر? برای موقعیت جغرافیایی، الگوی What's (شهر) like? برای شکل ظاهری، پرسش وجود امکانات با Is there a/an…? و Are there any…?، الگوی What is ... famous for? و تلفظ th با صدای /θ/ (صفحات ۴۸ و ۴۹ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "۱) پرسش مکان و موقعیت جغرافیایی شهر",
        text: "برای پرسیدن مکان و موقعیت جغرافیایی شهر از جملۀ زیر استفاده می‌کنیم: Where is + (it / نام شهر)? — در جواب این سوال می‌توان به موقعیت جغرافیایی شهر اشاره کرد.",
      },
      {
        kind: "examples",
        title: "مثال‌های موقعیت شهر",
        items: [
          { en: "Where is Mashhad? — It's in the north-east of Iran.", fa: "مشهد کجاست؟ — در شمال شرقی ایران است." },
          { en: "Where is it? — It's in the west.", fa: "کجاست؟ — در غرب است." },
          { en: "Where is Maku? — It's in the north-west.", fa: "ماکو کجاست؟ — در شمال غربی ایران است." },
        ],
      },
      {
        kind: "text",
        title: "۲) پرسش شکل ظاهری شهر",
        text: "برای پرسیدن شکل ظاهری شهر جملة زیر را به کار می‌بریم: What's (it / نام شهر) like? — در جواب این سوال نیز به مشخصات ظاهری شهر مانند بزرگی، تمیزی، زیبایی، قدیمی بودن و ... می‌توان اشاره نمود.",
      },
      {
        kind: "examples",
        title: "مثال‌های توصیف شهر",
        items: [
          { en: "What's Tabriz like? — It's big and old.", fa: "تبریز چگونه است؟ — بزرگ و قدیمی است." },
          { en: "What is it like? — It's clean and beautiful.", fa: "چگونه است؟ — تمیز و زیباست." },
        ],
      },
      {
        kind: "text",
        title: "۳) پرسش وجود امکانات خاص",
        text: "برای پرسیدن وجود امکانات خاص مانند فرودگاه، استادیوم، مترو، موزه و ... از جمله‌های زیر می‌توان استفاده کرد: Is there a/an ….. ? (مفرد) و Are there any ………. ? (جمع). جواب مثبت یا منفی به این سوالات نیز به شکل زیر می‌باشد.",
      },
      {
        kind: "examples",
        title: "مثال‌های وجود امکانات",
        items: [
          { en: "Is there a stadium? — Yes, there is. / No, there isn't.", fa: "آیا استادیومی وجود دارد؟ — بله، وجود دارد / نه، وجود ندارد." },
          { en: "Are there any museums? — Yes, there are. / No, there aren't.", fa: "آیا موزه‌هایی وجود دارد؟ — بله، وجود دارد / نه، وجود ندارد." },
        ],
      },
      {
        kind: "text",
        title: "۴) پرسش معروف بودن شهر",
        text: "۴) برای پرسیدن اینکه شهر برای چه چیز معروف است از جمله زیر استفاده می‌کنیم: What is + (it / شهر) famous for?",
      },
      {
        kind: "examples",
        title: "مثال معروفیت",
        items: [
          { en: "A: What's Isfahan famous for? — B: It's famous for its old mosques.", fa: "اصفهان برای چی معروف است؟ — به‌خاطر مساجد قدیمی‌اش معروف است." },
        ],
      },
      {
        kind: "note",
        title: "نکته تلفظ — th با صدای /θ/",
        text: "تلفظ درست th (ث) یا /θ/ را با کمک دبیرتان در مثال‌های زیر تمرین کنید: north – south – three – thanks – bathroom – toothache – Thursday – math",
      },
    ],
  },

  // ─────────────────────── درس ۶ ───────────────────────
  {
    id: "g8-6-1",
    lesson: 6,
    title: "Weather & Describing a Village",
    titleFa: "آب‌وهوا و توصیف روستا",
    summary:
      "واژگان وضعیت هوا و فصل‌ها با تصویر، الگوی What's the weather like in ...? و Is it ... in (فصل)? با مثال رشت، معرفی و توصیف روستا با مثال امیرآباد، عبارت‌های جایگزین What about / How about و تلفظ th با صدای /ð/ (صفحات ۵۷ تا ۵۹ جزوه).",
    blocks: [
      {
        kind: "table",
        title: "وضعیت هوا (تصاویر صفحات ۵۷ جزوه)",
        headers: ["کلمه انگلیسی", "معنی فارسی"],
        rows: [
          ["cloudy", "ابری"],
          ["sunny", "آفتابی"],
          ["foggy", "مه‌آلود"],
          ["snowy", "برفی"],
          ["windy", "بادی (پُرباد)"],
          ["rainy", "بارانی"],
        ],
      },
      {
        kind: "table",
        title: "فصل‌ها (تصاویر صفحات ۵۷ جزوه)",
        headers: ["فصل انگلیسی", "معنی فارسی"],
        rows: [
          ["winter", "زمستان"],
          ["spring", "بهار"],
          ["autumn", "پاییز"],
          ["summer", "تابستان"],
        ],
      },
      {
        kind: "note",
        title: "یادآوری",
        text: "در جدول‌های وضعیت هوا و فصل‌ها جزوه فقط کلمه انگلیسی را روی تصویر چاپ کرده است؛ معنی‌های فارسی سطرها برای کاربرد درسنامه افزوده شده‌اند.",
      },
      {
        kind: "text",
        title: "۱) پرسش در مورد آب و هوا",
        text: "برای پرسش در مورد آب و هوا الگوی زیر را به کار می‌بریم و در جواب، جمله را با It's شروع می‌کنیم و در آخر به فصل‌ها نیز می‌توان اشاره کرد: What's the weather like in ……...? و Is it ….(آب و هوا) in ….(فصل)?",
      },
      {
        kind: "examples",
        title: "مثال‌های آب و هوا",
        items: [
          { en: "What's the weather like in Rasht? — It's rainy and wet in spring and summer.", fa: "هوای رشت چگونه است؟ — در بهار و تابستان بارانی و مرطوب است." },
          { en: "Is it snowy in winter? — Yes, it is. / No, it isn't.", fa: "آیا در زمستان هوای برفی است؟ — بله، هست / نه، نیست." },
        ],
      },
      {
        kind: "text",
        title: "۲) معرفی و توصیف روستا",
        text: "در معرفی و توصیف روستا می‌توان به فضاها و امکانات طبیعی مانند رودخانه، مزرعه، کوه و شغل مردم و ... اشاره نمود.",
      },
      {
        kind: "examples",
        title: "مثال توصیف روستا",
        items: [
          { en: "What's Amir Abad like? — It's a mountain village with many farms and a river.", fa: "امیرآباد چگونه است؟ — روستایی کوهستانی با مزرعه‌های زیاد و یک رودخانه است." },
          { en: "What's the people's job? — They work on farms and raise animals.", fa: "شغل مردم چیست؟ — در مزرعه‌ها کار می‌کنند و حیوانات پرورش می‌دهند." },
        ],
      },
      {
        kind: "text",
        title: "۳) عبارت‌های جایگزین سوال",
        text: "برای جلوگیری از تکرار سوال خود از عبارت‌های جایگزین What about …….? و How about ……? می‌توان استفاده کرد.",
      },
      {
        kind: "examples",
        title: "مثال عبارت جایگزین",
        items: [
          { en: "What's the weather like in spring? — How about winter?", fa: "هوای بهار چگونه است؟ — زمستان چطور؟" },
        ],
      },
      {
        kind: "note",
        title: "نکته تلفظی — th با صدای /ð/",
        text: "در بعضی از کلمات حروف th صدای (ذ) یا /ð/ می‌دهد. این صدا را نیز با راهنمایی معلم در مثال‌های زیر یاد بگیرید: mother – father – brother – with – this – they – there – that – the – weather",
      },
    ],
  },

  // ─────────────────────── درس ۷ ───────────────────────
  {
    id: "g8-7-1",
    lesson: 7,
    title: "Hobbies & Free Time",
    titleFa: "سرگرمی‌ها و وقت آزاد",
    summary:
      "عبارت free time و دو سوال وقت آزاد، نکته‌های ۱ تا ۴ درس هفتم (Do you have any hobbies?، بیان سرگرمی با as a hobby، How about you?، علاقه با love + فعل ing)، جدول دو روش بیان سرگرمی و فهرست فعالیت‌های وقت فراغت از تصاویر (صفحات ۶۶ تا ۷۰ جزوه).",
    blocks: [
      {
        kind: "text",
        title: "وقت آزاد — free time (صفحه ۶۶)",
        text: "هر آدمی واسه خودش یه سری سرگرمی‌هایی داره که بیشتر در اوقات فراغت و زمان‌های آزادش به اونها می‌پردازه و از فعالیت یا فعالیت‌های موردعلاقه‌اش لذت می‌بره. عبارت مهمی که در درس هفتم وجود دارد، وقت بیکاری یا آزاد هست: free time. دو تا سؤال مهم که به وقت آزاد مربوط هستند:",
      },
      {
        kind: "examples",
        title: "دو سوال مهم درباره وقت آزاد",
        items: [
          { en: "What do you do in your free time?", fa: "در وقت آزادت چه کاری انجام می‌دهی؟" },
          { en: "What do you like to do in your free time?", fa: "در وقت آزادت دوست داری که چه کاری انجام بدهی؟" },
        ],
      },
      {
        kind: "note",
        title: "نکته ۱ — پرسیدن سرگرمی",
        text: "برای پرسیدن سرگرمی کسی از الگوی Do you have any hobbies? (آیا شما سرگرمی‌هایی دارید؟) استفاده می‌کنیم.",
      },
      {
        kind: "note",
        title: "نکته ۲ — بیان سرگرمی با as a hobby",
        text: "برای گفتن «من به عنوان سرگرمی فیلم می‌بینم» از الگوی I watch movies as a hobby. استفاده می‌شود؛ کلمه as به معنای «به عنوان» است و الگو با فعل‌های دیگر هم به کار می‌رود.",
      },
      {
        kind: "examples",
        title: "مثال‌های as a hobby",
        items: [
          { en: "I watch movies as a hobby.", fa: "من به عنوان سرگرمی فیلم می‌بینم." },
          { en: "I play football as a hobby.", fa: "من به عنوان سرگرمی فوتبال بازی می‌کنم." },
          { en: "I take photos as a hobby.", fa: "من به عنوان سرگرمی عکس می‌گیرم." },
        ],
      },
      {
        kind: "note",
        title: "نکته ۳ — How about you?",
        text: "وقتی سوالی را از کسی می‌پرسیم و می‌خواهیم همان سوال را از شخص دیگری بپرسیم، از عبارت How about you? استفاده می‌کنیم: How about you, Samira? (تو چطور، سمیرا؟)",
      },
      {
        kind: "note",
        title: "نکته ۴ — بیان علاقه با love",
        text: "برای بیان «عاشق … هستم» از love + فعل ing استفاده می‌شود.",
      },
      {
        kind: "examples",
        title: "مثال‌های love + ing",
        items: [
          { en: "I love reading.", fa: "من عاشق خواندن (کتاب) هستم." },
          { en: "I love riding a bicycle.", fa: "من عاشق دوچرخه‌سواری هستم." },
          { en: "I love running.", fa: "من عاشق دویدن هستم." },
        ],
      },
      {
        kind: "table",
        title: "دو روش بیان سرگرمی (صفحه ۷۰)",
        headers: ["روش اول", "روش دوم"],
        rows: [
          ["I watch movies as a hobby.", "I enjoy searching the web."],
          ["", "I love reading."],
          ["", "Do you like reading?"],
        ],
      },
      {
        kind: "note",
        title: "نکته جدول",
        text: "بعد از enjoy و love فعل‌ها به شکل ing می‌آیند.",
      },
      {
        kind: "examples",
        title: "پرسش و پاسخ درباره سرگرمی (صفحه ۷۰)",
        items: [
          { en: "Do you have any hobbies? — Yes, listening to stories on the radio.", fa: "آیا سرگرمی دارید؟ — بله، گوش دادن به داستان‌های رادیو." },
          { en: "What do you do as a hobby? — I watch movies as a hobby.", fa: "به عنوان سرگرمی چه کار می‌کنید؟ — من به عنوان سرگرمی فیلم تماشا می‌کنم." },
          { en: "Do you like reading? — Yes, very much.", fa: "آیا خواندن را دوست دارید؟ — بله، خیلی زیاد." },
          { en: "What's your hobby? — I enjoy searching the web.", fa: "سرگرمی شما چیست؟ — من از جستجو در اینترنت لذت می‌برم." },
        ],
      },
      {
        kind: "table",
        title: "فعالیت‌های وقت فراغت (تصاویر صفحات ۶۶ تا ۶۸)",
        headers: ["فعالیت انگلیسی", "معنی فارسی"],
        rows: [
          ["watching movies", "تماشای فیلم"],
          ["reading a book", "خواندن کتاب"],
          ["reading a magazine", "خواندن مجله"],
          ["reading sports news", "خواندن اخبار ورزشی"],
          ["reading poems", "خواندن شعر"],
          ["going to the gym", "رفتن به باشگاه"],
          ["reading", "خواندن"],
          ["walking in the park", "قدم زدن در پارک"],
          ["listening to the radio", "گوش دادن به رادیو"],
          ["shopping", "خرید کردن"],
          ["playing tennis", "بازی تنیس"],
          ["playing computer games", "بازی رایانه‌ای"],
          ["horse riding", "اسب سواری"],
          ["fishing", "ماهی‌گیری"],
          ["skiing", "اسکی کردن"],
          ["going to the movies", "رفتن به سینما"],
          ["working in the garden", "کار کردن در باغ"],
          ["browsing the internet", "جستجو و گردش در اینترنت"],
        ],
      },
      {
        kind: "note",
        title: "یادآوری",
        text: "تصاویر صفحات ۶۷ و ۶۸ زیرنویس فارسی دارند؛ برای تصاویر صفحه ۶۶ که جزوه فقط نام انگلیسی چاپ کرده، معنی فارسی برای کاربرد درسنامه افزوده شده است.",
      },
    ],
  },
];

export function grammarOfLesson(lesson: number): GrammarLesson[] {
  return GRAMMAR_LESSON_LIST.filter((g) => g.lesson === lesson);
}
