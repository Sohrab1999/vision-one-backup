/**
 * u7-sim — شبیه‌سازی ماژول خالص survive.ts با مقادیر واقعی (فاز U7 — معیار پذیرش ۱ §U7).
 * اجرا: bun tool-results/u7-sim.ts
 */
import {
  SURVIVE_BOSS_EVERY,
  WAVE_MAX,
  WAVE_SIZE,
} from "../src/components/book/games/fps/constants";
import { BOSS_WAVE } from "../src/components/book/games/fps/boss";
import {
  bossDue,
  nextBossGate,
  planWave,
  SURVIVE_FIRST_BOSS_WAVE,
  SURVIVE_SCOPE,
} from "../src/components/book/games/fps/survive";

let pass = 0;
let fail = 0;
function ok(name: string, cond: boolean, extra = ""): void {
  if (cond) {
    pass += 1;
    console.log(`  ✓ ${name}${extra ? ` — ${extra}` : ""}`);
  } else {
    fail += 1;
    console.error(`  ✗ ${name}${extra ? ` — ${extra}` : ""}`);
  }
}

console.log("── ثابت‌ها ──");
ok("WAVE_SIZE=5", WAVE_SIZE === 5);
ok("WAVE_MAX=6", WAVE_MAX === 6);
ok("SURVIVE_BOSS_EVERY=3", SURVIVE_BOSS_EVERY === 3);
ok("BOSS_WAVE=4", BOSS_WAVE === 4);
ok("اولین گیت بقا = همان آستانهٔ مأموریت", SURVIVE_FIRST_BOSS_WAVE === BOSS_WAVE);
ok("اسکوپ مستقل survive", SURVIVE_SCOPE === "survive");

console.log("── planWave (موج واقعی بی‌سقف + اثرگذار سقف‌دار) ──");
ok("total=0 → موج ۱", planWave(0).real === 1 && planWave(0).eff === 1);
ok("total=4 → هنوز موج ۱", planWave(4).real === 1 && planWave(4).eff === 1);
ok("total=5 → موج ۲", planWave(5).real === 2 && planWave(5).eff === 2);
ok("total=15 → موج ۴ (آستانهٔ رئیس)", planWave(15).real === 4 && planWave(15).eff === 4);
ok("total=25 → موج ۶", planWave(25).real === 6 && planWave(25).eff === 6);
ok("total=30 → واقعی ۷ / اثرگذار ۶ (سقف)", planWave(30).real === 7 && planWave(30).eff === WAVE_MAX);
ok("total=95 → واقعی ۲۰ / اثرگذار ۶", planWave(95).real === 20 && planWave(95).eff === WAVE_MAX);
ok("total=-5 (نگهبان) → موج ۱", planWave(-5).real === 1 && planWave(-5).eff === 1);
ok("total=NaN (نگهبان) → موج ۱", planWave(Number.NaN).real === 1 && planWave(Number.NaN).eff === 1);

console.log("── bossDue (گیت ورود رئیس) ──");
ok("real=4، gate=4، نبرد نیست → ورود", bossDue(4, 4, false) === true);
ok("real=3، gate=4 → نه", bossDue(3, 4, false) === false);
ok("real=7، gate=4، نبرد جاری → نه (دوباره‌کاری صفر)", bossDue(7, 4, true) === false);
ok("real=7، gate=7، نبرد نیست → ورود دوره‌ای", bossDue(7, 7, false) === true);
ok("real=10، gate=10 → ورود سوم", bossDue(10, 10, false) === true);

console.log("── nextBossGate (+۳ پس از فروپاشی) ──");
ok("از موج ۴ → ۷", nextBossGate(4) === 7);
ok("از موج ۷ → ۱۰", nextBossGate(7) === 10);
ok("از موج ۱۰ → ۱۳", nextBossGate(10) === 13);
ok("دفاعی: از موج ۲ → هرگز زیر ۴", nextBossGate(2) === Math.max(4, 5));

console.log("── تایم‌لاین کامل بقا (ترکیب سه تابع — شبیه advanceImpl) ──");
// شبیه‌سازی: total یکی‌یکی بالا می‌رود؛ حین نبرد رئیس هم پاسخ‌ها total را بالا می‌برند
// (بهترین حالت آموزشی: سه مرحلهٔ رئیس = سه پاسخ — گیت بعدی از موجِ زمان فروپاشی +۳)
let total = 0;
let gate = SURVIVE_FIRST_BOSS_WAVE;
let bossActive = false;
let bossVisits = 0;
let maxEffSeen = 0;
const visits: number[] = [];
const gatesAfter: number[] = [];
for (let i = 0; i < 60; i += 1) {
  total += 1; // هر گام = یک پاسخ (درست/غلط)
  const { real, eff } = planWave(total);
  maxEffSeen = Math.max(maxEffSeen, eff);
  if (!bossActive && bossDue(real, gate, false)) {
    bossActive = true;
    bossVisits += 1;
    visits.push(real);
    // نبرد رئیس: سه پاسخ مراحل سپس فروپاشی
    total += 3;
    const afterFight = planWave(total);
    gate = nextBossGate(afterFight.real); // §U7: گیت = موج جاری هنگام فروپاشی +۳
    gatesAfter.push(gate);
    bossActive = false;
  }
}
ok("چهار ورود رئیس تا پاسخ ۶۰", bossVisits === 4, `ورودها در موج‌های ${visits.join("، ")}`);
ok("ورود اول در موج ۴", visits[0] === 4);
ok("ورود دوم در موج ۷", visits[1] === 7);
ok("ورود سوم در موج ۱۰", visits[2] === 10);
ok("ورود چهارم در موج ۱۳", visits[3] === 13);
ok("گیت‌ها دقیقاً +۳", gatesAfter.join(",") === "7,10,13,16", `گیت‌ها: ${gatesAfter.join("، ")}`);
ok("موج اثرگذار هرگز از ۶ نگذشت", maxEffSeen <= WAVE_MAX, `بیشینه=${maxEffSeen}`);

console.log(`\nنتیجه: ${pass} پاس / ${fail} خطا`);
if (fail > 0) process.exit(1);
