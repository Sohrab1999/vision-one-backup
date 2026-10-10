"use client";

/**
 * بازی «شکار کلمه» (Word Search) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * جدول حروف انگلیسی با واژه‌های پنهانِ درس؛ سرنخ = معنی فارسی.
 * انتخاب tap-tap موبایل‌پسند: اول حرف اول، بعد حرف آخر — افقی، عمودی یا مورب
 * (هر دو جهت پذیرفته می‌شود). هر شکارِ درست تلفظ را پخش می‌کند و در SRS ثبت می‌شود.
 * رکورد = کمترین زمان؛ اسکوپ رکورد: `${درس}:${تعداد واژه}`.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Search,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  Eye,
  Sparkles,
  PartyPopper,
  LayoutGrid,
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

// ─── تایپ‌ها ───

type Phase = "setup" | "playing" | "done";

/** یک خانه جدول */
interface Cell {
  row: number;
  col: number;
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
  const startedAtRef = useRef(0);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { speed } = useVoiceSpeed();

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

  // تایمر — فقط interval functional (بدون setState مستقیم در effect)
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // cleanup: قطع تلفظ + پاک‌سازی تایمرهای انیمیشن
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (popTimer.current) clearTimeout(popTimer.current);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    };
  }, []);

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
    setPuzzle(p);
    setClues(shuffle(p.placements)); // ترتیب سرنخ‌ها بی‌ربط به ترتیب جای‌گذاری
    setFound(new Set());
    setSel(null);
    setPopKeys(null);
    setWrongKeys(null);
    setShowWords(false);
    setSecs(0);
    setFinalSecs(null);
    setIsRecord(false);
    startedAtRef.current = Date.now();
    setPhase("playing");
  }, [candidates, wordCount, size]);

  const finish = useCallback(
    (foundCount: number) => {
      const total = puzzle?.placements.length ?? foundCount;
      const finalTime = Math.max(1, Math.round((Date.now() - (startedAtRef.current || Date.now())) / 1000));
      setFinalSecs(finalTime);
      touchStreak();
      recordStudySession();
      bumpPlays(bid, GAME_KEY);
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
      }
      toast.success(`همه شکار شدند — ${faNum(total)} واژه در ${fmtTime(finalTime)}! 🎯`);
      setPhase("done");
    },
    [puzzle, bid, lesson, scope],
  );

  const tapCell = useCallback(
    (row: number, col: number) => {
      if (!puzzle) return;
      const { grid, placements } = puzzle;
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
      const str = cells.map((k) => grid[k.row][k.col]).join("");
      const rev = [...str].reverse().join("");
      const hit = placements.find((p) => !found.has(p.base) && (p.base === str || p.base === rev));
      if (hit) {
        const next = new Set(found);
        next.add(hit.base);
        setFound(next);
        setSel(null);
        const keys = cells.map((k) => `${k.row}:${k.col}`);
        setPopKeys(keys);
        if (popTimer.current) clearTimeout(popTimer.current);
        popTimer.current = setTimeout(() => setPopKeys(null), 500);
        recordSRS(hit.raw, true); // کلید SRS = واژهٔ خام کتاب (سازگار با بقیهٔ اپ)
        speak(hit.base.toLowerCase(), { speed });
        if (next.size >= placements.length) finish(next.size);
      } else {
        // لرزش روی دو سر مسیر غلط
        setWrongKeys([`${sel.row}:${sel.col}`, `${row}:${col}`]);
        setSel(null);
        shakeTimer.current = setTimeout(() => setWrongKeys(null), 600);
      }
    },
    [puzzle, sel, found, speed, finish],
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

  const chipCls = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
    return (
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
            <p>روی حرف اول بزن و بعد روی حرف آخر — افقی، عمودی یا مورب. سرنخ‌ها معنی فارسی‌اند.</p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
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
    );
  }

  // ── Done ──
  if (phase === "done") {
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">همه شکار شدند!</h2>
          {isRecord ? (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          ) : best !== null ? (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              سریع‌ترین شکار: {fmtTime(best)}
            </Badge>
          ) : null}

          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(finalSecs ?? 0)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(clues.length)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">واژه</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <LayoutGrid size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">
                {faNum(size)}×{faNum(size)}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">جدول</p>
            </div>
          </div>

          <div className="w-full space-y-1.5 text-right">
            <p className="text-[12px] font-bold text-muted-foreground">واژه‌های این دور:</p>
            <div className="max-h-44 space-y-1.5 overflow-y-auto pl-1">
              {clues.map((p) => (
                <div
                  key={p.base}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs"
                >
                  <CheckCircle2 size={13} className="shrink-0 text-primary" />
                  <span dir="ltr" className="shrink-0 font-en font-black">
                    {p.raw}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">{p.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={start} className="gap-2">
              <RotateCcw size={16} />
              شکار جدید
            </Button>
            <Button variant="outline" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  if (!puzzle) return null; // عملاً رخ نمی‌دهد — playing فقط بعد از ساخت پازل
  const { grid, placements } = puzzle;
  const pct = Math.round((found.size / Math.max(placements.length, 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <CheckCircle2 size={11} className="text-primary" />
          {faNum(found.size)} / {faNum(placements.length)}
        </Badge>
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPhase("setup")}
            className="text-[11px] text-muted-foreground"
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

      {/* dir=ltr تا ستون/سطر جدول در RTL جابه‌جا نشود */}
      <div
        dir="ltr"
        aria-label="جدول حروف پنهان‌شده"
        className="mx-auto grid w-full max-w-md gap-1 rounded-2xl border bg-card p-2 shadow-sm"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {grid.map((row, r) =>
          row.map((ch, c) => {
            const key = `${r}:${c}`;
            const isFound = foundCellKeys.has(key);
            const isSelected = sel?.row === r && sel?.col === c;
            const isWrong = wrongKeys?.includes(key) ?? false;
            const isPop = popKeys?.includes(key) ?? false;
            return (
              <button
                key={key}
                type="button"
                aria-label={`ردیف ${faNum(r + 1)} ستون ${faNum(c + 1)} حرف ${ch}`}
                aria-pressed={isSelected}
                onClick={() => tapCell(r, c)}
                className={cn(
                  "aspect-square min-h-6 w-full rounded-md border text-center font-en text-[11px] font-black transition-all sm:text-sm",
                  isFound
                    ? cn("border-primary/50 bg-primary/20 text-primary", isPop && "match-pop")
                    : isWrong
                      ? "match-shake border-destructive/70 bg-destructive/10 text-destructive"
                      : isSelected
                        ? "border-amber-500/70 bg-amber-500/15 ring-2 ring-amber-500"
                        : "border-transparent hover:border-primary/40",
                )}
              >
                {ch}
              </button>
            );
          }),
        )}
      </div>

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
                <span className="shrink-0 font-black text-amber-600 dark:text-amber-400">{faNum(i + 1)}.</span>
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
  );
}
