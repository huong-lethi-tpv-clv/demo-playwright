/**
 * Step definitions for Invoice Inquiry — New Invoice button scenarios.
 *
 * Covers:
 *  - APM-2109: New Invoice button opens Invoice Creation in a new tab
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { InvoiceInquiryPage } from '@pages/invoice-inquiry';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

// In-scenario state — holds the new tab's Page reference
let newInvoicePage: import('@playwright/test').Page | undefined;

Given('the user has accessed the Invoice Inquiry page', async ({ page }) => {
  const ii = new InvoiceInquiryPage(page);
  await ii.navigateToInvoiceInquiry();
});

When('the user clicks the New Invoice button', async ({ page }) => {
  const ii = new InvoiceInquiryPage(page);
  newInvoicePage = await ii.clickNewInvoice();
});

Then('the Invoice Creation page is opened in a new tab', async () => {
  expect(newInvoicePage, 'New Invoice page should have opened in a new tab').toBeDefined();
});

Then('the Invoice Creation page is displayed', async () => {
  if (!newInvoicePage) throw new Error('New Invoice page was not captured');
  const heading = newInvoicePage.locator(
    '[data-testid="page-title-invoice-creation"], h1'
  );
  await expect(heading).toBeVisible({ timeout: 15_000 });
});
