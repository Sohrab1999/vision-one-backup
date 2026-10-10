#!/bin/bash
# QA فاز ۳ — نسخه ۵: کلیک CSS مستقیم روی گزینه‌های تست برقی
export AGENT_BROWSER_SESSION=v1qa6
cd /home/z/my-project

SNAP() { agent-browser snapshot -i 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-snap.txt; }
SNAPFULL() { agent-browser snapshot 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-full.txt; }
refOf() { awk -v pat="$1" '$0 ~ pat { if (match($0, /ref=e[0-9]+/)) { print "@" substr($0, RSTART+4, RLENGTH-4); exit } }' /tmp/ab-snap.txt; }

agent-browser open http://127.0.0.1:3000/ 2>&1 | tail -1
sleep 4
SNAP; B=$(refOf 'ورود به ویژن وان'); agent-browser click "$B" >/dev/null 2>&1; sleep 3
SNAP; N=$(refOf 'button "بازیها"'); agent-browser click "$N" >/dev/null 2>&1; sleep 2
SNAP; G=$(refOf 'تست برقی'); agent-browser click "$G" >/dev/null 2>&1; sleep 1
SNAP; D=$(refOf '۳۰ ثانیه'); agent-browser click "$D" >/dev/null 2>&1; sleep 0.5
SNAP; S=$(refOf 'شروع مسابقه'); agent-browser click "$S" >/dev/null 2>&1; echo "started"

# 12 پاسخ پیاپی با سلکتور CSS روی دکمه‌های گزینه (min-h-12)
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  sleep 1.8
  agent-browser click 'button[class*="min-h-12"]' >/dev/null 2>&1
done
SNAPFULL
python3 - << 'PY'
import re, io
c = io.open('/tmp/ab-full.txt', encoding='utf-8').read()
for pat in [r'سؤال [۰-۹]+', r'[۰-۹]+ امتیاز', r'کمبو ×[۰-۹]']:
    m = re.findall(pat, c)
    print(pat, '->', m[-1] if m else 'NONE')
PY
echo "--- wait for end ---"
sleep 16
SNAPFULL
grep -q 'زمان تمام شد' /tmp/ab-full.txt && echo "OK end screen" || echo "WARN end screen"
python3 - << 'PY'
import re, io
c = io.open('/tmp/ab-full.txt', encoding='utf-8').read()
m = re.findall(r'[۰-۹]+', ''.join(re.findall(r'امتیاز این دور[^\n]*', c)))
print('score line:', re.findall(r'امتیاز این دور', c))
r = re.findall(r'(اسطورهٔ برق|تندباد|چابک|تازه\u200cکار)', c)
print('rank:', r)
PY
agent-browser screenshot /tmp/qa-speed-final2.png 2>&1 | tail -1

echo "=== DB attempt ==="
curl -s "http://127.0.0.1:3000/api/attempts?book=vision-one" | python3 -c "
import json, sys
d = json.load(sys.stdin)
games = [r for r in d.get('recent', []) if r.get('category') == 'speed-quiz']
print('speed-quiz attempts:', len(games))
for r in games[-2:]: print(r)
"
# رکورد روی کارت هاب؟
SNAP; agent-browser snapshot 2>&1 | sed 's/\xe2\x80\x8c//g' > /tmp/ab-full.txt
python3 - << 'PY'
import re, io
c = io.open('/tmp/ab-full.txt', encoding='utf-8').read()
m = re.findall(r'بهترین امتیاز: [۰-۹]+', c)
print('hub record badge:', m[:2] if m else 'NONE')
PY
agent-browser close >/dev/null 2>&1
pkill -f chrome-153 2>/dev/null || true
echo "QA5 DONE"
