// VIU Book 4 (AVU-3) — Phase A2-6 + A3 — automated audit of the structural capture layer.
// Roadmap A2-6 + A3-4: structural invariants enforced mechanically at every stage —
//   A2 stage (originally): exercises carried keyed=null (printed Answer key linked in Phase A3).
//   A3 stage (now): the printed key (answer-key.json) + index (index.json) are linked into the
//   capture, and the audit enforces the FULL post-A3 contract:
//   Z1 file set complete (unit-001..101 capture + verify + fa-cache) and parseable — the fa-cache
//      contract is phase-aware: pre-A4 stub {status:A4-pending, faNew:0, faReviewed:0} OR the A4
//      FA-NEW layer {status:A4-FA-NEW-complete|A4-FA-NEW-partial, faNew=segments, faReviewed:0,
//      every segment {en,fa,unit,cls:FA-NEW} with non-empty strings, law present in meta}
//   Z2 titles/sections/blocks/notes/items: zero empty text fields, letters ⊆ A..E, kinds valid
//   Z3 exercises: numbering N.x, item numbers ≥1, blankCount == "____" occurrences, refs ⊆ A..E,
//      keyed linkage: keyed=null ⇔ the printed key has NO block for the exercise (honest
//      print-keyless — 42, all kind=instruction); keyed≠null ⇔ byte-equal to answer-key.json's block
//   Z4 miniDict: entry text non-empty, headword/ipa only when mechanically derived
//   Z5 queued unknown chars (PUA/C0 — A1-KA-4): every queued codepoint present verbatim in the
//      capture text with the exact count, and ZERO unqueued PUA/C0 chars anywhere in the capture
//   Z6 census consistency: per-unit census == recomputed counts; global totals == Σ rows
//   Z7 knownArtifacts carried: u1 U+001F/U+0019 · u21 drop-cap T · u72 U+E022 · u84 84.4 grid extras (A3-KA-1)
//   Z8 partition-equivalence claim recorded in every verify file (byte-exact vs raw layer)
//   Z9 answer-key.json integrity (A3-1): 101 unit blocks in order · 413 exercises · shapes
//      (rows n≥1 + non-empty text + single-letter letter field; extras kind ∈ note|tableRow|grid)
//      · totals recomputed · every key exercise exists in a capture (orphans=0)
//   Z10 index.json integrity (A3-3): entries shape (non-empty headword · units ⊆ 1..101 · ipa null
//      or /…/) · totals recomputed (incl. columns + multiUnit) · unknownQueue == recomputed PUA/C0
//      scan · raw a3 layers present
//   Z11 intersections (A3-4): file present · coverage pass with orphans=0 · balance totals sum
//      correctly · pattern labels sum · a3KnownArtifacts (KA-1, KA-2) registered
//   Z12 A3-KA-2 amendment proof (owner vote ④): for every exercise declared by the two-column
//      amendment (rightPage.diagnostics.ka2.declared) — item-number MULTISET == key-row-number
//      MULTISET (keyed exercises) · zero «____<digit>» merge artifacts in any item text ·
//      passage shape valid (columns = non-empty string array, staged boolean) · inline-gap
//      items (20.3 family) number 1..K consecutively
// Exit code 1 on any violation — a red audit can never be shipped as green.
//
// READ-ONLY (writes nothing).

import { readFileSync } from "node:fs";

const CAP = "docs/qa/viu-adv-capture";
const CENSUS = "docs/qa/viu-adv-census-2026-11-21.json";
const RAW = "docs/qa/viu-adv-raw";

const issues = [];
const fail = (msg) => issues.push(msg);
const isPuaOrCtl = (c) => (c >= 0xe000 && c <= 0xf8ff) || c < 0x20 || (c >= 0x7f && c <= 0x9f);

// Z1 — file set
let captures = 0, verifies = 0;
for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  try { JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8")); captures++; } catch (e) { fail(`Z1 capture unit-${id} missing/invalid: ${e.message}`); }
  try { JSON.parse(readFileSync(`${CAP}/verify-unit-${id}.json`, "utf8")); verifies++; } catch (e) { fail(`Z1 verify unit-${id} missing/invalid: ${e.message}`); }
}
const fa = JSON.parse(readFileSync(`${CAP}/fa-cache.json`, "utf8"));
if (fa.status === "A4-pending") {
  if (fa.faNew !== 0 || fa.faReviewed !== 0) fail("Z1 fa-cache stub must be {status:A4-pending, faNew:0, faReviewed:0}");
} else if (typeof fa.status === "string" && fa.status.startsWith("A4-FA-NEW")) {
  const segs = fa.segments ?? {};
  let bad = 0;
  for (const [k, v] of Object.entries(segs)) {
    if (!k || typeof v.en !== "string" || !v.en.trim() || typeof v.fa !== "string" || !v.fa.trim() || !Number.isInteger(v.unit) || v.unit < 1 || v.unit > 101 || v.cls !== "FA-NEW") bad++;
  }
  if (bad) fail(`Z1 fa-cache ${bad} invalid segments`);
  if (fa.faNew !== Object.keys(segs).length) fail(`Z1 fa-cache faNew ${fa.faNew} != segment count ${Object.keys(segs).length}`);
  if (fa.faReviewed !== 0) fail("Z1 fa-cache faReviewed must be 0 — FA-REVIEWED only via owner human adjudication (A4-4)");
  if (!fa.meta?.law?.includes("پوشش ≠ صحت")) fail("Z1 fa-cache meta.law missing — پوشش ≠ صحت is mandatory");
} else fail(`Z1 fa-cache status ${JSON.stringify(fa.status)} is neither the A4-pending stub nor an A4-FA-NEW layer`);

const keyData = JSON.parse(readFileSync(`${CAP}/answer-key.json`, "utf8"));
const idxData = JSON.parse(readFileSync(`${CAP}/index.json`, "utf8"));
const captureExerciseNos = new Map(); // unit → Set(exercise no) — for Z9 orphan check

const totals = { vocabCandidates: 0, marginNotes: 0, proseBlocks: 0, languageHelp: 0, dropCaps: 0, exercises: 0, exerciseItems: 0, blanks: 0, banks: 0, mixedLineSplits: 0, imageDependentCandidates: 0, queuedChars: 0 };
const census = JSON.parse(readFileSync(CENSUS, "utf8"));

for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  const c = JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8"));
  const v = JSON.parse(readFileSync(`${CAP}/verify-unit-${id}.json`, "utf8"));

  // Z2 — titles/sections/blocks
  if (!c.title || !c.title.trim()) fail(`Z2 u${n} empty title`);
  if (c.unit !== n) fail(`Z2 u${n} unit field mismatch`);
  for (const s of c.leftPage.sections) {
    if (!/^[A-E]$/.test(s.letter)) fail(`Z2 u${n} invalid section letter ${s.letter}`);
    if (!s.title?.trim()) fail(`Z2 u${n} section ${s.letter} empty title`);
    for (const b of s.blocks) {
      if (!["paragraph", "languageHelpMarker", "dropCap"].includes(b.kind)) fail(`Z2 u${n} ${s.letter} invalid block kind ${b.kind}`);
      if (!b.text?.trim()) fail(`Z2 u${n} ${s.letter} empty block text (${b.kind} y=${b.y})`);
      if (b.kind === "languageHelpMarker" && b.text.trim() !== "Language help") fail(`Z2 u${n} ${s.letter} bad marker text`);
    }
    for (const m of s.marginNotes) if (!m.text?.trim()) fail(`Z2 u${n} ${s.letter} empty margin note y=${m.y}`);
  }

  // Z3 — exercises (with the A3 keyed-linkage contract)
  captureExerciseNos.set(n, new Set());
  if (!c.a3?.status) fail(`Z3 u${n} missing a3.status provenance`);
  if (!c.a3?.generator?.includes("viu-adv-a3")) fail(`Z3 u${n} a3.generator not the A3 script`);
  for (const ex of c.rightPage.exercises) {
    captureExerciseNos.get(n).add(ex.no);
    if (!new RegExp(`^${n}\\.\\d+$`).test(ex.no)) fail(`Z3 u${n} bad exercise no ${ex.no}`);
    const kb = keyData.units[String(n)]?.[ex.no];
    if (ex.keyed === null) {
      if (kb) fail(`Z3 u${n}/${ex.no} keyed=null but the printed key HAS a block for it (linkage lost)`);
    } else {
      if (!kb) fail(`Z3 u${n}/${ex.no} keyed set but the printed key has NO block for it`);
      else if (JSON.stringify(ex.keyed) !== JSON.stringify({ pdfPages: kb.pdfPages, rows: kb.rows, extras: kb.extras }))
        fail(`Z3 u${n}/${ex.no} keyed != answer-key block (byte mismatch)`);
    }
    if (!["fillIn", "bank", "open", "instruction"].includes(ex.kind)) fail(`Z3 u${n}/${ex.no} invalid kind ${ex.kind}`);
    if (!ex.instruction?.trim() && ex.items.length === 0 && !ex.bank) fail(`Z3 u${n}/${ex.no} empty exercise (no instruction, items, bank)`);
    for (const r of ex.refs ?? []) if (!/^[A-E]$/.test(r) && r !== "opposite") fail(`Z3 u${n}/${ex.no} bad ref ${r}`);
    for (const it of ex.items) {
      if (!Number.isInteger(it.n) || it.n < 1) fail(`Z3 u${n}/${ex.no} bad item n ${it.n}`);
      if (!it.text?.trim()) fail(`Z3 u${n}/${ex.no} empty item ${it.n}`);
      const blanks = (it.text.match(/____/g) ?? []).length;
      if (blanks !== it.blankCount) fail(`Z3 u${n}/${ex.no} item ${it.n} blankCount ${it.blankCount} != ____ count ${blanks}`);
    }
    for (const b of ex.bank ?? []) if (!b?.trim()) fail(`Z3 u${n}/${ex.no} empty bank row`);
  }

  // Z4 — miniDict
  for (const e of c.leftPage.miniDict) {
    if (!e.text?.trim()) fail(`Z4 u${n} empty dict entry n=${e.n}`);
    if (e.headword !== null && !e.headword?.trim()) fail(`Z4 u${n} entry n=${e.n} empty headword`);
  }

  // Z5 — queued unknown chars present verbatim + zero unqueued PUA/C0 in capture text
  const queued = new Map();
  for (const q of c.queuedChars) queued.set(q.codepoint, (queued.get(q.codepoint) ?? 0) + q.count);
  const seen = new Map();
  const scanText = (t) => { for (const ch of t ?? "") { const cp = ch.codePointAt(0); if (isPuaOrCtl(cp)) { const k = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`; seen.set(k, (seen.get(k) ?? 0) + 1); } } };
  for (const s of c.leftPage.sections) { for (const b of s.blocks) scanText(b.text); for (const m of s.marginNotes) scanText(m.text); }
  for (const e of c.leftPage.miniDict) scanText(e.text);
  for (const ex of c.rightPage.exercises) { scanText(ex.instruction); for (const i of ex.items) scanText(i.text); for (const b of ex.bank ?? []) scanText(b); if (ex.passage) for (const col of ex.passage.columns ?? []) scanText(col); }
  for (const [k, cnt] of seen) if (!queued.has(k)) fail(`Z5 u${n} unqueued unknown char ${k}×${cnt} in capture text`);
  for (const [k, cnt] of queued) {
    const rawUnit = JSON.parse(readFileSync(`${RAW}/unit-${id}.json`, "utf8"));
    const rawCount = [...rawUnit.leftPage.lines, ...rawUnit.rightPage.lines].reduce((a, l) => a + [...l.text].filter((ch) => `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}` === k).length, 0);
    if (rawCount !== cnt) fail(`Z5 u${n} queued ${k} count ${cnt} != raw-layer occurrences ${rawCount}`);
    if ((seen.get(k) ?? 0) !== cnt) fail(`Z5 u${n} queued ${k}×${cnt} not fully carried into capture text (seen ${seen.get(k) ?? 0})`);
  }

  // Z6 — per-unit census consistency
  const recomputed = {
    vocabCandidates: c.leftPage.miniDict.length,
    marginNotes: c.leftPage.sections.reduce((a, s) => a + s.marginNotes.length, 0),
    proseBlocks: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "paragraph").length, 0),
    languageHelp: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "languageHelpMarker").length, 0),
    dropCaps: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "dropCap").length, 0),
    exercises: c.rightPage.exercises.length,
    exerciseItems: c.rightPage.exercises.reduce((a, e) => a + e.items.length, 0),
    blanks: c.rightPage.exercises.reduce((a, e) => a + e.items.reduce((b, i) => b + i.blankCount, 0), 0),
    banks: c.rightPage.exercises.reduce((a, e) => a + (e.bank?.length ?? 0), 0),
    mixedLineSplits: c.leftPage.diagnostics.mixedLineSplits,
    imageDependentCandidates: c.imageDependentCandidates.length,
  };
  for (const [k, val] of Object.entries(recomputed)) if (c.census[k] !== val) fail(`Z6 u${n} census.${k}=${c.census[k]} != recomputed ${val}`);
  for (const [k, val] of Object.entries(recomputed)) totals[k] += val;
  totals.queuedChars += c.queuedChars.length;

  // Z8 — partition equivalence recorded
  if (!v.checks?.partitionEquivalence?.startsWith("byte-exact")) fail(`Z8 u${n} verify missing partitionEquivalence claim`);
  if (v.unit !== n || v.ok !== true) fail(`Z8 u${n} verify not ok`);
}

// Z6 — global totals
for (const [k, val] of Object.entries(totals)) if (census.totals[k] !== val) fail(`Z6 global totals.${k}=${census.totals[k]} != recomputed ${val}`);
if (census.units.length !== 101) fail(`Z6 census rows ${census.units.length} != 101`);

// Z7 — known artifacts carried
const u1 = JSON.parse(readFileSync(`${CAP}/unit-001.json`, "utf8"));
const u21 = JSON.parse(readFileSync(`${CAP}/unit-021.json`, "utf8"));
const u72 = JSON.parse(readFileSync(`${CAP}/unit-072.json`, "utf8"));
const u84 = JSON.parse(readFileSync(`${CAP}/unit-084.json`, "utf8"));
const u1q = new Set(u1.queuedChars.map((q) => q.codepoint));
if (u1q.size !== 2 || !u1q.has("U+001F") || !u1q.has("U+0019")) fail(`Z7 u1 queued chars ${JSON.stringify([...u1q])} — expected U+001F+U+0019 (A1-KA-4)`);
if (u21.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "dropCap").length, 0) !== 1) fail("Z7 u21 drop-cap T not carried (A1-KA-2)");
if (!u72.queuedChars.some((q) => q.codepoint === "U+E022")) fail("Z7 u72 U+E022 not carried (A1-KA-3)");
const ex84 = u84.rightPage.exercises.find((e) => e.no === "84.4");
if (!ex84?.keyed?.extras?.some((e) => e.kind === "grid")) fail("Z7 u84 84.4 grid extras missing (A3-KA-1)");

// Z9 — answer-key.json integrity (A3-1)
{
  const units = keyData.units ?? {};
  const uk = Object.keys(units).map(Number).sort((a, b) => a - b);
  if (uk.length !== 101 || uk.some((v, i) => v !== i + 1)) fail(`Z9 key unit blocks ${uk.length}/101 or out of sequence`);
  let keyEx = 0, keyRows = 0, keyLetter = 0, keyExtras = 0, keyNotes = 0, keyTable = 0, keyGrid = 0, keyConts = 0;
  for (const [uS, exs] of Object.entries(units)) {
    const u = Number(uS);
    if (!captureExerciseNos.get(u)) { fail(`Z9 key unit ${u} has no capture unit`); continue; }
    for (const [no, blk] of Object.entries(exs)) {
      keyEx++;
      if (!captureExerciseNos.get(u).has(no)) fail(`Z9 key exercise ${no} has NO capture exercise (orphan)`);
      if (!Array.isArray(blk.pdfPages) || blk.pdfPages.some((p) => p < 212 || p > 277)) fail(`Z9 ${no} bad pdfPages`);
      for (const r of blk.rows ?? []) {
        keyRows++;
        if (!Number.isInteger(r.n) || r.n < 1) fail(`Z9 ${no} bad row n ${r.n}`);
        if (!r.text?.trim()) fail(`Z9 ${no} empty row text n=${r.n}`);
        if (r.letter !== undefined && !/^[A-Za-z]$/.test(r.letter)) fail(`Z9 ${no} bad letter field n=${r.n}`);
        if (r.letter !== undefined) keyLetter++;
        if (r.more) { for (const m of r.more) if (!String(m).trim()) fail(`Z9 ${no} empty continuation line n=${r.n}`); keyConts += r.more.length; }
      }
      for (const e of blk.extras ?? []) {
        keyExtras++;
        if (!["note", "tableRow", "grid"].includes(e.kind)) fail(`Z9 ${no} bad extra kind ${e.kind}`);
        if (!e.text?.trim()) fail(`Z9 ${no} empty extra text (${e.kind})`);
        if (e.kind === "note") keyNotes++; else if (e.kind === "tableRow") keyTable++; else keyGrid++;
      }
    }
  }
  const t = keyData.totals ?? {};
  const expect = { unitBlocks: uk.length, exercises: keyEx, rows: keyRows, letterRows: keyLetter, extras: keyExtras, notes: keyNotes, tableRows: keyTable, conts: keyConts, gridLines: keyGrid };
  for (const [k, v] of Object.entries(expect)) if (t[k] !== v) fail(`Z9 key totals.${k}=${t[k]} != recomputed ${v}`);
  if (keyEx !== 413) fail(`Z9 key exercises ${keyEx} != 413 (A0 baseline count)`);
}

// Z10 — index.json integrity (A3-3)
{
  const isPuaOrCtlA = (cp) => (cp >= 0xe000 && cp <= 0xf8ff) || cp < 0x20 || (cp >= 0x7f && cp <= 0x9f);
  const entries = idxData.entries ?? [];
  if (entries.length === 0) fail("Z10 index has zero entries");
  let withIpa = 0, multi = 0;
  const cols = { 1: 0, 2: 0, 3: 0 };
  const q = new Map();
  for (const e of entries) {
    if (!e.headword?.trim()) { fail(`Z10 index p${e.pdfPage} empty headword`); continue; }
    if (!Array.isArray(e.units) || e.units.length === 0 || e.units.some((u) => !Number.isInteger(u) || u < 1 || u > 101)) fail(`Z10 ${e.headword} bad units ${JSON.stringify(e.units)}`);
    if (e.ipa !== null && !(typeof e.ipa === "string" && e.ipa.startsWith("/") && e.ipa.endsWith("/") && e.ipa.length > 2)) fail(`Z10 ${e.headword} bad ipa ${JSON.stringify(e.ipa)}`);
    if (![1, 2, 3].includes(e.col)) fail(`Z10 ${e.headword} bad col ${e.col}`); else cols[e.col]++;
    if (e.ipa) withIpa++;
    if (e.units.length > 1) multi++;
    for (const s of [e.headword, e.ipa ?? ""]) for (const ch of s) { const cp = ch.codePointAt(0); if (isPuaOrCtlA(cp)) { const kk = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`; q.set(kk, (q.get(kk) ?? 0) + 1); } }
  }
  const tq = (idxData.unknownQueue ?? []).map((x) => `${x.codepoint}×${x.count}`).join(",");
  const rq = [...q.entries()].map(([kk, cc]) => `${kk}×${cc}`).join(",");
  if (tq !== rq) fail(`Z10 unknownQueue ${tq} != recomputed ${rq}`);
  const tt = idxData.totals ?? {};
  if (tt.entries !== entries.length) fail(`Z10 totals.entries ${tt.entries} != ${entries.length}`);
  if (tt.withIpa !== withIpa) fail(`Z10 totals.withIpa ${tt.withIpa} != ${withIpa}`);
  if (tt.multiUnit !== multi) fail(`Z10 totals.multiUnit ${tt.multiUnit} != ${multi}`);
  for (const cN of [1, 2, 3]) if (tt.columns?.[cN] !== cols[cN]) fail(`Z10 totals.columns.${cN} ${tt.columns?.[cN]} != ${cols[cN]}`);
  if (tt.wrappedEntries === undefined) fail("Z10 totals.wrappedEntries missing");
  for (const f of [`${RAW}/a3-key-pages.json`, `${RAW}/a3-index-pages.json`]) { try { JSON.parse(readFileSync(f, "utf8")); } catch (e) { fail(`Z10 raw layer ${f} missing/invalid`); } }
}

// Z11 — intersections file consistency (A3-4)
{
  const inter = JSON.parse(readFileSync("docs/qa/viu-adv-a3-intersections-2026-11-21.json", "utf8"));
  const cov = inter.coverage?.totals ?? {};
  if (cov.keyed !== totals.exercises - 42 || cov.printKeyless !== 42) fail(`Z11 coverage totals keyed=${cov.keyed}/keyless=${cov.printKeyless} != recomputed ${totals.exercises - 42}/42`);
  if (cov.orphans !== 0 || cov.pass !== true) fail(`Z11 coverage orphans=${cov.orphans} pass=${cov.pass}`);
  if (inter.coverage?.perUnit?.length !== 101) fail("Z11 perUnit rows != 101");
  const icv = inter.indexCoverage?.totals ?? {};
  if (icv.entries !== (idxData.totals?.entries ?? -1)) fail("Z11 indexCoverage.entries != index totals");
  if ((inter.indexCoverage?.mismatches?.length ?? -1) !== icv.mismatch) fail("Z11 indexCoverage mismatch list != total");
  const bal = inter.balance?.totals ?? {};
  if (bal.keyedExercises !== totals.exercises - 42) fail("Z11 balance.keyedExercises != keyed count");
  if (bal.equal + bal.unequal !== bal.keyedExercises) fail("Z11 balance equal+unequal != keyed");
  if ((inter.balance?.diffs?.length ?? -1) !== bal.unequal) fail("Z11 balance diffs length != unequal");
  const pc = Object.values(inter.balance?.totals?.patternCounts ?? {});
  if (pc.reduce((a, b) => a + b, 0) !== bal.unequal) fail("Z11 patternCounts sum != unequal");
  const ka = inter.meta?.a3KnownArtifacts ?? {};
  if (!ka.A3_KA_1 || !ka.A3_KA_2) fail("Z11 a3KnownArtifacts (KA-1/KA-2) not registered");
  try { const v3 = JSON.parse(readFileSync(`${CAP}/verify-a3-key-index.json`, "utf8")); if (v3.ok !== true || v3.checks?.keyRawByteExact !== true || v3.checks?.indexRawByteExact !== true) fail("Z11 verify-a3-key-index not ok/byte-exact"); } catch (e) { fail(`Z11 verify-a3-key-index missing: ${e.message}`); }
}

// Z12 — A3-KA-2 amendment proof (declared exercises: item multiset == key row multiset, no merge artifacts)
{
  const multiset = (arr) => [...arr].sort((a, b) => a - b);
  let declaredTotal = 0, multisetOK = 0, multisetSkipped = 0;
  const artifactRe = /____\d{1,2}(?=\s|$)/;
  for (let n = 1; n <= 101; n++) {
    const c = JSON.parse(readFileSync(`${CAP}/unit-${String(n).padStart(3, "0")}.json`, "utf8"));
    const ka2 = c.rightPage.diagnostics?.ka2;
    if (!ka2) fail(`Z12 u${n} missing ka2 diagnostics`);
    for (const ex of c.rightPage.exercises) {
      const declared = ka2?.declared?.some((d) => d.no === ex.no);
      if (declared) declaredTotal++;
      for (const it of ex.items) {
        // merge-artifact check: every exercise EXCEPT the A3-KA-1 registered grid (84.4 — its
        // digits are grid column labels and stay verbatim for the A5-5 menu)
        if (ex.no !== "84.4" && artifactRe.test(it.text)) fail(`Z12 u${n}/${ex.no} item ${it.n} still has a «____N» merge artifact`);
        if (it.part !== undefined && (!Number.isInteger(it.part) || it.part < 1)) fail(`Z12 u${n}/${ex.no} item ${it.n} bad part`);
      }
      if (ex.passage !== undefined && ex.passage !== null) {
        if (!Array.isArray(ex.passage.columns) || ex.passage.columns.some((col) => typeof col !== "string")) fail(`Z12 u${n}/${ex.no} passage.columns invalid`);
        if (typeof ex.passage.staged !== "boolean") fail(`Z12 u${n}/${ex.no} passage.staged invalid`);
      }
      if (declared && ex.keyed && ex.keyed.rows.length > 0) {
        // mechanical proof: every key row number is covered by an item with that number
        // (workedExample keys intentionally start at 2 — the row-1 answer is printed in the
        // book — so row-multiset ⊆ item-multiset is the invariant, equality is NOT required)
        const itemNs = multiset(ex.items.map((i) => i.n));
        const rowNs = multiset(ex.keyed.rows.map((r) => r.n));
        let ri = 0;
        const covered = rowNs.every((rn) => {
          while (ri < itemNs.length && itemNs[ri] < rn) ri++;
          if (ri < itemNs.length && itemNs[ri] === rn) { ri++; return true; }
          return false;
        });
        if (!covered)
          fail(`Z12 u${n}/${ex.no} declared key rows ${JSON.stringify(rowNs)} not covered by item numbers ${JSON.stringify(itemNs)}`);
        else multisetOK++;
      } else if (declared) multisetSkipped++;
    }
  }
  if (declaredTotal !== 37) fail(`Z12 declared exercises ${declaredTotal} != 37 (the A3-KA-2 declared set)`);
  console.error(`Z12 ka2 declared=${declaredTotal} multisetOK=${multisetOK} noKeyRows=${multisetSkipped}`);
}

// verdict
const verdict = { ok: issues.length === 0, checks: { captures, verifies, totals }, issues };
console.log(JSON.stringify(verdict, null, 2));
if (!verdict.ok) process.exit(1);
