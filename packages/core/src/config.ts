/**
 * Simulation configuration. Seed 7331 is the canonical universe seed.
 * All randomness flows through mulberry32 seeded from this value.
 */

export const SEED = 7331;

export const DEFAULT_YEARS = 30; // simulate 30 simulated years
export const DEFAULT_WORKERS = 1000; // 1,000 simulated workers
export const DEFAULT_SECTORS = 8;

export interface EntropyScopeConfig {
  seed: number;
  years: number;
  workerCount: number;
  sectorCount: number;
  aiAdoptionYear: number; // year AI adoption wave begins
  remoteFirstYear: number; // year remote-first becomes dominant
  fourDayWeekYear: number | null; // year four-day week policy starts (null = never)
  automationWaveYear: number; // year automation wave hits
}

export const DEFAULT_CONFIG: EntropyScopeConfig = {
  seed: SEED,
  years: DEFAULT_YEARS,
  workerCount: DEFAULT_WORKERS,
  sectorCount: DEFAULT_SECTORS,
  aiAdoptionYear: 5,
  remoteFirstYear: 3,
  fourDayWeekYear: 8,
  automationWaveYear: 12,
};
