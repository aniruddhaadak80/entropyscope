import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright e2e — runs against the production build (next start).
 * Prerequisite: `bun run build` at the repo root.
 */
export default defineConfig({
  testDir: "apps/web/tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "mobile",
      use: devices["Pixel 7"],
    },
  ],
  webServer: {
    command: "bun run start",
    cwd: "apps/web",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
