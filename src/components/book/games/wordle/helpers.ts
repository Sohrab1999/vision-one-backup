/**
 * توابع خالص «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * داور دو-گذرهٔ وردل (judgeVerdicts با احترام به حروف تکراری) + تاریخ/هش پایدار روزانه
 * (todayKey/shiftDate/hashStr) + کلاس رنگ و توضیح فارسی حکم (VERDICT_FACE/VERDICT_FA)
 * + چیدمان QWERTY کیبورد (KEY_ROWS) + ستاره‌بندی (starsFor). pad2 خصوصی می‌ماند.
 */

import type { Verdict } from "./types";

// ─── توابع خالص (module-scope) ───

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** تاریخ امروز به شکل YYYY-MM-DD (تقویم محلی — پایدار بین رفرش‌ها) */
export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** جابه‌جایی تقویمی تاریخ YYYY-MM-DD (بدون وابستگی به منطقهٔ زمانی) */
export function shiftDate(date: string, days: number): string {
  const parts = date.split("-").map(Number);
  const t = new Date(Date.UTC(parts[0], (parts[1] ?? 1) - 1, parts[2] ?? 1) + days * 86400000);
  return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
}

/** هش ساده و پایدار (djb2) برای انتخاب واژهٔ روز */
export function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * رنگ‌بندی دو-گذرهٔ وردل — گذر اول فقط سبزها را می‌شمارد، گذر دوم
 * زرد/خاکستری را با شمارش حروف باقی‌ماندهٔ پاسخ تعیین می‌کند
 * (پاسخ کلاسیک: answer "speed" × guess "erase" → Eسبز، Rخاکستری، Aخاکستری، Sسبز، Eزرد).
 * فاز G2-d — طول پارامتری شد (۴/۵/۶ حرفی).
 */
export function judgeVerdicts(guess: string, answer: string, len: number): Verdict[] {
  const res: Verdict[] = Array<Verdict>(len).fill("absent");
  const remaining: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    if (guess[i] === answer[i]) {
      res[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
    }
  }
  for (let i = 0; i < len; i++) {
    if (res[i] === "correct") continue;
    const ch = guess[i];
    if ((remaining[ch] ?? 0) > 0) {
      res[i] = "present";
      remaining[ch] -= 1;
    }
  }
  return res;
}

export const VERDICT_RANK: Record<Verdict, number> = { absent: 1, present: 2, correct: 3 };

/** کلاس رنگ هر حکم — سبز = emerald، زرد = amber، خاکستری = muted */
export const VERDICT_FACE: Record<Verdict, string> = {
  correct: "border-emerald-600 bg-emerald-600 text-white",
  present: "border-amber-500 bg-amber-500 text-amber-950",
  absent: "border-muted bg-muted text-muted-foreground",
};

/** توضیح فارسی هر حکم — برای aria-label سلول‌ها */
export const VERDICT_FA: Record<Verdict, string> = {
  correct: "سبز — جای درست",
  present: "زرد — حرف هست ولی جای دیگر",
  absent: "خاکستری — در واژه نیست",
};

/** چیدمان QWERTY کیبورد روی صفحه (dir=ltr) */
export const KEY_ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
];

/** ستاره‌بندی وردل (فاز G2-d — طبق تسک): برد در ≤۳ حدس = ۳، ≤۵ = ۲، دیرتر = ۱، باخت = ۱ */
export function starsFor(win: boolean, rowsUsed: number): number {
  if (!win) return 1;
  return rowsUsed <= 3 ? 3 : rowsUsed <= 5 ? 2 : 1;
}
