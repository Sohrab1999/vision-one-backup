"use client";

/**
 * بازی «شوتر آموزشی اول‌شخص» (Educational FPS) — فاز ۵ نقشه راه جامع ۲۰۲۶ + فاز G2-e نقشه راه بازی‌ها.
 *
 * میدان low-poly رنگی با three.js/@react-three/fiber (چانک جدا و lazy — صفر تأثیر روی بقیهٔ اپ):
 * - «شکار واژه»: معنی فارسی روی HUD، هدف‌های متحرک واژهٔ انگلیسی دارند.
 * - «سد گرامری»: جملهٔ ناقص روی HUD، هدف‌ها همان ۴ گزینهٔ تستاند.
 * - شلیک به هدف درست = انفجار رنگین‌کمانی + امتیاز و کمبو + تلفظ؛ شلیک به هدف غلط یا پایان
 *   زمان = یک ❤ کم و واژه به صف «مرور هوشمند» برمی‌گردد. شلیک به خالی (خطا رفت) جریمه ندارد
 *   ولی بین شلیک‌ها فاصلهٔ کوتاه هست تا اسپم بی‌فایده نباشد.
 * - کنترل دسکتاپ: کلیک اول Pointer Lock، حرکت موس نشانه‌گیری و کلیک بعدی شلیک از رتیکل.
 * - کنترل لمسی: کشیدن = نگاه، تپ روی هدف = شلیک همان هدف.
 * - حالت دسترس‌پذیری «تپ ساده»: بدون قفل نشانگر و شلیک دقیق — تپ روی هدف کافی است؛
 *   روی کیبورد هم کلیدهای ۱ تا ۴ از چپ به راست هدف انتخاب می‌کنند.
 * - امتیاز با مدل Attempt (category = fps-shooter) ثبت و رکورد شخصی per-scope ذخیره می‌شود.
 *
 * فاز G2-e — کیت GameKit v2 (الگوی پایلوت memory / flappy G2-c-2):
 * - صدا/لرزش فقط در لحظهٔ رویداد، نه هر فریم: شلیک = «shoot» (داخل cooldown-gate تابع
 *   request — گارد «نه هر فریم»)، برخورد درست به واژهٔ هدف = «correct» + لرزش success،
 *   برخورد غلط / پایان زمان = «wrong» + لرزش error (هردو از handleHit/handleTimeout که
 *   R3F از useFrame صدا می‌زند — فقط لحظهٔ resolve برخورد)، پایان دور = «finish» (دور
 *   بی‌خطا = «win» — الگوی دارباز)، رکورد = «record». AudioContext با اولین ژست (چیپ‌های
 *   setup) آپ‌لاک می‌شود؛ شکست صدا هرگز بازی را نمی‌شکند (try/catch داخل کیت).
 * - تنظیم کیفیت گرافیک: دو چیپ «کیفیت عادی» / «کیفیت سبک (گوشی)» در setup — سبک:
 *   dpr پایین‌تر [0.7,1]، antialias خاموش، سایه‌ها صریحاً off، اجسام تزئینی/ذرات انفجار
 *   کمتر و ۳ هدف هم‌زمان به‌جای ۴؛ عادی: رفتار فعلی. انتخاب در Attempt detail افزودنی
 *   (detail.quality) و localStorage کلید افزودنی «visionone:game-pref:fps-quality»
 *   (پیش‌فرض عادی) می‌ماند — امضای saveAttempt/saveBest/bumpPlays و کلیدهای رکورد
 *   (scopeOf) دست‌نخورده.
 * - کمبو به موتور مشترک کیت منتقل شد (G1-09): useCombo({mode:"bonus", base:10,
 *   bonusCap:6, bonusStep:2}) — فرمول امتیاز مو‌به‌مو همان قبل: ۱۰ + min(کمبو−۱,۶)×۲.
 * - GameShell (هدر یکنواخت: امتیاز/کمبو/قلب/زمان در stats + liveMsg + کنترل‌های h-11 که
 *   حین صحنهٔ سه‌بعدی هم کار می‌کنند) + Pause با فریز واقعی حلقهٔ R3F (frameloop
 *   "never"/"always" — معادل cancel/resume الگوی flappy + آینهٔ pausedRef برای ورودی‌ها)
 *   + جبران دقیق مبدأ تایمر سؤال و زنجیرهٔ «فریز برخورد → سؤال بعد» با جمع زمان توقف از
 *   duration Attempt (pausedAccum — الگوی flappy/duel) + نگهبان خروج حین دور (تأیید →
 *   abandon("exit")) + ResultScreen استاندارد (ستارهٔ per-game: دقت ≥۹۰→۳ / ≥۷۰→۲ / بقیه ۱)
 *   + آموزش ۳گامی (هدف / نشانه‌گیری-شلیک / کیفیت گرافیک) با useAutoTutorial و راهنمای
 *   حین صحنه با توقف (pausedForHelpRef) + تله‌متری جلسه (level = حالت+کیفیت مثل word-tap:low).
 *
 * فاز F3 — تحول FPS (نقشه راه شوتر ۲۰۲۶):
 * - تمام‌صفحهٔ خودکار: کلیک «شروع مأموریت» (و «دوباره») صحنه را Fullscreen می‌کند (Esc =
 *   خروج؛ سینک با fullscreenchange) و نوار امتیاز/کمبو/قلب/زمان فشرده داخل قاب می‌آید
 *   چون هدر شِل بیرون قاب تمام‌صفحه است + دکمه‌های شناور توقف/خروج تمام‌صفحه (data-fps-hud
 *   تا شلیک حساب نشوند).
 * - تفنگ سه‌بعدی ویومدل: گروه low-poly چسبیده به دوربین (فرزند camera) با sway تنفسی،
 *   باب گام‌برداشتن، لگدِ recoil از رویداد شلیک (seq بریج) و جرقهٔ دهانه + نور نقطه‌ای.
 * - حرکت اول‌شخص WASD/جهت‌نما (e.code — مستقل از layout فارسی) با سرعت ثابت، باب سر و
 *   محدودهٔ امن میدان؛ جهت نسبت به yaw نگاه.
 * - چیدمان «جستوجو کن، پیدا کن، شلیک کن»: لِین‌ها عریض‌تر (±۶٫۸) و عمق پخش‌تر — پیدا
 *   کردن گزینهٔ درست چرخاندن و جابه‌جایی می‌خواهد.
 *
 * فاز F4 — کنترل حرفه‌ای موبایل + مکانیک خشاب:
 * - خشاب ۸تایی با شمارندهٔ مهمات روی HUD؛ هر شلیک یک فشنگ کم می‌کند، خالی شدن = ریلود
 *   خودکار (و R روی دسکتاپ / دکمهٔ ریلود روی موبایل) با صدای کلانک تعویض و چرخش آیکون.
 * - شلیک حین ریلود یا فریز برخورد مسدود است (مهمات هدر نمی‌رود) — گیت داخل request.
 * - جوی‌استیک لمسی چپ + دکمهٔ شلیک راست برای موبایل (فقط pointer:coarse و خارج از تپ
 *   ساده): بردار آنالوگ به stepPlayer تزریق می‌شود (deadzone + سرعت متناسب کمان) و دکمهٔ
 *   شلیک از رتیکل مرکز می‌زند؛ هر دو data-fps-hud تا شلیک صحنه حساب نشوند.
 * - افکت پوکهٔ برنجی: در هر شلیک از پورت خروج تفنگ به فضای جهانی پرتاب می‌شود — گرانش،
 *   اسپین و محو نرم؛ علاوه بر آن صدای «تاک» برخورد گلوله به هدف (صدا فقط لحظهٔ رویداد).
 *
 * فاز F5/F6/F7 — سه‌گانهٔ «گزینه‌ها، نقشه، محیط» (نسخهٔ ۲.۰ نقشه راه docs/fps-roadmap.md):
 * - گزینه‌ها (F5): حساسیت نگاه (۴۰–۲۲۰٪) روی موس و کشیدن لمسی، زاویهٔ دید FOV
 *   (۶۲–۹۶ درجه — زنده با updateProjectionMatrix) و وارون‌سازی عمودی (Invert Y) —
 *   همه ماندگار (کلیدهای افزودنی visionone:game-pref:fps-sens/fov/invert) + پنل
 *   «گزینه‌ها» در setup + تنظیمات سریع داخل اورلی توقف بدون خروج از دور.
 * - نقشه‌ها (F6): سه پالت کامل میدان با انتخاب ماندگار (visionone:game-pref:fps-map):
 *   «جنگل زمردی» (کلاسیک سبز)، «کویر کهربا» (غروب شنی با خورشید بزرگ) و «سکوت شب»
 *   (آسمان پرستاره + ماه + کریستال‌های درخشان) — هر نقشه رنگ پس‌زمینه/مه، زمین،
 *   حلقه‌ها، کوه‌ها، اجسام تزئینی، نور و بدنهٔ قاب خودش را دارد + detail.map در Attempt.
 * - محیط (F7): جعبه‌های پوشش با برخورد واقعی بازیکن (resolveCover — دایره‌ای ساده در
 *   فضای جهان)، ابلیسک‌های طرفین، سنگ‌ریزه و بوتهٔ پراکنده، ابرهای low-poly چرخان،
 *   آسمان پرستاره و خورشید/ماه با هاله — بودجهٔ عناصر در سه ترتیب کیفیت؛ همهٔ عناصر
 *   دکور هستند و خارج از registry رِی‌کست شلیک.
 *
 * فاز F8 — هدف‌های هوشمند (AI سبک — نسخهٔ ۲.۱ سند docs/fps-roadmap.md):
 * - فرار (Dodging): هدف‌های غلط وقتی نزدیک مرکز نشانه می‌شوند به کناره‌ها می‌گریزند —
 *   سرعت فرار با شمارهٔ موج بالا می‌رود؛ در «تپ ساده» و حین فریز برخورد غیرفعال است.
 * - موج‌بندی: هر ۵ پاسخ یک موج سخت‌تر (تا موج ۶) — چرخش/نوسان/راند اهداف و عمق چیدمان
 *   بیشتر + بج «موج n» در HUD و پیام aria-live + detail.wave در Attempt.
 * - هدف طلایی: هر ۱۱–۱۶ ثانیه (اولین: ۹ ثانیه) پاپ‌آپ ۳ثانیه‌ای طلایی — شکارش +۲۰ امتیاز
 *   بونوس خارج از چرخهٔ سؤال (بدون قلب/بدون جلو رفتن) با صدای جذاب و انفجار؛ زنجیرهٔ
 *   مستقل مقاوم به توقف (جبران gap) تا با زنجیرهٔ «فریز برخورد» تداخل نکند.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Crosshair,
  Flame,
  Heart,
  MapPinned,
  Minimize2,
  MonitorSmartphone,
  MoonStar,
  MousePointerClick,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target as TargetIcon,
  Timer,
  Trees,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";
// فاز G2-e — کیت GameKit v2 (قرارداد API سند)
import { playSound, toggleSoundMuted, isSoundMuted } from "./kit/sound-engine";
import { buzz } from "./kit/haptics";
import { useGamePause } from "./kit/use-pause";
import { GameExitGuard } from "./kit/exit-guard";
import { GameShell } from "./kit/game-shell";
import { ResultScreen } from "./kit/result-screen";
import {
  TutorialOverlay,
  useAutoTutorial,
  type TutorialStep,
} from "./kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "./kit/telemetry";
import { useCombo, COMBO_FIRE_CLASS } from "./kit/combo-engine";

// ─── ثابت‌ها ───

const GAME_KEY = "fps-shooter";
const ALL_LESSONS = -1;
const HEARTS = 3;
/** خط عمودی لِین‌ها (عرض صحنه) — فاز F3: عریض‌تر برای حس «جستوجو» — در پرتره با laneK جمع می‌شود */
const LANE_X = [-6.8, -2.25, 2.25, 6.8];
const TARGET_R = 0.85;
const SHOOT_BASE = 10;
const COMBO_STEP = 2;
const COMBO_CAP = 6;
/** توقف بین سؤال‌ها برای دیدن انفجار */
const HIT_FREEZE_MS = 750;
/** فاصلهٔ حداقلی بین دو شلیک (جلوگیری از اسپم) */
const SHOOT_COOLDOWN = 550;
const Q_TIME_SHOOT = 12;
const Q_TIME_TAP = 15;

// ── فاز F8 — هدف‌های هوشمند: موج / فرار / طلایی ──
/** اندازهٔ هر موج — هر WAVE_SIZE پاسخ، موج سخت‌تری شروع می‌شود */
const WAVE_SIZE = 5;
/** سقف موج — بعد از آن سرعت‌ها ثابت می‌مانند */
const WAVE_MAX = 6;
/** فرار: هدف غلط وقتی می‌گریزد که نزدیک مرکز دید باشد (شعاع NDC) */
const DODGE_TRIGGER = 0.5;
/** سرعت پایهٔ فرار (متر بر ثانیه) و افزودهٔ هر موج */
const DODGE_BASE = 1.05;
const DODGE_WAVE_STEP = 0.32;
/** بیشینهٔ جابه‌جایی فرار از لِین (متر) */
const DODGE_MAX = 2.5;
/** بونوس شکار هدف طلایی */
const GOLDEN_BONUS = 20;
/** پنجرهٔ فرصت شکار هدف طلایی (میلی‌ثانیه) */
const GOLDEN_WINDOW_MS = 3000;
/** اولین ظهور هدف طلایی بعد از شروع مأموریت */
const GOLDEN_FIRST_MS = 9000;
/** بازهٔ زمانی ظهورهای بعدی هدف طلایی (میلی‌ثانیه) */
const GOLDEN_EVERY_MIN = 11000;
const GOLDEN_EVERY_MAX = 16000;

// ── فاز F3 — حرکت اول‌شخص + تمام‌صفحه ──
/** سرعت گام بازیکن (متر بر ثانیه) */
const MOVE_SPEED = 2.3;
/** محدودهٔ امن حرکت جانبی (چپ/راست) */
const MOVE_X_LIM = 5.2;
/** محدودهٔ حرکت عمقی — آفست نسبت به پایهٔ دوربین */
const MOVE_Z_MIN = -3.4;
const MOVE_Z_MAX = 2.0;
/** فاز F4 — ظرفیت خشاب (تعداد فشنگ هر خشاب) */
const MAG_SIZE = 8;
/** فاز F4 — مدت ریلود (میلی‌ثانیه) */
const RELOAD_MS = 1100;
/** نگاشت e.code → جهت (مستقل از layout فارسی/انگلیسی) */
const KEY_MOVE: Record<string, "w" | "a" | "s" | "d"> = {
  KeyW: "w",
  ArrowUp: "w",
  KeyS: "s",
  ArrowDown: "s",
  KeyA: "a",
  ArrowLeft: "a",
  KeyD: "d",
  ArrowRight: "d",
};
const MIN_POOL_WORD = 4;
const MIN_POOL_QUIZ = 3;
const BURST_FULL = 36;
const BURST_WEAK = 16;

// ── فاز G2-e — تنظیم کیفیت گرافیک (افزودنی؛ کلید جدید، بدون دست‌زدن به کلیدهای موجود) ──

type Quality = "high" | "low";
/** کلید افزودنی ماندگاری انتخاب کیفیت — پیش‌فرض «عادی» */
const QUALITY_KEY = "visionone:game-pref:fps-quality";
/** کیفیت عادی: ۴ هدف (۳ حواس‌پرتی) — رفتار فعلی */
const DISTRACTORS_HIGH = 3;
/** کیفیت سبک: ۳ هدف هم‌زمان (۲ حواس‌پرتی) */
const DISTRACTORS_LOW = 2;
/** کیفیت سبک: اجسام تزئینی شناور کمتر */
const DECO_LOW = 5;
/** کیفیت سبک: ذرات انفجار کمتر */
const BURST_LOW = 12;

// ── فاز F6 — نقشه‌های مأموریت (پالت کامل هر میدان) ──

type MapId = "forest" | "desert" | "night";

interface MapConfig {
  id: MapId;
  name: string;
  desc: string;
  /** رنگ پس‌زمینه/مه صحنه و بدنهٔ قاب */
  bg: string;
  ground: string;
  ringMain: string;
  ringOther: string;
  mountain: string;
  decoColors: [number, number, number, number];
  /** شدت emissive اجسام تزئینی — نقشهٔ شب درخشان است تا خوانایی حفظ شود */
  decoGlow: number;
  hemiSky: string;
  hemiGround: string;
  sunColor: string;
  sunIntensity: number;
  ambIntensity: number;
  fogNear: number;
  fogFar: number;
  /** خورشید/ماه: موقعیت + شعاع + رنگ */
  orb: { pos: [number, number, number]; r: number; color: string } | null;
  stars: boolean;
  clouds: number;
  cloudColor: string;
  /** نمونه‌رنگ گرادیانی کارت نقشه در setup */
  swatch: string;
}

const MAPS: Record<MapId, MapConfig> = {
  forest: {
    id: "forest",
    name: "جنگل زمردی",
    desc: "میدان کلاسیک سبز با کوه‌های دوردست — خانهٔ همیشگی تک‌تیراندازها.",
    bg: "#062e24",
    ground: "#0a4335",
    ringMain: "#f59e0b",
    ringOther: "#10b981",
    mountain: "#065f46",
    decoColors: [0x0d9488, 0x059669, 0xd97706, 0x10b981],
    decoGlow: 0.14,
    hemiSky: "#a7f3d0",
    hemiGround: "#064e3b",
    sunColor: "#ffffff",
    sunIntensity: 1.1,
    ambIntensity: 0.8,
    fogNear: 10,
    fogFar: 36,
    orb: null,
    stars: false,
    clouds: 3,
    cloudColor: "#e7fff4",
    swatch: "bg-gradient-to-b from-emerald-300 via-emerald-600 to-emerald-950",
  },
  desert: {
    id: "desert",
    name: "کویر کهربا",
    desc: "غروب شنی با خورشید بزرگ و صخره‌های سرخ — نشانه‌گیری گرم می‌شود.",
    bg: "#431407",
    ground: "#92400e",
    ringMain: "#fbbf24",
    ringOther: "#f59e0b",
    mountain: "#7c2d12",
    decoColors: [0xd97706, 0xb45309, 0x78350f, 0xf59e0b],
    decoGlow: 0.12,
    hemiSky: "#fed7aa",
    hemiGround: "#7c2d12",
    sunColor: "#ffd9a0",
    sunIntensity: 1.25,
    ambIntensity: 0.85,
    fogNear: 9,
    fogFar: 34,
    orb: { pos: [7, 3.4, -30], r: 3.2, color: "#fbbf24" },
    stars: false,
    clouds: 2,
    cloudColor: "#ffd9a8",
    swatch: "bg-gradient-to-b from-amber-300 via-orange-600 to-orange-950",
  },
  night: {
    id: "night",
    name: "سکوت شب",
    desc: "آسمان پرستاره، ماه کم‌سو و کریستال‌های درخشان — تمرکز دوچندان.",
    bg: "#020617",
    ground: "#0f172a",
    ringMain: "#22d3ee",
    ringOther: "#155e75",
    mountain: "#1e293b",
    decoColors: [0x22d3ee, 0x2dd4bf, 0x38bdf8, 0x818cf8],
    decoGlow: 0.95,
    hemiSky: "#334155",
    hemiGround: "#020617",
    sunColor: "#93c5fd",
    sunIntensity: 0.55,
    ambIntensity: 0.52,
    fogNear: 8,
    fogFar: 32,
    orb: { pos: [-8, 6.6, -26], r: 1.9, color: "#e2e8f0" },
    stars: true,
    clouds: 0,
    cloudColor: "#e2e8f0",
    swatch: "bg-gradient-to-b from-slate-400 via-slate-700 to-slate-950",
  },
};

// ── فاز F5 — گزینه‌های نگاه (کلیدهای افزودنی ماندگار) ──

const MAP_KEY = "visionone:game-pref:fps-map";
const SENS_KEY = "visionone:game-pref:fps-sens";
const FOV_KEY = "visionone:game-pref:fps-fov";
const INVERT_KEY = "visionone:game-pref:fps-invert";
/** محدودهٔ حساسیت نگاه (ضریب — ۱ = پیش‌فرض) */
const SENS_MIN = 0.4;
const SENS_MAX = 2.2;
const SENS_DEF = 1;
/** محدودهٔ زاویهٔ دید */
const FOV_MIN = 62;
const FOV_MAX = 96;
const FOV_DEF = 72;

// ── فاز F7 — بودجهٔ عناصر محیطی در سه ترتیب [کیفیت سبک، دستگاه ضعیف، کامل] ──

const ENV_CRATES = [3, 4, 6];
const ENV_ROCKS = [4, 6, 9];
const ENV_TUFTS = [4, 7, 10];

function loadMapPref(): MapId {
  if (typeof window === "undefined") return "forest";
  try {
    const v = window.localStorage.getItem(MAP_KEY);
    return v && v in MAPS ? (v as MapId) : "forest";
  } catch {
    return "forest";
  }
}

function loadPrefNum(key: string, def: number, min: number, max: number): number {
  if (typeof window === "undefined") return def;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return def; // Number(null)=0 است — نباید به min کلمپ شود!
    const v = Number(raw);
    return Number.isFinite(v) ? clamp(v, min, max) : def;
  } catch {
    return def;
  }
}

function loadPrefBool(key: string, def: boolean): boolean {
  if (typeof window === "undefined") return def;
  try {
    const v = window.localStorage.getItem(key);
    if (v === "1") return true;
    if (v === "0") return false;
    return def;
  } catch {
    return def;
  }
}

function savePref(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
}

function loadQuality(): Quality {
  if (typeof window === "undefined") return "high";
  try {
    return window.localStorage.getItem(QUALITY_KEY) === "low" ? "low" : "high";
  } catch {
    return "high";
  }
}

type Phase = "setup" | "playing" | "done";
type Mode = "word-hunt" | "grammar-gate";

/** پیکربندی یک هدف متحرک */
interface TargetSpec {
  id: string;
  /** برچسب انگلیسی روی بیلبورد */
  text: string;
  correct: boolean;
  lane: number;
  baseY: number;
  baseZ: number;
  spin: number;
  bobSpeed: number;
  driftAmp: number;
  colorHex: number;
}

interface Question {
  seq: number;
  mode: Mode;
  /** دستور کوتاه فارسی */
  promptFa: string;
  /** محتوای اصلی سؤال — فارسی (معنی) یا انگلیسی (جمله) */
  promptMain: string;
  promptSub?: string;
  /** متن سؤال LTR است؟ */
  ltr: boolean;
  targets: TargetSpec[];
  speakText: string;
  /** کلید SRS (واژهٔ انگلیسی درست) */
  srsKey: string;
  lesson: number;
}

interface WrongItem {
  label: string;
  sub?: string;
}

interface FlashEntry {
  id: string;
  kind: "ok" | "bad";
  until: number;
}

interface SceneBridge {
  aim: { yaw: number; pitch: number };
  /** فاز F3 — آفست موقعیت بازیکن نسبت به پایه (متر) */
  pos: { x: number; z: number };
  /** فاز F3 — کلیدهای حرکت فشرده‌شده */
  keys: Set<string>;
  /** فاز F3 — در حال گام برداشتن؟ (برای باب سلاح) — فاز F4: بزرگی آنالوگ ۰..۱ */
  moveMag: number;
  /** فاز F4 — بردار آنالوگ جوی‌استیک لمسی (x = راست، y = جلو؛ −۱..۱) */
  stick: { x: number; y: number };
  shoot: { x: number; y: number; seq: number };
  lastShotAt: number;
  laneK: number;
  flashes: FlashEntry[];
  onHit: (id: string | null) => void;
  /** فاز F8 — فرار هدف‌های غلط فعال؟ (خاموش در «تپ ساده») */
  dodge: boolean;
  /** فاز F8 — شمارهٔ موج جاری (سرعت فرار و حرکت اهداف) */
  wave: number;
}

interface BurstApi {
  fire: (origin: THREE.Vector3) => void;
}

/** شکل رکورد شخصی — بهتر = امتیاز بیشتر */
interface BestRecord {
  score: number;
}

// ─── فاز G2-e — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / flappy) ───

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Crosshair size={24} />,
    title: "هدف‌ها را شکار کن",
    text: "سؤال روی HUD بالای میدان می‌ماند و هر هدف متحرک یک گزینهٔ انگلیسی روی بیلبورد دارد — دقیقاً به گزینهٔ درست شلیک کن. شلیک درست انفجار رنگین‌کمانی و امتیاز با کمبو دارد.",
  },
  {
    icon: <MousePointerClick size={24} />,
    title: "نشانه‌گیری و شلیک",
    text: "دسکتاپ: کلیک اول قفلِ نشانگر، حرکت موس نشانه‌گیری، WASD حرکت داخل میدان و کلیک بعدی شلیک — R خشاب را عوض می‌کند. موبایل: جوی‌استیک چپ حرکت، کشیدن صحنه نگاه و دکمهٔ راست (یا تپ روی هدف) شلیک. در «تپ ساده» تپ روی هدف کافی است و کلیدهای ۱ تا ۴ هم هدف‌ها را از چپ انتخاب می‌کنند. مأموریت تمام‌صفحه شروع می‌شود (Esc = خروج).",
  },
  {
    icon: <TargetIcon size={24} />,
    title: "خشاب و مهمات",
    text: "خشاب ۸تایی داری — شمارندهٔ فشنگ کنار رتیکل است. خالی شدن = ریلود خودکار با صدای تعویض؛ می‌توانی با R (دسکتاپ) زودتر ریلود کنی. شلیک حین ریلود یا فریز برخورد مهمات هدر نمی‌دهد، ولی هر شلیکِ خطا یک فشنگ کم است — درست نشانه بگیر!",
  },
  {
    icon: <Zap size={24} />,
    title: "هدف‌های هوشمند",
    text: "هدف‌های غلط وقتی نشانه را رویشان نگه داری به کناره‌ها فرار می‌کنند — از زاویهٔ دیگر نزدیک شو! هر ۵ پاسخ یک «موج» سخت‌تر با هدف‌های سریع‌تر شروع می‌شود. هر از گاهی هم «هدف طلایی» ظاهر می‌شود: ۳ ثانیه فرصت داری شکارش کنی تا ۲۰ امتیاز بونوس بگیری (شکارش قلب کم نمی‌کند).",
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: "کیفیت، نقشه و گزینه‌ها",
    text: "اگر صحنه روی گوشی سنگین بود، در تنظیمات «کیفیت سبک» را انتخاب کن. سه نقشهٔ مأموریت داری: جنگل زمردی، کویر کهربا و سکوت شب. حساسیت نگاه، زاویهٔ دید (FOV) و وارون‌سازی عمودی را هم در بخش «گزینه‌ها» تنظیم کن — همهٔ انتخاب‌ها برای دفعات بعد ذخیره می‌شوند و حین بازی هم از منوی توقف قابل تغییرند.",
  },
];

// ─── کمکی‌های خالص ───

function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

function qLabel(text: string): string {
  return text.replace(/_+/g, "......");
}

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

function scopeOf(mode: Mode, tap: boolean): string {
  return `${mode === "word-hunt" ? "word" : "grammar"}${tap ? "-tap" : ""}`;
}

function modeName(mode: Mode): string {
  return mode === "word-hunt" ? "شکار واژه" : "سد گرامری";
}

/** نمایش زمان نتیجه به شکل م:ث‌ث (الگوی سایر بازی‌های کیت) */
function fmtTime(s: number): string {
  return `${faNum(Math.floor(s / 60))}:${faNum(s % 60).padStart(2, "۰")}`;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** فاز F3 — خروج امن از تمام‌صفحه (کمکی ماژول‌سطح — قبل از دیالوگ‌های portal-body هم لازم است) */
function dropFullscreen(): void {
  try {
    if (document.fullscreenElement) void document.exitFullscreen();
  } catch {
    /* noop */
  }
}

/** مسیر مستطیل گرد (سازگار با همهٔ مرورگرها) */
function rrPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** بافت بیلبورد گزینه — قرص سفید با متن انگلیسی تیره (رویه‌ای، بدون فونت خارجی) */
function makeLabelTexture(text: string): THREE.CanvasTexture {
  const W = 640;
  const Hc = 160;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = Hc;
  const c = cv.getContext("2d");
  if (c) {
    let fs = 64;
    c.font = `800 ${fs}px system-ui, sans-serif`;
    while (c.measureText(text).width > W - 96 && fs > 24) {
      fs -= 3;
      c.font = `800 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(text).width, W - 96);
    const pw = Math.min(tw + 56, W - 24);
    const ph = 102;
    const px = (W - pw) / 2;
    const py = (Hc - ph) / 2;
    c.fillStyle = "rgba(255,255,255,0.95)";
    rrPath(c, px, py, pw, ph, 34);
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "rgba(6,95,70,0.35)";
    rrPath(c, px + 3, py + 3, pw - 6, ph - 6, 30);
    c.stroke();
    c.fillStyle = "#065f46";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, Hc / 2 + 4, W - 90);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return tex;
}

/** چیدمان هدف‌ها روی ۴ لِین با ارتفاع/عمق/حرکت متفاوت */
function layoutTargets(
  opts: Array<{ text: string; correct: boolean }>,
  wave = 1,
): TargetSpec[] {
  const lanes = shuffle([0, 1, 2, 3]);
  const colors = [0x10b981, 0xf59e0b, 0x14b8a6, 0x34d399];
  // فاز F8 — موج‌بندی: حرکت سریع‌تر و چیدمان عمیق‌تر در موج‌های بالاتر
  const sp = 1 + (wave - 1) * 0.16;
  const depthExtra = Math.min(wave - 1, 4) * 0.55;
  return opts.map((o, i) => ({
    id: `t${i}`,
    text: o.text,
    correct: o.correct,
    lane: LANE_X[lanes[i]],
    baseY: 1.35 + (i % 2) * 0.85 + Math.random() * 0.35,
    baseZ: -(5.5 + Math.floor(i / 2) * 3.4) - Math.random() * 2.6 - depthExtra,
    spin: (0.5 + Math.random() * 0.7) * sp,
    bobSpeed: (0.8 + Math.random() * 0.7) * sp,
    driftAmp: (0.5 + Math.random() * 0.8) * (1 + (wave - 1) * 0.1),
    colorHex: colors[i % colors.length],
  }));
}

/** فاز G2-e — maxOthers: تعداد حواس‌پرتی (کیفیت سبک = ۳ هدف هم‌زمان) */
function buildWordQuestion(
  seq: number,
  target: VocabEntry,
  distrPool: VocabEntry[],
  lesson: number,
  maxOthers: number,
  wave = 1,
): Question {
  const others = pickUnique(
    distrPool.filter((w) => w.word !== target.word),
    maxOthers,
    (w) => w.word,
  );
  const opts = shuffle([
    { text: target.word, correct: true },
    ...others.map((w) => ({ text: w.word, correct: false })),
  ]);
  return {
    seq,
    mode: "word-hunt",
    promptFa: "معنی را خواندی؟ واژهٔ درست را شکار کن!",
    promptMain: target.meaning,
    promptSub: target.pos ?? "واژهٔ درس",
    ltr: false,
    targets: layoutTargets(opts, wave),
    speakText: target.word,
    srsKey: target.word,
    lesson,
  };
}

/** فاز G2-e — maxOthers: در کیفیت سبک گزینهٔ درست + ۲ حواس‌پرتی (چیدمان لِین‌ها شافل است) */
function buildGrammarQuestion(seq: number, s: QuizQuestionSeed, lesson: number, maxOthers: number, wave = 1): Question {
  const optsAll = s.options.map((text, i) => ({ text, correct: i === s.answer }));
  const opts = [optsAll[s.answer], ...optsAll.filter((o) => !o.correct).slice(0, maxOthers)];
  return {
    seq,
    mode: "grammar-gate",
    promptFa: "سد گرامری! گزینهٔ درست را شکار کن",
    promptMain: qLabel(s.text),
    promptSub: s.scope,
    ltr: true,
    targets: layoutTargets(opts, wave),
    speakText: s.text.replace(/_+/, s.options[s.answer]),
    srsKey: s.options[s.answer],
    lesson,
  };
}

// ─── اجزای صحنهٔ سه‌بعدی ───

// ── فاز F7 — پوشش‌های میدان با برخورد واقعی بازیکن ──

/** جعبه‌های پوشش — چیدمان ثابت جهان (برخورد بازیکن با همین لیست است) */
const COVER_CRATES: Array<{ x: number; z: number; h: number }> = [
  { x: -3.4, z: 4.6, h: 1.15 },
  { x: 3.1, z: 5.6, h: 0.95 },
  { x: -1.7, z: 6.9, h: 1.3 },
  { x: 4.7, z: 4.3, h: 1.05 },
  { x: -4.9, z: 6.3, h: 1.2 },
  { x: 1.9, z: 8.0, h: 1.0 },
];
/** شعاع برخورد بازیکن (متر) */
const PLAYER_R = 0.34;

/** فاز F7 — برخورد دایره‌ای سادهٔ بازیکن با جعبه‌ها — جهش درجا روی pos (فضای جهان ↔ آفست دوربین) */
function resolveCover(pos: { x: number; z: number }, laneK: number): void {
  const baseZ = 7 + (1 - laneK) * 4.2;
  const pzW = baseZ + pos.z; // z بازیکن در فضای جهان
  for (const c of COVER_CRATES) {
    const dx = pos.x - c.x;
    const dz = pzW - c.z;
    const rr = c.h * 0.62 + PLAYER_R;
    const d = Math.hypot(dx, dz);
    if (d < rr && d > 1e-4) {
      pos.x = c.x + (dx / d) * rr;
      pos.z = c.z + (dz / d) * rr - baseZ;
    }
  }
}

/** فاز F3 — انتگرال حرکت بازیکن از کلیدها + جوی‌استیک آنالوگ (جهش bridge فقط داخل توابع ماژول) */
function stepPlayer(b: SceneBridge, dt: number): boolean {
  let mx = 0;
  let mz = 0;
  if (b.keys.has("w")) mz += 1;
  if (b.keys.has("s")) mz -= 1;
  if (b.keys.has("d")) mx += 1;
  if (b.keys.has("a")) mx -= 1;
  // فاز F4 — ورودی آنالوگ جوی‌استیک لمسی (سرعت متناسب با کمان کشیدن)
  mx += b.stick.x;
  mz += b.stick.y;
  let mag = Math.hypot(mx, mz);
  const moving = mag > 0.12; // deadzone — لرزش انگشت حرکت کاذب نمی‌سازد
  if (moving) {
    if (mag > 1) {
      mx /= mag;
      mz /= mag;
      mag = 1;
    }
    const yaw = b.aim.yaw;
    const sin = Math.sin(yaw);
    const cos = Math.cos(yaw);
    // جلو = −z محلی؛ راست = +x محلی — بدون pitch (گام زمینی)
    const vx = -sin * mz + cos * mx;
    const vz = -cos * mz - sin * mx;
    const len = Math.hypot(vx, vz) || 1;
    const sp = MOVE_SPEED * mag * dt;
    b.pos.x = clamp(b.pos.x + (vx / len) * sp, -MOVE_X_LIM, MOVE_X_LIM);
    b.pos.z = clamp(b.pos.z + (vz / len) * sp, MOVE_Z_MIN, MOVE_Z_MAX);
    // فاز F7 — پوشش‌ها را دور می‌زنی، نه از داخلشان رد می‌شوی
    resolveCover(b.pos, b.laneK);
    b.pos.x = clamp(b.pos.x, -MOVE_X_LIM, MOVE_X_LIM);
    b.pos.z = clamp(b.pos.z, MOVE_Z_MIN, MOVE_Z_MAX);
  }
  b.moveMag = moving ? mag : 0;
  return moving;
}

/** به‌روزرسانی ترنسفورم دوربین اول‌شخص — تابع ماژول‌سطح (جهش THREE فقط از اینجا) */
function applyRig(cam: THREE.Camera, b: SceneBridge, aspect: number, bobY: number): void {
  b.laneK = Math.max(0.55, Math.min(1, aspect / 1.5));
  const baseZ = 7 + (1 - b.laneK) * 4.2;
  cam.position.x = b.pos.x;
  cam.position.z = baseZ + b.pos.z;
  cam.position.y = 1.7 + bobY;
  cam.rotation.y = b.aim.yaw;
  cam.rotation.x = b.aim.pitch;
}

/** تنظیم اولیهٔ دوربین — تابع ماژول‌سطح */
function initRig(cam: THREE.Camera): void {
  cam.position.set(0, 1.7, 7);
  cam.rotation.order = "YXZ";
}

/** فاز F5 — اعمال زاویهٔ دید روی دوربین — تابع ماژول‌سطح (قاعدهٔ immutability کیت) */
function applyFov(cam: THREE.Camera, fov: number): void {
  const c = cam as THREE.PerspectiveCamera;
  if (c.fov !== fov) {
    c.fov = fov;
    c.updateProjectionMatrix();
  }
}

/** فاز F5 — زاویهٔ دید زنده: تغییر اسلایدر FOV بلافاصله روی دوربین اعمال می‌شود */
function FovTune({ fov }: { fov: number }) {
  const { camera } = useThree();
  useEffect(() => {
    applyFov(camera, fov);
  }, [camera, fov]);
  return null;
}

/** دوربین اول‌شخص — چرخش + حرکت WASD (فاز F3) + باب سر + تطبیق عرض صحنه در پرتره */
function Rig({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const { camera, size } = useThree();
  const bobT = useRef(0);
  useEffect(() => {
    initRig(camera);
  }, [camera]);
  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05); // سقف delta — پرش برگشت به تب
    const moving = stepPlayer(bridge.current, dt);
    bobT.current += dt * (moving ? 8.5 : 2.2);
    const bobY = Math.sin(bobT.current) * (moving ? 0.042 : 0.012);
    applyRig(camera, bridge.current, size.width / Math.max(1, size.height), bobY);
  });
  return null;
}

/** فاز F3 — تفنگ سه‌بعدی ویومدل + فاز F4 — پوکهٔ برنجی: همگام با دوربین؛ sway، باب آنالوگ، recoil، جرقه و پوکه */
function ViewModel({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const gRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const recoil = useRef(0);
  const lastSeq = useRef(0);
  // فاز F4 — پوکهٔ پرتابی (فضای جهانی، خارج از گروه تفنگ)
  const casingRef = useRef<THREE.Mesh>(null);
  const casing = useRef({ active: false, t0: 0, vel: new THREE.Vector3(), spinX: 0, spinZ: 0 });
  useFrame((state, delta) => {
    const g = gRef.current;
    if (!g) return;
    const b = bridge.current;
    if (b.shoot.seq !== lastSeq.current) {
      lastSeq.current = b.shoot.seq;
      recoil.current = 1;
      // فاز F4 — پرتاب پوکه از پورت خروج (راست-بالا نسبت به دوربین) با اسپین تصادفی
      const c = casingRef.current;
      if (c) {
        const cam = state.camera;
        c.position.copy(cam.position);
        c.quaternion.copy(cam.quaternion);
        c.translateX(0.4);
        c.translateY(0.02);
        c.translateZ(-0.5);
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
        casing.current.vel.copy(right).multiplyScalar(1.5 + Math.random() * 0.7);
        casing.current.vel.y = 1.7 + Math.random() * 0.9;
        casing.current.spinX = 9 + Math.random() * 14;
        casing.current.spinZ = 6 + Math.random() * 10;
        casing.current.active = true;
        casing.current.t0 = performance.now();
        c.visible = true;
        c.scale.setScalar(1);
      }
    }
    recoil.current = Math.max(0, recoil.current - Math.min(delta, 0.05) * 5.2);
    const r = easeOutCubic(recoil.current);
    const t = state.clock.elapsedTime;
    const sway = Math.sin(t * 1.7) * 0.006 + Math.sin(t * 0.9) * 0.004;
    const bob = b.moveMag > 0 ? Math.sin(t * 9) * 0.014 * b.moveMag : 0;
    // سوار بر دوربین بدون parenting (سازگار با هر scene-graph): کپی ترنسفورم + آفست فضای دوربین
    const cam = state.camera;
    g.position.copy(cam.position);
    g.quaternion.copy(cam.quaternion);
    g.translateX(0.34 - r * 0.02);
    g.translateY(-0.3 + sway * 0.6 + bob - r * 0.05);
    g.translateZ(-0.62 + r * 0.16);
    g.rotateX(0.05 + r * 0.34);
    g.rotateY(-0.07 - r * 0.05);
    g.rotateZ(r * 0.06);
    const f = flashRef.current;
    const l = lightRef.current;
    const fs = recoil.current > 0.55 ? (recoil.current - 0.55) / 0.45 : 0;
    if (f) {
      f.visible = fs > 0.02;
      f.scale.setScalar(0.001 + fs * 0.55);
      (f.material as THREE.MeshBasicMaterial).opacity = fs;
    }
    if (l) l.intensity = fs * 7;
    // فاز F4 — پرواز پوکه: گرانش + اسپین + محو در ۰٫۹ ثانیه
    const cs = casingRef.current;
    if (cs && casing.current.active) {
      const dt = Math.min(delta, 0.05);
      const p = (performance.now() - casing.current.t0) / 900;
      if (p >= 1) {
        casing.current.active = false;
        cs.visible = false;
      } else {
        casing.current.vel.y -= 6.5 * dt;
        cs.position.addScaledVector(casing.current.vel, dt);
        cs.rotation.x += casing.current.spinX * dt;
        cs.rotation.z += casing.current.spinZ * dt;
        cs.scale.setScalar(p < 0.65 ? 1 : Math.max(0.001, 1 - (p - 0.65) / 0.35));
      }
    }
  });
  return (
    <>
      <group ref={gRef}>
        {/* بدنه اصلی */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.09, 0.15, 0.5]} />
          <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.55} />
        </mesh>
        {/* لوله */}
        <mesh position={[0, 0.035, -0.34]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.028, 0.032, 0.42, 12]} />
          <meshStandardMaterial color="#111827" roughness={0.35} metalness={0.7} />
        </mesh>
        {/* دستهٔ کمک‌رنگ */}
        <mesh position={[0, -0.13, 0.16]} rotation-x={-0.32}>
          <boxGeometry args={[0.075, 0.2, 0.09]} />
          <meshStandardMaterial color="#065f46" roughness={0.7} metalness={0.15} />
        </mesh>
        {/* خشاب */}
        <mesh position={[0, -0.12, -0.02]} rotation-x={0.22}>
          <boxGeometry args={[0.06, 0.16, 0.08]} />
          <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} />
        </mesh>
        {/* ریل بالا + مگسک کهربایی */}
        <mesh position={[0, 0.085, 0.02]}>
          <boxGeometry args={[0.05, 0.03, 0.3]} />
          <meshStandardMaterial color="#0b1220" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.105, -0.18]}>
          <boxGeometry args={[0.02, 0.045, 0.03]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.55} roughness={0.4} />
        </mesh>
        {/* جرقهٔ دهانه + نور لحظه‌ای شلیک */}
        <mesh ref={flashRef} position={[0, 0.035, -0.58]} rotation-x={Math.PI / 2} visible={false}>
          <coneGeometry args={[0.055, 0.16, 8]} />
          <meshBasicMaterial color="#fde68a" transparent opacity={0} toneMapped={false} depthWrite={false} />
        </mesh>
        <pointLight ref={lightRef} position={[0, 0.06, -0.6]} color="#fbbf24" intensity={0} distance={4} decay={2} />
      </group>
      {/* فاز F4 — پوکهٔ برنجی در فضای جهانی */}
      <mesh ref={casingRef} visible={false}>
        <cylinderGeometry args={[0.014, 0.014, 0.05, 8]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.25} emissive="#92400e" emissiveIntensity={0.25} />
      </mesh>
    </>
  );
}

/** فاز F7 — آسمان پرستارهٔ نقشهٔ شب (Points سبک؛ fog=false تا مه ستاره‌ها را نخورد) */
function StarField() {
  const geo = useMemo(() => {
    const N = 150;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // پخش روی گنبد آسمان — بالای افق
      const a = Math.random() * Math.PI * 2;
      const el = 0.08 + Math.random() * 1.25;
      const r = 38 + Math.random() * 14;
      pos[i * 3] = Math.cos(a) * Math.cos(el) * r;
      pos[i * 3 + 1] = Math.sin(el) * r;
      pos[i * 3 + 2] = Math.sin(a) * Math.cos(el) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <points geometry={geo} frustumCulled={false}>
      <pointsMaterial color="#e2e8f0" size={0.34} sizeAttenuation transparent opacity={0.85} fog={false} />
    </points>
  );
}

/** فاز F7 — خورشید/ماه درخشان با هالهٔ نرم (fog=false — دورتر از مه است) */
function SkyOrb({ orb }: { orb: NonNullable<MapConfig["orb"]> }) {
  return (
    <group position={orb.pos}>
      <mesh>
        <sphereGeometry args={[orb.r, 20, 20]} />
        <meshBasicMaterial color={orb.color} toneMapped={false} fog={false} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[orb.r, 16, 16]} />
        <meshBasicMaterial color={orb.color} transparent opacity={0.2} toneMapped={false} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** فاز F7 — ابرهای low-poly چرخان دور میدان (دستگیرهٔ دور = حرکت مداری آرام) */
function CloudDrift({ count, color }: { count: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  const specs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: `c${i}`,
        r: 17 + Math.random() * 9,
        y: 6.5 + Math.random() * 3.5,
        speed: 0.014 + Math.random() * 0.012,
        a0: (i / Math.max(1, count)) * Math.PI * 2,
        s: 1 + Math.random() * 0.8,
      })),
    [count],
  );
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < g.children.length; i++) {
      const sp = specs[i];
      if (!sp) break;
      const c = g.children[i];
      const a = sp.a0 + t * sp.speed;
      c.position.set(Math.cos(a) * sp.r, sp.y + Math.sin(t * 0.25 + i) * 0.3, Math.sin(a) * sp.r - 7);
      c.rotation.y = -a;
    }
  });
  const mat = <meshStandardMaterial color={color} flatShading roughness={1} transparent opacity={0.85} />;
  return (
    <group ref={ref}>
      {specs.map((sp) => (
        <group key={sp.key} scale={sp.s}>
          <mesh>{mat}</mesh>
          <mesh position={[1.5, -0.25, 0.3]} scale={0.72}>
            {mat}
          </mesh>
          <mesh position={[-1.5, -0.3, -0.2]} scale={0.6}>
            {mat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** فاز F7 — عناصر محیطی میدان: جعبهٔ پوشش + ابلیسک + سنگ‌ریزه + بوته — همه دکور؛ خارج از registry رِی‌کست */
function FieldProps({ map, tier }: { map: MapConfig; tier: 0 | 1 | 2 }) {
  const crateColor = map.id === "desert" ? "#a16207" : "#92400e";
  const obeliskColor = map.mountain;
  const rockColor = map.id === "night" ? "#334155" : map.mountain;
  const tuftColor = map.decoColors[1];
  const crates = useMemo(() => COVER_CRATES.slice(0, ENV_CRATES[tier]), [tier]);
  const rocks = useMemo(
    () =>
      Array.from({ length: ENV_ROCKS[tier] }, (_, i) => ({
        key: `rk${i}`,
        x: (i % 2 === 0 ? 1 : -1) * (1.2 + Math.random() * 7.6),
        z: -1 - Math.random() * 14,
        s: 0.18 + Math.random() * 0.3,
        rot: Math.random() * Math.PI,
      })),
    [tier],
  );
  const tufts = useMemo(
    () =>
      Array.from({ length: ENV_TUFTS[tier] }, (_, i) => ({
        key: `tf${i}`,
        x: (i % 2 === 0 ? -1 : 1) * (0.7 + Math.random() * 6.8),
        z: -1.5 - Math.random() * 11,
        s: 0.7 + Math.random() * 0.7,
      })),
    [tier],
  );
  return (
    <group>
      {/* جعبه‌های پوشش — با برخورد ساده (resolveCover در stepPlayer) */}
      {crates.map((c) => (
        <mesh key={`cb${c.x}`} position={[c.x, c.h / 2, c.z]} rotation-y={c.x * 0.7}>
          <boxGeometry args={[c.h * 1.15, c.h, c.h * 1.05]} />
          <meshStandardMaterial color={crateColor} roughness={0.85} flatShading />
        </mesh>
      ))}
      {/* ابلیسک‌های دو طرف میدان — قاب‌بندی صحنه */}
      <mesh position={[-10.5, 2.6, -6]} rotation-y={-10.5}>
        <cylinderGeometry args={[0.47, 0.85, 5.2, 5]} />
        <meshStandardMaterial color={obeliskColor} flatShading roughness={1} />
      </mesh>
      <mesh position={[11.5, 3.2, -9]} rotation-y={11.5}>
        <cylinderGeometry args={[0.58, 1.05, 6.4, 5]} />
        <meshStandardMaterial color={obeliskColor} flatShading roughness={1} />
      </mesh>
      {/* سنگ‌ریزه‌های پراکنده */}
      {rocks.map((r) => (
        <mesh key={r.key} position={[r.x, r.s * 0.6, r.z]} rotation-y={r.rot}>
          <dodecahedronGeometry args={[r.s, 0]} />
          <meshStandardMaterial color={rockColor} flatShading roughness={1} />
        </mesh>
      ))}
      {/* بوته‌ها */}
      {tufts.map((t) => (
        <mesh key={t.key} position={[t.x, 0.22 * t.s, t.z]}>
          <coneGeometry args={[0.16 * t.s, 0.5 * t.s, 6]} />
          <meshStandardMaterial color={tuftColor} flatShading roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** میدان low-poly با پالت نقشه (فاز F6): زمین، کوه، آسمان زنده و عناصر محیطی — فاز G2-e: deco پارامتر */
function Arena({ map, deco, tier }: { map: MapConfig; deco: number; tier: 0 | 1 | 2 }) {
  const decoShapes = useMemo(
    () =>
      shuffle(
        Array.from({ length: deco }, (_, i) => ({
          key: `d${i}`,
          kind: (i % 3 === 0 ? "octa" : i % 3 === 1 ? "box" : "dodeca") as "octa" | "box" | "dodeca",
          pos: [
            (i % 2 === 0 ? 1 : -1) * (7.5 + Math.random() * 8),
            0.8 + Math.random() * 4.2,
            -4 - Math.random() * 18,
          ] as [number, number, number],
          hue: map.decoColors[i % map.decoColors.length],
          spin: 0.2 + Math.random() * 0.4,
          bob: 0.4 + Math.random() * 0.5,
          scale: 0.5 + Math.random() * 1.1,
        })),
      ),
    [deco, map],
  );
  const mounts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        key: `m${i}`,
        pos: [-24 + i * 9.5 + Math.random() * 4, 0, -26 - Math.random() * 6] as [number, number, number],
        h: 5 + Math.random() * 5,
        r: 3 + Math.random() * 2.4,
      })),
    [],
  );
  return (
    <>
      <color attach="background" args={[map.bg]} />
      <fog attach="fog" args={[map.bg, map.fogNear, map.fogFar]} />
      <ambientLight intensity={map.ambIntensity} />
      <hemisphereLight args={[map.hemiSky, map.hemiGround, 0.55]} />
      <directionalLight position={[5, 9, 3]} intensity={map.sunIntensity} color={map.sunColor} />
      {/* زمین دایره‌ای */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -7]}>
        <circleGeometry args={[30, 44]} />
        <meshStandardMaterial color={map.ground} roughness={0.95} />
      </mesh>
      {/* حلقه‌های راهنمای زمین */}
      {[5.4, 9.2, 13.4].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.02, -7]}>
          <ringGeometry args={[r, r + 0.22, 52]} />
          <meshBasicMaterial color={i === 0 ? map.ringMain : map.ringOther} transparent opacity={0.3 - i * 0.07} />
        </mesh>
      ))}
      {/* کوه‌های low-poly دوردست */}
      {mounts.map((m) => (
        <mesh key={m.key} position={m.pos}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color={map.mountain} flatShading roughness={1} />
        </mesh>
      ))}
      {/* آسمان زنده — فاز F7 */}
      {map.orb && <SkyOrb orb={map.orb} />}
      {map.stars && <StarField />}
      {map.clouds > 0 && <CloudDrift count={map.clouds} color={map.cloudColor} />}
      {/* عناصر محیطی — جعبه/ابلیسک/سنگ/بوته */}
      <FieldProps map={map} tier={tier} />
      {/* اجسام شناور تزئینی */}
      {decoShapes.map((d) => (
        <DecoShape key={d.key} spec={d} glow={map.decoGlow} />
      ))}
    </>
  );
}

interface DecoSpec {
  key: string;
  kind: "octa" | "box" | "dodeca";
  pos: [number, number, number];
  hue: number;
  spin: number;
  bob: number;
  scale: number;
}

function DecoShape({ spec, glow }: { spec: DecoSpec; glow: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const t0 = useMemo(() => Math.random() * 8, []);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = spec.pos[1] + Math.sin(t * spec.bob + t0) * 0.55;
    m.rotation.y = t * spec.spin;
    m.rotation.x = t * spec.spin * 0.55;
  });
  return (
    <mesh ref={ref} position={spec.pos} scale={spec.scale}>
      {spec.kind === "octa" ? (
        <octahedronGeometry args={[1, 0]} />
      ) : spec.kind === "box" ? (
        <boxGeometry args={[1.3, 1.3, 1.3]} />
      ) : (
        <dodecahedronGeometry args={[1, 0]} />
      )}
      {/* فاز F6 — emissive پالت نقشه: شب = کریستال درخشان، روز = درخشش ملایم */}
      <meshStandardMaterial color={spec.hue} flatShading roughness={0.6} metalness={0.12} emissive={spec.hue} emissiveIntensity={glow} />
    </mesh>
  );
}

/** یک هدف متحرک: اوکتاهدر درخشان + بیلبورد برچسب انگلیسی */
function Target({
  spec,
  registry,
  bridge,
}: {
  spec: TargetSpec;
  registry: React.RefObject<THREE.Mesh[]>;
  bridge: React.RefObject<SceneBridge>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeLabelTexture(spec.text), [spec.text]);
  const t0 = useMemo(() => Math.random() * 6, []);
  // فاز F8 — وضعیت فرار هدف غلط از نشانه (آفست جانبی + جهت + سرعت لحظه‌ای)
  const dodgeX = useRef(0);
  const dodgeDir = useRef(1);
  const dodgeVel = useRef(0);
  const projV = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => () => tex.dispose(), [tex]);

  // ثبت/حذف مش برای raycast شلیک
  useEffect(() => {
    const m = meshRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = spec.id;
    list.push(m);
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
    };
  }, [registry, spec.id]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    const b = bridge.current;
    const dt = Math.min(delta, 0.05);
    // فاز F8 — فرار هدف غلط: وقتی نزدیک مرکز نشانه است به کناره‌ها می‌گریزد
    // (خاموش در «تپ ساده» و حین فریز برخورد؛ سرعت با شمارهٔ موج بالا می‌رود)
    if (!spec.correct && b.dodge && b.flashes.length === 0) {
      projV.copy(g.position).project(state.camera);
      const centered = projV.z < 1 && Math.abs(projV.x) < DODGE_TRIGGER && projV.y > -0.35;
      if (centered) {
        if (dodgeVel.current <= 0.01) {
          // جهت گریز: به بیرون صفحه — اگر تقریباً وسط است، سمت فضای خالی‌تر لِین
          dodgeDir.current = projV.x > 0.04 ? 1 : projV.x < -0.04 ? -1 : spec.lane >= 0 ? 1 : -1;
        }
        const targetVel = DODGE_BASE + (b.wave - 1) * DODGE_WAVE_STEP;
        dodgeVel.current = Math.min(targetVel, dodgeVel.current + dt * 4.2);
      } else {
        // دور شدن نگاه = آرام‌شدن گریز (فرصت نزدیک‌شدن از زاویهٔ دیگر)
        dodgeVel.current = Math.max(0, dodgeVel.current - dt * 2.1);
      }
      dodgeX.current = clamp(dodgeX.current + dodgeDir.current * dodgeVel.current * dt, -DODGE_MAX, DODGE_MAX);
    }
    g.position.set(
      spec.lane * b.laneK + Math.sin(t * 0.5 + t0) * spec.driftAmp * b.laneK + dodgeX.current * b.laneK,
      spec.baseY + Math.sin(t * spec.bobSpeed + t0) * 0.4,
      spec.baseZ,
    );
    m.rotation.y += 0.008 * spec.spin * 60 * 0.016;
    m.rotation.x = Math.sin(t * 0.4 + t0) * 0.25;
    // فلاش سبز/قرمز پس از پاسخ + تنفس ملایم
    const mat = m.material as THREE.MeshStandardMaterial;
    const now = t * 1000;
    const f = b.flashes.find((fl) => fl.id === spec.id && now < fl.until);
    if (f) {
      mat.emissive.setHex(f.kind === "ok" ? 0x10b981 : 0xef4444);
      mat.emissiveIntensity = 1.15;
    } else {
      mat.emissive.setHex(spec.colorHex);
      mat.emissiveIntensity = 0.24 + Math.sin(now / 420 + t0) * 0.09;
    }
  });

  return (
    <group ref={groupRef} position={[spec.lane, spec.baseY, spec.baseZ]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[TARGET_R, 0]} />
        <meshStandardMaterial
          color={spec.colorHex}
          flatShading
          roughness={0.35}
          metalness={0.15}
          emissive={spec.colorHex}
          emissiveIntensity={0.25}
        />
      </mesh>
      <sprite position={[0, 1.55, 0]} scale={[2.9, 0.73, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

/** بافت برچسب طلایی — قرص کهربایی با متن بونوس (فاز F8) */
function makeGoldLabelTexture(text: string): THREE.CanvasTexture {
  const W = 512;
  const Hc = 150;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = Hc;
  const c = cv.getContext("2d");
  if (c) {
    let fs = 66;
    c.font = `900 ${fs}px system-ui, sans-serif`;
    while (c.measureText(text).width > W - 110 && fs > 26) {
      fs -= 3;
      c.font = `900 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(text).width, W - 110);
    const pw = Math.min(tw + 64, W - 24);
    const ph = 96;
    const px = (W - pw) / 2;
    const py = (Hc - ph) / 2;
    c.fillStyle = "#fbbf24";
    rrPath(c, px, py, pw, ph, 32);
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "rgba(120,53,15,0.55)";
    rrPath(c, px + 3, py + 3, pw - 6, ph - 6, 28);
    c.stroke();
    c.fillStyle = "#78350f";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, Hc / 2 + 4, W - 100);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return tex;
}

interface GoldenSpec {
  lane: number;
  y: number;
  z: number;
}

/** فاز F8 — هدف طلایی: پاپ‌آپ ۳ثانیه‌ای بونوس — شکارش +۲۰ امتیاز خارج از چرخهٔ سؤال */
function GoldenTarget({
  spec,
  untilRef,
  registry,
  bridge,
}: {
  spec: GoldenSpec;
  untilRef: React.RefObject<number>;
  registry: React.RefObject<THREE.Mesh[]>;
  bridge: React.RefObject<SceneBridge>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeGoldLabelTexture(`+${faNum(GOLDEN_BONUS)}`), []);
  useEffect(() => () => tex.dispose(), [tex]);

  // ثبت مش برای رِی‌کست شلیک — id ویژهٔ «golden»
  useEffect(() => {
    const m = meshRef.current;
    const list = registry.current;
    if (!m || !list) return;
    m.userData.id = "golden";
    list.push(m);
    return () => {
      const i = list.indexOf(m);
      if (i >= 0) list.splice(i, 1);
    };
  }, [registry]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const dt = Math.min(delta, 0.05);
    const b = bridge.current;
    const now = performance.now();
    if (untilRef.current <= 0) {
      g.visible = false;
      return;
    }
    g.visible = true;
    const t = state.clock.elapsedTime;
    // ورود/خروج نرم بر اساس پنجرهٔ باقی‌مانده — جبران توقف داخل untilRef است
    const p = 1 - clamp((untilRef.current - now) / GOLDEN_WINDOW_MS, 0, 1);
    const scale = p < 0.12 ? p / 0.12 : p > 0.86 ? Math.max(0.05, (1 - p) / 0.14) : 1;
    g.scale.setScalar(Math.max(0.001, scale));
    g.position.set(spec.lane * b.laneK, spec.y + Math.sin(t * 2.7) * 0.28, spec.z);
    m.rotation.y += dt * 3.4;
    m.rotation.x = Math.sin(t * 1.8) * 0.2;
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.85 + Math.sin(now / 130) * 0.3;
  });

  return (
    <group ref={groupRef} position={[spec.lane, spec.y, spec.z]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[TARGET_R * 1.1, 0]} />
        <meshStandardMaterial
          color="#fbbf24"
          flatShading
          roughness={0.25}
          metalness={0.45}
          emissive="#f59e0b"
          emissiveIntensity={0.9}
        />
      </mesh>
      {/* هالهٔ طلایی */}
      <mesh scale={1.5}>
        <octahedronGeometry args={[TARGET_R * 1.1, 0]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.18} toneMapped={false} depthWrite={false} />
      </mesh>
      <sprite position={[0, 1.5, 0]} scale={[2.1, 0.62, 1]}>
        <spriteMaterial map={tex} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

/** استخر انفجار رنگین‌کمانی — InstancedMesh با رنگ هر ذره */
function Burst({ apiRef, count }: { apiRef: React.RefObject<BurstApi | null>; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const parts = useMemo(() => {
    const dirs = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.acos(2 * Math.random() - 1);
      dirs[i * 3] = Math.sin(v) * Math.cos(u);
      dirs[i * 3 + 1] = Math.cos(v);
      dirs[i * 3 + 2] = Math.sin(v) * Math.sin(u);
      speeds[i] = 1.7 + Math.random() * 2.8;
    }
    return { dirs, speeds };
  }, [count]);
  const st = useRef({ active: false, t0: 0, origin: new THREE.Vector3() });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // رنگ هر ذره — پالت رنگین‌کمان
    const c = new THREE.Color();
    const rainbow = [0xf43f5e, 0xf97316, 0xfacc15, 0x22c55e, 0x14b8a6, 0x38bdf8, 0xa78bfa, 0xf472b6];
    for (let i = 0; i < count; i++) {
      c.setHex(rainbow[i % rainbow.length]);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    // پنهان‌سازی اولیه
    const m0 = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < count; i++) mesh.setMatrixAt(i, m0);
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  useEffect(() => {
    apiRef.current = {
      fire: (origin) => {
        st.current.active = true;
        st.current.t0 = performance.now();
        st.current.origin.copy(origin);
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || !st.current.active) return;
    const t = (performance.now() - st.current.t0) / 950;
    if (t >= 1) {
      st.current.active = false;
      const m0 = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = 0; i < count; i++) mesh.setMatrixAt(i, m0);
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }
    const e = easeOutCubic(t);
    for (let i = 0; i < count; i++) {
      const d = e * parts.speeds[i] * 2.1;
      dummy.position.set(
        st.current.origin.x + parts.dirs[i * 3] * d,
        st.current.origin.y + parts.dirs[i * 3 + 1] * d - t * t * 1.5,
        st.current.origin.z + parts.dirs[i * 3 + 2] * d,
      );
      const s = (1 - t) * 0.3;
      dummy.scale.setScalar(Math.max(0.001, s));
      dummy.rotation.set(t * 5 + i, t * 4, i * 0.7);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/** پردازش درخواست شلیک: raycast از دوربین به نقطه — انفجار + گزارش برخورد */
function World({
  bridge,
  registry,
  burstApi,
}: {
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
}) {
  const { camera } = useThree();
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const v2 = useMemo(() => new THREE.Vector2(), []);
  const lastSeq = useRef(0);
  useFrame(() => {
    const b = bridge.current;
    const req = b.shoot;
    if (req.seq === lastSeq.current) return;
    lastSeq.current = req.seq;
    v2.set(req.x, req.y);
    ray.setFromCamera(v2, camera);
    const hits = ray.intersectObjects(registry.current ?? [], false);
    const first = hits.find((h) => h.object.visible);
    if (first) {
      burstApi.current?.fire(first.point);
      b.onHit((first.object.userData.id as string | undefined) ?? null);
    } else {
      b.onHit(null);
    }
  });
  return null;
}

// ─── فاز F4 — جوی‌استیک لمسی حرکت (فقط pointer:coarse) ───

/** شعاع کمان جوی‌استیک (px) */
const STICK_R = 52;

/** فاز F4 — نوشتن بردار جوی‌استیک + جابه‌جایی دسته — تابع ماژول‌سطح (قاعدهٔ immutability کیت) */
function setStick(b: SceneBridge, x: number, y: number, knob: HTMLElement | null): void {
  b.stick.x = x;
  b.stick.y = y;
  if (knob) {
    knob.style.transform = `translate(calc(-50% + ${(x * STICK_R).toFixed(1)}px), calc(-50% + ${(-y * STICK_R).toFixed(1)}px))`;
  }
}

/**
 * جوی‌استیک مجازی حرکت: بردار آنالوگ مستقیم داخل bridge.current.stick می‌نویسد
 * (صفر ری‌رندر در هر فریم — حرکت با pointer capture). بالا = جلو.
 */
function TouchJoystick({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const pidRef = useRef<number | null>(null);

  const setVec = (x: number, y: number) => {
    setStick(bridge.current, x, y, knobRef.current);
  };

  /** اعمال موقعیت انگشت به بردار آنالوگ (clamp به شعاع) */
  const update = (e: React.PointerEvent) => {
    const base = baseRef.current;
    if (!base) return;
    const r = base.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > STICK_R) {
      dx = (dx / len) * STICK_R;
      dy = (dy / len) * STICK_R;
    }
    setVec(dx / STICK_R, -dy / STICK_R);
  };

  // پاک‌سازی در unmount — بازیکن گیر حرکت کاذب نماند (cleanup پایدار با bridge)
  useEffect(() => {
    const b = bridge;
    return () => setStick(b.current, 0, 0, null);
  }, [bridge]);

  return (
    <div
      data-fps-hud
      ref={baseRef}
      role="group"
      aria-label="جوی‌استیک حرکت — بکش تا قدم برداری"
      className="pointer-events-auto absolute bottom-5 left-4 z-20 h-32 w-32 touch-none select-none rounded-full border-2 border-white/25 bg-black/35 backdrop-blur"
      onPointerDown={(e) => {
        if (pidRef.current !== null) return;
        pidRef.current = e.pointerId;
        // گارد: برخی مرورگرها/پوینترهای غیرفعال capture را رد می‌کنند — ردیابی با move ادامه دارد
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
        update(e);
      }}
      onPointerMove={(e) => {
        if (e.pointerId !== pidRef.current) return;
        update(e);
      }}
      onPointerUp={(e) => {
        if (e.pointerId !== pidRef.current) return;
        pidRef.current = null;
        setVec(0, 0);
      }}
      onPointerCancel={() => {
        pidRef.current = null;
        setVec(0, 0);
      }}
    >
      {/* نشانگرهای جهت */}
      <span aria-hidden className="absolute inset-x-0 top-1.5 text-center text-[9px] font-black text-white/40">
        ▲
      </span>
      <span aria-hidden className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-black text-white/40">
        ▼
      </span>
      {/* دستهٔ متحرک */}
      <span
        aria-hidden
        ref={knobRef}
        className="absolute left-1/2 top-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/25 shadow-lg transition-transform duration-75 ease-out"
      />
    </div>
  );
}

// ─── بازی اصلی ───

export function FpsShooterGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("word-hunt");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [tapMode, setTapMode] = useState(false);
  const [locked, setLocked] = useState(false);
  // فاز G2-e — کیفیت گرافیک (ماندگار؛ پیش‌فرض عادی)
  const [quality, setQuality] = useState<Quality>(() => loadQuality());
  // ── فاز F5 — گزینه‌های نگاه (ماندگار) ──
  const [sens, setSens] = useState(() => loadPrefNum(SENS_KEY, SENS_DEF, SENS_MIN, SENS_MAX));
  const [fov, setFov] = useState(() => loadPrefNum(FOV_KEY, FOV_DEF, FOV_MIN, FOV_MAX));
  const [invertY, setInvertY] = useState(() => loadPrefBool(INVERT_KEY, false));
  // ── فاز F6 — نقشهٔ مأموریت (ماندگار) ──
  const [mapId, setMapId] = useState<MapId>(() => loadMapPref());
  // ── فاز F3 — تمام‌صفحه هنگام شروع مأموریت (Fullscreen API با فال‌بک webkit) ──
  const [isFs, setIsFs] = useState(false);
  const wantFsRef = useRef(false);

  // ── HUD حین بازی ──
  const [q, setQ] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  const [timeLeft, setTimeLeft] = useState(Q_TIME_SHOOT);
  // ── فاز F4 — خشاب و ریلود ──
  const [ammo, setAmmo] = useState(MAG_SIZE);
  const [reloading, setReloading] = useState(false);
  /** فاز G2-e — پیام باکس aria-live شِل (برخورد/خطا/توقف) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  // ── فاز F8 — موج‌بندی + هدف طلایی ──
  const [wave, setWave] = useState(1);
  const [goldenActive, setGoldenActive] = useState(false);
  const [goldenLeft, setGoldenLeft] = useState(0);
  const [goldenSpec, setGoldenSpec] = useState<GoldenSpec | null>(null);

  // ── فاز G2-e — موتور کمبو مشترک کیت (G1-09) ──
  // حالت bonus = دقیقاً قانون فعلی شوتر: gained = ۱۰ + min(کمبو−۱, ۶) × ۲ (امتیاز یکسان می‌ماند)
  const {
    combo,
    comboRef: comboCountRef,
    maxComboRef,
    registerCorrect,
    registerMiss,
    reset: resetCombo,
  } = useCombo({ mode: "bonus", base: SHOOT_BASE, bonusCap: COMBO_CAP, bonusStep: COMBO_STEP });

  // ── stateهای فاز done ──
  const [isRecord, setIsRecord] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [elapsed, setElapsed] = useState(0);

  // ── استخر داده ──
  const vocabAll = data.vocab.all;
  const quizSeed = data.quiz.seed;
  const wordPool = useMemo(
    () => (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson)),
    [vocabAll, lesson],
  );
  const quizPool = useMemo(
    () => (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson)),
    [quizSeed, lesson],
  );
  const wordLessons = data.vocab.lessons;
  const quizLessons = useMemo(
    () => [...new Set(quizSeed.map((s) => s.lesson))].sort((a, b) => a - b),
    [quizSeed],
  );
  const poolOk = mode === "word-hunt" ? wordPool.length >= MIN_POOL_WORD : quizPool.length >= MIN_POOL_QUIZ;
  const poolCount = mode === "word-hunt" ? wordPool.length : quizPool.length;

  // تشخیص دستگاه ضعیف — کاهش ذرات/antialias/dpr در کیفیت عادی
  const weak = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as Navigator & { deviceMemory?: number };
    return (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  }, []);
  const isCoarse = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // ── فاز G2-e — توقف/ادامهٔ استاندارد کیت + آینه‌ها و جمع زمان توقف (الگوی flappy) ──
  const pausedRef = useRef(false);
  /** مبدأ توقف جاری برای جبران دقیق مبدأ تایمر سؤال */
  const pauseStartRef = useRef(0);
  /** جمع زمان‌های توقف — مدت Attempt نباید توقف‌ها را حساب کند */
  const pausedAccumRef = useRef(0);

  // ── دنیای بازی — مالک: رویدادها و refs ──
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bridge = useRef<SceneBridge>({
    aim: { yaw: 0, pitch: 0 },
    pos: { x: 0, z: 0 },
    keys: new Set<string>(),
    moveMag: 0,
    stick: { x: 0, y: 0 },
    shoot: { x: 0, y: 0, seq: 0 },
    lastShotAt: 0,
    laneK: 1,
    flashes: [],
    onHit: () => {},
    dodge: false,
    wave: 1,
  });
  const meshRegistry = useRef<THREE.Mesh[]>([]);
  const burstApi = useRef<BurstApi | null>(null);
  const deckRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const deckIdxRef = useRef(0);
  const poolRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const distrRef = useRef<VocabEntry[]>([]);
  const modeRef = useRef<Mode>(mode);
  const qTimeRef = useRef(Q_TIME_SHOOT);
  const deadlineRef = useRef(0);
  const lockedRef = useRef(false);
  const overRef = useRef(false);
  const startedAtRef = useRef(0);
  const seqRef = useRef(0);
  const scoreRef = useRef(0);
  const heartsRef = useRef(HEARTS);
  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef<WrongItem[]>([]);
  const finishRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<() => void>(() => {});
  const advanceRef = useRef<() => void>(() => {});
  const voiceSpeedRef = useRef(speed);
  const tapRef = useRef(tapMode);
  const qualityRef = useRef<Quality>(quality);
  const qRef = useRef<Question | null>(null);
  // ── فاز F8 — مراجع موج (بدون ری‌رندر در مسیرهای داخل حلقهٔ بازی) ──
  const waveRef = useRef(1);
  const maxWaveRef = useRef(1);
  // ── فاز F5/F6 — مراجع گزینه‌ها/نقشه برای مسیرهای بدون ری‌رندر (ورودی نگاه + Attempt) ──
  const sensRef = useRef(sens);
  const invertRef = useRef(invertY);
  const mapIdRef = useRef<MapId>(mapId);
  // ── فاز F4 — مراجع خشاب/ریلود (چرخهٔ شلیک داخل effect فقط با ref — بدون dep churn) ──
  const ammoRef = useRef(MAG_SIZE);
  const reloadUntilRef = useRef(0);
  const reloadTimerRef = useRef<number | null>(null);
  const autoReloadTimerRef = useRef<number | null>(null);
  /** شلیک از رتیکل مرکز — دکمهٔ شلیک موبایل از این استفاده می‌کند (داخل effect مقدار می‌گیرد) */
  const shootAtRef = useRef<(x: number, y: number) => void>(() => {});
  /** ریلود دستی (R / دکمه) — latest-ref الگوی کیت */
  const reloadNowRef = useRef<() => void>(() => {});

  // ── فاز F4 — ریلود: صدای کلانک + پر شدن خشاب بعد از RELOAD_MS ──
  const triggerReload = useCallback(() => {
    if (overRef.current || ammoRef.current >= MAG_SIZE) return;
    if (reloadUntilRef.current > performance.now()) return; // در حال ریلود
    reloadUntilRef.current = performance.now() + RELOAD_MS;
    setReloading(true);
    playSound("reload");
    buzz("light");
    if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
    reloadTimerRef.current = window.setTimeout(() => {
      reloadTimerRef.current = null;
      reloadUntilRef.current = 0;
      ammoRef.current = MAG_SIZE;
      setAmmo(MAG_SIZE);
      setReloading(false);
    }, RELOAD_MS);
  }, []);
  useEffect(() => {
    reloadNowRef.current = triggerReload;
  }, [triggerReload]);
  // پاک‌سازی تایمرهای خشاب در unmount
  useEffect(
    () => () => {
      if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
      if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
    },
    [],
  );

  // ── فاز G2-e — زنجیرهٔ «فریز برخورد → سؤال بعد/پایان» مقاوم به توقف (الگوی دوئل G2-d) ──
  // به‌جای setTimeout خام: زمان سررسید با «ساعت جبران‌شده» نگه داشته می‌شود؛ حین توقف
  // تایمر کامل برچیده می‌شود و بعد از ادامه با همان زمان باقی‌مانده دوباره مسلح می‌شود.
  const chainTimerRef = useRef<number | null>(null);
  const chainPendingRef = useRef<{ due: number; fn: () => void } | null>(null);

  const clearTimers = useCallback(() => {
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
    chainPendingRef.current = null;
  }, []);

  const scheduleChain = useCallback(() => {
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
    const pend = chainPendingRef.current;
    if (!pend || pausedRef.current || overRef.current) return;
    chainTimerRef.current = window.setTimeout(() => {
      chainTimerRef.current = null;
      const cur = chainPendingRef.current;
      chainPendingRef.current = null;
      cur?.fn();
    }, Math.max(0, pend.due - performance.now()));
  }, []);

  /** زمان‌بندی داخل زنجیرهٔ مقاوم به توقف — جایگزین setTimeout خام الگوی قبلی */
  const later = useCallback(
    (fn: () => void, ms: number) => {
      chainPendingRef.current = { due: performance.now() + ms, fn };
      if (pausedRef.current) return; // حین توقف فقط ثبت می‌شود — ادامه با resume (scheduleChain)
      scheduleChain();
    },
    [scheduleChain],
  );

  // ── فاز F8 — زنجیرهٔ مستقل هدف طلایی (مقاوم به توقف — الگوی زنجیرهٔ اصلی؛ اسلات جدا تا
  // با «فریز برخورد → سؤال بعد» تداخل نکند) ──
  const goldenTimerRef = useRef<number | null>(null);
  const goldenPendingRef = useRef<{ due: number; fn: () => void } | null>(null);
  /** پنجرهٔ باز هدف طلایی — صفر = غیرفعال/مصرف‌شده */
  const goldenUntilRef = useRef(0);

  const scheduleGoldenChain = useCallback(() => {
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    const pend = goldenPendingRef.current;
    if (!pend || pausedRef.current || overRef.current) return;
    goldenTimerRef.current = window.setTimeout(() => {
      goldenTimerRef.current = null;
      const cur = goldenPendingRef.current;
      goldenPendingRef.current = null;
      cur?.fn();
    }, Math.max(0, pend.due - performance.now()));
  }, []);

  const goldenLater = useCallback(
    (fn: () => void, ms: number) => {
      goldenPendingRef.current = { due: performance.now() + ms, fn };
      if (pausedRef.current) return;
      scheduleGoldenChain();
    },
    [scheduleGoldenChain],
  );

  // فاز F8 — latest-ref برای فرار از وابستگی حلقوی spawn ↔ despawn
  const spawnGoldenRef = useRef<() => void>(() => {});
  const despawnGoldenRef = useRef<() => void>(() => {});

  // فاز F8 — ظهور هدف طلایی: ۳ ثانیه فرصت شکار +۲۰ امتیاز بونوس (خارج از چرخهٔ سؤال)
  const spawnGolden = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    const lane = LANE_X[Math.floor(Math.random() * LANE_X.length)];
    setGoldenSpec({ lane, y: 1.25 + Math.random() * 0.95, z: -(5.5 + Math.random() * 3.6) });
    goldenUntilRef.current = performance.now() + GOLDEN_WINDOW_MS;
    setGoldenActive(true);
    setGoldenLeft(3);
    playSound("golden");
    setLiveMsg(`هدف طلایی ظاهر شد! تا ۳ ثانیه شکارش کن — +${faNum(GOLDEN_BONUS)} امتیاز 🌟`);
    goldenLater(() => despawnGoldenRef.current(), GOLDEN_WINDOW_MS);
  }, [goldenLater]);

  // فاز F8 — پایان فرصت هدف طلایی (شکار نشد) + زمان‌بندی ظهور بعدی
  const despawnGolden = useCallback(() => {
    if (goldenUntilRef.current > 0 && performance.now() >= goldenUntilRef.current - 60) {
      goldenUntilRef.current = 0;
      setGoldenActive(false);
      setGoldenSpec(null);
    }
    if (!overRef.current) {
      goldenLater(
        () => spawnGoldenRef.current(),
        GOLDEN_EVERY_MIN + Math.floor(Math.random() * (GOLDEN_EVERY_MAX - GOLDEN_EVERY_MIN)),
      );
    }
  }, [goldenLater]);

  useEffect(() => {
    spawnGoldenRef.current = spawnGolden;
    despawnGoldenRef.current = despawnGolden;
  });

  // فاز G2-e — هوک توقف کیت: onChange → آینهٔ pausedRef (گارد ورودی‌ها) + فریز/احیای حلقهٔ
  // R3F با frameloop + جبران دو-نیمهٔ مبدأ تایمر سؤال + جمع زمان توقف برای duration Attempt.
  // auto-pause در تب مخفی از خود هوک می‌آید — در بازگشت اورلی «متوقف شد» دیده می‌شود.
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = performance.now();
      // قفل نشانگر حین توقف آزاد شود تا اورلی با موس قابل استفاده باشد
      if (document.pointerLockElement) document.exitPointerLock();
    } else if (pauseStartRef.current > 0) {
      // جبران دو-نیمهٔ امن (تعمیم الگوی G0-05/duel): مدت توقف به مبدأ تایمر سؤال و
      // سررسید زنجیرهٔ برخورد افزوده می‌شود و به جمع زمان توقف Attempt می‌رود.
      const gap = performance.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
      if (gap > 0) {
        pausedAccumRef.current += gap;
        if (phase === "playing" && !overRef.current) {
          deadlineRef.current += gap;
          if (chainPendingRef.current) chainPendingRef.current.due += gap;
          // فاز F8 — جبران هدف طلایی: پنجره و زمان‌بندی بعدی هم جابه‌جا شود
          if (goldenUntilRef.current > 0) goldenUntilRef.current += gap;
          if (goldenPendingRef.current) goldenPendingRef.current.due += gap;
        }
      }
    }
    // فریز/احیای زنجیرهٔ «فریز برخورد → سؤال بعد/پایان»
    scheduleChain();
    scheduleGoldenChain();
    if (phase === "playing" && !overRef.current) setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });

  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای گارد شلیک/کیبورد حین باز بودن دیالوگ نگهبان */
  const exitAskRef = useRef(false);
  const setExitAskSafe = useCallback((v: boolean) => {
    exitAskRef.current = v;
    setExitAsk(v);
  }, []);

  // الگوی دارباز/فلپی: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // فاز G2-e — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین صحنه (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    dropFullscreen(); // فاز F3 — دیالوگ portal-body در تمام‌صفحه دیده نمی‌شود؛ اول خارج شو
    if (phase === "playing") {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }, [openTutorial, pauseGame, phase]);
  const handleTutorialClose = useCallback(() => {
    closeTutorial();
    if (pausedForHelpRef.current) {
      pausedForHelpRef.current = false;
      resume();
    }
  }, [closeTutorial, resume]);
  const handleTutorialOpenChange = useCallback(
    (o: boolean) => {
      if (!o) handleTutorialClose();
    },
    [handleTutorialClose],
  );

  // فاز G2-e — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // الگوی latest-ref — effect بدون dep
  useEffect(() => {
    voiceSpeedRef.current = speed;
    tapRef.current = tapMode;
    qualityRef.current = quality;
    qRef.current = q;
    sensRef.current = sens;
    invertRef.current = invertY;
    mapIdRef.current = mapId;
  });

  // فاز G2-e — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
    },
    [],
  );

  // ── سؤال بعدی (reshuffle در اتمام استخر) ──
  const advanceImpl = useCallback(() => {
    if (overRef.current) return;
    const pool = poolRef.current;
    if (pool.length === 0) {
      finishRef.current();
      return;
    }
    if (deckIdxRef.current >= deckRef.current.length) {
      deckRef.current = shuffle(pool);
      deckIdxRef.current = 0;
    }
    const item = deckRef.current[deckIdxRef.current++] as VocabEntry | QuizQuestionSeed;
    // فاز G2-e — کیفیت سبک: ۳ هدف هم‌زمان به‌جای ۴
    const maxOthers = qualityRef.current === "low" ? DISTRACTORS_LOW : DISTRACTORS_HIGH;
    // فاز F8 — موج‌بندی: هر WAVE_SIZE پاسخ یک موج سخت‌تر (حرکت سریع‌تر + چیدمان عمیق‌تر)
    const w = Math.min(WAVE_MAX, Math.floor(totalRef.current / WAVE_SIZE) + 1);
    if (w !== waveRef.current) {
      waveRef.current = w;
      maxWaveRef.current = Math.max(maxWaveRef.current, w);
      setWave(w);
      bridge.current.wave = w;
      playSound("wave");
      setLiveMsg(`موج ${faNum(w)} شروع شد — هدف‌ها سریع‌تر شدند! ⚡`);
    }
    // فاز F8 — فرار هدف‌های غلط فقط در حالت شلیک (تپ ساده = دسترس‌پذیری بدون فرار)
    bridge.current.dodge = !tapRef.current;
    const next =
      modeRef.current === "word-hunt"
        ? buildWordQuestion(++seqRef.current, item as VocabEntry, distrRef.current, lesson, maxOthers, w)
        : buildGrammarQuestion(++seqRef.current, item as QuizQuestionSeed, lesson, maxOthers, w);
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    lockedRef.current = false;
    deadlineRef.current = performance.now() + qTimeRef.current * 1000;
    setQ(next);
    setTimeLeft(qTimeRef.current);
  }, [lesson]);
  useEffect(() => {
    advanceRef.current = advanceImpl;
  });

  const advance = useCallback(() => advanceRef.current(), []);

  // ── پایان دور — الگوی طلایی فاز ۳/۴ ──
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    clearTimers();
    // فاز F8 — هدف طلایی خاموش + زنجیرهٔ آن برچیده شود
    goldenUntilRef.current = 0;
    goldenPendingRef.current = null;
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    setGoldenActive(false);
    setGoldenSpec(null);
    stopSpeaking();
    const total = totalRef.current;
    const final = scoreRef.current;
    // فاز G2-e — مدت دور بدون احتساب جمع زمان‌های توقف (الگوی flappy)
    const took = Math.max(
      1,
      Math.round((performance.now() - startedAtRef.current - pausedAccumRef.current) / 1000),
    );
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G2-e — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: correctRef.current,
        duration: took,
        // فاز G2-e — detail افزودنی: quality (امضای AttemptPayload دست‌نخورده)
        // فاز F5/F6 — افزودنی: گزینه‌های نگاه + نقشهٔ مأموریت
        detail: {
          score: final,
          maxCombo: maxComboRef.current,
          mode: modeRef.current,
          tap: tapRef.current,
          quality: qualityRef.current,
          map: mapIdRef.current,
          sens: Math.round(sensRef.current * 100) / 100,
          invert: invertRef.current,
          wave: maxWaveRef.current,
        },
      });
    }
    const scope = scopeOf(modeRef.current, tapRef.current);
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    if (final > 0 && final > (prev?.score ?? 0)) {
      saveBest(activeBookId, GAME_KEY, scope, { score: final });
      setIsRecord(prev !== null);
      if (prev !== null) {
        // فاز G2-e — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(final)} امتیاز 🏆`);
      }
    } else {
      setIsRecord(false);
    }
    // فاز G2-e — بازخورد پایان دور: برد کامل (بی‌خطا) = win — الگوی دارباز؛ بقیه = finish
    if (total > 0 && correctRef.current === total) {
      playSound("win");
      buzz("success");
    } else {
      playSound("finish");
      buzz("success");
    }
    setFinalScore(final);
    setCorrectCount(correctRef.current);
    setWrongCount(total - correctRef.current);
    setWrongList([...wrongRef.current]);
    setElapsed(took);
    setPhase("done");
  }, [activeBookId, lesson, clearTimers, maxComboRef]);
  useEffect(() => {
    finishRef.current = finish;
  });

  // ── فاز G2-e — نگهبان خروج: انصراف حین صحنه ──
  // با هر پیشرفت، GameExitGuard (صحنه حین دیالوگ فریز شود)؛ پیش از اولین شلیک، خروج مستقیم.
  const handleExitClick = useCallback(() => {
    if (document.pointerLockElement) document.exitPointerLock();
    dropFullscreen(); // فاز F3 — دیالوگ خروج باید بیرون تمام‌صفحه دیده شود
    if (totalRef.current > 0 || scoreRef.current > 0) {
      pauseGame();
      setExitAskSafe(true);
    } else {
      overRef.current = true;
      clearTimers();
      stopSpeaking();
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setExitAskSafe(false);
      setPhase("setup");
    }
  }, [pauseGame, resume, setExitAskSafe, clearTimers]);

  // ── پاسخ به شلیک/تپ — فاز G2-e: بازخورد سه‌کاناله فقط در لحظهٔ رویداد برخورد ──
  const handleHit = useCallback(
    (id: string | null) => {
      if (overRef.current || id === null) return;
      if (pausedRef.current || exitAskRef.current) return;
      // فاز F8 — شکار هدف طلایی: بونوس خارج از چرخهٔ سؤال (نه پاسخ، نه قلب، نه جلو رفتن)
      if (id === "golden") {
        if (goldenUntilRef.current <= 0) return;
        goldenUntilRef.current = 0;
        setGoldenActive(false);
        setGoldenSpec(null);
        goldenPendingRef.current = null;
        if (goldenTimerRef.current !== null) {
          window.clearTimeout(goldenTimerRef.current);
          goldenTimerRef.current = null;
        }
        scoreRef.current += GOLDEN_BONUS;
        setScore(scoreRef.current);
        playSound("golden");
        buzz("success");
        setLiveMsg(`هدف طلایی شکار شد! +${faNum(GOLDEN_BONUS)} امتیاز 🌟`);
        goldenLater(
          () => spawnGoldenRef.current(),
          GOLDEN_EVERY_MIN + Math.floor(Math.random() * (GOLDEN_EVERY_MAX - GOLDEN_EVERY_MIN)),
        );
        return;
      }
      const cur = qRef.current;
      if (lockedRef.current || !cur) return;
      const target = cur.targets.find((t) => t.id === id);
      if (!target) return;
      // فاز F4 — صدای «تاک» برخورد گلوله به بدنهٔ هدف (قبل از زنگ درست/غلط)
      playSound("hit");
      const now = performance.now();
      if (target.correct) {
        // برخورد درست — امتیاز از موتور کمبو کیت (فرمول مو‌به‌مو: ۱۰ + min(کمبو−۱,۶)×۲)
        const gained = registerCorrect();
        scoreRef.current += gained;
        totalRef.current += 1;
        correctRef.current += 1;
        setScore(scoreRef.current);
        lockedRef.current = true;
        bridge.current.flashes = [{ id: target.id, kind: "ok", until: now + HIT_FREEZE_MS }];
        void speak(cur.speakText, { speed: voiceSpeedRef.current });
        // فاز G2-e — بازخورد سه‌کانالهٔ برخورد درست (لحظهٔ رویداد داخل حلقهٔ R3F، نه هر فریم)
        playSound("correct");
        buzz("success");
        setLiveMsg(`+${faNum(gained)} امتیاز — کمبو ×${faNum(comboCountRef.current)} 🔥`);
        later(() => advance(), HIT_FREEZE_MS);
      } else {
        // برخورد غلط — کمبو صفر (کیت)، یک ❤ کم، صف مرور
        registerMiss();
        totalRef.current += 1;
        wrongRef.current.push({ label: cur.srsKey, sub: cur.promptMain });
        seedReviewFromQuiz(cur.srsKey);
        heartsRef.current -= 1;
        setHearts(heartsRef.current);
        lockedRef.current = true;
        const good = cur.targets.find((t) => t.correct);
        bridge.current.flashes = [
          { id: target.id, kind: "bad", until: now + HIT_FREEZE_MS },
          ...(good ? [{ id: good.id, kind: "ok" as const, until: now + HIT_FREEZE_MS }] : []),
        ];
        // فاز G2-e — بازخورد سه‌کانالهٔ برخورد غلط
        playSound("wrong");
        buzz("error");
        setLiveMsg(`گزینهٔ غلط — پاسخ درست «${cur.srsKey}» بود — یک ❤ کم شد`);
        if (heartsRef.current <= 0) {
          later(() => finishRef.current(), HIT_FREEZE_MS);
        } else {
          later(() => advance(), HIT_FREEZE_MS);
        }
      }
    },
    [advance, later, registerCorrect, registerMiss, comboCountRef, goldenLater],
  );
  useEffect(() => {
    bridge.current.onHit = handleHit;
  });

  // ── پایان زمان سؤال — فاز G2-e: بازخورد سه‌کانالهٔ خطا ──
  const handleTimeout = useCallback(() => {
    const cur = qRef.current;
    if (overRef.current || lockedRef.current || !cur) return;
    registerMiss();
    totalRef.current += 1;
    wrongRef.current.push({ label: cur.srsKey, sub: cur.promptMain });
    seedReviewFromQuiz(cur.srsKey);
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    setTimeLeft(0);
    lockedRef.current = true;
    const good = cur.targets.find((t) => t.correct);
    bridge.current.flashes = good
      ? [{ id: good.id, kind: "ok", until: performance.now() + HIT_FREEZE_MS }]
      : [];
    playSound("wrong");
    buzz("error");
    setLiveMsg(`زمان تمام شد — پاسخ «${cur.srsKey}» بود — یک ❤ کم شد`);
    if (heartsRef.current <= 0) {
      later(() => finishRef.current(), HIT_FREEZE_MS);
    } else {
      later(() => advance(), HIT_FREEZE_MS);
    }
  }, [later, registerMiss]);
  useEffect(() => {
    timeoutRef.current = handleTimeout;
  });

  // ── تایمر سؤال — ۵ بار در ثانیه، فقط روی رویداد گسسته setState ──
  // فاز G2-e: حین توقف فریز است؛ مبدأ deadline بعد از ادامه با جبران دقیق gap جبران می‌شود.
  useEffect(() => {
    if (phase !== "playing") return;
    const iv = window.setInterval(() => {
      if (overRef.current) return;
      if (pausedRef.current) return; // فریز حین توقف — جبران در onChange ادامه
      // فاز F8 — شمارش معکوس فرصت هدف طلایی (روی رویداد گسسته — نه هر فریم)
      if (goldenUntilRef.current > 0) {
        setGoldenLeft(Math.max(0, Math.ceil((goldenUntilRef.current - performance.now()) / 1000)));
      }
      if (lockedRef.current) {
        deadlineRef.current += 200; // توقف زمان در فاصلهٔ بین سؤال‌ها
        return;
      }
      const left = Math.max(0, (deadlineRef.current - performance.now()) / 1000);
      setTimeLeft(Math.round(left * 10) / 10);
      if (left <= 0) timeoutRef.current();
    }, 200);
    return () => window.clearInterval(iv);
  }, [phase]);

  // ── ورودی: Pointer Lock دسکتاپ + درگ/تپ لمسی + کیبورد ۱..۴ ──
  // فاز G2-e: گارد pausedRef/exitAskRef روی همهٔ مسیرها + صدای شلیک فقط در رویداد شلیک.
  useEffect(() => {
    if (phase !== "playing") return;
    const el = wrapRef.current;
    if (!el) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // فاز F3 — فال‌بک webkit برای سافاری‌های قدیمی‌تر
    type FsEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
    /** تمام‌صفحه در همان ژست کاربر (الگوی استاندارد بازی‌های FPS وب) */
    const fsInGesture = () => {
      if (document.fullscreenElement) return;
      try {
        const p = el.requestFullscreen?.() ?? (el as FsEl).webkitRequestFullscreen?.();
        if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
      } catch {
        /* iOS iPhone عنصری fullscreen ندارد — بی‌صدا رد می‌شود */
      }
    };

    const ndcOf = (cx: number, cy: number): [number, number] => {
      const r = el.getBoundingClientRect();
      return [((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1];
    };
    const request = (x: number, y: number) => {
      // گارد «نه هر فریم»: شلیک فقط رویداد کاربر + cooldown؛ حین توقف/دیالوگ هم شلیک نیست
      if (pausedRef.current || exitAskRef.current || overRef.current) return;
      // فاز F4 — حین فریز برخورد شلیک حساب نمی‌شود (مهمات هدر نمی‌رود)
      if (lockedRef.current) return;
      const b = bridge.current;
      const now = performance.now();
      if (reloadUntilRef.current > now) return; // فاز F4 — حین ریلود شلیک نیست
      if (now - b.lastShotAt < SHOOT_COOLDOWN) return;
      if (ammoRef.current <= 0) {
        // فاز F4 — خشاب خالی: اولین تپ = ریلود (و ریلود خودکار هم قبلاً مسلح شده است)
        reloadNowRef.current();
        return;
      }
      ammoRef.current -= 1;
      setAmmo(ammoRef.current);
      if (ammoRef.current === 0) {
        // فاز F4 — آخرین فشنگ: ریلود خودکار پس از مکث کوتاه
        if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
        autoReloadTimerRef.current = window.setTimeout(() => {
          autoReloadTimerRef.current = null;
          reloadNowRef.current();
        }, 450);
      }
      b.lastShotAt = now;
      b.shoot = { x, y, seq: b.shoot.seq + 1 };
      // فاز G2-e — صدای شلیک (رویداد شلیک، با cooldown — اسپم ندارد)
      playSound("shoot");
    };

    let gest: { x0: number; y0: number; t0: number; moved: boolean; lx: number; ly: number; active: boolean } | null =
      null;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (pausedRef.current || exitAskRef.current || overRef.current || !t || !el.contains(t)) return;
      // فاز F3 — دکمه‌های HUD داخل صحنه (توقف/خروج تمام‌صفحه/ادامه) شلیک حساب نمی‌شوند
      if (t instanceof HTMLElement && t.closest("[data-fps-hud]")) return;
      if (!coarse && !tapRef.current) {
        if (document.pointerLockElement !== el) {
          // فاز F3 — اولین کلیک صحنه: تمام‌صفحه + قفل نشانگر با هم (در همان ژست)
          fsInGesture();
          try {
            const r = el.requestPointerLock() as unknown as Promise<void> | undefined;
            if (r && typeof r.catch === "function") r.catch(() => {});
          } catch {
            /* noop */
          }
          return;
        }
        request(0, 0);
        return;
      }
      // فاز F3 — لمسی: نخستین تماس صحنه تمام‌صفحه می‌کند (اندروید/کروم)
      fsInGesture();
      gest = { x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false, lx: e.clientX, ly: e.clientY, active: true };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (document.pointerLockElement === el) {
        const b = bridge.current;
        // فاز F5 — حساسیت نگاه + وارون‌سازی عمودی (از تنظیمات گزینه‌ها)
        const sn = sensRef.current;
        const iv = invertRef.current ? -1 : 1;
        b.aim.yaw -= e.movementX * 0.0026 * sn;
        b.aim.pitch = clamp(b.aim.pitch - e.movementY * 0.0024 * sn * iv, -0.6, 0.48);
        return;
      }
      if (!gest?.active) return;
      const dx = e.clientX - gest.lx;
      const dy = e.clientY - gest.ly;
      gest.lx = e.clientX;
      gest.ly = e.clientY;
      if (Math.hypot(e.clientX - gest.x0, e.clientY - gest.y0) > 12) gest.moved = true;
      if (gest.moved) {
        const b = bridge.current;
        // فاز F5 — حساسیت نگاه لمسی + وارون‌سازی عمودی
        const sn = sensRef.current;
        const iv = invertRef.current ? -1 : 1;
        b.aim.yaw -= dx * 0.005 * sn;
        b.aim.pitch = clamp(b.aim.pitch - dy * 0.0045 * sn * iv, -0.6, 0.48);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!gest?.active) return;
      const dt = performance.now() - gest.t0;
      const moved = gest.moved;
      gest.active = false;
      if (!moved && dt < 600) {
        const [x, y] = ndcOf(e.clientX, e.clientY);
        request(x, y);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (!tapRef.current) return;
      if (pausedRef.current || exitAskRef.current || overRef.current) return;
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, "۱": 0, "۲": 1, "۳": 2, "۴": 3 };
      const idx = map[e.key];
      if (idx === undefined) return;
      const cur = qRef.current;
      if (!cur || lockedRef.current) return;
      const ordered = [...cur.targets].sort((a, b) => a.lane - b.lane);
      const target = ordered[idx];
      if (target) bridge.current.onHit(target.id);
    };

    const onLockChange = () => setLocked(document.pointerLockElement === el);

    // فاز F4 — دکمهٔ شلیک موبایل از رتیکل مرکز می‌زند
    shootAtRef.current = request;
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      shootAtRef.current = () => {};
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerlockchange", onLockChange);
      if (document.pointerLockElement === el) document.exitPointerLock();
    };
  }, [phase]);

  // ── فاز F3/F4 — حرکت WASD/جهت‌نما (e.code = مستقل از چیدمان کیبورد فارسی/انگلیسی) + R = ریلود ──
  useEffect(() => {
    if (phase !== "playing") return;
    const keys = bridge.current.keys;
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.code === "KeyR") {
        if (!pausedRef.current && !exitAskRef.current) reloadNowRef.current();
        return;
      }
      const k = KEY_MOVE[e.code];
      if (!k) return;
      keys.add(k);
    };
    const up = (e: KeyboardEvent) => {
      const k = KEY_MOVE[e.code];
      if (k) keys.delete(k);
    };
    const clear = () => keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      keys.clear();
    };
  }, [phase]);

  // ── شروع دور ──
  const start = useCallback(() => {
    const pool: Array<VocabEntry | QuizQuestionSeed> =
      mode === "word-hunt"
        ? (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson))
        : (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson));
    if (pool.length < (mode === "word-hunt" ? MIN_POOL_WORD : MIN_POOL_QUIZ)) return;
    // فاز G2-e — بازخورد کلیک شروع دور (الگوی کیت) + فاز F3 — درخواست تمام‌صفحه با ژست کاربر
    playSound("click");
    buzz("light");
    wantFsRef.current = true;
    modeRef.current = mode;
    qTimeRef.current = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
    poolRef.current = pool;
    distrRef.current = vocabAll;
    deckRef.current = shuffle(pool);
    deckIdxRef.current = 0;
    seqRef.current = 0;
    scoreRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = [];
    overRef.current = false;
    lockedRef.current = false;
    startedAtRef.current = performance.now();
    // فاز G2-e — کمبوی تازه از موتور مشترک کیت + ریست وضعیت توقف
    resetCombo();
    pausedAccumRef.current = 0;
    pauseStartRef.current = 0;
    clearTimers();
    bridge.current.aim = { yaw: 0, pitch: 0 };
    bridge.current.pos = { x: 0, z: 0 };
    bridge.current.moveMag = 0;
    bridge.current.stick = { x: 0, y: 0 };
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    // فاز F4 — خشاب تازه در شروع دور + پاک‌سازی ریلود معلق
    if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
    if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
    reloadTimerRef.current = null;
    autoReloadTimerRef.current = null;
    reloadUntilRef.current = 0;
    ammoRef.current = MAG_SIZE;
    setAmmo(MAG_SIZE);
    setReloading(false);
    // فاز F8 — موج از نو + پاک‌سازی و برنامه‌ریزی هدف طلایی
    waveRef.current = 1;
    maxWaveRef.current = 1;
    setWave(1);
    bridge.current.wave = 1;
    bridge.current.dodge = !tapMode;
    goldenUntilRef.current = 0;
    goldenPendingRef.current = null;
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    setGoldenActive(false);
    setGoldenSpec(null);
    setGoldenLeft(0);
    goldenLater(() => spawnGoldenRef.current(), GOLDEN_FIRST_MS);
    setScore(0);
    setHearts(HEARTS);
    setQ(null);
    setLocked(false);
    setIsRecord(false);
    setLiveMsg("مأموریت شروع شد — به گزینهٔ درست شلیک کن!");
    setExitAskSafe(false);
    resume();
    // فاز G2-e — جلسهٔ تازهٔ تله‌متری: level = حالت (+تپ) : کیفیت — مثل «word-tap:low»
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${mode === "word-hunt" ? "word" : "grammar"}${tapMode ? "-tap" : ""}:${quality}`,
    });
    sessionRef.current.start();
    setPhase("playing");
    // سؤال اول پس از سوار شدن صحنه
    later(() => advanceRef.current(), 60);
  }, [mode, lesson, tapMode, quality, vocabAll, quizSeed, resetCombo, resume, setExitAskSafe, clearTimers, later, goldenLater]);

  // فاز F8 — پاک‌سازی تایمر زنجیرهٔ هدف طلایی در unmount (بعد از همهٔ محل‌های جهش)
  useEffect(
    () => () => {
      if (goldenTimerRef.current !== null) window.clearTimeout(goldenTimerRef.current);
    },
    [],
  );

  // ── فاز G2-e — انتخاب کیفیت گرافیک (ماندگار؛ کلید افزودنی) ──
  const setQualityPref = useCallback((q: Quality) => {
    playSound("click");
    buzz("light");
    setQuality(q);
    try {
      window.localStorage.setItem(QUALITY_KEY, q);
    } catch {
      /* noop */
    }
  }, []);

  // ── فاز F5 — تنظیم گزینه‌های نگاه (ماندگار؛ اسلایدر بدون صدا — هر تیک صدا ندارد) ──
  const setSensPref = useCallback((v: number) => {
    const c = clamp(v, SENS_MIN, SENS_MAX);
    setSens(c);
    savePref(SENS_KEY, String(Math.round(c * 100) / 100));
  }, []);
  const setFovPref = useCallback((v: number) => {
    const c = clamp(Math.round(v), FOV_MIN, FOV_MAX);
    setFov(c);
    savePref(FOV_KEY, String(c));
  }, []);
  const setInvertPref = useCallback(
    (v: boolean) => {
      playSound("click");
      buzz("light");
      setInvertY(v);
      savePref(INVERT_KEY, v ? "1" : "0");
    },
    [],
  );

  // ── فاز F6 — انتخاب نقشهٔ مأموریت (ماندگار؛ کلید افزودنی) ──
  const setMapPref = useCallback((id: MapId) => {
    playSound("click");
    buzz("light");
    setMapId(id);
    savePref(MAP_KEY, id);
  }, []);

  // کلیک چیپ‌های setup — بازخورد کیت (الگوی جای خالی)
  const chipFeedback = useCallback(() => {
    playSound("click");
    buzz("light");
  }, []);

  // ── فاز F3 — خروج دستی از تمام‌صفحه (دکمهٔ شناور داخل قاب) ──
  const exitFullscreen = useCallback(() => {
    dropFullscreen();
  }, []);

  // فاز F3 — درخواست تمام‌صفحه بلافاصله بعد از مونت صحنه (ژست کلیک شروع هنوز فعال است)
  useEffect(() => {
    if (phase !== "playing" || !wantFsRef.current) return;
    wantFsRef.current = false;
    const el = wrapRef.current;
    if (!el || document.fullscreenElement) return;
    try {
      type FsEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
      const p = el.requestFullscreen?.() ?? (el as FsEl).webkitRequestFullscreen?.();
      if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
    } catch {
      /* iOS iPhone عنصری fullscreen ندارد — بی‌صدا رد می‌شود */
    }
  }, [phase]);

  // فاز F3 — سینک وضعیت تمام‌صفحه (Esc کاربر) + پاک‌سازی امن هنگام unmount
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      try {
        if (document.fullscreenElement) void document.exitFullscreen();
      } catch {
        /* noop */
      }
    };
  }, []);

  // فاز F3 — پایان دور/بازگشت به تنظیمات = خروج از تمام‌صفحه
  useEffect(() => {
    if (phase !== "playing" && document.fullscreenElement) {
      try {
        void document.exitFullscreen();
      } catch {
        /* noop */
      }
    }
  }, [phase]);

  // ── رکوردهای شخصی هر دو اسکوپ ──
  const bestWord = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("word-hunt", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestGrammar = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("grammar-gate", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestVal = useMemo(() => {
    const raw = mode === "word-hunt" ? bestWord : bestGrammar;
    return raw ? (JSON.parse(raw) as BestRecord).score : null;
  }, [mode, bestWord, bestGrammar]);

  const chipCls = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Crosshair size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">شوتر آموزشی</h2>
                <p className="text-xs text-muted-foreground">میدان سه‌بعدی low-poly — به گزینهٔ درست شلیک کن!</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-emerald-500" />
              <p>
                سؤال بالای صفحه می‌آید و روی هر هدف متحرک یک گزینه نوشته شده — دقیقاً به <b>گزینهٔ درست</b> شلیک کن.
                شلیک درست = انفجار رنگین‌کمانی و امتیاز با کمبو؛ شلیک غلط یا پایان زمان = یک ❤ کم می‌شود. خطا رفتن
                (شلیک به خالی) جریمه ندارد! صحنه با «شروع مأموریت» تمام‌صفحه می‌شود و با WASD داخل میدان قدم می‌زنی —
                جعبه‌ها پوشش واقعی‌اند و از داخلشان رد نمی‌شوی. خشاب ۸تایی داری (R = ریلود)، سه نقشهٔ مأموریت داری
                (جنگل، کویر، شب)، حساسیت و زاویهٔ دید را در «گزینه‌ها» تنظیم می‌کنی و روی گوشی جوی‌استیک و دکمهٔ شلیک داری —
                دنبال گزینهٔ درست بگرد و بعد شلیک کن!
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">حالت بازی</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      key: "word-hunt" as const,
                      title: "شکار واژه",
                      desc: "معنی فارسی روی HUD؛ واژهٔ انگلیسی درست را بین اهداف شکار کن.",
                      icon: Star,
                    },
                    {
                      key: "grammar-gate" as const,
                      title: "سد گرامری",
                      desc: "جملهٔ ناقص سؤال‌ها؛ گزینهٔ درست را نشانه بگیر و شلیک کن.",
                      icon: Swords,
                    },
                  ] satisfies Array<{ key: Mode; title: string; desc: string; icon: typeof Star }>
                ).map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    aria-pressed={mode === m.key}
                    onClick={() => {
                      chipFeedback();
                      setMode(m.key);
                      setLesson(ALL_LESSONS);
                    }}
                    className={cn(
                      "min-h-11 rounded-2xl border p-3 text-right transition-all",
                      mode === m.key
                        ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                        : "hover:border-primary/30 hover:bg-muted/50",
                    )}
                  >
                    <span className="flex items-center gap-2 text-[13px] font-black">
                      <m.icon size={16} className={mode === m.key ? "text-primary" : "text-muted-foreground"} />
                      {m.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* فاز F6 — نقشهٔ مأموریت: سه پالت کامل میدان */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
                <MapPinned size={14} className="text-emerald-500" />
                نقشهٔ مأموریت
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {(Object.values(MAPS) as MapConfig[]).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={mapId === m.id}
                    onClick={() => setMapPref(m.id)}
                    className={cn(
                      "min-h-11 rounded-2xl border p-2.5 text-right transition-all",
                      mapId === m.id
                        ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                        : "hover:border-primary/30 hover:bg-muted/50",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("mb-2 block h-12 w-full rounded-xl border border-black/10 shadow-inner", m.swatch)}
                    />
                    <span className="flex items-center gap-1.5 text-[12px] font-black">
                      {m.id === "forest" ? (
                        <Trees size={13} className="text-emerald-500" />
                      ) : m.id === "desert" ? (
                        <Sun size={13} className="text-amber-500" />
                      ) : (
                        <MoonStar size={13} className="text-teal-300" />
                      )}
                      {m.name}
                    </span>
                    <span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{m.desc}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                انتخابت برای دفعات بعد ذخیره می‌شود — در «سکوت شب» هدف‌ها درخشان‌ترند تا در تاریکی خوانا بمانند.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
                <button
                  type="button"
                  aria-pressed={lesson === ALL_LESSONS}
                  onClick={() => {
                    chipFeedback();
                    setLesson(ALL_LESSONS);
                  }}
                  className={chipCls(lesson === ALL_LESSONS)}
                >
                  کل کتاب ({faNum(poolCount)} {mode === "word-hunt" ? "واژه" : "سؤال"})
                </button>
                {mode === "word-hunt"
                  ? wordLessons.map((l) => (
                      <button
                        key={l.lesson}
                        type="button"
                        aria-pressed={lesson === l.lesson}
                        onClick={() => {
                          chipFeedback();
                          setLesson(l.lesson);
                        }}
                        className={chipCls(lesson === l.lesson)}
                      >
                        {l.label} ({faNum(vocabAll.filter((w) => w.lesson === l.lesson).length)})
                      </button>
                    ))
                  : quizLessons.map((l) => (
                      <button
                        key={l}
                        type="button"
                        aria-pressed={lesson === l}
                        onClick={() => {
                          chipFeedback();
                          setLesson(l);
                        }}
                        className={chipCls(lesson === l)}
                      >
                        {lessonLabel(l)} ({faNum(quizSeed.filter((s) => s.lesson === l).length)})
                      </button>
                    ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">سبک کنترل</p>
              <button
                type="button"
                aria-pressed={tapMode}
                onClick={() => {
                  chipFeedback();
                  setTapMode((v) => !v);
                }}
                className={chipCls(tapMode)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <MousePointerClick size={14} />
                  تپ ساده (بدون شلیک) {tapMode ? "— فعال" : ""}
                </span>
              </button>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                {tapMode ? (
                  <>تپ روی هدف کافی است؛ روی دسکتاپ هم کلیک روی هدف می‌زند و کلیدهای ۱ تا ۴ هدف را انتخاب می‌کنند.</>
                ) : (
                  <>دسکتاپ: کلیک قفلِ نشانگر، حرکت موس نشانه‌گیری، کلیک بعدی شلیک — موبایل: کشیدن نگاه، تپ روی هدف شلیک.</>
                )}
              </p>
            </div>

            {/* فاز G2-e — تنظیم کیفیت گرافیک */}
            <div>
              <p className="mb-2 text-[13px] font-bold">کیفیت گرافیک</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب کیفیت گرافیک">
                <button
                  type="button"
                  aria-pressed={quality === "high"}
                  onClick={() => setQualityPref("high")}
                  className={chipCls(quality === "high")}
                >
                  کیفیت عادی
                </button>
                <button
                  type="button"
                  aria-pressed={quality === "low"}
                  onClick={() => setQualityPref("low")}
                  className={chipCls(quality === "low")}
                >
                  کیفیت سبک (گوشی)
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                {quality === "low"
                  ? "کیفیت سبک: رزولوشن کمتر، بدون antialias، ذرات و اجسام تزئینی کمتر و ۳ هدف هم‌زمان به‌جای ۴ — روی گوشی‌های ضعیف روان‌تر است."
                  : "کیفیت عادی: کامل‌ترین نمای صحنه (رفتار همیشگی بازی). انتخابت برای دفعات بعد ذخیره می‌شود."}
              </p>
            </div>

            {/* فاز F5 — گزینه‌های نگاه: حساسیت، FOV و وارون‌سازی عمودی */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
                <SlidersHorizontal size={14} className="text-emerald-500" />
                گزینه‌ها
              </p>
              <div className="space-y-4 rounded-2xl border p-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span id="fps-sens-label" className="text-[12px] font-bold">
                      حساسیت نگاه
                    </span>
                    <Badge variant="secondary" className="text-[11px]">
                      {faNum(Math.round(sens * 100))}٪
                    </Badge>
                  </div>
                  <Slider
                    aria-labelledby="fps-sens-label"
                    min={SENS_MIN * 100}
                    max={SENS_MAX * 100}
                    step={5}
                    value={[Math.round(sens * 100)]}
                    onValueChange={(v) => setSensPref((v[0] ?? SENS_DEF * 100) / 100)}
                  />
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                    سرعت چرخش با موس و کشیدن لمسی — پیش‌فرض ۱۰۰٪.
                  </p>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span id="fps-fov-label" className="text-[12px] font-bold">
                      زاویهٔ دید (FOV)
                    </span>
                    <Badge variant="secondary" className="text-[11px]">
                      {faNum(fov)}°
                    </Badge>
                  </div>
                  <Slider
                    aria-labelledby="fps-fov-label"
                    min={FOV_MIN}
                    max={FOV_MAX}
                    step={2}
                    value={[fov]}
                    onValueChange={(v) => setFovPref(v[0] ?? FOV_DEF)}
                  />
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                    عدد بالاتر = دید بازتر در میدان — حین بازی هم زنده اعمال می‌شود.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-bold">وارون‌سازی عمودی</p>
                    <p className="text-[10px] leading-4 text-muted-foreground">
                      عادت بازیکنان کنسول — بالا کشیدن، نگاه به پایین.
                    </p>
                  </div>
                  <Switch checked={invertY} onCheckedChange={setInvertPref} aria-label="وارون‌سازی عمودی نگاه" />
                </div>
              </div>
            </div>

            {!poolOk && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-[11px] leading-5 text-destructive">
                {mode === "word-hunt"
                  ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_WORD)} واژه لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
                  : `برای این انتخاب دست‌کم ${faNum(MIN_POOL_QUIZ)} سؤال لازم است — محدودهٔ دیگری را انتخاب کن.`}
              </div>
            )}

            {/* فاز F8 — هدف‌های هوشمند: فرار، موج، طلایی */}
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Zap size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                میدان هوشمند شد: <b>هدف‌های غلط</b> وقتی نشانه را رویشان نگه داری به کناره‌ها فرار می‌کنند — از زاویهٔ دیگر
                نزدیک شو! هر <b>۵ پاسخ</b> یک موج سخت‌تر با هدف‌های سریع‌تر شروع می‌شود (تا موج ۶) و هر از گاهی
                <b>هدف طلایی</b> ۳ثانیه‌ای ظاهر می‌شود: شکارش ۲۰ امتیاز بونوس دارد و قلب نمی‌سوزاند.
              </p>
            </div>

            {bestVal !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                بهترین امتیاز ({modeName(mode)}{tapMode ? " · تپ ساده" : ""}): {faNum(bestVal)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" disabled={!poolOk} onClick={start}>
              <Play size={18} />
              شروع مأموریت
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-e — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-e: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    // ستاره‌بندی per-game این بازی (طبق تسک): دقت ≥۹۰ → ۳ / ≥۷۰ → ۲ / بقیه ۱
    const shots = correctCount + wrongCount;
    const acc = shots > 0 ? Math.round((correctCount / shots) * 100) : 0;
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1;
    return (
      <ResultScreen
        title="مأموریت تمام شد!"
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongList.length}
        reviewItems={wrongList.map((w) => ({ front: w.label, back: w.sub ?? "" }))}
        stats={[
          {
            label: "امتیاز",
            value: faNum(finalScore),
            icon: <Star size={16} className="text-amber-500" />,
          },
          {
            label: "دقت",
            value: `${faNum(acc)}٪`,
            icon: <TargetIcon size={16} className="text-emerald-500" />,
          },
          {
            label: "زمان",
            value: fmtTime(elapsed),
            icon: <Timer size={16} className="text-teal-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing — فاز G2-e: شِل استاندارد کیت + فریز حلقهٔ R3F حین توقف ──
  const qTime = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
  const timePct = Math.max(0, Math.min(100, (timeLeft / qTime) * 100));
  const qualityLow = quality === "low";
  // فاز F6 — پالت نقشهٔ فعال + فاز F7 — ترتیب بودجهٔ عناصر محیطی
  const activeMap = MAPS[mapId];
  const envTier: 0 | 1 | 2 = qualityLow ? 0 : weak ? 1 : 2;
  return (
    <>
      <GameShell
        title="شوتر آموزشی"
        icon={<Crosshair size={18} />}
        stats={
          <>
            <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
              <Star size={13} className="text-amber-500" />
              {faNum(score)}
            </Badge>
            {combo >= 2 ? (
              <Badge
                key={combo}
                variant="outline"
                className={cn(
                  "gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400",
                  // فاز G2-e — افکت بصری واحد بج کمبو (کیت) + pulse ساده با گارد reduced-motion
                  COMBO_FIRE_CLASS,
                  "animate-pulse motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(combo)}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Zap size={12} />
                کمبو ×۱
              </Badge>
            )}
            {/* فاز F4 — شمارندهٔ خشاب در هدر شِل (بیرون قاب — در تمام‌صفحه چیپ داخل قاب دیده می‌شود) */}
            {/* فاز F8 — شمارهٔ موج جاری */}
            <Badge
              variant="outline"
              className="gap-1 border-teal-500/40 px-2 py-1 text-[11px] font-black text-teal-600 dark:text-teal-400"
            >
              <Zap size={11} />
              موج {faNum(wave)}
            </Badge>
            {!tapMode && (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px]">
                {reloading ? (
                  <>
                    <RotateCcw size={12} className="animate-spin motion-reduce:animate-none" />
                    ریلود…
                  </>
                ) : (
                  <>
                    <Crosshair size={12} className={ammo <= 2 ? "text-red-500" : "text-amber-500"} />
                    {faNum(ammo)}/{faNum(MAG_SIZE)}
                  </>
                )}
              </Badge>
            )}
            <span
              role="img"
              aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`}
              className="flex items-center gap-1"
            >
              {Array.from({ length: HEARTS }, (_, i) => (
                <Heart
                  key={i}
                  size={15}
                  fill={i < hearts ? "currentColor" : "none"}
                  className={i < hearts ? "text-destructive" : "text-muted-foreground/35"}
                />
              ))}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground">
              ⏱ {faNum(Math.ceil(timeLeft))} ثانیه
            </span>
          </>
        }
        liveMsg={liveMsg}
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
        exitLabel="پایان دور"
      >
        <div className="relative">
          <div
            ref={wrapRef}
            role="group"
            aria-label={`میدان سه‌بعدی شوتر آموزشی — نقشهٔ ${activeMap.name}`}
            className={cn(
              "relative touch-none overflow-hidden border shadow-lg",
              // فاز F3 — تمام‌صفحه: بدون گوشهٔ گرد و ارتفاع کامل صفحه
              isFs ? "h-screen w-screen max-h-none rounded-none" : "h-[60vh] max-h-[580px] min-h-[400px] rounded-2xl",
            )}
            // فاز F6 — بدنهٔ قاب هم‌رنگ نقشه (قبل از بوت WebGL هم درست دیده می‌شود)
            style={{ backgroundColor: activeMap.bg }}
          >
            <Canvas
              // فاز G2-e — فریز واقعی حلقهٔ R3F حین توقف: frameloop "never" معادل
              // cancelAnimationFrame و بازگشت به "always" معادل resumeLoop الگوی flappy است.
              frameloop={paused ? "never" : "always"}
              // فاز G2-e — کیفیت سبک: dpr پایین‌تر؛ عادی: رفتار فعلی (با ملاحظهٔ دستگاه ضعیف)
              dpr={qualityLow ? [0.7, 1] : weak ? [1, 1] : [1, 1.75]}
              camera={{ fov: FOV_DEF, near: 0.1, far: 60, position: [0, 1.7, 7] }}
              gl={{ antialias: qualityLow ? false : !weak, powerPreference: "high-performance" }}
              // سایه‌ها در هر دو کیفیت off — سبک همیشه و عادی همان رفتار فعلی صحنه (سقف draw-call)
              shadows={false}
            >
              {/* فاز F5 — زاویهٔ دید زنده از گزینه‌ها */}
              <FovTune fov={fov} />
              <Rig bridge={bridge} />
              <Arena map={activeMap} deco={qualityLow ? DECO_LOW : weak ? 8 : 14} tier={envTier} />
              {q?.targets.map((t) => (
                <Target key={`q${q.seq}-${t.id}`} spec={t} registry={meshRegistry} bridge={bridge} />
              ))}
              {/* فاز F8 — هدف طلایی بونوس */}
              {goldenActive && goldenSpec && (
                <GoldenTarget spec={goldenSpec} untilRef={goldenUntilRef} registry={meshRegistry} bridge={bridge} />
              )}
              <Burst apiRef={burstApi} count={qualityLow ? BURST_LOW : weak ? BURST_WEAK : BURST_FULL} />
              <World bridge={bridge} registry={meshRegistry} burstApi={burstApi} />
              {/* فاز F3 — تفنگ سه‌بعدی ویومدل چسبیده به دوربین */}
              <ViewModel bridge={bridge} />
            </Canvas>

            {/* فاز F3 — نوار وضعیت فشرده حین تمام‌صفحه (هدر شِل بیرون قاب است) */}
            {isFs && (
              <div className="pointer-events-none absolute start-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur">
                <Star size={13} className="text-amber-400" />
                {faNum(score)}
                {combo >= 2 && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Flame size={12} />
                    ×{faNum(combo)}
                  </span>
                )}
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span role="img" aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`} className="flex items-center gap-0.5">
                  {Array.from({ length: HEARTS }, (_, i) => (
                    <Heart
                      key={i}
                      size={12}
                      fill={i < hearts ? "currentColor" : "none"}
                      className={i < hearts ? "text-red-400" : "text-white/35"}
                    />
                  ))}
                </span>
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span>⏱ {faNum(Math.ceil(timeLeft))}</span>
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span className="text-teal-300">موج {faNum(wave)}</span>
                {goldenActive && <span className="text-amber-300">★ {faNum(goldenLeft)}</span>}
              </div>
            )}

            {/* فاز F3 — کنترل‌های شناور حین تمام‌صفحه (هدر شِل در دسترس نیست) */}
            {isFs && (
              <div data-fps-hud className="absolute end-3 top-3 z-20 flex gap-2">
                <button
                  type="button"
                  onClick={togglePause}
                  aria-label={paused ? "ادامهٔ بازی" : "توقف بازی"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                >
                  {paused ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <button
                  type="button"
                  onClick={exitFullscreen}
                  aria-label="خروج از تمام‌صفحه"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                >
                  <Minimize2 size={15} />
                </button>
              </div>
            )}

            {/* فاز F4 — کنترل‌های لمسی موبایل: جوی‌استیک چپ + دکمهٔ شلیک راست (خارج از تپ ساده) */}
            {!tapMode && isCoarse && (
              <>
                <TouchJoystick bridge={bridge} />
                <button
                  type="button"
                  data-fps-hud
                  aria-label={reloading ? "در حال ریلود خشاب" : `شلیک از رتیکل — ${faNum(ammo)} فشنگ مانده`}
                  onPointerDown={() => shootAtRef.current(0, 0)}
                  className={cn(
                    "pointer-events-auto absolute bottom-5 right-4 z-20 flex h-20 w-20 touch-none select-none flex-col items-center justify-center gap-0.5 rounded-full border-2 backdrop-blur transition active:scale-95",
                    reloading
                      ? "border-amber-300/60 bg-black/55 text-amber-200"
                      : "border-white/30 bg-black/40 text-white",
                  )}
                >
                  {reloading ? (
                    <RotateCcw size={24} className="animate-spin motion-reduce:animate-none" />
                  ) : (
                    <Crosshair size={26} />
                  )}
                  <span className="text-[10px] font-black" aria-hidden>
                    {reloading ? "ریلود…" : `${faNum(ammo)} / ${faNum(MAG_SIZE)}`}
                  </span>
                </button>
              </>
            )}

            {/* فاز F4 — شمارندهٔ مهمات دسکتاپ (گوشهٔ پایین) */}
            {!tapMode && !isCoarse && (
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-black text-white backdrop-blur"
              >
                {reloading ? (
                  <>
                    <RotateCcw size={12} className="animate-spin motion-reduce:animate-none" />
                    ریلود…
                  </>
                ) : (
                  <>
                    <Crosshair size={12} className={ammo <= 2 ? "text-red-300" : "text-amber-300"} />
                    {faNum(ammo)} / {faNum(MAG_SIZE)}
                  </>
                )}
              </div>
            )}

            {/* سؤال — HUD بالای میدان */}
            {q && (
              <div className={cn("pointer-events-none absolute inset-x-3 z-10", isFs ? "top-16" : "top-3")}>
                <div className="mx-auto max-w-lg rounded-2xl border bg-background/85 p-3 text-center shadow-lg backdrop-blur">
                  <p className="text-[10px] font-bold text-muted-foreground">{q.promptFa}</p>
                  <p
                    dir={q.ltr ? "ltr" : "rtl"}
                    className={cn(
                      "mt-1 font-black leading-6",
                      q.ltr ? "font-en text-[15px]" : "text-[17px]",
                    )}
                  >
                    {q.promptMain}
                  </p>
                  {q.promptSub && <p className="mt-0.5 text-[10px] text-muted-foreground">{q.promptSub}</p>}
                  {/* نوار زمان */}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-200",
                        timePct > 50 ? "bg-emerald-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500",
                      )}
                      style={{ width: `${timePct}%` }}
                    />
                  </div>
                  {/* فاز F8 — شمارندهٔ فرصت هدف طلایی */}
                  {goldenActive && (
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500/15 px-3 py-1 text-[11px] font-black text-amber-600 dark:text-amber-400">
                      <Sparkles size={12} className="text-amber-500" />
                      هدف طلایی! +{faNum(GOLDEN_BONUS)} — {faNum(goldenLeft)} ثانیه
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* رتیکل — فقط در حالت شلیک دسکتاپ/لمس‌ندار */}
            {!tapMode && (
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute start-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-opacity",
                  locked ? "opacity-100" : isCoarse ? "opacity-0" : "opacity-60",
                )}
              >
                <span className="relative block h-7 w-7">
                  <span className="absolute inset-0 rounded-full border-2 border-white/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="absolute start-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
                </span>
              </div>
            )}

            {/* راهنمای کنترل */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center">
              <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] text-white/90 backdrop-blur">
                {tapMode
                  ? isCoarse
                    ? "تپ روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
                    : "کلیک روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
                  : isCoarse
                    ? "جوی‌استیک چپ = حرکت · کشیدن صحنه = نگاه · دکمهٔ راست یا تپ روی هدف = شلیک"
                    : locked
                      ? "حرکت موس = نشانه‌گیری · WASD = حرکت · کلیک = شلیک · R = ریلود"
                      : "کلیک در صحنه = نشانه‌گیری + تمام‌صفحه"}
              </span>
            </div>

            {/* فاز G2-e/F3 — اورلی توقف داخل قاب (در تمام‌صفحه هم دیده می‌شود؛ صحنهٔ فریز پشت آن) */}
            {paused && (
              <>
                <div aria-hidden className="absolute inset-0 z-20 bg-background/70 backdrop-blur-sm" />
                <div data-fps-hud className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 overflow-y-auto p-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Pause size={26} />
                  </span>
                  <p className="text-sm font-black">بازی متوقف شد</p>
                  <Button onClick={resume} className="h-11 gap-2">
                    <Play size={16} />
                    ادامهٔ بازی
                  </Button>
                  {/* فاز F5 — تنظیمات سریع حین توقف: بدون خروج از دور */}
                  <div className="w-full max-w-xs rounded-2xl border bg-background/90 p-3.5 shadow-lg backdrop-blur">
                    <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-black">
                      <SlidersHorizontal size={13} className="text-emerald-500" />
                      تنظیمات سریع نگاه
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="font-bold">حساسیت نگاه</span>
                          <span className="text-muted-foreground">{faNum(Math.round(sens * 100))}٪</span>
                        </div>
                        <Slider
                          min={SENS_MIN * 100}
                          max={SENS_MAX * 100}
                          step={5}
                          value={[Math.round(sens * 100)]}
                          onValueChange={(v) => setSensPref((v[0] ?? SENS_DEF * 100) / 100)}
                          aria-label="حساسیت نگاه"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold">وارون‌سازی عمودی</span>
                        <Switch checked={invertY} onCheckedChange={setInvertPref} aria-label="وارون‌سازی عمودی نگاه" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] leading-5 text-muted-foreground">
          شلیک درست +{faNum(SHOOT_BASE)} امتیاز و هر حلقهٔ کمبو +{faNum(COMBO_STEP)}تا سقف ×{faNum(COMBO_CAP + 1)} —
          پاسخ‌های غلط به صف «مرور هوشمند» هم می‌روند.
        </p>
      </GameShell>
      {/* فاز G2-e — راهنمای دکمهٔ شِل (حین صحنه با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
      {/* فاز G2-e — نگهبان خروج استاندارد کیت (حین دور با پیشرفت) */}
      <GameExitGuard
        open={exitAsk}
        onOpenChange={(o) => {
          setExitAskSafe(o);
          // انصراف از خروج (Esc/کلیک بیرون/«نه») → صحنه از همان‌جا ادامه یابد
          if (!o) resume();
        }}
        onConfirm={() => {
          // فاز G2-e — رهاکردن دور نیمه‌کاره + تله‌متری
          sessionRef.current?.abandon("exit");
          stopSpeaking();
          overRef.current = true;
          clearTimers();
          setExitAskSafe(false);
          resume();
          setPhase("setup");
        }}
      />
    </>
  );
}
