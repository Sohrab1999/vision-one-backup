"use client";

/**
 * بازی «شوتر آموزشی اول‌شخص» (Educational FPS) — فاز ۵ نقشه راه جامع ۲۰۲۶ + فاز G2-e نقشه راه بازی‌ها.
 *
 * میدان low-poly رنگی با three.js/@react-three/fiber (چانک جدا و lazy — صفر تأثیر روی بقیهٔ اپ):
 * - «شکار واژه»: معنی فارسی روی HUD، هدف‌های متحرک واژهٔ انگلیسی دارند.
 * - «سد گرامری»: جملهٔ ناقص روی HUD، هدف‌ها همان ۴ گزینهٔ تستاند.
 * - شلیک به هدف درست = انفجار آتش‌و‌دودی + امتیاز و کمبو + تلفظ؛ شلیک به هدف غلط یا پایان
 *   زمان = یک ❤ کم و واژه به صف «مرور هوشمند» برمی‌گردد. شلیک به خالی (خطا رفت) جریمه ندارد
 *   ولی بین شلیک‌ها فاصلهٔ کوتاه هست تا اسپم بی‌فایده نباشد.
 * - کنترل دسکتاپ: کلیک اول Pointer Lock، حرکت موس نشانه‌گیری و کلیک بعدی شلیک از رتیکل.
 * - کنترل لمسی: کشیدن = نگاه، تپ روی هدف = شلیک همان هدف.
 * - حالت دسترس‌پذیری «تپ ساده»: بدون قفل نشانگر و شلیک دقیق — تپ روی هدف کافی است؛
 *   روی کیبورد هم کلیدهای ۱ تا ۴ از چپ به راست هدف انتخاب می‌کنند.
 * - امتیاز با مدل Attempt (category = fps-shooter) ثبت و رکورد شخصی per-scope ذخیره می‌شود.
 *
 * فاز G2-e — کیت GameKit v2 (الگوی پایلوت memory / flappy G2-c-2):
 * - صدا/لرزش فقط در لحظهٔ رویداد، نه هر فریم: شلیک = «shoot» (داخل cooldown-gate تابع
 *   request — گارد «نه هر فریم»)، برخورد درست به واژهٔ هدف = «correct» + لرزش success،
 *   برخورد غلط / پایان زمان = «wrong» + لرزش error (هردو از handleHit/handleTimeout که
 *   R3F از useFrame صدا می‌زند — فقط لحظهٔ resolve برخورد)، پایان دور = «finish» (دور
 *   بی‌خطا = «win» — الگوی دارباز)، رکورد = «record». AudioContext با اولین ژست (چیپ‌های
 *   setup) آپ‌لاک می‌شود؛ شکست صدا هرگز بازی را نمی‌شکند (try/catch داخل کیت).
 * - تنظیم کیفیت گرافیک: دو چیپ «کیفیت عادی» / «کیفیت سبک (گوشی)» در setup — سبک:
 *   dpr پایین‌تر [0.7,1]، antialias خاموش، سایه‌ها صریحاً off، اجسام تزئینی/ذرات انفجار
 *   کمتر و ۳ هدف هم‌زمان به‌جای ۴؛ عادی: رفتار فعلی. انتخاب در Attempt detail افزودنی
 *   (detail.quality) و localStorage کلید افزودنی «visionone:game-pref:fps-quality»
 *   (پیش‌فرض عادی) می‌ماند — امضای saveAttempt/saveBest/bumpPlays و کلیدهای رکورد
 *   (scopeOf) دست‌نخورده.
 * - کمبو به موتور مشترک کیت منتقل شد (G1-09): useCombo({mode:"bonus", base:10,
 *   bonusCap:6, bonusStep:2}) — فرمول امتیاز مو‌به‌مو همان قبل: ۱۰ + min(کمبو−۱,۶)×۲.
 * - GameShell (هدر یکنواخت: امتیاز/کمبو/قلب/زمان در stats + liveMsg + کنترل‌های h-11 که
 *   حین صحنهٔ سه‌بعدی هم کار می‌کنند) + Pause با فریز واقعی حلقهٔ R3F (frameloop
 *   "never"/"always" — معادل cancel/resume الگوی flappy + آینهٔ pausedRef برای ورودی‌ها)
 *   + جبران دقیق مبدأ تایمر سؤال و زنجیرهٔ «فریز برخورد → سؤال بعد» با جمع زمان توقف از
 *   duration Attempt (pausedAccum — الگوی flappy/duel) + نگهبان خروج حین دور (تأیید →
 *   abandon("exit")) + ResultScreen استاندارد (ستارهٔ per-game: دقت ≥۹۰→۳ / ≥۷۰→۲ / بقیه ۱)
 *   + آموزش ۳گامی (هدف / نشانه‌گیری-شلیک / کیفیت گرافیک) با useAutoTutorial و راهنمای
 *   حین صحنه با توقف (pausedForHelpRef) + تله‌متری جلسه (level = حالت+کیفیت مثل word-tap:low).
 *
 * فاز F3 — تحول FPS (نقشه راه شوتر ۲۰۲۶):
 * - تمام‌صفحهٔ خودکار: کلیک «شروع مأموریت» (و «دوباره») صحنه را Fullscreen می‌کند (Esc =
 *   خروج؛ سینک با fullscreenchange) و نوار امتیاز/کمبو/قلب/زمان فشرده داخل قاب می‌آید
 *   چون هدر شِل بیرون قاب تمام‌صفحه است + دکمه‌های شناور توقف/خروج تمام‌صفحه (data-fps-hud
 *   تا شلیک حساب نشوند).
 * - تفنگ سه‌بعدی ویومدل: گروه low-poly چسبیده به دوربین (فرزند camera) با sway تنفسی،
 *   باب گام‌برداشتن، لگدِ recoil از رویداد شلیک (seq بریج) و جرقهٔ دهانه + نور نقطه‌ای.
 * - حرکت اول‌شخص WASD/جهت‌نما (e.code — مستقل از layout فارسی) با سرعت ثابت، باب سر و
 *   محدودهٔ امن میدان؛ جهت نسبت به yaw نگاه.
 * - چیدمان «جستوجو کن، پیدا کن، شلیک کن»: لِین‌ها عریض‌تر (±۶٫۸) و عمق پخش‌تر — پیدا
 *   کردن گزینهٔ درست چرخاندن و جابه‌جایی می‌خواهد.
 *
 * فاز F4 — کنترل حرفه‌ای موبایل + مکانیک خشاب:
 * - خشاب ۸تایی با شمارندهٔ مهمات روی HUD؛ هر شلیک یک فشنگ کم می‌کند، خالی شدن = ریلود
 *   خودکار (و R روی دسکتاپ / دکمهٔ ریلود روی موبایل) با صدای کلانک تعویض و چرخش آیکون.
 * - شلیک حین ریلود یا فریز برخورد مسدود است (مهمات هدر نمی‌رود) — گیت داخل request.
 * - جوی‌استیک لمسی چپ + دکمهٔ شلیک راست برای موبایل (فقط pointer:coarse و خارج از تپ
 *   ساده): بردار آنالوگ به stepPlayer تزریق می‌شود (deadzone + سرعت متناسب کمان) و دکمهٔ
 *   شلیک از رتیکل مرکز می‌زند؛ هر دو data-fps-hud تا شلیک صحنه حساب نشوند.
 * - افکت پوکهٔ برنجی: در هر شلیک از پورت خروج تفنگ به فضای جهانی پرتاب می‌شود — گرانش،
 *   اسپین و محو نرم؛ علاوه بر آن صدای «تاک» برخورد گلوله به هدف (صدا فقط لحظهٔ رویداد).
 *
 * فاز F5/F6/F7 — سه‌گانهٔ «گزینه‌ها، نقشه، محیط» (نسخهٔ ۲.۰ نقشه راه docs/fps-roadmap.md):
 * - گزینه‌ها (F5): حساسیت نگاه (۴۰–۲۲۰٪) روی موس و کشیدن لمسی، زاویهٔ دید FOV
 *   (۶۲–۹۶ درجه — زنده با updateProjectionMatrix) و وارون‌سازی عمودی (Invert Y) —
 *   همه ماندگار (کلیدهای افزودنی visionone:game-pref:fps-sens/fov/invert) + پنل
 *   «گزینه‌ها» در setup + تنظیمات سریع داخل اورلی توقف بدون خروج از دور.
 * - نقشه‌ها (F6): سه پالت کامل میدان با انتخاب ماندگار (visionone:game-pref:fps-map):
 *   «جنگل زمردی» (کلاسیک سبز)، «کویر کهربا» (غروب شنی با خورشید بزرگ) و «سکوت شب»
 *   (آسمان پرستاره + ماه + کریستال‌های درخشان) — هر نقشه رنگ پس‌زمینه/مه، زمین،
 *   حلقه‌ها، کوه‌ها، اجسام تزئینی، نور و بدنهٔ قاب خودش را دارد + detail.map در Attempt.
 * - محیط (F7): جعبه‌های پوشش با برخورد واقعی بازیکن (resolveCover — دایره‌ای ساده در
 *   فضای جهان)، ابلیسک‌های طرفین، سنگ‌ریزه و بوتهٔ پراکنده، ابرهای low-poly چرخان،
 *   آسمان پرستاره و خورشید/ماه با هاله — بودجهٔ عناصر در سه ترتیب کیفیت؛ همهٔ عناصر
 *   دکور هستند و خارج از registry رِی‌کست شلیک.
 *
 * فاز F8 — هدف‌های هوشمند (AI سبک — نسخهٔ ۲.۱ سند docs/fps-roadmap.md):
 * - فرار (Dodging): هدف‌های غلط وقتی نزدیک مرکز نشانه می‌شوند به کناره‌ها می‌گریزند —
 *   سرعت فرار با شمارهٔ موج بالا می‌رود؛ در «تپ ساده» و حین فریز برخورد غیرفعال است.
 * - موج‌بندی: هر ۵ پاسخ یک موج سخت‌تر (تا موج ۶) — چرخش/نوسان/راند اهداف و عمق چیدمان
 *   بیشتر + بج «موج n» در HUD و پیام aria-live + detail.wave در Attempt.
 * - هدف طلایی: هر ۱۱–۱۶ ثانیه (اولین: ۹ ثانیه) پاپ‌آپ ۳ثانیه‌ای طلایی — شکارش +۲۰ امتیاز
 *   بونوس خارج از چرخهٔ سؤال (بدون قلب/بدون جلو رفتن) با صدای جذاب و انفجار؛ زنجیرهٔ
 *   مستقل مقاوم به توقف (جبران gap) تا با زنجیرهٔ «فریز برخورد» تداخل نکند.
 *
 * فاز T1 — بازطراحی نظامی «ضدکرینج» (نسخهٔ ۲.۴ سند docs/fps-roadmap.md):
 * - هدف‌ها از اوکتاهدرون‌های رنگی به «پهپادهای متخاصم» تبدیل شدند: بدنهٔ فولادی تیره،
 *   کپسول‌های روتور دوطرف، بالهٔ رادار و حس‌گر قرمز رو به بازیکن — تشخیص گزینهٔ درست
 *   فقط با خواندن واژه است (همان قانون آموزشی)، ولی حالا حس «دشمن واقعی» دارد.
 * - انفجار رنگین‌کمانی → انفجار تاکتیکی آتش/دود: جرقهٔ سفیدِ داغ → نارنجی/قرمز → دودِ خاکستری سرد.
 * - هدف طلایی → «هدف ویژهٔ HVT» (High-Value Target): پهپاد فرمانده با حلقهٔ هشدار قرمز
 *   چرخان و حس‌گر پالس‌دار — همان +۲۰ بونوس، با چاشنی نظامی.
 * - رتبهٔ نظامی پایان مأموریت (S تا D) در صفحهٔ نتیجه + زبان مأموریت‌محور در همهٔ پیام‌ها
 *   (ایموجی‌های 🌟/⚡ حذف شد — حس حرفه‌ای شوتر).
 * - نقشهٔ «دروازهٔ دو در» غنی‌تر شد: برج دیدبانی اسپان، طبقهٔ دوم جعبهٔ میانی،
 *   کیسهٔ شنی A سایت و تونل B.
 *
 * فاز F9 — تنوع سلاح + اسکوپ (نسخهٔ ۲.۲ سند docs/fps-roadmap.md):
 * - سه سلاح انتخابی در setup با ماندگاری (visionone:game-pref:fps-weapon):
 *   «کلت تک‌تیر» (خشاب ۸، شلیک تند، ریلود کوتاه)، «دژکوب سنگین» (خشاب ۵، لگد +۴۵٪
 *   و انفجار بزرگ‌تر با صدای بم) و «پمپ زون‌کن» (خشاب ۴؛ هر ماشه سه پرتو می‌کاود —
 *   بهترین برخورد حساب می‌شود و جریمه فقط یک‌بار؛ طلایی+درست در یک والی = جایزهٔ دوگانه).
 * - اسکوپ لحظه‌ای: نگه‌داشتن Shift (دسکتاپ) یا دکمهٔ ذره‌بین (گوشی) — FOV با لِرپ نرم
 *   تیز می‌شود، سلاح به مرکز دید می‌آید، لرزش آرام و حساسیت نگاه کم می‌شود (حس اسنایپر).
 * - مدل سه‌بعدی جدا برای هر سلاح در ویومدل + انیمیشن تعویض (نیم‌چرخش هنگام سوار شدن)
 *   و انیمیشن ریلود (پایین‌رفتن + چرخش بر اساس زمان باقی‌مانده).
 *
 * فاز F10 — عمق یادگیری (الف + ج این دور؛ ب «جملهٔ زنجیره‌ای» دور بعد):
 * - حالت سوم «شنیداری» (listening-hunt): سؤال متن ندارد — واژهٔ انگلیسی با TTS پخش
 *   می‌شود (پخش خودکار ۴۲۰ms پس از نمایش سؤال + دکمهٔ «پخش دوباره» روی HUD + کلید V
 *   در دسکتاپ حین قفل نشانگر) و بازیکن باید پهپادِ همان واژه را بین اهداف شکار کند؛
 *   تشخیص فقط با شنیدن (قانون آموزشی). اسکوپ رکورد مستقل «listen» + level تله‌متری.
 * - «گزارش خطاها به دستیار هوشمند» در صفحهٔ نتیجه: متن گزارش (رتبه/دقت/فهرست خطاها)
 *   با tutor-seed به sessionStorage می‌رود و FreeChat آن را در ورودی چت می‌گذارد —
 *   کاربر مرور و ارسال می‌کند تا دستیار مینی‌تمرین بسازد (سقف روزانهٔ AI هدر نمی‌رود).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  ArrowBigUp,
  Bomb,
  Bot,
  Crosshair,
  DoorOpen,
  Flame,
  Headphones,
  Heart,
  Medal,
  MapPinned,
  Minimize2,
  MonitorSmartphone,
  MoonStar,
  MousePointerClick,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target as TargetIcon,
  Telescope,
  Timer,
  Trees,
  Trophy,
  Volume2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import { seedTutorPrompt } from "@/lib/tutor-seed";
import { requestView } from "@/lib/nav-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
// فاز G2-e — کیت GameKit v2 (قرارداد API سند)
import { playSound, toggleSoundMuted, isSoundMuted } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { ResultScreen } from "../kit/result-screen";
import {
  TutorialOverlay, useAutoTutorial, type TutorialStep } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import { useCombo, COMBO_FIRE_CLASS } from "../kit/combo-engine";

// ─── refactor گام ۳ — ماژول‌های تفکیک‌شده (جابه‌جایی مکانیکی بدون تغییر رفتار) ───

import {
  ALL_LESSONS,
  BURST_FULL,
  BURST_LOW,
  BURST_WEAK,
  COMBO_CAP,
  COMBO_STEP,
  DECO_LOW,
  DISTRACTORS_HIGH,
  DISTRACTORS_LOW,
  FOV_DEF,
  FOV_MAX,
  FOV_MIN,
  GAME_KEY,
  GOLDEN_BONUS,
  GOLDEN_EVERY_MAX,
  GOLDEN_EVERY_MIN,
  GOLDEN_FIRST_MS,
  GOLDEN_WINDOW_MS,
  HEARTS,
  HIT_FREEZE_MS,
  KEY_MOVE,
  LANE_X,
  MIN_POOL_QUIZ,
  MIN_POOL_WORD,
  Q_TIME_SHOOT,
  Q_TIME_TAP,
  QUALITY_KEY,
  SCOPE_SENS_RATIO,
  SHOOT_BASE,
  SENS_DEF,
  SENS_MAX,
  SENS_MIN,
  WAVE_MAX,
  WAVE_SIZE,
  type Quality,
} from "./constants";
import {
  WEAPONS,
  WEAPON_KEY,
  type WeaponConfig,
  type WeaponId,
} from "./weapons";
import { MAPS, type MapConfig, type MapId } from "./maps";
import { LAYOUTS } from "./layouts";
import {
  FOV_KEY,
  INVERT_KEY,
  MAP_KEY,
  SENS_KEY,
  loadMapPref,
  loadPrefBool,
  loadPrefNum,
  loadQuality,
  loadWeaponPref,
  savePref,
} from "./prefs";
import {
  BestRecord,
  BurstApi,
  Phase,
  Question,
  SceneBridge,
  WrongItem,
  type Mode,
} from "./types";
import {
  clamp,
  dropFullscreen,
  lessonLabel,
  missionRank,
  modeName,
  scopeOf,
} from "./helpers";
import { buildGrammarQuestion, buildListeningQuestion, buildWordQuestion } from "./questions";
import { FovTune, Rig } from "./scene/camera";
import { ViewModel } from "./scene/viewmodel";
import { Arena, World } from "./scene/world";
import {
  Burst,
  GoldenTarget,
  Target,
  type GoldenSpec,
} from "./scene/targets";
import { TouchJoystick } from "./scene/input";

// ─── فاز G2-e — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / flappy) ───

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Crosshair size={24} />,
    title: "پهپادهای متخاصم را حذف کن",
    text: "سؤال روی HUD بالای میدان می‌ماند و هر پهپاد متخاصم یک گزینهٔ انگلیسی روی پلاک دارد — دقیقاً به گزینهٔ درست شلیک کن. شلیک درست پهپاد را با انفجار آتش‌و‌دودی منفجر می‌کند و امتیاز با کمبو دارد. در حالت «شنیداری» سؤال خوانده نمی‌شود بلکه واژه پخش می‌شود — گوش کن و پهپادِ همان واژه را شکار کن؛ دکمهٔ «پخش دوباره» زیر سؤال است و در دسکتاپ کلید V هم دوباره پخش می‌کند.",
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
    icon: <MonitorSmartphone size={24} />,
    title: "نقشه‌ها و گزینه‌ها",
    text: "اگر صحنه روی گوشی سنگین بود، در تنظیمات «کیفیت سبک» را انتخاب کن. چهار نقشهٔ مأموریت با چیدمان واقعی متفاوت داری: جنگل زمردی (درخت و جعبه)، کویر کهربا (دیوار ماسه‌سنگی و طاق)، سکوت شب (جنگل کریستال) و دروازهٔ دو در — الهام از دی‌داست۲ با درِ دوتایی میانه، گذرگاه بلند، تونل B و برج دیدبانی. حساسیت نگاه، زاویهٔ دید (FOV) و وارون‌سازی عمودی را هم در بخش «گزینه‌ها» تنظیم کن — همهٔ انتخاب‌ها ذخیره می‌شوند و حین بازی هم از منوی توقف قابل تغییرند. پایان هر مأموریت رتبهٔ نظامی می‌گیری (S تا D).",
  },
];

// ─── بازی اصلی ───

export function FpsShooterGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("word-hunt");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [tapMode, setTapMode] = useState(false);
  const [locked, setLocked] = useState(false);
  // فاز G2-e — کیفیت گرافیک (ماندگار؛ پیش‌فرض عادی)
  const [quality, setQuality] = useState<Quality>(() => loadQuality());
  // ── فاز F5 — گزینه‌های نگاه (ماندگار) ──
  const [sens, setSens] = useState(() => loadPrefNum(SENS_KEY, SENS_DEF, SENS_MIN, SENS_MAX));
  const [fov, setFov] = useState(() => loadPrefNum(FOV_KEY, FOV_DEF, FOV_MIN, FOV_MAX));
  const [invertY, setInvertY] = useState(() => loadPrefBool(INVERT_KEY, false));
  // ── فاز F6 — نقشهٔ مأموریت (ماندگار) ──
  const [mapId, setMapId] = useState<MapId>(() => loadMapPref());
  // ── فاز F9 — سلاح انتخابی (ماندگار) + اسکوپ لحظه‌ای ──
  const [weaponId, setWeaponId] = useState<WeaponId>(() => loadWeaponPref());
  const [scoped, setScoped] = useState(false);
  /** آینهٔ اسکوپ برای مسیرهای بدون ری‌رندر (حساسیت نگاه در ورودی) */
  const scopedRef = useRef(false);
  const setScopeSafe = useCallback((v: boolean) => {
    if (scopedRef.current === v) return;
    scopedRef.current = v;
    setScoped(v);
  }, []);
  // ── فاز F3 — تمام‌صفحه هنگام شروع مأموریت (Fullscreen API با فال‌بک webkit) ──
  const [isFs, setIsFs] = useState(false);
  const wantFsRef = useRef(false);

  // ── HUD حین بازی ──
  const [q, setQ] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  const [timeLeft, setTimeLeft] = useState(Q_TIME_SHOOT);
  // ── فاز F4 — خشاب و ریلود ──
  const [ammo, setAmmo] = useState(() => WEAPONS[weaponId].mag);
  const [reloading, setReloading] = useState(false);
  /** فاز G2-e — پیام باکس aria-live شِل (برخورد/خطا/توقف) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  // ── فاز F8 — موج‌بندی + هدف طلایی ──
  const [wave, setWave] = useState(1);
  const [goldenActive, setGoldenActive] = useState(false);
  const [goldenLeft, setGoldenLeft] = useState(0);
  const [goldenSpec, setGoldenSpec] = useState<GoldenSpec | null>(null);

  // ── فاز G2-e — موتور کمبو مشترک کیت (G1-09) ──
  // حالت bonus = دقیقاً قانون فعلی شوتر: gained = ۱۰ + min(کمبو−۱, ۶) × ۲ (امتیاز یکسان می‌ماند)
  const {
    combo,
    comboRef: comboCountRef,
    maxComboRef,
    registerCorrect,
    registerMiss,
    reset: resetCombo,
  } = useCombo({ mode: "bonus", base: SHOOT_BASE, bonusCap: COMBO_CAP, bonusStep: COMBO_STEP });

  // ── stateهای فاز done ──
  const [isRecord, setIsRecord] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [elapsed, setElapsed] = useState(0);

  // ── استخر داده ──
  const vocabAll = data.vocab.all;
  const quizSeed = data.quiz.seed;
  const wordPool = useMemo(
    () => (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson)),
    [vocabAll, lesson],
  );
  const quizPool = useMemo(
    () => (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson)),
    [quizSeed, lesson],
  );
  const wordLessons = data.vocab.lessons;
  const quizLessons = useMemo(
    () => [...new Set(quizSeed.map((s) => s.lesson))].sort((a, b) => a - b),
    [quizSeed],
  );
  const poolOk = mode === "grammar-gate" ? quizPool.length >= MIN_POOL_QUIZ : wordPool.length >= MIN_POOL_WORD;
  const poolCount = mode === "grammar-gate" ? quizPool.length : wordPool.length;

  // تشخیص دستگاه ضعیف — کاهش ذرات/antialias/dpr در کیفیت عادی
  const weak = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as Navigator & { deviceMemory?: number };
    return (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  }, []);
  const isCoarse = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // ── فاز G2-e — توقف/ادامهٔ استاندارد کیت + آینه‌ها و جمع زمان توقف (الگوی flappy) ──
  const pausedRef = useRef(false);
  /** مبدأ توقف جاری برای جبران دقیق مبدأ تایمر سؤال */
  const pauseStartRef = useRef(0);
  /** جمع زمان‌های توقف — مدت Attempt نباید توقف‌ها را حساب کند */
  const pausedAccumRef = useRef(0);

  // ── دنیای بازی — مالک: رویدادها و refs ──
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bridge = useRef<SceneBridge>({
    aim: { yaw: 0, pitch: 0 },
    pos: { x: 0, z: 0 },
    keys: new Set<string>(),
    moveMag: 0,
    stick: { x: 0, y: 0 },
    vel: { x: 0, z: 0 },
    vy: 0,
    jumpY: 0,
    wantJump: false,
    crouchAmt: 0,
    sprint: false,
    speedKick: 0,
    layout: LAYOUTS.forest,
    shoot: { x: 0, y: 0, seq: 0, spread: 0, burst: 1 },
    lastShotAt: 0,
    laneK: 1,
    flashes: [],
    scopeAmt: 0,
    reloadUntil: 0,
    onHit: () => {},
    dodge: false,
    wave: 1,
  });
  const meshRegistry = useRef<THREE.Mesh[]>([]);
  const burstApi = useRef<BurstApi | null>(null);
  const deckRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const deckIdxRef = useRef(0);
  const poolRef = useRef<Array<VocabEntry | QuizQuestionSeed>>([]);
  const distrRef = useRef<VocabEntry[]>([]);
  const modeRef = useRef<Mode>(mode);
  const qTimeRef = useRef(Q_TIME_SHOOT);
  const deadlineRef = useRef(0);
  const lockedRef = useRef(false);
  const overRef = useRef(false);
  const startedAtRef = useRef(0);
  const seqRef = useRef(0);
  const scoreRef = useRef(0);
  const heartsRef = useRef(HEARTS);
  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef<WrongItem[]>([]);
  const finishRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<() => void>(() => {});
  const advanceRef = useRef<() => void>(() => {});
  const voiceSpeedRef = useRef(speed);
  const tapRef = useRef(tapMode);
  const qualityRef = useRef<Quality>(quality);
  const qRef = useRef<Question | null>(null);
  // ── فاز F8 — مراجع موج (بدون ری‌رندر در مسیرهای داخل حلقهٔ بازی) ──
  const waveRef = useRef(1);
  const maxWaveRef = useRef(1);
  // ── فاز F5/F6 — مراجع گزینه‌ها/نقشه برای مسیرهای بدون ری‌رندر (ورودی نگاه + Attempt) ──
  const sensRef = useRef(sens);
  const invertRef = useRef(invertY);
  const mapIdRef = useRef<MapId>(mapId);
  // ── فاز F9 — سلاح جاری (latest-ref برای حلقهٔ شلیک) ──
  const weaponRef = useRef<WeaponId>(weaponId);
  // ── فاز F4 — مراجع خشاب/ریلود (چرخهٔ شلیک داخل effect فقط با ref — بدون dep churn) ──
  const ammoRef = useRef(WEAPONS[loadWeaponPref()].mag);
  const reloadUntilRef = useRef(0);
  const reloadTimerRef = useRef<number | null>(null);
  const autoReloadTimerRef = useRef<number | null>(null);
  /** شلیک از رتیکل مرکز — دکمهٔ شلیک موبایل از این استفاده می‌کند (داخل effect مقدار می‌گیرد) */
  const shootAtRef = useRef<(x: number, y: number) => void>(() => {});
  /** ریلود دستی (R / دکمه) — latest-ref الگوی کیت */
  const reloadNowRef = useRef<() => void>(() => {});

  // ── فاز F4/F9 — ریلود: صدای کلانک + پر شدن خشاب بعد از ریلود سلاح جاری ──
  const triggerReload = useCallback(() => {
    const cfg = WEAPONS[weaponRef.current];
    if (overRef.current || ammoRef.current >= cfg.mag) return;
    if (reloadUntilRef.current > performance.now()) return; // در حال ریلود
    reloadUntilRef.current = performance.now() + cfg.reloadMs;
    bridge.current.reloadUntil = reloadUntilRef.current; // فاز F9 — انیمیشن ویومدل
    setReloading(true);
    playSound("reload");
    buzz("light");
    if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
    reloadTimerRef.current = window.setTimeout(() => {
      reloadTimerRef.current = null;
      reloadUntilRef.current = 0;
      bridge.current.reloadUntil = 0;
      ammoRef.current = WEAPONS[weaponRef.current].mag;
      setAmmo(WEAPONS[weaponRef.current].mag);
      setReloading(false);
    }, cfg.reloadMs);
  }, []);
  useEffect(() => {
    reloadNowRef.current = triggerReload;
  }, [triggerReload]);
  // پاک‌سازی تایمرهای خشاب در unmount
  useEffect(
    () => () => {
      if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
      if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
    },
    [],
  );

  // ── فاز G2-e — زنجیرهٔ «فریز برخورد → سؤال بعد/پایان» مقاوم به توقف (الگوی دوئل G2-d) ──
  // به‌جای setTimeout خام: زمان سررسید با «ساعت جبران‌شده» نگه داشته می‌شود؛ حین توقف
  // تایمر کامل برچیده می‌شود و بعد از ادامه با همان زمان باقی‌مانده دوباره مسلح می‌شود.
  const chainTimerRef = useRef<number | null>(null);
  const chainPendingRef = useRef<{ due: number; fn: () => void } | null>(null);

  const clearTimers = useCallback(() => {
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
    chainPendingRef.current = null;
  }, []);

  const scheduleChain = useCallback(() => {
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
    const pend = chainPendingRef.current;
    if (!pend || pausedRef.current || overRef.current) return;
    chainTimerRef.current = window.setTimeout(() => {
      chainTimerRef.current = null;
      const cur = chainPendingRef.current;
      chainPendingRef.current = null;
      cur?.fn();
    }, Math.max(0, pend.due - performance.now()));
  }, []);

  /** زمان‌بندی داخل زنجیرهٔ مقاوم به توقف — جایگزین setTimeout خام الگوی قبلی */
  const later = useCallback(
    (fn: () => void, ms: number) => {
      chainPendingRef.current = { due: performance.now() + ms, fn };
      if (pausedRef.current) return; // حین توقف فقط ثبت می‌شود — ادامه با resume (scheduleChain)
      scheduleChain();
    },
    [scheduleChain],
  );

  // ── فاز F8 — زنجیرهٔ مستقل هدف طلایی (مقاوم به توقف — الگوی زنجیرهٔ اصلی؛ اسلات جدا تا
  // با «فریز برخورد → سؤال بعد» تداخل نکند) ──
  const goldenTimerRef = useRef<number | null>(null);
  const goldenPendingRef = useRef<{ due: number; fn: () => void } | null>(null);
  /** پنجرهٔ باز هدف طلایی — صفر = غیرفعال/مصرف‌شده */
  const goldenUntilRef = useRef(0);

  const scheduleGoldenChain = useCallback(() => {
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    const pend = goldenPendingRef.current;
    if (!pend || pausedRef.current || overRef.current) return;
    goldenTimerRef.current = window.setTimeout(() => {
      goldenTimerRef.current = null;
      const cur = goldenPendingRef.current;
      goldenPendingRef.current = null;
      cur?.fn();
    }, Math.max(0, pend.due - performance.now()));
  }, []);

  const goldenLater = useCallback(
    (fn: () => void, ms: number) => {
      goldenPendingRef.current = { due: performance.now() + ms, fn };
      if (pausedRef.current) return;
      scheduleGoldenChain();
    },
    [scheduleGoldenChain],
  );

  // فاز F8 — latest-ref برای فرار از وابستگی حلقوی spawn ↔ despawn
  const spawnGoldenRef = useRef<() => void>(() => {});
  const despawnGoldenRef = useRef<() => void>(() => {});

  // فاز F8 — ظهور هدف طلایی: ۳ ثانیه فرصت شکار +۲۰ امتیاز بونوس (خارج از چرخهٔ سؤال)
  const spawnGolden = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    const lane = LANE_X[Math.floor(Math.random() * LANE_X.length)];
    setGoldenSpec({ lane, y: 1.25 + Math.random() * 0.95, z: -(5.5 + Math.random() * 3.6) });
    goldenUntilRef.current = performance.now() + GOLDEN_WINDOW_MS;
    setGoldenActive(true);
    setGoldenLeft(3);
    playSound("golden");
    setLiveMsg(`هدف ویژهٔ HVT ظاهر شد! تا ۳ ثانیه حذفش کن — +${faNum(GOLDEN_BONUS)} امتیاز`);
    goldenLater(() => despawnGoldenRef.current(), GOLDEN_WINDOW_MS);
  }, [goldenLater]);

  // فاز F8 — پایان فرصت هدف طلایی (شکار نشد) + زمان‌بندی ظهور بعدی
  const despawnGolden = useCallback(() => {
    if (goldenUntilRef.current > 0 && performance.now() >= goldenUntilRef.current - 60) {
      goldenUntilRef.current = 0;
      setGoldenActive(false);
      setGoldenSpec(null);
    }
    if (!overRef.current) {
      goldenLater(
        () => spawnGoldenRef.current(),
        GOLDEN_EVERY_MIN + Math.floor(Math.random() * (GOLDEN_EVERY_MAX - GOLDEN_EVERY_MIN)),
      );
    }
  }, [goldenLater]);

  useEffect(() => {
    spawnGoldenRef.current = spawnGolden;
    despawnGoldenRef.current = despawnGolden;
  });

  // فاز G2-e — هوک توقف کیت: onChange → آینهٔ pausedRef (گارد ورودی‌ها) + فریز/احیای حلقهٔ
  // R3F با frameloop + جبران دو-نیمهٔ مبدأ تایمر سؤال + جمع زمان توقف برای duration Attempt.
  // auto-pause در تب مخفی از خود هوک می‌آید — در بازگشت اورلی «متوقف شد» دیده می‌شود.
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = performance.now();
      // قفل نشانگر حین توقف آزاد شود تا اورلی با موس قابل استفاده باشد
      if (document.pointerLockElement) document.exitPointerLock();
    } else if (pauseStartRef.current > 0) {
      // جبران دو-نیمهٔ امن (تعمیم الگوی G0-05/duel): مدت توقف به مبدأ تایمر سؤال و
      // سررسید زنجیرهٔ برخورد افزوده می‌شود و به جمع زمان توقف Attempt می‌رود.
      const gap = performance.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
      if (gap > 0) {
        pausedAccumRef.current += gap;
        if (phase === "playing" && !overRef.current) {
          deadlineRef.current += gap;
          if (chainPendingRef.current) chainPendingRef.current.due += gap;
          // فاز F8 — جبران هدف طلایی: پنجره و زمان‌بندی بعدی هم جابه‌جا شود
          if (goldenUntilRef.current > 0) goldenUntilRef.current += gap;
          if (goldenPendingRef.current) goldenPendingRef.current.due += gap;
        }
      }
    }
    // فریز/احیای زنجیرهٔ «فریز برخورد → سؤال بعد/پایان»
    scheduleChain();
    scheduleGoldenChain();
    if (phase === "playing" && !overRef.current) setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });

  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای گارد شلیک/کیبورد حین باز بودن دیالوگ نگهبان */
  const exitAskRef = useRef(false);
  const setExitAskSafe = useCallback((v: boolean) => {
    exitAskRef.current = v;
    setExitAsk(v);
  }, []);

  // الگوی دارباز/فلپی: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // فاز G2-e — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین صحنه (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    dropFullscreen(); // فاز F3 — دیالوگ portal-body در تمام‌صفحه دیده نمی‌شود؛ اول خارج شو
    if (phase === "playing") {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }, [openTutorial, pauseGame, phase]);
  const handleTutorialClose = useCallback(() => {
    closeTutorial();
    if (pausedForHelpRef.current) {
      pausedForHelpRef.current = false;
      resume();
    }
  }, [closeTutorial, resume]);
  const handleTutorialOpenChange = useCallback(
    (o: boolean) => {
      if (!o) handleTutorialClose();
    },
    [handleTutorialClose],
  );

  // فاز G2-e — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // الگوی latest-ref — effect بدون dep
  useEffect(() => {
    voiceSpeedRef.current = speed;
    tapRef.current = tapMode;
    qualityRef.current = quality;
    qRef.current = q;
    sensRef.current = sens;
    invertRef.current = invertY;
    mapIdRef.current = mapId;
    weaponRef.current = weaponId;
  });

  // فاز G2-e — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
    },
    [],
  );

  // ── سؤال بعدی (reshuffle در اتمام استخر) ──
  const advanceImpl = useCallback(() => {
    if (overRef.current) return;
    const pool = poolRef.current;
    if (pool.length === 0) {
      finishRef.current();
      return;
    }
    if (deckIdxRef.current >= deckRef.current.length) {
      deckRef.current = shuffle(pool);
      deckIdxRef.current = 0;
    }
    const item = deckRef.current[deckIdxRef.current++] as VocabEntry | QuizQuestionSeed;
    // فاز G2-e — کیفیت سبک: ۳ هدف هم‌زمان به‌جای ۴
    const maxOthers = qualityRef.current === "low" ? DISTRACTORS_LOW : DISTRACTORS_HIGH;
    // فاز F8 — موج‌بندی: هر WAVE_SIZE پاسخ یک موج سخت‌تر (حرکت سریع‌تر + چیدمان عمیق‌تر)
    const w = Math.min(WAVE_MAX, Math.floor(totalRef.current / WAVE_SIZE) + 1);
    if (w !== waveRef.current) {
      waveRef.current = w;
      maxWaveRef.current = Math.max(maxWaveRef.current, w);
      setWave(w);
      bridge.current.wave = w;
      playSound("wave");
      setLiveMsg(`موج ${faNum(w)} — پهپادهای متخاصم سریع‌تر شدند`);
    }
    // فاز F8 — فرار هدف‌های غلط فقط در حالت شلیک (تپ ساده = دسترس‌پذیری بدون فرار)
    bridge.current.dodge = !tapRef.current;
    const next =
      modeRef.current === "grammar-gate"
        ? buildGrammarQuestion(++seqRef.current, item as QuizQuestionSeed, lesson, maxOthers, w)
        : modeRef.current === "listening-hunt"
          ? buildListeningQuestion(++seqRef.current, item as VocabEntry, distrRef.current, lesson, maxOthers, w)
          : buildWordQuestion(++seqRef.current, item as VocabEntry, distrRef.current, lesson, maxOthers, w);
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    lockedRef.current = false;
    deadlineRef.current = performance.now() + qTimeRef.current * 1000;
    setQ(next);
    setTimeLeft(qTimeRef.current);
  }, [lesson]);
  useEffect(() => {
    advanceRef.current = advanceImpl;
  });

  // ── فاز F10-a — حالت شنیداری: سؤال با پخش خودکار واژه مطرح می‌شود ──
  // (پس از کلیک «شروع مأموریت» فعال‌سازی کاربر در دست است — speechSynthesis/Audio مجاز است؛
  //  اگر بازیکن فوراً توقف کرده باشد پخش نمی‌کنیم تا صدا روی اورلی توقف پخش نشود)
  useEffect(() => {
    if (!q || q.mode !== "listening-hunt" || phase !== "playing") return;
    const t = window.setTimeout(() => {
      if (pausedRef.current || exitAskRef.current) return;
      void speak(q.speakText, { speed: voiceSpeedRef.current });
    }, 420);
    return () => window.clearTimeout(t);
  }, [q, phase]);

  const advance = useCallback(() => advanceRef.current(), []);

  // ── پایان دور — الگوی طلایی فاز ۳/۴ ──
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    clearTimers();
    // فاز F8 — هدف طلایی خاموش + زنجیرهٔ آن برچیده شود
    goldenUntilRef.current = 0;
    goldenPendingRef.current = null;
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    setGoldenActive(false);
    setGoldenSpec(null);
    stopSpeaking();
    const total = totalRef.current;
    const final = scoreRef.current;
    // فاز G2-e — مدت دور بدون احتساب جمع زمان‌های توقف (الگوی flappy)
    const took = Math.max(
      1,
      Math.round((performance.now() - startedAtRef.current - pausedAccumRef.current) / 1000),
    );
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G2-e — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: correctRef.current,
        duration: took,
        // فاز G2-e — detail افزودنی: quality (امضای AttemptPayload دست‌نخورده)
        // فاز F5/F6 — افزودنی: گزینه‌های نگاه + نقشهٔ مأموریت
        detail: {
          score: final,
          maxCombo: maxComboRef.current,
          mode: modeRef.current,
          tap: tapRef.current,
          quality: qualityRef.current,
          map: mapIdRef.current,
          sens: Math.round(sensRef.current * 100) / 100,
          invert: invertRef.current,
          wave: maxWaveRef.current,
          // فاز F9 — افزودنی: سلاح مأموریت
          weapon: weaponRef.current,
        },
      });
    }
    const scope = scopeOf(modeRef.current, tapRef.current);
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    if (final > 0 && final > (prev?.score ?? 0)) {
      saveBest(activeBookId, GAME_KEY, scope, { score: final });
      setIsRecord(prev !== null);
      if (prev !== null) {
        // فاز G2-e — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(final)} امتیاز 🏆`);
      }
    } else {
      setIsRecord(false);
    }
    // فاز G2-e — بازخورد پایان دور: برد کامل (بی‌خطا) = win — الگوی دارباز؛ بقیه = finish
    if (total > 0 && correctRef.current === total) {
      playSound("win");
      buzz("success");
    } else {
      playSound("finish");
      buzz("success");
    }
    setFinalScore(final);
    setCorrectCount(correctRef.current);
    setWrongCount(total - correctRef.current);
    setWrongList([...wrongRef.current]);
    setElapsed(took);
    setPhase("done");
  }, [activeBookId, lesson, clearTimers, maxComboRef]);
  useEffect(() => {
    finishRef.current = finish;
  });

  // ── فاز F10-c — گزارش خطاهای مأموریت به دستیار هوشمند ──
  // متن آماده در sessionStorage نوشته می‌شود و FreeChat هنگام سوار شدن مصرفش می‌کند؛
  // ارسال خودکار نه — کاربر مرور و ارسال می‌کند (سقف روزانهٔ دستیار بی‌دلیل مصرف نشود).
  const sendMissionReport = useCallback(() => {
    if (wrongList.length === 0) return;
    const shots = correctCount + wrongCount;
    const acc = shots > 0 ? Math.round((correctCount / shots) * 100) : 0;
    const rank = missionRank(acc, finalScore);
    const lines = wrongList.map((w, i) => `${faNum(i + 1)}) ${w.label}${w.sub ? ` — معنی: ${w.sub}` : ""}`);
    seedTutorPrompt(
      `سلام! تازه یک دور «شوتر آموزشی» ویژن‌وان تمام کردم — رتبهٔ ${rank.grade} (${rank.title}) با دقت ${faNum(acc)}٪.\n` +
        `این ${faNum(wrongList.length)} مورد را جا انداختم؛ لطفاً از همین‌ها یک مینی‌تمرین کوتاه (حدود ۳ دقیقه) بساز:\n${lines.join("\n")}`,
    );
    playSound("click");
    requestView("tutor");
  }, [wrongList, correctCount, wrongCount, finalScore]);

  // ── فاز G2-e — نگهبان خروج: انصراف حین صحنه ──
  // با هر پیشرفت، GameExitGuard (صحنه حین دیالوگ فریز شود)؛ پیش از اولین شلیک، خروج مستقیم.
  const handleExitClick = useCallback(() => {
    if (document.pointerLockElement) document.exitPointerLock();
    dropFullscreen(); // فاز F3 — دیالوگ خروج باید بیرون تمام‌صفحه دیده شود
    if (totalRef.current > 0 || scoreRef.current > 0) {
      pauseGame();
      setExitAskSafe(true);
    } else {
      overRef.current = true;
      clearTimers();
      stopSpeaking();
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setExitAskSafe(false);
      setPhase("setup");
    }
  }, [pauseGame, resume, setExitAskSafe, clearTimers]);

  // ── پاسخ به شلیک/تپ — فاز G2-e: بازخورد سه‌کاناله فقط در لحظهٔ رویداد برخورد ──
  const handleHit = useCallback(
    (id: string | null) => {
      if (overRef.current || id === null) return;
      if (pausedRef.current || exitAskRef.current) return;
      // فاز F8 — شکار هدف طلایی: بونوس خارج از چرخهٔ سؤال (نه پاسخ، نه قلب، نه جلو رفتن)
      if (id === "golden") {
        if (goldenUntilRef.current <= 0) return;
        goldenUntilRef.current = 0;
        setGoldenActive(false);
        setGoldenSpec(null);
        goldenPendingRef.current = null;
        if (goldenTimerRef.current !== null) {
          window.clearTimeout(goldenTimerRef.current);
          goldenTimerRef.current = null;
        }
        scoreRef.current += GOLDEN_BONUS;
        setScore(scoreRef.current);
        playSound("golden");
        buzz("success");
        setLiveMsg(`هدف ویژهٔ HVT حذف شد! +${faNum(GOLDEN_BONUS)} امتیاز`);
        goldenLater(
          () => spawnGoldenRef.current(),
          GOLDEN_EVERY_MIN + Math.floor(Math.random() * (GOLDEN_EVERY_MAX - GOLDEN_EVERY_MIN)),
        );
        return;
      }
      const cur = qRef.current;
      if (lockedRef.current || !cur) return;
      const target = cur.targets.find((t) => t.id === id);
      if (!target) return;
      // فاز F4 — صدای «تاک» برخورد گلوله به بدنهٔ هدف (قبل از زنگ درست/غلط)
      playSound("hit");
      const now = performance.now();
      if (target.correct) {
        // برخورد درست — امتیاز از موتور کمبو کیت (فرمول مو‌به‌مو: ۱۰ + min(کمبو−۱,۶)×۲)
        const gained = registerCorrect();
        scoreRef.current += gained;
        totalRef.current += 1;
        correctRef.current += 1;
        setScore(scoreRef.current);
        lockedRef.current = true;
        bridge.current.flashes = [{ id: target.id, kind: "ok", until: now + HIT_FREEZE_MS }];
        void speak(cur.speakText, { speed: voiceSpeedRef.current });
        // فاز G2-e — بازخورد سه‌کانالهٔ برخورد درست (لحظهٔ رویداد داخل حلقهٔ R3F، نه هر فریم)
        playSound("correct");
        buzz("success");
        setLiveMsg(`+${faNum(gained)} امتیاز — کمبو ×${faNum(comboCountRef.current)} 🔥`);
        later(() => advance(), HIT_FREEZE_MS);
      } else {
        // برخورد غلط — کمبو صفر (کیت)، یک ❤ کم، صف مرور
        registerMiss();
        totalRef.current += 1;
        wrongRef.current.push({ label: cur.srsKey, sub: cur.promptMain });
        seedReviewFromQuiz(cur.srsKey);
        heartsRef.current -= 1;
        setHearts(heartsRef.current);
        lockedRef.current = true;
        const good = cur.targets.find((t) => t.correct);
        bridge.current.flashes = [
          { id: target.id, kind: "bad", until: now + HIT_FREEZE_MS },
          ...(good ? [{ id: good.id, kind: "ok" as const, until: now + HIT_FREEZE_MS }] : []),
        ];
        // فاز G2-e — بازخورد سه‌کانالهٔ برخورد غلط
        playSound("wrong");
        buzz("error");
        setLiveMsg(`گزینهٔ غلط — پاسخ درست «${cur.srsKey}» بود — یک ❤ کم شد`);
        if (heartsRef.current <= 0) {
          later(() => finishRef.current(), HIT_FREEZE_MS);
        } else {
          later(() => advance(), HIT_FREEZE_MS);
        }
      }
    },
    [advance, later, registerCorrect, registerMiss, comboCountRef, goldenLater],
  );
  useEffect(() => {
    bridge.current.onHit = handleHit;
  });

  // ── فاز F9 — والی پمپ: سه برخورد یکجا → بهترین نتیجه (درست > طلایی > غلط؛ جریمه فقط یک‌بار) ──
  const handleHitRef = useRef(handleHit);
  useEffect(() => {
    handleHitRef.current = handleHit;
  });
  const handleVolley = useCallback((ids: Array<string | null>) => {
    const hits = [...new Set(ids.filter((x): x is string => x !== null))];
    if (hits.length === 0) return; // والی خالی = خطا رفتن — بی‌جریمه (الگوی شلیک به خالی)
    const cur = qRef.current;
    const correctId = cur && !lockedRef.current ? cur.targets.find((t) => t.correct)?.id : undefined;
    const hasCorrect = correctId !== undefined && hits.includes(correctId);
    // جایزهٔ دوگانهٔ پمپ: طلایی + درست در یک والی — هر دو حساب می‌شوند
    if (hasCorrect && hits.includes("golden")) handleHitRef.current("golden");
    if (hasCorrect) {
      handleHitRef.current(correctId as string);
      return;
    }
    if (hits.includes("golden")) {
      handleHitRef.current("golden");
      return;
    }
    handleHitRef.current(hits[0]);
  }, []);
  useEffect(() => {
    bridge.current.onVolley = handleVolley;
  });

  // ── پایان زمان سؤال — فاز G2-e: بازخورد سه‌کانالهٔ خطا ──
  const handleTimeout = useCallback(() => {
    const cur = qRef.current;
    if (overRef.current || lockedRef.current || !cur) return;
    registerMiss();
    totalRef.current += 1;
    wrongRef.current.push({ label: cur.srsKey, sub: cur.promptMain });
    seedReviewFromQuiz(cur.srsKey);
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    setTimeLeft(0);
    lockedRef.current = true;
    const good = cur.targets.find((t) => t.correct);
    bridge.current.flashes = good
      ? [{ id: good.id, kind: "ok", until: performance.now() + HIT_FREEZE_MS }]
      : [];
    playSound("wrong");
    buzz("error");
    setLiveMsg(`زمان تمام شد — پاسخ «${cur.srsKey}» بود — یک ❤ کم شد`);
    if (heartsRef.current <= 0) {
      later(() => finishRef.current(), HIT_FREEZE_MS);
    } else {
      later(() => advance(), HIT_FREEZE_MS);
    }
  }, [later, registerMiss]);
  useEffect(() => {
    timeoutRef.current = handleTimeout;
  });

  // ── تایمر سؤال — ۵ بار در ثانیه، فقط روی رویداد گسسته setState ──
  // فاز G2-e: حین توقف فریز است؛ مبدأ deadline بعد از ادامه با جبران دقیق gap جبران می‌شود.
  useEffect(() => {
    if (phase !== "playing") return;
    const iv = window.setInterval(() => {
      if (overRef.current) return;
      if (pausedRef.current) return; // فریز حین توقف — جبران در onChange ادامه
      // فاز F8 — شمارش معکوس فرصت هدف طلایی (روی رویداد گسسته — نه هر فریم)
      if (goldenUntilRef.current > 0) {
        setGoldenLeft(Math.max(0, Math.ceil((goldenUntilRef.current - performance.now()) / 1000)));
      }
      if (lockedRef.current) {
        deadlineRef.current += 200; // توقف زمان در فاصلهٔ بین سؤال‌ها
        return;
      }
      const left = Math.max(0, (deadlineRef.current - performance.now()) / 1000);
      setTimeLeft(Math.round(left * 10) / 10);
      if (left <= 0) timeoutRef.current();
    }, 200);
    return () => window.clearInterval(iv);
  }, [phase]);

  // ── ورودی: Pointer Lock دسکتاپ + درگ/تپ لمسی + کیبورد ۱..۴ ──
  // فاز G2-e: گارد pausedRef/exitAskRef روی همهٔ مسیرها + صدای شلیک فقط در رویداد شلیک.
  useEffect(() => {
    if (phase !== "playing") return;
    const el = wrapRef.current;
    if (!el) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // فاز F3 — فال‌بک webkit برای سافاری‌های قدیمی‌تر
    type FsEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
    /** تمام‌صفحه در همان ژست کاربر (الگوی استاندارد بازی‌های FPS وب) */
    const fsInGesture = () => {
      if (document.fullscreenElement) return;
      try {
        const p = el.requestFullscreen?.() ?? (el as FsEl).webkitRequestFullscreen?.();
        if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
      } catch {
        /* iOS iPhone عنصری fullscreen ندارد — بی‌صدا رد می‌شود */
      }
    };

    const ndcOf = (cx: number, cy: number): [number, number] => {
      const r = el.getBoundingClientRect();
      return [((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1];
    };
    const request = (x: number, y: number) => {
      // گارد «نه هر فریم»: شلیک فقط رویداد کاربر + cooldown؛ حین توقف/دیالوگ هم شلیک نیست
      if (pausedRef.current || exitAskRef.current || overRef.current) return;
      // فاز F4 — حین فریز برخورد شلیک حساب نمی‌شود (مهمات هدر نمی‌رود)
      if (lockedRef.current) return;
      const b = bridge.current;
      // فاز F9 — مشخصات سلاح جاری: خشاب/کول‌داون/پخش/لگد
      const cfg = WEAPONS[weaponRef.current];
      const now = performance.now();
      if (reloadUntilRef.current > now) return; // فاز F4 — حین ریلود شلیک نیست
      if (now - b.lastShotAt < cfg.cooldownMs) return;
      if (ammoRef.current <= 0) {
        // فاز F4 — خشاب خالی: اولین تپ = ریلود (و ریلود خودکار هم قبلاً مسلح شده است)
        reloadNowRef.current();
        return;
      }
      ammoRef.current -= 1;
      setAmmo(ammoRef.current);
      if (ammoRef.current === 0) {
        // فاز F4 — آخرین فشنگ: ریلود خودکار پس از مکث کوتاه
        if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
        autoReloadTimerRef.current = window.setTimeout(() => {
          autoReloadTimerRef.current = null;
          reloadNowRef.current();
        }, 450);
      }
      b.lastShotAt = now;
      // فاز F9 — پیلود والی: پمپ سه پرتو می‌کاود و انفجار مقیاس سلاح می‌گیرد
      b.shoot = { x, y, seq: b.shoot.seq + 1, spread: cfg.spread, burst: cfg.burst };
      // فاز F9 — لگد دوربین per-سلاح (کلت تقریباً صفر، سنگین محسوس)
      if (cfg.kick > 0) b.aim.pitch = clamp(b.aim.pitch + cfg.kick, -0.6, 0.48);
      // فاز G2-e/F9 — صدای شلیک per-سلاح (رویداد شلیک، با cooldown — اسپم ندارد)
      playSound(cfg.id === "heavy" ? "shootHeavy" : cfg.id === "pump" ? "shootPump" : "shoot");
    };

    let gest: { x0: number; y0: number; t0: number; moved: boolean; lx: number; ly: number; active: boolean } | null =
      null;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (pausedRef.current || exitAskRef.current || overRef.current || !t || !el.contains(t)) return;
      // فاز F3 — دکمه‌های HUD داخل صحنه (توقف/خروج تمام‌صفحه/ادامه) شلیک حساب نمی‌شوند
      if (t instanceof HTMLElement && t.closest("[data-fps-hud]")) return;
      // فاز F10 — اسکوپ با نگه‌داشتن کلیک راست (الگوی استاندارد ADS — جایگزین Shift)
      if (e.button === 2) {
        if (!coarse && !tapRef.current) setScopeSafe(true);
        return;
      }
      if (!coarse && !tapRef.current) {
        if (document.pointerLockElement !== el) {
          // فاز F3 — اولین کلیک صحنه: تمام‌صفحه + قفل نشانگر با هم (در همان ژست)
          fsInGesture();
          try {
            const r = el.requestPointerLock() as unknown as Promise<void> | undefined;
            if (r && typeof r.catch === "function") r.catch(() => {});
          } catch {
            /* noop */
          }
          return;
        }
        request(0, 0);
        return;
      }
      // فاز F3 — لمسی: نخستین تماس صحنه تمام‌صفحه می‌کند (اندروید/کروم)
      fsInGesture();
      gest = { x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false, lx: e.clientX, ly: e.clientY, active: true };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (document.pointerLockElement === el) {
        const b = bridge.current;
        // فاز F5 — حساسیت نگاه + وارون‌سازی عمودی (از تنظیمات گزینه‌ها) — فاز F9: حین اسکوپ کمتر
        const sn = sensRef.current * (scopedRef.current ? SCOPE_SENS_RATIO : 1);
        const iv = invertRef.current ? -1 : 1;
        b.aim.yaw -= e.movementX * 0.0026 * sn;
        b.aim.pitch = clamp(b.aim.pitch - e.movementY * 0.0024 * sn * iv, -0.6, 0.48);
        return;
      }
      if (!gest?.active) return;
      const dx = e.clientX - gest.lx;
      const dy = e.clientY - gest.ly;
      gest.lx = e.clientX;
      gest.ly = e.clientY;
      if (Math.hypot(e.clientX - gest.x0, e.clientY - gest.y0) > 12) gest.moved = true;
      if (gest.moved) {
        const b = bridge.current;
        // فاز F5 — حساسیت نگاه لمسی + وارون‌سازی عمودی — فاز F9: حین اسکوپ کمتر
        const sn = sensRef.current * (scopedRef.current ? SCOPE_SENS_RATIO : 1);
        const iv = invertRef.current ? -1 : 1;
        b.aim.yaw -= dx * 0.005 * sn;
        b.aim.pitch = clamp(b.aim.pitch - dy * 0.0045 * sn * iv, -0.6, 0.48);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      // فاز F10 — رهاکردن کلیک راست = بستن اسکوپ
      if (e.button === 2) {
        setScopeSafe(false);
        return;
      }
      if (!gest?.active) return;
      const dt = performance.now() - gest.t0;
      const moved = gest.moved;
      gest.active = false;
      if (!moved && dt < 600) {
        const [x, y] = ndcOf(e.clientX, e.clientY);
        request(x, y);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (!tapRef.current) return;
      if (pausedRef.current || exitAskRef.current || overRef.current) return;
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, "۱": 0, "۲": 1, "۳": 2, "۴": 3 };
      const idx = map[e.key];
      if (idx === undefined) return;
      const cur = qRef.current;
      if (!cur || lockedRef.current) return;
      const ordered = [...cur.targets].sort((a, b) => a.lane - b.lane);
      const target = ordered[idx];
      if (target) bridge.current.onHit(target.id);
    };

    const onLockChange = () => setLocked(document.pointerLockElement === el);

    // فاز F4 — دکمهٔ شلیک موبایل از رتیکل مرکز می‌زند
    shootAtRef.current = request;
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      shootAtRef.current = () => {};
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerlockchange", onLockChange);
      if (document.pointerLockElement === el) document.exitPointerLock();
    };
  }, [phase]);

  // ── فاز F3/F4 — حرکت WASD/جهت‌نما (e.code = مستقل از چیدمان کیبورد فارسی/انگلیسی)
  // + R = ریلود + فاز F10 — Shift = دویدن، Space = پرش، C = خم‌شدن (اسکوپ = کلیک راست) ──
  useEffect(() => {
    if (phase !== "playing") return;
    const keys = bridge.current.keys;
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.code === "KeyR") {
        if (!pausedRef.current && !exitAskRef.current) reloadNowRef.current();
        return;
      }
      // فاز F10-a — V = پخش دوبارهٔ واژهٔ حالت شنیداری (دسکتاپ حتی حین قفل نشانگر)
      if (e.code === "KeyV") {
        const cur = qRef.current;
        if (!pausedRef.current && !exitAskRef.current && cur?.mode === "listening-hunt") {
          void speak(cur.speakText, { speed: voiceSpeedRef.current });
        }
        return;
      }
      // فاز F10 — پرش با اسپیس (خارج از تپ ساده) — جلوگیری از اسکرول صفحه
      if (e.code === "Space") {
        if (tapRef.current) return;
        e.preventDefault();
        if (!pausedRef.current && !exitAskRef.current && !overRef.current) bridge.current.wantJump = true;
        return;
      }
      // فاز F10 — دویدن با نگه‌داشتن Shift (اسکوپ به کلیک راست منتقل شد)
      if (!tapRef.current && (e.code === "ShiftLeft" || e.code === "ShiftRight")) {
        bridge.current.sprint = true;
        return;
      }
      const k = KEY_MOVE[e.code];
      if (!k) return;
      keys.add(k);
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        bridge.current.sprint = false;
        return;
      }
      const k = KEY_MOVE[e.code];
      if (k) keys.delete(k);
    };
    const clear = () => {
      keys.clear();
      bridge.current.sprint = false;
      bridge.current.wantJump = false;
      setScopeSafe(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      keys.clear();
      bridge.current.sprint = false;
    };
  }, [phase, setScopeSafe]);

  // ── شروع دور ──
  const start = useCallback(() => {
    const pool: Array<VocabEntry | QuizQuestionSeed> =
      mode === "grammar-gate"
        ? (lesson === ALL_LESSONS ? quizSeed : quizSeed.filter((s) => s.lesson === lesson))
        : (lesson === ALL_LESSONS ? vocabAll : vocabAll.filter((w) => w.lesson === lesson));
    if (pool.length < (mode === "grammar-gate" ? MIN_POOL_QUIZ : MIN_POOL_WORD)) return;
    // فاز G2-e — بازخورد کلیک شروع دور (الگوی کیت) + فاز F3 — درخواست تمام‌صفحه با ژست کاربر
    playSound("click");
    buzz("light");
    wantFsRef.current = true;
    modeRef.current = mode;
    qTimeRef.current = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
    poolRef.current = pool;
    distrRef.current = vocabAll;
    deckRef.current = shuffle(pool);
    deckIdxRef.current = 0;
    seqRef.current = 0;
    scoreRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = [];
    overRef.current = false;
    lockedRef.current = false;
    startedAtRef.current = performance.now();
    // فاز G2-e — کمبوی تازه از موتور مشترک کیت + ریست وضعیت توقف
    resetCombo();
    pausedAccumRef.current = 0;
    pauseStartRef.current = 0;
    clearTimers();
    bridge.current.aim = { yaw: 0, pitch: 0 };
    bridge.current.pos = { x: 0, z: 0 };
    bridge.current.moveMag = 0;
    bridge.current.stick = { x: 0, y: 0 };
    // فاز F10 — ریست کامل موتور حرکت در شروع دور
    bridge.current.vel = { x: 0, z: 0 };
    bridge.current.vy = 0;
    bridge.current.jumpY = 0;
    bridge.current.wantJump = false;
    bridge.current.crouchAmt = 0;
    bridge.current.sprint = false;
    bridge.current.speedKick = 0;
    bridge.current.layout = LAYOUTS[mapIdRef.current];
    bridge.current.flashes = [];
    bridge.current.lastShotAt = 0;
    // فاز F4/F9 — خشاب سلاح انتخابی در شروع دور + پاک‌سازی ریلود معلق
    if (reloadTimerRef.current !== null) window.clearTimeout(reloadTimerRef.current);
    if (autoReloadTimerRef.current !== null) window.clearTimeout(autoReloadTimerRef.current);
    reloadTimerRef.current = null;
    autoReloadTimerRef.current = null;
    reloadUntilRef.current = 0;
    bridge.current.reloadUntil = 0;
    ammoRef.current = WEAPONS[weaponId].mag;
    setAmmo(WEAPONS[weaponId].mag);
    setReloading(false);
    // فاز F9 — اسکوپ بسته و پیلود والی خنثی در شروع دور
    setScopeSafe(false);
    bridge.current.shoot = { x: 0, y: 0, seq: bridge.current.shoot.seq, spread: 0, burst: 1 };
    // فاز F8 — موج از نو + پاک‌سازی و برنامه‌ریزی هدف طلایی
    waveRef.current = 1;
    maxWaveRef.current = 1;
    setWave(1);
    bridge.current.wave = 1;
    bridge.current.dodge = !tapMode;
    goldenUntilRef.current = 0;
    goldenPendingRef.current = null;
    if (goldenTimerRef.current !== null) {
      window.clearTimeout(goldenTimerRef.current);
      goldenTimerRef.current = null;
    }
    setGoldenActive(false);
    setGoldenSpec(null);
    setGoldenLeft(0);
    goldenLater(() => spawnGoldenRef.current(), GOLDEN_FIRST_MS);
    setScore(0);
    setHearts(HEARTS);
    setQ(null);
    setLocked(false);
    setIsRecord(false);
    setLiveMsg("مأموریت شروع شد — به گزینهٔ درست شلیک کن!");
    setExitAskSafe(false);
    resume();
    // فاز G2-e — جلسهٔ تازهٔ تله‌متری: level = حالت (+تپ) : کیفیت — مثل «word-tap:low» — فاز F10-a: listen
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${mode === "grammar-gate" ? "grammar" : mode === "listening-hunt" ? "listen" : "word"}${tapMode ? "-tap" : ""}:${quality}`,
    });
    sessionRef.current.start();
    setPhase("playing");
    // سؤال اول پس از سوار شدن صحنه
    later(() => advanceRef.current(), 60);
  }, [mode, lesson, tapMode, quality, vocabAll, quizSeed, resetCombo, resume, setExitAskSafe, clearTimers, later, goldenLater, weaponId, setScopeSafe]);

  // فاز F8 — پاک‌سازی تایمر زنجیرهٔ هدف طلایی در unmount (بعد از همهٔ محل‌های جهش)
  useEffect(
    () => () => {
      if (goldenTimerRef.current !== null) window.clearTimeout(goldenTimerRef.current);
    },
    [],
  );

  // ── فاز G2-e — انتخاب کیفیت گرافیک (ماندگار؛ کلید افزودنی) ──
  const setQualityPref = useCallback((q: Quality) => {
    playSound("click");
    buzz("light");
    setQuality(q);
    try {
      window.localStorage.setItem(QUALITY_KEY, q);
    } catch {
      /* noop */
    }
  }, []);

  // ── فاز F5 — تنظیم گزینه‌های نگاه (ماندگار؛ اسلایدر بدون صدا — هر تیک صدا ندارد) ──
  const setSensPref = useCallback((v: number) => {
    const c = clamp(v, SENS_MIN, SENS_MAX);
    setSens(c);
    savePref(SENS_KEY, String(Math.round(c * 100) / 100));
  }, []);
  const setFovPref = useCallback((v: number) => {
    const c = clamp(Math.round(v), FOV_MIN, FOV_MAX);
    setFov(c);
    savePref(FOV_KEY, String(c));
  }, []);
  const setInvertPref = useCallback(
    (v: boolean) => {
      playSound("click");
      buzz("light");
      setInvertY(v);
      savePref(INVERT_KEY, v ? "1" : "0");
    },
    [],
  );

  // ── فاز F6 — انتخاب نقشهٔ مأموریت (ماندگار؛ کلید افزودنی) ──
  const setMapPref = useCallback((id: MapId) => {
    playSound("click");
    buzz("light");
    setMapId(id);
    savePref(MAP_KEY, id);
  }, []);

  // ── فاز F10 — سینک چیدمان نقشه با bridge + بازگشت امن به اسپان در تعویض حین بازی
  // (تا بازیکن داخل دیوارِ چیدمان تازه گیر نکند) ──
  useEffect(() => {
    const b = bridge.current;
    b.layout = LAYOUTS[mapId];
    b.pos.x = 0;
    b.pos.z = 0.6;
    b.vel.x = 0;
    b.vel.z = 0;
  }, [mapId]);

  // ── فاز F9 — انتخاب سلاح (ماندگار؛ کلید افزودنی) ──
  const setWeaponPref = useCallback((id: WeaponId) => {
    playSound("click");
    buzz("light");
    setWeaponId(id);
    savePref(WEAPON_KEY, id);
  }, []);

  // کلیک چیپ‌های setup — بازخورد کیت (الگوی جای خالی)
  const chipFeedback = useCallback(() => {
    playSound("click");
    buzz("light");
  }, []);

  // ── فاز F3 — خروج دستی از تمام‌صفحه (دکمهٔ شناور داخل قاب) ──
  const exitFullscreen = useCallback(() => {
    dropFullscreen();
  }, []);

  // فاز F3 — درخواست تمام‌صفحه بلافاصله بعد از مونت صحنه (ژست کلیک شروع هنوز فعال است)
  useEffect(() => {
    if (phase !== "playing" || !wantFsRef.current) return;
    wantFsRef.current = false;
    const el = wrapRef.current;
    if (!el || document.fullscreenElement) return;
    try {
      type FsEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
      const p = el.requestFullscreen?.() ?? (el as FsEl).webkitRequestFullscreen?.();
      if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
    } catch {
      /* iOS iPhone عنصری fullscreen ندارد — بی‌صدا رد می‌شود */
    }
  }, [phase]);

  // فاز F3 — سینک وضعیت تمام‌صفحه (Esc کاربر) + پاک‌سازی امن هنگام unmount
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      try {
        if (document.fullscreenElement) void document.exitFullscreen();
      } catch {
        /* noop */
      }
    };
  }, []);

  // فاز F3 — پایان دور/بازگشت به تنظیمات = خروج از تمام‌صفحه
  useEffect(() => {
    if (phase !== "playing" && document.fullscreenElement) {
      try {
        void document.exitFullscreen();
      } catch {
        /* noop */
      }
    }
  }, [phase]);

  // ── رکوردهای شخصی هر دو اسکوپ ──
  const bestWord = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("word-hunt", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestGrammar = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("grammar-gate", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  // فاز F10-a — رکورد اسکوپ مستقل حالت شنیداری
  const bestListen = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = activeBookId ? loadBest<BestRecord>(activeBookId, GAME_KEY, scopeOf("listening-hunt", tapMode)) : null;
      return s ? JSON.stringify(s) : "";
    },
    () => "",
  );
  const bestVal = useMemo(() => {
    const raw = mode === "grammar-gate" ? bestGrammar : mode === "listening-hunt" ? bestListen : bestWord;
    return raw ? (JSON.parse(raw) as BestRecord).score : null;
  }, [mode, bestWord, bestGrammar, bestListen]);

  const chipCls = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
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
              <div className="grid gap-2 sm:grid-cols-3">
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
                  کل کتاب ({faNum(poolCount)} {mode === "grammar-gate" ? "سؤال" : "واژه"})
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
              </div>
            </div>

            {!poolOk && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-[11px] leading-5 text-destructive">
                {mode === "word-hunt"
                  ? `برای این انتخاب دست‌کم ${faNum(MIN_POOL_WORD)} واژه لازم است — درس دیگری یا «کل کتاب» را انتخاب کن.`
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

  // ── Done — فاز G2-e: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    // ستاره‌بندی per-game این بازی (طبق تسک): دقت ≥۹۰ → ۳ / ≥۷۰ → ۲ / بقیه ۱
    const shots = correctCount + wrongCount;
    const acc = shots > 0 ? Math.round((correctCount / shots) * 100) : 0;
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1;
    // فاز T1 — رتبهٔ نظامی پایان مأموریت
    const rank = missionRank(acc, finalScore);
    return (
      <div className="space-y-3">
        <ResultScreen
          title="گزارش مأموریت"
          stars={stars}
          isRecord={isRecord}
          errorCount={wrongList.length}
          reviewItems={wrongList.map((w) => ({ front: w.label, back: w.sub ?? "" }))}
          stats={[
            {
              label: "رتبهٔ مأموریت",
              value: `${rank.grade} — ${rank.title}`,
              icon: <Medal size={16} className="text-amber-500" />,
            },
            {
              label: "امتیاز",
              value: faNum(finalScore),
              icon: <Star size={16} className="text-amber-500" />,
            },
            {
              label: "دقت",
              value: `${faNum(acc)}٪`,
              icon: <TargetIcon size={16} className="text-emerald-500" />,
            },
            {
              label: "زمان",
              value: fmtTime(elapsed),
              icon: <Timer size={16} className="text-teal-500" />,
            },
          ]}
          onReplay={start}
          onExit={() => setPhase("setup")}
          exitLabel="تنظیمات"
        />
        {/* فاز F10-c — تحویل خطاهای دور به دستیار هوشمند برای ساخت مینی‌تمرین */}
        {wrongList.length > 0 && (
          <Card className="mx-auto max-w-xl p-4">
            <Button
              type="button"
              variant="outline"
              onClick={sendMissionReport}
              className="min-h-11 w-full rounded-2xl border-primary/30"
            >
              <Bot size={16} className="text-primary" aria-hidden />
              گزارش خطاها به دستیار هوشمند
            </Button>
            <p className="mt-2 text-center text-[10.5px] leading-5 text-muted-foreground">
              دستیار با همین {faNum(wrongList.length)} موردِ جاافتاده یک مینی‌تمرین کوتاه برایت می‌سازد — در چت دستیار مرور و ارسال کن.
            </p>
          </Card>
        )}
      </div>
    );
  }

  // ── Playing — فاز G2-e: شِل استاندارد کیت + فریز حلقهٔ R3F حین توقف ──
  const qTime = tapMode ? Q_TIME_TAP : Q_TIME_SHOOT;
  const timePct = Math.max(0, Math.min(100, (timeLeft / qTime) * 100));
  const qualityLow = quality === "low";
  // فاز F6 — پالت نقشهٔ فعال + فاز F7 — ترتیب بودجهٔ عناصر محیطی
  const activeMap = MAPS[mapId];
  const envTier: 0 | 1 | 2 = qualityLow ? 0 : weak ? 1 : 2;
  // فاز F9 — سلاح جاری (خشاب در HUD)
  const weapon = WEAPONS[weaponId];
  return (
    <>
      <GameShell
        title="شوتر آموزشی"
        icon={<Crosshair size={18} />}
        stats={
          <>
            <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
              <Star size={13} className="text-amber-500" />
              {faNum(score)}
            </Badge>
            {combo >= 2 ? (
              <Badge
                key={combo}
                variant="outline"
                className={cn(
                  "gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400",
                  // فاز G2-e — افکت بصری واحد بج کمبو (کیت) + pulse ساده با گارد reduced-motion
                  COMBO_FIRE_CLASS,
                  "animate-pulse motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(combo)}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
                <Zap size={12} />
                کمبو ×۱
              </Badge>
            )}
            {/* فاز F4 — شمارندهٔ خشاب در هدر شِل (بیرون قاب — در تمام‌صفحه چیپ داخل قاب دیده می‌شود) */}
            {/* فاز F8 — شمارهٔ موج جاری */}
            <Badge
              variant="outline"
              className="gap-1 border-teal-500/40 px-2 py-1 text-[11px] font-black text-teal-600 dark:text-teal-400"
            >
              <Zap size={11} />
              موج {faNum(wave)}
            </Badge>
            {!tapMode && (
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px]">
                {reloading ? (
                  <>
                    <RotateCcw size={12} className="animate-spin motion-reduce:animate-none" />
                    ریلود…
                  </>
                ) : (
                  <>
                    <Crosshair size={12} className={ammo <= 2 ? "text-red-500" : "text-amber-500"} />
                    {faNum(ammo)}/{faNum(weapon.mag)}
                  </>
                )}
              </Badge>
            )}
            <span
              role="img"
              aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`}
              className="flex items-center gap-1"
            >
              {Array.from({ length: HEARTS }, (_, i) => (
                <Heart
                  key={i}
                  size={15}
                  fill={i < hearts ? "currentColor" : "none"}
                  className={i < hearts ? "text-destructive" : "text-muted-foreground/35"}
                />
              ))}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground">
              ⏱ {faNum(Math.ceil(timeLeft))} ثانیه
            </span>
          </>
        }
        liveMsg={liveMsg}
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
        exitLabel="پایان دور"
      >
        <div className="relative">
          <div
            ref={wrapRef}
            role="group"
            aria-label={`میدان سه‌بعدی شوتر آموزشی — نقشهٔ ${activeMap.name}`}
            className={cn(
              "relative touch-none overflow-hidden border shadow-lg",
              // فاز F3 — تمام‌صفحه: بدون گوشهٔ گرد و ارتفاع کامل صفحه
              isFs ? "h-screen w-screen max-h-none rounded-none" : "h-[60vh] max-h-[580px] min-h-[400px] rounded-2xl",
            )}
            // فاز F6 — بدنهٔ قاب هم‌رنگ نقشه (قبل از بوت WebGL هم درست دیده می‌شود)
            // فاز F10 — منوی راست‌کلیک مرورگر حین بازی (تپ ساده) باز نمی‌شود — کلیک راست = اسکوپ
            onContextMenu={(e) => {
              if (!tapMode) e.preventDefault();
            }}
            style={{ backgroundColor: activeMap.bg }}
          >
            <Canvas
              // فاز G2-e — فریز واقعی حلقهٔ R3F حین توقف: frameloop "never" معادل
              // cancelAnimationFrame و بازگشت به "always" معادل resumeLoop الگوی flappy است.
              frameloop={paused ? "never" : "always"}
              // فاز G2-e — کیفیت سبک: dpr پایین‌تر؛ عادی: رفتار فعلی (با ملاحظهٔ دستگاه ضعیف)
              dpr={qualityLow ? [0.7, 1] : weak ? [1, 1] : [1, 1.5]}
              camera={{ fov: FOV_DEF, near: 0.1, far: 60, position: [0, 1.7, 7] }}
              gl={{ antialias: qualityLow ? false : !weak, powerPreference: "high-performance" }}
              // سایه‌ها در هر دو کیفیت off — سبک همیشه و عادی همان رفتار فعلی صحنه (سقف draw-call)
              shadows={false}
            >
              {/* فاز F5 — زاویهٔ دید زنده از گزینه‌ها */}
              <FovTune fov={fov} bridge={bridge} scoped={scoped} />
              <Rig bridge={bridge} />
              <Arena map={activeMap} deco={qualityLow ? DECO_LOW : weak ? 8 : 14} tier={envTier} />
              {q?.targets.map((t) => (
                <Target key={`q${q.seq}-${t.id}`} spec={t} registry={meshRegistry} bridge={bridge} />
              ))}
              {/* فاز F8 — هدف طلایی بونوس */}
              {goldenActive && goldenSpec && (
                <GoldenTarget spec={goldenSpec} untilRef={goldenUntilRef} registry={meshRegistry} bridge={bridge} />
              )}
              <Burst apiRef={burstApi} count={qualityLow ? BURST_LOW : weak ? BURST_WEAK : BURST_FULL} />
              <World bridge={bridge} registry={meshRegistry} burstApi={burstApi} />
              {/* فاز F3 — تفنگ سه‌بعدی ویومدل چسبیده به دوربین — فاز F9: مدل per-سلاح */}
              <ViewModel bridge={bridge} weapon={weapon} />
            </Canvas>

            {/* فاز F3 — نوار وضعیت فشرده حین تمام‌صفحه (هدر شِل بیرون قاب است) */}
            {isFs && (
              <div className="pointer-events-none absolute start-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur">
                <Star size={13} className="text-amber-400" />
                {faNum(score)}
                {combo >= 2 && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Flame size={12} />
                    ×{faNum(combo)}
                  </span>
                )}
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span role="img" aria-label={`قلب‌ها: ${faNum(hearts)} از ${faNum(HEARTS)}`} className="flex items-center gap-0.5">
                  {Array.from({ length: HEARTS }, (_, i) => (
                    <Heart
                      key={i}
                      size={12}
                      fill={i < hearts ? "currentColor" : "none"}
                      className={i < hearts ? "text-red-400" : "text-white/35"}
                    />
                  ))}
                </span>
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span>⏱ {faNum(Math.ceil(timeLeft))}</span>
                <span aria-hidden className="mx-0.5 h-3.5 w-px bg-white/25" />
                <span className="text-teal-300">موج {faNum(wave)}</span>
                {goldenActive && <span className="text-amber-300">★ {faNum(goldenLeft)}</span>}
              </div>
            )}

            {/* فاز F3 — کنترل‌های شناور حین تمام‌صفحه (هدر شِل در دسترس نیست) */}
            {isFs && (
              <div data-fps-hud className="absolute end-3 top-3 z-20 flex gap-2">
                <button
                  type="button"
                  onClick={togglePause}
                  aria-label={paused ? "ادامهٔ بازی" : "توقف بازی"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                >
                  {paused ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <button
                  type="button"
                  onClick={exitFullscreen}
                  aria-label="خروج از تمام‌صفحه"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                >
                  <Minimize2 size={15} />
                </button>
              </div>
            )}

            {/* فاز F4 — کنترل‌های لمسی موبایل: جوی‌استیک چپ + دکمهٔ شلیک راست (خارج از تپ ساده) */}
            {!tapMode && isCoarse && (
              <>
                <TouchJoystick bridge={bridge} />
                <button
                  type="button"
                  data-fps-hud
                  aria-label={reloading ? "در حال ریلود خشاب" : `شلیک از رتیکل — ${faNum(ammo)} فشنگ مانده`}
                  onPointerDown={() => shootAtRef.current(0, 0)}
                  className={cn(
                    "pointer-events-auto absolute bottom-5 right-4 z-20 flex h-20 w-20 touch-none select-none flex-col items-center justify-center gap-0.5 rounded-full border-2 backdrop-blur transition active:scale-95",
                    reloading
                      ? "border-amber-300/60 bg-black/55 text-amber-200"
                      : "border-white/30 bg-black/40 text-white",
                  )}
                >
                  {reloading ? (
                    <RotateCcw size={24} className="animate-spin motion-reduce:animate-none" />
                  ) : (
                    <Crosshair size={26} />
                  )}
                  <span className="text-[10px] font-black" aria-hidden>
                    {reloading ? "ریلود…" : `${faNum(ammo)} / ${faNum(weapon.mag)}`}
                  </span>
                </button>
              </>
            )}

            {/* فاز F9 — دکمهٔ اسکوپ موبایل (نگه‌داشتن = زوم) */}
            {!tapMode && isCoarse && (
              <button
                type="button"
                data-fps-hud
                aria-pressed={scoped}
                aria-label="اسکوپ — نگه دار تا زوم شود"
                onPointerDown={() => setScopeSafe(true)}
                onPointerUp={() => setScopeSafe(false)}
                onPointerCancel={() => setScopeSafe(false)}
                onPointerLeave={() => setScopeSafe(false)}
                className={cn(
                  "pointer-events-auto absolute bottom-28 right-4 z-20 flex h-12 w-12 touch-none select-none items-center justify-center rounded-full border-2 backdrop-blur transition active:scale-95",
                  scoped
                    ? "border-emerald-300/70 bg-emerald-500/30 text-white"
                    : "border-white/30 bg-black/40 text-white",
                )}
              >
                <Telescope size={20} />
              </button>
            )}

            {/* فاز F10 — دکمهٔ پرش موبایل (کنار دکمهٔ اسکوپ) */}
            {!tapMode && isCoarse && (
              <button
                type="button"
                data-fps-hud
                aria-label="پرش"
                onPointerDown={() => {
                  bridge.current.wantJump = true;
                }}
                className="pointer-events-auto absolute bottom-28 right-[4.75rem] z-20 flex h-12 w-12 touch-none select-none items-center justify-center rounded-full border-2 border-white/30 bg-black/40 text-white backdrop-blur transition active:scale-95"
              >
                <ArrowBigUp size={22} />
              </button>
            )}

            {/* فاز F4 — شمارندهٔ مهمات دسکتاپ (گوشهٔ پایین) */}
            {!tapMode && !isCoarse && (
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-black text-white backdrop-blur"
              >
                {reloading ? (
                  <>
                    <RotateCcw size={12} className="animate-spin motion-reduce:animate-none" />
                    ریلود…
                  </>
                ) : (
                  <>
                    <Crosshair size={12} className={ammo <= 2 ? "text-red-300" : "text-amber-300"} />
                    {faNum(ammo)} / {faNum(weapon.mag)}
                  </>
                )}
              </div>
            )}

            {/* فاز F9 — وینیت اسکوپ حین زوم */}
            {scoped && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[5]"
                style={{ boxShadow: "inset 0 0 130px 46px rgba(0,0,0,0.6)" }}
              />
            )}

            {/* سؤال — HUD بالای میدان */}
            {q && (
              <div className={cn("pointer-events-none absolute inset-x-3 z-10", isFs ? "top-16" : "top-3")}>
                <div className="mx-auto max-w-lg rounded-2xl border bg-background/85 p-3 text-center shadow-lg backdrop-blur">
                  <p className="text-[10px] font-bold text-muted-foreground">{q.promptFa}</p>
                  <p
                    dir={q.ltr ? "ltr" : "rtl"}
                    className={cn(
                      "mt-1 font-black leading-6",
                      q.ltr ? "font-en text-[15px]" : "text-[17px]",
                    )}
                  >
                    {q.promptMain}
                  </p>
                  {q.promptSub && <p className="mt-0.5 text-[10px] text-muted-foreground">{q.promptSub}</p>}
                  {/* فاز F10-a — پخش دوبارهٔ واژه در حالت شنیداری (کارت pointer-events-none است؛ دکمه auto) */}
                  {q.mode === "listening-hunt" && (
                    <button
                      type="button"
                      onClick={() => void speak(q.speakText, { speed: voiceSpeedRef.current })}
                      className="pointer-events-auto mx-auto mt-2 flex min-h-9 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold text-primary transition-all hover:bg-primary/15 active:scale-95"
                      aria-label="پخش دوبارهٔ واژه"
                    >
                      <Volume2 size={13} aria-hidden />
                      پخش دوباره
                    </button>
                  )}
                  {/* نوار زمان */}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-200",
                        timePct > 50 ? "bg-emerald-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500",
                      )}
                      style={{ width: `${timePct}%` }}
                    />
                  </div>
                  {/* فاز T1 — شمارندهٔ فرصت هدف ویژهٔ HVT (پالت قرمز تاکتیکی) */}
                  {goldenActive && (
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-[11px] font-black text-red-600 dark:text-red-400">
                      <Crosshair size={12} className="text-red-500" />
                      هدف ویژهٔ HVT! +{faNum(GOLDEN_BONUS)} — {faNum(goldenLeft)} ثانیه
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* رتیکل — فقط در حالت شلیک دسکتاپ/لمس‌ندار — فاز F9: بزرگ‌تر با خطوط متقاطع حین اسکوپ */}
            {!tapMode && (
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute start-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-opacity",
                  locked ? "opacity-100" : isCoarse ? "opacity-0" : "opacity-60",
                )}
              >
                <span className={cn("relative block transition-all duration-150", scoped ? "h-12 w-12" : "h-7 w-7")}>
                  <span className="absolute inset-0 rounded-full border-2 border-white/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  {scoped && (
                    <>
                      <span className="absolute start-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" />
                      <span className="absolute top-1/2 start-0 h-px w-full -translate-y-1/2 bg-white/60" />
                    </>
                  )}
                  <span
                    className={cn(
                      "absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400",
                      scoped ? "h-1 w-1" : "h-1.5 w-1.5",
                    )}
                  />
                </span>
              </div>
            )}

            {/* راهنمای کنترل */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center">
              <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] text-white/90 backdrop-blur">
                {tapMode
                  ? isCoarse
                    ? "تپ روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
                    : "کلیک روی هدف = انتخاب پاسخ · کلیدهای ۱ تا ۴ هم کار می‌کنند"
                  : isCoarse
                    ? "جوی‌استیک = حرکت · کشیدن = نگاه · دکمهٔ شلیک = شلیک · ذره‌بین = اسکوپ"
                    : locked
                      ? "موس = نشانه‌گیری · WASD = حرکت · کلیک = شلیک · Shift = اسکوپ · R = ریلود"
                      : "کلیک در صحنه = نشانه‌گیری + تمام‌صفحه"}
              </span>
            </div>

            {/* فاز G2-e/F3 — اورلی توقف داخل قاب (در تمام‌صفحه هم دیده می‌شود؛ صحنهٔ فریز پشت آن) */}
            {paused && (
              <>
                <div aria-hidden className="absolute inset-0 z-20 bg-background/70 backdrop-blur-sm" />
                <div data-fps-hud className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 overflow-y-auto p-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Pause size={26} />
                  </span>
                  <p className="text-sm font-black">بازی متوقف شد</p>
                  <Button onClick={resume} className="h-11 gap-2">
                    <Play size={16} />
                    ادامهٔ بازی
                  </Button>
                  {/* فاز F5 — تنظیمات سریع حین توقف: بدون خروج از دور */}
                  <div className="w-full max-w-xs rounded-2xl border bg-background/90 p-3.5 shadow-lg backdrop-blur">
                    <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-black">
                      <SlidersHorizontal size={13} className="text-emerald-500" />
                      تنظیمات سریع نگاه
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="font-bold">حساسیت نگاه</span>
                          <span className="text-muted-foreground">{faNum(Math.round(sens * 100))}٪</span>
                        </div>
                        <Slider
                          min={SENS_MIN * 100}
                          max={SENS_MAX * 100}
                          step={5}
                          value={[Math.round(sens * 100)]}
                          onValueChange={(v) => setSensPref((v[0] ?? SENS_DEF * 100) / 100)}
                          aria-label="حساسیت نگاه"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold">وارون‌سازی عمودی</span>
                        <Switch checked={invertY} onCheckedChange={setInvertPref} aria-label="وارون‌سازی عمودی نگاه" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] leading-5 text-muted-foreground">
          شلیک درست +{faNum(SHOOT_BASE)} امتیاز و هر حلقهٔ کمبو +{faNum(COMBO_STEP)}تا سقف ×{faNum(COMBO_CAP + 1)} —
          پاسخ‌های غلط به صف «مرور هوشمند» هم می‌روند.
        </p>
      </GameShell>
      {/* فاز G2-e — راهنمای دکمهٔ شِل (حین صحنه با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
      {/* فاز G2-e — نگهبان خروج استاندارد کیت (حین دور با پیشرفت) */}
      <GameExitGuard
        open={exitAsk}
        onOpenChange={(o) => {
          setExitAskSafe(o);
          // انصراف از خروج (Esc/کلیک بیرون/«نه») → صحنه از همان‌جا ادامه یابد
          if (!o) resume();
        }}
        onConfirm={() => {
          // فاز G2-e — رهاکردن دور نیمه‌کاره + تله‌متری
          sessionRef.current?.abandon("exit");
          stopSpeaking();
          overRef.current = true;
          clearTimers();
          setExitAskSafe(false);
          resume();
          setPhase("setup");
        }}
      />
    </>
  );
}
