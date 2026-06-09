/**
 * Step definitions for Invoice Creation — Upload Vendor Invoice scenarios.
 *
 * Covers:
 *  - APM-2064: Upload PDF successfully
 *  - APM-2260: Upload PNG successfully
 *  - APM-2261: Upload JPG successfully
 *  - APM-2061: Cancel upload
 */

import * as path from 'path';

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { InvoiceCreationPage, UploadInvoiceModal } from '@pages/invoice-creation';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

const FIXTURE_FILES_DIR = path.resolve(
  __dirname,
  '../../support/invoice-creation/fixtures/files'
);

const FILE_MAP: Record<string, string> = {
  PDF: path.join(FIXTURE_FILES_DIR, 'test-invoice.pdf'),
  PNG: path.join(FIXTURE_FILES_DIR, 'test-invoice.png'),
  JPG: path.join(FIXTURE_FILES_DIR, 'test-invoice.jpg'),
};

Given('the user is on the Invoice Creation screen', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.navigateToInvoiceCreation();
});

When('the user clicks the Show Vendor Inv. button', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.clickShowVendorInvoice();
});

When('the user clicks the Upload button in the Vendor Invoice area', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await ic.clickUploadButton();
});

When(
  'the user clicks the {string} link in the Upload Invoice popup',
  async ({ page }, _linkText: string) => {
    const modal = new UploadInvoiceModal(page);
    await modal.clickSelectFileLink();
  }
);

When(
  'the user selects a valid {string} file under 15MB',
  async ({ page }, fileType: string) => {
    const filePath = FILE_MAP[fileType.toUpperCase()];
    if (!filePath) throw new Error(`Unknown file type: ${fileType}`);
    const modal = new UploadInvoiceModal(page);
    await modal.selectFile(filePath);
  }
);

When('the user clicks the Upload button in the Upload Invoice popup', async ({ page }) => {
  const modal = new UploadInvoiceModal(page);
  await modal.clickUpload();
});

When(
  'the user clicks the Cancel button while the file is uploading',
  async ({ page }) => {
    const modal = new UploadInvoiceModal(page);
    await modal.clickCancel();
  }
);

Then('the Upload Invoice popup is closed', async ({ page }) => {
  const modal = new UploadInvoiceModal(page);
  await expect(modal.getContainer()).toBeHidden({ timeout: 15_000 });
});

Then(
  'the Vendor Invoice area is displayed with the correct UI layout',
  async ({ page }) => {
    const ic = new InvoiceCreationPage(page);
    await expect(ic.getVendorInvoiceContainer()).toBeVisible({ timeout: 10_000 });
  }
);

Then('the uploaded file is shown in the Vendor Invoice area', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getUploadedFileEntry()).toBeVisible({ timeout: 10_000 });
});

Then('the uploaded file is not shown in the Vendor Invoice area', async ({ page }) => {
  const ic = new InvoiceCreationPage(page);
  await expect(ic.getUploadedFileEntry()).toBeHidden({ timeout: 10_000 });
});
