# Manufacturing

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Manufacturing sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to credential inflation and
institutional drift across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.69
- Mid-horizon volatility: 0.03
- Late-horizon persistence: 0.92
- Sensitivity to policy shocks: 0.77
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Manufacturing through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.12. Forecasters who track Manufacturing
historically improve most on bins near 0.12, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Finance](./finance.md)
- [Policy Shock](./policy-shock.md)
- [Late AI Adoption](./late-ai-adoption.md)
- [Index](./index.md)
