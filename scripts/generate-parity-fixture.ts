/**
 * generate-parity-fixture.ts — regenerate the cross-language golden fixture
 * for PARITY-SPEC v1 from the TypeScript reference implementation.
 *
 *   bun scripts/generate-parity-fixture.ts
 *
 * The output (fixtures/parity/expected.json) is committed and must be
 * byte-identical for every consumer; the TypeScript, Python, Rust/wasm and
 * Go mirrors all assert against these exact double-precision values.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { runParity } from "../packages/core/src/parity";

const SEEDS = [0, 1, 5, 7, 42, 50, 1000, 1001, 2000, 7330, 7331, 7332];
const YEARS = [0, 1, 3, 10, 30];

const cases = [];
for (const seed of SEEDS) {
  for (const years of YEARS) {
    const state = runParity(seed, years);
    cases.push({
      seed,
      years,
      wageBill: state.totalWageBill,
      unemploymentRate: state.unemploymentRate,
      aiAdoptionRate: state.aiAdoptionRate,
      remoteRate: state.remoteRate,
    });
  }
}

const out = {
  spec: "PARITY-SPEC v1",
  reference: "packages/core/src/parity.ts",
  mirrors: [
    "services/agents/parity.py",
    "crates/engine/src/lib.rs",
    "services/parity-go/parity.go",
  ],
  cases,
};

const file = join(import.meta.dirname, "../fixtures/parity/expected.json");
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, `${JSON.stringify(out, null, 2)}\n`);
console.log(`✅ parity fixture: ${cases.length} cases → ${file}`);
