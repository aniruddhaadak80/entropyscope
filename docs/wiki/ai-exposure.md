# AI Exposure

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

AI Exposure sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to firm-level reorganization and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.29
- Mid-horizon volatility: 0.44
- Late-horizon persistence: 0.78
- Sensitivity to policy shocks: 0.98
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on AI Exposure through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.09. Forecasters who track AI Exposure
historically improve most on bins near 0.09, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Finance](./finance.md)
- [Unemployment Persistence](./unemployment-persistence.md)
- [Trade Openness](./trade-openness.md)
- [Index](./index.md)
