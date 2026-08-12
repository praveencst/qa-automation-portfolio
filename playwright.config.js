// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './step-definitions',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false, // Cucumber manages parallelization
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ]
});