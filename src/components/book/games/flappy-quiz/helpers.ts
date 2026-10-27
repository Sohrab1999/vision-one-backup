/**
 * کمکی‌های خالص «فلپی گزینش» (گام ۹ — تفکیک مکانیکی از flappy-quiz-game.tsx — پلی‌بوک fps/):
 * برچسب فارسی درس/سؤال + چیدمان عمودی دهانه‌های دیوار (قاعدهٔ سقف‌دار gapCap) — بدون اثر جانبی.
 */

import { faNum } from "../shared";
import { GROUND_H, H } from "./types";

// ─── کمکی‌های خالص ───

/** نمایش جای خالی سؤال به شکل فشرده: «________» → «.....» */
export function qLabel(text: string): string {
  return text.replace(/_+/g, ".....");
}

export function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

/** چیدمان عمودی k دهانه در باند بازی‌پذیر — ارتفاع دهانه سقف‌دار، مازاد به دیواره‌ها می‌رود */
export function layoutGaps(k: number): Array<{ y0: number; y1: number }> {
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
