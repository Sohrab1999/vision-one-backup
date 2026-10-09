"use client";

import { useState } from "react";
import { Volume2, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak, stopSpeaking } from "@/lib/speak";

interface SpeakButtonProps {
  text: string;
  voice?: string;
  speed?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function SpeakButton({
  text,
  voice = "jam",
  speed = 0.95,
  className,
  size = "sm",
  label,
}: SpeakButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");

  const iconSize = size === "lg" ? 20 : size === "md" ? 17 : 14;

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
      speed,
      onEnd: () => setState("idle"),
    });
    setState("playing");
  }

  return (
    <button
      type="button"
      aria-label={label ?? `پخش صوتی: ${text.slice(0, 40)}`}
      title={state === "playing" ? "توقف" : "روخوانی"}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full transition-all shrink-0",
        size === "lg" ? "h-10 w-10" : size === "md" ? "h-8 w-8" : "h-7 w-7",
        state === "playing"
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
          : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105",
        className,
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
  );
}
