# Task 1-a — data-and-components-refactor

## خلاصه
ریفکتور تک‌کتابی به چندکتابی: انتقال ۱۸ فایل داده به `src/data/vision-one/`، مونتاژ `VISION_ONE_BOOK` با قرارداد `BookData`، بازنویسی ۱۷ کامپوننت نما به `useBookData()`/`useBook()` و افزودن پارامتر `book` به همه فراخوانی‌های API سمت کلاینت.

## فایل‌های ایجادشده
- `src/data/vision-one/index.ts` — مونتاژ `VISION_ONE_BOOK` با `satisfies BookData` + ری‌اِکسپورت `BOOK_INFO`, `CHAPTERS`

## فایل‌های جابه‌جاشده (بدون تغییر محتوا — فقط importها)
۱۸ فایل از `src/data/` → `src/data/vision-one/`:
vocab.ts, vocab-lesson-1..4.ts, vocab-junior.ts, quiz-seed.ts, questions-vocab.ts, questions-vocab-2.ts, questions-vocab-3.ts, questions-grammar-lessons.ts, questions-grammar-comprehensive.ts, grammar.ts, readings.ts, conversations.ts, dictionary.ts, irregular-verbs.ts, book-meta.ts

## فایل‌های ویرایش‌شده
- `src/data/types.ts` — سه اینترفیس `GrammarExample`, `GrammarBlock`, `GrammarLesson` از grammar.ts به اینجا منتقل شد
- `src/data/books/types.ts` — import `GrammarLesson` از `"../grammar"` به `"../types"` (الزام compile — grammar.ts دیگر آن را اکسپورت نمی‌کند)
- `src/data/vision-one/grammar.ts` — حذف اینترفیس‌ها، import از `../types`، بقیه دست‌نخورده
- `src/data/vision-one/book-meta.ts` — حذف `ChapterMeta` محلی (از `../types`)، تایپ `BOOK_INFO: BookInfo`، حذف `BOOK_STATS` و ری‌اِکسپورت‌های READING_LIST/CONVERSATION_LIST/IRREGULAR_VERBS
- `src/data/vision-one/vocab.ts` — `VocabEntry` از `../types` import شد (تعریف محلی حذف)
- ۱۷ کامپوننت در `src/components/book/` (فهرست در worklog)

## نکات فنی برای عامل‌های بعدی
1. `useBookData()` خودِ `BookData` را برمی‌گرداند نه `{ data }` — الگوی صحیح: `const data = useBookData();`
2. نگاشت‌های جست‌وجوی word-lookup حالا per-book هستند (کش keyed به رفرنس آرایه‌های data) — هنگام افزودن کتاب جدید خودکار rebuild می‌شود.
3. دو خطای lint موجود از قبل در فایل‌های اورکستراتور است (react-hooks/set-state-in-effect در `src/app/page.tsx` خط ۳۵ و `src/lib/book-context.tsx` خط ۵۲) — طبق مأموریت دست‌نخورده ماند.
4. در quiz-game مقدار `bookId` با `String(bookId)` در query ست می‌شود؛ bodyهای POST `/api/attempts` و `/api/explain` و `/api/tutor` فیلد `book` دارند (شکل دقیق در worklog).
5. چند متن hardcoded کتاب‌محور به داده متصل/عمومی شد (فهرست در worklog — بخش انحرافات).
