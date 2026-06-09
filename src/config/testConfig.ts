import * as dotenv from 'dotenv';

dotenv.config();

export interface TestConfig {
  baseUrl: string; // Primary application under test
  browser: string; // chromium | firefox (extendable)
  headless: boolean; // Run headless
  timeouts: {
    action: number; // Single action timeout
    navigation: number; // Navigation timeout
    scenario: number; // Overall scenario timeout (if applied)
  };
  paths: {
    fixtures: string; // Location of test fixture files
    reports: string; // Location for test reports
    screenshots: string; // Location for screenshots
    videos: string; // Location for test videos
    authStorage: string; // Location for auth state storage
  };
}

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value && value.trim() !== '') return value.trim();
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${name}`);
}

export const testConfig: TestConfig = {
  baseUrl: getEnv('BASE_URL', 'https://chorus-test.one-line.com/'),
  browser: getEnv('BROWSER', 'chromium'),
  headless: getEnv('HEADLESS', 'true') !== 'false',
  timeouts: {
    action: parseInt(getEnv('ACTION_TIMEOUT', '15000'), 10),
    navigation: parseInt(getEnv('NAVIGATION_TIMEOUT', '30000'), 10),
    scenario: parseInt(getEnv('SCENARIO_TIMEOUT', '60000'), 10),
  },
  paths: {
    fixtures: getEnv('FIXTURES_PATH', 'src/support'),
    reports: getEnv('REPORTS_PATH', 'test-results'),
    screenshots: getEnv('SCREENSHOTS_PATH', 'screenshots'),
    videos: getEnv('VIDEOS_PATH', './reports/videos'),
    authStorage: getEnv('AUTH_STORAGE_PATH', 'playwright/.auth/user.json'),
  },
};

export function validateConfig(cfg: TestConfig = testConfig): void {
  const supportedBrowsers = ['chromium', 'firefox'];
  if (!supportedBrowsers.includes(cfg.browser)) {
    throw new Error(`Unsupported browser: ${cfg.browser}. Supported: ${supportedBrowsers.join(', ')}`);
  }
  if (cfg.timeouts.action <= 0 || cfg.timeouts.navigation <= 0) {
    throw new Error('Timeout values must be positive.');
  }
}

validateConfig();
