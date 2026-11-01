# Productivity J-Curve

**Category:** concept  |  **Universe:** seed 7331  |  **Cadence:** annual, 30 simulated years

## Overview

Productivity J-Curve sits inside the EntropyScope reference library. Entries in this
category model how forecasts respond to skill adjacency and
skill adjacency across a 30-year simulation horizon. The engine is a
finite-state deterministic simulation, so every number below is reproducible
from seed 7331 on any machine.

## Simulated response profile

- Early-year signal strength: 0.83
- Mid-horizon volatility: 0.29
- Late-horizon persistence: 0.89
- Sensitivity to policy shocks: 0.21
- Elasticity to reskilling investment: 0.8

## Market linkage

Traders can express a view on Productivity J-Curve through the outcome market
"unemployment-year-10". Prices follow a constant-product AMM; no oracle
feeds are used and every fill is reproducible from seed 7331.

## Calibration guidance

Brier scoring uses bins of width 0.11. Forecasters who track Productivity J-Curve
historically improve most on bins near 0.11, so broaden confidence
intervals before narrowing point estimates. Review the calibration page
after each resolution month to compare your curve against the laplace
reference.

## Related entries

- [Education](./education.md)
- [Deterministic Replay](./deterministic-replay.md)
- [Early AI Adoption](./early-ai-adoption.md)
- [Index](./index.md)
