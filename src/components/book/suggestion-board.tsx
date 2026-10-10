"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore, useState } from "react";
import { ChevronUp, Lightbulb, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { faNum } from "@/components/book/games/shared";
import { getClassKey, readApiError } from "@/lib/class-store";

/**
 * تخته پیشنهادها (فاز ۱۲ — تخته پیشنهادها).
 *
 * - GET /api/suggestions در mount با AbortController (setState فقط در then).
 * - POST با voterKey = getClassKey() (UUID دستگاه)؛ 429 → toast محترمانه.
 * - PUT رأی: idempotent؛ رأی‌های من در localStorage «visionone:suggestion-votes»
 *   (آرایهٔ id) با استور بیرونی + useSyncExternalStore (بدون mismatch سرور).
 * - خط/stats نظرسنجی: GET /api/survey — شکست کاملاً ساکت (API ممکن است هنوز
 *   آماده نباشد؛ همهٔ خطاها محترمانه و بدون کرش).
 */

interface SuggestionItem {
  id: string;
  text: string;
  votes: number;
  createdAt: string;
}

interface SurveyStats {
  count: number;
  avg: number;
}

const VOTES_KEY = "visionone:suggestion-votes";
const MAX_LEN = 140;
const MIN_LEN = 3;

// ─── استور رأی‌های من (الگوی استور بیرونی پروژه — بدون mismatch hydration) ───

const EMPTY_VOTES: readonly string[] = [];
let votesSnapshot: readonly string[] | null = null;
const voteListeners = new Set<() => void>();

function subscribeVotes(cb: () => void) {
  voteListeners.add(cb);
  return () => {
    voteListeners.delete(cb);
  };
}

function getVotesSnapshot(): readonly string[] {
  if (!votesSnapshot) {
    try {
      const raw = localStorage.getItem(VOTES_KEY);
      const arr: unknown = raw ? JSON.parse(raw) : [];
      votesSnapshot = Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
    } catch {
      votesSnapshot = [];
    }
  }
  return votesSnapshot;
}

function getServerVotes(): readonly string[] {
  return EMPTY_VOTES;
}

function rememberVote(id: string) {
  const cur = getVotesSnapshot();
  if (cur.includes(id)) return;
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify([...cur, id]));
  } catch {
    return;
  }
  votesSnapshot = null;
  voteListeners.forEach((l) => l());
}

// ─── کامپوننت ───

export function SuggestionBoard() {
  const [items, setItems] = useState<SuggestionItem[]>([]);
  const [stats, setStats] = useState<SurveyStats | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const acRef = useRef<AbortController | null>(null);
  const myVotes = useSyncExternalStore(subscribeVotes, getVotesSnapshot, getServerVotes);

  const load = useCallback(async (signal: AbortSignal) => {
    try {
      const res = await fetch("/api/suggestions", { signal, cache: "no-store" });
      if (!res.ok) return; // 404/429/… — ساکت؛ حالت خالی دوستانه می‌ماند
      const j = (await res.json()) as { ok?: boolean; items?: SuggestionItem[] };
      if (Array.isArray(j.items)) {
        setItems(j.items.slice(0, 30));
      }
    } catch {
      /* abort یا شبکه — ساکت */
    }
  }, []);

  const loadStats = useCallback(async (signal: AbortSignal) => {
    try {
      const res = await fetch("/api/survey", { signal, cache: "no-store" });
      if (!res.ok) return; // شکست ساکت
      const j = (await res.json()) as { ok?: boolean; count?: number; avg?: number };
      if (typeof j.count === "number" && typeof j.avg === "number" && j.count > 0) {
        setStats({ count: j.count, avg: j.avg });
      }
    } catch {
      /* ساکت */
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    acRef.current = ac;
    void load(ac.signal);
    void loadStats(ac.signal);
    return () => {
      ac.abort();
      acRef.current = null;
    };
  }, [load, loadStats]);

  function refresh() {
    const ac = acRef.current;
    if (ac) void load(ac.signal);
  }

  async function handleSubmit() {
    const t = text.trim();
    if (busy) return;
    if (t.length < MIN_LEN) {
      toast.error(`پیشنهاد باید حداقل ${faNum(MIN_LEN)} نویسه باشد 🙂`);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      toast.error("آفلاینی — وقتی اینترنت برگشت بفرست 📴");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t, voterKey: getClassKey() }),
      });
      if (res.status === 429) {
        toast.error("خیلی سریع‌سنگینی 🙂 کمی بعد دوباره");
        return;
      }
      if (!res.ok) {
        toast.error(await readApiError(res, "الان ثبت نشد — کمی بعد دوباره امتحان کن 🙂"));
        return;
      }
      const j = (await res.json()) as { ok?: boolean; item?: SuggestionItem };
      setText("");
      toast.success("پیشنهادت روی تخته رفت! 💡");
      if (j.item) {
        // درج فوری + refresh ساکت از سرور (سقف ۳۰، مرتب بر اساس رأی)
        const saved = j.item;
        setItems((prev) =>
          [saved, ...prev.filter((p) => p.id !== saved.id)]
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 30),
        );
      }
      refresh();
    } catch {
      toast.error("اینترنت در دسترس نیست — وقتی برگشت دوباره بفرست 📴");
    } finally {
      setBusy(false);
    }
  }

  async function handleVote(item: SuggestionItem) {
    if (getVotesSnapshot().includes(item.id)) {
      toast.info("قبلاً رأی دادی ✓");
      return;
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      toast.error("آفلاینی — وقتی اینترنت برگشت رأی بده 📴");
      return;
    }
    try {
      const res = await fetch("/api/suggestions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, voterKey: getClassKey() }),
      });
      if (res.status === 429) {
        toast.error("خیلی سریع‌سنگینی 🙂 کمی بعد دوباره");
        return;
      }
      if (!res.ok) {
        toast.error(await readApiError(res, "الان رأی ثبت نشد — کمی بعد دوباره 🙂"));
        return;
      }
      const j = (await res.json()) as { ok?: boolean; votes?: number };
      rememberVote(item.id); // دکمه پرِ amber می‌شود و کلیک بعدی فقط toast می‌دهد
      const votes = typeof j.votes === "number" ? j.votes : item.votes + 1;
      setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, votes } : p)));
    } catch {
      toast.error("اینترنت در دسترس نیست — رأی‌ات ثبت نشد 📴");
    }
  }

  const canSubmit = !busy && text.trim().length >= MIN_LEN && text.length <= MAX_LEN;

  return (
    <Card
      id="suggestion-board"
      className="border-amber-500/25 bg-gradient-to-bl from-amber-500/8 via-card to-card"
    >
      <CardContent className="space-y-4 p-4 sm:p-6">
        {/* سربرگ کارت */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="flex items-center gap-1.5 text-base font-extrabold text-foreground">
            <Lightbulb className="size-4 text-amber-500" aria-hidden />
            تخته پیشنهادها 💡
          </h3>
          <span className="text-[10px] text-muted-foreground">ایده‌ات را بگو؛ رأی بده؛ برترها بالا می‌آیند</span>
        </div>

        {/* آمار کوچک نظرسنجی (اگر API جواب داد — شکست ساکت) */}
        {stats && (
          <p className="rounded-xl bg-emerald-500/8 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
            از نظر {faNum(stats.count)} نفر: میانگین{" "}
            {stats.avg.toLocaleString("fa-IR", { maximumFractionDigits: 1 })} از {faNum(5)} ⭐
          </p>
        )}

        {/* فرم پیشنهاد */}
        <form
          className="flex flex-col gap-2 sm:flex-row sm:items-start"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          <div className="min-w-0 flex-1 space-y-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
              maxLength={MAX_LEN}
              placeholder="چه چیزی در ویژن‌وان اضافه یا بهتر شود؟ (۳ تا ۱۴۰ نویسه)"
              aria-label="متن پیشنهاد (۳ تا ۱۴۰ نویسه)"
              className="min-h-11 bg-background/70 text-sm"
            />
            <p
              className="text-left text-[10px] tabular-nums text-muted-foreground"
              aria-live="polite"
            >
              {faNum(text.length)} / {faNum(MAX_LEN)}
            </p>
          </div>
          <Button
            type="submit"
            disabled={!canSubmit}
            className="min-h-11 shrink-0 gap-1.5 bg-amber-500 font-bold text-amber-950 hover:bg-amber-600 hover:text-white"
          >
            <Send size={14} aria-hidden />
            {busy ? "در حال ارسال…" : "پیشنهاد می‌دهم ✨"}
          </Button>
        </form>

        {/* لیست پیشنهادها */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 py-8 text-center">
            <span className="text-3xl" aria-hidden>
              🌱
            </span>
            <p className="text-sm font-extrabold text-foreground">اولین پیشنهاد را تو بده 🌱</p>
            <p className="text-xs text-muted-foreground">
              ایده‌های برتر رأی‌ها در به‌روزرسانی بعدی ویژن‌وان اضافه می‌شوند
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="max-h-96 space-y-2 overflow-y-auto pl-1 pr-0.5"
            aria-label="فهرست پیشنهادها"
          >
            {items.map((item) => {
              const voted = myVotes.includes(item.id);
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border bg-background/60 p-3 transition-colors hover:border-amber-500/40"
                >
                  <p className="min-w-0 flex-1 break-words text-sm leading-6 text-foreground">
                    {item.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleVote(item)}
                    aria-pressed={voted}
                    aria-label={
                      voted
                        ? `قبلاً رأی دادی — ${faNum(item.votes)} رأی`
                        : `رأی به این پیشنهاد — ${faNum(item.votes)} رأی`
                    }
                    className={cn(
                      "flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      voted
                        ? "border-amber-500 bg-amber-400 text-amber-950 shadow-sm shadow-amber-500/30"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300",
                    )}
                  >
                    <ChevronUp size={14} aria-hidden />
                    <span className="text-[10px] font-black tabular-nums leading-none">
                      {faNum(item.votes)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
