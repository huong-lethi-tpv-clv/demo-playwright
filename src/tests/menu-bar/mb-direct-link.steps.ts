/**
 * Step definitions for Menu Bar — Direct Link (expand mode) scenarios.
 *
 * Covers:
 *  - APM-8688: Clicking a menu item in expand mode opens the corresponding page in a new tab
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { MenuBarPage } from '@pages/menu-bar';

import { test } from '../fixtures';

const { When, Then } = createBdd(test);

// In-scenario state
let newTab: import('@playwright/test').Page | undefined;
let clickedPageLabel = '';

When('the user opens the expand mode of the menu bar', async ({ page }) => {
  const mb = new MenuBarPage(page);
  await mb.expandMenuBar();
});

When('the user opens all menu categories', async ({ page }) => {
  const mb = new MenuBarPage(page);
  await mb.openAllCategories();
});

When('the user clicks on {string} in the menu bar', async ({ page }, pageLabel: string) => {
  const mb = new MenuBarPage(page);
  clickedPageLabel = pageLabel;
  newTab = await mb.clickNavItemAndGetNewTab(pageLabel);
});

Then('the corresponding page opens in a new tab', async () => {
  expect(newTab, `New tab should have opened when clicking "${clickedPageLabel}"`).toBeDefined();
  if (!newTab) return;

  // Basic assertion: new tab has a URL and page is loaded
  await newTab.waitForLoadState('domcontentloaded');
  const url = newTab.url();
  expect(url, `New tab URL should not be empty for "${clickedPageLabel}"`).not.toBe('about:blank');
});
