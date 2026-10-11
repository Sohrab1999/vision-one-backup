#!/bin/bash
# G6-01 — ماتریس QA مرورگری ۱۵ بازی × ۲ پرسپکتیو + INP (G6-02)
# خروجی: tool-results/g6-matrix-<vp>.jsonl + اسکرین‌شات‌های tool-results/g6-*.png
VP=$1   # "desktop" یا "mobile"
W=$2    # 1280 | 390
H=$3    # 800 | 844
OUT="tool-results/g6-matrix-$VP.jsonl"
: > "$OUT"

games=("تطبیق حافظه" "حروف جابه‌جا" "جای خالی" "شکار کلمه" "تست برقی" "فلپی گزینش" "مار و پله واژگانی" "جدول متقاطع" "وردل ویژن" "دارباز" "سازنده جمله" "دوئل دونفره" "شکار صدا" "نقشه ماجراجویی" "شوتر آموزشی")
keys=("memory" "scramble" "cloze" "word-search" "speed-quiz" "flappy-quiz" "snakes-ladders" "crossword" "wordle" "hangman" "sentence-builder" "duel" "listening-hunt" "adventure-map" "fps-shooter")

agent-browser set viewport $W $H > /dev/null 2>&1
agent-browser open "http://localhost:3000/" > /dev/null 2>&1
sleep 3
# رفتن به هاب بازی‌ها
agent-browser eval "(()=>{const n=[...document.querySelectorAll('nav button')].filter(x=>x.textContent.trim()==='بازی‌ها').pop(); n?.click(); return 1})()" > /dev/null 2>&1
sleep 2
ERRBASE=$(agent-browser errors 2>&1 | wc -l)

for i in "${!games[@]}"; do
  g="${games[$i]}"; k="${keys[$i]}"
  # تزریق اندازه‌گیر INP
  agent-browser eval "window.__inp=[]; try{ new PerformanceObserver(l=>{for(const e of l.getEntries()) window.__inp.push(Math.round(e.duration))}).observe({type:'event',buffered:true,durationThreshold:16}) }catch(e){}" > /dev/null 2>&1
  # باز کردن تایل بازی
  agent-browser eval "(()=>{const t=[...document.querySelectorAll('main button')].find(x=>x.textContent.includes('$g')); t?.click(); return !!t})()" > /dev/null 2>&1
  sleep 2.2
  # بستن اورلی آموزش اگر باز است
  agent-browser eval "(()=>{const d=document.querySelector('[role=dialog]'); if(!d) return 0; const skip=[...d.querySelectorAll('button')].find(b=>b.textContent.includes('رد کردن')||b.textContent.trim()==='Close'); skip?.click(); return 1})()" > /dev/null 2>&1
  sleep 0.8
  # شروع دور اگر دکمهٔ شروع دارد (دوئل لابی می‌ماند)
  agent-browser eval "(()=>{const s=[...document.querySelectorAll('main button')].find(x=>/^شروع/.test(x.textContent.trim())); s?.click(); return !!s})()" > /dev/null 2>&1
  sleep 2.5
  # اندازه‌گیری‌ها
  R=$(agent-browser eval "(()=>{const de=document.documentElement; const overflow=(de.scrollWidth>window.innerWidth+1)||document.body.scrollWidth>window.innerWidth+1; const inp=window.__inp||[]; const inpMax=inp.length?Math.max(...inp):0; const inpN=inp.length; const hasShell=!!document.querySelector('[role=group][aria-label*=بازی]'); const dialog=!!document.querySelector('[role=dialog]'); return JSON.stringify({overflow, sw:de.scrollWidth, iw:window.innerWidth, inpMax, inpN, hasShell, dialog})})()" 2>&1 | tail -1)
  agent-browser screenshot "tool-results/g6-$VP-$k.png" > /dev/null 2>&1
  ERRNOW=$(agent-browser errors 2>&1 | wc -l)
  ERRD=$((ERRNOW-ERRBASE)); ERRBASE=$ERRNOW
  echo "{\"vp\":\"$VP\",\"key\":\"$k\",\"result\":$R,\"newErrors\":$ERRD}" >> "$OUT"
  echo "[$VP] $k → $R errs+$ERRD"
  # بازگشت به هاب با ری‌لوید تمیز
  agent-browser open "http://localhost:3000/" > /dev/null 2>&1
  sleep 2.2
  agent-browser eval "(()=>{const n=[...document.querySelectorAll('nav button')].filter(x=>x.textContent.trim()==='بازی‌ها').pop(); n?.click(); return 1})()" > /dev/null 2>&1
  sleep 1.6
done
echo "=== DONE $VP ==="
