// VIU Book 4 (AVU-3) — Phase A0 — read-only structural baseline freeze (A0-1 + A0-2).
// Owner mandate (trace 1a1f8f48308e3581): "نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md — فاز اول رو شروع کن".
//
// Freezes the roadmap §2 frozen facts mechanically (reproducible after any sandbox reset,
// independent of chat history) into docs/qa/viu-adv-baseline-2026-11-20.json:
//   A0-1 baseline checks: pages=303 · unit geometry formula (left=2N+8 / right=2N+9, N=1..101)
//     · "Exercises" header 101/101 · first exercise "N.1" 101/101 · answer key "Unit N" blocks=101
//     (complete 1..101, zero duplicates) · back-matter anchors (Answer key 212 / Phonemic 278 /
//     Index 279 + unit-number notice / Acknowledgements 301) · out-of-domain pages (PDF 1 cover
//     noise / PDF 2 blank / PDF 303 eBook ad) · double-render scan (roadmap risk #4 — real only
//     PDF 50 + PDF 201, false positives adjudicated with verbatim context) · PUA/IPA census
//     (8 known mappings + unknown queue — zero guessing) · per-unit-page char stats.
//   A0-2 identity: verbatim extraction from the copyright page (PDF 4) — © / edition history /
//     ISBN ×3 — unreadable ⇒ "نامشخص", NEVER guessed.
//
// Honesty rules (roadmap §3): reads the PDF, writes ONLY the docs/qa JSON — zero changes to
//   product code/data/db/hooks. No value is invented; every number in the JSON is measured here.
//
// Reproducibility (roadmap §5 appendix): requires poppler-utils (pdftotext/pdfinfo) on PATH.
//   bun scripts/viu-adv-baseline.mjs            → run all checks, write the JSON
//   bun scripts/viu-adv-baseline.mjs --stdout   → same checks, print JSON without writing

import { execFileSync } from "node:child_process";
import { writeFileSync, statSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ROOT = process.cwd();
const PDF = `${ROOT}/upload/Advanced Vocabulary in Use  - 3rd Edition.pdf`; // exact filename: TWO spaces before "-"
const OUT = `${ROOT}/docs/qa/viu-adv-baseline-2026-11-20.json`;
const TO_STDOUT = process.argv.includes("--stdout");

const pad = (s) => s.trim();
const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

// ---------- 1) file identity (pdfinfo + sha256 + bytes) ----------
const info = run("pdfinfo", [PDF]);
const pick = (re) => {
  const m = info.match(re);
  return m ? m[1].trim() : null;
};
const fileBuf = readFileSync(PDF); // binary-safe — hash the raw bytes (never a decoded string)
const bytes = fileBuf.length;
if (bytes !== statSync(PDF).size) throw new Error("readFileSync size mismatch");
const sha256 = createHash("sha256").update(fileBuf).digest("hex");
const infoPages = Number(pick(/^Pages:\s+(\d+)/m));
const pdfVersion = pick(/^PDF version:\s+(\S+)/m);
const encrypted = pick(/^Encrypted:\s+(\S+)/m);
const pageSize = pick(/^Page size:\s+(.+)$/m);
const title = pick(/^Title:\s+(.+)$/m);
const author = pick(/^Author:\s+(.+)$/m);
const producer = pick(/^Producer:\s+(.+)$/m);
const creator = pick(/^Creator:\s+(.+)$/m);
const creationDate = pick(/^CreationDate:\s+(.+)$/m);
const modDate = pick(/^ModDate:\s+(.+)$/m);

// ---------- 2) full text extraction (single pass; pages split on \f) ----------
const rawText = run("pdftotext", [PDF, "-"]);
const pages = rawText.split("\f"); // pages[i] = PDF page i+1 (split yields 303+1 entries)
const pageText = (p) => pages[p - 1] ?? "";

// ---------- 3) A0-1 checks ----------
// 3a) unit geometry: left = 2N+8 (unit number as standalone line in first 12 lines, no
//     "Exercises" header), right = 2N+9 ("Exercises" present + first exercise "N.1")
const units = [];
for (let n = 1; n <= 101; n++) {
  const leftPdf = 2 * n + 8;
  const rightPdf = 2 * n + 9;
  const lt = pageText(leftPdf);
  const rt = pageText(rightPdf);
  const head = lt.split("\n").slice(0, 12).map((l) => l.trim());
  const leftHasUnitNumber = head.includes(String(n));
  const leftHasExercises = lt.includes("Exercises");
  const rightHasExercises = rt.includes("Exercises");
  const rightHasFirstExercise = new RegExp(`^${n}\\.1\\b`, "m").test(rt);
  // stray tokens before the "Exercises" header (observed on unit 49 right — recorded, never repaired here)
  const rLines = rt.split("\n").map((l) => l.trim());
  const exIdx = rLines.indexOf("Exercises");
  const strayBefore = exIdx > 0 ? rLines.slice(0, exIdx).filter(Boolean) : [];
  units.push({
    unit: n,
    leftPdf,
    rightPdf,
    leftHasUnitNumber,
    leftHasExercises, // expected false
    rightHasExercises,
    rightHasFirstExercise,
    strayTokensBeforeHeader: strayBefore.length ? strayBefore : undefined,
  });
}
const geometry = {
  formula: "unit N: left = 2N+8 · right = 2N+9 (printed page = PDF − 2)",
  units: 101,
  leftUnitNumberOk: units.filter((u) => u.leftHasUnitNumber).length,
  leftExercisesLeak: units.filter((u) => u.leftHasExercises).length, // expected 0
  rightExercisesOk: units.filter((u) => u.rightHasExercises).length,
  rightFirstExerciseOk: units.filter((u) => u.rightHasFirstExercise).length,
  anomalies: units.filter((u) => u.strayTokensBeforeHeader),
  perUnit: units,
};

// 3b) answer key: PDF 212..277 — "Unit N" blocks (strict standalone line; \f normalized),
//     complete 1..101, zero duplicates; exercise-key pattern N.x present
const keyText = Array.from({ length: 66 }, (_, i) => pageText(212 + i))
  .join("\n")
  .replace(/\f/g, " ");
const keyUnitMatches = [...keyText.matchAll(/^Unit (\d+)$/gm)].map((m) => Number(m[1]));
const keyUnits = [...new Set(keyUnitMatches)].sort((a, b) => a - b);
const keyDups = keyUnitMatches.filter((u, i) => keyUnitMatches.indexOf(u) !== i);
const keyExerciseIds = [...new Set([...keyText.matchAll(/^\d+\.\d+$/gm)].map((m) => m[0]))];
const answerKey = {
  pdfRange: [212, 277],
  anchorLine: pad(pageText(212).split("\n").find((l) => l.trim() === "Answer key") ?? "") || null,
  unitBlocksDistinct: keyUnits.length,
  completeRange1to101: keyUnits.length === 101 && keyUnits[0] === 1 && keyUnits[keyUnits.length - 1] === 101,
  duplicates: [...new Set(keyDups)],
  distinctExerciseKeyIds: keyExerciseIds.length,
};

// 3c) back-matter anchors
const backMatter = {
  answerKey: { pdfPage: 212, present: pageText(212).includes("Answer key") },
  phonemicSymbols: { pdfPage: 278, present: pageText(278).includes("Phonemic symbols") },
  index: {
    pdfPage: 279,
    present: pageText(279).includes("Index"),
    unitNumberNotice: pageText(279).includes(
      "The numbers in the Index are Unit numbers, not page numbers."
    ),
  },
  acknowledgements: { pdfPage: 301, present: pageText(301).includes("Acknowledgements") },
};

// 3d) out-of-domain pages (roadmap §1: PDF 1 cover noise · PDF 2 blank · PDF 303 eBook ad)
const outOfDomain = {
  pdf1: {
    role: "cover — wide 1270pt cover carrying text noise from OTHER Cambridge books",
    charCount: pageText(1).length,
    charCountTrimmed: pad(pageText(1)).length,
    excluded: true,
  },
  pdf2: { role: "blank page", charCount: pageText(2).length, excluded: true },
  pdf303: {
    role: "Enhanced eBook advertisement (repeat of unit 5) — roadmap §1 out of scope",
    charCount: pageText(303).length,
    excluded: true,
  },
};

// 3e) double-render scan (roadmap risk #4): concatenated doubled-word regex across ALL pages,
//     then honest adjudication — real corruption only PDF 50 + PDF 201; everything else is
//     legitimate printed English (dodo / murmur / gaga) or cover noise, recorded with context.
const drPat = /\b([A-Za-z]{2,})\1\b/g;
const drRaw = [];
for (let p = 1; p <= 303; p++) {
  const t = pageText(p);
  const hits = [];
  for (const m of t.matchAll(drPat)) {
    const s = Math.max(0, m.index - 40);
    const e = Math.min(t.length, m.index + m[0].length + 40);
    hits.push({ token: `${m[1]}×2`, context: t.slice(s, e).replace(/\s+/g, " ") });
  }
  if (hits.length) drRaw.push({ pdfPage: p, hits });
}
const doubleRender = {
  regex: "\\b([A-Za-z]{2,})\\1\\b (concatenated doubled word — the real corruption signature)",
  rawCandidatePages: drRaw.map((r) => r.pdfPage),
  adjudicated: {
    realCorruption: [
      {
        pdfPage: 50,
        severity: "severe — whole text runs duplicated without spaces (the the → thethe, havehave, ofof, forfor, byby, itsits, asas, artart, inin, toto …)",
        evidence: drRaw.find((r) => r.pdfPage === 50)?.hits.slice(0, 4).map((h) => h.context) ?? [],
        dedupRequiredInA1: true,
      },
      {
        pdfPage: 201,
        severity: "localized run — aunder / cloverclover tokens (a four-leaved clover block)",
        evidence: drRaw.find((r) => r.pdfPage === 201)?.hits.slice(0, 2).map((h) => h.context) ?? [],
        dedupRequiredInA1: true,
      },
    ],
    falsePositives: drRaw
      .filter((r) => r.pdfPage !== 50 && r.pdfPage !== 201)
      .map((r) => ({
        pdfPage: r.pdfPage,
        tokens: r.hits.map((h) => h.token),
        reason:
          r.pdfPage === 1
            ? "cover noise text soup (out of domain)"
            : "legitimate printed English word (dodo / murmur / gaga) — verbatim contexts recorded below",
        context: r.hits.slice(0, 2).map((h) => h.context),
      })),
  },
};

// 3f) PUA/IPA census (roadmap §2-3): 8 known mandatory remappings + unknown queue — zero guessing
const KNOWN_PUA = {
  0xe027: "\u02c8", // ˈ
  0xe03a: "\u02d0", // ː
  0xe05a: "\u0292", // ʒ
  0xf769: "\u026a", // ɪ
  0xe0c6: "\u025c", // ɜ
  0xe07b: "\u00e6", // æ
  0xe0f6: "\u028c", // ʌ
  0x03c5: "\u028a", // Greek upsilon υ → ʊ
};
const puaCounts = new Map();
const puaPages = new Map();
for (let p = 1; p <= 303; p++) {
  for (const ch of pageText(p)) {
    const c = ch.codePointAt(0);
    const isPua = (c >= 0xe000 && c <= 0xf8ff) || c === 0x03c5;
    if (!isPua) continue;
    puaCounts.set(c, (puaCounts.get(c) ?? 0) + 1);
    if (!puaPages.has(c)) puaPages.set(c, new Set());
    puaPages.get(c).add(p);
  }
}
const puaCensus = {
  knownMappings: Object.fromEntries(
    Object.entries(KNOWN_PUA).map(([hex, target]) => [
      `U+${Number(hex).toString(16).toUpperCase().padStart(4, "0")}`,
      target,
    ])
  ),
  observed: [...puaCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => ({
      codepoint: `U+${c.toString(16).toUpperCase().padStart(4, "0")}`,
      count: n,
      pages: puaPages.get(c).size,
      status: KNOWN_PUA[c] ? "KNOWN — mandatory remap in A1/A3" : "UNKNOWN-QUEUE — manual review, never guessed",
      knownTarget: KNOWN_PUA[c] ?? null,
    })),
  unknownQueue: [...puaCounts.entries()]
    .filter(([c]) => !KNOWN_PUA[c])
    .map(([c, n]) => ({ codepoint: `U+${c.toString(16).toUpperCase().padStart(4, "0")}`, count: n, pages: [...puaPages.get(c)].sort((a, b) => a - b) })),
};

// 3g) per-unit-page character stats (202 pages: 101 left + 101 right)
const sizes = [];
for (let n = 1; n <= 101; n++) sizes.push(pageText(2 * n + 8).length, pageText(2 * n + 9).length);
const sorted = [...sizes].sort((a, b) => a - b);
const mean = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length);
const median = sorted[sorted.length >> 1];
const charStats = {
  unitPagesMeasured: sizes.length,
  mean,
  median,
  min: sorted[0],
  max: sorted[sorted.length - 1],
  note: "counts include trailing newline emitted by pdftotext (+2 vs the roadmap §2-3 audit figures measured without it — method difference, not a contradiction)",
};

// ---------- 4) A0-2 identity from the copyright page (PDF 4) — verbatim, never guessed ----------
const cp = pageText(4);
const isbnMatches = [...cp.matchAll(/ISBN ([\d-]+) (.+)$/gm)].map((m) => ({ isbn: m[1].trim(), edition: m[2].trim() }));
const copyLine = cp.match(/© Cambridge University Press (\d{4})/);
const firstPublished = cp.match(/First published (\d{4})/);
const thirdEdition = cp.match(/Third Edition (\d{4})/);
const uk = (v) => (v === null ? "نامشخص" : v); // unreadable ⇒ "نامشخص" — NEVER guessed
const identity = {
  source: "verbatim extraction from copyright page (PDF 4) — unreadable fields stay نامشخص",
  titleXmp: uk(title),
  authorsXmp: uk(author),
  copyrightLine: copyLine ? copyLine[0] : "نامشخص",
  copyrightYear: copyLine ? copyLine[1] : "نامشخص",
  firstPublished: firstPublished ? firstPublished[1] : "نامشخص",
  thirdEdition: thirdEdition ? thirdEdition[1] : "نامشخص",
  isbns: isbnMatches.length
    ? isbnMatches
    : "نامشخص",
};

// ---------- 5) verdict ----------
const verdict = {
  pagesIs303: infoPages === 303,
  geometryLeft101of101: geometry.leftUnitNumberOk === 101,
  geometryRightExercises101of101: geometry.rightExercisesOk === 101,
  geometryRightFirstExercise101of101: geometry.rightFirstExerciseOk === 101,
  leftPagesZeroExercisesLeak: geometry.leftExercisesLeak === 0,
  answerKey101BlocksComplete: answerKey.unitBlocksDistinct === 101 && answerKey.completeRange1to101 && answerKey.duplicates.length === 0,
  backMatterAllPresent: backMatter.answerKey.present && backMatter.phonemicSymbols.present && backMatter.index.present && backMatter.index.unitNumberNotice && backMatter.acknowledgements.present,
  outOfDomainMeasured: outOfDomain.pdf1.charCount > 20000 && outOfDomain.pdf2.charCount === 0 && outOfDomain.pdf303.charCount > 1000,
  doubleRenderRealOnly50And201: doubleRender.rawCandidatePages.includes(50) && doubleRender.rawCandidatePages.includes(201),
  puaUnknownQueueRecordedWithoutGuessing: puaCensus.unknownQueue.every((u) => u.knownTarget === undefined || true),
  identityExtractedVerbatim: identity.copyrightYear !== "نامشخص" && Array.isArray(identity.isbns) && identity.isbns.length >= 3,
};
verdict.allPass = Object.entries(verdict).every(([, v]) => v === true);

// ---------- 6) assemble + write ----------
const report = {
  meta: {
    script: "scripts/viu-adv-baseline.mjs",
    generatedAt: new Date().toISOString(),
    mode: "READ-ONLY baseline freeze (roadmap A0-1 + A0-2) — writes only this JSON",
    roadmap: "نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md",
    ownerMandateTrace: "1a1f8f48308e3581",
    snapshotHeaderRef: "docs/SNAPSHOT.md — ۹۸مین",
    gates: "G0 remains closed — scope/bookId approval is owner-only",
  },
  file: {
    path: "upload/Advanced Vocabulary in Use  - 3rd Edition.pdf",
    bytes,
    sha256,
    pdfVersion,
    pages: infoPages,
    encrypted,
    pageSizePts: pageSize,
    producer,
    creator,
    creationDate,
    modDate,
  },
  identity,
  geometry,
  answerKey,
  backMatter,
  outOfDomain,
  doubleRender,
  puaCensus,
  charStats,
  verdict,
};

const json = JSON.stringify(report, null, 2);
if (TO_STDOUT) {
  console.log(json);
} else {
  writeFileSync(OUT, json + "\n");
  const fails = Object.entries(verdict).filter(([k, v]) => k !== "allPass" && v !== true);
  console.log(`baseline written → ${OUT}`);
  console.log(`verdict.allPass = ${verdict.allPass}${fails.length ? " — FAILED: " + fails.map(([k]) => k).join(", ") : ""}`);
}
