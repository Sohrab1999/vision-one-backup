/**
 * موتور مرور فاصله‌دار (فاز ۲ نقشه راه جامع) — SM-2 ساده‌شدهٔ سه‌درجه‌ای.
 *
 * تابع‌ها «خالص»اند (بدون React و بدون دسترسی به storage) تا هم کلاینت و هم
 * سرور بتوانند استفاده کنند و یونیت‌پذیر باشند.
 *
 * درجه‌ها (مطابق نقشه راه):
 *   0 = «نمی‌دونم»  → بازآموزی: ۱۰ دقیقهٔ دیگر + کاهش ease
 *   1 = «سخت»       → فاصله ×۱.۲ + کاهش اندک ease
 *   2 = «بلد بودم»  → رشد نمایی فاصله با ease
 */

export const DAY_MS = 86_400_000;
/** بازآموزی پس از «نمی‌دونم» — ۱۰ دقیقه */
export const RELEARN_MS = 10 * 60_000;
/** آستانهٔ تشخیص «کلمه دردسرساز» (leech) */
export const LEECH_LAPSES = 4;
/** سقف فاصله — یک سال */
export const MAX_INTERVAL_DAYS = 365;
/** سقف ease */
export const MIN_EASE = 1.3;
export const DEFAULT_EASE = 2.5;

/** 0 = نمی‌دونم · 1 = سخت · 2 = بلد بودم */
export type SrsGrade = 0 | 1 | 2;

/** وضعیت کامل یک کارت — نسخهٔ خالص بدون فیلدهای نمایشی */
export interface SrsState {
  /** ضریب سهولت SM-2 */
  ease: number;
  /** فاصلهٔ فعلی مرور به روز (اعشاری) — 0 یعنی کارت نو */
  interval: number;
  /** تعداد کل پاسخ‌های ثبت‌شده */
  reps: number;
  /** تعداد فراموشی‌ها (پاسخ «نمی‌دونم») */
  lapses: number;
  /** پاسخ‌های متوالی موفق */
  streak: number;
  /** زمان سررسید مرور بعدی (epoch ms) */
  dueAt: number;
  /** آخرین درجهٔ ثبت‌شده */
  lastGrade: SrsGrade | null;
}

/** کارت نو — هنوز وارد چرخه نشده */
export function newState(now: number = Date.now()): SrsState {
  return {
    ease: DEFAULT_EASE,
    interval: 0,
    reps: 0,
    lapses: 0,
    streak: 0,
    dueAt: now,
    lastGrade: null,
  };
}

function clampInterval(days: number): number {
  return Math.min(Math.max(days, 0), MAX_INTERVAL_DAYS);
}

/**
 * اعمال یک درجه روی وضعیت کارت و تولید وضعیت بعدی.
 * prev نامعرف = کارت نو.
 */
export function applyGrade(prev: SrsState | undefined, grade: SrsGrade, now: number = Date.now()): SrsState {
  const base: SrsState = prev
    ? { ...prev }
    : newState(now);

  if (grade === 0) {
    // «نمی‌دونم» → فراموشی: بازآموزی ۱۰ دقیقه‌ای + تنبیه ease
    base.lapses = (base.lapses ?? 0) + 1;
    base.streak = 0;
    base.ease = Math.max(MIN_EASE, Math.round((base.ease - 0.2) * 100) / 100);
    base.interval = RELEARN_MS / DAY_MS; // ~0.007 روز — فقط برای نمایش
    base.reps = (base.reps ?? 0) + 1;
    base.lastGrade = 0;
    base.dueAt = now + RELEARN_MS;
    return base;
  }

  base.reps = (base.reps ?? 0) + 1;
  base.lastGrade = grade;

  if (grade === 1) {
    // «سخت» → رشد محتاطانه ×۱.۲
    base.ease = Math.max(MIN_EASE, Math.round((base.ease - 0.15) * 100) / 100);
    const next =
      base.interval <= 0
        ? 0.25 // کارت نو + سخت → ۶ ساعت
        : Math.max(base.interval * 1.2, 0.02);
    base.interval = clampInterval(next);
    base.streak = (base.streak ?? 0) + 1;
    base.dueAt = now + base.interval * DAY_MS;
    return base;
  }

  // «بلد بودم» → رشد نمایی
  let next: number;
  if (base.interval <= 0) next = 1; // اولین بلد بودم → فردا
  else if (base.reps <= 2 && base.interval < 3) next = 3; // دومین → ۳ روز
  else next = Math.max(base.interval * base.ease, base.interval + 1);
  base.interval = clampInterval(next);
  base.streak = (base.streak ?? 0) + 1;
  base.dueAt = now + base.interval * DAY_MS;
  return base;
}

/**
 * پیش‌نمایش «مرور بعدی» برای هر سه دکمه — برحسب میلی‌ثانیه تا سررسید.
 * روی دکمه‌ها به شکل فارسی نمایش داده می‌شود.
 */
export function previewIntervals(prev: SrsState | undefined, now: number = Date.now()): [number, number, number] {
  return ([0, 1, 2] as SrsGrade[]).map((g) => {
    const next = applyGrade(prev, g, now);
    return Math.max(0, next.dueAt - now);
  }) as [number, number, number];
}

/** آیا کارت سررسید شده؟ (کارت بدون وضعیت = نو، سررسید نیست — مدیریت کارت‌های نو با سقف روزانه) */
export function isDue(state: SrsState | undefined, now: number = Date.now()): boolean {
  return !!state && state.dueAt <= now;
}

/** آیا کارت نو است؟ (هرگز پاسخ داده نشده) */
export function isNew(state: SrsState | undefined): boolean {
  return !state || state.reps === 0;
}

/** جعبه نمایشی ۰ تا ۵ — از فاصلهٔ مرور مشتق می‌شود (سازگار با نوارهای رشد قدیمی) */
export function boxFromState(state: SrsState | undefined): number {
  if (!state) return 0;
  const d = state.interval;
  if (d >= 30) return 5;
  if (d >= 14) return 4;
  if (d >= 7) return 3;
  if (d >= 3) return 2;
  if (d >= 1) return 1;
  return 0;
}

/** کارت دردسرساز؟ (مدام فراموش می‌شود) */
export function isLeech(state: SrsState | undefined): boolean {
  return !!state && state.lapses >= LEECH_LAPSES;
}

/**
 * ادغام دو نسخه از یک کارت (دو دستگاه) — برنده:
 *   ۱) reps بیشتر · ۲) فاصلهٔ بزرگ‌تر · ۳) سررسید جدیدتر
 * سقف‌ها روی برنده اعمال می‌شود.
 */
export function mergeStates(a: SrsState | undefined, b: SrsState | undefined): SrsState | undefined {
  if (!a) return b ? sanitize(b) : undefined;
  if (!b) return sanitize(a);
  let w = a;
  if (b.reps !== a.reps) w = b.reps > a.reps ? b : a;
  else if (b.interval !== a.interval) w = b.interval > a.interval ? b : a;
  else if (b.dueAt !== a.dueAt) w = b.dueAt > a.dueAt ? b : a;
  // لایه‌های شمارشی هرگز نباید کم شوند (بیشینه‌ها روی برنده اعمال می‌شوند)
  const merged: SrsState = {
    ...sanitize(w)!,
    reps: Math.max(a.reps, b.reps),
    lapses: Math.max(a.lapses, b.lapses),
    streak: Math.max(a.streak, b.streak),
    // ease پایین‌تر = شناخت دقیق‌تر از فراموشی‌ها — نسخهٔ محافظه‌کارانه برنده است
    ease: Math.min(a.ease, b.ease),
  };
  // سقف‌ها
  merged.reps = Math.min(merged.reps, 99_999);
  merged.lapses = Math.min(merged.lapses, 99_999);
  merged.streak = Math.min(merged.streak, 99_999);
  return merged;
}

/** پاک‌سازی اعداد ورودی (از سرور/localStorage) به محدودهٔ مجاز */
export function sanitize(s: Partial<SrsState> | null | undefined): SrsState | undefined {
  if (!s || typeof s !== "object") return undefined;
  const num = (v: unknown, fallback: number): number => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  const dueAt = num(s.dueAt, Date.now());
  const interval = clampInterval(num(s.interval, 0));
  return {
    ease: Math.min(3.5, Math.max(MIN_EASE, num(s.ease, DEFAULT_EASE))),
    interval,
    reps: Math.min(99_999, Math.max(0, Math.floor(num(s.reps, 0)))),
    lapses: Math.min(99_999, Math.max(0, Math.floor(num(s.lapses, 0)))),
    streak: Math.min(99_999, Math.max(0, Math.floor(num(s.streak, 0)))),
    dueAt: dueAt > 0 && dueAt < 1e13 ? dueAt : Date.now(),
    lastGrade:
      s.lastGrade === 0 || s.lastGrade === 1 || s.lastGrade === 2
        ? (s.lastGrade as SrsGrade)
        : null,
  };
}

/** قالب فارسی فاصلهٔ زمانی — «۱۰ دقیقه» «۶ ساعت» «۳ روز» «۱ ماه» */
export function formatInterval(ms: number): string {
  const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");
  if (ms < 60_000) return "لحظه‌ای";
  if (ms < 3_600_000) return `${fa(ms / 60_000)} دقیقه`;
  if (ms < DAY_MS) return `${fa(ms / 3_600_000)} ساعت`;
  const days = ms / DAY_MS;
  if (days < 31) return `${fa(days)} روز`;
  if (days < 365) return `${fa(days / 30)} ماه`;
  return `${fa(days / 365)} سال`;
}
