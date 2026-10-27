"use client";

/**
 * داشبورد سلامت بازی‌ها — نمای معلم/خانواده روی تله‌متری بی‌نام KPI
 * (docs/games-kpi.md — K1 بازگشت روزانه، K2 تکمیل جلسه، K3 حلقهٔ یادگیری).
 *
 * - قرارداد باز شدن مشابه «تازه‌ها»: همیشه‌مونت در page.tsx؛ هر جای اپ فقط
 *   رویداد پنجره‌ای «visionone:open-kpi» را dispatch می‌کند (ترِیگر فعلی: فوتر)
 * - داده از GET /api/kpi/sessions?days=N — همان تجمیع سرورِ dev.log؛
 *   هیچ PII نه در داده هست نه در نمایش (فقط شمارش و مدت رُند)
 * - نمودارها CSS خالص‌اند (بدون وابستگی گرافیکی) تا دیالوگ سبک بماند و
 *   هیچ ریسک hydration/اندازهٔ صفر (کلاسیک recharts در دیالوگ) نداشته باشد
 * - درخواست فقط هنگام باز بودن دیالوگ یا تغییر پنجره زده می‌شود؛
 *   AbortController برای جلوگیری از race بین تعویض پنجره‌ها
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Flag,
  Gamepad2,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Target,
  Timer,
  TriangleAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faNum } from "@/lib/class-store";

/** رویداد پنجره‌ای برای باز کردن داشبورد (قرارداد مشترک — مثل تازه‌ها) */
export const OPEN_KPI_EVENT = "visionone:open-kpi";

// ─────────────────────────── تایپ‌های پاسخ سرور ───────────────────────────

interface DayCount {
  date: string;
  starts: number;
}

interface GameRow {
  game: string;
  starts: number;
  ends: number;
  abandons: number;
  srsWrong: number;
}

interface KpiLevelRow {
  level: string;
  seeds: number;
  wrongSum: number;
}

interface KpiResponse {
  generatedAt: string;
  windowDays: number;
  k1: { sessionsByDay: DayCount[]; totalStarts: number };
  k2: {
    starts: number;
    ends: number;
    abandons: number;
    abandonRatio: number | null;
    medianDurationSec: number | null;
  };
  k3: { seedEvents: number; wrongSum: number; byLevel: KpiLevelRow[] };
  perGame: GameRow[];
}

type FetchStatus = "idle" | "loading" | "ok" | "error";

// ─────────────────────────── برچسب‌های فارسی ───────────────────────────

/** نام فارسی بازی‌ها — کلیدهای تله‌متری (GAME_KEY) به نام نمایشی */
const GAME_LABELS: Record<string, string> = {
  memory: "تطبیق حافظه",
  scramble: "حروف جابه‌جا",
  cloze: "جای خالی",
  "word-search": "شکار کلمه",
  "speed-quiz": "تست برقی",
  "flappy-quiz": "فلپی گزینش",
  "snakes-ladders": "مار و پله واژگانی",
  crossword: "جدول متقاطع",
  wordle: "وردل ویژن",
  hangman: "دارباز",
  "sentence-builder": "سازنده جمله",
  duel: "دوئل دونفره",
  "listening-hunt": "شکار صدا",
  "adventure-map": "نقشه ماجراجویی",
  "fps-shooter": "شوتر آموزشی",
  quiz: "آزمون",
};

const CAT_FA: Record<string, string> = {
  all: "همهٔ دسته‌ها",
  vocabulary: "واژگان",
  grammar: "گرامر",
};

const DIFF_FA: Record<string, string> = { easy: "آسان", normal: "عادی", hard: "سخت" };

/** FPS-U U0-02 — برچسب فارسی اسکوپ شوتر (هم‌نام modeName در games/fps/helpers.ts) */
const FPS_SCOPE_FA: Record<string, string> = {
  word: "شکار واژه",
  grammar: "سد گرامری",
  listen: "شنیداری",
  chain: "جملهٔ زنجیره",
};

/**
 * خوانا کردن شناسهٔ سطح/اسکوپ رویداد K3 — قالب سرور: lesson:cat:duration[:diff]
 * مثل «all:all:60» → «همهٔ درس‌ها · همهٔ دسته‌ها · ۶۰ ثانیه»؛ قالب ناشناخته خام می‌ماند.
 * FPS-U U1 — قالب شوتر «{word|grammar|listen|chain}(-tap)?:{easy|normal|hard}»
 * مثل «word-tap:hard» → «شکار واژه · لمسی · درجهٔ سخت» (قالب کهنهٔ کیفیت هم پوشش داده می‌شود).
 */
function prettyLevel(raw: string): string {
  // FPS-U U1 — قالب تازهٔ شوتر: «{word|grammar|listen|chain}(-tap)?:{easy|normal|hard}»
  // مثل «word-tap:hard» → «شکار واژه · لمسی · درجهٔ سخت»
  const md = raw.match(/^(word|grammar|listen|chain)(-tap)?:(easy|normal|hard)$/);
  if (md) {
    const mode = FPS_SCOPE_FA[md[1]] ?? md[1];
    const tap = md[2] ? " · لمسی" : "";
    const d = DIFF_FA[md[3]] ?? md[3];
    return `${mode}${tap} · درجهٔ ${d}`;
  }
  // قالب کهنهٔ U0 (کیفیت گرافیک) — ردیف‌های قدیمی در پنجرهٔ غلتان محو می‌شوند
  const m = raw.match(/^(word|grammar|listen|chain)(-tap)?:(high|low)$/);
  if (m) {
    const mode = FPS_SCOPE_FA[m[1]] ?? m[1];
    const tap = m[2] ? " · لمسی" : "";
    const q = m[3] === "high" ? "کیفیت عادی" : "کیفیت سبک";
    return `${mode}${tap} · ${q}`;
  }
  const p = raw.split(":");
  if (p.length < 3) return raw;
  const [lesson, cat, dur, diff] = p;
  // faNum رشته را دست‌نخورده برمی‌گرداند — اول عدد می‌سازیم تا ارقام فارسی شوند
  const l =
    lesson === "all"
      ? "همهٔ درس‌ها"
      : Number.isFinite(Number(lesson))
        ? `درس ${faNum(Number(lesson))}`
        : lesson;
  const c = CAT_FA[cat] ?? cat;
  const d = dur === "endless" ? "بی‌پایان" : `${faNum(Number(dur))} ثانیه`;
  const x = diff ? ` · ${DIFF_FA[diff] ?? diff}` : "";
  return `${l} · ${c} · ${d}${x}`;
}

/** تاریخ میلادی «YYYY-MM-DD» به برچسب شمسی کوتاه مثل «۲۲ آبان» */
function faDay(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("fa-IR", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
}

/** ثانیه → «۴۵ ثانیه» یا «۲:۱۴» */
function fmtDuration(sec: number): string {
  if (sec < 60) return `${faNum(sec)} ثانیه`;
  const m = Math.floor(sec / 60);
  const r = String(sec % 60).padStart(2, "0");
  return `${faNum(m)}:${faNum(r)}`;
}

const WINDOW_OPTIONS = [7, 14, 30] as const;

// ─────────────────────────── کامپوننت ───────────────────────────

export function KpiDashboard() {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<KpiResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  /** کنترل‌کنندهٔ درخواست جاری — تعویض پنجره/بستن دیالوگ، قبلی‌ها را لغو می‌کند */
  const abortRef = useRef<AbortController | null>(null);
  /** پنجرهٔ جاری در رفرنس — شنوندهٔ رویداد باز شدن بدون stale closure می‌خواند */
  const daysRef = useRef(days);

  const load = useCallback((d: number) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setStatus("loading");
    fetch(`/api/kpi/sessions?days=${d}`, { signal: ac.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`http-${r.status}`);
        return r.json() as Promise<KpiResponse>;
      })
      .then((json) => {
        if (ac.signal.aborted) return;
        setData(json);
        setStatus("ok");
      })
      .catch((err: unknown) => {
        if (ac.signal.aborted || (err instanceof DOMException && err.name === "AbortError")) return;
        setStatus("error");
      });
  }, []);

  // شنوندهٔ رویداد مشترک — باز شدن دیالوگ داده را همان‌جا می‌گیرد (رویدادمحور، بدون setState در effect)
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      load(daysRef.current);
    };
    window.addEventListener(OPEN_KPI_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_KPI_EVENT, onOpen);
  }, [load]);

  // لغو درخواست در unmount — فقط پاکسازی، بدون setState
  useEffect(() => () => abortRef.current?.abort(), []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) abortRef.current?.abort();
  }

  function selectDays(d: number) {
    setDays(d);
    daysRef.current = d;
    load(d);
  }

  const k = data;
  const maxDay = k ? Math.max(1, ...k.k1.sessionsByDay.map((d) => d.starts)) : 1;
  const maxLevelWrong = k ? Math.max(1, ...k.k3.byLevel.map((r) => r.wrongSum)) : 1;
  const maxGameStarts = k ? Math.max(1, ...k.perGame.map((r) => r.starts)) : 1;
  const abandonPct =
    k && k.k2.abandonRatio !== null ? Math.round(k.k2.abandonRatio * 100) : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl gap-4 overflow-y-auto rounded-3xl p-5 sm:p-6" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-2 text-lg font-black">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            >
              <Activity size={19} />
            </span>
            داشبورد سلامت بازی‌ها
          </DialogTitle>
          <DialogDescription className="text-[12.5px] leading-6">
            نمای معلم/خانواده روی روندهای بازی — بدون هیچ دادهٔ شخصی؛ فقط شمارش بی‌نام رُندها
          </DialogDescription>
        </DialogHeader>

        {/* کنترل پنجرهٔ زمانی + دکمهٔ نوسازی */}
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex rounded-full bg-muted p-1"
            role="group"
            aria-label="پنجرهٔ زمانی تجمیع"
          >
            {WINDOW_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => selectDays(d)}
                aria-pressed={days === d}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all",
                  days === d
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {faNum(d)} روز
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => load(days)}
            aria-label="نوسازی داشبورد"
            className="h-9 gap-1.5 rounded-full px-3 text-xs font-bold text-muted-foreground"
          >
            <RefreshCw size={14} className={cn(status === "loading" && "animate-spin")} />
            نوسازی
          </Button>
        </div>

        {/* ─── بدنه: بارگذاری / خطا / خالی / داده ─── */}
        {status === "loading" && !k ? (
          <div className="space-y-3" aria-busy="true" aria-label="در حال بارگیری">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted/70" />
              ))}
            </div>
            <div className="h-32 animate-pulse rounded-2xl bg-muted/70" />
            <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
          </div>
        ) : status === "error" ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
            <TriangleAlert size={26} className="text-amber-500" aria-hidden />
            <p className="text-[13px] font-bold">داشبورد بارگیری نشد</p>
            <p className="text-[12px] leading-6 text-muted-foreground">
              ارتباط با سرور برقرار نشد — اتصال را چک کن و دوباره تلاش کن.
            </p>
            <Button size="sm" onClick={() => load(days)} className="rounded-full">
              <RefreshCw size={14} />
              تلاش دوباره
            </Button>
          </div>
        ) : k && k.k1.totalStarts === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-8 text-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            >
              <Gamepad2 size={26} />
            </span>
            <p className="text-[13px] font-bold">هنوز رُندی در این پنجره ثبت نشده</p>
            <p className="max-w-sm text-[12px] leading-6 text-muted-foreground">
              وقتی از «آزمایشگاه بازی‌ها» یک دور بازی شروع شود، آمار همین‌جا بی‌نام جمع می‌شود —
              پنجرهٔ زمانی را هم می‌توانی بزرگ‌تر کنی.
            </p>
          </div>
        ) : k ? (
          <div className="space-y-4">
            {/* کارت‌های شاخص K2 */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                icon={<PlayCircle size={17} />}
                tile="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                value={faNum(k.k1.totalStarts)}
                label="شروع دور"
              />
              <StatCard
                icon={<Flag size={17} />}
                tile={
                  abandonPct !== null && abandonPct <= 20
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }
                value={abandonPct !== null ? `${faNum(abandonPct)}٪` : "—"}
                label="نرخ رهاکردن"
                hint={
                  abandonPct !== null && abandonPct > 20
                    ? "بالاتر از هدف ۲۰٪"
                    : undefined
                }
              />
              <StatCard
                icon={<Timer size={17} />}
                tile="bg-teal-500/15 text-teal-600 dark:text-teal-400"
                value={
                  k.k2.medianDurationSec !== null
                    ? fmtDuration(k.k2.medianDurationSec)
                    : "—"
                }
                label="میانهٔ مدت دور"
              />
              <StatCard
                icon={<Target size={17} />}
                tile="bg-amber-500/15 text-amber-600 dark:text-amber-400"
                value={faNum(k.k3.wrongSum)}
                label="خطاهای ثبت‌شده"
                hint={`${faNum(k.k3.seedEvents)} رویداد`}
              />
            </div>

            {/* K1 — بازگشت روزانه */}
            <section className="rounded-2xl border bg-card/60 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-black">بازگشت روزانه</h3>
                <span className="text-[11px] text-muted-foreground">
                  {faNum(k.k1.sessionsByDay.length)} روز فعال از {faNum(k.windowDays)} روز
                </span>
              </div>
              {k.k1.sessionsByDay.length === 0 ? (
                <p className="mt-3 text-[12px] text-muted-foreground">دادهٔ روزانه‌ای نیست.</p>
              ) : (
                <>
                  <div
                    className="mt-3 flex h-24 items-end gap-1"
                    role="img"
                    aria-label={`نمودار میله‌ای شروع دور در ${k.k1.sessionsByDay.length} روز`}
                  >
                    {k.k1.sessionsByDay.map((d) => (
                      <div
                        key={d.date}
                        title={`${faDay(d.date)} — ${faNum(d.starts)} دور`}
                        className="group relative flex-1"
                        style={{ height: `${Math.max(8, (d.starts / maxDay) * 100)}%` }}
                      >
                        <div
                          className={cn(
                            "h-full w-full rounded-t-md transition-colors",
                            d.starts / maxDay > 0.66
                              ? "bg-emerald-500"
                              : d.starts / maxDay > 0.33
                                ? "bg-emerald-500/75"
                                : "bg-emerald-500/45",
                            "group-hover:bg-emerald-600",
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                    <span>{faDay(k.k1.sessionsByDay[0].date)}</span>
                    <span>اوج: {faNum(maxDay)} دور در روز</span>
                    <span>{faDay(k.k1.sessionsByDay[k.k1.sessionsByDay.length - 1].date)}</span>
                  </div>
                </>
              )}
            </section>

            {/* K3 — خطاها به تفکیک درس/اسکوپ */}
            <section className="rounded-2xl border bg-card/60 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-black">خطاها به تفکیک درس و اسکوپ</h3>
                <span className="text-[11px] text-muted-foreground">
                  «کدام درس تمرین می‌خواهد؟»
                </span>
              </div>
              {k.k3.byLevel.length === 0 ? (
                <p className="mt-3 text-[12px] leading-6 text-muted-foreground">
                  هنوز رویداد خطایی با برچسب سطح ثبت نشده — بازی‌های دارای درس (مثل تست برقی و
                  آزمون) این سطرها را می‌سازند.
                </p>
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {k.k3.byLevel.slice(0, 6).map((r) => (
                    <li key={r.level} className="text-[12px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-bold">{prettyLevel(r.level)}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {faNum(r.wrongSum)} خطا · {faNum(r.seeds)} رویداد
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-l from-amber-400 to-amber-500"
                          style={{ width: `${Math.max(6, (r.wrongSum / maxLevelWrong) * 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* به تفکیک بازی */}
            <section className="rounded-2xl border bg-card/60 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-black">به تفکیک بازی</h3>
                <span className="text-[11px] text-muted-foreground">پرتکرارترین‌ها اول</span>
              </div>
              <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pl-1 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/25 [&::-webkit-scrollbar]:w-1.5">
                {k.perGame.map((g) => (
                  <li
                    key={g.game}
                    className="rounded-xl bg-muted/50 px-3 py-2.5 transition-colors hover:bg-muted/80"
                  >
                    <div className="flex items-center justify-between gap-2 text-[12px]">
                      <span className="font-bold">{GAME_LABELS[g.game] ?? g.game}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {faNum(g.starts)} شروع
                        {g.abandons > 0 && ` · ${faNum(g.abandons)} رها`}
                        {g.srsWrong > 0 && ` · ${faNum(g.srsWrong)} خطا`}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-teal-500"
                        style={{ width: `${Math.max(4, (g.starts / maxGameStarts) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        {/* پانوشت — حریم خصوصی و زمان محاسبه */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-500" aria-hidden />
            بدون دادهٔ شخصی — فقط شمارش بی‌نام رُندها
          </span>
          {k && (
            <span>
              آخرین محاسبه:{" "}
              {new Date(k.generatedAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────── کارت شاخص ───────────────────────────

function StatCard({
  icon,
  tile,
  value,
  label,
  hint,
}: {
  icon: React.ReactNode;
  tile: string;
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card/60 p-3.5 transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className={cn("flex h-7 w-7 items-center justify-center rounded-lg", tile)}
          aria-hidden
        >
          {icon}
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-xl font-black leading-none">{value}</p>
      {hint && <p className="mt-1.5 text-[10.5px] text-amber-600 dark:text-amber-400">{hint}</p>}
    </div>
  );
}

export default KpiDashboard;
