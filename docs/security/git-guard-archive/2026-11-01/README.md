# Git Guard Archive — 2026-11-01 (r01)

> **NEXT SESSION START POINT: POST-INCIDENT-08 PRESERVATION REVIEW** — see `TOMORROW-CONTINUATION-STATE.md`.

| Field | Value |
|---|---|
| Mission | `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01` |
| Archive version | **r01** (path and branch name verified unused before creation) |
| Archive path | `docs/security/git-guard-archive/2026-11-01/` |
| Published on | branch `archive/git-guard-incidents-01-08-2026-11-01-r01` → remote `backup` (`github.com/Sohrab1999/vision-one-backup`) |
| Authored (UTC / Tehran) | 2026-10-31T22:43Z–23:1xZ / 2026-11-01 02:13–02:4x +0330 |
| Archive design | **Orphan branch containing ONLY this archive folder** (no project source, no `.git` internals, no DB, no `.env`) |
| Integrity | `SHA256SUMS` covers every file in this folder except itself |
| Classification | Documentation only — contains NO secrets, NO credentials, NO `.env` content, NO database content |

---

## 1. Purpose

Single, ordered, traceable, versioned consolidation of all Git Guard work through INCIDENT-08, so the next session can resume exactly from this point without re-deriving prior analysis. This mission is preservation/archival ONLY: no new design, no implementation, no recovery, no code changes, no architecture changes.

## 2. Why this archive is an orphan (independent) branch

During pre-publication verification (FRESH observation, 2026-10-31T22:43Z) it was found that the file `.env` **is tracked** in `main` (blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d`, reported as 50 B by the GUARD-10.5 worklog; content intentionally never read). To guarantee the mission requirement "no sensitive or unwanted file enters the archive", the archive branch is **rootless (orphan)**: its tree contains only `docs/security/git-guard-archive/2026-11-01/`. It shares no history with `main` or any existing branch, and its publication cannot affect them.

## 3. What is inside

- **INCIDENT-01 … INCIDENT-08** — one file per incident report. Original full chat texts of the incident reports were NOT retained in accessible context (chat-only delivery + session continuation); each file states its exact source status using the mandated labels (`FULL_SOURCE_AVAILABLE`, `PARTIAL_SOURCE_AVAILABLE`, `CHAT_ONLY`, `REMOTE_ONLY`, `LOCAL_ONLY`, `MISSING_NOT_RECOVERED`, `HISTORICAL_REFERENCE_ONLY`) and marks any rebuilt text `RECONSTRUCTED — NOT VERBATIM`. Nothing was imaginatively reconstructed as if verbatim.
- **GUARD-10.4-10.5-REFERENCE.md** — status of the five GUARD-10.4 artifacts (three lost with `/home/z/guard-reports/`, two never materialized) and of GUARD-10.5, whose three documents ARE fully available on the live remote and are preserved **verbatim** under `sources/`.
- **sources/** — verbatim copies recovered from remote `backup/main` @ `44060bea`: `GUARD-EVIDENCE-PERSISTENCE-POLICY.md`, `GUARD-LOST-ARTIFACTS-LEDGER.md`, `GUARD-10.5-WORKLOG-ENTRY.md`.
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
4. `INCIDENT-07.md` → `INCIDENT-08.md`
5. `DESIGN-DECISIONS.md` → `EVIDENCE-REGISTER.md` → `GIT-REF-PRESERVATION-INVENTORY.md`
6. `SECURITY-AND-EXECUTION-CONSTRAINTS.md` → `SOURCE-AVAILABILITY-MANIFEST.md`
7. `sources/` (GUARD-10.5 policy + ledger + worklog — binding permanent contract)

## 5. How to verify this archive

```bash
git clone <backup remote> verify-clone
git -C verify-clone rev-parse origin/archive/git-guard-incidents-01-08-2026-11-01-r01
cd verify-clone/docs/security/git-guard-archive/2026-11-01
sha256sum -c SHA256SUMS
```

All lines must report `OK`. `SHA256SUMS` intentionally excludes itself (self-reference impossibility — same known limitation documented in the GUARD evidence policy §6.2).

## 6. Durability claim limits (mandatory)

This archive provides an **independent second copy on a remote repository, hash-verified by independent re-fetch**. It does **not** claim: immutability, permanence, anti-deletion, anti-rollback, or platform-independence. GitHub repository retention remains subject to platform access and policy. A successful push is not P2 recovery-durability evidence (PB-1 unresolved). The words IMMUTABLE / PERMANENT / GUARANTEED are deliberately not applied to this archive.

## 7. Provenance of this archive

- Built inside an **isolated clone** of remote `backup` at `/home/z/guard-archive-work-2026-11-01/build-clone` (hook-free: fresh clone contains only sample hooks; `core.hooksPath` unset). The main workspace `/home/z/my-project` was **never written to**: no fetch, no checkout, no file creation, no config/hook/remote changes, no service interaction.
- Live remote state at build time: `backup/main` = `44060beaa26a6c9ef70b9ae3ab53d96c8cd49095` (FRESH via `git ls-remote`, matched by isolated clone). Workspace `main` = `1f4c6d3bf6f48257b11dd828ae904715e236ac3b`. Divergence analysis: `GIT-REF-PRESERVATION-INVENTORY.md` §7.
- The archive commit SHA is not knowable inside its own commit (self-reference); it is stated in the mission's final report and verifiable via `git ls-remote backup refs/heads/archive/git-guard-incidents-01-08-2026-11-01-r01`.
- Final remote-verification results (re-fetch + hash match + ref-diff) are recorded in the mission's final chat report for `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01`; at authoring time the publication status was **PENDING REMOTE VERIFICATION**.
