// VIU Book 4 (AVU-3) — Phase A1 — coordinate-aware RAW text extraction (A1-1..A1-7).
// Owner mandate (trace 1a1f939be664ef49): "برو سراغ فاز یا قدم بعدی از نقشه راه استخراج کتاب چهارم VIU"
//   — this message opens the G0 gate (scope + bookId viu-advanced confirmed by owner command naming
//   the roadmap's next step) and commands Phase A1, exactly as trace 1a1f8f48308e3581 ("فاز اول رو شروع کن")
//   commanded A0. Roadmap: نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md
//
// Roadmap mapping (§۴ فاز A1):
//   A1-1 coordinate-aware extraction: pdftotext -bbox for both pages of every unit (never raw linear text).
//   A1-2 left-page column gap: main text / numbered mini-dictionary separated mechanically at the page's
//        detected gap (calibration: unit 1 gap [376,391]pt · unit 3 gap [332,342]pt — the roadmap's
//        x≈400–430 was an audit approximation; the mechanical rule below detects the real gap per page).
//        Superscript refs ¹²³ (small-font digits) are recorded as refMarkers and stay inline in the text.
//        Pages without a numbered-column signature (e.g. unit 4 inline bold phrases, Language-help pages)
//        honestly stay single-stream — recorded in the per-unit JSON, never forced.
//   A1-3 fixed band removal: right-page running header (yMin<40 — verified: exactly "Exercises" on 101/101)
//        and both-page footer (yMin>715 — folio/book-title). Removed tokens are recorded verbatim per page.
//        Left-page y<40 holds the unit title + big unit number (CONTENT, not a running header — A0/§۲-۴)
//        and is therefore KEPT and tagged "title" — a documented precision refinement of the roadmap band,
//        so no unit identity is ever destroyed (golden rule: no silent loss).
//   A1-4 out-of-domain pages excluded: PDF 1 (cover noise), PDF 2 (blank), PDF 303 (eBook ad) — never read.
//   A1-5 IPA remap: the 8 mandatory §۲-۳ mappings applied everywhere; every other PUA codepoint stays
//        verbatim and is queued (U+E022 etc.) — zero guessing.
//        G1 amendment (2026-11-21, independent gate verification): the unknown queue is extended to
//        non-printable C0/C1 control codepoints (e.g. U+001F/U+0019 found once each in unit 1's
//        'plagiarism' IPA footnote — the phonetic font maps two glyphs to control codes). They are NOT
//        PUA so the original queue missed them; text stays verbatim (no remap added) — only visibility.
//        Mechanical resolution candidate via Phonemic-symbols cross-reference remains A3 scope.
//   A1-6 de-dup ONLY on PDF 50 (unit 21 left) and PDF 201 (unit 96 right) — the two adjudicated real
//        double-render pages (A0): page 50 = two stacked copies of the same paragraph (~+2.8pt y offset,
//        variable x shift) → adjacent-line-pair alignment drops the second copy; page 201 = the picture-label
//        row of 96.5 drawn 4× at distinct exact-y layers → keep the most complete layer. Everything removed
//        is recorded; residual lone glyphs stay in the raw layer and are flagged.
//   A1-7 output: docs/qa/viu-adv-raw/unit-001..101.json — each unit: both pages, provenance (PDF page
//        numbers + file SHA-256), line-level coordinates, column tags, refMarkers, IPA counters, dedup
//        report, per-unit validation.
//
// Honesty rules (roadmap §3): reads the PDF, writes ONLY the docs/qa/viu-adv-raw/ JSONs + the report —
//   zero changes to product code/data/db/hooks. No value invented; every number measured here.
//
// Reproducibility: requires poppler-utils (pdftotext) on PATH.
//   bun scripts/viu-adv-raw-extract.mjs            → extract all 101 units + write report
//   bun scripts/viu-adv-raw-extract.mjs --unit N   → extract one unit (debug), prints JSON to stdout

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const ROOT = process.cwd();
const PDF = `${ROOT}/upload/Advanced Vocabulary in Use  - 3rd Edition.pdf`; // exact filename: TWO spaces before "-"
const OUT_DIR = `${ROOT}/docs/qa/viu-adv-raw`;
const REPORT = `${ROOT}/docs/qa/viu-adv-raw-extraction-report-2026-11-20.json`;
const ONLY_UNIT = (() => {
  const i = process.argv.indexOf("--unit");
  return i >= 0 ? Number(process.argv[i + 1]) : null;
})();

// ---------- constants (all measured by the A0/audit calibration, recorded here for reproducibility) ----------
const PAGE_W = 572.6, PAGE_H = 765.4; // pdfinfo: 572.6 x 765.4 pts
const HEADER_Y = 40;    // right-page running-header band (yMin < 40) — "Exercises" 101/101 (measured)
const FOOTER_Y = 715;   // footer band (yMin > 715) — folio + book title (measured: min footer yMin = 719.5)
const TITLE_Y = 74;     // left-page title zone (unit number + title lines — content, kept & tagged)
const TITLE_EXT_Y = 95; // title continuation (2nd big-font title line, e.g. unit 12 "FRIENDSHIP" y=87)
const TITLE_MIN_H = 18; // big-font threshold for title continuation
const LINE_TOL = 2.0;   // y-cluster tolerance (InDesign grid: exact per-layer y; jitter ≤1.2 merges, copies at Δ≥2.79 stay apart)
const SMALL_H = 9.5;    // small-font digits: superscript refs + dictionary entry numbers
const SPLIT_GAP_MIN = 6;   // page-level column gap width (line extents)
const SPLIT_MIXED_GAP = 20; // intra-line whitespace that justifies splitting a mixed line at the gap
const ENTRY_ANCHOR_MIN = 3; // numbered-entry lines required to accept a column split
const DEDUP_PAGES = { 50: "left", 201: "right" }; // roadmap A1-6 — the ONLY two pages
const KNOWN_IPA = {
  0xe027: "\u02c8", // ˈ
  0xe03a: "\u02d0", // ː
  0xe05a: "\u0292", // ʒ
  0xf769: "\u026a", // ɪ
  0xe0c6: "\u025c", // ɜ
  0xe07b: "\u00e6", // æ
  0xe0f6: "\u028c", // ʌ
  0x03c5: "\u028a", // Greek upsilon υ → ʊ
};

const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
const r1 = (v) => Math.round(v * 10) / 10;

// ---------- file identity (provenance) ----------
const fileBuf = readFileSync(PDF);
const sha256 = createHash("sha256").update(fileBuf).digest("hex");

// ---------- A1-1: coordinate-aware extraction of the unit range (PDF 10..211) ----------
const xml = run("pdftotext", ["-f", "10", "-l", "211", "-bbox", PDF, "-"]);
const pageBlocks = [...xml.matchAll(/<page width="([\d.]+)" height="([\d.]+)">(.*?)<\/page>/gs)];
if (pageBlocks.length !== 202) throw new Error(`expected 202 unit pages in bbox output, got ${pageBlocks.length}`);

const parseWords = (body) =>
  [...body.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)<\/word>/g)].map(
    (m) => ({ x0: Number(m[1]), y0: Number(m[2]), x1: Number(m[3]), y1: Number(m[4]), t: m[5] })
  );

// ---------- helpers ----------
const isSmall = (w) => w.y1 - w.y0 <= SMALL_H;
const isDigits = (t) => /^\d{1,2}$/.test(t);

function clusterLines(words) {
  // sort by (y0, x0); group into lines with LINE_TOL y tolerance; within line sort by x0
  const ws = [...words].sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
  const lines = [];
  for (const w of ws) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(w.y0 - last.y0) < LINE_TOL) last.words.push(w);
    else lines.push({ y0: w.y0, words: [w] });
  }
  for (const ln of lines) {
    ln.words.sort((a, b) => a.x0 - b.x0);
    ln.minX = ln.words[0].x0;
    ln.maxX = ln.words[ln.words.length - 1].x1;
  }
  lines.sort((a, b) => a.y0 - b.y0);
  return lines;
}

// join tokens into text: kerning splits (<1.2pt gap) lose the artificial space — mechanical, recorded
function joinTokens(tokens) {
  let out = "";
  let prev = null;
  for (const w of tokens) {
    if (prev !== null) {
      const gap = w.x0 - prev.x1;
      out += gap < 1.2 ? "" : " ";
    }
    out += w.t;
    prev = w;
  }
  return out;
}

// IPA remap (A1-5): apply the 8 known mappings; count; leave unknown PUA verbatim
function remapText(text) {
  let known = {};
  let out = "";
  for (const ch of text) {
    const c = ch.codePointAt(0);
    const isPua = (c >= 0xe000 && c <= 0xf8ff) || c === 0x03c5;
    if (!isPua) {
      out += ch;
      continue;
    }
    if (KNOWN_IPA[c] !== undefined) {
      const key = `U+${c.toString(16).toUpperCase().padStart(4, "0")}`;
      known[key] = (known[key] ?? 0) + 1;
      out += KNOWN_IPA[c];
    } else {
      out += ch; // verbatim — queued, NEVER guessed
    }
  }
  return { text: out, known };
}

function collectUnknown(text) {
  const map = new Map();
  for (const ch of text) {
    const c = ch.codePointAt(0);
    const isPua = (c >= 0xe000 && c <= 0xf8ff) || c === 0x03c5;
    // G1 amendment 2026-11-21: non-printable C0/C1 controls are equally opaque in IPA context —
    // queue them verbatim too (metadata only; the text itself is never altered).
    const isControl = c < 0x20 || (c >= 0x7f && c <= 0x9f);
    if ((isPua && KNOWN_IPA[c] === undefined) || isControl) {
      const key = `U+${c.toString(16).toUpperCase().padStart(4, "0")}`;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return [...map.entries()].map(([codepoint, count]) => ({ codepoint, count }));
}

// ---------- A1-6 dedup: page 50 (adjacent-line-pair alignment) ----------
function dedupPage50Left(lines) {
  // lines already band-stripped + clustered. Find adjacent cluster pairs (Δy in [1.5, 5.5]) whose token
  // sequences align (greedy subsequence with small-digit skip + one-char prefix tolerance) ≥ 70%,
  // then drop the SECOND cluster (the shifted duplicate layer). First copy is the clean one (measured).
  const approxEq = (a, b) => {
    if (a.t === b.t) return true;
    // one-char prefix diff (Throughout vs hroughout) — ≤2 such tokens per pair, ≤1 char diff
    if (Math.abs(a.t.length - b.t.length) === 1) {
      const [long, short] = a.t.length > b.t.length ? [a.t, b.t] : [b.t, a.t];
      if (long.slice(1) === short || long.slice(0, -1) === short) return true;
    }
    return false;
  };
  const align = (a, b) => {
    let i = 0, j = 0, matched = 0, prefixTol = 2;
    while (i < a.length && j < b.length) {
      if (approxEq(a[i], b[j])) { matched++; i++; j++; continue; }
      if (isDigits(a[i].t) && isSmall(a[i])) { i++; continue; }
      if (isDigits(b[j].t) && isSmall(b[j])) { j++; continue; }
      if (prefixTol > 0) { prefixTol--; i++; j++; continue; }
      break;
    }
    return matched / Math.min(a.length, b.length);
  };
  const removed = [];
  const residuals = [];
  const kept = [];
  let i = 0;
  while (i < lines.length) {
    const cur = lines[i];
    const nxt = lines[i + 1];
    if (
      nxt &&
      nxt.y0 - cur.y0 >= 1.5 &&
      nxt.y0 - cur.y0 <= 5.5 &&
      Math.abs(cur.words.length - nxt.words.length) <= 3 &&
      align(cur.words, nxt.words) >= 0.7
    ) {
      removed.push({ droppedY: r1(nxt.y0), keptY: r1(cur.y0), droppedTokens: nxt.words.map((w) => w.t) });
      kept.push(cur);
      i += 2; // skip the duplicate
      continue;
    }
    kept.push(cur);
    i += 1;
  }
  // residual lone glyphs (e.g. the big "T" of the duplicate layer's first word) — stay verbatim, flagged
  for (const ln of kept) {
    if (ln.words.length === 1 && ln.words[0].t.length <= 2 && ln.y0 > TITLE_EXT_Y) {
      residuals.push({ y: r1(ln.y0), token: ln.words[0].t });
    }
  }
  return { lines: kept, removed, residuals };
}

// ---------- A1-6 dedup: page 201 (picture-label row drawn 4× at distinct exact-y layers) ----------
function dedupPage201Right(lines) {
  const removed = [];
  const keptLines = [];
  for (const ln of lines) {
    const span = ln.words[ln.words.length - 1].y0 - ln.words[0].y0;
    const counts = new Map();
    for (const w of ln.words) {
      if (w.t.length >= 4 && /^[A-Za-z-]+$/.test(w.t)) counts.set(w.t, (counts.get(w.t) ?? 0) + 1);
    }
    const dupToken = [...counts.entries()].find(([, n]) => n >= 3);
    if (!(span <= 2.0 && dupToken)) {
      keptLines.push(ln);
      continue;
    }
    // sub-group by EXACT y — the four layers are drawn at distinct exact baselines (measured)
    const layers = new Map();
    for (const w of ln.words) {
      const key = w.y0.toFixed(2);
      if (!layers.has(key)) layers.set(key, []);
      layers.get(key).push(w);
    }
    const groups = [...layers.entries()].map(([k, ws]) => ({ y: Number(k), ws: ws.sort((a, b) => a.x0 - b.x0) }));
    // sequence-similarity guard: layers must be near-identical sequences of the same label row
    const ref = groups.reduce((a, b) => (b.ws.length > a.ws.length ? b : a));
    const similar = groups.filter((g) => {
      if (g === ref) return true;
      const n = Math.min(g.ws.length, ref.ws.length);
      if (n < 5) return false;
      let m = 0;
      for (let k = 0; k < n; k++) if (g.ws[k].t === ref.ws[k].t) m++;
      return m / n >= 0.6;
    });
    if (similar.length < 2) { keptLines.push(ln); continue; }
    // keep the most complete layer (max tokens; tie → smallest y = first in reading order)
    const maxLen = Math.max(...similar.map((g) => g.ws.length));
    const keep = similar.filter((g) => g.ws.length === maxLen).sort((a, b) => a.y - b.y)[0];
    for (const g of similar) {
      if (g === keep) continue;
      removed.push({ droppedLayerY: r1(g.y), droppedTokens: g.ws.map((w) => w.t) });
    }
    keptLines.push({ y0: keep.y, words: keep.ws, minX: keep.ws[0].x0, maxX: keep.ws[keep.ws.length - 1].x1 });
  }
  return { lines: keptLines, removed };
}

// ---------- A1-2 column-split detection (left pages, REGION-scoped) ----------
// Calibration insight (unit 1 forensic): the numbered mini-dictionary occupies a contiguous REGION at
// the top of the left page (unit 1: y 118.8–263.8 — 13 dict clusters interleaved with main text), while
// lower sections (B/C/D) are full-width single-stream (x 99–530). A page-wide split therefore fails.
// Detection: (1) right-isolated clusters (minX ≥ 300, ≥2 words) form a contiguous y-run (gaps ≤40pt);
// (2) the region must hold ≥3 such clusters; (3) the split is evaluated ONLY inside the region band.
function detectDictRegion(lines) {
  const rightIso = lines.filter((ln) => ln.minX >= 300 && ln.words.length >= 2);
  if (rightIso.length < ENTRY_ANCHOR_MIN) return null;
  const regions = [];
  let cur = [rightIso[0]];
  for (let i = 1; i < rightIso.length; i++) {
    if (rightIso[i].y0 - cur[cur.length - 1].y0 <= 40) cur.push(rightIso[i]);
    else { regions.push(cur); cur = [rightIso[i]]; }
  }
  regions.push(cur);
  const region = regions.find((r) => r.length >= ENTRY_ANCHOR_MIN);
  if (!region) return null;
  return { yStart: region[0].y0, yEnd: region[region.length - 1].y0, rightIsoCount: region.length };
}

function detectColumnSplit(lines, region) {
  if (!region) return null;
  const inRegion = lines.filter((ln) => ln.y0 >= region.yStart - 2 && ln.y0 <= region.yEnd + 2);
  const cands = new Set();
  for (const ln of inRegion) { cands.add(Math.round(ln.maxX)); cands.add(Math.round(ln.minX)); }
  let best = null;
  for (const g of [...cands].sort((a, b) => a - b)) {
    let left = 0, right = 0, straddle = 0;
    for (const ln of inRegion) {
      if (ln.maxX <= g) left++;
      else if (ln.minX >= g) right++;
      else straddle++;
    }
    if (left < ENTRY_ANCHOR_MIN || right < ENTRY_ANCHOR_MIN) continue;
    const rightMinX = inRegion.filter((ln) => ln.minX >= g).map((ln) => ln.minX);
    const width = Math.max(...rightMinX) - Math.min(...rightMinX);
    if (width > 14) continue; // entry left-edges must align (numbered hanging indent)
    const score = left + right - 2 * straddle;
    if (!best || score >= best.score) best = { g, left, right, straddle, score }; // ties → rightmost (main column hugs the dict column)
  }
  if (!best) return null;
  // refine to the actual whitespace band [g0, g1] inside the region (RAW values kept for classification;
  // only the JSON output is rounded — comparing rounded values against raw coordinates misclassifies)
  const g0raw = Math.max(...inRegion.filter((ln) => ln.maxX <= best.g).map((ln) => ln.maxX));
  const g1raw = Math.min(...inRegion.filter((ln) => ln.minX >= best.g).map((ln) => ln.minX));
  if (g1raw - g0raw < SPLIT_GAP_MIN) return null;
  // entry-anchor guard: ≥3 numbered dict-entry lines (small digit as first token of a right-side line)
  const rightLines = inRegion.filter((ln) => ln.minX >= best.g);
  const anchored = rightLines.filter((ln) => isDigits(ln.words[0].t) && isSmall(ln.words[0]));
  if (anchored.length < ENTRY_ANCHOR_MIN) return null;
  return {
    g0: g0raw, g1: g1raw, g0r: r1(g0raw), g1r: r1(g1raw), rightLines: rightLines.length, anchoredEntries: anchored.length,
    region: { yStart: r1(region.yStart), yEnd: r1(region.yEnd), rightIsoClusters: region.rightIsoCount },
  };
}

// ---------- per-page processing ----------
function processPage(words, side, pdfPage) {
  // A1-3 band removal (recorded verbatim — nothing disappears silently)
  const removed = { header: [], footer: [] };
  const kept = [];
  for (const w of words) {
    if (side === "right" && w.y0 < HEADER_Y) { removed.header.push(w.t); continue; }
    if (w.y0 > FOOTER_Y) { removed.footer.push(w.t); continue; }
    kept.push(w);
  }
  let lines = clusterLines(kept);

  // A1-6 dedup — ONLY on the two adjudicated pages (PDF 50 left / PDF 201 right); every other page
  // keeps its text byte-faithful (the double-render corruption exists only there, per A0 adjudication)
  let dedup = null;
  if (DEDUP_PAGES[50] === side && pdfPage === 50) {
    const d = dedupPage50Left(lines);
    lines = d.lines;
    dedup = d.removed.length || d.residuals.length ? { pairsDropped: d.removed, residualGlyphs: d.residuals } : null;
  } else if (DEDUP_PAGES[201] === side && pdfPage === 201) {
    const d = dedupPage201Right(lines);
    lines = d.lines;
    dedup = d.removed.length ? { layersDropped: d.removed } : null;
  }

  // title zone (left only): yMin<74, plus big-font continuation (yMin<95, all words h≥18, minX≥99)
  const titleLines = [];
  const bodyLines = [];
  for (const ln of lines) {
    if (side === "left" && (ln.y0 < TITLE_Y || (ln.y0 < TITLE_EXT_Y && ln.minX >= 99 && ln.words.every((w) => w.y1 - w.y0 >= TITLE_MIN_H)))) {
      titleLines.push(ln);
    } else {
      bodyLines.push(ln);
    }
  }

  // A1-2 column split (left only) — REGION-scoped: dict region + in-band split
  let split = null;
  let region = null;
  if (side === "left") {
    region = detectDictRegion(bodyLines);
    split = detectColumnSplit(bodyLines, region);
  }
  const inRegion = (ln) => region && ln.y0 >= region.yStart - 2 && ln.y0 <= region.yEnd + 2;
  const applies = split && region; // split rules apply ONLY to region-band lines

  // classify lines → records
  const outLines = [];
  const refMarkers = [];
  const splitDiagnostics = { mixedSplit: 0, mixedKeptFull: 0, straddlerWords: [] };
  let knownCounts = {};
  const unknownMap = new Map();
  const absorb = (res) => {
    for (const [k, v] of Object.entries(res.known)) knownCounts[k] = (knownCounts[k] ?? 0) + v;
    for (const u of collectUnknown(res.text)) unknownMap.set(u.codepoint, (unknownMap.get(u.codepoint) ?? 0) + u.count);
  };

  for (const ln of titleLines) {
    const res = remapText(joinTokens(ln.words));
    absorb(res);
    outLines.push({ y: r1(ln.y0), x0: r1(ln.minX), x1: r1(ln.maxX), tag: "title", text: res.text });
  }

  for (const ln of bodyLines) {
    const isRight = applies && inRegion(ln) && ln.minX >= split.g1 - 0.05;
    const isLeft = applies && inRegion(ln) && ln.maxX <= split.g0 + 0.05;
    if (isRight) {
      const entryNumber = isDigits(ln.words[0].t) && isSmall(ln.words[0]) ? Number(ln.words[0].t) : null;
      const res = remapText(joinTokens(ln.words));
      absorb(res);
      outLines.push({
        y: r1(ln.y0), x0: r1(ln.minX), x1: r1(ln.maxX), tag: "dict",
        ...(entryNumber !== null ? { entryNumber } : {}),
        text: res.text,
      });
      continue;
    }
    if (isLeft) {
      const res = remapText(joinTokens(ln.words));
      absorb(res);
      const marks = [];
      ln.words.forEach((w, idx) => {
        if (isDigits(w.t) && isSmall(w)) {
          marks.push({ marker: w.t, x: r1(w.x0), y: r1(w.y0), after: idx > 0 ? ln.words[idx - 1].t : null });
        }
      });
      if (marks.length) refMarkers.push(...marks);
      outLines.push({ y: r1(ln.y0), x0: r1(ln.minX), x1: r1(ln.maxX), tag: "main", text: res.text });
      continue;
    }
    // mixed line (region-band only): split ONLY at a real intra-line whitespace ≥ SPLIT_MIXED_GAP in the gap band
    if (applies && inRegion(ln)) {
      let cutIdx = -1;
      for (let k = 0; k < ln.words.length - 1; k++) {
        const a = ln.words[k], b = ln.words[k + 1];
        if (a.x1 <= split.g0 + 0.05 && b.x0 >= split.g1 - 0.05 && b.x0 - a.x1 >= SPLIT_MIXED_GAP) { cutIdx = k; break; }
      }
      if (cutIdx >= 0) {
        const leftPart = ln.words.slice(0, cutIdx + 1);
        const rightPart = ln.words.slice(cutIdx + 1);
        const resL = remapText(joinTokens(leftPart));
        const resR = remapText(joinTokens(rightPart));
        absorb(resL); absorb(resR);
        const entryNumber = isDigits(rightPart[0].t) && isSmall(rightPart[0]) ? Number(rightPart[0].t) : null;
        const marks = [];
        leftPart.forEach((w, idx) => {
          if (isDigits(w.t) && isSmall(w)) marks.push({ marker: w.t, x: r1(w.x0), y: r1(w.y0), after: idx > 0 ? leftPart[idx - 1].t : null });
        });
        if (marks.length) refMarkers.push(...marks);
        outLines.push({ y: r1(ln.y0), x0: r1(ln.minX), x1: r1(ln.maxX), tag: "main", text: resL.text, mixedSplit: true });
        outLines.push({ y: r1(ln.y0), x0: r1(rightPart[0].x0), x1: r1(rightPart[rightPart.length - 1].x1), tag: "dict", ...(entryNumber !== null ? { entryNumber } : {}), text: resR.text, mixedSplit: true });
        splitDiagnostics.mixedSplit++;
        continue;
      }
      // continuous region line crossing the gap — kept WHOLE (never torn)
      splitDiagnostics.mixedKeptFull++;
      for (const w of ln.words) if (w.x0 < split.g1 - 0.05 && w.x1 > split.g0 + 0.05) splitDiagnostics.straddlerWords.push(w.t);
    }
    const res = remapText(joinTokens(ln.words));
    absorb(res);
    const marks = [];
    ln.words.forEach((w, idx) => {
      if (isDigits(w.t) && isSmall(w)) marks.push({ marker: w.t, x: r1(w.x0), y: r1(w.y0), after: idx > 0 ? ln.words[idx - 1].t : null });
    });
    if (marks.length) refMarkers.push(...marks);
    outLines.push({ y: r1(ln.y0), x0: r1(ln.minX), x1: r1(ln.maxX), tag: applies && inRegion(ln) ? "full" : "main", text: res.text });
  }

  const chars = outLines.reduce((a, l) => a + l.text.length, 0);
  return {
    removedBands: removed,
    dedup,
    columnSplit: split
      ? {
          g0: split.g0r, g1: split.g1r, rightLines: split.rightLines, anchoredEntries: split.anchoredEntries, region: split.region,
          mixedSplitLines: splitDiagnostics.mixedSplit, fullWidthLinesKept: splitDiagnostics.mixedKeptFull,
          straddlerWords: splitDiagnostics.straddlerWords.length ? splitDiagnostics.straddlerWords : undefined,
        }
      : null,
    titleLines: titleLines.length,
    lines: outLines,
    refMarkers: refMarkers.length ? refMarkers : undefined,
    ipa: { knownApplied: knownCounts, unknownQueue: [...unknownMap.entries()].map(([codepoint, count]) => ({ codepoint, count })) },
    charCount: chars,
  };
}

// ---------- run all units ----------
mkdirSync(OUT_DIR, { recursive: true });
const summary = {
  meta: {
    script: "scripts/viu-adv-raw-extract.mjs",
    generatedAt: new Date().toISOString(),
    mode: "READ-ONLY raw extraction (roadmap A1-1..A1-7) — writes only docs/qa/viu-adv-raw/ + this report",
    roadmap: "نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md",
    ownerMandateTrace: "1a1f939be664ef49 (opens G0 + commands A1)",
    calibration: {
      pageSize: `${PAGE_W} x ${PAGE_H} pts`,
      headerBand: `right pages yMin<${HEADER_Y} — measured: exactly "Exercises" on 101/101 right pages`,
      footerBand: `both pages yMin>${FOOTER_Y} — measured: folio starts ≥719.5`,
      titleZone: `left pages yMin<${TITLE_Y} (+ big-font continuation <${TITLE_EXT_Y}) — unit number + title are CONTENT (kept, tagged "title") — documented refinement of the roadmap y<40 band so unit identity is never destroyed`,
      lineTolerance: LINE_TOL,
      columnSplit: "per-page line-extent detection + ≥3 numbered-entry anchor guard; mixed lines split only at ≥20pt intra-line whitespace; continuous full-width lines kept whole (tag full)",
    },
  },
  file: { path: "upload/Advanced Vocabulary in Use  - 3rd Edition.pdf", sha256, bytes: fileBuf.length },
  units: [],
  totals: {},
  validation: {},
};

let minChars = Infinity, maxChars = 0;
const unknownGlobal = new Map();
let splitPages = 0, dedupApplied = 0;

for (let n = 1; n <= 101; n++) {
  const leftPdf = 2 * n + 8;
  const rightPdf = 2 * n + 9;
  const li = leftPdf - 10, ri = rightPdf - 10;
  const leftWords = parseWords(pageBlocks[li][3]);
  const rightWords = parseWords(pageBlocks[ri][3]);

  const left = processPage(leftWords, "left", leftPdf);
  const right = processPage(rightWords, "right", rightPdf);

  const unitChars = left.charCount + right.charCount;
  minChars = Math.min(minChars, unitChars);
  maxChars = Math.max(maxChars, unitChars);
  for (const pg of [left, right]) {
    for (const u of pg.ipa.unknownQueue) unknownGlobal.set(u.codepoint, (unknownGlobal.get(u.codepoint) ?? 0) + u.count);
  }
  if (left.columnSplit) splitPages++;
  if (left.dedup || right.dedup) dedupApplied++;

  // A1 validation — per unit
  const zeroKnownPuaRemaining = true; // by construction: known mappings are applied during remap
  const plausible = unitChars >= 2600 && unitChars <= 9500; // per-unit = sum of BOTH pages; A0 per-page totals 1,423–4,492 raw, minus removed bands (+dedup halving on units 21/96), margins documented

  const unit = {
    unit: n,
    provenance: {
      source: "upload/Advanced Vocabulary in Use  - 3rd Edition.pdf",
      sha256,
      pdfPages: { left: leftPdf, right: rightPdf },
      printedPages: { left: leftPdf - 2, right: rightPdf - 2 },
      generator: "scripts/viu-adv-raw-extract.mjs (A1-1..A1-7)",
    },
    leftPage: { pdfPage: leftPdf, ...left },
    rightPage: { pdfPage: rightPdf, ...right },
    validation: {
      charCountTotal: unitChars,
      plausibleChars: plausible,
      zeroKnownPuaRemaining,
      unknownQueueRecorded: left.ipa.unknownQueue.length + right.ipa.unknownQueue.length > 0 ? [...(left.ipa.unknownQueue ?? []), ...(right.ipa.unknownQueue ?? [])] : [],
    },
  };
  summary.units.push({
    unit: n,
    charCount: unitChars,
    leftSplit: !!left.columnSplit,
    dictEntriesLeft: left.columnSplit ? left.lines.filter((l) => l.tag === "dict").length : 0,
    refMarkers: (left.refMarkers?.length ?? 0),
    dedup: !!(left.dedup || right.dedup),
    unknownQueue: unit.validation.unknownQueueRecorded.map((u) => `${u.codepoint}×${u.count}`),
    plausible: plausible,
  });

  if (ONLY_UNIT === null || ONLY_UNIT === n) {
    writeFileSync(`${OUT_DIR}/unit-${String(n).padStart(3, "0")}.json`, JSON.stringify(unit, null, 2) + "\n");
  }
}

// ---------- totals + verdict ----------
const plausibleAll = summary.units.every((u) => u.plausible);
const verdict = {
  units101: summary.units.length === 101,
  allUnitsPlausibleChars: plausibleAll,
  zeroKnownPuaRemainingByConstruction: true,
  unknownQueueGlobalRecorded: [...unknownGlobal.entries()].map(([codepoint, count]) => ({ codepoint, count })),
  dedupOnlyPages50And201: dedupApplied === 2,
  splitPagesMeasured: splitPages,
  charRange: { min: minChars, max: maxChars },
};
summary.totals = { splitPages, dedupApplied, charRange: verdict.charRange };
summary.validation = {
  verdict,
  checks: {
    units101: verdict.units101,
    allUnitsPlausibleChars: plausibleAll,
    dedupOnlyOnTheTwoAdjudicatedPages: verdict.dedupOnlyPages50And201,
    outOfDomainNeverRead: "PDF 1/2/303 are outside the extracted range (10..211) — A1-4",
    ipaRemapAppliedEverywhere: "8 known mappings applied inline during text assembly (A1-5)",
    unknownQueueNoGuessing: "unknown PUA kept verbatim + queued (U+E022 etc.) — resolution deferred (A3 cross-reference candidate), never guessed",
  },
  knownArtifacts: [
    {
      id: "A1-KA-1",
      unit: 49,
      page: "right (PDF 107)",
      finding: "exercise 49.4 is picture-based (advertisement illustrations); the ROTATED BANNER TEXT drawn inside the illustrations ('PERFUME', '50% OFF SHOES', 'SALE', 'BO'S CAFE' …) exists in the PDF text layer and interleaves in the raw layer as doubled/rotated soup",
      handling: "kept VERBATIM (faithful raw — roadmap golden rule; A1-6 de-dup is scoped to pages 50/201 only); flagged for A2 image-dependent census (A2-4) and the A5-5 owner decision menu — never silently deleted",
    },
    {
      id: "A1-KA-2",
      unit: 21,
      page: "left (PDF 50)",
      finding: "residual lone glyph 'T' (y≈108.9) — first letter of the duplicate layer's opening word, drawn as a separate glyph at a non-conforming offset, so the pair-dedup cannot match it mechanically",
      handling: "kept + recorded in the unit's dedup.residualGlyphs (no guessing)",
    },
    {
      id: "A1-KA-3",
      unit: 72,
      page: "left (PDF 152)",
      finding: "U+E022 ×1 (inside the IPA transcription of 'carte blanche') — unknown PUA outside the §۲-۳ mandatory table",
      handling: "kept verbatim + queued (validation.unknownQueueRecorded); resolution candidate via Phonemic-symbols cross-reference is A3 scope — zero guessing in A1",
    },
  ],
  vlmQa: "see docs/qa/viu-adv-raw/vlm-qa-2026-11-20.json — raw VLM verdicts (3 PASS) + adjudication: the 2 FAILs are contract-conformant, not extraction defects (unit 96: only 'missing' item is the running header 'Exercises', removed BY CONTRACT A1-3 with tokens recorded in removedBands; unit 49: same header contract + the A1-KA-1 banner-soup artifact)",
  nextGate: "G1 — owner approval of extraction contracts with 2 side-by-side samples (JSON + pdftoppm render)",
};

if (ONLY_UNIT === null) {
  writeFileSync(REPORT, JSON.stringify(summary, null, 2) + "\n");
  console.log(`A1 raw extraction written → ${OUT_DIR}/unit-001..101.json + ${REPORT}`);
  console.log(`units=101 · plausibleAll=${plausibleAll} · splitPages=${splitPages} · dedupApplied=${dedupApplied} · chars[min,max]=[${minChars},${maxChars}]`);
  console.log(`unknownQueue: ${JSON.stringify(verdict.unknownQueueGlobalRecorded)}`);
} else {
  console.log(`unit ${ONLY_UNIT} → ${OUT_DIR}/unit-${String(ONLY_UNIT).padStart(3, "0")}.json`);
}
