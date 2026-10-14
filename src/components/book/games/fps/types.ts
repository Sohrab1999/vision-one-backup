"use client";

import type * as THREE from "three";
import type { MapLayout } from "./layouts";

export type Phase = "setup" | "playing" | "done";
/** فاز F10-a — حالت سوم «شنیداری»: سؤال با پخش صوتی مطرح می‌شود، نه متن */
/** فاز F10-ب — حالت چهارم «جملهٔ زنجیره‌ای»: شکار ۳ واژه به ترتیب برای کامل کردن جملهٔ واقعی مکالمه */
export type Mode = "word-hunt" | "grammar-gate" | "listening-hunt" | "sentence-chain";

/** فاز F10-ب — توالی جملهٔ زنجیره (از خط مکالمهٔ واقعی جزوه — بدون دادهٔ ساختگی) */
export interface QuestionSequence {
  /** سه واژهٔ هدف به ترتیبِ جمله */
  words: string[];
  /** جملهٔ کامل اصلی (انگلیسی) — برای تقویت شنیداری پس از کامل شدن زنجیره */
  en: string;
  /** ترجمهٔ فارسی خط مکالمه */
  fa: string;
  /** منبع نمایشی — مثل «مکالمه درس دوم — صفحه ۴۷» */
  source: string;
}

/** پیکربندی یک هدف متحرک */
export interface TargetSpec {
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

export interface Question {
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
  /** کلید SRS (واژهٔ انگلیسی درست) — در حالت زنجیره عمداً خالی است (گارد مسیر SRS در index) */
  srsKey: string;
  lesson: number;
  /** فاز F10-ب — فقط در حالت sentence-chain: توالی سه واژهٔ زنجیره */
  sequence?: QuestionSequence;
}

export interface WrongItem {
  label: string;
  sub?: string;
}

export interface FlashEntry {
  id: string;
  kind: "ok" | "bad";
  until: number;
}

export interface SceneBridge {
  aim: { yaw: number; pitch: number };
  /** فاز F3 — آفست موقعیت بازیکن نسبت به پایه (متر) */
  pos: { x: number; z: number };
  /** فاز F3 — کلیدهای حرکت فشرده‌شده (w/a/s/d + فاز F10: c خم‌شدن) */
  keys: Set<string>;
  /** فاز F3 — در حال گام برداشتن؟ (برای باب سلاح) — فاز F4: بزرگی آنالوگ ۰..۱ */
  moveMag: number;
  /** فاز F4 — بردار آنالوگ جوی‌استیک لمسی (x = راست، y = جلو؛ −۱..۱) */
  stick: { x: number; y: number };
  /** فاز F10 — سرعت هموارشدهٔ افقی (متر بر ثانیه) — ضدلرزش حرکت */
  vel: { x: number; z: number };
  /** فاز F10 — پرش: سرعت عمودی + ارتفاع لحظه‌ای از زمین */
  vy: number;
  jumpY: number;
  /** فاز F10 — درخواست پرش صف‌شده (اسپیس/دکمهٔ موبایل) */
  wantJump: boolean;
  /** فاز F10 — خم‌شدن هموارشدهٔ ۰..۱ */
  crouchAmt: number;
  /** فاز F10 — دویدن فعال (نگه‌داشتن Shift) */
  sprint: boolean;
  /** فاز F10 — کیک FOV هموارشدهٔ دویدن (نوشتهٔ Rig، خواندهٔ FovTune) */
  speedKick: number;
  /** فاز F10 — چیدمان نقشهٔ جاری (برخورد + محدودهٔ حرکت) */
  layout: MapLayout;
  /** فاز F9 — پیلود شلیک: پخش پمپ + مقیاس انفجار سلاح */
  shoot: { x: number; y: number; seq: number; spread: number; burst: number };
  lastShotAt: number;
  laneK: number;
  flashes: FlashEntry[];
  /** فاز F9 — میزان زوم اسکوپ ۰..۱ (نوشتهٔ FovTune، خواندهٔ ViewModel) */
  scopeAmt: number;
  /** فاز F9 — سررسید ریلود جاری (۰ = بی‌ریلود) — انیمیشن ویومدل */
  reloadUntil: number;
  onHit: (id: string | null) => void;
  /** فاز F9 — گزارش والی پمپ: همهٔ برخوردها یکجا؛ تصمیم در handleVolley */
  onVolley?: (ids: Array<string | null>) => void;
  /** فاز F8 — فرار هدف‌های غلط فعال؟ (خاموش در «تپ ساده») */
  dodge: boolean;
  /** فاز F8 — شمارهٔ موج جاری (سرعت فرار و حرکت اهداف) */
  wave: number;
  /** فاز U1/U2 — فاز FSM پهپاد تعقیب‌گر (نوشتهٔ scene/drone در useFrame، خواندهٔ index هر ۲۰۰ms) — idle = پهپاد خاموش؛ charge = شارژ پرتاب قفس */
  enemyPhase: "idle" | "patrol" | "charge" | "stalk" | "flee";
  /** فاز U2 — ثانیه تا برخورد قفس واژه (نوشتهٔ scene/cage هر فریم؛ ۰ = قفسی در پرواز نیست) */
  cageEta: number;
  /** فاز U2 — پرچم یک‌بارمصرف «قفس به بازیکن خورد» (نوشتهٔ scene/cage، مصرف+پاک‌سازی index در interval) */
  cageHit: boolean;
  /** فاز U2 — پرچم یک‌بارمصرف «قفس خطا رفت» (همان الگوی cageHit — بدون جریمه) */
  cageWhiff: boolean;
  /** فاز U3 — بازیکن در پناهگاه است و پهپاد او را نمی‌بیند (نوشتهٔ scene/drone هر فریم، خواندهٔ index با debounce ۴۰۰ms) */
  enemyHidden: boolean;
  /** فاز U3 — پرچم یک‌بارمصرف «پهپاد رد تو را گم کرد» (نوشتهٔ scene/drone، مصرف+پاک‌سازی index در interval) */
  enemyLost: boolean;
  /** فاز U4 — فاز رئیس واژه (نوشتهٔ index روی رویداد گسسته؛ خواندهٔ scene/boss هر فریم — fight حین نبرد، down = فروپاشی نهایی) */
  bossPhase: "idle" | "fight" | "down";
  /** فاز U5 — آخرین موقعیت جهان پهپاد (نوشتهٔ scene/drone هر فریم — خواندهٔ index لحظهٔ رویداد صوتی میدان برای پن استریو) */
  enemyPos: { x: number; z: number };
  /** فاز U5 — آخرین موقعیت جهان قفس (نوشتهٔ scene/cage: نقطهٔ پرتاب هنگام مصرف صف + موقعیت هر فریم در پرواز) */
  cagePos: { x: number; z: number };
  /** فاز U5 — آخرین موقعیت جهان رئیس (نوشتهٔ scene/boss هر فریم — پن رویدادهای شکستن سپر/فروپاشی) */
  bossPos: { x: number; z: number };
}

export interface BurstApi {
  fire: (origin: THREE.Vector3, scale?: number) => void;
}

/** شکل رکورد شخصی — بهتر = امتیاز بیشتر */
export interface BestRecord {
  score: number;
}
