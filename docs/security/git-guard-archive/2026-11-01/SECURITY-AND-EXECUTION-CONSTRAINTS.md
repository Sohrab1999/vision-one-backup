# SECURITY-AND-EXECUTION-CONSTRAINTS

## 1. This mission's authorization envelope (N1-5-GIT-GUARD-PRESERVATION-ARCHIVE-01) — owner text, binding

**Authorized:** (1) read conversation history and existing reports; (2) read repository documents; (3) create a new versioned archive in a new independent branch on the existing remote `backup`; (4) commit & push only that new branch, after passing all safety controls; (5) independently verify remote SHA and content; (6) deliver final report and stop.

**Explicitly NOT authorized (verbatim scope, translated):** changing/deleting/rewriting branch `main`; changing/deleting existing branches; force-push or remote ref deletion; reset/rebase/merge/cherry-pick or history rewrite of existing branches; changing/deleting Git hooks, `core.hooksPath`, Git config, remotes, or credentials; changing databases, uploads, `.env`, or runtime files; running `.zscripts/dev.sh`, `bun install`, `db:push`, `prisma db push`, `db:reset`, or migrations; stopping/starting/restarting or tampering with services/processes; running GC/prune/clean or deleting objects; changing rulesets, GitHub permissions, or repository settings; using `/tmp` as the final archive location; claiming definitive durability or anti-deletion for anything whose hash or read-back was merely verified.

**Publication limits:** push only the new archive branch; no `--force`/`--force-with-lease`; no ref deletion/overwrite; stop if publishing would require changing an existing branch; main-workspace hook untouched/never overridden; archive built in an isolated clone; stop if an unexpected hook with unknown side effects exists in the isolated environment; stop on push failure / pre-existing branch / SHA mismatch / unclear remote state.

## 2. GUARD-EVIDENCE-PERSISTENCE-POLICY v1.0 constraints (owner-decreed, binding — verbatim source in `sources/guard-10.4/`)

- Storage: single-copy artifacts only inside `/home/z/my-project/` (`docs/security/guard-<id>/` for GUARD archives); `/tmp`, `/home/z/guard-reports/`, `upload/` never hold the only copy.
- Three layers (Workspace + Commit + Remote) with **non-substitution rule**; "commit succeeded" alone is not protection; a failed push is never reported as success.
- Pre-mission gates G-1…G-5 (incl. G-2 local-vs-remote comparison; G-4 **no pull/reset/checkout when local is behind remote without diagnosis + owner approval**; G-5 unexpected divergence ⇒ read-only report then wait).
- Post-stage controls incl. explicit allowlist staging (never `add -A` / `add .` / `commit -a` / `--amend` / `--no-verify`), dual-channel push verification (ls-remote + independent second witness), evidence-register rows.
- Permanent prohibitions without explicit owner permission: `git reset`, force push, file deletion as recovery, history rewrite (rebase/filter/amend), auto-restore, directional auto-sync as "fix", manual hook execution.
- Finding grading mandatory: `[اثبات‌شده]` / `[اعلام‌گزارش‌تشخیصی]` / `[فرض/مجهول]` — mirrored in this archive as FRESH / HISTORICAL(owner-declared) / INFERENCE or UNVERIFIED.

**Deviations of this archive mission from policy defaults (authorized by the mission envelope):** archive built in an isolated clone rather than the stable workspace (mission success criterion requires the workspace untouched); worklog append + ledger row update in the workspace therefore NOT performed — recorded as pending item OD-16 instead of silently skipped.

## 3. Runtime constraints & known activation channels (FRESH unless noted)

- Post-commit hook `ee679bc1…aed71` (1391 B) = auto-push to backup + dev-server auto-resurrection (F15, HISTORICAL). Any commit made in the main workspace triggers it. This archive made **no commits in the main workspace** — the hook never fired for this mission.
- `core.hooksPath` unset (FRESH). Isolated clones contain only sample hooks (verified) — no unexpected hook executed.
- F14 (HISTORICAL): `db:push --accept-data-loss`, `db:migrate`, `db:reset` scripts exist — startup-migration risk (D-12).
- Tooling (HISTORICAL, INCIDENT-07): `sqlite3` absent; `lsof` present; `bun:sqlite` read-only usable.

## 4. Confidentiality rules applied in this archive

- No secrets, tokens, credentials, `.env` content, private keys, or credential-bearing URLs archived. Remote URL always redacted as `https://[REDACTED]@github.com/Sohrab1999/vision-one-backup.git` (credential-embedded URL recorded as hygiene issue under D-05 scope).
- Sensitive files (`.env`, DB files) referenced by hash/size/mtime only; contents never read or copied.
- DB, uploads, `.git`, runtime files and binaries excluded from the archive tree (archive branch is orphan, documentation-only).
- Pre-publication secret scan of all archive files performed (results in the mission's final report).

## 5. What remains forbidden going forward (until owner decides otherwise)

Everything in §1 "NOT authorized" that was mission-scoped reverts to the standing prohibition set (§2 §7.3 + A-03 in `APPROVED-OWNER-DECISIONS.md`): no resets, no force, no history rewrite, no hook/config/remote changes, no DB/runtime mutations, no service stop/start, no GC, no workspace sync (G-4), no durability over-claims. Next session must re-state its own envelope from the owner's mission order and re-run gates G-1…G-5.
