"use client";

import { MAPS, type MapId } from "./maps";
import { WEAPONS, WEAPON_KEY, type WeaponId } from "./weapons";
import { QUALITY_KEY, type Quality } from "./constants";
import { clamp } from "./helpers";

export const MAP_KEY = "visionone:game-pref:fps-map";
export const SENS_KEY = "visionone:game-pref:fps-sens";
export const FOV_KEY = "visionone:game-pref:fps-fov";
export const INVERT_KEY = "visionone:game-pref:fps-invert";

export function loadMapPref(): MapId {
  if (typeof window === "undefined") return "forest";
  try {
    const v = window.localStorage.getItem(MAP_KEY);
    return v && v in MAPS ? (v as MapId) : "forest";
  } catch {
    return "forest";
  }
}

/** فاز F9 — خواندن سلاح ذخیره‌شده (null صریح — الگوی loadPrefNum) */
export function loadWeaponPref(): WeaponId {
  if (typeof window === "undefined") return "pistol";
  try {
    const v = window.localStorage.getItem(WEAPON_KEY);
    return v && v in WEAPONS ? (v as WeaponId) : "pistol";
  } catch {
    return "pistol";
  }
}

export function loadPrefNum(key: string, def: number, min: number, max: number): number {
  if (typeof window === "undefined") return def;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return def; // Number(null)=0 است — نباید به min کلمپ شود!
    const v = Number(raw);
    return Number.isFinite(v) ? clamp(v, min, max) : def;
  } catch {
    return def;
  }
}

export function loadPrefBool(key: string, def: boolean): boolean {
  if (typeof window === "undefined") return def;
  try {
    const v = window.localStorage.getItem(key);
    if (v === "1") return true;
    if (v === "0") return false;
    return def;
  } catch {
    return def;
  }
}

export function savePref(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
}

export function loadQuality(): Quality {
  if (typeof window === "undefined") return "high";
  try {
    return window.localStorage.getItem(QUALITY_KEY) === "low" ? "low" : "high";
  } catch {
    return "high";
  }
}
