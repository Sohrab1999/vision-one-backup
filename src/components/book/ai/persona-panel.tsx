"use client";

/**
 * PersonaPanel — «شخصیت‌ها» (فاز ۸): مکالمهٔ آزاد با سه شخصیت انگلیسی‌زبان
 * (🚏 سم غریبهٔ مهربان / 🎒 میا هم‌کلاسی / ✈️ لئو مسافر).
 * شخصیت فقط با واژگان متناسب سطح انتخابی (A2/B1) حرف می‌زند و در پایان هر پیام،
 * اگر اشتباه واضحی وجود داشته باشد یک خط اصلاح کوتاه فارسی با 💡 می‌دهد.
 * فازها: انتخاب شخصیت ← چت. بدون setState در بدنهٔ effect (سازگار با react-hooks v6).
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import { readUserName } from "@/lib/name-store";
import { notifyActivity } from "@/lib/gamification";
import { SpeakButton } from "../speak-button";

type PersonaId = "stranger" | "classmate" | "traveler";
type Level = "A2" | "B1";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

interface PersonaDef {
  id: PersonaId;
  emoji: string;
  nameFa: string;
  descFa: string;
  /** جملهٔ آغازین ثابت: انگلیسی + ترجمهٔ فارسی داخل پرانتز */
  welcome: string;
  /** ۳ پیشنهاد شروع مخصوص همین شخصیت */
  starters: string[];
  /** کلاس‌های رنگی (emerald/amber/teal) — رشتهٔ ثابت برای Tailwind */
  hoverClass: string;
  badgeClass: string;
}

const PERSONAS: PersonaDef[] = [
  {
    id: "stranger",
    emoji: "🚏",
    nameFa: "غریبهٔ مهربان (سم)",
    descFa: "سم در ایستگاه اتوبوس و صف نانوایی سرت را می‌بیند — دربارهٔ هوا، موسیقی و آخر هفته گپ می‌زند.",
    welcome: "Hi there! I'm Sam — isn't it a lovely day?\n(سلام! من سم هستم — امروز هوا فوق‌العاده نیست؟)",
    starters: [
      "Hi Sam! How are you today?",
      "What kind of music do you like?",
      "What do you do on weekends?",
    ],
    hoverClass: "hover:border-emerald-500/60 hover:shadow-emerald-500/15",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-0",
  },
  {
    id: "classmate",
    emoji: "🎒",
    nameFa: "هم‌کلاسی (میا)",
    descFa: "میا هم‌کلاسی توست — دربارهٔ تکلیف، امتحان فردا و پروژهٔ انگلیسی با هم حرف می‌زنید.",
    welcome: "Hey! I'm Mia — did you finish our English homework?\n(سلام! من میا هستم — تکلیف انگلیسی‌مان را انجام دادی؟)",
    starters: [
      "Hey Mia! How was your day?",
      "What did we have for homework?",
      "Can we study for the exam together?",
    ],
    hoverClass: "hover:border-amber-500/60 hover:shadow-amber-500/15",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-0",
  },
  {
    id: "traveler",
    emoji: "✈️",
    nameFa: "مسافر (لئو)",
    descFa: "لئو اولین بار به شهر تو آمده — دربارهٔ غذاها، جاذبه‌ها و راه‌ها از تو می‌پرسد.",
    welcome: "Hello! I'm Leo — it's my first day in your city!\n(سلام! من لئو هستم — امروز اولین روز من در شهر توست!)",
    starters: [
      "Welcome to Iran, Leo!",
      "What food should I try first?",
      "How can I get to your hotel?",
    ],
    hoverClass: "hover:border-teal-500/60 hover:shadow-teal-500/15",
    badgeClass: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-0",
  },
];

/** خط انگلیسیِ اول پیام (بدون خط 💡 فارسی) برای دکمهٔ روخوانی */
function enLineOf(content: string): string {
  return content.split("💡")[0].split("\n")[0].trim();
}

export function PersonaPanel() {
  const { bookId, meta } = useBook();
  const data = useBookData();

  const [level, setLevel] = useState<Level>("A2");
  const [phase, setPhase] = useState<"pick" | "chat">("pick");
  const [persona, setPersona] = useState<PersonaId | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const aliveRef = useRef(true);

  // پاک‌سازی unmount: قطع fetch در حال اجرا (react-hooks v6 — فقط cleanup، بدون setState)
  useEffect(() => {
    return () => {
      aliveRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // اسکرول به آخرین پیام — فقط scrollTo، بدون setState
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const personaDef = PERSONAS.find((p) => p.id === persona) ?? null;

  function pickPersona(id: PersonaId) {
    abortRef.current?.abort(); // قطع پاسخ در حال اجرا هنگام تعویض شخصیت
    const def = PERSONAS.find((p) => p.id === id);
    if (!def) return;
    setPersona(id);
    setMessages([{ role: "assistant", content: def.welcome }]);
    setInput("");
    setSending(false);
    setPhase("chat");
  }

  function backToPick() {
    abortRef.current?.abort();
    setPhase("pick");
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending || !personaDef) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const guest = readUserName();
      const res = await fetch("/api/persona-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guest ? { "x-visionone-name": guest } : {}),
        },
        signal: ctrl.signal,
        body: JSON.stringify({
          persona: personaDef.id,
          level,
          messages: next
            .slice(1) // پیام خوش‌آمد ثابت جزو تاریخچهٔ ارسالی نیست
            .map((m) => ({ role: m.role, content: m.content })),
          book: {
            id: bookId,
            title: data.info.title,
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const json = (await res.json()) as { reply?: string; error?: string };
      if (ctrl.signal.aborted || !aliveRef.current) return;
      const reply = json.reply;
      if (res.ok && typeof reply === "string" && reply.trim()) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        notifyActivity(); // یک ردوبدل کامل با شخصیت ثبت شد
      } else {
        toast.error(json.error ?? "شخصیت جواب نداد — دوباره تلاش کن");
      }
    } catch {
      if (!ctrl.signal.aborted) toast.error("خطا در ارتباط با سرور");
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      if (aliveRef.current) setSending(false);
    }
  }

  // ── فاز ۱: انتخاب شخصیت ──
  if (phase === "pick" || !personaDef) {
    return (
      <div className="space-y-4">
        <p className="text-center text-[12.5px] leading-6 text-muted-foreground">
          یکی از این سه نفر را انتخاب کن و به انگلیسی گپ بزن — هر کس فقط با واژه‌های سطح خودت حرف می‌زند.
        </p>

        {/* سوییچ سطح واژگان شخصیت */}
        <div className="flex items-center justify-center gap-1.5" role="group" aria-label="سطح واژگان شخصیت">
          <button
            type="button"
            onClick={() => setLevel("A2")}
            aria-pressed={level === "A2"}
            className={cn(
              "min-h-9 rounded-full border px-4 text-[11.5px] transition-all",
              level === "A2"
                ? "border-primary bg-primary/10 font-bold text-primary"
                : "bg-card text-muted-foreground hover:border-primary/40",
            )}
          >
            ساده (A2)
          </button>
          <button
            type="button"
            onClick={() => setLevel("B1")}
            aria-pressed={level === "B1"}
            className={cn(
              "min-h-9 rounded-full border px-4 text-[11.5px] transition-all",
              level === "B1"
                ? "border-primary bg-primary/10 font-bold text-primary"
                : "bg-card text-muted-foreground hover:border-primary/40",
            )}
          >
            سخت‌تر (B1)
          </button>
        </div>

        {/* سه کارت شناور شخصیت */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => pickPersona(p.id)}
              aria-label={`شروع مکالمه با ${p.nameFa}`}
              className={cn(
                "group flex h-full flex-col items-center rounded-3xl border bg-card p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                p.hoverClass,
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl text-4xl transition-transform duration-200 group-hover:scale-110",
                  p.badgeClass,
                )}
              >
                {p.emoji}
              </span>
              <p className="mt-3 text-[13.5px] font-black">{p.nameFa}</p>
              <p className="mt-1.5 flex-1 text-[11.5px] leading-5 text-muted-foreground">{p.descFa}</p>
              <Badge variant="secondary" className={cn("mt-3 text-[10px]", p.badgeClass)}>
                سطح {level}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── فاز ۲: چت با شخصیت ──
  return (
    <Card className="border-primary/25">
      <CardContent className="flex flex-col gap-3 p-4">
        {/* سربرگ چت + بازگشت */}
        <div className="flex items-center justify-between gap-2 border-b pb-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl"
            >
              {personaDef.emoji}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{personaDef.nameFa}</p>
              <p className="text-[10px] text-muted-foreground">مکالمهٔ آزاد انگلیسی</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">
              {level === "A2" ? "سطح ساده" : "سطح سخت‌تر"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="min-h-9 gap-1 rounded-full px-2 text-[11px] text-muted-foreground hover:text-primary"
              onClick={backToPick}
              aria-label="بازگشت به انتخاب شخصیت"
            >
              <ArrowRight size={14} aria-hidden />
              <span className="whitespace-nowrap">بازگشت به شخصیت‌ها</span>
            </Button>
          </div>
        </div>

        {/* پیام‌ها */}
        <ScrollArea className="h-[380px] max-h-[380px] pr-2">
          <div ref={scrollRef} className="space-y-3 py-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex gap-2", m.role === "user" ? "flex-row-reverse" : "")}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px]",
                    m.role === "assistant" ? "bg-primary/10" : "bg-muted text-muted-foreground",
                  )}
                >
                  {m.role === "assistant" ? personaDef.emoji : <User size={15} />}
                </span>
                <div
                  className={cn(
                    "max-w-[82%] whitespace-pre-line rounded-2xl border p-3 text-[13px] leading-7",
                    m.role === "assistant"
                      ? "bg-card rounded-tr-sm"
                      : "bg-primary text-primary-foreground rounded-tl-sm border-primary",
                  )}
                >
                  {m.role === "assistant" && (
                    <SpeakButton text={enLineOf(m.content)} className="float-left ml-2" />
                  )}
                  {m.content}
                </div>
              </div>
            ))}
            {/* حباب موقت «...» هنگام ارسال */}
            {sending && (
              <div className="flex gap-2">
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[15px]"
                >
                  {personaDef.emoji}
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tr-sm border bg-card p-3.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* پیشنهادهای شروع مخصوص شخصیت */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="پیشنهاد شروع گفتگو">
            {personaDef.starters.map((s) => (
              <button
                key={s}
                type="button"
                dir="ltr"
                onClick={() => send(s)}
                disabled={sending}
                className="min-h-9 rounded-full border bg-card px-3 py-1.5 text-left font-en text-[12px] text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ورودی */}
        <div className="flex items-end gap-2 border-t pt-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="به انگلیسی جوابش را بنویس…"
            className="min-h-[46px] flex-1 resize-none bg-card text-[13px]"
            rows={1}
            aria-label="پیام به شخصیت"
          />
          <Button
            size="icon"
            className="h-[46px] w-[46px] shrink-0 rounded-xl"
            onClick={() => send()}
            disabled={sending || !input.trim()}
            aria-label="ارسال پیام"
            aria-busy={sending}
          >
            {sending ? (
              <Loader2 size={18} className="animate-spin" aria-hidden />
            ) : (
              <Send size={17} className="-scale-x-100" aria-hidden />
            )}
          </Button>
        </div>

        <p className="text-center text-[10.5px] leading-5 text-muted-foreground">
          اگر اشتباه گرامری یا واژگانی واضحی داشته باشی، جواب انگلیسی شخصیت با یک خط اصلاح فارسی 💡 همراه می‌شود.
        </p>
      </CardContent>
    </Card>
  );
}
