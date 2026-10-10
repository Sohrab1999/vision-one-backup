"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { X, Star, BookOpen, SearchX, GraduationCap, CheckCircle2, Search, ImagePlay, Loader2, Save, Trash2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { readUserName } from "@/lib/name-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import type { DictEntry, VocabEntry, VocabWord } from "@/data/types";
import { SpeakButton } from "./speak-button";
import { useStarredWords, toggleStar } from "@/lib/star-store";
import { useSRSData, SRS_MAX_BOX } from "@/lib/srs-store";
import { useLearnedWords } from "@/lib/learned-store";
import { setPracticeIntent } from "@/lib/practice-intent";
import { requestView } from "@/lib/nav-store";

/**
 * Word lookup — کلیک روی هر واژهٔ انگلیسی در متن‌ها، معنی و دیکشنری همان واژه را نشان می‌دهد.
 * داده از دیکشنری و واژگانِ جزوهٔ فعال می‌آید (بدون درخواست شبکه) و با تغییر کتاب بازسازی می‌شود.
 */

// ── نگاشت‌های جست‌وجو — از دادهٔ کتاب فعال ساخته می‌شوند ──
interface LookupMaps {
  dict: Map<string, DictEntry>;
  vocab: Map<string, VocabWord>;
  phrases: Set<string>;
}

function normalize(raw: string): string {
  return raw
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

function buildMaps(dictionary: DictEntry[], vocabList: VocabEntry[]): LookupMaps {
  const dict = new Map<string, DictEntry>();
  const vocab = new Map<string, VocabWord>();
  const phrases = new Set<string>();
  for (const d of dictionary) {
    const key = normalize(d.word);
    if (key && !dict.has(key)) dict.set(key, d);
    if (key.includes(" ")) phrases.add(key);
  }
  for (const v of vocabList) {
    const key = normalize(v.word);
    if (key && !vocab.has(key)) vocab.set(key, v);
    if (key.includes(" ")) phrases.add(key);
  }
  return { dict, vocab, phrases };
}

/** کش سبک بهازای آرایه‌های دادهٔ کتاب فعال — با تغییر کتاب (تغییر رفرنس داده) بازسازی می‌شود */
let mapsCache: { dictionary: DictEntry[]; vocab: VocabEntry[]; maps: LookupMaps } | null = null;

function getLookupMaps(dictionary: DictEntry[], vocab: VocabEntry[]): LookupMaps {
  if (mapsCache && mapsCache.dictionary === dictionary && mapsCache.vocab === vocab) {
    return mapsCache.maps;
  }
  const maps = buildMaps(dictionary, vocab);
  mapsCache = { dictionary, vocab, maps };
  return maps;
}

// کش ماژول‌اسکوپ تصویر حافظه — تا جابه‌جایی میان واژه‌ها تصویر هر واژه نگه داشته شود (سقف ۴۰ ورودی، قدیمی‌ها حذف)
const memoryImageCache = new Map<string, string>();
const MEMORY_IMG_CAP = 40;

// ── یادداشت شخصی واژه (فاز ۱۰) — همگام با /api/notes ──
// قرارداد: GET /api/notes?book= → {ok, notes:[{id,book,word,note,updatedAt}]} |
// PUT {book,word,note} → {ok, note} | DELETE ?id= → {ok:true} | بدون لاگین → 401
interface NoteRow {
  id: string;
  book: string;
  word: string;
  note: string;
  updatedAt: string;
}

interface BookNotesState {
  rows: Map<string, NoteRow>;
  status: "idle" | "loading" | "ready" | "guest" | "error";
  fetchedAt: number;
}

const NOTES_TTL_MS = 5 * 60 * 1000; // بعد از این مدت، اولین باز شدنِ بعدی دوباره fetch می‌کند
const NOTES_ROW_CAP = 500;
const NOTE_MAX_LEN = 500;

// کش ماژول‌اسکوپ یادداشت‌ها به‌ازای کتاب — فقط اولین باز شدن پاپ‌آپ fetch می‌کند (الگوی memoryImageCache)
const notesCache = new Map<string, BookNotesState>();
let notesVersion = 0;
const notesListeners = new Set<() => void>();

function notifyNotes() {
  notesVersion += 1;
  notesListeners.forEach((l) => l());
}

function subscribeNotes(cb: () => void) {
  notesListeners.add(cb);
  return () => {
    notesListeners.delete(cb);
  };
}

function getNotesVersion() {
  return notesVersion;
}

/** ورود به دیالوگ حساب از عمق پاپ‌آپ — ProfileButton گوش می‌دهد (بدون prop-drilling) */
function openProfileLogin() {
  window.dispatchEvent(new CustomEvent("visionone:open-profile"));
}

/** با رویداد باز شدن پاپ‌آپ صدا زده می‌شود — مهمان fetch نمی‌گیرد، فقط یک‌بار (یا پس از TTL) */
function ensureNotes(bookId: string, authenticated: boolean) {
  if (!bookId) return;
  const st = notesCache.get(bookId);
  if (!authenticated) {
    if (!st || st.status !== "guest") {
      notesCache.set(bookId, { rows: new Map(), status: "guest", fetchedAt: Date.now() });
      notifyNotes();
    }
    return;
  }
  if (st && (st.status === "ready" || st.status === "loading") && Date.now() - st.fetchedAt < NOTES_TTL_MS) return;
  notesCache.set(bookId, { rows: st?.rows ?? new Map(), status: "loading", fetchedAt: Date.now() });
  notifyNotes();
  void fetchNotes(bookId);
}

async function fetchNotes(bookId: string) {
  const put = (rows: Map<string, NoteRow>, status: BookNotesState["status"]) => {
    notesCache.set(bookId, { rows, status, fetchedAt: Date.now() });
    notifyNotes();
  };
  try {
    const res = await fetch(`/api/notes?book=${encodeURIComponent(bookId)}`, { cache: "no-store" });
    const json = (await res.json().catch(() => null)) as { notes?: NoteRow[] } | null;
    if (res.status === 401) {
      put(new Map(), "guest");
      return;
    }
    if (!res.ok || !json) {
      // ۴۰۴ (سرویس هنوز آماده نیست) یا خطای سرور — محترمانه و بدون کرش
      put(new Map(), "error");
      toast.error("یادداشت‌ها بارگیری نشد — کمی بعد دوباره امتحان کن");
      return;
    }
    const rows = new Map<string, NoteRow>();
    for (const r of Array.isArray(json.notes) ? json.notes : []) {
      if (rows.size >= NOTES_ROW_CAP) break;
      if (r && typeof r.id === "string" && typeof r.word === "string" && typeof r.note === "string") {
        rows.set(r.word, r);
      }
    }
    put(rows, "ready");
  } catch {
    put(new Map(), "error");
  }
}

interface LookupHit {
  word: string;
  dict?: DictEntry;
  vocab?: VocabWord;
}

function lookup(maps: LookupMaps, norm: string): LookupHit {
  const candidates = [norm];
  // ساده‌سازی صرفی: جمع، فعل ساده، «'s»
  if (norm.endsWith("'s")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("ies")) candidates.push(norm.slice(0, -3) + "y");
  if (norm.endsWith("es")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("s") && !norm.endsWith("ss")) candidates.push(norm.slice(0, -1));
  if (norm.endsWith("ed")) candidates.push(norm.slice(0, -2), norm.slice(0, -1));
  if (norm.endsWith("ing")) candidates.push(norm.slice(0, -3), norm.slice(0, -3) + "e");
  for (const c of candidates) {
    if (!c) continue;
    const hit = maps.dict.get(c);
    const vocab = maps.vocab.get(c);
    if (hit || vocab) return { word: c, dict: hit, vocab };
  }
  return { word: norm };
}

// ── توکنایز ایندکسمحور: واژه‌ها از regex + عبارت‌های دوتایی مثل "based on" ──
interface WordSpan {
  raw: string;
  norm: string;
  start: number;
  end: number;
}

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;

function extractWords(text: string, maps: LookupMaps): WordSpan[] {
  const words: WordSpan[] = [];
  for (const m of text.matchAll(WORD_RE)) {
    const start = m.index ?? 0;
    const raw = m[0];
    words.push({ raw, norm: normalize(raw), start, end: start + raw.length });
  }
  // ادغام عبارت دوتایی شناخته‌شده (فقط وقتی بین دو واژه فقط فاصله باشد)
  const merged: WordSpan[] = [];
  let i = 0;
  while (i < words.length) {
    const a = words[i];
    const b = words[i + 1];
    if (
      b &&
      maps.phrases.has(`${a.norm} ${b.norm}`) &&
      /^\s+$/.test(text.slice(a.end, b.start))
    ) {
      merged.push({
        raw: text.slice(a.start, b.end),
        norm: `${a.norm} ${b.norm}`,
        start: a.start,
        end: b.end,
      });
      i += 2;
    } else {
      merged.push(a);
      i += 1;
    }
  }
  return merged;
}

interface Segment {
  kind: "text" | "word";
  raw: string;
  norm?: string;
}

function segmentText(text: string, maps: LookupMaps): Segment[] {
  const words = extractWords(text, maps);
  const segs: Segment[] = [];
  let pos = 0;
  for (const w of words) {
    if (w.start > pos) segs.push({ kind: "text", raw: text.slice(pos, w.start) });
    segs.push({ kind: "word", raw: w.raw, norm: w.norm });
    pos = w.end;
  }
  if (pos < text.length) segs.push({ kind: "text", raw: text.slice(pos) });
  return segs;
}

/** متن انگلیسی قابل‌کلیک: هر واژه (و عبارت شناخته‌شده) یک دکمهٔ جست‌وجوست + جست‌وجوی عبارتِ انتخاب‌شده */
export function ClickableEnText({ text, className }: { text: string; className?: string }) {
  const data = useBookData();
  const { bookId } = useBook();
  const { status: sessionStatus } = useSession();
  const [sel, setSel] = useState<{ hit: LookupHit; x: number; y: number } | null>(null);
  const [selSearch, setSelSearch] = useState<{ raw: string; x: number; y: number } | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  const maps = useMemo(
    () => getLookupMaps(data.dictionary, data.vocab.all),
    [data.dictionary, data.vocab.all],
  );
  const segs = useMemo(() => segmentText(text, maps), [text, maps]);

  const onWordClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const norm = e.currentTarget.dataset.norm ?? "";
      if (!norm) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setSel({ hit: lookup(maps, norm), x: rect.left + rect.width / 2, y: rect.bottom });
      // یادداشت واژه — فقط اولین باز شدن پاپ‌آپ fetch می‌کند (کش ماژولی + TTL)
      ensureNotes(bookId ?? "", sessionStatus === "authenticated");
    },
    [maps, bookId, sessionStatus],
  );

  // جست‌وجوی عبارت انتخاب‌شده با ماوس/لمس — علاوه بر کلیک تک‌واژه
  useEffect(() => {
    function extractSelection(): { raw: string; x: number; y: number } | null {
      const s = window.getSelection();
      if (!s || s.isCollapsed || s.rangeCount === 0) return null;
      const range = s.getRangeAt(0);
      const host = wrapRef.current;
      if (!host || !host.contains(range.commonAncestorContainer)) return null;
      const raw = s.toString().trim().replace(/\s+/g, " ");
      if (!raw || raw.length > 60 || !/[A-Za-z]/.test(raw)) return null;
      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return null;
      return { raw, x: rect.left + rect.width / 2, y: rect.bottom };
    }
    function onUp() {
      // صبر یک تیک تا selection نهایی شود (مخصوصاً در لمس)
      setTimeout(() => setSelSearch(extractSelection()), 0);
    }
    function onDown(e: Event) {
      const t = e.target as HTMLElement | null;
      // دکمهٔ جست‌وجوی خودِ انتخاب، انتخاب را پاک نکند
      if (t?.closest?.("[data-sel-search]")) return;
      setSelSearch(null);
    }
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  function openSelectionSearch() {
    if (!selSearch) return;
    const { raw, x, y } = selSearch;
    setSelSearch(null);
    setSel({ hit: lookup(maps, normalize(raw)), x, y });
    ensureNotes(bookId ?? "", sessionStatus === "authenticated");
  }

  // موقعیت دکمهٔ شناور جست‌وجوی عبارت — clamp به دید
  const pillLeft = selSearch
    ? Math.min(Math.max(selSearch.x, 105), (typeof window !== "undefined" ? window.innerWidth : 400) - 105)
    : 0;

  return (
    <>
      <span ref={wrapRef} dir="ltr" className={className}>
        {segs.map((s, i) =>
          s.kind === "text" ? (
            <span key={i}>{s.raw}</span>
          ) : (
            <button
              key={i}
              type="button"
              data-norm={s.norm}
              onClick={onWordClick}
              className="lookup-word cursor-pointer rounded px-0.5 transition-colors hover:bg-primary/15 hover:text-primary"
              title="معنی این واژه را ببین"
            >
              {s.raw}
            </button>
          ),
        )}
      </span>
      {selSearch && !sel && (
        <button
          type="button"
          data-sel-search
          onClick={openSelectionSearch}
          className="lookup-pop fixed z-100 flex max-w-[210px] items-center gap-1.5 rounded-full border border-primary/50 bg-card px-3.5 py-2 text-[11.5px] font-black text-primary shadow-xl shadow-black/20 transition-transform hover:scale-105 active:scale-95"
          style={{ left: pillLeft, top: selSearch.y + 8, transform: "translateX(-50%)" }}
        >
          <Search size={13} className="shrink-0" />
          <span className="truncate">جست‌وجوی «{selSearch.raw}»</span>
        </button>
      )}
      {sel && <LookupPopover sel={sel} onClose={() => setSel(null)} />}
    </>
  );
}

function LookupPopover({ sel, onClose }: { sel: { hit: LookupHit; x: number; y: number }; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { bookId } = useBook();
  const starred = useStarredWords();
  const srs = useSRSData();
  const { learned, toggle: toggleLearnedWord } = useLearnedWords();
  const { hit } = sel;

  // تصویر حافظه (Dual Coding) — کاملاً event-driven؛ بدون effect جدید
  const [memImg, setMemImg] = useState<{ word: string; data: string; loading: boolean }>({
    word: "",
    data: "",
    loading: false,
  });

  // بستن با کلیک بیرون، Escape و اسکرول
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onClose, { once: true, passive: true });
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onClose);
    };
  }, [onClose]);

  // موقعیت clamp شده به دید
  const W = 300;
  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const left = Math.min(Math.max(sel.x - W / 2, 8), vw - W - 8);
  const top = Math.min(sel.y + 8, vh - 200);

  const isStarred = starred.has(hit.word);
  const srsItem = srs[hit.word];
  const srsBox = srsItem?.box ?? 0;
  const isLearned = learned.has(hit.word);

  // تولید تصویر حافظه برای واژه — ابتدا کش ماژولی، سپس POST به /api/word-image
  async function loadMemoryImage() {
    const word = hit.word;
    if (!word || memImg.loading) return;
    const hitCached = memoryImageCache.get(word);
    if (hitCached) {
      setMemImg({ word, data: hitCached, loading: false });
      return;
    }
    setMemImg({ word, data: "", loading: true });
    try {
      const guest = readUserName();
      const res = await fetch("/api/word-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guest ? { "x-visionone-name": guest } : {}),
        },
        body: JSON.stringify({ word, meaning: hit.vocab?.meaning ?? "" }),
      });
      const payload: { image?: string; error?: string } = await res.json();
      if (!res.ok || !payload.image) {
        toast.error(payload.error ?? "تصویر حافظه ساخته نشد — دوباره تلاش کن");
        setMemImg({ word: "", data: "", loading: false });
        return;
      }
      memoryImageCache.set(word, payload.image);
      while (memoryImageCache.size > MEMORY_IMG_CAP) {
        const oldest = memoryImageCache.keys().next();
        if (oldest.done) break;
        memoryImageCache.delete(oldest.value);
      }
      setMemImg({ word, data: payload.image, loading: false });
    } catch {
      toast.error("خطا در ارتباط با تصویرساز حافظه — اتصال را بررسی کن و دوباره تلاش کن");
      setMemImg({ word: "", data: "", loading: false });
    }
  }

  function startStarredPractice() {
    if (starred.count === 0) return;
    setPracticeIntent({ tab: "cards", starredOnly: true, weakOnly: false });
    onClose();
    requestView("flashcards");
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={`معنی ${hit.word}`}
      className="lookup-pop fixed z-100 max-h-[min(78vh,540px)] w-[300px] overflow-y-auto rounded-2xl border bg-card p-4 shadow-2xl shadow-black/25"
      style={{ left, top }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن"
        className="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X size={13} />
      </button>

      <div className="flex items-start gap-2 pr-1">
        <div className="min-w-0 flex-1">
          <p dir="ltr" className="font-en text-left text-[17px] font-black leading-6 text-primary">
            {hit.word}
          </p>
          {hit.dict?.phonetic && (
            <p dir="ltr" className="font-en mt-0.5 text-left text-[11px] text-muted-foreground">
              {hit.dict.phonetic}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <SpeakButton text={hit.word} size="md" />
          <button
            type="button"
            onClick={loadMemoryImage}
            disabled={memImg.loading}
            aria-label="تصویر حافظه"
            title="تصویر حافظه — یک تصویر آموزشی برای این واژه بکش"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          >
            {memImg.loading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlay size={14} />}
          </button>
          <button
            type="button"
            onClick={() => toggleStar(hit.word)}
            aria-label={isStarred ? "حذف ستاره" : "ستاره‌دار کردن"}
            title={isStarred ? "حذف ستاره" : "ستاره‌دار کردن"}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110",
              isStarred ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500",
            )}
          >
            <Star size={14} className={cn(isStarred && "fill-yellow-500 star-pop")} />
          </button>
        </div>
      </div>

      {hit.vocab && (
        <p className="mt-2 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[13px] font-bold leading-6">
          {hit.vocab.meaning}
        </p>
      )}

      {/* تصویر حافظه (Dual Coding) — فقط برای واژهِ فعلی رندر می‌شود */}
      {memImg.word === hit.word && memImg.loading && (
        <div className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3 py-6">
          <Loader2 size={16} className="animate-spin text-primary" />
          <p className="text-[11.5px] font-bold text-muted-foreground">دارم تصویر حافظه را می‌کشم… ✏️</p>
        </div>
      )}
      {memImg.word === hit.word && memImg.data && (
        <figure className="mt-2.5 overflow-hidden rounded-xl border shadow-sm">
          <img
            src={"data:image/png;base64," + memImg.data}
            alt={"تصویر حافظه برای واژه " + hit.word}
            className="block aspect-square w-full bg-muted"
          />
          <figcaption className="flex items-center justify-center gap-2 bg-muted/40 px-2 py-1.5">
            <Badge variant="secondary" dir="ltr" className="font-en max-w-[45%]">
              {hit.word}
            </Badge>
            {hit.vocab?.meaning && (
              <span className="truncate text-[11px] font-bold text-foreground/80">{hit.vocab.meaning}</span>
            )}
          </figcaption>
        </figure>
      )}

      {/* وضعیت SRS و «یاد گرفتم» — فقط برای واژه‌های جزوه */}
      {hit.vocab && (
        <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border bg-muted/40 px-2.5 py-2">
          <button
            type="button"
            onClick={() => toggleLearnedWord(hit.word)}
            aria-pressed={isLearned}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black transition-all active:scale-95",
              isLearned
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "border border-primary/40 text-primary hover:bg-primary/10",
            )}
          >
            <CheckCircle2 size={12} />
            {isLearned ? "یاد گرفتم" : "یاد نگرفتم"}
          </button>
          <span
            className="flex items-center gap-1.5"
            title={
              srsItem
                ? `سطح مرور SRS: ${srsBox.toLocaleString("fa-IR")} از ${SRS_MAX_BOX.toLocaleString("fa-IR")}`
                : "این واژه هنوز در فلاش‌کارت‌ها دیده نشده"
            }
          >
            <span className="text-[10px] font-bold text-muted-foreground">مرور SRS</span>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: SRS_MAX_BOX }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-3 rounded-full transition-colors",
                    i < srsBox ? "bg-amber-500" : "bg-muted-foreground/20",
                  )}
                />
              ))}
            </span>
          </span>
        </div>
      )}

      {hit.dict ? (
        <div className="mt-2 space-y-1.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
            <BookOpen size={11} className="text-primary" />
            دیکشنری جزوه
            <span dir="ltr" className="font-en rounded bg-muted px-1 py-px text-[9px]">{hit.dict.pos}</span>
          </p>
          <p dir="ltr" className="font-en text-left text-[12px] leading-5 text-foreground/90">
            {hit.dict.definition}
          </p>
          {hit.dict.examples[0] && (
            <p dir="ltr" className="font-en rounded-lg bg-muted/60 px-2.5 py-1.5 text-left text-[11px] leading-5 text-muted-foreground">
              “{hit.dict.examples[0]}”
            </p>
          )}
        </div>
      ) : !hit.vocab ? (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-5 text-muted-foreground">
          <SearchX size={12} />
          {hit.word.includes(" ")
            ? "این عبارت در دیکشنری و واژگان جزوه پیدا نشد."
            : "این شکل واژه در دیکشنری و واژگان جزوه پیدا نشد."}
        </p>
      ) : null}

      {/* میان‌بر تمرین واژه‌های ستاره‌دار */}
      {starred.count > 0 && (
        <button
          type="button"
          onClick={startStarredPractice}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-[11.5px] font-black text-yellow-700 transition-all hover:bg-yellow-500/20 dark:text-yellow-300"
        >
          <GraduationCap size={14} />
          تمرین {starred.count.toLocaleString("fa-IR")} واژهٔ ستاره‌دار
        </button>
      )}

      {/* یادداشت شخصی واژه (فاز ۱۰) — با Separator جدا، پایین همهٔ بخش‌ها */}
      {bookId && (
        <>
          <Separator className="my-3" />
          <WordNoteSection key={hit.word} bookId={bookId} word={hit.word} />
        </>
      )}
    </div>
  );
}

// ── بخش «📝 یادداشت من» — با key={word} مونت می‌شود تا هر واژه state تازه بگیرد ──
// داده از کش ماژولی خوانده می‌شود (بدون fetch در هر باز شدن) و با notifyNotes تازه می‌شود.

function WordNoteSection({ bookId, word }: { bookId: string; word: string }) {
  const { status: sessionStatus } = useSession();
  useSyncExternalStore(subscribeNotes, getNotesVersion, getNotesVersion);

  const state = notesCache.get(bookId);
  const row = state?.status === "ready" ? (state.rows.get(word) ?? undefined) : undefined;
  const [draft, setDraft] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const value = (draft ?? row?.note ?? "").slice(0, NOTE_MAX_LEN);
  const guest = sessionStatus !== "authenticated" || state?.status === "guest";

  async function saveNote() {
    const note = value.trim();
    if (!note) {
      toast.error("یادداشت خالی است — چیزی بنویس تا ذخیره شود");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book: bookId, word, note }),
      });
      const json = (await res.json().catch(() => null)) as { note?: NoteRow; error?: string } | null;
      if (res.status === 401) {
        notesCache.set(bookId, { rows: new Map(), status: "guest", fetchedAt: Date.now() });
        notifyNotes();
        return;
      }
      if (!res.ok || !json?.note) {
        toast.error(json?.error ?? "ذخیرهٔ یادداشت نشد — دوباره تلاش کن");
        return;
      }
      const st = notesCache.get(bookId);
      if (st) {
        const rows = new Map(st.rows);
        rows.set(word, json.note);
        notesCache.set(bookId, { ...st, rows, status: "ready", fetchedAt: Date.now() });
        notifyNotes();
      }
      setDraft(null);
      toast.success("یادداشت ذخیره شد ✓");
    } catch {
      toast.error("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setBusy(false);
    }
  }

  async function removeNote() {
    if (!row || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(row.id)}`, { method: "DELETE" });
      if (res.status === 401) {
        notesCache.set(bookId, { rows: new Map(), status: "guest", fetchedAt: Date.now() });
        notifyNotes();
        return;
      }
      if (!res.ok) {
        toast.error("حذف یادداشت نشد — دوباره تلاش کن");
        return;
      }
      const st = notesCache.get(bookId);
      if (st) {
        const rows = new Map(st.rows);
        rows.delete(word);
        notesCache.set(bookId, { ...st, rows, fetchedAt: Date.now() });
        notifyNotes();
      }
      setDraft(null);
      toast.success("یادداشت حذف شد");
    } catch {
      toast.error("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setBusy(false);
    }
  }

  // مهمان (بدون سشن یا 401) — کارت ورود کوچک، بدون خطا
  if (guest) {
    return (
      <div>
        <p className="text-[11.5px] font-black">📝 یادداشت من</p>
        <div className="mt-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-center">
          <p className="text-[11.5px] leading-6 text-muted-foreground">
            برای همگام‌شدن یادداشت با حسابت وارد شو 🔑
          </p>
          <button
            type="button"
            onClick={openProfileLogin}
            className="mx-auto mt-2 flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[11.5px] font-black text-primary-foreground shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <LogIn size={13} />
            ورود
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11.5px] font-black">📝 یادداشت من</p>
        <span dir="ltr" className="text-[9.5px] font-bold text-muted-foreground">
          {value.length.toLocaleString("fa-IR")} / {NOTE_MAX_LEN.toLocaleString("fa-IR")}
        </span>
      </div>
      {state?.status === "loading" && (
        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Loader2 size={10} className="animate-spin" />
          در حال همگام‌سازی یادداشت‌ها…
        </p>
      )}
      <Textarea
        value={value}
        onChange={(e) => setDraft(e.target.value.slice(0, NOTE_MAX_LEN))}
        placeholder="نکتهٔ خودت را دربارهٔ این واژه بنویس… (مثلاً ترفند حفظش)"
        maxLength={NOTE_MAX_LEN}
        aria-label="یادداشت شخصی واژه"
        className="mt-2 min-h-[64px] resize-none bg-muted/30 text-[12px] leading-6"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={saveNote}
          disabled={busy}
          className="flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[11.5px] font-black text-primary-foreground shadow-sm transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
        >
          {busy ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          ذخیره
        </button>
        {row && (
          <button
            type="button"
            onClick={removeNote}
            disabled={busy}
            aria-label="حذف یادداشت"
            title="حذف یادداشت"
            className="flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-destructive/40 px-3.5 text-[11.5px] font-black text-destructive transition-all hover:bg-destructive/10 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
          >
            <Trash2 size={13} />
            حذف
          </button>
        )}
      </div>
    </div>
  );
}
