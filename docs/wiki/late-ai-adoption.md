# Late AI Adoption

**Category:** shock  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Late AI Adoption sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to hybrid scheduling and
market clearing across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.36
- Mid-horizon volatility: 0.08
- Late-horizon persistence: 0.80
- Sensitivity to policy shocks: 0.82
- Elasticity to reskilling investment: 0.5

## Market linkage

Traders can express a view on Late AI Adoption through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.12. Forecasters who track Late AI Adoption
historically improve most on bins near 0.12, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Construction](./construction.md)
- [Automation Wavefront](./automation-wavefront.md)
- [Labor Market Loosen](./labor-market-loosen.md)
- [Index](./index.md)
