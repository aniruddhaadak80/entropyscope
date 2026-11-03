import { expect, test } from "@playwright/test";

test.describe("API surface", () => {
  test("health endpoint reports the canonical seed", async ({ request }) => {
    const response = await request.get("/healthz");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.seed).toBe(7331);
  });

  test("scenarios endpoint lists seeded scenarios", async ({ request }) => {
    const response = await request.get("/api/scenarios");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body.some((s: { id: string }) => s.id === "baseline")).toBe(true);
  });

  test("scenario by id returns the matching record", async ({ request }) => {
    const response = await request.get("/api/scenarios/baseline");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe("baseline");
  });

  test("unknown scenario id returns 404", async ({ request }) => {
    const response = await request.get("/api/scenarios/does-not-exist");
    expect(response.status()).toBe(404);
  });

  test("robots and sitemap are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
  });
});
