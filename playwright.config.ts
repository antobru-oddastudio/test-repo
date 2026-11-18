import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:8081', ...devices['Pixel 7'] },
  // Fixed clock: "today" = 2026-11-18 (Europe/Rome)
  webServer: {
    command: 'npx expo export --platform web && npx serve dist -l 8081',
    env: { EXPO_PUBLIC_FIXED_NOW: '2026-11-18T10:00:00+01:00' },
    url: 'http://localhost:8081',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
