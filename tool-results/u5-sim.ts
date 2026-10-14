/**
 * شبیه‌سازی فاز U5 — «هوش صوتی میدان» (نقشهٔ docs/fps-upgrade-roadmap.md §U5)
 * اجرا: bun tool-results/u5-sim.ts
 *
 * چه چیزی تست می‌شود (هستهٔ خالص audio.ts):
 * ① هندسهٔ fieldPan — چپ/راست/جلو/پشت/قطری + قرارداد yaw (جلو = (−sin yaw, −cos yaw) از physics.ts)
 * ② کلمپ پن ±۰٫۸۵ و پن صفر روی سر بازیکن
 * ③ افت فاصلهٔ گین (۰٫۳۵ در FIELD_DIST_MAX … ۱ نزدیک)
 * ④ کاتالوگ کامل — هر FieldSound دستور پخت غیرخالی دارد
 */

import { FIELD_DIST_MAX, fieldPan, FIELD_RECIPES, type FieldSound } from "../src/components/book/games/fps/audio";

let pass = 0;
let fail = 0;
function ok(name: string, cond: boolean): void {
  if (cond) {
    pass++;
  } else {
    fail++;
    console.error(`✗ ${name}`);
  }
}
const near = (a: number, b: number, eps = 0.01) => Math.abs(a - b) <= eps;

// ── ① هندسهٔ پن — yaw=۰ (نگاه به −z؛ راست = +x — قرارداد three.js راست‌دست) ──
// بازیکن در (۰, ۷) جهان — همان مختصات صحنه (baseZ≈۷ در laneK=۱)
const px = 0;
const pz = 7;

// منبع کاملاً سمت راست (+x)
ok("راست خالص → pan=+0.85", near(fieldPan(5, pz, px, pz, 0).pan, 0.85, 0.001));
// منبع کاملاً سمت چپ (−x)
ok("چپ خالص → pan=−0.85", near(fieldPan(-5, pz, px, pz, 0).pan, -0.85, 0.001));
// جلو (−z) و پشت (+z) — هر دو مرکز
ok("جلو خالص → pan=0", near(fieldPan(0, pz - 8, px, pz, 0).pan, 0, 0.001));
ok("پشت خالص → pan=0", near(fieldPan(0, pz + 8, px, pz, 0).pan, 0, 0.001));
// قطری ۴۵° جلو-راست: right = sin45 ≈ 0.707 → ×۱٫۲ = 0.849
const diag = fieldPan(4, pz - 4, px, pz, 0);
ok("قطری جلو-راست → pan≈+0.849", near(diag.pan, 0.8485, 0.005));

// ── قرارداد yaw — چرخش ۹۰° (نگاه به −x؛ راست = −z، پس +z = چپ و +x = پشت) ──
ok("yaw=π/2 — منبع در −z → pan=+0.85", near(fieldPan(0, pz - 5, px, pz, Math.PI / 2).pan, 0.85, 0.001));
ok("yaw=π/2 — منبع در +z → pan=−0.85", near(fieldPan(0, pz + 5, px, pz, Math.PI / 2).pan, -0.85, 0.001));
ok("yaw=π/2 — منبع در +x (پشت) → pan=0", near(fieldPan(5, pz, px, pz, Math.PI / 2).pan, 0, 0.001));
// yaw=π (نگاه به +z؛ راست = −x)
ok("yaw=π — منبع در −x → pan=+0.85", near(fieldPan(-5, pz, px, pz, Math.PI).pan, 0.85, 0.001));

// ── ② کلمپ و مرکز ──
// منبع خیلی نزدیک (< ۰٫۳۵م) — مرکز تمام‌قد
const onHead = fieldPan(0.1, pz, px, pz, 0);
ok("منبع روی سر بازیکن → pan=0 و gain=1", onHead.pan === 0 && onHead.gain === 1);
// کلمپ قطری شدید (۲۰, ۱) — فاصله زیاد، pan همچنان ≤ ۰٫۸۵
const far = fieldPan(20, pz + 1, px, pz, 0);
ok("کلمپ پن ≤ ۰٫۸۵", far.pan <= 0.85 && far.pan >= -0.85);

// ── ③ افت فاصله ──
ok("گین نزدیک (۲م) ≈ ۰٫۹۳", near(fieldPan(2, pz, px, pz, 0).gain, 0.35 + 0.65 * (1 - 2 / FIELD_DIST_MAX), 0.005));
ok("گین لبهٔ FIELD_DIST_MAX = ۰٫۳۵", near(fieldPan(px, pz + FIELD_DIST_MAX, px, pz, 0).gain, 0.35, 0.005));
ok("گین دورتر از FIELD_DIST_MAX کف ۰٫۳۵", near(fieldPan(0, pz - 40, px, pz, 0).gain, 0.35, 0.005));

// ── ④ کاتالوگ کامل ──
const expected: FieldSound[] = [
  "detected", "charge", "throw", "lost", "retreat",
  "thud", "cageDown", "bossWarn", "shieldBreak", "bossDown",
];
for (const name of expected) {
  const recipe = FIELD_RECIPES[name];
  ok(`دستور پخت «${name}» غیرخالی`, Array.isArray(recipe) && recipe.length >= 1 && recipe.every((t) => t.dur > 0 && t.freq > 0));
}

console.log(`\nنتیجه: ${pass} پاس / ${fail} خطا`);
if (fail > 0) process.exit(1);
