"use client";

/**
 * setup-panel — پنل تنظیمات مأموریت شوتر (گام ۵ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از index.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، انتخاب حالت/سلاح/نقشه/درس/سبک کنترل/کیفیت/گزینه‌های نگاه، هشدار استخر،
 * پیام هدف‌های هوشمند، بج رکورد، دکمهٔ «شروع مأموریت» + آموزش ۵گامی (TUTORIAL_STEPS).
 * کامپوننت presentational — state و موتور مأموریت در index.tsx می‌ماند؛ props هم‌نام
 * شناسه‌های قبلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import type { Dispatch, SetStateAction } from "react";
import {
  Bomb,
  Crosshair,
  Crown,
  DoorOpen,
  Headphones,
  ListOrdered,
  MapPinned,
  MonitorSmartphone,
  MoonStar,
  MousePointerClick,
  EyeOff,
  Play,
  Radar,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target as TargetIcon,
  Trees,
  Trophy,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import { faNum } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import {
  ALL_LESSONS,
  FOV_DEF,
  FOV_MAX,
  FOV_MIN,
  GAME_KEY,
  MIN_POOL_CHAIN,
  MIN_POOL_QUIZ,
  MIN_POOL_WORD,
  SENS_DEF,
  SENS_MAX,
  SENS_MIN,
  type Difficulty,
  type Quality,
} from "./constants";
import { lessonLabel, modeName } from "./helpers";
import { MAPS, type MapConfig, type MapId } from "./maps";
import { WEAPONS, type WeaponConfig, type WeaponId } from "./weapons";
import type { Mode } from "./types";

// ─── فاز G2-e — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / flappy) ───

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Crosshair size={24} />,
    title: "پهپادهای متخاصم را حذف کن",
    text: "سؤال روی HUD بالای میدان می‌ماند و هر پهپاد متخاصم یک گزینهٔ انگلیسی روی پلاک دارد — دقیقاً به گزینهٔ درست شلیک کن. شلیک درست پهپاد را با انفجار آتش‌و‌دودی منفجر می‌کند و امتیاز با کمبو دارد. در حالت «شنیداری» سؤال خوانده نمی‌شود بلکه واژه پخش می‌شود — گوش کن و پهپادِ همان واژه را شکار کن؛ دکمهٔ «پخش دوباره» زیر سؤال است و در دسکتاپ کلید V هم دوباره پخش می‌کند.",
  },
  {
    icon: <ListOrdered size={24} />,
    title: "جملهٔ زنجیره‌ای",
    text: "در حالت «جملهٔ زنجیره» سؤال یک جملهٔ واقعی از مکالمه‌های جزوه است که سه واژه‌اش جا خالی دارد — سه پهپادِ واژه‌های گم‌شده را دقیقاً به ترتیبِ جمله شکار کن تا جای خالی‌های HUD پر شود و با کامل شدن جمله، تلفظ کاملش را بشنوی؛ شکارِ بی‌ترتیب یک ❤ می‌سوزاند.",
  },
  {
    icon: <MousePointerClick size={24} />,
    title: "نشانه‌گیری و شلیک",
    text: "دسکتاپ: کلیک اول قفلِ نشانگر، حرکت موس نشانه‌گیری، WASD حرکت داخل میدان و کلیک بعدی شلیک — R خشاب را عوض می‌کند. نگه‌داشتن کلیک راست اسکوپ می‌گیرد: دید باریک‌تر، نشانه‌گیری دقیق‌تر. حرکت حرفه‌ای: Shift دویدن، Space پرش و C خم‌شدن. موبایل: جوی‌استیک چپ حرکت، کشیدن صحنه نگاه و دکمهٔ راست (یا تپ روی هدف) شلیک + دکمهٔ پرش. در «تپ ساده» تپ روی هدف کافی است و کلیدهای ۱ تا ۴ هم هدف‌ها را از چپ انتخاب می‌کنند. مأموریت تمام‌صفحه شروع می‌شود (Esc = خروج).",
  },
  {
    icon: <TargetIcon size={24} />,
    title: "خشاب، مهمات و سلاح",
    text: "خشاب بسته به سلاح ۴ تا ۸ فشنگ دارد — شمارندهٔ فشنگ کنار رتیکل است. خالی شدن = ریلود خودکار با صدای تعویض؛ می‌توانی با R (دسکتاپ) زودتر ریلود کنی. سه سلاح در setup داری: کلت تک‌تیر (خشاب ۸)، دژکوب سنگین (خشاب ۵، لگد و انفجار بزرگ) و پمپ زون‌کن (خشاب ۴؛ هر ماشه سه پرتو می‌کاود). شلیک حین ریلود یا فریز برخورد مهمات هدر نمی‌دهد، ولی هر شلیکِ خطا یک فشنگ کم است — درست نشانه بگیر!",
  },
  {
    icon: <Zap size={24} />,
    title: "هدف‌های هوشمند و HVT",
    text: "پهپادهای غلط وقتی نشانه را رویشان نگه داری به کناره‌ها فرار می‌کنند — از زاویهٔ دیگر نزدیک شو! هر ۵ پاسخ یک «موج» سخت‌تر با دشمنان سریع‌تر شروع می‌شود. هر از گاهی هم «هدف ویژهٔ HVT» با حلقهٔ هشدار قرمز ظاهر می‌شود: ۳ ثانیه فرصت داری حذفش کنی تا ۲۰ امتیاز بونوس بگیری (حذفش قلب کم نمی‌کند).",
  },
  {
    icon: <Radar size={24} />,
    title: "پهپاد شناسایی و قفس واژه",
    text: "در دشواری‌های «عادی» و «سخت» یک پهپاد تعقیب‌گر تیره با چراغ کهربایی دور میدان گشت می‌زند (بدون پلاک واژه — به گزینه‌ها ربطی ندارد). اگر ساکن بمانی نزدیک می‌شود و پس از یک لحظه شارژ — چراغش تند می‌زند و لرزش می‌گیرد — «قفس واژه» پرتاب می‌کند: چیپ قرمز HUD شمارش معکوس می‌زند. سه دفاع داری: جابه‌جا شو تا قفس به جای خالی بخورد، خود قفس را در هوا شکار کن (در «تپ ساده» روی چیپ قرمز تپ کن) یا پیش از پرتاب به خود پهپاد شلیک کن تا عقب بنشیند. برخورد قفس فقط یک ❤ کم می‌کند و سؤال جاری دست‌نخورده می‌ماند؛ در «آسان» هیچ دشمنی وجود ندارد.",
  },
  {
    icon: <EyeOff size={24} />,
    title: "پناهگاه و خط دید",
    text: "سنگرها دوست تو هستند: پهپاد تعقیب‌گر از پشت دیوارهای بلند و جعبه‌ها نمی‌تواند تو را ببیند. وقتی پنهان شوی چیپ سبز «پوشیده» روشن می‌شود؛ اگر حین تعقیب خط دیدش قطع شود چند لحظه شناور می‌ماند (چراغش تند می‌زند) و بعد ردت را گم می‌کند و به گشت برمی‌گردد. اما حواس‌ت باشد: بدون دید، سکونت هم شمرده نمی‌شود و شارژِ شروع‌شده را هیچ سنگری لغو نمی‌کند — شلیک به پهپاد یا جابه‌جایی پس از پرتاب نجاتت می‌دهد.",
  },
  {
    icon: <Crown size={24} />,
    title: "رئیس واژه",
    text: "هر مأموریتی که تا «موج ۴» پیش ببری با نبرد رئیس تمام می‌شود: پهپاد فرماندهٔ بزرگ با سه حلقهٔ سپر که گلوله اثر ندارد — فقط پاسخ درست واژه سپرش را می‌شکند! سه مرحله با سه چالش متفاوت: اول سؤال معمولی مأموریت، بعد «هجی» (حروف واژه را به ترتیب شکار کن تا جای‌خالی‌های HUD پُر شود) و در پایان «شنیداری». هر خطا فقط همان مرحله را با واژهٔ تازه تکرار می‌کند و چالش‌ها یک‌ونیم برابر زمان دارند. در دشواری‌های عادی/سخت رئیس قفس واژه هم پرتاب می‌کند (شلیک به خودش در لحظهٔ شارژ = لغو پرتاب) و شکستن سپر سوم = پیروزی کامل مأموریت. در «آسان» رئیس ساکن است و حمله نمی‌کند.",
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: "نقشه‌ها و گزینه‌ها",
    text: "اگر صحنه روی گوشی سنگین بود، در تنظیمات «کیفیت سبک» را انتخاب کن. چهار نقشهٔ مأموریت با چیدمان واقعی متفاوت داری: جنگل زمردی (درخت و جعبه)، کویر کهربا (دیوار ماسه‌سنگی و طاق)، سکوت شب (جنگل کریستال) و دروازهٔ دو در — الهام از دی‌داست۲ با درِ دوتایی میانه، گذرگاه بلند، تونل B و برج دیدبانی. حساسیت نگاه، زاویهٔ دید (FOV) و وارون‌سازی عمودی را هم در بخش «گزینه‌ها» تنظیم کن — همهٔ انتخاب‌ها ذخیره می‌شوند و حین بازی هم از منوی توقف قابل تغییرند. پایان هر مأموریت رتبهٔ نظامی می‌گیری (S تا D).",
  },
];

export interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  lesson: number;
  setLesson: Dispatch<SetStateAction<number>>;
  tapMode: boolean;
  setTapMode: Dispatch<SetStateAction<boolean>>;
  quality: Quality;
  setQualityPref: (q: Quality) => void;
  sens: number;
  setSensPref: (v: number) => void;
  fov: number;
  setFovPref: (v: number) => void;
  invertY: boolean;
  setInvertPref: (v: boolean) => void;
  weaponId: WeaponId;
  setWeaponPref: (id: WeaponId) => void;
  /** فاز U1-00 — درجهٔ دشواری مأموریت (رفتار پهپاد تعقیب‌گر) */
  difficulty: Difficulty;
  setDifficultyPref: (d: Difficulty) => void;
  /** فاز U5 — صدای میدان جهت‌دار (پاس چپ/راست — ماندگار) */
  fieldSfx: boolean;
  setFieldSfxPref: (v: boolean) => void;
  mapId: MapId;
  setMapPref: (id: MapId) => void;
  chipFeedback: () => void;
  poolOk: boolean;
  poolCount: number;
  quizLessons: number[];
  wordLessons: { lesson: number; label: string }[];
  /** فاز F10-ب — درس‌های دارای مکالمهٔ قابل‌بازی + تعداد جمله‌های هر درس */
  chainLessons: { lesson: number; count: number }[];
  vocabAll: VocabEntry[];
  quizSeed: QuizQuestionSeed[];
  bestVal: number | null;
  start: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (o: boolean) => void;
}

export function SetupPanel({
  mode,
  setMode,
  lesson,
  setLesson,
  tapMode,
  setTapMode,
  quality,
  setQualityPref,
  sens,
  setSensPref,
  fov,
  setFovPref,
  invertY,
  setInvertPref,
  weaponId,
  setWeaponPref,
  difficulty,
  setDifficultyPref,
  fieldSfx,
  setFieldSfxPref,
  mapId,
  setMapPref,
  chipFeedback,
  poolOk,
  poolCount,
  quizLessons,
  wordLessons,
  chainLessons,
  vocabAll,
  quizSeed,
  bestVal,
  start,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  const chipCls = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Crosshair size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">شوتر آموزشی</h2>
              <p className="text-xs text-muted-foreground">میدان سه‌بعدی low-poly — به گزینهٔ درست شلیک کن!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-emerald-500" />
            <p>
              سؤال بالای صفحه می‌آید و روی هر پهپاد متخاصم یک گزینه نوشته شده — دقیقاً به <b>گزینهٔ درست</b> شلیک کن.
              در حالت «شنیداری» سؤال متن ندارد بلکه <b>واژه پخش می‌شود</b> — گوش کن و پهپادِ همان واژه را شکار کن (با دکمهٔ «پخش دوباره» می‌توانی دوباره بشنوی).
              شلیک درست = انفجار آتش‌و‌دودی و امتیاز با کمبو؛ شلیک غلط یا پایان زمان = یک ❤ کم می‌شود. خطا رفتن
              (شلیک به خالی) جریمه ندارد! صحنه با «شروع مأموریت» تمام‌صفحه می‌شود و با WASD داخل میدان می‌دوی —
              حرکت نرم با شتاب واقعی، Shift دویدن، Space پرش و C خم‌شدن؛ دیوارها، درها و جعبه‌ها پوشش واقعی‌اند و از داخلشان رد نمی‌شوی.
              سه سلاح داری — کلت، دژکوب سنگین و پمپ زون‌کن — با R ریلود می‌کنی و با کلیک راست اسکوپ می‌گیری،
              چهار نقشهٔ مأموریت با چیدمان متفاوت داری (جنگل، کویر، شب و دروازهٔ دو در به سبک دی‌داست۲ با برج دیدبانی)،
              حساسیت و زاویهٔ دید را در «گزینه‌ها» تنظیم می‌کنی و روی گوشی جوی‌استیک، شلیک، پرش و اسکوپ داری —
              دنبال گزینهٔ درست بگرد و بعد شلیک کن!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">حالت بازی</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    key: "word-hunt" as const,
                    title: "شکار واژه",
                    desc: "معنی فارسی روی HUD؛ واژهٔ انگلیسی درست را بین اهداف شکار کن.",
                    icon: Star,
                  },
                  {
                    key: "grammar-gate" as const,
                    title: "سد گرامری",
                    desc: "جملهٔ ناقص سؤال‌ها؛ گزینهٔ درست را نشانه بگیر و شلیک کن.",
                    icon: Swords,
                  },
                  {
                    key: "listening-hunt" as const,
                    title: "شنیداری",
                    desc: "سؤال پخش می‌شود، نه متن! واژهٔ شنیده‌شده را بین پهپادها پیدا و شکار کن.",
                    icon: Headphones,
                  },
                  {
                    key: "sentence-chain" as const,
                    title: "جملهٔ زنجیره",
                    desc: "سه واژه را به ترتیب شکار کن تا جمله از مکالمهٔ جزوه کامل شود.",
                    icon: ListOrdered,
                  },
                ] satisfies Array<{ key: Mode; title: string; desc: string; icon: typeof Star }>
              ).map((m) => (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={mode === m.key}
                  onClick={() => {
                    chipFeedback();
                    setMode(m.key);
                    setLesson(ALL_LESSONS);
                  }}
                  className={cn(
                    "min-h-11 rounded-2xl border p-3 text-right transition-all",
                    mode === m.key
                      ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                      : "hover:border-primary/30 hover:bg-muted/50",
                  )}
                >
                  <span className="flex items-center gap-2 text-[13px] font-black">
                    <m.icon size={16} className={mode === m.key ? "text-primary" : "text-muted-foreground"} />
                    {m.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* فاز F9 — سلاح مأموریت: سه سلاح با خشاب/ریلود/لگد متفاوت */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <Bomb size={14} className="text-emerald-500" />
              سلاح مأموریت
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {(Object.values(WEAPONS) as WeaponConfig[]).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  aria-pressed={weaponId === w.id}
                  onClick={() => setWeaponPref(w.id)}
                  className={cn(
                    "min-h-11 rounded-2xl border p-2.5 text-right transition-all",
                    weaponId === w.id
                      ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                      : "hover:border-primary/30 hover:bg-muted/50",
                  )}
                >
                  <span className="flex items-center gap-1.5 text-[12px] font-black">
                    <w.icon size={13} className={weaponId === w.id ? "text-primary" : "text-muted-foreground"} />
                    {w.name}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{w.desc}</span>
                  <Badge
                    variant="outline"
                    className="mt-1.5 border-emerald-500/30 px-1.5 py-0 text-[9px] font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    {w.stats}
                  </Badge>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              حین بازی با نگه‌داشتن کلیک راست (دسکتاپ) یا دکمهٔ ذره‌بین (گوشی) اسکوپ می‌گیری — نشانه‌گیری دقیق‌تر، دید باریک‌تر.
            </p>
          </div>

          {/* فاز F6/F10 — نقشهٔ مأموریت: چهار میدان با چیدمان واقعی متفاوت */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <MapPinned size={14} className="text-emerald-500" />
              نقشهٔ مأموریت
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.values(MAPS) as MapConfig[]).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={mapId === m.id}
                  onClick={() => setMapPref(m.id)}
                  className={cn(
                    "min-h-11 rounded-2xl border p-2.5 text-right transition-all",
                    mapId === m.id
                      ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                      : "hover:border-primary/30 hover:bg-muted/50",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("mb-2 block h-12 w-full rounded-xl border border-black/10 shadow-inner", m.swatch)}
                  />
                  <span className="flex items-center gap-1.5 text-[12px] font-black">
                    {m.id === "forest" ? (
                      <Trees size={13} className="text-emerald-500" />
                    ) : m.id === "desert" ? (
                      <Sun size={13} className="text-amber-500" />
                    ) : m.id === "night" ? (
                      <MoonStar size={13} className="text-teal-300" />
                    ) : (
                      <DoorOpen size={13} className="text-yellow-600" />
                    )}
                    {m.name}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              هر نقشه چیدمان خودش را دارد: دیوار، در، طاق و جعبه‌ها با برخورد واقعی — در «دروازهٔ دو در» (الهام از دی‌داست۲)
              درِ دوتایی میانه، گذرگاه بلند و تونل B داری. انتخابت ذخیره می‌شود؛ در «سکوت شب» کریستال‌ها درخشان‌ترند تا
              خوانایی حفظ شود.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button
                type="button"
                aria-pressed={lesson === ALL_LESSONS}
                onClick={() => {
                  chipFeedback();
                  setLesson(ALL_LESSONS);
                }}
                className={chipCls(lesson === ALL_LESSONS)}
              >
                کل کتاب ({faNum(poolCount)} {mode === "grammar-gate" ? "سؤال" : mode === "sentence-chain" ? "جمله" : "واژه"})
              </button>
              {mode === "grammar-gate"
                ? quizLessons.map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={lesson === l}
                      onClick={() => {
                        chipFeedback();
                        setLesson(l);
                      }}
                      className={chipCls(lesson === l)}
                    >
                      {lessonLabel(l)} ({faNum(quizSeed.filter((s) => s.lesson === l).length)})
                    </button>
                  ))
                : mode === "sentence-chain"
                  ? chainLessons.map((l) => (
                      <button
                        key={l.lesson}
                        type="button"
                        aria-pressed={lesson === l.lesson}
                        onClick={() => {
                          chipFeedback();
                          setLesson(l.lesson);
                        }}
                        className={chipCls(lesson === l.lesson)}
                      >
                        {lessonLabel(l.lesson)} ({faNum(l.count)} جمله)
                      </button>
                    ))
                  : wordLessons.map((l) => (
                    <button
                      key={l.lesson}
                      type="button"
                      aria-pressed={lesson === l.lesson}
                      onClick={() => {
                        chipFeedback();
                        setLesson(l.lesson);
                      }}
                      className={chipCls(lesson === l.lesson)}
                    >
                      {l.label} ({faNum(vocabAll.filter((w) => w.lesson === l.lesson).length)})
                    </button>
                  ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">سبک کنترل</p>
            <button
              type="button"
              aria-pressed={tapMode}
              onClick={() => {
                chipFeedback();
                setTapMode((v) => !v);
              }}
              className={chipCls(tapMode)}
            >
              <span className="inline-flex items-center gap-1.5">
                <MousePointerClick size={14} />
                تپ ساده (بدون شلیک) {tapMode ? "— فعال" : ""}
              </span>
            </button>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              {tapMode ? (
                <>تپ روی هدف کافی است؛ روی دسکتاپ هم کلیک روی هدف می‌زند و کلیدهای ۱ تا ۴ هدف را انتخاب می‌کنند.</>
              ) : (
                <>دسکتاپ: کلیک قفلِ نشانگر، حرکت موس نشانه‌گیری، کلیک بعدی شلیک — موبایل: کشیدن نگاه، تپ روی هدف شلیک.</>
              )}
            </p>
          </div>

          {/* فاز U1-00 — درجهٔ دشواری مأموریت: رفتار پهپاد تعقیب‌گر (سند fps-upgrade §U1) */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <Radar size={14} className="text-amber-500" />
              درجهٔ دشواری
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درجهٔ دشواری">
              <button
                type="button"
                aria-pressed={difficulty === "easy"}
                onClick={() => setDifficultyPref("easy")}
                className={chipCls(difficulty === "easy")}
              >
                آسان — بدون دشمن
              </button>
              <button
                type="button"
                aria-pressed={difficulty === "normal"}
                onClick={() => setDifficultyPref("normal")}
                className={chipCls(difficulty === "normal")}
              >
                عادی
              </button>
              <button
                type="button"
                aria-pressed={difficulty === "hard"}
                onClick={() => setDifficultyPref("hard")}
                className={chipCls(difficulty === "hard")}
              >
                سخت
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              {difficulty === "easy"
                ? "میدان بدون پهپاد تعقیب‌گر — تمرکز کامل روی واژه‌ها و گزینه‌ها."
                : difficulty === "hard"
                  ? "پهپاد تعقیب‌گر چابک: زودتر متوجه سکونت می‌شود و تندتر تعقیب می‌کند — با شلیک به بدنه‌اش او را می‌گریزانی."
                  : "پهپاد تعقیب‌گر در میدان گشت می‌زند؛ اگر ساکن بمانی نزدیک می‌شود — حرکت کن یا با شلیک او را عقب بران."}
            </p>
          </div>

          {/* فاز G2-e — تنظیم کیفیت گرافیک */}
          <div>
            <p className="mb-2 text-[13px] font-bold">کیفیت گرافیک</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب کیفیت گرافیک">
              <button
                type="button"
                aria-pressed={quality === "high"}
                onClick={() => setQualityPref("high")}
                className={chipCls(quality === "high")}
              >
                کیفیت عادی
              </button>
              <button
                type="button"
                aria-pressed={quality === "low"}
                onClick={() => setQualityPref("low")}
                className={chipCls(quality === "low")}
              >
                کیفیت سبک (گوشی)
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              {quality === "low"
                ? "کیفیت سبک: رزولوشن کمتر، بدون antialias، ذرات و اجسام تزئینی کمتر و ۳ هدف هم‌زمان به‌جای ۴ — روی گوشی‌های ضعیف روان‌تر است."
                : "کیفیت عادی: کامل‌ترین نمای صحنه (رفتار همیشگی بازی). انتخابت برای دفعات بعد ذخیره می‌شود."}
            </p>
          </div>

          {/* فاز F5 — گزینه‌های نگاه: حساسیت، FOV و وارون‌سازی عمودی */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <SlidersHorizontal size={14} className="text-emerald-500" />
              گزینه‌ها
            </p>
            <div className="space-y-4 rounded-2xl border p-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span id="fps-sens-label" className="text-[12px] font-bold">
                    حساسیت نگاه
                  </span>
                  <Badge variant="secondary" className="text-[11px]">
                    {faNum(Math.round(sens * 100))}٪
                  </Badge>
                </div>
                <Slider
                  aria-labelledby="fps-sens-label"
                  min={SENS_MIN * 100}
                  max={SENS_MAX * 100}
                  step={5}
                  value={[Math.round(sens * 100)]}
                  onValueChange={(v) => setSensPref((v[0] ?? SENS_DEF * 100) / 100)}
                />
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                  سرعت چرخش با موس و کشیدن لمسی — پیش‌فرض ۱۰۰٪.
                </p>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span id="fps-fov-label" className="text-[12px] font-bold">
                    زاویهٔ دید (FOV)
                  </span>
                  <Badge variant="secondary" className="text-[11px]">
                    {faNum(fov)}°
                  </Badge>
                </div>
                <Slider
                  aria-labelledby="fps-fov-label"
                  min={FOV_MIN}
                  max={FOV_MAX}
                  step={2}
                  value={[fov]}
                  onValueChange={(v) => setFovPref(v[0] ?? FOV_DEF)}
                />
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                  عدد بالاتر = دید بازتر در میدان — حین بازی هم زنده اعمال می‌شود.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-bold">وارون‌سازی عمودی</p>
                  <p className="text-[10px] leading-4 text-muted-foreground">
                    عادت بازیکنان کنسول — بالا کشیدن، نگاه به پایین.
                  </p>
                </div>
                <Switch checked={invertY} onCheckedChange={setInvertPref} aria-label="وارون‌سازی عمودی نگاه" />
              </div>
              {/* فاز U5 — صدای میدان جهت‌دار: پن چپ/راست منابع متخاصم + امضای شنیداری FSM */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-bold">صدای میدان (چپ/راست)</p>
                  <p className="text-[10px] leading-4 text-muted-foreground">
                    پهپاد، قفس و رئیس از سمت خودشان صدا می‌دهند — تعقیب، شارژ و گریز امضای شنیداری دارند.
                  </p>
                </div>
                <Switch checked={fieldSfx} onCheckedChange={setFieldSfxPref} aria-label="صدای میدان جهت‌دار" />
              </div>
            </div>
          </div>

          {!poolOk && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-[11px] leading-5 text-destructive">
              {mode === "word-hunt"
                ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_WORD)} واژه لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
                : mode === "sentence-chain"
                  ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_CHAIN)} جملهٔ مناسب لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
                  : `برای این انتخاب دست‌کم ${faNum(MIN_POOL_QUIZ)} سؤال لازم است — محدودهٔ دیگری را انتخاب کن.`}
            </div>
          )}

          {/* فاز F8 — هدف‌های هوشمند: فرار، موج، طلایی */}
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Zap size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              میدان هوشمند شد: <b>پهپادهای غلط</b> وقتی نشانه را رویشان نگه داری به کناره‌ها فرار می‌کنند — از زاویهٔ دیگر
              نزدیک شو! هر <b>۵ پاسخ</b> یک موج سخت‌تر با دشمنان سریع‌تر شروع می‌شود (تا موج ۶) و هر از گاهی
              <b>هدف ویژهٔ HVT</b> با حلقهٔ هشدار قرمز ۳ثانیه‌ای ظاهر می‌شود: حذفش ۲۰ امتیاز بونوس دارد و قلب نمی‌سوزاند.
              پایان مأموریت هم <b>رتبهٔ نظامی</b> می‌گیری (S تا D بر اساس دقت و امتیاز).
            </p>
          </div>

          {bestVal !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین امتیاز ({modeName(mode)}{tapMode ? " · تپ ساده" : ""}): {faNum(bestVal)}
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" disabled={!poolOk} onClick={start}>
            <Play size={18} />
            شروع مأموریت
          </Button>
        </CardContent>
      </Card>
      {/* فاز G2-e — آموزش یک‌بارنمایش در اولین ورود */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
