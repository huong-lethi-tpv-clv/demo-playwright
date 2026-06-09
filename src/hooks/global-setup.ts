import { chromium, FullConfig } from '@playwright/test';

import { testConfig } from '../config/testConfig';
import { Logger } from '../support/shared';
import { AuthenticationManager } from '../support/shared/lib/AuthenticationManager';

/**
 * Global Setup - Runs once before all tests
 *
 * This performs authentication once and saves the state to be reused by all tests.
 * This significantly improves test execution speed by eliminating repeated logins.
 *
 * Usage:
 * - Add `globalSetup: './src/hooks/global-setup.ts'` to playwright.config.ts
 * - All tests will automatically reuse this authenticated state
 * - Use @skip-auto-login tag on scenarios that need to test login flow
 */
async function globalSetup(_config: FullConfig): Promise<void> {
  Logger.info('🚀 Global Setup: Starting one-time authentication...');

  const authManager = new AuthenticationManager(testConfig.paths.authStorage);

  // Launch browser for authentication
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Perform authentication
    Logger.info('Authenticating with E2E credentials...');
    await authManager.ensureAuthenticated(page, context, false); // Always perform fresh login

    // Save authentication state for reuse
    await context.storageState({ path: testConfig.paths.authStorage });
    Logger.success('Global Setup: Authentication successful! State saved.');
  } catch (error) {
    Logger.error(`Global Setup: Authentication failed - ${(error as Error).message}`);
    throw error;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
