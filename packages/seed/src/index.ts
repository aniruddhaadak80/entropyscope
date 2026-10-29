/**
 * @entropyscope/seed — offline seed datasets for the entropyscope demo.
 * All data is deterministic, generated from seed 7331.
 * Zero network dependency — the demo works fully offline.
 */

export const SEED = 7331;

export const scenarios = [
  {
    id: "baseline",
    name: "Baseline",
    description: "No major policy shocks. Natural evolution of the labor market.",
    policies: [],
  },
  {
    id: "early-ai",
    name: "Early AI Wave",
    description: "AI adoption accelerates in year 2 instead of year 5.",
    policies: [{ year: 2, type: "ai", value: 0.6 }],
  },
  {
    id: "late-ai",
    name: "Late AI Wave",
    description: "AI adoption delayed until year 8.",
    policies: [{ year: 8, type: "ai", value: 0.6 }],
  },
  {
    id: "remote-first",
    name: "Remote-First Acceleration",
    description: "Remote work becomes dominant in year 2.",
    policies: [{ year: 2, type: "remote", value: 0.7 }],
  },
  {
    id: "four-day-week",
    name: "Four-Day Week",
    description: "Four-day week policy starts in year 5.",
    policies: [{ year: 5, type: "four-day", value: 0.5 }],
  },
  {
    id: "automation-wave",
    name: "Automation Wave",
    description: "Heavy automation displacement in year 10.",
    policies: [{ year: 10, type: "automation", value: 0.4 }],
  },
] as const;

export const sectorData = [
  { id: "healthcare", name: "Healthcare", aiExposure: 0.25, remoteRate: 0.35, wageBase: 65000 },
  { id: "education", name: "Education", aiExposure: 0.4, remoteRate: 0.45, wageBase: 55000 },
  { id: "technology", name: "Technology", aiExposure: 0.7, remoteRate: 0.85, wageBase: 95000 },
  {
    id: "manufacturing",
    name: "Manufacturing",
    aiExposure: 0.75,
    remoteRate: 0.15,
    wageBase: 60000,
  },
  { id: "finance", name: "Finance", aiExposure: 0.65, remoteRate: 0.6, wageBase: 85000 },
  { id: "retail", name: "Retail", aiExposure: 0.55, remoteRate: 0.2, wageBase: 40000 },
  { id: "construction", name: "Construction", aiExposure: 0.3, remoteRate: 0.1, wageBase: 58000 },
  { id: "logistics", name: "Logistics", aiExposure: 0.6, remoteRate: 0.25, wageBase: 52000 },
] as const;

export const markets = [
  {
    id: "unemployment-year-10",
    question: "Will unemployment be below 5% in year 10?",
    yesPrice: 0.5,
    noPrice: 0.5,
    resolved: false,
  },
  {
    id: "ai-adoption-year-15",
    question: "Will more than 50% of jobs be AI-exposed by year 15?",
    yesPrice: 0.4,
    noPrice: 0.6,
    resolved: false,
  },
  {
    id: "remote-dominance",
    question: "Will remote work exceed 60% of all jobs?",
    yesPrice: 0.35,
    noPrice: 0.65,
    resolved: false,
  },
  {
    id: "four-day-week-adoption",
    question: "Will the four-day week exceed 30% of workers?",
    yesPrice: 0.25,
    noPrice: 0.75,
    resolved: false,
  },
] as const;

export function seedWorld(config: Record<string, unknown>) {
  return {
    seed: SEED,
    ...config,
    scenarios,
    sectors: sectorData,
    markets,
    generatedAt: new Date().toISOString(),
  };
}
