/**
 * @entropyscope/core — pure domain logic for the entropyscope forecasting sandbox.
 *
 * Everything here is dependency-free, deterministic, and fully unit-tested.
 * No API keys, no network, no randomness beyond a seeded PRNG.
 *
 * Exports:
 *  - mulberry32 — seeded PRNG
 *  - createWorld — build a simulated labor market from seed
 *  - stepYear — advance the simulation by one year
 *  - scenario — define and run branching scenario timelines
 *  - predictionMarket — shares, prices, resolution
 *  - calibration — Brier-score calibration tracking
 *  - fork — fork a scenario state at any year
 */

export { mulberry32 } from "./rng";
export { createWorld, type World, type Worker, type Sector, type Job } from "./world";
export { stepYear, type StepResult } from "./step";
export {
  scenario,
  runScenario,
  forkScenario,
  type Scenario,
  type ScenarioState,
  type ScenarioFork,
} from "./scenario";
export {
  predictionMarket,
  type Share,
  type Market,
  type Resolution,
} from "./prediction-market";
export { calibration, type CalibrationRecord, type BrierResult } from "./calibration";
export { SEED, type EntropyScopeConfig } from "./config";
