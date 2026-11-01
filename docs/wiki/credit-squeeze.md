# Credit Squeeze

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Credit Squeeze sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to hybrid scheduling and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.80
- Mid-horizon volatility: 0.42
- Late-horizon persistence: 0.61
- Sensitivity to policy shocks: 0.20
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Credit Squeeze through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.19. Forecasters who track Credit Squeeze
historically improve most on bins near 0.19, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Finance](./finance.md)
- [Timeline Fork](./timeline-fork.md)
- [Early AI Adoption](./early-ai-adoption.md)
- [Index](./index.md)
