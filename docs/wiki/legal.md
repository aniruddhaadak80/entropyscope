# Legal

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Legal sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to hybrid scheduling and
hybrid scheduling across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.72
- Mid-horizon volatility: 0.04
- Late-horizon persistence: 0.94
- Sensitivity to policy shocks: 0.69
- Elasticity to reskilling investment: 0.5

## Market linkage

Traders can express a view on Legal through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.18. Forecasters who track Legal
historically improve most on bins near 0.18, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Creative](./creative.md)
- [Calibration Bin](./calibration-bin.md)
- [Labor Market Loosen](./labor-market-loosen.md)
- [Index](./index.md)
