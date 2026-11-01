# Remote Eligibility

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Remote Eligibility sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to capital deepening and
risk pooling across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.58
- Mid-horizon volatility: 0.37
- Late-horizon persistence: 0.31
- Sensitivity to policy shocks: 0.93
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Remote Eligibility through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.16. Forecasters who track Remote Eligibility
historically improve most on bins near 0.16, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Agriculture](./agriculture.md)
- [Timeline Fork](./timeline-fork.md)
- [Late AI Adoption](./late-ai-adoption.md)
- [Index](./index.md)
