# Climate Levy

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Climate Levy sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to capital deepening and
wage compression across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.71
- Mid-horizon volatility: 0.34
- Late-horizon persistence: 0.75
- Sensitivity to policy shocks: 0.42
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Climate Levy through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.20. Forecasters who track Climate Levy
historically improve most on bins near 0.20, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Forecast Horizon](./forecast-horizon.md)
- [Four-Day Week](./four-day-week.md)
- [Index](./index.md)
