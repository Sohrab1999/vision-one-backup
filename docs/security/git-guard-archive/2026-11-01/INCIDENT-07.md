# INCIDENT-07 — Report Record

| Field | Value |
|---|---|
| Mission ID | N1-5-GIT-GUARD-INCIDENT-07 *[per-incident suffix inferred from series ID — INFERENCE]* |
| Series | N1-5-GIT-GUARD (INCIDENT sub-series) |
| Delivered | 2026-10-31 (same session as its fresh-observation block; chat-only delivery) |
| Source status | **CHAT_ONLY** — original chat text not retained in accessible context |
| Content integrity | **RECONSTRUCTED — NOT VERBATIM**, except items explicitly marked verbatim (IDs, numbers, verdict string, observation values) |

## 1. Verdict (recorded verbatim as retained)

> **"DESIGN READY FOR OWNER REVIEW"** — restricted mode; fail-closed; dependent on owner decisions **D-1…D-12**.
> (Original delivered wording was in Chinese: 「DESIGN READY FOR OWNER REVIEW（受限模式，fail-closed，依赖决策 D-1…D-12）」; English rendering here is a translation — `RECONSTRUCTED — NOT VERBATIM` at prose level, IDs verbatim.)

**Meaning:** the design package was complete enough for owner review but **nothing in it is adopted or approved** until the owner decides. This remains the last delivered incident verdict **at the INCIDENT-07 delivery point**. (r02 correction of the earlier parenthetical "INCIDENT-08 never produced a verdict": the chat-delivered INCIDENT-08 report carried its own verdict — "DESIGN READY FOR OWNER REVIEW — restricted mode" (owner-attested) — subsequently rated **"HOLD — MULTIPLE DESIGN BLOCKERS; NOT EXECUTABLE"** by an independent review; see `INCIDENT-08.md` and `INCIDENT-08-CHAT-RECOVERY.md` §13. Neither is adopted. INCIDENT-07's own verdict history above is unchanged.)

## 2. Design constructs delivered (all PROPOSED — PENDING OWNER REVIEW)

1. **Three restore planes** — `SOURCE` / `DATA` / `RUNTIME`, each with independent authorization; passing one plane never authorizes another.
2. **Closed-world permission matrix** — operations are only permitted where the matrix explicitly lists them; anything unlisted is denied.
3. **Custody ≠ freshness evidence chain** — 9-item chain proving custody does not prove freshness (item texts not retained; count verbatim).
4. **Canonical comparison boundaries** — rules for what comparisons may/may not conclude across generations.
5. **Three-state authorization model** — `RESTORE_ELIGIBLE` → `RESTORE_AUTHORIZED` → `PRE_RESTORE_REVALIDATED`; one-time nonce + basis-hash `B`.
6. **PRE_RESTORE_REVALIDATION checks R1–R10** — IDs retained; texts not retained.
7. **Three waivers** — count retained; names/conditions not retained.
8. **Authorization state machine** — with fail-closed transitions.
9. **20-scenario matrix** — count retained; scenario list not retained.
10. **Acceptance criteria AC-07-01 … AC-07-20** — IDs retained; texts not retained.
11. **Blockers PB-1 … PB-8** — see `OPEN-BLOCKERS.md`.
12. **Owner decisions D-1 … D-12** — see `OPEN-OWNER-DECISIONS.md`.

## 3. Fresh observations recorded in the original report — 2026-10-31T21:58Z [HISTORICAL]

All values below are quoted as retained from the summary of the original report. Each was re-verified FRESH during this archive mission — see `EVIDENCE-REGISTER.md` and `GIT-REF-PRESERVATION-INVENTORY.md` for fresh values and deltas.

1. HEAD = `1f4c6d3bf6f48257b11dd828ae904715e236ac3b` on `main`; working tree clean.
2. `backup/main` (local remote-tracking **cache**) = `1f4c6d3…`; **live remote UNVERIFIED at that time**.
3. **36→32/37 reconciliation:** the historical figure "36" was a per-ref sum; the deduplicated union = **32** unique commits across the guard ref set (g1b=2, g1c=5, rc1=4, lineage=25, backup/g1a=1; sum 37). No commit was lost.
4. **Unreachable objects 9→2:** exactly two unreachable commits remained — `f6630e6…` + `a8ba669…` (a stash-type WIP pair); the other seven presumed remounted (assumption UNVERIFIED); no GC evidence.
5. **`/home/z/g1c-work` directory gone**; its worktree metadata and branch locks remained under `.git/worktrees/`.
6. **No WAL/`-shm`/`-journal` sidecars**; `custom.db` journal_mode = delete; LIVE-SET = {custom.db}; sha256 `0057e27c…2bb097`; backup copy `8701ed6d…` (2026-10-16, no capture metadata ⇒ COPY-UNVERIFIED, freshness UNKNOWN).
7. **Dual-DB schema audit identical:** 17 tables; 30 named + 17 auto indexes; no triggers/views/virtual/FTS; no `sqlite_sequence`; no `_prisma_migrations`.
8. **Writers:** next-server (pid 1116, lazy Prisma) and duel-service (pure in-memory, no DB); `lsof` showed zero open fds (necessary-not-sufficient).
9. **F14:** `db:push --accept-data-loss` / `db:migrate` / `db:reset` scripts present in `package.json`.
10. **F15:** post-commit hook = auto-push to backup + **automatic dev-server resurrection** — classified a P0 hidden activation channel.
11. **Tooling:** `sqlite3` NOT installed; `lsof` present; `bun:sqlite` usable read-only.

## 4. What INCIDENT-07 did NOT do

- No mutations; no restores; no service changes; no hook/config changes (read-only + design mission).
- It did not resolve D-1…D-12 (owner decisions) or PB-1…PB-8 (blockers) — all remained open at delivery.

## 5. Limitations of this record

- Full prose, AC texts, R1–R10 texts, waiver names, scenario matrix rows, and the 9-item custody chain texts were not retained in the continuation summary and are NOT reconstructed.
- Recovery requires the owner's chat transcript (materialization per GUARD-EVIDENCE-PERSISTENCE-POLICY §1).

## 6. Redactions

None required (no secret material in retained content).
