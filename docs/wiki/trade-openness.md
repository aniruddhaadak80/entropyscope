# Trade Openness

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Trade Openness sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to capital deepening and
firm-level reorganization across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.05
- Mid-horizon volatility: 0.83
- Late-horizon persistence: 0.20
- Sensitivity to policy shocks: 0.61
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Trade Openness through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.06. Forecasters who track Trade Openness
historically improve most on bins near 0.06, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Agriculture](./agriculture.md)
- [Reskilling Debt](./reskilling-debt.md)
- [Union Resurgence](./union-resurgence.md)
- [Index](./index.md)
