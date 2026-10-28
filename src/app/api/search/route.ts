import { NextRequest, NextResponse } from "next/server";
import { BOOKS, loadBookData } from "@/data/books/registry";
import type { BookData, BookId } from "@/data/books/types";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

/**
 * API جست‌وجوی سراسری بین همه جزوه‌ها (فاز ۷) — واژه / گرامر / تست / فعل / دیکشنری.
 *
 * ایندکس در اولین درخواست از loadBookData (dynamic import سمت سرور) ساخته و در
 * حافظه کش می‌شود — درخواست‌های بعدی سبک‌اند. نتایج سمت کلاینت با فراخوانی
 * setBook + requestView به جزوه و نمای مربوطه باز می‌شوند.
 */

const PER_TYPE_LIMIT = 4;

type HitType = "vocab" | "verb" | "dict" | "grammar" | "quiz";

export interface SearchHit {
  type: HitType;
  /** عنوان اصلی (واژه/عنوان درسنامه/متن سؤال) */
  title: string;
  /** توضیح یک‌خطی (معنی، محدوده، تلفظ…) */
  subtitle: string;
  /** نمای مقصد در اپ برای باز کردن نتیجه */
  view: "vocab" | "verbs" | "dict" | "grammar" | "quiz";
}

interface BookSearchResult {
  id: BookId;
  title: string;
  emoji: string;
  gradeLabel: string;
  hits: SearchHit[];
}

interface BookIndex {
  vocab: { word: string; meaning: string; label: string }[];
  verbs: { base: string; past: string; participle: string; meaning: string }[];
  dict: { word: string; pos: string; phonetic: string; definition: string }[];
  grammar: { title: string; titleFa: string; summary: string }[];
  quiz: { text: string; scope: string }[];
}

/** کش ایندکس سراسری — یک بار برای عمر پروسه سرور ساخته می‌شود (null = کتاب بدون داده، مثل کتاب‌های PDF) */
let indexCache: Map<BookId, BookIndex | null> | null = null;

function buildIndex(data: BookData): BookIndex {
  return {
    vocab: data.vocab.all.map((v) => ({ word: v.word, meaning: v.meaning, label: v.lessonLabel })),
    verbs: data.verbs.map((v) => ({
      base: v.base,
      past: v.past,
      participle: v.participle,
      meaning: v.meaning,
    })),
    dict: data.dictionary.map((d) => ({
      word: d.word,
      pos: d.pos,
      phonetic: d.phonetic,
      definition: d.definition,
    })),
    grammar: data.grammar.lessons.map((g) => ({
      title: g.title,
      titleFa: g.titleFa,
      summary: g.summary,
    })),
    quiz: data.quiz.seed.map((q) => ({ text: q.text, scope: q.scope })),
  };
}

async function getIndex(): Promise<Map<BookId, BookIndex | null>> {
  if (indexCache) return indexCache;
  const entries = await Promise.all(
    BOOKS.map(async (b) => {
      const data = await loadBookData(b.id);
      // کتاب‌های PDF (kind:"pdf") داده ساختاریافته ندارند — بدون ایندکس جست‌وجو
      return [b.id, data ? buildIndex(data) : null] as const;
    }),
  );
  indexCache = new Map(entries);
  return indexCache;
}

function includes(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle);
}

export async function GET(req: NextRequest) {
  const rl = checkRate(req, "search:get", 90, 60_000);
  if (!rl.ok) { logEvent("search", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim();
    if (q.length < 2) {
      return NextResponse.json({ query: q, books: [], total: 0 });
    }
    const needle = q.toLowerCase();

    const index = await getIndex();

    const books: BookSearchResult[] = [];
    let total = 0;

    for (const meta of BOOKS) {
      const idx = index.get(meta.id);
      if (!idx) continue;
      const hits: SearchHit[] = [];

      // واژگان — انگلیسی و فارسی
      for (const v of idx.vocab) {
        if (hits.filter((h) => h.type === "vocab").length >= PER_TYPE_LIMIT) break;
        if (includes(v.word, needle) || includes(v.meaning, needle)) {
          hits.push({ type: "vocab", title: v.word, subtitle: `${v.meaning} — ${v.label}`, view: "vocab" });
        }
      }
      // افعال بی‌قاعده
      for (const v of idx.verbs) {
        if (hits.filter((h) => h.type === "verb").length >= 3) break;
        if (includes(v.base, needle) || includes(v.past, needle) || includes(v.participle, needle) || includes(v.meaning, needle)) {
          hits.push({
            type: "verb",
            title: `${v.base} · ${v.past} · ${v.participle}`,
            subtitle: v.meaning,
            view: "verbs",
          });
        }
      }
      // دیکشنری EN-EN
      for (const d of idx.dict) {
        if (hits.filter((h) => h.type === "dict").length >= 3) break;
        if (includes(d.word, needle) || includes(d.definition, needle)) {
          hits.push({
            type: "dict",
            title: d.word,
            subtitle: `${d.pos} ${d.phonetic} — ${d.definition.slice(0, 90)}`,
            view: "dict",
          });
        }
      }
      // درسنامه‌های گرامر
      for (const g of idx.grammar) {
        if (hits.filter((h) => h.type === "grammar").length >= 3) break;
        if (includes(g.title, needle) || includes(g.titleFa, needle) || includes(g.summary, needle)) {
          hits.push({ type: "grammar", title: g.titleFa, subtitle: g.title, view: "grammar" });
        }
      }
      // بانک تست
      for (const s of idx.quiz) {
        if (hits.filter((h) => h.type === "quiz").length >= 3) break;
        if (includes(s.text, needle)) {
          hits.push({ type: "quiz", title: s.text.slice(0, 110), subtitle: s.scope, view: "quiz" });
        }
      }

      if (hits.length > 0) {
        books.push({
          id: meta.id,
          title: meta.gradeLabel,
          emoji: meta.emoji,
          gradeLabel: meta.gradeLabel,
          hits,
        });
        total += hits.length;
      }
    }

    // کتاب‌های با نتیجه بیشتر جلوتر
    books.sort((a, b) => b.hits.length - a.hits.length);

    return NextResponse.json({ query: q, books, total });
  } catch (e) {
    console.error("GET /api/search error:", e);
    return NextResponse.json({ error: "خطا در جست‌وجو" }, { status: 500 });
  }
}
