"use client";

/**
 * telemetry — «حافظهٔ میدان»: شمارندهٔ رویدادهای دشمن برای Attempt detail (فاز U8 — نقشهٔ docs/fps-upgrade-roadmap.md).
 *
 * ماژول خالص: صفر وابستگی به React/THREE — فقط شمارنده و رُند. مانند enemy.ts/los.ts اینجا فقط
 * «تصمیم و شمارش» گرفته می‌شود؛ سیم‌کشی رویدادها در index.tsx می‌ماند (پلی‌بوک games/fps/README.md).
 *
 * قوانین سخت سند §U8:
 * ② فقط افزودنی — شش شمارندهٔ تخت (بدون تو در تو) در Attempt detail می‌روند؛ هیچ کلیدی تغییر نمی‌کند
 * ③ شمارش فقط روی رویداد گسسته — این ماژول هیچ تایمری ندارد؛ وزن تیک پناهگری = دورهٔ interval ۲۰۰ms کیت
 * ⑧ dedup فاز با حافظهٔ داخلی prev — در برابر فراخوانی تکراری مقاوم؛ idle/patrol هرگز شمرده نمی‌شوند
 */

import type { EnemyPhase } from "./enemy";

/** وزن هر تیک پناهگری — برابر دورهٔ interval رویدادگسستهٔ کیت (۲۰۰ میلی‌ثانیه) */
export const HIDDEN_TICK_S = 0.2;

/** snapshot تخت Attempt detail — گریپ/پارس ساده، بدون تو در تو (قانون ② §U8) */
export interface EnemyTelemetrySnapshot {
  /** تعداد شروع تعقیب (گذار به stalk) — «پهپاد چند بار بازیکن را شناسایی کرد» */
  enemyStalks: number;
  /** تعداد شروع شارژ تله‌گراف قفس (گذار به charge) — بیشتر از پرتاب‌ها = دفاع مؤثر بازیکن */
  enemyCharges: number;
  /** تعداد گریز پس از برخورد گلوله (گذار به flee) */
  enemyFlees: number;
  /** تعداد گم‌کردن رد (پرچم enemyLost U3) — موفقیت پنهانی بازیکن */
  enemyLost: number;
  /** جمع ثانیهٔ پناهگیری واقعی (چیپ «پوشیده» روشن — debounce دوتایی U3) */
  enemyHiddenS: number;
  /** تعداد لغو شارژ رئیس با شلیک (U4 — دفاع فعال در نبرد رئیس) */
  bossInterrupts: number;
}

function emptySnapshot(): EnemyTelemetrySnapshot {
  return {
    enemyStalks: 0,
    enemyCharges: 0,
    enemyFlees: 0,
    enemyLost: 0,
    enemyHiddenS: 0,
    bossInterrupts: 0,
  };
}

/**
 * کارخانهٔ شمارندهٔ رویدادهای دشمن — یک نمونه به‌ازای هر دور (ریست در startMission).
 * همهٔ متدها رویدادی‌اند و هیچ‌کدام setState/رندر ندارند — فقط جهش روی شمارنده‌های داخلی.
 */
export function createEnemyTelemetry() {
  let prev: EnemyPhase | "idle" | null = null; // حافظهٔ dedup — null = هنوز هیچ فازی اعلام نشده
  let hiddenTicks = 0;
  const c = emptySnapshot();

  return {
    /** گذار فاز FSM — idle (پهپاد خاموش) و patrol و تکرارِ همان فاز شمرده نمی‌شوند؛ فقط stalk/charge/flee */
    onPhase(phase: EnemyPhase | "idle"): void {
      if (phase === prev) return;
      prev = phase;
      if (phase === "stalk") c.enemyStalks += 1;
      else if (phase === "charge") c.enemyCharges += 1;
      else if (phase === "flee") c.enemyFlees += 1;
    },
    /** پرچم یک‌بارمصرف «رد گم شد» (U3) — هر مصرف یک رویداد است */
    onLost(): void {
      c.enemyLost += 1;
    },
    /** تیک پناهگیری واقعی — فراخوانی هر interval وقتی چیپ «پوشیده» روشن است (قانون ⑤ §U8) */
    onHiddenTick(): void {
      hiddenTicks += 1;
    },
    /** لغو شارژ رئیس با شلیک (U4 قانون ④) */
    onBossInterrupt(): void {
      c.bossInterrupts += 1;
    },
    /** snapshot تخت — آبجکت تازه هر بار (جهش توسط مصرف‌کننده بی‌اثر است)؛ رُند ۱ اعشار پناهگری */
    snapshot(): EnemyTelemetrySnapshot {
      return { ...c, enemyHiddenS: Math.round(hiddenTicks * HIDDEN_TICK_S * 10) / 10 };
    },
    /** ریست کامل دور تازه — حافظهٔ dedup هم پاک می‌شود تا اولین گذارِ دور بعد شمرده شود */
    reset(): void {
      prev = null;
      hiddenTicks = 0;
      for (const k of Object.keys(c) as Array<keyof EnemyTelemetrySnapshot>) c[k] = 0;
    },
  };
}
