#!/bin/bash
# QA فاز ۳ — نسخه ۲: ورود به کتاب اول، نرمال‌سازی ZWNJ در snapshot
export AGENT_BROWSER_SESSION=v1qa3
cd /home/z/my-project

echo "=== [0] server ==="
curl -s --max-time 2 -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/

# snapshot با حذف ZWNJ (اسنپ‌شات nیم‌فاصله را می‌ریزد)
SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }

refOf() {  # اولین ref مطابق الگو
  awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt
}
refsAll() {
  awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt
}

echo "=== [1] open ==="
agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4

echo "=== [2] enter vision-one book ==="
SNAP
B=$(refOf 'ورود به ویژن وان')
echo "book ref: $B"
agent-browser click "$B" 2>&1 | tail -1
sleep 3

echo "=== [3] nav to games ==="
SNAP
N=$(refOf 'button "بازیها"')
echo "nav ref: $N"
agent-browser click "$N" 2>&1 | tail -1
sleep 2

echo "=== [4] hub cards ==="
SNAP
for g in "تطبیق حافظه" "حروف جابها" "جای خالی" "شکار کلمه" "تست برقی"; do
  grep -q "$g" /tmp/ab-snap.txt && echo "OK card: $g" || echo "MISSING: $g"
done
agent-browser screenshot /tmp/qa-hub.png 2>&1 | tail -1

echo "=== [5] MEMORY ==="
G=$(refOf 'تطبیق حافظه'); agent-browser click "$G" 2>&1 | tail -1; sleep 1
SNAP
S=$(refOf 'شروع بازی'); echo "start: $S"; agent-browser click "$S" 2>&1 | tail -1; sleep 1.2
SNAP
C1=$(refsAll 'کارت' | sed -n 1p); C2=$(refsAll 'کارت' | sed -n 2p)
echo "cards: $C1 $C2"
agent-browser click "$C1" 2>&1 | tail -1; sleep 0.7
agent-browser click "$C2" 2>&1 | tail -1; sleep 1.4
SNAP
grep -qE 'حرکت|جفت' /tmp/ab-snap.txt && echo "OK memory playing" || echo "WARN memory state"
grep -c 'flip' /tmp/ab-snap.txt >/dev/null 2>&1
agent-browser screenshot /tmp/qa-memory.png 2>&1 | tail -1
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" 2>&1 | tail -1; sleep 1

echo "=== [6] SCRAMBLE ==="
SNAP
G=$(refOf 'حروف جابها'); agent-browser click "$G" 2>&1 | tail -1; sleep 1
SNAP
S=$(refOf 'شروع بازی'); agent-browser click "$S" 2>&1 | tail -1; sleep 1.5
SNAP
L=$(awk 'match($0, /- button "[A-Za-z]" \[ref/) { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt)
echo "letter: $L"
agent-browser click "$L" 2>&1 | tail -1; sleep 0.8
SNAP
grep -qE 'پاک کردن|راهنما|رد کردن' /tmp/ab-snap.txt && echo "OK scramble playing (action buttons)" || echo "WARN scramble"
agent-browser screenshot /tmp/qa-scramble.png 2>&1 | tail -1
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" 2>&1 | tail -1; sleep 1

echo "=== [7] CLOZE ==="
SNAP
G=$(refOf 'جای خالی'); agent-browser click "$G" 2>&1 | tail -1; sleep 1
SNAP
S=$(refOf 'شروع بازی'); agent-browser click "$S" 2>&1 | tail -1; sleep 1.5
SNAP
O=$(awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt)
echo "option: $O"
agent-browser click "$O" 2>&1 | tail -1; sleep 1.6
SNAP
grep -qE 'از [0-9۰-۹]+|درست' /tmp/ab-snap.txt && echo "OK cloze responded" || echo "WARN cloze"
agent-browser screenshot /tmp/qa-cloze.png 2>&1 | tail -1
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" 2>&1 | tail -1; sleep 1

echo "=== [8] WORDSEARCH ==="
SNAP
G=$(refOf 'شکار کلمه'); agent-browser click "$G" 2>&1 | tail -1; sleep 1
SNAP
S=$(refOf 'شروع'); echo "start: $S"; agent-browser click "$S" 2>&1 | tail -1; sleep 1.5
SNAP
CELLS=$(refsAll 'ردیف'); CC1=$(echo "$CELLS" | sed -n 5p); CC2=$(echo "$CELLS" | sed -n 6p)
echo "cells: $CC1 $CC2"
agent-browser click "$CC1" 2>&1 | tail -1; sleep 0.6
agent-browser click "$CC2" 2>&1 | tail -1; sleep 1
SNAP
grep -q 'سرنخ' /tmp/ab-snap.txt && echo "OK wordsearch clues" || echo "WARN wordsearch"
agent-browser screenshot /tmp/qa-wordsearch.png 2>&1 | tail -1
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" 2>&1 | tail -1; sleep 1

echo "=== [9] SPEED QUIZ ==="
SNAP
G=$(refOf 'تست برقی'); agent-browser click "$G" 2>&1 | tail -1; sleep 1
SNAP
S=$(refOf 'شروع مسابقه'); agent-browser click "$S" 2>&1 | tail -1; sleep 2
SNAP
grep -q 'کمبو' /tmp/ab-snap.txt && echo "OK speed combo badge" || echo "WARN speed combo"
Q=$(awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt)
echo "option: $Q"
agent-browser click "$Q" 2>&1 | tail -1; sleep 1
SNAP
grep -qE 'امتیاز' /tmp/ab-snap.txt && echo "OK speed score badge" || echo "WARN speed score"
agent-browser screenshot /tmp/qa-speed.png 2>&1 | tail -1

echo "=== [10] console ==="
agent-browser console 2>&1 | grep -iE "error|warn" | grep -v "DevTools" | head -8
echo "--- console end ---"

echo "=== [11] dev.log ==="
tail -40 dev.log | grep -iE "error|warn| 500 | 404 " | head -8
echo "--- log end ---"

agent-browser close 2>&1 | tail -1
pkill -f chrome-153 2>/dev/null || true
echo "QA DONE"
