# Archivist

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Archivist sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to skill adjacency and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.79
- Mid-horizon volatility: 0.39
- Late-horizon persistence: 0.08
- Sensitivity to policy shocks: 0.06
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Archivist through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.20. Forecasters who track Archivist
historically improve most on bins near 0.20, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Education](./education.md)
- [Policy Shock](./policy-shock.md)
- [Trade Openness](./trade-openness.md)
- [Index](./index.md)
