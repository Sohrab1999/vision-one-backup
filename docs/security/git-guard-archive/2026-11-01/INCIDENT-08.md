# INCIDENT-08 — Mission-Order Record (report never produced)

| Field | Value |
|---|---|
| Mission ID | N1-5-GIT-GUARD-INCIDENT-08 *[per-incident suffix inferred from series ID — INFERENCE]* |
| Series | N1-5-GIT-GUARD (INCIDENT sub-series) |
| Mission order received | Yes (chat) — 14-section READ-ONLY + DESIGN correction scope (below) |
| Report produced | **NO — MISSING_NOT_RECOVERED.** The session ran out of context before INCIDENT-08 work began; no verdict, no AC, no report exists in accessible history. |
| Source status | **CHAT_ONLY** (mission-order scope) / **MISSING_NOT_RECOVERED** (report) |

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

## 3. Consequences of the report never being produced

- INCIDENT-07's blockers (PB-1…PB-8) and owner decisions (D-1…D-12) remain **uncorrected and unanswered**.
- The preservation model (P0/P1/P2), quiescence states, crash-safe state machine, 9-level permission matrix, DATA_RESTORE gates, SOURCE_RESTORE algorithm, runtime threat model, and basis-hash spec remain **undesigned** (only the scope above exists).
- The last delivered incident verdict is still INCIDENT-07's "DESIGN READY FOR OWNER REVIEW".
- Producing INCIDENT-08 (or its owner-approved successor) is the first substantive design task after this preservation review — subject to owner direction.

## 4. Redactions

None.
