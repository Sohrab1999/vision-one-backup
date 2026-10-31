# INCIDENT-06 — Report Record

| Field | Value |
|---|---|
| Mission ID | N1-5-GIT-GUARD-INCIDENT-06 *[per-incident suffix inferred from series ID — INFERENCE]* |
| Series | N1-5-GIT-GUARD (INCIDENT sub-series) |
| Delivered | Before 2026-10-31 (exact time not retained) |
| Source status | **CHAT_ONLY** — original chat text not retained in accessible context |
| Content integrity | **RECONSTRUCTED — NOT VERBATIM** (key constructs retained with their semantics; full prose not retained) |

## 1. Key constructs recorded from this report (attributable to INCIDENT-06 specifically)

Unlike 03/04/05, the continuation summary attributes the following specifically to INCIDENT-06:

1. **ACCEPTED vs RESTORE_ELIGIBLE separation** — `ACCEPTED` denotes immutable history (an accepted evidence/decision record); `RESTORE_ELIGIBLE` denotes a time-variant decision that must be re-evaluated at use time. The two must not be conflated.
2. **Latest pointer rule** — a `latest` pointer may only be written **after** the referenced record reaches `ACCEPTED` state.
3. **SHA-equality prohibition** — equality of an *unrelated* SHA must never be used to claim logical equality between a LIVE-SET database and a BACKUP-VERIFIED copy (no "same content" claims from coincidental hash matches).
4. **New state category** — `CONTENT_CHANGED_ORDER_UNKNOWN` introduced for cases where content changed but the ordering of events cannot be established.

## 2. Status

All four constructs are **PROPOSED — PENDING OWNER REVIEW** (see `DESIGN-DECISIONS.md`).

## 3. What is NOT known

- Verdict wording, AC IDs/texts, scenario matrix, and whether INCIDENT-06 carried fresh observations of its own.

## 4. Redactions

None.
