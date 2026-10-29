# entropyscope agent service

Python FastAPI service running heavier agent brains and simulation workers.

## Contract

| Endpoint | Method | Description |
|---|---|---|
| `/healthz` | GET | Health check |
| `/` | GET | Service info |
| `/simulate/step` | POST | Deterministic single-year simulation step |
| `/simulate/world` | GET | Seeded initial world state |
| `/markets` | GET | Available prediction markets |

## Zero keys

No API keys required. All simulation is deterministic local simulation seeded from 7331.

## Run

```bash
cd services/agents
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

## Test

```bash
pip install pytest
pytest tests/ -v
# or: python tests/test_app.py
```
