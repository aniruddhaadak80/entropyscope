/**
 * stepYear — advance the simulation by one year.
 *
 * Applies policy shocks (AI adoption, remote-first, four-day week, automation
 * wave) and updates worker employment, wages, and sector composition.
 * Deterministic given the same seed and config.
 */

import type { EntropyScopeConfig } from "./config";
import { mulberry32 } from "./rng";
import type { World } from "./world";

export interface StepResult {
  world: World;
  changes: {
    workersAffected: number;
    jobsLost: number;
    jobsGained: number;
    wageBillDelta: number;
    unemploymentDelta: number;
  };
}

export function stepYear(world: World, config: EntropyScopeConfig): StepResult {
  const rand = mulberry32(world.seed + world.year + 1);
  const workers = world.workers.map((w) => ({ ...w }));
  const sectors = [...world.sectors];
  const jobs = [...world.jobs];

  let workersAffected = 0;
  let jobsLost = 0;
  let jobsGained = 0;

  // Policy shocks based on current year
  const aiWave = world.year >= config.aiAdoptionYear;
  const remoteWave = world.year >= config.remoteFirstYear;
  const fourDayWave = config.fourDayWeekYear !== null && world.year >= config.fourDayWeekYear;
  const automationWave = world.year >= config.automationWaveYear;

  for (const w of workers) {
    const sector = sectors.find((s) => s.id === w.sector);
    if (!sector) continue;

    // AI exposure risk: automatable jobs face layoffs
    if (aiWave && w.aiExposed && rand() < 0.05) {
      w.employed = false;
      w.yearsUnemployed += 1;
      workersAffected += 1;
      jobsLost += 1;
      continue;
    }

    // Automation wave: additional displacement
    if (automationWave && rand() < 0.03) {
      w.employed = false;
      w.yearsUnemployed += 1;
      workersAffected += 1;
      jobsLost += 1;
      continue;
    }

    // Reskilling: adaptable workers can move to less-exposed sectors
    if (!w.employed && w.adaptability > rand() && w.yearsUnemployed > 0) {
      const safeSector = sectors.reduce(
        (best, s) => (s.aiExposure < (best?.aiExposure ?? 1) ? s : best),
        sectors[0],
      );
      if (safeSector && safeSector.id !== w.sector) {
        w.sector = safeSector.id;
        w.employed = true;
        w.yearsUnemployed = 0;
        w.wage = safeSector.wageBase * (0.7 + rand() * 0.6);
        workersAffected += 1;
        jobsGained += 1;
      } else {
        w.yearsUnemployed += 1;
      }
    }

    // Remote eligibility spreads
    if (remoteWave && !w.remoteEligible && rand() < 0.1) {
      w.remoteEligible = true;
      workersAffected += 1;
    }

    // Four-day week adoption
    if (fourDayWave && !w.fourDayWeek && rand() < 0.15) {
      w.fourDayWeek = true;
      w.wage = w.wage * 0.95; // slight wage trade-off
      workersAffected += 1;
    }

    // Wage growth
    if (w.employed) {
      w.wage = w.wage * (1 + sector.growthRate * 0.5 + (rand() - 0.5) * 0.02);
    }
  }

  // Update sector counts
  for (const s of sectors) {
    s.workerCount = workers.filter((w) => w.sector === s.id).length;
  }

  const employedWorkers = workers.filter((w) => w.employed);
  const totalWageBill = employedWorkers.reduce((sum, w) => sum + w.wage, 0);
  const unemploymentRate = workers.filter((w) => !w.employed).length / workers.length;
  const aiAdoptionRate = workers.filter((w) => w.aiExposed).length / workers.length;
  const remoteRate = workers.filter((w) => w.remoteEligible).length / workers.length;
  const fourDayWeekRate = workers.filter((w) => w.fourDayWeek).length / workers.length;

  const newWorld: World = {
    seed: world.seed,
    year: world.year + 1,
    workers,
    sectors,
    jobs,
    totalWageBill,
    unemploymentRate,
    aiAdoptionRate,
    remoteRate,
    fourDayWeekRate,
  };

  const prevWageBill = world.totalWageBill;
  const prevUnemployment = world.unemploymentRate;

  return {
    world: newWorld,
    changes: {
      workersAffected,
      jobsLost,
      jobsGained,
      wageBillDelta: totalWageBill - prevWageBill,
      unemploymentDelta: unemploymentRate - prevUnemployment,
    },
  };
}
