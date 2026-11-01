# Calibration Bin

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Calibration Bin sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to productivity distribution and
capital deepening across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.76
- Mid-horizon volatility: 0.14
- Late-horizon persistence: 0.24
- Sensitivity to policy shocks: 0.26
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Calibration Bin through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.10. Forecasters who track Calibration Bin
historically improve most on bins near 0.10, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Energy](./energy.md)
- [Calibration Bin](./calibration-bin.md)
- [Late AI Adoption](./late-ai-adoption.md)
- [Index](./index.md)
