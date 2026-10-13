"use client";

/** ثابت‌های تنظیمی بازی شوتر — refactor گام ۳ */

export const GAME_KEY = "fps-shooter";
export const ALL_LESSONS = -1;
export const HEARTS = 3;
/** خط عمودی لِین‌ها (عرض صحنه) — فاز F3: عریض‌تر برای حس «جستوجو» — در پرتره با laneK جمع می‌شود */
export const LANE_X = [-6.8, -2.25, 2.25, 6.8];
export const TARGET_R = 0.85;
export const SHOOT_BASE = 10;
export const COMBO_STEP = 2;
export const COMBO_CAP = 6;
/** توقف بین سؤال‌ها برای دیدن انفجار */
export const HIT_FREEZE_MS = 750;
/** فاصلهٔ حداقلی بین دو شلیک (جلوگیری از اسپم) */
export const SHOOT_COOLDOWN = 550;
export const Q_TIME_SHOOT = 12;
export const Q_TIME_TAP = 15;

// ── فاز F8 — هدف‌های هوشمند: موج / فرار / طلایی ──
/** اندازهٔ هر موج — هر WAVE_SIZE پاسخ، موج سخت‌تری شروع می‌شود */
export const WAVE_SIZE = 5;
/** سقف موج — بعد از آن سرعت‌ها ثابت می‌مانند */
export const WAVE_MAX = 6;
/** فرار: هدف غلط وقتی می‌گریزد که نزدیک مرکز دید باشد (شعاع NDC) */
export const DODGE_TRIGGER = 0.5;
/** سرعت پایهٔ فرار (متر بر ثانیه) و افزودهٔ هر موج */
export const DODGE_BASE = 1.05;
export const DODGE_WAVE_STEP = 0.32;
/** بیشینهٔ جابه‌جایی فرار از لِین (متر) */
export const DODGE_MAX = 2.5;
/** بونوس شکار هدف طلایی */
export const GOLDEN_BONUS = 20;
/** پنجرهٔ فرصت شکار هدف طلایی (میلی‌ثانیه) */
export const GOLDEN_WINDOW_MS = 3000;
/** اولین ظهور هدف طلایی بعد از شروع مأموریت */
export const GOLDEN_FIRST_MS = 9000;
/** بازهٔ زمانی ظهورهای بعدی هدف طلایی (میلی‌ثانیه) */
export const GOLDEN_EVERY_MIN = 11000;
export const GOLDEN_EVERY_MAX = 16000;

// ── فاز F3 — حرکت اول‌شخص + تمام‌صفحه — فاز F10: موتور حرکت نرم FPS ──
/** سرعت پایهٔ گام بازیکن (متر بر ثانیه) — قبلاً ۲.۳ و کسل‌کننده بود */
export const MOVE_SPEED = 4.3;
/** فاز F10 — ضریب دویدن (نگه‌داشتن Shift) */
export const SPRINT_MULT = 1.5;
/** فاز F10 — ضریب خم‌شدن (نگه‌داشتن C) — حرکت آهستهٔ کم‌صدا */
export const CROUCH_MULT = 0.55;
/** فاز F10 — کاهش ارتفاع چشم حین خم‌شدن (متر) */
export const CROUCH_EYE = 0.62;
/** فاز F10 — نرمی شروع حرکت (ضریب نمایی — هرچه بیشتر، تندتر رسیدن به سرعت هدف) */
export const ACCEL = 13;
/** فاز F10 — نرمی توقف/ترمز (بیشتر از ACCEL تا توقف چسبنده نباشد) */
export const STOP_ACCEL = 17;
/** فاز F10 — سرعت اولیهٔ پرش و گرانش (متر بر ثانیه) */
export const JUMP_V = 4.7;
export const GRAVITY = 12.5;
/** فاز F10 — کیک FOV حین دویدن — حس سرعت واقعی */
export const SPRINT_FOV_KICK = 4.5;
/** فاز F10 — لبهٔ تشخیص دویدن بر اساس سرعت واقعی (نسبت به سرعت پایه) */
export const SPRINT_SPEED_RATIO = 1.12;
/** نگاشت e.code → جهت (مستقل از layout فارسی/انگلیسی) — فاز F10: C = خم‌شدن */
export const KEY_MOVE: Record<string, "w" | "a" | "s" | "d" | "c"> = {
  KeyW: "w",
  ArrowUp: "w",
  KeyS: "s",
  ArrowDown: "s",
  KeyA: "a",
  ArrowLeft: "a",
  KeyD: "d",
  ArrowRight: "d",
  KeyC: "c",
};
export const MIN_POOL_WORD = 4;
export const MIN_POOL_QUIZ = 3;
/** فاز F10-ب — حداقل جمله‌های قابل‌بازی مکالمه‌های جزوه برای حالت «جملهٔ زنجیره» */
export const MIN_POOL_CHAIN = 3;
export const BURST_FULL = 36;
export const BURST_WEAK = 16;

// ── فاز G2-e — تنظیم کیفیت گرافیک (افزودنی؛ کلید جدید، بدون دست‌زدن به کلیدهای موجود) ──

export type Quality = "high" | "low";
/** کلید افزودنی ماندگاری انتخاب کیفیت — پیش‌فرض «عادی» */
export const QUALITY_KEY = "visionone:game-pref:fps-quality";
/** کیفیت عادی: ۴ هدف (۳ حواس‌پرتی) — رفتار فعلی */
export const DISTRACTORS_HIGH = 3;
/** کیفیت سبک: ۳ هدف هم‌زمان (۲ حواس‌پرتی) */
export const DISTRACTORS_LOW = 2;
/** کیفیت سبک: اجسام تزئینی شناور کمتر */
export const DECO_LOW = 5;
/** کیفیت سبک: ذرات انفجار کمتر */
export const BURST_LOW = 12;

export const SENS_MIN = 0.4;
export const SENS_MAX = 2.2;
export const SENS_DEF = 1;
/** محدودهٔ زاویهٔ دید */
export const FOV_MIN = 62;
export const FOV_MAX = 96;
export const FOV_DEF = 72;

// ── فاز F9 — اسکوپ لحظه‌ای (نگه‌داشتن Shift / دکمهٔ ذره‌بین) ──
/** ضریب تیزبینی: FOV اسکوپ = FOV پایه × این ضریب (کلمپ به محدودهٔ زیر) */
export const SCOPE_FOV_RATIO = 0.52;
export const SCOPE_FOV_MIN = 30;
export const SCOPE_FOV_MAX = 56;
/** کاهش حساسیت نگاه حین اسکوپ — دقت اسنایپری */
export const SCOPE_SENS_RATIO = 0.62;

export const ENV_ROCKS = [4, 6, 9];
export const ENV_TUFTS = [4, 7, 10];
