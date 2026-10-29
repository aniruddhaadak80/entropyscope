"""Tests for the entropyscope agent service."""

from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_healthz():
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"
    assert r.json()["seed"] == 7331


def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["service"] == "entropyscope agent service"


def test_simulate_step():
    payload = {
        "seed": 7331,
        "year": 0,
        "workers": [
            {
                "id": "w1",
                "sector": "s1",
                "employed": True,
                "wage": 50000,
                "aiExposed": True,
                "remoteEligible": False,
            },
        ],
        "sectors": [
            {
                "id": "s1",
                "name": "Test",
                "aiExposure": 0.5,
                "remoteRate": 0.2,
                "wageBase": 50000,
                "workerCount": 1,
            }
        ],
        "jobs": [],
    }
    r = client.post("/simulate/step", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["year"] == 1
    assert 0 <= data["unemploymentRate"] <= 1


def test_markets():
    r = client.get("/markets")
    assert r.status_code == 200
    assert len(r.json()) >= 1


if __name__ == "__main__":
    test_healthz()
    test_root()
    test_simulate_step()
    test_markets()
    print("All agent service tests passed.")
