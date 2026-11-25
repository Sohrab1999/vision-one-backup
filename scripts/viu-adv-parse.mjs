// VIU Book 4 (AVU-3) — Phase A2 — structural parse to runtime contracts (A2-1..A2-5).
// Owner mandate (trace 1a1feb704efa1a55): G1 independent verification PASS (gate decision
// docs/qa/viu-adv-g1-gate-decision-2026-11-21.md) ⇒ "سپس A2 با فرمان شما" — the owner explicitly
// pre-authorized A2 to start under the executing agent's own command once G1 passed.
//
// Roadmap mapping (§۴ فاز A2):
//   A2-1 left page: sections A/B/C(/D) · paragraph blocks · margin gloss notes · numbered
//        mini-dictionary entries (vocab candidates with IPA) · Language help boxes (29 pages).
//        The G1-registered mixed-line limitation (section-C margin notes glued into body lines on
//        non-split pages) is resolved here at word level: a body line is split at the whitespace gap
//        (≥8pt) whose trailing run lies entirely in the section's detected margin column — recorded
//        per split in diagnostics (reviewable at G2).
//   A2-2 right page: exercises N.x (455 anchors verified) · items · implicit blanks → "____"
//        (word-gap calibration: blanks ≥25pt vs normal 2pt / bank separators ~15pt) ·
//        "from X opposite" refs as metadata · word banks recorded verbatim.
//   A2-3 runtime-contract alignment: capture fields document the mechanical mapping to
//        src/data/types.ts (VocabWord / QuizQuestionSeed / Reading) — no runtime code is touched here.
//   A2-4 census: per-unit rows + global totals + image-dependent candidates (text evidence +
//        pdfimages counts) — honest candidates only, owner menu stays A5-5.
//   A2-5 capture output: docs/qa/viu-adv-capture/unit-XXX.json + verify-unit-XXX.json + fa-cache.json
//        (pattern of viu-r2-capture-upper; fa-cache is an A4-pending stub — FA-NEW is Phase A4).
//
// PARTITION EQUIVALENCE: this parser re-derives the word→line partition by mirroring the approved
// A1 mechanics (band constants · cluster rule · dedup records · title zone · dict-region split) and
// then PROVES equivalence byte-for-byte against the G1-approved raw JSON lines of all 101 units —
// any mismatch or leftover word ABORTS the run (exit 1), so a mis-parse can never reach the capture
// layer. Independence of the A1 layer itself remains the G1 verifier's job (scripts/viu-adv-g1-verify.mjs).
//
// ZERO-FABRICATION: unknown PUA/C0 chars stay verbatim in text and are carried into each capture's
// queuedChars (A1-KA-4 honesty). READ-ONLY: writes only docs/qa/viu-adv-capture/ + census JSON (+ temp dir).

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const PDF = "upload/Advanced Vocabulary in Use  - 3rd Edition.pdf";
const RAW = "docs/qa/viu-adv-raw";
const CAP = "docs/qa/viu-adv-capture";
const CENSUS_OUT = "docs/qa/viu-adv-census-2026-11-21.json";
const TMP = "/tmp/a2-parse";

// §۲-۳ mandatory IPA remap table (roadmap contract A1-5) — applied to the raw word stream.
const KNOWN_IPA = { 0xe027: "\u02c8", 0xe03a: "\u02d0", 0xe05a: "\u0292", 0xf769: "\u026a", 0xe0c6: "\u025c", 0xe07b: "\u00e6", 0xe0f6: "\u028c", 0x03c5: "\u028a" };
const remap = (s) => [...s].map((ch) => KNOWN_IPA[ch.codePointAt(0)] ?? ch).join("");

// approved A1 band/partition constants (scripts/viu-adv-raw-extract.mjs — G1-approved contracts)
const HEADER_Y = 40, FOOTER_Y = 715, TITLE_Y = 74, TITLE_EXT_Y = 95, TITLE_MIN_H = 18;
const LINE_TOL = 2.0, SMALL_H = 9.5, SPLIT_GAP_MIN = 6, SPLIT_MIXED_GAP = 20, ENTRY_ANCHOR_MIN = 3;

// A2 structural constants
const BLANK_GAP = 25;      // pt — calibrated: real fill-in blanks 53–94pt; normal word gap 2pt
const BANK_GAP = 12;       // pt — word-bank separator hint (page 51 calibration ~15pt)
const MARGIN_MIN_X = 340;  // pt — a whole line right of this is a margin-column candidate
const MARGIN_SPLIT_GAP = 8;// pt — mixed-line margin split gap (measured ~10pt; body gaps ≤6pt)
const MARGIN_TOL = 5;      // pt — margin-column tolerance
const MARGIN_EDGE_ALIGN = 200; // pt — max width of a margin-column line

const isDigits = (t) => /^\d{1,2}$/.test(t);
const isSmall = (w) => w.y1 - w.y0 <= SMALL_H;
const r1 = (v) => Math.round(v * 10) / 10;

function pageWords(pdfPage) {
  const f = join(TMP, `p${pdfPage}.html`);
  if (!existsSync(f)) execFileSync("pdftotext", ["-bbox", "-f", String(pdfPage), "-l", String(pdfPage), PDF, f]);
  const h = readFileSync(f, "utf8");
  return [...h.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g)]
    .map((m) => ({ x0: +m[1], y0: +m[2], x1: +m[3], y1: +m[4], t: remap(m[5]) }));
}

function pageImageCount(pdfPage) {
  const out = execFileSync("pdfimages", ["-list", "-f", String(pdfPage), "-l", String(pdfPage), PDF], { encoding: "utf8" });
  return out.split("\n").filter((l) => /^\s*\d+\s+\d+\s+\w+/.test(l)).length;
}

const joinWords = (ws) => {
  ws = [...ws].sort((a, b) => a.x0 - b.x0);
  let out = "";
  let prev = null;
  for (const w of ws) {
    if (prev !== null && w.x0 - prev.x1 >= 1.2) out += " ";
    out += w.t;
    prev = w;
  }
  return out;
};

const multisetEq = (a, b) => {
  if (a.length !== b.length) return false;
  const s = [...a].sort();
  const t = [...b].sort();
  return s.every((v, i) => v === t[i]);
};

// ---------- exact replica of the approved partition pipeline (bands → clusters → dedup →
// title/body → dict-region split) with byte-level equivalence proof against the raw JSON ----------
function clusterLines(words) {
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
    if (width > 14) continue;
    const score = left + right - 2 * straddle;
    if (!best || score >= best.score) best = { g, score };
  }
  if (!best) return null;
  const g0raw = Math.max(...inRegion.filter((ln) => ln.maxX <= best.g).map((ln) => ln.maxX));
  const g1raw = Math.min(...inRegion.filter((ln) => ln.minX >= best.g).map((ln) => ln.minX));
  if (g1raw - g0raw < SPLIT_GAP_MIN) return null;
  const rightLines = inRegion.filter((ln) => ln.minX >= best.g);
  const anchored = rightLines.filter((ln) => isDigits(ln.words[0].t) && isSmall(ln.words[0]));
  if (anchored.length < ENTRY_ANCHOR_MIN) return null;
  return { g0: g0raw, g1: g1raw, region };
}

function buildWordLayer(unitJson, side, pdfPage) {
  const pg = unitJson[side];
  const isRightSide = side === "rightPage";
  const raw = pageWords(pdfPage);
  const kept = raw.filter((w) => !(isRightSide && w.y0 < HEADER_Y) && w.y0 <= FOOTER_Y);
  let clusters = clusterLines(kept);
  const labelSplits = { count: 0 };

  // de-dup records consumed at CLUSTER level (page-50 pairs / page-201 layers)
  const dedup = pg.dedup;
  const dropCluster = (y, tokens) => {
    const idx = clusters.findIndex((c) => Math.abs(c.y0 - y) <= 0.5 && multisetEq(c.words.map((w) => w.t), tokens));
    if (idx < 0) throw new Error(`u${unitJson.unit}/${side} dedup cluster not found at y=${y}`);
    clusters.splice(idx, 1);
  };
  if (dedup?.pairsDropped) for (const p of dedup.pairsDropped) dropCluster(p.droppedY, p.droppedTokens);
  if (dedup?.layersDropped) {
    // page 201: the four label layers are drawn at distinct EXACT baselines inside ONE merged
    // cluster (Δy < LINE_TOL) — the approved extractor sub-groups by exact y0 (toFixed(2)) and
    // keeps the most complete layer; here the recorded dropped layers are removed at sub-layer level.
    for (const l of dedup.layersDropped) {
      let done = false;
      for (const c of clusters) {
        const byExactY = new Map();
        for (const w of c.words) {
          const k = w.y0.toFixed(2);
          if (!byExactY.has(k)) byExactY.set(k, []);
          byExactY.get(k).push(w);
        }
        for (const [k, ws] of byExactY) {
          if (Math.abs(Number(k) - l.droppedLayerY) <= 0.05 && multisetEq(ws.map((w) => w.t), l.droppedTokens)) {
            const drop = new Set(ws);
            c.words = c.words.filter((w) => !drop.has(w));
            if (!c.words.length) throw new Error(`u${unitJson.unit}/${side} dedup layer emptied its cluster at y=${l.droppedLayerY}`);
            c.words.sort((a, b) => a.x0 - b.x0);
            c.minX = c.words[0].x0;
            c.maxX = c.words[c.words.length - 1].x1;
            done = true;
            break;
          }
        }
        if (done) break;
      }
      if (!done) throw new Error(`u${unitJson.unit}/${side} dedup layer not found at y=${l.droppedLayerY}`);
    }
  }

  // title zone (left only)
  const titleClusters = [];
  const bodyClusters = [];
  if (!isRightSide) {
    for (const ln of clusters) {
      if (ln.y0 < TITLE_Y || (ln.y0 < TITLE_EXT_Y && ln.minX >= 99 && ln.words.every((w) => w.y1 - w.y0 >= TITLE_MIN_H))) titleClusters.push(ln);
      else bodyClusters.push(ln);
    }
  } else bodyClusters.push(...clusters);

  // dict region + column split (left only)
  let split = null, region = null;
  if (!isRightSide) {
    region = detectDictRegion(bodyClusters);
    split = detectColumnSplit(bodyClusters, region);
  }
  const applies = split && region;
  const inRegion = (ln) => region && ln.y0 >= region.yStart - 2 && ln.y0 <= region.yEnd + 2;

  // emit word-groups in the extractor's exact order: title lines first, then body clusters
  const emitted = [];
  for (const ln of titleClusters) emitted.push({ words: ln.words, tag: "title" });
  for (const ln of bodyClusters) {
    const isDict = applies && inRegion(ln) && ln.minX >= split.g1 - 0.05;
    const isMain = applies && inRegion(ln) && ln.maxX <= split.g0 + 0.05;
    if (isDict || isMain) { emitted.push({ words: ln.words, tag: isDict ? "dict" : "main" }); continue; }
    if (applies && inRegion(ln)) {
      let cutIdx = -1;
      for (let k = 0; k < ln.words.length - 1; k++) {
        const a = ln.words[k], b = ln.words[k + 1];
        if (a.x1 <= split.g0 + 0.05 && b.x0 >= split.g1 - 0.05 && b.x0 - a.x1 >= SPLIT_MIXED_GAP) { cutIdx = k; break; }
      }
      if (cutIdx >= 0) {
        emitted.push({ words: ln.words.slice(0, cutIdx + 1), tag: "main" });
        emitted.push({ words: ln.words.slice(cutIdx + 1), tag: "dict" });
        continue;
      }
      emitted.push({ words: ln.words, tag: "full" });
      continue;
    }
    emitted.push({ words: ln.words, tag: "main" });
  }

  // equivalence proof against the approved raw lines (byte-for-byte, order-sensitive)
  if (emitted.length !== pg.lines.length) {
    throw new Error(`u${unitJson.unit}/${side} partition mismatch: ${emitted.length} groups vs ${pg.lines.length} raw lines`);
  }
  for (let i = 0; i < emitted.length; i++) {
    const g = emitted[i];
    const line = pg.lines[i];
    if (g.tag !== line.tag) throw new Error(`u${unitJson.unit}/${side} tag mismatch at raw line ${i} (y=${line.y}): ${g.tag} vs ${line.tag}`);
    if (joinWords(g.words) !== line.text) {
      throw new Error(`u${unitJson.unit}/${side} byte mismatch at raw line ${i} (y=${line.y}, tag=${line.tag}): expected ${JSON.stringify(line.text.slice(0, 60))} got ${JSON.stringify(joinWords(g.words).slice(0, 60))}`);
    }
    g.y = line.y; g.x0 = line.x0; g.x1 = line.x1; g.entryNumber = line.entryNumber; g.text = line.text;
  }

  // A2 structural refinement (post-proof): the "Language help" box label can share its printed line
  // with body text or a section heading (glued at a large x-gap — e.g. u17 y=275.1 gap 46.5pt,
  // u52 heading). Split the trailing two-token label into its own marker group; recorded in verify.
  for (let i = 0; i < emitted.length; i++) {
    const g = emitted[i];
    if (!g.words || g.words.length < 3) continue;
    const k = g.words.length - 2;
    const a = g.words[k - 1], b = g.words[k], c = g.words[k + 1];
    if (b.t === "Language" && c.t === "help" && b.x0 - a.x1 >= 6) {
      const prefix = g.words.slice(0, k);
      const label = g.words.slice(k);
      g.words = prefix;
      g.text = joinWords(prefix).trim();
      emitted.splice(i + 1, 0, { words: label, tag: g.tag, y: g.y, x0: r1(label[0].x0), x1: r1(label[label.length - 1].x1), text: "Language help", labelSplit: true });
      labelSplits.count++;
      i++; // skip the inserted marker group
    }
  }
  return { emitted, labelSplits };
}

// ---------- text with blanks normalized (right-page items) ----------
function textWithBlanks(words) {
  let out = "";
  let prev = null;
  for (const w of words) {
    if (prev !== null) {
      const gap = w.x0 - prev.x1;
      if (gap >= BLANK_GAP) out += " ____";
      else if (gap >= 1.2) out += " ";
    }
    out += w.t;
    prev = w;
  }
  return out;
}

const isBankRow = (ws) => ws.filter((w, i) => i > 0 && w.x0 - ws[i - 1].x1 >= BANK_GAP).length >= 4;

// ---------- left-page structural parse (A2-1) ----------
function parseLeft(unitJson) {
  const built = buildWordLayer(unitJson, "leftPage", unitJson.provenance.pdfPages.left);
  const groups = built.emitted;
  const diag = { mixedLineSplits: 0, mixedSplits: [], dropCaps: [], languageHelpLabelSplits: built.labelSplits.count };

  const sectionLetterRe = /^([A-E])\s+(\S.*)$/;
  const unitNumberLine = groups.find((g) => /^\d+$/.test(g.text.trim()) && g.tag === "title");
  const title = groups
    .filter((g) => g.tag === "title" && !sectionLetterRe.test(g.text.trim()) && g !== unitNumberLine)
    .map((g) => g.text.trim()).join(" ").trim();

  // sections: headings like "A Study and exams" (letter tab at x0 < 95)
  const sectionIdx = [];
  groups.forEach((g, i) => {
    const m = sectionLetterRe.exec(g.text.trim());
    if (m && g.x0 < 95 && g.tag !== "dict") sectionIdx.push({ letter: m[1], title: m[2].trim(), y: g.y, i });
  });

  // margin columns per section: ≥2 short whole-lines right of MARGIN_MIN_X → column edge = min x0
  const marginEdgeFor = (start, end) => {
    const mLines = groups.slice(start, end).filter((g) => g.x0 >= MARGIN_MIN_X && (g.x1 - g.x0) <= MARGIN_EDGE_ALIGN && g.x1 <= 540);
    if (mLines.length < 2) return null;
    return { x: Math.min(...mLines.map((g) => g.x0)), yStart: Math.min(...mLines.map((g) => g.y)) - 2, yEnd: Math.max(...mLines.map((g) => g.y)) + 2 };
  };

  // mixed-line margin split (G1-registered limitation, resolved at word level here) — only inside
  // the margin column's detected y-span (bottom two-column footnote rows share the same x-band but
  // are outside the column's vertical span, so they stay untouched and honestly glued)
  for (let s = 0; s < sectionIdx.length; s++) {
    const start = sectionIdx[s].i + 1;
    const end = s + 1 < sectionIdx.length ? sectionIdx[s + 1].i : groups.length;
    const margin = marginEdgeFor(start, end);
    if (margin === null) continue;
    for (const g of groups.slice(start, end)) {
      if (g.x0 >= MARGIN_MIN_X || !g.words?.length || g.tag === "dict") continue;
      if (g.y < margin.yStart || g.y > margin.yEnd) continue;
      for (let k = 1; k < g.words.length - 1; k++) {
        const a = g.words[k - 1], b = g.words[k];
        const rest = g.words.slice(k);
        if (b.x0 >= margin.x - MARGIN_TOL && a.x1 < margin.x - MARGIN_TOL && b.x0 - a.x1 >= MARGIN_SPLIT_GAP && rest.every((w) => w.x0 >= margin.x - MARGIN_TOL)) {
          diag.mixedLineSplits++;
          diag.mixedSplits.push({ y: g.y, from: g.text.slice(0, 40), marginPart: joinWords(rest) });
          g._marginPart = rest;
          g.words = g.words.slice(0, k);
          g.text = joinWords(g.words).trim();
          break;
        }
      }
    }
  }

  const sections = [];
  for (let s = 0; s < sectionIdx.length; s++) {
    const start = sectionIdx[s].i + 1;
    const end = s + 1 < sectionIdx.length ? sectionIdx[s + 1].i : groups.length;
    const range = groups.slice(start, end).filter((g) => g.tag !== "dict" && g !== unitNumberLine);
    const isLangHelpLabel = (g) => /^Language help\s*$/.test(g.text.trim());
    const body = range.filter((g) => g.x0 < MARGIN_MIN_X || g.labelSplit || isLangHelpLabel(g));
    const blocks = [];
    let para = [];
    const flush = () => {
      if (para.length) { blocks.push({ kind: "paragraph", y: para[0].y, text: para.map((g) => g.text).join(" ").replace(/\s+/g, " ").trim() }); para = []; }
    };
    for (const g of body) {
      if (/^Language help\s*$/.test(g.text.trim())) { flush(); blocks.push({ kind: "languageHelpMarker", y: g.y, text: "Language help" }); continue; }
      if (g.words.length === 1 && /^[A-Z]$/.test(g.words[0].t) && g.words[0].y1 - g.words[0].y0 > 18) {
        flush(); blocks.push({ kind: "dropCap", y: g.y, text: g.words[0].t }); diag.dropCaps.push({ y: g.y, letter: g.words[0].t }); continue;
      }
      para.push(g);
    }
    flush();
    const marginNotes = range.filter((g) => g.x0 >= MARGIN_MIN_X && !g.labelSplit && !isLangHelpLabel(g))
      .map((g) => ({ y: g.y, n: /^\d+\s/.test(g.text.trim()) ? +/^\d+/.exec(g.text.trim())[0] : null, text: g.text }))
      .concat(range.filter((g) => g._marginPart).map((g) => ({ y: g.y, n: null, text: joinWords(g._marginPart).trim(), fromMixedLine: true })));
    sections.push({ letter: sectionIdx[s].letter, title: sectionIdx[s].title, y: sectionIdx[s].y, blocks, marginNotes });
  }

  // mini-dictionary entries (split pages): group dict-tagged lines by entryNumber
  const miniDict = [];
  if (unitJson.leftPage.columnSplit) {
    let cur = null;
    for (const g of groups.filter((g) => g.tag === "dict")) {
      if (g.entryNumber !== undefined && g.entryNumber !== null) {
        if (cur) miniDict.push(cur);
        cur = { n: g.entryNumber, y: g.y, text: g.text.replace(/^\d+\s*/, "").trim(), ipa: null, headword: null };
      } else if (cur && !/^\d+\s/.test(g.text.trim())) cur.text = (cur.text + " " + g.text).trim();
      else miniDict.push({ n: /^\d+/.test(g.text.trim()) ? +/^\d+/.exec(g.text.trim())[0] : null, y: g.y, text: g.text.replace(/^\d+\s*/, "").trim(), ipa: null, headword: null, orphan: !/^\d+/.test(g.text.trim()) });
    }
    if (cur) miniDict.push(cur);
    for (const e of miniDict) {
      const ipaM = /\/([^/]+)\//.exec(e.text);
      if (ipaM) e.ipa = "/" + ipaM[1] + "/";
      const marker = (unitJson.leftPage.refMarkers ?? []).find((m) => String(m.marker) === String(e.n));
      if (marker?.after) e.headword = marker.after;
    }
  }

  return { title, unitNumber: unitNumberLine ? +unitNumberLine.text.trim() : unitJson.unit, sections, miniDict, diagnostics: diag };
}

// ---------- right-page structural parse (A2-2 + A3-KA-2 surgical amendment) ----------
// A3-KA-2 amendment (owner vote ④, gate-report §۴ row 4, trace 1a201df91ffdf639): printed
// exercises whose items sit in TWO-or-more printed columns were merged pairwise by the
// single-column item parser, producing «____6» artifacts («average ____6 rays from the sun»,
// 29.4). The amendment re-assembles the item layer mechanically and ONLY for exercises that
// pass every gate below (else the original single-column path runs unchanged — zero regression):
//   (a) ≥2 fire points = a standalone sequence digit (1..30) at word position >0 of a
//       digit-start line, reached across ≥22pt (measured column gaps 22.6–196pt; bank
//       separators ~15pt; normal word gaps ≤6pt) or starting right of x=300;
//   (b) every fire digit ∉ the exercise's own line-start item numbers (a content digit can
//       never steal an item slot);
//   (c) coverage validation: line-start numbers ∪ fired digits = exactly 1..max consecutive;
//   (d) exercise ∉ {84.4} (A3-KA-1 registered grid artifact — its digits are grid column
//       labels, risk register #6; the whole 84.4 activity stays verbatim for the A5-5 menu).
// Runs are split on digit-start lines only at sequence digits, [a-h] option letters and
// right-column jumps (x ≥ colEdge−20pt with ≥25pt gap) so genuine blanks (53–94pt, next word
// near the blank start) stay inside their item and keep textWithBlanks "____". Continuation
// lines (non-digit-start) split at every ≥22pt gap; runs attach per column (run index for
// multi-run lines, nearest column edge for single-run lines) to that column's current item,
// or to the exercise's honest per-column `passage` once the number grid is complete (or when
// the column has no item yet). «Staged» exercises (a digit row after content that followed a
// digit row — 97.5, 64.2) never close the grid, so their content keeps attaching. Doniméh
// second sequences (11.1) re-use numbers and carry part=2. Digit-only runs stay empty and get
// the literal slot "____" ONLY if no content ever attaches (picture-slot items 89.2/9.3/49.4/…).
// A separate inline signature (instruction "first letter is given" + zero items + ≥2 glued
// «Nl» tokens — 20.3) itemizes the printed paragraph gaps as {n, text:"____<letter>"} with the
// paragraph preserved verbatim in passage. All 20.3/84.4-style exclusions and fallbacks are
// recorded in rightPage.diagnostics.ka2 for review.
// A3-KA-2 constants (all measured — see the amendment comment above)
const KA2_FIRE_GAP = 22;   // pt — digit-fire gap (measured column gaps 22.6–196pt; banks ~15pt)
const KA2_FIRE_X = 300;    // pt — alternative fire position (right-column starts measured 305–362)
const KA2_EDGE_TOL = 20;   // pt — column-edge clustering tolerance + right-jump slack
const KA2_PASSAGE_GAP = 25;// pt — right-column jump gap (blank calibration boundary)
const KA2_GRID_GUARD = new Set(["84.4"]); // A3-KA-1 registered artifact — never re-assembled

const isSeqDigit = (w) => /^\d{1,2}$/.test(w.t) && +w.t >= 1 && +w.t <= 30;
const isOptLetter = (w) => /^[a-h]$/.test(w.t);

// pre-scan an exercise's lines for the A3-KA-2 mechanical signature
function scanKA2(no, lines) {
  const digitStart = [];
  const firesPerLine = [];
  const fireXs = [];
  const startNums = [];
  const startNumXs = [];
  const fireNums = [];
  lines.forEach((g) => {
    const fs = new Set();
    const bank = g.words?.length ? isBankRow(g.words) : false;
    const w0 = g.words?.[0];
    const ds = !bank && w0 && isSeqDigit(w0);
    digitStart.push(ds);
    if (ds) { startNums.push(+w0.t); startNumXs.push(w0.x0); }
    if (ds && g.words) {
      for (let k = 1; k < g.words.length; k++) {
        const w = g.words[k];
        if (!isSeqDigit(w)) continue;
        const gap = w.x0 - g.words[k - 1].x1;
        if (gap >= KA2_FIRE_GAP || w.x0 >= KA2_FIRE_X) {
          if (!startNums.includes(+w.t)) { fs.add(k); fireNums.push(+w.t); fireXs.push(w.x0); }
        }
      }
    }
    firesPerLine.push(fs);
  });
  // staged = a digit-start line preceded by a non-digit line that itself follows a digit-start line
  let seenDigit = false, seenNonAfter = false, staged = false;
  lines.forEach((g, li) => {
    if (g.words?.length && isBankRow(g.words)) return;
    if (digitStart[li]) { if (seenNonAfter) staged = true; seenDigit = true; }
    else if (seenDigit) seenNonAfter = true;
  });
  const union = [...new Set([...startNums, ...fireNums])].sort((a, b) => a - b);
  const coverageOK = union.length > 0 && union.every((v, i) => v === i + 1) && union[union.length - 1] <= 30;
  const declared = coverageOK && fireNums.length >= 2 && !KA2_GRID_GUARD.has(no);
  return { digitStart, firesPerLine, startNums, startNumXs, fireNums, fireXs, staged, declared, maxNum: union[union.length - 1] ?? 0 };
}

// split a digit-start line's words into column runs: at sequence digits (fire rule), [a-h]
// option letters, and right-column jumps — genuine blanks (next word near the blank) survive
function splitRunsDigit(words, fires, colEdge) {
  const runs = [];
  let cur = [words[0]];
  for (let k = 1; k < words.length; k++) {
    const w = words[k];
    const gap = w.x0 - words[k - 1].x1;
    const fire = fires.has(k);
    const opt = isOptLetter(w) && gap >= KA2_FIRE_GAP;
    // right-column jump — but never before an all-uppercase single-letter tail (the printed
    // «A B C D» circle-the-letter option row belongs to its own item, 94.5) and never directly
    // after a standalone digit (the number-column gap of the item's own text, 64.2 «3 topic»)
    const optCircleTail = words.slice(k).every((w2) => /^[A-H]$/.test(w2.t));
    const jump = !isSeqDigit(words[k - 1]) && !optCircleTail && w.x0 >= colEdge - KA2_EDGE_TOL && gap >= KA2_PASSAGE_GAP;
    if (fire || opt || jump) { runs.push(cur); cur = [w]; }
    else cur.push(w);
  }
  runs.push(cur);
  return runs;
}

// continuation lines: split at every ≥22pt gap (column boundary), keep genuine blanks intact
function splitRunsCont(words) {
  const runs = [];
  let cur = [words[0]];
  for (let k = 1; k < words.length; k++) {
    if (words[k].x0 - words[k - 1].x1 >= KA2_FIRE_GAP) { runs.push(cur); cur = [words[k]]; }
    else cur.push(words[k]);
  }
  runs.push(cur);
  return runs;
}

const runText = (ws) => textWithBlanks(ws).replace(/\s+/g, " ").trim();

// A3-KA-2 declared assembly — returns { instruction, items, bank, passage? }
function assembleKA2(no, lines, scan, diag) {
  const { digitStart, firesPerLine, startNumXs, fireXs, staged, maxNum } = scan;
  // column edges = clustered x0 of line-start digits + fired digits
  const xs = [...startNumXs, ...fireXs].sort((a, b) => a - b);
  const edges = [];
  for (const x of xs) if (!edges.length || x - edges[edges.length - 1] > KA2_EDGE_TOL) edges.push(x);
  const colEdge = Math.min(...fireXs);
  const nearestCol = (x0) => {
    let best = 0, bd = Infinity;
    edges.forEach((e, i) => { const d = Math.abs(x0 - e); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  const items = [];
  const tails = []; // per item: { x1, line } of its last word — same-line ≥25pt rejoin = blank
  const seen = new Map();
  const colItem = [];
  const colPassage = [];
  const instrParts = [];
  let bank = null;
  let itemPhase = false;
  let complete = false;
  const attach = (item, text, run, lineIdx) => {
    const tail = tails[items.indexOf(item)];
    const sameLine = tail && tail.line === lineIdx && run[0].x0 - tail.x1 >= KA2_PASSAGE_GAP;
    item.text = (item.text + " " + (sameLine ? "____ " : "") + text).replace(/\s+/g, " ").trim();
    tails[items.indexOf(item)] = { x1: run[run.length - 1].x1, line: lineIdx };
  };
  for (let li = 0; li < lines.length; li++) {
    const g = lines[li];
    if (g.words?.length && isBankRow(g.words)) { diag.banks++; bank = (bank ?? []).concat(g.text.trim()); continue; }
    if (!g.words?.length) continue;
    if (!itemPhase && !digitStart[li]) { instrParts.push(runText(g.words)); continue; }
    const runs = digitStart[li] ? splitRunsDigit(g.words, firesPerLine[li], colEdge) : splitRunsCont(g.words);
    for (let ri = 0; ri < runs.length; ri++) {
      const run = runs[ri];
      if (isSeqDigit(run[0])) {
        const n = +run[0].t;
        const part = (seen.get(n) ?? 0) + 1;
        seen.set(n, part);
        const item = { n, y: g.y, text: run.length > 1 ? runText(run.slice(1)) : "", blankCount: 0 };
        if (part > 1) item.part = part;
        items.push(item);
        tails.push(run.length > 1 ? { x1: run[run.length - 1].x1, line: li } : null);
        colItem[runs.length === 1 ? nearestCol(run[0].x0) : ri] = item;
        itemPhase = true;
        continue;
      }
      if (!itemPhase) continue; // pre-item non-digit content on a digit line — impossible; guarded
      const col = runs.length === 1 ? nearestCol(run[0].x0) : ri;
      const cur = colItem[col];
      const text = runText(run);
      if (!text) continue;
      if (cur && !complete) attach(cur, text, run, li);
      else (colPassage[col] ??= []).push(text);
    }
    if (!complete && !staged && items.length) {
      complete = Array.from({ length: maxNum }, (_, i) => i + 1).every((n) => seen.has(n));
    }
  }
  for (let i = 0; i < items.length; i++) {
    if (!items[i].text) { items[i].text = "____"; items[i].blankCount = 1; }
    else items[i].blankCount = (items[i].text.match(/____/g) ?? []).length;
  }
  const columns = Array.from(colPassage, (c) => (c ?? []).join(" ").replace(/\s+/g, " ").trim());
  const passage = columns.some((t) => t) ? { columns, staged } : null;
  const out = { instruction: instrParts.join(" ").replace(/\s+/g, " ").trim(), items, bank };
  if (passage) out.passage = passage;
  return out;
}

// A3-KA-2 inline-gap signature (20.3 family): "first letter is given" + zero items + ≥2 glued
// «Nl» paragraph gaps — pdftotext splits the glued token into a digit word + a single-letter
// word at ≤6pt, so the pair (digit, letter) is the mechanical unit; the paragraph becomes
// verbatim passage and each pair becomes an item {n, text:"____<letter>"}
function assembleInlineGap(ex, lines) {
  if (ex.items.length !== 0 || !/first letter/i.test(ex.instruction)) return false;
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const g = lines[i];
    if (!g.words || (g.words.length && isBankRow(g.words))) continue;
    if (g.x0 >= 120 && inlinePairs(g.words).length) { start = i; break; }
  }
  if (start < 0) return false;
  const paraLines = lines.slice(start);
  const items = [];
  for (const g of paraLines) {
    for (const [dw, lw] of inlinePairs(g.words)) {
      const n = +dw.t;
      if (items.some((it) => it.n === n)) return false; // duplicated inline number — not the signature
      items.push({ n, y: g.y, text: `____${lw.t}`, blankCount: 1 });
    }
  }
  if (items.length < 2) return false;
  const nums = items.map((it) => it.n).sort((a, b) => a - b);
  if (!nums.every((v, i) => v === i + 1)) return false; // gaps must number 1..K consecutively
  ex.items = items;
  ex.instruction = lines.slice(0, start).map((g) => runText(g.words)).join(" ").replace(/\s+/g, " ").trim();
  ex.passage = { columns: [paraLines.map((g) => runText(g.words)).join(" ").replace(/\s+/g, " ").trim()], staged: false };
  return true;
}
// glued «Nl» pairs: a digits-only word immediately followed by a single lowercase letter word
const inlinePairs = (ws) => {
  const out = [];
  for (let k = 0; k < ws.length - 1; k++) {
    if (/^\d{1,2}$/.test(ws[k].t) && /^[a-z]$/.test(ws[k + 1].t) && ws[k + 1].x0 - ws[k].x1 < 8) out.push([ws[k], ws[k + 1]]);
  }
  return out;
};

// original single-column assembly — byte-identical behavior for non-declared exercises
function assembleSingleColumn(ex, lines, diag) {
  let curItem = null;
  const flushItem = () => { if (curItem) { ex.items.push(curItem); curItem = null; } };
  for (const g of lines) {
    if (isBankRow(g.words)) {
      diag.banks++;
      flushItem();
      ex.bank = (ex.bank ?? []).concat(g.text.trim());
      continue;
    }
    const itemM = /^(\d+)\s+(.*)$/.exec(g.text.trim());
    if (itemM && +itemM[1] >= 1 && +itemM[1] <= 30) {
      flushItem();
      curItem = { n: +itemM[1], y: g.y, text: textWithBlanks(g.words).replace(/^\d+\s*/, "").trim(), blankCount: 0 };
      curItem.blankCount = (curItem.text.match(/____/g) ?? []).length;
      continue;
    }
    const text = textWithBlanks(g.words).trim();
    if (curItem) {
      curItem.text = (curItem.text + " " + text).replace(/\s+/g, " ").trim();
      curItem.blankCount = (curItem.text.match(/____/g) ?? []).length;
    } else {
      ex.instruction = (ex.instruction + " " + text).replace(/\s+/g, " ").trim();
    }
  }
  flushItem();
}

function parseRight(unitJson) {
  const groups = buildWordLayer(unitJson, "rightPage", unitJson.provenance.pdfPages.right).emitted;
  const diag = { anchors: 0, banks: 0, ka2: { declared: [], inlineGap: [], excludedGrid: [], fallback: [] } };
  const anchorRe = /^(\d+)\.(\d+)\s*$/;
  const exercises = [];
  let cur = null;
  for (const g of groups) {
    const m = anchorRe.exec(g.text.trim());
    if (m) {
      diag.anchors++;
      if (cur) exercises.push(cur);
      cur = { no: `${m[1]}.${m[2]}`, y: g.y, _lines: [] };
      continue;
    }
    if (cur) cur._lines.push(g);
  }
  if (cur) exercises.push(cur);
  for (const ex of exercises) {
    const lines = ex._lines;
    delete ex._lines;
    const full = { no: ex.no, y: ex.y, instruction: "", items: [], refs: [], bank: null, keyed: null };
    const scan = scanKA2(ex.no, lines);
    if (KA2_GRID_GUARD.has(ex.no) && scan.fireNums.length >= 2) diag.ka2.excludedGrid.push(ex.no);
    if (scan.declared) {
      const r = assembleKA2(ex.no, lines, scan, diag);
      full.instruction = r.instruction;
      full.items = r.items;
      full.bank = r.bank;
      if (r.passage) full.passage = r.passage;
      diag.ka2.declared.push({ no: ex.no, fires: scan.fireNums, maxNum: scan.maxNum, staged: scan.staged, items: r.items.length });
    } else {
      if (scan.fireNums.length >= 2) diag.ka2.fallback.push({ no: ex.no, fires: scan.fireNums, unionMax: scan.maxNum, reason: "coverage" });
      assembleSingleColumn(full, lines, diag);
      if (assembleInlineGap(full, lines)) diag.ka2.inlineGap.push({ no: ex.no, items: full.items.length });
    }
    Object.assign(ex, full);
  }
  for (const ex of exercises) {
    if (/opposite/i.test(ex.instruction)) {
      const refs = [...ex.instruction.matchAll(/from\s+([A-E])\s+opposite/gi)].map((m) => m[1]);
      ex.refs = refs.length ? refs : ["opposite"];
    }
    ex.kind = ex.items.some((i) => i.blankCount > 0) ? "fillIn" : ex.bank ? "bank" : ex.items.length ? "open" : "instruction";
  }
  return { exercises, diagnostics: diag };
}

// ---------- image-dependent candidates (honest text evidence) ----------
const IMG_RE = /\b(pictures?|photos?|photographs?|illustrations?|signs?|logos?|maps?|diagrams?|posters?|symbols?)\b/i;
function imageCandidates(leftParse, rightParse) {
  const out = [];
  for (const ex of rightParse.exercises) {
    const hay = ex.instruction + " " + ex.items.map((i) => i.text).join(" ");
    const m = IMG_RE.exec(hay);
    if (m) out.push({ loc: ex.no, evidence: m[0], kind: "exercise-reference" });
  }
  for (const sec of leftParse.sections) {
    for (const b of sec.blocks) {
      const m2 = IMG_RE.exec(b.text ?? "");
      if (m2 && b.kind === "paragraph") out.push({ loc: `${sec.letter} ${sec.title}`.trim(), evidence: m2[0], kind: "presentation-reference" });
    }
  }
  return out;
}

// ---------- run ----------
mkdirSync(TMP, { recursive: true });
mkdirSync(CAP, { recursive: true });
const censusRows = [];
const totals = { vocabCandidates: 0, marginNotes: 0, proseBlocks: 0, languageHelp: 0, dropCaps: 0, exercises: 0, exerciseItems: 0, blanks: 0, banks: 0, mixedLineSplits: 0, imageDependentCandidates: 0, queuedChars: 0 };

for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  const raw = JSON.parse(readFileSync(`${RAW}/unit-${id}.json`, "utf8"));
  const left = parseLeft(raw);
  const right = parseRight(raw);

  const queuedChars = [];
  for (const side of ["leftPage", "rightPage"]) for (const q of raw[side].ipa.unknownQueue) queuedChars.push({ codepoint: q.codepoint, count: q.count, where: side === "leftPage" ? "leftPage" : "rightPage" });

  const images = { leftPage: pageImageCount(raw.provenance.pdfPages.left), rightPage: pageImageCount(raw.provenance.pdfPages.right) };
  const imgCands = imageCandidates(left, right);

  const proseBlocks = left.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "paragraph").length, 0);
  const langHelp = left.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "languageHelpMarker").length, 0);
  const marginNotes = left.sections.reduce((a, s) => a + s.marginNotes.length, 0);
  const exerciseItems = right.exercises.reduce((a, e) => a + e.items.length, 0);
  const blanks = right.exercises.reduce((a, e) => a + e.items.reduce((b, i) => b + i.blankCount, 0), 0);

  const capture = {
    unit: n,
    title: left.title,
    bookId: "viu-advanced",
    provenance: { rawFile: `${RAW}/unit-${id}.json`, pdfPages: raw.provenance.pdfPages, printedPages: raw.provenance.printedPages, sha256: raw.provenance.sha256, generator: "scripts/viu-adv-parse.mjs (A2-1..A2-5 + A3-KA-2 surgical amendment — owner vote ④ trace 1a201df91ffdf639)" },
    leftPage: { pdfPage: raw.provenance.pdfPages.left, title: left.title, unitNumber: left.unitNumber, sections: left.sections, miniDict: left.miniDict, diagnostics: left.diagnostics },
    rightPage: { pdfPage: raw.provenance.pdfPages.right, exercises: right.exercises, diagnostics: right.diagnostics },
    imageEvidence: images,
    imageDependentCandidates: imgCands,
    queuedChars,
    runtimeMapping: {
      VocabWord: "miniDict entries (word←headword via refMarkers.after · meaning←A4 FA-NEW · pos omitted — not printed in AVU-3 mini-dict)",
      QuizQuestionSeed: "rightPage.exercises (keyed=null until A3 links the printed Answer key; text←item.text with ____; options←bank where printed)",
      Reading: "leftPage.sections[].blocks paragraphs (kind=paragraph) as prose blocks",
      ChapterMeta: "title ← leftPage.title (unit number = chapter id)",
    },
    census: { vocabCandidates: left.miniDict.length, marginNotes, proseBlocks, languageHelp: langHelp, dropCaps: left.diagnostics.dropCaps.length, exercises: right.exercises.length, exerciseItems, blanks, banks: right.diagnostics.banks, mixedLineSplits: left.diagnostics.mixedLineSplits, imageDependentCandidates: imgCands.length },
  };
  writeFileSync(`${CAP}/unit-${id}.json`, JSON.stringify(capture, null, 2) + "\n");

  const verify = {
    unit: n,
    ok: true,
    issues: [],
    checks: {
      partitionEquivalence: "byte-exact against the G1-approved raw lines (order- and tag-sensitive) — all groups matched",
      titleExtracted: left.title.length > 0,
      sectionsFound: left.sections.map((s) => s.letter),
      miniDictEntries: left.miniDict.length,
      mixedLineSplitsResolved: left.diagnostics.mixedLineSplits,
      dropCaps: left.diagnostics.dropCaps,
      exercises: right.exercises.length,
      exerciseAnchors: right.diagnostics.anchors,
      banks: right.diagnostics.banks,
      blanksNormalized: blanks,
      imageDependentCandidates: imgCands.length,
      queuedChars: queuedChars.map((q) => `${q.codepoint}×${q.count}@${q.where}`),
      ka2: {
        declaredExercises: right.diagnostics.ka2.declared.map((d) => d.no),
        declaredItems: right.diagnostics.ka2.declared.reduce((a, d) => a + d.items, 0),
        inlineGap: right.diagnostics.ka2.inlineGap.map((d) => d.no),
        excludedGrid: right.diagnostics.ka2.excludedGrid,
        fallback: right.diagnostics.ka2.fallback,
        passageExercises: right.exercises.filter((e) => e.passage).length,
      },
    },
    note: "Structural parse mirrors the approved A1 partition (proved byte-exact) + word-level structural rules + A3-KA-2 two-column item amendment (declared exercises only, mechanical gates a-d); keyed=null until A3; fa stays empty (A4).",
  };
  writeFileSync(`${CAP}/verify-unit-${id}.json`, JSON.stringify(verify, null, 2) + "\n");

  censusRows.push({ unit: n, title: left.title, ...capture.census, imageEvidence: images, queuedChars: queuedChars.length });

  totals.vocabCandidates += left.miniDict.length;
  totals.marginNotes += marginNotes;
  totals.proseBlocks += proseBlocks;
  totals.languageHelp += langHelp;
  totals.dropCaps += left.diagnostics.dropCaps.length;
  totals.exercises += right.exercises.length;
  totals.exerciseItems += exerciseItems;
  totals.blanks += blanks;
  totals.banks += right.diagnostics.banks;
  totals.mixedLineSplits += left.diagnostics.mixedLineSplits;
  totals.imageDependentCandidates += imgCands.length;
  totals.queuedChars += queuedChars.length;
}

const faCache = {
  bookId: "viu-advanced",
  status: "A4-pending",
  faNew: 0,
  faReviewed: 0,
  note: "Translation layer is Phase A4 scope (GLM pipeline — class FA-NEW; FA-REVIEWED only via owner human adjudication, principle ۳ §۳ roadmap). This stub registers the viu-r2-capture-upper pattern for A2-5; coverage ≠ correctness is mandatory in every A4 report.",
};
writeFileSync(`${CAP}/fa-cache.json`, JSON.stringify(faCache, null, 2) + "\n");

const census = {
  meta: {
    script: "scripts/viu-adv-parse.mjs",
    generatedAt: new Date().toISOString(),
    bookId: "viu-advanced",
    roadmap: "نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md",
    gate: "G1 PASS (docs/qa/viu-adv-g1-gate-decision-2026-11-21.md) + owner pre-authorization trace 1a1feb704efa1a55 + G3 vote ④ A3-KA-2 amendment (trace 1a201df91ffdf639)",
    blankGapCalibration: "≥25pt = blank (53–94pt observed) · ~15pt = bank separator · 2pt = normal word gap",
    ka2Amendment: "two-column item re-assembly — fires: standalone seq digit across ≥22pt (or x≥300) · coverage 1..max · grid guard 84.4 · per-exercise diagnostics in each unit's rightPage.diagnostics.ka2",
    marginColumnRule: "≥2 short whole-lines right of 340pt → column edge; mixed body lines split at ≥8pt gaps whose trailing run lies in the column (G1 limitation resolution — all splits recorded in diagnostics)",
  },
  totals,
  units: censusRows,
  stopRules: {
    rule1_imageDependent: { status: "recorded — owner menu prepared at A5-5, never silent deletion", candidates: totals.imageDependentCandidates },
    rule2_unknownIpa: { queued: totals.queuedChars, status: "all queued verbatim — zero guessing" },
  },
};
writeFileSync(CENSUS_OUT, JSON.stringify(census, null, 2) + "\n");
rmSync(TMP, { recursive: true, force: true });
console.log(`A2 parse → ${CAP}/unit-001..101.json + verify-* + fa-cache.json + ${CENSUS_OUT}`);
console.log("totals:", JSON.stringify(totals));
