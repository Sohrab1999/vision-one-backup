#!/usr/bin/env bash
# G5-02 — تست زندهٔ /api/game-questions (یک نشست: سرور + همهٔ تست‌ها)
set -u
cd /home/z/my-project

# سرور توسعه — اگر گوش نمی‌دهد، راه‌اندازی کن
if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:3000/api/health; then
  setsid nohup bun run dev </dev/null > /tmp/devserver.out 2>&1 &
  disown
  for i in $(seq 1 40); do
    sleep 2
    curl -s -o /dev/null --max-time 3 http://127.0.0.1:3000/api/health && { echo "server READY (poll $i)"; break; }
  done
fi

REAL='{"game":"%s","count":%s,"pool":[{"word":"forest","meaning":"جنگل"},{"word":"danger","meaning":"خطر"},{"word":"air","meaning":"هوا، جو"},{"word":"alive","meaning":"زنده"},{"word":"bird","meaning":"پرنده"}]}'

echo "== 1) cloze + پول واقعی ۵ واژه =="
printf "$REAL" cloze 3 > /tmp/gq_body1.json
curl -s -o /tmp/gq_out1.json -w "HTTP %{http_code} in %{time_total}s\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" --data-binary @/tmp/gq_body1.json
cat /tmp/gq_out1.json; echo

echo "== 2) speed-quiz + پول واقعی (count=2) =="
printf "$REAL" speed-quiz 2 > /tmp/gq_body2.json
curl -s -o /tmp/gq_out2.json -w "HTTP %{http_code} in %{time_total}s\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" --data-binary @/tmp/gq_body2.json
cat /tmp/gq_out2.json; echo

echo "== 3) تله — پول ۴ واژهٔ جعلی بی‌ربط =="
curl -s -o /tmp/gq_out3.json -w "HTTP %{http_code} in %{time_total}s\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"speed-quiz","pool":[{"word":"zzq1","meaning":"test1"},{"word":"zzq2","meaning":"test2"},{"word":"zzq3","meaning":"test3"},{"word":"zzq4","meaning":"test4"}]}'
cat /tmp/gq_out3.json; echo

echo "== 4) بدنهٔ بد: game نامعتبر (400 انتظار) =="
curl -s -w "\nHTTP %{http_code}\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"wordle","pool":[{"word":"a","meaning":"b"},{"word":"c","meaning":"d"},{"word":"e","meaning":"f"},{"word":"g","meaning":"h"}]}'

echo "== 5) بدنهٔ بد: pool ۳ عضوی (400 انتظار) =="
curl -s -w "\nHTTP %{http_code}\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"cloze","pool":[{"word":"a","meaning":"b"},{"word":"c","meaning":"d"},{"word":"e","meaning":"f"}]}'

echo "== 6) بدنهٔ بد: count=9 (400 انتظار) =="
curl -s -w "\nHTTP %{http_code}\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"cloze","count":9,"pool":[{"word":"a","meaning":"b"},{"word":"c","meaning":"d"},{"word":"e","meaning":"f"},{"word":"g","meaning":"h"}]}'

echo "== 7) بدنهٔ بد: عضو بدون meaning (400 انتظار) =="
curl -s -w "\nHTTP %{http_code}\n" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"cloze","pool":[{"word":"a","meaning":"b"},{"word":"c","meaning":""},{"word":"e","meaning":"f"},{"word":"g","meaning":"h"}]}'

echo "== 8) 429 — انفجار درخواست تا سقف ۱۰ در دقیقه =="
for i in 8 9 10 11 12; do
  code=$(curl -s -o /tmp/gq_burst.json -w "%{http_code}" -X POST http://127.0.0.1:3000/api/game-questions -H "Content-Type: application/json" -d '{"game":"cloze","pool":[{"word":"a","meaning":"b"},{"word":"c","meaning":"d"},{"word":"e","meaning":"f"},{"word":"g","meaning":"h"}]}')
  echo "request #$i -> HTTP $code"
  if [ "$code" = "429" ]; then cat /tmp/gq_burst.json; echo; break; fi
done

echo "== سلامت سرور بعد از تست‌ها =="
curl -s -o /dev/null -w "health: HTTP %{http_code}\n" http://127.0.0.1:3000/api/health
