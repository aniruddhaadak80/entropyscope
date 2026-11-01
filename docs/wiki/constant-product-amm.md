# Constant-Product AMM

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Constant-Product AMM sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to market clearing and
firm-level reorganization across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.84
- Mid-horizon volatility: 0.02
- Late-horizon persistence: 0.53
- Sensitivity to policy shocks: 0.71
- Elasticity to reskilling investment: 0.6

## Market linkage

Traders can express a view on Constant-Product AMM through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.15. Forecasters who track Constant-Product AMM
historically improve most on bins near 0.15, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Energy](./energy.md)
- [Constant-Product AMM](./constant-product-amm.md)
- [Export Boom](./export-boom.md)
- [Index](./index.md)
