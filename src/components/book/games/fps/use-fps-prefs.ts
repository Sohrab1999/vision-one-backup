"use client";

/**
 * use-fps-prefs — حالت ترجیحات کم‌جنب‌وجوش شوتر (گام ۵ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی از index.tsx (جابه‌جایی سطری عیناً — پلی‌بوک games/fps/README.md):
 * حالت (mode/quality/sens/fov/invertY/mapId/weaponId) + setterهای ماندگار
 * (setQualityPref/setSensPref/setFovPref/setInvertPref/setMapPref/setWeaponPref).
 * کلیدهای localStorage فقط از طریق prefs.ts — قرارداد طلایی پوشه.
 * اسکوپ/درس و آینه‌های ref موتور (sensRef/weaponRef/…) عمداً در index مانده‌اند —
 * با منطق مأموریت و مسیرهای بدون ری‌رندر گره خورده‌اند (صداقت بر اجبار).
 */

import { useCallback, useState } from "react";
import { buzz } from "../kit/haptics";
import { playSound } from "../kit/sound-engine";
import {
  DIFFICULTY_KEY,
  FOV_DEF,
  FOV_MAX,
  FOV_MIN,
  QUALITY_KEY,
  SENS_DEF,
  SENS_MAX,
  SENS_MIN,
  type Difficulty,
  type Quality,
} from "./constants";
import { clamp } from "./helpers";
import {
  FOV_KEY,
  FIELD_SFX_KEY,
  INVERT_KEY,
  MAP_KEY,
  SENS_KEY,
  loadDifficulty,
  loadFieldSfxPref,
  loadMapPref,
  loadPrefBool,
  loadPrefNum,
  loadQuality,
  loadWeaponPref,
  savePref,
} from "./prefs";
import { WEAPON_KEY, type WeaponId } from "./weapons";
import type { MapId } from "./maps";
import type { Mode } from "./types";

export function useFpsPrefs() {
  const [mode, setMode] = useState<Mode>("word-hunt");
  // فاز G2-e — کیفیت گرافیک (ماندگار؛ پیش‌فرض عادی)
  const [quality, setQuality] = useState<Quality>(() => loadQuality());
  // ── فاز F5 — گزینه‌های نگاه (ماندگار) ──
  const [sens, setSens] = useState(() => loadPrefNum(SENS_KEY, SENS_DEF, SENS_MIN, SENS_MAX));
  const [fov, setFov] = useState(() => loadPrefNum(FOV_KEY, FOV_DEF, FOV_MIN, FOV_MAX));
  const [invertY, setInvertY] = useState(() => loadPrefBool(INVERT_KEY, false));
  // ── فاز F6 — نقشهٔ مأموریت (ماندگار) ──
  const [mapId, setMapId] = useState<MapId>(() => loadMapPref());
  // ── فاز F9 — سلاح انتخابی (ماندگار) ──
  const [weaponId, setWeaponId] = useState<WeaponId>(() => loadWeaponPref());
  // ── فاز U1-00 — درجهٔ دشواری مأموریت (ماندگار؛ پیش‌فرض عادی) ──
  const [difficulty, setDifficulty] = useState<Difficulty>(() => loadDifficulty());
  // ── فاز U5 — صدای میدان جهت‌دار (ماندگار؛ پیش‌فرض روشن) ──
  const [fieldSfx, setFieldSfx] = useState(() => loadFieldSfxPref());

  // ── فاز G2-e — انتخاب کیفیت گرافیک (ماندگار؛ کلید افزودنی) ──
  const setQualityPref = useCallback((q: Quality) => {
    playSound("click");
    buzz("light");
    setQuality(q);
    try {
      window.localStorage.setItem(QUALITY_KEY, q);
    } catch {
      /* noop */
    }
  }, []);

  // ── فاز F5 — تنظیم گزینه‌های نگاه (ماندگار؛ اسلایدر بدون صدا — هر تیک صدا ندارد) ──
  const setSensPref = useCallback((v: number) => {
    const c = clamp(v, SENS_MIN, SENS_MAX);
    setSens(c);
    savePref(SENS_KEY, String(Math.round(c * 100) / 100));
  }, []);
  const setFovPref = useCallback((v: number) => {
    const c = clamp(Math.round(v), FOV_MIN, FOV_MAX);
    setFov(c);
    savePref(FOV_KEY, String(c));
  }, []);
  const setInvertPref = useCallback(
    (v: boolean) => {
      playSound("click");
      buzz("light");
      setInvertY(v);
      savePref(INVERT_KEY, v ? "1" : "0");
    },
    [],
  );

  // ── فاز F6 — انتخاب نقشهٔ مأموریت (ماندگار؛ کلید افزودنی) ──
  const setMapPref = useCallback((id: MapId) => {
    playSound("click");
    buzz("light");
    setMapId(id);
    savePref(MAP_KEY, id);
  }, []);

  // ── فاز F9 — انتخاب سلاح (ماندگار؛ کلید افزودنی) ──
  const setWeaponPref = useCallback((id: WeaponId) => {
    playSound("click");
    buzz("light");
    setWeaponId(id);
    savePref(WEAPON_KEY, id);
  }, []);

  // ── فاز U1-00 — انتخاب درجهٔ دشواری (ماندگار؛ کلید افزودنی) ──
  const setDifficultyPref = useCallback((d: Difficulty) => {
    playSound("click");
    buzz("light");
    setDifficulty(d);
    savePref(DIFFICULTY_KEY, d);
  }, []);

  // ── فاز U5 — سوییچ صدای میدان (ماندگار؛ کلید افزودنی ADR-003) ──
  const setFieldSfxPref = useCallback((v: boolean) => {
    playSound("click");
    buzz("light");
    setFieldSfx(v);
    savePref(FIELD_SFX_KEY, v ? "1" : "0");
  }, []);

  return {
    mode,
    setMode,
    quality,
    setQualityPref,
    sens,
    setSensPref,
    fov,
    setFovPref,
    invertY,
    setInvertPref,
    mapId,
    setMapPref,
    weaponId,
    setWeaponPref,
    difficulty,
    setDifficultyPref,
    fieldSfx,
    setFieldSfxPref,
  };
}
