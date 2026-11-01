import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CATALOG_ROOT = join(__dirname, "../catalog");

interface Job {
  id: string;
  title: string;
  sector: string;
  wageBase: number;
  wageStep: number;
  headcount: number;
  aiExposure: number;
  remoteEligible: boolean;
  fourDayCompatible: boolean;
  skillCluster: string;
}

describe("Generated catalog integrity", () => {
  it("has one jobs file for each of the 12 sectors", () => {
    const files = readdirSync(CATALOG_ROOT).filter((f) => f.startsWith("jobs-"));
    expect(files.length).toBe(12);
  });

  it("every job id is unique across the full catalog", () => {
    const seen = new Set<string>();
    const files = readdirSync(CATALOG_ROOT).filter((f) => f.startsWith("jobs-"));
    for (const f of files) {
      const { jobs } = JSON.parse(readFileSync(join(CATALOG_ROOT, f), "utf8")) as { jobs: Job[] };
      for (const job of jobs) {
        expect(seen.has(job.id)).toBe(false);
        seen.add(job.id);
      }
    }
    expect(seen.size).toBe(300);
  });

  it("wages stay inside model bounds and steps are positive", () => {
    const files = readdirSync(CATALOG_ROOT).filter((f) => f.startsWith("jobs-"));
    for (const f of files) {
      const { jobs } = JSON.parse(readFileSync(join(CATALOG_ROOT, f), "utf8")) as { jobs: Job[] };
      for (const job of jobs) {
        expect(job.wageBase).toBeGreaterThanOrEqual(32000);
        expect(job.wageBase).toBeLessThanOrEqual(84_000);
        expect(job.wageStep).toBeGreaterThan(0);
        expect(job.headcount).toBeGreaterThan(0);
      }
    }
  });

  it("skill taxonomy has 240 entries with unique ids across categories", () => {
    const raw = readFileSync(join(CATALOG_ROOT, "skills.json"), "utf8");
    const { count, skills } = JSON.parse(raw) as {
      count: number;
      skills: Array<{ id: string; category: string }>;
    };
    expect(skills.length).toBeGreaterThanOrEqual(200);
    expect(skills.length).toBe(count);
    const ids = new Set(skills.map((s) => s.id));
    expect(ids.size).toBe(skills.length);
    const cats = new Set(skills.map((s) => s.category));
    expect(cats.has("cognitive")).toBe(true);
    expect(cats.has("social")).toBe(true);
  });
});
