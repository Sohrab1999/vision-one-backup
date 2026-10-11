#!/bin/bash
# احیای سرور توسعه اگر مرده است — الگوی مقابله با کشتن پراسس‌های پس‌زمینه بین فراخوانی‌ها
PORT_OK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 4)
if [ "$PORT_OK" = "200" ]; then
  echo "server-alive"
  exit 0
fi
# مرورگرهای باقی‌مانده را ببند تا حافظه برای کامپایل آزاد شود
pkill -f chrome 2>/dev/null
sleep 1
cd /home/z/my-project
setsid nohup bunx next dev -p 3000 >> dev.log 2>&1 &
disown
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  sleep 5
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 8)
  if [ "$CODE" = "200" ]; then
    echo "revived-after-${i}x5s"
    exit 0
  fi
done
echo "revive-failed"
exit 1
