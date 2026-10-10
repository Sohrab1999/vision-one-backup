"use client";

import { useState } from "react";
import { Mic, MessagesSquare, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SayItPractice } from "./speaking/say-it";
import { RoleplayPractice } from "./speaking/roleplay-view";
import { ShadowingPractice } from "./speaking/shadowing-view";

type SpeakingTab = "say-it" | "roleplay" | "shadowing";

const TABS: { id: SpeakingTab; label: string; icon: React.ComponentType<{ size?: number | string }>; hint: string }[] = [
  { id: "say-it", label: "بگو ببینم", icon: Mic, hint: "تلفظ واژه‌ها را بگو و نمره بگیر" },
  { id: "roleplay", label: "مکالمه نقش‌محور", icon: MessagesSquare, hint: "جای یکی از شخصیت‌های کتاب حرف بزن" },
  { id: "shadowing", label: "شنیدار و تکرار", icon: Repeat2, hint: "گوش بده و خط‌به‌خط تکرار کن" },
];

export function SpeakingView() {
  const [tab, setTab] = useState<SpeakingTab>("say-it");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="space-y-4">
      <header className="text-center space-y-1.5">
        <h1 className="flex items-center justify-center gap-2 text-xl font-black">
          <Mic size={20} className="text-primary" aria-hidden />
          گفتار و تلفظ
        </h1>
        <p className="text-[12.5px] text-muted-foreground">{active.hint}</p>
      </header>

      <div
        className="mx-auto flex w-fit max-w-full gap-1 rounded-xl border bg-card p-1"
        role="tablist"
        aria-label="بخش‌های گفتار"
      >
        {TABS.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "secondary" : "ghost"}
            size="sm"
            role="tab"
            aria-selected={tab === t.id}
            className="gap-1.5 min-h-11"
            onClick={() => setTab(t.id)}
          >
            <t.icon size={15} />
            <span className="whitespace-nowrap">{t.label}</span>
          </Button>
        ))}
      </div>

      <div role="tabpanel" aria-label={active.label}>
        {tab === "say-it" && <SayItPractice />}
        {tab === "roleplay" && <RoleplayPractice />}
        {tab === "shadowing" && <ShadowingPractice />}
      </div>
    </div>
  );
}
