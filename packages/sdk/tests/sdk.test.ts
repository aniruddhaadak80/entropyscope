import { describe, expect, it } from "vitest";
import { MarketSchema, ScenarioSchema, StepResultSchema, WorldSchema } from "../src/index";

describe("sdk wire contracts", () => {
  it("WorldSchema validates a world object", () => {
    const world = {
      seed: 7331,
      year: 5,
      workers: [],
      sectors: [],
      jobs: [],
      totalWageBill: 1000000,
      unemploymentRate: 0.05,
      aiAdoptionRate: 0.3,
      remoteRate: 0.4,
      fourDayWeekRate: 0.2,
    };
    expect(() => WorldSchema.parse(world)).not.toThrow();
  });

  it("StepResultSchema validates a step result", () => {
    const result = {
      world: WorldSchema.parse({
        seed: 7331,
        year: 6,
        workers: [],
        sectors: [],
        jobs: [],
        totalWageBill: 1010000,
        unemploymentRate: 0.06,
        aiAdoptionRate: 0.32,
        remoteRate: 0.42,
        fourDayWeekRate: 0.22,
      }),
      changes: {
        workersAffected: 50,
        jobsLost: 10,
        jobsGained: 5,
        wageBillDelta: 10000,
        unemploymentDelta: 0.01,
      },
    };
    expect(() => StepResultSchema.parse(result)).not.toThrow();
  });

  it("ScenarioSchema validates a scenario", () => {
    const scn = {
      id: "s1",
      name: "Baseline",
      description: "No shocks",
      years: 30,
      policies: [],
    };
    expect(() => ScenarioSchema.parse(scn)).not.toThrow();
  });

  it("MarketSchema validates a market", () => {
    const market = {
      id: "m1",
      question: "Test?",
      yesPrice: 0.6,
      noPrice: 0.4,
      resolved: false,
    };
    expect(() => MarketSchema.parse(market)).not.toThrow();
  });

  it("schemas reject invalid data", () => {
    expect(() => WorldSchema.parse({ seed: "not-a-number" })).toThrow();
  });
});
