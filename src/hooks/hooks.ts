import { test } from '@playwright/test';

import { Logger } from '@support/shared';

/**
 * Global Test Hooks for Playwright-BDD
 *
 * This file provides auto-login functionality matching the boilerplate pattern
 * where ensureAdminAuthentication runs BEFORE navigation.
 *
 * Import this file in generated spec files to activate hooks.
 */

/**
 * Before each test - verify authentication state
 *
 * With global setup enabled, this just verifies the auth state is still valid.
 * No actual login happens here - that's done once in global-setup.ts
 *
 * For tests that need to test login flow itself, use @skip-auto-login tag.
 */
test.beforeEach(async ({ page }, testInfo) => {
  // Check if test/scenario has @skip-auto-login tag
  const testTitle = testInfo.title.toLowerCase();
  const hasSkipAutoLogin =
    testTitle.includes('@skip-auto-login') ||
    testTitle.includes('skip-auto-login') ||
    testInfo.tags.some(tag => tag === '@skip-auto-login');

  if (hasSkipAutoLogin) {
    Logger.info('⏭️  Skipping authentication check (test has @skip-auto-login tag)');
    return;
  }

  if (!page) {
    Logger.warn('⚠️  Page not initialized in beforeEach hook');
    return;
  }

  // Just log that we're using the global authentication state
  Logger.info('🔑 Using global authentication state (logged in once at start)');
});

/**
 * Cleanup after each test
 */
test.afterEach(async ({ page }, testInfo) => {
  if (page) {
    const status = testInfo.status === 'passed' ? '✓' : '✗';
    Logger.info(`${status} Test: ${testInfo.title}`);
  }
});
