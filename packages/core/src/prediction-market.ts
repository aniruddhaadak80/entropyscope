/**
 * Prediction market — simulated shares on scenario outcomes.
 *
 * Users buy shares in outcomes (e.g. "unemployment < 5% in year 10").
 * Prices move with a constant-product AMM. Resolution pays out $1 per winning
 * share. Deterministic — no oracle needed for the demo.
 */

export interface Share {
  id: string;
  userId: string;
  outcomeId: string;
  amount: number; // shares held
  avgPrice: number; // average price paid per share
}

export interface Market {
  id: string;
  outcomeId: string;
  question: string;
  yesShares: number;
  noShares: number;
  yesPrice: number; // 0..1
  noPrice: number; // 0..1
  resolved: boolean;
  resolution: boolean | null; // true = yes won
}

export interface Resolution {
  marketId: string;
  outcome: boolean;
  payoutPerShare: number;
}

export function predictionMarket() {
  const markets: Map<string, Market> = new Map();
  const shares: Map<string, Share[]> = new Map();

  function createMarket(
    id: string,
    outcomeId: string,
    question: string,
    initialProbability = 0.5,
  ): Market {
    const market: Market = {
      id,
      outcomeId,
      question,
      yesShares: 1000,
      noShares: 1000,
      yesPrice: initialProbability,
      noPrice: 1 - initialProbability,
      resolved: false,
      resolution: null,
    };
    markets.set(id, market);
    return market;
  }

  function buyShares(
    marketId: string,
    userId: string,
    outcome: "yes" | "no",
    amount: number,
  ): { shares: Share; cost: number; market: Market } | null {
    const market = markets.get(marketId);
    if (!market || market.resolved) return null;

    const price = outcome === "yes" ? market.yesPrice : market.noPrice;
    const cost = amount * price;

    const userShares = shares.get(userId) ?? [];
    const existing = userShares.find((s) => s.outcomeId === market.outcomeId);
    if (existing) {
      existing.amount += amount;
      existing.avgPrice = (existing.avgPrice * existing.amount + cost) / (existing.amount + amount);
    } else {
      userShares.push({
        id: `${marketId}-${userId}`,
        userId,
        outcomeId: market.outcomeId,
        amount,
        avgPrice: price,
      });
    }
    shares.set(userId, userShares);

    // AMM price update
    if (outcome === "yes") {
      market.yesShares += amount;
      market.yesPrice = market.yesShares / (market.yesShares + market.noShares);
    } else {
      market.noShares += amount;
      market.noPrice = market.noShares / (market.yesShares + market.noShares);
    }

    return { shares: userShares[userShares.length - 1], cost, market };
  }

  function resolveMarket(marketId: string, outcome: boolean): Resolution[] {
    const market = markets.get(marketId);
    if (!market || market.resolved) return [];
    market.resolved = true;
    market.resolution = outcome;

    const payouts: Resolution[] = [];
    for (const [_userId, userShareList] of shares) {
      for (const share of userShareList) {
        if (share.outcomeId === market.outcomeId) {
          const won =
            (outcome && share.avgPrice <= market.yesPrice) ||
            (!outcome && share.avgPrice <= market.noPrice);
          payouts.push({
            marketId,
            outcome,
            payoutPerShare: won ? 1 : 0,
          });
        }
      }
    }
    return payouts;
  }

  function getMarketPrice(marketId: string): { yes: number; no: number } | null {
    const market = markets.get(marketId);
    if (!market) return null;
    return { yes: market.yesPrice, no: market.noPrice };
  }

  return { createMarket, buyShares, resolveMarket, getMarketPrice, markets, shares };
}
