# Retail

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Retail sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to risk pooling and
labor dynamics across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.93
- Mid-horizon volatility: 0.32
- Late-horizon persistence: 0.29
- Sensitivity to policy shocks: 0.37
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Retail through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.20. Forecasters who track Retail
historically improve most on bins near 0.20, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Agriculture](./agriculture.md)
- [Productivity J-Curve](./productivity-j-curve.md)
- [Climate Levy](./climate-levy.md)
- [Index](./index.md)
