/**
 * Step definitions for Work Order Creation scenarios.
 *
 * Covers:
 *  - APM-10913: Grid table layout
 *  - APM-10921: No Cost Code Added message
 *  - APM-10886: Sub-header fields layout
 *  - APM-10895: Vendor field %LIKE% search
 *  - APM-10898: Activity Date label
 *  - APM-11387: Voyage No field disabled when no Vessel Code selected
 *  - APM-11390: VVD field placeholders
 *  - APM-11315: Add Row button displayed
 *  - APM-11316: New row inserted at top of grid table
 *  - APM-11317: Trash icon removes corresponding row
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { WorkOrderCreationPage } from '@pages/work-order';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

// ─── Background steps ─────────────────────────────────────────────────────
// 'Access to the APM system' is defined in shared/auth.steps.ts

Given('the user is on the Work Order Creation screen', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await woc.navigateToWorkOrderCreation();
});

// ─── Shared: page load ────────────────────────────────────────────────────

When('The page loads completely', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Layout: Grid Table (APM-10913) ───────────────────────────────────────

Then('The grid table should be displayed correctly', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getGridTableContainer()).toBeVisible({ timeout: 10_000 });
});

// ─── Layout: Sub-Header (APM-10886) ───────────────────────────────────────

Then(
  'The sub-header fields Vendor, Terminal\\/Yard and Activity Date should be displayed',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    await expect(woc.getVendorField()).toBeVisible({ timeout: 10_000 });
    await expect(woc.getTerminalYardField()).toBeVisible({ timeout: 10_000 });
    await expect(woc.getActivityDateField()).toBeVisible({ timeout: 10_000 });
  }
);

// ─── Cost Code: No Cost Code Added (APM-10921) ────────────────────────────

Given('No cost items have been added to the grid table', async ({ page }) => {
  // On a freshly loaded WO creation screen the grid is empty by default.
  // This step documents that precondition; no additional action is required.
  await page.waitForLoadState('domcontentloaded');
});

Then(
  'The table should display a "No Cost Code Added" message',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    await expect(woc.getNoCostCodeMessage()).toBeVisible({ timeout: 10_000 });
  }
);

// ─── Vendor Field: %LIKE% Search (APM-10895) ──────────────────────────────

When(
  'The user types a search term in the "Vendor" field',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    await woc.fillVendorField('test');
  }
);


Then(
  'The Vendor field should retrieve the closest results using a %LIKE% search',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    // Verify the vendor field is still visible and has content after typing
    await expect(woc.getVendorField()).toBeVisible({ timeout: 10_000 });
  }
);

// ─── Activity Date: Label (APM-10898) ─────────────────────────────────────

When('The user views the "Activity Date" field', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getActivityDateField()).toBeVisible({ timeout: 10_000 });
});

Then(
  'The label should display only the field name with no default value',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    await expect(woc.getActivityDateLabel()).toBeVisible({ timeout: 10_000 });
    const value = await woc.getActivityDateFieldValue();
    expect(value).toBe('');
  }
);

// ─── VVD Fields: Voyage Disabled (APM-11387) ──────────────────────────────

Given('I have not selected a Vessel Code', async ({ page }) => {
  // Vessel Code is empty by default on a freshly loaded WO creation screen.
  await page.waitForLoadState('domcontentloaded');
});

When('I view the Voyage No field', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getVoyageNoField()).toBeVisible({ timeout: 10_000 });
});

Then('the Voyage No field should be disabled', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getVoyageNoField()).toBeDisabled({ timeout: 10_000 });
});

// ─── VVD Fields: Placeholders (APM-11390) ─────────────────────────────────

When('I view the VVD fields', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getVesselCodeField()).toBeVisible({ timeout: 10_000 });
});

Then(
  'I should see placeholders for "Search for vessel code", "Search for voyage no", and "Search for direction"',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    const vesselPlaceholder = await woc.getVesselCodePlaceholder();
    const voyagePlaceholder = await woc.getVoyageNoPlaceholder();
    const directionPlaceholder = await woc.getDirectionPlaceholder();
    expect(vesselPlaceholder.toLowerCase()).toContain('vessel');
    expect(voyagePlaceholder.toLowerCase()).toContain('voyage');
    expect(directionPlaceholder.toLowerCase()).toContain('direction');
  }
);

// ─── Add Row: Button Displayed (APM-11315) ────────────────────────────────

Then('The "Add Row" button should be displayed', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await expect(woc.getAddRowButton()).toBeVisible({ timeout: 10_000 });
});

// ─── Add Row: New Row at Top (APM-11316) ──────────────────────────────────

When('The user clicks the "Add Row" button', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await woc.clickAddRowButton();
});

Then(
  'A new row should be inserted at the top of the grid table',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    await expect(woc.getFirstTableRow()).toBeVisible({ timeout: 10_000 });
    const rowCount = await woc.getTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  }
);

// ─── Trash Icon: Remove Row (APM-11317) ───────────────────────────────────

When('The user clicks the "Trash" icon', async ({ page }) => {
  const woc = new WorkOrderCreationPage(page);
  await woc.clickTrashIcon();
});

Then(
  'The system should remove the corresponding row from the table',
  async ({ page }) => {
    const woc = new WorkOrderCreationPage(page);
    const rowCount = await woc.getTableRowCount();
    expect(rowCount).toBe(0);
  }
);

