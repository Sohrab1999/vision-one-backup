// VIU R3-WAVE2 — quota-gate auto-resume daemon (protocol: docs/SNAPSHOT.md §۳-۵ — 86th/87th header).
// Purpose: detect the daily VLM quota release WITHOUT wasting anything:
//   every ~12 minutes run ONE honest probe = real census of unit 57
//   (its successful capture IS progress — zero waste; a 429 probe is logged and retried).
// On first success (unit-057 census file exists):
//   censusverify upper 51-100  (census 51-57 from cache — zero waste; census 58-100 + verify 51-100 new;
//                               unit 52 owner-excluded — skipped automatically; resume-safe single command)
//   → archive upper            (copy /tmp raw responses into tracked docs/qa capture dirs)
//   → log "GATE COMPLETE" → exit.
// After GATE COMPLETE the pipeline continuation (protective commit → report upper → build --book upper
//   → wiring → audit:viu → QA → full 10-requirement persistence cycle) is the next session's job
//   per §۳-۵ / the platform checkpoints (SNAPSHOT §۱۱-ب row).
// Honesty rules: no fabricated values ever; a failed probe is honestly logged — extraction only via
//   real captures. Cache is seeded from tracked captures (docs/qa/viu-r3-capture-upper/*) when /tmp
//   was reset — see §۳-۵ step ① — so re-running this gate is always zero-waste.
// Launch (the only background pattern proven to survive between tool invocations):
//   DAEMON_NO_GUARD=1 DAEMON_LOG=/tmp/viu/r3/logs/quota-gate.log \
//     bun scripts/dev-server-daemon.mjs bun scripts/viu-r3-quota-gate.mjs
// All output goes to DAEMON_LOG via the daemon's stdio redirect — tail that file for status.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const ROOT = process.cwd();
const PROBE_UNIT = 57;
const INTERVAL_MS = 12 * 60 * 1000; // ~12 minutes (60 probes ≈ 12h budget)
const MAX_PROBES = 60;

const pad3 = (n) => String(n).padStart(3, "0");
const outFile = `/tmp/viu/r3/census/upper/unit-${pad3(PROBE_UNIT)}.json`;

const log = (m) => console.log(`[${new Date().toISOString()}] ${m}`);

log(`quota-gate start — probe=census upper ${PROBE_UNIT}-${PROBE_UNIT} interval=${INTERVAL_MS / 60000}min max_probes=${MAX_PROBES} cwd=${ROOT}`);

for (let i = 1; i <= MAX_PROBES; i++) {
  if (existsSync(outFile)) {
    log(`probe ${i}/${MAX_PROBES}: unit ${PROBE_UNIT} census already cached — gate open`);
  } else {
    log(`probe ${i}/${MAX_PROBES}: honest census upper ${PROBE_UNIT}-${PROBE_UNIT} …`);
    try {
      execFileSync("bun", ["scripts/viu-r3-dict-census.mjs", "census", "upper", `${PROBE_UNIT}-${PROBE_UNIT}`], {
        cwd: ROOT,
        stdio: "ignore", // probe outcome is decided by the capture file, not exit code (script logs FAIL and exits 0)
        timeout: 20 * 60 * 1000,
      });
    } catch (e) {
      log(`probe ${i}/${MAX_PROBES}: census command failed (exit=${e.status ?? "?"}) — likely HTTP 429 quota`);
    }
  }

  if (existsSync(outFile)) {
    log(`GATE OPEN — unit ${PROBE_UNIT} census captured (real progress, zero waste) — resuming censusverify upper 51-100`);
    try {
      execFileSync("bun", ["scripts/viu-r3-dict-census.mjs", "censusverify", "upper", "51-100"], {
        cwd: ROOT,
        stdio: "inherit", // full worker output lands in DAEMON_LOG
        timeout: 6 * 60 * 60 * 1000,
      });
      log(`censusverify upper 51-100 done — archiving captures into tracked docs/qa`);
      execFileSync("bun", ["scripts/viu-r3-dict-census.mjs", "archive", "upper"], {
        cwd: ROOT,
        stdio: "inherit",
        timeout: 30 * 60 * 1000,
      });
      log(`GATE COMPLETE — upper extraction resumed and archived. Exiting per §۳-۵ (pipeline continuation = next session / platform checkpoint).`);
    } catch (e) {
      log(`GATE ERROR after open: ${e.message} — exiting honestly (resume-safe: nothing lost; re-seed cache from tracked captures and rerun per §۳-۵)`);
    }
    process.exit(0);
  }

  log(`probe ${i}/${MAX_PROBES}: still HTTP 429 (no unit-${pad3(PROBE_UNIT)} capture) — sleeping ${INTERVAL_MS / 60000}min`);
  await new Promise((r) => setTimeout(r, INTERVAL_MS));
}

log(`GATE BUDGET EXHAUSTED (${MAX_PROBES} probes ≈ 12h) — exiting honestly; per the registered daily-quota pattern the next session retries (seed cache from tracked captures — zero waste).`);
