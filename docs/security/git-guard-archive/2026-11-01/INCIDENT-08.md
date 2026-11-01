# INCIDENT-08 — Mission-Order Record + Chat-Delivered Report (r02 corrected)

> **r02 CORRECTION (2026-11-01, mission `N1-5-GIT-GUARD-ARCHIVE-R02`):** r01 stated the INCIDENT-08 report was "never produced". That statement is **RETRACTED** — the report was produced and **delivered in chat** (owner-attested; corroborated by the session continuation summary). Its **verbatim text is NOT archived**: no copy exists in any Remote/Workspace file accessible to GLM. Correct status: **`CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM`**. The content reference for what is recoverable is `INCIDENT-08-CHAT-RECOVERY.md` (`RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`). r01 (branch `archive/git-guard-incidents-01-08-2026-11-01-r01`, commit `3482a286b0da30bf1c90e0bc6d56f9a25f87925a`) is preserved unchanged as the historical version; this file is the r02-corrected record.

| Field | Value |
|---|---|
| Mission ID | N1-5-GIT-GUARD-INCIDENT-08 *[per-incident suffix inferred from series ID — INFERENCE]* |
| Series | N1-5-GIT-GUARD (INCIDENT sub-series) |
| Mission order received | Yes (chat) — 14-section READ-ONLY + DESIGN correction scope (below) |
| Report produced | **YES — delivered in chat** (owner-attested per mission order `N1-5-GIT-GUARD-ARCHIVE-R02`; corroborated by the session continuation summary). **Verbatim text NOT archived** — not present in Remote/Workspace files accessible to GLM. Status: **`CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM`.** (r01's "NO — MISSING_NOT_RECOVERED … no report exists" is retracted; the original r01 wording remains preserved in r01 for history.) |
| Source status | **CHAT_ONLY** (mission-order scope) / **CHAT_SOURCE_AVAILABLE** (report — delivered in chat; verbatim text not archived) · Content reference: `INCIDENT-08-CHAT-RECOVERY.md` (`RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`) |

## 1. Mission-order scope as received (recorded from continuation summary — `RECONSTRUCTED — NOT VERBATIM`)

READ-ONLY + DESIGN correction of INCIDENT-07 blockers, 14 sections:

1. Fresh re-verification (10-item minimum checklist; every item labeled FRESH/HISTORICAL/INFERENCE/UNVERIFIED with delta explanations).
2. Preservation three-level model: **P0 Evidence Captured / P1 Preservation Verified / P2 Recovery Durability Established**; **forbidding any P2 claim for local snapshots until PB-1 is solved**; capture/verify/recovery/durability design for 13 object classes.
3. Quiescence rebuild: three states `QUIESCENCE_OBSERVED` / `WRITE_EXCLUSION_ENFORCED` / `WRITE_EXCLUSION_UNVERIFIED`; seven mandated questions (empty lsof + stopped processes do not form a proof boundary; the hook auto-resurrects dev server; the platform may spawn new processes); needing exclusion but unable to prove it ⇒ REFUSED/NEEDS_HUMAN (verbal authorization cannot substitute a technical control).
4. Crash-safe authorization state machine: AUTHORIZED → INTENT_DURABLE → MUTATION_STARTED → MUTATION_VERIFIED → PLANE_COMPLETED + five error states (INTENT_UNCONFIRMED, MUTATION_OUTCOME_UNKNOWN, …); deleting the assumption "nonce consumption is atomic with first mutation" unless the same storage boundary is provable; 8 mandated crash scenarios; uncertain outcome ⇒ automatic retry forbidden.
5. Register trust & anti-rollback limits: integrity / authenticity / durability / anti-rollback split into four; **no anti-rollback claims without an external anchor (PB-1)**; defined behaviors for missing/corrupt/truncated/rolled-back/unavailable registers.
6. Permission matrix correction: 9-level operation classification (READ_ONLY_OBSERVATION … GC_OR_DELETION); resolving the A01 vs ANY-UNRESOLVED=DENY contradiction; preservation copies must not be assumed non-destructive by default.
7. DATA_RESTORE three gates: DATA_ARTIFACT_VALID / DATA_REPLACEMENT_SAFE / RUNTIME_COMPATIBLE; waivers cannot turn UNKNOWN into SAFE.
8. SOURCE_RESTORE auditable preservation algorithm: distinguishing inventory export / object DB copy / bundle / fs-level preservation / quarantine / metadata capture; "LOSSLESS" forbidden unless provable.
9. Runtime threat model: hook trigger analysis, `core.hooksPath` coverage, hot reload, start-allowlist insufficiency; a hidden activation channel existing ⇒ RUNTIME BLOCKED.
10. Canonical basis-hash specification: serialization / versioning / domain separation / example (non-real data).
11. Revised matrix + state machine; **≥25 acceptance criteria** (6-property format); blocker impact analysis (SOURCE/DATA/RUNTIME columns).
12. Verdict limited to six options (including the new `HOLD — PRESERVATION GUARANTEE MODEL INCOMPLETE`); **fail-closed behavior alone is insufficient to justify DESIGN READY**.
13. (As retained: delivery as chat output only; stop after delivery.)
14. (As retained: standstill on all mutation classes pending D-1…D-12.)

> Items 13–14 are reconstructed at lower confidence than 1–12; the full mission-order text is held by the owner.

## 2. DISCREPANCY-01 — attribution of the 32-commit reconciliation

The owner's preservation mission order attributes "the list of 32 unique commits" to INCIDENT-08. In the accessible history, that reconciliation was produced by **INCIDENT-07's fresh observation of 2026-10-31T21:58Z** (36→32/37). This archive records it under INCIDENT-07 with a fresh re-verification (union = 32 confirmed FRESH, see `GIT-REF-PRESERVATION-INVENTORY.md` §3). No INCIDENT-08 report text exists to contradict or confirm the owner's attribution. Owner clarification welcome but not blocking.

> **Correction (r02, append-only — the paragraph above is retained verbatim for history):** the owner has attested that the chat-delivered INCIDENT-08 report **did** re-verify the same 32 commits — including the dedup decomposition, the five-way overlap, the per-ref breakdown, and the separation of local refs from remote-tracking refs. Correct dual attribution: **initial computation = INCIDENT-07** (fresh observation 2026-10-31T21:58Z, 36→32/37); **re-verification = INCIDENT-08** (chat-delivered report — OWNER-ATTESTED; the full repeated text is not archived verbatim, so the attested re-verification remains UNVERIFIED-verbatim from this archive alone). This archive's own FRESH re-verification (union = 32, plus per-ref counts and the 32-SHA list) is `GIT-REF-PRESERVATION-INVENTORY.md` §2/§3. See also `INCIDENT-08-CHAT-RECOVERY.md` §14.

## 3. Status of the delivered report and what remains open (r02 corrected)

- INCIDENT-07's blockers (PB-1…PB-8) and owner decisions (D-1…D-12) remain **open and unanswered**. The delivery of the INCIDENT-08 report in chat did not close them: PB-1…PB-8 stay OPEN (see `OPEN-BLOCKERS.md`); no design is adopted.
- The preservation model (P0/P1/P2), quiescence states, crash-safe state machine, 9-level permission matrix, DATA_RESTORE gates, SOURCE_RESTORE staged process (S0–S9), runtime threat model, and basis-hash spec **were designed in the chat-delivered report (owner-attested)**. Their exact texts are **not archived verbatim**; the reconstructed content reference is `INCIDENT-08-CHAT-RECOVERY.md` — `RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`. (r01's claim that they "remain undesigned" is retracted.)
- Verdict layering (the two assessments must not be conflated): the GLM-delivered INCIDENT-08 report's own verdict was **"DESIGN READY FOR OWNER REVIEW — restricted mode"** (owner-attested); a subsequent **independent review** of that report returned **"HOLD — MULTIPLE DESIGN BLOCKERS; NOT EXECUTABLE"**. Neither verdict authorizes implementation or recovery; adoption awaits an explicit owner decision (`INCIDENT-08-CHAT-RECOVERY.md` §13).
- The exact report text **cannot be fully recovered** from the remnants accessible to GLM. The recovery document is the content reference for what is recoverable; §5 below and `INCIDENT-08-CHAT-RECOVERY.md` §15 register what is not.

## 4. Redactions

None.

## 5. r02 correction log (append-only)

| # | Correction | Basis |
|---|---|---|
| C-1 | r01 "report never produced" / "no report exists" (title, Report-produced field, §3 heading) retracted → report delivered in chat; verbatim text not archived; status `CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM` | Owner mission order `N1-5-GIT-GUARD-ARCHIVE-R02` §0/§5; session continuation summary |
| C-2 | r01 "remain undesigned" retracted → designed in the chat-delivered report (owner-attested); adoption pending owner review | same |
| C-3 | DISCREPANCY-01 attribution corrected to dual: initial computation = INCIDENT-07; re-verification = INCIDENT-08 (owner-attested); original DISCREPANCY-01 text retained above | Owner attestation (R02 §6.2) |
| C-4 | New content reference `INCIDENT-08-CHAT-RECOVERY.md` (RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM) | R02 §6 |
| C-5 | Acceptance criteria: declared count 26 recorded; verbatim texts NOT RECOVERED; none fabricated; none marked PASS | R02 §6.1.J |

r01 baseline preserved unchanged: branch `archive/git-guard-incidents-01-08-2026-11-01-r01` @ `3482a286b0da30bf1c90e0bc6d56f9a25f87925a` (live OID verified FRESH 2026-11-01 before r02 publication).
