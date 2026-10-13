// ─── الگوریتم تولید جدول متقاطع ───

import { shuffle } from "../shared";

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

export const cellKey = (r: number, c: number): string => `${r},${c}`;

export const parseKey = (k: string): [number, number] => {
  const i = k.indexOf(",");
  return [Number(k.slice(0, i)), Number(k.slice(i + 1))];
};

/** خانهٔ jام یک جای‌گذاری روی بوم خام */
export const draftCellKey = (p: { row: number; col: number; dir: CrosswordDir }, j: number): string =>
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

export const cellsOf = (p: CrosswordPlacement): string[] => {
  const out: string[] = [];
  for (let j = 0; j < p.word.length; j++) out.push(draftCellKey(p, j));
  return out;
};
