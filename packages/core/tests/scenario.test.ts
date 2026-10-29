import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../src/config";
import { type ScenarioPolicy, forkScenario, runScenario, scenario } from "../src/scenario";

describe("scenario", () => {
  it("runs a scenario for the configured number of years", () => {
    const scn = scenario("s1", "Baseline", "No policy shocks", DEFAULT_CONFIG, []);
    const states = runScenario(scn);
    expect(states.length).toBe(DEFAULT_CONFIG.years + 1);
    expect(states[0].year).toBe(0);
    expect(states[DEFAULT_CONFIG.years].year).toBe(DEFAULT_CONFIG.years);
  });

  it("applies policies at scheduled years", () => {
    const policies: ScenarioPolicy[] = [{ year: 3, type: "ai", value: 0.5 }];
    const scn = scenario(
      "s2",
      "AI Wave",
      "AI hits in year 3",
      {
        ...DEFAULT_CONFIG,
        aiAdoptionYear: 3,
      },
      policies,
    );
    const states = runScenario(scn);
    expect(states.length).toBe(DEFAULT_CONFIG.years + 1);
    // AI exposure should increase after year 3
    const before = states[3].world.aiAdoptionRate;
    const after = states[4].world.aiAdoptionRate;
    expect(after).toBeGreaterThanOrEqual(before);
  });

  it("forkScenario creates a divergent branch", () => {
    const scn = scenario("s1", "Baseline", "Baseline", DEFAULT_CONFIG, []);
    const states = runScenario(scn);
    const fork = forkScenario(states, DEFAULT_CONFIG, 5, "fork-1", "AI in 2027", {
      aiAdoptionYear: 2,
    });
    expect(fork.id).toBe("fork-1");
    expect(fork.forkedAtYear).toBe(5);
    const forkStates = runScenario(fork);
    expect(forkStates.length).toBe(fork.config.years + 1);
  });

  it("forked scenario diverges from source", () => {
    const scn = scenario("s1", "Baseline", "Baseline", DEFAULT_CONFIG, []);
    const states = runScenario(scn);
    const fork = forkScenario(states, DEFAULT_CONFIG, 5, "fork-2", "Early AI", {
      aiAdoptionYear: 2,
    });
    const forkStates = runScenario(fork);
    // After fork year, the fork should have earlier AI adoption effects
    const sourceYear10 = states[10].world.aiAdoptionRate;
    const forkYear10 = forkStates[10].world.aiAdoptionRate;
    expect(forkYear10).toBeGreaterThanOrEqual(sourceYear10);
  });
});
