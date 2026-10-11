"use client";

/**
 * بازی «فلپی گزینش» (Flappy Quiz) — فاز ۴ نقشه راه جامع ۲۰۲۶ + فاز G2-c نقشه راه بازی‌ها.
 *
 * پرندهٔ فلپی‌برد روی بانک واژگان خود جزوه پرواز می‌کند (data.quiz.seed فقط category === "vocabulary"):
 * - به‌جای لوله‌ها «دروازهٔ گزینه» می‌آید: نوار عمودی emerald با ۲ تا ۴ دهانه که روی هر دهانه
 *   یک گزینهٔ انگلیسی نوشته شده — پرنده باید دقیقاً از گزینهٔ درستِ سؤال رد شود.
 * - عبور درست: امتیاز ۱۰ + بونوس کمبو، کمبو++ و سرعت = پایه + کمبو × گام (با سقف) + پخش تلفظ گزینه.
 * - دهانهٔ غلط یا برخورد با بدنهٔ دیوار: یک ❤ کم، کمبو صفر، فلاش قرمز، واژهٔ درست با
 *   seedReviewFromQuiz به صف «مرور هوشمند» برمی‌گردد و ۱ ثانیه مصونیت دارد.
 * - زمین/سقف: یک ❤ کم و پرنده به میانه برمی‌گردد. صفر قلب = پایان دور.
 * - اتمام استخر سؤال → reshuffle و ادامه (چرخهٔ بی‌پایان، الگوی speed-quiz).
 *
 * فاز G2-c (کیت GameKit v2 — الگوی پایلوت memory / جای خالی):
 * - کمبو به موتور مشترک منتقل شد (G1-09): useCombo({ mode: "bonus", base: 10, bonusCap: 5,
 *   bonusStep: 2 }) — فرمول امتیاز مو‌به‌مو همان قبل است: ۱۰ + min(کمبو−۱, ۵) × ۲
 *   (عبور اول ۱۰، دوم ۱۲، … تا سقف ۲۰). refs هوک (comboRef/maxComboRef) مستقیم در حلقهٔ
 *   rAF مصرف می‌شوند و state کمبو دوبل نگه‌داشته نمی‌شود.
 * - بازخورد سه‌کاناله: عبور درست = correct + لرزش سبک، خطای دیوار/زمین = wrong + error
 *   (هر دو فقط در لحظهٔ resolve رویداد داخل rAF، نه هر فریم)؛ پایان = finish؛ رکورد = record.
 * - GameShell (هدر یکنواخت: امتیاز/کمبو با کلاس واحد combo-fire/قلب + سؤال دیوار در progress
 *   + liveMsg) + Pause با گیت روی زنجیرهٔ rAF (اورلی «متوقف شد»؛ auto-pause تب مخفی از هوک
 *   و منطق توقف همان مسیر G0-05) + نگهبان خروج حین پرواز + ResultScreen (ستاره‌بندی per-game
 *   و مرور خطاها با معنی واژه) + آموزش ۳گامی (useAutoTutorial) + تله‌متری جلسه.
 *
 * نکتهٔ فنی: کل دنیای بازی (پرنده، دیوارها، سرعت، کمبو، قلب‌ها) در useRef زندگی می‌کند و حلقهٔ
 * requestAnimationFrame مالک آن است — setState فقط روی رویدادهای گسسته (عبور/برخورد/پایان)
 * صدا می‌زند، نه در هر فریم. فیزیک dt-based است (مستقل از نرخ فریم) با clamp dt≤۵۰ms و
 * rAF/شنونده‌ها در cleanup پاک می‌شوند. رکورد شخصی per-scope ("easy" | "normal") و Attempt
 * سروری فقط پس از پایان. امضاهای saveAttempt/saveBest/bumpPlays و کلیدهای localStorage
 * دست‌نخورده — قانون حفظ‌شوندگی §۳-۴ سند بازی‌ها.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Bird,
  CheckCircle2,
  Flame,
  Heart,
  MousePointerClick,
  Pause,
  Play,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
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
// فاز G2-c — کیت GameKit v2 (قرارداد API سند)
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

// ─── ثابت‌ها و انواع ───

const GAME_KEY = "flappy-quiz";
const ALL_LESSONS = -1;
/** گارد استخر سؤال (تسک: استخر < ۳ → خطا) */
const MIN_POOL = 3;
/** ارتفاع منطقی بوم (پیکسل) — عرض از اندازهٔ واقعی خوانده می‌شود */
const H = 480;
const WALL_W = 84;
const BIRD_R = 13;
const GROUND_H = 24;
const HEARTS = 3;
/** مصونیت پس از عبور غلط (تسک: ۱ ثانیه) */
const INVULN_MS = 1000;
/** فلاش قرمز کل بوم پس از خطا */
const FLASH_MS = 320;
/** ماندگاری هایلایت سبز/قرمز روی دیوارِ تازه‌حل‌شده */
const WALL_FLASH_MS = 700;

type Phase = "setup" | "playing" | "done";

/** پیکربندی فیزیک — حالت آسان جاذبه/سرعت ملایم‌تری دارد */
interface Cfg {
  base: number;
  cap: number;
  step: number;
  gravity: number;
  flap: number;
}

const NORMAL_CFG: Cfg = { base: 150, cap: 330, step: 13, gravity: 1400, flap: -380 };
const EASY_CFG: Cfg = { base: 112, cap: 235, step: 10, gravity: 1150, flap: -345 };

interface FlappyGap {
  y0: number;
  y1: number;
  text: string;
  correct: boolean;
}

interface FlappyWall {
  x: number;
  gaps: FlappyGap[];
  q: QuizQuestionSeed;
  resolved: boolean;
  ok: boolean;
  flashUntil: number;
}

interface BirdState {
  y: number;
  vy: number;
}

interface Popup {
  x: number;
  y: number;
  text: string;
  born: number;
}

/** شکل رکورد شخصی این بازی — بهتر = امتیاز بیشتر */
interface BestRecord {
  score: number;
}

/** فاز G2-c — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / G1-08) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Bird size={24} />,
    title: "از گزینهٔ درست رد شو",
    text: "سؤالِ «دیوار پیش‌رو» را بالای بوم بخوان و دقیقاً از دهانهٔ گزینهٔ درستش عبور کن.",
  },
  {
    icon: <MousePointerClick size={24} />,
    title: "پرش با تپ یا Space",
    text: "کلیک/لمس روی بوم یا کلید Space بال می‌زند و پرنده را بالا می‌برد؛ جاذبه همیشه پایینش می‌کشد.",
  },
  {
    icon: <Heart size={24} />,
    title: "قلب‌ها و کمبو",
    text: "هر خطا یک ❤ کم می‌کند و کمبو را صفر می‌کند؛ عبورهای پشت‌سرهم بونوس می‌گیرند (۱۰ تا ۲۰ امتیاز). با صفر شدن قلب‌ها پرواز تمام است.",
  },
];

// ─── کمکی‌های خالص ───

/** نمایش جای خالی سؤال به شکل فشرده: «________» → «.....» */
function qLabel(text: string): string {
  return text.replace(/_+/g, ".....");
}

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

/** چیدمان عمودی k دهانه در باند بازی‌پذیر — ارتفاع دهانه سقف‌دار، مازاد به دیواره‌ها می‌رود */
function layoutGaps(k: number): Array<{ y0: number; y1: number }> {
  const top = 34;
  const bottom = H - GROUND_H - 12;
  const avail = bottom - top;
  const barMin = 34;
  const gapCap = 150;
  let gapH = (avail - (k - 1) * barMin) / k;
  let barH = barMin;
  if (gapH > gapCap) {
    barH = barMin + ((gapH - gapCap) * k) / (k - 1);
    gapH = gapCap;
  }
  const out: Array<{ y0: number; y1: number }> = [];
  let y = top;
  for (let i = 0; i < k; i++) {
    out.push({ y0: y, y1: y + gapH });
    y += gapH + barH;
  }
  return out;
}

function roundRectPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** ابرهای ملایم teal — عمق پس‌زمینه بدون رنگ ممنوع */
function drawSky(c: CanvasRenderingContext2D, now: number, w: number) {
  c.fillStyle = "rgba(45, 212, 191, 0.16)";
  for (let i = 0; i < 3; i++) {
    const cx = ((i * 270 + now * (0.012 + i * 0.005)) % (w + 220)) - 110;
    const cy = 54 + i * 64;
    c.beginPath();
    c.arc(cx, cy, 22, 0, Math.PI * 2);
    c.arc(cx + 25, cy + 6, 15, 0, Math.PI * 2);
    c.arc(cx - 23, cy + 8, 13, 0, Math.PI * 2);
    c.fill();
  }
  c.fillStyle = "#059669";
  c.fillRect(0, 0, w, 4);
}

function drawGround(c: CanvasRenderingContext2D, now: number, w: number, speed: number) {
  const gy = H - GROUND_H;
  c.fillStyle = "#059669";
  c.fillRect(0, gy, w, GROUND_H);
  c.fillStyle = "#10b981";
  c.fillRect(0, gy, w, 4);
  const off = (now * speed * 0.05) % 30;
  c.fillStyle = "#fbbf24";
  for (let x = 0; x < w + 30; x += 30) c.fillRect(x - off, gy + 13, 16, 3);
}

/** دیوار emerald با کلاهک + گزینه‌ها با auto-shrink تا در دهانه جا شوند */
function drawWall(c: CanvasRenderingContext2D, wall: FlappyWall, now: number) {
  const segs: Array<[number, number]> = [];
  let y = 0;
  for (const g of wall.gaps) {
    segs.push([y, g.y0]);
    y = g.y1;
  }
  segs.push([y, H - GROUND_H]);
  c.fillStyle = "#059669";
  for (const [a, b] of segs) if (b > a) c.fillRect(wall.x, a, WALL_W, b - a);
  c.fillStyle = "#047857";
  for (const g of wall.gaps) {
    c.fillRect(wall.x - 4, g.y0 - 10, WALL_W + 8, 10);
    c.fillRect(wall.x - 4, g.y1, WALL_W + 8, 10);
  }
  c.textAlign = "center";
  c.textBaseline = "middle";
  for (const g of wall.gaps) {
    const cy = (g.y0 + g.y1) / 2;
    let fs = 15;
    c.font = `800 ${fs}px system-ui, sans-serif`;
    while (c.measureText(g.text).width > WALL_W - 16 && fs > 8) {
      fs -= 1;
      c.font = `800 ${fs}px system-ui, sans-serif`;
    }
    const tw = Math.min(c.measureText(g.text).width, WALL_W - 16);
    c.fillStyle = "rgba(255, 255, 255, 0.92)";
    roundRectPath(c, wall.x + WALL_W / 2 - tw / 2 - 8, cy - 11, tw + 16, 22, 8);
    c.fill();
    c.fillStyle = "#065f46";
    c.fillText(g.text, wall.x + WALL_W / 2, cy + 1);
  }
  if (wall.flashUntil > now) {
    if (wall.ok) {
      const g = wall.gaps.find((gp) => gp.correct);
      if (g) {
        c.fillStyle = "rgba(16, 185, 129, 0.30)";
        c.fillRect(wall.x - 4, g.y0, WALL_W + 8, g.y1 - g.y0);
      }
    } else {
      c.fillStyle = "rgba(239, 68, 68, 0.22)";
      c.fillRect(wall.x - 4, 0, WALL_W + 8, H - GROUND_H);
    }
  }
}

/** پرنده = دایره amber + بال/چشم/منقار ساده + چرخش بر اساس سرعت عمودی + چشمک مصونیت */
function drawBird(
  c: CanvasRenderingContext2D,
  now: number,
  y: number,
  vy: number,
  bx: number,
  invulnUntil: number,
  lastFlapAt: number,
) {
  c.save();
  if (now < invulnUntil) c.globalAlpha = 0.45 + 0.3 * Math.abs(Math.sin(now / 60));
  c.translate(bx, y);
  c.rotate(Math.max(-0.38, Math.min(0.6, vy / 650)));
  c.beginPath();
  c.arc(0, 0, BIRD_R, 0, Math.PI * 2);
  c.fillStyle = "#f59e0b";
  c.fill();
  c.lineWidth = 2.5;
  c.strokeStyle = "#b45309";
  c.stroke();
  const flapT = Math.max(0, 1 - (now - lastFlapAt) / 350);
  const wy = 3 + Math.sin(now / (flapT > 0 ? 45 : 110)) * (2.5 + flapT * 3);
  c.beginPath();
  c.ellipse(-4, wy, 6.5, 4.2, -0.5, 0, Math.PI * 2);
  c.fillStyle = "#fcd34d";
  c.fill();
  c.stroke();
  c.beginPath();
  c.arc(5, -4.5, 3.4, 0, Math.PI * 2);
  c.fillStyle = "#ffffff";
  c.fill();
  c.beginPath();
  c.arc(6.3, -4.5, 1.6, 0, Math.PI * 2);
  c.fillStyle = "#1c1917";
  c.fill();
  c.beginPath();
  c.moveTo(11, -1);
  c.lineTo(18.5, 2);
  c.lineTo(11, 5.5);
  c.closePath();
  c.fillStyle = "#d97706";
  c.fill();
  c.restore();
}

export function FlappyQuizGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [easy, setEasy] = useState(false);

  // ── HUD حین بازی (فقط روی رویدادهای گسسته به‌روز می‌شود) ──
  const [hudQ, setHudQ] = useState<QuizQuestionSeed | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  /** فاز G2-c — پیام باکس aria-live شِل (عبور/خطا/توقف) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");

  // ── فاز G2-c — موتور کمبو مشترک کیت (G1-09) ──
  // حالت bonus = دقیقاً قانون فعلی فلپی: gained = ۱۰ + min(کمبو−۱, ۵) × ۲ (امتیاز یکسان می‌ماند)
  const {
    combo,
    maxCombo,
    comboRef: comboCountRef,
    maxComboRef: bestComboRef,
    registerCorrect,
    registerMiss,
    reset: resetCombo,
  } = useCombo({ mode: "bonus", base: 10, bonusCap: 5, bonusStep: 2 });

  // ── stateهای فاز done ──
  const [isRecord, setIsRecord] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongWords, setWrongWords] = useState<string[]>([]);

  // ── فاز G2-c — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا ──
  // هوک فقط state توقف را می‌دهد؛ منطق توقف/ادامهٔ حلقهٔ rAF همان مسیر G0-05 است:
  // onChange → pausedRef (آینه برای حلقه) + loopCtl (cancel/resume زنجیرهٔ فعلی).
  // auto-pause در تب مخفی هم از خود هوک می‌آید — در بازگشت اورلی «متوقف شد» دیده می‌شود.
  const pausedRef = useRef(false);
  const loopCtlRef = useRef<((p: boolean) => void) | null>(null);
  /** جمع زمان‌های توقف — مدت Attempt نباید توقف‌ها را حساب کند (تایمر گیت روی paused) */
  const pausedAccumRef = useRef(0);
  const pauseStartRef = useRef(0);
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = performance.now();
    } else if (pauseStartRef.current > 0) {
      pausedAccumRef.current += performance.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
    }
    loopCtlRef.current?.(p);
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای گارد پرش با کیبورد حین باز بودن دیالوگ */
  const exitAskRef = useRef(false);
  const setExitAskSafe = useCallback((v: boolean) => {
    exitAskRef.current = v;
    setExitAsk(v);
  }, []);
  // الگوی دارباز: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  // فاز G2-c — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
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
  // فاز G2-c — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // ── دنیای بازی — مالک: حلقهٔ rAF ──
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimRef = useRef<{ w: number }>({ w: 640 });
  const birdRef = useRef<BirdState>({ y: H / 2, vy: 0 });
  const wallsRef = useRef<FlappyWall[]>([]);
  const popupsRef = useRef<Popup[]>([]);
  const hudWallRef = useRef<FlappyWall | null>(null);
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const deckIdxRef = useRef(0);
  const cfgRef = useRef<Cfg>(NORMAL_CFG);
  const speedRef = useRef(NORMAL_CFG.base);
  const scoreRef = useRef(0);
  const heartsRef = useRef(HEARTS);
  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef<string[]>([]);
  const invulnUntilRef = useRef(0);
  const flashUntilRef = useRef(0);
  const lastFlapAtRef = useRef(0);
  const startedAtRef = useRef(0);
  const overRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const voiceSpeedRef = useRef(speed);

  // ── داده‌های مشتق ──
  const vocabSeed = useMemo(
    () => data.quiz.seed.filter((q) => q.category === "vocabulary"),
    [data.quiz.seed],
  );

  const lessons = useMemo(
    () => [...new Set(vocabSeed.map((q) => q.lesson))].sort((a, b) => a - b),
    [vocabSeed],
  );

  const countFor = useCallback(
    (l: number) => (l === ALL_LESSONS ? vocabSeed.length : vocabSeed.filter((q) => q.lesson === l).length),
    [vocabSeed],
  );

  const pool = useMemo(
    () => (lesson === ALL_LESSONS ? vocabSeed : vocabSeed.filter((q) => q.lesson === lesson)),
    [vocabSeed, lesson],
  );

  // فاز G2-c — نگاشت واژه → معنی برای «مرور خطاها»ی صفحهٔ نتیجه (پسوند مثل (n) حذف می‌شود)
  const meaningMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const w of data.vocab.all) {
      const base = w.word.replace(/\s*\([^)]*\)\s*/g, " ").trim().toLowerCase();
      if (base && !m.has(base)) m.set(base, w.meaning);
    }
    return m;
  }, [data.vocab.all]);

  const meaningOf = useCallback(
    (word: string) =>
      meaningMap.get(word.replace(/\s*\([^)]*\)\s*/g, " ").trim().toLowerCase()) ?? "—",
    [meaningMap],
  );

  // رکورد شخصی این اسکوپ — الگوی speed-quiz (اسنپ‌شات عددی پایدار)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => loadBest<BestRecord>(activeBookId, GAME_KEY, easy ? "easy" : "normal")?.score ?? null,
    () => null,
  );

  // ── جریان بازی ──

  /** سؤال بعدی از دستهٔ یکتا — اتمام استخر → reshuffle و ادامه */
  const nextQuestion = useCallback((): QuizQuestionSeed => {
    if (deckIdxRef.current >= deckRef.current.length) {
      deckRef.current = shuffle(deckRef.current);
      deckIdxRef.current = 0;
    }
    const q = deckRef.current[deckIdxRef.current];
    deckIdxRef.current += 1;
    return q;
  }, []);

  /** ساخت یک دروازهٔ گزینه: ۲ تا ۴ دهانه (گزینهٔ درست + حواس‌پرتی‌ها، شافل) */
  const makeWall = useCallback(
    (x: number): FlappyWall => {
      const q = nextQuestion();
      const correctText = q.options[q.answer];
      const k = 2 + Math.floor(Math.random() * 3);
      const distractors = shuffle(q.options.filter((_, i) => i !== q.answer)).slice(0, k - 1);
      const texts = shuffle([correctText, ...distractors]);
      const slots = layoutGaps(k);
      return {
        x,
        gaps: slots.map((s, i) => ({
          y0: s.y0,
          y1: s.y1,
          text: texts[i],
          correct: texts[i] === correctText,
        })),
        q,
        resolved: false,
        ok: false,
        flashUntil: 0,
      };
    },
    [nextQuestion],
  );

  const start = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error(`سؤال واژگانی کافی در این محدوده نیست — دست‌کم ${faNum(MIN_POOL)} سؤال لازم است`);
      return;
    }
    // فاز G2-c — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
    playSound("click");
    buzz("light");
    const cfg = easy ? EASY_CFG : NORMAL_CFG;
    cfgRef.current = cfg;
    speedRef.current = cfg.base;
    birdRef.current = { y: H / 2, vy: 0 };
    wallsRef.current = [];
    popupsRef.current = [];
    hudWallRef.current = null;
    scoreRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = [];
    invulnUntilRef.current = 0;
    flashUntilRef.current = 0;
    lastFlapAtRef.current = 0;
    startedAtRef.current = performance.now();
    pausedAccumRef.current = 0;
    pauseStartRef.current = 0;
    overRef.current = false;
    // فاز G2-c — کمبوی تازه از موتور مشترک کیت
    resetCombo();
    const deck = pickUnique(pool, pool.length, (q) => q.text);
    deckRef.current = deck;
    deckIdxRef.current = 0;
    // سؤال دیوار اول — دیوار واقعی در effect «playing» با nextQuestion از همین سرِ دسته زده می‌شود
    setHudQ(deck.length > 0 ? deck[0] : null);
    setScore(0);
    setHearts(HEARTS);
    setIsRecord(false);
    setCorrectCount(0);
    setWrongWords([]);
    setLiveMsg("");
    resume();
    setExitAskSafe(false);
    // فاز G2-c — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${easy ? "easy" : "normal"}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [pool, easy, lesson, resetCombo, resume, setExitAskSafe]);

  /** پایان دور — فقط یک‌بار (overRef قفل)؛ ثبت streak/session/plays/attempt/best */
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    const total = totalRef.current;
    const finalScore = scoreRef.current;
    // مدت دور بدون احتساب زمان توقف (گیت paused روی «تایمر»)
    const elapsed = Math.max(
      1,
      Math.round((performance.now() - startedAtRef.current - pausedAccumRef.current) / 1000),
    );
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G2-c — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    // فاز G2-c — بازخورد سه‌کانالهٔ پایان دور
    playSound("finish");
    buzz("success");
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: correctRef.current,
        duration: elapsed,
        detail: { score: finalScore, maxCombo: bestComboRef.current },
      });
    }
    const scope = easy ? "easy" : "normal";
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    if (finalScore > 0 && finalScore > (prev?.score ?? 0)) {
      saveBest(activeBookId, GAME_KEY, scope, { score: finalScore });
      setIsRecord(prev !== null);
      if (prev !== null) {
        // فاز G2-c — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(finalScore)} امتیاز 🏆`);
      }
    } else {
      setIsRecord(false);
    }
    setCorrectCount(correctRef.current);
    setWrongWords([...wrongRef.current]);
    setScore(finalScore);
    setPhase("done");
  }, [activeBookId, lesson, easy, bestComboRef]);

  // انصراف حین پرواز — فاز G2-c (نگهبان خروج): با هر پیشرفت، GameExitGuard؛
  // پیش از اولین دیوار، خروج مستقیم + تله‌متری abandon
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (totalRef.current > 0 || scoreRef.current > 0) {
      // پرواز حین خواندن دیالوگ فریز شود (بازی فیزیکی است — پشت دیالوگ نمی‌میرد)
      pauseGame();
      setExitAskSafe(true);
    } else {
      overRef.current = true;
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setExitAskSafe(false);
      setPhase("setup");
    }
  }, [pauseGame, resume, setExitAskSafe]);

  // آخرین نسخهٔ finish + سرعت صدا برای حلقهٔ rAF (الگوی latest-ref — effect بدون dep)
  useEffect(() => {
    finishRef.current = finish;
    voiceSpeedRef.current = speed;
  });

  // فاز G2-c — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
    },
    [],
  );

  // ── حلقهٔ بازی: اندازه‌گیری بوم، ورودی‌ها، فیزیک dt-based و رسم ──
  useEffect(() => {
    if (phase !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // اندازه و وضوح — یک‌بار در شروع دور
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimRef.current = { w: Math.round(rect.width) || 640 };

    // نخستین دیوار (سؤالش همان deck[0] است که در start به HUD داده شده)
    if (wallsRef.current.length === 0) {
      wallsRef.current.push(makeWall(dimRef.current.w + 40));
      hudWallRef.current = wallsRef.current[0];
    }

    const flap = () => {
      if (overRef.current || pausedRef.current || exitAskRef.current) return;
      birdRef.current.vy = cfgRef.current.flap;
      lastFlapAtRef.current = performance.now();
    };

    const syncHud = () => {
      setScore(scoreRef.current);
      setHearts(heartsRef.current);
    };

    const showWallQ = (wl: FlappyWall) => {
      hudWallRef.current = wl;
      setHudQ(wl.q);
    };

    const step = (now: number, dt: number) => {
      const cfg = cfgRef.current;
      const bird = birdRef.current;
      const { w } = dimRef.current;
      const birdX = Math.min(w * 0.28, 190);

      // فیزیک پرنده (dt-based)
      bird.vy = Math.min(bird.vy + cfg.gravity * dt, 640);
      bird.y += bird.vy * dt;

      // حرکت دیوارها به چپ + حذف خارج‌شده‌ها
      const walls = wallsRef.current;
      for (const wl of walls) wl.x -= speedRef.current * dt;
      while (walls.length > 0 && walls[0].x < -WALL_W - 40) walls.shift();

      // زادن دیوار بعدی
      const spacing = Math.max(280, w * 0.62);
      const lastW = walls[walls.length - 1];
      if (!lastW || lastW.x < w - spacing) {
        const nw = makeWall(w + 30);
        walls.push(nw);
        if (!hudWallRef.current || hudWallRef.current.resolved) showWallQ(nw);
      }

      // عبور از دیوار — لحظه‌ای که مرکز دیوار از پرنده رد می‌شود
      for (const wl of walls) {
        if (wl.resolved || wl.x + WALL_W / 2 > birdX) continue;
        wl.resolved = true;
        totalRef.current += 1;
        const gap = wl.gaps.find((g) => bird.y >= g.y0 && bird.y <= g.y1) ?? null;
        if (gap !== null && gap.correct) {
          // عبور درست — فاز G2-c: امتیاز از موتور کمبو کیت (فرمول مو‌به‌مو یکسان) + شتاب + تلفظ
          const gained = registerCorrect();
          scoreRef.current += gained;
          speedRef.current = Math.min(cfg.cap, cfg.base + comboCountRef.current * cfg.step);
          wl.ok = true;
          wl.flashUntil = now + WALL_FLASH_MS;
          popupsRef.current.push({
            x: wl.x + WALL_W / 2,
            y: bird.y - 26,
            text: `+${faNum(gained)}`,
            born: now,
          });
          correctRef.current += 1;
          void speak(gap.text, { speed: voiceSpeedRef.current });
          // فاز G2-c — بازخورد سه‌کانالهٔ عبور درست (لرزش سبک — فقط در لحظهٔ resolve دیوار)
          playSound("correct");
          buzz("light");
          setLiveMsg(`+${faNum(gained)} امتیاز — کمبو ×${faNum(comboCountRef.current)} 🔥`);
        } else {
          // دهانهٔ غلط یا برخورد با بدنهٔ دیوار — یک ❤ کم، کمبو صفر (کیت)، فلاش، صف مرور، مصونیت ۱ث
          heartsRef.current -= 1;
          registerMiss();
          speedRef.current = cfg.base;
          wl.ok = false;
          wl.flashUntil = now + WALL_FLASH_MS;
          flashUntilRef.current = now + FLASH_MS;
          invulnUntilRef.current = now + INVULN_MS;
          const word = wl.q.options[wl.q.answer];
          if (!wrongRef.current.includes(word)) wrongRef.current.push(word);
          seedReviewFromQuiz(word);
          // فاز G2-c — بازخورد سه‌کانالهٔ خطای دیوار
          playSound("wrong");
          buzz("error");
          setLiveMsg(`دهانهٔ غلط — پاسخ درست «${word}» بود — یک ❤ کم شد`);
        }
        syncHud();
        if (hudWallRef.current === wl) {
          const nxt = walls.find((c) => !c.resolved);
          if (nxt) showWallQ(nxt);
          else {
            hudWallRef.current = null;
            setHudQ(null);
          }
        }
      }

      // زمین/سقف — یک ❤ کم و پرنده به میانه برمی‌گردد
      if (bird.y + BIRD_R >= H - GROUND_H || bird.y - BIRD_R <= 0) {
        if (now >= invulnUntilRef.current) {
          heartsRef.current -= 1;
          flashUntilRef.current = now + FLASH_MS;
          invulnUntilRef.current = now + 700;
          syncHud();
          // فاز G2-c — بازخورد سه‌کانالهٔ برخورد با زمین/سقف (لحظهٔ رویداد، نه هر فریم)
          playSound("wrong");
          buzz("error");
          setLiveMsg("برخورد با زمین/سقف — یک ❤ کم شد");
        }
        bird.y = H / 2;
        bird.vy = 0;
      }
    };

    const draw = (c: CanvasRenderingContext2D, now: number) => {
      const { w } = dimRef.current;
      const bird = birdRef.current;
      const birdX = Math.min(w * 0.28, 190);
      c.clearRect(0, 0, w, H);
      drawSky(c, now, w);
      for (const wl of wallsRef.current) drawWall(c, wl, now);
      drawGround(c, now, w, speedRef.current);
      popupsRef.current = popupsRef.current.filter((p) => now - p.born < 700);
      c.textAlign = "center";
      c.textBaseline = "middle";
      for (const p of popupsRef.current) {
        const t = now - p.born;
        c.globalAlpha = Math.max(0, 1 - t / 700);
        c.fillStyle = "#047857";
        c.font = "800 15px system-ui, sans-serif";
        c.fillText(p.text, p.x, p.y - t * 0.04);
        c.globalAlpha = 1;
      }
      drawBird(c, now, bird.y, bird.vy, birdX, invulnUntilRef.current, lastFlapAtRef.current);
      if (now < flashUntilRef.current) {
        c.fillStyle = "rgba(239, 68, 68, 0.16)";
        c.fillRect(0, 0, w, H);
      }
    };

    const onPointer = (e: PointerEvent) => {
      e.preventDefault();
      flap();
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        flap();
      }
    };
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);

    let raf = 0;
    let last = performance.now();
    // فاز G0-05 + G2-c — فلگ توقف زنجیرهٔ rAF: هم onChange هوک Pause و هم گارد
    // visibilitychange از همین مسیر توقف/ادامه می‌کنند (توقف = cancelAnimationFrame،
    // ادامه = resumeLoop با last تازه تا پرنده وسط پرواز نپرد — dt از قبل ≤۵۰ms clamp است)
    let paused = false;
    const resumeLoop = () => {
      paused = false;
      last = performance.now();
      cancelAnimationFrame(raf); // گارد لبه: زنجیرهٔ معوق دوباره زده نشود (شروع دور در تب مخفی)
      raf = requestAnimationFrame(tick);
    };
    const applyLoopPause = (p: boolean) => {
      if (p === paused) return; // idempotent — هوک و onVis هر دو ممکن است صدا بزنند
      paused = p;
      if (p) {
        cancelAnimationFrame(raf);
      } else if (!overRef.current) {
        resumeLoop();
      }
    };
    loopCtlRef.current = applyLoopPause;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (overRef.current || paused) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(now, dt);
      draw(ctx, now);
      if (heartsRef.current <= 0) finishRef.current();
    };
    raf = requestAnimationFrame(tick);

    // فاز G0-05 — گارد visibilitychange/pageshow: در تب مخفی حلقهٔ rAF متوقف می‌شود.
    // فاز G2-c — توقف خودکارِ «ادامه‌دار» اکنون از هوک Pause می‌آید (کاربر در بازگشت
    // اورلی «متوقف شد» می‌بیند و خودش ادامه می‌دهد)؛ همین مسیر فقط در حالتی که هوک
    // متوقفش نکرده (pausedRef=false) بی‌صدا از سر می‌گیرد — دو مکانیزم تداخل ندارند.
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        applyLoopPause(true);
      } else if (!overRef.current && !pausedRef.current) {
        applyLoopPause(false);
      }
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      cancelAnimationFrame(raf);
      if (!overRef.current && !pausedRef.current) resumeLoop();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);

    return () => {
      cancelAnimationFrame(raf);
      loopCtlRef.current = null;
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, makeWall, registerCorrect, registerMiss, comboCountRef]);

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
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Bird size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">فلپی گزینش</h2>
                <p className="text-xs text-muted-foreground">پرواز کن و از دروازهٔ گزینهٔ درست رد شو!</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                روی هر دیوار چند گزینه نوشته شده — دقیقاً از گزینهٔ درستِ سؤالِ «دیوار پیش‌رو» رد شو. هر عبور درست
                کمبو و سرعت را بالا می‌برد و هر خطا یک ❤ کم می‌کند؛ با صفر شدن قلب‌ها پرواز تمام است.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
                <button
                  type="button"
                  aria-pressed={lesson === ALL_LESSONS}
                  onClick={() => setLesson(ALL_LESSONS)}
                  className={chipCls(lesson === ALL_LESSONS)}
                >
                  کل کتاب ({faNum(vocabSeed.length)} سؤال)
                </button>
                {lessons.map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={lesson === l}
                    onClick={() => setLesson(l)}
                    className={chipCls(lesson === l)}
                  >
                    {lessonLabel(l)} ({faNum(countFor(l))} سؤال)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">سرعت پرواز</p>
              <button type="button" aria-pressed={easy} onClick={() => setEasy((v) => !v)} className={chipCls(easy)}>
                حالت آسان {easy ? "— فعال" : ""}
              </button>
              <p className="mt-2 text-[11px] text-muted-foreground">
                در حالت آسان جاذبه و سرعت پایه کمتر است؛ رکورد هر دو حالت جداگانه ثبت می‌شود.
              </p>
            </div>

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                بهترین امتیاز: {faNum(best)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع پرواز
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-c — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    // ستاره‌بندی per-game: دور معمول ۶-۱۵ عبور × ۱۰-۲۰ امتیاز است →
    // ≥۱۲۰ = پرواز قوی (۳ ستاره)، ≥۷۰ = خوب (۲ ستاره)، بقیه ۱ ستاره
    const stars = score >= 120 ? 3 : score >= 70 ? 2 : 1;
    return (
      <ResultScreen
        title="پرواز تمام شد!"
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongWords.length}
        reviewItems={wrongWords.map((w) => ({ front: w, back: meaningOf(w) }))}
        stats={[
          {
            label: "امتیاز",
            value: faNum(score),
            icon: <Star size={16} className="text-amber-500" />,
          },
          {
            label: "عبور درست",
            value: faNum(correctCount),
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
          },
          {
            label: "بهترین کمبو",
            value: `×${faNum(maxCombo)}`,
            icon: <Flame size={16} className="text-teal-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  return (
    <>
      {/* فاز G2-c — هدر یکنواخت از کیت (الگوی پایلوت memory/جای خالی) */}
      <GameShell
        title="فلپی گزینش"
        icon={<Bird size={18} />}
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
                  // فاز G2-c — افکت بصری واحد بج کمبو (کیت) + pulse ساده با گارد reduced-motion
                  COMBO_FIRE_CLASS,
                  "animate-pulse motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(combo)}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Flame size={12} />
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
          </>
        }
        liveMsg={liveMsg}
        progress={
          hudQ ? (
            <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2.5">
              <Badge
                variant="outline"
                className="shrink-0 border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-400"
              >
                دیوار پیش‌رو
              </Badge>
              <p dir="ltr" className="font-en min-w-0 flex-1 truncate text-left text-[13px] font-bold sm:text-sm">
                {qLabel(hudQ.text)}
              </p>
            </div>
          ) : undefined
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div
            className={cn(
              "overflow-hidden rounded-2xl border bg-card shadow-sm",
              paused && "pointer-events-none blur-sm",
            )}
            aria-hidden={paused}
          >
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="بازی فلپی گزینش — برای بال زدن کلیک کن یا Space بزن"
              className="block h-[480px] w-full touch-none select-none bg-gradient-to-b from-teal-50 via-emerald-50/60 to-emerald-100 dark:from-teal-950 dark:via-emerald-950/70 dark:to-emerald-950"
            />
          </div>

          {/* فاز G2-c — اورلی توقف (الگوی پایلوت memory): بوم تار و غیرقابل‌کلیک */}
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

        <p className="text-center text-[11px] text-muted-foreground">
          کلیک/لمس روی بوم یا Space = بال زدن — از دهانهٔ گزینهٔ درست رد شو
        </p>

        {/* فاز G2-c — نگهبان خروج استاندارد کیت (حین پرواز با پیشرفت) */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={(o) => {
            setExitAskSafe(o);
            // انصراف از خروج (Esc/کلیک بیرون/«نه») → پرواز از همان‌جا ادامه یابد
            if (!o) resume();
          }}
          onConfirm={() => {
            // فاز G2-c — رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            stopSpeaking();
            overRef.current = true;
            setExitAskSafe(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-c — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
