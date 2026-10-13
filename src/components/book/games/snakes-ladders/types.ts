/**
 * تایپ‌ها و ثابت‌های «مار و پله واژگانی» — تفکیک مکانیکی از snakes-ladders-game.tsx
 * (گام ۸ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, type LucideIcon } from "lucide-react";

export const GAME_KEY = "snakes-ladders";
export const ALL_LESSON = -1;
export const MIN_POOL = 5;
/** مدت هر پلهٔ حرکت مهره (ms) — هم‌زمان با transition هر گام */
export const STEP_MS = 120;
/** مدت سُرش واحد مار/پله (ms) — یک transition طولانی به مقصد */
export const JUMP_MS = 520;
/** تأخیر «فکر کردن» ربات (ms) */
export const BOT_DELAY = 900;
/** احتمال پاسخ درست ربات (۶۵٪ — پیش‌فرض G5-03 وقتی دادهٔ تطبیقی کافی نیست) */
export const BOT_SKILL = 0.65;
/**
 * فاز G5-03 — ربات تطبیقی (قاعده‌محور، بدون AI):
 * نرخ برد کاربر w ∈ [0,1] → مهارت ربات s = clamp(0.35, 0.9, 0.65 + (w − 0.5) × 0.6)
 * بازیکنی که همیشه می‌برد ربات قوی‌تر (تا ۰٫۹) و بازیکنی که همیشه می‌بازد ربات ضعیف‌تر
 * (تا ۰٫۳۵) می‌گیرد — کشش برد/باخت کاربر به ~۵۰٪. دادهٔ <۳ دور → همان BOT_SKILL.
 */
export const BOT_SKILL_MIN = 0.35;
export const BOT_SKILL_MAX = 0.9;
/** حداقل دورهای دارای داده برای فعال‌شدن تطبیق */
export const ADAPTIVE_MIN_ROUNDS = 3;

/** تعداد چرخش تصادفی تاس قبل از ثابت‌شدن عدد نهایی */
export const DICE_FLIPS = 5;

/** مارها: سر → دُم */
export const SNAKES: Record<number, number> = { 16: 6, 48: 30, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
/** پله‌ها: پایین → بالا */
export const LADDERS: Record<number, number> = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91 };

export type Phase = "setup" | "playing" | "done";
export type Mode = "hotseat" | "bot";
export type CatKey = "all" | "vocabulary" | "grammar";

export interface Player {
  name: string;
  isBot: boolean;
  /** اندیس رنگ مهره در TOKEN_BG */
  ci: number;
}

export interface PStats {
  asked: number;
  correct: number;
  wrong: number;
}

/** سفر یک بازیکن روی تخته — مبنای ستاره‌بندی صفحهٔ نتیجه (پله ‎+۱، مار ‎−۱) */
export interface Journey {
  up: number;
  down: number;
}

/** شکل رکورد شخصی — سریع‌ترین پیروزی (ثانیه؛ کمتر = بهتر) */
export interface BestRecord {
  time: number;
}

/** رنگ مهرهٔ هر بازیکن — بازیکن چهارم muted-foreground (قاعدهٔ پالت پروژه) */
export const TOKEN_BG = ["bg-emerald-500", "bg-amber-500", "bg-teal-500", "bg-muted-foreground"] as const;

export const DICE_ICONS: Record<number, LucideIcon> = { 1: Dice1, 2: Dice2, 3: Dice3, 4: Dice4, 5: Dice5, 6: Dice6 };
