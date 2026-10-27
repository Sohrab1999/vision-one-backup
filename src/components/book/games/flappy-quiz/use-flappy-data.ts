"use client";

/**
 * use-flappy-data — داده‌های مشتق «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی بلوک «داده‌های مشتق» از flappy-quiz-game.tsx (پلی‌بوک games/fps/README.md —
 * الگوی use-fps-prefs): بدنهٔ هوک بایت‌به‌بایت منتقل شده و پارامترها هم‌نام شناسه‌های قبلی‌اند
 * (data / easy / lesson / activeBookId) تا کد منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { BookData } from "@/data/books/types";
import { loadBest, subscribeGameData } from "../shared";
import { countWeak } from "../kit/smart-pick";
import { ALL_LESSONS, GAME_KEY, type BestRecord } from "./types";

interface FlappyDataInput {
  data: BookData;
  easy: boolean;
  lesson: number;
  activeBookId: string;
}

export function useFlappyData({ data, easy, lesson, activeBookId }: FlappyDataInput) {
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

  // فاز G3-05 — رکورد حالت بی‌پایان: scope افزودنی (الگوی تأییدشدهٔ وردل infinite:4)
  const bestEndless = useSyncExternalStore(
    subscribeGameData,
    () =>
      loadBest<BestRecord>(activeBookId, GAME_KEY, easy ? "easy:endless" : "normal:endless")?.score ??
      null,
    () => null,
  );

  // فاز G3-05 — شمارش کارت‌های ضعیف/سررسید/نو استخر برای پیام setup (انتخاب هوشمند G3-02)
  const weakCount = useSyncExternalStore(
    subscribeGameData,
    () => countWeak(pool, (q) => q.text),
    () => 0,
  );
  return { vocabSeed, lessons, countFor, pool, meaningOf, best, bestEndless, weakCount };
}
