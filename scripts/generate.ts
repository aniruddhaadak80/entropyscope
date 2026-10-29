#!/usr/bin/env bun
/**
 * generate.ts — entropyscope scale engine entry point.
 *
 * Usage:
 *   bun run scripts/generate.ts <family> [--seed N]
 *   bun run scripts/generate.ts all [--seed N]
 *
 * Families: routes, components, docs, adrs, i18n, worlds, stories, tests
 *
 * Seeded determinism: same seed => same repo. Seed recorded in packages/seed/seed.json.
 */

import { mulberry32 } from "./mulberry32.ts";

const args = process.argv.slice(2);
const family = args[0] ?? "all";
let seed = 7331;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--seed") seed = Number(args[++i]) ?? 7331;
}

const rand = mulberry32(seed);

console.log(`🎲 entropyscope scale engine — family: ${family}, seed: ${seed}`);

import("./generators/routes.mjs").then((m) => {
  if (family === "all" || family === "routes") m.generateRoutes(rand, seed);
});
import("./generators/components.mjs").then((m) => {
  if (family === "all" || family === "components") m.generateComponents(rand, seed);
});
import("./generators/docs.mjs").then((m) => {
  if (family === "all" || family === "docs") m.generateDocs(rand, seed);
});
import("./generators/adrs.mjs").then((m) => {
  if (family === "all" || family === "adrs") m.generateADRs(rand, seed);
});
import("./generators/i18n.mjs").then((m) => {
  if (family === "all" || family === "i18n") m.generateI18n(rand, seed);
});
import("./generators/worlds.mjs").then((m) => {
  if (family === "all" || family === "worlds") m.generateWorlds(rand, seed);
});
import("./generators/tests.mjs").then((m) => {
  if (family === "all" || family === "tests") m.generateTests(rand, seed);
});
import("./generators/stories.mjs").then((m) => {
  if (family === "all" || family === "stories") m.generateStories(rand, seed);
});

console.log("✅ Scale engine pass complete. Run `bun run scripts/loc-count.mjs` to measure.");
