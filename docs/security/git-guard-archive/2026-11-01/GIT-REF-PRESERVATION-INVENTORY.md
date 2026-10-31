# GIT-REF-PRESERVATION-INVENTORY — Fresh Preservation Snapshot

Observation window: **2026-10-31T22:43Z–23:14Z** (Tehran 2026-11-01 02:13–02:44 +0330), unless stated. Workspace observations were read-only (`git log/rev-list/for-each-ref/fsck --unreachable` only; no fetch/checkout/config changes in the workspace). Historical baseline: INCIDENT-07 fresh observations 2026-10-31T21:58Z.

## 1. Workspace refs (FRESH — `git for-each-ref`)

| Ref | OID | Class |
|---|---|---|
| `refs/heads/main` | `1f4c6d3bf6f48257b11dd828ae904715e236ac3b` | local branch (workspace HEAD; tree clean) |
| `refs/heads/g1b-offline-queue` | `a39d6a167f9c8119a7b2bddf2ffebba2f2c0045a` | guard branch |
| `refs/heads/g1c-offline-tries` | `407b1bce5daad9d4380dd2cd0e7e3dedd06e9eba` | guard branch |
| `refs/heads/recovery/rc1-g1b-docs` | `c95db841be4fef590512bd97d8fe8e9de734229a` | guard branch |
| `refs/recovery/lineage-48bad8c` | `48bad8c78b0745c74213bad5a29794c276cc8ab0` | guard ref (custom namespace) |
| `refs/remotes/backup/g1a-offline-queue` | `2386a92e7658bc085631d797ec0d95813e224103` | remote-tracking |
| `refs/remotes/backup/g1b-offline-queue` | `a39d6a167f9c8119a7b2bddf2ffebba2f2c0045a` | remote-tracking |
| `refs/remotes/backup/g1c-offline-tries` | `407b1bce5daad9d4380dd2cd0e7e3dedd06e9eba` | remote-tracking |
| `refs/remotes/backup/main` | `1f4c6d3bf6f48257b11dd828ae904715e236ac3b` | remote-tracking (**stale cache** — see §7) |
| `refs/remotes/backup/recovery/aa4-sr-lineage-48bad8c` | `48bad8c78b0745c74213bad5a29794c276cc8ab0` | remote-tracking |
| `refs/remotes/backup/recovery/rc1-g1b-docs` | `c95db841be4fef590512bd97d8fe8e9de734229a` | remote-tracking |
| `refs/remotes/backup/sandbox-main` | `c9d1fea11d378e5bb3fdcc9f2407f850e12b5d2a` | remote-tracking |

All OIDs identical to the INCIDENT-07 baseline (no local ref moved between 2026-10-31T21:58Z and this snapshot).

## 2. Commit counts (FRESH)

Full ancestry counts: g1b=154, g1c=157, main=204, rc1=156, lineage=124, backup/g1a=153 (backup/g1b=154, backup/g1c=157, backup/main=204*, backup/recovery/aa4=124, backup/recovery/rc1=156, backup/sandbox-main=133 — *as of stale cache). **Guard-unique counts (outside `main`):**

| Ref set | Unique commits outside main |
|---|---|
| g1b | 2 |
| g1c | 5 |
| rc1 | 4 |
| lineage | 25 |
| backup/g1a | 1 |
| **Sum** | **37** |
| **Deduplicated union of the five (excluding main)** | **32** ✓ matches INCIDENT-07 |
| Union of the five **including** main ancestry | 236 distinct commits |

Subset relations (FRESH): `rc1..g1b = 0` ⇒ **g1b ⊂ rc1** confirmed; `g1b..rc1 = 2`. `backup/g1a` tip is **not** an ancestor of `main`; `lineage` tip is **not** an ancestor of `main`. (All five sets are disjoint from main's ancestry by construction of the count.)

## 3. The 32 unique guard commits (FRESH list; format `<SHA> <subject>`)

```
407b1bce5daad9d4380dd2cd0e7e3dedd06e9eba feat: stop offline queue processing when head reaches MAX_TRIES + cappedHead status field (G1-c stage 3)
dc95064f05ab5975cbd499b7848c9acbe076c5a3 feat: count tries for network/408/5xx with MAX_TRIES=10 cap (G1-c stage 2)
96bca4c254dcbc49221e86e2585151baf2ff399d feat: add optional tries counter to offline queue items (G1-c stage 1)
c95db841be4fef590512bd97d8fe8e9de734229a docs(N1-2): append worklog record N1-GAME-EXEC-02 (G1-b execution) — pure addition +18, source: committed working-tree block
c0b4b097681ffa94980a0715b93071e3cce48196 docs(N1-2): add R-C1 roadmap v1.2 (G1-b accepted, record N1-GAME-EXEC-02) — new file, byte-identical copy of snapshot sha256 793dc72809e62b6e09ce2474eaeeddd23072ae04d5d62b590c1af2265da03a00
a39d6a167f9c8119a7b2bddf2ffebba2f2c0045a feat: pause offline queue flush after HTTP 408/429 with valid Retry-After (G1-b)
2386a92e7658bc085631d797ec0d95813e224103 fix: retain offline queue items on HTTP 408 and 429
48bad8c78b0745c74213bad5a29794c276cc8ab0 38dd2f69-0197-43a5-8295-3eeb9994d904
f3a53c999dfc23b016fbb636c5ceb84035612030 d0c708d0-262b-439a-a30d-8ff3a729a7a4
0c9010a6b89fffca1a91099f0f9e6a525c3b3637 b42a9d1b-b3ca-4e7a-9efd-4cfef2bbb80e
ac154cdcfbbe135dc6b6063aca1c7bf16cc5520a docs(R3close-FPS): بستن کنترل‌شدهٔ R3 — تکمیل فنی 10px با استثنای مستند شواهد before (OOM)؛ ثبت N1(پرش)/N2/N3/N5 و تفکیک auto-commitهای محیطی 22ac060/70219da از کار دستی؛ جدول ۹ معیار (۸ PASS + استثنای معیار ۷) و شواهد after در بخش ۸/۹ همین سند
70219dad09678b6f289b0723fc21c0d214a83a27 73a686ed-c1f8-44ba-b8fd-2b2de2711529
22ac06088939b0b7abf2784c50f13096ea801580 230a41c3-89bc-4488-b408-1f6ba77056ea
0ba6a2d0c4fdf8c2a2492c18d94ffa87583a0cd2 71bfe0dd-21ed-4c23-9763-3f2f39a7db4b
5bcb6e641c49c7d8f4bf84b1200bb191ea2c369f docs(R3plan-FPS): نقشه راه مستقل اصلاح R3 بج آمار سلاح — ارتقای 9px→10px روی مکانیزم wrap موجود؛ نردبان ۴ راهکار (کم‌ریسک→پرریسک)، مراحل گیت‌دار N1–N5، ۹ معیار پذیرش الزامی و شرایط توقف
d8438593178b67ba60314e67bb054749baaa45d9 docs(audit): R5 دور ۱ — گزارش ممیزی نهایی دسترس‌پذیری AA: R1/R2/R4 تکمیل با شواهد Git، R3 تعویق‌شده/بازتعریف‌شده (۹px+wrap)، ثبت خلأهای شواهد (شامل تناقض جدید R3-390)
72b787b6b331b4256cffd1728de52e6acd79b565 docs(R3): گام ۵ — ممیزی نهایی Git، ثبت نتایج گام‌های ۰–۴ و بستن اصلاح R3 (حفظ عمدی 9px + فعال‌سازی wrap)
5c588e704db6b2e88610a0ca1f46881f28721e45 dd334220-2305-4748-b487-10890bb25f4b
827e4a73e5c037e445cc43864631d48963f4f8cc 844d91da-132c-4037-a0f4-5a087a6f1519
46a14cf4b65948289c128fa2d6785e0bac75464d 8e5db934-8351-41cd-951a-28b6a9ed9e38
e0ae14ded7ef00a5d364c393f6dc63728dc27dc1 9cda4cbc-fc4a-4c47-8f7c-aaf5704bf6e2
6fc79d1eab533af3988ef6e1964ff9108e63b438 0a5c539a-5efb-436c-b887-b8f94f917c9f
1583de307cae11a65be95e9cfc68adcb39141947 docs(R3plan): نقشه راه مستقل اصلاح R3 — بج آمار سلاح شوتر؛ تحلیل گزینه‌ها (رد truncate، جایگزین wrap) و گام‌های گیت‌دار
0ade330a439917c4a8140145d02bb375e166ffac docs(lowrisk7): گام R5 — بستن نقشه راه: R1/R2/R4 تکمیل، R3 تعویق‌شده (سرریز 768)، ممیزی نهایی و ثبت محدودیت‌ها
354e64dce6c54a484b3a72dbb0f499f40fd08f75 a11y(lowrisk7): گام R4 — بج «N جمله آماده» بازی جای خالی 9px→10px + شواهد 390/768
487d805d30f794e7b2e92cbbf73cd75c0ef9c030 8fe53b3a-ebd1-4e18-ae99-0a0be22116ca
7adb140361299989f2a033ae63736407b997fc5b a11y(lowrisk7): گام R2 — چهار برچسب میان‌بر صفحه‌کلید سایدبار 9.5px→10px + شواهد 1440×900
e18423447bd0ceeb2083731b67df6a1d25668804 a11y(lowrisk7): گام R1 — زیرنویس «ناوبری سریع» سایدبار دسکتاپ 9.5px→10px + شواهد 1440×900
25b56dec8707f55498127c42b4827fb3ac41f3fc docs: نقشه راه مستقل اصلاح ۷ مورد کم‌ریسک متن‌های کوچک (پیوست فاز ۴ دسترس‌پذیری)
09ce67409333df19173bb5e9b2bd1f30846605a9 ae36f66b-a3e3-45fb-a26d-45a7f6e69c9d
454fd9e87f3cffcf6ded614ba53f3b9f60128703 a11y(phase4): گام 4-الف-4 — sweep متن‌های ریز؛ بج «فعال» حالت زمان‌دار 9.5px→10px + ممیزی کامل زیر 10px
d382aeb558bab913930e70bb5d765dcd0a581c97 03f84602-ecbe-4c17-95fd-90cf89d6efd2
```

> UUID-subject entries are platform-environmental auto-commits (corroborated by commit `ac154cdc…` which explicitly separates environmental auto-commits `22ac060`/`70219da` from manual work). List reproduced byte-faithfully from the fresh `git log --pretty=tformat` capture archived at observation time.

## 4. Unreachable objects (FRESH `git fsck --unreachable`; read-only)

**19 objects total: 2 commits + 12 trees + 5 blobs.** The two unreachable commits — matching the INCIDENT-07 baseline exactly (no GC has run):

- `f6630e61052d27037fcfdad322e83beb7bf8073a`
- `a8ba669acdcb5584c9c524fab10aa4fea77c2419`

(stash-type WIP pair per INCIDENT-07 — classification HISTORICAL/INFERENCE; `git stash list` is EMPTY fresh, so the pair is consistent with remnants of a dropped stash — UNVERIFIED interpretation; disposition = D-06.) Trees/blobs (full list preserved in mission observation log, not reproduced here): `0700678a`, `e4c3cd35`, `e987014b`, `fe07b76c`, `1189a57f`, `098a3566`, `b1571b09`, `229869cb`, `efa08cb3`, `0965cc20`, `3127ec0f`, `5fab362c`, `7fab82ad`, `d5eb4cb5`, `e4f12907`, `40f5b4e5`, `afff4e4e`.

## 5. Worktree / stash (FRESH)

- `git stash list` → **empty**.
- `git worktree list` → `/home/z/my-project` (main) and **`/home/z/g1c-work` @ `407b1bce [g1c-offline-tries] — prunable`**.
- `/home/z/g1c-work` **directory does not exist** (FRESH LS error: No such file or directory) — consistent with INCIDENT-07; stale registration persists at `.git/worktrees/g1c-work` (gitdir points to `/home/z/g1c-work/.git`). Disposition = D-07 (no prune performed — outside this mission's envelope).

## 6. DB / hook / runtime metadata (FRESH; hashes only, no sensitive content read)

| Item | Value |
|---|---|
| `db/custom.db` | size 1,236,992 B; mtime 2026-10-28T20:13:19Z; **sha256 `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097`** — identical to INCIDENT-07 and GUARD-10.5 preflight values ⇒ no DB mutation observed |
| `db/custom.backup-e-20261016-155740.db` | size 1,130,496 B; mtime 2026-10-16T15:57:40Z; sha256 `8701ed6dfbee2a72484b98cde0e1239ebf17876b25e41d1146c1d11b47a55916` — unchanged; classification per INCIDENT-07: COPY-UNVERIFIED (no capture metadata), freshness UNKNOWN |
| Sidecars | **none** (no `custom.db-wal` / `-shm` / `-journal` in `db/`; directory listing shows only the two DB files) — LIVE-SET = {custom.db} per INCIDENT-07 classification |
| Hook | `.git/hooks/post-commit` is the only non-sample hook: sha256 `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71`, 1391 B, mtime 2026-10-20T15:29:01Z — matches GUARD-10.5 preflight fingerprint prefix. Content intentionally NOT read (credential-exposure hygiene); behavior per F15 (HISTORICAL): auto-push to backup + dev-server resurrection |
| `core.hooksPath` | unset (empty) — FRESH |
| Tracked sensitive file | `.env` tracked (blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d`); content never read — see B-OPS-01 |
| Processes | `next-server` (v16.1.3) pid 1116 alive; **duel-service not running** (delta vs INCIDENT-07 which listed it as a writer; cause UNVERIFIED, no GUARD action involved) |

## 7. LIVE remote state vs local cache vs workspace HEAD (FRESH — `git ls-remote backup`)

| Ref | LIVE (ls-remote) | Local cache | Workspace | Status |
|---|---|---|---|---|
| `main` | **`44060beaa26a6c9ef70b9ae3ab53d96c8cd49095`** | `1f4c6d3…` | `1f4c6d3…` | **LIVE AHEAD of cache/workspace** (see below) |
| `HEAD` → main | `44060bea…` | — | — | consistent with live main |
| `g1a-offline-queue` | `2386a92e…` | same | (no local branch) | match |
| `g1b-offline-queue` | `a39d6a16…` | same | same | match |
| `g1c-offline-tries` | `407b1bce…` | same | same | match |
| `recovery/aa4-sr-lineage-48bad8c` | `48bad8c7…` | same | (custom ref) | match |
| `recovery/rc1-g1b-docs` | `c95db841…` | same | same | match |
| `sandbox-main` | `c9d1fea1…` | same | (no local branch) | match |
| `archive/*` | **absent before this mission** | — | — | branch name `archive/git-guard-incidents-01-08-2026-11-01-r01` confirmed unused |

**Divergence analysis:** live `main` = fast-forward descendant of workspace HEAD containing exactly two additional commits:
- `5ed905815162bde4892b6e31ab212fad09d94171` — "GUARD-10.5: evidence-persistence policy + lost-artifacts ledger + worklog record" (adds `docs/security/guard-10.4/GUARD-EVIDENCE-PERSISTENCE-POLICY.md`, `docs/security/guard-10.4/GUARD-LOST-ARTIFACTS-LEDGER.md`, worklog append)
- `44060beaa26a6c9ef70b9ae3ab53d96c8cd49095` — "GUARD-10.5: record verified push SHAs in evidence register (amendment)" (+266 lines total across the three files)

Workspace contains **neither** the two commits **nor** the GUARD-10.5 worklog entry (verified FRESH: zero `GUARD-10.5` matches in workspace `worklog.md`) — i.e., the workspace sits at its pre-GUARD-10.5 state while the remote carries GUARD-10.5. Cause UNVERIFIED (workspace-level restore/rollback suspected, consistent with GUARD-10.4 diagnostic finding #4; alternative: GUARD-10.5 executed outside this workspace). Per policy **G-4**, no pull/fetch/checkout/reset was performed in the workspace; owner decision = OD-15. This mission's isolated clone DID receive the live state (OID match with ls-remote ✓ — the mission's mandated equality check passed).
