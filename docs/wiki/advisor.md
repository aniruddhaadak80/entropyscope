# Advisor

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Advisor sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to firm-level reorganization and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.54
- Mid-horizon volatility: 0.79
- Late-horizon persistence: 0.14
- Sensitivity to policy shocks: 0.26
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Advisor through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.05. Forecasters who track Advisor
historically improve most on bins near 0.05, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Agriculture](./agriculture.md)
- [Timeline Fork](./timeline-fork.md)
- [Export Boom](./export-boom.md)
- [Index](./index.md)
