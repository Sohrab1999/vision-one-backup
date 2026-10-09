#!/bin/bash
# Sequential VLM transcription with retries + per-call timeout (foreground, chunked)
cd /home/z/my-project/.tmp-pages
FILES="h1-044-LT h1-044-LB h1-044-RT h1-044-RB h1-045-LT h1-045-LB h1-045-RT h1-045-RB h2-077-LT h2-077-LB h2-077-RT h2-077-RB h2-078-LT h2-078-LB h2-078-RT h2-078-RB h2-079-LT h2-079-LB h2-079-RT h2-079-RB h2-080-LT h2-080-LB h2-080-RT h2-080-RB"
PROMPT='OCR task (verbatim transcription, no paraphrasing). The image shows part of a two-column vocabulary table from a Persian-English school textbook (پایه دهم). Each row = an English word cell + its Persian meaning cell. Transcribe EVERY row from top to bottom EXACTLY as printed. Output ONLY a JSON array like [{"w":"...","m":"..."},...] with no markdown fences and no commentary. Rules:
- "w" = English cell text exactly as printed, including any parenthetical notes printed in that cell (e.g. "close (v)", "knife (جمع آن: knives)", "child (جمع آن: children)", "(جمع آن: mouse)").
- "m" = Persian cell text exactly as printed. Copy character-by-character. Do NOT paraphrase, do NOT use synonyms, do NOT reorder words. Keep ، and - and ( ) and ZWNJ exactly as printed. If the cell spans two printed lines, join into one string in natural reading order.
- Do not skip rows, do not invent rows, do not merge rows, no numbering.
- If a second table/block appears lower in the image (e.g. titled سایر لغات کلیدی و تکمیلی), transcribe its rows too in the same array, and insert {"w":"---","m":"---"} between the two blocks.
- If a character is unreadable, give your best guess and append ?.'
for f in $FILES; do
  OUT="vlm-${f}.json"
  if [ -s "$OUT" ]; then echo "skip $f (exists)"; continue; fi
  ok=0
  for attempt in 1 2; do
    timeout 90 z-ai vision -p "$PROMPT" -i "./${f}.png" -o "$OUT" >/dev/null 2>"err-${f}.log"
    rc=$?
    if [ $rc -ne 0 ]; then echo "  ($f attempt $attempt rc=$rc)"; sleep 3; continue; fi
    if [ -s "$OUT" ] && python3 -c "import json; d=json.load(open('$OUT')); assert d['choices'][0]['message']['content']" 2>/dev/null; then
      ok=1; break
    fi
    echo "  ($f attempt $attempt: bad output)"; sleep 3
  done
  if [ $ok -eq 1 ]; then echo "OK $f"; else echo "FAIL $f"; fi
  sleep 1
done
echo "CHUNK DONE"
