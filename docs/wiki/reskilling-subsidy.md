# Reskilling Subsidy

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Reskilling Subsidy sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to institutional drift and
capital deepening across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.70
- Mid-horizon volatility: 0.51
- Late-horizon persistence: 0.13
- Sensitivity to policy shocks: 0.62
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Reskilling Subsidy through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.16. Forecasters who track Reskilling Subsidy
historically improve most on bins near 0.16, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Task Bundling](./task-bundling.md)
- [Credit Squeeze](./credit-squeeze.md)
- [Index](./index.md)
