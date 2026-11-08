# deepdrills — scale engine family (spec DEEPDRILLS v1, seed 7331)

Deterministic drill-down tables built on the committed catalog:

- `sector-drills/` — 12 sectors × 31 years of headcount, wage bill, AI adoption,
  remote rate, churn, reskilling load and automation share.
- `job-drills/` — per job: automation risk, augmentation leverage, five-year
  outlook, reskilling paths (real skill ids) and a 10-year wage forecast.
- `skill-demand.json` — 240 skills × 31 years of demand intensity plus trend label.

Every value is a pure function of (year, index); regeneration is order-independent.
