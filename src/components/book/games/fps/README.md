# بازی شوتر آموزشی اول‌شخص (`games/fps/`)

> **قواعد طلایی این پوشه در `docs/adr/ADR-001-fps-bridge-pattern.md` مستند است — قبل از تغییر فیزیک/صحنه بخوان.**
> خلاصه: جهش `SceneBridge` فقط در توابع ماژول‌سطح (`physics.ts` و `scene/input.tsx`)؛
> کامپوننت‌های R3F فقط می‌خوانند.

## نقشهٔ ماژول‌ها (بعد از refactor گام ۳ سند refactor-roadmap + گام ۵ سند refactor-roadmap-2)

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۲,۵۲۴ | `FpsShooterGame`: ارکستراسیون — موتور مأموریت (موج/HVT/Attempt/پایان + تریگر و مراحل رئیس U4) + صدای میدان U5 (پن گذارهای FSM/قفس/رئیس در interval رویدادگسسته) + Canvas و ترکیب صحنه + سیم‌کشی HUD + نتیجه؛ تنها فایل دارای state موتور |
| `setup-panel.tsx` | ~۶۴۲ | پنل setup (presentational): حالت/سلاح/نقشه/درس/دشواری/کیفیت/گزینه‌های نگاه + سوییچ صدای میدان (U5) + آموزش (`TUTORIAL_STEPS` — ۹ گام شامل پناهگاه U3 و رئیس U4) — props هم‌نام از index |
| `audio.ts` | ~۲۰۷ | **موتور «هوش صوتی میدان» (U5-00 — خالص)**: `fieldPan(srcX,srcZ,px,pz,yaw)` — پن ±۰٫۸۵ و گین ۰٫۳۵..۱ از هندسهٔ yaw (جلو = (−sin yaw, −cos yaw)، راست = (cos yaw, −sin yaw)) + `FIELD_RECIPES` ۱۰ افکت سنتزی (detected/charge/throw/lost/retreat/thud/cageDown/bossWarn/shieldBreak/bossDown) + `playFieldSound` با دو گیت بی‌صدا (کلید سراسری کیت + کلید ADR-003) و StereoPanner با فال‌بک بدون پنر + `setFieldSfxEnabled` — صفر وابستگی React/THREE؛ فقط رویداد گسسته |
| `chain.ts` | ~۵۸ | موتور تصمیم خالص «جملهٔ زنجیره‌ای» (F10-ب): `chainResolve`/`chainVolleyPick`/`chainExpectedTargetId` — بدون اثر جانبی؛ اثرها در index |
| `boss.ts` | ~۱۵۱ | هستهٔ خالص «رئیس واژه» (U4-00): `createBossState`/`stepBoss` (سرگردانی خطی رفت‌وبرگشتی + چرخهٔ شارژ تله‌گراف→پرتاب قفس + cd در فریم‌های FSM) + `bossInterrupt` (لغو شارژ با شلیک) + ثابت‌ها (`BOSS_WAVE=4`/`BOSS_STAGES=3`/`BOSS_TIME_MULT=1.5` + cd/شارژ بر حسب دشواری + `bossSpeedMult` — آسان=۰، تپ=نصف) — صفر وابستگی React/THREE؛ جهش in-place |
| `cage.ts` | ~۱۱۵ | هستهٔ خالص «قفس واژه» (U2-00): `createCageState`/`stepCage` (رویداد none/hit/whiff)/`cageEta` — پرواز خطی قابل پیش‌بینی به نقطهٔ پرتاب؛ صفر وابستگی React/THREE |
| `enemy.ts` | ~۲۵۶ | موتور FSM خالص «پهپاد تعقیب‌گر» (U1/U2/U3): `patrol → stalk → charge → flee` + `throwCd` + LOS-aware (`lostT`/`justLost`/`ENEMY_LOST_S`) — `stepEnemy`/`createEnemyState`/`enemyFlee`/`enemyReturnToOrbit`/`enemySpeedMult`/`enemyChargeS`/`enemyThrowCd`/`enemyLostS` — صفر وابستگی به React/THREE؛ جهش in-place |
| `los.ts` | ~۹۸ | هستهٔ خالص «خط دید» (U3-00): `hasLineOfSight` — تست slab پاره‌خط↔AABB روی جعبه‌های چیدمان (ردِ دکور `solid:false` و جعبهٔ حاوی مبدأ) — نه THREE.Raycaster؛ تخصیص صفر، فراخوانی هر فریم از scene/drone |
| `use-fps-prefs.ts` | ~۱۵۲ | هوک ترجیحات ماندگار: mode/quality/sens/fov/invert/map/weapon/difficulty + صدای میدان (U5) + setterهای ماندگار (فقط از طریق `prefs.ts`) |
| `hud-question.tsx` | ~۱۱۷ | کارت سؤال روی HUD (presentational): متن سؤال + جملهٔ زنجیره با جای‌خالی‌های پُرشونده + پخش دوبارهٔ شنیداری + نوار زمان + شمارندهٔ HVT |
| `constants.ts` | ~۱۲۲ | ثابت‌های تنظیمی: لِین‌ها، کمبو، موج/فرار/طلایی، حرکت (ACCEL/JUMP/…)، اسکوپ، کیفیت، `Difficulty` + `DIFFICULTY_KEY` (U1-00) |
| `maps.ts` | ~۱۵۷ | `MapId`/`MapConfig`/`MAPS` — پالت کامل ۴ نقشه (جنگل/کویر/شب/دروازهٔ دو در) |
| `layouts.ts` | ~۱۷۹ | `StructureKind` + `LAYOUTS` — چیدمان سازه‌های هر نقشه (دیوار/در/طاق/…) |
| `weapons.ts` | ~۸۴ | `WEAPONS` — کلت/سنگین/پمپ با خشاب/لگد/پخش/انفجار |
| `prefs.ts` | ~۹۶ | لودر/سیور گزینه‌ها با گارد null (`visionone:game-pref:fps-*`) شامل `loadDifficulty` (پیش‌فرض عادی) + `loadFieldSfxPref` (U5 — پیش‌فرض روشن) |
| `types.ts` | ~۱۳۶ | `SceneBridge` (قرارداد وضعیت صحنه — شامل `enemyPhase`، `cageEta/cageHit/cageWhiff`، `enemyHidden/enemyLost`، `bossPhase` U4، `enemyPos/cagePos/bossPos` U5)، `Question`، `QuestionSequence`، `TargetSpec`، … |
| `helpers.ts` | ~۶۱ | `clamp`، `missionRank`، `scopeOf`، `modeFa`، `dropFullscreen`، … |
| `textures.ts` | ~۸۹ | بافت بیلبورد اهداف و برچسب HVT (Canvas 2D) |
| `questions.ts` | ~۲۹۲ | سازندهٔ سؤال واژه/گرامر + «جملهٔ زنجیره» از خط‌های واقعی مکالمه‌ها (`chainSeedsOfConversations`) + چالش هجی رئیس (`buildSpellQuestion`/`pickSpellTarget` — سقف ۵ حرف برای حفظ کلیدهای ۱..۷ تپ) + چیدمان هدف‌ها (تا ۹ هدف) روی لِین‌ها |
| `physics.ts` | ~۱۵۲ | `stepPlayer`/`resolveWorld`/`applyRig`/`applyScope`/`initRig` — موتور حرکت نرم FPS |
| `scene/camera.tsx` | ~۴۵ | `Rig` (گام فیزیک در فریم) + `FovTune` (اسکوپ/کیک دویدن) |
| `scene/viewmodel.tsx` | ~۲۳۱ | مدل سه‌بعدی سه سلاح + ریلود/تعویض/لگد/جرقهٔ دهانه |
| `scene/sky.tsx` | ~۹۴ | `StarField`/`SkyOrb`/`CloudDrift` — آسمان هر نقشه |
| `scene/world.tsx` | ~۲۶۵ | `Arena`+`FieldProps`+`DecoShape` (رندر سازه‌ها) + `World` (ری‌کست شلیک/والی پمپ) |
| `scene/targets.tsx` | ~۳۳۵ | `Target` (پهپاد واژه‌دار + فرار)، `GoldenTarget` (HVT)، `Burst` (انفجار آتش/دود) |
| `scene/drone.tsx` | ~۲۴۹ | `HunterDrone` (U1-02/U2/U3/U5): رندر پهپاد متخاصم بدون برچسب (ADR-005) — FSM از enemy.ts در useFrame (شارژ پرتاب U2 + محاسبهٔ LOS هر فریم با چشم بازیکن حساس به خم‌شدن U3)، registry id ویژهٔ «drone»، `EnemyApi.hit` = انفجار + گریز، پرتاب قفس از cageApi در پایان شارژ، نوشتن `enemyHidden/enemyLost/enemyPos` با تابع ماژول‌سطح (ADR-001 — موقعیت برای پن استریو U5)، فریز رایگان با frameloop (ADR-004) |
| `scene/cage.tsx` | ~۲۰۶ | `Cage` (U2-01/U5): رندر قفس سیمی کهربایی بدون برچسب — پرتاب صف‌شده از api، registry id ویژهٔ «cage»، `CageApi.{launch,destroy}`، پرچم‌های یک‌بارمصرف cageHit/cageWhiff روی bridge، `writeCageEta/writeCagePos` تابع ماژول‌سطح (ADR-001 — موقعیت پرتاب و پرواز برای پن صوت U5) |
| `scene/boss.tsx` | ~۲۸۵ | `WordBoss` (U4-01/U5): رندر پهپاد فرماندهٔ بزرگ با سه حلقهٔ سپر توری (شکستن با پاسخ درست — گله بی‌اثر: قانون ① §U4) بدون برچسب (ADR-005) — حرکت/شارژ از boss.ts در useFrame + `BossApi.interrupt` (شلیک حین شارژ = لغو پرتاب) + پرتاب قفس از همان cageApi (تپ = نصف سرعت) + انفجار حلقه روی تغییر stage (پراپ) + فروپاشی نهایی روی `bridge.bossPhase="down"` — `stepShieldRing/writeBossPos` تابع ماژول‌سطح (ADR-001 — موقعیت برای پن صوت U5) |
| `scene/input.tsx` | ~۱۰۱ | `TouchJoystick` لمسی + `setStick` (تابع ماژول‌سطح قاعدهٔ bridge) |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt**: `category: GAME_KEY ("fps-shooter")` + `detail.{mode,quality,map,weapon,wave,difficulty,cageThrown,cageDowned,cageHits,bossStage,bossDefeated}` —
  داشبورد/رکوردها به این کلیدها وابسته‌اند (کلیدهای قدیمی دست‌نخورده؛ `difficulty` از U1، `cage*` از U2 و `boss*` از U4 افزودنی‌اند).
- **کلیدهای localStorage**: `visionone:game-pref:fps-{weapon,map,quality,sens,fov,invert,difficulty,field-sfx}` — فقط از طریق `prefs.ts`.
- **صدای میدان (U5)**: افکت‌های متخاصم فقط با `playFieldSound` (audio.ts) روی رویداد گسسته — پن از `fieldPan` با موقعیت‌های bridge (`enemyPos/cagePos/bossPos`)؛ صداهای بازخورد UI (correct/wrong/hit/…) مرکزی می‌مانند؛ دو گیت بی‌صدا: کلید سراسری کیت حاکم + کلید `fps-field-sfx`؛ شکست صدا هرگز بازی را نمی‌شکند (فال‌بک بدون پنر)؛ صدا هرگز حامل واژه نیست (تداوم ADR-005).
- **`scopeOf(mode, tap)`**: قالب `"word|grammar|listen|chain[-tap]"` — کلید رکورد شخصی per-scope.
- **تپ ساده**: کلیدهای `۱..۷` به هدف‌های مرتب‌شده بر اساس X (چپ→راست) — `۵..۷` فقط برای هدف‌های اضافهٔ زنجیره (F10-ب).
- **زنجیره (F10-ب)**: سؤال فقط از خط‌های واقعی مکالمه‌های جزوه (`ConversationLine.en`)؛ `srsKey` عمداً خالی و مسیر SRS در index گارد می‌شود؛ شکار بی‌ترتیب = مسیر خطا (قلب −۱).
- **registry هدف‌ها**: هر mesh شلیک‌پذیر با `userData.id` وارد `registry.current` می‌شود؛ عناصر دکوری
  هرگز وارد registry نمی‌شوند (قانون «شلیک فقط به هدف»).
- **دشمن زنده (U1/U2/U3)**: FSM پهپاد تعقیب‌گر فقط در `enemy.ts` (تصمیم: patrol/stalk/charge/flee + throwCd + LOS/lostT) و `scene/drone.tsx` (رندر/useFrame + تست دید با `los.ts`) —
  آسان = `null` رندر (بدون هزینهٔ فریم) و `chargeS=0` (دفاع عمقی)؛ شکار پهپاد/قفس هیچ امتیاز/جریمه‌ای ندارد (اقتصاد امتیاز دست‌نخورده)؛
  اعلام گذارها/رویدادهای قفس/گم‌کردن رد روی رویداد گسستهٔ interval سؤال (نه هر فریم) با `setLiveMsg`؛ قفس پرتابهٔ خطی به نقطهٔ پرتاب است (جابه‌جایی = whiff بی‌جریمه) —
  برخورد قفس فقط ❤ کم می‌کند و سؤال جاری دست‌نخورده می‌ماند (مسیر مستقل از خطای سؤال).
- **خط دید (U3)**: تعقیب فقط با دید شروع می‌شود (سکون بی‌دید freeze می‌شود نه صفر)؛ قطع دید حین تعقیب → گرِیس `ENEMY_LOST_S` (۰٫۹/۰٫۶) → بازگشت به مدار + پرچم `enemyLost`؛
  شارژ متعهد از LOS بی‌اثر است؛ چیپ «پوشیده» فقط نمایش است (بدون دکمه) با debounce دو پولی ۴۰۰ms؛ U3 هیچ کلید جدیدی به Attempt اضافه نکرد (تله‌متری رفتاری = U8).
- **رئیس واژه (U4)**: تریگر در `advance` هنگام ورود به موج ≥۴ (`w >= BOSS_WAVE && bossStageRef === 0`) — سؤال عادی نمی‌آید؛ سه مرحله (سؤال مأموریت → هجی ۳..۵ حرف با موتور زنجیره → شنیداری) فقط با پاسخ درست جلو می‌روند (خطا = همان مرحله با واژهٔ تازه)؛
  گله به بدنهٔ رئیس بی‌اثر است (فقط جرقه/اعلام — شلیک حین شارژ = لغو پرتاب)؛ پهپاد تعقیب‌گر حین نبرد از صحنه حذف می‌شود (`bossStage === 0` گارد رندر)؛
  زمان چالش ۱٫۵× (نوار زمان با `effQTime` مقیاس می‌شود)؛ پایان نبرد = پیروزی (فروپاشی + تأخیر ۱٫۵ث با `later`) یا مرگ عادی؛ مسیریابی «سؤال بعد» همهٔ پنج مسیر پاسخ از `nextStepRef` (routeNext) می‌گذرد —
  آسان = رئیس منفعل (بدون سرگردانی/قفس)؛ تپ = نصف سرعت‌ها؛ صفر شاخهٔ جدید برخورد (رئیس با id:"boss" در همان registry/handleVolley).

## افزودن قابلیت جدید — چک‌لیست

1. وضعیت پیوستهٔ صحنه → فیلد جدید در `SceneBridge` + نویسندهٔ ماژول‌سطح (ADR-001).
2. ثابت جدید → `constants.ts` (نه عدد جادویی در `index.tsx`).
3. سؤال/آموزش جدید → `questions.ts` / `TUTORIAL_STEPS` در `setup-panel.tsx`.
4. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری فلو استاندارد
   (setup → شروع → شلیک با کلید ۱..۴ در تپ ساده → خشاب/ریلود → موج ۲ → HVT → نتیجه → دور جدید).
