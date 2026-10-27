/**
 * تایپ‌های «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

export type Phase = "setup" | "playing" | "done";
export type Mode = "daily" | "infinite";
/** فاز G2-d — طول واژهٔ حالت بی‌نهایت (روزانه همیشه ۵) */
export type WordLevel = 4 | 5 | 6;
/** حکم یک حرف بعد از ارسال حدس */
export type Verdict = "correct" | "present" | "absent";

/** وضعیت بازی روزانهٔ یک کتاب — در `visionone:wordle-daily:{bookId}` */
export interface DailyState {
  date: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

/** زنجیرهٔ برد پیاپی روزانه — در `visionone:wordle-streak:{bookId}` */
export interface DailyStreakState {
  /** تاریخ آخرین برد روزانه */
  date: string;
  streak: number;
}

/** رکورد بی‌نهایت — کمترین حدسِ برد */
export interface BestMoves {
  moves: number;
}

/** رکورد روزانه — طولانی‌ترین زنجیرهٔ برد پیاپی */
export interface BestScore {
  score: number;
}

/** اسنپ‌شات رکوردها برای نماها — اسکوپ ۵حرفی همان "infinite" قبلی است (سازگاری کلیدها) */
export interface MetaSnapshot {
  infBest: BestMoves | null;
  infBest4: BestMoves | null;
  infBest6: BestMoves | null;
  dailyBest: BestScore | null;
  streak: DailyStreakState | null;
}
