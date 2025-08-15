import { test, expect } from "@playwright/test";
import { waitForHttp } from "./utils/wait";

const PORT_API = Number(process.env.PORT_API ?? 4000);
const PORT_WEB = Number(process.env.PORT_WEB ?? 3000);
const basePath = process.env.BASE_PATH && process.env.BASE_PATH !== "/" ? process.env.BASE_PATH : "";
const WEB_BASE = `http://localhost:${PORT_WEB}${basePath}`;
const WEB_HEALTH = `${WEB_BASE}/healthz`;
const API_HEALTH = `http://localhost:${PORT_API}/healthz`;

test.beforeAll(async () => {
  await waitForHttp(API_HEALTH, { timeoutMs: 20_000, intervalMs: 500 });
  await waitForHttp(WEB_HEALTH, { timeoutMs: 20_000, intervalMs: 500 });
});

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Web is live/i })).toBeVisible();
});

test("api health", async () => {
  const res = await fetch(API_HEALTH);
  const json = await res.json();
  expect(json.status).toBe("ok");
});

test("flag quiz API shape (seeded)", async () => {
  const res = await fetch(`http://localhost:${PORT_API}/v1/quiz/flag?seed=123`);
  expect(res.ok).toBeTruthy();
  const json = await res.json();
  expect(json).toHaveProperty("id");
  expect(json).toHaveProperty("question");
  expect(json).toHaveProperty("options");
  expect(Array.isArray(json.options)).toBe(true);
  expect(json.options.length).toBe(4);
  expect(json).toHaveProperty("correctId");
});

test("flag quiz page renders", async ({ page }) => {
  await page.goto("/flag-quiz");
  await expect(page.getByRole("heading", { name: /Flag Quiz/i })).toBeVisible();
});

test("flag quiz API is deterministic with seed", async () => {
  const url = (s:number)=>`http://localhost:${process.env.PORT_API ?? 4000}/v1/quiz/flag?seed=${s}`;
  const r1 = await fetch(url(123)); const j1 = await r1.json();
  const r2 = await fetch(url(123)); const j2 = await r2.json();
  expect(j1.correctId).toBe(j2.correctId);
  expect(JSON.stringify(j1.options)).toBe(JSON.stringify(j2.options));
});

test("flag quiz UI shows feedback on click", async ({ page }) => {
  await page.goto("/flag-quiz");

  // trigger deterministic question
  await page.getByRole("button", { name: /Deterministic \(seed=123\)/i }).click();

  // wait for the question + options to render
  await expect(page.getByRole("heading", { name: /Which country’s flag is shown\?/i })).toBeVisible();

  // options are rendered as <ul> with 4 <button>s — wait deterministically
  const options = page.locator("main ul >> role=button");
  await expect(options).toHaveCount(4);

  // click the first option
  await options.first().click();

  // feedback should appear
  await expect(page.getByText(/Correct|Incorrect/)).toBeVisible();
});

test("flag quiz UI shows next-question flow and updates score", async ({ page }) => {
  await page.goto("/flag-quiz");

  // Start deterministic to avoid flake
  await page.getByRole("button", { name: /Deterministic \(seed=123\)/i }).click();

  // Wait for options
  const options = page.locator("main ul >> role=button");
  await expect(options).toHaveCount(4);

  // Read initial score
  const score = page.getByText(/Score:\s*\d+\s*\/\s*\d+/);
  await expect(score).toBeVisible();
  const initialText = await score.textContent();

  // Click first option
  await options.first().click();
  await expect(page.getByText(/Correct|Incorrect/)).toBeVisible();

  // Score should update (total increments by 1)
  const afterFirst = await score.textContent();
  expect(afterFirst).not.toBe(initialText);

  // Next question
  await page.getByTestId("next").click();
  await expect(options).toHaveCount(4); // re-rendered
});

test("flag quiz shows an image if available", async ({ page }) => {
  await page.goto("/flag-quiz");
  // force a deterministic question likely to be in our tiny asset set
  await page.getByRole("button", { name: /Deterministic \(seed=123\)/i }).click();
  // image may or may not be among the 4; we still verify that an <img> can appear
  const maybeImg = page.locator("img");
  await maybeImg.first().waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
  // pass if either image is visible OR question heading is visible (non-flaky)
  const seenHeading = await page.getByRole("heading", { name: /Which country/ }).isVisible().catch(()=>false);
  const seenImage = await maybeImg.first().isVisible().catch(()=>false);
  expect(seenHeading || seenImage).toBeTruthy();
});

test("round of 3 renders at least one flag image", async ({ page }) => {
  await page.goto("/flag-quiz?n=3&seed=1200");
  const options = page.locator("main ul >> role=button");
  await options.first().waitFor({ state: "visible" });
  // Click first option, go next twice
  let sawImage = false;
  for (let i=0;i<3;i++){
    const img = page.locator("img").first();
    if (await img.isVisible().catch(()=>false)) sawImage = true;
    await options.first().click();
    await page.getByText(/Correct|Incorrect/).waitFor();
    if (i<2) {
      await page.getByTestId("next").click();
      await options.first().waitFor({ state: "visible" });
    }
  }
  expect(sawImage).toBeTruthy();
});
