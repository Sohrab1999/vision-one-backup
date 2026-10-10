#!/bin/bash
# QA فاز ۴ — آزمایشگاه با ۱۴ بازی: کارت‌های جدید + ورود به ۹ بازی جدید و گیم‌پلی واقعی
export AGENT_BROWSER_SESSION=v1qa8
cd /home/z/my-project

SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }
SNAPFULL() { agent-browser snapshot 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-full.txt; }
refOf() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt; }

curl -s --max-time 2 -o /dev/null http://127.0.0.1:3000/ || (setsid nohup bun run dev > /dev/null 2>&1 < /dev/null & sleep 14)

agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4
SNAP
B=$(refOf 'ورود به زبان انگلیسی یازدهم'); echo "grade11-card: $B"
agent-browser click "$B" >/dev/null 2>&1; sleep 4
SNAP; N=$(refOf 'button "بازیها"'); echo "games-nav: $N"
agent-browser click "$N" >/dev/null 2>&1; sleep 2.5

# ── بررسی ۹ کارت جدید در هاب ──
SNAPFULL
python3 - << 'PY'
import io
c = io.open('/tmp/ab-full.txt', encoding='utf-8').read()
new9 = ['فلپی گزینش', 'مار و پله واژگانی', 'جدول متقاطع', 'وردل ویژن', 'دارباز', 'سازنده جمله', 'دوئل دونفره', 'شکار صدا', 'نقشه ماجراجویی']
old5 = ['تطبیق حافظه', 'حروف جاب', 'جای خالی', 'شکار کلمه', 'تست برقی']
missing_new = [x for x in new9 if x not in c]
missing_old = [x for x in old5 if x not in c]
print('hub 14 cards:', 'OK' if not missing_new and not missing_old else f'MISSING new={missing_new} old={missing_old}')
print('badge 14:', 'OK' if '۱۴ بازی واژگانی و مهارتی' in c else 'MISSING')
PY

# ── 1) فلپی گزینش: setup → شروع → HUD بازی ──
SNAP; G=$(refOf 'فلپی گزینش'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع پرواز'); [ -z "$S" ] && S=$(refOf 'شروع'); agent-browser click "$S" >/dev/null 2>&1; sleep 2.5
SNAPFULL
grep -q 'انصراف' /tmp/ab-full.txt && echo "OK flappy playing (HUD)" || echo "WARN flappy"
agent-browser screenshot /tmp/qa4-flappy.png >/dev/null 2>&1
SNAP; BK=$(refOf 'دکمه "انصراف"'); agent-browser click "$BK" >/dev/null 2>&1; sleep 1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 2) مار و پله: setup → شروع → سؤال ──
SNAP; G=$(refOf 'مار و پله واژگانی'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع بازی'); [ -z "$S" ] && S=$(refOf 'مقابل ربات'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'بازیکن|تاس' /tmp/ab-full.txt && echo "OK snakes setup/board" || echo "WARN snakes"
agent-browser screenshot /tmp/qa4-snakes.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 3) جدول متقاطع: setup → ساخت جدول ──
SNAP; G=$(refOf 'جدول متقاطع'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع بازی'); [ -z "$S" ] && S=$(refOf 'جدول جدید'); agent-browser click "$S" >/dev/null 2>&1; sleep 3
SNAPFULL
grep -qE 'افقی|عمودی' /tmp/ab-full.txt && echo "OK crossword generated (clues)" || echo "WARN crossword"
agent-browser screenshot /tmp/qa4-crossword.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 4) وردل: setup → شروع بی‌نهایت → گرید ──
SNAP; G=$(refOf 'وردل ویژن'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'بی‌نهایت'); [ -z "$S" ] && S=$(refOf 'شروع'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'Q|W|E' /tmp/ab-full.txt && echo "OK wordle grid+keyboard" || echo "WARN wordle"
agent-browser screenshot /tmp/qa4-wordle.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 5) دارباز: setup → شروع ──
SNAP; G=$(refOf 'دارباز'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع بازی'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'بادکنک|معنی' /tmp/ab-full.txt && echo "OK hangman round" || echo "WARN hangman"
agent-browser screenshot /tmp/qa4-hangman.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 6) سازنده جمله: setup → شروع ──
SNAP; G=$(refOf 'سازنده جمله'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع بازی'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'پاک کردن|رد کردن' /tmp/ab-full.txt && echo "OK sentence-builder playing" || echo "WARN sentence-builder"
agent-browser screenshot /tmp/qa4-sentence.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 7) دوئل: setup → شروع ──
SNAP; G=$(refOf 'دوئل دونفره'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع دوئل'); [ -z "$S" ] && S=$(refOf 'شروع'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'بازیکن ۱|بازیکن ۲' /tmp/ab-full.txt && echo "OK duel playing" || echo "WARN duel"
agent-browser screenshot /tmp/qa4-duel.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 8) شکار صدا: setup → شروع ──
SNAP; G=$(refOf 'شکار صدا'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع بازی'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'تکرار صدا|گوش' /tmp/ab-full.txt && echo "OK listening-hunt playing" || echo "WARN listening-hunt"
agent-browser screenshot /tmp/qa4-listening.png >/dev/null 2>&1
SNAP; BK2=$(refOf 'آزمایشگاه'); agent-browser click "$BK2" >/dev/null 2>&1; sleep 1.5

# ── 9) نقشه ماجراجویی: setup → نقشه → مرحله ──
SNAP; G=$(refOf 'نقشه ماجراجویی'); agent-browser click "$G" >/dev/null 2>&1; sleep 1.5
SNAPFULL; S=$(refOf 'شروع ماجراجویی'); [ -z "$S" ] && S=$(refOf 'از اول'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -qE 'مرحله|ستاره' /tmp/ab-full.txt && echo "OK adventure map visible" || echo "WARN adventure"
agent-browser screenshot /tmp/qa4-adventure.png >/dev/null 2>&1

echo "=== console errors ==="
agent-browser console 2>&1 | grep -iE "error" | grep -v "DevTools" | head -5
echo "--- qa4 end ---"
