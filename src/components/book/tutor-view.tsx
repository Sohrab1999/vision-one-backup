"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Loader2, Sparkles, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SpeakButton } from "./speak-button";

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

export function TutorView() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm your English tutor from Vision One.\n(سلام! من دستیار زبان انگلیسی تو از جزوه ویژن وان هستم.)\n\nLet's practice English together — just start chatting with me!\n(بیا با هم تمرین انگلیسی کنیم — فقط شروع کن به حرف زدن!)",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

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
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        toast.error(data.error ?? "خطا در ارتباط با دستیار");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Card className="flex h-[calc(100vh-190px)] min-h-[480px] flex-col border-primary/25">
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

          {/* شروع‌کننده‌ها */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5">
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

      <p className="text-center text-[11px] text-muted-foreground">
        دستیار بر اساس محتوای کتاب Vision 1 پاسخ می‌دهد — از او درباره واژه‌ها، گرامر یا تمرین مکالمه بپرس.
      </p>
    </div>
  );
}
