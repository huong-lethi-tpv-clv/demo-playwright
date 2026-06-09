/**
 * Step definitions for Invoice Creation — Page Layout scenarios.
 *
 * Covers:
 *  - APM-28825: Access to the Invoice Creation page (title displayed)
 *  - APM-28826: Confirm button is enabled on the Invoice Creation page
 *
 * Migrated from: cypress/e2e/features/pages/InvoiceCreationPage/workflows/
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { InvoiceCreationPage } from '@pages/invoice-creation';

import { test } from '../fixtures';

const { When, Then } = createBdd(test);

When('the user navigates to the Invoice Creation screen', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.navigateToInvoiceCreation();
});

Then('the title {string} is displayed', async ({ page }, title: string) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getInvoiceTitle()).toContainText(title, { timeout: 10_000 });
});

Then('the Confirm button is enabled', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getConfirmButton()).toBeEnabled({ timeout: 10_000 });
});
