/**
 * شبیه‌سازی فاز U9 — ماژول واقعی balance.ts + انطباق ماتریس با منابع اجرا enemy.ts/boss.ts (§U9)
 * اجرا: bun tool-results/u9-sim.ts
 */
import {
  BALANCE_MATRIX,
  difficultyLabel,
  FIELD_VERSION,
  qTime,
  Q_TIME_MULT,
  type BalanceRow,
} from "../src/components/book/games/fps/balance";
import { enemySpeedMult, enemyStalkDelay, enemyChargeS, enemyThrowCd, enemyLostS } from "../src/components/book/games/fps/enemy";
import { bossSpeedMult, bossChargeS, bossCageCd } from "../src/components/book/games/fps/boss";
import { BOSS_TIME_MULT } from "../src/components/book/games/fps/boss";
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

const DIFFS: Difficulty[] = ["easy", "normal", "hard"];

console.log("── ۱) qTime — شش عدد مؤثر §U9 ──");
eq(qTime(12, "easy"), 16, "شلیکی/آسان = ۱۶ (۱۲×۱٫۳ رُند)");
eq(qTime(15, "easy"), 20, "تپی/آسان = ۲۰ (۱۵×۱٫۳ رُند نیم‌بالا)");
eq(qTime(12, "normal"), 12, "شلیکی/عادی = ۱۲ (بدون تغییر)");
eq(qTime(15, "normal"), 15, "تپی/عادی = ۱۵ (بدون تغییر)");
eq(qTime(12, "hard"), 10, "شلیکی/سخت = ۱۰ (۱۲×۰٫۸۵)");
eq(qTime(15, "hard"), 13, "تپی/سخت = ۱۳ (۱۵×۰٫۸۵ رُند)");

console.log("── ۲) سلسله‌مراتب محافظت‌شده + نبرد رئیس ۱٫۵× ──");
for (const base of [12, 15]) {
  ok(qTime(base, "hard") < qTime(base, "normal") && qTime(base, "normal") < qTime(base, "easy"), `ترتیب سخت<عادی<آسان برای پایهٔ ${base}`);
  for (const d of DIFFS) {
    const boss = Math.round(qTime(base, d) * BOSS_TIME_MULT);
    ok(boss > qTime(base, d), `رئیس > سؤال عادی (${d}/${base}) — ${boss}`);
  }
}
eq(Math.round(qTime(12, "easy") * BOSS_TIME_MULT), 24, "رئیس شلیکی/آسان = ۲۴");
eq(Math.round(qTime(15, "easy") * BOSS_TIME_MULT), 30, "رئیس تپی/آسان = ۳۰");
eq(Math.round(qTime(12, "normal") * BOSS_TIME_MULT), 18, "رئیس شلیکی/عادی = ۱۸");
eq(Math.round(qTime(15, "normal") * BOSS_TIME_MULT), 23, "رئیس تپی/عادی = ۲۳ (رُند ۲۲٫۵)");
eq(Math.round(qTime(12, "hard") * BOSS_TIME_MULT), 15, "رئیس شلیکی/سخت = ۱۵");
eq(Math.round(qTime(15, "hard") * BOSS_TIME_MULT), 20, "رئیس تپی/سخت = ۲۰ (رُند ۱۹٫۵)");

console.log("── ۳) ماتریس — شکل/ترتیب/کلیدها ──");
eq(BALANCE_MATRIX.length, 3, "سه سطر");
eq(BALANCE_MATRIX.map((r) => r.difficulty), ["easy", "normal", "hard"], "ترتیب ملایم→شدید");
eq(BALANCE_MATRIX.map((r) => r.label), ["آسان", "عادی", "سخت"], "برچسب‌ها");
const EXPECTED_KEYS = [
  "difficulty", "label", "enemySpeed", "stalkDelayS", "chargeS", "throwCdS", "lostS",
  "bossSpeed", "bossChargeS", "bossCageCdS", "qTimeMult", "qShootS", "qTapS", "pressure",
];
for (const r of BALANCE_MATRIX) {
  ok(
    Object.keys(r).length === EXPECTED_KEYS.length && EXPECTED_KEYS.every((k) => k in r),
    `کلیدهای سطر ${r.difficulty} = ۱۴ تایی به‌ترتیب قرارداد`,
  );
}
// آسان = پهپاد/رئیس خاموش ولی زمان بیشتر
const easy = BALANCE_MATRIX[0];
eq(easy.enemySpeed, 0, "آسان: سرعت FSM صفر");
eq(easy.bossSpeed, 0, "آسان: رئیس منفعل");
eq(easy.stalkDelayS, null, "آسان: تأخیر تعقیب null");
eq(easy.chargeS, null, "آسان: شارژ null");
eq(easy.throwCdS, null, "آسان: cd پرتاب null");
eq(easy.lostS, null, "آسان: گرِیس null");
eq(easy.bossChargeS, null, "آسان: شارژ رئیس null");
eq(easy.bossCageCdS, null, "آسان: cd رئیس null");
eq(easy.qTimeMult, 1.3, "آسان: ضریب ۱٫۳");
// عادی = تختِ راستی‌آزمایی‌شدهٔ U1..U8
const normal = BALANCE_MATRIX[1];
eq(normal.qTimeMult, 1, "عادی: ضریب ۱");
eq(normal.enemySpeed, 1, "عادی: سرعت ۱");
eq(normal.stalkDelayS, 2.6, "عادی: تعقیب ۲٫۶");
eq(normal.chargeS, 1.1, "عادی: شارژ ۱٫۱");
eq(normal.throwCdS, 9, "عادی: cd ۹");
eq(normal.lostS, 0.9, "عادی: گرِیس ۰٫۹");
eq(normal.bossChargeS, 0.9, "عادی: شارژ رئیس ۰٫۹");
eq(normal.bossCageCdS, 7.5, "عادی: cd رئیس ۷٫۵");
// سخت
const hard = BALANCE_MATRIX[2];
eq(hard.enemySpeed, 1.28, "سخت: سرعت ۱٫۲۸");
eq(hard.stalkDelayS, 1.7, "سخت: تعقیب ۱٫۷");
eq(hard.chargeS, 0.75, "سخت: شارژ ۰٫۷۵");
eq(hard.throwCdS, 6, "سخت: cd ۶");
eq(hard.lostS, 0.6, "سخت: گرِیس ۰٫۶");
eq(hard.bossSpeed, 1.22, "سخت: رئیس ۱٫۲۲");
eq(hard.bossChargeS, 0.6, "سخت: شارژ رئیس ۰٫۶");
eq(hard.bossCageCdS, 4.8, "سخت: cd رئیس ۴٫۸");

console.log("── ۴) انطباق ماتریس با منابع اجرا (آینهٔ زنده — enemy.ts/boss.ts) ──");
function rowMatchesSource(r: BalanceRow): boolean {
  const d = r.difficulty;
  if (enemySpeedMult(d, false) !== r.enemySpeed) return false;
  if (d !== "easy") {
    if (enemyStalkDelay(d) !== r.stalkDelayS) return false;
    if (enemyChargeS(d) !== r.chargeS) return false;
    if (enemyThrowCd(d) !== r.throwCdS) return false;
    if (enemyLostS(d) !== r.lostS) return false;
    if (bossChargeS(d) !== r.bossChargeS) return false;
    if (bossCageCd(d) !== r.bossCageCdS) return false;
  }
  if (bossSpeedMult(d, false) !== r.bossSpeed) return false;
  if (r.qShootS !== qTime(12, d) || r.qTapS !== qTime(15, d)) return false;
  if (r.qTimeMult !== Q_TIME_MULT[d]) return false;
  return true;
}
for (const r of BALANCE_MATRIX) ok(rowMatchesSource(r), `سطر ${r.difficulty} = آینهٔ دقیق منابع اجرا`);

console.log("── ۵) شاخص فشار — مرزها و ترتیب ──");
const pressures = BALANCE_MATRIX.map((r) => r.pressure);
eq(pressures, [0, 73, 100], "فشار آسان/عادی/سخت = ۰/۷۳/۱۰۰");
ok(pressures.every((p) => p >= 0 && p <= 100), "همه در بازهٔ ۰..۱۰۰");
ok(pressures[0] < pressures[1] && pressures[1] < pressures[2], "اکیداً صعودی");

console.log("── ۶) برچسب درجه + مُهر نسخه ──");
eq(difficultyLabel("easy"), "آسان", "برچسب آسان");
eq(difficultyLabel("normal"), "عادی", "برچسب عادی");
eq(difficultyLabel("hard"), "سخت", "برچسب سخت");
eq(difficultyLabel(BALANCE_MATRIX[2].difficulty), BALANCE_MATRIX[2].label, "برچسب = label سطر ماتریس");
eq(FIELD_VERSION, "میدان زنده ۱٫۰", "مُهر نسخهٔ قفل‌شده");

console.log(`\nنتیجه: ${pass} پاس / ${fail} شکست`);
if (fail > 0) process.exit(1);
