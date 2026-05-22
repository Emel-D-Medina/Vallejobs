// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'set DB_CONNECT_TIMEOUT=5000 && set DB_ACQUIRE_TIMEOUT=5000 && pnpm start',
    url: 'http://localhost:5000/',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
