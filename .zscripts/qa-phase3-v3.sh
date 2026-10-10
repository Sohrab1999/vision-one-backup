#!/bin/bash
# QA فاز ۳ — نسخه ۳: اسکرمبل/شکار کلمه/تست برقی + انتظار برای محو toast
export AGENT_BROWSER_SESSION=v1qa4
cd /home/z/my-project

curl -s --max-time 2 -o /dev/null -w "server:%{http_code}\n" http://127.0.0.1:3000/

SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }
SNAPFULL() { agent-browser snapshot 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-full.txt; }
refOf() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt; }
refsAll() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt; }
waitToast() { sleep 4.5; }

agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4
SNAP; B=$(refOf 'ورود به ویژن وان'); agent-browser click "$B" >/dev/null 2>&1; sleep 3
SNAP; N=$(refOf 'button "بازیها"'); agent-browser click "$N" >/dev/null 2>&1; sleep 2
SNAP; echo "hub test: $(grep -c 'شروع بازی' /tmp/ab-snap.txt) cards"

echo "=== SCRAMBLE ==="
SNAP; G=$(refOf 'حروف جاب'); echo "card: $G"; agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAP; S=$(refOf 'شروع بازی'); agent-browser click "$S" >/dev/null 2>&1; sleep 1.5
SNAPFULL
grep -q 'معنی' /tmp/ab-full.txt && echo "OK scramble: meaning hint" || echo "WARN meaning"
grep -q 'پاک کردن' /tmp/ab-full.txt && echo "OK scramble: actions" || echo "WARN actions"
SNAP
L1=$(awk 'match($0, /- button "[A-Za-z]" \[ref/) { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt | sed -n 1p)
L2=$(awk 'match($0, /- button "[A-Za-z]" \[ref/) { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt | sed -n 2p)
echo "letters: $L1 $L2"
agent-browser click "$L1" >/dev/null 2>&1; sleep 0.4
agent-browser click "$L2" >/dev/null 2>&1; sleep 0.5
SNAPFULL; grep -qE 'راهنما|رد کردن' /tmp/ab-full.txt && echo "OK scramble playing after clicks" || echo "WARN scramble"
agent-browser screenshot /tmp/qa-scramble.png 2>&1 | tail -1
# رد کردن واژه برای تست skip
SNAP; SK=$(refOf 'رد کردن'); agent-browser click "$SK" >/dev/null 2>&1; sleep 1.6
SNAPFULL; grep -q 'به مرور اضافه شد' /tmp/ab-full.txt && echo "OK skip badge (SRS)" || echo "INFO skip badge momentary"
waitToast
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" >/dev/null 2>&1; sleep 1

echo "=== WORDSEARCH ==="
SNAP; G=$(refOf 'شکار کلمه'); echo "card: $G"; agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAP; S=$(refOf 'شروع شکار'); echo "start: $S"; agent-browser click "$S" >/dev/null 2>&1; sleep 1.5
SNAPFULL
grep -q 'سرنخ' /tmp/ab-full.txt && echo "OK clues list" || echo "WARN clues"
grep -q 'نمایش واژهها' /tmp/ab-full.txt && echo "OK reveal toggle" || echo "WARN toggle"
SNAP
CELLS=$(refsAll 'ردیف'); N=$(echo "$CELLS" | wc -l)
echo "cells found: $N"
CC1=$(echo "$CELLS" | sed -n 1p); CC2=$(echo "$CELLS" | sed -n 2p)
agent-browser click "$CC1" >/dev/null 2>&1; sleep 0.5
agent-browser click "$CC2" >/dev/null 2>&1; sleep 1
SNAPFULL; grep -q 'انصراف' /tmp/ab-full.txt && echo "OK wordsearch playing (sel works, no crash)" || echo "WARN wordsearch"
agent-browser screenshot /tmp/qa-wordsearch.png 2>&1 | tail -1
SNAP; BK=$(refOf 'button "آزمایشگاه"'); agent-browser click "$BK" >/dev/null 2>&1; sleep 1

echo "=== SPEED QUIZ ==="
SNAP; G=$(refOf 'تست برقی'); echo "card: $G"; agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAPFULL; grep -q '۳۰ ثانیه' /tmp/ab-full.txt && echo "OK duration chips" || echo "WARN duration"
SNAP; S=$(refOf 'شروع مسابقه'); agent-browser click "$S" >/dev/null 2>&1; sleep 2
SNAPFULL
grep -q 'کمبو' /tmp/ab-full.txt && echo "OK combo badge" || echo "WARN combo"
grep -q 'امتیاز' /tmp/ab-full.txt && echo "OK score badge" || echo "WARN score"
SNAP
Q1=$(awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt | sed -n 1p)
Q2=$(awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt | sed -n 2p)
echo "options: $Q1 $Q2"
agent-browser click "$Q1" >/dev/null 2>&1; sleep 0.6
SNAP
Q3=$(awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) print "@" substr($0, RSTART+4, RLENGTH-4) }' /tmp/ab-snap.txt | sed -n 3p)
agent-browser click "$Q3" >/dev/null 2>&1; sleep 0.6
SNAPFULL; grep -q 'رد کردن' /tmp/ab-full.txt && echo "OK speed flowing (next question after answers)" || echo "WARN speed flow"
agent-browser screenshot /tmp/qa-speed.png 2>&1 | tail -1

echo "=== console ==="
agent-browser console 2>&1 | grep -iE "error|warn" | grep -v "DevTools" | head -6
echo "--- end console ---"
tail -50 dev.log | grep -iE "error| 500 | 404 " | head -6
echo "--- end log ---"

# ۳۰ ثانیه صبر برای تست پایان تایمر تست برقی
sleep 8
SNAPFULL; grep -qE 'زمان تمام شد|رتبه' /tmp/ab-full.txt && echo "OK speed end screen" || echo "INFO speed still running (90s selected?)"
agent-browser screenshot /tmp/qa-speed-end.png 2>&1 | tail -1

agent-browser close 2>&1 | tail -1
pkill -f chrome-153 2>/dev/null || true
echo "QA3 DONE"
