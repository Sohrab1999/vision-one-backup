// R3-e گیت STEP 6 — راستی‌آزمایی منبع چاپی حس‌های شماره‌دار (صفحه‌محور)
// ─────────────────────────────────────────────────────────────────────────────
// مأموریت: نقشهٔ راه کیفیت سه‌کتابی VIU — فاز R3-e (سیاست O3 = S2 CONTROLLED SENSE-LEVEL)
// فرمان مالک: «اینو شروع کن» (quoted R3-e gate — IM channel zai-web — trace 1a2043987aa69c95) — ۱۴۰۵/۹/۱ (۲۰۲۶-۱۱-۲۲)
//
// سه PDF tracked (مالک) = منبع چاپی (چاپ دوم — اسکن دیجیتال):
//   elem   SHA256 35ea1b5b… · preint SHA256 0dfdab2e… · upper SHA256 415fc985…
// نگاشت صفحه (docs/qa/viu-images-phase1-c-*-2026-11-14.json layoutRule — audit 2026-11-09):
//   preint unit 3  → PDF p.15 (کتاب p.8)  — مدخل نمونهٔ دیکشنری «seat¹»
//   upper  unit 5  → PDF p.17 (کتاب p.12) — مدخل‌های نمونهٔ دیکشنری «malignant»/«hairy»
//   elem   unit 11 → PDF p.29 (کتاب p.22) — کنترل منفی: شمارهٔ حس چاپی برای turn down/take off؟
// صفحات صرف‌نظرشده (آرتیفکت ثبت‌شدهٔ census):
//   upper 36 = شماره‌گذاری فهرست واژه · upper 100 = تابلوها · upper 86/elem 11 = شماره‌های اپراتوری/تمرینی
//
// روش: pdftoppm 300DPI → z-ai vision (رونویسی verbatim متمرکز) → cross-check مکانیکی
//      علیه دو گذر census/verify موجود → کپچر tracked جدید docs/qa/viu-r3e-capture-<book>/
// خروجی: کپچر JSON با پروونانس کامل (SHA/صفحه/DPI/مدل/زمان) — قالب عین کپچرهای R3 + فیلد provenance
// بازتولید از Clone صرف: bun scripts/viu-r3e-verify-source.mjs upper|preint|elem
// صفر تغییر دادهٔ runtime در این اسکریپت — wiring در گام جداگانهٔ گیت‌دار انجام می‌شود.

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BOOKS = {
  upper: {
    pdf: "upload/Vocabulary In Use-Upper Intermediate 2nd Edition.pdf",
    sha256: "415fc9856e16afb7",
    pdfPage: 17,
    bookPage: 12,
    unit: 5,
    layoutRule: "N=1..15: [2N+7,2N+8] (audit 2026-11-09)",
    kind: "dict-samples",
    outDir: "docs/qa/viu-r3e-capture-upper",
  },
  preint: {
    pdf: "upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf",
    sha256: "0dfdab2ef0730596",
    pdfPage: 15,
    bookPage: 8,
    unit: 3,
    layoutRule: "lesson N = PDF pages [2N+9, 2N+10] (audit 2026-11-09)",
    kind: "dict-samples",
    outDir: "docs/qa/viu-r3e-capture-preint",
  },
  elem: {
    pdf: "upload/Vocabulary In Use-Elementary 2nd Edition.pdf",
    sha256: "35ea1b5be92eef4c",
    pdfPage: 29,
    bookPage: 26, // برچسب چاپی صفحه (خوانش VLM) — آفست front-matter این کتاب با دو کتاب دیگر متفاوت است
    unit: 11,
    layoutRule: "lesson N = PDF pages [2N+7, 2N+8] (audit 2026-11-09)",
    kind: "negative-control",
    outDir: "docs/qa/viu-r3e-capture-elem",
  },
};

const PROMPTS = {
  "dict-samples": (ctx) => `You will receive ONE scanned page (300 DPI) from "${ctx.title}" — the LEFT page of Unit ${ctx.unit} (printed footer should read ${ctx.bookPage}). This unit teaches how to use a dictionary and contains SAMPLE dictionary entries printed on the page (e.g. ${ctx.expect}).

Transcribe ONLY the printed sample dictionary entries, VERBATIM, as strict JSON:
{"footer": <printed page number at bottom, integer or null>,
 "entries": [
   {"headword":"<exactly as printed, including syllable dots/middle dots and superscript sense numbers like seat¹>",
    "pos":"<printed part-of-speech label or null>",
    "phonetic":"<printed IPA or null>",
    "labels":"<printed grammatical labels like [C] [T] [U] or null>",
    "senses":[
      {"number":"<printed sense number as string, or null if not printed>",
       "definition":"<printed definition verbatim, or null>",
       "examples":["<each printed example sentence/phrase verbatim>"]}
    ],
    "relatedForms":[{"word":"<derived form printed near the entry, e.g. malignancy>","pos":"...","phonetic":"...","labels":"...","senses":[...same shape...]}]
   }
 ]
}
HARD RULES:
- Only what is PRINTED on this page. Never invent, complete, or correct the text.
- If text is unclear, transcribe your best reading and append "[?]".
- Sense "number" must be a number actually PRINTED in the entry (bold numbers like 1 2 or superscripts). If the entry has no printed numbers, use null — do not invent numbering.
- Copy punctuation, parentheses like (= ...), semicolons, [C]/[T]/[U] labels EXACTLY.
- Sub-senses printed as (a) (b) belong inside the same sense's definition text.
Return ONLY the JSON object, no commentary.`,
  "negative-control": (ctx) => `You will receive ONE scanned page (300 DPI) from "${ctx.title}" — the LEFT page of Unit ${ctx.unit} (printed footer should read about ${ctx.bookPage}). Unit topic: phrasal verbs (turn down, take off, ...).

Answer STRICT JSON:
{"footer": <printed page number at bottom, integer or null>,
 "headwords": ["<every bold phrasal-verb headword printed on the page, in order>"],
 "printedSenseNumbers": <true ONLY if the page itself shows printed sense numbers (like bold 1 2 or superscripts ¹ ²) attached to meanings/definitions of a headword; false if meanings are listed as separate rows/bullets without printed numbers>,
 "evidence": "<one short sentence describing exactly what is printed next to turn down and take off meanings — numbered? bullet? separate rows?>",
 "sampleTranscription": "<verbatim transcription of the printed lines for 'turn down' (all its printed meanings/examples) exactly as they appear, including any numbers if printed>"
}
HARD RULES: only what is PRINTED. Never invent numbers. Return ONLY the JSON object.`,
};

const TITLES = {
  upper: "English Vocabulary in Use — Upper-intermediate (2nd ed.)",
  preint: "English Vocabulary in Use — Pre-intermediate & Intermediate (2nd ed.)",
  elem: "English Vocabulary in Use — Elementary (2nd ed.)",
};

const EXPECT = { upper: "ma·lig·nant, malignancy, hairy", preint: "seat¹", elem: "turn down, take off" };

const pad3 = (n) => String(n).padStart(3, "0");

function renderPage(book, cfg) {
  const dir = `/tmp/viu/r3e/${book}`;
  mkdirSync(dir, { recursive: true });
  // pdftoppm پسوند «-<شمارهٔ صفحه» به نام خروجی می‌چسباند — نام واقعی را از دیسک پیدا کن
  const stem = `p${pad3(cfg.pdfPage)}`;
  const candidates = [`${dir}/${stem}-${pad3(cfg.pdfPage)}.png`, `${dir}/${stem}.png`];
  for (const c of candidates) if (existsSync(c)) return c;
  execFileSync("pdftoppm", ["-f", String(cfg.pdfPage), "-l", String(cfg.pdfPage), "-r", "300", "-png", cfg.pdf, `${dir}/${stem}`], { timeout: 120000 });
  for (const c of candidates) if (existsSync(c)) return c;
  throw new Error(`render failed: no PNG produced in ${dir}`);
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function callVision(img, prompt) {
  const out = "/tmp/viu/r3e/_last_response.json";
  const args = ["vision", "-p", prompt, "-i", img, "-o", out];
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 240000 });
      const raw = JSON.parse(readFileSyncCompat(out));
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const obj = extractJson(content);
      if (obj) return { obj, raw: content };
    } catch {
      /* retry */
    }
  }
  return null;
}

import { readFileSync } from "node:fs";
function readFileSyncCompat(p) {
  return readFileSync(p, "utf8");
}

// ── cross-check مکانیکی علیه دو گذر موجود census/verify ──
function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9'():;=.,\/\- ]/g, "")
    .trim();
}
function loadExistingPass(book, unit) {
  const out = {};
  for (const pass of ["census", "verify"]) {
    const p = `docs/qa/viu-r3-capture-${book}/${pass}/unit-${pad3(unit)}.json`;
    if (existsSync(p)) {
      try {
        out[pass] = JSON.parse(readFileSync(p, "utf8")).entries ?? [];
      } catch {
        out[pass] = [];
      }
    } else out[pass] = [];
  }
  return out;
}
function crossCheck(book, unit, fresh) {
  const old = loadExistingPass(book, unit);
  const rows = (fresh.entries ?? []).flatMap((e) => [
    ...e.senses.map((s) => ({ word: e.headword, sense: s.number, def: s.definition, example: (s.examples ?? [])[0] ?? null })),
  ]);
  const cmp = rows.map((r) => {
    const find = (arr) =>
      arr.filter((o) => normText(o.word).replace(/·/g, "") === normText(r.word).replace(/·/g, "") && (r.sense == null || String(o.sense) === String(r.sense)));
    const c = find(old.census);
    const v = find(old.verify);
    const best = (arr) => arr[0] ?? null;
    const cc = best(c);
    const vv = best(v);
    return {
      word: r.word,
      sense: r.sense,
      inCensus: !!cc,
      inVerify: !!vv,
      defMatchCensus: cc ? normText(cc.def) === normText(r.def) : null,
      defMatchVerify: vv ? normText(vv.def) === normText(r.def) : null,
    };
  });
  return { oldPassesScanned: Object.keys(old), rows: cmp, mismatches: cmp.filter((x) => x.inCensus && x.defMatchCensus === false && x.inVerify && x.defMatchVerify === false).length };
}

const bookArg = process.argv[2];
if (!bookArg || !BOOKS[bookArg]) {
  console.error("usage: viu-r3e-verify-source.mjs <upper|preint|elem>");
  process.exit(1);
}
const cfg = BOOKS[bookArg];
const img = renderPage(bookArg, cfg);
const prompt = PROMPTS[cfg.kind]({ title: TITLES[bookArg], unit: cfg.unit, bookPage: cfg.bookPage, expect: EXPECT[bookArg] });
console.log(`[${bookArg}] rendered: ${img} — calling z-ai vision…`);
const res = await callVision(img, prompt);
if (!res) {
  console.error(`[${bookArg}] VLM FAILED after 3 attempts — no capture written (صفر حدس)`);
  process.exit(2);
}
const cross = cfg.kind === "dict-samples" ? crossCheck(bookArg, cfg.unit, res.obj) : { note: "negative-control — no expected rows" };
const capture = {
  unit: cfg.unit,
  phase: "R3-e",
  kind: cfg.kind,
  executedAt: new Date().toISOString().slice(0, 10),
  provenance: {
    sourcePdf: cfg.pdf,
    pdfSha256: cfg.sha256 + "…",
    pdfPage: cfg.pdfPage,
    bookPage: cfg.bookPage,
    layoutRule: cfg.layoutRule,
    dpi: 300,
    renderTool: "pdftoppm",
    visionModel: "z-ai vision CLI (GLM)",
    promptKind: cfg.kind,
    script: "scripts/viu-r3e-verify-source.mjs",
    ownerCommand: "«اینو شروع کن» — trace 1a2043987aa69c95 — ۱۴۰۵/۹/۱",
  },
  result: res.obj,
  crossCheck,
};
mkdirSync(cfg.outDir, { recursive: true });
const outPath = `${cfg.outDir}/unit-${pad3(cfg.unit)}.json`;
writeFileSync(outPath, JSON.stringify(capture, null, 1) + "\n");
console.log(`[${bookArg}] capture written: ${outPath}`);
console.log(JSON.stringify({ footer: res.obj.footer, entries: (res.obj.entries ?? []).length, cross }, null, 1).slice(0, 2000));
