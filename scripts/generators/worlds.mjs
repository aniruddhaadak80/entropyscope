/**
 * worlds.mjs — generate larger seed datasets for entropyscope.
 * Produces expanded sector data, worker profiles, and market histories
 * under packages/seed/data/.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/seed/data";

function writeIfMissing(filePath, content) {
  if (existsSync(filePath)) return;
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

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

const _jobTitles = [
  "Associate",
  "Specialist",
  "Manager",
  "Director",
  "Analyst",
  "Coordinator",
  "Engineer",
  "Designer",
  "Technician",
  "Consultant",
];

function generateSectorData(seed) {
  const sectors = [];
  for (let i = 0; i < sectorNames.length; i++) {
    const aiExposure = (0.1 + Math.sin(i * 0.7 + seed * 0.001) * 0.4).toFixed(2);
    const remoteRate = (0.2 + Math.cos(i * 0.5 + seed * 0.002) * 0.4).toFixed(2);
    const wageBase = 40000 + i * 7000 + Math.floor(Math.sin(i + seed) * 5000);
    sectors.push({
      id: `sector-${i}`,
      name: sectorNames[i],
      description: `Simulated ${sectorNames[i]} sector with ${aiExposure} AI exposure`,
      aiExposure: Number(aiExposure),
      remoteRate: Number(remoteRate),
      growthRate: ((Math.sin(i * 0.3) - 0.5) * 0.06).toFixed(4),
      wageBase,
      workerCount: 100 + i * 15,
    });
  }
  return JSON.stringify({ seed, sectors, generatedAt: new Date().toISOString() }, null, 2);
}

function generateWorkerProfiles(seed) {
  const workers = [];
  const firstNames = [
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
  ];
  const lastNames = [
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
  ];
  for (let i = 0; i < 200; i++) {
    const sectorIdx = (i * 7 + seed) % sectorNames.length;
    workers.push({
      id: `worker-${i}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      sector: `sector-${sectorIdx}`,
      skill: (0.3 + Math.sin(i * 1.3 + seed * 0.01) * 0.4).toFixed(2),
      adaptability: (0.2 + Math.cos(i * 0.9 + seed * 0.02) * 0.5).toFixed(2),
      wage: 40000 + i * 200 + Math.floor(Math.sin(i + seed * 0.5) * 8000),
      employed: i % 7 !== 0,
      yearsUnemployed: Math.floor(Math.abs(Math.sin(i * 0.2)) * 3),
      aiExposed: (i * 3 + seed) % 5 === 0,
      remoteEligible: (i * 5 + seed) % 4 === 0,
      fourDayWeek: (i * 7 + seed) % 6 === 0,
    });
  }
  return JSON.stringify({ seed, workers, count: workers.length }, null, 2);
}

function generateMarketHistory(seed) {
  const markets = [];
  const marketIds = [
    "unemployment-year-10",
    "ai-adoption-year-15",
    "remote-dominance",
    "four-day-week-adoption",
  ];
  for (const mid of marketIds) {
    const history = [];
    for (let y = 1; y <= 30; y++) {
      history.push({
        year: y,
        yesPrice: (0.3 + Math.sin(y * 0.4 + seed * 0.01) * 0.3).toFixed(3),
        noPrice: null, // computed
        volume: Math.floor(100 + Math.sin(y * 0.7 + seed) * 50),
        trades: Math.floor(10 + Math.sin(y * 0.5) * 20),
      });
    }
    // compute noPrice as 1 - yesPrice
    for (const h of history) {
      h.noPrice = (1 - Number(h.yesPrice)).toFixed(3);
    }
    markets.push({ id: mid, history });
  }
  return JSON.stringify({ seed, markets }, null, 2);
}

export function generateWorlds(_rand, seed) {
  let count = 0;
  writeIfMissing(`${ROOT}/sectors.json`, generateSectorData(seed));
  count++;
  writeIfMissing(`${ROOT}/workers.json`, generateWorkerProfiles(seed));
  count++;
  writeIfMissing(`${ROOT}/markets-history.json`, generateMarketHistory(seed));
  count++;
  console.log(`   worlds: ${count} data files generated`);
  return count;
}
