import { Page, Locator, expect } from "@playwright/test";

export async function readOptionTexts(options: Locator): Promise<string[]> {
  return (await options.allTextContents()).map(s => (s ?? "").trim());
}

export async function waitForOptionsToChange(page: Page, options: Locator, previous: string[]) {
  await expect.poll(
    async () => (await readOptionTexts(options)).join("||"),
    { timeout: 5000, intervals: [200, 300, 500, 800, 1200] }
  ).not.toBe(previous.join("||"));
}

export async function waitForFlagResponse(page: Page, timeoutMs = 5000) {
  // Resolve when any /v1/quiz/flag response (2xx) arrives, else timeout quietly.
  try {
    await page.waitForResponse(
      (r) =>
        r.url().includes("/v1/quiz/flag") &&
        r.status() >= 200 &&
        r.status() < 300,
      { timeout: timeoutMs }
    );
  } catch {
    // swallow; DOM-change fallback will handle progress
  }
}

export async function clickAndAwaitNext(page: Page, options: Locator, previous: string[]) {
  // Click Next then Race: network OR DOM change
  await Promise.allSettled([
    waitForFlagResponse(page, 5000),
    (async () => {
      await page.getByTestId("next").click();
    })(),
  ]);
  await waitForOptionsToChange(page, options, previous);
}

export async function clickAndAwaitFinish(page: Page) {
  // Click Finish; don’t depend on network — just wait for definitive summary UI.
  await page.getByTestId("finish").scrollIntoViewIfNeeded().catch(() => {});
  await page.getByTestId("finish").click();
  // Wait for either summary heading or restart button as the success signal
  await Promise.race([
    page.getByTestId("summary-heading").waitFor({ timeout: 5000 }),
    page.getByTestId("restart").waitFor({ state: "visible", timeout: 5000 }),
  ]);
}

export async function clickAndAwaitRestart(page: Page, options: Locator, previous: string[]) {
  // Click Restart then Race: network OR DOM change
  await Promise.allSettled([
    waitForFlagResponse(page, 5000),
    (async () => {
      await page.getByTestId("restart").click();
    })(),
  ]);
  await waitForOptionsToChange(page, options, previous);
  await expect(options.first()).toBeVisible();
}
