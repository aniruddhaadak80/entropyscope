# Labor Share

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Labor Share sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to occupational churn and
wage compression across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.96
- Mid-horizon volatility: 0.60
- Late-horizon persistence: 0.15
- Sensitivity to policy shocks: 0.75
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Labor Share through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.16. Forecasters who track Labor Share
historically improve most on bins near 0.16, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Agriculture](./agriculture.md)
- [Generalist Premium](./generalist-premium.md)
- [Credit Squeeze](./credit-squeeze.md)
- [Index](./index.md)
