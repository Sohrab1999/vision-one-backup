/**
 * تایپ‌های مشترک آزمون تعاملی — تفکیک مکانیکی از quiz-game.tsx
 * (گام ۴ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

export interface Question {
  id: string;
  category: string;
  lesson: number;
  scope: string;
  text: string;
  options: string[];
  answer: number;
  level: string;
  explanation: string | null;
}

/** سؤال مشابهٔ تولیدشده با هوش مصنوعی — کارت بونس تمرین بی‌پایان */
export interface SimilarBonus {
  text: string;
  options: string[];
  answer: number;
  note: string;
}

export type Phase = "setup" | "playing" | "result";
export type Mode = "normal" | "review" | "daily" | "weekly" | "starred" | "combined";

export interface PoolMeta {
  total: number;
  byLevel: Record<string, number>;
  byCategory: Record<string, number>;
}
