# Union Resurgence

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Union Resurgence sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to credential inflation and
wage compression across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.67
- Mid-horizon volatility: 0.81
- Late-horizon persistence: 0.74
- Sensitivity to policy shocks: 0.25
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Union Resurgence through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.12. Forecasters who track Union Resurgence
historically improve most on bins near 0.12, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Construction](./construction.md)
- [Wage Bill](./wage-bill.md)
- [Four-Day Week](./four-day-week.md)
- [Index](./index.md)
