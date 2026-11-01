# Wage Bill

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Wage Bill sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to capital deepening and
occupational churn across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.27
- Mid-horizon volatility: 0.44
- Late-horizon persistence: 0.91
- Sensitivity to policy shocks: 0.14
- Elasticity to reskilling investment: 0.1

## Market linkage

Traders can express a view on Wage Bill through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.14. Forecasters who track Wage Bill
historically improve most on bins near 0.14, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Retail](./retail.md)
- [Brier Score](./brier-score.md)
- [Remote-First Mandate](./remote-first-mandate.md)
- [Index](./index.md)
