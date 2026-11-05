import { describe, expect, it } from "vitest";
import fixtureJson from "../../../fixtures/parity/expected.json";
import { parityCheck, runParity } from "../src/parity";

/**
 * Cross-language parity tests — pin the TypeScript implementation of
 * PARITY-SPEC v1 (packages/core/src/parity.ts) to the shared JSON golden
 * fixture, which services/agents/parity.py, crates/engine and
 * services/parity-go validate against too.
 */

interface ParityCase {
  seed: number;
  years: number;
  wageBill: number;
  unemploymentRate: number;
  aiAdoptionRate: number;
  remoteRate: number;
}

const fixture = fixtureJson as { cases: ParityCase[] };

describe("PARITY-SPEC v1", () => {
  it("parityCheck matches the golden wage bill for every fixture case", () => {
    for (const c of fixture.cases) {
      expect(parityCheck(c.seed, c.years)).toBe(c.wageBill);
    }
  });

  it("full parity state matches the golden fixture for every case", () => {
    for (const c of fixture.cases) {
      const state = runParity(c.seed, c.years);
      expect(state.year).toBe(c.years);
      expect(state.unemploymentRate).toBe(c.unemploymentRate);
      expect(state.totalWageBill).toBe(c.wageBill);
      expect(state.aiAdoptionRate).toBe(c.aiAdoptionRate);
      expect(state.remoteRate).toBe(c.remoteRate);
    }
  });

  it("is deterministic — same seed, same years, same result", () => {
    expect(parityCheck(7331, 10)).toBe(parityCheck(7331, 10));
  });

  it("seed % 1000 groups wage bills (1000 ≡ 2000, 1000 ≢ 1001)", () => {
    expect(parityCheck(1000, 0)).not.toBe(parityCheck(1001, 0));
    expect(parityCheck(1000, 0)).toBe(parityCheck(2000, 0));
  });
});
