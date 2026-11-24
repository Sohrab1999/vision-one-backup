// ─────────────────────────────────────────────────────────────────────────────
// R1 نقشه راه کیفیت استخراج سه کتاب VIU — سرشماری تبدیل‌پذیری (R1-a) + موج تبدیل (R1-b)
// سند مادر: «نقشه راه ها/نقشه-راه-کیفیت-استخراج-سه-کتاب-VIU-2026-11-16.md» §فاز R1
//
// R1-a  → سرشماری تمرین‌های دارای کلید چاپیِ هنوز تبدیل‌نشده در درس‌های بی‌سؤال
//          خروجی: docs/qa/viu-r1-quiz-gap-census-2026-11-17.json
//          (جدول per-lesson «قابل‌تبدیل / غیرقابل‌تبدیل» + علت هر آیتم)
// R1-b  → تولید seed فقط از تمرین‌های کلیددارِ با ساختار تمیز؛ گزینه‌ها فقط از
//          منابع چاپی همان تمرین (bank چاپی / opts چاپی / کلیدهای چاپی آیتم‌های مجاور /
//          واژگان چاپی همان درس) — صفر ساختگی (قاعدهٔ طلایی §E-۳)
//          خروجی: src/data/viu-*/quiz-r1.ts + docs/qa/viu-r1-quiz-conversion-2026-11-17.json
//
// اجرا:
//   bun scripts/viu-r1-quiz-convert.mjs census   → فقط سرشماری (بدون نوشتن در src)
//   bun scripts/viu-r1-quiz-convert.mjs convert  → سرشماری + موج تبدیل (idempotent)
//
// اصول ثابت پابرجا: صفر بازسازی ساختگی · WAVE2 دست‌نخورده · صفر تغییر در ReadingExercise
// و vocab و readings (دادهٔ خام بایت‌به‌بیت) · هیچ درسِ بی‌کلید، سؤال نمی‌گیرد.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const MODE = process.argv[2] === "convert" ? "convert" : "census";
const ROOT = new URL("..", import.meta.url).pathname;
const TODAY = "2026-11-17";

const BOOKS = [
  { id: "viu-elem", label: "Elementary", rawDir: "docs/qa/viu-phase3-elem", level: "آموزشی" },
  { id: "viu-preint", label: "Pre-int & Int", rawDir: "docs/qa/viu-phase4-preint", level: "متوسط" },
  { id: "viu-upper", label: "Upper-int", rawDir: "docs/qa/viu-phase5-upper", level: "استاندارد" },
];

// ── helpers (هم‌خانوادهٔ اسکریپت‌های بیلد فاز ۳/۴/۵ — همان normalize/parse محافظه‌کار) ──
const normalize = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.。]+$/, "");

/** حذف یادداشت چاپی داخل کروشه (مثل «[NOT fastly]») فقط از رشتهٔ گزینه — سند خام دست‌نخورده می‌ماند */
const stripNotes = (s) =>
  String(s ?? "")
    .replace(/\s*\[[^\]]*\]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const rowArtifact = (s) => {
  const t = String(s ?? "").trim();
  if (/^examples?\b/i.test(t)) return true; // ردیف بانک «Examples …» (الگوی باگ 10.3 فاز ۴)
  if ((t.match(/,/g) || []).length >= 2) return true; // ردیف چاپی چندتایی با ویرگول
  return false;
};

const firstAlternate = (ans) =>
  String(ans ?? "")
    .split("/")[0]
    .replace(/\s*\|\s*$/, "")
    .trim();

/** گزینهٔ متناظر با قطعهٔ کلید چاپی: اگر « / » میان‌جمله‌ای دارد، کل قطعه عیناً (واریانت‌های چاپی)؛ وگرنه نخستین واریانت */
const keyOption = (seg) =>
  /\s\/\s/.test(String(seg ?? "")) ? stripNotes(seg) : stripNotes(firstAlternate(seg));

/** هستهٔ معنایی گزینه برای حذف گزینه‌های هم‌ارز («rewrite» و «rewrite (or redo)») — حاشیهٔ چاپی داخل پرانتز حذف می‌شود */
const coreOf = (s) =>
  normalize(String(s ?? "").replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim());

const wordCount = (s) => (stripNotes(s).match(/\S+/g) || []).length;

/** جداسازی کد چاپی ابتدای ردیف تطبیق («e planes do this…» → {code:"e", text:"planes do this…"}) */
function splitCode(entry) {
  const t = String(entry ?? "").trim();
  const m = /^([a-z])[.)]?\s+(.+)$/i.exec(t);
  if (m) return { code: m[1].toLowerCase(), text: m[2].trim() };
  return { code: null, text: t };
}

/** پارسر کلید چاپی — الگوهای صریح، هر چیز مبهم ⇒ رد صادقانه */
function parseKey(keyText, n) {
  const text = String(keyText ?? "").trim();
  if (!text) return { fail: "noKey" };
  // الگوی ۱ — شماره‌دار: "1 went 2 made 3 did" (عین فاز ۴) — نگاشت بر اساس خودِ عدد چاپی
  //   پذیرش صادقانهٔ offset (کلید از ۲ = آیتم ۱ نمونهٔ چاپی) و کلید ناقص (فقط آیتم‌های شماره‌دار)
  const re = /(?:^|\s)(\d{1,3})[.):]?\s+/g;
  let m;
  const positions = [];
  while ((m = re.exec(text)) !== null)
    positions.push({ num: Number(m[1]), valStart: m.index + m[0].length, matchStart: m.index });
  if (positions.length > 0) {
    const nums = positions.map((p) => p.num);
    for (let i = 0; i < nums.length; i++) {
      if (!(nums[i] >= 1 && nums[i] <= n)) return { fail: "keyExceedsItems", nums };
      if (i > 0 && nums[i] <= nums[i - 1]) return { fail: "orderBroken", nums };
    }
    const map = {};
    for (let i = 0; i < positions.length; i++) {
      const end = i + 1 < positions.length ? positions[i + 1].matchStart : text.length;
      const val = text
        .slice(positions[i].valStart, end)
        .trim()
        .replace(/\s*\|\s*$/, "")
        .trim();
      if (val) map[positions[i].num] = val;
    }
    const complete = nums.length === n && nums[0] === 1;
    return { mode: complete ? "exact" : "partial", map };
  }
  const segs = text.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
  // الگوی ۲ — کد تطبیق: "2j | 3a | 4l" — فقط برای تمرین‌های match مصرف می‌شود
  const codeSegs = segs.filter((s) => /^\d{1,2}\s*[a-z][.)]?$/i.test(s));
  if (segs.length > 0 && codeSegs.length === segs.length) {
    const map = {};
    let last = 0;
    for (const s of segs) {
      const num = Number(/(\d{1,2})/.exec(s)[1]);
      const code = /[a-z]/i.exec(s)[0].toLowerCase();
      if (num <= last || num > n) return { fail: "orderBroken" };
      last = num;
      map[num] = code;
    }
    return { mode: "codes", map };
  }
  // الگوی ۳ — بخش‌جدا با «|»: تعداد بخش = تعداد آیتم ⇒ نگاشت ترتیبی (دستور استخراج کلید: join با " | ")
  if (segs.length === n) {
    const map = {};
    segs.forEach((s, i) => (map[i + 1] = s));
    return { mode: "bar", map };
  }
  return { fail: segs.length > 0 ? "segmentCountMismatch" : "noNumbers" };
}

// ── load book raw data ──
function loadAnswerKey(rawDir) {
  const raw = JSON.parse(readFileSync(`${ROOT}${rawDir}/answer-key.json`, "utf8"));
  const map = new Map();
  for (const pg of raw) {
    for (const u of pg.units || []) {
      const n = Number(u.unit);
      map.set(n, { ...(map.get(n) || {}), ...(u.answers || {}) });
    }
  }
  return map;
}

async function loadBooks() {
  const out = [];
  for (const cfg of BOOKS) {
    const mod = await import(`${ROOT}src/data/${cfg.id}/index.ts`);
    const book =
      cfg.id === "viu-elem" ? mod.VIU_ELEMENTARY_BOOK : cfg.id === "viu-preint" ? mod.VIU_PREINT_BOOK : mod.VIU_UPPER_BOOK;
    out.push({ ...cfg, book, keys: loadAnswerKey(cfg.rawDir) });
  }
  return out;
}

/** بانک سؤال پایه (بدون موج R1) — برای idempotency کامل: missing و dedupe فقط از پارتیت‌های فاز ۳-۵ */
async function loadBaseQuizSeeds(bookId, book) {
  const seedSrc = readFileSync(`${ROOT}src/data/${bookId}/quiz-seed.ts`, "utf8");
  if (!seedSrc.includes("QUIZ_R1")) return book.quiz.seed;
  const partNames = [...seedSrc.matchAll(/import \{ (QUIZ_PART_\d+) \} from "\.\/(quiz-part-\d+)"/g)].map((m) => m[1]);
  const seeds = [];
  for (const name of partNames) {
    const pm = await import(`${ROOT}src/data/${bookId}/quiz-part-${name.replace("QUIZ_PART_", "")}.ts`);
    seeds.push(...pm[name]);
  }
  return seeds;
}

// ── option construction (تنها از منابع چاپی) — هم در census هم در convert برای تصمیم یکسان ──
function buildOptions({ ex, items, keyMap, idx, correct, kind, lessonNum, vocabWords }) {
  const item = items[idx];
  const printed = (Array.isArray(item.opts) ? item.opts : []).map((o) => String(o).trim()).filter(Boolean);
  const bank = (Array.isArray(ex.bank) ? ex.bank : []).map((b) => String(b).trim()).filter(Boolean);

  const finalize = (opts, answerIdx, source) => {
    // حذف گزینه‌های هم‌ارز: یکسان case-insensitive (الگوی باگ L42) یا هم‌هسته پس از حذف حاشیهٔ پرانتر
    // — پاسخ صحیح باید حتماً معادلِ سالمی در فهرست نهایی داشته باشد
    const kept = [];
    const mapIdx = [];
    const coreMap = new Map();
    for (let i = 0; i < opts.length; i++) {
      const o = String(opts[i]).trim();
      const k = normalize(o);
      if (!k) { mapIdx[i] = -1; continue; }
      const c = coreOf(o);
      if (coreMap.has(c)) { mapIdx[i] = coreMap.get(c); continue; }
      coreMap.set(c, kept.length);
      mapIdx[i] = kept.length;
      kept.push(o);
    }
    const ansIdx = mapIdx[answerIdx] ?? -1;
    if (kept.length < 2 || ansIdx < 0) return null;
    // چرخش قطعی تا پاسخ همیشه اول نباشد (عین الگوی فاز ۴)
    const pos = (lessonNum * 7 + idx * 3 + kept.length) % kept.length;
    const rotated = [...kept];
    [rotated[0], rotated[pos]] = [rotated[pos], rotated[0]];
    const finalAnswer = rotated.findIndex((o) => normalize(o) === normalize(kept[ansIdx]));
    return { options: rotated, answer: finalAnswer, source };
  };

  if (kind === "truefalse") {
    const t = normalize(correct);
    const a = /^(t|true|✓)/.test(t) ? 0 : /^(f|false|x|✗)/.test(t) ? 1 : -1;
    if (a < 0) return null;
    return finalize(["True", "False"], a, "printedTrueFalse");
  }

  if (kind === "odd") {
    const row = (printed.length >= 2
      ? printed
      : String(item.en)
          .replace(/^\d+[.):]?\s*/, "")
          .split(/[,;·]\s*|\s{3,}/)
          .map((s) => s.trim())
    )
      .filter((w) => w && !rowArtifact(w))
      .map((w) => stripNotes(w));
    const a = row.findIndex((w) => normalize(w) === normalize(correct));
    if (row.length < 2 || a < 0) return null;
    return finalize(row, a, "printedRowWords");
  }

  if (kind === "choose" && printed.length >= 2 && printed.length <= 5) {
    const opts = printed.map((o) => stripNotes(o));
    const a = opts.findIndex((o) => normalize(o) === normalize(correct));
    if (a < 0) return null;
    return finalize(opts, a, "printedOpts");
  }

  if (kind === "match") {
    // منبع گزینه: ردیف‌های چاپی بانک/opts همان تمرین (ستون راست چاپی) — کد چاپی جدا، متن بدون کد
    const entries = [];
    const seenKeys = new Set();
    const addEntry = (raw) => {
      const e = splitCode(raw);
      const k = e.code ?? normalize(e.text);
      if (!e.text || seenKeys.has(k)) return;
      seenKeys.add(k);
      entries.push(e);
    };
    for (const b of bank) addEntry(b);
    for (const it of items)
      for (const o of (Array.isArray(it.opts) ? it.opts : []).map((x) => String(x).trim()).filter(Boolean)) addEntry(o);

    let correctText = null;
    const rawVal = String(keyMap[idx + 1] ?? "").trim();
    const asCode = /^[a-z]$/.test(rawVal) ? rawVal.toLowerCase() : null;
    if (asCode) {
      const hit = entries.find((e) => e.code === asCode);
      if (!hit) return null; // کد کلید در ستون چاپی پیدا نشد — صادقانه رد
      correctText = hit.text;
    } else {
      const cn = normalize(stripNotes(rawVal));
      const contain = entries
        .map((e) => e.text)
        .filter((t) => normalize(t).length >= 8 && cn.includes(normalize(t)))
        .sort((a, b) => b.length - a.length)[0];
      correctText = contain ?? keyOption(rawVal);
    }
    if (!correctText || rowArtifact(correctText)) return null;
    const distractors = entries
      .map((e) => e.text)
      .filter((t) => t && normalize(t) !== normalize(correctText) && !rowArtifact(t))
      .slice(0, 3);
    if (distractors.length === 0) return null; // بدون sibling چاپی — صادقانه رد
    return finalize([correctText, ...distractors], 0, "printedMatchEntries");
  }

  // gap / other / choose بدون opts چاپی — kind=table عیناً رد (عین فاز ۴)
  const longKey = wordCount(correct) >= 4;
  // جای خالی چاپی: زیرخطِ پیاپی یا نقطه‌چین چاپی (الگوی رایج استخراج: «..................») یا کاراکتر ellipsis
  const hasPrintedBlank = /(_{2,}|\.{4,}|…+)/.test(String(item.en));
  if (kind === "gap" && !longKey && !hasPrintedBlank) return null; // جای خالی چاپی نامرئی — سؤال بی‌معنا
  const pool = [];
  const sources = [];
  if (!longKey && bank.length > 0) {
    for (const b of bank) {
      const t = stripNotes(b);
      const k = normalize(t);
      if (t && !rowArtifact(t) && k !== normalize(correct) && !pool.some((p) => normalize(p) === k)) pool.push(t);
      if (pool.length >= 3) break;
    }
    if (pool.length > 0) sources.push("printedBank");
  }
  const siblingVals = Array.from({ length: items.length }, (_, i) => (keyMap[i + 1] ? keyOption(keyMap[i + 1]) : "")).filter(Boolean);
  if (pool.length < 3) {
    for (const s of siblingVals) {
      const t = stripNotes(s);
      const k = normalize(t);
      if (t && !rowArtifact(t) && k !== normalize(correct) && !pool.some((p) => normalize(p) === k)) pool.push(t);
      if (pool.length >= 3) break;
    }
    if (pool.length > 0 && !sources.includes("printedSiblingKeys")) sources.push("printedSiblingKeys");
  }
  if (pool.length < 2 && !longKey) {
    for (const w of vocabWords) {
      const t = stripNotes(w);
      const k = normalize(t);
      if (t && !rowArtifact(t) && k !== normalize(correct) && !pool.some((p) => normalize(p) === k)) pool.push(t);
      if (pool.length >= 3) break;
    }
    if (pool.length > 0 && !sources.includes("printedLessonVocab")) sources.push("printedLessonVocab");
  }
  if (pool.length < 1) return null; // هیچ مزاحم چاپی — صادقانه رد
  return finalize([correct, ...pool.slice(0, 3)], 0, sources.join("+") || "printedSiblingKeys");
}

// ── census + conversion per book ──
async function main() {
  const books = await loadBooks();
  const censusOut = {
    generated: TODAY,
    task: "R1-a quiz-gap census (نقشه راه کیفیت استخراج VIU — فاز R1)",
    method: "raw extraction JSONs (docs/qa/viu-phase3-elem|viu-phase4-preint|viu-phase5-upper) + printed answer-key؛ runtime src/data فقط برای فهرست درس‌های بی‌سؤال؛ گزینه‌ساز همان convert اجرا می‌شود تا شمارش‌ها یکسان بماند",
    books: [],
    totals: {},
  };
  const convOut = {
    generated: TODAY,
    task: "R1-b conversion wave — seeds فقط از تمرین‌های کلیددار چاپی؛ گزینه‌ها فقط از منابع چاپی همان تمرین",
    books: [],
    totals: {},
  };

  const grand = { lessonsMissing: 0, exercises: 0, items: 0, keyedItems: 0, convertibleItems: 0, newSeeds: 0 };
  const cover = { before: {}, after: {} };

  for (const { id, rawDir, level, book, keys } of books) {
    const allLessons = book.chapters.map((c) => c.id);
    const baseSeeds = await loadBaseQuizSeeds(id, book);
    const qLessons = new Set(baseSeeds.map((q) => q.lesson));
    const missing = allLessons.filter((l) => !qLessons.has(l));
    cover.before[id] = { lessonsWithQuestions: qLessons.size, total: allLessons.length };
    const existingTextKey = new Set(baseSeeds.map((q) => `${normalize(q.text)}⇒${q.options.map(normalize).join("|")}`));

    const lessonReports = [];
    const newSeeds = [];
    const provenance = [];
    const bookAgg = { exercises: 0, items: 0, keyedItems: 0, convertibleItems: 0 };

    for (const n of missing) {
      const unitPath = `${ROOT}${rawDir}/unit-${String(n).padStart(3, "0")}.json`;
      if (!existsSync(unitPath)) {
        lessonReports.push({ lesson: n, error: "unit JSON missing" });
        continue;
      }
      const rec = JSON.parse(readFileSync(unitPath, "utf8"));
      const answers = keys.get(n) || {};
      const vocabWords = (rec.vocab || []).map((v) => (typeof v?.w === "string" ? v.w.trim() : "")).filter(Boolean);
      const exReports = [];
      let convItems = 0, keyedItems = 0, itemsTotal = 0;

      const exercises = (rec.exercises || []).filter((e) => e && typeof e.instr === "string" && Array.isArray(e.items));
      for (const ex of exercises) {
        const no = String(ex.no ?? "").trim();
        const kind = String(ex.kind ?? "other").toLowerCase();
        const items = ex.items.filter((it) => it && typeof it.en === "string" && it.en.trim());
        bookAgg.exercises++;
        grand.exercises++;
        if (items.length === 0) {
          exReports.push({ no, kind, items: 0, verdict: "emptyItems" });
          continue;
        }
        const parsed = parseKey(no in answers ? answers[no] : null, items.length);
        const keyMap = parsed.map ?? null;
        const parseMode = parsed.mode ?? null;
        const itemReports = [];
        let exKeyed = 0, exConv = 0;

        for (let idx = 0; idx < items.length; idx++) {
          itemsTotal++;
          bookAgg.items++;
          grand.items++;
          const rawVal = keyMap ? keyMap[idx + 1] : undefined;
          if (rawVal == null || !String(rawVal).trim()) {
            itemReports.push({ idx: idx + 1, reason: parseMode === "codes" ? "codesNotUsable" : "noKey" });
            continue;
          }
          if (parseMode === "codes" && kind !== "match") {
            itemReports.push({ idx: idx + 1, reason: "codesNotUsable" });
            continue;
          }
          keyedItems++;
          exKeyed++;
          bookAgg.keyedItems++;
          grand.keyedItems++;
          const correct = keyOption(rawVal);
          if (!correct) {
            itemReports.push({ idx: idx + 1, reason: "emptyCorrect" });
            continue;
          }
          if (rowArtifact(correct)) {
            itemReports.push({ idx: idx + 1, reason: "rowArtifactKey" });
            continue;
          }
          const itemText = items[idx].en.trim();
          if (correct.length >= 3 && normalize(itemText).includes(normalize(correct))) {
            itemReports.push({ idx: idx + 1, reason: "answerEmbeddedInText" });
            continue;
          }
          const built = buildOptions({ ex, items, keyMap, idx, correct, kind, lessonNum: n, vocabWords });
          if (!built) {
            itemReports.push({ idx: idx + 1, reason: "noPrintedDistractor" });
            continue;
          }
          const text = itemText.replace(/\s*_{2,}\s*/g, " ________ ");
          const dupText = `${normalize(text)}⇒${built.options.map(normalize).join("|")}`;
          if (!normalize(text)) {
            itemReports.push({ idx: idx + 1, reason: "emptyText" });
            continue;
          }
          if (existingTextKey.has(dupText)) {
            itemReports.push({ idx: idx + 1, reason: "duplicateOfExistingSeed" });
            continue;
          }
          existingTextKey.add(dupText);
          exConv++;
          convItems++;
          bookAgg.convertibleItems++;
          grand.convertibleItems++;
          itemReports.push({ idx: idx + 1, reason: "convertible" });
          if (MODE === "convert") {
            const seed = {
              category: "vocabulary",
              lesson: n,
              scope: `درس ${n} — تمرین ${no}`,
              text,
              options: built.options,
              answer: built.answer,
              level,
              explanation: `پاسخ عین Answer key کتاب — واحد ${n}، تمرین ${no}.`,
            };
            newSeeds.push(seed);
            provenance.push({
              book: id, lesson: n, exercise: no, kind, parseMode,
              itemText, keySegment: String(rawVal),
              correctOption: built.options[built.answer],
              optionSource: built.source,
              options: built.options, answer: built.answer,
            });
            grand.newSeeds++;
          }
        }
        exReports.push({ no, kind, items: items.length, parseMode, keyed: exKeyed, convertible: exConv, itemsReport: itemReports });
      }
      lessonReports.push({
        lesson: n,
        title: String(rec.title ?? ""),
        exercises: exReports.length,
        items: itemsTotal,
        keyedItems,
        convertibleItems: convItems,
        perExercise: exReports,
      });
    }

    const lessonsCoveredAfter = new Set([...qLessons, ...newSeeds.map((s) => s.lesson)]);
    cover.after[id] = { lessonsWithQuestions: lessonsCoveredAfter.size, total: allLessons.length };
    censusOut.books.push({
      id,
      missingLessonCount: missing.length,
      missingLessons: missing,
      summary: {
        exercises: bookAgg.exercises,
        items: bookAgg.items,
        keyedItems: bookAgg.keyedItems,
        convertibleItems: bookAgg.convertibleItems,
        lessonsWithConvertibleItems: lessonReports.filter((l) => (l.convertibleItems ?? 0) > 0).length,
      },
      lessons: lessonReports,
    });
    grand.lessonsMissing += missing.length;

    if (MODE === "convert") {
      if (newSeeds.length > 0) {
        writeQuizR1(id, newSeeds);
        updateQuizSeedTs(id);
      }
      convOut.books.push({
        id,
        newSeeds: newSeeds.length,
        level,
        lessonsCovered: [...new Set(newSeeds.map((s) => s.lesson))].sort((a, b) => a - b),
        seeds: provenance,
      });
    }
  }

  censusOut.totals = { ...grand, newSeeds: grand.convertibleItems }; // census/convert هم‌ارز — هر آیتم قابل‌تبدیل = یک seed
  writeFileSync(new URL("../docs/qa/viu-r1-quiz-gap-census-2026-11-17.json", import.meta.url), JSON.stringify(censusOut, null, 2));

  if (MODE === "convert") {
    convOut.totals = { newSeeds: grand.newSeeds, coverageBefore: cover.before, coverageAfter: cover.after };
    writeFileSync(new URL("../docs/qa/viu-r1-quiz-conversion-2026-11-17.json", import.meta.url), JSON.stringify(convOut, null, 2));
  }

  // ── console report ──
  console.log(`=== R1 ${MODE === "convert" ? "CONVERT" : "CENSUS"} (${TODAY}) ===`);
  for (const b of censusOut.books) {
    const s = b.summary;
    console.log(`${b.id}: missingLessons=${b.missingLessonCount} · exercises=${s.exercises} · items=${s.items} · keyedItems=${s.keyedItems} · convertibleItems=${s.convertibleItems} · lessonsWithConvertible=${s.lessonsWithConvertibleItems}`);
    for (const l of b.lessons) {
      if (l.error) { console.log(`   L${l.lesson}: ${l.error}`); continue; }
      console.log(`   L${String(l.lesson).padStart(3)} ${l.title.slice(0, 36).padEnd(36)} ex=${l.exercises} items=${l.items} keyed=${l.keyedItems} conv=${l.convertibleItems}`);
    }
  }
  if (MODE === "convert") {
    console.log("=== CONVERSION ===");
    for (const b of convOut.books) console.log(`${b.id}: newSeeds=${b.newSeeds} · lessonsCovered=${b.lessonsCovered.length}`);
    console.log(`coverage before: ${JSON.stringify(cover.before)}`);
    console.log(`coverage after : ${JSON.stringify(cover.after)}`);
    console.log(`totals: newSeeds=${grand.newSeeds}`);
  }
}

/** نوشتن src/data/viu-{id}/quiz-r1.ts */
function writeQuizR1(bookId, seeds) {
  const tsList = (data) => JSON.stringify(data, null, 2).replace(/"([a-zA-Z0-9_]+)":/g, "$1:");
  const file = `${ROOT}src/data/${bookId}/quiz-r1.ts`;
  const header = `// سؤال‌های آزمون موج R1 (نقشه راه کیفیت استخراج سه کتاب VIU — فاز R1-b، ${TODAY})
// فقط از تمرین‌های دارای کلید چاپی کتاب در درس‌هایی که پیش‌تر هیچ سؤال بانکی نداشتند (درس‌های بی‌سؤالِ ممیزی ۲۰۲۶-۱۱-۱۶).
// قاعدهٔ طلایی §E-۳ پابرجا: هر پاسخ = عین Answer key چاپی؛ همهٔ گزینه‌ها فقط از منابع چاپی همان تمرین
// (بانک چاپی / ستون راست چاپی / کلیدهای چاپی آیتم‌های مجاور / واژگان چاپی همان درس) — صفر گزینهٔ ساخته.
// تولید ماشینی بازتولیدپذیر: bun scripts/viu-r1-quiz-convert.mjs convert — صفر دست‌کاری دستی.
// پروونانس کامل تک‌سؤال: docs/qa/viu-r1-quiz-conversion-2026-11-17.json
import type { QuizQuestionSeed } from "../types";

export const QUIZ_R1: QuizQuestionSeed[] = ${tsList(seeds)};
`;
  writeFileSync(file, header);
}

/** به‌روزرسانی quiz-seed.ts برای افزودن ...QUIZ_R1 (idempotent) */
function updateQuizSeedTs(bookId) {
  const seedPath = `${ROOT}src/data/${bookId}/quiz-seed.ts`;
  let src = readFileSync(seedPath, "utf8");
  if (src.includes("QUIZ_R1")) return;
  const lastImport = src.lastIndexOf("import ");
  const lineEnd = src.indexOf("\n", lastImport);
  src = src.slice(0, lineEnd + 1) + `import { QUIZ_R1 } from "./quiz-r1";\n` + src.slice(lineEnd + 1);
  const arrStart = src.indexOf("export const QUIZ_SEED");
  const closeIdx = src.indexOf("];", arrStart);
  if (closeIdx < 0) throw new Error(`quiz-seed.ts close bracket not found for ${bookId}`);
  const isMultiline = src.slice(arrStart, closeIdx).includes("\n");
  if (isMultiline) {
    src = src.slice(0, closeIdx) + "\n  ...QUIZ_R1,\n" + src.slice(closeIdx);
    src = src.replace(/\n\n(  \.\.\.QUIZ_R1,)/, "\n$1"); // بدون خط خالی اضافه
  } else {
    const before = src.slice(0, closeIdx).trimEnd();
    const needsComma = !before.endsWith(",");
    src = src.slice(0, closeIdx) + (needsComma ? ", ...QUIZ_R1" : " ...QUIZ_R1") + src.slice(closeIdx);
  }
  writeFileSync(seedPath, src);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
