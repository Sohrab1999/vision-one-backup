/* شبیه‌سازی فاز U4 با ماژول‌های واقعی شوتر (boss.ts / questions.ts / chain.ts) — یک‌بارمصرف QA */
import {
  BOSS_STAGES,
  BOSS_STRAFE_AMP,
  bossCageCd,
  bossChargeS,
  bossInterrupt,
  bossSpeedMult,
  createBossState,
  stepBoss,
  type BossInput,
} from "../src/components/book/games/fps/boss";
import {
  buildSpellQuestion,
  pickSpellTarget,
} from "../src/components/book/games/fps/questions";
import {
  chainRemainingTexts,
  chainResolve,
  chainExpectedTargetId,
} from "../src/components/book/games/fps/chain";
import type { VocabEntry } from "../src/data/types";

let pass = 0;
let fail = 0;
function ok(name: string, cond: boolean, extra = ""): void {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}${extra ? " — " + extra : ""}`);
  } else {
    fail++;
    console.log(`  ✗ ${name}${extra ? " — " + extra : ""}`);
  }
}

const vocab: VocabEntry[] = [
  { word: "hello", meaning: "سلام", lesson: 1 },
  { word: "world", meaning: "جهان", lesson: 1 },
  { word: "pencil", meaning: "مداد", lesson: 1 },
  { word: "sun", meaning: "خورشید", lesson: 1 },
] as unknown as VocabEntry[];

console.log("— تست A: سرگردانی جانبی رفت‌وبرگشتی (عادی) —");
{
  const st = createBossState();
  const inp: BossInput = { dt: 1 / 60, speedMult: bossSpeedMult("normal", false), strafeAmp: BOSS_STRAFE_AMP, chargeS: 0, cdS: 0 };
  let flips = 0;
  let prevDir: 1 | -1 = st.dir;
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < 60 * 40; i++) {
    stepBoss(st, inp);
    if (st.dir !== prevDir) {
      flips++;
      prevDir = st.dir;
    }
    min = Math.min(min, st.x);
    max = Math.max(max, st.x);
  }
  ok("کران ±۴٫۵ رعایت و لبه‌ها لمس شد", min <= -BOSS_STRAFE_AMP + 0.01 && max >= BOSS_STRAFE_AMP - 0.01, `min=${min.toFixed(2)} max=${max.toFixed(2)}`);
  ok("برگشت‌های متعدد (میدان زنده)", flips >= 3, `flips=${flips}`);
  ok("بدون پرش خارج کران", Math.abs(st.x) <= BOSS_STRAFE_AMP + 0.001);
}

console.log("— تست B: چرخهٔ قفس رئیس (شارژ تله‌گراف → پرتاب → cooldown) —");
{
  const st = createBossState();
  st.cd = 0;
  const cdS = bossCageCd("normal");
  const chS = bossChargeS("normal");
  const inp: BossInput = { dt: 1 / 60, speedMult: 1, strafeAmp: BOSS_STRAFE_AMP, chargeS: chS, cdS };
  let throws = 0;
  let chargeFrames = 0;
  for (let i = 0; i < 60 * (cdS + 2 * chS + 0.4); i++) {
    stepBoss(st, inp);
    if (st.chargeT >= 0) chargeFrames++;
    if (st.justThrew) {
      st.justThrew = false;
      throws++;
    }
  }
  ok("دقیقاً دو پرتاب در پنجرهٔ cd+۲شارژ+۰٫۴", throws === 2, `throws=${throws} cd=${cdS} ch=${chS}`);
  ok("زمان شارژ ≈ ۲×chargeS", Math.abs(chargeFrames / 60 - 2 * chS) < 0.05, `charge=${(chargeFrames / 60).toFixed(2)}s`);
}

console.log("— تست C: لغو شارژ با شلیک (قانون ④ §U4) —");
{
  const st = createBossState();
  st.cd = 0;
  const inp: BossInput = { dt: 1 / 60, speedMult: 1, strafeAmp: 0, chargeS: bossChargeS("hard"), cdS: bossCageCd("hard") };
  for (let i = 0; i < 20; i++) stepBoss(st, inp); // ۰٫۳۳ث داخل شارژ
  const wasCharging = st.chargeT >= 0;
  const interrupted = bossInterrupt(st);
  ok("حین شارژ لغو می‌شود", wasCharging && interrupted);
  ok("شارژ ریست و نفس ≥۲٫۴ث", st.chargeT === -1 && st.cd >= 2.4, `cd=${st.cd.toFixed(2)}`);
}

console.log("— تست D: آسان = رئیس منفعل (قانون ③ §U4) —");
{
  const st = createBossState();
  const inp: BossInput = { dt: 1 / 60, speedMult: bossSpeedMult("easy", false), strafeAmp: 0, chargeS: 0, cdS: 0 };
  let threw = false;
  for (let i = 0; i < 60 * 60; i++) {
    stepBoss(st, inp);
    if (st.justThrew) threw = true;
  }
  ok("۶۰ ثانیه: صفر پرتاب و صفر حرکت جانبی", !threw && st.x === 0, `x=${st.x}`);
  ok("شناوری زنده (y نوسان دارد)", Math.abs(st.y - 2.9) > 0.01);
}

console.log("— تست E: تپ ساده = نصف سرعت (قانون ④ §U4) —");
{
  const a = bossSpeedMult("normal", false);
  const b = bossSpeedMult("normal", true);
  const h = bossSpeedMult("hard", false);
  ok("عادی=۱، تپ=۰٫۵، سخت=۱٫۲۲", a === 1 && b === 0.5 && h === 1.22);
}

console.log("— تست F: چالش هجی (سازندهٔ واقعی + موتور زنجیره) —");
{
  const target = pickSpellTarget(vocab);
  ok("واژهٔ ۳..۷ حرفی انتخاب شد", !!target && /^[A-Za-z]{3,7}$/.test(target!.word), target?.word);
  const q = buildSpellQuestion(1, target!, vocab, 1, 2, 4);
  ok("mode = sentence-chain (بازاستفادهٔ کامل زنجیره)", q.mode === "sentence-chain");
  ok("حروف به ترتیب واژه", q.sequence!.words.join("") === target!.word, q.sequence!.words.join(","));
  ok("promptMain جای‌خالی‌های حرفی", q.promptMain === target!.word.split("").map(() => "___").join(" "));
  ok("promptSub = معنی (سرنخ)", q.promptSub === target!.meaning);
  ok("speakText/srsKey = واژه", q.speakText === target!.word && q.srsKey === target!.word);
  const decoys = q.targets.filter((t) => !t.correct).map((t) => t.text);
  const wordLower = target!.word.toLowerCase();
  ok("حواس‌پرتی حرفی بیرون حروف واژه (بی‌حساس به بزرگی)", decoys.every((d) => !wordLower.includes(d.toLowerCase())), `decoys=${decoys.join(",")}`);
  ok("تعداد هدف = حروف + حواس‌پرتی", q.targets.length === target!.word.length + decoys.length, `${q.targets.length}`);
  // شبیه‌سازی شکار ترتیبی با موتور واقعی chain.ts
  let progress = 0;
  let allOk = true;
  for (const ch of q.sequence!.words) {
    const r = chainResolve(q.sequence!, ch, progress);
    if (r.kind !== "ok") allOk = false;
    else progress = r.nextProgress;
  }
  ok("هجی کامل با chainResolve = انجام", allOk && progress === q.sequence!.words.length);
  const bad = chainResolve(q.sequence!, decoys[0] ?? "x", 0);
  ok("حرف حواس‌پرتی = مسیر خطا", bad.kind === "bad");
  const wrongOrder = chainResolve(q.sequence!, q.sequence!.words[1], 0);
  ok("حرف بی‌ترتیب = مسیر خطا", wrongOrder.kind === "bad");
  ok("فلاش سبز حرف انتظاری قابل‌یافت", !!chainExpectedTargetId(q, 0));
  ok("واژه‌های مانده برای تایم‌اوت", chainRemainingTexts(q.sequence!, 2).length === q.sequence!.words.length - 2);
}

console.log("— تست G: فالبک گزینش هجی —");
{
  const weird: VocabEntry[] = [
    { word: "ab", meaning: "کوتاه", lesson: 1 },
    { word: "don't", meaning: "آپاستروف", lesson: 1 },
    { word: "verylongword", meaning: "بلند", lesson: 1 },
  ] as unknown as VocabEntry[];
  ok("استخر بدون واژهٔ قابل هجی → null", pickSpellTarget(weird) === null);
}

console.log("— تست H: جریان کامل مراحل (۱۵ پاسخ → تریگر → سه مرحله → فروپاشی) —");
{
  // قاعدهٔ موج F8: w = min(6, floor(total/5)+1) — تریگر در w ≥ ۴
  let total = 0;
  let triggered = false;
  for (let i = 1; i <= 20; i++) {
    total++;
    const w = Math.min(6, Math.floor(total / 5) + 1);
    if (w >= 4 && !triggered) {
      triggered = true;
      ok("تریگر دقیقاً در پاسخ ۱۵ (موج ۴)", total === 15, `total=${total} w=${w}`);
      break;
    }
  }
  // گذر مرحله‌ها — همه درست
  let stage = 1;
  let defeated = false;
  let steps = 0;
  while (stage <= BOSS_STAGES && steps < 10) {
    steps++;
    if (stage < BOSS_STAGES) stage++;
    else {
      defeated = true;
      break;
    }
  }
  ok("سه شکست سپر → فروپاشی", defeated && stage === 3 && steps === 3, `steps=${steps}`);
}

console.log(`\nنتیجه: ${pass} پاس / ${fail} خطا`);
if (fail > 0) process.exit(1);
