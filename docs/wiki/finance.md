# Finance

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Finance sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to institutional drift and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.22
- Mid-horizon volatility: 0.08
- Late-horizon persistence: 0.79
- Sensitivity to policy shocks: 0.30
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Finance through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.07. Forecasters who track Finance
historically improve most on bins near 0.07, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Four-Day Week Effect](./four-day-week-effect.md)
- [Remote-First Mandate](./remote-first-mandate.md)
- [Index](./index.md)
