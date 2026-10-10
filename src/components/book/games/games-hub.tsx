"use client";

/**
 * آزمایشگاه بازی‌های فکری — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * پنج بازی واژگانی روی بانک واژه/تست خود جزوه فعال:
 * تطبیق حافظه · حروف جابه‌جا · جای خالی · شکار کلمه · تست برقی
 * امتیاز همه بازی‌ها در مدل Attempt ثبت می‌شود (category = نام بازی)
 * و رکوردهای شخصی در localStorage با کتاب/محدوده اسکوپ می‌شوند.
 */

import { useMemo, useState, useSyncExternalStore } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import { faNum, getPlays, subscribeGameData, loadBest, fmtTime } from "./shared";
import { MemoryGame } from "./memory-game";
import { ScrambleGame } from "./scramble-game";
import { ClozeGame } from "./cloze-game";
import { WordSearchGame } from "./wordsearch-game";
import { SpeedQuizGame } from "./speed-quiz-game";
import { FlappyQuizGame } from "./flappy-quiz-game";
import { SnakesLaddersGame } from "./snakes-ladders-game";
import { CrosswordGame } from "./crossword-game";
import { WordleGame } from "./wordle-game";
import { HangmanGame } from "./hangman-game";
import { SentenceBuilderGame } from "./sentence-builder-game";
import { DuelGame } from "./duel-game";
import { ListeningHuntGame } from "./listening-hunt-game";
import { AdventureMapGame } from "./adventure-map-game";

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
  | "adventure-map";

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
];

/** خلاصه رکورد برای نشان روی کارت هر بازی — per-game scope "any" نمایشی است */
function BestBadge({ game }: { game: GameKey }) {
  const { bookId } = useBook();
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      // نمایشی: بهترین رکورد بین همه اسکوپ‌ها برای همان بازی
      try {
        let bestScore = -1;
        let label: string | null = null;
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
        return label;
      } catch {
        return null;
      }
    },
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
              ۱۴ بازی واژگانی و مهارتی
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
