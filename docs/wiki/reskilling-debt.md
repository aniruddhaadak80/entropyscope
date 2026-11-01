# Reskilling Debt

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Reskilling Debt sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to risk pooling and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.14
- Mid-horizon volatility: 0.18
- Late-horizon persistence: 0.30
- Sensitivity to policy shocks: 0.94
- Elasticity to reskilling investment: 0.9

## Market linkage

Traders can express a view on Reskilling Debt through the outcome market
"remote-dominance". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.16. Forecasters who track Reskilling Debt
historically improve most on bins near 0.16, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Healthcare](./healthcare.md)
- [Wage Bill](./wage-bill.md)
- [Four-Day Week](./four-day-week.md)
- [Index](./index.md)
