"use client";

import { faNum } from "../shared";
import type { Mode } from "./types";

export function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

export function qLabel(text: string): string {
  return text.replace(/_+/g, "......");
}

export function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

export function scopeOf(mode: Mode, tap: boolean): string {
  return `${mode === "word-hunt" ? "word" : "grammar"}${tap ? "-tap" : ""}`;
}

export function modeName(mode: Mode): string {
  return mode === "word-hunt" ? "شکار واژه" : "سد گرامری";
}

/** فاز T1 — رتبهٔ نظامی پایان مأموریت (دقت + امتیاز) */
export function missionRank(acc: number, score: number): { grade: string; title: string } {
  if (acc >= 95 && score >= 220) return { grade: "S", title: "تک‌تیرانداز افسانه‌ای" };
  if (acc >= 90) return { grade: "A", title: "تک‌تیرانداز" };
  if (acc >= 75) return { grade: "B", title: "سرباز زبده" };
  if (acc >= 55) return { grade: "C", title: "مأمور میدانی" };
  return { grade: "D", title: "تازه‌کار" };
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** فاز F3 — خروج امن از تمام‌صفحه (کمکی ماژول‌سطح — قبل از دیالوگ‌های portal-body هم لازم است) */
export function dropFullscreen(): void {
  try {
    if (document.fullscreenElement) void document.exitFullscreen();
  } catch {
    /* noop */
  }
}
