import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility audit — axe-core over the core product surface.
 * Asserts zero critical/serious WCAG 2.0 A+AA violations. Moderate/minor
 * findings are tolerated so CI doesn't block on cosmetic tuning, but
 * critical and serious ones fail the suite.
 */
const PAGES = ["/", "/dashboard", "/scenarios", "/markets", "/time-machine", "/parity", "/about", "/features"];

for (const path of PAGES) {
  test(`a11y: no critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude("noscript")
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    const summary = blocking
      .map(
        (v) =>
          `${v.id} (${v.impact}) on ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join("; ")}`,
      )
      .join(", ");

    expect(blocking, summary || "no axe violations").toEqual([]);
  });
}
