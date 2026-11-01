# Construction

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Construction sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to risk pooling and
occupational churn across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.08
- Mid-horizon volatility: 0.12
- Late-horizon persistence: 0.75
- Sensitivity to policy shocks: 0.51
- Elasticity to reskilling investment: 0.8

## Market linkage

Traders can express a view on Construction through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.10. Forecasters who track Construction
historically improve most on bins near 0.10, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Finance](./finance.md)
- [Labor Share](./labor-share.md)
- [Export Boom](./export-boom.md)
- [Index](./index.md)
