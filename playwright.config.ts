import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright e2e — runs against the production build (next start).
 * Prerequisite: `bun run build` at the repo root.
 *
 * Set E2E_BASE_URL (e.g. https://entropyscope.vercel.app) to point the
 * suite at a remote environment instead of the local server — the local
 * webServer is then skipped entirely.
 */
const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const IS_REMOTE = Boolean(process.env.E2E_BASE_URL);

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
    baseURL: BASE_URL,
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
  webServer: IS_REMOTE
    ? undefined
    : {
        command: "bun run start",
        cwd: "apps/web",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
