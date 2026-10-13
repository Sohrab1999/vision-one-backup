"use client";

/**
 * بازی «نقشه ماجراجویی» (Adventure Map) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * مسیری مارپیچ با ۸ گره؛ هر گره یک مینی‌چالش کوتاه از واژگان درس جاری است:
 * (۱) آزمون واژه — ۳ سؤال چهارگزینه‌ای؛ (۲) حروف جابه‌جا — ۱ واژه با tiles لمسی؛
 * (۳) جفت‌سازی — ۲ جفت انگلیسی↔فارسی؛ (۴) شنیداری — ۱ واژه با تلفظ.
 * ترتیب چهار نوع چالش در هر دور تصادفی است و چرخه دو بار تکرار می‌شود.
 * داوری هر مرحله: صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره؛
 * مرحله در هر حالت کامل می‌شود و فقط گرهٔ بعدی آزاد می‌شود.
 * پیشرفت (ستاره‌ها + گره‌های تمام‌شده + ترتیب چالش‌ها) در localStorage ذخیره
 * می‌شود تا با رفرش وسط ماجراجویی از دست نرود.
 *
 * فاز G2-e (مهاجرت کامل به کیت GameKit v2) — فقط پوسته؛ منطق ۸ مرحله/ستاره/جان
 * و امضاهای saveAttempt/saveBest/bumpPlays و کلیدهای localStorage دست‌نخورده:
 * - GameShell روی هر سه نما: نقشه (stats=ستارهٔ جمع/مرحلهٔ فعلی)، مرحلهٔ فعال
 *   (title=«مرحلهٔ N — نوع» + بج‌های خطا/ستاره/پیشرفت مرحله) و مراسم پایان.
 * - نتیجهٔ استاندارد per-مرحله روی ResultScreen کیت — برد/باخت هر دو نتیجه
 *   می‌گیرند (title مناسب)، ستارهٔ همان مرحله از starsOf موجود، stats مرحله؛
 *   دکمهٔ اصلی (onReplay) = «رفتن به مرحلهٔ بعد» و «نقشه» برای خروج (exitLabel).
 *   لیبل دکمهٔ اصلی در کیت ثابت است و طبق قرارداد این تسک کیت ویرایش نمی‌شود.
 *   کانفتی/اعلام رکورد از مسیر موجود saveBest می‌آید (اینجا دوباره شلیک نمی‌شود).
 * - صدا/لرزش: درست=correct+success · غلط=wrong+error · کلیک=click(+light) ·
 *   برد مرحله=win+record · ستارهٔ کامل (۳)=record · باخت مرحله (۱ ستاره)=wrong.
 * - توقف فقط حین مرحلهٔ فعال: useGamePause + اورلی «بازی متوقف شد» + گیت تایمر +
 *   autoPauseOnHidden (بدنه blur+pointer-events-none+aria-hidden).
 * - نگهبان خروج G0-06 («مرحله را رها کنم؟ 🗺️» حین مرحلهٔ فعال) روی GameExitGuard
 *   کیت — همان متن و همان رفتار (Esc/کلیک بیرون = ادامهٔ مرحله).
 * - آموزش ۳گامی (نقشهٔ ۸ مرحله/گیم‌پلی مرحله/ستاره‌ها) — نمایش خودکار فقط در
 *   نمای نقشه (اولین بار)؛ راهنمای شِل حین مرحله = توقف (pausedForHelpRef).
 * - تله‌متری per-مرحله: level="stage:N" — start در شروع مرحله، end("finish") در
 *   برد/باخت مرحله، abandon در نگهبان/unmount؛ دور نقشه کل session جدا نمی‌خواهد.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
import { playSound, isSoundMuted } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import {
  ALL_LESSONS,
  GAME_KEY,
  MAX_STARS,
  TOTAL_STAGES,
  WORD_RE,
  type AdventureProgress,
  type BestRec,
  type ChallengeState,
  type MatchCard,
  type Phase,
  type QuizQ,
  type StageType,
} from "./types";
import {
  baseWord,
  blankChallenge,
  orderOf,
  readProgress,
  starsOf,
  writeProgress,
} from "./helpers";
import { SetupPanel } from "./setup-panel";
import { StageMap } from "./stage-map";
import { ChallengeView } from "./challenge-view";
import { DoneView } from "./done-view";

export function AdventureMapGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [isRecord, setIsRecord] = useState(false);
  /** نگهبان خروج (G0-06 → کیت G1-04) — دیالوگ تأیید حین مرحلهٔ فعال */
  const [exitAsk, setExitAsk] = useState(false);
  /** فاز G2-e — پیام باکس aria-live: اعلام نتیجهٔ پاسخ‌ها/توقف/پایان مرحله */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز G2-e — کلید بی‌صدای کیت (الگوی دارباز: شنوندهٔ storage بین-تب) */
  const [muted, setMuted] = useState(isSoundMuted());

  const secsRef = useRef(0);
  /** فاز G2-e — زمان مرحلهٔ جاری (برای stats نتیجهٔ per-مرحله) */
  const stageSecsRef = useRef(0);
  /** واژه‌های مصرف‌شدهٔ این دور — تا مراحل مختلف واژهٔ تکراری نگیرند */
  const usedWords = useRef<Set<string>>(new Set());
  const timersRef = useRef<Set<number>>(new Set());

  // فاز G2-e — توقف/ادامهٔ استاندارد کیت (توقف فقط حین مرحلهٔ فعال معنا دارد؛
  // autoPauseOnHidden شمارش را در تب مخفی هم می‌ایستاند — بازگشت با اورلی/ادامه است)
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (p) stopSpeaking();
    setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });

  // فاز G2-e — آموزش ۳گامی: نمایش خودکار فقط در نمای نقشه (اولین بار) + راهنمای شِل
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "map");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    // راهنما حین مرحلهٔ فعال = توقف هنگام بازشدن، ادامه هنگام بستن
    if (phase === "challenge") {
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

  // فاز G2-e — تله‌متری per-مرحله (بدون PII: بازی/level=stage:N/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const progressKey = `visionone:adventure:${activeBookId}:${lesson === ALL_LESSONS ? "all" : lesson}`;
  const bestScope = lesson === ALL_LESSONS ? "all" : String(lesson);

  // پیشرفت ذخیره‌شده — اسنپ‌شات رشته‌ای (پایدار برای useSyncExternalStore؛ الگوی memory-game)
  const progressRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const p = readProgress(progressKey);
      return p ? JSON.stringify(p) : null;
    },
    () => null,
  );
  const progress = useMemo<AdventureProgress | null>(() => {
    if (!progressRaw) return null;
    try {
      return JSON.parse(progressRaw) as AdventureProgress;
    } catch {
      return null;
    }
  }, [progressRaw]);

  // رکورد «بیشترین ستاره» این اسکوپ
  const bestRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRec>(activeBookId, GAME_KEY, bestScope);
      return b ? JSON.stringify(b) : null;
    },
    () => null,
  );
  const best = useMemo<BestRec | null>(
    () => (bestRaw ? (JSON.parse(bestRaw) as BestRec) : null),
    [bestRaw],
  );

  const doneCount = progress ? progress.done.filter(Boolean).length : 0;
  const totalStars = progress ? progress.stars.reduce((a, b) => a + b, 0) : 0;
  const allDone = progress ? progress.done.every(Boolean) : false;

  // همگام‌سازی بی‌صدا بین تب‌ها (الگوی دارباز — شنونده، نه setState در effect)
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // تایمر کل ماجراجویی + زمان مرحله — فقط ref (بدون setState → بدون رندر هر ثانیه)
  // فاز G2-e — گیت توقف (paused) + گارد visibility/pageshow (الگوی پایلوت memory):
  // در تب مخفی شمارش می‌ایستد و در بازگشت از همان‌جا ادامه می‌یابد
  useEffect(() => {
    if ((phase !== "map" && phase !== "challenge") || paused) return;
    let t: number | null = null;
    const startTimer = () => {
      if (t !== null) return;
      t = window.setInterval(() => {
        secsRef.current += 1;
        stageSecsRef.current += 1;
      }, 1000);
    };
    const stopTimer = () => {
      if (t !== null) {
        window.clearInterval(t);
        t = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") stopTimer();
      else startTimer();
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      stopTimer(); // تیک معوقِ دورهٔ انجماد bfcache یک‌جا شمرده نشود
      if (document.visibilityState === "visible") startTimer();
    };
    startTimer();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
    };
  }, [phase, paused]);

  // فاز G2-e — پاک‌سازی نهایی: تلفظ + همهٔ تایمرهای معلق + جلسهٔ تله‌متری باز مرحله
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      stopSpeaking();
      sessionRef.current?.abandon("unmount");
    };
  }, []);

  /** setTimeout با ثبت در ref — همیشه در unmount پاک می‌شود */
  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  }, []);

  // ── شروع/ادامه/ریست ماجراجویی ──

  const beginAdventure = useCallback(
    (mode: "fresh" | "continue") => {
      if (mode === "fresh") {
        const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
        if (new Set(pool.map((w) => w.meaning)).size < 4) {
          toast.error("واژهٔ کافی برای ماجراجویی در این بخش نیست — درس دیگری را انتخاب کن");
          return;
        }
        const cyc = shuffle<StageType>([0, 1, 2, 3]);
        writeProgress(progressKey, {
          stars: Array<number>(TOTAL_STAGES).fill(0),
          done: Array<boolean>(TOTAL_STAGES).fill(false),
          order: [...cyc, ...cyc],
        });
        usedWords.current.clear();
        secsRef.current = 0;
        setIsRecord(false);
      }
      stopSpeaking();
      setLiveMsg("");
      setChallenge(null);
      setPhase("map");
    },
    [data.vocab, lesson, progressKey],
  );

  // ── فاز G2-e — ورود به یک مرحله: جلسهٔ تله‌متری تازه + ریست زمان مرحله ──
  const beginChallenge = useCallback(
    (state: ChallengeState) => {
      sessionRef.current = createGameSession({
        game: GAME_KEY,
        level: `stage:${state.idx + 1}`,
      });
      sessionRef.current.start();
      stageSecsRef.current = 0;
      setExitAsk(false);
      resume(); // هر مرحله همیشه از حالت «ادامه» شروع می‌شود
      setChallenge(state);
      setPhase("challenge");
    },
    [resume],
  );

  // ── ساخت و شروع یک مرحله ──

  const startStage = useCallback(
    (idx: number) => {
      if (!progress) return;
      // فاز G2-e — کلیک گرهٔ نقشه: بازخورد کلیک + لرزش سبک (حتی اگر اعتبارسنجی خطا بدهد)
      playSound("click");
      buzz("light");
      const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
      const distinctMeanings = new Set(pool.map((w) => w.meaning));
      const type = orderOf(progress)[idx];
      const used = usedWords.current;
      // واژه‌های مصرف‌نشدهٔ این دور در اولویت‌اند؛ اگر تمام شد از کل استخر
      const fresh = pool.filter((w) => !used.has(baseWord(w.word)));
      const src = fresh.length > 0 ? fresh : pool;
      const draw = (n: number) => {
        const got = pickUnique(src, n, (w) => w.meaning);
        return got.length >= n ? got : pickUnique(pool, n, (w) => w.meaning);
      };

      if (type === 0) {
        // آزمون واژه — ۳ سؤال چهارگزینه‌ای معنی
        if (distinctMeanings.size < 4) {
          toast.error("برای «آزمون واژه» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
          return;
        }
        const picks = draw(3);
        if (picks.length < 3) {
          toast.error("برای «آزمون واژه» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
          return;
        }
        const questions: QuizQ[] = picks.map((w) => {
          const distractors = pickUnique(
            pool.filter((d) => d.meaning !== w.meaning),
            3,
            (d) => d.meaning,
          ).map((d) => d.meaning);
          const options = shuffle([w.meaning, ...distractors]);
          return { word: baseWord(w.word), meaning: w.meaning, options, answer: options.indexOf(w.meaning) };
        });
        picks.forEach((w) => used.add(baseWord(w.word)));
        beginChallenge({ ...blankChallenge(idx, type), questions });
        return;
      }

      if (type === 1) {
        // حروف جابه‌جا — ۱ واژه با tiles لمسی
        const latin = src.filter((w) => WORD_RE.test(baseWord(w.word)));
        const source = latin.length > 0 ? latin : pool.filter((w) => WORD_RE.test(baseWord(w.word)));
        const pick = pickUnique(source, 1, (w) => baseWord(w.word))[0];
        if (!pick) {
          toast.error("واژهٔ انگلیسی مناسبی برای «حروف جابه‌جا» پیدا نشد");
          return;
        }
        const base = baseWord(pick.word);
        used.add(base);
        const tiles = shuffle(base.split("").map((letter, i) => ({ id: i, letter })));
        // جلوگیری از چیدمان اولیهٔ تصادفیِ درست
        if (base.length > 1 && tiles.map((t) => t.letter).join("") === base) {
          const first = tiles[0];
          tiles[0] = tiles[1];
          tiles[1] = first;
        }
        beginChallenge({
          ...blankChallenge(idx, type),
          word: base,
          meaning: pick.meaning,
          tiles,
          slots: Array.from({ length: base.length }, () => null as number | null),
        });
        return;
      }

      if (type === 2) {
        // جفت‌سازی — ۲ جفت انگلیسی↔فارسی
        if (distinctMeanings.size < 2) {
          toast.error("برای «جفت‌سازی» حداقل ۲ واژهٔ متمایز لازم است");
          return;
        }
        const picks = draw(2);
        if (picks.length < 2) {
          toast.error("برای «جفت‌سازی» حداقل ۲ واژهٔ متمایز لازم است");
          return;
        }
        const built: MatchCard[] = [];
        picks.forEach((w) => {
          built.push({ id: built.length, side: "en", word: baseWord(w.word), meaning: w.meaning });
          built.push({ id: built.length, side: "fa", word: baseWord(w.word), meaning: w.meaning });
          used.add(baseWord(w.word));
        });
        beginChallenge({ ...blankChallenge(idx, type), cards: shuffle(built) });
        return;
      }

      // شنیداری — ۱ واژه با تلفظ و ۴ گزینهٔ معنی
      if (distinctMeanings.size < 4) {
        toast.error("برای «شنیداری» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
        return;
      }
      const pick = draw(1)[0];
      if (!pick) {
        toast.error("برای «شنیداری» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
        return;
      }
      const distractors = pickUnique(
        pool.filter((d) => d.meaning !== pick.meaning),
        3,
        (d) => d.meaning,
      ).map((d) => d.meaning);
      const options = shuffle([pick.meaning, ...distractors]);
      used.add(baseWord(pick.word));
      const word = baseWord(pick.word);
      beginChallenge({
        ...blankChallenge(idx, type),
        word,
        meaning: pick.meaning,
        questions: [{ word, meaning: pick.meaning, options, answer: options.indexOf(pick.meaning) }],
      });
      speak(word, { speed });
    },
    [progress, data.vocab, lesson, speed, beginChallenge],
  );

  // ── پایان مرحله — ستاره‌گذاری + ذخیرهٔ پیشرفت (+ مراسم پایان دور کامل) ──

  const completeStage = useCallback(
    (finalErrors: number) => {
      if (!challenge || !progress) return;
      const stars = starsOf(finalErrors);
      const idx = challenge.idx;
      // فاز G2-e — پایان جلسهٔ تله‌متری این مرحله (برد/باخت هر دو finish)
      sessionRef.current?.end("finish");
      // فاز G2-e — بازخورد صوتی/لرزشی پایان مرحله:
      // ۳ ستاره = record · ۲ ستاره (برد با یک خطا) = win + record · ۱ ستاره (باخت) = wrong
      if (stars === 3) {
        playSound("record");
        buzz("record");
      } else if (stars === 2) {
        playSound("win");
        buzz("record");
      } else {
        playSound("wrong");
      }
      setLiveMsg(`مرحلهٔ ${faNum(idx + 1)} تمام شد — ${faNum(stars)} ستاره از ${faNum(3)}`);
      const nextStars = progress.stars.slice();
      nextStars[idx] = stars;
      const nextDone = progress.done.slice();
      nextDone[idx] = true;
      writeProgress(progressKey, {
        stars: nextStars,
        done: nextDone,
        order: progress.order ?? null,
      });
      setChallenge((c) =>
        c ? { ...c, errors: finalErrors, resultStars: stars, timeSecs: stageSecsRef.current } : c,
      );

      if (idx >= TOTAL_STAGES - 1) {
        // پایان دور کامل — ثبت استریک/جلسه/Attempt/رکورد و مراسم پایان
        touchStreak();
        recordStudySession();
        bumpPlays(activeBookId, GAME_KEY);
        const perfect = nextStars.filter((s) => s === 3).length;
        const total = nextStars.reduce((a, b) => a + b, 0);
        saveAttempt(activeBookId, GAME_KEY, {
          lesson: lesson === ALL_LESSONS ? 0 : lesson,
          total: TOTAL_STAGES,
          correct: perfect,
          duration: secsRef.current,
          detail: { stars: nextStars },
        });
        const prev = loadBest<BestRec>(activeBookId, GAME_KEY, bestScope);
        if (!prev || total > prev.score) {
          saveBest(activeBookId, GAME_KEY, bestScope, { score: total });
          setIsRecord(true);
          toast.success(`رکورد جدید! ${faNum(total)} ستاره از ${faNum(MAX_STARS)} 🏆`);
        }
      }
    },
    [challenge, progress, progressKey, activeBookId, lesson, bestScope],
  );

  const backToMap = useCallback(() => {
    stopSpeaking();
    setChallenge(null);
    setPhase("map");
  }, []);

  // فاز G2-e — تأیید نگهبان خروج: رهاکردن مرحلهٔ نیمه‌کاره (تله‌متری + تلفظ + توقف)
  const confirmExitToMap = useCallback(() => {
    setExitAsk(false);
    sessionRef.current?.abandon("exit");
    stopSpeaking();
    setLiveMsg("به نقشه برگشتی — مرحلهٔ نیمه‌کاره رها شد");
    resume();
    backToMap();
  }, [backToMap, resume]);

  // ── پاسخ‌دهی مینی‌چالش‌ها ──

  /** آزمون واژه — هر سؤال یک بار پاسخ داده می‌شود؛ غلط = خطا + صفحهٔ مرور */
  const answerQuiz = useCallback(
    (choice: number) => {
      if (!challenge || challenge.type !== 0 || challenge.picked !== null || paused) return;
      const q = challenge.questions[challenge.qIdx];
      if (!q) return;
      const ok = choice === q.answer;
      if (ok) {
        recordSRS(q.word, true);
        speak(q.word, { speed });
        // فاز G2-e — بازخورد سه‌کانالهٔ پاسخ درست (صدا + لرزش + اعلام زنده)
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${q.word}» — درست بود! 🎉`);
      } else {
        recordSRS(q.word, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg(`غلط بود — پاسخ درست: ${q.meaning}`);
      }
      const errors = challenge.errors + (ok ? 0 : 1);
      const isLast = challenge.qIdx >= challenge.questions.length - 1;
      setChallenge((c) =>
        c
          ? {
              ...c,
              picked: choice,
              errors,
              missed:
                ok || c.missed.some((m) => m.front === q.word)
                  ? c.missed
                  : [...c.missed, { front: q.word, back: q.meaning }],
            }
          : c,
      );
      later(
        () => {
          if (isLast) {
            completeStage(errors);
          } else {
            setChallenge((c) => (c ? { ...c, qIdx: c.qIdx + 1, picked: null } : c));
          }
        },
        ok ? 900 : 1500,
      );
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** شنیداری — انتخاب تا رسیدن به پاسخ درست ادامه دارد؛ هر غلط یک خطا */
  const answerListen = useCallback(
    (choice: number) => {
      if (!challenge || challenge.type !== 3 || challenge.picked !== null || paused) return;
      const q = challenge.questions[0];
      if (!q || challenge.saidIds.includes(choice)) return;
      if (choice === q.answer) {
        recordSRS(challenge.word, true);
        speak(challenge.word, { speed });
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${challenge.word}» — درست بود! 🎉`);
        setChallenge((c) => (c ? { ...c, picked: choice } : c));
        later(() => completeStage(challenge.errors), 900);
      } else {
        recordSRS(challenge.word, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg("گزینه غلط — دوباره گوش کن و انتخاب کن");
        setChallenge((c) =>
          c
            ? {
                ...c,
                saidIds: [...c.saidIds, choice],
                errors: c.errors + 1,
                missed: c.missed.some((m) => m.front === c.word)
                  ? c.missed
                  : [...c.missed, { front: c.word, back: c.meaning }],
              }
            : c,
        );
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** حروف جابه‌جا — گذاشتن حرف در اولین خانهٔ خالی + سنجش وقتی همه پر شد */
  const placeTile = useCallback(
    (tileId: number) => {
      if (
        !challenge ||
        challenge.type !== 1 ||
        challenge.shake ||
        challenge.resultStars !== null ||
        paused
      ) {
        return;
      }
      const empty = challenge.slots.indexOf(null);
      if (empty === -1) return;
      const tile = challenge.tiles.find((t) => t.id === tileId);
      if (!tile) return;
      // فاز G2-e — کلیک خنثای گذاشتن حرف
      playSound("click");
      buzz("light");
      const nextSlots = challenge.slots.slice();
      nextSlots[empty] = tileId;
      if (nextSlots.every((s) => s !== null)) {
        const attempt = nextSlots
          .map((s) => challenge.tiles.find((t) => t.id === s)?.letter ?? "")
          .join("");
        if (attempt === challenge.word) {
          recordSRS(challenge.word, true);
          speak(challenge.word, { speed });
          setChallenge((c) => (c ? { ...c, slots: nextSlots } : c));
          later(() => completeStage(challenge.errors), 850);
        } else {
          recordSRS(challenge.word, false);
          playSound("wrong");
          buzz("error");
          setLiveMsg("ترتیب غلط بود — خانه‌ها خالی شدند، دوباره تلاش کن");
          setChallenge((c) =>
            c
              ? {
                  ...c,
                  slots: nextSlots,
                  shake: true,
                  errors: c.errors + 1,
                  missed: c.missed.some((m) => m.front === c.word)
                    ? c.missed
                    : [...c.missed, { front: c.word, back: c.meaning }],
                }
              : c,
          );
          later(
            () =>
              setChallenge((c) =>
                c
                  ? { ...c, slots: Array<number | null>(c.word.length).fill(null), shake: false }
                  : c,
              ),
            750,
          );
        }
      } else {
        setChallenge((c) => (c ? { ...c, slots: nextSlots } : c));
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** پس گرفتن حرف از یک خانهٔ پر (کلیک روی خانه) */
  const pullTile = useCallback(
    (slotIdx: number) => {
      if (!challenge || challenge.type !== 1 || challenge.shake || paused) return;
      playSound("click");
      buzz("light");
      setChallenge((c) =>
        c && c.slots[slotIdx] !== null
          ? { ...c, slots: c.slots.map((s, i) => (i === slotIdx ? null : s)) }
          : c,
      );
    },
    [challenge, paused],
  );

  /** جفت‌سازی — دو کارت پشت‌سرهم؛ جفت درست می‌ماند، غلط لرزش می‌گیرد */
  const tapCard = useCallback(
    (card: MatchCard) => {
      if (!challenge || challenge.type !== 2 || challenge.resultStars !== null || paused) return;
      if (challenge.matchedIds.includes(card.id) || challenge.wrongIds.length > 0) return;
      if (challenge.sel === null) {
        playSound("click");
        buzz("light");
        setChallenge((c) => (c ? { ...c, sel: card.id } : c));
        return;
      }
      if (challenge.sel === card.id) {
        setChallenge((c) => (c ? { ...c, sel: null } : c));
        return;
      }
      const first = challenge.cards.find((c) => c.id === challenge.sel);
      if (!first) {
        setChallenge((c) => (c ? { ...c, sel: card.id } : c));
        return;
      }
      if (first.side !== card.side && first.word === card.word) {
        recordSRS(first.word, true);
        speak(first.word, { speed });
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${first.word}» جفت شد — درست بود! 🎉`);
        const nextMatched = [...challenge.matchedIds, first.id, card.id];
        setChallenge((c) => (c ? { ...c, matchedIds: nextMatched, sel: null } : c));
        if (nextMatched.length >= challenge.cards.length) {
          later(() => completeStage(challenge.errors), 750);
        }
      } else {
        const wrongWord = first.side === "en" ? first.word : card.word;
        const wrongBack = first.side === "en" ? first.meaning : card.meaning;
        recordSRS(wrongWord, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg("جفت غلط — کارت‌ها برمی‌گردند");
        setChallenge((c) =>
          c
            ? {
                ...c,
                wrongIds: [first.id, card.id],
                sel: null,
                errors: c.errors + 1,
                missed: c.missed.some((m) => m.front === wrongWord)
                  ? c.missed
                  : [...c.missed, { front: wrongWord, back: wrongBack }],
              }
            : c,
        );
        later(() => setChallenge((c) => (c ? { ...c, wrongIds: [] } : c)), 800);
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        data={data}
        lesson={lesson}
        setLesson={setLesson}
        best={best}
        progress={progress}
        doneCount={doneCount}
        totalStars={totalStars}
        allDone={allDone}
        beginAdventure={beginAdventure}
        setPhase={setPhase}
      />
    );
  }

  // گارد دفاعی — نقشه/چالش بدون پیشرفت ذخیره‌شده نباید رخ دهد
  if (!progress && (phase === "map" || phase === "challenge")) {
    return (
      <Card className="mx-auto max-w-lg rise-in">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <Map size={26} className="text-muted-foreground" />
          <p className="text-[13px] font-bold text-muted-foreground">ماجراجویی فعالی پیدا نشد</p>
          <Button className="h-11" onClick={() => setPhase("setup")}>
            بازگشت به راه‌اندازی
          </Button>
        </CardContent>
      </Card>
    );
  }
  if (phase === "challenge" && !challenge) {
    return (
      <Card className="mx-auto max-w-lg rise-in">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <Map size={26} className="text-muted-foreground" />
          <p className="text-[13px] font-bold text-muted-foreground">مرحله‌ای در جریان نیست</p>
          <Button className="h-11" onClick={() => setPhase("map")}>
            بازگشت به نقشه
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── نقشه — ستون مارپیچ ۸ گره با آفست افقی متناوب + خط‌چین میانی ──
  if (phase === "map" && progress) {
    return (
      <StageMap
        progress={progress}
        totalStars={totalStars}
        doneCount={doneCount}
        allDone={allDone}
        muted={muted}
        setMuted={setMuted}
        handleHelp={handleHelp}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
        startStage={startStage}
        setPhase={setPhase}
      />
    );
  }

  // ── چالش جاری ──
  if (phase === "challenge" && challenge) {
    return (
      <ChallengeView
        challenge={challenge}
        isRecord={isRecord}
        totalStars={totalStars}
        paused={paused}
        togglePause={togglePause}
        muted={muted}
        setMuted={setMuted}
        liveMsg={liveMsg}
        speed={speed}
        exitAsk={exitAsk}
        setExitAsk={setExitAsk}
        tutorialOpen={tutorialOpen}
        handleHelp={handleHelp}
        handleTutorialOpenChange={handleTutorialOpenChange}
        answerQuiz={answerQuiz}
        answerListen={answerListen}
        placeTile={placeTile}
        pullTile={pullTile}
        tapCard={tapCard}
        setChallenge={setChallenge}
        startStage={startStage}
        backToMap={backToMap}
        confirmExitToMap={confirmExitToMap}
        resume={resume}
        setPhase={setPhase}
      />
    );
  }

  // ── مراسم پایان دور کامل ──
  if (phase === "done" && progress) {
    return (
      <DoneView
        progress={progress}
        totalStars={totalStars}
        isRecord={isRecord}
        muted={muted}
        setMuted={setMuted}
        beginAdventure={beginAdventure}
        setPhase={setPhase}
      />
    );
  }

  // گارد نهایی — حالت‌های ترکیبی غیرممکن به نقشه برمی‌گردند
  return (
    <Card className="mx-auto max-w-lg rise-in">
      <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
        <Map size={26} className="text-muted-foreground" />
        <Button className="h-11" onClick={() => setPhase("map")}>
          بازگشت به نقشه
        </Button>
      </CardContent>
    </Card>
  );
}
