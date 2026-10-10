"use client";

/**
 * بازی «جدول کلمات متقاطع» (Crossword) — فاز ۴ نقشه راه جامع ۲۰۲۶.
 *
 * جدول به‌صورت خودکار از واژگان خود درس ساخته می‌شود: سرنخ هر واژه معنی فارسی است
 * و بازیکن حروف انگلیسی را با کیبورد فیزیکی یا ردیف دکمه‌های A-Z در سلول‌ها می‌نشاند.
 * - «بررسی»: حروف درست قفل می‌شوند (primary)، غلط‌ها با لرزش خالی می‌شوند
 * - «راهنما»: حرف سلول فعال آشکار می‌شود (+۱ راهنما — رکورد فقط بدون راهنما ثبت می‌شود)
 * - واژهٔ کامل درست: match-pop + تلفظ + سرنخ خط‌خورده با Badge سبز
 * - رکورد: سریع‌ترین حل (بدون راهنما) به تفکیک درس × تعداد واژه
 *
 * الگوریتم تولید (generateCrossword) export شده تا اسکریپت تست فشار مستقیم import کند.
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Delete,
  Lightbulb,
  PartyPopper,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Target,
  Timer,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";

// ─── الگوریتم تولید جدول متقاطع ───

export type CrosswordDir = "across" | "down";

/** ورودی تولید — واژهٔ uppercase انگلیسی + سرنخ فارسی */
export interface CrosswordEntry {
  word: string;
  meaning: string;
  lesson: number;
  lessonLabel: string;
}

/** یک سلول جدول — letter خالی یعنی خارج از همهٔ واژه‌ها (اسپیس‌ر) */
export interface CrosswordCell {
  letter: string;
  /** شمارهٔ سرنخ اگر این سلول آغاز یک واژه باشد */
  num: number | null;
  /** شناسهٔ واژهٔ افقی عبوری از این سلول */
  acrossId: number | null;
  /** شناسهٔ واژهٔ عمودی عبوری از این سلول */
  downId: number | null;
}

/** یک واژهٔ جای‌گذاری‌شده روی جدول (مختصات پس از برش bounding box) */
export interface CrosswordPlacement {
  id: number;
  word: string;
  meaning: string;
  lesson: number;
  lessonLabel: string;
  /** ردیف خانهٔ اول — ۰ از بالا */
  row: number;
  /** ستون خانهٔ اول — ۰ از چپ */
  col: number;
  dir: CrosswordDir;
  /** شمارهٔ استاندارد سرنخ جدول */
  num: number;
}

export interface CrosswordPuzzle {
  rows: number;
  cols: number;
  grid: CrosswordCell[][];
  placements: CrosswordPlacement[];
}

export interface GenerateOptions {
  /** حداقل واژهٔ جاگرفته برای قبول جدول (پیش‌فرض ۵) */
  minWords?: number;
  /** سقف تلاش با ترتیب‌های تصادفی (پیش‌فرض ۶۰) */
  maxTries?: number;
  /** سقف هر بُعد جدول (پیش‌فرض ۱۳) */
  maxSize?: number;
}

const cellKey = (r: number, c: number): string => `${r},${c}`;

const parseKey = (k: string): [number, number] => {
  const i = k.indexOf(",");
  return [Number(k.slice(0, i)), Number(k.slice(i + 1))];
};

/** خانهٔ jام یک جای‌گذاری روی بوم خام */
const draftCellKey = (p: { row: number; col: number; dir: CrosswordDir }, j: number): string =>
  p.dir === "across" ? cellKey(p.row, p.col + j) : cellKey(p.row + j, p.col);

/**
 * سازگاری یک جای‌گذاری را بررسی می‌کند:
 * - حرف‌های از قبل اشغال‌شده باید دقیقاً برابر باشند (حداکثر یک تقاطع)
 * - سلول قبل از آغاز و بعد از پایان واژه خالی باشد (واژه به واژهٔ دیگر نمی‌چسبد)
 * - برای سلول‌های غیرتقاطع، هر دو همسایهٔ عمود بر جهت واژه خالی باشند
 */
function canPlace(
  word: string,
  r0: number,
  c0: number,
  dir: CrosswordDir,
  cells: Map<string, string>,
): boolean {
  const dr = dir === "down" ? 1 : 0;
  const dc = dir === "across" ? 1 : 0;
  const len = word.length;
  if (cells.has(cellKey(r0 - dr, c0 - dc))) return false;
  if (cells.has(cellKey(r0 + dr * len, c0 + dc * len))) return false;
  let crossings = 0;
  for (let j = 0; j < len; j++) {
    const r = r0 + dr * j;
    const c = c0 + dc * j;
    const cur = cells.get(cellKey(r, c));
    if (cur !== undefined) {
      if (cur !== word[j] || crossings > 0) return false;
      crossings += 1;
    } else if (cells.has(cellKey(r - dc, c - dr)) || cells.has(cellKey(r + dc, c + dr))) {
      return false;
    }
  }
  return crossings === 1;
}

/** یک تلاش خام ساخت — خروجی روی بوم نامحدود با مختصات ممکن منفی */
interface BuildDraft {
  placed: { entry: CrosswordEntry; row: number; col: number; dir: CrosswordDir }[];
  minR: number;
  minC: number;
  maxR: number;
  maxC: number;
}

/** یک تلاش ساخت: واژهٔ اول افقی در مبدأ، هر واژهٔ بعدی در بهترین تقاطع یا حذف */
function tryBuild(entries: CrosswordEntry[], maxSize: number): BuildDraft | null {
  if (entries.length === 0) return null;
  const cells = new Map<string, string>();
  const placed: BuildDraft["placed"] = [];

  // واژهٔ اول افقی وسط بوم — بقیه در چهار جهت دورش رشد می‌کنند و برش آخر وسطش می‌گذارد
  const first = entries[0];
  for (let j = 0; j < first.word.length; j++) cells.set(cellKey(0, j), first.word[j]);
  placed.push({ entry: first, row: 0, col: 0, dir: "across" });
  let minR = 0;
  let maxR = 0;
  let minC = 0;
  let maxC = first.word.length - 1;

  for (let i = 1; i < entries.length; i++) {
    const word = entries[i].word;
    let best: BuildDraft["placed"][number] | null = null;
    let bestScore = Infinity;
    for (const [key, ch] of cells) {
      if (!word.includes(ch)) continue;
      const [r, c] = parseKey(key);
      for (let j = 0; j < word.length; j++) {
        if (word[j] !== ch) continue;
        for (const dir of ["across", "down"] as const) {
          const r0 = dir === "across" ? r : r - j;
          const c0 = dir === "across" ? c - j : c;
          if (!canPlace(word, r0, c0, dir, cells)) continue;
          const nMinR = Math.min(minR, r0);
          const nMinC = Math.min(minC, c0);
          const nMaxR = Math.max(maxR, dir === "across" ? r0 : r0 + word.length - 1);
          const nMaxC = Math.max(maxC, dir === "across" ? c0 + word.length - 1 : c0);
          if (nMaxR - nMinR + 1 > maxSize || nMaxC - nMinC + 1 > maxSize) continue;
          // کمترین ابعاد افزوده + کمی تصادف برای تنوع چیدمان
          const added = nMaxR - minR + nMaxC - minC;
          const score = added * 100 + Math.random() * 7;
          if (score < bestScore) {
            bestScore = score;
            best = { entry: entries[i], row: r0, col: c0, dir };
          }
        }
      }
    }
    if (best) {
      const w = best.entry.word;
      const dr = best.dir === "down" ? 1 : 0;
      const dc = best.dir === "across" ? 1 : 0;
      for (let j = 0; j < w.length; j++) {
        cells.set(cellKey(best.row + dr * j, best.col + dc * j), w[j]);
      }
      minR = Math.min(minR, best.row);
      minC = Math.min(minC, best.col);
      maxR = Math.max(maxR, best.dir === "down" ? best.row + w.length - 1 : best.row);
      maxC = Math.max(maxC, best.dir === "across" ? best.col + w.length - 1 : best.col);
      placed.push(best);
    }
    // واژه‌ای که هیچ تقاطع سازگاری ندارد حذف می‌شود
  }
  return { placed, minR, minC, maxR, maxC };
}

/** برش به bounding box + شماره‌گذاری استاندارد سرنخ‌ها (پیمایش ردیفی) */
function finalize(build: BuildDraft, maxSize: number): CrosswordPuzzle | null {
  const { placed, minR, minC, maxR, maxC } = build;
  const rows = maxR - minR + 1;
  const cols = maxC - minC + 1;
  if (rows > maxSize || cols > maxSize) return null;
  const grid: CrosswordCell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: CrosswordCell[] = [];
    for (let c = 0; c < cols; c++) row.push({ letter: "", num: null, acrossId: null, downId: null });
    grid.push(row);
  }
  const placements: CrosswordPlacement[] = placed.map((p, id) => ({
    id,
    word: p.entry.word,
    meaning: p.entry.meaning,
    lesson: p.entry.lesson,
    lessonLabel: p.entry.lessonLabel,
    row: p.row - minR,
    col: p.col - minC,
    dir: p.dir,
    num: 0,
  }));
  for (const p of placements) {
    for (let j = 0; j < p.word.length; j++) {
      const [r, c] = parseKey(draftCellKey(p, j));
      const cell = grid[r][c];
      cell.letter = p.word[j];
      if (p.dir === "across") cell.acrossId = p.id;
      else cell.downId = p.id;
    }
  }
  const startNums = new Map<string, number>();
  const starts = [...new Set(placements.map((p) => cellKey(p.row, p.col)))];
  starts.sort((a, b) => {
    const [r1, c1] = parseKey(a);
    const [r2, c2] = parseKey(b);
    return r1 - r2 || c1 - c2;
  });
  starts.forEach((k, i) => startNums.set(k, i + 1));
  for (const p of placements) {
    p.num = startNums.get(cellKey(p.row, p.col)) ?? 0;
    grid[p.row][p.col].num = p.num;
  }
  return { rows, cols, grid, placements };
}

/**
 * تولید جدول متقاطع از استخر واژه:
 * ۱) واژهٔ اول افقی وسط بوم ۲) هر واژهٔ بعدی در بهترین تقاطع (حرف مشترک + سازگاری
 * اطراف + کمترین ابعاد افزوده) ۳) واژه‌های جا نشده حذف ۴) اگر کمتر از minWords
 * واژه جا شد، با seed جدید تا maxTries بار تلاش و بهترین نتیجه برگردانده می‌شود.
 * جدول بزرگ‌تر از maxSize در هر بُعد رد می‌شود.
 */
export function generateCrossword(
  entries: CrosswordEntry[],
  opts: GenerateOptions = {},
): CrosswordPuzzle | null {
  const minWords = Math.max(opts.minWords ?? 5, 1);
  const maxTries = Math.max(opts.maxTries ?? 60, 1);
  const maxSize = Math.max(opts.maxSize ?? 13, 3);
  if (entries.length < minWords) return null;

  let bestPuzzle: CrosswordPuzzle | null = null;
  for (let t = 0; t < maxTries; t++) {
    const order = shuffle(entries);
    const build = tryBuild(order, maxSize);
    if (!build || build.placed.length < minWords) continue;
    const puzzle = finalize(build, maxSize);
    if (!puzzle) continue;
    if (
      !bestPuzzle ||
      puzzle.placements.length > bestPuzzle.placements.length ||
      (puzzle.placements.length === bestPuzzle.placements.length &&
        puzzle.rows * puzzle.cols < bestPuzzle.rows * bestPuzzle.cols)
    ) {
      bestPuzzle = puzzle;
    }
    if (puzzle.placements.length === entries.length) break; // همه واژه‌ها جا گرفتند
  }
  return bestPuzzle;
}

// ─── کامپوننت بازی ───

type Phase = "setup" | "playing" | "done";

/** شکل رکورد شخصی — بهتر = زمان کمتر (فقط بدون راهنما) */
interface BestRecord {
  time: number;
}

const ALL_LESSONS = -1;
const GAME_KEY = "crossword";
const COUNT_OPTIONS = [6, 8, 10];
/** گارد کیفیت جدول — کمتر از این تعداد واژهٔ جاگرفته پذیرفته نمی‌شود */
const MIN_PLACED = 5;
/** طول انیمیشن لرزش حروف غلط تا پاک‌شدن (ms) */
const SHAKE_MS = 650;
/** طول انیمیشن pop واژهٔ حل‌شده (ms) */
const POP_MS = 700;
/** مکث پیش از رفتن به فاز done تا pop واژهٔ آخر دیده شود (ms) */
const FINISH_MS = 900;

export function CrosswordGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(1);
  const [wordCount, setWordCount] = useState(6);

  const [puzzle, setPuzzle] = useState<CrosswordPuzzle | null>(null);
  /** حروف تایپ‌شده بازیکن — کلید «r,c» */
  const [letters, setLetters] = useState<Record<string, string>>({});
  /** سلول‌های تاییدشده (بررسی درست یا واژهٔ حل‌شده) — دیگر قابل ویرایش نیستند */
  const [locked, setLocked] = useState<Set<string>>(new Set());
  const [popKeys, setPopKeys] = useState<string[]>([]);
  const [shakeKeys, setShakeKeys] = useState<string[]>([]);
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [dir, setDir] = useState<CrosswordDir>("across");
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [hints, setHints] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  /** نگهبان خروج (فاز G0-06) — دیالوگ تأیید وقتی حداقل یک خانهٔ جدول پر شده است */
  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای شنوندهٔ کیبورد فیزیکی (بدون ثبت‌مجدد effect) */
  const exitAskRef = useRef(false);
  const setExitAskGuard = (open: boolean): void => {
    exitAskRef.current = open;
    setExitAsk(open);
  };

  const { speed } = useVoiceSpeed();
  const secsRef = useRef(0);
  /** آینهٔ سنکرون letters — ضد keydown پشت‌سرهم (حروف پشت‌هم گم نشوند) */
  const lettersRef = useRef<Record<string, string>>({});
  const timersRef = useRef<number[]>([]);

  /** setTimeout ثبت‌شده — در شروع دور و unmount پاک می‌شود */
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  // رکورد شخصی این اسکوپ — اسنپ‌شات رشته‌ای (الگوی memory-game)
  const bestScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${wordCount}`;
  const bestRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRecord>(activeBookId, GAME_KEY, bestScope);
      return b ? JSON.stringify(b) : null;
    },
    () => null,
  );
  const best = useMemo<BestRecord | null>(
    () => (bestRaw ? (JSON.parse(bestRaw) as BestRecord) : null),
    [bestRaw],
  );

  const cellsOf = (p: CrosswordPlacement): string[] => {
    const out: string[] = [];
    for (let j = 0; j < p.word.length; j++) out.push(draftCellKey(p, j));
    return out;
  };

  /** واژه‌هایی که با این حروف کامل و درست‌اند (از بین حل‌نشده‌ها) */
  const completionsIn = (lts: Record<string, string>, already: Set<number>): number[] => {
    if (!puzzle) return [];
    const out: number[] = [];
    for (const p of puzzle.placements) {
      if (already.has(p.id)) continue;
      let ok = true;
      for (let j = 0; j < p.word.length; j++) {
        if ((lts[draftCellKey(p, j)] ?? "") !== p.word[j]) {
          ok = false;
          break;
        }
      }
      if (ok) out.push(p.id);
    }
    return out;
  };

  const finish = (finalSecs: number, finalHints: number) => {
    const placed = puzzle?.placements.length ?? 0;
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    saveAttempt(activeBookId, GAME_KEY, {
      lesson: lesson === ALL_LESSONS ? 0 : lesson,
      total: placed,
      correct: placed,
      duration: finalSecs,
      detail: { hints: finalHints },
    });
    setSecs(finalSecs);
    if (finalHints === 0) {
      const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${wordCount}`;
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (!prev || finalSecs < prev.time) {
        saveBest(activeBookId, GAME_KEY, scope, { time: finalSecs });
        setIsRecord(true);
        toast.success(`رکورد جدید! جدول در ${fmtTime(finalSecs)} حل شد 🏆`);
      } else {
        toast.success(`جدول کامل شد — ${fmtTime(finalSecs)} 🎉`);
      }
    } else {
      toast.success(`جدول کامل شد — ${fmtTime(finalSecs)} با ${faNum(finalHints)} راهنما 🎉`);
    }
    setPhase("done");
  };

  /** ثبت واژه‌های تازه‌حل‌شده: قفل سلول‌ها + pop + تلفظ + پایان دور */
  const applySolved = (ids: number[], hCount: number) => {
    if (!puzzle) return;
    const cells: string[] = [];
    ids.forEach((id) => cells.push(...cellsOf(puzzle.placements[id])));
    setSolved((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
    setLocked((prev) => {
      const next = new Set(prev);
      cells.forEach((k) => next.add(k));
      return next;
    });
    setPopKeys(cells);
    later(() => setPopKeys([]), POP_MS);
    speak(puzzle.placements[ids[0]].word, { speed });
    if (solved.size + ids.length >= puzzle.placements.length) {
      later(() => finish(secsRef.current, hCount), FINISH_MS);
    }
  };

  const start = () => {
    const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    // گارد واژهٔ جدول‌پذیر: فقط حروف انگلیسی، طول ۳ تا ۹
    const valid = pool.filter((w) => /^[A-Za-z]{3,9}$/.test(w.word));
    const normalized = valid.map((w) => ({ ...w, word: w.word.toUpperCase() }));
    const chosen = pickUnique(normalized, wordCount, (w) => w.word);
    if (chosen.length < wordCount) {
      toast.error(
        `واژهٔ انگلیسی ۳ تا ۹ حرفیِ کافی پیدا نشد (${faNum(chosen.length)} از ${faNum(wordCount)}) — درس یا تعداد دیگری را امتحان کن`,
      );
      return;
    }
    const entries: CrosswordEntry[] = chosen.map((w) => ({
      word: w.word,
      meaning: w.meaning,
      lesson: w.lesson,
      lessonLabel: w.lessonLabel,
    }));
    const built = generateCrossword(entries, { minWords: MIN_PLACED, maxTries: 60, maxSize: 13 });
    if (!built || built.placements.length < MIN_PLACED) {
      toast.error("ساخت جدول متقاطع با این واژه‌ها ممکن نشد — دوباره شروع کن یا درس دیگری را انتخاب کن");
      return;
    }
    setPuzzle(built);
    lettersRef.current = {};
    setLetters({});
    setLocked(new Set());
    setPopKeys([]);
    setShakeKeys([]);
    setSolved(new Set());
    setHints(0);
    setSecs(0);
    secsRef.current = 0;
    setIsRecord(false);
    setDir("across");
    const startP = built.placements.find((p) => p.dir === "across") ?? built.placements[0];
    setActive({ r: startP.row, c: startP.col });
    setPhase("playing");
  };

  /** تایپ یک حرف در سلول فعال + پیشروی + تشخیص خودکار واژهٔ کامل درست */
  const typeLetter = (ch: string) => {
    if (!puzzle || !active || !activeWord) return;
    const up = ch.toUpperCase();
    if (!/^[A-Z]$/.test(up)) return;
    const key = cellKey(active.r, active.c);
    if (locked.has(key)) return;
    const next = { ...lettersRef.current, [key]: up };
    lettersRef.current = next;
    setLetters(next);

    const completed = completionsIn(next, solved);
    // قفل‌های پس از این تایپ — سلول‌های واژه‌های تازه‌حل‌شده هم رد می‌شوند
    const lockPlus = new Set(locked);
    completed.forEach((id) => cellsOf(puzzle.placements[id]).forEach((k) => lockPlus.add(k)));

    // پیشروی به بعدیِ آزاد در همان واژه
    const cells = cellsOf(activeWord);
    const idx = cells.indexOf(key);
    let target: string | null = null;
    for (let j = idx + 1; j < cells.length; j++) {
      if (!lockPlus.has(cells[j])) {
        target = cells[j];
        break;
      }
    }
    let jumpDir: CrosswordDir | null = null;
    if (completed.length > 0) {
      applySolved(completed, hints);
      // اگر مقصد داخل واژهٔ تازه‌حل‌شده قفل شد → اولین سلول آزادِ واژهٔ حل‌نشدهٔ بعدی
      if (!target || lockPlus.has(target)) {
        const unsolved = puzzle.placements.find(
          (p) => !solved.has(p.id) && !completed.includes(p.id),
        );
        const free = unsolved ? cellsOf(unsolved).find((k) => !lockPlus.has(k)) : undefined;
        if (free && unsolved) {
          target = free;
          jumpDir = unsolved.dir;
        }
      }
    }
    if (!target) return;
    const [tr, tc] = parseKey(target);
    if (jumpDir) {
      setDir(jumpDir);
    } else {
      const tcell = puzzle.grid[tr][tc];
      const okDir = dir === "across" ? tcell.acrossId !== null : tcell.downId !== null;
      if (!okDir) setDir(dir === "across" ? "down" : "across");
    }
    setActive({ r: tr, c: tc });
  };

  /** Backspace: پاک‌کردن سلول فعال، و اگر خالی بود پرش به سلول آزاد قبلی و پاک‌کردنش */
  const backspace = () => {
    if (!puzzle || !active || !activeWord) return;
    const key = cellKey(active.r, active.c);
    if (locked.has(key)) return;
    if (lettersRef.current[key]) {
      const next = { ...lettersRef.current };
      delete next[key];
      lettersRef.current = next;
      setLetters(next);
      return;
    }
    const cells = cellsOf(activeWord);
    const idx = cells.indexOf(key);
    for (let j = idx - 1; j >= 0; j--) {
      if (!locked.has(cells[j])) {
        const pk = cells[j];
        const next = { ...lettersRef.current };
        delete next[pk];
        lettersRef.current = next;
        setLetters(next);
        const [pr, pc] = parseKey(pk);
        setActive({ r: pr, c: pc });
        return;
      }
    }
  };

  /** راهنما: حرف سلول فعال (یا نزدیک‌ترین سلول نیازمند) آشکار می‌شود +۱ شمارش */
  const hint = () => {
    if (!puzzle) return;
    const isFree = (k: string) => !locked.has(k);
    const needsLetter = (k: string) => {
      const [r, c] = parseKey(k);
      return isFree(k) && lettersRef.current[k] !== puzzle.grid[r][c].letter;
    };
    let target: { key: string; dir: CrosswordDir } | null = null;
    if (active && activeWord) {
      const cur = cellKey(active.r, active.c);
      if (needsLetter(cur)) target = { key: cur, dir: activeWord.dir };
      else {
        const free = cellsOf(activeWord).find(needsLetter) ?? cellsOf(activeWord).find(isFree);
        if (free) target = { key: free, dir: activeWord.dir };
      }
    }
    if (!target) {
      const unsolved = puzzle.placements.find((p) => !solved.has(p.id));
      const free = unsolved ? cellsOf(unsolved).find(isFree) : undefined;
      if (free && unsolved) target = { key: free, dir: unsolved.dir };
    }
    if (!target) return;
    const [tr, tc] = parseKey(target.key);
    const next = { ...lettersRef.current, [target.key]: puzzle.grid[tr][tc].letter };
    lettersRef.current = next;
    setLetters(next);
    setHints((h) => h + 1);
    setDir(target.dir);
    setActive({ r: tr, c: tc });
    const completed = completionsIn(next, solved);
    if (completed.length > 0) applySolved(completed, hints + 1);
  };

  /** بررسی: حروف درست قفل، غلط‌ها لرزش و خالی */
  const check = () => {
    if (!puzzle) return;
    const wrong: string[] = [];
    const right: string[] = [];
    for (const [key, ch] of Object.entries(lettersRef.current)) {
      if (locked.has(key)) continue;
      const [r, c] = parseKey(key);
      const cell = puzzle.grid[r]?.[c];
      if (cell && cell.letter === ch) right.push(key);
      else wrong.push(key);
    }
    if (right.length > 0) {
      setLocked((prev) => {
        const next = new Set(prev);
        right.forEach((k) => next.add(k));
        return next;
      });
    }
    if (wrong.length > 0) {
      setShakeKeys(wrong);
      later(() => {
        setShakeKeys([]);
        const next = { ...lettersRef.current };
        wrong.forEach((k) => delete next[k]);
        lettersRef.current = next;
        setLetters(next);
      }, SHAKE_MS);
      toast.error(`${faNum(wrong.length)} حرف غلط پاک شد${right.length > 0 ? " — درست‌ها قفل شدند" : ""}`);
    } else if (right.length > 0) {
      toast.success(`${faNum(right.length)} حرف درست قفل شد`);
    } else {
      toast("چیزی برای بررسی وارد نشده");
    }
  };

  /** tap سلول: انتخاب؛ دوبار tap روی همان سلول = تغییر جهت */
  const onCellTap = (r: number, c: number) => {
    if (!puzzle) return;
    const cell = puzzle.grid[r][c];
    if (cell.acrossId === null && cell.downId === null) return;
    if (active && active.r === r && active.c === c) {
      if (cell.acrossId !== null && cell.downId !== null) {
        setDir((d) => (d === "across" ? "down" : "across"));
      }
      return;
    }
    setActive({ r, c });
    const curOk = dir === "across" ? cell.acrossId !== null : cell.downId !== null;
    if (!curOk) setDir(dir === "across" ? "down" : "across");
  };

  /** tap سرنخ: فعال‌سازی و هایلایت مسیر واژه */
  const focusWord = (p: CrosswordPlacement) => {
    const cells = cellsOf(p);
    const target = cells.find((k) => !locked.has(k)) ?? cells[0];
    const [r, c] = parseKey(target);
    setActive({ r, c });
    setDir(p.dir);
  };

  // واژهٔ فعال بر اساس سلول و جهت (اگر جهت در این سلول معتبر نباشد، جهت دیگر)
  // بدون useMemo دستی — React Compiler خودش memo می‌کند
  const activeWord: CrosswordPlacement | null = (() => {
    if (!puzzle || !active) return null;
    const cell = puzzle.grid[active.r]?.[active.c];
    if (!cell) return null;
    const primary = dir === "across" ? cell.acrossId : cell.downId;
    if (primary !== null) return puzzle.placements[primary];
    const other = dir === "across" ? cell.downId : cell.acrossId;
    return other !== null ? puzzle.placements[other] : null;
  })();

  // تایمر — بدون setState مستقیم در effect (react-hooks v6)؛ secsRef برای زمان دقیق پایان
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // cleanup کامل unmount: صدا + تایمرهای معلق
  useEffect(() => {
    return () => {
      stopSpeaking();
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // کیبورد فیزیکی — الگوی latest-ref: شنونده فقط با [phase] ثبت می‌شود و بدنهٔ آن
  // همیشه آخرین نسخهٔ توابع را صدا می‌زند (صفر setState در بدنهٔ effect)
  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    keyRef.current = (e: KeyboardEvent) => {
      if (exitAskRef.current) return; // نگهبان خروج — تایپ حروف حین دیالوگ تأیید خروج
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) typeLetter(e.key);
    };
  });
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Puzzle size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">جدول کلمات متقاطع</h2>
              <p className="text-xs text-muted-foreground">
                جدول از واژه‌های خود درس ساخته می‌شود — با سرنخ فارسی حروف را در خانه‌ها بنشین!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              معنی فارسی هر واژه را بخوان و حروفش را در جدول بگذار؛ روی خانه بزن تا جهت افقی/عمودی عوض شود.
              سریع‌ترین حلِ بدون راهنما = رکورد!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button
                type="button"
                onClick={() => setLesson(ALL_LESSONS)}
                aria-pressed={lesson === ALL_LESSONS}
                className={cn(
                  "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                  lesson === ALL_LESSONS
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                کل کتاب ({faNum(data.vocab.all.length)} واژه)
              </button>
              {data.vocab.lessons
                .filter((l) => l.lesson > 0)
                .map((l) => (
                  <button
                    key={l.lesson}
                    type="button"
                    onClick={() => setLesson(l.lesson)}
                    aria-pressed={lesson === l.lesson}
                    className={cn(
                      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      lesson === l.lesson
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">چند واژه؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد واژه‌ها">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setWordCount(n)}
                  aria-pressed={wordCount === n}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    wordCount === n
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {faNum(n)} واژه
                </button>
              ))}
            </div>
          </div>

          {best && (
            <Badge
              variant="outline"
              className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400"
            >
              <Trophy size={12} />
              سریع‌ترین حل: {fmtTime(best.time)} (بدون راهنما)
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
            <Play size={18} />
            ساخت جدول و شروع
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!puzzle) return null;

  // ── Done ──
  if (phase === "done") {
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">جدول کامل شد!</h2>
          <p className="text-xs text-muted-foreground">
            هر {faNum(puzzle.placements.length)} واژه سر جایش نشست — آفرین!
          </p>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}
          {hints > 0 && (
            <Badge
              variant="outline"
              className="border-amber-500/40 text-amber-600 dark:text-amber-400"
            >
              با {faNum(hints)} راهنما — رکورد فقط بدون راهنما ثبت می‌شود
            </Badge>
          )}
          <div className="grid w-full grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان حل</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(hints)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">راهنما</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={start} className="h-11 gap-2">
              <RotateCcw size={16} />
              جدول جدید
            </Button>
            <Button variant="outline" className="h-11" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  const activeKey = active ? cellKey(active.r, active.c) : null;
  const activeCells = activeWord ? cellsOf(activeWord) : [];
  const pct = Math.round((solved.size / Math.max(puzzle.placements.length, 1)) * 100);
  const acrossList = puzzle.placements.filter((p) => p.dir === "across").sort((a, b) => a.num - b.num);
  const downList = puzzle.placements.filter((p) => p.dir === "down").sort((a, b) => a.num - b.num);

  const clueButton = (p: CrosswordPlacement) => {
    const isSolved = solved.has(p.id);
    const isActiveWord = activeWord?.id === p.id;
    return (
      <button
        key={p.id}
        type="button"
        onClick={() => focusWord(p)}
        aria-pressed={isActiveWord}
        aria-label={`سرنخ ${faNum(p.num)} ${p.dir === "across" ? "افقی" : "عمودی"}: ${p.meaning}${isSolved ? " — حل شد" : ""}`}
        className={cn(
          "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-right text-[12px] leading-5 transition-all",
          isSolved
            ? "border-emerald-500/30 bg-emerald-500/8 text-muted-foreground"
            : isActiveWord
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-border/60 bg-card hover:bg-muted",
        )}
      >
        <span className="shrink-0 font-black text-primary">{faNum(p.num)}.</span>
        <span className={cn("flex-1 font-bold", isSolved && "line-through decoration-primary/60")}>
          {p.meaning}
        </span>
        <Badge
          variant="outline"
          className="shrink-0 border-teal-500/40 px-1.5 text-[9px] text-teal-600 dark:text-teal-400"
        >
          {p.lessonLabel}
        </Badge>
        {isSolved ? (
          <Badge className="shrink-0 gap-1 bg-emerald-500 px-1.5 text-[9px] text-emerald-950">
            <CheckCircle2 size={10} />
            {faNum(p.word.length)} حرف
          </Badge>
        ) : (
          <span className="shrink-0 text-[10px] text-muted-foreground">
            ({faNum(p.word.length)} حرف)
          </span>
        )}
      </button>
    );
  };

  return (
    <div role="group" aria-label="بازی جدول کلمات متقاطع" className="mx-auto max-w-2xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <CheckCircle2 size={11} className="text-primary" />
          {faNum(solved.size)} / {faNum(puzzle.placements.length)} واژه
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Lightbulb size={11} className="text-amber-500" />
          {faNum(hints)} راهنما
        </Badge>
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-11 text-[11px] text-muted-foreground"
            onClick={() => {
              // نگهبان خروج (فاز G0-06) — حداقل یک خانهٔ پرشده یعنی دور نیمه‌کاره است
              if (Object.keys(lettersRef.current).length > 0) {
                setExitAskGuard(true);
              } else {
                stopSpeaking();
                setPhase("setup");
              }
            }}
          >
            انصراف
          </Button>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* سرنخ جاری — بزرگ و خوانا بالای جدول */}
      {activeWord && (
        <div
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-3 py-2 text-[12px]"
        >
          <Badge variant="secondary" className="shrink-0 text-[10px]">
            {faNum(activeWord.num)}
          </Badge>
          <span className="flex-1 font-bold leading-5">{activeWord.meaning}</span>
          <Badge
            variant="outline"
            className="shrink-0 border-teal-500/40 text-[9px] text-teal-600 dark:text-teal-400"
          >
            {activeWord.lessonLabel}
          </Badge>
          <span dir="ltr" className="shrink-0 font-en text-[10px] text-muted-foreground">
            {activeWord.dir === "across" ? "ACROSS" : "DOWN"}
          </span>
        </div>
      )}

      {/* جدول — خانه‌های مربع؛ اسپیس‌رها بی‌مزه و غیرقابل کلیک */}
      <div className="mx-auto w-full max-w-md sm:max-w-lg">
        <div
          dir="ltr"
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))` }}
          role="grid"
          aria-label={`جدول متقاطع ${faNum(puzzle.rows)} در ${faNum(puzzle.cols)}`}
        >
          {puzzle.grid.map((row, r) =>
            row.map((cell, c) => {
              if (cell.acrossId === null && cell.downId === null) {
                return <div key={`s-${r}-${c}`} aria-hidden className="aspect-square rounded-[5px] bg-transparent" />;
              }
              const key = cellKey(r, c);
              const ch = letters[key] ?? "";
              const isLocked = locked.has(key);
              const isActive = activeKey === key;
              const inWord = activeCells.includes(key);
              const isPop = popKeys.includes(key);
              const isShake = shakeKeys.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onCellTap(r, c)}
                  aria-label={
                    (ch ? `حرف ${ch}` : `خانهٔ خالی${cell.num !== null ? ` — سرنخ ${faNum(cell.num)}` : ""}`) +
                    (isLocked ? " — تاییدشده" : "")
                  }
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-[5px] border font-en text-sm font-black uppercase transition-all sm:text-base",
                    isLocked
                      ? "border-primary bg-primary/85 text-primary-foreground"
                      : isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/40 ring-offset-1 ring-offset-background"
                        : inWord
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border/70 bg-muted/30 text-foreground",
                    isPop && "match-pop",
                    isShake && "match-shake border-destructive/60 bg-destructive/10",
                  )}
                >
                  {cell.num !== null && (
                    <span className="absolute left-0.5 top-0.5 text-[8px] font-bold leading-none text-muted-foreground">
                      {faNum(cell.num)}
                    </span>
                  )}
                  <span dir="ltr">{ch}</span>
                </button>
              );
            }),
          )}
        </div>
      </div>

      {/* سرنخ‌ها — زیر جدول؛ دسکتاپ دو ستونه */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-[13px] font-black">
            <ArrowRight size={14} className="text-primary" />
            افقی ({faNum(acrossList.length)})
          </p>
          {acrossList.map(clueButton)}
        </div>
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-[13px] font-black">
            <ArrowDown size={14} className="text-primary" />
            عمودی ({faNum(downList.length)})
          </p>
          {downList.map(clueButton)}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="h-11 flex-1 gap-1.5 text-[12px]" onClick={check}>
          <CheckCircle2 size={15} className="text-primary" />
          بررسی
        </Button>
        <Button
          variant="outline"
          className="h-11 flex-1 gap-1.5 border-amber-500/40 text-[12px] text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
          onClick={hint}
        >
          <Lightbulb size={15} />
          راهنما{hints > 0 ? ` (${faNum(hints)})` : ""}
        </Button>
      </div>

      {/* کیبورد روی صفحه — LTR */}
      <div dir="ltr" className="grid grid-cols-7 gap-1.5" role="group" aria-label="کیبورد حروف انگلیسی">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => typeLetter(ch)}
            aria-label={`حرف ${ch}`}
            className="font-en min-h-11 rounded-lg border border-border/70 bg-card text-[13px] font-black text-foreground transition-all hover:bg-muted active:scale-95"
          >
            {ch}
          </button>
        ))}
        <button
          type="button"
          onClick={backspace}
          aria-label="پاک کردن حرف"
          className="col-span-2 flex min-h-11 items-center justify-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 text-[11px] font-black text-amber-700 transition-all hover:bg-amber-500/20 dark:text-amber-400"
        >
          <Delete size={14} />
          Backspace
        </button>
      </div>

      {/* نگهبان خروج (فاز G0-06) — تأیید خروج وقتی جدول نیمه‌کاره است؛ Esc/کلیک بیرون = ادامهٔ بازی */}
      <AlertDialog open={exitAsk} onOpenChange={setExitAskGuard}>
        <AlertDialogContent>
          <AlertDialogHeader className="text-center sm:text-right">
            <AlertDialogTitle>برگردم به آزمایشگاه؟ 🎮</AlertDialogTitle>
            <AlertDialogDescription>
              جدول هنوز نیمه‌کاره‌ست — با خروج، پیشرفت این دور از دست می‌رود.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel className="min-h-11">نه، ادامه می‌دهم</AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80"
              onClick={() => {
                exitAskRef.current = false;
                setExitAsk(false);
                stopSpeaking();
                setPhase("setup");
              }}
            >
              آره، خروج
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
