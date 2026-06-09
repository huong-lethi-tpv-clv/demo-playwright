/**
 * Step definitions for Invoice Creation — Work Order Line Item and CNTR tests.
 *
 * Covers:
 *  - APM-3106: Collapse/expand the WO line item table
 *  - APM-3105: ALL checkbox behavior on line items
 *  - APM-26535: CNTR Select enabled when at least 1 line item is checked
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { InvoiceCreationPage } from '@pages/invoice-creation';
import { Logger } from '@support/shared';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

// ─── Background (CNTR test) ────────────────────────────────────────────────

Given(
  'the user is on the Invoice Creation screen with System Admin role',
  async ({ page }) => {
    // Auth already applied via storageState; navigate to creation screen
    const ic = new InvoiceCreationPage(page);
    await ic.navigateToInvoiceCreation();
  }
);

// ─── Shared step: open invoice by state ───────────────────────────────────

When(
  'the user opens an invoice in {string} state that has a Work Order',
  async ({ page }, state: string) => {
    // The URL / invoice ID must be provided via env or test data.
    // Here we navigate based on state using env vars as a placeholder.
    const invoiceUrl =
      state.toLowerCase() === 'detail'
        ? (process.env.APM_INVOICE_DETAIL_URL ?? '/invoice/detail')
        : (process.env.APM_INVOICE_CREATION_URL ?? '/invoice/creation');
    Logger.info(`Opening invoice in state "${state}" → ${invoiceUrl}`);
    const ic = new InvoiceCreationPage(page);
    await ic.openInvoiceByUrl(invoiceUrl);
  }
);

When('the user opens an Invoice Detail via direct link', async ({ page }) => {
  const invoiceUrl = process.env.APM_INVOICE_DETAIL_URL ?? '/invoice/detail';
  const ic = new InvoiceCreationPage(page);
  await ic.openInvoiceByUrl(invoiceUrl);
});

// ─── CNTR Select steps ────────────────────────────────────────────────────

When('the CNTR Select button is disabled by default', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getCntrSelectButton()).toBeDisabled({ timeout: 10_000 });
});

When('the user checks one line item', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.getLineItemCheckboxes().first().check();
});

Then('the CNTR Select button is enabled', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getCntrSelectButton()).toBeEnabled({ timeout: 5_000 });
});

// ─── Collapse/Expand steps ────────────────────────────────────────────────

Then(
  'the {string} button is displayed in front of the Work Order number',
  async ({ page }, _buttonLabel: string) => {
    const ic = new InvoiceCreationPage(page);
    await expect(ic.getExpandButton()).toBeVisible({ timeout: 10_000 });
  }
);

Then('the Line Item table is collapsed by default', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  expect(await ic.isLineItemTableVisible()).toBe(false);
});

When('the user clicks the {string} button', async ({ page }, buttonLabel: string) => {
  const ic = new InvoiceCreationPage(page);
  if (buttonLabel === '>') {
    await ic.clickExpandButton();
  } else if (buttonLabel === 'V') {
    await ic.clickCollapseButton();
  } else {
    throw new Error(`Unknown button label: "${buttonLabel}"`);
  }
});

Then(
  'the Line Item table is expanded and the {string} button is shown',
  async ({ page }, _buttonLabel: string) => {
    const ic = new InvoiceCreationPage(page);
    await expect(ic.getLineItemTable()).toBeVisible({ timeout: 10_000 });
    await expect(ic.getCollapseButton()).toBeVisible({ timeout: 5_000 });
  }
);

Then(
  'the Line Item table is collapsed and the {string} button is shown',
  async ({ page }, _buttonLabel: string) => {
    const ic = new InvoiceCreationPage(page);
    await expect(ic.getLineItemTable()).toBeHidden({ timeout: 10_000 });
    await expect(ic.getExpandButton()).toBeVisible({ timeout: 5_000 });
  }
);

// ─── Checkbox steps ───────────────────────────────────────────────────────

When('the user ticks the ALL checkbox in the first column', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.tickAllCheckbox();
});

Then('all Line Item checkboxes are ticked', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  expect(await ic.areAllLineItemCheckboxesChecked()).toBe(true);
});

When('the user un-ticks the ALL checkbox', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.untickAllCheckbox();
});

Then('all Line Item checkboxes are un-ticked', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  expect(await ic.areAllLineItemCheckboxesUnchecked()).toBe(true);
});

When('the user ticks all individual Line Item checkboxes', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.tickAllIndividualCheckboxes();
});

Then('the ALL checkbox is ticked', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  expect(await ic.isAllCheckboxChecked()).toBe(true);
});

When('the user un-ticks one Line Item checkbox', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.untickFirstLineItemCheckbox();
});

Then('the ALL checkbox is un-ticked', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  expect(await ic.isAllCheckboxChecked()).toBe(false);
});
