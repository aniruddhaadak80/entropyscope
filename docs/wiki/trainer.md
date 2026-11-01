# Trainer

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Trainer sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to occupational churn and
hybrid scheduling across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.02
- Mid-horizon volatility: 0.73
- Late-horizon persistence: 0.43
- Sensitivity to policy shocks: 0.03
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Trainer through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.14. Forecasters who track Trainer
historically improve most on bins near 0.14, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Legal](./legal.md)
- [Generalist Premium](./generalist-premium.md)
- [Reskilling Subsidy](./reskilling-subsidy.md)
- [Index](./index.md)
