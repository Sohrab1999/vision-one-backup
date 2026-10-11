"use client";

/**
 * بازی «شکار کلمه» (Word Search) — فاز ۳ نقشه راه جامع ۲۰۲۶ + فاز G2-b نقشه راه بازی‌ها.
 *
 * جدول حروف انگلیسی با واژه‌های پنهانِ درس؛ سرنخ = معنی فارسی.
 * هر شکارِ درست تلفظ را پخش می‌کند و در SRS ثبت می‌شود.
 * رکورد = کمترین زمان؛ اسکوپ رکورد: `${درس}:${تعداد واژه}`.
 *
 * دو مسیر انتخاب موازی که هر دو به یک تابع confirm مشترک می‌رسند:
 * - کلیک دو-مرحله‌ای (موجود از فاز ۳): اول حرف اول، بعد حرف آخر — با کیبورد هم کار می‌کند
 *   (سلول‌ها دکمه‌های واقعی‌اند؛ Enter/Space همان onClick را می‌زند).
 * - فاز G2-b — درگ لمسی/ماوس (Pointer Events): pointerDown روی سلول شروع، حرکت با
 *   onPointerMove روی container + `document.elementFromPoint` (مقابل pointer-capture
 *   ضمنی لمس مقاوم است)، رهاکردن (pointerUp/cancel/leave روی container) = ثبت انتخاب.
 *   حین درگ، مسیر موقت با snap به نزدیک‌ترین جهتِ مجاز (۸ جهت) هایلایت می‌شود و
 *   `touch-action: none` اسکرول صفحه حین درگ را می‌بندد.
 *
 * فاز G2-b (کیت GameKit v2 — الگوی پایلوت memory و دارباز): GameShell + ResultScreen +
 * آموزش ۳گامی (useAutoTutorial) + Pause (تایمر گیت روی paused) + نگهبان خروج +
 * تله‌متری جلسه (start/end/abandon) + صدا/لرزش — امضاهای shared.ts و کلیدهای
 * localStorage دست‌نخورده (قانون حفظ‌شوندگی §۳-۴ سند).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Search,
  Play,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  Eye,
  Sparkles,
  Pause,
  Hand,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  shuffle,
  faNum,
  fmtTime,
  pickUnique,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  subscribeGameData,
} from "./shared";
// فاز G2-b — کیت GameKit v2 (قرارداد API سند)
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

// ─── تایپ‌ها ───

type Phase = "setup" | "playing" | "done";

/** یک خانه جدول */
interface Cell {
  row: number;
  col: number;
}

/** فاز G2-b — وضعیت درگ فعال: سلول شروع + آخرین سلول زیر اشاره‌گر */
interface DragState {
  from: Cell;
  to: Cell;
}

/** واژه ورودی الگوریتم — base برای جدول، raw برای SRS/نمایش */
interface PuzzleWord {
  base: string;
  raw: string;
  meaning: string;
}

/** یک واژه جاگرفته در جدول */
interface Placement {
  base: string;
  raw: string;
  meaning: string;
  cells: [number, number][];
}

interface Puzzle {
  grid: string[][];
  placements: Placement[];
}

/** شکل رکورد شخصی — کمترین زمان (ثانیه) */
interface BestRecord {
  time: number;
}

const GAME_KEY = "word-search";
const ALL_LESSONS = -1;
const WORD_COUNT_OPTIONS = [6, 8, 10];
const SIZE_OPTIONS = [8, 10];
/** جهت‌های مجاز جای‌گذاری (فقط forward): راست · پایین · قطر راست-پایین · قطر دیگر */
const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];
/** فاز G2-b — مکث پس از شکار آخرین واژه تا انیمیشن pop دیده شود، سپس پایان دور (ms) */
const FINISH_DELAY_MS = 650;

/** فاز G2-b — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / G1-08) — درگ و دو-ضربه هر دو */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Search size={24} />,
    title: "واژه‌ها در جدول پنهان‌اند",
    text: "سرنخ تو معنی فارسی است — واژه‌ها افقی، عمودی یا مورب (۸ جهت) در جدول قایم شده‌اند.",
  },
  {
    icon: <Hand size={24} />,
    title: "بکش و رها کن — یا دو-ضربه بزن",
    text: "انگشت (یا ماوس) را از حرف اول تا آخر واژه بکش و رها کن؛ یا اول حرف اول و بعد حرف آخر را ضربه بزن — هر دو راه شکار است.",
  },
  {
    icon: <Trophy size={24} />,
    title: "سریع‌تر شکار کن",
    text: "رکورد = کمترین زمان! بدون انتخاب غلط ۳ ستاره می‌گیری. واژهٔ شکارشده تلفظ می‌شود و در مرور هوشمند ثبت می‌گردد.",
  },
];

// ─── توابع خالص ───

/** واژهٔ کتاب → واژهٔ جدول: حذف پرانتزها + حروف بزرگ (مثل «commit (a crime)» → «COMMIT») */
function baseWordOf(word: string): string {
  return word.replace(/\s*\([^)]*\)\s*/g, " ").trim().toUpperCase();
}

/** استخر معتبر: پایه ۳..۹ حرف لاتینِ خالص (بدون فاصله) + حذف تکراری بر اساس پایه */
function validWordList(pool: VocabEntry[]): VocabEntry[] {
  const seen = new Set<string>();
  return pool.filter((w) => {
    const base = baseWordOf(w.word);
    if (!/^[A-Z]{3,9}$/.test(base)) return false;
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });
}

/** خانه‌های بین دو خانهٔ هم‌خط (سطر/ستون/قطر) — غیرهم‌خط = null */
function pathBetween(a: Cell, b: Cell): Cell[] | null {
  const dr = Math.sign(b.row - a.row);
  const dc = Math.sign(b.col - a.col);
  const aligned = a.row === b.row || a.col === b.col || Math.abs(b.row - a.row) === Math.abs(b.col - a.col);
  if (!aligned) return null;
  const cells: Cell[] = [{ row: a.row, col: a.col }];
  let r = a.row;
  let c = a.col;
  while (r !== b.row || c !== b.col) {
    r += dr;
    c += dc;
    cells.push({ row: r, col: c });
  }
  return cells;
}

/**
 * فاز G2-b — مسیر موقت درگ با snap به نزدیک‌ترین جهت مجاز (۸ جهت):
 * بردار حرکت (سطر/ستون) زاویه‌اش به نزدیک‌ترین ضریب ۴۵° گرد می‌شود و طول مسیر
 * تصویر بردار روی همان جهت است (حداقل ۱) — همیشه داخل جدول clamp می‌شود.
 * نتیجه هرگز null نیست؛ انحراف دست کاربر به نزدیک‌ترین جهت درست snap می‌شود.
 */
function dragPathBetween(from: Cell, to: Cell, size: number): Cell[] {
  const dr = to.row - from.row;
  const dc = to.col - from.col;
  if (dr === 0 && dc === 0) return [{ row: from.row, col: from.col }];
  const step = Math.PI / 4;
  const snapIdx = Math.round(Math.atan2(dr, dc) / step); // ‎-4..4
  const dirR = Math.round(Math.sin(snapIdx * step));
  const dirC = Math.round(Math.cos(snapIdx * step));
  // طول بر حسب «گام» — تصویر بردار روی جهت snap بر طول همان بردار گام (۱ یا √۲)
  let len = Math.round((dr * dirR + dc * dirC) / (dirR * dirR + dirC * dirC));
  if (len < 1) len = 1;
  const roomR = dirR > 0 ? size - 1 - from.row : dirR < 0 ? from.row : size - 1;
  const roomC = dirC > 0 ? size - 1 - from.col : dirC < 0 ? from.col : size - 1;
  len = Math.min(len, dirR === 0 ? roomC : dirC === 0 ? roomR : Math.min(roomR, roomC));
  const cells: Cell[] = [{ row: from.row, col: from.col }];
  for (let i = 1; i <= len; i++) {
    cells.push({ row: from.row + i * dirR, col: from.col + i * dirC });
  }
  return cells;
}

/**
 * فاز G2-b — سلول زیر نقطهٔ اشاره‌گر (برای درگ): با elementFromPoint و data-cell
 * سلول واقعی زیر انگشت پیدا می‌شود — برخلاف e.target، مقاوم به pointer-capture
 * ضمنی لمس و به فاصله‌های بین سلول‌ها است. فقط سمت کلاینت صدا زده می‌شود.
 */
function cellFromPoint(x: number, y: number): Cell | null {
  const el = document.elementFromPoint(x, y);
  const key = el?.closest("[data-cell]")?.getAttribute("data-cell");
  if (!key) return null;
  const [r, c] = key.split(":").map(Number);
  return Number.isFinite(r) && Number.isFinite(c) ? { row: r, col: c } : null;
}

/** ساخت پازل — تابع خالص؛ اگر کمتر از ۴ واژه جا شد از نو می‌سازد (تا ۱۰ بار) */
function generatePuzzle(words: PuzzleWord[], size: number): Puzzle {
  let last: Puzzle = { grid: [], placements: [] };
  for (let round = 0; round < 10; round++) {
    const p = buildOnce(words, size);
    last = p;
    if (p.placements.length >= 4) break;
  }
  return last;
}

/** یک دور ساخت جدول — واژه‌های جا نشده حذف می‌شوند */
function buildOnce(words: PuzzleWord[], size: number): Puzzle {
  const grid: (string | null)[][] = Array.from({ length: size }, () => Array<string | null>(size).fill(null));
  const placements: Placement[] = [];
  const sorted = words
    .filter((w) => w.base.length <= size) // واژه بلندتر از جدول هرگز جا نمی‌شود
    .sort((a, b) => b.base.length - a.base.length); // بلندها اول — شانس جا شدن بیشتر
  for (const w of sorted) {
    const L = w.base.length;
    for (let t = 0; t < 200; t++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      // بازهٔ مجاز نقطهٔ شروع برای این جهت — اگر خالی باشد واژه در این جهت جا نمی‌شود
      const rMin = dr === -1 ? L - 1 : 0;
      const rMax = dr === 1 ? size - L : size - 1;
      const cMin = dc === -1 ? L - 1 : 0;
      const cMax = dc === 1 ? size - L : size - 1;
      if (rMin > rMax || cMin > cMax) continue;
      const r0 = rMin + Math.floor(Math.random() * (rMax - rMin + 1));
      const c0 = cMin + Math.floor(Math.random() * (cMax - cMin + 1));
      // برخورد فقط با همان حرف مجاز است
      let ok = true;
      for (let i = 0; i < L; i++) {
        const cell = grid[r0 + i * dr][c0 + i * dc];
        if (cell !== null && cell !== w.base[i]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const cells: [number, number][] = [];
      for (let i = 0; i < L; i++) {
        const r = r0 + i * dr;
        const c = c0 + i * dc;
        grid[r][c] = w.base[i];
        cells.push([r, c]);
      }
      placements.push({ base: w.base, raw: w.raw, meaning: w.meaning, cells });
      break; // همین واژه جا شد — سراغ بعدی
    }
  }
  // خانه‌های خالی: ۵۰٪ حرف از خود واژه‌های پازل (استتار) + ۵۰٪ A-Z تصادفی
  const bag: string[] = [];
  for (const p of placements) {
    for (const ch of p.base) bag.push(ch);
  }
  const finalGrid: string[][] = grid.map((row) =>
    row.map((cell) => {
      if (cell !== null) return cell;
      if (bag.length > 0 && Math.random() < 0.5) return bag[Math.floor(Math.random() * bag.length)];
      return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }),
  );
  return { grid: finalGrid, placements };
}

// ─── کامپوننت ───

export function WordSearchGame() {
  const data = useBookData();
  const { bookId } = useBook();
  const bid = bookId ?? "vision-one"; // عملاً همیشه کتاب فعال است (بازی فقط داخل کتاب رندر می‌شود)

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(1);
  const [wordCount, setWordCount] = useState(6);
  const [size, setSize] = useState(8);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [clues, setClues] = useState<Placement[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<Cell | null>(null);
  const [popKeys, setPopKeys] = useState<string[] | null>(null);
  const [wrongKeys, setWrongKeys] = useState<string[] | null>(null);
  const [showWords, setShowWords] = useState(false);
  const [secs, setSecs] = useState(0);
  const [finalSecs, setFinalSecs] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);
  /** فاز G2-b — پیام باکس aria-live (اعلام انتخاب/یافتن/توقف برای فناوری‌های کمکی) */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز G2-b — تعداد انتخاب‌های غلط این دور (مبنای ستاره و «مرور خطاها») */
  const [wrongCount, setWrongCount] = useState(0);
  /** فاز G2-b — واژه‌های خطاخورده برای مرور انتهای دور (نگاشت مسیر غلط به واژه) */
  const [missedWords, setMissedWords] = useState<{ front: string; back: string }[]>([]);
  /** فاز G2-b — درگ فعال: سلول شروع + آخرین سلول زیر اشاره‌گر */
  const [drag, setDrag] = useState<DragState | null>(null);

  const startedAtRef = useRef(0);
  /** فاز G2-b — لحظهٔ شکار آخرین واژه (زمان دقیق دور؛ تأخیر پایان در آن حساب نمی‌شود) */
  const endedAtRef = useRef(0);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** فاز G2-b — تایمر پایان دور با تأخیر (پنجرهٔ انیمیشن pop آخرین واژه) */
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // فاز G2-b — وضعیت اشاره‌گر درگ: شناسهٔ اشاره‌گر فعال + کپچرشدن به container +
  // مهار کلیکِ همان ژستِ درگ (کلیک بعد از pointerUp نباید دوباره confirm کند)
  const gridRef = useRef<HTMLDivElement | null>(null);
  const activePointerRef = useRef<number | null>(null);
  const capturedRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const secsRef = useRef(0);
  const { speed } = useVoiceSpeed();

  // فاز G2-b — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا (الگوی پایلوت memory)
  // توقف خودکار در تب مخفی (useGamePause) — در بازگشت اورلی «متوقف شد» دیده می‌شود
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  // الگوی memory: state بی‌صدا + toggle در هندلر (بدون setState-in-effect)
  const [muted, setMuted] = useState(isSoundMuted());
  // فاز G2-b — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
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
  // فاز G2-b — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${wordCount}`;

  // استخر معتبر درس انتخابی + شمارندهٔ قابل‌شکار کل کتاب (برچسب چیپ)
  const candidates = useMemo(
    () => validWordList(lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson)),
    [data.vocab, lesson],
  );
  const allValidCount = useMemo(() => validWordList(data.vocab.all).length, [data.vocab]);

  // رکورد شخصی — اسنپ‌شات عددیِ پایدار (primitive) با الگوی match-game
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRecord>(bid, GAME_KEY, scope);
      return b && typeof b.time === "number" ? b.time : null;
    },
    () => null,
  );

  // تایمر — functional setState (بدون setState مستقیم در effect)
  // فاز G2-b — گیت روی paused: هنگام توقف (دستی یا خودکارِ تب مخفی) هیچ تیکی جلو نمی‌رود
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = window.setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, paused]);

  /** پاک‌سازی تایمرهای معلق دور (انیمیشن‌ها + پایان با تأخیر) */
  const clearRoundTimers = useCallback(() => {
    if (popTimer.current) clearTimeout(popTimer.current);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    if (finishTimer.current) clearTimeout(finishTimer.current);
  }, []);

  // cleanup: قطع تلفظ + تایمرهای معلق + ثبت «رهاشده» تله‌متری (فاز G2-b)
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      clearRoundTimers();
    };
  }, [clearRoundTimers]);

  /** شروع دور — ساخت پازل + ریست کامل وضعیت + جلسهٔ تازهٔ تله‌متری */
  const start = useCallback(() => {
    // اگر واژه‌های جاگیرنده به تعداد خواستی کافی بود از همان‌ها بگیر (برای ۸×۸ واژهٔ ۹حرفی بی‌فایده است)
    const fitting = candidates.filter((w) => baseWordOf(w.word).length <= size);
    const pool = fitting.length >= wordCount ? fitting : candidates;
    const chosen = pickUnique(pool, wordCount, (w) => baseWordOf(w.word)).map((w) => ({
      base: baseWordOf(w.word),
      raw: w.word,
      meaning: w.meaning,
    }));
    if (chosen.length < 4) {
      toast.error("واژهٔ قابل‌شکار کافی در این محدوده نیست — درس دیگری را امتحان کن");
      return;
    }
    const p = generatePuzzle(chosen, size);
    if (p.placements.length < 4) {
      toast.error("جدول با این تنظیمات ساخته نشد — اندازهٔ جدول یا درس را عوض کن");
      return;
    }
    clearRoundTimers();
    setPuzzle(p);
    setClues(shuffle(p.placements)); // ترتیب سرنخ‌ها بی‌ربط به ترتیب جای‌گذاری
    setFound(new Set());
    setSel(null);
    setPopKeys(null);
    setWrongKeys(null);
    setShowWords(false);
    setSecs(0);
    secsRef.current = 0;
    setFinalSecs(null);
    setIsRecord(false);
    setLiveMsg("");
    setWrongCount(0);
    setMissedWords([]);
    setDrag(null);
    activePointerRef.current = null;
    capturedRef.current = false;
    suppressClickUntilRef.current = 0;
    endedAtRef.current = 0;
    startedAtRef.current = Date.now();
    resume();
    setExitAsk(false);
    // فاز G2-b — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: scope,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [candidates, wordCount, size, scope, resume, clearRoundTimers]);

  /** پایان دور — استریک/جلسه/Attempt/رکورد (کمترین زمان) — الگوی کیت */
  const finish = useCallback(
    (foundCount: number) => {
      const total = puzzle?.placements.length ?? foundCount;
      // فاز G2-b — زمان واقعی دور (لحظهٔ شکار آخرین واژه، نه لحظهٔ فراخوانی با تأخیر)
      const finalTime = Math.max(
        1,
        Math.round(((endedAtRef.current || Date.now()) - (startedAtRef.current || Date.now())) / 1000),
      );
      setFinalSecs(finalTime);
      touchStreak();
      recordStudySession();
      bumpPlays(bid, GAME_KEY);
      // فاز G2-b — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      // فاز G2-b — بازخورد سه‌کانالهٔ پایان دور (الگوی پایلوت memory)
      playSound("finish");
      buzz("success");
      saveAttempt(bid, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: foundCount,
        duration: finalTime,
        detail: (puzzle?.placements ?? []).map((p) => ({ word: p.raw, ok: true })),
      });
      const prev = loadBest<BestRecord>(bid, GAME_KEY, scope);
      if (!prev || typeof prev.time !== "number" || finalTime < prev.time) {
        saveBest(bid, GAME_KEY, scope, { time: finalTime });
        setIsRecord(true);
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(total)} واژه در ${fmtTime(finalTime)} 🏆`);
      } else {
        toast.success(`همه شکار شدند — ${faNum(total)} واژه در ${fmtTime(finalTime)}! 🎯`);
      }
      setPhase("done");
    },
    [puzzle, bid, lesson, scope],
  );

  /**
   * فاز G2-b — هستهٔ مشترک تأیید انتخاب (هر دو مسیر کلیکِ دو-مرحله‌ای و درگ لمسی):
   * مسیر هم‌خط را با واژه‌های پیدانشده می‌سنجد — درست: pop + SRS + تلفظ + صدا؛
   * غلط: wrong/error + لرزش دو سر مسیر + شمارش خطا + نگاشت به واژهٔ مرور.
   */
  const confirmPath = useCallback(
    (cells: Cell[], viaDrag: boolean) => {
      if (!puzzle || paused) return;
      const { grid, placements } = puzzle;
      if (found.size >= placements.length) return; // دور در حال بستن است (پنجرهٔ تأخیر پایان)
      // انتخاب جدید هر لرزش قبلی را تمام می‌کند
      if (shakeTimer.current) {
        clearTimeout(shakeTimer.current);
        shakeTimer.current = null;
        setWrongKeys(null);
      }
      const str = cells.map((k) => grid[k.row][k.col]).join("");
      const rev = [...str].reverse().join("");
      const hit = placements.find((p) => !found.has(p.base) && (p.base === str || p.base === rev));
      if (hit) {
        const next = new Set(found);
        next.add(hit.base);
        const isLast = next.size >= placements.length;
        setFound(next);
        setSel(null);
        const keys = cells.map((k) => `${k.row}:${k.col}`);
        setPopKeys(keys);
        if (popTimer.current) clearTimeout(popTimer.current);
        popTimer.current = setTimeout(() => setPopKeys(null), 500);
        recordSRS(hit.raw, true); // کلید SRS = واژهٔ خام کتاب (سازگار با بقیهٔ اپ)
        speak(hit.base.toLowerCase(), { speed });
        // فاز G2-b — سه‌کانالهٔ یافتن واژه (صدا + لرزش + اعلام aria)
        if (isLast) {
          // همه یافت شدند — فانفار برد؛ پایان دور با تأخیر کوتاه (پس از انیمیشن pop)
          playSound("win");
          buzz("record");
          setLiveMsg(
            viaDrag
              ? `انتخاب: ${hit.base} — همه شکار شدند! 🎉`
              : `«${hit.base}» پیدا شد — همه شکار شدند! 🎉`,
          );
          endedAtRef.current = Date.now();
          if (finishTimer.current) clearTimeout(finishTimer.current);
          finishTimer.current = setTimeout(() => finish(next.size), FINISH_DELAY_MS);
        } else {
          playSound("correct");
          buzz("success");
          setLiveMsg(
            viaDrag
              ? `انتخاب: ${hit.base} — واژه پیدا شد! 🎉`
              : `«${hit.base}» پیدا شد! 🎉`,
          );
        }
      } else {
        // انتخاب غلط — فاز G2-b: صدا + لرزش + اعلام (سه‌کاناله)
        playSound("wrong");
        buzz("error");
        setWrongCount((n) => n + 1);
        setLiveMsg(
          viaDrag
            ? `انتخاب: ${str} — این واژه در فهرست نیست`
            : `«${str}» در فهرست واژه‌ها نیست — دوباره تلاش کن`,
        );
        // فاز G2-b — نگاشت خطا به واژهٔ مرور: اگر مسیر اشتباه بخشی از یک واژهٔ
        // پیدانشده بود (کاربر آن را ناقص به یاد داشته)، همان واژه برای «مرور خطاها»
        // صفحهٔ نتیجه ثبت می‌شود؛ وگرنه فقط شمارندهٔ خطا بالا می‌رود.
        const guess = [str, rev].find((s) => s.length >= 3);
        const target = guess
          ? placements.find((p) => !found.has(p.base) && p.base.includes(guess))
          : undefined;
        if (target) {
          setMissedWords((prev) =>
            prev.some((m) => m.front === target.raw)
              ? prev
              : [...prev, { front: target.raw, back: target.meaning }],
          );
        }
        // لرزش بصری روی دو سر مسیر غلط
        const first = cells[0];
        const last = cells[cells.length - 1];
        setWrongKeys([`${first.row}:${first.col}`, `${last.row}:${last.col}`]);
        setSel(null);
        shakeTimer.current = setTimeout(() => setWrongKeys(null), 600);
      }
    },
    [puzzle, paused, found, speed, finish],
  );

  /** مسیر کلیک دو-مرحله‌ای (موجود فاز ۳) — تأیید نهایی از confirmPath مشترک */
  const tapCell = useCallback(
    (row: number, col: number) => {
      if (!puzzle || paused) return;
      if (found.size >= puzzle.placements.length) return; // دور در حال بستن است
      // لمس جدید هر لرزش قبلی را تمام می‌کند
      if (shakeTimer.current) {
        clearTimeout(shakeTimer.current);
        shakeTimer.current = null;
        setWrongKeys(null);
      }
      // tap اول → شروع انتخاب
      if (!sel) {
        setSel({ row, col });
        return;
      }
      // tap روی همان خانه → لغو انتخاب
      if (sel.row === row && sel.col === col) {
        setSel(null);
        return;
      }
      // tap دوم غیرهم‌خط → تغییر شروع انتخاب (تجربهٔ روان)
      const cells = pathBetween(sel, { row, col });
      if (!cells) {
        setSel({ row, col });
        return;
      }
      confirmPath(cells, false);
    },
    [puzzle, paused, found.size, sel, confirmPath],
  );

  // ── فاز G2-b — درگ لمسی/ماوس (Pointer Events) روی شبکه ──
  // pointerDown روی سلول = شروع درگ (کلیک دو-مرحله‌ای دست نمی‌خورد: تپ ساده بدون
  // جابه‌جایی، confirm نمی‌شود و onClick خودش هندل می‌کند)؛ حرکت با elementFromPoint
  // روی container ردیابی و با اولین حرکتِ واقعی، اشاره‌گر به container کپچر می‌شود تا
  // رهاکردن بیرون شبکه هم دریافت شود؛ رهاکردن = ثبت مسیر snap‌شده با confirmPath مشترک.
  const onCellPointerDown = useCallback(
    (row: number, col: number, e: ReactPointerEvent<HTMLButtonElement>) => {
      if (paused || !puzzle) return;
      if (found.size >= puzzle.placements.length) return; // دور در حال بستن است
      activePointerRef.current = e.pointerId;
      capturedRef.current = false;
      suppressClickUntilRef.current = 0;
      // فاز G2-b — شروع درگ: بازخورد کلیک (صدا + لرزش)
      playSound("click");
      buzz("light");
      setDrag({ from: { row, col }, to: { row, col } });
    },
    [paused, puzzle, found.size],
  );

  const onGridPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag || activePointerRef.current !== e.pointerId) return;
      const cell = cellFromPoint(e.clientX, e.clientY);
      if (!cell || (cell.row === drag.to.row && cell.col === drag.to.col)) return;
      // اولین حرکت واقعی → کپچر به container تا حرکت/رهاکردن بیرون شبکه هم برسد
      if (!capturedRef.current) {
        try {
          gridRef.current?.setPointerCapture(e.pointerId);
          capturedRef.current = true;
        } catch {
          /* کپچر اختیاری است — مسیر داخل شبکه بدون آن هم کار می‌کند */
        }
      }
      setDrag((d) => (d ? { ...d, to: cell } : d));
    },
    [drag],
  );

  /** پایان درگ — confirm برای pointerUp/leave، cancel برای pointercancel */
  const endDrag = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, mode: "confirm" | "cancel") => {
      if (!drag || activePointerRef.current !== e.pointerId) return;
      const { from, to } = drag;
      activePointerRef.current = null;
      if (capturedRef.current) {
        try {
          gridRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
        capturedRef.current = false;
      }
      setDrag(null);
      if (mode !== "confirm") return;
      // تپ ساده (بدون ورود به سلول دیگر) — مسیر کلیک/کیبورد خودش هندل می‌کند
      if (from.row === to.row && from.col === to.col) return;
      // کلیکِ همان ژستِ درگ نباید دوباره confirm کند (هدف click بعد از pointerUp)
      suppressClickUntilRef.current = Date.now() + 600;
      confirmPath(dragPathBetween(from, to, size), true);
    },
    [drag, size, confirmPath],
  );

  // خانه‌های واژه‌های پیدا‌شده — برای رنگ‌آمیزی دائمی جدول
  const foundCellKeys = useMemo(() => {
    const s = new Set<string>();
    if (puzzle) {
      for (const p of puzzle.placements) {
        if (found.has(p.base)) {
          for (const [r, c] of p.cells) s.add(`${r}:${c}`);
        }
      }
    }
    return s;
  }, [puzzle, found]);

  // فاز G2-b — خانه‌های مسیر موقت درگ (هایلایت کهربایی تا رهاکردن)
  const dragCellKeys = useMemo(() => {
    const s = new Set<string>();
    if (drag && puzzle) {
      for (const c of dragPathBetween(drag.from, drag.to, size)) s.add(`${c.row}:${c.col}`);
    }
    return s;
  }, [drag, puzzle, size]);

  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center rounded-full border px-3.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // انصراف حین دور — فاز G2-b نگهبان خروج: با ≥۱ واژه یافته (یا انتخاب آغازشده)،
  // GameExitGuard؛ بدون هیچ پیشرفتی، خروج مستقیم + تله‌متری abandon
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (found.size > 0 || sel !== null) {
      setExitAsk(true);
    } else {
      clearRoundTimers();
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setPhase("setup");
    }
  }, [found.size, sel, clearRoundTimers, resume]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Search size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">شکار کلمه</h2>
                <p className="text-xs text-muted-foreground">
                  واژه‌های درس در جدول پنهان‌اند — با معنی فارسی شکارشان کن!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                انگشت یا ماوس را از حرف اول تا آخر واژه بکش و رها کن؛ یا اول حرف اول و بعد حرف آخر را
                بزن — افقی، عمودی یا مورب. سرنخ‌ها معنی فارسی‌اند.
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
                  کل کتاب ({faNum(allValidCount)} واژه)
                </button>
                {data.vocab.lessons
                  .filter((l) => l.lesson > 0)
                  .map((l) => (
                    <button
                      key={l.lesson}
                      type="button"
                      aria-pressed={lesson === l.lesson}
                      onClick={() => setLesson(l.lesson)}
                      className={chipCls(lesson === l.lesson)}
                    >
                      {l.label}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">چند واژه؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد واژه‌ها">
                {WORD_COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={wordCount === n}
                    onClick={() => setWordCount(n)}
                    className={chipCls(wordCount === n)}
                  >
                    {faNum(n)} واژه
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">اندازه جدول؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="اندازه جدول">
                {SIZE_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={size === n}
                    onClick={() => setSize(n)}
                    className={chipCls(size === n)}
                  >
                    {faNum(n)}×{faNum(n)}
                  </button>
                ))}
              </div>
            </div>

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                سریع‌ترین شکار: {fmtTime(best)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع شکار
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-b — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-b: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    // ستاره‌بندی per-game: بدون انتخاب غلط = ۳ / حداکثر ۲ خطا = ۲ / بیشتر = ۱
    // (دور فقط وقتی تمام می‌شود که همه واژه‌ها پیدا شده باشند)
    const stars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
    return (
      <ResultScreen
        title="همه شکار شدند!"
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongCount}
        reviewItems={missedWords}
        stats={[
          {
            label: "زمان",
            value: fmtTime(finalSecs ?? secs),
            icon: <Timer size={16} className="text-primary" />,
          },
          {
            label: "واژه",
            value: faNum(clues.length),
            icon: <Target size={16} className="text-teal-500" />,
          },
          {
            label: "خطا",
            value: faNum(wrongCount),
            icon: <XCircle size={16} className="text-amber-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  if (!puzzle) return null; // عملاً رخ نمی‌دهد — playing فقط بعد از ساخت پازل
  const { grid, placements } = puzzle;
  const pct = Math.round((found.size / Math.max(placements.length, 1)) * 100);

  return (
    <>
      {/* فاز G2-b — هدر یکنواخت از کیت (الگوی پایلوت memory) */}
      <GameShell
        title="شکار کلمه"
        icon={<Search size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(found.size)} / {faNum(placements.length)}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
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
            className={cn("space-y-4", paused && "pointer-events-none blur-sm")}
            aria-hidden={paused}
          >
            {/* dir=ltr تا ستون/سطر جدول در RTL جابه‌جا نشود · فاز G2-b: touch-none تا
                درگ لمسی اسکرول صفحه را بالا نکشد + select-none ضد انتخاب متن */}
            <div
              ref={gridRef}
              dir="ltr"
              aria-label="جدول حروف پنهان‌شده — با کشیدن روی حروف یا دو ضربه، واژه را انتخاب کن"
              className="mx-auto grid w-full max-w-md touch-none select-none gap-1 rounded-2xl border bg-card p-2 shadow-sm"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              onPointerMove={onGridPointerMove}
              onPointerUp={(e) => endDrag(e, "confirm")}
              onPointerCancel={(e) => endDrag(e, "cancel")}
              onPointerLeave={(e) => endDrag(e, "confirm")}
            >
              {grid.map((row, r) =>
                row.map((ch, c) => {
                  const key = `${r}:${c}`;
                  const isFound = foundCellKeys.has(key);
                  const isSelected = sel?.row === r && sel?.col === c;
                  const isDragPath = dragCellKeys.has(key);
                  const isWrong = wrongKeys?.includes(key) ?? false;
                  const isPop = popKeys?.includes(key) ?? false;
                  return (
                    <button
                      key={key}
                      type="button"
                      data-cell={`${r}:${c}`}
                      aria-label={`حرف ${ch} — ردیف ${faNum(r + 1)}، ستون ${faNum(c + 1)}`}
                      aria-pressed={isSelected || isDragPath}
                      onClick={() => {
                        // فاز G2-b — کلیکِ همان ژستِ درگ خورده شده (تأیید با pointerUp انجام شده)
                        if (Date.now() < suppressClickUntilRef.current) return;
                        tapCell(r, c);
                      }}
                      onPointerDown={(e) => onCellPointerDown(r, c, e)}
                      className={cn(
                        "aspect-square min-h-6 w-full cursor-pointer rounded-md border text-center font-en text-[11px] font-black transition-all sm:text-sm",
                        isFound
                          ? cn("border-primary/50 bg-primary/20 text-primary", isPop && "match-pop")
                          : isWrong
                            ? "match-shake border-destructive/70 bg-destructive/10 text-destructive"
                            : isSelected
                              ? "border-amber-500/70 bg-amber-500/15 ring-2 ring-amber-500"
                              : isDragPath
                                ? "border-amber-500/40 bg-amber-500/25" // فاز G2-b — هایلایت موقت مسیر درگ
                                : "border-transparent hover:border-primary/40",
                      )}
                    >
                      {ch}
                    </button>
                  );
                }),
              )}
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              با کشیدن انگشت/ماوس روی حروف واژه را شکار کن — یا اول حرف اول و بعد حرف آخر را بزن
              (با کیبورد: Tab و Enter)
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold">سرنخ‌ها (معنی فارسی)</p>
                <button
                  type="button"
                  aria-pressed={showWords}
                  onClick={() => setShowWords((v) => !v)}
                  className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Eye size={13} />
                  {showWords ? "پنهان‌کردن واژه‌ها" : "نمایش واژه‌ها"}
                </button>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {clues.map((p, i) => {
                  const done = found.has(p.base);
                  return (
                    <div
                      key={p.base}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border p-2 text-[11px] sm:text-xs",
                        done
                          ? "border-primary/30 bg-primary/5 text-muted-foreground line-through"
                          : "border-border bg-card",
                      )}
                    >
                      <span className="shrink-0 font-black text-amber-600 dark:text-amber-400">
                        {faNum(i + 1)}.
                      </span>
                      <span className="min-w-0 flex-1 truncate">{p.meaning}</span>
                      {showWords && (
                        <span dir="ltr" className="shrink-0 font-en font-black text-teal-600 dark:text-teal-400">
                          {p.base}
                        </span>
                      )}
                      {done && <CheckCircle2 size={13} className="shrink-0 text-primary" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* فاز G2-b — اورلی توقف (الگوی پایلوت memory): محتوا تار و غیرقابل‌تعامل */}
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

        {/* فاز G2-b — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G2-b — رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            clearRoundTimers();
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-b — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
