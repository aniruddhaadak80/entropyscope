import { describe, expect, it } from "vitest";
import { predictionMarket } from "../src/prediction-market";

describe("predictionMarket", () => {
  it("creates a market and buys shares", () => {
    const pm = predictionMarket();
    const market = pm.createMarket("m1", "o1", "Will unemployment be < 5% in year 10?", 0.3);
    expect(market.yesPrice).toBeCloseTo(0.3, 6);
    expect(market.noPrice).toBeCloseTo(0.7, 6);

    const result = pm.buyShares("m1", "user1", "yes", 100);
    expect(result).not.toBeNull();
    expect(result!.shares.amount).toBe(100);
    expect(result!.cost).toBeCloseTo(30, 6);
  });

  it("price moves up when buying yes shares", () => {
    const pm = predictionMarket();
    pm.createMarket("m2", "o2", "Test market", 0.5);
    const before = pm.getMarketPrice("m2")!.yes;
    pm.buyShares("m2", "user1", "yes", 500);
    const after = pm.getMarketPrice("m2")!.yes;
    expect(after).toBeGreaterThan(before);
  });

  it("resolution pays out winning shares", () => {
    const pm = predictionMarket();
    pm.createMarket("m3", "o3", "Test resolution", 0.5);
    pm.buyShares("m3", "user1", "yes", 100);
    const payouts = pm.resolveMarket("m3", true);
    const userPayout = payouts.find((p) => p.marketId === "m3");
    expect(userPayout).not.toBeUndefined();
    expect(userPayout!.outcome).toBe(true);
  });

  it("cannot buy shares in a resolved market", () => {
    const pm = predictionMarket();
    pm.createMarket("m4", "o4", "Resolved market", 0.5);
    pm.resolveMarket("m4", true);
    const result = pm.buyShares("m4", "user1", "yes", 10);
    expect(result).toBeNull();
  });
});
