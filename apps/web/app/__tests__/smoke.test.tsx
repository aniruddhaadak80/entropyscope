import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../../../../packages/core/src/config";
import { createWorld, stepYear } from "../../../../packages/core/src/index";

describe("web smoke", () => {
  it("creates a world and steps it", () => {
    const world = createWorld(DEFAULT_CONFIG);
    expect(world.year).toBe(0);
    const result = stepYear(world, DEFAULT_CONFIG);
    expect(result.world.year).toBe(1);
  });
});
