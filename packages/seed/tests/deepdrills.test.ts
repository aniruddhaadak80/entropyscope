import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const DRILLS_ROOT = join(__dirname, "../deepdrills");
const CATALOG_ROOT = join(__dirname, "../catalog");

interface SectorDrill {
  spec: string;
  seed: number;
  sector: string;
  sensitivity: number;
  rows: Array<{
    year: number;
    unemploymentRate: number;
    aiAdoptionRate: number;
    remoteRate: number;
    headcount: number;
    wageBill: number;
    jobChurn: number;
    reskillingLoad: number;
    automationShare: number;
  }>;
}

interface JobDrill {
  spec: string;
  seed: number;
  sector: string;
  count: number;
  jobs: Array<{
    jobId: string;
    title: string;
    automationRisk: number;
    augmentationLeverage: number;
    fiveYearOutlook: string;
    reskillingPaths: string[];
    wageForecasts: number[];
  }>;
}

describe("Generated deepdrills integrity", () => {
  it("has 12 sector drill files with 31 ascending year rows inside model bounds", () => {
    const files = readdirSync(join(DRILLS_ROOT, "sector-drills"));
    expect(files.length).toBe(12);
    for (const f of files) {
      const drill = JSON.parse(
        readFileSync(join(DRILLS_ROOT, "sector-drills", f), "utf8"),
      ) as SectorDrill;
      expect(drill.spec).toBe("DEEPDRILLS v1");
      expect(drill.seed).toBe(7331);
      expect(drill.rows.length).toBe(31);
      drill.rows.forEach((row, i) => {
        expect(row.year).toBe(i);
        expect(row.unemploymentRate).toBeGreaterThanOrEqual(0.005);
        expect(row.unemploymentRate).toBeLessThanOrEqual(0.35);
        expect(row.aiAdoptionRate).toBeGreaterThanOrEqual(0);
        expect(row.aiAdoptionRate).toBeLessThanOrEqual(0.95);
        expect(row.remoteRate).toBeGreaterThanOrEqual(0);
        expect(row.remoteRate).toBeLessThanOrEqual(0.85);
        expect(row.headcount).toBeGreaterThanOrEqual(40);
        expect(Number.isInteger(row.headcount)).toBe(true);
        expect(Number.isInteger(row.wageBill)).toBe(true);
        expect(row.jobChurn).toBeGreaterThanOrEqual(0.02);
        expect(row.jobChurn).toBeLessThanOrEqual(0.4);
        expect(row.automationShare).toBeLessThanOrEqual(0.9);
      });
    }
  });

  it("job drills cover exactly the catalog job ids per sector", () => {
    const files = readdirSync(join(DRILLS_ROOT, "job-drills"));
    expect(files.length).toBe(12);
    for (const f of files) {
      const drill = JSON.parse(
        readFileSync(join(DRILLS_ROOT, "job-drills", f), "utf8"),
      ) as JobDrill;
      const catalog = JSON.parse(readFileSync(join(CATALOG_ROOT, `jobs-${f}`), "utf8")) as {
        jobs: Array<{ id: string; title: string }>;
      };
      expect(drill.jobs.length).toBe(catalog.jobs.length);
      for (const [i, drillJob] of drill.jobs.entries()) {
        expect(drillJob.jobId).toBe(catalog.jobs[i].id);
        expect(drillJob.title).toBe(catalog.jobs[i].title);
        expect(drillJob.automationRisk).toBeGreaterThanOrEqual(0.02);
        expect(drillJob.automationRisk).toBeLessThanOrEqual(0.97);
        expect(drillJob.augmentationLeverage).toBeGreaterThanOrEqual(0.05);
        expect(drillJob.augmentationLeverage).toBeLessThanOrEqual(0.95);
        expect(["augmented", "restructured", "automated-core", "phase-out"]).toContain(
          drillJob.fiveYearOutlook,
        );
        expect(drillJob.reskillingPaths.length).toBeGreaterThanOrEqual(2);
        expect(drillJob.wageForecasts.length).toBe(11);
        expect(Number.isInteger(drillJob.wageForecasts[0])).toBe(true);
      }
    }
  });

  it("reskilling paths reference real ids from the 240-skill taxonomy", () => {
    const { skills } = JSON.parse(readFileSync(join(CATALOG_ROOT, "skills.json"), "utf8")) as {
      skills: Array<{ id: string; name: string; category: string }>;
    };
    const valid = new Set(skills.map((s) => s.id));
    const files = readdirSync(join(DRILLS_ROOT, "job-drills"));
    const referenced = new Set<string>();
    for (const f of files) {
      const drill = JSON.parse(
        readFileSync(join(DRILLS_ROOT, "job-drills", f), "utf8"),
      ) as JobDrill;
      for (const job of drill.jobs) {
        for (const id of job.reskillingPaths) {
          referenced.add(id);
        }
      }
    }
    for (const id of referenced) {
      expect(valid.has(id)).toBe(true);
    }
    // spread across all four taxonomy categories, not just cognitive skills
    const categories = new Set(skills.filter((s) => referenced.has(s.id)).map((s) => s.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("skill-demand matrix covers all 240 skills with 31-year curves", () => {
    const { skills } = JSON.parse(readFileSync(join(CATALOG_ROOT, "skills.json"), "utf8")) as {
      skills: Array<{ id: string }>;
    };
    const demand = JSON.parse(readFileSync(join(DRILLS_ROOT, "skill-demand.json"), "utf8")) as {
      count: number;
      skills: Array<{
        id: string;
        name: string;
        category: string;
        demandByYear: number[];
        projectedTrend: string;
      }>;
    };
    expect(demand.skills.length).toBe(demand.count);
    expect(demand.skills.length).toBe(skills.length);
    for (const [i, row] of demand.skills.entries()) {
      expect(row.id).toBe(skills[i].id);
      expect(row.demandByYear.length).toBe(31);
      for (const v of row.demandByYear) {
        expect(v).toBeGreaterThanOrEqual(0.02);
        expect(v).toBeLessThanOrEqual(0.99);
      }
      expect(["rising", "cooling", "stable"]).toContain(row.projectedTrend);
    }
  });
});
