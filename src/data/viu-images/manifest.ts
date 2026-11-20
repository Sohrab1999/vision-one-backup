// ─────────────────────────────────────────────────────────────────────────────
// VIU IMAGE ROADMAP — فاز ۳ پایلوت — مانیفست «تصویر ارائهٔ درس VIU» (افزودنی صرف)
// ثبت: ۱۴۰۵/۸/۲۳ — ۲۰۲۶-۱۱-۱۴ — فرمان مالک فاز ۳ (پیام IM channel `zai-web` —
//       trace `1a1dbbb24436f159` — session `web-db5d9cf8-c8eb-44ee-996c-ef41ac30f574`)
//
// مادهٔ O2-V (تفکیک دو رژیم تصویر — مصوب با فرمان فاز ۳ مالک؛ متن پیشنهادی §F-۲ سند فاز ۲):
//   «تصویر ارائهٔ درس VIU» ≠ «تصویر دیکشنری Word Atlas» — O2 فعلی (Word Atlas) یک‌بایت
//   دست‌نخورده؛ STEP 6 همچنان NOT AUTHORIZED؛ O7..O10 همچنان OPEN؛ تصاویر VIU از
//   خط لولهٔ Word Atlas عبور نمی‌کنند.
//
// منبع: فقط سه PDF tracked مالک (SHA256 35ea1b5b… / 0dfdab2e… / 415fc985…) —
//       © Cambridge University Press — نمایش صرفاً در وب‌اپ شخصی مالک — صفر بازتوزیع/انتشار عمومی.
// O4 پابرجا: attribution فقط بخش «منابع» فوتر — صفر attribution کنار تصویر.
// O6 پابرجا: هر مدخل/درس/بخش بدون تصویر مصوب = جایگاه حفظ + پیام عین «تصویری موجود نیست»
//            (تفکیک NO IMAGE از REJECT) — این مانیفست فقط «افزودن» است، هیچ مدخلی از حالت
//            O6 خارج نمی‌شود مگر درسش در همین مانیفست باشد.
// فنی: WebP @120DPI (رندر pdftoppm) — نردبان q80→q70→تطبیقی — سقف ≤۱۲۰KB (سیاست §E سند فاز ۲)
//      — lazy-load در UI — صفر تغییر Prisma/Schema/db/WAVE2/Hook — صفر تغییر دادهٔ متنی موجود.
// بازتولید تصاویر: `python3 scripts/viu-image-pilot-extract.py` (idempotent — از سه PDF tracked)
// ─────────────────────────────────────────────────────────────────────────────

export type ViuImageBookId = "viu-elem" | "viu-preint" | "viu-upper";

/** یک تصویر ارائهٔ درس VIU مصوب (پایلوت فاز ۳) — از اسکن مالک */
export interface ViuLessonImage {
  bookId: ViuImageBookId;
  /** شمارهٔ درس در کتاب */
  lesson: number;
  /** مسیر عمومی (زیر `public/`) برای src تصویر */
  src: string;
  /** صفحهٔ PDF مبدأ در اسکن مالک (ردیابی به عین صفحهٔ کتاب) */
  pdfPage: number;
  /** حجم واقعی بایت — همه ≤ ۱۲۲٬۸۸۰B (سقف ۱۲۰KB) */
  bytes: number;
  /** کیفیت نهایی WebP پس از نردبان q80→q70→تطبیقی */
  quality: number;
  /** نوع آرت‌ورک طبق سرشماری فاز ۱ (docs/qa/viu-images-phase1-census-*-2026-11-14.json) */
  kinds: string[];
  /** متن جایگزین فارسی توصیفی (دسترس‌پذیری — از desc سرشماری فاز ۱) */
  alt: string;
}

/** فاز ۳ — پایلوت ۶ درس منتخب مالک (پیشنهاد پ۲ سند فاز ۲ بدون تغییر) — ۱۰ صفحهٔ آرت‌ورک‌دار */
export const VIU_PILOT_IMAGES: readonly ViuLessonImage[] = [
  // ── viu-elem — درس ۴ (نقاشی‌های ارائه) — PDF p15+p16
  {
    bookId: "viu-elem",
    lesson: 4,
    src: "/viu-images/viu-elem/lesson-04-p1.webp",
    pdfPage: 15,
    bytes: 92760,
    quality: 80,
    kinds: ["drawing"],
    alt: "نقاشی‌های درس ۴: حمل‌ونقل، پله‌ها، خرید و فعالیت‌های ورزشی",
  },
  {
    bookId: "viu-elem",
    lesson: 4,
    src: "/viu-images/viu-elem/lesson-04-p2.webp",
    pdfPage: 16,
    bytes: 106972,
    quality: 80,
    kinds: ["drawing"],
    alt: "نقاشی مسیر با وسایل نقلیه و مقصدها؛ دفتر روزانه",
  },
  // ── viu-elem — درس ۱۲ (واژه‌نامهٔ تصویری فعالیت‌های روزانه) — PDF p31+p32
  {
    bookId: "viu-elem",
    lesson: 12,
    src: "/viu-images/viu-elem/lesson-12-p1.webp",
    pdfPage: 31,
    bytes: 118702,
    quality: 80,
    kinds: ["picture-dictionary", "drawing"],
    alt: "شبکهٔ نقاشی‌های فعالیت‌های روزمره (واژه‌نامهٔ تصویری درس ۱۲)",
  },
  {
    bookId: "viu-elem",
    lesson: 12,
    src: "/viu-images/viu-elem/lesson-12-p2.webp",
    pdfPage: 32,
    bytes: 74644,
    quality: 80,
    kinds: ["drawing"],
    alt: "نقاشی‌های فعالیت‌های روزانه برای تمرین‌های درس ۱۲",
  },
  // ── viu-preint — درس ۵ (لوازم کلاس — برچسب‌دار) — PDF p19+p20
  {
    bookId: "viu-preint",
    lesson: 5,
    src: "/viu-images/viu-preint/lesson-05-p1.webp",
    pdfPage: 19,
    bytes: 120540,
    quality: 80,
    kinds: ["picture-dictionary", "drawing"],
    alt: "نقاشی‌های برچسب‌دار لوازم کلاس درس (درس ۵)",
  },
  {
    bookId: "viu-preint",
    lesson: 5,
    src: "/viu-images/viu-preint/lesson-05-p2.webp",
    pdfPage: 20,
    bytes: 72098,
    quality: 80,
    kinds: ["drawing"],
    alt: "شش نقاشی برچسب‌دار برای تمرین برچسب‌زنی درس ۵",
  },
  // ── viu-preint — درس ۵۸ (پول و قیمت — عکس) — PDF p125 (p126 فقط‌متن)
  {
    bookId: "viu-preint",
    lesson: 58,
    src: "/viu-images/viu-preint/lesson-58-p1.webp",
    pdfPage: 125,
    bytes: 104984,
    quality: 80,
    kinds: ["photo", "table"],
    alt: "عکس اسکناس و سکه‌ها با نمودار مقیاس قیمت (درس ۵۸)",
  },
  // ── viu-upper — درس ۲ (نمودار و شبکهٔ واژه‌ها) — PDF p11+p12
  {
    bookId: "viu-upper",
    lesson: 2,
    src: "/viu-images/viu-upper/lesson-02-p1.webp",
    pdfPage: 11,
    bytes: 98030,
    quality: 80,
    kinds: ["drawing", "chart-diagram"],
    alt: "شبکهٔ حبابی واژه‌های CAT و نمودار برچسب‌دار بدن (درس ۲)",
  },
  {
    bookId: "viu-upper",
    lesson: 2,
    src: "/viu-images/viu-upper/lesson-02-p2.webp",
    pdfPage: 12,
    bytes: 83852,
    quality: 80,
    kinds: ["chart-diagram", "table"],
    alt: "درخت واژه، شبکهٔ حبابی و جدول هم‌آیندهای درس ۲",
  },
  // ── viu-upper — درس ۶ (صحنه‌های کارتونی) — PDF p20 (p19 فقط tiny-icons — فیلتر §I-۵)
  {
    bookId: "viu-upper",
    lesson: 6,
    src: "/viu-images/viu-upper/lesson-06-p1.webp",
    pdfPage: 20,
    bytes: 114026,
    quality: 70,
    kinds: ["drawing"],
    alt: "سه صحنهٔ کارتونی سیاه‌وسفید از افراد (درس ۶)",
  },
];

// نمایهٔ جست‌وجو: کلید `${bookId}:${lesson}` → تصاویر آن درس به ترتیب صفحه
const byLessonKey = new Map<string, ViuLessonImage[]>();
for (const img of VIU_PILOT_IMAGES) {
  const key = `${img.bookId}:${img.lesson}`;
  const list = byLessonKey.get(key);
  if (list) {
    list.push(img);
  } else {
    byLessonKey.set(key, [img]);
  }
}

/**
 * تصاویر ارائهٔ مصوب یک درس VIU — خالی = بدون تصویر مصوب (⇒ O6 پابرجا با پیام عین).
 * فقط کتاب‌های سه‌گانهٔ VIU و فقط درس‌های مانیفست پاسخ می‌دهند؛ بقیهٔ کتاب‌ها همیشه [].
 */
export function viuLessonImages(
  bookId: string | null | undefined,
  lesson: number | null | undefined,
): ViuLessonImage[] {
  if (!bookId || typeof lesson !== "number" || !Number.isFinite(lesson)) return [];
  return byLessonKey.get(`${bookId}:${lesson}`) ?? [];
}

/** تصویر ارائهٔ درس (اولین صفحهٔ آرت‌ورک‌دار) — برای جایگاه تصویر پاپ‌آپ واژه */
export function viuLessonCover(
  bookId: string | null | undefined,
  lesson: number | null | undefined,
): ViuLessonImage | null {
  return viuLessonImages(bookId, lesson)[0] ?? null;
}
