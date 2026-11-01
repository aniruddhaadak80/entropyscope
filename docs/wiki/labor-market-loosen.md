# Labor Market Loosen

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Labor Market Loosen sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to productivity distribution and
productivity distribution across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.92
- Mid-horizon volatility: 0.50
- Late-horizon persistence: 0.54
- Sensitivity to policy shocks: 0.04
- Elasticity to reskilling investment: 0.7

## Market linkage

Traders can express a view on Labor Market Loosen through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.12. Forecasters who track Labor Market Loosen
historically improve most on bins near 0.12, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Technology](./technology.md)
- [Automation Wavefront](./automation-wavefront.md)
- [Export Boom](./export-boom.md)
- [Index](./index.md)
