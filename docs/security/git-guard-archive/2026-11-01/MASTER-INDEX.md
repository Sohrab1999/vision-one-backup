# MASTER-INDEX — Git Guard Archive 2026-11-01 (r01)

Mission: `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01` · Branch: `archive/git-guard-incidents-01-08-2026-11-01-r01` (orphan, archive-only tree)

## 1. File map

| File | Purpose | Source status of content |
|---|---|---|
| `README.md` | Overview, scope, design rationale, verification, durability limits | Authored this mission (FULL_SOURCE_AVAILABLE) |
| `MASTER-INDEX.md` | This index | Authored this mission (FULL_SOURCE_AVAILABLE) |
| `INCIDENT-01.md` | Incident 01 report record | MISSING_NOT_RECOVERED (text) / HISTORICAL_REFERENCE_ONLY |
| `INCIDENT-02.md` | Incident 02 report record + one cross-referenced finding | MISSING_NOT_RECOVERED (text) / CHAT_ONLY |
| `INCIDENT-03.md` | Incident 03 record | CHAT_ONLY — RECONSTRUCTED — NOT VERBATIM |
| `INCIDENT-04.md` | Incident 04 record | CHAT_ONLY — RECONSTRUCTED — NOT VERBATIM |
| `INCIDENT-05.md` | Incident 05 record | CHAT_ONLY — RECONSTRUCTED — NOT VERBATIM |
| `INCIDENT-06.md` | Incident 06 record | CHAT_ONLY — RECONSTRUCTED — NOT VERBATIM |
| `INCIDENT-07.md` | Incident 07 record (richest retained: verdict + observation set) | CHAT_ONLY — RECONSTRUCTED — NOT VERBATIM (IDs/numbers verbatim where quoted) |
| `INCIDENT-08.md` | Incident 08 mission-order scope; report never produced | CHAT_ONLY (mission order) / MISSING_NOT_RECOVERED (report) |
| `GUARD-10.4-10.5-REFERENCE.md` | GUARD-10.4 five artifacts + GUARD-10.5 status and provenance | Mixed — see file; GUARD-10.5 = FULL_SOURCE_AVAILABLE |
| `sources/guard-10.4/GUARD-EVIDENCE-PERSISTENCE-POLICY.md` | Verbatim copy, remote `backup/main` @ `44060bea`, blob `50380eec7ba22ea33719f8e98e167c14183d4668` | FULL_SOURCE_AVAILABLE (recovered from Layer 3) |
| `sources/guard-10.4/GUARD-LOST-ARTIFACTS-LEDGER.md` | Verbatim copy, remote `backup/main` @ `44060bea`, blob `24e92297315f9cc86a84e1e6af4e466c791b23dd` | FULL_SOURCE_AVAILABLE (recovered from Layer 3) |
| `sources/worklog/GUARD-10.5-WORKLOG-ENTRY.md` | Verbatim extract of `worklog.md` line 4310→EOF, remote `backup/main` @ `44060bea` | FULL_SOURCE_AVAILABLE (recovered from Layer 3) |
| `DESIGN-DECISIONS.md` | Consolidated design constructs + origin + adoption status | Authored from retained summaries (RECONSTRUCTED — NOT VERBATIM) |
| `APPROVED-OWNER-DECISIONS.md` | Only actually owner-approved items | Authored this mission |
| `OPEN-OWNER-DECISIONS.md` | D-1…D-12 + new pending items | Authored from retained summary (RECONSTRUCTED — NOT VERBATIM) |
| `OPEN-BLOCKERS.md` | PB-1…PB-8 + operational blockers | Authored; PB-1 partial, PB-2…8 IDs only |
| `EVIDENCE-REGISTER.md` | Claim-by-claim classification register | Authored this mission |
| `GIT-REF-PRESERVATION-INVENTORY.md` | Fresh ref/commit/object/DB/hook/remote inventory | Authored from FRESH observations 2026-10-31T22:43Z+ |
| `SECURITY-AND-EXECUTION-CONSTRAINTS.md` | Standing prohibitions + mission envelope | Authored this mission |
| `TOMORROW-CONTINUATION-STATE.md` | The 8 continuation answers | Authored this mission |
| `SOURCE-AVAILABILITY-MANIFEST.md` | Per-document availability + lost-artifact fingerprints | Authored this mission |
| `SHA256SUMS` | Hash manifest (all files except itself) | Generated this mission |

## 2. Relationship map

- `INCIDENT-03/04/05.md` share a jointly-attributed deliverable set (per-incident attribution not retained) — each file cross-references the other two.
- `INCIDENT-07.md` defines D-1…D-12 → detailed in `OPEN-OWNER-DECISIONS.md`; defines PB-1…PB-8 → detailed in `OPEN-BLOCKERS.md`.
- `INCIDENT-08.md` scope = the pending correction of INCIDENT-07 outputs; its production is the first substantive task of the next session (after this preservation review).
- `GUARD-10.4-10.5-REFERENCE.md` + `sources/` supersede summary-level knowledge of GUARD-10.5: the policy v1.0 is **owner-decreed binding** for all future GUARD missions.
- `EVIDENCE-REGISTER.md` is the authoritative classification layer; every factual claim in the other files should be traceable to a row there.
- `GIT-REF-PRESERVATION-INVENTORY.md` §7 records the workspace↔live-remote divergence (workspace behind by 2 GUARD-10.5 commits) — read before any sync decision (G-4: no sync without owner).

## 3. Start path

**NEXT SESSION START POINT: POST-INCIDENT-08 PRESERVATION REVIEW** → begin at `TOMORROW-CONTINUATION-STATE.md`.
