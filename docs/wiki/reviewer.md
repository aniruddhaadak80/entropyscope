# Reviewer

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Reviewer sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to risk pooling and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.98
- Mid-horizon volatility: 0.39
- Late-horizon persistence: 0.37
- Sensitivity to policy shocks: 0.74
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Reviewer through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.07. Forecasters who track Reviewer
historically improve most on bins near 0.07, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Manufacturing](./manufacturing.md)
- [Unemployment Persistence](./unemployment-persistence.md)
- [Early AI Adoption](./early-ai-adoption.md)
- [Index](./index.md)
