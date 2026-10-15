"use client";

import { useState } from "react";
import { Volume2, Loader2, Snail } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";

interface SpeakButtonProps {
  text: string;
  voice?: string;
  speed?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  /** نمایش دکمه کوچک «آهسته» برای تمرین تلفظ (سرعت ۰٫۷) */
  showSlow?: boolean;
}

export function SpeakButton({
  text,
  voice = "jam",
  speed,
  className,
  size = "sm",
  label,
  showSlow = false,
}: SpeakButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const [slowLoading, setSlowLoading] = useState(false);
  const { speed: preferredSpeed } = useVoiceSpeed();
  const effectiveSpeed = speed ?? preferredSpeed;

  // موبایل (Task 23): اندازهٔ «sm» از h-7 (28px) به h-9 (36px) رسید — پرتکرارترین کنترل اپ
  // باید به هدف لمسی قابل‌اعتماد نزدیک باشد؛ فاصلهٔ دکمه‌ها هم gap-1 → gap-1.5
  const iconSize = size === "lg" ? 20 : size === "md" ? 17 : 15;
  const slowSize = size === "lg" ? "h-10 w-10" : size === "md" ? "h-9 w-9" : "h-9 w-9";

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (state === "playing") {
      stopSpeaking();
      setState("idle");
      return;
    }
    setState("loading");
    await speak(text, {
      voice,
      speed: effectiveSpeed,
      onEnd: () => setState("idle"),
    });
    setState("playing");
  }

  async function handleSlow(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    stopSpeaking();
    setState("idle");
    setSlowLoading(true);
    await speak(text, {
      voice,
      speed: 0.7,
      onEnd: () => setSlowLoading(false),
    });
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <button
        type="button"
        aria-label={label ?? `پخش صوتی: ${text.slice(0, 40)}`}
        title={state === "playing" ? "توقف" : "روخوانی"}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-full transition-all shrink-0",
          size === "lg" ? "h-10 w-10" : size === "md" ? "h-9 w-9" : "h-9 w-9",
          state === "playing"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
            : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105",
        )}
      >
        {state === "loading" ? (
          <Loader2 size={iconSize} className="animate-spin" />
        ) : state === "playing" ? (
          <span className="soundwave flex items-end gap-[2px] h-3.5">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <Volume2 size={iconSize} />
        )}
      </button>

      {showSlow && (
        <button
          type="button"
          aria-label={`پخش آهسته: ${text.slice(0, 40)}`}
          title="پخش آهسته (۰٫۷×)"
          onClick={handleSlow}
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-all shrink-0",
            slowSize,
            slowLoading
              ? "bg-accent text-accent-foreground scale-105"
              : "bg-muted text-muted-foreground hover:bg-accent/40 hover:text-accent-foreground",
          )}
        >
          {slowLoading ? <Loader2 size={iconSize - 2} className="animate-spin" /> : <Snail size={iconSize - 2} />}
        </button>
      )}
    </span>
  );
}
