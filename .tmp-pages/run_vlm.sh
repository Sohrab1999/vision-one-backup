#!/bin/bash
# Transcribe one quadrant image with z-ai vision CLI
cd /home/z/my-project/.tmp-pages
f="$1"
PROMPT='OCR task (verbatim transcription, no paraphrasing). The image shows part of a two-column vocabulary table from a Persian-English school textbook (پایه دهم). Each row = an English word cell + its Persian meaning cell. Transcribe EVERY row from top to bottom EXACTLY as printed. Output ONLY a JSON array like [{"w":"...","m":"..."},...] with no markdown fences and no commentary. Rules:
- "w" = English cell text exactly as printed, including any parenthetical notes printed in that cell (e.g. "close (v)", "knife (جمع آن: knives)", "child (جمع آن: children)", "(جمع آن: mouse)").
- "m" = Persian cell text exactly as printed. Copy character-by-character. Do NOT paraphrase, do NOT use synonyms, do NOT reorder words. Keep ، and - and ( ) and ZWNJ exactly as printed. If the cell spans two printed lines, join into one string in natural reading order.
- Do not skip rows, do not invent rows, do not merge rows, no numbering.
- If a second table/block appears lower in the image (e.g. titled سایر لغات کلیدی و تکمیلی), transcribe its rows too in the same array, and insert {"w":"---","m":"---"} between the two blocks.
- If a character is unreadable, give your best guess and append ?.'
z-ai vision -p "$PROMPT" -i "./${f}.png" -o "vlm-${f}.json" >/dev/null 2>&1
echo "done ${f}"
