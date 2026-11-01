# Unemployment Persistence

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Unemployment Persistence sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to hybrid scheduling and
labor dynamics across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.56
- Mid-horizon volatility: 0.21
- Late-horizon persistence: 0.57
- Sensitivity to policy shocks: 0.05
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Unemployment Persistence through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.06. Forecasters who track Unemployment Persistence
historically improve most on bins near 0.06, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Construction](./construction.md)
- [Unemployment Persistence](./unemployment-persistence.md)
- [Labor Market Loosen](./labor-market-loosen.md)
- [Index](./index.md)
