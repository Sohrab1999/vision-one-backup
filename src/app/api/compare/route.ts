import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/compare — آمار مقایسه‌ای بین پایه‌ها (فاز ۷)
 *
 * پاسخ:
 * {
 *   books:     [ { book, attempts, answered, correct, accuracy, best, lastActivity } ] — هر ۶ جزوه، حتی بدون داده (null)
 *   heatmap:   { [book]: { "YYYY-MM-DD": تعداد آزمون } } — فقط کتاب‌های دارای داده، ۹۰ روز اخیر
 *   trend:     { [book]: [ { date, accuracy } ] } — روند دقت ۳۰ روز اخیر (فقط روزهای دارای داده، صعودی)
 *   rangeDays: 90
 * }
 *
 * نکته: برخلاف مسیرهای دیگر، اینجا book نرمال‌سازی به "vision-one" نمی‌شود؛
 * مقدارهای ناشناس/legacy در همهٔ گروه‌بندی‌ها نادیده گرفته می‌شوند (clamp به ۶ شناسهٔ مجاز).
 */

const VALID_BOOKS = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12"] as const;
type ValidBook = (typeof VALID_BOOKS)[number];

const RANGE_DAYS = 90;
const TREND_DAYS = 30;

function isValidBook(v: string): v is ValidBook {
  return (VALID_BOOKS as readonly string[]).includes(v);
}

/** کلید تاریخ محلی به شکل YYYY-MM-DD (منطقهٔ زمانی سرور) */
function localDateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

interface BookSummary {
  book: ValidBook;
  attempts: number;
  answered: number;
  correct: number;
  accuracy: number | null;
  best: number | null;
  lastActivity: string | null;
}

interface TrendPoint {
  date: string;
  accuracy: number;
}

export async function GET() {
  try {
    const now = new Date();
    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - RANGE_DAYS);
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - TREND_DAYS);

    const [grouped, recent] = await Promise.all([
      // ── تجمیع کل تاریخچه به تفکیک کتاب ──
      db.attempt.groupBy({
        by: ["book"],
        _count: { _all: true },
        _sum: { total: true, correct: true },
      }),
      // ── ۹۰ روز اخیر برای heatmap و trend ──
      db.attempt.findMany({
        where: { createdAt: { gte: ninetyDaysAgo } },
        select: { book: true, correct: true, total: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 5000,
      }),
    ]);

    // ── برای best/lastActivity: آخرین ۵۰۰ آزمون هر کتابِ دارای داده (موازی) ──
    const groupedValid = grouped.filter((g) => isValidBook(g.book));
    const perBookRecent = await Promise.all(
      groupedValid.map((g) =>
        db.attempt.findMany({
          where: { book: g.book },
          select: { correct: true, total: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 500,
        }),
      ),
    );

    const aggByBook = new Map<string, { attempts: number; answered: number; correct: number }>();
    for (const g of groupedValid) {
      aggByBook.set(g.book, {
        attempts: g._count._all,
        answered: g._sum.total ?? 0,
        correct: g._sum.correct ?? 0,
      });
    }

    const bestByBook = new Map<string, number>();
    const lastByBook = new Map<string, string>();
    for (let i = 0; i < perBookRecent.length; i++) {
      const book = groupedValid[i].book;
      const rows = perBookRecent[i];
      if (rows.length === 0) continue;
      let best = -1;
      for (const r of rows) {
        const pct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
        if (pct > best) best = pct;
      }
      if (best >= 0) bestByBook.set(book, best);
      // ردیف‌ها نزولی‌اند → اولی جدیدترین است
      lastByBook.set(book, rows[0].createdAt.toISOString());
    }

    // ── خلاصهٔ هر ۶ کتاب — بدون داده هم حاضر است (null) ──
    const books: BookSummary[] = VALID_BOOKS.map((book) => {
      const agg = aggByBook.get(book);
      const attempts = agg?.attempts ?? 0;
      const answered = agg?.answered ?? 0;
      const correct = agg?.correct ?? 0;
      return {
        book,
        attempts,
        answered,
        correct,
        accuracy: answered > 0 ? Math.round((correct / answered) * 100) : null,
        best: bestByBook.get(book) ?? null,
        lastActivity: lastByBook.get(book) ?? null,
      };
    });

    // ── heatmap (۹۰ روز) و trend (۳۰ روز) از همان pull اخیر ──
    const heatByBook = new Map<string, Map<string, number>>();
    const trendByBook = new Map<string, Map<string, { correct: number; total: number }>>();
    for (const a of recent) {
      if (!isValidBook(a.book)) continue; // مقادیر legacy/ناشناس حذف
      const key = localDateKey(a.createdAt);

      const heat = heatByBook.get(a.book) ?? new Map<string, number>();
      heat.set(key, (heat.get(key) ?? 0) + 1);
      heatByBook.set(a.book, heat);

      if (a.createdAt >= thirtyDaysAgo) {
        const tr = trendByBook.get(a.book) ?? new Map<string, { correct: number; total: number }>();
        const cell = tr.get(key) ?? { correct: 0, total: 0 };
        cell.correct += a.correct;
        cell.total += a.total;
        tr.set(key, cell);
        trendByBook.set(a.book, tr);
      }
    }

    const heatmap: Record<string, Record<string, number>> = {};
    for (const [book, days] of heatByBook) {
      heatmap[book] = Object.fromEntries(days);
    }

    const trend: Record<string, TrendPoint[]> = {};
    for (const [book, days] of trendByBook) {
      trend[book] = [...days.entries()]
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)) // YYYY-MM-DD → مرتب‌سازی لغوی = زمانی
        .map(([date, s]) => ({
          date,
          accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
        }));
    }

    return NextResponse.json({ books, heatmap, trend, rangeDays: RANGE_DAYS });
  } catch (e) {
    console.error("GET /api/compare error:", e);
    return NextResponse.json({ error: "خطا در دریافت آمار مقایسه‌ای" }, { status: 500 });
  }
}
