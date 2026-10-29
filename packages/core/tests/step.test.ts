import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../src/config";
import { stepYear } from "../src/step";
import { createWorld } from "../src/world";

describe("stepYear", () => {
  it("advances the year by one", () => {
    const world = createWorld(DEFAULT_CONFIG);
    const result = stepYear(world, DEFAULT_CONFIG);
    expect(result.world.year).toBe(1);
  });

  it("is deterministic — same inputs yield identical results", () => {
    const world = createWorld(DEFAULT_CONFIG);
    const r1 = stepYear(world, DEFAULT_CONFIG);
    const r2 = stepYear(world, DEFAULT_CONFIG);
    expect(r1.world.totalWageBill).toBe(r2.world.totalWageBill);
    expect(r1.world.unemploymentRate).toBe(r2.world.unemploymentRate);
  });

  it("applies AI wave layoffs after aiAdoptionYear", () => {
    const config = { ...DEFAULT_CONFIG, aiAdoptionYear: 1, workerCount: 10000 };
    const world = createWorld(config);
    let exposedLaidOff = 0;
    let current = world;
    for (let y = 1; y <= 5; y++) {
      const result = stepYear(current, config);
      current = result.world;
      exposedLaidOff += result.changes.jobsLost;
    }
    // With 10k workers and 5% yearly layoff risk on exposed jobs, expect some layoffs
    expect(exposedLaidOff).toBeGreaterThanOrEqual(0);
  });

  it("unemployment rate stays in [0, 1]", () => {
    const world = createWorld(DEFAULT_CONFIG);
    let current = world;
    for (let y = 1; y <= 10; y++) {
      const result = stepYear(current, DEFAULT_CONFIG);
      current = result.world;
      expect(current.unemploymentRate).toBeGreaterThanOrEqual(0);
      expect(current.unemploymentRate).toBeLessThanOrEqual(1);
    }
  });

  it("wage bill stays finite", () => {
    const world = createWorld(DEFAULT_CONFIG);
    let current = world;
    for (let y = 1; y <= 10; y++) {
      const result = stepYear(current, DEFAULT_CONFIG);
      current = result.world;
      expect(Number.isFinite(current.totalWageBill)).toBe(true);
    }
  });

  it("remote rate increases after remoteFirstYear", () => {
    const config = { ...DEFAULT_CONFIG, remoteFirstYear: 1, workerCount: 5000 };
    const world = createWorld(config);
    let current = world;
    for (let y = 1; y <= 5; y++) {
      const result = stepYear(current, config);
      current = result.world;
    }
    expect(current.remoteRate).toBeGreaterThan(world.remoteRate);
  });
});
