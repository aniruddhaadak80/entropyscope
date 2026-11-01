# Logistics

**Category:** sector  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Logistics sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to institutional drift and
productivity distribution across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.65
- Mid-horizon volatility: 0.35
- Late-horizon persistence: 0.29
- Sensitivity to policy shocks: 0.22
- Elasticity to reskilling investment: 0.2

## Market linkage

Traders can express a view on Logistics through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.11. Forecasters who track Logistics
historically improve most on bins near 0.11, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Healthcare](./healthcare.md)
- [Reskilling Debt](./reskilling-debt.md)
- [Labor Market Loosen](./labor-market-loosen.md)
- [Index](./index.md)
