#!/bin/bash
# رگرسیون فاز ۳ — کتاب یازدهم: هدر/بازی‌ها/آمار/واژگان سالم؟
export AGENT_BROWSER_SESSION=v1qa7
cd /home/z/my-project

SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }
refOf() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt; }

agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4
SNAP
B=$(refOf 'ورود به زبان انگلیسی یازدهم'); echo "grade11: $B"
agent-browser click "$B" >/dev/null 2>&1; sleep 4
SNAPFULL
python3 - << 'PY'
import io
c = io.open('/tmp/ab-snap.txt', encoding='utf-8').read()
ok = all(x in c for x in ['بازیها', 'مرور امروز', 'آزمون', 'آمار'])
print('header nav items on grade-11:', 'OK' if ok else 'MISSING')
PY
SNAP; N=$(refOf 'button "بازیها"'); agent-browser click "$N" >/dev/null 2>&1; sleep 2
SNAP
python3 - << 'PY'
import io
c = io.open('/tmp/ab-snap.txt', encoding='utf-8').read()
ok = all(x in c for x in ['تطبیق حافظه', 'حروف جاب', 'جای خالی', 'شکار کلمه', 'تست برقی'])
print('hub on grade-11:', 'OK all 5 cards' if ok else 'MISSING')
PY
SNAP; G=$(refOf 'تطبیق حافظه'); agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAP; S=$(refOf 'شروع بازی'); agent-browser click "$S" >/dev/null 2>&1; sleep 1.5
SNAPFULL
grep -q 'انصراف' /tmp/ab-full.txt && echo "OK memory playing on grade-11" || echo "WARN memory"
agent-browser screenshot /tmp/qa-grade11-memory.png 2>&1 | tail -1
# آمار هم سالم؟
SNAP; ST=$(refOf 'button "آمار"'); agent-browser click "$ST" >/dev/null 2>&1; sleep 2.5
SNAPFULL
grep -qE 'آمار|فعالیت' /tmp/ab-full.txt && echo "OK stats view loads" || echo "WARN stats"
echo "=== console ==="
agent-browser console 2>&1 | grep -iE "error" | grep -v "DevTools" | head -5
echo "--- end ---"
tail -30 dev.log | grep -iE "error| 500 " | head -5
echo "--- log end ---"
agent-browser close >/dev/null 2>&1
pkill -f chrome-153 2>/dev/null || true
echo "REGRESSION DONE"
