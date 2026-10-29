import { describe, expect, it } from "vitest";
import { breakpoints, fontFamilies, palette } from "../src/index";

describe("config", () => {
  it("palette exports named colors", () => {
    expect(palette.indigo).toBe("#1e1b4b");
    expect(palette.plasmaCyan).toBe("#22d3ee");
  });

  it("fontFamilies exports three families", () => {
    expect(fontFamilies.display).toContain("Space Grotesk");
    expect(fontFamilies.body).toContain("Inter");
    expect(fontFamilies.mono).toContain("JetBrains Mono");
  });

  it("breakpoints are defined", () => {
    expect(breakpoints.sm).toBe("640px");
    expect(breakpoints.lg).toBe("1024px");
  });
});
