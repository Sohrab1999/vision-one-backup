"use client";

/**
 * نمای «جایزه‌ها» — فاز ۶ نقشه راه جامع ۲۰۲۶ (گیمیفیکیشن).
 *
 * بخش‌ها:
 *  ۱) کارت خلاصه: حلقهٔ سطح (SVG) + سکه/زنجیره/یخ + سقف روزانهٔ XP
 *  ۲) ماموریت‌های امروز (۳ کوئست روزانه با claim دستی)
 *  ۳) تب‌ها: نشان‌ها | فروشگاه (تم‌های رنگی + آواتار + یخ زنجیره) | رده‌بندی هفتگی | بازی‌ها (G4-01)
 *
 * - همهٔ اعداد کاربر-رو با faNum؛ پالت فقط emerald/amber/teal + توکن‌های معنایی.
 * - claim/خرید فقط از callbackهای رویدادی؛ fetch رده‌بندی با AbortController
 *   و setState فقط داخل پرامیس (سازگار با react-hooks v6).
 */

import { useEffect, useState } from "react";
import {
  Check,
  Gift,
  Info,
  Medal,
  Palette,
  Snowflake,
  Sparkles,
  Store,
  Swords,
  Trophy,
  UserRound,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { faNum } from "@/components/book/games/shared";
import { useXp, levelInfo, spendCoins, DAILY_CAP } from "@/lib/xp-store";
import { useMissions, claimMission } from "@/lib/mission-store";
import type { MissionView } from "@/lib/mission-store";
import { BADGES, useBadges } from "@/lib/badge-store";
import type { BadgeDef } from "@/lib/badge-store";
import { useStreak, grantFreeze } from "@/lib/streak-store";
import {
  ACCENTS,
  PREMIUM_AVATARS,
  useAccent,
  accentOwned,
  applyAccent,
  markOwned,
  equipAvatar,
} from "@/lib/accent-store";
import type { AccentTheme } from "@/lib/accent-store";
import { useBook } from "@/lib/book-context";
import { SuggestionBoard } from "./suggestion-board";
import { GameLeaderboard } from "./game-leaderboard";

// ─── قرارداد API رده‌بندی هفتگی: GET /api/leaderboard?book={bookId} ───

interface LeaderRow {
  name: string;
  avatar: string | null;
  xp: number;
  quizzes: number;
  answered: number;
  accuracy: number;
}

interface BoardData {
  weekStart: string;
  rows: LeaderRow[];
  me: { xp: number; rank: number } | null;
}

const RANK_MEDALS = ["🥇", "🥈", "🥉"] as const;
const FREEZE_PRICE = 30;
const FREEZE_MAX = 7;

// ─── حلقهٔ سطح (SVG با stroke-dasharray) ───

function LevelRing({ level, pct }: { level: number; pct: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const safe = Math.min(100, Math.max(0, pct));
  const offset = C - (safe / 100) * C;
  return (
    <div
      className="relative h-36 w-36 shrink-0"
      role="img"
      aria-label={`سطح ${faNum(level)} — پیشرفت ${faNum(safe)} درصد`}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={R} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black tabular-nums text-foreground">{faNum(level)}</span>
        <span className="text-[11px] text-muted-foreground">سطح</span>
      </div>
    </div>
  );
}

// ─── ردیف ماموریت امروز ───

function MissionRow({ q }: { q: MissionView }) {
  const pct = q.def.target > 0 ? Math.min(100, Math.round((q.progress / q.def.target) * 100)) : 0;
  return (
    <div className="rounded-2xl border bg-background/50 p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl leading-none" aria-hidden>
          {q.def.emoji}
        </span>
        <span className="text-sm font-bold text-foreground">{q.def.title}</span>
        <span
          className="ms-auto text-xs font-extrabold text-amber-600 dark:text-amber-400"
          aria-label={`جایزه: ${faNum(q.def.xp)} ام‌پی و ${faNum(q.def.coins)} سکه`}
        >
          +{faNum(q.def.xp)} XP، +{faNum(q.def.coins)} 🪙
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Progress
          value={pct}
          className="h-2 flex-1"
          aria-label={`پیشرفت ${q.def.title}: ${faNum(q.progress)} از ${faNum(q.def.target)}`}
        />
        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {faNum(q.progress)} / {faNum(q.def.target)}
        </span>
      </div>
      <div className="mt-3 flex items-center">
        {q.claimed ? (
          <Badge
            variant="outline"
            className="border-muted-foreground/30 text-[11px] text-muted-foreground"
          >
            گرفته شد ✓
          </Badge>
        ) : (
          <Button
            size="sm"
            className="min-h-11 gap-1.5 rounded-xl px-4 text-xs font-bold"
            disabled={!q.done}
            onClick={() => claimMission(q.id)}
          >
            <Gift className="size-4" aria-hidden />
            {q.done ? "گرفتن جایزه" : "در حال انجام…"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── کارت نشان ───

function BadgeCard({ def, unlocked }: { def: BadgeDef; unlocked: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-card/60 p-4 text-center transition-colors",
        unlocked ? "border-amber-500/40 bg-amber-500/5" : "opacity-60",
      )}
      aria-label={`${def.title} — ${unlocked ? "باز شده" : "قفل"}`}
    >
      <div className={cn("text-4xl", !unlocked && "grayscale")} aria-hidden>
        {def.emoji}
      </div>
      <div className="mt-2 text-sm font-extrabold text-foreground">{def.title}</div>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{def.desc}</p>
      <div className="mt-3">
        {unlocked ? (
          <>
            <Badge
              variant="outline"
              className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400"
            >
              🔓 باز شده
            </Badge>
            <div className="mt-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              +{faNum(def.coins)} 🪙
            </div>
          </>
        ) : (
          <Badge variant="outline" className="text-[10px] text-muted-foreground">
            🔒 +{faNum(def.coins)} 🪙
          </Badge>
        )}
      </div>
    </div>
  );
}

// ─── کارت تم رنگی فروشگاه ───

function ThemeCard({
  theme,
  active,
  owned,
  onBuy,
  onApply,
}: {
  theme: AccentTheme;
  active: boolean;
  owned: boolean;
  onBuy: () => void;
  onApply: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border bg-background/50 p-3 transition-colors",
        active && "border-primary/50 bg-primary/5",
      )}
    >
      <span
        className="h-9 w-9 shrink-0 rounded-full border border-foreground/10 shadow-inner"
        style={{ backgroundColor: theme.swatch }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-foreground">{theme.title}</div>
        <div className="text-[11px] text-muted-foreground">
          {theme.price === 0 ? "رایگان" : `${faNum(theme.price)} 🪙`}
        </div>
      </div>
      {active ? (
        <Badge
          variant="outline"
          className="shrink-0 border-primary/40 text-[10px] text-primary"
          aria-label={`${theme.title} — تم فعال`}
        >
          فعال
        </Badge>
      ) : owned ? (
        <Button
          size="sm"
          variant="outline"
          className="min-h-11 shrink-0 rounded-xl px-3 text-xs font-bold"
          onClick={onApply}
        >
          فعال‌سازی
        </Button>
      ) : (
        <Button
          size="sm"
          className="min-h-11 shrink-0 rounded-xl bg-amber-500 px-3 text-xs font-bold text-amber-950 hover:bg-amber-600 dark:text-amber-950"
          onClick={onBuy}
          aria-label={`خرید تم ${theme.title} به قیمت ${faNum(theme.price)} سکه`}
        >
          خرید {faNum(theme.price)} 🪙
        </Button>
      )}
    </div>
  );
}

// ─── کارت آواتار ویژه ───

function AvatarCard({
  av,
  owned,
  equipped,
  onBuy,
  onEquip,
}: {
  av: { id: string; emoji: string; price: number };
  owned: boolean;
  equipped: boolean;
  onBuy: () => void;
  onEquip: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border bg-background/50 p-4 text-center transition-colors",
        equipped && "border-primary/50 bg-primary/5",
      )}
    >
      <div className="text-4xl" aria-hidden>
        {av.emoji}
      </div>
      {equipped ? (
        <Badge
          variant="outline"
          className="gap-1 border-primary/40 text-[10px] text-primary"
          aria-label="این آواتار انتخاب شده است"
        >
          <Check className="size-3" aria-hidden />
          پوشیده
        </Badge>
      ) : (
        <div className="text-[11px] text-muted-foreground">{faNum(av.price)} 🪙</div>
      )}
      {owned ? (
        <Button
          size="sm"
          variant={equipped ? "outline" : "secondary"}
          className="min-h-11 w-full rounded-xl text-xs font-bold"
          disabled={equipped}
          onClick={onEquip}
        >
          {equipped ? "انتخاب‌شده" : "انتخاب"}
        </Button>
      ) : (
        <Button
          size="sm"
          className="min-h-11 w-full rounded-xl bg-amber-500 text-xs font-bold text-amber-950 hover:bg-amber-600 dark:text-amber-950"
          onClick={onBuy}
          aria-label={`خرید آواتار ${faNum(av.price)} سکه‌ای`}
        >
          خرید {faNum(av.price)} 🪙
        </Button>
      )}
    </div>
  );
}

// ─── بخش رده‌بندی هفتگی (fetch + skeleton) ───

function LeaderboardSection() {
  const { bookId } = useBook();
  const [loaded, setLoaded] = useState<{ bookId: string; data: BoardData } | null>(null);
  const [failedFor, setFailedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;
    let cancelled = false;
    const ctrl = new AbortController();
    fetch(`/api/leaderboard?book=${bookId}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((raw: unknown) => {
        if (cancelled || !raw) return;
        const d = raw as Partial<BoardData>;
        setLoaded({
          bookId,
          data: {
            weekStart: typeof d.weekStart === "string" ? d.weekStart : "",
            rows: Array.isArray(d.rows) ? d.rows : [],
            me: d.me ?? null,
          },
        });
        setFailedFor(null);
      })
      .catch(() => {
        if (!cancelled) setFailedFor(bookId);
      });
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [bookId]);

  const board = loaded && loaded.bookId === bookId ? loaded.data : null;
  const isFailed = bookId !== null && failedFor === bookId;

  if (!bookId) {
    return (
      <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center text-sm text-muted-foreground">
        📚 برای دیدن رده‌بندی هفتگی، یک جزوه را از قفسه باز کن.
      </div>
    );
  }

  if (!board) {
    if (isFailed) {
      return (
        <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center text-sm text-muted-foreground">
          🌱 رده‌بندی همین حالا در دسترس نیست — بعداً دوباره امتحان کن.
        </div>
      );
    }
    return (
      <div className="space-y-3" aria-label="در حال بارگذاری رده‌بندی" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (board.rows.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center">
        <div className="text-3xl" aria-hidden>
          🌱
        </div>
        <p className="mt-2 text-sm font-bold text-foreground">
          هنوز این هفته کسی امتیاز نگرفته — تو اولین باش!
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          با آزمون و بازی امتیاز جمع کن و از شنبه بالای جدول بایست.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {board.me && (
        <div className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-700 dark:text-amber-400">
          <Trophy className="size-3.5 shrink-0" aria-hidden />
          <span>
            جای تو در این هفته: ردهٔ {faNum(board.me.rank)} با {faNum(board.me.xp)} XP
          </span>
        </div>
      )}
      <ul className="space-y-2.5" aria-label="جدول رده‌بندی هفتگی">
        {board.rows.map((row, i) => {
          const rank = i + 1;
          return (
            <li
              key={`${row.name}-${rank}`}
              className={cn(
                "flex flex-wrap items-center gap-3 rounded-2xl border bg-background/50 px-3 py-2.5",
                rank <= 3 && "border-amber-500/30 bg-amber-500/5",
              )}
            >
              <span
                className="w-8 shrink-0 text-center text-sm font-extrabold tabular-nums"
                aria-label={`ردهٔ ${faNum(rank)}`}
              >
                {rank <= 3 ? (RANK_MEDALS[rank - 1] ?? "") : faNum(rank)}
              </span>
              {row.avatar ? (
                <span className="text-2xl leading-none" aria-hidden>
                  {row.avatar}
                </span>
              ) : (
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                  aria-hidden
                >
                  <UserRound className="size-4" />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-foreground">
                {row.name}
              </span>
              <span className="flex flex-wrap items-center justify-end gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                <span className="font-extrabold text-amber-600 dark:text-amber-400">
                  {faNum(row.xp)} XP
                </span>
                <span>دقت {faNum(Math.round(row.accuracy))}٪</span>
                <span>{faNum(row.quizzes)} آزمون</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="flex items-start gap-1.5 pt-1 text-[11px] leading-5 text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        رده‌بندی دوستانهٔ هفتهٔ جاری (از شنبه) — XP از آزمون‌ها و بازی‌های همین جزوه.
      </p>
    </div>
  );
}

// ─── نمای اصلی جایزه‌ها ───

export function RewardsView() {
  const xp = useXp();
  const lvl = levelInfo(xp.total);
  const streak = useStreak();
  const missions = useMissions();
  const badges = useBadges();
  const { accent, shop } = useAccent();
  const { bookId } = useBook(); // G4-01 — کتاب فعال برای رده‌بندی بازی‌ها

  const allClaimed = missions.quests.length > 0 && missions.quests.every((q) => q.claimed);
  const dayPct = Math.min(100, Math.round((xp.dayXp / DAILY_CAP) * 100));

  // ── handlerهای فروشگاه (فقط callback رویدادی) ──

  const buyTheme = (id: string, price: number) => {
    const ok = spendCoins(price, `theme:${id}`);
    if (ok) {
      markOwned(`theme:${id}`);
      applyAccent(id);
      toast.success("تم تازه فعال شد!");
    } else {
      toast.error("سکه کافی نداری");
    }
  };

  const buyAvatar = (id: string, price: number) => {
    const ok = spendCoins(price, id);
    if (ok) {
      markOwned(id);
      toast.success("آواتار تازه به کمدت اضافه شد!", {
        description: "حالا می‌توانی انتخابش کنی",
      });
    } else {
      toast.error("سکه کافی نداری");
    }
  };

  const buyFreeze = () => {
    if (streak.freezes >= FREEZE_MAX) return;
    const ok = spendCoins(FREEZE_PRICE, "streak-freeze");
    if (ok) {
      grantFreeze();
      toast.success("❄ یخ به انبار زنجیره اضافه شد", {
        description: "یک روز غیبت را جبران می‌کند",
      });
    } else {
      toast.error("سکه کافی نداری");
    }
  };

  return (
    <section aria-label="جایزه‌ها" className="mx-auto w-full max-w-4xl space-y-5">
      {/* ── سربرگ نما ── */}
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-black sm:text-xl">🏆 جایزه‌ها</h2>
        <Badge
          variant="outline"
          className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400"
        >
          فاز ۶
        </Badge>
        <p className="w-full text-xs text-muted-foreground">
          سطح، زنجیره، ماموریت روزانه و فروشگاه
        </p>
      </header>

      {/* ── بخش ۱: کارت خلاصه ── */}
      <Card className="rise-in overflow-hidden border-primary/20 bg-gradient-to-bl from-primary/10 via-card to-card">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex flex-col items-center gap-2">
              <LevelRing level={lvl.level} pct={lvl.pct} />
              <div className="text-center">
                <div className="text-sm font-extrabold tabular-nums text-foreground">
                  {faNum(lvl.inLevel)} / {faNum(lvl.need)} XP
                </div>
                <Progress
                  value={lvl.pct}
                  className="mt-2 h-2 w-44"
                  aria-label={`پیشرفت سطح ${faNum(lvl.level)}: ${faNum(lvl.pct)} درصد`}
                />
              </div>
            </div>
            <div className="w-full flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm">
                  <span aria-hidden>🪙</span>
                  <span
                    className="font-extrabold tabular-nums text-amber-700 dark:text-amber-400"
                    aria-label={`سکه: ${faNum(xp.coins)}`}
                  >
                    {faNum(xp.coins)}
                  </span>
                  <span className="text-xs text-muted-foreground">سکه</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border bg-background/60 px-3 py-2 text-sm">
                  <span aria-hidden>🔥</span>
                  <span
                    className="font-extrabold tabular-nums text-foreground"
                    aria-label={`زنجیرهٔ فعلی: ${faNum(streak.count)} روز`}
                  >
                    {faNum(streak.count)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    روز زنجیره · بهترین: {faNum(streak.best)}
                  </span>
                  {streak.freezes > 0 && (
                    <span
                      className="rounded-lg bg-teal-500/15 px-1.5 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-400"
                      aria-label={`یخ در انبار: ${faNum(streak.freezes)}`}
                    >
                      ❄ ×{faNum(streak.freezes)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 rounded-2xl border bg-background/60 px-3 py-2 text-sm">
                  <span aria-hidden>✨</span>
                  <span
                    className="font-extrabold tabular-nums text-foreground"
                    aria-label={`مجموع تجربه: ${faNum(xp.total)}`}
                  >
                    {faNum(xp.total)}
                  </span>
                  <span className="text-xs text-muted-foreground">XP کل</span>
                </div>
              </div>
              <div className="rounded-2xl border bg-background/50 p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-foreground">سقف روزانهٔ XP</span>
                  <span className="tabular-nums text-muted-foreground">
                    {faNum(xp.dayXp)} / {faNum(DAILY_CAP)}
                  </span>
                </div>
                <Progress
                  value={dayPct}
                  className="mt-2 h-2"
                  aria-label={`XP امروز: ${faNum(xp.dayXp)} از ${faNum(DAILY_CAP)}`}
                />
                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  بعد از سقف، XP تکرار سریع کمانه‌ای می‌شود — ارزش هر تکرار کم می‌شود.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── بخش ۲: ماموریت‌های امروز ── */}
      <Card className="border-border/60 bg-card/60">
        <CardContent className="space-y-3 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-foreground">🎯 ماموریت‌های امروز</h3>
            <Badge variant="outline" className="ms-auto text-[10px] text-muted-foreground">
              ۳ مأموریت روزانه
            </Badge>
          </div>
          <div className="space-y-3">
            {missions.quests.map((q) => (
              <MissionRow key={q.id} q={q} />
            ))}
          </div>
          {allClaimed && (
            <div className="flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-bold leading-6 text-amber-700 dark:text-amber-400">
              <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>امروز همهٔ ماموریت‌ها را گرفتی! فردا ۳ مأموریت تازه می‌آید.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── بخش ۳: تب‌های نشان‌ها / فروشگاه / رده‌بندی / بازی‌ها ── */}
      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges" className="min-h-11 gap-1.5 text-xs sm:text-sm">
            <Medal className="size-4" aria-hidden />
            نشان‌ها
          </TabsTrigger>
          <TabsTrigger value="shop" className="min-h-11 gap-1.5 text-xs sm:text-sm">
            <Store className="size-4" aria-hidden />
            فروشگاه
          </TabsTrigger>
          <TabsTrigger value="board" className="min-h-11 gap-1.5 text-xs sm:text-sm">
            <Trophy className="size-4" aria-hidden />
            {/* نسخهٔ کوتاه موبایل — جا برای تب چهارم در ۳۹۰px */}
            <span className="sm:hidden">رده‌بندی</span>
            <span className="hidden sm:inline">رده‌بندی هفتگی</span>
          </TabsTrigger>
          <TabsTrigger value="games" className="min-h-11 gap-1.5 text-xs sm:text-sm">
            <Swords className="size-4" aria-hidden />
            بازی‌ها
          </TabsTrigger>
        </TabsList>

        {/* ── تب نشان‌ها ── */}
        <TabsContent value="badges" className="mt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BADGES.map((b) => (
              <BadgeCard key={b.id} def={b} unlocked={typeof badges[b.id] === "number"} />
            ))}
          </div>
          <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            نشان‌ها خودکار و با پیشرفت واقعی تو باز می‌شوند — هر نشان سکهٔ جایزه دارد.
          </p>
        </TabsContent>

        {/* ── تب فروشگاه ── */}
        <TabsContent value="shop" className="mt-4">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="space-y-4 p-4 sm:p-6">
              {/* الف) تم‌های رنگی */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                  <Palette className="size-4 text-primary" aria-hidden />
                  تم‌های رنگی
                </h3>
                <span className="ms-auto text-[11px] text-muted-foreground">
                  رنگ اصلی کل اپ عوض می‌شود
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ACCENTS.map((a) => {
                  const owned = accentOwned(a.id);
                  const active = accent === a.id;
                  return (
                    <ThemeCard
                      key={a.id}
                      theme={a}
                      active={active}
                      owned={owned}
                      onBuy={() => buyTheme(a.id, a.price)}
                      onApply={() => applyAccent(a.id)}
                    />
                  );
                })}
              </div>

              <Separator />

              {/* ب) آواتارهای ویژه */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-extrabold text-foreground">🎭 آواتارهای ویژه</h3>
                <span className="ms-auto text-[11px] text-muted-foreground">
                  آواتار در رده‌بندی هفتگی نمایش داده می‌شود
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PREMIUM_AVATARS.map((av) => {
                  const owned = shop.owned.includes(av.id);
                  const equipped = shop.equippedAvatar === av.id;
                  return (
                    <AvatarCard
                      key={av.id}
                      av={av}
                      owned={owned}
                      equipped={equipped}
                      onBuy={() => buyAvatar(av.id, av.price)}
                      onEquip={() => equipAvatar(av.id)}
                    />
                  );
                })}
              </div>

              <Separator />

              {/* ب) یخ‌زنندهٔ زنجیره */}
              <div className="flex flex-col gap-3 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-4 sm:flex-row sm:items-center">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400"
                  aria-hidden
                >
                  <Snowflake className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold text-foreground">یخ‌زنندهٔ زنجیره</div>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    یک روز غیبت را جبران می‌کند (بیشینهٔ {faNum(FREEZE_MAX)}) — زنجیره‌ات ذوب
                    نمی‌شود.
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                  <span
                    className="text-xs font-bold text-teal-700 dark:text-teal-400"
                    aria-label={`انبار یخ: ${faNum(streak.freezes)} از ${faNum(FREEZE_MAX)}`}
                  >
                    انبار: {faNum(streak.freezes)}/{faNum(FREEZE_MAX)}
                  </span>
                  <Button
                    size="sm"
                    className="min-h-11 rounded-xl bg-teal-600 px-4 text-xs font-bold text-white hover:bg-teal-700 dark:text-white"
                    disabled={streak.freezes >= FREEZE_MAX}
                    onClick={buyFreeze}
                  >
                    {streak.freezes >= FREEZE_MAX ? "انبار پر است" : `خرید ${faNum(FREEZE_PRICE)} 🪙`}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── تب رده‌بندی هفتگی ── */}
        <TabsContent value="board" className="mt-4">
          <LeaderboardSection />
        </TabsContent>

        {/* ── تب رده‌بندی بازی‌ها (G4-01) ── */}
        <TabsContent value="games" className="mt-4">
          {bookId ? (
            <GameLeaderboard book={bookId} />
          ) : (
            <div className="rounded-3xl border border-dashed bg-card/40 p-8 text-center text-sm text-muted-foreground">
              🎮 برای دیدن رده‌بندی بازی‌ها، یک جزوه را از قفسه باز کن.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* تخته پیشنهادها (فاز ۱۲) — انتهای نمای جایزه‌ها */}
      <SuggestionBoard />
    </section>
  );
}
