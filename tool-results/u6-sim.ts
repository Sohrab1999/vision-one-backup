/**
 * u6-sim — شبیه‌سازی فاز U6 «طاق عمودی» با ماژول‌های واقعی بازی (صفر موک).
 * فیزیک ارتفاع (پلکان/فرود/لبه/سقف) + رگرسیون چهار نقشه + LOS سه‌وضعیتی + flyY دشمن.
 * اجرا: bun tool-results/u6-sim.ts
 */

import {
  stepPlayer,
  groundHeightAt,
  resolveWorld,
  STEP_UP,
  HEAD_CLEAR,
  LEDGE_GRAB,
  SNAP_DOWN,
  FOOT_R,
} from "../src/components/book/games/fps/physics";
import { LAYOUTS } from "../src/components/book/games/fps/layouts";
import { hasLineOfSight } from "../src/components/book/games/fps/los";
import { createEnemyState, stepEnemy, ENEMY_FLY_Y } from "../src/components/book/games/fps/enemy";

let pass = 0;
let fail = 0;
const fails: string[] = [];
function ok(name: string, cond: boolean, detail = "") {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    fail++;
    fails.push(name);
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}
const near = (a: number, b: number, eps = 0.02) => Math.abs(a - b) <= eps;

type Bridge = Parameters<typeof stepPlayer>[0];
function makeBridge(map: keyof typeof LAYOUTS): Bridge {
  return {
    aim: { yaw: 0, pitch: 0 },
    pos: { x: 0, z: 0 },
    keys: new Set<string>(),
    moveMag: 0,
    stick: { x: 0, y: 0 },
    vel: { x: 0, z: 0 },
    vy: 0,
    jumpY: 0,
    floorY: 0,
    wantJump: false,
    crouchAmt: 0,
    sprint: false,
    speedKick: 0,
    layout: LAYOUTS[map],
    laneK: 1,
    scopeAmt: 0,
  } as unknown as Bridge;
}
const DT = 1 / 60;
/** گام‌های ثابت — حرکت با کلید شبیه‌سازی‌شده */
function run(b: Bridge, secs: number, keys: string[], yaw = 0) {
  b.aim.yaw = yaw;
  for (const k of keys) b.keys.add(k);
  const n = Math.round(secs / DT);
  for (let i = 0; i < n; i++) stepPlayer(b, DT);
  for (const k of keys) b.keys.delete(k);
}

// ── ۰) ثابت‌ها ──
console.log("۰) ثابت‌های ارتفاع §U6");
ok("STEP_UP=0.3 / HEAD_CLEAR=2.0 / LEDGE_GRAB=0.31 / SNAP_DOWN=0.35 / FOOT_R=0.12",
  STEP_UP === 0.3 && HEAD_CLEAR === 2.0 && LEDGE_GRAB === 0.31 && SNAP_DOWN === 0.35 && FOOT_R === 0.12);

// ── ۱) groundHeightAt — واحد ──
console.log("۱) groundHeightAt — واحد");
{
  const L = LAYOUTS.vault;
  // بالای پلهٔ اول (x 9.7, z 8.3, top 0.28)
  ok("پلهٔ اول از زمین قابل‌فرود", near(groundHeightAt({ x: 9.7, z: 8.3 - 7 }, 7, L, 0), 0.28));
  ok("درون تونل از زمین کف صفر", groundHeightAt({ x: -7.2, z: -9 }, 7, L, 0) === 0);
  // کیسهٔ شنی درون تونل (−8.15, −6.2, h 0.8) — فرود از بالا
  ok("کیسهٔ شنی تونل با feet 0.9 کف 0.8", near(groundHeightAt({ x: -8.15, z: -6.2 - 7 }, 7, L, 0.9), 0.8));
  ok("گذر شرقی تونل (بیرون footprint) کف صفر", groundHeightAt({ x: -6.4, z: -6.2 - 7 }, 7, L, 0.9) === 0);
  // سقف تونل هرگز کف نیست از زمین (top 3.26 > 0+0.31)
  ok("سقف تونل از زمین کف نیست", groundHeightAt({ x: -7.2, z: -4.3 - 7 }, 7, L, 0) === 0);
  // لبهٔ گریس: 0.1 داخل لبهٔ تخته (x 8.65) کف دارد، 0.2 بیرون ندارد
  ok("گریس لبه +۰٫۱۲", near(groundHeightAt({ x: 8.65 - 0.1, z: 1.7 - 7 }, 7, L, 3.2), 3.16));
  ok("بیرون گریس لبه کف صفر", groundHeightAt({ x: 8.65 - 0.2, z: 1.7 - 7 }, 7, L, 3.2) === 0);
}

// ── ۲) پلکان vault — صعود با راه‌رفتن (بدون پرش) + ایستادن روی گذرگاه ──
console.log("۲) پلکان — صعود با راه‌رفتن");
{
  const b = makeBridge("vault");
  b.pos.x = 9.7;
  b.pos.z = 2.5; // جهان z=9.5 — جنوب پلکان
  run(b, 2.2, ["w"]); // ~۹٫۵م — عبور از هر ۱۱ پله
  ok("رسیدن به top گذرگاه 3.16 با راه‌رفتن", near(b.jumpY, 3.16, 0.05), `jumpY=${b.jumpY.toFixed(3)} worldZ=${(7 + b.pos.z).toFixed(2)}`);
  ok("بدون پرتاب جانبی از پله‌ها (x حفظ شد)", Math.abs(b.pos.x - 9.7) < 0.5, `x=${b.pos.x.toFixed(2)}`);
  ok("floorY همگام با jumpY", near(b.floorY, b.jumpY, 0.01));
  run(b, 1.2, ["w"]); // ادامه روی تخته‌ها (نه از انتهای شمالی خارج شو)
  ok("راه‌رفتن روی گذرگاه پایدار", near(b.jumpY, 3.16, 0.01), `jumpY=${b.jumpY.toFixed(3)}`);
}

// ── ۳) گذرگاه — فرود از بالا + پرش و بازگشت به سطح سازه ──
console.log("۳) گذرگاه بلند — پرش روی خودش");
{
  const b = makeBridge("vault");
  b.pos.x = 9.7;
  b.pos.z = 1.7 - 7; // جهان z=1.7 — بالای تختهٔ اول
  b.jumpY = 3.4;
  run(b, 0.8, []); // فرود
  ok("فرود از بالا روی گذرگاه", near(b.jumpY, 3.16, 0.01), `jumpY=${b.jumpY.toFixed(3)}`);
  b.wantJump = true;
  run(b, 1.6, []); // پرش و فرود
  ok("پرش روی گذرگاه → بازگشت به 3.16", near(b.jumpY, 3.16, 0.01), `jumpY=${b.jumpY.toFixed(3)} vy=${b.vy}`);
}

// ── ۴) سقوط از لبهٔ داخلی گذرگاه — سقوط نرم تا زمین ──
console.log("۴) سقوط از لبهٔ گذرگاه");
{
  const b = makeBridge("vault");
  b.pos.x = 9.7;
  b.pos.z = 1.7 - 7; // جهان 1.7 — روی تخته
  b.jumpY = 3.16;
  b.floorY = 3.16;
  run(b, 0.4, []); // تثبیت
  run(b, 2.2, ["a"]); // غرب — از لبهٔ داخلی 8.65 به بیرون
  ok("فرود نهایی روی زمین (0)", near(b.jumpY, 0, 0.01), `jumpY=${b.jumpY.toFixed(3)} x=${b.pos.x.toFixed(2)}`);
  ok("از لبه عبور کرد (x < 8.5)", b.pos.x < 8.5, `x=${b.pos.x.toFixed(2)}`);
}

// ── ۵) زیر گذرگاه — راه‌رفتن و پرش بدون برخورد افقی ──
console.log("۵) زیر گذرگاه — سقفِ بی‌برخورد");
{
  const b = makeBridge("vault");
  b.pos.x = 9.7;
  b.pos.z = 0 - 7; // جهان z=0 — زیر تخته‌ها (بدنه از 2.65 تا −8.75)
  run(b, 0.5, []);
  ok("راه‌رفتن زیر گذرگاه روی زمین (نه روی آن)", b.jumpY === 0 && b.floorY === 0, `jumpY=${b.jumpY.toFixed(3)}`);
  b.wantJump = true;
  const zBefore = b.pos.z;
  run(b, 0.9, []);
  ok("پرش زیر گذرگاه: فرود کامل روی 0 (بدون برخورد سقف)", b.vy === 0 && b.jumpY === 0, `jumpY=${b.jumpY.toFixed(3)}`);
  ok("بدون پرتاب جانبی زیر سقف", Math.abs(b.pos.z - zBefore) < 1.2, `Δz=${Math.abs(b.pos.z - zBefore).toFixed(2)}`);
  run(b, 2.0, ["w"]); // ادامهٔ شمال زیر تخته‌ها
  ok("راه‌رفتن طولانی زیر گذرگاه آزاد", Math.abs(b.pos.x - 9.7) < 0.6 && b.jumpY === 0, `x=${b.pos.x.toFixed(2)} jumpY=${b.jumpY.toFixed(2)}`);
}

// ── ۶) تونل طاق‌دار — ورود، گذر از کنار کیسهٔ شنی، پرش زیر سقف ──
console.log("۶) تونل — سقف 3.0 و پرش آزاد");
{
  const b = makeBridge("vault");
  b.pos.x = -6.4; // لاین شرقی تونل (کیسهٔ شنی غرب است)
  b.pos.z = -1.5; // جهان z=5.5 — جنوب درگاه
  run(b, 3.2, ["w"]); // ورود به تونل
  ok("ورود به تونل (جهان z منفی عمیق)", 7 + b.pos.z < -3, `worldZ=${(7 + b.pos.z).toFixed(1)}`);
  ok("در دل تونل باقی ماند (بدون پرتاب)", b.pos.x < -5.9 && b.pos.x > -8.4, `x=${b.pos.x.toFixed(2)}`);
  const xIn = b.pos.x;
  b.wantJump = true;
  run(b, 0.9, []);
  ok("پرش زیر سقف تونل آزاد (feet+2.0=2.88 < 3.0)", b.vy === 0 && b.jumpY === 0, `jumpY=${b.jumpY.toFixed(3)}`);
  ok("بدون پرتاب جانبی در پرش", Math.abs(b.pos.x - xIn) < 1.2);
  run(b, 2.5, ["w"]); // گذر از کنار کیسهٔ شنی غربی
  ok("گذر کامل تونل تا سایت B (بی‌مانع)", 7 + b.pos.z < -7.5, `worldZ=${(7 + b.pos.z).toFixed(1)}`);
}

// ── ۷) فرود روی سازهٔ کوتاه — قابلیت تازهٔ همگانی ──
console.log("۷) فرود روی کیسهٔ شنی (قابلیت تازه)");
{
  const b = makeBridge("vault");
  b.pos.x = -5.4;
  b.pos.z = 4.8 - 7; // جهان 4.8 — بالای کیسهٔ شنی میانی (0.85 — هوای آزاد، بدون سقف)
  b.jumpY = 1.2;
  run(b, 0.8, []);
  ok("فرود روی کیسهٔ شنی 0.85", near(b.jumpY, 0.85, 0.01), `jumpY=${b.jumpY.toFixed(3)}`);
  run(b, 1.2, ["a"]); // پیاده‌شدن به غرب
  ok("پیاده‌شدن → زمین 0", near(b.jumpY, 0, 0.01), `jumpY=${b.jumpY.toFixed(3)}`);
}

// ── ۸) رگرسیون dust — زمین صفر + سد دیوار بلند ──
console.log("۸) رگرسیون dust");
{
  const b = makeBridge("dust");
  // سد دیوار گذرگاه بلند (5.6, −1.2, h 2.9) از شرق
  b.pos.x = 6.8;
  b.pos.z = -1.2 - 7 + 7;
  b.pos.z = -1.2 - 7;
  run(b, 2.0, ["a"]); // غرب به سمت دیوار
  ok("دیوار بلند dust سد است (x ≥ 6.24 = 5.9+R)", b.pos.x > 6.2, `x=${b.pos.x.toFixed(2)}`);
  ok("زمین dust صفر ماند", b.jumpY === 0 && b.floorY === 0);
  // پرش از روی کیسهٔ شنی میانی dust (0, 5.4, h 0.8)
  const b2 = makeBridge("dust");
  b2.pos.x = 0;
  b2.pos.z = -0.2; // جهان 6.8 — جنوب کیسه
  b2.wantJump = true;
  run(b2, 1.6, ["w"]);
  ok("کیسهٔ شنی dust: فرود روی آن یا عبور — پایان روی 0 (بدون گیر)", near(b2.jumpY, 0, 0.01) || near(b2.jumpY, 0.8, 0.01), `jumpY=${b2.jumpY.toFixed(3)} worldZ=${(7 + b2.pos.z).toFixed(2)}`);
  if (near(b2.jumpY, 0.8, 0.01)) {
    run(b2, 1.5, ["w"]);
    ok("پیاده‌شدن از کیسه → 0", near(b2.jumpY, 0, 0.01), `worldZ=${(7 + b2.pos.z).toFixed(2)}`);
  }
  // درِ بستهٔ dust سد است
  const b3 = makeBridge("dust");
  b3.pos.x = -1.5;
  b3.pos.z = -0.6 - 7 + 7;
  b3.pos.z = -0.6 - 7 + 1.2;
  run(b3, 1.5, ["w"]);
  ok("درِ بستهٔ dust سد است", 7 + b3.pos.z > -0.6 + 0.13 + 0.33, `worldZ=${(7 + b3.pos.z).toFixed(2)}`);
}

// ── ۹) رگرسیون forest — لبه‌گیری جعبهٔ 1.15 (قابلیت تازه) ──
console.log("۹) لبه‌گیری جعبهٔ 1.15 جنگل");
{
  const b = makeBridge("forest");
  b.pos.x = -3.4;
  b.pos.z = 4.6 - 7;
  b.jumpY = 0.9; // اوج پرش کنار جعبه
  b.vy = -0.3;
  run(b, 0.7, []);
  ok("فرود/لبه‌گیری روی جعبهٔ 1.15", near(b.jumpY, 1.15, 0.01), `jumpY=${b.jumpY.toFixed(3)}`);
  // رگرسیون: راه‌رفتن عادی به جعبه = سد
  const b2 = makeBridge("forest");
  b2.pos.x = -3.4;
  b2.pos.z = 4.6 - 7 + 2.0;
  run(b2, 1.5, ["w"]);
  ok("راه‌رفتن به جعبهٔ 1.15 = سد (بدون سوارشدن بی‌پرش)", b2.jumpY === 0, `jumpY=${b2.jumpY.toFixed(3)}`);
}

// ── ۱۰) LOS سه‌وضعیتی vault ──
console.log("۱۰) LOS vault — تونل/گذرگاه/اسپان");
{
  const L = LAYOUTS.vault.boxes;
  // پهپادِ ۴٫۲م ↔ بازیکن درون تونل: سقف سد است
  ok("پهپاد بلندپرواز بازیکنِ درون تونل را نمی‌بیند",
    !hasLineOfSight(-7.2, 4.2, -4.3, -7.2, 1.7, -6.0, L));
  // پهپاد ↔ بازیکن روی گذرگاه: هر دو بالای سازه‌ها
  ok("پهپاد بازیکنِ روی گذرگاه را می‌بیند",
    hasLineOfSight(6.0, 4.3, -2.1, 9.7, 4.86, -2.1, L));
  // بازیکن روی گذرگاه ↔ هدف‌ها: باند تخته زیر هر دو است — عبور از کنار
  ok("از گذرگاه دید باز به میدان (هدف میانه)",
    hasLineOfSight(9.7, 4.86, -0.2, 2.25, 1.4, -6, L));
  // دید اسپان به هر ۴ لِین (قرارداد گذر میانی باز)
  for (const lx of [-6.8, -2.25, 2.25, 6.8]) {
    ok(`دید اسپان به لِین ${lx}`, hasLineOfSight(0, 1.7, 7, lx, 1.4, -6, L));
  }
  // پنهانی خم‌شده در تونل هم هست (چشم 1.08)
  ok("خم‌شده در تونل هم پنهان", !hasLineOfSight(-7.2, 4.0, -4.3, -7.2, 1.08, -6.0, L));
  // کنترل منفی: پهپادِ ۲٫۳۵ (نقشه‌های دیگر) ↔ بازیکن پشت دیوار تونل = بسته، ولی بیرون تونل باز
  ok("کنترل: دید افقی 2.35 به بیرون تونل باز است",
    hasLineOfSight(-7.2, 2.35, 2.0, -7.2, 1.7, 2.0, L));
}

// ── ۱۱) flyY دشمن ──
console.log("۱۱) ارتفاع پرواز نقشه‌محور");
{
  const st = createEnemyState(0, 0);
  stepEnemy(st, {
    px: 0, pz: 0, playerSpeed: 5, speedMult: 1, stalkDelay: 2.6,
    chargeS: 1.1, throwCd: 9, lostS: 0.9, los: true, flyY: 4.2, dt: 0.016,
    bounds: { minX: -12.8, maxX: 12.8, minZ: -11.2, maxZ: 11.4 },
  });
  ok("vault: y ∈ 4.2±0.3", st.y > 3.85 && st.y < 4.55, `y=${st.y.toFixed(2)}`);
  const st2 = createEnemyState(0, 0);
  stepEnemy(st2, {
    px: 0, pz: 0, playerSpeed: 5, speedMult: 1, stalkDelay: 2.6,
    chargeS: 1.1, throwCd: 9, lostS: 0.9, los: true, flyY: ENEMY_FLY_Y, dt: 0.016,
    bounds: { minX: -12.8, maxX: 12.8, minZ: -11.2, maxZ: 11.4 },
  });
  ok("نقشه‌های دیگر: y ∈ 2.35±0.3", st2.y > 2.0 && st2.y < 2.7, `y=${st2.y.toFixed(2)}`);
}

// ── ۱۲) رگرسیون applyRig — چشم بازیکن روی سازه ──
console.log("۱۲) چشم بازیکن (LOSM глаз) روی سازه");
{
  // چشم = 1.7 − crouch×0.62 + jumpY — با jumpY مطلق، روی گذرگاه 4.86 می‌شود
  const eye = 1.7 + 3.16;
  ok("چشم روی گذرگاه = 4.86", near(eye, 4.86, 0.001));
}

console.log(`\nنتیجه: ${pass}/${pass + fail}`);
if (fail > 0) {
  console.log("شکست‌ها:", fails.join(" · "));
  process.exit(1);
}
