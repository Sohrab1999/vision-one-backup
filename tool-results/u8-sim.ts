/**
 * شبیه‌سازی فاز U8 — ماژول واقعی telemetry.ts + levelOf helpers.ts (بدون React/THREE)
 * اجرا: bun tool-results/u8-sim.ts
 */
import { createEnemyTelemetry } from "../src/components/book/games/fps/telemetry";
import { levelOf } from "../src/components/book/games/fps/helpers";
import type { Mode } from "../src/components/book/games/fps/types";
import type { Difficulty } from "../src/components/book/games/fps/constants";

let pass = 0;
let fail = 0;
function ok(cond: boolean, name: string): void {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name}`);
  }
}
function eq(a: unknown, b: unknown, name: string): void {
  ok(JSON.stringify(a) === JSON.stringify(b), `${name} — got=${JSON.stringify(a)} want=${JSON.stringify(b)}`);
}

console.log("── ۱) لبه‌های خالی/نادیده ──");
{
  const t = createEnemyTelemetry();
  const s = t.snapshot();
  eq(s, { enemyStalks: 0, enemyCharges: 0, enemyFlees: 0, enemyLost: 0, enemyHiddenS: 0, bossInterrupts: 0 }, "خالی = شش صفر");
  t.onPhase("patrol");
  t.onPhase("patrol");
  t.onPhase("idle");
  t.onPhase("idle");
  eq(t.snapshot().enemyStalks, 0, "patrol/idle (تکراری هم) شمرده نمی‌شوند");
  eq(t.snapshot().enemyCharges, 0, "charge در patrol/idle صفر");
}

console.log("── ۲) شمارش گذارها + dedup داخلی ──");
{
  const t = createEnemyTelemetry();
  t.onPhase("stalk");
  t.onPhase("stalk");
  t.onPhase("stalk");
  eq(t.snapshot().enemyStalks, 1, "تکرار stalk = یک رویداد");
  t.onPhase("patrol");
  t.onPhase("stalk");
  eq(t.snapshot().enemyStalks, 2, "بازگشت به stalk شمرده می‌شود");
  t.onPhase("charge");
  eq(t.snapshot().enemyCharges, 1, "گذار به charge شمرده می‌شود");
  t.onPhase("flee");
  eq(t.snapshot().enemyFlees, 1, "گذار به flee شمرده می‌شود");
  t.onPhase("idle"); // پهپاد خاموش (نبرد رئیس)
  t.onPhase("stalk"); // بازگشت پهپاد
  eq(t.snapshot().enemyStalks, 3, "stalk بعد از idle شمرده می‌شود");
}

console.log("── ۳) رویدادهای گسستهٔ مستقل ──");
{
  const t = createEnemyTelemetry();
  for (let i = 0; i < 4; i++) t.onLost();
  eq(t.snapshot().enemyLost, 4, "onLost ×۴");
  for (let i = 0; i < 2; i++) t.onBossInterrupt();
  eq(t.snapshot().bossInterrupts, 2, "onBossInterrupt ×۲");
}

console.log("── ۴) پناهگیری — وزن ۰٫۲ و رُند ۱ اعشار ──");
{
  const t = createEnemyTelemetry();
  eq(t.snapshot().enemyHiddenS, 0, "صفر تیک = ۰");
  for (let i = 0; i < 1; i++) t.onHiddenTick();
  eq(t.snapshot().enemyHiddenS, 0.2, "یک تیک = ۰٫۲");
  for (let i = 0; i < 2; i++) t.onHiddenTick();
  eq(t.snapshot().enemyHiddenS, 0.6, "سه تیک = ۰٫۶");
  for (let i = 0; i < 4; i++) t.onHiddenTick();
  eq(t.snapshot().enemyHiddenS, 1.4, "هفت تیک = ۱٫۴");
  for (let i = 0; i < 993; i++) t.onHiddenTick();
  eq(t.snapshot().enemyHiddenS, 200, "۱۰۰۰ تیک = ۲۰۰ (بدون خطای شناور)");
}

console.log("── ۵) snapshot آبجکت تازه + شکل تخت ──");
{
  const t = createEnemyTelemetry();
  t.onPhase("stalk");
  const s1 = t.snapshot();
  s1.enemyStalks = 99;
  s1.enemyHiddenS = 999;
  eq(t.snapshot().enemyStalks, 1, "جهش snapshot بیرونی بی‌اثر");
  const s2 = t.snapshot();
  eq(Object.keys(s2).sort(), ["bossInterrupts", "enemyCharges", "enemyFlees", "enemyHiddenS", "enemyLost", "enemyStalks"], "دقیقاً شش کلید تخت");
}

console.log("── ۶) reset — شمارنده‌ها + حافظهٔ dedup ──");
{
  const t = createEnemyTelemetry();
  t.onPhase("stalk");
  t.onPhase("charge");
  t.onHiddenTick();
  t.onLost();
  t.onBossInterrupt();
  t.reset();
  eq(t.snapshot(), { enemyStalks: 0, enemyCharges: 0, enemyFlees: 0, enemyLost: 0, enemyHiddenS: 0, bossInterrupts: 0 }, "reset = شش صفر");
  t.onPhase("stalk"); // بعد از reset حافظهٔ prev پاک است — باید شمرده شود
  eq(t.snapshot().enemyStalks, 1, "بعد از reset اولین stalk دوباره شمرده می‌شود");
}

console.log("── ۷) دنبالهٔ واقعی دور (تعقیب → شارژ لغوشده → گریز → پنهانی → شارژ موفق) ──");
{
  const t = createEnemyTelemetry();
  const timeline: Array<["phase" | "lost" | "hidden" | "boss", string]> = [
    ["phase", "patrol"],
    ["phase", "stalk"], // تعقیب ۱
    ["hidden", "x"], ["hidden", "x"], ["hidden", "x"], // بازیکن هنوز دیده می‌شود؟ — نه: تیک فقط وقتی چیپ روشن است؛ فرض ۳ تیک حین stalk
    ["phase", "charge"], // شارژ ۱ (لغو شد — پرتاب نه)
    ["phase", "flee"], // بازیکن پهپاد را زد
    ["phase", "patrol"],
    ["phase", "stalk"], // تعقیب ۲
    ["lost", "x"], // رد گم شد (پناهگاه)
    ["phase", "patrol"],
    ["phase", "stalk"], // تعقیب ۳
    ["phase", "charge"], // شارژ ۲ (پرتاب موفق — در شمارندهٔ cageThrown جداگانه)
    ["phase", "patrol"],
  ];
  for (const [kind, v] of timeline) {
    if (kind === "phase") t.onPhase(v as "patrol");
    else if (kind === "lost") t.onLost();
    else if (kind === "hidden") t.onHiddenTick();
    else t.onBossInterrupt();
  }
  const s = t.snapshot();
  eq(s.enemyStalks, 3, "سه تعقیب");
  eq(s.enemyCharges, 2, "دو شارژ (یکی لغو، یکی پرتاب — تفکیک از cageThrown در index)");
  eq(s.enemyFlees, 1, "یک گریز");
  eq(s.enemyLost, 1, "یک گم‌کردن رد");
  eq(s.enemyHiddenS, 0.6, "۰٫۶ ثانیه پناهگیری");
  eq(s.bossInterrupts, 0, "بدون نبرد رئیس = صفر");
}

console.log("── ۸) levelOf — مهاجرت قالب {scope}:{difficulty} ──");
{
  const modes: Mode[] = ["word-hunt", "grammar-gate", "listening-hunt", "sentence-chain"];
  const diffs: Difficulty[] = ["easy", "normal", "hard"];
  const scopes = ["word", "grammar", "listen", "chain"];
  let n = 0;
  for (let m = 0; m < modes.length; m++) {
    for (let d = 0; d < diffs.length; d++) {
      eq(levelOf(modes[m]!, false, diffs[d]!), `${scopes[m]}:${diffs[d]}`, `levelOf ${scopes[m]}:${diffs[d]}`);
      n++;
      if (d === 1) eq(levelOf(modes[m]!, true, diffs[d]!), `${scopes[m]}-tap:${diffs[d]}`, `levelOf ${scopes[m]}-tap:${diffs[d]}`);
    }
  }
  ok(n === 12, "۱۲ ترکیب اسکوپ×درجه پوشش داده شد");
  ok(!levelOf("word-hunt", false, "normal").includes("low") && !levelOf("word-hunt", false, "normal").includes("high"), "واژگان قدیم (low/high) در قالب تازه نیست");
}

console.log(`\nنتیجه: ${pass} پاس / ${fail} شکست`);
if (fail > 0) process.exit(1);
