# Auditor

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Auditor sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to institutional drift and
wage compression across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.77
- Mid-horizon volatility: 0.67
- Late-horizon persistence: 0.06
- Sensitivity to policy shocks: 0.51
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Auditor through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.11. Forecasters who track Auditor
historically improve most on bins near 0.11, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Logistics](./logistics.md)
- [Constant-Product AMM](./constant-product-amm.md)
- [Trade Openness](./trade-openness.md)
- [Index](./index.md)
