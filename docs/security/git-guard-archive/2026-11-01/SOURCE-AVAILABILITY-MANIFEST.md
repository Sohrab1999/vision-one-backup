# SOURCE-AVAILABILITY-MANIFEST

Labels used (owner-mandated set): `FULL_SOURCE_AVAILABLE` · `PARTIAL_SOURCE_AVAILABLE` · `CHAT_ONLY` · `REMOTE_ONLY` · `LOCAL_ONLY` · `MISSING_NOT_RECOVERED` · `HISTORICAL_REFERENCE_ONLY`. Rebuilt text is always flagged `RECONSTRUCTED — NOT VERBATIM`. "Recovery source" = where this archive obtained what it holds.

> **r02 addition — label semantics (mission order `N1-5-GIT-GUARD-ARCHIVE-R02` §7.5):** **`CHAT_SOURCE_AVAILABLE`** = the content was produced and delivered in chat (owner-attested) but its verbatim text is not archived in Remote/Workspace files. **`MISSING_NOT_RECOVERED`** = the content itself was never captured in any accessible source (no delivery on record, or loss without trace). The two are NOT interchangeable: a chat-delivered report must never be registered as `MISSING_NOT_RECOVERED`, and a reconstructed text must never be labeled verbatim.

## 1. Incident reports

| Document | Status | Recovery source in this archive | Fidelity |
|---|---|---|---|
| INCIDENT-01 | `MISSING_NOT_RECOVERED` (text) · `HISTORICAL_REFERENCE_ONLY` (existence) | `INCIDENT-01.md` (status record only) | Nothing reconstructed beyond existence |
| INCIDENT-02 | `MISSING_NOT_RECOVERED` (text) · `CHAT_ONLY` (one cross-referenced finding) | `INCIDENT-02.md` §1 | One finding; `RECONSTRUCTED — NOT VERBATIM` |
| INCIDENT-03 | `CHAT_ONLY` | `INCIDENT-03.md` | Joint deliverable set; `RECONSTRUCTED — NOT VERBATIM`; per-incident attribution not retained |
| INCIDENT-04 | `CHAT_ONLY` | `INCIDENT-04.md` | Same as above |
| INCIDENT-05 | `CHAT_ONLY` | `INCIDENT-05.md` | Same as above |
| INCIDENT-06 | `CHAT_ONLY` | `INCIDENT-06.md` | 4 constructs attributable; `RECONSTRUCTED — NOT VERBATIM` |
| INCIDENT-07 | `CHAT_ONLY` | `INCIDENT-07.md` | Verdict + construct inventory + full 21-item observation block; `RECONSTRUCTED — NOT VERBATIM` (IDs/numbers verbatim) |
| INCIDENT-08 | `CHAT_ONLY` (mission order scope) · `CHAT_SOURCE_AVAILABLE` (report — delivered in chat per owner attestation; verbatim text not archived) | `INCIDENT-08.md` + `INCIDENT-08-CHAT-RECOVERY.md` | Scope list `RECONSTRUCTED — NOT VERBATIM`; report content `RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`; nothing invented beyond attested topics. (r01 status `MISSING_NOT_RECOVERED (report — never produced)` retracted in r02) |

## 2. GUARD-10.4 artifacts

| Document | Status | Fingerprint (as recorded in ledger) | Size/Lines | Note |
|---|---|---|---|---|
| GUARD-10.4-BLUEPRINT | `MISSING_NOT_RECOVERED` | `fe2a779e…ad0b` | 90,822 B / 821 | Lost with `/home/z/guard-reports/` (before 2026-10-31) |
| GUARD-10.4-R1 | `MISSING_NOT_RECOVERED` | `43dbfc37…af12` | 99,278 B / 759 | same |
| GUARD-10.4-R2 | `MISSING_NOT_RECOVERED` | `3a5e8185…2310` | 67,216 B / 502 | same |
| GUARD-10.4-R1-REGEN | `CHAT_ONLY` | — | — | Verdict NOT READY; F-REG-01…12 + UQ-01…07; materialization awaits owner (OD-14). Only F-REG-01's content is independently known (db-in-git P0 conflict, via policy §9) |
| GUARD-10.4-DIAGNOSTIC | `MISSING_NOT_RECOVERED` (full text) · blocked-registration state documented | — | — | 6 owner-decree findings preserved verbatim (ledger §ب.۱ → `sources/guard-10.4/`); full text requested from owner (OD-13) |

> Fingerprints are truncated exactly as the ledger records them (full values never available to any agent — honestly recorded limitation). They enable identification if copies ever surface.

## 3. GUARD-10.5 documents — `FULL_SOURCE_AVAILABLE` (recovered from remote Layer 3)

| Document | Verbatim copy in archive | Remote provenance | sha256 (archived copy) |
|---|---|---|---|
| GUARD-EVIDENCE-PERSISTENCE-POLICY v1.0 | `sources/guard-10.4/GUARD-EVIDENCE-PERSISTENCE-POLICY.md` | `backup/main` @ `44060bea…`, blob `50380eec7ba22ea33719f8e98e167c14183d4668` | `cf31dd5068b10222fcfc6fbe394af53a42f01ba128beac1bb79807604b1e7468` |
| GUARD-LOST-ARTIFACTS-LEDGER | `sources/guard-10.4/GUARD-LOST-ARTIFACTS-LEDGER.md` | `backup/main` @ `44060bea…`, blob `24e92297315f9cc86a84e1e6af4e466c791b23dd` | `d0c5a5bdbf36241d8e1b4adc29a8402baf0a838be7ba0990a8787e763da740a4` |
| GUARD-10.5 worklog entry | `sources/worklog/GUARD-10.5-WORKLOG-ENTRY.md` | `worklog.md` line 4310→EOF @ `44060bea…` | `b01eb8cd2f9fe78c8c1b43b643eb620d385cebbbff3e973918fa3e4560b05ba1` |

## 4. State/decision material

| Item | Status | Source |
|---|---|---|
| Fresh ref/commit/object/DB/hook/remote state (2026-10-31T22:43Z–23:14Z) | `FULL_SOURCE_AVAILABLE` (freshly observed by this mission) | `GIT-REF-PRESERVATION-INVENTORY.md` + mission observation logs (work area, not archived) |
| INCIDENT-07 baseline observations (2026-10-31T21:58Z) | `HISTORICAL_REFERENCE_ONLY` (retained via session continuation summary) | `INCIDENT-07.md` §3 |
| D-1…D-12 / PB-1…PB-8 | `PARTIAL_SOURCE_AVAILABLE` (D-items descriptive; PB-1 partial; PB-2…8 IDs only) | `OPEN-OWNER-DECISIONS.md` / `OPEN-BLOCKERS.md` |
| GUARD-10.5 policy/ledger state (workspace copy) | `REMOTE_ONLY` — absent from workspace tree (divergence B-OPS-02) | `sources/` + `GIT-REF-PRESERVATION-INVENTORY.md` §7 |
| Session continuation summary (recovery medium for incident texts) | `PARTIAL_SOURCE_AVAILABLE` (secondary source; itself not archived verbatim — it is the lens, not the artifact) | — |
| Owner mission orders (incl. this one) | `FULL_SOURCE_AVAILABLE` for this mission (constraint set archived); earlier orders `CHAT_ONLY`/summary-level | `SECURITY-AND-EXECUTION-CONSTRAINTS.md` §1 |

## 5. Known losses (nothing hidden — explicit register)

1. Full chat texts of INCIDENT-01…07 reports (chat-only delivery + context exhaustion).
2. The verbatim text of the INCIDENT-08 report (delivered in chat; never archived verbatim — see `INCIDENT-08-CHAT-RECOVERY.md` for what is recoverable).
3. GUARD-10.4 Blueprint/R1/R2 file contents (lost with `/home/z/guard-reports/`).
4. R1-REGEN full text (chat-only; F-REG-02…12 and UQ-01…07 contents not retained).
5. GUARD-10.4 DIAGNOSTIC full text (never registered; blocked by decree).
6. Texts of: AC-07-01…20, R1–R10 checks, 9-item custody chain, three waivers, 20-scenario matrix rows, PB-2…8 details, F-REG-02…12 / UQ-01…07 details.
7. Per-incident attribution within the INCIDENT-03/04/05 deliverable set.

## 6. Redaction log

None required — no secret material was found in any archived content. `.env` and DB contents were never read; hashes/sizes only. Remote URL always redacted.
