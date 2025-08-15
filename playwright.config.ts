import type { PlaywrightTestConfig } from '@playwright/test';

const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
const API_URL = process.env.API_URL || 'http://localhost:4000';

const config: PlaywrightTestConfig = {
  webServer: [
    {
      command: 'pnpm --filter @world-quest/api dev',
      url: API_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter @world-quest/web dev',
      url: WEB_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
  testDir: 'tests/e2e',
};

export default config;
