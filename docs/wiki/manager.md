# Manager

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Manager sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to skill adjacency and
occupational churn across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.63
- Mid-horizon volatility: 0.89
- Late-horizon persistence: 0.91
- Sensitivity to policy shocks: 0.06
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Manager through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.19. Forecasters who track Manager
historically improve most on bins near 0.19, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Reskilling Debt](./reskilling-debt.md)
- [Early AI Adoption](./early-ai-adoption.md)
- [Index](./index.md)
