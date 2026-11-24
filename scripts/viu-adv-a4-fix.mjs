// VIU Book 4 (AVU-3) — Phase A4-3 — targeted fix wave for the FA-NEW layer (idempotent).
// Roadmap §A4-3: surgical idempotent script, pattern of the three-book viu-r4-b-translation-fix.mjs
// — ONLY the segments the A4-2 GLM adjudication failed (docs/qa/viu-adv-a4-fa-sample-2026-11-21.json
// → stats.failRate ≤ 25% stop rule respected; every re-translation carries the failure reason as
// context, is re-judged, and the cache keys stay stable so re-runs skip already-fixed segments).
// Class stays FA-NEW (A4-4: FA-REVIEWED only via owner human adjudication — پوشش ≠ صحت).

import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";

const FA_OUT = "docs/qa/viu-adv-capture/fa-cache.json";
const SAMPLE = "docs/qa/viu-adv-a4-fa-sample-2026-11-21.json";
const OUT = "docs/qa/viu-adv-a4-fa-fixwave-2026-11-21.json";

const SYSTEM = `تو ویراستارِ ترجمهٔ فارسی محتوای آموزشی کتاب «English Vocabulary in Use — Advanced» هستی.
یک ترجمهٔ ماشینی مردود به‌همراه دلیل داوری به تو داده می‌شود؛ نسخهٔ اصلاح‌شدهٔ نهایی را بنویس.
قواعد: فقط JSONL — هر خط یک شیء {"k":"کلید","fa":"ترجمهٔ اصلاح‌شده"} — بدون بک‌تیک و متن دیگر.
جای‌خالی‌های «____» را عیناً نگه دار؛ ارقام و حروف گزینه و نمادهای IPA را حفظ کن؛ فارسی طبیعی و دقیق.`;

const extract = (raw, keys) => {
  const map = new Map();
  for (const line of String(raw).split(/\n+/)) {
    const t = line.trim().replace(/^,+|,+$/g, "");
    if (!t.startsWith("{")) continue;
    try {
      const row = JSON.parse(t);
      if (row && typeof row.k === "string" && typeof row.fa === "string" && row.fa.trim() && (!keys || keys.has(row.k))) map.set(row.k, row.fa.replace(/\s+/g, " ").trim());
    } catch { /* skip malformed line */ }
  }
  return map;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- run ----------
const cache = JSON.parse(readFileSync(FA_OUT, "utf8"));
const sample = JSON.parse(readFileSync(SAMPLE, "utf8"));
const rate = sample.stats?.failRate ?? 0;
if (rate > 0.25) {
  console.error(`A4-3 STOP: failRate ${(rate * 100).toFixed(1)}% > 25% — fix wave halted, policy report goes to the owner (roadmap stop rule)`);
  process.exit(3);
}
const fails = sample.fails ?? [];
if (!fails.length) { console.log("A4-3: nothing to fix — zero failed segments"); process.exit(0); }
console.log(`A4-3 fix wave: ${fails.length} failed segments (failRate ${(rate * 100).toFixed(1)}%)`);

const zai = await ZAI.create();
const fixed = [], stillBad = [];
// batch the fixes 5-per-call (JSONL) — 66 segments ≈ 14 calls instead of 66
for (let i = 0; i < fails.length; i += 5) {
  const group = fails.slice(i, i + 5).filter((f) => cache.segments[f.k]);
  const todo = group.filter((f) => !cache.segments[f.k].faFixed);
  for (const f of group) if (!cache.segments[f.k]) stillBad.push({ ...f, note: "segment missing from cache" });
  if (todo.length) {
    const user = `موارد زیر را اصلاح کن. خروجی: هر خط دقیقاً یک شیء JSON مستقل {"k":"کلید","fa":"ترجمهٔ اصلاح‌شده"} — بدون بک‌تیک و متن دیگر.
${todo.map((f, j) => `${j + 1}. کلید: ${f.k}
   متن انگلیسی: ${cache.segments[f.k].en}
   ترجمهٔ مردود: ${cache.segments[f.k].fa}
   دلیل داوری: ${f.reason}`).join("\n")}`;
    for (let apiTry = 1; apiTry <= 6; apiTry++) {
      try {
        const completion = await zai.chat.completions.create({
          messages: [{ role: "assistant", content: SYSTEM }, { role: "user", content: user }],
          thinking: { type: "disabled" },
        });
        const map = extract(completion.choices[0]?.message?.content ?? "", new Set(todo.map((f) => f.k)));
        for (const f of todo) {
          if (map.has(f.k)) {
            const seg = cache.segments[f.k];
            seg.fa = map.get(f.k);
            seg.faFixed = true;
            seg.fixReason = f.reason;
            fixed.push(f.k);
          }
        }
        break;
      } catch (e) {
        if (!/429|5\d\d|timeout|ECONN/i.test(String(e.message)) || apiTry === 6) { for (const f of todo) if (!fixed.includes(f.k)) stillBad.push({ ...f, note: e.message }); break; }
        await sleep(30000 * apiTry);
      }
    }
    for (const f of todo) if (!fixed.includes(f.k) && !stillBad.some((s) => s.k === f.k)) stillBad.push({ ...f, note: "no valid JSONL line" });
  }
  await sleep(15000);
  if ((i + 5) % 25 === 0 || i + 5 >= fails.length) writeFileSync(FA_OUT, JSON.stringify(cache, null, 2) + "\n");
}
writeFileSync(FA_OUT, JSON.stringify(cache, null, 2) + "\n");

const report = {
  meta: {
    phase: "A4-3",
    date: "2026-11-21",
    generator: "scripts/viu-adv-a4-fix.mjs",
    pattern: "عین viu-r4-b-translation-fix.mjs — فقط مردودها — idempotent (کلیدها پایدار، faFixed پرچم)",
    inputSample: SAMPLE,
    failRateIn: rate,
    law: "پوشش ≠ صحت — کلاس دست‌نخورده FA-NEW؛ FA-REVIEWED فقط با داوری انسانی مالک",
  },
  totals: { failed: fails.length, fixed: fixed.length, stillBad: stillBad.length },
  fixedKeys: fixed,
  stillBad,
};
writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");
console.log(`A4-3 done: failed=${fails.length} fixed=${fixed.length} stillBad=${stillBad.length} → ${OUT}`);
