#!/usr/bin/env bun
/**
 * seed.ts — CLI entry point for seeding the entropyscope database.
 * Run with: bun run packages/seed/seed.ts
 */

import { SEED, seedWorld } from "./index";

console.log(`🌱 Seeding entropyscope universe (seed ${SEED})...`);
const world = seedWorld({ years: 30, workerCount: 1000, sectorCount: 8 });
console.log(
  `✅ Seed complete: ${world.scenarios.length} scenarios, ${world.sectors.length} sectors, ${world.markets.length} markets`,
);
console.log(`📊 Universe ready at seed ${SEED}`);
