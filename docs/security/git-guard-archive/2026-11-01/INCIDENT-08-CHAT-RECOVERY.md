# INCIDENT-08 — CHAT RECOVERY DOCUMENT

> ## ⚠️ RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM
>
> This document is a **reconstruction**, assembled in r02 (mission `N1-5-GIT-GUARD-ARCHIVE-R02`) from what remains accessible of the INCIDENT-08 work. It is **NOT** the original report, must **never** be cited as the original report text, and must **never** be labeled VERBATIM. The original report was produced and **delivered in chat** (owner-attested); its exact wording is **not archived** in any Remote/Workspace file accessible to GLM and **cannot be fully recovered** from the available remnants. Status of the report itself: `CHAT_SOURCE_AVAILABLE — NOT YET ARCHIVED VERBATIM` (see `INCIDENT-08.md`).

---

## 0. Document status and reading rules

| Field | Value |
|---|---|
| Document class | Recovered content reference (`RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM`) |
| Subject | The chat-delivered INCIDENT-08 report (READ-ONLY + DESIGN correction of INCIDENT-07 blockers) |
| Mission-order scope of INCIDENT-08 | Recorded separately in `INCIDENT-08.md` §1 (`RECONSTRUCTED — NOT VERBATIM`) — not duplicated here |
| Authorization status of everything herein | **NOT APPROVED — NOT EXECUTABLE.** Nothing in this document is owner-approved; the independent review verdict is HOLD (see §13). PB-1…PB-8 all remain OPEN. |
| r01 baseline | branch `archive/git-guard-incidents-01-08-2026-11-01-r01` @ `3482a286b0da30bf1c90e0bc6d56f9a25f87925a` (preserved unchanged) |

**Evidence tiers used in this document (three sources, kept separate):**

- **[DELIVERED-REPORT]** — content the owner has attested was part of the chat-delivered INCIDENT-08 report (attestation recorded in mission order `N1-5-GIT-GUARD-ARCHIVE-R02`). Attestation is evidence *that the content existed*, not evidence of its exact wording.
- **[SESSION-SUMMARY]** — content retained through the session continuation summary (the same medium that preserved INCIDENT-01…07 records).
- **[INDEPENDENT-ASSESSMENT]** — the separate, post-delivery review verdict of the delivered report (§13). Belongs to a different evaluation level than [DELIVERED-REPORT] and must never be substituted for it.

**Discipline:** where exact wording is unknown, this document writes **NOT RECOVERED** and does not guess. Topic lists record *subjects that are attested to have been covered* — never invented details. No acceptance criterion, matrix cell, or algorithm step is fabricated.

---

## 1. Evidence basis and provenance

1. Owner mission order `N1-5-GIT-GUARD-ARCHIVE-R02` — explicit attestation that the INCIDENT-08 report was produced and delivered in chat, with the topic inventory reproduced in this document. [DELIVERED-REPORT — attestation medium]
2. Session continuation summary — carries the 14-section mission-order scope (recorded in `INCIDENT-08.md` §1) and partial report content. [SESSION-SUMMARY]
3. r01 archive (2026-10-31) — recorded at the time that the report's verbatim text was absent from accessible files; r01's stronger claim ("never produced") is **retracted** in r02 (see `INCIDENT-08.md` §5, correction log; `EVIDENCE-REGISTER.md` EV-027 → EV-039).

---

## 2. [A] Preservation model — P0 / P1 / P2  [DELIVERED-REPORT]

The delivered report defined a three-level preservation model. Recovered semantics:

| Level | Name | Recovered meaning | What it does NOT prove |
|---|---|---|---|
| **P0** | Evidence Captured | The content existed at a specific, identifiable time; it was read; and its hash was recorded. | By itself proves **neither durability nor completeness** — a hash of a transient copy is still transient. |
| **P1** | Preservation Verified | The information necessary for reconstruction was checked, with internal consistency against a defined procedure. | Does **not** prove that reconstruction on a damaged platform will definitely succeed. |
| **P2** | Recovery Durability Established | Requires evidence of platform durability, restart/recovery testing, and an independent medium or independent version. | — (this level was NOT reached) |

**Binding constraint:** PB-1 (no durable volume / no external anchor) was **open** in the delivered report ⇒ **no P2 claim is permitted for any local snapshot.** This archive keeps that rule (see `README.md` §6).

**Object classes — assessed separately (recovered topic list):** Git ODB · refs · index · tracked changes · untracked/ignored files · unreachable objects · stash · worktrees · DB and sidecars · uploads · `.env` · platform configuration.

> Limit: the r01 scope record says "13 object classes"; the list recovered here names 12 topics. The exact 13-class partition of the delivered report is **NOT RECOVERED** — do not reconcile by guessing (see §15).

---

## 3. [B] Quiescence — three states  [DELIVERED-REPORT]

The delivered report rebuilt quiescence as **three distinct states**:

1. `QUIESCENCE_OBSERVED` — quietness was observed at a point in time (e.g., empty `lsof`, stopped processes).
2. `WRITE_EXCLUSION_ENFORCED` — a technical mechanism actually excludes writers (provable exclusion).
3. `WRITE_EXCLUSION_UNVERIFIED` — no exclusion mechanism proven; only observation, at best.

**Recovered reasoning (attested topics):**

- Observing an empty `lsof` or an empty process list is an **observation, not a proof boundary** — it does not prove the absence of *future* writes.
- A hash re-check **detects** change after the fact but does **not prevent** TOCTOU races.
- The examined environment had **no proven write-exclusion mechanism**. Therefore, in the delivered model:
  - **DATA_RESTORE: forbidden**;
  - **in-place SOURCE_RESTORE: requires an explicit human decision** (verbal authorization cannot substitute a technical control);
  - **RUNTIME: blocked** (hidden activation channels — see §9);
  - **staged reconstruction**: reviewable only after its destination and required controls are determined.

---

## 4. [C] Intent and authorization state machine  [DELIVERED-REPORT]

- The earlier model — consuming the one-time nonce **simultaneously with the first mutation** — was judged **insufficient for crash-safety** (the nonce could burn without a durable record of intent).
- The model proposed in the delivered report (recovered state sequence):

  ```
  AUTHORIZED
    → INTENT_RECORDED_AND_READBACK_VERIFIED
    → MUTATION_STARTED
    → MUTATION_VERIFIED
    → PLANE_COMPLETED
  ```

  plus **error and ambiguity states** (exact full set NOT RECOVERED; two names retained from the scope record: `INTENT_UNCONFIRMED`, `MUTATION_OUTCOME_UNKNOWN` — see §15).

- **Until PB-1 (durable storage) is solved, the title `INTENT_DURABLE` must not be used.** (The r01 scope record rendered the intermediate state as "INTENT_DURABLE"; the delivered report's recovered model replaces the durable-intent assumption with recorded-and-read-back-verified intent — the renaming rationale is NOT RECOVERED.)
- **In an unknown post-crash state, automatic retry is forbidden.**
- **The absence of an intent record after a crash does NOT prove the nonce was unburned.** (No record ≠ no consumption — that is exactly the crash window the state machine exists to close.)

---

## 5. [D] Register integrity and external-anchor limits  [DELIVERED-REPORT]

- A local hash-chain register can demonstrate **internal integrity** (tamper-evidence within the chain).
- By itself it proves **neither authenticity, nor durability, nor anti-rollback**.
- **No external anchor existed in the examined environment** ⇒ **anti-rollback claims are forbidden** (consistent with PB-1; consistent with `OPEN-BLOCKERS.md` PB-1 consequences).
- The delivered report also defined behaviors for missing / corrupt / truncated / rolled-back / unavailable registers [DELIVERED-REPORT — topic attested; exact texts NOT RECOVERED].

---

## 6. [E] Permission matrix — conceptual summary (9 operational classes)  [DELIVERED-REPORT]

The delivered report carried a permission matrix of **9 operational classes**. **The exact table text is NOT RECOVERED** from the available remnants; it is registered here as a **conceptual summary only**, and the verbatim table is explicitly unavailable.

**Recovered general rule (attested):**

- **Any unresolved operation = DENY** (closed-world matrix; unlisted ⇒ denied — consistent with DD-11).
- **Evidence capture or copy** is possible only with a **pre-approved destination**, **explicit labeling**, and **appropriate controls** — a preservation copy is **not** automatically non-destructive.
- **No implicit authorization** for mutation or recovery is issued by anything in this document.

Retained class endpoints (from the r01 scope record): `READ_ONLY_OBSERVATION` … `GC_OR_DELETION`. The intermediate class names are **NOT RECOVERED** (§15).

---

## 7. [F] DATA_RESTORE gates  [DELIVERED-REPORT]

Three separate gates, **all of which must pass**:

1. `DATA_ARTIFACT_VALID`
2. `DATA_REPLACEMENT_SAFE`
3. `RUNTIME_COMPATIBLE`

**Rule:** any gate value **UNKNOWN blocks execution**. An **owner waiver cannot turn UNKNOWN consistency into PASS** — waivers may accept risk, they cannot manufacture evidence.

---

## 8. [G] SOURCE_RESTORE staged process — S0–S9 topics  [DELIVERED-REPORT]

The delivered report contained a **staged, step-numbered process (S0 through S9)** for source restoration. **The exact ordering and full step texts are NOT fully recovered — do not guess them.**

**Recovery topics attested to have been covered by the process:**

- inventory export
- ODB copy
- index
- working-tree quarantine
- stash / worktree
- DB and `.env`
- platform configuration
- manifest
- re-probe

**Recovered constraints (attested):**

- A **raw copy of ODB/refs/index while quiescence is unproven cannot count as automatic P1** (§3).
- The **S9 recheck does not necessarily discover all concurrent mutations** in pack/ref files — a clean recheck at S9 is not proof that no interleaved write occurred.

---

## 9. [H] Runtime activation risk  [DELIVERED-REPORT]

Two activation channels were examined:

1. **The post-commit hook** — auto-push + automatic dev-server resurrection (F15; hidden activation channel — see `OPEN-BLOCKERS.md` B-OPS-03).
2. **`.zscripts/dev.sh`** — the activation chain recorded in the delivered report:

   ```
   bun install → bun run db:push → next dev → health → mini-services
   ```

   and `bun run db:push` resolves to:

   ```
   prisma db push --accept-data-loss
   ```

**Recovered assessment:**

- `prisma db push --accept-data-loss` inside the boot chain is a **dangerous mutation path**: an ordinary developer-mode start can silently mutate or destroy database content.
- However, the **presence of the command does not prove it actually executed** in the examined boot, nor that it mutated the live DB — that distinction is recorded, not resolved.
- **Every `dev.sh` execution requires BOTH a Runtime authorization AND a separate Data-Mutation authorization.**

---

## 10. [I] Canonical basis hash — spec attributes and internal inconsistency  [DELIVERED-REPORT]

The delivered report specified a canonical basis hash with (recovered) attributes:

- SHA-256 as the hash function;
- UTF-8 canonical stream;
- domain separation;
- sectioning;
- fixed ordering;
- NFC normalization;
- binding to the policy and to the (restore) plane.

**Internal inconsistency found in the specification (attested):**

- one section defined arrays as `key[n]=item`;
- another example used `operation_set=[DATA_MUTATION,REGISTER_AUDIT]`;
- escaping and the serialization delimiters (`=`, newlines) were **not fully closed**.

**Result:** until the spec is corrected and an **unambiguous canonical serialization** is defined, **the basis hash is NOT a reliable reference for authorization** (it cannot serve as the binding anchor DD-14 intends).

---

## 11. [J] Acceptance criteria — count 26, texts NOT RECOVERED  [DELIVERED-REPORT + SESSION-SUMMARY]

| Item | Value |
|---|---|
| Declared count in the delivered report | **26** [DELIVERED-REPORT — owner-attested] |
| Verbatim text of each criterion | **NOT RECOVERED** |
| Detail status | **NEEDS SOURCE RECOVERY** |
| Criteria marked PASS | **none** — no unknown criterion may be counted as PASS |
| Fabricated list AC-01…AC-26 | **none produced** — deliberately |

> Cross-reference: the r01 scope record says "≥25 acceptance criteria (6-property format)" [SESSION-SUMMARY]. Both figures are preserved with their sources: the scope's lower bound (≥25) and the delivered report's declared count (26). The 6-property format is attested as a topic; its exact properties are NOT RECOVERED.

---

## 12. [K] Remaining blockers PB-1 … PB-8  [DELIVERED-REPORT topics / r01 IDs]

All eight blockers **remain OPEN** unless a separate, fresh document proves otherwise. Subject lines below are owner-attested one-liners (R02 §6.1.K); r01 records PB-2…PB-8 as IDs-only — consistent: subjects attested, full texts still not retained.

| ID | Subject (owner-attested one-liner) | Status |
|---|---|---|
| **PB-1** | durable volume | OPEN |
| **PB-2** | owner authorization identity | OPEN |
| **PB-3** | write exclusion | OPEN |
| **PB-4** | writer inventory | OPEN |
| **PB-5** | live remote validation | OPEN |
| **PB-6** | comparison tooling | OPEN |
| **PB-7** | backup provenance | OPEN |
| **PB-8** | hook + dev.sh activation channels | OPEN |

The delivered report also included a **blocker impact analysis in SOURCE/DATA/RUNTIME columns** [DELIVERED-REPORT — topic attested; full texts NOT RECOVERED, §15].

---

## 13. [L] Verdicts — two independent levels (do not conflate)  [DELIVERED-REPORT] + [INDEPENDENT-ASSESSMENT]

There are **two separate assessments** belonging to **two different evaluation levels**. Neither may be substituted for the other; neither authorizes execution.

**1) Verdict of the GLM-delivered INCIDENT-08 report itself** [DELIVERED-REPORT — owner-attested]:

> **"DESIGN READY FOR OWNER REVIEW — restricted mode"**

**2) Verdict of the independent (ChatGPT) review performed on that report** [INDEPENDENT-ASSESSMENT]:

> **"HOLD — MULTIPLE DESIGN BLOCKERS; NOT EXECUTABLE"**

**Recorded grounds of the independent HOLD** (each as attested):

- **P0:** an identical DB hash at two points in time does **not** prove zero writes or zero commits in between.
- **P0:** an empty `lsof` does **not** prove write exclusion.
- **P0:** the presence of `db:push --accept-data-loss` in the `dev.sh` path makes a **separate data-mutation authorization mandatory**.
- **P0/P1:** a live copy of ODB/refs/index **without proven quiescence is not P1**.
- **P0:** nonce-burn and durable intent (`INTENT_DURABLE`) cannot be guaranteed **without a durable external store**.
- **P1:** the basis-hash serialization is **inconsistent and incomplete** (§10).
- **P1:** the 32-commit count proves **only the observed union of refs** — not full history, and not the live remote.
- **P1:** `/tmp` is **not a proven-durable destination**.
- **P1:** composition across SOURCE/DATA/RUNTIME must be **bound exactly** (one plane never authorizes another — DD-10).

**Operational consequence:** **no implementation and no recovery has been authorized.** The INCIDENT-08 designs await owner review; the independent verdict requires the blockers to be addressed first.

---

## 14. The 32-commit reconciliation — dual attribution  [DELIVERED-REPORT attestation + r01 FRESH data]

- **Initial computation and list:** documented in **INCIDENT-07** (fresh observation 2026-10-31T21:58Z; 36 per-ref sum → 32 deduplicated union / 37 incl. overlap).
- **Re-verification:** performed in the **chat-delivered INCIDENT-08 report** (**OWNER-ATTESTED**): the same 32 commits, the **dedup decomposition**, the **five-way overlap**, the **per-ref breakdown**, and the separation of **local refs** from **remote-tracking refs**. The full repeated text of that re-verification is **not archived verbatim** (recorded as OWNER-ATTESTED / UNVERIFIED-verbatim).
- The **32-SHA list and per-ref counts in this archive** (`GIT-REF-PRESERVATION-INVENTORY.md` §2/§3) are the archive mission's own FRESH capture (2026-10-31T22:43Z+) and are unchanged in r02.
- `DISCREPANCY-01` is corrected **append-only** in `INCIDENT-08.md` §2 (original r01 text retained); see also `GIT-REF-PRESERVATION-INVENTORY.md` §8.

---

## 15. Non-recoverable items register (NEEDS SOURCE RECOVERY)

The following exist in the delivered report but **cannot be recovered verbatim** from the remnants accessible to GLM. None may be reconstructed by guessing; recovery requires the owner's chat transcript (materialization per GUARD-EVIDENCE-PERSISTENCE-POLICY §1) or owner confirmation of permanent loss.

| # | Item | Recovered so far |
|---|---|---|
| N-1 | Verbatim texts of the **26 acceptance criteria** | count only (§11) |
| N-2 | Exact **S0–S9 ordering** and full step texts | topic list only (§8) |
| N-3 | Verbatim **permission matrix** (9 classes, incl. intermediate class names) | endpoints + general rule only (§6) |
| N-4 | Full set of state-machine **error/ambiguity state names** | 2 of 5 names (§4) |
| N-5 | Complete **canonical serialization rules** (escaping, delimiters, array encoding) | inconsistency description only (§10) |
| N-6 | Full texts of the **blocker impact analysis** (SOURCE/DATA/RUNTIME columns) | topic only (§12) |
| N-7 | The exact **13-class object partition** | 12 named topics (§2) |
| N-8 | The **six-option verdict list** full texts | new option name `HOLD — PRESERVATION GUARANTEE MODEL INCOMPLETE` retained from the scope record; delivered verdict string retained (§13) |
| N-9 | Full prose of every section | topic-level content only (this document) |

---

## 16. What would upgrade this document

1. **Owner chat transcript** → materialization of the verbatim report text per GUARD-EVIDENCE-PERSISTENCE-POLICY §1; this document would then be superseded by a verbatim registration and the N-1…N-9 items closed.
2. **Independent review** of this recovered document (it has not itself passed independent review yet).
3. **Owner decisions** on D-1…D-12 and on adoption of DD-15…DD-23 — none exist as of this revision.

Until then: this document is a content reference with **no authorization effect**.

---

## 17. Provenance chain

```
INCIDENT-08 report delivered in chat (owner-attested)
        │  verbatim text not archived
        ▼
r01 archive 2026-10-31 — branch archive/git-guard-incidents-01-08-2026-11-01-r01 @ 3482a286b0da30bf1c90e0bc6d56f9a25f87925a
        │  (recorded "report never produced" — retracted in r02)
        ▼
R02 mission order N1-5-GIT-GUARD-ARCHIVE-R02 (owner attestation + recovery authorization)
        │
        ▼
THIS DOCUMENT — built 2026-11-01 in isolated hook-free environment
(hash integrity: SHA256SUMS of branch archive/git-guard-incidents-01-08-2026-11-01-r02)
```

*End of INCIDENT-08-CHAT-RECOVERY.md — RECOVERED FROM CONVERSATION CONTEXT — RECONSTRUCTED — NOT VERBATIM.*
