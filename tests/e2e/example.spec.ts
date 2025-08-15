import { test, expect } from '@playwright/test';

const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
const API_URL = process.env.API_URL || 'http://localhost:4000';

test('web home renders and button works', async ({ page }) => {
  await page.goto(WEB_URL);
  await expect(page.getByRole('heading', { name: 'World Quest' })).toBeVisible();
});

test('api healthcheck', async ({ request }) => {
  const res = await request.get(`${API_URL}/healthz`);
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  expect(json).toEqual({ status: 'ok' });
});
