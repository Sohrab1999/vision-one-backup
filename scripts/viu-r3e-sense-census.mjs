// R3-e — اجرای مجازی (dry-run مکانیکی) — سرشماری فقط‌خواندنیِ «حس چاپی شماره‌دار» در کپچرهای tracked
// هدف: بازتولید مکانیکیِ یافتهٔ ساختاری ثبت‌شدهٔ نقشه راه (۱۴۰۵/۸/۲۹): «دادهٔ چاپی sense-aware تقریباً موجود نیست»
// — این بار با عدد دقیق per-book از کل کپچرهای census+verify (کف زمینِ دادهٔ مجازِ R3-e پس از گیت STEP 6).
// صفر تغییر دادهٔ محصولی · صفر فراخوانی VLM · صفر عبور از گیت — R3-e همچنان BLOCKED (گیت مستقل STEP 6 مالک).
// خروجی: docs/qa/viu-r3e-sense-census-<date>.json + خلاصهٔ stdout — بازتولیدپذیر با Clone صرف.
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";

const BOOKS = ["elem", "preint", "upper"];
const ROOT = "docs/qa/viu-r3-capture-";
const DATE = "2026-11-20";
const OUT = `docs/qa/viu-r3e-sense-census-${DATE}.json`;

function scanDir(dir) {
  const res = { dir, files: 0, entries: 0, parseErrors: [], senseNonNull: 0, senseWithDef: 0, senseNoDef: 0, wordsWithDefSense: new Map(), unitsWithSense: [] };
  if (!existsSync(dir)) return { ...res, dir: null, skipped: true };
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  for (const f of files) {
    const path = `${dir}/${f}`;
    let json;
    try {
      json = JSON.parse(readFileSync(path, "utf8"));
    } catch (e) {
      res.parseErrors.push({ file: path, error: String(e.message) });
      continue;
    }
    const entries = Array.isArray(json?.entries) ? json.entries : [];
    res.files++;
    res.entries += entries.length;
    let unitSense = 0;
    for (const e of entries) {
      if (e.sense !== null && e.sense !== undefined && String(e.sense).trim() !== "") {
        res.senseNonNull++;
        unitSense++;
        if (e.def !== null && e.def !== undefined && String(e.def).trim() !== "") {
          res.senseWithDef++;
          const key = `${e.word}`;
          res.wordsWithDefSense.set(key, (res.wordsWithDefSense.get(key) || 0) + 1);
        } else {
          res.senseNoDef++;
        }
      }
    }
    if (unitSense > 0) res.unitsWithSense.push({ unit: f, senseNonNull: unitSense });
  }
  res.wordsWithDefSense = [...res.wordsWithDefSense.entries()].map(([word, rows]) => ({ word, rows })).sort((a, b) => b.rows - a.rows);
  return res;
}

const out = {
  meta: {
    phase: "R3-e — dry-run مکانیکی (اجرای مجازی)",
    date: DATE,
    purpose: "سرشماری فقط‌خواندنی دادهٔ «حس چاپی شماره‌دار» در کپچرهای tracked (census+verify سه کتاب) — بازتولید عددیِ یافتهٔ ساختاری نقشه راه کیفیت VIU",
    sources: BOOKS.flatMap((b) => [`docs/qa/viu-r3-capture-${b}/census`, `docs/qa/viu-r3-capture-${b}/verify`]),
    classification: {
      senseWithDef: "حس شماره‌دار چاپی + تعریف چاپی (قالب دیکشنری‌وار — تنها دادهٔ واقعاً قابل‌استناد R3-e)",
      senseNoDef: "sense شماره‌دار بدون تعریف (حساس: کاندید شماره‌گذاری فهرست واژه — نه حس — عین استثنای درس ۳۶ upper ثبت‌شده در نقشه راه)",
    },
    gate: "R3-e همچنان BLOCKED — گیت مستقل STEP 6 مالک + سیاست O3=S2 پابرجا — این سرشماری هیچ گامی از R3-e را اجرا نمی‌کند",
  },
  books: {},
  total: { files: 0, entries: 0, senseNonNull: 0, senseWithDef: 0, senseNoDef: 0 },
};

for (const b of BOOKS) {
  const census = scanDir(`${ROOT}${b}/census`);
  const verify = scanDir(`${ROOT}${b}/verify`);
  const merged = {
    census: census.dir ? census : { skipped: true },
    verify: verify.dir ? verify : { skipped: true },
    summary: {
      files: (census.files || 0) + (verify.files || 0),
      entries: (census.entries || 0) + (verify.entries || 0),
      senseNonNull: (census.senseNonNull || 0) + (verify.senseNonNull || 0),
      senseWithDef: (census.senseWithDef || 0) + (verify.senseWithDef || 0),
      senseNoDef: (census.senseNoDef || 0) + (verify.senseNoDef || 0),
    },
  };
  merged.summary.wordsWithDefSense = [...(census.wordsWithDefSense || []), ...(verify.wordsWithDefSense || [])].reduce((acc, x) => {
    const f = acc.find((y) => y.word === x.word);
    if (f) f.rows += x.rows;
    else acc.push({ ...x });
    return acc;
  }, []).sort((a, b) => b.rows - a.rows);
  merged.summary.unitsWithSense = [
    ...(census.unitsWithSense || []).map((u) => ({ pass: "census", ...u })),
    ...(verify.unitsWithSense || []).map((u) => ({ pass: "verify", ...u })),
  ];
  out.books[b] = merged;
  for (const k of ["files", "entries", "senseNonNull", "senseWithDef", "senseNoDef"]) out.total[k] += merged.summary[k];
}

out.conclusion = {
  finding: `کل کپچرهای tracked سه کتاب: ${out.total.entries.toLocaleString("fa-IR")} رکورد — sense شماره‌دار چاپی با تعریف (دادهٔ واقعاً قابل‌استناد R3-e) = ${out.total.senseWithDef.toLocaleString("fa-IR")} رکورد (${((out.total.senseWithDef / Math.max(1, out.total.entries)) * 100).toFixed(2)}٪) · sense شماره‌دار بدون تعریف (کاندید شماره‌گذاری فهرست) = ${out.total.senseNoDef.toLocaleString("fa-IR")}`,
  roadmapEcho: "عین یافتهٔ نقشه راه (۱۴۰۵/۸/۲۹): دادهٔ چاپی sense-aware تقریباً موجود نیست — R3-e فقط پس از فرمان مستقل مالک (STEP 6) و با دادهٔ واقعی چاپی اجرا می‌شود.",
  verdict: "R3-e — BLOCKED (بدون تغییر) — dry-run کامل شد؛ هیچ تغییر داده یا مکانیزم SENSE اعمال نشد.",
};

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");

for (const b of BOOKS) {
  const s = out.books[b].summary;
  console.log(`${b}: files=${s.files} entries=${s.entries} senseNonNull=${s.senseNonNull} (withDef=${s.senseWithDef} · noDef=${s.senseNoDef})`);
}
console.log(`TOTAL: files=${out.total.files} entries=${out.total.entries} senseWithDef=${out.total.senseWithDef} senseNoDef=${out.total.senseNoDef}`);
console.log(`OUT: ${OUT}`);
if (out.total.parseErrorsOfCensus === 0) void 0;
