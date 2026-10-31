# GUARD-10.4 / GUARD-10.5 — Reference & Availability

## 1. GUARD-10.4 artifacts (per GUARD-LOST-ARTIFACTS-LEDGER, recovered verbatim in `sources/guard-10.4/`)

| Artifact | Status | Fingerprint (SHA-256, truncated as recorded) | Size/Lines | Location when lost | Classification |
|---|---|---|---|---|---|
| GUARD-10.4-BLUEPRINT | **MISSING_NOT_RECOVERED** | `fe2a779e…ad0b` | 90,822 B / 821 lines | `/home/z/guard-reports/` (ephemeral — tree vanished before 2026-10-31) | HISTORICAL_REFERENCE_ONLY (metadata from ledger) |
| GUARD-10.4-R1 (security correction) | **MISSING_NOT_RECOVERED** | `43dbfc37…af12` | 99,278 B / 759 lines | same | HISTORICAL_REFERENCE_ONLY |
| GUARD-10.4-R2 (design consistency audit) | **MISSING_NOT_RECOVERED** | `3a5e8185…2310` | 67,216 B / 502 lines | same | HISTORICAL_REFERENCE_ONLY |
| GUARD-10.4-R1-REGEN (12-part re-audit; verdict **NOT READY**; findings F-REG-01…12 + UQ-01…07) | **CHAT_ONLY** — exists only in chat transcript; materialization awaits owner permission | — | — | chat (ephemeral) | PARTIAL: F-REG-01 known (see §4) |
| GUARD-10.4-DIAGNOSTIC (Reset/Snapshot diagnostic) | **NOT REGISTERED — blocked by GUARD-10.5 decree §2**: full text was unavailable; guessing forbidden; full text requested from owner; file deliberately never created | — | — | — | 6 owner-decree findings preserved verbatim in ledger §ب.۱ |

> The fingerprints above are quoted from the ledger verbatim (truncated prefixes/suffixes); full values were never available to any agent — an honestly recorded limitation.

### The six owner-decree findings (GUARD-10.4 diagnostic summary — preserved verbatim in `sources/guard-10.4/GUARD-LOST-ARTIFACTS-LEDGER.md` §ب.۱)

1. Stable sandbox scope = `/home/z/my-project/`.
2. Files outside this path have no survival guarantee across the Recycle cycle.
3. Snapshots are produced via `repo.tar` and the pre-stop mechanism.
4. pre-stop failure or tar corruption can lead to recovery of an older version or partial recovery.
5. A Git remote can serve as an independent recovery layer.
6. Previous GUARD reports were destroyed because they were stored in `/home/z/guard-reports/`.

All six = `[اعلام‌گزارش‌تشخیصی]` (owner-declared, operational baseline) per policy §1.1; items 1/2/6 independently corroborated `[اثبات‌شده]` for the observed aspect; items 3/4/5 have no independent agent proof (change-inducing tests forbidden).

## 2. GUARD-10.5 — **FULL_SOURCE_AVAILABLE** (recovered from remote Layer 3 this mission)

| Document | Verbatim copy in this archive | Source blob (remote `backup/main` @ `44060bea`) | sha256 of archived copy |
|---|---|---|---|
| GUARD-EVIDENCE-PERSISTENCE-POLICY v1.0 (2026-10-31, owner-decreed, binding & permanent) | `sources/guard-10.4/GUARD-EVIDENCE-PERSISTENCE-POLICY.md` | `50380eec7ba22ea33719f8e98e167c14183d4668` | `cf31dd5068b10222fcfc6fbe394af53a42f01ba128beac1bb79807604b1e7468` |
| GUARD-LOST-ARTIFACTS-LEDGER (lost-artifacts register + evidence register §ج) | `sources/guard-10.4/GUARD-LOST-ARTIFACTS-LEDGER.md` | `24e92297315f9cc86a84e1e6af4e466c791b23dd` | `d0c5a5bdbf36241d8e1b4adc29a8402baf0a838be7ba0990a8787e763da740a4` |
| GUARD-10.5 worklog entry (worklog.md line 4310→EOF) | `sources/worklog/GUARD-10.5-WORKLOG-ENTRY.md` | part of worklog.md in tree @ `44060bea` | `b01eb8cd2f9fe78c8c1b43b643eb620d385cebbbff3e973918fa3e4560b05ba1` |

## 3. GUARD-10.5 key facts (from the recovered documents)

- Executed 2026-10-31 (preflight 07:35:49Z; Tehran ۱۴۰۵/۸/۹); content commit **`5ed905815162bde4892b6e31ab212fad09d94171`** verified on `refs/heads/main` by dual independent witnesses (`git ls-remote backup` ✓ + GitHub API ✓ + `/tmp/devhook.log` fast-forward `1f4c6d3..5ed9058` "auto-push OK"); an amendment commit "record verified push SHAs in evidence register" (= `44060beaa26a6c9ef70b9ae3ab53d96c8cd49095`, the current live remote main tip) completed the register row.
- Pre-flight fingerprints it recorded (2026-10-31 morning): hook `ee679bc1…aed71` (1391 B, 37 lines); `db/custom.db` `0057e27c…2bb097` (1,236,992 B); `.env` tracked (50 B); 7 remote branches; `/home/z/g1c-work` worktree registered; `/home/z/guard-reports/` absent; no GUARD docs in tree/history.
- It created the binding permanent preservation contract (policy §0–§10: three layers, non-substitution rule, gates G-1…G-5, post-stage controls, evidence register pattern §6.1/6.2 incl. self-reference limitation, three-phase safe recovery, 7 explicit limitations, non-conflict §9, versioning §10).

## 4. F-REG-01 (from R1-REGEN, referenced by policy §9) — known conflict

`db/custom.db` is tracked in the (backup) repository — in tension with the P0 security priority. If it is ever removed from git per P0, Layers 2/3 for DB backup must be redesigned with an owner-approved plan. Until then the status quo is recorded as "known and temporary". **Related fresh finding this mission:** `.env` is also tracked (blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d`, ~50 B per GUARD-10.5 worklog; content never read) — see `OPEN-BLOCKERS.md` B-OPS-01.

## 5. Redactions

None required — the three source documents contain no secrets, tokens, or credential-bearing URLs (verified by scan before archiving).
