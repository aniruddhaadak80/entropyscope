# Skill Half-Life

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Skill Half-Life sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to occupational churn and
hybrid scheduling across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.42
- Mid-horizon volatility: 0.17
- Late-horizon persistence: 0.34
- Sensitivity to policy shocks: 0.09
- Elasticity to reskilling investment: 0.0

## Market linkage

Traders can express a view on Skill Half-Life through the outcome market
"ai-adoption-year-15". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.13. Forecasters who track Skill Half-Life
historically improve most on bins near 0.13, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Technology](./technology.md)
- [Reskilling Debt](./reskilling-debt.md)
- [Late AI Adoption](./late-ai-adoption.md)
- [Index](./index.md)
