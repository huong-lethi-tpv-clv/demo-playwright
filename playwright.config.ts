import * as fs from 'fs';
import * as path from 'path';

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { defineBddConfig } from 'playwright-bdd';

// Import ENV
const environment = process.env.TEST_ENV || 'test';
const envPath = path.resolve(__dirname, `.env.${environment}`);
dotenv.config({ path: envPath });
console.log(`🚀 Running tests on environment: ${environment.toUpperCase()} (File: .env.${environment})`);

import { testConfig } from './src/config/testConfig';

const testDir = defineBddConfig({
  features: 'src/tests/**/*.feature',
  steps: ['src/tests/**/*.steps.ts', 'src/tests/fixtures.ts'],
});

// Check if auth file exists - only use it if present
const authFile = testConfig.paths.authStorage;
const storageState = fs.existsSync(authFile) ? authFile : undefined;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  // Match generated .spec.js files from playwright-bdd
  testMatch: '**/*.spec.js',

  /* Run tests one at a time (no parallel execution) */
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 3 : 0,

  /* Run one test at a time */
  workers: 1,

  /* Global timeout for each test (2 minutes max per test) */
  timeout: testConfig.timeouts.scenario * 2, // 120000ms = 2 minutes

  /* Expect timeout for assertions */
  expect: {
    timeout: testConfig.timeouts.action, // 15000ms = 15 seconds
  },

  /* Global setup - authenticate once before all tests */
  globalSetup: './src/hooks/global-setup.ts',

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'reports/playwright-html-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit-report.xml' }],
    ['list'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          'Test Environment': process.env.ENVIRONMENT || 'LOCAL',
          'Base URL': testConfig.baseUrl,
          Browser: 'Chromium, Firefox, WebKit',
          'Node Version': process.version,
        },
      },
    ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.baseUrl,

    /* Slow down actions for local debugging only */
    launchOptions: {
      slowMo: process.env.CI ? 0 : (Number(process.env.SLOW_MO) || 0),
    },

    /* Use authenticated state for all tests (if file exists) */
    storageState,

    /* Action timeout (click, fill, etc.) - 15 seconds */
    actionTimeout: testConfig.timeouts.action,

    /* Navigation timeout (goto, waitForURL, etc.) - 30 seconds */
    navigationTimeout: testConfig.timeouts.navigation,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Configure folder for test artifacts */
  outputDir: 'reports/test-results',
});
