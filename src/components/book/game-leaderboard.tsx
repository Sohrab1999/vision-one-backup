"use client";

/**
 * G4-01 — رده‌بندی هر بازی (تب «بازی‌ها» در جایزه‌ها).
 *
 * - انتخابگر چیپی افقی ۱۵ بازی (اسکرول‌پذیر روی موبایل) → fetch نسبی
 *   `/api/leaderboard?book=…&category=…` با AbortController (الگوی رده‌بندی هفتگی).
 * - تاپ ۱۰ هفتگی هر بازی: نشان رده (🥇🥈🥉) + نام + XP + بهترین امتیاز + دقت.
 * - «جای تو»: ردیف خودی با حلقهٔ کهربایی؛ خارج از ۱۰ برتر → کارت چسبان
 *   محترمانه (بدون تحقیر) با امتیاز هفته.
 * - نقشهٔ نام فارسی بازی‌ها محلی است: GAME_TITLES داخل shared.ts export نشده
 *   و کلید قدیمی «match» دارد (بازی حافظه از G3 به بعد با کلید «memory»
 *   ذخیره می‌کند)؛ منبع حقیقت = فهرست games-hub که export هم نیست و آن فایل
 *   ممنوع‌التغییر است — پس همین فهرست ۱۵تایی هم‌نگاه داشته می‌شود.
 */

import { useEffect, useState } from "react";
import { Gamepad2, RefreshCw, Swords, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { faNum } from "./games/shared";
import type { BookId } from "@/data/books/types";

/** کلیدهای بازی — دقیقاً همان مقادیری که saveAttempt در Attempt.category می‌نویسد */
type GameKey =
  | "memory"
  | "scramble"
  | "cloze"
  | "word-search"
  | "speed-quiz"
  | "flappy-quiz"
  | "snakes-ladders"
  | "crossword"
  | "wordle"
  | "hangman"
  | "sentence-builder"
  | "duel"
  | "duel-online"
  | "listening-hunt"
  | "adventure-map"
  | "fps-shooter";

const GAMES: { key: GameKey; name: string }[] = [
  { key: "memory", name: "تطبیق حافظه" },
  { key: "scramble", name: "حروف جابه‌جا" },
  { key: "cloze", name: "جای خالی" },
  { key: "word-search", name: "شکار کلمه" },
  { key: "speed-quiz", name: "تست برقی" },
  { key: "flappy-quiz", name: "فلپی گزینش" },
  { key: "snakes-ladders", name: "مار و پله واژگانی" },
  { key: "crossword", name: "جدول متقاطع" },
  { key: "wordle", name: "وردل ویژن" },
  { key: "hangman", name: "دارباز" },
  { key: "sentence-builder", name: "سازنده جمله" },
  { key: "duel", name: "دوئل دونفره" },
  { key: "duel-online", name: "دوئل آنلاین" },
  { key: "listening-hunt", name: "شکار صدا" },
  { key: "adventure-map", name: "نقشه ماجراجویی" },
  { key: "fps-shooter", name: "شوتر آموزشی" },
];

interface GameRow {
  name: string;
  avatar: string | null;
  xp: number;
  quizzes: number;
  answered: number;
  accuracy: number;
  bestScore?: number;
}

interface GameBoard {
  weekStart: string;
  rows: GameRow[];
  me: { xp: number; rank: number } | null;
}

const RANK_MEDALS = ["🥇", "🥈", "🥉"] as const;

export function GameLeaderboard({ book }: { book: BookId }) {
  const [game, setGame] = useState<GameKey>("memory");
  const [loaded, setLoaded] = useState<{ game: string; data: GameBoard } | null>(null);
  const [failedFor, setFailedFor] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  const selected = GAMES.find((g) => g.key === game) ?? GAMES[0]!;

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    // fetch نسبی — همان مبدأ، بدون URL مطلق
    fetch(`/api/leaderboard?book=${book}&category=${game}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((raw: unknown) => {
        if (cancelled) return;
        if (!raw) {
          setFailedFor(`${book}:${game}`);
          return;
        }
        const d = raw as Partial<GameBoard>;
        setLoaded({
          game,
          data: {
            weekStart: typeof d.weekStart === "string" ? d.weekStart : "",
            rows: Array.isArray(d.rows) ? d.rows : [],
            me: d.me ?? null,
          },
        });
        setFailedFor(null);
      })
      .catch(() => {
        if (!cancelled) setFailedFor(`${book}:${game}`);
      });
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [book, game, reloadTick]);

  const board = loaded && loaded.game === game ? loaded.data : null;
  const isFailed = failedFor === `${book}:${game}`;

  return (
    <Card className="border-border/60 bg-card/60">
      <CardContent className="space-y-4 p-4 sm:p-6">
        {/* سربرگ + خط بافت هفتگی */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
            <Swords className="size-4 text-primary" aria-hidden />
            رده‌بندی بازی‌ها
          </h3>
          <span className="ms-auto rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
            این هفته · تاپ ۱۰
          </span>
        </div>

        {/* انتخابگر بازی — ردیف چیپی افقی اسکرول‌پذیر */}
        <div
          role="group"
          aria-label="انتخاب بازی برای رده‌بندی"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          {GAMES.map((g) => (
            <button
              key={g.key}
              type="button"
              aria-pressed={game === g.key}
              onClick={() => setGame(g.key)}
              className={cn(
                "min-h-11 shrink-0 rounded-xl border px-3 text-xs font-bold transition-colors",
                game === g.key
                  ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border-border bg-background/50 text-muted-foreground hover:border-emerald-500/40 hover:text-foreground",
              )}
            >
              {g.name}
            </button>
          ))}
        </div>

        {board ? (
          board.rows.length === 0 ? (
            /* ── حالت خالی ── */
            <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center">
              <Gamepad2 className="mx-auto size-8 text-muted-foreground/60" aria-hidden />
              <p className="mt-2 text-sm font-bold text-foreground">
                هنوز کسی این هفته بازی نکرده — تو اولین باش!
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                یک دور «{selected.name}» بازی کن و اولین رکورد هفته را ثبت کن.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <ul className="space-y-2.5" aria-label={`رده‌بندی هفتگی بازی ${selected.name}`}>
                {board.rows.map((row, i) => {
                  const rank = i + 1;
                  const isMe = !!board.me && board.me.rank === rank;
                  return (
                    <li
                      key={`${row.name}-${rank}`}
                      className={cn(
                        "flex items-center gap-2 rounded-2xl border bg-background/50 px-3 py-2.5 sm:gap-3",
                        rank <= 3 && "border-amber-500/30 bg-amber-500/5",
                        isMe && "border-amber-500/50 ring-2 ring-amber-500/60",
                      )}
                    >
                      <span
                        className="w-6 shrink-0 text-center text-sm font-extrabold tabular-nums sm:w-8"
                        aria-label={`ردهٔ ${faNum(rank)}`}
                      >
                        {rank <= 3 ? (RANK_MEDALS[rank - 1] ?? "") : faNum(rank)}
                      </span>
                      {row.avatar ? (
                        <span className="hidden text-2xl leading-none sm:inline" aria-hidden>
                          {row.avatar}
                        </span>
                      ) : (
                        <span
                          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground sm:flex"
                          aria-hidden
                        >
                          <UserRound className="size-4" />
                        </span>
                      )}
                      <span className="flex min-w-0 flex-1 items-center gap-1.5">
                        <span className="truncate text-sm font-bold text-foreground">{row.name}</span>
                        {isMe && (
                          <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                            جای تو
                          </span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-center justify-end gap-x-2 text-[11px] text-muted-foreground sm:gap-x-3">
                        <span className="font-extrabold text-amber-600 dark:text-amber-400">
                          {faNum(row.xp)} XP
                        </span>
                        <span>بهترین {faNum(row.bestScore ?? 0)}</span>
                        <span>دقت {faNum(Math.round(row.accuracy))}٪</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* «جای تو» خارج از ۱۰ برتر — کارت چسبان محترمانه، بدون تحقیر */}
              {board.me && board.me.rank === 0 && (
                <div className="sticky bottom-2 z-10 flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-card px-3 py-2.5 text-xs font-bold text-amber-700 shadow-sm dark:text-amber-400">
                  <Gamepad2 className="size-3.5 shrink-0" aria-hidden />
                  <span>
                    جای تو — امتیاز این هفته: {faNum(board.me.xp)} · به ۱۰ برتر نرسیدی
                  </span>
                </div>
              )}

              <p className="flex items-start gap-1.5 pt-1 text-[11px] leading-5 text-muted-foreground">
                <Swords className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                تاپ ۱۰ بازی «{selected.name}» از شنبهٔ همین هفته — XP هر دور = پاسخ درست ×۱۰ + ۲۵.
              </p>
            </div>
          )
        ) : isFailed ? (
          /* ── خطا با تلاش دوباره ── */
          <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center">
            <p className="text-sm font-bold text-foreground">
              🎮 رده‌بندی همین حالا در دسترس نیست — بعداً دوباره امتحان کن.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 min-h-11 rounded-xl text-xs font-bold"
              onClick={() => setReloadTick((t) => t + 1)}
            >
              <RefreshCw className="size-3.5" aria-hidden />
              دوباره تلاش کن
            </Button>
          </div>
        ) : (
          /* ── اسکلت بارگذاری ── */
          <div className="space-y-3" aria-label="در حال بارگذاری رده‌بندی بازی" aria-busy="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
