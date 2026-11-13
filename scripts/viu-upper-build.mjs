// VIU Phase-5 (Upper-intermediate) — build src/data/viu-upper/ from the VLM extraction JSONs.
// Owner mandate: "فاز ۵ — استخراج و افزودن Upper-intermediate (۱۰۰ درس)" — integration per the
// Phase-2 data model (docs/architecture/viu-books-data-model-design-2026-11-09.md):
//   §E-۱ mapping: vocab → VocabEntry · presentation lines → Reading(en+fa) ·
//   convertible exercises → QuizQuestionSeed (answer = عین Answer key کتاب) ·
//   non-convertible exercises → ReadingExercise · irregular verbs → IrregularVerb ·
//   grammar/conversations/dictionary = 0 (VIU is a vocabulary book)
//   §E-۲: level = «استاندارد» (پیشنهاد مصوب سند فاز ۲ برای viu-upper)
//   §E-۳: درس ۵۲ «Clothes» مفقود در اسکن — با برچسب صریح ثبت می‌شود، هیچ محتوایی بازسازی نمی‌شود
//   §F: all fa = GLM machine translation, class FA-NEW — honesty counts reported
//   §G: zero images from the book scans enter the app (O2/O6 unchanged)
//
// Inputs (from scripts/viu-upper-extract.mjs):
//   /tmp/viu/upper-extract/unit-NNN.json · answer-key.json · fa-cache.json (built here)
//   docs/qa/viu-phase1-census-upper-2026-11-09.json (proven book-page offsets + titles)
// Output: src/data/viu-upper/{book-meta,vocab-part-1..5,quiz-part-1..5,readings-part-1..5,verbs,index}.ts
//
// Golden rule: an exercise becomes a quiz ONLY when its printed answer key
// parses cleanly into per-item answers AND the correct word is found among the printed
// word bank / choices / row words. Otherwise the exercise is preserved verbatim as a
// ReadingExercise (nothing is forced into a quiz — §E-۱ rule).

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

const EXTRACT_DIR = "/tmp/viu/upper-extract";
const OUT_DIR = `${process.cwd()}/src/data/viu-upper`;
const CENSUS = `${process.cwd()}/docs/qa/viu-phase1-census-upper-2026-11-09.json`;
const FA_CACHE = `${EXTRACT_DIR}/fa-cache.json`;
const TOTAL_UNITS = 100;
const PART_SIZE = 20; // ۵ پارتیت × ۲۰ درس = ۱۰۰ درس
const MISSING_UNIT = 52; // book 106-107 not in the scan (Phase-1 §G — Phase-2 §E-۳)
const MISSING_RIGHT = new Set([16]); // unit 16 exercise page (book 35) not in the scan

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad3 = (n) => String(n).padStart(3, "0");

// Persian titles (FA-NEW — GLM translations of the 100 printed unit titles, Phase-1 §G list)
const FA_TITLES = {
  1: "یادگیری واژگان — توصیه‌های کلی",
  2: "یادگیری واژگان — ابزارهای یادگیری",
  3: "سازمان‌دهی دفترچهٔ واژگان",
  4: "نام واژه‌های زبان انگلیسی",
  5: "استفاده از فرهنگ لغت",
  6: "مرور واژگان",
  7: "حدس زدن و توضیح معنا",
  8: "پسوندها",
  9: "پیشوندها",
  10: "ریشه‌ها",
  11: "اسم‌های انتزاعی",
  12: "صفت‌های مرکب",
  13: "اسم‌های مرکب (۱): اسم + اسم",
  14: "اسم‌های مرکب (۲): فعل + حرف اضافه",
  15: "واژه‌هایی از زبان‌های دیگر",
  16: "کوتاه‌نویسی‌ها و سرنام‌ها",
  17: "واژه‌های تازه در انگلیسی",
  18: "واژه‌هایی که معمولاً بد تلفظ می‌شوند",
  19: "واژه‌های نمادصوتی",
  20: "هم‌نام‌ها",
  21: "زمان",
  22: "شرط",
  23: "علت، دلیل، هدف و نتیجه",
  24: "اگرچه، علی‌رغم و تضاد",
  25: "افزودن",
  26: "واژه‌های ارجاع به متن",
  27: "واژه‌های پیوند گفتار",
  28: "واژه‌های پیوند نوشتار",
  29: "اسم‌های غیرقابل‌شمارش",
  30: "واژه‌هایی که فقط جمع هستند",
  31: "اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت",
  32: "اسم‌های گروهی",
  33: "قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش",
  34: "ظرف‌ها و محتویات",
  35: "کشورها، ملیت‌ها و زبان‌ها",
  36: "هوا",
  37: "وصف آدم‌ها: ظاهر",
  38: "وصف آدم‌ها: شخصیت",
  39: "روابط",
  40: "در خانه",
  41: "مشکلات روزمره",
  42: "مشکلات جهانی",
  43: "آموزش",
  44: "کار",
  45: "ورزش",
  46: "هنرها",
  47: "موسیقی",
  48: "غذا",
  49: "محیط زیست",
  50: "شهرها",
  51: "جهان طبیعی",
  52: "لباس (مفقود در اسکن)",
  53: "سلامتی و پزشکی",
  54: "سفر",
  55: "تعطیلات",
  56: "عددها و شکل‌ها",
  57: "علم و فناوری",
  58: "رایانه و اینترنت",
  59: "مطبوعات و رسانه‌ها",
  60: "سیاست و نهادهای عمومی",
  61: "جرم",
  62: "پول — خرید، فروش و پرداخت",
  63: "باور و نظر",
  64: "احساسات خوشایند و ناخوشایند",
  65: "علاقه، بی‌علاقگی و خواسته",
  66: "گفتن (صحبت کردن)",
  67: "حس‌های شش‌گانه",
  68: "کارهایی که بدن می‌کند",
  69: "عدد، کمیت، درجه و شدت",
  70: "زمان",
  71: "فاصله‌ها و ابعاد",
  72: "الزام، نیاز، امکان و احتمال",
  73: "صدا و نور",
  74: "مالکیت، دادن و قرض دادن",
  75: "حرکت و سرعت",
  76: "بافت، روشنایی، وزن و تراکم",
  77: "موفقیت، شکست و دشواری",
  78: "اصطلاح‌ها و عبارت‌های ثابت — کلیات",
  79: "عبارت‌های روزمره",
  80: "تشدیه‌ها",
  81: "جفت‌واژه‌ها",
  82: "اصطلاح‌های وصف آدم‌ها",
  83: "اصطلاح‌های وصف احساس یا حال روحی",
  84: "اصطلاح‌های وصف موقعیت‌های مشکل‌دار",
  85: "اصطلاح‌های مرتبط با تحسین و انتقاد",
  86: "اصطلاح‌های مرتبط با به‌کارگیری زبان",
  87: "اصطلاح‌های متفرقه",
  88: "ضرب‌المثل‌ها",
  89: "عبارت‌های با do و make",
  90: "عبارت‌های با bring و take",
  91: "عبارت‌های با get",
  92: "عبارت‌های با set و put",
  93: "عبارت‌های با come و go",
  94: "عبارت‌های متفرقه",
  95: "واژه‌های رسمی و غیررسمی (۱)",
  96: "واژه‌های رسمی و غیررسمی (۲)",
  97: "انگلیسی آمریکایی",
  98: "انگلیسی‌های دیگر",
  99: "انگلیسی تیترها",
  100: "زبان علائم و اعلان‌ها",
};

const COLORS = ["emerald", "amber", "teal", "violet", "orange", "rose"];
const QUIZ_KINDS = new Set(["gap", "choose", "odd", "truefalse"]);
const BOOK_LEFT_PAGE = (n) => 2 * n + 2; // proven: unit N left page = book 2N+2 (Phase-1 §G) — constant for ALL units

// ── load ─────────────────────────────────────────────────────────────────────
function readJson(p) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const census = readJson(CENSUS) || [];
const censusTitles = new Map(
  census.filter((r) => r.unit != null && r.unit >= 1 && r.unit <= TOTAL_UNITS && r.title).map((r) => [Number(r.unit), String(r.title)]),
);

const units = [];
for (let n = 1; n <= TOTAL_UNITS; n++) {
  const rec = readJson(`${EXTRACT_DIR}/unit-${pad3(n)}.json`);
  if (!rec) {
    console.error(`BUILD ABORT: unit ${n} missing`);
    process.exit(1);
  }
  const isMissing = rec.missingInScan && Number(rec.unit) === n;
  if (!isMissing && (rec.failed || Number(rec.unit) !== n || !Array.isArray(rec.vocab))) {
    console.error(`BUILD ABORT: unit ${n} invalid`);
    process.exit(1);
  }
  units.push(rec);
}

const keyByUnit = new Map();
const keyRaw = readJson(`${EXTRACT_DIR}/answer-key.json`) || [];
for (const pg of keyRaw) {
  for (const u of pg.units || []) {
    const n = Number(u.unit);
    // یک درس ممکن است کلیدش در دو صفحهٔ مجاور پخش باشد — ادغام کامل تمرین‌ها
    keyByUnit.set(n, { ...(keyByUnit.get(n) || {}), ...(u.answers || {}) });
  }
}

// ── fa translation pass (FA-NEW) with cache ──────────────────────────────────
const faCache = existsSync(FA_CACHE) ? readJson(FA_CACHE) || {} : {};

function extractJsonObj(text) {
  const s = text.indexOf("{");
  const e = text.lastIndexOf("}");
  if (s === -1 || e <= s) return null;
  try {
    return JSON.parse(text.slice(s, e + 1));
  } catch {
    return null;
  }
}

async function translateBatch(items) {
  // items: [{id, en}] → returns Map(id→fa)
  const prompt =
    `Translate these ${items.length} English strings to natural Persian (Farsi). These are printed texts from an English vocabulary textbook (exercise instructions, exercise sentences, short answer keys). Return ONLY a compact JSON object mapping each id to its Persian translation: {"${items[0].id}":"…",…}. Keep blanks "________" unchanged. Never omit any id.`;
  const body = items.map((it) => `${it.id}: ${it.en}`).join("\n");
  const args = ["chat", "-p", `${prompt}\n\n${body}`, "-o", `${EXTRACT_DIR}/_last_chat.json`];
  const backoffs = [0, 20000, 45000];
  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt] > 0) await sleep(backoffs[attempt]);
    try {
      execFileSync("z-ai", args, { stdio: ["ignore", "ignore", "ignore"], timeout: 300000 });
      const raw = readJson(`${EXTRACT_DIR}/_last_chat.json`);
      const content = raw?.choices?.[0]?.message?.content ?? "";
      const obj = extractJsonObj(content);
      if (obj) return obj;
    } catch {
      /* retry */
    }
  }
  return null;
}

async function ensureTranslations(strings) {
  // strings: array of unique english strings needing fa
  const todo = strings.filter((s) => s && !(s in faCache));
  console.log(`fa-translate: ${todo.length} strings to translate (cache has ${Object.keys(faCache).length})`);
  const BATCH = 35;
  for (let i = 0; i < todo.length; i += BATCH) {
    const items = todo.slice(i, i + BATCH).map((en, k) => ({ id: `t${i + k}`, en }));
    const map = await translateBatch(items);
    if (!map) {
      console.error(`fa-translate batch ${i / BATCH}: FAILED (strings left untranslated — answerFa stays empty)`);
      continue;
    }
    items.forEach((it) => {
      const fa = map[it.id];
      if (typeof fa === "string" && fa.trim()) faCache[it.en] = fa.trim();
    });
    writeFileSync(FA_CACHE, JSON.stringify(faCache, null, 1));
    console.log(`fa-translate: +${Object.keys(faCache).length} cached`);
    await sleep(6000);
  }
}

// ── answer-key parsing (conservative — failures fall back to ReadingExercise) ─
function normalize(s) {
  return String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.。]+$/, "");
}

function parseNumberedAnswers(keyText, expectedCount) {
  // "1 went 2 made 3 did" / "1 T 2 F" / "1 coffee… | 2 an appointment | 3 swim…" → map {1:"…"}
  // each value ends where the NEXT number match begins (m.index — before the " 10"),
  // otherwise a " | " separator makes the value swallow the next number ("swim | 10")
  const text = String(keyText ?? "").trim();
  if (!text) return null;
  const re = /(?:^|\s)(\d{1,2})[.):]?\s+/g;
  let m;
  const positions = [];
  while ((m = re.exec(text)) !== null)
    positions.push({ num: Number(m[1]), valStart: m.index + m[0].length, matchStart: m.index });
  if (positions.length === 0) return null;
  const tokens = [];
  for (let i = 0; i < positions.length; i++) {
    const end = i + 1 < positions.length ? positions[i + 1].matchStart : text.length;
    // strip a trailing " | " (the multi-part separator the key prompt joins with) — never leak into data
    const val = text
      .slice(positions[i].valStart, end)
      .trim()
      .replace(/\s*\|\s*$/, "")
      .trim();
    if (val) tokens.push({ num: positions[i].num, val });
  }
  if (tokens.length !== expectedCount) return null;
  const nums = tokens.map((t) => t.num);
  for (let i = 0; i < nums.length; i++) if (nums[i] !== i + 1) return null; // must be 1..N in order
  const out = {};
  for (const t of tokens) out[t.num] = t.val;
  return out;
}

function firstAlternate(ans) {
  return String(ans ?? "")
    .split("/")[0]
    .replace(/\s*\|\s*$/, "")
    .trim();
}

// ── conversion ───────────────────────────────────────────────────────────────
function convertUnit(n, rec) {
  const answers = keyByUnit.get(n) || {};
  const quiz = [];
  const readingExercises = [];
  const faNeeded = new Set();
  const vocabRows = [];
  const verbsRows = [];
  const seenWords = new Set();
  const isMissing = rec.missingInScan === true; // unit 52 — explicit missing-in-scan record
  // IrregularVerb mapping applies ONLY to the book's irregular-verb lesson(s) — the VLM
  // liberally adds forms:[base,past,pp] to regular verbs and phrases elsewhere (§E-۱ row 6).
  const isIrregularVerbLesson = /irregular/i.test(String(rec.title ?? ""));

  if (!isMissing)
    for (const v of rec.vocab || []) {
      if (!v || typeof v.w !== "string" || !v.w.trim()) continue;
      const w = v.w.trim();
      if (
        isIrregularVerbLesson &&
        Array.isArray(v.forms) &&
        v.forms.length === 3 &&
        v.forms.every((x) => typeof x === "string" && x.trim())
      ) {
        verbsRows.push({ base: v.forms[0].trim(), past: v.forms[1].trim(), participle: v.forms[2].trim(), meaning: typeof v.fa === "string" ? v.fa : "" });
        continue;
      }
      const key = normalize(w);
      if (seenWords.has(key)) continue;
      seenWords.add(key);
      vocabRows.push({
        word: w,
        meaning: typeof v.fa === "string" ? v.fa : "",
        lesson: n,
        ...(typeof v.pos === "string" && v.pos.trim() ? { pos: v.pos.trim() } : {}),
        lessonLabel: `درس ${n} — ${FA_TITLES[n] ?? ""}`,
      });
    }

  const lines = isMissing
    ? []
    : (rec.lines || [])
        .filter((l) => l && typeof l.en === "string" && l.en.trim())
        .map((l) => ({ en: l.en.trim(), fa: typeof l.fa === "string" ? l.fa : "" }));

  if (!isMissing)
    for (const ex of rec.exercises || []) {
      if (!ex || typeof ex.instr !== "string" || !Array.isArray(ex.items)) continue;
      const no = String(ex.no ?? "").trim();
      const kind = String(ex.kind ?? "other").toLowerCase();
      const bank = (Array.isArray(ex.bank) ? ex.bank : []).filter((b) => typeof b === "string" && b.trim());
      const keyText = no in answers ? answers[no] : null;
      const items = ex.items.filter((it) => it && typeof it.en === "string" && it.en.trim());

      if (QUIZ_KINDS.has(kind) && keyText != null && items.length > 0) {
        const parsed = parseNumberedAnswers(keyText, items.length);
        if (parsed) {
          const quizItems = [];
          let allOk = true;
          items.forEach((it, idx) => {
            const correct = firstAlternate(parsed[idx + 1]);
            if (!correct) {
              allOk = false;
              return;
            }
            let options = null;
            let answer = -1;
            const printed = (Array.isArray(it.opts) ? it.opts : []).filter((o) => typeof o === "string" && o.trim());
            if (kind === "truefalse") {
              options = ["True", "False"];
              const t = normalize(parsed[idx + 1]);
              answer = /^(t|true|✓)/.test(t) ? 0 : /^(f|false|x|✗)/.test(t) ? 1 : -1;
            } else if (printed.length >= 2 && printed.length <= 5) {
              options = printed.map((o) => o.trim());
              answer = options.findIndex((o) => normalize(o) === normalize(correct));
            } else if (kind === "odd") {
              // odd-one-out: the item text itself lists the row words
              const row = it.en
                .replace(/^\d+[.):]?\s*/, "")
                .split(/[,;·]\s*|\s{3,}/)
                .map((s) => s.trim())
                .filter(Boolean);
              options = row;
              answer = row.findIndex((w) => normalize(w) === normalize(correct));
            } else {
              // gap-fill / categorize: distractors only from printed sources (never invented) —
              // priority: printed word bank > distinct answer words of the same exercise > unit vocabulary.
              const correctNorm = normalize(correct);
              // گارد کیفیت فاز ۴ (راستی‌آزمایی مرورگری): پاسخِ چاپیِ «ردیف چندواژه‌ای» یا ردیفِ bank
              // شروع‌شده با «Examples» گزینهٔ آزمون معتبری نمی‌سازد — چنین تمرینی عین قاعدهٔ طلایی
              // به ReadingExercise برمی‌گردد (عین گارد rowArtifact فاز ۴).
              const rowArtifact = (s) => {
                const t = String(s ?? "").trim();
                if (/^examples?\b/i.test(t)) return true; // ردیف بانک «Examples …»
                if ((t.match(/,/g) || []).length >= 2) return true; // ردیف چاپی چندواژه‌ای
                return false;
              };
              if (rowArtifact(correct)) {
                allOk = false;
                return;
              }
              const distinctAnswers = [...new Set(
                Object.values(parsed)
                  .map((a) => firstAlternate(a))
                  .filter((a) => a && normalize(a) !== correctNorm),
              )];
              const poolRaw =
                bank.length > 0 ? bank : distinctAnswers.length >= 2 ? distinctAnswers : vocabRows.map((v) => v.word);
              const pool = poolRaw.filter((w) => !rowArtifact(w));
              const distractors = pool.filter((w) => typeof w === "string" && w.trim() && normalize(w) !== correctNorm);
              const uniq = [...new Set(distractors.map((w) => w.trim()))];
              if (uniq.length >= 1) {
                options = [correct, ...uniq.slice(0, 3)];
                // deterministic rotation so the correct answer is not always first
                const pos = (n * 7 + idx) % options.length;
                [options[0], options[pos]] = [options[pos], options[0]];
                answer = pos;
              }
            }
            if (!options || options.length < 2 || answer < 0) {
              allOk = false;
              return;
            }
            quizItems.push({
              category: "vocabulary",
              lesson: n,
              scope: `درس ${n} — تمرین ${no}`,
              text: it.en.trim().replace(/\s*_{2,}\s*/g, " ________ "),
              options,
              answer,
              level: "استاندارد",
              explanation: `پاسخ عین Answer key کتاب — واحد ${n}، تمرین ${no}.`,
            });
          });
          if (allOk && quizItems.length === items.length) {
            quiz.push(...quizItems);
            continue; // exercise fully converted
          }
        }
      }
      // non-convertible (honest preservation — §E-۱): match/table/other/unparsed/no-key
      const exItems = items.map((it) => {
        let answerEn = "";
        if (keyText != null) {
          const parsed = parseNumberedAnswers(keyText, items.length);
          answerEn = parsed ? String(parsed[items.indexOf(it) + 1] ?? "") : String(keyText);
        }
        return {
          en: it.en.trim(),
          fa: typeof it.fa === "string" ? it.fa : "",
          answerEn,
          answerFa: "",
        };
      });
      for (const it of exItems) if (it.answerEn) faNeeded.add(it.answerEn);
      const instrFa = typeof ex.instrFa === "string" && ex.instrFa.trim() ? ex.instrFa.trim() : "";
      readingExercises.push({
        instruction: (no ? `${no} ` : "") + ex.instr.trim(),
        instructionFa: instrFa,
        items: exItems,
      });
      if (!instrFa) faNeeded.add(ex.instr.trim());
    }

  // fa for reading-exercise items & instructions (via cache; item fa from extraction kept as-is)
  for (const rex of readingExercises) {
    for (const it of rex.items) {
      if (!it.fa && it.en) {
        it.fa = faCache[it.en] || "";
        if (!it.fa) faNeeded.add(it.en);
      }
      it.answerFa = faCache[it.answerEn] || "";
    }
    if (!rex.instructionFa) {
      rex.instructionFa = faCache[rex.instruction.replace(/^\d+[.):]?\s*/, "")] || "";
    }
  }

  return { n, vocabRows, verbsRows, lines, quiz, readingExercises, faNeeded: [...faNeeded] };
}

// ── TS emitters ──────────────────────────────────────────────────────────────
function emit(path, header, body) {
  writeFileSync(path, `${header}\n${body}\n`);
}

function tsList(data) {
  return JSON.stringify(data, null, 2).replace(/"([a-zA-Z0-9_]+)":/g, "$1:");
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const converted = [];
  for (let n = 1; n <= TOTAL_UNITS; n++) converted.push(convertUnit(n, units[n - 1]));

  // fa translation pass for anything missing (FA-NEW class — machine translation)
  const allNeeded = [...new Set(converted.flatMap((c) => c.faNeeded))].filter((s) => s && !(s in faCache));
  if (allNeeded.length > 0) await ensureTranslations(allNeeded);

  // re-apply cache after translation
  for (const c of converted) {
    for (const rex of c.readingExercises) {
      for (const it of rex.items) {
        if (!it.fa && it.en && faCache[it.en]) it.fa = faCache[it.en];
        if (!it.answerFa && it.answerEn && faCache[it.answerEn]) it.answerFa = faCache[it.answerEn];
      }
      if (!rex.instructionFa) {
        const bare = rex.instruction.replace(/^\d+[.):]?\s*/, "");
        rex.instructionFa = faCache[bare] || faCache[rex.instruction] || "";
      }
    }
  }

  const PARTS = Math.ceil(TOTAL_UNITS / PART_SIZE);

  // ── book-meta.ts ──
  const chapters = converted.map((c) => {
    const n = c.n;
    const left = BOOK_LEFT_PAGE(n);
    const isMissing = n === MISSING_UNIT;
    const firstLine = c.lines[0];
    const quote = isMissing
      ? {
          en: "Clothes — this unit is missing from the provided scan (book pages 106-107).",
          fa: "درس ۵۲ «لباس» در اسکن ارائه‌شده حاضر نیست (ص۱۰۶-۱۰۷ کتاب) — هیچ محتوایی بازسازی نشده است.",
          source: `درس ${n} — VIU Upper-intermediate (کتاب ص۱۰۶-۱۰۷) — مفقود در اسکن`,
        }
      : firstLine
        ? { en: firstLine.en, fa: firstLine.fa || "", source: `درس ${n} — VIU Upper-intermediate (کتاب ص${left})` }
        : {
            en: units[n - 1].title || censusTitles.get(n) || "",
            fa: FA_TITLES[n] || "",
            source: `درس ${n} — VIU Upper-intermediate (کتاب ص${left})`,
          };
    return {
      id: n,
      number: `درس ${n}`,
      title: units[n - 1].title || censusTitles.get(n) || `Unit ${n}`,
      titleFa: FA_TITLES[n] || "",
      quote,
      minutes: 8,
      color: COLORS[(n - 1) % COLORS.length],
      grammarTopics: [],
    };
  });

  const bookMetaBody = `import type { ChapterMeta, BookInfo } from "../types";

export const BOOK_INFO: BookInfo = {
  title: "English Vocabulary in Use — Upper-intermediate",
  subtitle: "Michael McCarthy & Felicity O'Dell — Cambridge — سطح فوق‌متوسط",
  author: "Michael McCarthy & Felicity O'Dell",
  edition: "Cambridge University Press — 2nd Edition (with answers)",
  price: "رایگان",
  telegram: "@PracticalEnglishInKonkour",
};

export const CHAPTERS: ChapterMeta[] = ${tsList(chapters)};`;
  emit(`${OUT_DIR}/book-meta.ts`, `// متادیتای کتاب «English Vocabulary in Use — Upper-intermediate» — McCarthy & O'Dell (Cambridge, 2nd ed. with answers)\n// استخراج متنی از اسکن PDF آپلودشدهٔ مالک (فاز ۵) — عنوان‌های فارسی = ترجمهٔ ماشینی GLM (کلاس FA-NEW)\n// ⚠️ درس ۵۲ «Clothes» در اسکن مفقود است (ص۱۰۶-۱۰۷ کتاب) — فقط با برچسب صریح ثبت شده، هیچ محتوایی بازسازی نشده (فاز ۲ §E-۳)`, bookMetaBody);

  // ── vocab-part-*.ts ──
  const vocabHeader = (part) => `// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت ${part}) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)`;
  for (let p = 1; p <= PARTS; p++) {
    const rows = converted.slice((p - 1) * PART_SIZE, p * PART_SIZE).flatMap((c) => c.vocabRows);
    emit(
      `${OUT_DIR}/vocab-part-${p}.ts`,
      vocabHeader(p),
      `import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = ${tsList(rows)};

export const VOCAB_PART_${p}: Row[] = ROWS;`,
    );
  }

  // ── quiz-part-*.ts ──
  const quizHeader = (part) => `// سؤالات آزمون درس‌های VIU Upper-intermediate (پارتیت ${part}) — از تمرین‌های قابل‌تبدیل کتاب
// پاسخ هر سؤال = عین Answer key چاپی کتاب (قاعدهٔ طلایی فاز ۵) — فریب‌دهنده‌ها فقط از واژگان همان درس/تمرین
// level = «استاندارد» عین §E-۲ سند فاز ۲`;
  for (let p = 1; p <= PARTS; p++) {
    const rows = converted.slice((p - 1) * PART_SIZE, p * PART_SIZE).flatMap((c) => c.quiz);
    emit(
      `${OUT_DIR}/quiz-part-${p}.ts`,
      quizHeader(p),
      `import type { QuizQuestionSeed } from "../types";

export const QUIZ_PART_${p}: QuizQuestionSeed[] = ${tsList(rows)};`,
    );
  }

  // ── readings-part-*.ts + تمرین‌های غیرقابل‌تبدیل ──
  const readingsHeader = (part) => `// متن ارائهٔ درس‌های VIU Upper-intermediate (پارتیت ${part}) + تمرین‌های غیرقابل‌تبدیل با پاسخ عین Answer key
// fa همهٔ پاراگراف‌ها = ترجمهٔ ماشینی GLM (کلاس FA-NEW) — هیچ متن فارسی چاپی در کتاب وجود ندارد`;
  for (let p = 1; p <= PARTS; p++) {
    const rows = converted.slice((p - 1) * PART_SIZE, p * PART_SIZE).map((c) => {
      const n = c.n;
      const left = BOOK_LEFT_PAGE(n);
      const rec = units[n - 1];
      const isMissing = n === MISSING_UNIT;
      const rightMissing = MISSING_RIGHT.has(n);
      const reading = {
        id: `viu-upper-l${n}`,
        lesson: n,
        title: rec.title || censusTitles.get(n) || `Unit ${n}`,
        titleFa: isMissing ? `${FA_TITLES[n] || ""} — مفقود در اسکن` : FA_TITLES[n] || "",
        source: isMissing
          ? `VIU Upper-intermediate 2nd ed — درس ${n} (کتاب ص۱۰۶-۱۰۷) — مفقود در اسکن`
          : `VIU Upper-intermediate 2nd ed — درس ${n} (کتاب ص${left}${rightMissing ? "" : `-${left + 1}`})${rightMissing ? " — صفحهٔ تمرین در اسکن نیست" : ""}`,
        paragraphs: c.lines,
      };
      if (c.readingExercises.length === 1) {
        reading.exercise = c.readingExercises[0];
      } else if (c.readingExercises.length > 1) {
        // ساختار Reading فقط یک exercise دارد (صفر تغییر تایپ) — ادغام صادقانهٔ آیتم‌ها با دستورهای شماره‌دار
        reading.exercise = {
          instruction: c.readingExercises.map((r) => r.instruction).join(" — "),
          instructionFa: c.readingExercises.map((r) => r.instructionFa).filter(Boolean).join(" — "),
          items: c.readingExercises.flatMap((r) => r.items),
        };
      }
      return reading;
    });
    emit(
      `${OUT_DIR}/readings-part-${p}.ts`,
      readingsHeader(p),
      `import type { Reading } from "../types";

export const READINGS_PART_${p}: Reading[] = ${tsList(rows)};`,
    );
  }

  // ── verbs.ts ──
  const verbs = converted.flatMap((c) => c.verbsRows);
  emit(
    `${OUT_DIR}/verbs.ts`,
    `// فعل‌های بی‌قاعدهٔ درس‌های «Irregular verbs» و جدول‌های مشابه — عین جدول چاپ کتاب (§E-۱ ردیف ۶ مدل فاز ۲)
// meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW)`,
    `import type { IrregularVerb } from "../types";

export const VERBS: IrregularVerb[] = ${tsList(verbs)};`,
  );

  // ── vocab.ts / quiz-seed.ts / readings.ts (aggregators) ──
  const partImports = (prefix) =>
    Array.from({ length: PARTS }, (_, i) => `import { ${prefix}_PART_${i + 1} } from "./${prefix.toLowerCase()}-part-${i + 1}";`).join("\n");
  const partSpreads = (prefix) =>
    Array.from({ length: PARTS }, (_, i) => `  ...${prefix}_PART_${i + 1},`).join("\n");

  emit(
    `${OUT_DIR}/vocab.ts`,
    `// واژگان کامل درس‌های دارای محتوا — تجمیع پارتیت‌ها (درس ۵۲ مفقود در اسکن — هیچ ردیفی ندارد)`,
    `import type { VocabEntry, VocabWord } from "../types";
${partImports("VOCAB")}

const ROWS: (Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string })[] = [
${partSpreads("VOCAB")}
];

export const VOCAB_ALL: VocabEntry[] = ROWS.map((r) => {
  const { lessonLabel, ...rest } = r;
  return { ...rest, lessonLabel } as VocabEntry;
});

export const VOCAB_LESSONS = [
  ...new Map(ROWS.map((r) => [r.lesson, { lesson: r.lesson, label: r.lessonLabel }])).values(),
].sort((a, b) => a.lesson - b.lesson);

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {};
for (const r of ROWS) VOCAB_COUNT_BY_LESSON[r.lesson] = (VOCAB_COUNT_BY_LESSON[r.lesson] ?? 0) + 1;

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return VOCAB_ALL.filter((v) => v.lesson === lesson);
}`,
  );
  emit(
    `${OUT_DIR}/quiz-seed.ts`,
    `// آزمون کامل — تجمیع پارتیت‌ها`,
    `import type { QuizQuestionSeed } from "../types";
${partImports("QUIZ")}

export const QUIZ_SEED: QuizQuestionSeed[] = [
${partSpreads("QUIZ")}
];

export const QUESTION_COUNTS: Record<string, number> = {
  grammar: QUIZ_SEED.filter((q) => q.category === "grammar").length,
  vocabulary: QUIZ_SEED.filter((q) => q.category === "vocabulary").length,
};`,
  );
  emit(
    `${OUT_DIR}/readings.ts`,
    `// متن‌های ارائهٔ کامل — تجمیع پارتیت‌ها`,
    `import type { Reading } from "../types";
${partImports("READINGS")}

export const READING_LIST: Reading[] = [
${partSpreads("READINGS")}
];`,
  );

  // ── index.ts ──
  emit(
    `${OUT_DIR}/index.ts`,
    `// مونتاژ داده‌های کتاب «English Vocabulary in Use — Upper-intermediate» به‌شکل قرارداد BookData
// این فایل تنها نقطهٔ ورود کتاب در رجیستری است: src/data/books/registry.ts
// مدل یکپارچه‌سازی: فاز ۲ (docs/architecture/viu-books-data-model-design-2026-11-09.md §C گزینهٔ ① جزوه‌وار ساختاریافته)
// ⚠️ درس ۵۲ «Clothes» مفقود در اسکن — فصل آن در CHAPTERS با برچسب صریح هست ولی هیچ دادهٔ محتوایی ندارد (فاز ۲ §E-۳)`,
    `import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { VERBS } from "./verbs";
import { VOCAB_ALL, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "./vocab";

const STATS = {
  words: VOCAB_ALL.length,
  questions: QUIZ_SEED.length,
  readings: READING_LIST.length,
  conversations: 0,
  dictionary: 0,
  verbs: VERBS.length,
  grammarLessons: 0,
};

export const VIU_UPPER_BOOK = {
  info: BOOK_INFO,
  chapters: CHAPTERS,
  stats: STATS,
  vocab: {
    lessons: VOCAB_LESSONS,
    all: VOCAB_ALL,
    countByLesson: VOCAB_COUNT_BY_LESSON,
    ofLesson: vocabOfLesson,
  },
  quiz: {
    seed: QUIZ_SEED,
    counts: QUESTION_COUNTS,
  },
  grammar: {
    lessons: [],
    ofLesson: () => [],
  },
  readings: READING_LIST,
  conversations: [],
  dictionary: [],
  verbs: VERBS,
} satisfies BookData;`,
  );

  // ── QA: real counts ──
  const totals = {
    vocab: converted.reduce((s, c) => s + c.vocabRows.length, 0),
    faAbsentVocab: converted.reduce((s, c) => s + c.vocabRows.filter((v) => !v.meaning).length, 0),
    verbs: verbs.length,
    lines: converted.reduce((s, c) => s + c.lines.length, 0),
    faAbsentLines: converted.reduce((s, c) => s + c.lines.filter((l) => !l.fa).length, 0),
    quiz: converted.reduce((s, c) => s + c.quiz.length, 0),
    readingEx: converted.reduce((s, c) => s + c.readingExercises.length, 0),
    readingItems: converted.reduce((s, c) => s + c.readingExercises.reduce((s2, r) => s2 + r.items.length, 0), 0),
    faAbsentInstr: converted.reduce((s, c) => s + c.readingExercises.filter((r) => !r.instructionFa).length, 0),
    faAbsentItemFa: converted.reduce((s, c) => s + c.readingExercises.reduce((s2, r) => s2 + r.items.filter((i) => !i.fa).length, 0), 0),
    keyLessExercises: 0,
    convertedExercises: 0,
  };
  for (let n = 1; n <= TOTAL_UNITS; n++) {
    const rec = units[n - 1];
    if (rec.missingInScan) continue;
    const answers = keyByUnit.get(n) || {};
    for (const ex of rec.exercises || []) {
      const no = String(ex?.no ?? "");
      if (!(no in answers)) totals.keyLessExercises++;
      else totals.convertedExercises++;
    }
  }
  console.log("BUILD COMPLETE → src/data/viu-upper/");
  console.log(`  lessons=${TOTAL_UNITS} (chapters=${chapters.length} — درس ۵۲ فقط با برچسب مفقود)`);
  console.log(`  vocabRows=${totals.vocab} (faAbsent=${totals.faAbsentVocab}) · verbsRows=${totals.verbs}`);
  console.log(`  presentationLines=${totals.lines} (faAbsent=${totals.faAbsentLines})`);
  console.log(`  quizSeeds=${totals.quiz} · readingExercises=${totals.readingEx} (items=${totals.readingItems})`);
  console.log(`  faAbsent: instructionFa=${totals.faAbsentInstr} itemFa=${totals.faAbsentItemFa}`);
  console.log(`  exercises with printed key: ${totals.convertedExercises} · without printed key (→ ReadingExercise): ${totals.keyLessExercises}`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
