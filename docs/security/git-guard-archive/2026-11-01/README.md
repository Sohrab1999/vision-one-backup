# Git Guard Archive — 2026-11-01 (r02)

> **NEXT SESSION START POINT: POST-INCIDENT-08 PRESERVATION REVIEW** — see `TOMORROW-CONTINUATION-STATE.md`.

| Field | Value |
|---|---|
| Mission | r01: `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01` · r02 (this revision): `N1-5-GIT-GUARD-ARCHIVE-R02` |
| Archive version | **r02** — corrective revision. Substantive change: INCIDENT-08 source status corrected to `CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM` + new `INCIDENT-08-CHAT-RECOVERY.md`. |
| r01 preserved | branch `archive/git-guard-incidents-01-08-2026-11-01-r01` @ `3482a286b0da30bf1c90e0bc6d56f9a25f87925a` — unchanged, historical version (its "report never produced" wording is retained there and retracted here) |
| Archive path | `docs/security/git-guard-archive/2026-11-01/` |
| Published on | branch `archive/git-guard-incidents-01-08-2026-11-01-r02` → remote `backup` (`github.com/Sohrab1999/vision-one-backup`) — independent orphan snapshot, no parent |
| Authored (UTC / Tehran) | r01: 2026-10-31T22:43Z–23:1xZ / 2026-11-01 02:13–02:4x +0330 · r02: 2026-11-01 (correction pass; timestamps in the r02 mission's final chat report) |
| Archive design | **Orphan branch containing ONLY this archive folder** (no project source, no `.git` internals, no DB, no `.env`) |
| Integrity | `SHA256SUMS` covers every file in this folder except itself |
| Classification | Documentation only — contains NO secrets, NO credentials, NO `.env` content, NO database content |

---

## 1. Purpose

Single, ordered, traceable, versioned consolidation of all Git Guard work through INCIDENT-08, so the next session can resume exactly from this point without re-deriving prior analysis. This mission is preservation/archival ONLY: no new design, no implementation, no recovery, no code changes, no architecture changes.

## 2. Why this archive is an orphan (independent) branch

During pre-publication verification (FRESH observation, 2026-10-31T22:43Z) it was found that the file `.env` **is tracked** in `main` (blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d`, reported as 50 B by the GUARD-10.5 worklog; content intentionally never read). To guarantee the mission requirement "no sensitive or unwanted file enters the archive", the archive branch is **rootless (orphan)**: its tree contains only `docs/security/git-guard-archive/2026-11-01/`. It shares no history with `main` or any existing branch, and its publication cannot affect them.

## 3. What is inside

- **INCIDENT-01 … INCIDENT-08** — one file per incident report. Original full chat texts of the incident reports were NOT retained in accessible context (chat-only delivery + session continuation); each file states its exact source status using the mandated labels (`FULL_SOURCE_AVAILABLE`, `PARTIAL_SOURCE_AVAILABLE`, `CHAT_ONLY`, `REMOTE_ONLY`, `LOCAL_ONLY`, `MISSING_NOT_RECOVERED`, `HISTORICAL_REFERENCE_ONLY`, and — added r02 — `CHAT_SOURCE_AVAILABLE`) and marks any rebuilt text `RECONSTRUCTED — NOT VERBATIM`. Nothing was imaginatively reconstructed as if verbatim. **r02 correction:** the INCIDENT-08 report WAS delivered in chat (owner-attested); its verbatim text is not archived — see `INCIDENT-08.md` and `INCIDENT-08-CHAT-RECOVERY.md`.
- **INCIDENT-08-CHAT-RECOVERY.md** *(r02 new)* — recovered content reference for the chat-delivered INCIDENT-08 report: preservation model P0/P1/P2, quiescence three-state model, intent/authorization state machine, register & external-anchor limits, permission-matrix conceptual summary, DATA_RESTORE gates, SOURCE_RESTORE S0–S9 topics, runtime activation risk, canonical basis-hash inconsistency, 26 acceptance-criteria count (texts NOT RECOVERED), PB-1…PB-8, the two-level verdict record (GLM report verdict vs independent HOLD), 32-commit attribution, and the non-recoverables register. Flagged `RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`.
- **GUARD-10.4-10.5-REFERENCE.md** — status of the five GUARD-10.4 artifacts (three lost with `/home/z/guard-reports/`, two never materialized) and of GUARD-10.5, whose three documents ARE fully available on the live remote and are preserved **verbatim** under `sources/`.
- **sources/** — verbatim copies recovered from remote `backup/main` @ `44060bea`: `GUARD-EVIDENCE-PERSISTENCE-POLICY.md`, `GUARD-LOST-ARTIFACTS-LEDGER.md`, `GUARD-10.5-WORKLOG-ENTRY.md`. **Path clarification (r02):** the `sources/guard-10.4/` folder name mirrors the **real remote path** `docs/security/guard-10.4/` where the two GUARD-10.5 documents live on live `backup/main`. The three GUARD-10.5 sources = **two documents** under `sources/guard-10.4/` + **one worklog record** (`GUARD-10.5-WORKLOG-ENTRY.md`) under `sources/worklog/`. All three are preserved byte-identical (hash-verified in r02).
- **DESIGN-DECISIONS.md / APPROVED-OWNER-DECISIONS.md / OPEN-OWNER-DECISIONS.md** — strict separation of proposed design constructs vs. actually owner-approved items. No design from INCIDENT-03…07 is recorded as owner-approved.
- **OPEN-BLOCKERS.md** — PB-1…PB-8 plus operational blockers (including fresh findings).
- **EVIDENCE-REGISTER.md** — every claim classified `FRESH` / `HISTORICAL` / `INFERENCE` / `UNVERIFIED` with source, observation time, and inference limits.
- **GIT-REF-PRESERVATION-INVENTORY.md** — full fresh ref inventory, the 32 unique guard commits (SHAs + subjects), unreachable objects, worktree/DB/hook metadata, live-remote state and the workspace↔remote divergence analysis.
- **SECURITY-AND-EXECUTION-CONSTRAINTS.md** — standing prohibitions and authorization envelope.
- **TOMORROW-CONTINUATION-STATE.md** — the 8 continuation answers; **read this first together with MASTER-INDEX**.
- **SOURCE-AVAILABILITY-MANIFEST.md** — per-document availability status + fingerprints of lost artifacts.

## 4. Reading order for next session

1. `TOMORROW-CONTINUATION-STATE.md`
2. `MASTER-INDEX.md`
3. `OPEN-BLOCKERS.md` → `OPEN-OWNER-DECISIONS.md`
4. `INCIDENT-07.md` → `INCIDENT-08.md` → `INCIDENT-08-CHAT-RECOVERY.md`
5. `DESIGN-DECISIONS.md` → `EVIDENCE-REGISTER.md` → `GIT-REF-PRESERVATION-INVENTORY.md`
6. `SECURITY-AND-EXECUTION-CONSTRAINTS.md` → `SOURCE-AVAILABILITY-MANIFEST.md`
7. `sources/` (GUARD-10.5 policy + ledger + worklog — binding permanent contract)

## 5. How to verify this archive

```bash
git clone <backup remote> verify-clone
git -C verify-clone rev-parse origin/archive/git-guard-incidents-01-08-2026-11-01-r02
cd verify-clone/docs/security/git-guard-archive/2026-11-01
sha256sum -c SHA256SUMS
```

All lines must report `OK`. `SHA256SUMS` intentionally excludes itself (self-reference impossibility — same known limitation documented in the GUARD evidence policy §6.2). To verify the preserved r01 historical version, run the same against branch `archive/git-guard-incidents-01-08-2026-11-01-r01` (expected commit `3482a286b0da30bf1c90e0bc6d56f9a25f87925a`).

## 6. Durability claim limits (mandatory)

This archive provides an **independent second copy on a remote repository, hash-verified by independent re-fetch**. It does **not** claim: immutability, permanence, anti-deletion, anti-rollback, or platform-independence. GitHub repository retention remains subject to platform access and policy. A successful push is not P2 recovery-durability evidence (PB-1 unresolved). The words IMMUTABLE / PERMANENT / GUARANTEED are deliberately not applied to this archive.

## 7. Provenance of this archive

- Built inside an **isolated clone** of remote `backup` at `/home/z/guard-archive-work-2026-11-01/build-clone` (hook-free: fresh clone contains only sample hooks; `core.hooksPath` unset). The main workspace `/home/z/my-project` was **never written to**: no fetch, no checkout, no file creation, no config/hook/remote changes, no service interaction.
- Live remote state at build time: `backup/main` = `44060beaa26a6c9ef70b9ae3ab53d96c8cd49095` (FRESH via `git ls-remote`, matched by isolated clone). Workspace `main` = `1f4c6d3bf6f48257b11dd828ae904715e236ac3b`. Divergence analysis: `GIT-REF-PRESERVATION-INVENTORY.md` §7.
- The archive commit SHA is not knowable inside its own commit (self-reference); it is stated in the mission's final report and verifiable via `git ls-remote backup refs/heads/archive/git-guard-incidents-01-08-2026-11-01-r01`.
- Final remote-verification results (re-fetch + hash match + ref-diff) are recorded in the mission's final chat report for `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01`; at authoring time the publication status was **PENDING REMOTE VERIFICATION**.

## 8. r02 revision note (append-only — mission `N1-5-GIT-GUARD-ARCHIVE-R02`, 2026-11-01)

**Authorization:** the owner explicitly authorized (R02 §0): keep r01 untouched; build corrective r02; recover INCIDENT-08 content from conversation context as far as possible; label the recovered document `NOT VERBATIM`; publish r02 on a new independent branch on remote `backup`; independently re-fetch and hash-verify after push.

**Corrections applied in r02** (detail per file):

1. `INCIDENT-08.md` — "report never produced" / "no report exists" retracted → `CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM`; "remain undesigned" retracted → designed in the chat-delivered report (owner-attested), adoption pending; DISCREPANCY-01 corrected append-only (dual attribution: initial computation = INCIDENT-07; re-verification = INCIDENT-08, owner-attested); r02 correction log added (§5).
2. `INCIDENT-08-CHAT-RECOVERY.md` — **new file**; `RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`; sections A–L per R02 §6.1 + 32-commit attribution (§14) + non-recoverables register (§15). The 26 acceptance criteria are recorded as **count only — texts NOT RECOVERED**; nothing fabricated; nothing marked PASS.
3. `TOMORROW-CONTINUATION-STATE.md` — "never produced" corrected; next work = independent review of the recovered document + source recovery of missing details + owner decision; re-producing the report explicitly removed as a future work item.
4. `MASTER-INDEX.md` — recovery document added to file map; INCIDENT-08 status corrected; r01 referenced as the preserved historical version.
5. `SOURCE-AVAILABILITY-MANIFEST.md` — `CHAT_SOURCE_AVAILABLE` defined and distinguished from `MISSING_NOT_RECOVERED`; INCIDENT-08 row corrected; known-losses register updated.
6. `EVIDENCE-REGISTER.md` — EV-027 corrected append-only via EV-039 (three claims separated: scope existence / chat delivery per owner attestation / verbatim absence); r02 appendix EV-039…EV-044 added; `sources/guard-10.4/` path clarification added.
7. `OPEN-BLOCKERS.md` — B-OPS-04 corrected to "designs delivered in chat, not archived verbatim"; PB-1…PB-8 remain OPEN; blocker-impact-analysis note corrected.
8. `APPROVED-OWNER-DECISIONS.md` — DD-15…DD-23 recorded as "designed in delivered chat report — owner-attested; adoption pending"; none approved or executable.
9. `DESIGN-DECISIONS.md` — DD-15…DD-23 status → "DESIGNED — CHAT SOURCE — NOT ARCHIVED — OWNER REVIEW PENDING".
10. `INCIDENT-07.md` — incorrect "INCIDENT-08 never produced a verdict" corrected; INCIDENT-07's own verdict history unchanged.
11. `GIT-REF-PRESERVATION-INVENTORY.md` — §8 attribution note added; 32-SHA list and all §1–§7 data unchanged.
12. `README.md` — this note; INCIDENT-08 status; `sources/` path clarification; verification instructions updated for r02.

**Unchanged in r02:** the three GUARD-10.5 source files (byte-identical, hash-verified); INCIDENT-01…06 files; `GUARD-10.4-10.5-REFERENCE.md`; `SECURITY-AND-EXECUTION-CONSTRAINTS.md`; `OPEN-OWNER-DECISIONS.md`; all §1–§7 data of the inventory; the archive path; the orphan-branch design. r01 remains published and untouched.

**r02 build provenance:** all write operations performed in isolated directories under `/home/z/guard-archive-work-2026-11-01/r02-work/` (fresh clones, sample hooks only, `core.hooksPath` unset); the main workspace `/home/z/my-project` was never written to; no fetch/checkout/config changes in the workspace; DB/hook files only hash-read. Live `backup/main` at r02 build time = `44060bea…` (FRESH ls-remote, unchanged vs r01 observation). No new claims about live remote state beyond this fresh observation.

**r02 statistics:** files = **25** (24 `.md` + `SHA256SUMS`; r01: 24) · total lines (excluding `SHA256SUMS`) = **1535** · changed vs r01 = **11 modified + 1 new** (`INCIDENT-08-CHAT-RECOVERY.md`, 315 lines) · unchanged (byte-identical) = INCIDENT-01…06, `GUARD-10.4-10.5-REFERENCE.md`, `OPEN-OWNER-DECISIONS.md`, `SECURITY-AND-EXECUTION-CONSTRAINTS.md`, the three `sources/` files · `SHA256SUMS` regenerated for all 24 files (excludes itself).
