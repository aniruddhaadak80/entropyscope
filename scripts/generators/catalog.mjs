/**
 * catalog.mjs — generate deterministic job catalog + skills taxonomy data.
 * Output: packages/seed/catalog/jobs-<sector>.json (12 files) and
 * packages/seed/catalog/skills.json. Large readable JSON fixtures used by
 * the docs and future UI drill-downs.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/seed/catalog";

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

const LEVELS = ["Associate", "Senior", "Lead", "Principal", "Staff"];

const SUFFIX = ["", "II", "III"];

const TASKS = [
  "coordinate cross-team reviews",
  "maintain operational tooling",
  "translate policy updates into runbooks",
  "audit quarterly output quality",
  "model demand scenarios",
  "interface with external partners",
  "document hand-offs and exceptions",
  "support onboarding cohorts",
];

function jobFor(sector, idx, rand) {
  const level = LEVELS[idx % LEVELS.length];
  const suffix = SUFFIX[idx % SUFFIX.length];
  const title = `${level} ${sector} ${pick(rand, ["Analyst", "Designer", "Engineer", "Technician", "Coordinator", "Planner", "Auditor", "Trainer"])}${suffix}`;
  return {
    id: `job-${slug(sector)}-${(idx + 1).toString().padStart(2, "0")}`,
    title,
    sector,
    level,
    description: `Simulated ${title.toLowerCase()} role in the ${sector} sector. The position tracks ${pick(rand, TASKS)} and ${pick(rand, TASKS)} across every simulated year of the sandbox timeline.`,
    aiExposure: round2(0.1 + rand() * 0.8),
    remoteEligible: rand() > 0.45,
    fourDayCompatible: rand() > 0.7,
    wageBase: 32000 + Math.floor(rand() * 52000),
    wageStep: 1200 + Math.floor(rand() * 4200),
    headcount: 8 + Math.floor(rand() * 92),
    skillCluster: pick(rand, [
      "analysis",
      "operations",
      "design",
      "communication",
      "maintenance",
      "governance",
      "fieldwork",
      "customer",
    ]),
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

export function generateCatalog(rand, seed) {
  let count = 0;

  for (const sector of SECTORS) {
    const jobs = [];
    for (let i = 0; i < 25; i++) jobs.push(jobFor(sector, i, rand));
    writeIfMissing(
      `${ROOT}/jobs-${slug(sector)}.json`,
      JSON.stringify({ seed, sector, count: jobs.length, jobs }, null, 2),
    );
    count++;
  }

  // Skills taxonomy
  const CATEGORIES = ["cognitive", "social", "physical", "digital"];
  const STEM = [
    "Summarization",
    "Delegation",
    "Repair",
    "Scripting",
    "Forecasting",
    "Negotiation",
    "Documentation",
    "Scheduling",
    "Inspection",
    "Mapping",
    "Sampling",
    "Calibration",
    "Routing",
    "Mentoring",
    "Compliance",
    "Simulation",
    "Budgeting",
    "Translation",
    "Testing",
    "Archiving",
  ];
  const MOD = [
    "advisory",
    "hands-on",
    "remote",
    "ledger",
    "active",
    "guardrail",
    "loopback",
    "priority",
  ];
  const skills = [];
  let sid = 1;
  for (const cat of CATEGORIES) {
    for (const stem of STEM) {
      for (const mod of MOD.slice(0, 3)) {
        skills.push({
          id: `skill-${sharpPad(sid++)}`,
          name: `${mod} ${stem.toLowerCase()}`,
          category: cat,
          description:
            `Deterministic ${cat} skill: ${mod} ${stem.toLowerCase()} proficiency ` +
            `feeds worker vectors by ${(0.2 + rand() * 0.7).toFixed(2)} weight.`,
          adjacency: [
            `skill-${Math.max(1, sid - 4)
              .toString()
              .padStart(3, "0")}`,
            `skill-${sid.toString().padStart(3, "0")}`,
          ],
        });
      }
    }
  }
  writeIfMissing(
    `${ROOT}/skills.json`,
    JSON.stringify({ seed, count: skills.length, skills }, null, 2),
  );
  count++;

  console.log(`   catalog: ${count} data files generated (12 job sectors + skills taxonomy)`);
  return count;
}

function sharpPad(n) {
  return n.toString().padStart(3, "0");
}
