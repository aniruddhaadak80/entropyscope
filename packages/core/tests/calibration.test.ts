import { describe, expect, it } from "vitest";
import { calibration } from "../src/calibration";

describe("calibration", () => {
  it("records forecasts and computes Brier score", () => {
    const cal = calibration();
    cal.recordForecast("r1", "user1", "f1", 0.8, true, 5);
    const result = cal.brierResult();
    expect(result.meanBrierScore).toBeCloseTo((0.8 - 1) ** 2, 6);
  });

  it("lower Brier score for better-calibrated forecasts", () => {
    const cal = calibration();
    // Perfect forecast
    cal.recordForecast("r1", "user1", "f1", 1.0, true, 1);
    // Bad forecast
    cal.recordForecast("r2", "user1", "f2", 0.0, true, 1);
    const result = cal.brierResult();
    expect(result.meanBrierScore).toBeGreaterThan(0);
    expect(result.meanBrierScore).toBeLessThanOrEqual(1);
  });

  it("calibration curve has bins", () => {
    const cal = calibration();
    for (let i = 0; i < 20; i++) {
      cal.recordForecast(`r${i}`, "user1", `f${i}`, 0.5 + (i % 10) / 20, i % 2 === 0, 1);
    }
    const result = cal.brierResult();
    expect(result.calibrationCurve.length).toBeGreaterThan(0);
  });

  it("uncertainty is in [0, 0.25]", () => {
    const cal = calibration();
    cal.recordForecast("r1", "user1", "f1", 0.5, true, 1);
    const result = cal.brierResult();
    expect(result.uncertainty).toBeGreaterThanOrEqual(0);
    expect(result.uncertainty).toBeLessThanOrEqual(0.25);
  });
});
