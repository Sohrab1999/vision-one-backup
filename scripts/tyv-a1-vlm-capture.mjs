// TYV A1 — لایهٔ استخراج خام صفحه‌محور (رونویسی VLM) — سری Test Your Vocabulary in Use
// ─────────────────────────────────────────────────────────────────────────────
// مأموریت: intake پنج فایل آپلودی مالک ⇒ ۴ کتاب متمایز + ۱ نسخهٔ تکراری (اثبات هش صفحه در
//          docs/qa/tyv-intake-a0-fingerprint-2026-11-22.json) — نقشه راه مادر:
//          «نقشه راه ها/سری-TYV/01-نقشه-راه-استخراج-باکیفیت-Test-Your-Vocabulary-مادر-چهار-کتاب-2026-11-22.md»
// فرمان مالک: «این کتاب ها رو بررسی کن برای هر کدوم یک نقشه راه بنویس و یک استخراج با کیفیت رو
//          باید شروع کنیم» — trace 1a20458b14c63e71 — channel zai-web — ۱۴۰۵/۹/۲ (۲۰۲۶-۱۱-۲۲)
//
// واقعیت منبع: هر ۵ PDF اسکن تصویری بدون لایهٔ متنی‌اند (pdftotext ≈ صفر کاراکتر) ⇒
//          A1 = رونویسی VLM صفحه‌به‌صفحه (عین الگوی scripts/viu-r3e-verify-source.mjs — z-ai vision CLI).
//
// روش: pdftoppm 300DPI grayscale → z-ai vision (رونویسی verbatim ساختارمند) → JSON با پروونانس کامل
//      (SHA صفحهٔ رندر / DPI / مدل / نسخهٔ پرامپت / زمان) → docs/qa/tyv-capture-<book>/a1/page-NNN.json
// checkpoint/resume: صفحات دارای JSON موجود رد می‌شوند — ادامهٔ مأموریت = اجرای مجدد با «all».
//
// بازتولید از Clone صرف (PDFها نزد مالک — تطبیق SHA الزامی):
//   bun scripts/tyv-a1-vlm-capture.mjs elem 8,12,40        ← پروب/صفحات مشخص
//   bun scripts/tyv-a1-vlm-capture.mjs pri all             ← پوشش کامل (resumable)
//
// صفر تغییر دادهٔ runtime در این اسکریپت — صفر wired به src/ — فقط کپچر خام (A2 پارس جداگانهٔ گیت‌دار).

import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad3 = (n) => String(n).padStart(3, "0");

const OWNER_COMMAND =
  "«این کتاب ها رو بررسی کن برای هر کدوم یک نقشه راه بنویس و یک استخراج با کیفیت رو باید شروع کنیم» — trace 1a20458b14c63e71";

const BOOKS = {
  biz: {
    id: "tyv-biz",
    title: "Test your Business Vocabulary in Use (Bethell & Aspinall — Cambridge University Press)",
    pdf: "upload/Test Your English Vocabulary in Use-Business.pdf",
    sha256: "296197b718cf37ff8633ee54754a0d1afc64c8779385fb3e3ca1663b4961e837",
    pages: 98,
    outDir: "docs/qa/tyv-capture-biz",
    probe: [4, 6, 43],
  },
  elem: {
    id: "tyv-elem",
    title: "Test Your English Vocabulary in Use — Elementary (Second Edition 2010 — McCarthy & O'Dell)",
    pdf: "upload/Test Your English Vocabulary in Use-Elementary.pdf",
    sha256: "bbe34425b4b2947d510444f0cb9483b5276c62a35f36cc57598389b98baffdad",
    pages: 96,
    outDir: "docs/qa/tyv-capture-elem",
    probe: [8, 12, 40],
  },
  pri: {
    id: "tyv-pri",
    title: "Test Your English Vocabulary in Use — pre-intermediate & intermediate (Stuart Redman & Ruth Gairns — CUP)",
    pdf: "upload/Test Your English Vocabulary in Use-Pre & Int.pdf",
    sha256: "89a8cd2c8dba7c58c994c91877a9fc07e3b656d0412ded3c900440071b2f9071",
    pages: 142,
    outDir: "docs/qa/tyv-capture-pri",
    probe: [7, 10, 41],
  },
  upp: {
    id: "tyv-upp",
    title: "Test Your English Vocabulary in Use — upper-intermediate (McCarthy & O'Dell — CUP 2001)",
    pdf: "upload/Test Your English Vocabulary in Use-Upper Intermediate.pdf",
    sha256: "e4014bdfb072d27b154d03f6bf3bb148ed2749b1ddca6bd12810a74c22105010",
    pages: 153,
    outDir: "docs/qa/tyv-capture-upp",
    probe: [9, 11, 45],
  },
};

const PROMPT_VERSION = "tyv-a1-v1";

function buildPrompt(cfg, page) {
  return `You will receive ONE scanned page (300 DPI) from a Cambridge vocabulary TEST book: "${cfg.title}" (PDF page ${page} of ${cfg.pages}).

Transcribe the page VERBATIM as strict JSON:
{"footer": <printed page number at the bottom of the page, integer or null>,
 "testNumber": "<printed test number as printed, like 1 or 18 or '1-3', or null if none>",
 "testTitle": "<printed test title, verbatim, or null>",
 "exercises": [
   {"id": "<printed exercise id like 1.1 or 48.2>",
    "marks": "<printed marks label like '10 marks' or null>",
    "instruction": "<printed instruction sentence(s), verbatim>",
    "items": ["<each numbered item/line of this exercise verbatim, in order — if an 'Example:' line is printed, include it first exactly as printed>"]}
 ],
 "boxesAndLists": ["<every word-box / answer-bank / option-list printed on the page, verbatim, one string each>"],
 "pictures": ["<one short note per picture/illustration/grid/crossword/word-square/diagram on the page, e.g. 'crossword grid with clues 1.2 Across/Down' or '4-line-drawing picture labeling exercise'>"],
 "unclassified": ["<any remaining printed text that does not fit above, verbatim>"]
}
HARD RULES:
- Only what is PRINTED on this page. Never invent, complete, or correct the text.
- If a word is unclear, transcribe your best reading and append "[?]".
- Copy punctuation, brackets, slashes, dashes, IPA and superscripts EXACTLY as printed.
- Do NOT answer the exercises — transcribe them only.
- If part of the page is an illustration with no readable text, describe it under "pictures" only.
Return ONLY the JSON object, no commentary.`;
}

function renderPage(cfg, page) {
  const dir = `/tmp/tyv/a1/${cfg.id}`;
  mkdirSync(dir, { recursive: true });
  const stem = `p${pad3(page)}`;
  // pdftoppm طول عدد پسوند را بر اساس تعداد کل صفحات سند انتخاب می‌کند (۹۸ صفحه ⇒ ۲ رقم) —
  // پس پسوند را با اسکن دایرکتوری پیدا می‌کنیم، نه با حدس padding (درس اجرای واقعی ۲۰۲۶-۱۱-۲۲).
  execFileSync(
    "pdftoppm",
    ["-f", String(page), "-l", String(page), "-r", "300", "-gray", "-png", cfg.pdf, `${dir}/${stem}`],
    { timeout: 120000 },
  );
  const found = readdirSync(dir).find(
    (f) => f.startsWith(`${stem}-`) || f === `${stem}.png`,
  );
  if (found) return `${dir}/${found}`;
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
  const out = `/tmp/tyv/a1/_last_response.json`;
  const args = ["vision", "-p", prompt, "-i", img, "-o", out];
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 240000 });
      const raw = JSON.parse(readFileSync(out, "utf8"));
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const obj = extractJson(content);
      return { obj, raw: content };
    } catch {
      /* retry */
    }
  }
  return null;
}

function sha256File(p) {
  return createHash("sha256").update(readFileSync(p)).digest("hex");
}

function readIndex(cfg) {
  const p = `${cfg.outDir}/a1-index.json`;
  if (existsSync(p)) {
    try {
      return JSON.parse(readFileSync(p, "utf8"));
    } catch {
      /* fallthrough */
    }
  }
  return null;
}

async function main() {
  const [bookArg, pagesArg] = process.argv.slice(2);
  if (!BOOKS[bookArg] || !pagesArg) {
    console.error("usage: bun scripts/tyv-a1-vlm-capture.mjs <biz|elem|pri|upp> <pages: 8,9,12 | all>");
    process.exit(1);
  }
  const cfg = BOOKS[bookArg];
  if (!existsSync(cfg.pdf)) {
    console.error(`source PDF missing: ${cfg.pdf} — بازیابی = آپلود مجدد مالک با تطبیق SHA ${cfg.sha256.slice(0, 16)}…`);
    process.exit(1);
  }
  const pages =
    pagesArg === "all"
      ? Array.from({ length: cfg.pages }, (_, i) => i + 1)
      : pagesArg.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => n >= 1 && n <= cfg.pages);
  if (pages.length === 0) {
    console.error("no valid pages selected");
    process.exit(1);
  }

  const a1Dir = `${cfg.outDir}/a1`;
  mkdirSync(a1Dir, { recursive: true });

  let captured = 0;
  let skipped = 0;
  let failed = [];
  for (const page of pages) {
    const outPath = `${a1Dir}/page-${pad3(page)}.json`;
    if (existsSync(outPath)) {
      skipped++;
      continue; // checkpoint/resume
    }
    const img = renderPage(cfg, page);
    const renderSha = sha256File(img);
    const res = await callVision(img, buildPrompt(cfg, page));
    const attempts = res ? "≤3" : "3 (all failed)";
    const record = {
      provenance: {
        phase: "A1 — لایهٔ استخراج خام (رونویسی VLM صفحه‌محور)",
        book: cfg.id,
        title: cfg.title,
        pdf: cfg.pdf,
        pdfSha256: cfg.sha256,
        pdfPage: page,
        dpi: 300,
        renderSha256: renderSha,
        model: "z-ai vision CLI",
        promptVersion: PROMPT_VERSION,
        ownerCommand: OWNER_COMMAND,
        attempts,
        timestamp: new Date().toISOString(),
      },
      status: res && res.obj ? "ok" : res ? "parse-failed" : "vision-failed",
      transcription: res && res.obj ? res.obj : null,
      rawModelText: res ? res.raw : null,
    };
    writeFileSync(outPath, JSON.stringify(record, null, 2), "utf8");
    if (record.status === "ok") captured++;
    else failed.push(page);
    console.log(`page ${page}: ${record.status}`);
  }

  const prev = readIndex(cfg);
  const index = {
    book: cfg.id,
    title: cfg.title,
    pdf: cfg.pdf,
    pdfSha256: cfg.sha256,
    pagesTotal: cfg.pages,
    capturedPages: pages.length,
    capturedNow: captured,
    skippedExisting: skipped,
    failedNow: failed,
    failedTotal: failed.length,
    mode: pagesArg === "all" ? "full-sweep (resumable)" : "probe/partial",
    probePages: cfg.probe,
    updatedAt: new Date().toISOString(),
    previousIndex: prev ? { capturedPages: prev.capturedPages, updatedAt: prev.updatedAt } : null,
  };
  writeFileSync(`${cfg.outDir}/a1-index.json`, JSON.stringify(index, null, 2), "utf8");
  console.log(`DONE ${cfg.id}: captured=${captured} skipped=${skipped} failed=${failed.length} → ${a1Dir}`);
}

main();
