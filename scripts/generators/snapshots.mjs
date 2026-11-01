/**
 * snapshots.mjs — generate 30-year simulation snapshots (JSON fixtures).
 * Output: packages/seed/data/snapshot-year-<nn>.json — 7 checkpoints
 * (years 1, 5, 10, 15, 20, 25, 30) x 1,000 workers with deterministic
 * state fields. Values are pure functions of seed 7331.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ROOT = "packages/seed/data";
const YEARS = [1, 5, 10, 15, 20, 25, 30];

const FIRST = [
  "Alex",
  "Jordan",
  "Casey",
  "Riley",
  "Quinn",
  "Avery",
  "Jamie",
  "Morgan",
  "Taylor",
  "Reese",
  "Kai",
  "Luca",
];
const LAST = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Chen",
  "Okafor",
];

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function worker(i, year, seed, rand) {
  return {
    id: `w-${i.toString().padStart(4, "0")}`,
    workerSeed: (i * 7919 + seed * 13) % 100000,
    position: `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`,
    sector: `sector-${i % 12}`,
    year,
    employed: (i * 3 + year * 5 + seed) % 11 !== 0,
    tenureYears: (i + year) % 9,
    remoteEligible: (i * 5 + year * 2 + seed) % 4 === 0,
    skill: round2(((i * 37 + year * 11 + seed) % 100) / 100),
    adaptability: round2(((i * 53 + year * 7 + seed) % 100) / 100),
    wage: 30000 + ((i * 911 + year * 133) % 40000),
    aiExposed: (i * 17 + year * 3 + seed) % 7 === 0,
    reskilledThisHorizon: (i + year) % 15 === 0,
    region: pick(rand, ["north", "south", "east", "west"]),
  };
}

export function generateSnapshots(rand, seed) {
  let count = 0;
  for (const year of YEARS) {
    const file = `${ROOT}/snapshot-year-${year.toString().padStart(2, "0")}.json`;
    if (existsSync(file)) continue;

    const workers = [];
    for (let i = 0; i < 1000; i++) workers.push(worker(i, year, seed, rand));

    mkdirSync(ROOT, { recursive: true });
    writeFileSync(
      file,
      JSON.stringify(
        {
          seed,
          year,
          checkpoint: YEARS.indexOf(year) + 1,
          unemployment: round2(
            Array.from(workers).filter((w) => !w.employed).length / workers.length,
          ),
          remoteRate: round2(
            Array.from(workers).filter((w) => w.remoteEligible).length / workers.length,
          ),
          aiExposure: round2(
            Array.from(workers).filter((w) => w.aiExposed).length / workers.length,
          ),
          wageTotal: workers.reduce((acc, w) => acc + w.wage, 0),
          workers,
        },
        null,
        2,
      ),
    );
    count++;
  }

  console.log(`   snapshots: ${count} year checkpoints generated`);
  return count;
}
