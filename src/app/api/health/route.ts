import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  applyGrade,
  newState,
  MIN_EASE,
  MAX_INTERVAL_DAYS,
  type SrsGrade,
  type SrsState,
} from "@/lib/srs-engine";

export const dynamic = "force-dynamic";

/**
 * آینهٔ منحنی سطح از src/lib/xp-store.ts — همان فرمول و همان ضرایب.
 * چرا import نمی‌کنیم؟ xp-store.ts ماژول "use client" است و لایهٔ سرور (Turbopack)
 * فراخوانی تابع کلاینتی از سرور را با خطا می‌شکند. اگر روزی منحنی عوض شد،
 * این آینه باید همگام شود (سطح ۱→۲: ۸۰، هر سطح بعدی +۴۰).
 */
function levelInfoMirror(totalXp: number): { level: number; inLevel: number; need: number } {
  let level = 1;
  let acc = 0;
  let need = 80;
  while (totalXp >= acc + need) {
    acc += need;
    level += 1;
    need = 80 + (level - 1) * 40;
  }
  return { level, inLevel: totalXp - acc, need };
}

/**
 * تشخیص خودکار (فاز ۱۱ — مانیتورینگ) — جایگزین تست یونیت در این محیط.
 * GET عمومی → {ok, checks: [{name, pass, detail?}]}
 * - srs-interval-monotonic: موتور SRS روی حالت‌های نمونه باید فاصلهٔ یکنوا و ≥۰
 *   و ease در بازهٔ ۱.۳..۳.۵ بدهد.
 * - xp-level-boundaries: مرزهای سطح (xp=0 → سطح ۱، ورودی منفی/NaN نباید کرش کند).
 * - db-ok: یک کوئری سبک روی دیتابیس با تایم‌اوت ۳ ثانیه.
 * هر چک try/catch جدا دارد؛ پاسخ همیشه 200 است تا مانیتور خارجی بتواند بخواند.
 */

interface HealthCheck {
  name: string;
  pass: boolean;
  detail?: string;
}

const EASE_MAX = 3.5;
const EPS = 1e-9;

/** کوئری با تایم‌اوت — Promise.race بدون به‌جاگذادن تایمر زنده */
async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      p,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** درجه‌ها روی حالت‌های نمونه: فاصلهٔ یکنوا، ≥۰ و ≤سقف؛ ease داخل بازهٔ مجاز */
async function checkSrs(): Promise<HealthCheck> {
  try {
    const now = Date.now();

    // ۱) دنبالهٔ «بلد بودم» روی کارت نو — فاصله باید یکنوا بزرگ شود (با clamp سقف)
    let st: SrsState | undefined = undefined;
    let prev = -1;
    for (let i = 0; i < 14; i++) {
      st = applyGrade(st, 2, now);
      if (!(st.interval >= 0) || st.interval < prev - EPS) {
        return { name: "srs-interval-monotonic", pass: false, detail: `interval جاافتاد: ${st.interval}` };
      }
      if (st.interval > MAX_INTERVAL_DAYS + EPS) {
        return { name: "srs-interval-monotonic", pass: false, detail: `interval از سقف گذشت: ${st.interval}` };
      }
      if (st.ease < MIN_EASE - EPS || st.ease > EASE_MAX + EPS) {
        return { name: "srs-interval-monotonic", pass: false, detail: `ease خارج از بازه: ${st.ease}` };
      }
      prev = st.interval;
    }

    // ۲) هر سه درجه روی یک حالت بالغ (interval=۱۰ روز) — فقط ناوردایی‌های قطعی
    const mature: SrsState = { ...newState(now), interval: 10, ease: 2.5, reps: 5, streak: 5 };
    for (const g of [0, 1, 2] as SrsGrade[]) {
      const next = applyGrade(mature, g, now);
      if (!(next.interval >= 0) || next.interval > MAX_INTERVAL_DAYS + EPS) {
        return { name: "srs-interval-monotonic", pass: false, detail: `grade=${g} interval=${next.interval}` };
      }
      if (next.ease < MIN_EASE - EPS || next.ease > EASE_MAX + EPS) {
        return { name: "srs-interval-monotonic", pass: false, detail: `grade=${g} ease=${next.ease}` };
      }
    }

    return { name: "srs-interval-monotonic", pass: true };
  } catch (e) {
    return { name: "srs-interval-monotonic", pass: false, detail: e instanceof Error ? e.message : "خطا" };
  }
}

/** مرزهای سطح: xp=۰ → سطح ۱ · منفی/NaN کرش نمی‌کند و سطح ۱ می‌ماند · مرز ۸۰ → سطح ۲ */
async function checkXp(): Promise<HealthCheck> {
  try {
    if (levelInfoMirror(0).level !== 1) {
      return { name: "xp-level-boundaries", pass: false, detail: "xp=0 باید سطح ۱ باشد" };
    }
    if (levelInfoMirror(80).level !== 2) {
      return { name: "xp-level-boundaries", pass: false, detail: "xp=80 باید مرز سطح ۲ باشد" };
    }
    if (levelInfoMirror(-50).level !== 1) {
      return { name: "xp-level-boundaries", pass: false, detail: "xp منفی باید سطح ۱ بماند" };
    }
    // NaN نباید کرش کند — برگشت به سطح ۱
    if (levelInfoMirror(Number.NaN).level !== 1) {
      return { name: "xp-level-boundaries", pass: false, detail: "NaN باید سطح ۱ بدهد" };
    }
    const big = levelInfoMirror(1_000_000).level;
    if (!Number.isFinite(big) || big <= 1) {
      return { name: "xp-level-boundaries", pass: false, detail: `سطح xp بزرگ نامعتبر: ${big}` };
    }
    // ناوردایی‌های خروجی برای ورودی‌های نامنفی
    for (const xp of [0, 1, 79, 80, 250, 9999]) {
      const info = levelInfoMirror(xp);
      if (info.need < 80) {
        return { name: "xp-level-boundaries", pass: false, detail: `xp=${xp} need=${info.need}` };
      }
      if (xp > 0 && info.inLevel < 0) {
        return { name: "xp-level-boundaries", pass: false, detail: `xp=${xp} inLevel=${info.inLevel}` };
      }
    }
    return { name: "xp-level-boundaries", pass: true };
  } catch (e) {
    return { name: "xp-level-boundaries", pass: false, detail: e instanceof Error ? e.message : "خطا" };
  }
}

/** یک کوئری سبک روی دیتابیس — با تایم‌اوت ۳ ثانیه */
async function checkDb(): Promise<HealthCheck> {
  try {
    await withTimeout(db.user.count(), 3000);
    return { name: "db-ok", pass: true };
  } catch (e) {
    return {
      name: "db-ok",
      pass: false,
      detail: e instanceof Error ? e.message : "خطای دیتابیس",
    };
  }
}

export async function GET() {
  const checks: HealthCheck[] = [await checkSrs(), await checkXp(), await checkDb()];
  const ok = checks.every((c) => c.pass);
  // حتی با fail هم 200 — مانیتور باید بتواند بدنه را بخواند
  return NextResponse.json({ ok, checks });
}
