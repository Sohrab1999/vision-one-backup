"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Puzzle,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  Target,
  PartyPopper,
  CheckCircle2,
  Handshake,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { VOCAB_LESSONS, vocabOfLesson, ALL_VOCAB, type VocabEntry } from "@/data/vocab";
import { recordSRS } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { useStarredWords } from "@/lib/star-store";
import { usePracticeIntent } from "@/lib/practice-intent";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";

type Phase = "setup" | "playing" | "done";
type Side = "en" | "fa";
interface Selection {
  side: Side;
  word: string;
}

const ALL_LESSONS = -1;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(sec: number): string {
  const fa = (v: number | string) => String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${fa(m)}:${fa(String(s).padStart(2, "0"))}`;
}

function bestKey(pairs: number): string {
  return `visionone:match-best:${pairs}`;
}

/** Stable subscribe for the best-record snapshot (re-checks on cross-tab storage events). */
function subscribeStorage(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function pickPairs(pool: VocabEntry[], n: number): VocabEntry[] {
  // unique word AND unique meaning → no ambiguous tiles
  const seenWords = new Set<string>();
  const seenMeanings = new Set<string>();
  const candidates = pool.filter((w) => {
    if (seenWords.has(w.word) || seenMeanings.has(w.meaning)) return false;
    seenWords.add(w.word);
    seenMeanings.add(w.meaning);
    return true;
  });
  return shuffle(candidates).slice(0, Math.min(n, candidates.length));
}

export function MatchGame() {
  const intent = usePracticeIntent();
  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(1);
  const [pairCount, setPairCount] = useState(6);
  const [starredOnly, setStarredOnly] = useState(() => intent.tab === "match" && intent.starredOnly);
  const starred = useStarredWords();

  const [deck, setDeck] = useState<VocabEntry[]>([]);
  const [enCol, setEnCol] = useState<VocabEntry[]>([]);
  const [faCol, setFaCol] = useState<VocabEntry[]>([]);
  const [selected, setSelected] = useState<Selection | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ en: string; fa: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  const { speed } = useVoiceSpeed();
  const busy = useRef(false);

  const basePool = useMemo(
    () => (lesson === ALL_LESSONS ? ALL_VOCAB : vocabOfLesson(lesson)),
    [lesson],
  );
  const activePool = useMemo(
    () => (starredOnly ? basePool.filter((w) => starred.has(w.word)) : basePool),
    [basePool, starredOnly, starred],
  );

  // Best record re-read on every render/phase change (primitive snapshot — safe).
  const best = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        const raw = localStorage.getItem(bestKey(pairCount));
        return raw ? (Number(raw) as number) : null;
      } catch {
        return null;
      }
    },
    () => null,
  );

  // timer
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => () => stopSpeaking(), []);

  const start = useCallback(() => {
    const chosen = pickPairs(activePool, pairCount);
    if (chosen.length < 3) {
      toast.error(
        starredOnly
          ? "واژه ستاره‌داری کافی در این محدوده نیست — بیشتر ستاره بزن! ⭐"
          : "واژه کافی برای این درس پیدا نشد",
      );
      return;
    }
    setDeck(chosen);
    setEnCol(shuffle(chosen));
    setFaCol(shuffle(chosen));
    setSelected(null);
    setMatched(new Set());
    setWrongPair(null);
    setAttempts(0);
    setSecs(0);
    setIsRecord(false);
    busy.current = false;
    setPhase("playing");
  }, [activePool, pairCount, starredOnly]);

  const finish = useCallback(
    (finalAttempts: number) => {
      touchStreak();
      recordStudySession();
      const acc = Math.round((deck.length / Math.max(finalAttempts, deck.length)) * 100);
      try {
        const key = bestKey(pairCount);
        const prev = Number(localStorage.getItem(key) ?? "0");
        if (!prev || secs + 1 < prev) {
          localStorage.setItem(key, String(secs + 1));
          setIsRecord(true);
        }
      } catch {
        /* noop */
      }
      toast.success(`بازی تطبیق تمام شد — ${acc.toLocaleString("fa-IR")}٪ دقت! 🎯`);
      setPhase("done");
    },
    [deck.length, pairCount, secs],
  );

  const tryMatch = useCallback(
    (a: Selection, b: Selection) => {
      if (busy.current) return;
      const en = a.side === "en" ? a : b;
      const fa = a.side === "fa" ? a : b;
      const finalAttempts = attempts + 1;
      setAttempts(finalAttempts);
      if (en.word === fa.word) {
        // correct!
        const next = new Set(matched);
        next.add(en.word);
        setMatched(next);
        setSelected(null);
        recordSRS(en.word, true);
        speak(en.word, { speed });
        if (next.size >= deck.length) {
          busy.current = true;
          finish(finalAttempts);
        }
      } else {
        busy.current = true;
        setWrongPair({ en: en.word, fa: fa.word });
        setTimeout(() => {
          setWrongPair(null);
          setSelected(null);
          busy.current = false;
        }, 620);
      }
    },
    [matched, deck.length, finish, speed, attempts],
  );

  const clickTile = useCallback(
    (side: Side, word: string) => {
      if (busy.current || matched.has(word)) return;
      if (!selected) {
        setSelected({ side, word });
        return;
      }
      if (selected.side === side && selected.word === word) {
        setSelected(null); // re-clicking the very same tile deselects it
        return;
      }
      if (selected.side === side) {
        setSelected({ side, word }); // switch selection within same column
        return;
      }
      // other column → attempt a match (even when words are equal — that IS the match)
      tryMatch(selected, { side, word });
    },
    [selected, matched, tryMatch],
  );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Puzzle size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">بازی تطبیق واژه‌ها</h2>
              <p className="text-xs text-muted-foreground">
                واژه انگلیسی و معنی فارسی را جفت کن — سریع‌تر از همه باش!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              یک واژه از ستون انگلیسی و معنی درستش را از ستون فارسی انتخاب کن؛ هر جفت درست تلفظ پخش می‌شود و در حافظه SRS واژه‌ها ثبت می‌گردد.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLesson(ALL_LESSONS)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                  lesson === ALL_LESSONS
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                کل کتاب (۱٬۴۸۸ واژه)
              </button>
              {VOCAB_LESSONS.filter((l) => l.lesson > 0).map((l) => (
                <button
                  key={l.lesson}
                  type="button"
                  onClick={() => setLesson(l.lesson)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    lesson === l.lesson
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">چند جفت؟</p>
            <div className="flex flex-wrap gap-2">
              {[4, 6, 8].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPairCount(n)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    pairCount === n
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {n.toLocaleString("fa-IR")} جفت
                </button>
              ))}
            </div>
          </div>

          {/* فقط واژه‌های ستاره‌دار */}
          <button
            type="button"
            role="switch"
            aria-checked={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition-all",
              starredOnly
                ? "border-yellow-500/50 bg-yellow-500/10 shadow-sm"
                : "border-border bg-card hover:bg-muted/60",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                starredOnly
                  ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Star size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[13px] font-black">
                فقط ستاره‌دارها
                {starredOnly && (
                  <Badge className="border-yellow-500/40 bg-yellow-500/15 text-[10px] text-yellow-700 dark:text-yellow-300">
                    فعال
                  </Badge>
                )}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                بازی فقط با {starred.count.toLocaleString("fa-IR")} واژه ستاره‌دارِ تو ساخته می‌شود.
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                starredOnly ? "bg-yellow-500" : "bg-muted-foreground/25",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                  starredOnly ? "right-0.5" : "right-[22px]",
                )}
              />
            </span>
          </button>

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین رکورد این حالت: {fmtTime(best)}
            </Badge>
          )}

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={start}>
            <Play size={18} />
            شروع بازی
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    const acc = Math.round((deck.length / Math.max(attempts, deck.length)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">همه جفت‌ها کامل شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{acc.toLocaleString("fa-IR")}٪</p>
              <p className="mt-1 text-[10px] text-muted-foreground">دقت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Handshake size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{deck.length.toLocaleString("fa-IR")}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">جفت درست</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={start} className="gap-2">
              <RotateCcw size={16} />
              دور جدید
            </Button>
            <Button variant="outline" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  const pct = Math.round((matched.size / Math.max(deck.length, 1)) * 100);
  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <CheckCircle2 size={11} className="text-primary" />
          {matched.size.toLocaleString("fa-IR")} / {deck.length.toLocaleString("fa-IR")}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Target size={11} className="text-amber-500" />
          {attempts.toLocaleString("fa-IR")} تلاش
        </Badge>
        <div className="mr-auto">
          <Button variant="ghost" size="sm" onClick={() => setPhase("setup")} className="text-[11px] text-muted-foreground">
            انصراف
          </Button>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* ستون فارسی (سمت راست در RTL) */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-center text-[11px] font-bold text-muted-foreground">معنی فارسی</p>
          {faCol.map((w) => {
            const isMatched = matched.has(w.word);
            const isSelected = selected?.side === "fa" && selected.word === w.word;
            const isWrong = wrongPair?.fa === w.word;
            return (
              <button
                key={`fa-${w.word}`}
                type="button"
                onClick={() => clickTile("fa", w.word)}
                disabled={isMatched}
                className={cn(
                  "min-h-14 w-full rounded-xl border p-2.5 text-[13px] font-bold leading-6 transition-all",
                  isMatched
                    ? "match-pop border-primary/50 bg-primary/10 text-primary opacity-55"
                    : isWrong
                      ? "match-shake border-destructive/60 bg-destructive/10 text-destructive"
                      : isSelected
                        ? "border-amber-500/70 bg-amber-500/12 shadow-md shadow-amber-500/15"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
                )}
              >
                {w.meaning}
              </button>
            );
          })}
        </div>

        {/* ستون انگلیسی */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-center text-[11px] font-bold text-muted-foreground">واژه انگلیسی</p>
          {enCol.map((w) => {
            const isMatched = matched.has(w.word);
            const isSelected = selected?.side === "en" && selected.word === w.word;
            const isWrong = wrongPair?.en === w.word;
            return (
              <button
                key={`en-${w.word}`}
                type="button"
                onClick={() => clickTile("en", w.word)}
                disabled={isMatched}
                className={cn(
                  "min-h-14 w-full rounded-xl border p-2.5 text-center transition-all",
                  isMatched
                    ? "match-pop border-primary/50 bg-primary/10 opacity-55"
                    : isWrong
                      ? "match-shake border-destructive/60 bg-destructive/10"
                      : isSelected
                        ? "border-amber-500/70 bg-amber-500/12 shadow-md shadow-amber-500/15"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
                )}
              >
                <span dir="ltr" className="font-en text-[14px] font-black">
                  {w.word}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
