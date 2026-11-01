# Specifier

**Category:** role  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Specifier sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to capital deepening and
productivity distribution across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.20
- Mid-horizon volatility: 0.78
- Late-horizon persistence: 0.28
- Sensitivity to policy shocks: 0.90
- Elasticity to reskilling investment: 0.4

## Market linkage

Traders can express a view on Specifier through the outcome market
"four-day-week-adoption". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.10. Forecasters who track Specifier
historically improve most on bins near 0.10, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Deterministic Replay](./deterministic-replay.md)
- [Labor Market Loosen](./labor-market-loosen.md)
- [Index](./index.md)
