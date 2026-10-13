"use client";

/**
 * بازی «جدول کلمات متقاطع» (Crossword) — فاز ۴ نقشه راه جامع ۲۰۲۶ + فاز G2-d نقشه راه بازی‌ها.
 *
 * جدول به‌صورت خودکار از واژگان خود درس ساخته می‌شود: سرنخ هر واژه معنی فارسی است
 * و بازیکن حروف انگلیسی را با کیبورد فیزیکی یا ردیف دکمه‌های A-Z در سلول‌ها می‌نشاند.
 * - «بررسی»: حروف درست قفل می‌شوند (primary)، غلط‌ها با لرزش خالی می‌شوند
 * - «راهنما»: حرف سلول فعال آشکار می‌شود (+۱ راهنما — رکورد فقط بدون راهنما ثبت می‌شود)
 * - واژهٔ کامل درست: match-pop + تلفظ + سرنخ خط‌خورده با Badge سبز
 * - رکورد: سریع‌ترین حل (بدون راهنما) به تفکیک درس × تعداد واژه
 *
 * الگوریتم تولید (generateCrossword) export شده تا اسکریپت تست فشار مستقیم import کند.
 *
 * فاز G2-d — مهاجرت به کیت GameKit v2 (الگوی پایلوت memory و word-search):
 * - GameShell + ResultScreen + آموزش ۳گامی (useAutoTutorial) + Pause (گیت تایمر +
 *   اورلی + گارد تایپ حین توقف) + نگهبان خروج کیت + تله‌متری جلسه + صدا/لرزش
 * - کار اختصاصی G2-d — draft نیمه‌کاره در خروج: نگهبان خروج G0-06 هوشمند شد؛
 *   تأیید خروج با ≥۱ خانهٔ پرشده، پیشرفت را در کلید افزودنی جدید
 *   `visionone:game-draft:crossword` ذخیره می‌کند و setup نوار «ادامهٔ جدول
 *   نیمه‌کاره؟» با «ادامه» (بازگردانی حروف سر جایشان) و «حذف» می‌دهد.
 *   draft خراب/نامعتبر ساکت پاک می‌شود. کلید با کتاب فعال scope می‌شود (bookId
 *   داخل JSON — همان الگوی استورهای scoped پروژه).
 *
 * قرارداد حفظ‌شوندگی §۳-۴: امضای saveAttempt/saveBest/bumpPlays و کلیدهای
 * localStorage موجود دست‌نخورده؛ کلید draft کاملاً افزودنی است و بدون PII.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "../shared";
// فاز G2-d — کیت GameKit v2 (قرارداد API سند)
import { buzz } from "../kit/haptics";
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "../kit/hint-coach";
import {
  cellKey,
  cellsOf,
  draftCellKey,
  generateCrossword,
  parseKey,
  type CrosswordDir,
  type CrosswordEntry,
  type CrosswordPlacement,
  type CrosswordPuzzle,
} from "./generator";
import {
  ALL_LESSONS,
  FINISH_MS,
  GAME_KEY,
  MIN_PLACED,
  POP_MS,
  SHAKE_MS,
  type BestRecord,
  type Phase,
} from "./types";
import {
  clearDraftForBook,
  DRAFT_KEY,
  notifyDraftChange,
  parseDraft,
  readDraftRaw,
  saveDraft,
  subscribeDraft,
} from "./draft";
import { SetupPanel } from "./setup-panel";
import { DoneView } from "./done-view";
import { PlayingView } from "./playing-view";

export function CrosswordGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(1);
  const [wordCount, setWordCount] = useState(6);

  const [puzzle, setPuzzle] = useState<CrosswordPuzzle | null>(null);
  /** حروف تایپ‌شده بازیکن — کلید «r,c» */
  const [letters, setLetters] = useState<Record<string, string>>({});
  /** سلول‌های تاییدشده (بررسی درست یا واژهٔ حل‌شده) — دیگر قابل ویرایش نیستند */
  const [locked, setLocked] = useState<Set<string>>(new Set());
  const [popKeys, setPopKeys] = useState<string[]>([]);
  const [shakeKeys, setShakeKeys] = useState<string[]>([]);
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [dir, setDir] = useState<CrosswordDir>("across");
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [hints, setHints] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  // فاز G2-d — کیت: اعلام زندهٔ مرکزی + شمارش خطای راستی‌آزمایی + واژه‌های خطاخورده
  const [liveMsg, setLiveMsg] = useState("");
  /** تعداد حروفی که با «بررسی» غلط از آب درآمدند و پاک شدند (مبنای ستاره و مرور) */
  const [wrongChecked, setWrongChecked] = useState(0);
  /** واژه‌هایی که خانه‌هایشان حرف غلط داشت — برای «مرور خطاها» صفحهٔ نتیجه */
  const [missedWords, setMissedWords] = useState<{ front: string; back: string }[]>([]);

  // فاز G2-d — کیت: توقف/ادامهٔ استاندارد + توقف خودکار تب مخفی (الگوی word-search)
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (p) stopSpeaking();
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  // G5-01 — مدرس بازی (نام hintCoach تا با راهنمای درون‌بازی hint تلاقی نکند؛ کارت داخل GameShell)
  const hintCoach = useHintCoach(GAME_KEY);
  /** نگهبان خروج (از G0-06، حالا روی GameExitGuard کیت) — دیالوگ وقتی ≥۱ خانهٔ جدول پر شده است */
  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای شنوندهٔ کیبورد فیزیکی (بدون ثبت‌مجدد effect) */
  const exitAskRef = useRef(false);
  const setExitAskGuard = (open: boolean): void => {
    exitAskRef.current = open;
    setExitAsk(open);
  };
  /** آینهٔ paused برای گارد تایپ حین توقف (شنوندهٔ کیبورد ref می‌خواند) */
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // الگوی دارباز/cloze: state بی‌صدا + شنوندهٔ storage (بدون setState خام در effect)
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // فاز G2-d — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
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

  // فاز G2-d — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const { speed } = useVoiceSpeed();
  const secsRef = useRef(0);
  /** آینهٔ سنکرون letters — ضد keydown پشت‌سرهم (حروف پشت‌هم گم نشوند) */
  const lettersRef = useRef<Record<string, string>>({});
  /** آینهٔ puzzle — برای finish مستقل از پنجرهٔ فراخوانی (مسیر ادامهٔ draft) */
  const puzzleRef = useRef<CrosswordPuzzle | null>(null);
  /** آینهٔ تنظیمات دور — finish ممکن است پس از تغییر state از مسیر draft صدا زده شود */
  const lessonRef = useRef(lesson);
  const wordCountRef = useRef(wordCount);
  const timersRef = useRef<number[]>([]);

  // فاز G2-d — draft نیمه‌کاره: خواندن واکنش‌گرا + پاک‌سازی ساکت خراب‌ها
  const draftRaw = useSyncExternalStore(subscribeDraft, readDraftRaw, () => null);
  const parsedDraft = useMemo(() => parseDraft(draftRaw), [draftRaw]);
  useEffect(() => {
    if (draftRaw !== null && parsedDraft === null) {
      // draft خراب/نامعتبر — ساکت پاک می‌شود (بدون خطا، بدون toast)
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* noop */
      }
      notifyDraftChange();
    }
  }, [draftRaw, parsedDraft]);
  /** draft معتبر برای کتاب فعال (draft کتاب دیگر نمایش داده نمی‌شود و حفظ می‌ماند) */
  const draft = parsedDraft && parsedDraft.bookId === activeBookId ? parsedDraft : null;

  /** setTimeout ثبت‌شده — در شروع دور و unmount پاک می‌شود */
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  /** پاک‌سازی تایمرهای معلق دور (انیمیشن‌ها + پایان با تأخیر) */
  const clearRoundTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  // رکورد شخصی این اسکوپ — اسنپ‌شات رشته‌ای (الگوی memory-game)
  const bestScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${wordCount}`;
  const bestRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRecord>(activeBookId, GAME_KEY, bestScope);
      return b ? JSON.stringify(b) : null;
    },
    () => null,
  );
  const best = useMemo<BestRecord | null>(
    () => (bestRaw ? (JSON.parse(bestRaw) as BestRecord) : null),
    [bestRaw],
  );

  /** واژه‌هایی که با این حروف کامل و درست‌اند (از بین حل‌نشده‌ها) */
  const completionsIn = (lts: Record<string, string>, already: Set<number>): number[] => {
    if (!puzzle) return [];
    const out: number[] = [];
    for (const p of puzzle.placements) {
      if (already.has(p.id)) continue;
      let ok = true;
      for (let j = 0; j < p.word.length; j++) {
        if ((lts[draftCellKey(p, j)] ?? "") !== p.word[j]) {
          ok = false;
          break;
        }
      }
      if (ok) out.push(p.id);
    }
    return out;
  };

  const finish = (finalSecs: number, finalHints: number) => {
    // آینه‌ها — finish ممکن است از پنجرهٔ رندر دیگری (ادامهٔ draft) صدا زده شود
    const curLesson = lessonRef.current;
    const curCount = wordCountRef.current;
    const placed = puzzleRef.current?.placements.length ?? 0;
    clearDraftForBook(activeBookId); // دفاعی — draft مال همین کتاب نباید بعد از دور کامل بماند
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    saveAttempt(activeBookId, GAME_KEY, {
      lesson: curLesson === ALL_LESSONS ? 0 : curLesson,
      total: placed,
      correct: placed,
      duration: finalSecs,
      detail: { hints: finalHints },
    });
    sessionRef.current?.end("finish");
    // فاز G2-d — سه‌کانالهٔ پایان جدول: صدا + لرزش + اعلام
    playSound("win");
    buzz("record");
    setLiveMsg("همه واژه‌ها سر جایشان نشستند! 🎉");
    setSecs(finalSecs);
    if (finalHints === 0) {
      const scope = `${curLesson === ALL_LESSONS ? "all" : curLesson}:${curCount}`;
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (!prev || finalSecs < prev.time) {
        saveBest(activeBookId, GAME_KEY, scope, { time: finalSecs });
        setIsRecord(true);
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! جدول در ${fmtTime(finalSecs)} حل شد 🏆`);
      } else {
        toast.success(`جدول کامل شد — ${fmtTime(finalSecs)} 🎉`);
      }
    } else {
      toast.success(`جدول کامل شد — ${fmtTime(finalSecs)} با ${faNum(finalHints)} راهنما 🎉`);
    }
    setPhase("done");
  };

  /** ثبت واژه‌های تازه‌حل‌شده: قفل سلول‌ها + pop + صدا + تلفظ + پایان دور */
  const applySolved = (ids: number[], hCount: number) => {
    if (!puzzle) return;
    const cells: string[] = [];
    ids.forEach((id) => cells.push(...cellsOf(puzzle.placements[id])));
    setSolved((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
    setLocked((prev) => {
      const next = new Set(prev);
      cells.forEach((k) => next.add(k));
      return next;
    });
    // فاز G2-d — سه‌کانالهٔ یافتن واژه (صدا + لرزش + اعلام aria)
    playSound("correct");
    buzz("success");
    const allDone = solved.size + ids.length >= puzzle.placements.length;
    const firstWord = puzzle.placements[ids[0]].word;
    setLiveMsg(
      allDone
        ? "همه واژه‌ها سر جایشان نشستند! 🎉"
        : ids.length > 1
          ? `${faNum(ids.length)} واژه کامل شد! 🎉`
          : `«${firstWord}» کامل شد! 🎉`,
    );
    setPopKeys(cells);
    later(() => setPopKeys([]), POP_MS);
    speak(firstWord, { speed });
    if (allDone) {
      later(() => finish(secsRef.current, hCount), FINISH_MS);
    }
  };

  const start = () => {
    playSound("click");
    buzz("light");
    const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    // گارد واژهٔ جدول‌پذیر: فقط حروف انگلیسی، طول ۳ تا ۹
    const valid = pool.filter((w) => /^[A-Za-z]{3,9}$/.test(w.word));
    const normalized = valid.map((w) => ({ ...w, word: w.word.toUpperCase() }));
    const chosen = pickUnique(normalized, wordCount, (w) => w.word);
    if (chosen.length < wordCount) {
      toast.error(
        `واژهٔ انگلیسی ۳ تا ۹ حرفیِ کافی پیدا نشد (${faNum(chosen.length)} از ${faNum(wordCount)}) — درس یا تعداد دیگری را امتحان کن`,
      );
      return;
    }
    const entries: CrosswordEntry[] = chosen.map((w) => ({
      word: w.word,
      meaning: w.meaning,
      lesson: w.lesson,
      lessonLabel: w.lessonLabel,
    }));
    const built = generateCrossword(entries, { minWords: MIN_PLACED, maxTries: 60, maxSize: 13 });
    if (!built || built.placements.length < MIN_PLACED) {
      toast.error("ساخت جدول متقاطع با این واژه‌ها ممکن نشد — دوباره شروع کن یا درس دیگری را انتخاب کن");
      return;
    }
    // فاز G2-d — شروع دور تازه، draft قبلی همین کتاب باطل می‌شود
    clearDraftForBook(activeBookId);
    clearRoundTimers();
    puzzleRef.current = built;
    lessonRef.current = lesson;
    wordCountRef.current = wordCount;
    setPuzzle(built);
    lettersRef.current = {};
    setLetters({});
    setLocked(new Set());
    setPopKeys([]);
    setShakeKeys([]);
    setSolved(new Set());
    setHints(0);
    setSecs(0);
    secsRef.current = 0;
    setIsRecord(false);
    setWrongChecked(0);
    setMissedWords([]);
    hintCoach.reset(); // G5-01 — دور تازه
    setLiveMsg("");
    setDir("across");
    const startP = built.placements.find((p) => p.dir === "across") ?? built.placements[0];
    setActive({ r: startP.row, c: startP.col });
    resume();
    setExitAskGuard(false);
    sessionRef.current = createGameSession({ game: GAME_KEY, level: bestScope });
    sessionRef.current.start();
    setPhase("playing");
  };

  /**
   * فاز G2-d — ادامهٔ جدول نیمه‌کاره از draft: بازگردانی حروف سر جایشان + قفل
   * واژه‌های حل‌شده + زمان/راهنمای سپری‌شده؛ draft بلافاصله پاک می‌شود.
   */
  const resumeDraft = () => {
    if (!draft) return;
    const d = draft;
    playSound("click");
    buzz("light");
    clearDraftForBook(activeBookId); // بعد از ادامه، draft پاک می‌شود
    clearRoundTimers();
    const solvedSet = new Set<number>(d.solved);
    const lockedSet = new Set<string>();
    d.solved.forEach((id) => cellsOf(d.puzzle.placements[id]).forEach((k) => lockedSet.add(k)));
    puzzleRef.current = d.puzzle;
    lessonRef.current = d.lesson;
    wordCountRef.current = d.wordCount;
    setPuzzle(d.puzzle);
    lettersRef.current = { ...d.cells };
    setLetters({ ...d.cells });
    setLocked(lockedSet);
    setSolved(solvedSet);
    setPopKeys([]);
    setShakeKeys([]);
    setHints(d.hints);
    setSecs(d.secs);
    secsRef.current = d.secs;
    setIsRecord(false);
    setWrongChecked(0);
    setMissedWords([]);
    setLesson(d.lesson);
    setWordCount(d.wordCount);
    // سلول فعال: اولین خانهٔ آزادِ اولین واژهٔ حل‌نشده (اگر همه حل بودند، خانهٔ اول)
    const unsolved = d.puzzle.placements.find((p) => !solvedSet.has(p.id));
    const fallbackWord = unsolved ?? d.puzzle.placements[0];
    const targetKey =
      cellsOf(fallbackWord).find((k) => !lockedSet.has(k)) ?? cellsOf(fallbackWord)[0];
    const [r, c] = parseKey(targetKey);
    setDir(fallbackWord.dir);
    setActive({ r, c });
    resume();
    setExitAskGuard(false);
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${d.lesson === ALL_LESSONS ? "all" : d.lesson}:${d.wordCount}`,
    });
    sessionRef.current.start();
    setLiveMsg("جدول نیمه‌کاره بازیابی شد");
    if (solvedSet.size >= d.puzzle.placements.length) {
      // draft در پنجرهٔ پایان (پس از حل آخرین واژه) ذخیره شده بود — دور همین‌جا بسته می‌شود
      later(() => finish(secsRef.current, d.hints), 500);
    }
    setPhase("playing");
  };

  /** فاز G2-d — حذف دستی draft از نوار setup */
  const deleteDraft = () => {
    playSound("click");
    buzz("light");
    clearDraftForBook(activeBookId);
    toast("جدول نیمه‌کاره حذف شد");
  };

  /** تایپ یک حرف در سلول فعال + پیشروی + تشخیص خودکار واژهٔ کامل درست */
  // (بدون صدا — طبق تسک G2-d تایپ سریع است و صدا مزاحم می‌شد)
  const typeLetter = (ch: string) => {
    if (!puzzle || !active || !activeWord) return;
    const up = ch.toUpperCase();
    if (!/^[A-Z]$/.test(up)) return;
    const key = cellKey(active.r, active.c);
    if (locked.has(key)) return;
    const next = { ...lettersRef.current, [key]: up };
    lettersRef.current = next;
    setLetters(next);

    const completed = completionsIn(next, solved);
    // قفل‌های پس از این تایپ — سلول‌های واژه‌های تازه‌حل‌شده هم رد می‌شوند
    const lockPlus = new Set(locked);
    completed.forEach((id) => cellsOf(puzzle.placements[id]).forEach((k) => lockPlus.add(k)));

    // پیشروی به بعدیِ آزاد در همان واژه
    const cells = cellsOf(activeWord);
    const idx = cells.indexOf(key);
    let target: string | null = null;
    for (let j = idx + 1; j < cells.length; j++) {
      if (!lockPlus.has(cells[j])) {
        target = cells[j];
        break;
      }
    }
    let jumpDir: CrosswordDir | null = null;
    if (completed.length > 0) {
      applySolved(completed, hints);
      // اگر مقصد داخل واژهٔ تازه‌حل‌شده قفل شد → اولین سلول آزادِ واژهٔ حل‌نشدهٔ بعدی
      if (!target || lockPlus.has(target)) {
        const unsolved = puzzle.placements.find(
          (p) => !solved.has(p.id) && !completed.includes(p.id),
        );
        const free = unsolved ? cellsOf(unsolved).find((k) => !lockPlus.has(k)) : undefined;
        if (free && unsolved) {
          target = free;
          jumpDir = unsolved.dir;
        }
      }
    }
    if (!target) return;
    const [tr, tc] = parseKey(target);
    if (jumpDir) {
      setDir(jumpDir);
    } else {
      const tcell = puzzle.grid[tr][tc];
      const okDir = dir === "across" ? tcell.acrossId !== null : tcell.downId !== null;
      if (!okDir) setDir(dir === "across" ? "down" : "across");
    }
    setActive({ r: tr, c: tc });
  };

  /** Backspace: پاک‌کردن سلول فعال، و اگر خالی بود پرش به سلول آزاد قبلی و پاک‌کردنش */
  const backspace = () => {
    if (!puzzle || !active || !activeWord) return;
    const key = cellKey(active.r, active.c);
    if (locked.has(key)) return;
    if (lettersRef.current[key]) {
      const next = { ...lettersRef.current };
      delete next[key];
      lettersRef.current = next;
      setLetters(next);
      return;
    }
    const cells = cellsOf(activeWord);
    const idx = cells.indexOf(key);
    for (let j = idx - 1; j >= 0; j--) {
      if (!locked.has(cells[j])) {
        const pk = cells[j];
        const next = { ...lettersRef.current };
        delete next[pk];
        lettersRef.current = next;
        setLetters(next);
        const [pr, pc] = parseKey(pk);
        setActive({ r: pr, c: pc });
        return;
      }
    }
  };

  /** راهنما: حرف سلول فعال (یا نزدیک‌ترین سلول نیازمند) آشکار می‌شود +۱ شمارش */
  const hint = () => {
    if (!puzzle) return;
    const isFree = (k: string) => !locked.has(k);
    const needsLetter = (k: string) => {
      const [r, c] = parseKey(k);
      return isFree(k) && lettersRef.current[k] !== puzzle.grid[r][c].letter;
    };
    let target: { key: string; dir: CrosswordDir } | null = null;
    if (active && activeWord) {
      const cur = cellKey(active.r, active.c);
      if (needsLetter(cur)) target = { key: cur, dir: activeWord.dir };
      else {
        const free = cellsOf(activeWord).find(needsLetter) ?? cellsOf(activeWord).find(isFree);
        if (free) target = { key: free, dir: activeWord.dir };
      }
    }
    if (!target) {
      const unsolved = puzzle.placements.find((p) => !solved.has(p.id));
      const free = unsolved ? cellsOf(unsolved).find(isFree) : undefined;
      if (free && unsolved) target = { key: free, dir: unsolved.dir };
    }
    if (!target) return;
    const [tr, tc] = parseKey(target.key);
    const next = { ...lettersRef.current, [target.key]: puzzle.grid[tr][tc].letter };
    lettersRef.current = next;
    setLetters(next);
    setHints((h) => h + 1);
    setDir(target.dir);
    setActive({ r: tr, c: tc });
    const completed = completionsIn(next, solved);
    if (completed.length > 0) {
      applySolved(completed, hints + 1); // صدای correct داخل applySolved است
    } else {
      playSound("click");
      buzz("light");
      setLiveMsg("راهنما فعال شد — یک حرف آشکار شد (+۱)");
    }
  };

  /** بررسی: حروف درست قفل، غلط‌ها لرزش و خالی (+ شمارش خطا و نگاشت به مرور) */
  const check = () => {
    if (!puzzle) return;
    const wrong: string[] = [];
    const right: string[] = [];
    for (const [key, ch] of Object.entries(lettersRef.current)) {
      if (locked.has(key)) continue;
      const [r, c] = parseKey(key);
      const cell = puzzle.grid[r]?.[c];
      if (cell && cell.letter === ch) right.push(key);
      else wrong.push(key);
    }
    if (right.length > 0) {
      setLocked((prev) => {
        const next = new Set(prev);
        right.forEach((k) => next.add(k));
        return next;
      });
    }
    if (wrong.length > 0) {
      playSound("wrong");
      buzz("error");
      setWrongChecked((n) => n + wrong.length);
      // فاز G2-d — نگاشت خطا به واژهٔ مرور: واژه‌های حل‌نشده‌ای که خانه‌هایشان
      // حرف غلط داشت، برای «مرور خطاها» صفحهٔ نتیجه ثبت می‌شوند
      const wrongSet = new Set(wrong);
      setMissedWords((prev) => {
        const add: { front: string; back: string }[] = [];
        for (const p of puzzle.placements) {
          if (solved.has(p.id)) continue;
          if (prev.some((m) => m.front === p.word) || add.some((m) => m.front === p.word)) continue;
          if (cellsOf(p).some((k) => wrongSet.has(k))) add.push({ front: p.word, back: p.meaning });
        }
        return [...prev, ...add];
      });
      setShakeKeys(wrong);
      // G5-01 — مدرس بازی: هر حرف غلط یک خطا (معنی واژهٔ دارای خانهٔ غلط + حرف درست/انتخابی)
      for (const k of wrong) {
        const [r, c] = parseKey(k);
        const wp = puzzle.placements.find((p) => cellsOf(p).includes(k));
        hintCoach.recordMistake({
          prompt: wp?.meaning,
          answer: puzzle.grid[r]?.[c]?.letter ?? "",
          chosen: (lettersRef.current[k] ?? "").slice(0, 160),
        });
      }
      later(() => {
        setShakeKeys([]);
        const next = { ...lettersRef.current };
        wrong.forEach((k) => delete next[k]);
        lettersRef.current = next;
        setLetters(next);
      }, SHAKE_MS);
      toast.error(`${faNum(wrong.length)} حرف غلط پاک شد${right.length > 0 ? " — درست‌ها قفل شدند" : ""}`);
      setLiveMsg(
        `${faNum(wrong.length)} حرف غلط پاک شد${right.length > 0 ? ` — ${faNum(right.length)} حرف درست قفل شد` : ""}`,
      );
    } else if (right.length > 0) {
      playSound("correct");
      buzz("success");
      toast.success(`${faNum(right.length)} حرف درست قفل شد`);
      setLiveMsg(`${faNum(right.length)} حرف درست قفل شد`);
    } else {
      toast("چیزی برای بررسی وارد نشده");
    }
  };

  /** tap سلول: انتخاب؛ دوبار tap روی همان سلول = تغییر جهت (بازخورد کلیک) */
  const onCellTap = (r: number, c: number) => {
    if (!puzzle) return;
    const cell = puzzle.grid[r][c];
    if (cell.acrossId === null && cell.downId === null) return;
    playSound("click");
    buzz("light");
    if (active && active.r === r && active.c === c) {
      if (cell.acrossId !== null && cell.downId !== null) {
        setDir((d) => (d === "across" ? "down" : "across"));
      }
      return;
    }
    setActive({ r, c });
    const curOk = dir === "across" ? cell.acrossId !== null : cell.downId !== null;
    if (!curOk) setDir(dir === "across" ? "down" : "across");
  };

  /** tap سرنخ: فعال‌سازی و هایلایت مسیر واژه */
  const focusWord = (p: CrosswordPlacement) => {
    playSound("click");
    buzz("light");
    const cells = cellsOf(p);
    const target = cells.find((k) => !locked.has(k)) ?? cells[0];
    const [r, c] = parseKey(target);
    setActive({ r, c });
    setDir(p.dir);
  };

  // واژهٔ فعال بر اساس سلول و جهت (اگر جهت در این سلول معتبر نباشد، جهت دیگر)
  // بدون useMemo دستی — React Compiler خودش memo می‌کند
  const activeWord: CrosswordPlacement | null = (() => {
    if (!puzzle || !active) return null;
    const cell = puzzle.grid[active.r]?.[active.c];
    if (!cell) return null;
    const primary = dir === "across" ? cell.acrossId : cell.downId;
    if (primary !== null) return puzzle.placements[primary];
    const other = dir === "across" ? cell.downId : cell.acrossId;
    return other !== null ? puzzle.placements[other] : null;
  })();

  // تایمر — بدون setState مستقیم در effect (react-hooks v6)؛ secsRef برای زمان دقیق پایان
  // فاز G2-d — گیت روی paused: هنگام توقف (دستی یا خودکارِ تب مخفی) هیچ تیکی جلو نمی‌رود
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [phase, paused]);

  // cleanup کامل unmount: تله‌متری رهاشده + صدا + تایمرهای معلق
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      clearRoundTimers();
    };
  }, [clearRoundTimers]);

  // کیبورد فیزیکی — الگوی latest-ref: شنونده فقط با [phase] ثبت می‌شود و بدنهٔ آن
  // همیشه آخرین نسخهٔ توابع را صدا می‌زند (صفر setState در بدنهٔ effect)
  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    keyRef.current = (e: KeyboardEvent) => {
      if (exitAskRef.current) return; // نگهبان خروج — تایپ حروف حین دیالوگ تأیید خروج
      if (pausedRef.current) return; // فاز G2-d — گارد تایپ حین توقف/اورلی
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) typeLetter(e.key);
    };
  });
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  /** انصراف حین دور — نگهبان G0-06 (حفظ‌شده): ≥۱ خانهٔ پر = دیالوگ؛ وگرنه خروج مستقیم */
  const handleExitClick = () => {
    if (Object.keys(lettersRef.current).length > 0) {
      setExitAskGuard(true);
    } else {
      stopSpeaking();
      clearRoundTimers();
      sessionRef.current?.abandon("exit");
      resume();
      setPhase("setup");
    }
  };

  /** فاز G2-d — تأیید خروج: ذخیرهٔ draft نیمه‌کاره + رهاکردن دور + بازگشت به setup */
  const confirmExit = () => {
    if (puzzle && Object.keys(lettersRef.current).length > 0) {
      saveDraft({
        bookId: activeBookId,
        lesson,
        wordCount,
        cells: lettersRef.current,
        savedAt: Date.now(),
        puzzle,
        solved: [...solved],
        hints,
        secs: secsRef.current,
      });
    }
    sessionRef.current?.abandon("exit");
    clearRoundTimers();
    stopSpeaking();
    setExitAskGuard(false);
    resume();
    setPhase("setup");
  };

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        data={data}
        draft={draft}
        lesson={lesson}
        setLesson={setLesson}
        wordCount={wordCount}
        setWordCount={setWordCount}
        best={best}
        start={start}
        resumeDraft={resumeDraft}
        deleteDraft={deleteDraft}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  if (!puzzle) return null;

  // ── Done — فاز G2-d: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    return (
      <DoneView
        puzzle={puzzle}
        wrongChecked={wrongChecked}
        hints={hints}
        secs={secs}
        isRecord={isRecord}
        missedWords={missedWords}
        start={start}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  return (
    <PlayingView
      puzzle={puzzle}
      letters={letters}
      locked={locked}
      popKeys={popKeys}
      shakeKeys={shakeKeys}
      active={active}
      dir={dir}
      solved={solved}
      hints={hints}
      secs={secs}
      liveMsg={liveMsg}
      paused={paused}
      resume={resume}
      togglePause={togglePause}
      muted={muted}
      setMuted={setMuted}
      handleHelp={handleHelp}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
      exitAsk={exitAsk}
      setExitAskGuard={setExitAskGuard}
      confirmExit={confirmExit}
      hintCoach={hintCoach}
      activeWord={activeWord}
      onCellTap={onCellTap}
      typeLetter={typeLetter}
      backspace={backspace}
      check={check}
      hint={hint}
      focusWord={focusWord}
      handleExitClick={handleExitClick}
    />
  );
}
