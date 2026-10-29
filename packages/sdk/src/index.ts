/**
 * @entropyscope/sdk — typed client for the entropyscope API.
 *
 * Generated from the OpenAPI spec (see docs/api/openapi.yaml).
 * All functions return zod-validated types.
 */

import { z } from "zod";

// Wire contracts
export const WorldSchema = z.object({
  seed: z.number(),
  year: z.number(),
  workers: z.array(z.any()),
  sectors: z.array(z.any()),
  jobs: z.array(z.any()),
  totalWageBill: z.number(),
  unemploymentRate: z.number(),
  aiAdoptionRate: z.number(),
  remoteRate: z.number(),
  fourDayWeekRate: z.number(),
});

export type World = z.infer<typeof WorldSchema>;

export const StepResultSchema = z.object({
  world: WorldSchema,
  changes: z.object({
    workersAffected: z.number(),
    jobsLost: z.number(),
    jobsGained: z.number(),
    wageBillDelta: z.number(),
    unemploymentDelta: z.number(),
  }),
});

export type StepResult = z.infer<typeof StepResultSchema>;

export const ScenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  years: z.number(),
  policies: z.array(z.any()),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export const MarketSchema = z.object({
  id: z.string(),
  question: z.string(),
  yesPrice: z.number(),
  noPrice: z.number(),
  resolved: z.boolean(),
});

export type Market = z.infer<typeof MarketSchema>;

// SDK client
export class EntropyScopeClient {
  constructor(private baseUrl: string) {}

  async getWorld(): Promise<World> {
    const res = await fetch(`${this.baseUrl}/api/world`);
    return WorldSchema.parse(await res.json());
  }

  async stepYear(world: World): Promise<StepResult> {
    const res = await fetch(`${this.baseUrl}/api/step`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(world),
    });
    return StepResultSchema.parse(await res.json());
  }

  async getMarkets(): Promise<Market[]> {
    const res = await fetch(`${this.baseUrl}/api/markets`);
    return z.array(MarketSchema).parse(await res.json());
  }

  async buyShares(marketId: string, outcome: "yes" | "no", amount: number) {
    const res = await fetch(`${this.baseUrl}/api/markets/${marketId}/shares`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outcome, amount }),
    });
    return await res.json();
  }
}
