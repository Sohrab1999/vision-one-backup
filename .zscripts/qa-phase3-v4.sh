#!/bin/bash
# QA فاز ۳ — نسخه ۴: راند کامل تست برقی ۳۰ ثانیه‌ای + تأیید Attempt در سرور
export AGENT_BROWSER_SESSION=v1qa5
cd /home/z/my-project

SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }
SNAPFULL() { agent-browser snapshot 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-full.txt; }
refOf() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt; }
# گزینه واقعی: بزرگ‌ترین شماره ref بین دکمه‌های لاتین (گزینه‌ها ته درخت‌اند، DevTools اول)
optRef() { awk 'match($0, /- button "[A-Za-z]/) { if (match($0, /ref=e[0-9]+/)) { n=substr($0, RSTART+4, RLENGTH-4); if (n+0 > max) max = n+0 } } END { if (max) print "@" max }' /tmp/ab-snap.txt; }

agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4
SNAP; B=$(refOf 'ورود به ویژن وان'); agent-browser click "$B" >/dev/null 2>&1; sleep 3
SNAP; N=$(refOf 'button "بازیها"'); agent-browser click "$N" >/dev/null 2>&1; sleep 2
SNAP; G=$(refOf 'تست برقی'); agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAP; D=$(refOf '۳۰ ثانیه'); echo "chip30: $D"; agent-browser click "$D" >/dev/null 2>&1; sleep 0.5
SNAP; S=$(refOf 'شروع مسابقه'); agent-browser click "$S" >/dev/null 2>&1; echo "started"

# ۲۵ ثانیه پاسخ پیاپی به گزینه درست‌نما (بزرگ‌ترین ref هر بار)
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  sleep 2
  SNAP
  O=$(optRef)
  agent-browser click "$O" >/dev/null 2>&1
done
SNAPFULL
grep -oE 'سؤال [۰-۹]+' /tmp/ab-full.txt | tail -1
grep -oE '[۰-۹]+ امتیاز' /tmp/ab-full.txt | tail -1
grep -oE 'کمبو ×[۰-۹]' /tmp/ab-full.txt | tail -1
echo "--- waiting for timer end ---"
sleep 18
SNAPFULL
grep -q 'زمان تمام شد' /tmp/ab-full.txt && echo "OK end screen" || echo "WARN no end screen"
grep -qE 'اسطوره|تندباد|چابک|تازهکار|تازه\u200cکار' /tmp/ab-full.txt && echo "OK rank shown" || echo "WARN rank"
grep -oE 'دقت [۰-۹]+٪|دقت: [۰-۹]+٪' /tmp/ab-full.txt | tail -1
agent-browser screenshot /tmp/qa-speed-final.png 2>&1 | tail -1

echo "=== attempts in DB? ==="
curl -s "http://127.0.0.1:3000/api/attempts?book=vision-one" | python3 -c "
import json, sys
d = json.load(sys.stdin)
rows = d.get('attempts') or d.get('rows') or d
if isinstance(rows, dict): print('keys:', list(d.keys()))
else:
    games = [r for r in rows if r.get('category') == 'speed-quiz']
    print('total attempts:', len(rows), '| speed-quiz attempts:', len(games))
    for r in games[-3:]: print(r.get('category'), r.get('total'), r.get('correct'), r.get('duration'))
"
agent-browser close >/dev/null 2>&1
pkill -f chrome-153 2>/dev/null || true
echo "QA4 DONE"
