# Four-Day Week Effect

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Four-Day Week Effect sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to productivity distribution and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.63
- Mid-horizon volatility: 0.62
- Late-horizon persistence: 1.00
- Sensitivity to policy shocks: 0.30
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Four-Day Week Effect through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.12. Forecasters who track Four-Day Week Effect
historically improve most on bins near 0.12, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Finance](./finance.md)
- [Fragility Index](./fragility-index.md)
- [Four-Day Week](./four-day-week.md)
- [Index](./index.md)
