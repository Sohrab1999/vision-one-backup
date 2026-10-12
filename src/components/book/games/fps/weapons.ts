"use client";

import { Bomb, Crosshair, Radar } from "lucide-react";
import { SHOOT_COOLDOWN } from "./constants";

// ── فاز F9 — تنوع سلاح: سه سلاح با خشاب/ریلود/لگد/انفجار متفاوت ──

export type WeaponId = "pistol" | "heavy" | "pump";

export interface WeaponConfig {
  id: WeaponId;
  name: string;
  desc: string;
  /** ظرفیت خشاب */
  mag: number;
  /** مدت ریلود (میلی‌ثانیه) */
  reloadMs: number;
  /** حداقل فاصلهٔ دو شلیک (میلی‌ثانیه) */
  cooldownMs: number;
  /** ضریب لگد ویومدل */
  recoil: number;
  /** لگد دوربین (رادیان — نوک تفنگ بالا می‌رود) */
  kick: number;
  /** پهنای پخش شلیک در NDC — پمپ: سه پرتو؛ بقیه: تک‌پرتو */
  spread: number;
  /** مقیاس انفجار برخورد */
  burst: number;
  /** مقیاس جرقهٔ دهانه */
  flash: number;
  icon: typeof Crosshair;
  /** خط مشخصات چیپ کارت سلاح در setup */
  stats: string;
}

export const WEAPONS: Record<WeaponId, WeaponConfig> = {
  pistol: {
    id: "pistol",
    name: "کلت تک‌تیر",
    desc: "سلاح همیشگی میدان — سبک، سریع و دقیق.",
    mag: 8,
    reloadMs: 1100,
    cooldownMs: SHOOT_COOLDOWN,
    recoil: 1,
    kick: 0.004,
    spread: 0,
    burst: 1,
    flash: 1,
    icon: Crosshair,
    stats: "خشاب ۸ · شلیک تند · ریلود کوتاه",
  },
  heavy: {
    id: "heavy",
    name: "دژکوب سنگین",
    desc: "هر فشنگ طلاست — لگد سنگین و انفجار بزرگ‌تر.",
    mag: 5,
    reloadMs: 1650,
    cooldownMs: 720,
    recoil: 1.45,
    kick: 0.014,
    spread: 0,
    burst: 1.6,
    flash: 1.5,
    icon: Bomb,
    stats: "خشاب ۵ · لگد +۴۵٪ · انفجار بزرگ",
  },
  pump: {
    id: "pump",
    name: "پمپ زون‌کن",
    desc: "با هر ماشه سه پرتو می‌کاود — بهترین برخورد حساب می‌شود.",
    mag: 4,
    reloadMs: 2300,
    cooldownMs: 950,
    recoil: 1.25,
    kick: 0.011,
    spread: 0.16,
    burst: 1.25,
    flash: 1.3,
    icon: Radar,
    stats: "خشاب ۴ · پخش سه‌پرتویی · ریلود بلند",
  },
};

/** کلید افزودنی ماندگاری سلاح انتخابی — پیش‌فرض کلت */
export const WEAPON_KEY = "visionone:game-pref:fps-weapon";
