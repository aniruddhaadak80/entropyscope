# Designer

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Designer sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to firm-level reorganization and
institutional drift across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.31
- Mid-horizon volatility: 0.90
- Late-horizon persistence: 0.86
- Sensitivity to policy shocks: 0.50
- Elasticity to reskilling investment: 0.1

## Market linkage

Traders can express a view on Designer through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.08. Forecasters who track Designer
historically improve most on bins near 0.08, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Retail](./retail.md)
- [Labor Share](./labor-share.md)
- [Early AI Adoption](./early-ai-adoption.md)
- [Index](./index.md)
