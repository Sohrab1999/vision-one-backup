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
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Crosshair,
  Flame,
  Heart,
  MonitorSmartphone,
  MousePointerClick,
  Pause,
  Play,
  Sparkles,
  Star,
  Swords,
  Target as TargetIcon,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
/** خط عمودی لِین‌ها (عرض صحنه) — در پرتره با laneK جمع می‌شود */
const LANE_X = [-5.4, -1.85, 1.85, 5.4];
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
  shoot: { x: number; y: number; seq: number };
  lastShotAt: number;
  laneK: number;
  flashes: FlashEntry[];
  onHit: (id: string | null) => void;
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
    text: "دسکتاپ: کلیک اول قفلِ نشانگر، حرکت موس نشانه‌گیری و کلیک بعدی شلیک — موبایل: کشیدن = نگاه و تپ روی هدف = شلیک. در «تپ ساده» تپ روی هدف کافی است و کلیدهای ۱ تا ۴ هم هدف‌ها را از چپ انتخاب می‌کنند.",
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: "کیفیت گرافیک",
    text: "اگر صحنه روی گوشی سنگین بود، در تنظیمات «کیفیت سبک» را انتخاب کن: رزولوشن کمتر، ذرات و اجسام تزئینی کمتر و ۳ هدف هم‌زمان به‌جای ۴ — انتخابت برای دفعات بعد ذخیره می‌شود.",
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
): TargetSpec[] {
  const lanes = shuffle([0, 1, 2, 3]);
  const colors = [0x10b981, 0xf59e0b, 0x14b8a6, 0x34d399];
  return opts.map((o, i) => ({
    id: `t${i}`,
    text: o.text,
    correct: o.correct,
    lane: LANE_X[lanes[i]],
    baseY: 1.35 + (i % 2) * 0.85 + Math.random() * 0.35,
    baseZ: -(7.5 + Math.floor(i / 2) * 3.1) - Math.random() * 1.4,
    spin: 0.5 + Math.random() * 0.7,
    bobSpeed: 0.8 + Math.random() * 0.7,
    driftAmp: 0.5 + Math.random() * 0.8,
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
    targets: layoutTargets(opts),
    speakText: target.word,
    srsKey: target.word,
    lesson,
  };
}

/** فاز G2-e — maxOthers: در کیفیت سبک گزینهٔ درست + ۲ حواس‌پرتی (چیدمان لِین‌ها شافل است) */
function buildGrammarQuestion(seq: number, s: QuizQuestionSeed, lesson: number, maxOthers: number): Question {
  const optsAll = s.options.map((text, i) => ({ text, correct: i === s.answer }));
  const opts = [optsAll[s.answer], ...optsAll.filter((o) => !o.correct).slice(0, maxOthers)];
  return {
    seq,
    mode: "grammar-gate",
    promptFa: "سد گرامری! گزینهٔ درست را شکار کن",
    promptMain: qLabel(s.text),
    promptSub: s.scope,
    ltr: true,
    targets: layoutTargets(opts),
    speakText: s.text.replace(/_+/, s.options[s.answer]),
    srsKey: s.options[s.answer],
    lesson,
  };
}

// ─── اجزای صحنهٔ سه‌بعدی ───

/** به‌روزرسانی دوربین اول‌شخص — تابع ماژول‌سطح (جهش THREE فقط از اینجا) */
function applyRig(cam: THREE.Camera, b: SceneBridge, aspect: number): void {
  b.laneK = Math.max(0.55, Math.min(1, aspect / 1.5));
  cam.position.z = 7 + (1 - b.laneK) * 4.2;
  cam.rotation.y = b.aim.yaw;
  cam.rotation.x = b.aim.pitch;
}

/** تنظیم اولیهٔ دوربین — تابع ماژول‌سطح */
function initRig(cam: THREE.Camera): void {
  cam.position.set(0, 1.7, 7);
  cam.rotation.order = "YXZ";
}

/** دوربین اول‌شخص — چرخش از bridge + تطبیق عرض صحنه در پرتره */
function Rig({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const { camera, size } = useThree();
  useEffect(() => {
    initRig(camera);
  }, [camera]);
  useFrame(() => {
    applyRig(camera, bridge.current, size.width / Math.max(1, size.height));
  });
  return null;
}

/** میدان low-poly: زمین، کوه‌های دوردست و اجسام شناور تزئینی — فاز G2-e: تعداد deco پارامتر شد */
function Arena({ deco }: { deco: number }) {
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
          hue: [0x0d9488, 0x059669, 0xd97706, 0x10b981][i % 4],
          spin: 0.2 + Math.random() * 0.4,
          bob: 0.4 + Math.random() * 0.5,
          scale: 0.5 + Math.random() * 1.1,
        })),
      ),
    [deco],
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
      <color attach="background" args={["#062e24"]} />
      <fog attach="fog" args={["#062e24", 10, 36]} />
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#a7f3d0", "#064e3b", 0.55]} />
      <directionalLight position={[5, 9, 3]} intensity={1.1} />
      {/* زمین دایره‌ای */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -7]}>
        <circleGeometry args={[30, 44]} />
        <meshStandardMaterial color="#0a4335" roughness={0.95} />
      </mesh>
      {/* حلقه‌های راهنمای زمین */}
      {[5.4, 9.2, 13.4].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.02, -7]}>
          <ringGeometry args={[r, r + 0.22, 52]} />
          <meshBasicMaterial color={i === 0 ? "#f59e0b" : "#10b981"} transparent opacity={0.3 - i * 0.07} />
        </mesh>
      ))}
      {/* کوه‌های low-poly دوردست */}
      {mounts.map((m) => (
        <mesh key={m.key} position={m.pos}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color="#065f46" flatShading roughness={1} />
        </mesh>
      ))}
      {/* اجسام شناور تزئینی */}
      {decoShapes.map((d) => (
        <DecoShape key={d.key} spec={d} />
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

function DecoShape({ spec }: { spec: DecoSpec }) {
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
      <meshStandardMaterial color={spec.hue} flatShading roughness={0.6} metalness={0.12} />
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

  useFrame((state) => {
    const g = groupRef.current;
    const m = meshRef.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    const b = bridge.current;
    g.position.set(
      spec.lane * b.laneK + Math.sin(t * 0.5 + t0) * spec.driftAmp * b.laneK,
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

  // ── HUD حین بازی ──
  const [q, setQ] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  const [timeLeft, setTimeLeft] = useState(Q_TIME_SHOOT);
  /** فاز G2-e — پیام باکس aria-live شِل (برخورد/خطا/توقف) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");

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
    shoot: { x: 0, y: 0, seq: 0 },
    lastShotAt: 0,
    laneK: 1,
    flashes: [],
    onHit: () => {},
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
        }
      }
    }
    // فریز/احیای زنجیرهٔ «فریز برخورد → سؤال بعد/پایان»
    scheduleChain();
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
    const next =
      modeRef.current === "word-hunt"
        ? buildWordQuestion(++seqRef.current, item as VocabEntry, distrRef.current, lesson, maxOthers)
        : buildGrammarQuestion(++seqRef.current, item as QuizQuestionSeed, lesson, maxOthers);
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
        detail: {
          score: final,
          maxCombo: maxComboRef.current,
          mode: modeRef.current,
          tap: tapRef.current,
          quality: qualityRef.current,
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
      const cur = qRef.current;
      if (overRef.current || lockedRef.current || !cur || id === null) return;
      if (pausedRef.current || exitAskRef.current) return;
      const target = cur.targets.find((t) => t.id === id);
      if (!target) return;
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
    [advance, later, registerCorrect, registerMiss, comboCountRef],
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

    const ndcOf = (cx: number, cy: number): [number, number] => {
      const r = el.getBoundingClientRect();
      return [((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1];
    };
    const request = (x: number, y: number) => {
      // گارد «نه هر فریم»: شلیک فقط رویداد کاربر + cooldown؛ حین توقف/دیالوگ هم شلیک نیست
      if (pausedRef.current || exitAskRef.current || overRef.current) return;
      const b = bridge.current;
      const now = performance.now();
      if (now - b.lastShotAt < SHOOT_COOLDOWN) return;
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
      if (!coarse && !tapRef.current) {
        if (document.pointerLockElement !== el) {
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
      gest = { x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false, lx: e.clientX, ly: e.clientY, active: true };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (document.pointerLockElement === el) {
        const b = bridge.current;
        b.aim.yaw -= e.movementX * 0.0026;
        b.aim.pitch = clamp(b.aim.pitch - e.movementY * 0.0024, -0.6, 0.48);
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
        b.aim.yaw -= dx * 0.005;
        b.aim.pitch = clamp(b.aim.pitch - dy * 0.0045, -0.6, 0.48);
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

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerlockchange", onLockChange);
      if (document.pointerLockElement === el) document.exitPointerLock();
    };
  }, [phase]);

  // ── شروع دور ──
  const start = useCallback(() => {
    const pool: Array<VocabEntry | QuizQuestionSeed> =
      mode === "word-hunt"
        ? (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson))
        : (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson));
    if (pool.length < (mode === "word-hunt" ? MIN_POOL_WORD : MIN_POOL_QUIZ)) return;
    // فاز G2-e — بازخورد کلیک شروع دور (الگوی کیت)
    playSound("click");
    buzz("light");
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
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
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
  }, [mode, lesson, tapMode, quality, vocabAll, quizSeed, resetCombo, resume, setExitAskSafe, clearTimers, later]);

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

  // کلیک چیپ‌های setup — بازخورد کیت (الگوی جای خالی)
  const chipFeedback = useCallback(() => {
    playSound("click");
    buzz("light");
  }, []);

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
                (شلیک به خالی) جریمه ندارد!
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

            {!poolOk && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-[11px] leading-5 text-destructive">
                {mode === "word-hunt"
                  ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_WORD)} واژه لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
                  : `برای این انتخاب دست‌کم ${faNum(MIN_POOL_QUIZ)} سؤال لازم است — محدودهٔ دیگری را انتخاب کن.`}
              </div>
            )}

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
            aria-label="میدان سه‌بعدی شوتر آموزشی"
            className={cn(
              "relative h-[60vh] max-h-[580px] min-h-[400px] touch-none overflow-hidden rounded-2xl border bg-[#062e24] shadow-lg",
              // فاز G2-e — حین توقف صحنه تار و غیرقابل‌کلیک (الگوی flappy)
              paused && "pointer-events-none blur-sm",
            )}
            aria-hidden={paused}
          >
            <Canvas
              // فاز G2-e — فریز واقعی حلقهٔ R3F حین توقف: frameloop "never" معادل
              // cancelAnimationFrame و بازگشت به "always" معادل resumeLoop الگوی flappy است.
              frameloop={paused ? "never" : "always"}
              // فاز G2-e — کیفیت سبک: dpr پایین‌تر؛ عادی: رفتار فعلی (با ملاحظهٔ دستگاه ضعیف)
              dpr={qualityLow ? [0.7, 1] : weak ? [1, 1] : [1, 1.75]}
              camera={{ fov: 72, near: 0.1, far: 60, position: [0, 1.7, 7] }}
              gl={{ antialias: qualityLow ? false : !weak, powerPreference: "high-performance" }}
              // سایه‌ها در هر دو کیفیت off — سبک همیشه و عادی همان رفتار فعلی صحنه (سقف draw-call)
              shadows={false}
            >
              <Rig bridge={bridge} />
              <Arena deco={qualityLow ? DECO_LOW : weak ? 8 : 14} />
              {q?.targets.map((t) => (
                <Target key={`q${q.seq}-${t.id}`} spec={t} registry={meshRegistry} bridge={bridge} />
              ))}
              <Burst apiRef={burstApi} count={qualityLow ? BURST_LOW : weak ? BURST_WEAK : BURST_FULL} />
              <World bridge={bridge} registry={meshRegistry} burstApi={burstApi} />
            </Canvas>

            {/* سؤال — HUD بالای میدان */}
            {q && (
              <div className="pointer-events-none absolute inset-x-3 top-3 z-10">
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
                    ? "بکش تا نگاه کنی · تپ روی هدف = شلیک"
                    : locked
                      ? "حرکت موس = نشانه‌گیری · کلیک = شلیک"
                      : "برای شروع نشانه‌گیری کلیک کن (Pointer Lock)"}
              </span>
            </div>
          </div>

          {/* فاز G2-e — اورلی توقف (الگوی پایلوت memory/flappy): صحنهٔ تار پشت آن فریز است */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">بازی متوقف شد</p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
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
