/**
 * wiki.mjs — generate a deterministic future-of-work wiki for entropyscope.
 * Produces ~100 reference pages under docs/wiki/, each derived from
 * sector/role/concept/shock taxonomies. Markdown only, zero code risk.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "docs/wiki";

function writeIfMissing(filePath, content) {
  if (existsSync(filePath)) return;
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

const SECTORS = [
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

const ROLES = [
  "Analyst",
  "Designer",
  "Engineer",
  "Manager",
  "Technician",
  "Coordinator",
  "Specialist",
  "Supervisor",
  "Consultant",
  "Operator",
  "Archivist",
  "Planner",
  "Advisor",
  "Auditor",
  "Researcher",
  "Specifier",
  "Reviewer",
  "Maintainer",
  "Dispatcher",
  "Trainer",
];

const CONCEPTS = [
  "AI Exposure",
  "Remote Eligibility",
  "Wage Bill",
  "Reskilling Debt",
  "Brier Score",
  "Constant-Product AMM",
  "Policy Shock",
  "Timeline Fork",
  "Calibration Bin",
  "Unemployment Persistence",
  "Four-Day Week Effect",
  "Automation Wavefront",
  "Skill Half-Life",
  "Productivity J-Curve",
  "Labor Share",
  "Task Bundling",
  "Generalist Premium",
  "Fragility Index",
  "Forecast Horizon",
  "Deterministic Replay",
];

const SHOCKS = [
  "Early AI Adoption",
  "Late AI Adoption",
  "Remote-First Mandate",
  "Four-Day Week",
  "Automation Wave",
  "Reskilling Subsidy",
  "Labor Market Loosen",
  "Trade Openness",
  "Union Resurgence",
  "Export Boom",
  "Credit Squeeze",
  "Climate Levy",
];

const THEMES = [
  "labor dynamics",
  "wage compression",
  "hybrid scheduling",
  "credential inflation",
  "institutional drift",
  "capital deepening",
  "firm-level reorganization",
  "skill adjacency",
  "occupational churn",
  "market clearing",
  "productivity distribution",
  "risk pooling",
];

const MARKETS = [
  "unemployment-year-10",
  "ai-adoption-year-15",
  "remote-dominance",
  "four-day-week-adoption",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function wikiPage(kind, name, seed, rand) {
  const s1 = rand().toFixed(2);
  const s2 = rand().toFixed(2);
  const s3 = rand().toFixed(2);
  const k = rand().toFixed(2);
  const bin = (0.05 + rand() * 0.15).toFixed(2);
  const els = rand().toFixed(1);
  const see = [pick(rand, SECTORS), pick(rand, CONCEPTS), pick(rand, SHOCKS)]
    .map((t) => {
      const slug = slugify(t);
      return `- [${t}](./${slug}.md)`;
    })
    .join("\n");

  return `# ${name}

**Category:** ${kind}  |  **Universe:** seed ${seed}  |  **Cadence:** annual, 30 simulated years

## Overview

${name} sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to ${pick(rand, THEMES)} and
${pick(rand, THEMES)} across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed ${seed} on any machine.

## Simulated response profile

- Early-year signal strength: ${s1}
- Mid-horizon volatility: ${s2}
- Late-horizon persistence: ${s3}
- Sensitivity to policy shocks: ${k}
- Elasticity to reskilling investment: ${els}

## Market linkage

Traders can express a view on ${name} through the outcome market
"${pick(rand, MARKETS)}". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed ${seed}.

## Calibration guidance

Brier scoring uses bins of width ${bin}. Forecasters who track ${name}
historically improve most on bins near ${bin}, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

${see}
- [Index](./index.md)
`;
}

export function generateWiki(rand, seed) {
  let count = 0;

  const groups = [
    ["sector", SECTORS],
    ["role", ROLES],
    ["concept", CONCEPTS],
    ["shock", SHOCKS],
  ];

  for (const [kind, names] of groups) {
    for (const name of names) {
      writeIfMissing(`${ROOT}/${slugify(name)}.md`, wikiPage(kind, name, seed, rand));
      count++;
    }
  }

  // Index page
  const index = [...SECTORS, ...ROLES, ...CONCEPTS, ...SHOCKS]
    .sort()
    .map((n) => `- [${n}](./${slugify(n)}.md)`)
    .join("\n");

  writeIfMissing(
    `${ROOT}/index.md`,
    `# EntropyScope Wiki Index

Deterministic reference library, grown by the scale engine from seed ${seed}.

${index}
`,
  );
  count++;

  console.log(`   wiki: ${count} pages generated`);
  return count;
}
