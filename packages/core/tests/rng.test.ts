import { describe, expect, it } from "vitest";
import { mulberry32, seededRandom } from "../src/rng";

describe("mulberry32", () => {
  it("produces values in [0, 1)", () => {
    const rand = mulberry32(7331);
    for (let i = 0; i < 1000; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("is deterministic — same seed yields identical sequence", () => {
    const r1 = mulberry32(7331);
    const r2 = mulberry32(7331);
    for (let i = 0; i < 100; i++) {
      expect(r1()).toBe(r2());
    }
  });

  it("different seeds produce different sequences", () => {
    const r1 = mulberry32(1);
    const r2 = mulberry32(2);
    let different = false;
    for (let i = 0; i < 100; i++) {
      if (r1() !== r2()) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });

  it("seededRandom produces an array of the requested length", () => {
    const arr = seededRandom(7331, 50);
    expect(arr.length).toBe(50);
    for (const v of arr) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
