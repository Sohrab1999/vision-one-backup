#!/usr/bin/env bash
# Task 8-a — مرورگر QA یکجا (سرور دِو + فلو کامل کروسورد) — بازی بین فراخوانی‌ها زنده می‌ماند پس همه‌چیز در یک اجرا
set -u
cd /home/z/my-project

# ── ۰) سرور دِو ──
if ! curl -s -o /dev/null --max-time 2 http://localhost:3000/; then
  setsid bash -c 'exec bun run dev' >/dev/null 2>&1 < /dev/null &
fi
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://localhost:3000/ 2>/dev/null)
  [ "$code" = "200" ] && break
  sleep 1
done
echo "SERVER: $code"

# ── ۱) مرورگر تازه ──
agent-browser close >/dev/null 2>&1
sleep 2
agent-browser open http://localhost:3000/ || exit 1
agent-browser wait --load networkidle
agent-browser wait 2000
agent-browser find role button click --name "شروع مطالعه" || true
agent-browser wait 2000
agent-browser errors --clear >/dev/null
agent-browser console --clear >/dev/null

# ── ۲) ناوبری: هاب بازی‌ها → جدول متقاطع ──
agent-browser find role button click --name "بازیها" || exit 1
agent-browser wait 1500
agent-browser find role button click --name "شروع بازی جدول متقاطع" || exit 1
agent-browser wait 3000

# ── ۳) آموزش ۳گامی خودکار (در صورت باز بودن) رد می‌شود ──
agent-browser find text "بعدی" click >/dev/null 2>&1 || true
agent-browser find text "بعدی" click >/dev/null 2>&1 || true
agent-browser find text "شروع می‌کنم!" click >/dev/null 2>&1 || true
agent-browser wait 800
echo "TUTORIAL-OPEN: $(agent-browser eval '!!document.querySelector("[role=\"dialog\"]")' 2>/dev/null | tail -1)"

# ── ۴) نمای setup — عکس + شواهد ──
agent-browser screenshot qa-shots/t8a-crossword-setup.png
agent-browser snapshot -i -c > qa-shots/t8a-setup-snapshot.txt 2>&1
rg -c "کدام درس|چند واژه|ساخت جدول و شروع|جدول کلمات متقاطع" qa-shots/t8a-setup-snapshot.txt || echo "SETUP-MARKERS-MISSING"

# ── ۵) شروع دور → نمای playing ──
agent-browser find role button click --name "ساخت جدول و شروع" || exit 1
agent-browser wait 2500
agent-browser screenshot qa-shots/t8a-crossword-playing.png
agent-browser snapshot -i -c > qa-shots/t8a-playing-snapshot.txt 2>&1
echo "GRID: $(rg -c 'role "grid"' qa-shots/t8a-playing-snapshot.txt || echo 0)  KB: $(rg -c 'کیبورد حروف انگلیسی' qa-shots/t8a-playing-snapshot.txt || echo 0)  CLUES: $(rg -c 'افقی \(|عمودی \(' qa-shots/t8a-playing-snapshot.txt || echo 0)"

# ── ۶) تایپ ۲-۳ حرف از واژهٔ فعال با ground-truth از fiber React (همان eval) ──
agent-browser eval '(() => { const grid = document.querySelector("[role=\"grid\"]"); if (!grid) return "NO-GRID"; const fk = Object.keys(grid).find((k) => k.startsWith("__reactFiber$")); if (!fk) return "NO-FIBER-KEY"; let f = grid[fk]; while (f && !(f.memoizedProps && f.memoizedProps.puzzle && f.memoizedProps.activeWord)) f = f.return; if (!f) return "NO-FIBER"; const aw = f.memoizedProps.activeWord; const kb = document.querySelector("[role=\"group\"][aria-label=\"کیبورد حروف انگلیسی\"]"); if (!kb) return "NO-KB"; const btns = Array.from(kb.querySelectorAll("button")); const n = Math.min(3, aw.word.length - 1); const typed = []; for (const ch of Array.from(aw.word).slice(0, n)) { const b = btns.find((x) => x.getAttribute("aria-label") === "حرف " + ch); if (!b) return "NO-BTN:" + ch; b.click(); typed.push(ch); } return JSON.stringify({ word: aw.word, dir: aw.dir, typed: typed.join("") }); })()'

agent-browser wait 500

# ── ۷) بررسی → قفل حروف درست + toast ──
agent-browser find role button click --name "بررسی" || exit 1
agent-browser wait 1000
agent-browser screenshot qa-shots/t8a-crossword-check.png
agent-browser snapshot -i -c > qa-shots/t8a-check-snapshot.txt 2>&1
echo "LOCKED: $(rg -c 'تاییدشده' qa-shots/t8a-check-snapshot.txt || echo 0)  TOAST: $(rg -c 'حرف درست قفل شد' qa-shots/t8a-check-snapshot.txt || echo 0)"

# ── ۸) نگهبان خروج («انصراف») → دیالوگ (≥۱ خانهٔ پر) ──
agent-browser find role button click --name "انصراف" || exit 1
agent-browser wait 900
agent-browser screenshot qa-shots/t8a-crossword-guard.png
agent-browser snapshot -i -c > qa-shots/t8a-guard-snapshot.txt 2>&1
echo "GUARD: $(rg -c 'نیمه‌کاره|پیش‌نویس|ادامه می‌دهم' qa-shots/t8a-guard-snapshot.txt || echo 0)"

# ── ۹) Esc = ادامهٔ بازی (دیالوگ بسته می‌شود) ──
agent-browser press Escape
agent-browser wait 700
echo "GUARD-AFTER-ESC: $(agent-browser eval '!!document.querySelector("[role=\"alertdialog\"]")' 2>/dev/null | tail -1)"

# ── ۱۰) خطاها و کنسول ──
echo "---PAGE-ERRORS---"
agent-browser errors --json 2>/dev/null | rg -o '"errors":\[[^]]*\]' | head -c 600
echo
echo "---CONSOLE-ERRORS---"
agent-browser console --json 2>/dev/null | rg -o '\[error\][^"]{0,140}' | head -10
echo "---END---"
