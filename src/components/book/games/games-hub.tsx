"use client";

/**
 * آزمایشگاه بازی‌های فکری — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * پنج بازی واژگانی روی بانک واژه/تست خود جزوه فعال:
 * تطبیق حافظه · حروف جابه‌جا · جای خالی · شکار کلمه · تست برقی
 * امتیاز همه بازی‌ها در مدل Attempt ثبت می‌شود (category = نام بازی)
 * و رکوردهای شخصی در localStorage با کتاب/محدوده اسکوپ می‌شوند.
 */

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  Gamepad2,
  LayoutGrid,
  Shuffle,
  PencilLine,
  Search,
  Zap,
  ArrowRight,
  Trophy,
  Sparkles,
  Bird,
  Dices,
  Grid3x3,
  SpellCheck2,
  Blocks,
  Brain,
  Swords,
  Headphones,
  Compass,
  Crosshair,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import { faNum, getPlays, subscribeGameData, fmtTime } from "./shared";

/**
 * فاز G0-03 نقشه راه بازی‌ها — هر بازی در چانک جدا و lazy است؛
 * صفر تأثیر روی باندل اولیهٔ صفحهٔ اصلی (بازی‌ها فقط هنگام انتخاب چانکشان می‌آید
 * و به‌محض باز شدن آزمایشگاه در زمان بیکاری مرورگر پیش‌بارگذاری می‌شوند).
 */
function GameChunkLoading() {
  return (
    <Card>
      <CardContent className="flex h-64 items-center justify-center gap-3 p-6 text-sm text-muted-foreground">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        در حال آماده‌سازی بازی…
      </CardContent>
    </Card>
  );
}

const MemoryGame = dynamic(() => import("./memory-game").then((m) => m.MemoryGame), { ssr: false, loading: GameChunkLoading });
const ScrambleGame = dynamic(() => import("./scramble-game").then((m) => m.ScrambleGame), { ssr: false, loading: GameChunkLoading });
const ClozeGame = dynamic(() => import("./cloze-game").then((m) => m.ClozeGame), { ssr: false, loading: GameChunkLoading });
const WordSearchGame = dynamic(() => import("./wordsearch-game").then((m) => m.WordSearchGame), { ssr: false, loading: GameChunkLoading });
const SpeedQuizGame = dynamic(() => import("./speed-quiz-game").then((m) => m.SpeedQuizGame), { ssr: false, loading: GameChunkLoading });
const FlappyQuizGame = dynamic(() => import("./flappy-quiz-game").then((m) => m.FlappyQuizGame), { ssr: false, loading: GameChunkLoading });
const SnakesLaddersGame = dynamic(() => import("./snakes-ladders-game").then((m) => m.SnakesLaddersGame), { ssr: false, loading: GameChunkLoading });
const CrosswordGame = dynamic(() => import("./crossword-game").then((m) => m.CrosswordGame), { ssr: false, loading: GameChunkLoading });
const WordleGame = dynamic(() => import("./wordle-game").then((m) => m.WordleGame), { ssr: false, loading: GameChunkLoading });
const HangmanGame = dynamic(() => import("./hangman-game").then((m) => m.HangmanGame), { ssr: false, loading: GameChunkLoading });
const SentenceBuilderGame = dynamic(() => import("./sentence-builder-game").then((m) => m.SentenceBuilderGame), { ssr: false, loading: GameChunkLoading });
const DuelGame = dynamic(() => import("./duel-game").then((m) => m.DuelGame), { ssr: false, loading: GameChunkLoading });
const ListeningHuntGame = dynamic(() => import("./listening-hunt-game").then((m) => m.ListeningHuntGame), { ssr: false, loading: GameChunkLoading });
const AdventureMapGame = dynamic(() => import("./adventure-map-game").then((m) => m.AdventureMapGame), { ssr: false, loading: GameChunkLoading });

// بازی فاز ۵ — موتور سه‌بعدی (three + R3F) در چانک جدا و lazy
const FpsShooterGame = dynamic(() => import("./fps-shooter-game").then((m) => m.FpsShooterGame), {
  ssr: false,
  loading: GameChunkLoading,
});

export type GameKey =
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
  | "listening-hunt"
  | "adventure-map"
  | "fps-shooter";

interface GameInfo {
  key: GameKey;
  name: string;
  desc: string;
  icon: LucideIcon;
  /** کلاس رنگ مربع آیکون — فقط emerald/amber/teal */
  tile: string;
}

const GAMES: GameInfo[] = [
  {
    key: "memory",
    name: "تطبیق حافظه",
    desc: "کارت‌ها رو به پایین‌اند؛ هر واژه انگلیسی و معنی فارسی‌اش را جفت کن — کمترین حرکت و زمان!",
    icon: LayoutGrid,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "scramble",
    name: "حروف جابه‌جا",
    desc: "حروف واژه به‌هم ریخته‌اند؛ با معنی فارسی حدس بزن و حروف را سر جای خودشان بچین.",
    icon: Shuffle,
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "cloze",
    name: "جای خالی",
    desc: "جمله‌های خود متن‌ها و مکالمه‌های کتاب با جای خالی؛ واژه درست را از سه گزینه انتخاب کن.",
    icon: PencilLine,
    tile: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  },
  {
    key: "word-search",
    name: "شکار کلمه",
    desc: "واژه‌های درس در جدول حروف پنهان شده‌اند؛ با معنی فارسی دنبالشان بگرد و پیدا کن.",
    icon: Search,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "speed-quiz",
    name: "تست برقی",
    desc: "۶۰ ثانیه فرصت داری! پاسخ پیاپی درست کمبو می‌سازد و امتیازت را ×۲ و ×۳ می‌کند.",
    icon: Zap,
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
];

/** بازی‌های فاز ۴ نقشه راه ۲۰۲۶ — ماجراجویی، سرعت و مهارت */
const GAMES_EXTRA: GameInfo[] = [
  {
    key: "flappy-quiz",
    name: "فلپی گزینش",
    desc: "پرنده را در پرواز نگه دار و دقیقاً از دروازهٔ گزینهٔ درست عبور کن — کمبو سرعت را بیشتر می‌کند!",
    icon: Bird,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "snakes-ladders",
    name: "مار و پله واژگانی",
    desc: "تخته کلاسیک ۱۰۰ خانه؛ برای تاس انداختن سؤال را درست جواب بده — ۲ تا ۴ نفر یا مقابل ربات.",
    icon: Dices,
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "crossword",
    name: "جدول متقاطع",
    desc: "جدول از واژگان خود درس ساخته می‌شود؛ با سرنخ فارسی، حرف‌به‌حرف پر کن.",
    icon: Grid3x3,
    tile: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  },
  {
    key: "wordle",
    name: "وردل ویژن",
    desc: "واژهٔ ۵ حرفی را در ۶ فرصت حدس بزن؛ رنگ حرف‌ها راهنمایت است — حالت روزانه و بی‌نهایت.",
    icon: SpellCheck2,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "hangman",
    name: "دارباز",
    desc: "با راهنمای معنی فارسی، حرف‌به‌حرف واژه را پیدا کن؛ هر خطا یک بادکنک می‌ترکد!",
    icon: Brain,
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "sentence-builder",
    name: "سازنده جمله",
    desc: "کلمات جمله‌های کتاب به‌هم ریخته‌اند؛ با راهنمای ترجمه، ترتیب را درست بچین.",
    icon: Blocks,
    tile: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  },
  {
    key: "duel",
    name: "دوئل دونفره",
    desc: "صفحه دو نیمه می‌شود؛ دو بازیکن هم‌زمان به سؤال‌های یکسان جواب می‌دهند — برنده دور زیادتر!",
    icon: Swords,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "listening-hunt",
    name: "شکار صدا",
    desc: "کلمه را فقط گوش کن و معنی درست را از بین ۴ گزینه شکار کن — تمرین شنیداری خالص.",
    icon: Headphones,
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "adventure-map",
    name: "نقشه ماجراجویی",
    desc: "مسیر ۸ مرحله‌ای با ۴ نوع مینی‌بازی؛ هر مرحله تا ۳ ستاره — نقشه با تو پیش می‌رود!",
    icon: Compass,
    tile: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  },
  {
    key: "fps-shooter",
    name: "شوتر آموزشی",
    desc: "میدان سه‌بعدی low-poly؛ سؤال روی HUD و گزینه‌ها روی اهداف متحرک — به درست شلیک کن!",
    icon: Crosshair,
    tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
];

/**
 * فاز G0-02 — کش رکوردها: یک اسکن localStorage به‌ازای هر رویداد تغییر، نه هر رندر.
 * (قبلاً getSnapshot در هر رندرِ هر کارت، کل localStorage را خطی می‌گشت)
 */
const bestLabelCache = new Map<string, string | null>();

function bestLabelOf(bookId: string, game: GameKey): string | null {
  const cacheKey = `${bookId}:${game}`;
  if (bestLabelCache.has(cacheKey)) return bestLabelCache.get(cacheKey)!;
  let label: string | null = null;
  try {
    let bestScore = -1;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(`visionone:game-best:${bookId}:${game}:`)) continue;
      const v = JSON.parse(localStorage.getItem(k) ?? "null") as { score?: number; time?: number; moves?: number } | null;
      if (!v) continue;
      // حرکت کمتر = بهتر (حافظه)؛ زمان کمتر = بهتر (سرعتی)؛ امتیاز بیشتر = بهتر
      const s = typeof v.score === "number" ? v.score : typeof v.moves === "number" ? -v.moves : typeof v.time === "number" ? -v.time : -1;
      if (s > bestScore) {
        bestScore = s;
        if (typeof v.score === "number") label = `${faNum(v.score)} امتیاز`;
        else if (typeof v.moves === "number") label = `${faNum(v.moves)} حرکت`;
        else if (typeof v.time === "number") label = fmtTime(v.time);
      }
    }
  } catch {
    label = null;
  }
  bestLabelCache.set(cacheKey, label);
  return label;
}

function subscribeBestData(cb: () => void): () => void {
  bestLabelCache.clear();
  return subscribeGameData(() => {
    bestLabelCache.clear();
    cb();
  });
}

/** خلاصه رکورد برای نشان روی کارت هر بازی — per-game scope "any" نمایشی است */
function BestBadge({ game }: { game: GameKey }) {
  const { bookId } = useBook();
  const best = useSyncExternalStore(
    subscribeBestData,
    () => bestLabelOf(bookId ?? "", game),
    () => null,
  );
  if (!best) return null;
  return (
    <Badge variant="outline" className="gap-1 border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
      <Trophy size={10} />
      {best}
    </Badge>
  );
}

export function GamesHub() {
  const data = useBookData();
  const { bookId } = useBook();
  const [active, setActive] = useState<GameKey | null>(null);

  // فاز G0-03 — پیش‌بارگذاری چانک بازی‌ها در زمان بیکاری مرورگر، فقط وقتی آزمایشگاه باز است
  useEffect(() => {
    if (active) return;
    const idle = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const preload = () => {
      void import("./memory-game");
      void import("./scramble-game");
      void import("./cloze-game");
      void import("./wordsearch-game");
      void import("./speed-quiz-game");
      void import("./flappy-quiz-game");
      void import("./snakes-ladders-game");
      void import("./crossword-game");
      void import("./wordle-game");
      void import("./hangman-game");
      void import("./sentence-builder-game");
      void import("./duel-game");
      void import("./listening-hunt-game");
      void import("./adventure-map-game");
      void import("./fps-shooter-game");
    };
    let id: number | ReturnType<typeof setTimeout>;
    if (typeof idle.requestIdleCallback === "function") {
      id = idle.requestIdleCallback(preload);
    } else {
      id = setTimeout(preload, 1200);
    }
    return () => {
      if (typeof idle.cancelIdleCallback === "function" && typeof id === "number") {
        idle.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [active]);

  // شمارنده دورهای بازی‌شده — اسنپ‌شات رشته‌ای (پایدار و کَش‌شونده برای useSyncExternalStore)
  const playsJson = useSyncExternalStore(
    subscribeGameData,
    () => JSON.stringify(getPlays(bookId ?? "")),
    () => "{}",
  );
  const plays = useMemo(() => JSON.parse(playsJson) as Record<string, number>, [playsJson]);
  const totalPlays = Object.values(plays).reduce((a, b) => a + b, 0);

  if (active) {
    const info = [...GAMES, ...GAMES_EXTRA].find((g) => g.key === active)!;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-1.5 text-[12px]"
            onClick={() => setActive(null)}
          >
            <ArrowRight size={15} />
            آزمایشگاه
          </Button>
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", info.tile)}>
              <info.icon size={18} />
            </span>
            <h2 className="truncate text-base font-black">{info.name}</h2>
          </div>
        </div>
        {active === "memory" && <MemoryGame />}
        {active === "scramble" && <ScrambleGame />}
        {active === "cloze" && <ClozeGame />}
        {active === "word-search" && <WordSearchGame />}
        {active === "speed-quiz" && <SpeedQuizGame />}
        {active === "flappy-quiz" && <FlappyQuizGame />}
        {active === "snakes-ladders" && <SnakesLaddersGame />}
        {active === "crossword" && <CrosswordGame />}
        {active === "wordle" && <WordleGame />}
        {active === "hangman" && <HangmanGame />}
        {active === "sentence-builder" && <SentenceBuilderGame />}
        {active === "duel" && <DuelGame />}
        {active === "listening-hunt" && <ListeningHuntGame />}
        {active === "adventure-map" && <AdventureMapGame />}
        {active === "fps-shooter" && <FpsShooterGame />}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-5" aria-label="آزمایشگاه بازی‌های فکری">
      {/* سربرگ */}
      <Card className="rise-in overflow-hidden border-primary/20 bg-gradient-to-bl from-primary/10 via-card to-card">
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-md shadow-primary/15">
              <Gamepad2 size={26} />
            </span>
            <div>
              <h1 className="text-lg font-black sm:text-xl">آزمایشگاه بازی‌های فکری</h1>
              <p className="text-xs text-muted-foreground">
                واژه‌های «{data.info.title}» را با بازی تثبیت کن — هر بازی در آمارت ثبت می‌شود.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Gamepad2 size={11} />
              {totalPlays > 0 ? `${faNum(totalPlays)} دور بازی` : "هنوز بازی نکردی!"}
            </Badge>
            <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] text-amber-600 dark:text-amber-400">
              <Sparkles size={11} />
              ۱۵ بازی واژگانی و مهارتی
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* کارت بازی‌ها */}
      <div className="grid gap-3 sm:grid-cols-2">
        {[...GAMES, ...GAMES_EXTRA].map((g, i) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setActive(g.key)}
            aria-label={`شروع بازی ${g.name}`}
            className={cn(
              "group rise-in rounded-2xl border bg-card p-4 text-right transition-all",
              "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                  g.tile,
                )}
              >
                <g.icon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-black">{g.name}</h3>
                  <BestBadge game={g.key} />
                  {plays[g.key] ? (
                    <span className="text-[10px] text-muted-foreground">
                      {faNum(plays[g.key])} دور
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{g.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-[11px] leading-5 text-muted-foreground">
        پاسخ‌های غلط بازی‌ها به صف «مرور هوشمند» هم راه پیدا می‌کنند — بازی کن، یاد بگیر، مرور کن!
      </p>
    </section>
  );
}
