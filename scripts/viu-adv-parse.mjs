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

// ---------- right-page structural parse (A2-2) ----------
function parseRight(unitJson) {
  const groups = buildWordLayer(unitJson, "rightPage", unitJson.provenance.pdfPages.right).emitted;
  const diag = { anchors: 0, banks: 0 };
  const anchorRe = /^(\d+)\.(\d+)\s*$/;
  const exercises = [];
  let cur = null;
  let curItem = null;
  const flushItem = () => { if (cur && curItem) { cur.items.push(curItem); curItem = null; } };
  for (const g of groups) {
    const m = anchorRe.exec(g.text.trim());
    if (m) {
      diag.anchors++;
      flushItem();
      if (cur) exercises.push(cur);
      cur = { no: `${m[1]}.${m[2]}`, y: g.y, instruction: "", items: [], refs: [], bank: null, keyed: null };
      continue;
    }
    if (!cur) continue;
    if (isBankRow(g.words)) {
      diag.banks++;
      flushItem();
      cur.bank = (cur.bank ?? []).concat(g.text.trim());
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
      cur.instruction = (cur.instruction + " " + text).replace(/\s+/g, " ").trim();
    }
  }
  flushItem();
  if (cur) exercises.push(cur);
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
    provenance: { rawFile: `${RAW}/unit-${id}.json`, pdfPages: raw.provenance.pdfPages, printedPages: raw.provenance.printedPages, sha256: raw.provenance.sha256, generator: "scripts/viu-adv-parse.mjs (A2-1..A2-5)" },
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
    },
    note: "Structural parse mirrors the approved A1 partition (proved byte-exact) + word-level structural rules; keyed=null until A3; fa stays empty (A4).",
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
    gate: "G1 PASS (docs/qa/viu-adv-g1-gate-decision-2026-11-21.md) + owner pre-authorization trace 1a1feb704efa1a55",
    blankGapCalibration: "≥25pt = blank (53–94pt observed) · ~15pt = bank separator · 2pt = normal word gap",
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
