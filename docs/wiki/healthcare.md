# Healthcare

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Healthcare sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to skill adjacency and
capital deepening across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.29
- Mid-horizon volatility: 0.72
- Late-horizon persistence: 0.08
- Sensitivity to policy shocks: 0.94
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Healthcare through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.17. Forecasters who track Healthcare
historically improve most on bins near 0.17, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Technology](./technology.md)
- [Productivity J-Curve](./productivity-j-curve.md)
- [Trade Openness](./trade-openness.md)
- [Index](./index.md)
