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
