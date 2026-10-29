"""
entropyscope agent service — Python FastAPI.

Runs heavier agent-brains and simulation workers. Deterministic local simulation
by default — no API keys, no network. Called by the Next.js app via SSE/HTTP.
"""

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI(title="entropyscope agent service", version="0.1.0")

SEED = 7331
rng = random.Random(SEED)


class StepRequest(BaseModel):
    seed: int
    year: int
    workers: List[dict]
    sectors: List[dict]
    jobs: List[dict]


class StepResponse(BaseModel):
    year: int
    unemploymentRate: float
    totalWageBill: float
    aiAdoptionRate: float
    remoteRate: float


@app.get("/healthz")
async def healthz():
    return {"status": "ok", "service": "agent-service", "seed": SEED}


@app.get("/")
async def root():
    return {"service": "entropyscope agent service", "version": "0.1.0"}


@app.post("/simulate/step", response_model=StepResponse)
async def simulate_step(req: StepRequest):
    """Deterministic single-year simulation step."""
    r = random.Random(req.seed + req.year + 1)
    workers = req.workers
    sectors = {s["id"]: s for s in req.sectors}

    workers_affected = 0
    jobs_lost = 0
    ai_wave = req.year >= 5
    automation_wave = req.year >= 12

    for w in workers:
        sector = sectors.get(w["sector"])
        if not sector:
            continue
        if ai_wave and w.get("aiExposed", False) and r.random() < 0.05:
            w["employed"] = False
            workers_affected += 1
            jobs_lost += 1
            continue
        if automation_wave and r.random() < 0.03:
            w["employed"] = False
            workers_affected += 1
            jobs_lost += 1
            continue

    employed = [w for w in workers if w.get("employed", False)]
    total_wage = sum(w.get("wage", 0) for w in employed)
    unemployment = (len(workers) - len(employed)) / len(workers) if workers else 0
    ai_rate = (
        sum(1 for w in workers if w.get("aiExposed", False)) / len(workers)
        if workers
        else 0
    )
    remote_rate = (
        sum(1 for w in workers if w.get("remoteEligible", False)) / len(workers)
        if workers
        else 0
    )

    return StepResponse(
        year=req.year + 1,
        unemploymentRate=round(unemployment, 4),
        totalWageBill=round(total_wage, 2),
        aiAdoptionRate=round(ai_rate, 4),
        remoteRate=round(remote_rate, 4),
    )


@app.get("/simulate/world")
async def get_world():
    """Return a seeded initial world state."""
    return {
        "seed": SEED,
        "year": 0,
        "workers": [],
        "sectors": [],
        "jobs": [],
        "totalWageBill": 0,
        "unemploymentRate": 0,
        "aiAdoptionRate": 0,
        "remoteRate": 0,
        "fourDayWeekRate": 0,
    }


@app.get("/markets")
async def markets():
    """List available prediction markets."""
    return [
        {
            "id": "unemployment-year-10",
            "question": "Will unemployment be below 5% in year 10?",
            "yesPrice": 0.5,
            "noPrice": 0.5,
            "resolved": False,
        },
        {
            "id": "ai-adoption-year-15",
            "question": "Will more than 50% of jobs be AI-exposed by year 15?",
            "yesPrice": 0.4,
            "noPrice": 0.6,
            "resolved": False,
        },
    ]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
