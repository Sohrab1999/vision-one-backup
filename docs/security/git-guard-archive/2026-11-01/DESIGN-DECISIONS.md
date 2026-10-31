# DESIGN-DECISIONS — Consolidated Register

Rule of this file: **no decision is recorded as owner-approved unless it appears in `APPROVED-OWNER-DECISIONS.md`.** Everything here is a design construct proposed during the incident series; adoption status is uniformly **PROPOSED — PENDING OWNER REVIEW** unless a row explicitly says otherwise. Prose is reconstructed from retained summaries → `RECONSTRUCTED — NOT VERBATIM` at prose level (IDs/semantics as retained).

| # | Decision / construct | Origin | Semantics (as retained) | Status |
|---|---|---|---|---|
| DD-01 | Four-generation separation | INCIDENT-03/04/05 (joint) | `source` / `data` / `snapshot` / `recovery_acceptance` kept as separated generations; no cross-generation conflation | PROPOSED — PENDING OWNER REVIEW |
| DD-02 | SAFE_RESTORE fail-closed conditions | INCIDENT-03/04/05 (joint) | Restore proceeds only when all safety preconditions are provably met; any unproven precondition ⇒ refuse | PROPOSED — PENDING OWNER REVIEW |
| DD-03 | Manifest v2 two-phase protocol | INCIDENT-03/04/05 (joint) | Manifest-driven restore in two phases (intent/commit style) | PROPOSED — PENDING OWNER REVIEW |
| DD-04 | Trusted register, append-only + crash matrix | INCIDENT-03/04/05 (joint) | Register is the evidence/decision ledger; every crash point has a defined observable outcome | PROPOSED — PENDING OWNER REVIEW |
| DD-05 | SQLite three-category classification | INCIDENT-03/04/05 (joint) | DB copies = `BACKUP-VERIFIED` / `LIVE-SET` / `COPY-UNVERIFIED` | PROPOSED — PENDING OWNER REVIEW |
| DD-06 | ACCEPTED vs RESTORE_ELIGIBLE separation | INCIDENT-06 | `ACCEPTED` = immutable history; `RESTORE_ELIGIBLE` = time-variant decision re-evaluated at use | PROPOSED — PENDING OWNER REVIEW |
| DD-07 | Latest pointer only after ACCEPTED | INCIDENT-06 | `latest` pointer may be written only after the target record is ACCEPTED | PROPOSED — PENDING OWNER REVIEW |
| DD-08 | No logical-equality claims from unrelated SHA equality | INCIDENT-06 | Unrelated SHA match must never be used to claim LIVE-SET ≡ BACKUP-VERIFIED logically | PROPOSED — PENDING OWNER REVIEW |
| DD-09 | `CONTENT_CHANGED_ORDER_UNKNOWN` category | INCIDENT-06 | For content changes whose event ordering cannot be established | PROPOSED — PENDING OWNER REVIEW |
| DD-10 | Three restore planes (SOURCE/DATA/RUNTIME) | INCIDENT-07 | Independent authorization per plane; one plane never authorizes another | PROPOSED — PENDING OWNER REVIEW |
| DD-11 | Closed-world permission matrix | INCIDENT-07 | Only explicitly listed operations permitted; unlisted = denied | PROPOSED — PENDING OWNER REVIEW |
| DD-12 | Custody ≠ freshness 9-item evidence chain | INCIDENT-07 | Custody proof never substitutes freshness proof (item texts not retained) | PROPOSED — PENDING OWNER REVIEW |
| DD-13 | Canonical comparison boundaries | INCIDENT-07 | Rules limiting what cross-generation comparisons may conclude | PROPOSED — PENDING OWNER REVIEW |
| DD-14 | Three-state authorization (ELIGIBLE→AUTHORIZED→PRE_RESTORE_REVALIDATED; one-time nonce + basis-hash B) | INCIDENT-07 | Revalidation binds authorization to a basis hash; nonce is one-time | PROPOSED — PENDING OWNER REVIEW |
| DD-15 | Register four-way trust split (integrity/authenticity/durability/anti-rollback) | INCIDENT-08 scope (undesigned) | No anti-rollback claims without external anchor (PB-1) | NOT PRODUCED (scope only) |
| DD-16 | Preservation three-level model P0/P1/P2 | INCIDENT-08 scope (undesigned) | P2 forbidden for local snapshots until PB-1 solved | NOT PRODUCED (scope only) |
| DD-17 | Quiescence three-state model (OBSERVED/ENFORCED/UNVERIFIED) | INCIDENT-08 scope (undesigned) | Unprovable exclusion ⇒ REFUSED/NEEDS_HUMAN | NOT PRODUCED (scope only) |
| DD-18 | Crash-safe authorization state machine (5 states + 5 error states; nonce-atomicity assumption deleted) | INCIDENT-08 scope (undesigned) | Uncertain outcome ⇒ no automatic retry | NOT PRODUCED (scope only) |
| DD-19 | 9-level operation classification (READ_ONLY_OBSERVATION … GC_OR_DELETION) | INCIDENT-08 scope (undesigned) | Resolves A01 vs ANY-UNRESOLVED=DENY; preservation copy not default-non-destructive | NOT PRODUCED (scope only) |
| DD-20 | DATA_RESTORE three gates (ARTIFACT_VALID / REPLACEMENT_SAFE / RUNTIME_COMPATIBLE) | INCIDENT-08 scope (undesigned) | Waivers cannot turn UNKNOWN into SAFE | NOT PRODUCED (scope only) |
| DD-21 | SOURCE_RESTORE auditable preservation algorithm (6 artifact classes) | INCIDENT-08 scope (undesigned) | "LOSSLESS" forbidden unless provable | NOT PRODUCED (scope only) |
| DD-22 | Runtime threat model (hook triggers, hooksPath coverage, hot reload, allowlist insufficiency) | INCIDENT-08 scope (undesigned) | Hidden activation channel ⇒ RUNTIME BLOCKED | NOT PRODUCED (scope only) |
| DD-23 | Canonical basis-hash spec (serialization/version/domain separation) | INCIDENT-08 scope (undesigned) | Basis hash binds authorization to content basis | NOT PRODUCED (scope only) |

## Rejected / superseded items

- **"36 commits" as the guard-ref commit count** — superseded by the 32-commit deduplicated union (INCIDENT-07 fresh reconciliation; FRESH-confirmed this archive). The 36 figure was a per-ref sum, not a unique count.
- **"nonce consumption atomic with first mutation"** — flagged for deletion by the INCIDENT-08 mission order (not a design to keep).
- No other design item is recorded as rejected in accessible history.
