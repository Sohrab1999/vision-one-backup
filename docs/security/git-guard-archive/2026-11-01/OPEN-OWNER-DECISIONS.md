# OPEN-OWNER-DECISIONS — D-1 … D-12 plus new pending items

All items below are **open** — no owner response exists in accessible history. Descriptions are reconstructed from the retained summary of INCIDENT-07 → `RECONSTRUCTED — NOT VERBATIM`. Without D-10 (owner-identity authentication), every authorization below remains effectively NEEDS_HUMAN even if verbally granted.

| ID | Decision | Description (as retained) | Blocks |
|---|---|---|---|
| D-01 | Network permission | Whether the agent may perform network operations (beyond owner-mandated ls-remote/push envelopes in specific missions) | Several verification designs |
| D-02 | Volume persistence probe | Whether a controlled probe of workspace-volume persistence is allowed (change-inducing test otherwise forbidden) | Durability claims |
| D-03 | Offline recovery strategy | Strategy when remote is unreachable: what may be done locally, what must wait | Restore design |
| D-04 | HMAC key | Provision/derivation of an HMAC key for register/manifest authenticity | Register authenticity (DD-15 scope) |
| D-05 | Secrets remediation | Handling of tracked sensitive files (`.env` tracked — FRESH finding; `db/custom.db` tracked — F-REG-01); removal plan requires owner-approved design | P0 security item |
| D-06 | Fate of the 32/37 commit set + 2 unreachable stash commits | Whether the 32-union commits and the unreachable pair `f6630e6…`/`a8ba669…` are to be preserved, merged, or abandoned | Ref hygiene; GC safety |
| D-07 | Stale worktree metadata (`g1c-work`) | Whether to prune the prunable worktree registration (dir absent, metadata remains) | Ref hygiene |
| D-08 | Retention parameters | Retention windows/limits for snapshots, registers, archives | Preservation design |
| D-09 | DB/repo separation | Whether to separate the SQLite DB from the git repository (and how) | P0 security; backup redesign |
| D-10 | Owner-identity authentication mechanism | A technical mechanism by which the agent can verify owner identity/authority. **Status UNVERIFIED — no such mechanism exists in accessible history; until it exists, every authorization is NEEDS_HUMAN by default** | ALL decisions above |
| D-11 | Enforcement authority for quiescence + hook neutralization | Whether the agent may ever stop/start services or neutralize the auto-push/auto-resurrect hook (F15), and under what protocol | Quiescence design; RUNTIME plane |
| D-12 | Startup migration policy | Ban `db:push`/`db:reset` at startup; pin the startup command; prevent accidental schema/data loss | RUNTIME plane |

## New pending items (introduced by this archive mission)

| ID | Decision | Description | Blocks |
|---|---|---|---|
| OD-13 | GUARD-10.4 diagnostic unblock path choice | Choose ledger §ب path 1 (owner supplies full text) or path 2 (owner confirms none exists) | DIAGNOSTIC registration |
| OD-14 | R1-REGEN materialization permission | Permit transferring the chat-only R1-REGEN report (verdict NOT READY; F-REG-01…12, UQ-01…07) into a committed document | Loss prevention for R1-REGEN |
| OD-15 | Workspace↔remote divergence handling | Workspace `main` = `1f4c6d3…` is BEHIND live `backup/main` = `44060bea…` by the two GUARD-10.5 commits (fast-forward). Per policy G-4, no sync without owner. Decide whether/how to update the workspace (fetch/pull only — never reset), or leave as-is | Workspace freshness; future preflights |
| OD-16 | Worklog append for this archive mission | Policy §5.8/§0.3 expects a worklog entry + evidence-register row for missions; writing to workspace `worklog.md` was outside this mission's envelope (workspace must remain untouched). Owner should authorize a follow-up append (or accept this archive's own register as the record) | Contract compliance bookkeeping |
| OD-17 | INCIDENT-08 execution order | Confirm whether the next session should execute INCIDENT-08 as scoped, or an owner-revised successor (e.g., start with the preservation review of this archive) | Next mission selection |
