/**
 * Scenario — branching forecast timelines.
 *
 * A Scenario defines a set of policy shocks over time. runScenario walks the
 * world forward year by year. forkScenario creates a divergent branch from any
 * year, enabling "what if" comparisons (e.g. AI in 2027 vs 2029).
 */

import type { EntropyScopeConfig } from "./config";
import { stepYear } from "./step";
import type { StepResult } from "./step";
import type { World } from "./world";
import { createWorld } from "./world";

export interface ScenarioPolicy {
  year: number;
  type: "ai" | "remote" | "four-day" | "automation";
  value: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  config: EntropyScopeConfig;
  policies: ScenarioPolicy[];
  forkedFrom?: string; // scenario id this was forked from
  forkedAtYear?: number;
}

export interface ScenarioState {
  year: number;
  world: World;
  stepResult: StepResult;
}

export interface ScenarioFork {
  fromScenarioId: string;
  fromYear: number;
  newScenarioId: string;
}

export function scenario(
  id: string,
  name: string,
  description: string,
  config: EntropyScopeConfig,
  policies: ScenarioPolicy[] = [],
): Scenario {
  return {
    id,
    name,
    description,
    config,
    policies,
  };
}

export function runScenario(scn: Scenario): ScenarioState[] {
  const world = createWorld(scn.config);
  const states: ScenarioState[] = [];

  // Apply year-0 policies
  let currentWorld = world;
  for (const pol of scn.policies) {
    if (pol.year === 0) {
      applyPolicy(currentWorld, pol);
    }
  }

  states.push({
    year: 0,
    world: currentWorld,
    stepResult: {
      world: currentWorld,
      changes: {
        workersAffected: 0,
        jobsLost: 0,
        jobsGained: 0,
        wageBillDelta: 0,
        unemploymentDelta: 0,
      },
    },
  });

  for (let y = 1; y <= scn.config.years; y++) {
    const result = stepYear(currentWorld, scn.config);
    currentWorld = result.world;

    // Apply policies scheduled for this year
    for (const pol of scn.policies) {
      if (pol.year === y) {
        applyPolicy(currentWorld, pol);
      }
    }

    states.push({
      year: y,
      world: currentWorld,
      stepResult: result,
    });
  }

  return states;
}

export function forkScenario(
  source: ScenarioState[],
  sourceConfig: EntropyScopeConfig,
  fromYear: number,
  newId: string,
  newName: string,
  newConfig: Partial<EntropyScopeConfig>,
): Scenario {
  const sourceState = source.find((s) => s.year === fromYear);
  if (!sourceState) {
    throw new Error(`No state at year ${fromYear} to fork from`);
  }

  const forkedConfig: EntropyScopeConfig = {
    seed: sourceState.world.seed,
    years: sourceConfig.years,
    workerCount: sourceConfig.workerCount,
    sectorCount: sourceConfig.sectorCount,
    aiAdoptionYear: sourceConfig.aiAdoptionYear,
    remoteFirstYear: sourceConfig.remoteFirstYear,
    fourDayWeekYear: sourceConfig.fourDayWeekYear,
    automationWaveYear: sourceConfig.automationWaveYear,
    ...newConfig,
  };

  return {
    id: newId,
    name: newName,
    description: `Forked from ${sourceState.world.seed} at year ${fromYear}`,
    config: forkedConfig,
    policies: [],
    forkedFrom: sourceState.world.seed.toString(),
    forkedAtYear: fromYear,
  };
}

function applyPolicy(world: World, pol: ScenarioPolicy): void {
  switch (pol.type) {
    case "ai":
      for (const w of world.workers) {
        if (rand() < pol.value) w.aiExposed = true;
      }
      break;
    case "remote":
      for (const w of world.workers) {
        if (rand() < pol.value) w.remoteEligible = true;
      }
      break;
    case "four-day":
      for (const w of world.workers) {
        if (rand() < pol.value) w.fourDayWeek = true;
      }
      break;
    case "automation":
      for (const w of world.workers) {
        if (rand() < pol.value) {
          w.employed = false;
          w.yearsUnemployed += 1;
        }
      }
      break;
  }
}

function rand(): number {
  // placeholder — real randomness comes from the seeded RNG in stepYear
  return Math.random();
}
