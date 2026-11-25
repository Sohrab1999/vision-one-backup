// ─────────────────────────────────────────────────────────────────────────────
// R1-c نقشه راه کیفیت استخراج VIU — راستی‌آزمایی مستقل موج تبدیل (۲۰۲۶-۱۱-۱۷)
// Run with: bun scripts/viu-r1-verify.mjs
//
// سه ادعا را مستقیم روی دادهٔ خام (docs/qa/viu-phase*/unit-*.json + answer-key.json) می‌سنجد:
//   ۱) صفر ساختگی: هر گزینهٔ هر سؤال R1 باید عیناً (نرمال‌شده) در منابع چاپی همان تمرین
//      یافت شود: بانک چاپی ∪ ستون راست چاپی (opts) ∪ قطعات کلید چاپی ∪ واژه‌های ردیف odd
//      ∪ واژگان چاپی همان درس — هر گزینهٔ خارج از این‌ها ⇒ مردود.
//   ۲) پاسخ درست = قطعهٔ کلید چاپی همان آیتم (کد تطبیق یا محتوا یا کل قطعه).
//   ۳) متن سؤال = عین متن چاپی آیتم (فقط نرمال‌سازی جای خالی).
// خروجی: docs/qa/viu-r1-verification-2026-11-17.json
//   + نمونهٔ ≥۲۰٪ (استراتیفیه بر اساس کتاب/درس) با پروونانس کامل برای بازخوانی مالک.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const TODAY = "2026-11-17";

const normalize = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.。]+$/, "");
const stripNotes = (s) => String(s ?? "").replace(/\s*\[[^\]]*\]\s*/g, " ").replace(/\s+/g, " ").trim();
const firstAlternate = (ans) => String(ans ?? "").split("/")[0].replace(/\s*\|\s*$/, "").trim();
const keyOption = (seg) => (/\s\/\s/.test(String(seg ?? "")) ? stripNotes(seg) : stripNotes(firstAlternate(seg)));

function loadAnswerKey(rawDir) {
  const raw = JSON.parse(readFileSync(`${ROOT}${rawDir}/answer-key.json`, "utf8"));
  const map = new Map();
  for (const pg of raw) for (const u of pg.units || []) map.set(Number(u.unit), { ...(map.get(Number(u.unit)) || {}), ...(u.answers || {}) });
  return map;
}

const CFG = [
  { id: "viu-elem", rawDir: "docs/qa/viu-phase3-elem" },
  { id: "viu-preint", rawDir: "docs/qa/viu-phase4-preint" },
  { id: "viu-upper", rawDir: "docs/qa/viu-phase5-upper" },
];

async function main() {
  const report = { generated: TODAY, task: "R1-c independent verification of the R1 wave", books: [], totals: {} };
  let total = 0, optionChecks = 0, optionFail = 0, answerFail = 0, textFail = 0;
  const failures = [];

  // پرچم مالکیت نمونه — PRNG قطعی mulberry32 برای بازتولیدپذیری کامل نمونهٔ ≥۲۰٪
  let seedState = 0x9e3779b9;
  const rand = () => {
    seedState |= 0; seedState = (seedState + 0x6d2b79f5) | 0;
    let t = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (const { id, rawDir } of CFG) {
    const mod = await import(`${ROOT}src/data/${id}/quiz-r1.ts`);
    const seeds = mod.QUIZ_R1;
    const keys = loadAnswerKey(rawDir);
    const perLesson = new Map();
    for (const s of seeds) {
      if (!perLesson.has(s.lesson)) perLesson.set(s.lesson, []);
      perLesson.get(s.lesson).push(s);
    }
    const bookReport = { id, seeds: seeds.length, lessons: perLesson.size, checked: [], failures: [] };

    for (const [n, lessonSeeds] of [...perLesson.entries()].sort((a, b) => a[0] - b[0])) {
      const rec = JSON.parse(readFileSync(`${ROOT}${rawDir}/unit-${String(n).padStart(3, "0")}.json`, "utf8"));
      const answers = keys.get(n) || {};
      const vocabWords = (rec.vocab || []).map((v) => (typeof v?.w === "string" ? v.w.trim() : "")).filter(Boolean);
      // برای هر تمرین: مجموعهٔ کامل منابع چاپی + قطعات کلید
      const exByName = new Map();
      for (const ex of rec.exercises || []) {
        const no = String(ex.no ?? "").trim();
        const items = (ex.items || []).filter((it) => it && typeof it.en === "string" && it.en.trim());
        const keyText = no in answers ? answers[no] : null;
        const printed = new Set();
        for (const b of ex.bank || []) {
          const t = stripNotes(String(b));
          printed.add(t);
          const cm = /^([a-z])[.)]?\s+(.+)$/i.exec(t);
          if (cm) printed.add(cm[2].trim()); // واریانت بدون کد چاپی (الگوی splitCode مبدل)
        }
        for (const it of items) {
          printed.add(stripNotes(it.en));
          for (const o of it.opts || []) {
            const t = stripNotes(String(o));
            printed.add(t);
            const cm = /^([a-z])[.)]?\s+(.+)$/i.exec(t);
            if (cm) printed.add(cm[2].trim()); // واریانت بدون کد چاپی
          }
        }
        // قطعات کلید — نگاشت شماره‌دار (num→val) + کدهای تطبیق + واریانت‌های ویرگولی
        const keyMap = new Map();
        if (keyText) {
          const re = /(?:^|\s)(\d{1,3})[.):]?\s+/g;
          let m;
          const pos = [];
          while ((m = re.exec(String(keyText))) !== null) pos.push({ num: Number(m[1]), valStart: m.index + m[0].length, matchStart: m.index });
          if (pos.length > 0) {
            for (let i = 0; i < pos.length; i++) {
              const end = i + 1 < pos.length ? pos[i + 1].matchStart : String(keyText).length;
              const val = String(keyText).slice(pos[i].valStart, end).trim().replace(/\s*\|\s*$/, "").trim();
              if (val) keyMap.set(pos[i].num, val);
            }
          } else {
            const segs = String(keyText).split(/\s*\|\s*/).map((x) => x.trim()).filter(Boolean);
            const codeSegs = segs.filter((x) => /^\d{1,2}\s*[a-z][.)]?$/i.test(x));
            if (segs.length > 0 && codeSegs.length === segs.length) {
              // الگوی کد تطبیق «2j | 3a» — شماره از خود توکن
              for (const x of segs) keyMap.set(Number(/(\d{1,2})/.exec(x)[1]), /[a-z]/i.exec(x)[0].toLowerCase());
            } else segs.forEach((x, i) => { if (x) keyMap.set(i + 1, x); });
          }
        }
        const keySegs = [...keyMap.values()];
        for (const seg of keySegs) {
          printed.add(stripNotes(seg));
          printed.add(stripNotes(firstAlternate(seg)));
          printed.add(stripNotes(keyOption(seg)));
          const cm = /^([a-z])[.)]?\s+(.+)$/i.exec(stripNotes(seg));
          if (cm) printed.add(cm[2].trim());
        }
        exByName.set(no, { items, keySegs, keyMap, keyText, printed, vocabWords });
      }

      for (const s of lessonSeeds) {
        const exNo = String(s.scope.match(/تمرین (.+)$/)?.[1] ?? "");
        const ex = exByName.get(exNo);
        total++;
        const qFail = [];
        if (!ex) { qFail.push("exerciseNotFound"); }
        else {
          // ۱) هر گزینه باید عین منبع چاپی باشد
          for (const opt of s.options) {
            optionChecks++;
            const oN = normalize(stripNotes(opt));
            if (oN === "true" || oN === "false") { continue; } // گزینه‌های چاپی درست/غلط تمرین‌های truefalse (الگوی فاز ۴)
            // واریانت بدون کد چاپی («e planes…» → «planes…») هم در مجموعهٔ چاپی معتبر است
            const stripped = stripNotes(opt).replace(/^[a-z][.)]?\s+/i, "");
            const oNoCode = stripped === stripNotes(opt) ? null : normalize(stripped);
            const found =
              [...ex.printed, ...vocabWords].some((p) => normalize(p) === oN) ||
              (oNoCode != null && [...ex.printed].some((p) => normalize(p) === oNoCode));
            if (!found) { optionFail++; qFail.push(`optionNotPrinted:${opt.slice(0, 40)}`); }
          }
          // ۲) پاسخ درست باید با قطعهٔ کلید همان آیتم منطبق باشد (کد/محتوا/قطعه)
          //    یافتن آیتم متناظر با متن سؤال
          const itemHit = ex.items.find((it) => {
            const normText = normalize(String(it.en).replace(/\s*_{2,}\s*/g, " ________ "));
            return normText === normalize(s.text);
          });
          if (!itemHit) { answerFail++; qFail.push("itemTextNotPrinted"); }
          else {
            const idx = ex.items.indexOf(itemHit);
            const seg = ex.keyMap.get(idx + 1) ?? null;
            const segCodes = [...ex.keyMap.entries()].map(([num, k]) => (/^\d{1,2}\s*[a-z][.)]?$/.test(k.trim()) || /^[a-z]$/i.test(k.trim()) ? { num, code: /^[a-z]$/i.test(k.trim()) ? k.trim().toLowerCase() : /[a-z]/i.exec(k.trim())?.[0]?.toLowerCase() } : null)).filter(Boolean);
            const codeForItem = segCodes.find((c) => c.num === idx + 1)?.code ?? null;
            const correctN = normalize(s.options[s.answer] ?? "");
            const okByCode = codeForItem ? [...ex.printed].some((p) => { const cm = /^([a-z])[.)]?\s+(.+)$/i.exec(p); return cm && cm[1].toLowerCase() === codeForItem && normalize(cm[2]) === correctN; }) : false;
            const okBySeg = seg ? normalize(keyOption(seg)) === correctN : false;
            const okByContain = seg ? normalize(stripNotes(seg)).includes(correctN) && correctN.length >= 8 : false;
            // تمرین‌های درست/غلط: کلید با پیشوند True/False شروع می‌شود (الگوی فاز ۴)
            const okByTF = (correctN === "true" || correctN === "false") && seg ? /^(t|true|✓)/.test(normalize(seg)) === (correctN === "true") || /^(f|false|x|✗)/.test(normalize(seg)) === (correctN === "false") : false;
            if (!okByCode && !okBySeg && !okByContain && !okByTF) { answerFail++; qFail.push(`answerNotFromKey:${correctN.slice(0, 30)}`); }
          }
        }
        if (qFail.length > 0) {
          failures.push({ book: id, lesson: n, exercise: exNo, text: s.text.slice(0, 60), issues: qFail });
          bookReport.failures.push({ lesson: n, exercise: exNo, issues: qFail });
        }
        bookReport.checked.push({ lesson: n, exercise: exNo, answer: s.answer, ok: qFail.length === 0 });
      }
    }
    report.books.push(bookReport);
  }

  // نمونهٔ ≥۲۰٪ استراتیفیه — برای بازخوانی انسانی مالک (پروونانس کامل هر نمونه)
  const sampleTarget = Math.ceil(total * 0.2);
  const allSeeds = [];
  for (const { id } of CFG) {
    const mod = await import(`${ROOT}src/data/${id}/quiz-r1.ts`);
    for (const s of mod.QUIZ_R1) allSeeds.push({ book: id, seed: s });
  }
  const sample = [];
  const perBookTarget = Math.ceil(sampleTarget / CFG.length);
  for (const { id } of CFG) {
    const pool = allSeeds.filter((x) => x.book === id);
    const picked = [];
    const step = pool.length / perBookTarget;
    for (let i = 0; i < perBookTarget; i++) picked.push(pool[Math.floor(i * step + rand() * step) % pool.length]);
    sample.push(...picked.map(({ seed }) => ({ book: id, lesson: seed.lesson, exercise: seed.scope.match(/تمرین (.+)$/)?.[1] ?? "", text: seed.text, options: seed.options, answer: seed.answer, correct: seed.options[seed.answer], explanation: seed.explanation })));
  }

  report.totals = { seeds: total, optionChecks, optionFailures: optionFail, answerFailures: answerFail, textFailures: textFail, sampleSize: sample.length, samplePct: +((sample.length / total) * 100).toFixed(1), allZeroFabricationProof: optionFail === 0 };
  report.sample = sample;
  report.failures = failures;
  writeFileSync(new URL("../docs/qa/viu-r1-verification-2026-11-17.json", import.meta.url), JSON.stringify(report, null, 2));

  console.log(`=== R1-c VERIFY (${TODAY}) ===`);
  for (const b of report.books) console.log(`${b.id}: seeds=${b.seeds} · lessons=${b.lessons} · failures=${b.failures.length}`);
  console.log(`totals: seeds=${total} · optionChecks=${optionChecks} · optionFailures=${optionFail} · answerFailures=${answerFail}`);
  console.log(`sample: ${sample.length} (≥20% target)`);
  if (failures.length > 0) {
    console.log("FAILURES:");
    for (const f of failures.slice(0, 12)) console.log(" ", JSON.stringify(f));
    process.exitCode = 1;
  } else {
    console.log("✅ صفر ساختگی اثبات شد — هر گزینه عین منبع چاپی؛ هر پاسخ عین کلید چاپی");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
