# شواهد بازیابی ۴۹ — ۲۰۲۶-۱۱-۲۶ (الگوی ۳۱..۴۸ — ریست پنهان ۴۹م — صفرتلفاتی)

## ۱) وضعیت کشف‌شده در آغاز نشست (پیشا-گام A1-PRI-S07)

- HEAD محلی = `193269b` (ثبت اثبات O6 — دورهٔ ۲۰۲۶-۱۱-۰۸) درحالی‌که SNAPSHOT سربرگ ۱۴۰مین ورود S06 را با «HEAD آغاز = `ef6b0e2` = ریموت» ثبت کرده بود ⇒ **ریست پنهان ۴۹م** (الگوی ۳۱..۴۸ — نهمین تکرار همین الگوی بازسازی sandbox).
- `git cat-file -t ef6b0e2` ⇒ **fatal: Not a valid object name** — شیء کامیت‌های پسا-O6 اصلاً در مخزن محلی موجود نبود ⇒ .git محلی نسخهٔ قدیمی است، نه درخت خراب.
- وضعیت working tree: ۳۲ modified + **۴۱۶ untracked** (۱۹۷ qa-shots · ۱۲۹ docs · ۴۳ scripts · ۱۶ نقشه راه ها · ۱۳ src · ۱۰ upload · ۶ prisma · ۱ public · ۱ STALE-marker) + `db/custom.db` modified.
- Remote backup/main = `43c862d` = «ثبت اثبات §۱۰-۷ گام A1-PRI-S06» روی `a41448b` (محتوایی S06) روی `ef6b0e2` (ثبت اثبات S05) ⇒ تمام کار S06 روی ریموت امن است.

## ۲) اثبات صفر محتوای محلی-یگانه (بدون بیمه stash — مطابق بازیابی ۴۶)

- `git fetch backup` — ایمن (فقط شیء)، سپس `git diff backup/main --stat` ⇒ ۲۰۳۹ فایل/۷۱۲,۹۰۹ خط «حذف» = فقط فایل‌های پسا-193269b که در index محلی (درخت 193269b) نیستند و به‌صورت untracked روی دیسک هستند.
- `git add -A` (فقط index) ⇒ `git diff --cached backup/main` ⇒ **فقط یک فایل**: `نقشه راه ها/نقشه-راه-چند-جزوه-ای.md` — `old mode 100644 → new mode 100755` — **صفر خط تفاوت محتوا** (آرتیفکت filesystem بازسازی sandbox).
- نتیجه: درخت دیسک (tracked+untracked) **بایت‌به‌بیت == درخت backup/main** — صفر محتوای محلی-یگانه — LOCAL-ONLY=۰ — deleted=۰ — differ=۰.
- `db/custom.db` — `git diff backup/main -- db/custom.db` ⇒ خالی (بایت‌به‌بیت == ریموت).

## ۳) رسیدگی صفرتلفاتی (بدون بازنویسی working tree)

1. `chmod 644 "نقشه راه ها/نقشه-راه-چند-جزوه-ای.md"` — نرمال‌سازی bit مجوز به وضعیت ریموت.
2. `git reset backup/main` (**mixed** — فقط HEAD+index؛ هرگز working tree را دست نمی‌زند).
3. نتیجه پسا-رسیدگی:
   - `git status --porcelain | wc -l` ⇒ **۰** (کاملاً پاک)
   - HEAD = `43c862d` — `git log --oneline -2` ⇒ `43c862d` (ثبت اثبات S06) / `a41448b` (محتوایی S06)
   - `git ls-remote backup refs/heads/main` ⇒ `43c862df07856d8b3b3d85faae9c71e86f1e7cfb` == `git rev-parse HEAD` **بایت‌به‌بیت**
   - هوک post-commit سالم: sha256 = `ee679bc1b642db0f…` == رکورد `ee679bc1…`
- صفر rebase · صفر force-push · صفر ازدست‌رفتن محتوا · صفر stash بیمه (چون صفر محتوای محلی-یگانه اثبات شد — عین منطق بازیابی ۴۶).

## ۴) دیسک‌حقیقت پسا-بازیابی (پیشا-گام S07)

- `docs/qa/tyv-capture-biz/a1` = ۹۸ فایل (page-001..098)
- `docs/qa/tyv-capture-elem/a1` = ۹۶ فایل (page-001..096)
- `docs/qa/tyv-capture-pri/a1` = ۷۲ فایل (page-001..072 — شامل پراب‌های ۷/۱۰/۴۱)
- `docs/qa/tyv-capture-upp/a1` = ۳ فایل (page-009/011/045 — پراب)
- جمع = **۲۶۹/۴۸۹** == رکورد SNAPSHOT سربرگ ۱۴۰مین — دقیق.
- وجودسنجی پیشا-گام: `page-073.json..page-084.json` همگی غایب (دقیق پیشا-اجرای S07).
- گام بعدی مجاز SNAPSHOT == عین فرمان مالک == **A1-PRI-S07** ⇒ مجاز به اجرا.

## ۵) جمع‌بندی

بازیابی ۴۹ صفرتلفاتی انجام شد: صفر تغییر محتوایی، صفر ریسک تلفات، HEAD یک‌دست با ریموت، دیسک‌حقیقت == رکورد پایدار. الگوی «HEAD بازگشته `193269b` + درخت پسا-گام روی دیسک» اکنون ۹ بار (۳۱..۳۴ و ۳۶..۴۹ — ۱۹ بار با احتساب همهٔ شماره‌ها) تکرار شده و رسیدگی استاندارد آن (fetch → add -A → diff --cached == remote → chmod در صورت دلتای mode → reset mixed → اثبات ls-remote) عیناً همان مسیر اثبات‌شدهٔ بازیابی ۴۶/۴۷/۴۸ است.
