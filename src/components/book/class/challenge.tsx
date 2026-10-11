"use client";

/**
 * چالش بازی کلاس — G4-03 نقشه راه بازی‌ها:
 *  • هوک مشترک useClassChallenge (GET /api/class/[code]/challenge — ساکت، با poll اختیاری)
 *  • TeacherChallengeCard: تعیین چالش (بازی + حداقل امتیاز) + جدول رده‌بندی کلاس
 *  • StudentChallengeCard: چالش فعال + بهترین امتیاز خودم + ۵ نفر برتر
 *
 * الگوی polling/no-setState-in-effect عین useClassStatePoll (lib/class-store) است.
 * بدون PII — سرور فقط نام نمایشی برمی‌گرداند.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { GAME_TITLES } from "@/components/book/games/shared";
import {
  faNum,
  fmtJalaliDate,
  readApiError,
  toEnDigits,
  type ClassSession,
} from "@/lib/class-store";

// ─────────────────────────── انواع قرارداد API ───────────────────────────

export interface ClassChallengeInfo {
  category: string;
  minScore: number;
  createdAt: string;
}

export interface ClassChallengeRow {
  name: string;
  plays: number;
  bestScore: number;
  reachedGoal: boolean;
}

export interface ClassChallengePayload {
  challenge: ClassChallengeInfo | null;
  rows: ClassChallengeRow[];
}

/**
 * فهرست بازی‌های قابل چالش — کلیدها دقیقاً همان Attempt.category (games-hub).
 * نام‌های فارسی: نقشهٔ GAME_TITLES در games/shared.ts (الان export شده و در
 * challengeGameTitle هم به‌عنوان fallback استفاده می‌شود) برای «memory» کهنه است
 * (کلید قدیمی «match») — پس فهرست مرجع محلی با نام‌های games-hub هم‌نگاه می‌شود
 * (همان تصمیم مستند عامل G4-01 در game-leaderboard.tsx).
 */
const CHALLENGE_GAMES: Array<{ key: string; title: string }> = [
  { key: "memory", title: "تطبیق حافظه" },
  { key: "scramble", title: "حروف جابه‌جا" },
  { key: "cloze", title: "جای خالی" },
  { key: "word-search", title: "شکار کلمه" },
  { key: "speed-quiz", title: "تست برقی" },
  { key: "flappy-quiz", title: "فلپی گزینش" },
  { key: "snakes-ladders", title: "مار و پله واژگانی" },
  { key: "crossword", title: "جدول متقاطع" },
  { key: "wordle", title: "وردل ویژن" },
  { key: "hangman", title: "دارباز" },
  { key: "sentence-builder", title: "سازنده جمله" },
  { key: "duel", title: "دوئل دونفره" },
  { key: "duel-online", title: "دوئل آنلاین" },
  { key: "listening-hunt", title: "شکار صدا" },
  { key: "adventure-map", title: "نقشه ماجراجویی" },
  { key: "fps-shooter", title: "شوتر آموزشی" },
];

const CHALLENGE_GAME_TITLES = new Map(CHALLENGE_GAMES.map((g) => [g.key, g.title]));

/** عنوان فارسی بازی — نقشهٔ محلی → GAME_TITLES → کلید خام */
export function challengeGameTitle(category: string): string {
  return CHALLENGE_GAME_TITLES.get(category) ?? GAME_TITLES[category] ?? category;
}

// ─────────────────────────── هوک مشترک ───────────────────────────

/**
 * GET چالش کلاس — بلافاصله + هر pollMs (۰ = بدون poll).
 * خطاها ساکت‌اند و در کارت به‌صورت متن فارسی نمایش داده می‌شوند.
 */
export function useClassChallenge(session: ClassSession | null, pollMs = 0) {
  const [data, setData] = useState<ClassChallengePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<ClassSession | null>(session);
  const aliveRef = useRef(true);

  const fetchOnce = useCallback(async () => {
    const s = sessionRef.current;
    if (!s || !aliveRef.current) return;
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(s.code)}/challenge?key=${encodeURIComponent(s.key)}&role=${s.role}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        if (!aliveRef.current) return;
        setError(await readApiError(res, "دریافت چالش کلاس ممکن نشد"));
        return;
      }
      const j = (await res.json()) as ClassChallengePayload;
      if (!aliveRef.current) return;
      setError(null);
      setData(j);
    } catch {
      if (!aliveRef.current) return;
      setError("ارتباط با سرور برقرار نشد");
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchOnce();
    if (aliveRef.current) setLoading(false);
  }, [fetchOnce]);

  // آینهٔ تازه برای تایمر (الگوی latest-ref — بدون setState در بدنهٔ effect)
  const fetchRef = useRef(fetchOnce);
  useEffect(() => {
    fetchRef.current = fetchOnce;
  }, [fetchOnce]);

  useEffect(() => {
    sessionRef.current = session;
    aliveRef.current = true;
    if (!session) return;
    const t0 = window.setTimeout(() => void fetchRef.current(), 0);
    const t =
      pollMs > 0 ? window.setInterval(() => void fetchRef.current(), pollMs) : undefined;
    return () => {
      aliveRef.current = false;
      window.clearTimeout(t0);
      if (t) window.clearInterval(t);
    };
  }, [session, pollMs]);

  return { data, error, loading, refresh };
}

// ─────────────────────────── کارت معلم ───────────────────────────

const MEDALS = ["🥇", "🥈", "🥉"];

export function TeacherChallengeCard({ session }: { session: ClassSession }) {
  const { data, error, refresh } = useClassChallenge(session, 15000);
  const [category, setCategory] = useState("speed-quiz");
  const [minScoreStr, setMinScoreStr] = useState("100");
  const [busy, setBusy] = useState(false);

  const challenge = data?.challenge ?? null;
  const rows = data?.rows ?? [];

  async function submit() {
    const minScore = Math.round(Number(toEnDigits(minScoreStr) || "0"));
    if (!Number.isFinite(minScore) || minScore < 1 || minScore > 10000) {
      toast.error("حداقل امتیاز باید عددی بین ۱ تا ۱۰۰۰۰ باشد");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(session.code)}/challenge?key=${encodeURIComponent(session.key)}&role=teacher`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, minScore }),
        },
      );
      if (res.status === 201) {
        toast.success("چالش جدید تعیین شد 🎯");
        await refresh();
      } else {
        toast.error(await readApiError(res, "تعیین چالش ممکن نشد"));
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="rise-in">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-1.5 text-sm font-black">
            <Target size={16} className="text-amber-500" aria-hidden />
            چالش بازی
          </h2>
          <div className="flex items-center gap-1.5">
            {challenge && (
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-[10.5px] text-amber-700 dark:text-amber-400"
              >
                چالش فعال
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void refresh()}
              className="min-h-9 gap-1 px-2 text-[12px] font-bold text-muted-foreground"
              aria-label="به‌روزرسانی رده‌بندی چالش"
            >
              <RefreshCw size={13} aria-hidden />
              به‌روزرسانی
            </Button>
          </div>
        </div>

        {/* فرم تعیین چالش */}
        <div className="space-y-2.5 rounded-xl border bg-muted/20 p-3">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="challenge-game" className="text-[11.5px] text-muted-foreground">
                بازی
              </Label>
              <select
                id="challenge-game"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-h-11 w-full rounded-md border border-input bg-card px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                aria-label="انتخاب بازی چالش"
              >
                {CHALLENGE_GAMES.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="challenge-min-score" className="text-[11.5px] text-muted-foreground">
                حداقل امتیاز هدف (۱ تا ۱۰۰۰۰)
              </Label>
              <Input
                id="challenge-min-score"
                value={minScoreStr}
                onChange={(e) => setMinScoreStr(toEnDigits(e.target.value).replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                autoComplete="off"
                placeholder="مثلاً ۱۰۰"
                className="min-h-11"
                aria-label="حداقل امتیاز هدف چالش"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              disabled={busy}
              onClick={() => void submit()}
              className="min-h-11 gap-1.5 font-bold"
              aria-label="تعیین چالش برای کلاس"
            >
              {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Target size={15} aria-hidden />}
              تعیین چالش
            </Button>
          </div>
        </div>

        {/* چالش فعال فعلی */}
        {challenge ? (
          <p className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-3 py-2.5 text-[12.5px] leading-relaxed text-foreground/90">
            🎯 چالش فعلی: <b>{challengeGameTitle(challenge.category)}</b>
            <span aria-hidden> · </span>
            حداقل امتیاز: <b>{faNum(challenge.minScore)}</b>
            <span aria-hidden> · </span>
            شروع: {fmtJalaliDate(challenge.createdAt)}
          </p>
        ) : (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
            هنوز چالشی تعیین نکردی — با فرم بالا اولین چالش کلاس را بساز! 🎯
          </p>
        )}

        {error && (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground" role="status">
            {error}
          </p>
        )}

        {/* رده‌بندی کلاس در چالش */}
        {challenge && (
          <div aria-label="رده‌بندی چالش کلاس">
            {rows.length === 0 ? (
              <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground">
                هنوز کسی در این چالش بازی نکرده — بچه‌ها را تشویق کن! 🎉
              </p>
            ) : (
              <ol className="max-h-96 space-y-2 overflow-y-auto pe-1">
                {rows.map((r, i) => (
                  <li
                    key={`${r.name}-${i}`}
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border bg-muted/20 px-3 py-2"
                  >
                    <span
                      className="w-7 shrink-0 text-center text-[13px] font-black"
                      aria-label={`رتبه ${faNum(i + 1)}`}
                    >
                      {MEDALS[i] ?? faNum(i + 1)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{r.name}</span>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 bg-emerald-500/10 text-[10.5px] text-emerald-700 dark:text-emerald-400"
                    >
                      {faNum(r.bestScore)} امتیاز
                    </Badge>
                    <Badge variant="outline" className="text-[10.5px] text-muted-foreground">
                      {faNum(r.plays)} دور
                    </Badge>
                    {r.reachedGoal ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 bg-emerald-500/10 text-[10.5px] text-emerald-700 dark:text-emerald-400"
                      >
                        ✅ هدف
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-amber-500/30 bg-amber-500/10 text-[10.5px] text-amber-700 dark:text-amber-400"
                      >
                        🎯
                      </Badge>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────── کارت دانش‌آموز ───────────────────────────

export function StudentChallengeCard({ session }: { session: ClassSession }) {
  const { data, error } = useClassChallenge(session, 30000);

  const challenge = data?.challenge ?? null;
  const rows = data?.rows ?? [];
  const myName = (session.name ?? "").trim();
  const mine = myName ? rows.find((r) => r.name === myName) : undefined;
  const top5 = rows.slice(0, 5);

  return (
    <Card className="rise-in">
      <CardContent className="space-y-3 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-black">
          <Target size={16} className="text-amber-500" aria-hidden />
          چالش بازی کلاس
        </h2>

        {!challenge ? (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12.5px] text-muted-foreground">
            معلم هنوز چالشی تعیین نکرده 🕒
          </p>
        ) : (
          <div className="space-y-3">
            {/* هدف چالش */}
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-3 py-2.5 text-[12.5px] leading-relaxed text-foreground/90">
              🎯 بازی <b>{challengeGameTitle(challenge.category)}</b>
              <span aria-hidden> · </span>
              حداقل امتیاز: <b>{faNum(challenge.minScore)}</b>
            </p>

            {/* بهترین امتیاز خودم */}
            <p
              role="status"
              className={cn(
                "rounded-xl px-3 py-2.5 text-[12.5px] leading-relaxed",
                mine?.reachedGoal
                  ? "border border-emerald-500/25 bg-emerald-500/5 text-foreground/90"
                  : "bg-muted/50 text-muted-foreground",
              )}
            >
              {mine ? (
                mine.reachedGoal ? (
                  <>
                    ✅ بهترین امتیاز تو <b>{faNum(mine.bestScore)}</b> — به هدف رسیدی! آفرین 🎉
                  </>
                ) : (
                  <>
                    🎯 بهترین امتیاز تو <b>{faNum(mine.bestScore)}</b> — هنوز به هدف نرسیدی، دوباره بازی کن!
                  </>
                )
              ) : (
                <>هنوز در این چالش بازی نکردی — از آزمایشگاه بازی‌ها شروع کن! 🎮</>
              )}
            </p>

            {/* ۵ نفر برتر */}
            {top5.length > 0 && (
              <div aria-label="۵ نفر برتر چالش">
                <p className="mb-1.5 text-[11.5px] text-muted-foreground">۵ نفر برتر:</p>
                <ol className="space-y-1.5">
                  {top5.map((r, i) => (
                    <li
                      key={`${r.name}-${i}`}
                      className="flex items-center gap-x-2 rounded-xl border bg-muted/20 px-3 py-2"
                    >
                      <span
                        className="w-7 shrink-0 text-center text-[13px] font-black"
                        aria-label={`رتبه ${faNum(i + 1)}`}
                      >
                        {MEDALS[i] ?? faNum(i + 1)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-bold">
                        {r.name}
                        {r.name === myName && <span className="ms-1 text-[10.5px] text-primary">(تو)</span>}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 bg-emerald-500/10 text-[10.5px] text-emerald-700 dark:text-emerald-400"
                      >
                        {faNum(r.bestScore)}
                      </Badge>
                      <span aria-hidden className="shrink-0 text-[12px]">
                        {r.reachedGoal ? "✅" : "🎯"}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {error && !challenge && (
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[12px] text-muted-foreground" role="status">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
