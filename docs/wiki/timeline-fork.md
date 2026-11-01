# Timeline Fork

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Timeline Fork sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to institutional drift and
institutional drift across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.09
- Mid-horizon volatility: 0.44
- Late-horizon persistence: 0.68
- Sensitivity to policy shocks: 0.51
- Elasticity to reskilling investment: 0.1

## Market linkage

Traders can express a view on Timeline Fork through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.07. Forecasters who track Timeline Fork
historically improve most on bins near 0.07, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Energy](./energy.md)
- [AI Exposure](./ai-exposure.md)
- [Credit Squeeze](./credit-squeeze.md)
- [Index](./index.md)
