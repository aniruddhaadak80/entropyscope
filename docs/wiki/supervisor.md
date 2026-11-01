# Supervisor

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Supervisor sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to productivity distribution and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.81
- Mid-horizon volatility: 0.14
- Late-horizon persistence: 0.39
- Sensitivity to policy shocks: 0.35
- Elasticity to reskilling investment: 0.3

## Market linkage

Traders can express a view on Supervisor through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.06. Forecasters who track Supervisor
historically improve most on bins near 0.06, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Legal](./legal.md)
- [Calibration Bin](./calibration-bin.md)
- [Trade Openness](./trade-openness.md)
- [Index](./index.md)
