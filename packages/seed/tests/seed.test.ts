import { describe, expect, it } from "vitest";
import { SEED, markets, scenarios, sectorData, seedWorld } from "../src/index";

describe("seed", () => {
  it("exports the canonical seed", () => {
    expect(SEED).toBe(7331);
  });

  it("scenarios are non-empty", () => {
    expect(scenarios.length).toBeGreaterThan(0);
    expect(scenarios.find((s) => s.id === "baseline")).toBeDefined();
  });

  it("sectorData has valid entries", () => {
    expect(sectorData.length).toBeGreaterThan(0);
    for (const s of sectorData) {
      expect(s.aiExposure).toBeGreaterThanOrEqual(0);
      expect(s.aiExposure).toBeLessThanOrEqual(1);
    }
  });

  it("markets are defined", () => {
    expect(markets.length).toBeGreaterThan(0);
  });

  it("seedWorld produces a coherent world", () => {
    const world = seedWorld({ years: 30, workerCount: 100, sectorCount: 4 });
    expect(world.seed).toBe(SEED);
    expect(world.scenarios.length).toBe(scenarios.length);
  });
});
