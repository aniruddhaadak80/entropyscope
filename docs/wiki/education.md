# Education

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Education sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to labor dynamics and
institutional drift across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.91
- Mid-horizon volatility: 0.15
- Late-horizon persistence: 0.37
- Sensitivity to policy shocks: 0.72
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Education through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.17. Forecasters who track Education
historically improve most on bins near 0.17, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Healthcare](./healthcare.md)
- [Brier Score](./brier-score.md)
- [Export Boom](./export-boom.md)
- [Index](./index.md)
