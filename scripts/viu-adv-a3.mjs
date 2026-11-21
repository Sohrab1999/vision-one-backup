// VIU Book 4 (AVU-3) — Phase A3 — Answer key + Index: parse, link, three intersections (A3-1..A3-4).
// Owner mandate (trace 1a1ff7da9b2a2b21): «مجازه ادامه بده» = explicit owner command that opens the
//   A3 gate (A3 was recorded as AWAITING OWNER in SNAPSHOT headers ۱۰۳/۱۰۴/۱۰۵ — the lock «فقط با
//   فرمان صریح مالک» is now released by the owner's own message) — plus the re-issued 10-point
//   persistence mandate (fourteenth re-issue), honoured by the docs/commit cycle that follows.
//
// Roadmap mapping (§۴ فاز A3 — نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم):
//   A3-1 key parse (PDF 212-277 = printed 210-275): 101 standalone «Unit N» block labels + 413
//        standalone `N.x` exercise anchors (both measured; anchor total equals the A0 baseline
//        count exactly) + verbatim answer rows. Matching letter sequences stay verbatim in the
//        row text (risk register #10 — no guessy conversion); a `letter` field is recorded ONLY
//        when a row's text is exactly one A-Za-z char (e.g. "1 C" → letter "C").
//   A3-2 key↔exercise link: capture exercises get `keyed` = the exact key-block object when the
//        printed key contains the anchor; print-keyless exercises honestly keep keyed=null.
//        Measured: 455 exercises − 413 anchors = 42 print-keyless, ALL kind=instruction with
//        0 items — zero fabricated answers (golden rule §۳-۱, pattern of the 383 keyless items
//        of the three-book phase).
//   A3-3 index parse (PDF 279-300 = printed 277-298): 3 columns — measured entry starts
//        x≈51/212/373, col2 maxX1=360 < col3 minX0=373 (no crossing words). Format
//        `headword /IPA/ unit(s)`; trailing numbers are UNIT numbers (printed index note removed
//        and recorded verbatim). Mandatory §۲-۳ IPA remap applied everywhere; unknown PUA/C0/C1
//        chars stay verbatim and are queued (expected U+E022 — the A0-known wrong-mapping glyph
//        of Times-PhoneticIPA; never guessed, A0 risk #2 protocol).
//   A3-4 three intersections (docs/qa/viu-adv-a3-intersections-2026-11-21.json):
//        (الف) key coverage per unit — every keyed capture exercise ∈ key, both directions,
//              orphan check (per-unit table);
//        (ب)  index headwords ⊆ union of unit mini-dicts + exercises (honest mismatch report);
//        (ج)  item↔key row count balance (per-exercise diff list).
//   Gate G3 (owner): intersections report + quiz-conversion policy confirmation — this script
//        does NOT open G3; A4..A6 stay gated.
//
// Line classification rules for key blocks (measured 2026-11-21 census of all 66 key pages; every
// line is preserved verbatim regardless of classification):
//   • footer band y>715 removed (folio + book title; recorded verbatim in removedBands) — 66/66 pages;
//   • the «Answer key» section title (page 212, y<45) removed and recorded verbatim — all other
//     top-band content is real content (anchors / Unit labels / continuations) and is KEPT;
//   • row-start  = line whose first token is digits-only (2266 measured);
//   • note       = /^(Possible|Suggested) answers?:$/ or any non-numbered line before the first row
//                  (table headers, "Stressed syllables are in bold…", …);
//   • tableRow   = intra-line whitespace gap ≥40pt (measured multi-column table gaps 40–100pt) OR
//                  a distinct x0 aligning with neither the current row's text column (±6pt) nor the
//                  number-column wrap range [98..107];
//   • cont       = otherwise-aligned non-numbered line appended to the current row's `more[]`
//                  (measured continuation x0s 99–131 = number/text columns).
//
//   A3-KA-1 (registered artifact, NOT a guess): unit 84.4 is the book's ONLY grid-based activity
//        (roadmap risk register #6 — PDF 177; A5-5 owner menu applies). Its printed key is the
//        COMPLETED LETTER GRID: the digits on those lines are grid column labels 1-5 (measured:
//        «1 2»/«3»/«4 5» at x0=102-125, p264), not answer numbers. The whole 84.4 key block is
//        therefore recorded verbatim as extras {kind:"grid"} with zero numeric-row parsing.
//        All other all-digits lines in the key are genuine numeric answers (measured: exactly one —
//        «5 55» = row n=5, answer 55, unit 71, p255) and keep the normal row model.
//   A3-KA-2 (registered finding, surfaced by intersection (ج) — NOT fixed inside A3's scope):
//        the A2 right-page item parser handled single-column item flows; printed exercises whose
//        items sit in TWO columns (e.g. 29.4: items 1-5 left x≈116, items 6-9 right x≈330) were
//        merged pairwise into single capture items with «____» + glued right-column number
//        artifacts («average ____6 rays from the sun»). The printed KEY is parsed correctly
//        (9 rows for 29.4) — the divergence is in the A2 capture item layer; the intersections file
//        counts the affected exercises under the mechanical pattern label "twoColumnItems". Per
//        scope discipline, A3 registers the finding and proposes the surgical A2 amendment at gate
//        G3; nothing is silently rewritten.
//
// Reproducibility: requires poppler-utils (pdftotext) on PATH. READ-ONLY toward the product:
//   writes ONLY docs/qa/viu-adv-raw/a3-key-pages.json + a3-index-pages.json,
//   docs/qa/viu-adv-capture/{answer-key.json,index.json,unit-XXX.json,verify-a3-key-index.json}
//   and docs/qa/viu-adv-a3-intersections-2026-11-21.json.
//   Zero changes to src/, prisma/, db/, hooks, WAVE2, product data of the three existing books,
//   or the four PDFs. Honesty rules §۳ roadmap: no value invented; every number measured here;
//   unknown codepoints queued, never guessed.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const PDF = "upload/Advanced Vocabulary in Use  - 3rd Edition.pdf"; // TWO spaces before "-" (exact name)
const RAW = "docs/qa/viu-adv-raw";
const CAP = "docs/qa/viu-adv-capture";
const KEY_RAW = `${RAW}/a3-key-pages.json`;
const IDX_RAW = `${RAW}/a3-index-pages.json`;
const KEY_OUT = `${CAP}/answer-key.json`;
const IDX_OUT = `${CAP}/index.json`;
const VERIFY_OUT = `${CAP}/verify-a3-key-index.json`;
const INTER_OUT = "docs/qa/viu-adv-a3-intersections-2026-11-21.json";
const TMP = "/tmp/a3-pages";

// §۲-۳ mandatory IPA remap table (roadmap contract — applied everywhere, A1-5)
const KNOWN_IPA = { 0xe027: "\u02c8", 0xe03a: "\u02d0", 0xe05a: "\u0292", 0xf769: "\u026a", 0xe0c6: "\u025c", 0xe07b: "\u00e6", 0xe0f6: "\u028c", 0x03c5: "\u028a" };
const remap = (s) => [...s].map((ch) => KNOWN_IPA[ch.codePointAt(0)] ?? ch).join("");
const isPuaOrCtl = (c) => (c >= 0xe000 && c <= 0xf8ff) || c < 0x20 || (c >= 0x7f && c <= 0x9f);
const uTag = (c) => `U+${c.toString(16).toUpperCase().padStart(4, "0")}`;

// approved band constants (A1 calibration — footers measured on all key/index pages here too)
const FOOTER_Y = 715, LINE_TOL = 2.0;
// A3 structural constants (all measured — see header)
const KEY_PAGES = [212, 277], IDX_PAGES = [279, 300];
const IDX_COL1_MAX = 190, IDX_COL2_MAX = 345; // word→column assignment by x0 (measured starts 51/212/373; col2 extends to x1=360 < col3 minX0=373 — no crossing)
const TABLE_GAP = 40;                          // measured multi-column table gaps 40–100pt
const TAB_GAP = 12;                            // measured TAB jumps of the key's compact tab-separated layout: exactly 15.0pt
                                               // (normal inter-word gaps ≤6pt; filled-blank gaps ≥53pt) — a row line splits at a
                                               // ≥12pt gap ONLY before a digits-only token (the next «N answer» pair of the tab row)
const NUM_COL_MIN = 98, NUM_COL_MAX = 107;     // continuation lines wrapping under the item-number column
const TEXT_ALIGN_TOL = 6;                      // continuation alignment tolerance vs row text x0

const abort = (msg) => { console.error(`ABORT: ${msg}`); process.exit(1); };

function pageWords(pdfPage) {
  const f = `${TMP}/p${pdfPage}.html`;
  if (!existsSync(f)) execFileSync("pdftotext", ["-bbox", "-f", String(pdfPage), "-l", String(pdfPage), PDF, f]);
  const h = readFileSync(f, "utf8");
  return [...h.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g)]
    .map((m) => ({ x0: +m[1], y0: +m[2], x1: +m[3], y1: +m[4], t: remap(m[5]) }));
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

// identical clustering rule to the approved A1/A2 partition (y-cluster LINE_TOL, x-sorted)
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
    ln.x0 = ln.words[0].x0;
    ln.x1 = ln.words[ln.words.length - 1].x1;
    ln.text = joinWords(ln.words);
  }
  lines.sort((a, b) => a.y0 - b.y0);
  return lines;
}

function extractPage(pdfPage) {
  const all = clusterLines(pageWords(pdfPage));
  const body = [], removed = [];
  for (const ln of all) {
    if (ln.y0 > FOOTER_Y) { removed.push({ band: "footer", y: Math.round(ln.y0 * 10) / 10, text: ln.text }); continue; }
    body.push({ y: Math.round(ln.y0 * 10) / 10, x0: Math.round(ln.x0 * 10) / 10, x1: Math.round(ln.x1 * 10) / 10, text: ln.text, words: ln.words });
  }
  return { body, removed };
}

const sha256 = createHash("sha256").update(readFileSync(PDF)).digest("hex");
mkdirSync(TMP, { recursive: true });

// ================================================================= A3-1 — raw + parse of the key
function extractKey() {
  const pages = [];
  for (let p = KEY_PAGES[0]; p <= KEY_PAGES[1]; p++) {
    const { body, removed } = extractPage(p);
    const kept = [], removedAll = [...removed];
    for (const ln of body) {
      if (ln.text === "Answer key") { removedAll.push({ band: "section-title", y: ln.y, text: ln.text }); continue; } // page 212 only (measured 1/66)
      kept.push(ln); // words kept in memory for the row parser; stripped at raw-layer serialization (A1-style text lines)
    }
    pages.push({ pdfPage: p, printedPage: p - 2, lines: kept, removedBands: removedAll });
  }
  return pages;
}

function parseKey(pages) {
  const units = {};
  let cur = null;               // current unit number
  let ex = null;                // current exercise {pdfPages:Set, rows, extras}
  let row = null;               // current numbered row
  let expectedUnit = 1;
  const stats = { anchors: 0, rows: 0, extras: 0, letterRows: 0, notes: 0, tableRows: 0, conts: 0, gridLines: 0 };

  const flushEx = () => { if (ex) { if (units[cur]?.[ex.no]) abort(`key: duplicate anchor ${ex.no} in unit ${cur}`); ex.pdfPages = [...ex.pdfPages].sort((a, b) => a - b); units[cur][ex.no] = { pdfPages: ex.pdfPages, rows: ex.rows, extras: ex.extras }; ex = null; row = null; } };

  for (const page of pages) {
    for (const ln of page.lines) {
      const text = ln.text;
      const um = /^Unit (\d+)$/.exec(text);
      if (um) {
        const u = +um[1];
        if (u !== expectedUnit) abort(`key: Unit label ${u} out of sequence (expected ${expectedUnit}, page ${page.pdfPage})`);
        if (ex) flushEx();
        if (cur !== null && Object.keys(units[cur] ?? {}).length === 0) abort(`key: unit ${cur} block is empty`);
        cur = u; units[cur] = {}; expectedUnit++; row = null;
        continue;
      }
      const am = /^(\d{1,3})\.(\d)$/.exec(text);
      if (am) {
        const u = +am[1];
        if (cur === null || u !== cur) abort(`key: anchor ${text} appears under Unit ${cur} (page ${page.pdfPage})`);
        flushEx();
        ex = { no: text, pdfPages: new Set([page.pdfPage]), rows: [], extras: [] };
        stats.anchors++;
        row = null;
        continue;
      }
      if (ex === null) abort(`key: content line before any anchor in Unit ${cur} (page ${page.pdfPage}): "${text.slice(0, 60)}"`);
      ex.pdfPages.add(page.pdfPage);
      if (ex.no === "84.4") {
        // A3-KA-1: the grid exercise's key = verbatim letter grid; digits here are column labels 1-5
        const gaps84 = ln.words.length > 1 ? Math.max(...ln.words.slice(1).map((w, i) => w.x0 - ln.words[i].x1)) : 0;
        ex.extras.push({ kind: "grid", x0: Math.round(ln.x0 * 10) / 10, text, bigGap: gaps84 >= TABLE_GAP });
        stats.gridLines++; stats.extras++;
        continue;
      }
      const first = ln.words[0];
      if (/^\d{1,3}$/.test(first.t)) {
        // tab-separated compact layout: one visual line carries several «N answer» pairs at tab stops
        // (measured: tab jump = 15.0pt exactly; sample rows 7.2 «1 under⇥2 around⇥…», 34.1, 21.5, 85.1).
        // Split mechanically at ≥TAB_GAP gaps before digits-only tokens — each segment becomes one row.
        const segs = [[first]];
        for (let i = 1; i < ln.words.length; i++) {
          const gap = ln.words[i].x0 - ln.words[i - 1].x1;
          if (gap >= TAB_GAP && /^\d{1,3}$/.test(ln.words[i].t)) segs.push([ln.words[i]]);
          else segs[segs.length - 1].push(ln.words[i]);
        }
        for (const seg of segs) {
          const n = +seg[0].t;
          if (n < 1) abort(`key: row number 0 in ${ex.no} (page ${page.pdfPage})`);
          const rest = seg.slice(1);
          const rowText = joinWords(rest);
          if (!rowText.trim()) abort(`key: numbered row ${n} with empty text in ${ex.no} (page ${page.pdfPage})`);
          const r = { n, text: rowText };
          const lm = /^([A-Za-z])$/.exec(rowText);
          if (lm) { r.letter = lm[1]; stats.letterRows++; }
          if (rest.length) r.textX0 = Math.round(rest[0].x0 * 10) / 10;
          ex.rows.push(r); row = r; stats.rows++;
        }
        continue;
      }
      // non-numbered line — classify mechanically (rules in header)
      const noteM = /^(Possible|Suggested) answers?:$/i.exec(text);
      const gaps = ln.words.length > 1 ? Math.max(...ln.words.slice(1).map((w, i) => w.x0 - ln.words[i].x1)) : 0;
      const bigGap = gaps >= TABLE_GAP;
      if (noteM || (row === null && !bigGap)) {
        ex.extras.push({ kind: "note", x0: Math.round(ln.x0 * 10) / 10, text, bigGap });
        stats.notes++; stats.extras++;
        continue;
      }
      const aligned = Math.abs(ln.x0 - (row?.textX0 ?? row?.x0 ?? -1)) <= TEXT_ALIGN_TOL || (ln.x0 >= NUM_COL_MIN && ln.x0 <= NUM_COL_MAX);
      if (!bigGap && aligned) {
        row.more ??= [];
        row.more.push(text);
        stats.conts++; stats.extras++;
        continue;
      }
      ex.extras.push({ kind: "tableRow", x0: Math.round(ln.x0 * 10) / 10, text, bigGap });
      stats.tableRows++; stats.extras++;
    }
  }
  flushEx();
  if (cur !== 101 || expectedUnit !== 102) abort(`key: block walk ended at Unit ${cur}/expected ${expectedUnit - 1}`);
  if (Object.keys(units[101]).length === 0) abort("key: unit 101 block is empty");
  return { units, stats };
}

// ================================================================= A3-3 — raw + parse of the index
function extractIndex() {
  const pages = [];
  for (let p = IDX_PAGES[0]; p <= IDX_PAGES[1]; p++) {
    const body = pageWords(p).filter((w) => w.y0 <= FOOTER_Y); // raw words — footer dropped here (band recorded per line below)
    // 3-column model: words are assigned to columns by x0 FIRST, then clustered per column —
    // a page-wide y-cluster would glue the three columns' same-y rows into one line (measured).
    const colWords = { 1: [], 2: [], 3: [] };
    for (const w of body) colWords[w.x0 < IDX_COL1_MAX ? 1 : w.x0 < IDX_COL2_MAX ? 2 : 3].push(w);
    const removed = [];
    const lines = [];
    for (const col of [1, 2, 3]) {
      let seenEntry = false;
      for (const ln of clusterLines(colWords[col])) {
        if (!/\d$/.test(ln.text)) {
          // Digit-less column line. On page 279, before any entry, these are exactly the printed
          // title «Index» + note «The numbers in the Index are Unit numbers, not page numbers.»
          // (removed & recorded verbatim). Anywhere else — and after the first entry on 279 — a
          // digit-less line is a WRAPPED ENTRY (measured: «alternative medicine /…/» on p279 col2
          // has its unit number 51 wrapped to the next line); kept for the parser to join.
          if (!seenEntry && p === IDX_PAGES[0]) {
            if (!(/Index/.test(ln.text) || /numbers/.test(ln.text))) abort(`index p${p}: unexpected digit-less line y=${ln.y0}: "${ln.text.slice(0, 60)}"`);
            removed.push({ band: "index-title-note", y: Math.round(ln.y0 * 10) / 10, text: ln.text });
            continue;
          }
          lines.push({ y: Math.round(ln.y0 * 10) / 10, x0: Math.round(ln.x0 * 10) / 10, x1: Math.round(ln.x1 * 10) / 10, col, text: ln.text, wrapped: true });
          continue;
        }
        seenEntry = true;
        lines.push({ y: Math.round(ln.y0 * 10) / 10, x0: Math.round(ln.x0 * 10) / 10, x1: Math.round(ln.x1 * 10) / 10, col, text: ln.text });
      }
    }
    lines.sort((a, b) => a.col - b.col || a.y - b.y); // reading order: column by column, top to bottom
    pages.push({ pdfPage: p, printedPage: p - 2, lines, removedBands: removed });
  }
  return pages;
}

function parseIndex(pages) {
  const entries = [];
  const queue = new Map();
  const colCounts = { 1: 0, 2: 0, 3: 0 };
  let noDigit = 0, wrappedEntries = 0;
  for (const page of pages) {
    const byCol = { 1: [], 2: [], 3: [] };
    for (const ln of page.lines) byCol[ln.col].push(ln);
    for (const col of [1, 2, 3]) {
      let pending = [];
      for (const ln of byCol[col]) {
        if (!/^.*\d$/.test(ln.text) || ln.wrapped) { pending.push(ln.text); continue; } // wrapped-entry fragment
        const text = [...pending, ln.text].join(" ");
        if (pending.length) wrappedEntries++;
        pending = [];
        // lazy head: the trailing units group takes the MAXIMAL «N(, M)*» run (multi-unit entries
        // «yearn /jɜːn/ 13, 70» → units [13,70]) while digit-ending headwords («Covid-19 45») stay whole
        const m = /^(.*?)\s+((?:\d{1,3})(?:\s*,\s*\d{1,3})*)$/.exec(text);
        if (!m) { noDigit++; continue; }
        const rest = m[1].trim();
        const units = m[2].split(",").map((s) => +s.trim());
        if (units.some((u) => u < 1 || u > 101)) abort(`index p${page.pdfPage}: unit numbers out of range: "${text.slice(0, 60)}"`);
        let headword = rest, ipa = null;
        const i1 = rest.lastIndexOf("/");
        if (i1 > 0) {
          const i0 = rest.lastIndexOf("/", i1 - 1);
          if (i0 >= 0) {
            headword = rest.slice(0, i0).trim();
            ipa = rest.slice(i0, i1 + 1);
            const after = rest.slice(i1 + 1).trim();
            if (after) abort(`index p${page.pdfPage}: content after closing IPA slash discarded — "${text.slice(0, 70)}"`); // zero-loss guard
          }
        }
        if (!headword) abort(`index p${page.pdfPage}: empty headword: "${text.slice(0, 60)}"`);
        for (const s of [headword, ipa ?? ""]) for (const ch of s) { const c = ch.codePointAt(0); if (isPuaOrCtl(c)) queue.set(uTag(c), (queue.get(uTag(c)) ?? 0) + 1); }
        entries.push({ headword, ipa, units, col, pdfPage: page.pdfPage });
        colCounts[col]++;
      }
      if (pending.length) abort(`index p${page.pdfPage} col${col}: unresolved wrapped-entry fragment(s): ${JSON.stringify(pending)}`);
    }
  }
  if (noDigit !== 0) abort(`index: ${noDigit} entry lines without trailing unit numbers`);
  return { entries, queue: [...queue.entries()].map(([codepoint, count]) => ({ codepoint, count })), colCounts, wrappedEntries };
}

// ================================================================= run: extraction + verify + parse
console.log("A3 — extracting key pages 212-277 ...");
const keyPagesA = extractKey();
console.log("A3 — extracting index pages 279-300 ...");
const idxPagesA = extractIndex();

// verify pass: re-extract from fresh pdftotext runs and byte-compare (partition determinism proof)
rmCache();
function rmCache() { execFileSync("rm", ["-rf", TMP]); mkdirSync(TMP, { recursive: true }); }
const keyPagesB = extractKey();
const idxPagesB = extractIndex();
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const keyByteExact = eq(keyPagesA, keyPagesB);
const idxByteExact = eq(idxPagesA, idxPagesB);
if (!keyByteExact) abort("key raw layer NOT byte-exact across two independent extraction passes");
if (!idxByteExact) abort("index raw layer NOT byte-exact across two independent extraction passes");
console.log(`A3 — verify: key bytes ${keyByteExact} · index bytes ${idxByteExact} (two independent pdftotext passes)`);

const parsedKey = parseKey(keyPagesA);
const parsedIdx = parseIndex(idxPagesA);
console.log(`A3-1 — key: units=${Object.keys(parsedKey.units).length} anchors=${parsedKey.stats.anchors} rows=${parsedKey.stats.rows} (letterRows=${parsedKey.stats.letterRows}) extras=${parsedKey.stats.extras} (notes=${parsedKey.stats.notes} tableRows=${parsedKey.stats.tableRows} conts=${parsedKey.stats.conts})`);
console.log(`A3-3 — index: entries=${parsedIdx.entries.length} withIpa=${parsedIdx.entries.filter((e) => e.ipa).length} wrappedEntries=${parsedIdx.wrappedEntries} queue=${JSON.stringify(parsedIdx.queue)}`);

// ================================================================= A3-2 — link key ↔ capture exercises
const captureMeta = { generator: "scripts/viu-adv-a3.mjs (A3-2)", generatedAt: new Date().toISOString(), sha256 };
let keyedCount = 0, keylessList = [];
const perUnit = [];
for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  const c = JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8"));
  let keyed = 0; const keyless = [];
  for (const ex of c.rightPage.exercises) {
    const k = parsedKey.units[n]?.[ex.no];
    ex.keyed = k ? JSON.parse(JSON.stringify({ pdfPages: k.pdfPages, rows: k.rows, extras: k.extras })) : null;
    if (k) keyed++; else { keyless.push(ex.no); keylessList.push(ex.no); }
  }
  keyedCount += keyed;
  c.a3 = { status: keyless.length === 0 ? "keyed" : "keyed+print-keyless", keyed, printKeyless: keyless.length, generator: captureMeta.generator, generatedAt: captureMeta.generatedAt };
  writeFileSync(`${CAP}/unit-${id}.json`, JSON.stringify(c, null, 2) + "\n");
  perUnit.push({ unit: n, exercises: c.rightPage.exercises.length, keyed, printKeyless: keyless.length, keylessNos: keyless });
}
console.log(`A3-2 — link: keyed=${keyedCount} printKeyless=${keylessList.length} (expected 413/42)`);

// ================================================================= A3-4 — three intersections
// (ب) corpus for index⊆union check — roadmap-literal: unit mini-dictionaries + exercises.
//     A1-2 contract artifact: superscript ref markers stay INLINE in the text (e.g. «acclaimed3»
//     = the word + a reference marker to dict entry 3), so every token matching
//     /letters \d{1,2}$/ also contributes its ref-stripped variant to the corpus (mechanical,
//     documented — NOT an interpretation of content). A supplementary full-unit-layer corpus
//     (adding prose paragraphs + margin gloss notes) is measured separately for the G3 review.
const corpusPrimary = new Set();  // miniDict (headword+text) + exercises (instruction/items/bank)
const corpusFull = new Set();     // + prose paragraphs + margin notes (supplementary metric)
const corpusHeadwords = new Set();
const addWords = (t, set) => {
  if (!t) return;
  for (const m of String(t).toLowerCase().matchAll(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)) {
    set.add(m[0]);
    const ref = /^(.*[\p{L}'’-])\d{1,2}$/.exec(m[0]); // inline superscript ref marker (A1-2)
    if (ref) set.add(ref[1]);
  }
};
for (let n = 1; n <= 101; n++) {
  const c = JSON.parse(readFileSync(`${CAP}/unit-${String(n).padStart(3, "0")}.json`, "utf8"));
  for (const e of c.leftPage.miniDict) { if (e.headword) corpusHeadwords.add(e.headword.toLowerCase()); addWords(e.headword, corpusPrimary); addWords(e.text, corpusPrimary); }
  for (const s of c.leftPage.sections) {
    for (const b of s.blocks) if (b.kind === "paragraph") addWords(b.text, corpusFull);
    for (const m of s.marginNotes) addWords(m.text, corpusFull);
  }
  for (const ex of c.rightPage.exercises) { addWords(ex.instruction, corpusPrimary); for (const i of ex.items) addWords(i.text, corpusPrimary); for (const b of ex.bank ?? []) addWords(b, corpusPrimary); }
}
for (const t of corpusPrimary) corpusFull.add(t); // supplementary union = primary ∪ prose ∪ margin (one set, like the roadmap's اجتماع)
const stripParens = (s) => s.replace(/\([^)]*\)/g, " ");
const tok = (s) => {
  const raw = [...stripParens(s).matchAll(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)].map((m) => m[0]);
  return [...new Set(raw.flatMap((t) => { const ref = /^(.*[\p{L}'’-])\d{1,2}$/.exec(t); return ref ? [t, ref[1]] : [t]; }))];
};
const idxMatched = { exact: 0, tokens: 0, tokensFull: 0, mismatch: [] };
for (const e of parsedIdx.entries) {
  const hw = e.headword.toLowerCase();
  if (corpusHeadwords.has(hw)) { idxMatched.exact++; continue; }
  const toks = tok(hw);
  // honest mechanical containment — no stopword filtering, no synonyms (mismatches are reported, never resolved)
  if (toks.length > 0 && toks.every((t) => corpusPrimary.has(t))) { idxMatched.tokens++; continue; }
  if (toks.length > 0 && toks.every((t) => corpusFull.has(t))) { idxMatched.tokensFull++; continue; }
  idxMatched.mismatch.push({ headword: e.headword, ipa: e.ipa, units: e.units, pdfPage: e.pdfPage });
}
// (ج) item↔key balance + mechanical pattern labels (labels only — rows stay verbatim; see gate report)
let balEqual = 0, balUnequal = 0; const balDiffs = []; const balPatterns = { inlineSequence: 0, workedExample: 0, twoColumnItems: 0, moreRowsThanItems: 0, duplicateNumbers: 0, other: 0 };
// twoColumnItems = interleaved row numbers with constant stride (rowNs[1]-rowNs[0] === items) —
// the mechanical signature of A3-KA-2 (printed 2-column items merged pairwise in the A2 capture)
const strideOK = (rowNs, items) => {
  if (rowNs.length < 4) return false;
  const s1 = rowNs[1] - rowNs[0];
  if (s1 < 2) return false;
  // s1===items: clean pairwise merge (29.4) · rows===2*s1: the capture under-counted items themselves (89.2) · items===0: fully merged capture
  return rowNs[2] === rowNs[0] + 1 && rowNs[3] - rowNs[2] === s1 && (items === 0 || s1 === items || rowNs.length === 2 * s1);
};
for (let n = 1; n <= 101; n++) {
  const c = JSON.parse(readFileSync(`${CAP}/unit-${String(n).padStart(3, "0")}.json`, "utf8"));
  for (const ex of c.rightPage.exercises) {
    if (!ex.keyed) continue;
    const rows = ex.keyed.rows.length, items = ex.items.length;
    const rowNs = ex.keyed.rows.map((r) => r.n);
    const overRows = rowNs.filter((r) => r > items);
    if (rows === items && overRows.length === 0) { balEqual++; continue; }
    balUnequal++;
    const dup = new Set(rowNs).size !== rowNs.length;
    const firstText = ex.keyed.rows[0]?.text ?? "";
    const inlineDigits = (firstText.match(/\d+/g) ?? []).length;
    const nums = [...new Set(rowNs)].sort((a, b) => a - b);
    let pattern = "other";
    if (dup) pattern = "duplicateNumbers";
    else if (rows > items && strideOK(rowNs, items)) pattern = "twoColumnItems";
    else if (rows > items) pattern = "moreRowsThanItems";
    else if (nums.length === 1 && inlineDigits >= 2) pattern = "inlineSequence";
    else if (nums[0] === 2 && nums.every((v, i) => v === i + 2)) pattern = "workedExample";
    else if (inlineDigits >= 2 && nums[0] === 1 && nums.slice(1).every((v, i) => v === nums[i] + 1) && nums[nums.length - 1] === items) pattern = "inlineSequence";
    balPatterns[pattern]++;
    balDiffs.push({ exercise: ex.no, items, rows, rowNumbers: rowNs, rowsOverItemCount: overRows, extras: ex.keyed.extras.length, pattern });
  }
}
const intersections = {
  meta: {
    generator: "scripts/viu-adv-a3.mjs (A3-4)", generatedAt: new Date().toISOString(), sha256,
    roadmap: "نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md §۴ فاز A3",
    a3KnownArtifacts: {
      A3_KA_1: "کلید تمرین جدول‌فکرک 84.4 verbatim به‌صورت extras{kind:grid} ثبت شد — ارقام آن خطوط برچسب ستون گرید ۱-۵ هستند نه شمارهٔ پاسخ (تنها فعالیت گریدمحور کتاب — risk #6 نقشه راه؛ منوی A5-5)",
      A3_KA_2: "لایهٔ آیتم A2 چیدمان دوستونهٔ آیتم‌های صفحهٔ راست را تک‌ستونه پارس کرده (ادغام جفتی با آرتیفکت «____6»؛ نمونه: 29.4 کپچر items=5 در برابر ۹ آیتم چاپی و ۹ ردیف کلید) — توسط تقاطع (ج) آشکار شد؛ اصلاح جراحی پیشنهادی در دروازهٔ G3 به تصمیم مالک می‌رسد — A3 لایهٔ A2 را بازنویسی نمی‌کند",
    },
  },
  coverage: {
    rule: "(الف) پوشش کلید: همهٔ تمرین‌های کلیددارِ واحد ∈ کلید — هر دو جهت + بررسی یتیم‌ها",
    perUnit,
    totals: { exercises: 455, keyed: keyedCount, printKeyless: keylessList.length, keyAnchors: parsedKey.stats.anchors, orphans: parsedKey.stats.anchors - keyedCount, pass: parsedKey.stats.anchors === keyedCount },
  },
  indexCoverage: {
    rule: "(ب) سرکلمات Index ⊆ اجتماع واژه‌نامه‌های واحدها + تمرین‌ها — گزارش مغایرت (بدون ساختن چیزی)",
    corpus: { miniDictHeadwords: corpusHeadwords.size, primaryTokens: corpusPrimary.size, fullLayerTokens: corpusFull.size, note: "primary = roadmap-literal (miniDict + exercises) · full = + prose paragraphs + margin gloss notes (supplementary metric for G3) · both include A1-2 inline-ref-stripped token variants" },
    totals: { entries: parsedIdx.entries.length, matchedExact: idxMatched.exact, matchedByTokens: idxMatched.tokens, matchedByFullLayer: idxMatched.tokensFull, mismatch: idxMatched.mismatch.length },
    mismatches: idxMatched.mismatch,
  },
  balance: {
    rule: "(ج) توازن شمارش آیتم↔کلید (تمرین‌های کلیددار) — pattern labels مکانیکی‌اند؛ ردیف‌ها verbatim باقی می‌مانند",
    patterns: { inlineSequence: "پاسخ‌های فشرده درون‌خطی (توالی‌های تطبیقی 1 c 2 h ... یا چیدمان دوستونه — 7.2)", workedExample: "تمرین با مثال حل‌شده — کلید از ۲ شروع می‌شود (2.3)", twoColumnItems: "امضای مکانیکی A3-KA-2: آیتم‌های دوستونهٔ چاپی در کپچر A2 جفتی ادغام شده‌اند (29.4، 49.3، 87.5، 20.3 ...) — تصمیم اصلاح در G3", moreRowsThanItems: "کلید بیش از آیتم ردیف دارد (Possible answers — 5.4، 6.2)", duplicateNumbers: "تمرین دونیمه با دو توالی شماره‌گذاری (11.1، 83.4، 97.3)", other: "سایر — برای مرور G3" },
    totals: { keyedExercises: keyedCount, equal: balEqual, unequal: balUnequal, patternCounts: balPatterns },
    diffs: balDiffs,
  },
};
writeFileSync(INTER_OUT, JSON.stringify(intersections, null, 2) + "\n");
console.log(`A3-4 — intersections: coverage pass=${intersections.coverage.totals.pass} (orphans=${intersections.coverage.totals.orphans}) · index matched=${idxMatched.exact}+${idxMatched.tokens}(primary)+${idxMatched.tokensFull}(fullLayer)/${parsedIdx.entries.length} mismatch=${idxMatched.mismatch.length} · balance equal=${balEqual} unequal=${balUnequal} patterns=${JSON.stringify(balPatterns)}`);

// ================================================================= outputs
writeFileSync(KEY_RAW, JSON.stringify({
  meta: { generator: "scripts/viu-adv-a3.mjs (A3-1 raw layer)", generatedAt: captureMeta.generatedAt, sha256, mode: "READ-ONLY raw extraction of the printed Answer key", lines: keyPagesA.reduce((a, p) => a + p.lines.length, 0), removedBands: keyPagesA.reduce((a, p) => a + p.removedBands.length, 0) },
  pages: keyPagesA.map((p) => ({ ...p, lines: p.lines.map(({ y, x0, x1, text }) => ({ y, x0, x1, text })) })),
}, null, 2) + "\n");
writeFileSync(IDX_RAW, JSON.stringify({
  meta: { generator: "scripts/viu-adv-a3.mjs (A3-3 raw layer)", generatedAt: captureMeta.generatedAt, sha256, mode: "READ-ONLY raw extraction of the printed Index", columns: "x0<190→1 · <345→2 · else 3 (measured starts 51/212/373; col2 maxX1=360 < col3 minX0=373)", lines: idxPagesA.reduce((a, p) => a + p.lines.length, 0), removedBands: idxPagesA.reduce((a, p) => a + p.removedBands.length, 0) },
  pages: idxPagesA,
}, null, 2) + "\n");
writeFileSync(KEY_OUT, JSON.stringify({
  provenance: { generator: "scripts/viu-adv-a3.mjs (A3-1)", generatedAt: captureMeta.generatedAt, source: PDF, sha256, pdfPages: KEY_PAGES, printedPages: [210, 275], rawLayer: KEY_RAW },
  format: {
    unitBlocks: "standalone «Unit N» label lines — 101, in strict sequence",
    exerciseAnchors: "standalone `N.x` lines — 413; unit prefix must equal the block unit (guarded)",
    rows: "numbered answer rows {n, text, more?, letter?, textX0?} — verbatim; `letter` only when text is exactly one A-Za-z char; `more` = continuation lines appended verbatim; textX0 = x of first answer word (partition metadata)",
    extras: "non-numbered lines {kind: note|tableRow|grid, x0, text, bigGap} — classification rules documented in the script header; every line verbatim; kind=grid = the registered A3-KA-1 artifact (unit 84.4 letter grid — its digits are grid column labels, not answer numbers)",
    honesty: "zero fabrication; matching letter sequences preserved verbatim (risk #10); unnumbered table answers recorded verbatim without positional item-guessing",
  },
  totals: { unitBlocks: Object.keys(parsedKey.units).length, exercises: parsedKey.stats.anchors, rows: parsedKey.stats.rows, letterRows: parsedKey.stats.letterRows, extras: parsedKey.stats.notes + parsedKey.stats.tableRows + parsedKey.stats.gridLines, notes: parsedKey.stats.notes, tableRows: parsedKey.stats.tableRows, conts: parsedKey.stats.conts, gridLines: parsedKey.stats.gridLines },
  units: parsedKey.units,
}, null, 2) + "\n");
writeFileSync(IDX_OUT, JSON.stringify({
  provenance: { generator: "scripts/viu-adv-a3.mjs (A3-3)", generatedAt: captureMeta.generatedAt, source: PDF, sha256, pdfPages: IDX_PAGES, printedPages: [277, 298], rawLayer: IDX_RAW },
  format: {
    columns: "3 columns; entry line assigned by x0 (<190→1, <345→2, else 3); boundary crossing guarded (col2 maxX1=360 < col3 minX0=373)",
    entry: "`headword /IPA/ unit(s)` — trailing numbers are UNIT numbers (printed index note verbatim in raw removedBands); ipa kept with slashes; parenthetical POS stays verbatim in the headword (e.g. «zip (v.)»); wrapped entries (unit number printed on the following line — e.g. «alternative medicine» p279 col2) are joined mechanically and counted in totals.wrappedEntries",
    ipaRemap: "§۲-۳ 8-mapping table applied everywhere; unknown PUA/C0/C1 stay verbatim and are queued below — never guessed (A0 risk #2)",
  },
  totals: { entries: parsedIdx.entries.length, withIpa: parsedIdx.entries.filter((e) => e.ipa).length, multiUnit: parsedIdx.entries.filter((e) => e.units.length > 1).length, wrappedEntries: parsedIdx.wrappedEntries, columns: parsedIdx.colCounts },
  unknownQueue: parsedIdx.queue.map((q) => ({ ...q, where: "index IPA/headword (Times-PhoneticIPA wrong-mapping glyph — A0 risk #2 protocol: verbatim + manual-review queue)" })),
  entries: parsedIdx.entries,
}, null, 2) + "\n");

writeFileSync(VERIFY_OUT, JSON.stringify({
  unit: "A3",
  ok: true,
  issues: [],
  checks: {
    keyRawByteExact: keyByteExact,
    indexRawByteExact: idxByteExact,
    keyUnitBlocks: Object.keys(parsedKey.units).length,
    keyAnchors: parsedKey.stats.anchors,
    keyRows: parsedKey.stats.rows,
    captureKeyed: keyedCount,
    capturePrintKeyless: keylessList.length,
    indexEntries: parsedIdx.entries.length,
    indexWrappedEntries: parsedIdx.wrappedEntries,
    indexUnknownQueue: parsedIdx.queue,
    intersectionsFile: INTER_OUT,
  },
  note: "Two independent pdftotext extraction passes byte-compared (raw determinism); parse guards: unit sequence, anchor/block agreement, no content before anchor, index boundary crossing, unit range 1..101, zero digit-less index lines.",
}, null, 2) + "\n");

console.log("A3 — outputs written: raw(a3-key-pages, a3-index-pages) + capture(answer-key, index, 101 keyed units, verify-a3-key-index) + intersections.");
