import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../src/config";
import { createWorld } from "../src/world";

describe("createWorld", () => {
  it("creates a world with the configured number of workers and sectors", () => {
    const world = createWorld(DEFAULT_CONFIG);
    expect(world.workers.length).toBe(DEFAULT_CONFIG.workerCount);
    expect(world.sectors.length).toBe(DEFAULT_CONFIG.sectorCount);
    expect(world.year).toBe(0);
  });

  it("is deterministic — same seed yields identical world", () => {
    const w1 = createWorld(DEFAULT_CONFIG);
    const w2 = createWorld(DEFAULT_CONFIG);
    expect(w1.workers[0].wage).toBe(w2.workers[0].wage);
    expect(w1.sectors[0].aiExposure).toBe(w2.sectors[0].aiExposure);
  });

  it("different seeds produce different worlds", () => {
    const w1 = createWorld({ ...DEFAULT_CONFIG, seed: 1 });
    const w2 = createWorld({ ...DEFAULT_CONFIG, seed: 2 });
    let different = false;
    for (let i = 0; i < w1.workers.length; i++) {
      if (w1.workers[i].wage !== w2.workers[i].wage) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });

  it("assigns each worker to a valid sector", () => {
    const world = createWorld(DEFAULT_CONFIG);
    const sectorIds = new Set(world.sectors.map((s) => s.id));
    for (const w of world.workers) {
      expect(sectorIds.has(w.sector)).toBe(true);
    }
  });

  it("computes initial rates correctly", () => {
    const world = createWorld(DEFAULT_CONFIG);
    const expectedUnemployment =
      world.workers.filter((w) => !w.employed).length / world.workers.length;
    expect(world.unemploymentRate).toBeCloseTo(expectedUnemployment, 6);
    expect(world.aiAdoptionRate).toBeGreaterThanOrEqual(0);
    expect(world.aiAdoptionRate).toBeLessThanOrEqual(1);
  });
});
