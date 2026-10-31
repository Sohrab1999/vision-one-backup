# OPEN-BLOCKERS — PB-1…PB-8 and Operational Blockers

## 1. Design blockers from INCIDENT-07 (IDs verbatim; detail as retained)

| ID | Status | What is retained | What is needed to close |
|---|---|---|---|
| **PB-1** | OPEN | No external anchor / independent attestation exists. Consequences recorded in accessible history: **no anti-rollback claims** are permitted, and **no local snapshot may be claimed P2 (Recovery Durability Established)** while PB-1 is open. [Classification of this description: INFERENCE from consistent usage in retained text — the full PB-1 text is not retained] | External anchor mechanism (e.g., independent third-party attestation) — design deferred to INCIDENT-08 scope; owner decision required |
| **PB-2 … PB-8** | OPEN — **details MISSING_NOT_RECOVERED** | Identifiers only; the seven blockers were enumerated in the INCIDENT-07 report whose full text was not retained. Do not guess their content. | Owner chat transcript (materialization) or owner confirmation of permanent loss; then INCIDENT-08-class analysis |

> Note: the INCIDENT-08 mission order (never executed) was tasked to produce a blocker impact analysis in SOURCE/DATA/RUNTIME columns — still outstanding.

## 2. Operational blockers (status FRESH unless stated)

| ID | Blocker | Evidence | Impact | Required to close |
|---|---|---|---|---|
| B-OPS-01 | `.env` is **tracked** in git (blob `769ebf2805af57a8e66acf4a1d25a4e2a6be556d`; reported 50 B by GUARD-10.5 worklog — HISTORICAL). Content never read by any GUARD mission. | FRESH 2026-10-31T22:43Z: `git ls-files` includes `.env` in workspace; blob present on live remote main | Any repo consumer can read it; conflicts with secret-hygiene P0; D-05 open | Owner-approved remediation design (D-05) — removal from tracking with history handling; NOT fixable by this archive mission by mandate |
| B-OPS-02 | **Workspace behind live remote `main`** by 2 commits (`5ed9058…`, `44060bea…` — GUARD-10.5 policy+ledger+worklog). Fast-forward lineage confirmed. Cause of workspace being at pre-GUARD-10.5 state: UNVERIFIED (workspace-level restore/rollback suspected — consistent with diagnostic finding #4; or GUARD-10.5 executed outside this workspace). | FRESH: `ls-remote` vs local refs; workspace lacks `docs/security/guard-10.4/` and GUARD-10.5 worklog entry | Workspace preflights (G-1…G-3) would miss the binding policy documents | OD-15 owner decision; per policy G-4 no sync performed by this mission |
| B-OPS-03 | Post-commit hook = auto-push + automatic dev-server resurrection (F15, HISTORICAL). Hidden activation channel; `core.hooksPath` currently unset (FRESH). | Hook file hash `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` (FRESH, unchanged vs GUARD-10.5 preflight fingerprint prefix) | RUNTIME plane blocked until D-11 answered | D-11 |
| B-OPS-04 | INCIDENT-08 report never produced | Accessible history | INCIDENT-07 blockers uncorrected; preservation/quiescence/crash designs missing | Owner direction (OD-17) + INCIDENT-08 execution |
| B-OPS-05 | PB-2…PB-8 detail text not retained | This archive | Blocker analysis incomplete | Materialization from owner transcript |
| B-OPS-06 | ~~Live remote reachability unverified~~ — **RESOLVED FRESH**: remote reachable; `ls-remote` + clone + (pending) push verification all succeeded 2026-10-31T22:43Z+ | This mission's Phase 2/3 logs | — | Closed by this archive (recorded in EVIDENCE-REGISTER EV-018) |
| B-OPS-07 | `db/custom.db` tracked in repository (F-REG-01, HISTORICAL via policy §9) | Policy §9 | P0 security conflict; DB backup layers depend on it | D-09 owner design |
| B-OPS-08 | `duel-service` not running at fresh observation (was listed as a writer in INCIDENT-07). Not stopped by any GUARD mission; cause of absence UNVERIFIED (platform lifecycle). | FRESH 2026-10-31T22:43Z: only `next-server` (pid 1116) matched pgrep | Minor: writer inventory changed; quiescence analysis inputs updated | None (observation recorded; re-check at next session preflight) |
| B-OPS-09 | Lost GUARD-10.4 artifacts (Blueprint/R1/R2) + chat-only R1-REGEN + unregistered DIAGNOSTIC | Ledger §الف/§ب | Institutional knowledge gaps | OD-13/OD-14; fingerprints recorded in SOURCE-AVAILABILITY-MANIFEST.md enable identification if copies surface |
