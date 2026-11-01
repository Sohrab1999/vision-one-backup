# EVIDENCE-REGISTER

Classifications: **FRESH** (observed by this mission, 2026-10-31T22:43Z–23:14Z unless noted) · **HISTORICAL** (recorded in an earlier report/decree; carried at face value with limits) · **INFERENCE** (derived; not directly observed) · **UNVERIFIED** (asserted nowhere provable). Observation-time limits stated per row. Grading follows GUARD-EVIDENCE-PERSISTENCE-POLICY §1.1 (FRESH≈[اثبات‌شده]; HISTORICAL≈[اعلام‌گزارش‌تشخیصی] when owner-declared).

| ID | Claim | Class | Source / origin | Limits |
|---|---|---|---|---|
| EV-001 | Workspace HEAD = `1f4c6d3bf6f48257b11dd828ae904715e236ac3b` on `main`, tree clean | FRESH | `git rev-parse` + `git status --porcelain` in `/home/z/my-project` | Point-in-time; unchanged-state vs INCIDENT-07 baseline |
| EV-002 | Full ref list (12 refs) with OIDs as in inventory §1 | FRESH | `git for-each-ref` | Values at observation time |
| EV-003 | Guard-unique counts outside main: g1b=2, g1c=5, rc1=4, lineage=25, backup/g1a=1; sum 37 | FRESH | `git rev-list --count main..ref` ×5 | Reproduces INCIDENT-07 values |
| EV-004 | Deduplicated union of five guard refs (excl. main) = **32** | FRESH | `git rev-list --count <five refs> ^main` | Confirms INCIDENT-07 reconciliation; DISCREPANCY-01 attribution note in `INCIDENT-08.md` |
| EV-005 | Union incl. main ancestry = 236 | FRESH | same method | Context value |
| EV-006 | g1b ⊂ rc1 (`rc1..g1b`=0; `g1b..rc1`=2) | FRESH | `git rev-list --count` | Confirms INCIDENT-07 subset proof |
| EV-007 | `backup/g1a` tip and `lineage` tip are not ancestors of `main` | FRESH | `git merge-base --is-ancestor` | — |
| EV-008 | 32-commit list (SHAs + subjects) as in inventory §3 | FRESH | `git log --pretty=tformat` capture | Subjects may include Persian text; UUID subjects = environmental auto-commits (corroborated by `ac154cdc…` message) |
| EV-009 | Exactly 2 unreachable commits: `f6630e61052d27037fcfdad322e83beb7bf8073a`, `a8ba669acdcb5584c9c524fab10aa4fea77c2419` (+12 trees +5 blobs = 19 objects) | FRESH | `git fsck --unreachable` (read-only) | Matches INCIDENT-07 ⇒ no GC since |
| EV-010 | Stash list empty | FRESH | `git stash list` | Consistent with "dropped stash remnant" interpretation (UNVERIFIED) |
| EV-011 | `/home/z/g1c-work` absent; worktree registration remains, prunable; gitdir → `/home/z/g1c-work/.git` | FRESH | LS + `git worktree list` | Disposition = D-07; no prune performed |
| EV-012 | `db/custom.db` sha256 `0057e27c…2bb097`, 1,236,992 B, mtime 2026-10-28T20:13:19Z | FRESH | `sha256sum` + `stat` (hash only; content not read) | Identical to INCIDENT-07 + GUARD-10.5 values ⇒ no observed mutation |
| EV-013 | Backup DB sha256 `8701ed6d…a55916`, 1,130,496 B, mtime 2026-10-16T15:57:40Z; no capture metadata | FRESH (hash) / HISTORICAL (COPY-UNVERIFIED classification) | `sha256sum` + INCIDENT-07 | Freshness UNKNOWN per INCIDENT-07 |
| EV-014 | No WAL/`-shm`/`-journal` sidecars; LIVE-SET = {custom.db} | FRESH (absence) / HISTORICAL (LIVE-SET term) | directory listing + INCIDENT-07 | — |
| EV-015 | Post-commit hook is the only non-sample hook; sha256 `ee679bc1…aed71`; 1391 B; mtime 2026-10-20; content not read | FRESH (existence/hash) | `ls .git/hooks` + `sha256sum` | Behavior (auto-push + resurrect, F15) is HISTORICAL |
| EV-016 | `core.hooksPath` unset in workspace and in isolated clones; clones contain only sample hooks | FRESH | `git config --get` + `ls` | Guarantees no hook fired for archive commits |
| EV-017 | Only `next-server` (v16.1.3, pid 1116) running; `duel-service` absent | FRESH | `pgrep -af` | Absence cause UNVERIFIED (not agent-caused); delta vs INCIDENT-07 |
| EV-018 | Live remote `backup` reachable; `ls-remote` succeeded; live refs per inventory §7 | FRESH | `git ls-remote backup` (2026-10-31T22:4xZ) | Upgrades INCIDENT-07's "live UNVERIFIED" to verified |
| EV-019 | Live `backup/main` = `44060bea…`; cache & workspace = `1f4c6d3…` | FRESH | ls-remote vs `rev-parse` | LIVE≠CACHE separation mandated by mission §5.3 |
| EV-020 | Live main is a fast-forward descendant of workspace HEAD, +2 commits `5ed9058…` (policy+ledger+worklog) and `44060bea…` (register amendment) | FRESH | `merge-base --is-ancestor` + `git log 1f4c6d3..44060bea` in isolated clone | Subjects quoted; content of the 2 commits = the three GUARD-10.5 files (+266 lines) |
| EV-021 | Workspace lacks GUARD-10.5 artifacts entirely (no `docs/security/`, zero GUARD-10.5 worklog mentions) | FRESH | Glob + `rg -c` on workspace | Cause of workspace being behind: UNVERIFIED (rollback suspected) |
| EV-022 | `.env` tracked in git; blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d` on live main; ~50 B per GUARD-10.5 worklog (HISTORICAL) | FRESH (tracked-ness) | `git ls-files` + `git ls-tree` | Content NEVER read; remediation = D-05 |
| EV-023 | Clone of `backup` received live state; clone main OID == ls-remote OID | FRESH | clone + `rev-parse` | Mission-mandated equality check passed |
| EV-024 | Isolated clones are hook-free (samples only) | FRESH | `ls` + config check | Stop-condition not triggered |
| EV-025 | INCIDENT-07 verdict = "DESIGN READY FOR OWNER REVIEW (restricted, fail-closed, D-1…D-12)" | HISTORICAL | session continuation summary of the delivered report | Prose translated; IDs verbatim; nothing adopted |
| EV-026 | INCIDENT-03..05 joint deliverable set; INCIDENT-06 constructs; INCIDENT-07 construct inventory | HISTORICAL | same summary | `RECONSTRUCTED — NOT VERBATIM`; full texts not retained |
| EV-027 | INCIDENT-08 mission order scope (14 sections); report never produced | HISTORICAL (scope) + FRESH absence check (no artifacts found on disk/remote) | summary + workspace/remote search | → **CORRECTED by EV-039 (r02, append-only): the "never produced" outcome is RETRACTED** — see EV-039 |
| EV-028 | GUARD-10.5 executed 2026-10-31; content commit `5ed9058…` push-verified by dual witnesses; register completed by `44060bea…` | HISTORICAL (recovered docs) + FRESH corroboration (both commits on live main) | `sources/` documents | Self-declared witnesses in ledger; current on-remote presence FRESH |
| EV-029 | GUARD-10.4 Blueprint/R1/R2 lost; fingerprints `fe2a779e…ad0b` / `43dbfc37…af12` / `3a5e8185…2310`; sizes/lines as ledgered | HISTORICAL | ledger §الف (verbatim copy in `sources/`) | Truncated fingerprints; full values never available |
| EV-030 | R1-REGEN: chat-only, verdict NOT READY, findings F-REG-01…12 + UQ-01…07; F-REG-01 = db-in-git P0 conflict | HISTORICAL (ledger/policy) + absence checks | ledger §الف + policy §9 | Only F-REG-01's substance independently known |
| EV-031 | 6 owner-decree diagnostic findings (stable scope; ephemeral outside; repo.tar/pre-stop; rollback risk; remote as recovery layer; guard-reports loss) | HISTORICAL ([اعلام‌گزارش‌تشخیصی]) | ledger §ب.۱ verbatim | Items 3/4/5 have no independent agent proof; change-inducing tests forbidden |
| EV-032 | Stable workspace = `/home/z/my-project/`; `/tmp` & outside-ephemeral | HISTORICAL (owner decree) + FRESH corroboration (g1c-work & guard-reports absent; workspace intact) | ledger §ب.۱ + this mission's observations | — |
| EV-033 | PB-1 = no external anchor ⇒ no anti-rollback claims; no P2 for local snapshots | INFERENCE from consistent usage in retained text (usage HISTORICAL) | INCIDENT-07 summary + INCIDENT-08 scope | Full PB-1 text not retained |
| EV-034 | PB-2…PB-8 exist as IDs only | HISTORICAL (IDs) + UNVERIFIED (contents) | INCIDENT-07 summary | Do not guess contents |
| EV-035 | D-1…D-12 open; D-10 (owner-identity auth) UNVERIFIED ⇒ all authorizations NEEDS_HUMAN | HISTORICAL (list) / UNVERIFIED (D-10 mechanism existence) | INCIDENT-07 summary | — |
| EV-036 | No secrets entered this archive; sensitive files referenced by hash/size only | FRESH | authoring controls + pre-publication scan | Scan results in final report |
| EV-037 | Prior missions caused no DB/hook/config mutation (unchanged fingerprints across 2026-10-31 morning → 21:58Z → this mission) | FRESH (comparison of three observation points) | EV-012/EV-015 vs GUARD-10.5 preflight + INCIDENT-07 | Fingerprint equality ≠ proof of no intervening attempt; states what is observable |
| EV-038 | No `archive/*` branch existed on remote before this mission | FRESH | ls-remote snapshot | Basis for r01 naming |

## r02 appendix (mission `N1-5-GIT-GUARD-ARCHIVE-R02`, 2026-11-01 — append-only; rows EV-039+)

| ID | Claim | Class | Source / origin | Limits |
|---|---|---|---|---|
| EV-039 | Correction of EV-027, recorded as three separate claims: **(a)** the INCIDENT-08 mission-order scope (14 sections) exists — unchanged from EV-027; **(b)** the INCIDENT-08 report **was produced and delivered in chat** — per owner attestation in mission order `N1-5-GIT-GUARD-ARCHIVE-R02` §0, corroborated by the session continuation summary (HISTORICAL); **(c)** the report's **verbatim text is absent from all Remote/Workspace files** accessible to GLM (FRESH absence check repeated in r02). Consequence: EV-027's "report never produced" outcome is RETRACTED; correct label = `CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM`. | (a) HISTORICAL · (b) HISTORICAL (owner-attested) · (c) FRESH (absence) | R02 mission order; session continuation summary; fresh file searches | (b) is attestation, not verbatim evidence — the exact text remains unrecovered; reconstructed reference = `INCIDENT-08-CHAT-RECOVERY.md` (NOT VERBATIM) |
| EV-040 | r01 archive identity: live `backup/archive/git-guard-incidents-01-08-2026-11-01-r01` = `3482a286b0da30bf1c90e0bc6d56f9a25f87925a` — exact match to the expected OID; all other remote refs recorded before r02 push | FRESH | `git ls-remote` (r02 preflight, isolated dir) | Point-in-time; re-verified after push |
| EV-041 | All 23 r01 content files hash-verified OK via `sha256sum -c SHA256SUMS` in the isolated r01 clone | FRESH | `sha256sum -c` | SHA256SUMS excludes itself (known limitation) |
| EV-042 | r02 content: no sensitive paths (no `.env`/DB/credential/upload artifacts); the three GUARD-10.5 sources byte-identical to r01 (hash equality) | FRESH | path scan + `sha256sum` comparison vs r01 clone | — |
| EV-043 | r02 publication control: r02 branch absent before push (FRESH); after push, ref-diff shows ONLY `archive/git-guard-incidents-01-08-2026-11-01-r02` added; r01, `main`, and all other refs unchanged | FRESH | ls-remote before/after diff | — |
| EV-044 | Workspace/DB/hook unchanged during the r02 mission: HEAD `1f4c6d3…`, tree clean, `custom.db` sha256 `0057e27c…`, backup DB `8701ed6d…`, post-commit hook sha256 `ee679bc1…` + mtime 2026-10-20 — all identical to baseline. Delta: `next-server` pid now 1117 (was 1116 at r01 observation); cause UNVERIFIED (platform-level process churn; no GUARD action) | FRESH | `git status/rev-parse` + `sha256sum` + `pgrep` | Hash equality ≠ proof of no intervening attempt (same limit as EV-037) |

> **r02 note on `sources/guard-10.4/` (append-only):** the folder name mirrors the **real remote path** `docs/security/guard-10.4/` on live `backup/main` @ `44060bea…` (per inventory §7 divergence analysis), where the two GUARD-10.5 documents (evidence-persistence policy + lost-artifacts ledger) reside. The three GUARD-10.5 sources preserved verbatim in this archive = **two documents** under `sources/guard-10.4/` + **one worklog record** under `sources/worklog/` (`GUARD-10.5-WORKLOG-ENTRY.md`).
