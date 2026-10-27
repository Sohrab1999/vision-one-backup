"use client";

/**
 * survive — قاعدهٔ خالص «حالت بقا» (فاز U7-00 — نقشهٔ docs/fps-upgrade-roadmap.md §U7).
 *
 * بقا «حالت پنجم» نیست؛ لایه‌ای قاعده‌ای روی چهار حالت آموزشی است (الگوی تپ ساده):
 * دور بی‌پایان است (پایان فقط با اولین مرگ — §U7 قانون ۱)، شمارهٔ موج بی‌سقف بالا
 * می‌رود (قانون ۳: موج واقعی برای بج/رکورد، موج اثرگذار سقف‌دار برای رفتار میدان)
 * و رئیس واژه دوره‌ای برمی‌گردد (قانون ۴). رکورد «survive» مستقل از چهار اسکوپ
 * آموزشی است (قانون ۲).
 *
 * مثل enemy.ts/boss.ts/los.ts: صفر وابستگی به React/THREE — تصمیم‌های خالص،
 * آزمون‌پذیر با شبیه‌سازی bun (tool-results/u7-sim.ts). مالکیت state و صدا
 * در index.tsx می‌ماند (ADR-001 — index فقط ارکستراسیون رویداد است).
 */

import { SURVIVE_BOSS_EVERY, WAVE_MAX, WAVE_SIZE } from "./constants";
import { BOSS_WAVE } from "./boss";

/** اسکوپ رکورد مستقل بقا — جدا از word/grammar/listen/chain (§U7 قانون ۲) */
export const SURVIVE_SCOPE = "survive";

/** آستانهٔ ورود اولین رئیس در بقا = همان آستانهٔ مأموریت (§U7 قانون ۴) */
export const SURVIVE_FIRST_BOSS_WAVE = BOSS_WAVE;

/** شکل رکورد بقا — معیار مقایسه = امتیاز (سازگار با موتور کیت)؛ موج/زمان همراه آن */
export interface SurviveRecord {
  score: number;
  /** بیشینهٔ موج واقعی رسیده (بی‌سقف) */
  waves: number;
  /** مدت دوام (ثانیه — بدون جمع زمان توقف‌ها، الگوی elapsed کیت) */
  timeS: number;
}

/**
 * موج واقعی و اثرگذار از شمار پاسخ‌ها — قاعدهٔ F8 همان است، فقط سقف برداشته می‌شود:
 * real = floor(total/WAVE_SIZE)+1 (بی‌سقف — بج/رکورد/detail.wave)
 * eff  = min(real, WAVE_MAX) (رفتار میدان: سرعت فرار/چیدمان/عمق سؤال — ثابت‌ها جهش نمی‌کنند)
 */
export function planWave(total: number): { real: number; eff: number } {
  const safeTotal = Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
  const real = Math.floor(safeTotal / WAVE_SIZE) + 1;
  return { real, eff: Math.min(WAVE_MAX, real) };
}

/** آیا رئیس باید وارد شود؟ (خیر اگر نبرد جاری است — §U7 قانون ۴) */
export function bossDue(realWave: number, gate: number, bossActive: boolean): boolean {
  return !bossActive && realWave >= gate;
}

/** گیت ورود بعدی رئیس پس از فروپاشی — ۳ موج بعد از موج جاری (§U7 قانون ۴) */
export function nextBossGate(currentWave: number): number {
  return Math.max(SURVIVE_FIRST_BOSS_WAVE, Math.floor(currentWave) + SURVIVE_BOSS_EVERY);
}
