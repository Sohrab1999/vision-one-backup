#!/bin/bash
# Driver: transcribe half-page images, with 429 backoff, foreground-resumable
cd /home/z/my-project/.tmp-pages
FILES="h1-044-F h1-044-G h1-045-F h1-045-G h2-077-F h2-077-G h2-078-F h2-078-G h2-079-F h2-079-G h2-080-F h2-080-G"
PROMPT='OCR task (verbatim transcription, no paraphrasing). The image shows one half of a page from a Persian-English school vocabulary table (پایه دهم): many rows, each row = an English word cell + a Persian meaning cell. The table runs the full height of the image. Transcribe EVERY row from top to bottom EXACTLY as printed. Output ONLY a JSON array like [{"w":"...","m":"..."},...] with no markdown fences and no commentary. Rules:
- "w" = English cell text exactly as printed, including any parenthetical notes printed inside that same cell (e.g. "close (v)", "knife (جمع آن: knives)", "child (جمع آن: children)", "(جمع آن: mouse)").
- "m" = Persian cell text exactly as printed. Copy character-by-character. Do NOT paraphrase, do NOT use synonyms, do NOT reorder words. Keep ، and - and ( ) and ZWNJ exactly as printed. If the cell spans two printed lines, join into one string in natural reading order.
- Do not skip rows, do not invent rows, do not merge rows, no numbering.
- If a second table/block appears lower in the image (e.g. titled سایر لغات کلیدی و تکمیلی), transcribe its rows too in the same array, and insert {"w":"---","m":"---"} between the blocks.
- Skip page titles, column headers and page footers (تألیف، Vision One, Telegram Channel).
- If a character is unreadable, give your best guess and append ?.'
for f in $FILES; do
  OUT="vlm-${f}.json"
  if [ -s "$OUT" ]; then echo "skip $f (exists)"; continue; fi
  ok=0
  for attempt in 1 2 3 4 5 6; do
    timeout 100 z-ai vision -p "$PROMPT" -i "./${f}.png" -o "$OUT" >/dev/null 2>"err-${f}.log"
    rc=$?
    if [ $rc -ne 0 ]; then
      echo "  ($f attempt $attempt rc=$rc — backing off)"; sleep 45; continue
    fi
    if [ -s "$OUT" ] && python3 -c "import json; d=json.load(open('$OUT')); assert d['choices'][0]['message']['content']" 2>/dev/null; then
      ok=1; echo "OK $f"; break
    fi
    echo "  ($f attempt $attempt: bad output)"; sleep 10
  done
  [ $ok -eq 0 ] && echo "FAIL $f"
  sleep 15
done
echo "HALVES DONE"
