"use client";

import { useSyncExternalStore } from "react";

/**
 * تم‌های رنگی فروشگاه (فاز ۶ نقشه راه جامع ۲۰۲۶).
 *
 * - هر تم = override متغیرهای --primary/--ring/--chart-1 روی <html>
 * - پالت مجاز: بدون آبی/نیلی — رز، نارنجی، کهربایی، لیمویی، سبزآبی، فوشیا، قرمز
 * - پیش‌فرض: زمردی پروژه (بدون override)
 * - localStorage: `visionone:accent`
 */

export interface AccentTheme {
  id: string;
  title: string;
  price: number;
  /** swatch برای پیش‌نمایش */
  swatch: string;
  /** override متغیرها (light) */
  light: Record<string, string>;
  /** override متغیرها (dark) */
  dark: Record<string, string>;
}

export const ACCENTS: AccentTheme[] = [
  {
    id: "emerald",
    title: "زمردی (پیش‌فرض)",
    price: 0,
    swatch: "oklch(0.53 0.115 163)",
    light: {},
    dark: {},
  },
  {
    id: "teal",
    title: "سبزآبی اقیانوس",
    price: 120,
    swatch: "oklch(0.55 0.11 195)",
    light: {
      "--primary": "oklch(0.52 0.11 195)",
      "--primary-foreground": "oklch(0.985 0.01 190)",
      "--ring": "oklch(0.6 0.1 195)",
      "--secondary": "oklch(0.95 0.02 195)",
      "--secondary-foreground": "oklch(0.32 0.05 195)",
      "--chart-1": "oklch(0.55 0.11 195)",
    },
    dark: {
      "--primary": "oklch(0.68 0.11 195)",
      "--primary-foreground": "oklch(0.16 0.03 195)",
      "--ring": "oklch(0.7 0.1 195)",
      "--chart-1": "oklch(0.68 0.11 195)",
    },
  },
  {
    id: "amber",
    title: "کهربایی طلایی",
    price: 150,
    swatch: "oklch(0.66 0.15 75)",
    light: {
      "--primary": "oklch(0.55 0.13 70)",
      "--primary-foreground": "oklch(0.985 0.01 80)",
      "--ring": "oklch(0.65 0.12 75)",
      "--secondary": "oklch(0.95 0.045 85)",
      "--secondary-foreground": "oklch(0.35 0.06 70)",
      "--chart-1": "oklch(0.6 0.13 70)",
    },
    dark: {
      "--primary": "oklch(0.75 0.14 80)",
      "--primary-foreground": "oklch(0.18 0.04 70)",
      "--ring": "oklch(0.75 0.13 80)",
      "--chart-1": "oklch(0.75 0.14 80)",
    },
  },
  {
    id: "rose",
    title: "رزِ گلگون",
    price: 150,
    swatch: "oklch(0.58 0.19 15)",
    light: {
      "--primary": "oklch(0.55 0.18 15)",
      "--primary-foreground": "oklch(0.985 0.01 15)",
      "--ring": "oklch(0.62 0.17 15)",
      "--secondary": "oklch(0.95 0.025 15)",
      "--secondary-foreground": "oklch(0.35 0.08 15)",
      "--chart-1": "oklch(0.58 0.18 15)",
    },
    dark: {
      "--primary": "oklch(0.7 0.17 15)",
      "--primary-foreground": "oklch(0.16 0.04 15)",
      "--ring": "oklch(0.7 0.16 15)",
      "--chart-1": "oklch(0.7 0.17 15)",
    },
  },
  {
    id: "orange",
    title: "نارنجی آفتاب",
    price: 150,
    swatch: "oklch(0.62 0.17 45)",
    light: {
      "--primary": "oklch(0.58 0.16 45)",
      "--primary-foreground": "oklch(0.985 0.01 60)",
      "--ring": "oklch(0.65 0.15 45)",
      "--secondary": "oklch(0.95 0.03 55)",
      "--secondary-foreground": "oklch(0.35 0.07 45)",
      "--chart-1": "oklch(0.62 0.17 45)",
    },
    dark: {
      "--primary": "oklch(0.72 0.16 50)",
      "--primary-foreground": "oklch(0.18 0.04 45)",
      "--ring": "oklch(0.72 0.15 50)",
      "--chart-1": "oklch(0.72 0.16 50)",
    },
  },
  {
    id: "lime",
    title: "لیمویی بهاری",
    price: 150,
    swatch: "oklch(0.62 0.16 125)",
    light: {
      "--primary": "oklch(0.52 0.14 125)",
      "--primary-foreground": "oklch(0.985 0.01 125)",
      "--ring": "oklch(0.6 0.14 125)",
      "--secondary": "oklch(0.95 0.04 125)",
      "--secondary-foreground": "oklch(0.33 0.06 125)",
      "--chart-1": "oklch(0.55 0.14 125)",
    },
    dark: {
      "--primary": "oklch(0.72 0.16 130)",
      "--primary-foreground": "oklch(0.17 0.04 125)",
      "--ring": "oklch(0.72 0.15 130)",
      "--chart-1": "oklch(0.72 0.16 130)",
    },
  },
  {
    id: "fuchsia",
    title: "فوشیای شبنم",
    price: 180,
    swatch: "oklch(0.55 0.19 330)",
    light: {
      "--primary": "oklch(0.52 0.18 330)",
      "--primary-foreground": "oklch(0.985 0.01 330)",
      "--ring": "oklch(0.6 0.17 330)",
      "--secondary": "oklch(0.95 0.025 330)",
      "--secondary-foreground": "oklch(0.35 0.09 330)",
      "--chart-1": "oklch(0.55 0.18 330)",
    },
    dark: {
      "--primary": "oklch(0.7 0.18 335)",
      "--primary-foreground": "oklch(0.16 0.04 330)",
      "--ring": "oklch(0.7 0.17 335)",
      "--chart-1": "oklch(0.7 0.18 335)",
    },
  },
  {
    id: "red",
    title: "قرمز اناری",
    price: 180,
    swatch: "oklch(0.55 0.2 25)",
    light: {
      "--primary": "oklch(0.52 0.19 25)",
      "--primary-foreground": "oklch(0.985 0.01 25)",
      "--ring": "oklch(0.6 0.18 25)",
      "--secondary": "oklch(0.95 0.025 25)",
      "--secondary-foreground": "oklch(0.35 0.09 25)",
      "--chart-1": "oklch(0.55 0.19 25)",
    },
    dark: {
      "--primary": "oklch(0.68 0.19 25)",
      "--primary-foreground": "oklch(0.16 0.04 25)",
      "--ring": "oklch(0.68 0.18 25)",
      "--chart-1": "oklch(0.68 0.19 25)",
    },
  },
];

const ACCENT_KEY = "visionone:accent";
const SHOP_KEY = "visionone:shop";

// فاز ۶ — بازاعمال تم ذخیره‌شده پس از رفرش صفحه.
// با microtask اجرا می‌شود تا theme-store ابتدا کلاس dark را روی <html> حک کرده باشد
// (ارزیابی گراف ماژول‌ها sync است؛ microtask پس از آن می‌چسبد).
if (typeof document !== "undefined") {
  queueMicrotask(() => {
    try {
      const id = localStorage.getItem(ACCENT_KEY) ?? "emerald";
      if (id && id !== "emerald") applyAccent(id);
    } catch {
      /* noop */
    }
  });
}

interface ShopData {
  /** شناسه‌های خریداری‌شده (تم‌ها و آواتارها با پیشوند) */
  owned: string[];
  /** آواتار پریمیوم انتخابی (پیشوند avatar:) */
  equippedAvatar: string | null;
}

const EMPTY_SHOP: ShopData = { owned: [], equippedAvatar: null };

let cache: string | null = null;
let shopCache: ShopData | null = null;
const listeners = new Set<() => void>();

function readAccent(): string {
  if (cache) return cache;
  try {
    cache = localStorage.getItem(ACCENT_KEY) ?? "emerald";
  } catch {
    cache = "emerald";
  }
  return cache;
}

function readShop(): ShopData {
  if (shopCache) return shopCache;
  try {
    const raw = localStorage.getItem(SHOP_KEY);
    shopCache = raw ? { ...EMPTY_SHOP, ...(JSON.parse(raw) as Partial<ShopData>) } : EMPTY_SHOP;
  } catch {
    shopCache = EMPTY_SHOP;
  }
  return shopCache;
}

function notify(): void {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** اعمال متغیرهای تم روی <html> — در حالت تیره، دستهٔ dark */
export function applyAccent(id: string): void {
  cache = id;
  try {
    localStorage.setItem(ACCENT_KEY, id);
  } catch {
    /* noop */
  }
  const theme = ACCENTS.find((a) => a.id === id) ?? ACCENTS[0]!;
  const root = document.documentElement;
  // پاک‌سازی overrideهای قبلی
  for (const t of ACCENTS) {
    for (const k of Object.keys(t.light)) root.style.removeProperty(k);
  }
  const vars = root.classList.contains("dark") ? theme.dark : theme.light;
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  notify();
}

/** re-apply در تغییر روشن/تیره (صدا زده می‌شود از setDark) */
export function reapplyAccent(): void {
  applyAccent(readAccent());
}

export function accentOwned(id: string): boolean {
  if (id === "emerald") return true;
  return readShop().owned.includes(`theme:${id}`);
}

export function useAccent(): { accent: string; shop: ShopData } {
  const accent = useSyncExternalStore(subscribe, readAccent, () => "emerald");
  const shop = useSyncExternalStore(subscribe, readShop, () => EMPTY_SHOP);
  return { accent, shop };
}

export function markOwned(key: string): void {
  const shop = readShop();
  if (!shop.owned.includes(key)) {
    shopCache = { ...shop, owned: [...shop.owned, key] };
    try {
      localStorage.setItem(SHOP_KEY, JSON.stringify(shopCache));
    } catch {
      /* noop */
    }
  }
  notify();
}

export function equipAvatar(key: string): void {
  const shop = readShop();
  shopCache = { ...shop, equippedAvatar: key };
  try {
    localStorage.setItem(SHOP_KEY, JSON.stringify(shopCache));
  } catch {
    /* noop */
  }
  notify();
}

/** آواتارهای پریمیوم فروشگاه */
export const PREMIUM_AVATARS: { id: string; emoji: string; price: number }[] = [
  { id: "avatar-dragon", emoji: "🐲", price: 80 },
  { id: "avatar-unicorn", emoji: "🦄", price: 80 },
  { id: "avatar-alien", emoji: "👽", price: 80 },
  { id: "avatar-crown", emoji: "👑", price: 120 },
  { id: "avatar-rocket", emoji: "🚀", price: 80 },
  { id: "avatar-gem", emoji: "💎", price: 120 },
  { id: "avatar-hero", emoji: "🦸", price: 100 },
  { id: "avatar-brain", emoji: "🧠", price: 100 },
];
