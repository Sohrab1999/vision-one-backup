"use client";

/**
 * TutorView — دستیار هوشمند جزوه با چهار تب (فاز ۸):
 * «چت آزاد» همان چت قبلی است که بدون تغییر منطق داخل کامپوننت داخلی FreeChat زندگی می‌کند؛
 * «معلم خصوصی» و «داستان‌ساز» پنل‌های هوشمند فاز ۸ هستند (ai/teacher-panel و ai/story-panel)؛ تب «شخصیت‌ها» چت مکالمه آزاد با سه شخصیت انگلیسی‌زبان است (ai/persona-panel).
 */

import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  Bot,
  GraduationCap,
  Loader2,
  MessagesSquare,
  Send,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import { SpeakButton } from "./speak-button";
import { consumeTutorSeed } from "@/lib/tutor-seed";
import { TeacherPanel } from "./ai/teacher-panel";
import { StoryPanel } from "./ai/story-panel";
import { PersonaPanel } from "./ai/persona-panel";

/**
 * رویداد «شروع‌کنندهٔ چت» — چیپ‌های پنل کناری دسکتاپ پیام آماده را به FreeChat می‌فرستند
 * (جریان رویدادمحور — هم‌الگوی registerNavHandler؛ بدون لفت‌کردن state چت)
 */
const TUTOR_STARTER_EVENT = "visionone:tutor-starter";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "Hi! I want to practice English about endangered animals.",
  "Can you teach me the difference between will and be going to?",
  "Let's talk about my travel plans for summer!",
  "چطور می‌توانم واژه‌های درس اول را بهتر حفظ کنم؟",
];

type TutorTab = "chat" | "teacher" | "story" | "persona";

const TABS: {
  id: TutorTab;
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  hint: string;
}[] = [
  {
    id: "chat",
    label: "چت آزاد",
    icon: MessagesSquare,
    hint: "با دستیار درباره واژه‌ها، گرامر یا تمرین مکالمه آزاد گپ بزن",
  },
  {
    id: "teacher",
    label: "معلم خصوصی",
    icon: GraduationCap,
    hint: "موضوع گرامری و واژه‌های خودت را انتخاب کن — با همین واژه‌ها برایت مثال می‌زند",
  },
  {
    id: "story",
    label: "داستان‌ساز",
    icon: BookOpenCheck,
    hint: "۶ تا ۱۲ واژه انتخاب کن — داستانی با همین واژه‌ها + سؤال فهم مطلب می‌سازد",
  },
  {
    id: "persona",
    label: "شخصیت‌ها",
    icon: Users,
    hint: "با غریبه، هم‌کلاسی یا مسافر انگلیسی حرف بزن — با واژگان سطح خودت",
  },
];

/** چت آزاد — همان چت قبلی دستیار، بدون تغییر منطق */
function FreeChat() {
  const { bookId, meta } = useBook();
  const data = useBookData();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi there! 👋 I'm your English tutor from ${data.info.subtitle}.\n(سلام! من دستیار زبان انگلیسی تو از جزوه «${data.info.subtitle}» هستم.)\n\nLet's practice English together — just start chatting with me!\n(بیا با هم تمرین انگلیسی کنیم — فقط شروع کن به حرف زدن!)`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // فاز F10-c — گزارش پایان دور بازی‌ها: seed از sessionStorage مصرف و در ورودی گذاشته می‌شود
  // (ارسال خودکار نه — کاربر مرور و ارسال می‌کند تا سقف روزانهٔ دستیار بی‌دلیل مصرف نشود)
  useEffect(() => {
    const seed = consumeTutorSeed();
    if (seed) {
      setInput(seed);
      inputRef.current?.focus();
      toast.info("گزارش بازی آماده شد — «ارسال» را بزن تا دستیار تمرین بسازد");
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  // دسکتاپ (بهینه‌سازی xl): چیپ‌های «پیشنهاد شروع» در پنل کناری همین رویداد را می‌فرستند —
  // با latest-ref تا هر بار آخرین نسخهٔ send (با messages تازه) صدا زده شود
  const sendRef = useRef(send);
  useEffect(() => {
    sendRef.current = send;
  });
  useEffect(() => {
    function onStarter(e: Event) {
      const text = (e as CustomEvent<string>).detail;
      if (typeof text === "string" && text.trim()) sendRef.current(text);
    }
    window.addEventListener(TUTOR_STARTER_EVENT, onStarter);
    return () => window.removeEventListener(TUTOR_STARTER_EVENT, onStarter);
  }, []);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .slice(1)
            .map((m) => ({ role: m.role, content: m.content })),
          book: {
            id: bookId,
            title: data.info.title,
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const resData = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: resData.reply }]);
      } else {
        toast.error(resData.error ?? "خطا در ارتباط با دستیار");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setSending(false);
    }
  }

  return (
    // موبایل (Task 23): 100vh → 100dvh — کیبورد نرم مدفون‌کنندهٔ ورودی چت نباشد
    <Card className="flex h-[calc(100dvh-260px)] min-h-[460px] flex-col border-primary/25">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        {/* هدر چت */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Bot size={19} />
              <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400 text-emerald-400 soft-ping" />
            </span>
            <div>
              <p className="text-sm font-black">دستیار هوشمند زبان</p>
              <p className="text-[10px] text-muted-foreground">معلم مکالمه — همیشه آنلاین</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1 text-[10px]">
            <Sparkles size={10} className="text-amber-500" />
            AI
          </Badge>
        </div>

        {/* پیام‌ها */}
        <ScrollArea className="flex-1 pr-2">
          <div ref={scrollRef} className="space-y-3 py-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2",
                  m.role === "user" ? "flex-row-reverse" : "",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {m.role === "assistant" ? <Bot size={15} /> : <User size={15} />}
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
                    <SpeakButton
                      text={m.content.split("\n")[0]}
                      className="float-left ml-2"
                    />
                  )}
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot size={15} />
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

        {/* شروع‌کننده‌ها — در دسکتاپ (xl+) به پنل کناری منتقل شده‌اند تا چت تمیز بماند */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 xl:hidden">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border bg-card px-3 py-1.5 text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ورودی */}
        <div className="flex items-end gap-2 border-t pt-3">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="پیامت را بنویس… (فارسی یا انگلیسی)"
            className="min-h-[46px] flex-1 resize-none bg-card"
            rows={1}
            aria-label="پیام به دستیار"
            enterKeyHint="send"
          />
          <Button
            size="icon"
            className="h-[46px] w-[46px] shrink-0 rounded-xl"
            onClick={() => send()}
            disabled={sending || !input.trim()}
            aria-label="ارسال"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} className="-scale-x-100" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TutorView() {
  const data = useBookData();
  const [tab, setTab] = useState<TutorTab>("chat");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 xl:max-w-5xl">
      {/* تب‌های سه‌گانهٔ دستیار */}
      <div
        className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border bg-card p-1"
        role="tablist"
        aria-label="بخش‌های دستیار هوشمند"
      >
        {TABS.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "secondary" : "ghost"}
            size="sm"
            role="tab"
            aria-selected={tab === t.id}
            className="min-h-11 gap-1.5 rounded-full"
            onClick={() => setTab(t.id)}
          >
            <t.icon size={15} aria-hidden />
            <span className="whitespace-nowrap">{t.label}</span>
          </Button>
        ))}
      </div>
      <p className="text-center text-[11px] leading-5 text-muted-foreground">{active.hint}</p>

      {tab === "chat" ? (
        /* چت آزاد در دسکتاپ دوپنلی: چت + ستون کنار چسبان (شروع‌کننده‌ها + راهنما) —
           به‌جای ستون باریک وسط ۱۹۲۰px با ~۱۲۰۰px فضای مرده */
        <div
          role="tabpanel"
          aria-label={active.label}
          className="xl:grid xl:grid-cols-[minmax(0,1fr)_248px] xl:items-start xl:gap-4"
        >
          <FreeChat />
          <aside className="hidden space-y-3 xl:sticky xl:top-20 xl:block" aria-label="پیشنهاد و راهنمای چت">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="space-y-2.5 p-4">
                <p className="flex items-center gap-1.5 text-[12.5px] font-black text-primary">
                  <Sparkles size={13} aria-hidden />
                  پیشنهاد شروع
                </p>
                <div className="space-y-1.5">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent(TUTOR_STARTER_EVENT, { detail: s }))
                      }
                      className="block w-full rounded-xl border bg-card px-3 py-2 text-right text-[11.5px] leading-5 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-4">
                <p className="text-[12.5px] font-black">راهنمای سریع</p>
                <ul className="space-y-1.5 text-[11px] leading-5 text-muted-foreground">
                  <li>
                    <kbd className="rounded border bg-muted px-1 font-sans text-[10px]">Enter</kbd> ارسال ·{" "}
                    <kbd className="rounded border bg-muted px-1 font-sans text-[10px]">Shift+Enter</kbd> خط جدید
                  </li>
                  <li>دکمهٔ بلندگو کنار هر پاسخ = تلفظ انگلیسی</li>
                  <li>پاسخ‌ها با واژگان همین جزوه ساخته می‌شوند</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      ) : (
        <div role="tabpanel" aria-label={active.label}>
          {tab === "teacher" && <TeacherPanel />}
          {tab === "story" && <StoryPanel />}
          {tab === "persona" && <PersonaPanel />}
        </div>
      )}

      <p className="text-center text-[11px] leading-5 text-muted-foreground">
        پاسخ‌ها بر اساس محتوای کتاب {data.info.subtitle} ساخته می‌شوند — معلم خصوصی و داستان‌ساز سقف روزانهٔ ملایم دارند تا برای همه کافی باشد.
      </p>
    </div>
  );
}
