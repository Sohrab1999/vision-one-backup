// گام ۵ — فاز ۱: استخراج use-fps-prefs از fps/index.tsx (جابه‌جایی مکانیکی سطری)
import { readFileSync, writeFileSync } from "fs";

const P = "/home/z/my-project/src/components/book/games/fps/index.tsx";
const HOOK_P = "/home/z/my-project/src/components/book/games/fps/use-fps-prefs.ts";
const src = readFileSync(P, "utf8");
const lines = src.split("\n");

/** خط N (یک‌مبنا) */
const L = (n: number) => lines[n - 1];
const assert = (n: number, needle: string) => {
  if (!L(n).includes(needle)) {
    console.error(`ASSERT FAIL @${n}: wanted ${JSON.stringify(needle)} got ${JSON.stringify(L(n))}`);
    process.exit(1);
  }
};

// ── لنگرها (باید عیناً همین‌ها باشند وگرنه توقف — بدون هیچ ویرایش کور) ──
assert(326, 'const [mode, setMode] = useState<Mode>("word-hunt");');
assert(330, "کیفیت گرافیک");
assert(331, "useState<Quality>(() => loadQuality())");
assert(332, "فاز F5");
assert(337, "useState<MapId>(() => loadMapPref())");
assert(338, "سلاح انتخابی (ماندگار) + اسکوپ لحظه‌ای");
assert(339, "useState<WeaponId>(() => loadWeaponPref())");
assert(340, "const [scoped, setScoped] = useState(false);");
assert(1402, "انتخاب کیفیت گرافیک");
assert(1414, "تنظیم گزینه‌های نگاه");
assert(1435, "انتخاب نقشهٔ مأموریت");
assert(1441, "}, []);");
assert(1443, "فاز F10");
assert(1452, "}, [mapId]);");
assert(1454, "انتخاب سلاح");
assert(1460, "}, []);");
assert(1462, "کلیک چیپ‌های setup");
// importها
assert(239, "WEAPON_KEY,");
assert(245, "import {");
assert(256, '} from "./prefs";');

// ── برش‌ها ──
const stateMode = L(326); // تورفتگی ۲ فاصله — داخل هوک هم همان
const statePrefs = lines.slice(330 - 1, 338); // 330..338
const weaponStateLine = L(339);
const settersA = lines.slice(1402 - 1, 1441); // 1402..1441
const settersB = lines.slice(1455 - 1, 1460); // 1455..1460 (بدون کامنت ۱۴۵۴)

// کامنت ۳۳۸ به دو نیمه شکسته می‌شود (نیمهٔ اسکوپ در index می‌ماند) — تنها ویرایش متنِ کامنت
const hookStatePrefs = [...statePrefs.slice(0, 338 - 330), "  // ── فاز F9 — سلاح انتخابی (ماندگار) ──"];

const hookBody = [stateMode, ...hookStatePrefs, weaponStateLine, "", ...settersA, "", ...settersB].join("\n");

const hookFile = `"use client";

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
  FOV_DEF,
  FOV_MAX,
  FOV_MIN,
  QUALITY_KEY,
  SENS_DEF,
  SENS_MAX,
  SENS_MIN,
  type Quality,
} from "./constants";
import { clamp } from "./helpers";
import {
  FOV_KEY,
  INVERT_KEY,
  MAP_KEY,
  SENS_KEY,
  loadMapPref,
  loadPrefBool,
  loadPrefNum,
  loadQuality,
  savePref,
} from "./prefs";
import { WEAPON_KEY } from "./weapons";
import type { MapId } from "./maps";
import type { Mode } from "./types";

export function useFpsPrefs() {
${hookBody}

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
  };
}
`;

// ── بازسازی index ──
const destructure = [
  "  // ── گام ۵ refactor-2 — ترجیحات ماندگار (حالت/کیفیت/سلاح/نقشه/گزینه‌های نگاه) از use-fps-prefs ──",
  "  const {",
  "    mode,",
  "    setMode,",
  "    quality,",
  "    setQualityPref,",
  "    sens,",
  "    setSensPref,",
  "    fov,",
  "    setFovPref,",
  "    invertY,",
  "    setInvertPref,",
  "    mapId,",
  "    setMapPref,",
  "    weaponId,",
  "    setWeaponPref,",
  "  } = useFpsPrefs();",
];

const out: string[] = [];
for (let i = 1; i <= lines.length; i++) {
  if (i === 239) continue; // WEAPON_KEY از import سلاح‌ها حذف (به هوک رفت)
  if (i === 326) {
    out.push(...destructure);
    continue;
  }
  if (i >= 330 && i <= 339) continue; // حالت‌های ترجیحات → هوک
  if (i === 340) {
    out.push("  // ── فاز F9 — اسکوپ لحظه‌ای ──");
    out.push(L(340));
    continue;
  }
  if (i === 1402) {
    out.push("  // ── گام ۵ refactor-2 — setterهای ترجیحات ماندگار به use-fps-prefs منتقل شدند ──");
    i = 1441; // جهش به پایان بلوک setterها (1402..1441)
    continue;
  }
  if (i >= 1453 && i <= 1461) continue; // خط خالی + کامنت + setter سلاح + خط خالی (۱۴۵۳..۱۴۶۱)
  out.push(L(i));
}

// import prefs → تک‌عضوی loadWeaponPref — بازسازی روی خروجی فعلی
let res = out.join("\n");
const prefsImportOld = lines.slice(245 - 1, 256).join("\n");
if (!res.includes(prefsImportOld)) {
  console.error("ASSERT FAIL: prefs import block not found verbatim");
  process.exit(1);
}
res = res.replace(prefsImportOld, 'import { loadWeaponPref } from "./prefs";');

// import هوک — بعد از import TouchJoystick
const anchor = 'import { TouchJoystick } from "./scene/input";';
if (!res.includes(anchor)) {
  console.error("ASSERT FAIL: TouchJoystick import anchor");
  process.exit(1);
}
res = res.replace(anchor, `${anchor}\nimport { useFpsPrefs } from "./use-fps-prefs";`);

writeFileSync(HOOK_P, hookFile);
writeFileSync(P, res);
console.log("phase1 done. index lines:", res.split("\n").length, "hook lines:", hookFile.split("\n").length);
