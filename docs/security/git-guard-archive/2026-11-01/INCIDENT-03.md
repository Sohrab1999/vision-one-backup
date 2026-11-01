# INCIDENT-03 — Report Record

| Field | Value |
|---|---|
| Mission ID | N1-5-GIT-GUARD-INCIDENT-03 *[per-incident suffix inferred from series ID — INFERENCE]* |
| Series | N1-5-GIT-GUARD (INCIDENT sub-series) |
| Delivered | Before 2026-10-31 (in the portion of the session that was summarized; exact time not retained) |
| Source status | **CHAT_ONLY** — original chat text not retained in accessible context |
| Content integrity | **RECONSTRUCTED — NOT VERBATIM** (topic-level deliverables retained; full prose, AC texts and verdict wording not retained) |

## 1. Deliverable set — jointly attributed to INCIDENT-03/04/05

The session continuation summary records the three reports' combined deliverables. **Per-incident attribution between 03/04/05 is NOT retained**; the set below is therefore recorded jointly in all three files and must not be quoted as "INCIDENT-03 decided X" without owner confirmation:

1. **SAFE_RESTORE fail-closed conditions** — restore may only proceed when its safety preconditions are provably met; any unproven precondition ⇒ refuse (fail-closed).
2. **Manifest v2 two-phase protocol** — manifest-based restore operated in two phases (intent/commit style), replacing any single-phase mutation.
3. **Trusted register** — an append-only trusted register as the evidence/decision ledger for restore operations.
4. **Four-generation separation** — `source` / `data` / `snapshot` / `recovery_acceptance` kept as separated generations (no cross-generation conflation).
5. **SQLite three-category classification** — database copies classified as `BACKUP-VERIFIED` / `LIVE-SET` / `COPY-UNVERIFIED`.
6. **Register append protocol + crash matrix** — append-only register writes with an explicit crash/outcome matrix (each crash point → defined observable state).

## 2. Status of these constructs

All of the above are **design constructs proposed in the reports — none is recorded as owner-adopted** (see `DESIGN-DECISIONS.md` and `APPROVED-OWNER-DECISIONS.md`).

## 3. What is NOT known

- Which deliverable was introduced in which of the three incidents.
- The incidents' verdicts, acceptance criteria (IDs/texts), scenario matrices, and the exact wording of fail-closed conditions.
- Whether any INCIDENT-03/04/05 fresh observations were recorded beyond the design content.

## 4. Redactions

None.
