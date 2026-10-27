"use client";

import type { ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarCheck,
  CalendarRange,
  ClipboardList,
  Layers,
  NotebookPen,
  Radio,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  countDueSrsCards,
  pickNextAction,
  type NextAction,
  type NextActionId,
} from "@/lib/next-action";
import { useClassSnapshot } from "@/lib/use-class-snapshot";
import { useSRSData } from "@/lib/srs-store";
import { useLearnedWords } from "@/lib/learned-store";
import { useDailyGoal } from "@/lib/goal-store";
import { useMistakes } from "@/lib/mistakes-store";
import { useMissions } from "@/lib/mission-store";
import { useDailyInfo } from "@/lib/daily-store";
import { useWeeklyInfo } from "@/lib/weekly-store";
import { setPracticeIntent } from "@/lib/practice-intent";
import { fmtJalaliDate } from "@/lib/class-store";
import type { ViewId } from "./app-header";

/**
 * کارت «قدم بعدی» (N1-1.c) — رابط موتور انتخاب تک‌اقدام روی جلد کتاب.
 *
 * نقشه راه اجرایی: «نقشه راه ها/نقشه-راه-قدم-بعدی-N1-1.md» — بند ۱۴:
 *
 *  - بند ۳ (الگوریتم): منطق تصمیم «فقط» در موتور خالص `pickNextAction`
 *    (src/lib/next-action.ts) است؛ این کامپوننت فقط ورودی‌ها را از هوک‌های
 *    موجود گرد می‌آورد (جدول ۱۴-۲) و هیچ اولویت‌بندی/tie-break/شمارشی را
 *    تکرار نمی‌کند — `dueCount` فقط با `countDueSrsCards` (فرمول A6) ساخته
 *    می‌شود تا عدد کارت با KPI داشبورد «مرور امروز» همیشه یکی بماند.
 *
 *  - بند ۶ (حالت‌ها): بدون اسکلت/spinner — رندر فوری از سیگنال‌های محلی؛
 *    در راه بودن fetch کلاس اقدام محلی می‌ماند و با رسیدن داده یک‌بار با
 *    ترنزیشن `rise-in` جابه‌جا می‌شود (key روی id اقدام — یک‌باره، بدون loop)؛
 *    خطای fetch کلاس ساکت است (A7 — `status` اسنپ‌شات عمداً بصری نادیده)؛
 *    بن‌بست واقعی = اقدام «continue» («ادامهٔ مطالعه»).
 *
 *  - بند ۷ (UI/رسپانسیو/RTL/a11y): یک `Card` واحد با `aria-labelledby` به
 *    heading واقعی؛ 390px چیدمان ستونی (`flex flex-wrap` + `min-w-0` + CTA
 *    تمام‌عرض ردیف دوم — overflowX=0)؛ دسکتاپ یک‌ردیفه (آیکن | متن | CTA)؛
 *    فلش جهت‌دار `ArrowLeft` (پیشروی RTL)؛ ارقام فارسی با `toLocaleString("fa-IR")`؛
 *    عنوان تکلیف/مأموریت با `truncate` (هرگز خط را نمی‌شکند).
 *
 *  - dispatch واحد (بند ۱۴-۳/c-5): تنها نقطهٔ خروج = `onNavigate(action.target)`
 *    (همان prop `HomeView` — سیم‌کشی‌شده در page.tsx)؛ فقط مقصد flashcards پیش
 *    از ناوبری `setPracticeIntent({ tab: "cards", … })` می‌زند؛ ⛔ `requestView`
 *    ممنوع (NavView فاقد "rewards" — nav-store).
 *
 *  - N1-1.d (بند ۱۵ نقشه راه — پالایش‌های مجاز، اجراشده): برچسب «مهلت گذشته»
 *    فقط با `action.overdue` (A5، بدون رنگ جدید)، `dir="auto"` روی عنوان‌های
 *    داینامیک تکلیف/مأموریت، متن نهایی CTA خوش‌آمد طبق A3 و پیوند ثانویهٔ
 *    متنی «شروع مطالعه» فقط در welcome — کنترل متنی، نه CTA اولیهٔ دوم؛
 *    قاعدهٔ «دقیقاً یک CTA اولیه» و dispatch واحد پابرجا می‌مانند (d-6).
 */

// ─────────────────────────── قلمرو رنگی (بند ۷-۱ — بدون رنگ جدید) ───────────────────────────

/** رنگ هر قلمرو = الگوهای فعلی home (کلاس/هدف primary، SRS امردادی accent،
 *  خطا قرمز ملایم، مأموریت violet، چالش amber، ادامهٔ مطالعه emerald) */
type ActionDomain = "class" | "srs" | "goal" | "mistake" | "mission" | "challenge" | "continue";

const DOMAIN_STYLES: Record<ActionDomain, { chip: string; card: string }> = {
  class: {
    chip: "bg-primary/10 text-primary",
    card: "border-primary/40 bg-gradient-to-l from-primary/12 via-card to-accent/10",
  },
  goal: {
    chip: "bg-primary/10 text-primary",
    card: "border-primary/20 bg-gradient-to-l from-primary/6 via-card to-accent/8",
  },
  srs: {
    chip: "bg-accent text-accent-foreground",
    card: "border-accent/50 bg-gradient-to-l from-accent/25 via-card to-transparent",
  },
  mistake: {
    chip: "bg-red-500/15 text-red-600 dark:text-red-400",
    card: "border-red-500/40 bg-gradient-to-l from-red-500/10 via-red-500/5 to-transparent",
  },
  mission: {
    chip: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    card: "border-violet-500/40 bg-gradient-to-l from-violet-500/12 via-violet-500/5 to-transparent",
  },
  challenge: {
    chip: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    card: "border-amber-500/40 bg-gradient-to-l from-amber-500/12 via-amber-500/5 to-transparent",
  },
  continue: {
    chip: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    card: "border-emerald-500/40 bg-gradient-to-l from-emerald-500/12 via-emerald-500/5 to-transparent",
  },
};

/** آیکن هر عضو ده‌گانه — همان خانوادهٔ importهای فعلی home (بند ۱۴-۳/c-4) */
const ACTION_META: Record<NextActionId, { icon: React.ComponentType<{ size?: number | string; className?: string }>; domain: ActionDomain }> = {
  welcome: { icon: Sparkles, domain: "challenge" },
  "live-quiz": { icon: Radio, domain: "class" },
  assignment: { icon: ClipboardList, domain: "class" },
  "srs-due": { icon: Layers, domain: "srs" },
  "daily-goal": { icon: Target, domain: "goal" },
  mistakes: { icon: NotebookPen, domain: "mistake" },
  mission: { icon: Trophy, domain: "mission" },
  "daily-challenge": { icon: CalendarCheck, domain: "challenge" },
  "weekly-challenge": { icon: CalendarRange, domain: "challenge" },
  continue: { icon: BookOpen, domain: "continue" },
};

// ─────────────────────────── متن هر عضو ده‌گانه (c-4) ───────────────────────────

/** ارقام فارسی — الگوی اجباری home */
const fa = (n: number): string => n.toLocaleString("fa-IR");

interface ActionCopy {
  title: string;
  reason: ReactNode;
  cta: string;
  /** پیوند ثانویهٔ متنی — فقط خوش‌آمد (A3، بند ۱۵-۳)؛ نه CTA اولیهٔ دوم (d-5) */
  secondary?: { label: string; target: ViewId };
}

/**
 * متن عنوان/دلیل/CTA برای هر عضو `NextAction` — فقط نمایش payload موتور است؛
 * هیچ قاعدهٔ تصمیمی اینجا نیست. متون نهایی طبق بند ۳-۱ در N1-1.d پالایش می‌شوند.
 */
function actionCopy(action: NextAction): ActionCopy {
  switch (action.id) {
    case "welcome":
      return {
        title: "خوش آمدی! 👋",
        reason: "برای گرم‌شدن، چالش روزانهٔ امروز — ۵ سؤال کوتاه — پیشنهاد می‌شود.",
        cta: "چالش روزانهٔ امروز", // متن نهایی A3 (بند ۱۵-۳ — d-4)
        secondary: { label: "شروع مطالعه", target: "contents" }, // A3 — فقط خوش‌آمد
      };
    case "live-quiz":
      return {
        title: "آزمون زنده در جریان است",
        reason: "کلاس همین حالا آزمون زنده دارد — برای شرکت، وارد نمای کلاس شو.",
        cta: "ورود به آزمون زنده",
      };
    case "assignment": {
      // نمایش تاریخ مهلت — اختیار مجاز بند ۱۴-۴ برای c (fmtJalaliDate موجود؛
      // ارقام فارسی از خود تابع fa-IR — بند ۱۵-۴/d-7)؛ برچسب «مهلت گذشته» در
      // سرآیند رندر می‌شود (d-2 — فقط با action.overdue)
      const due = action.dueAt ? fmtJalaliDate(action.dueAt) : "";
      return {
        title: "تکلیف باز کلاس",
        reason: (
          <span dir="auto" className="block truncate">
            {action.title}
            {due && <span className="text-muted-foreground/70"> — مهلت: {due}</span>}
          </span>
        ),
        cta: "مشاهدهٔ تکلیف",
      };
    }
    case "srs-due":
      return {
        title: "مرور کارت‌های سررسید",
        reason: `${fa(action.count)} کارت برای مرور امروز آماده است — هم‌شمار با داشبورد «مرور امروز».`,
        cta: "شروع مرور",
      };
    case "daily-goal":
      return {
        title: "هدف روزانه",
        reason: `${fa(action.remaining)} واژه تا هدف امروز باقی مانده — با فلش‌کارت‌ها برس.`,
        cta: "تمرین واژه‌ها",
      };
    case "mistakes":
      return {
        title: "دفتر خطاها",
        reason: `${fa(action.count)} خطا منتظر مرور است — با «مرور هوشمند» از دفتر حذف می‌شوند.`,
        cta: "مرور خطاها",
      };
    case "mission":
      return action.claimable
        ? {
            title: "جایزهٔ مأموریت آماده است!",
            reason: (
              <span dir="auto" className="block truncate">
                «{action.title}» کامل شده — جایزه‌ات را از پاداش‌ها بگیر.
              </span>
            ),
            cta: "دریافت جایزه",
          }
        : {
            title: "مأموریت ناتمام",
            reason: (
              <span dir="auto" className="block truncate">
                «{action.title}» در انتظار توست.
              </span>
            ),
            cta: "دیدن مأموریت",
          };
    case "daily-challenge":
      return {
        title: "چالش روزانهٔ امروز",
        reason: "۵ سؤال امروز برای همه یکسانه — آزمونش بده و جایگاهت را بساز.",
        cta: "شروع چالش",
      };
    case "weekly-challenge":
      return {
        title: "چالش هفتگی",
        reason: "۱۰ سؤال قطعی این هفته — تا شنبهٔ بعد فرصت داری.",
        cta: "شروع چالش",
      };
    case "continue":
      return {
        title: "ادامهٔ مطالعه",
        reason: "از فهرست فصل‌ها مسیر یادگیری‌ات را ادامه بده.",
        cta: "ادامهٔ مطالعه",
      };
  }
}

// ─────────────────────────── کامپوننت ───────────────────────────

export function NextActionCard({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  // جمع‌آوری ورودی‌ها — دقیقاً جدول ۱۴-۲؛ هر هوک موجود، بدون منطق تصمیم (c-2)
  const srs = useSRSData();
  const learned = useLearnedWords();
  const goal = useDailyGoal();
  const mistakes = useMistakes();
  const missions = useMissions();
  const dailyInfo = useDailyInfo();
  const weekly = useWeeklyInfo();
  const snapshot = useClassSnapshot();

  // فراخوانی موتور خالص در بدنهٔ رندر — الگوی محاسبهٔ dueCount در review-view
  // (بدون useMemo/useEffect/state — c-3)؛ `now` تنها منبع زمان موتور است.
  const now = Date.now();
  const action = pickNextAction({
    freshUser: learned.count === 0 && Object.keys(srs).length === 0,
    classRole: snapshot.classRole,
    liveActive: snapshot.liveActive,
    openAssignments: snapshot.openAssignments,
    dueCount: countDueSrsCards(srs, now),
    goalRemaining: Math.max(0, goal.goal - goal.todayCount),
    mistakeCount: mistakes.count,
    missions: missions.quests.map((q) => ({ title: q.def.title, done: q.done, claimed: q.claimed })),
    dailyDoneToday: dailyInfo.doneToday,
    weeklyDoneThisWeek: weekly.doneThisWeek,
    now,
  });

  // dispatch واحد — c-5 + d-6: تنها مسیر خروج؛ intent فقط برای flashcards؛
  // هم CTA اصلی و هم پیوند ثانویهٔ خوش‌آمد از همین handler می‌گذرند؛
  // ⛔ requestView ممنوع (NavView فاقد "rewards" — nav-store).
  const navigateTo = (target: ViewId) => {
    if (target === "flashcards") {
      setPracticeIntent({ tab: "cards", starredOnly: false, weakOnly: false });
    }
    onNavigate(target);
  };

  const meta = ACTION_META[action.id];
  const copy = actionCopy(action);
  const secondary = copy.secondary; // const → narrowing در closure می‌ماند (d-5)
  const Icon = meta.icon;
  const style = DOMAIN_STYLES[meta.domain];

  return (
    <Card
      key={action.id} // تعویض اقدام با رسیدن async کلاس → یک‌بار rise-in تازه (بند ۶)
      className={cn("rise-in overflow-hidden border transition-colors", style.card)}
    >
      <CardContent className="p-4 sm:p-5">
        <section
          aria-labelledby="next-action-heading"
          className="flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              style.chip,
            )}
            aria-hidden="true"
          >
            <Icon size={20} />
          </span>

          <div className="min-w-0 flex-1 space-y-1">
            <h2
              id="next-action-heading"
              className="flex flex-wrap items-center gap-2 text-sm font-black"
            >
              {copy.title}
              {/* برچسب «مهلت گذشته» — فقط با دادهٔ واقعی موتور (A5/d-2)؛
                  توکن‌های قرمز-ملایم موجود قلمرو mistake — بدون رنگ جدید */}
              {action.id === "assignment" && action.overdue && (
                <Badge className="border-red-500/40 bg-red-500/15 text-[10px] text-red-600 dark:text-red-400">
                  مهلت گذشته
                </Badge>
              )}
            </h2>
            <p className="text-[11.5px] leading-5 text-muted-foreground">{copy.reason}</p>
            {/* پیوند ثانویهٔ خوش‌آمد (A3/d-5) — فقط welcome؛ کنترل متنی فوکوس‌پذیر،
                نه CTA اولیهٔ دوم؛ ناوبری از همان dispatch واحد (d-6) */}
            {secondary && (
              <Button
                variant="link"
                onClick={() => navigateTo(secondary.target)}
                className="h-auto gap-1 p-0 text-[11px] font-bold"
              >
                {secondary.label}
                <ArrowLeft size={12} />
              </Button>
            )}
          </div>

          <Button
            onClick={() => navigateTo(action.target)}
            className="w-full shrink-0 justify-center gap-2 sm:w-auto"
          >
            {copy.cta}
            <ArrowLeft size={16} />
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
