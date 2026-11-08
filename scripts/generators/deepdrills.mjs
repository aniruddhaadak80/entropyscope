/**
 * deepdrills.mjs — scale engine family: per-sector/year drill tables,
 * per-job five-year risk drills and per-skill demand curves.
 *
 * Deterministic *pure* generation: every output value is a function of
 * (year, index) using fixed integer-mix constants — no RNG — so outputs are
 * byte-identical on every run and writes simply overwrite (true
 * idempotence). The committed catalog (packages/seed/catalog) provides the
 * job list, wage metadata and the 240-skill taxonomy these drills build on.
 *
 * Output:
 *   packages/seed/deepdrills/sector-drills/<sector>.json   (12 files, 31 rows)
 *   packages/seed/deepdrills/job-drills/<sector>.json      (12 files, 25 jobs)
 *   packages/seed/deepdrills/skill-demand.json             (compact, 240 skills)
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CATALOG_ROOT = "packages/seed/catalog";
const DRILLS_ROOT = "packages/seed/deepdrills";

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

const SENSITIVITY = [0.9, 0.5, 1.35, 1.15, 0.8, 1.05, 0.6, 1.1, 0.45, 0.7, 0.55, 1.2];

const CLUSTER_RISK = {
  analysis: 0.02,
  operations: 0.08,
  design: -0.04,
  communication: -0.06,
  maintenance: 0.05,
  governance: -0.08,
  fieldwork: -0.02,
  customer: 0.09,
};

const CLUSTER_CATEGORY = {
  analysis: "cognitive",
  operations: "cognitive",
  design: "digital",
  communication: "social",
  maintenance: "physical",
  governance: "social",
  fieldwork: "physical",
  customer: "social",
};

const OUTLOOKS = [
  ["augmented", 0.35],
  ["restructured", 0.6],
  ["automated-core", 0.8],
  ["phase-out", 1.01],
];

const YEARS = 31;

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function round4(n) {
  return Math.round(n * 10000) / 10000;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

/** Fixed 0..1 mix per sector index — pure arithmetic, no RNG. */
function sectorMix(idx) {
  return (((idx + 3) * 7919) % 911) / 911;
}

function sectorDrillRows(sectorIdx) {
  const off = sectorMix(sectorIdx);
  const sens = SENSITIVITY[sectorIdx];
  const baseHeadcount = 18000 + sectorIdx * 620;
  const rows = [];
  for (let year = 0; year < YEARS; year++) {
    const unemployment = clamp(
      0.055 + 0.05 * Math.sin(year / 4.2 + off * 6.283) - year * 0.0004 * sens + 0.015 * sens,
      0.005,
      0.35,
    );
    const ai = clamp(0.3 + year * 0.016 * sens + 0.02 * Math.sin(year / 2.1 + off * 3.14), 0, 0.95);
    const remote = clamp(0.4 + year * 0.008 + 0.05 * off, 0, 0.85);
    const headcount = Math.max(
      40,
      Math.round(baseHeadcount * (1 - 0.006 * year * sens) * (1 + 0.04 * Math.sin(year / 3 + off * 6.283))),
    );
    rows.push({
      year,
      unemploymentRate: round4(unemployment),
      aiAdoptionRate: round4(ai),
      remoteRate: round4(remote),
      headcount,
      wageBill: headcount * (40000 + 900 * year),
      jobChurn: round4(clamp(0.16 + 0.04 * Math.sin(year / 2.5 + off * 3.141) + 0.03 * sens, 0.02, 0.4)),
      reskillingLoad: round4(clamp(0.24 + ai * 0.4 - remote * 0.1, 0.05, 0.9)),
      automationShare: round4(clamp(ai * (0.45 + 0.25 * off), 0, 0.9)),
    });
  }
  return rows;
}

function outlookFor(risk) {
  for (const [label, threshold] of OUTLOOKS) {
    if (risk < threshold) return label;
  }
  return OUTLOOKS[OUTLOOKS.length - 1][0];
}

function jobDrillRows(jobs, skills) {
  return jobs.map((job, idx) => {
    const clusterShift = CLUSTER_RISK[job.skillCluster] ?? 0;
    const levelShift = job.level === "Associate" ? 0.05 : job.level === "Senior" ? 0 : -0.05;
    const risk = round4(clamp(0.22 + job.aiExposure * 0.62 + clusterShift + levelShift, 0.02, 0.97));
    const augmentation = round4(clamp(0.95 - job.aiExposure * 0.8 - clusterShift, 0.05, 0.95));
    const paths = skills
      .filter((s) => s.category === CLUSTER_CATEGORY[job.skillCluster])
      .filter((_, i) => i >= idx % 7 && i < idx % 7 + 8)
      .slice(0, 3)
      .map((s) => s.id);
    const reskillingPaths = paths.length >= 2 ? paths : ["skill-001", "skill-002"];
    const wageForecasts = [];
    for (let y = 0; y <= 10; y++) {
      wageForecasts.push(Math.round(job.wageBase + job.wageStep * y * (1 + 0.01 * (y / 11))));
    }
    return {
      jobId: job.id,
      title: job.title,
      automationRisk: risk,
      augmentationLeverage: augmentation,
      fiveYearOutlook: outlookFor(risk),
      reskillingPaths,
      wageForecasts,
    };
  });
}

function skillDemandRow(skill, skillIdx) {
  const phase = ((skillIdx + 1) * 6283) % 1000 / 1000;
  const catBoost = skill.category === "cognitive" ? 0.12 : skill.category === "social" ? -0.02 : 0.04;
  const demandByYear = [];
  for (let year = 0; year < YEARS; year++) {
    demandByYear.push(
      round2(clamp(0.35 + 0.18 * Math.sin(year / 6 + phase * 6.283) + catBoost * (year / YEARS) + phase * 0.08, 0.02, 0.99)),
    );
  }
  const slope = demandByYear[YEARS - 1] - demandByYear[0];
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    demandByYear,
    projectedTrend: slope > 0.08 ? "rising" : slope < -0.08 ? "cooling" : "stable",
  };
}

function writeDeterministic(filePath, content) {
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

export function generateDeepDrills() {
  const skills = JSON.parse(readFileSync(join(CATALOG_ROOT, "skills.json"), "utf8")).skills;
  let sectorFiles = 0;
  let jobFiles = 0;

  SECTORS.forEach((sector, idx) => {
    const s = slug(sector);
    const drill = {
      spec: "DEEPDRILLS v1",
      seed: 7331,
      sector,
      sensitivity: SENSITIVITY[idx],
      rows: sectorDrillRows(idx),
    };
    writeDeterministic(join(DRILLS_ROOT, "sector-drills", `${s}.json`), `${JSON.stringify(drill, null, 2)}\n`);
    sectorFiles++;

    const jobs = JSON.parse(readFileSync(join(CATALOG_ROOT, `jobs-${s}.json`), "utf8")).jobs;
    const jobDrill = {
      spec: "DEEPDRILLS v1",
      seed: 7331,
      sector,
      count: jobs.length,
      jobs: jobDrillRows(jobs, skills),
    };
    writeDeterministic(join(DRILLS_ROOT, "job-drills", `${s}.json`), `${JSON.stringify(jobDrill, null, 2)}\n`);
    jobFiles++;
  });

  const demand = {
    spec: "DEEPDRILLS v1",
    seed: 7331,
    count: skills.length,
    skills: skills.map((skill, i) => skillDemandRow(skill, i)),
  };
  writeDeterministic(join(DRILLS_ROOT, "skill-demand.json"), JSON.stringify(demand) + "\n");

  const readme = `# deepdrills — scale engine family (spec DEEPDRILLS v1, seed 7331)

Deterministic drill-down tables built on the committed catalog:

- \`sector-drills/\` — 12 sectors × 31 years of headcount, wage bill, AI adoption,
  remote rate, churn, reskilling load and automation share.
- \`job-drills/\` — per job: automation risk, augmentation leverage, five-year
  outlook, reskilling paths (real skill ids) and a 10-year wage forecast.
- \`skill-demand.json\` — 240 skills × 31 years of demand intensity plus trend label.

Every value is a pure function of (year, index); regeneration is order-independent.
`;

  writeDeterministic(join(DRILLS_ROOT, "README.md"), readme);
  console.log(
    `   deepdrills: ${sectorFiles} sector drills, ${jobFiles} job drills, 1 skill-demand matrix (${skills.length} skills)`,
  );
}
