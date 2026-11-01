# APPROVED-OWNER-DECISIONS — Only Actually Approved Items

Strict rule: an item appears here **only** when the owner explicitly decreed/authorized it in a mission order or binding contract. Nothing from the incident-series design packages is approved (INCIDENT-07 verdict = "DESIGN READY FOR OWNER REVIEW" ⇒ all its content awaits review; INCIDENT-08's report was delivered in chat (owner-attested) but its verbatim text is not archived — none of its content is approved either).

## A-01 — GUARD-EVIDENCE-PERSISTENCE-POLICY v1.0 is binding and permanent

- **Source:** owner decree executed by GUARD-10.5 (2026-10-31); document recovered verbatim in `sources/guard-10.4/GUARD-EVIDENCE-PERSISTENCE-POLICY.md`.
- **Effect:** every future GUARD mission implicitly includes its terms (storage in stable workspace, three-layer protection with non-substitution rule, gates G-1…G-5, post-stage controls, evidence-register rows, three-phase safe recovery, permanent prohibitions §7.3) unless the owner explicitly writes an exception (which must be recorded in worklog.md and the evidence register).
- **Status:** OWNER-APPROVED (binding).

## A-02 — This preservation mission's authorization envelope

- **Source:** owner mission order `N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01` (current mission; full constraint set archived in `SECURITY-AND-EXECUTION-CONSTRAINTS.md`).
- **Effect (approved):** read conversation/repo docs; create a new versioned archive in a new independent branch on remote `backup` (`Sohrab1999/vision-one-backup`); commit+push only that branch after all safety controls; independently verify remote SHA+content; produce final report; stop. Explicitly NOT approved: touching `main`, existing branches, hooks/config/remotes/credentials, DB/uploads/`.env`/runtime files, services/processes, GC/prune/clean, rulesets/permissions, `/tmp` as final archive location, force-push/ref deletion/history rewrite, and any durability over-claim.
- **Status:** OWNER-APPROVED for this mission only (scoped envelope, not a standing grant).

## A-03 — Standing prohibition set (carried across missions)

The accumulated prohibition set enforced in every GUARD mission (no reset/force/history-rewrite/hook/config changes; no DB/runtime mutations; no service stop/start; read-only evidence discipline; secret non-disclosure; historical-vs-fresh evidence separation; UNVERIFIED labeling) — owner-imposed and repeatedly restated in mission orders, now also codified in policy §7.3.

- **Status:** OWNER-APPROVED as standing discipline.

## A-04 — Two unblock paths for the GUARD-10.4 diagnostic registration (defined, not yet chosen)

The ledger (§ب) records the owner-approved *shape* of the unblock: either (1) owner supplies the full diagnostic report text → verbatim registration, or (2) owner confirms no fuller text exists → register the six findings as a limited-scope reference. **The choice itself is still open** (owner has not yet answered; see `OPEN-OWNER-DECISIONS.md` OD-13).

- **Status:** paths APPROVED as options; selection PENDING.

## Explicitly NOT approved (recorded to prevent accidental adoption)

- All DD-01…DD-14 constructs (`DESIGN-DECISIONS.md`) — proposed only.
- DD-15…DD-23 — designed in the chat-delivered INCIDENT-08 report (**owner-attested**; NOT archived verbatim — reconstructed reference: `INCIDENT-08-CHAT-RECOVERY.md`, `RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`); **adoption pending owner review**. None is approved or executable. (r02 correction of r01's "not even designed".)
- D-1…D-12 — all open (`OPEN-OWNER-DECISIONS.md`).
- Materialization of R1-REGEN from chat — awaiting owner permission.
- Any workspace/remote synchronization for the divergence found this mission — awaiting owner (G-4).
