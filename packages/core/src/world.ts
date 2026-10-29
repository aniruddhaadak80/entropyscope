/**
 * World model — the simulated labor market.
 *
 * A World contains Workers, Sectors, and Jobs. Workers move between sectors
 * based on skill match, automation pressure, and policy shocks (AI, remote,
 * four-day week, automation waves).
 */

import type { EntropyScopeConfig } from "./config";
import { mulberry32 } from "./rng";

export type WorkerId = string;
export type SectorId = string;
export type JobId = string;

export interface Worker {
  id: WorkerId;
  name: string;
  sector: SectorId;
  skill: number; // 0..1 skill level
  adaptability: number; // 0..1 how fast they reskill
  wage: number;
  employed: boolean;
  yearsUnemployed: number;
  aiExposed: boolean; // job is automatable by AI
  remoteEligible: boolean;
  fourDayWeek: boolean;
}

export interface Sector {
  id: SectorId;
  name: string;
  description: string;
  aiExposure: number; // 0..1 how automatable this sector is
  remoteRate: number; // 0..1 share of jobs remote-eligible
  growthRate: number; // yearly growth rate
  wageBase: number; // base wage
  workerCount: number;
}

export interface Job {
  id: JobId;
  sector: SectorId;
  title: string;
  aiExposed: boolean;
  remoteEligible: boolean;
  fourDayWeek: boolean;
  wage: number;
  filled: boolean;
}

export interface World {
  seed: number;
  year: number;
  workers: Worker[];
  sectors: Sector[];
  jobs: Job[];
  totalWageBill: number;
  unemploymentRate: number;
  aiAdoptionRate: number;
  remoteRate: number;
  fourDayWeekRate: number;
}

export function createWorld(config: EntropyScopeConfig): World {
  const rand = mulberry32(config.seed);
  const sectors: Sector[] = [];
  const sectorNames = [
    "Healthcare",
    "Education",
    "Technology",
    "Manufacturing",
    "Finance",
    "Retail",
    "Construction",
    "Logistics",
    "Creative",
    "Legal",
    "Agriculture",
    "Energy",
  ];
  for (let i = 0; i < config.sectorCount; i++) {
    sectors.push({
      id: `sector-${i}`,
      name: sectorNames[i] ?? "Unknown",
      description: `Simulated ${sectorNames[i] ?? "Unknown"} sector`,
      aiExposure: 0.1 + rand() * 0.8,
      remoteRate: 0.1 + rand() * 0.7,
      growthRate: -0.02 + rand() * 0.06,
      wageBase: 40000 + rand() * 80000,
      workerCount: 0,
    });
  }

  const workers: Worker[] = [];
  for (let i = 0; i < config.workerCount; i++) {
    const sectorIdx = Math.floor(rand() * config.sectorCount);
    const sector = sectors[sectorIdx];
    sector.workerCount += 1;
    workers.push({
      id: `worker-${i}`,
      name: `Worker ${i + 1}`,
      sector: sector.id,
      skill: 0.3 + rand() * 0.7,
      adaptability: 0.2 + rand() * 0.6,
      wage: sector.wageBase * (0.7 + rand() * 0.6),
      employed: true,
      yearsUnemployed: 0,
      aiExposed: rand() < sector.aiExposure,
      remoteEligible: rand() < sector.remoteRate,
      fourDayWeek: false,
    });
  }

  const jobs: Job[] = workers.map((w, i) => ({
    id: `job-${i}`,
    sector: w.sector,
    title: `${sectors.find((s) => s.id === w.sector)?.name ?? "General"} Associate`,
    aiExposed: w.aiExposed,
    remoteEligible: w.remoteEligible,
    fourDayWeek: false,
    wage: w.wage,
    filled: true,
  }));

  const totalWageBill = workers.reduce((sum, w) => sum + (w.employed ? w.wage : 0), 0);
  const unemploymentRate = workers.filter((w) => !w.employed).length / workers.length;
  const aiAdoptionRate = workers.filter((w) => w.aiExposed).length / workers.length;
  const remoteRate = workers.filter((w) => w.remoteEligible).length / workers.length;

  return {
    seed: config.seed,
    year: 0,
    workers,
    sectors,
    jobs,
    totalWageBill,
    unemploymentRate,
    aiAdoptionRate,
    remoteRate,
    fourDayWeekRate: 0,
  };
}
