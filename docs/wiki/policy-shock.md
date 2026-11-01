# Policy Shock

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Policy Shock sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to labor dynamics and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.64
- Mid-horizon volatility: 0.52
- Late-horizon persistence: 0.86
- Sensitivity to policy shocks: 0.65
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Policy Shock through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.19. Forecasters who track Policy Shock
historically improve most on bins near 0.19, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Healthcare](./healthcare.md)
- [Forecast Horizon](./forecast-horizon.md)
- [Remote-First Mandate](./remote-first-mandate.md)
- [Index](./index.md)
