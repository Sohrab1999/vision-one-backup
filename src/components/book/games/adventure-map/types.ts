/**
 * تایپ‌ها/ثابت‌های «نقشه ماجراجویی» — تفکیک مکانیکی از adventure-map-game.tsx
 * (گام ۷ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

import { Headphones, Link2, ListChecks, Shuffle, type LucideIcon } from "lucide-react";

export type Phase = "setup" | "map" | "challenge" | "done";

/** انواع مینی‌چالش — چرخهٔ ۴تایی که هر دور با ترتیب تصادفی دو بار تکرار می‌شود */
export type StageType = 0 | 1 | 2 | 3;

export const GAME_KEY = "adventure-map";
export const ALL_LESSONS = -1;
export const TOTAL_STAGES = 8;
export const MAX_STARS = 24;
/** ترتیب پیش‌فرض چرخه — فقط برای ذخیره‌های قدیمی بدون «order» */
export const DEFAULT_ORDER: StageType[] = [0, 1, 2, 3, 0, 1, 2, 3];

export const STAGE_META: { label: string; icon: LucideIcon }[] = [
  { label: "آزمون واژه", icon: ListChecks },
  { label: "حروف جابه‌جا", icon: Shuffle },
  { label: "جفت‌سازی", icon: Link2 },
  { label: "شنیداری", icon: Headphones },
];

/** فقط واژه‌های تک‌کلمه‌ای لاتینِ ۳ تا ۱۲ حرفی وارد چالش حروف جابه‌جا می‌شوند */
export const WORD_RE = /^[A-Za-z]{3,12}$/;

export interface QuizQ {
  word: string;
  meaning: string;
  options: string[];
  answer: number;
}

/** حرف با شناسه یکتا — حروف تکراری مستقل مدیریت می‌شوند (ایندکس‌محور) */
export interface Tile {
  id: number;
  letter: string;
}

export interface MatchCard {
  id: number;
  side: "en" | "fa";
  word: string;
  meaning: string;
}

/** شکل رکورد شخصی — مجموع ستارهٔ دور کامل (از ۲۴) */
export interface BestRec {
  score: number;
}

/** پیشرفت ذخیره‌شدهٔ ماجراجویی در localStorage */
export interface AdventureProgress {
  stars: number[];
  done: boolean[];
  /** ترتیب چالش‌های این دور — برای سازگاری نقشه بعد از رفرش */
  order?: StageType[] | null;
}

/** وضعیت مینی‌چالش جاری — هر نوع، فیلدهای خودش را پر می‌کند */
export interface ChallengeState {
  idx: number;
  type: StageType;
  errors: number;
  questions: QuizQ[];
  qIdx: number;
  picked: number | null;
  word: string;
  meaning: string;
  tiles: Tile[];
  slots: (number | null)[];
  shake: boolean;
  cards: MatchCard[];
  sel: number | null;
  matchedIds: number[];
  wrongIds: number[];
  saidIds: number[];
  resultStars: number | null;
  /** فاز G2-e — زمان همین مرحله (ثانیه) برای stats نتیجهٔ per-مرحله (افزودنی) */
  timeSecs: number;
  /** فاز G2-e — واژه‌های خطاخوردهٔ همین مرحله برای «مرور خطاها»ی ResultScreen (افزودنی) */
  missed: { front: string; back: string }[];
}
