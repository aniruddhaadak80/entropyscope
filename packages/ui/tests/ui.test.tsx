import { describe, expect, it } from "vitest";
import { Badge } from "../src/components/Badge";
import { Chart } from "../src/components/Chart";
import { Gauge } from "../src/components/Gauge";
import { Progress } from "../src/components/Progress";
import { Sparkline } from "../src/components/Sparkline";
import { Stat } from "../src/components/Stat";
import { Toggle } from "../src/components/Toggle";
import { cn } from "../src/utils/cn";

describe("ui components", () => {
  it("cn merges classes correctly", () => {
    expect(cn("a b", "b c")).toBe("a b b c");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("Chart renders with data", () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
      { x: 3, y: 15 },
    ];
    const el = Chart({ data });
    expect(el).not.toBeNull();
  });

  it("Sparkline renders with data", () => {
    const el = Sparkline({ data: [1, 5, 3, 8, 2] });
    expect(el).not.toBeNull();
  });

  it("Gauge renders", () => {
    const el = Gauge({ value: 0.75, label: "Test" });
    expect(el).not.toBeNull();
  });

  it("Stat renders", () => {
    const el = Stat({ label: "Test", value: 100, trend: "up", trendValue: 10 });
    expect(el).not.toBeNull();
  });

  it("Badge renders variants", () => {
    const el = Badge({ variant: "destructive", children: "Test" });
    expect(el).not.toBeNull();
  });

  it("Toggle renders", () => {
    const el = Toggle({ checked: true, onCheckedChange: () => {} });
    expect(el).not.toBeNull();
  });

  it("Progress renders", () => {
    const el = Progress({ value: 50 });
    expect(el).not.toBeNull();
  });
});
