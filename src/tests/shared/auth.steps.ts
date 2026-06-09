/**
 * Shared background steps for APM tests.
 *
 * "Access to the APM system" / "Login with Creator Role" etc. are translated
 * as navigation-only steps — authentication is already handled by global-setup.ts
 * which saves playwright/.auth/user.json and is loaded via storageState in playwright.config.ts.
 */

import { createBdd } from 'playwright-bdd';

import { test } from '../fixtures';

const { Given } = createBdd(test);

// ─── Shared background steps (used across ALL modules) ───────────────────────
// Auth is already applied via storageState from global-setup — no login needed here.

Given('Access to the APM system', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('Login with Creator Role', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('Login with System Admin Role', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the user is on any APM page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the user has accessed the APM system with Creator role', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the user has accessed the APM system with System Admin role', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});
