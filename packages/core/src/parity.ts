/**
 * parity.ts — TypeScript mirror of PARITY-SPEC v1, the deterministic scalar
 * model shared bitwise across the polyglot stack:
 *
 *   - TypeScript: packages/core/src/parity.ts        (this file)
 *   - Python:     services/agents/parity.py
 *   - Rust/wasm:  crates/engine/src/lib.rs
 *
 * All three are pinned to the same expected numeric outputs by
 * fixtures/parity/expected.json (regenerate: bun run scripts/generate-parity-fixture.ts).
 */

export interface ParityState {
  year: number;
  unemploymentRate: number;
  totalWageBill: number;
  aiAdoptionRate: number;
  remoteRate: number;
}

/** Deterministic starting state derived purely from the seed (integer math). */
export function createParityState(seed: number): ParityState {
  return {
    year: 0,
    unemploymentRate: 0.03 + (seed % 50) * 0.001,
    totalWageBill: 1_000_000 + (seed % 1000) * 100,
    aiAdoptionRate: 0.3,
    remoteRate: 0.4,
  };
}

/** Evolve the world one simulated year. Pure double arithmetic — no RNG. */
export function parityStep(state: ParityState): ParityState {
  return {
    year: state.year + 1,
    unemploymentRate: Math.min(state.unemploymentRate + 0.001, 0.3),
    totalWageBill: state.totalWageBill * 1.02,
    aiAdoptionRate: Math.min(state.aiAdoptionRate + 0.01, 0.9),
    remoteRate: Math.min(state.remoteRate + 0.005, 0.8),
  };
}

export function runParity(seed: number, years: number): ParityState {
  let state = createParityState(seed);
  for (let i = 0; i < years; i++) {
    state = parityStep(state);
  }
  return state;
}

/** Drive `years` steps from `seed`; return the final wage bill (Rust twin). */
export function parityCheck(seed: number, years: number): number {
  return runParity(seed, years).totalWageBill;
}
