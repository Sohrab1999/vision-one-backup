#!/usr/bin/env bash
# چرخش dev.log با الگوی copytruncate — پیش‌نیاز K1/K2 داشبورد (docs/games-kpi.md).
# `next dev ... | tee dev.log` با O_APPEND می‌نویسد، پس truncate کردن فایل زنده امن است
# و تاریخچه در آرشیو فشرده حفظ می‌شود. آخرین ۷ آرشیو نگه داشته می‌شود.
#
# استفاده:  bash scripts/rotate-devlog.sh   (یا: bun run log:rotate)
set -euo pipefail
cd "$(dirname "$0")/.."

LOG=dev.log
if [ ! -f "$LOG" ]; then
  echo "no $LOG — skip"
  exit 0
fi

SIZE=$(stat -c%s "$LOG")
if [ "$SIZE" -lt 1024 ]; then
  echo "tiny ($SIZE B) — skip"
  exit 0
fi

STAMP=$(date +%F-%H%M%S)
cp "$LOG" "$LOG.$STAMP.log"
gzip -f "$LOG.$STAMP.log"
: > "$LOG"

# هرس — نگه‌داری ۷ آرشیو آخر
ls -1t "$LOG".*.log.gz 2>/dev/null | tail -n +8 | xargs -r rm -f

echo "rotated: $LOG.$STAMP.log.gz ($SIZE B)"
