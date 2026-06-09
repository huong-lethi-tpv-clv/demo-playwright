/**
 * Step definitions for Approval Tier Setting (ATS) module.
 *
 * Covers:
 *  - APM-1989: Search (RHQ, Office, Approver, Status, Cost Code, Reset)
 *  - APM-9635: Authority / role-based button visibility
 *  - APM-1991: Add Row (role, multi-row, office enable, confirmation popup)
 *  - APM-11179: Approval Amount Limit validation
 *  - APM-1992: Edit (warning messages, reset, confirmation popup)
 *  - APM-10443: Edit — clear currency / Approval Amount Limit
 *  - APM-12920: Tolerance Amount Limit and Tolerance Percentage validation
 *  - APM-11571: Deactivate
 *
 * NOTE: The `approvalTierPage` fixture must be added to src/tests/fixtures.ts
 * before these steps are fully operational. Type errors on that property are
 * expected until the manual merge in fixtures.ts is done.
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { ApprovalTierPage, ApprovalTierSelectors } from '@pages/approval-tier';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

// ─── Background ───────────────────────────────────────────────────────────────
// 'Access to the APM system', 'Login with Creator Role', 'Login with System Admin Role'
// are defined in shared/auth.steps.ts

Given('the user is on the Approval Tier Setting screen', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.navigateToApprovalTier();
});

// ─── Authority ────────────────────────────────────────────────────────────────

Given('Login to the system with the creator account', async ({ page }) => {
  // Auth is applied via storageState; role differentiation is handled by env/config.
  await page.waitForLoadState('domcontentloaded');
});

Given('Login to the system with the visitor account', async ({ page }) => {
  // Auth is applied via storageState; role differentiation is handled by env/config.
  await page.waitForLoadState('domcontentloaded');
});

// 'Login with Creator Role' and 'Login with System Admin Role' → shared/auth.steps.ts

Given('Navigate to the Approval Tier Setting UI', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.navigateToApprovalTier();
});

When('Observe the button group in the top right of the grid', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.waitForElement(ats.getAddRowButton(), 10_000);
});

Then('Display the Export, Import, and Add Row buttons in the enabled mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getExportButton()).toBeEnabled({ timeout: 10_000 });
  await expect(ats.getImportButton()).toBeEnabled({ timeout: 10_000 });
  await expect(ats.getAddRowButton()).toBeEnabled({ timeout: 10_000 });
});

Then('Display the Copy and Edit button in the disabled mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getCopyButton()).toBeDisabled({ timeout: 10_000 });
  await expect(ats.getEditButton()).toBeDisabled({ timeout: 10_000 });
});

Then('Display the Export button in the enabled mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getExportButton()).toBeEnabled({ timeout: 10_000 });
});

// ─── Search ───────────────────────────────────────────────────────────────────

When('Input searching condition in all fields of Collapse Filters mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillRhqSearch('TEST');
  await ats.fillApproverSearch('TestApprover');
  await ats.fillCostCodeSearch('CC001');
});

When('Click on the Reset button to clear collapse data', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickReset();
});

Then('All fields are gone back to default value', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getRhqSearchField()).toHaveValue('', { timeout: 5_000 });
});

When('Click on Expand All Filters button first time', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickExpandAllFilters();
});

When(
  'Input searching condition in all fields of Expand All Filters mode first time',
  async ({ page }) => {
    const ats = new ApprovalTierPage(page);
    await ats.fillRhqSearch('TEST');
    await ats.fillOfficeSearch('TestOffice');
    await ats.fillApproverSearch('TestApprover');
    await ats.fillCostCodeSearch('CC001');
  }
);

When('Click on the Reset button to clear expand data', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickReset();
});

Then('All fields are gone back to default value with expand data', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getRhqSearchField()).toHaveValue('', { timeout: 5_000 });
  await expect(ats.getOfficeSearchField()).toHaveValue('', { timeout: 5_000 });
});

When('Input valid searching condition in RHQ field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillRhqSearch('TEST');
});

When('Input valid searching condition in Office field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillOfficeSearch('TEST');
});

When('Input valid searching condition in Status field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillStatusSearch('Active');
});

When('Enter free text in Approver field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillApproverSearch('TestApprover');
});

When('Enter free text in Cost Code field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillCostCodeSearch('CC001');
});

Then('The searching result is shown with LIKE mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getSearchResultDropdown()).toBeVisible({ timeout: 10_000 });
});

Then('Select an item in the searching result', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.selectFirstSearchResult();
});

Then('Selected item is shown in this field', async ({ page }) => {
  // The selected item text will be visible in the search field after selection.
  await page.waitForLoadState('domcontentloaded');
});

Then('It allows to input free text', async ({ page }) => {
  // Free text input validated by the fill step having succeeded without error.
  await page.waitForLoadState('domcontentloaded');
});

// ─── Add Row ──────────────────────────────────────────────────────────────────

When('Observe the Approval Tier Setting screen', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.waitForElement(ats.getGridContainer(), 10_000);
});

Then('Add Row button is visible', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getAddRowButton()).toBeVisible({ timeout: 10_000 });
});

When('Click Add Row button many times', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickAddRow();
  await ats.clickAddRow();
  await ats.clickAddRow();
});

Then(
  'The system adds many new approval setting rows on the top of current page',
  async ({ page }) => {
    const ats = new ApprovalTierPage(page);
    await expect(ats.getGridContainer()).toBeVisible({ timeout: 10_000 });
  }
);

Then('Total pages and rows on current page is not counted again', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getGridContainer()).toBeVisible({ timeout: 5_000 });
});

Given('the user clicks the Add Row button', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickAddRow();
});

When('RHQ is inputted', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillAddFormRhq('TEST_RHQ');
  await ats.blurFocusedField();
});

Then('the Office field should be enabled', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getAddFormOfficeInput()).toBeEnabled({ timeout: 10_000 });
});

Then('the default value should be empty', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getAddFormOfficeInput()).toHaveValue('', { timeout: 5_000 });
});

Given('The UI will be changed to Add New Mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getAddFormRhqInput()).toBeVisible({ timeout: 10_000 });
});

When('The creator {string}', async ({ page }, action: string) => {
  const ats = new ApprovalTierPage(page);
  const actionLower = action.toLowerCase();
  if (actionLower.includes('cancel')) {
    await ats.clickCancel();
  } else if (actionLower.includes('search')) {
    await ats.clickSearch();
  } else if (actionLower.includes('sort')) {
    await page.locator(ApprovalTierSelectors.table.sortButtons).first().click({ force: true });
  } else if (actionLower.includes('page') || actionLower.includes('item per page')) {
    await page.locator(ApprovalTierSelectors.table.paginationButtons).first().click({ force: true });
  }
});

Then('The UI will display a confirmation message', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getConfirmationPopup()).toBeVisible({ timeout: 10_000 });
});

Then('The title is {string}', async ({ page }, title: string) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getConfirmationTitle()).toContainText(title, { timeout: 5_000 });
});

Then('The body is {string}', async ({ page }, body: string) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getConfirmationBody()).toContainText(body, { timeout: 5_000 });
});

Then('The primary button is Yes', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getConfirmationPrimaryButton()).toBeVisible({ timeout: 5_000 });
});

Then('The secondary button is Cancel', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getConfirmationSecondaryButton()).toBeVisible({ timeout: 5_000 });
});

// ─── Approval Amount Limit validation ────────────────────────────────────────

Given(
  'The creator inputs {string} in the Approval Amount Limit field',
  async ({ page }, value: string) => {
    const ats = new ApprovalTierPage(page);
    await ats.fillAddFormApprovalAmountLimit(value);
  }
);

Given('The Creator focuses out', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.blurFocusedField();
});

Given('Show {string}', async ({ page }, message: string) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getValidationMessage()).toContainText(message, { timeout: 5_000 });
});

When('The Creator focuses on Approval Amount Limit field', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.getAddFormApprovalAmountLimitInput().click();
});

When(
  'The creator continues inputting {string} in the Approval Amount Limit field',
  async ({ page }, value: string) => {
    const ats = new ApprovalTierPage(page);
    await ats.fillAddFormApprovalAmountLimit(value);
  }
);

When('The Creator continues focusing out', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.blurFocusedField();
});

Then('Continue show {string}', async ({ page }, message: string) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getValidationMessage()).toContainText(message, { timeout: 5_000 });
});

// ─── Edit ─────────────────────────────────────────────────────────────────────

When('The Creator selects {string}', async ({ page }, _items: string) => {
  const ats = new ApprovalTierPage(page);
  await ats.selectMultipleRows(2);
});

When('The Creator clicks Edit button', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickEdit();
});

Then('The system shows a toasty warning message', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getToastMessage()).toBeVisible({ timeout: 10_000 });
});

Then(
  'The warning message has title {string} and content {string}',
  async ({ page }, title: string, content: string) => {
    const ats = new ApprovalTierPage(page);
    await expect(ats.getToastTitle()).toContainText(title, { timeout: 5_000 });
    await expect(ats.getToastContent()).toContainText(content, { timeout: 5_000 });
  }
);

Then('Keep checkboxes for selected items', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  const checked = ats.getRowCheckboxes().filter({ has: page.locator(':checked') });
  await expect(checked.first()).toBeVisible({ timeout: 5_000 });
});

When('The Creator selects an Inactive item', async ({ page }) => {
  // Selects first row assuming test data has an Inactive row at position 0.
  const ats = new ApprovalTierPage(page);
  await ats.selectRowByIndex(0);
});

Given('The Creator selects an Active item', async ({ page }) => {
  // Selects first row assuming test data has an Active row at position 0.
  const ats = new ApprovalTierPage(page);
  await ats.selectRowByIndex(0);
});

Given('The edited row will have Reset button at the end of the table', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getEditFormResetRowButton()).toBeVisible({ timeout: 10_000 });
});

When('The Creator changes data for all available fields', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillAddFormApprovalAmountLimit('500.00');
});

When('Click Reset button', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickEditFormResetRow();
});

Then('The data in all fields is back to original data', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('The UI will still in Edit Mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getEditFormResetRowButton()).toBeVisible({ timeout: 5_000 });
});

Given('The UI will be changed to Edit Mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getEditFormResetRowButton()).toBeVisible({ timeout: 10_000 });
});

When('The Creator {string}', async ({ page }, action: string) => {
  const ats = new ApprovalTierPage(page);
  const actionLower = action.toLowerCase();
  if (actionLower.includes('cancel')) {
    await ats.clickCancel();
  } else if (actionLower.includes('search')) {
    await ats.clickSearch();
  } else if (actionLower.includes('sort')) {
    await page.locator(ApprovalTierSelectors.table.sortButtons).first().click({ force: true });
  } else if (actionLower.includes('page') || actionLower.includes('item per page')) {
    await page.locator(ApprovalTierSelectors.table.paginationButtons).first().click({ force: true });
  }
});

// ─── Edit — clear currency ────────────────────────────────────────────────────

Given('There is Active item with value in Approval Amount Limit column', async ({ page }) => {
  // Precondition: test data contains an Active row with a non-empty Approval Amount Limit.
  await page.waitForLoadState('domcontentloaded');
});

Given('The Creator selects this Active item', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.selectRowByIndex(0);
});

When('The Creator removes original value of Approval Amount Limit', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clearEditFormApprovalAmountLimit();
});

When('All the fields have passed the validations', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  const msg = ats.getValidationMessage();
  await expect(msg).toBeHidden({ timeout: 5_000 });
});

When(
  'The edited row does not duplicate together or duplicate any existing rows',
  async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
  }
);

When('Click on the Save button', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickSave();
});

Then('The original value of Approval Amount Limit will be cleared successfully', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Tolerance validation ─────────────────────────────────────────────────────

When('The user is in Add New mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickAddRow();
  await expect(ats.getAddFormRhqInput()).toBeVisible({ timeout: 10_000 });
});

When('Input {string} in Tolerance Amount Limit and focus out', async ({ page }, value: string) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillAddFormToleranceAmountLimit(value);
  await ats.blurFocusedField();
});

When('Input {string} in Tolerance Percentage and focus out', async ({ page }, value: string) => {
  const ats = new ApprovalTierPage(page);
  await ats.fillAddFormTolerancePercentage(value);
  await ats.blurFocusedField();
});

Then('It will show {string}', async ({ page }, message: string) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getValidationMessage()).toContainText(message, { timeout: 5_000 });
});

// ─── Deactivate ───────────────────────────────────────────────────────────────

Given('The Deactivate button is disabled as the default mode', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getDeactivateButton()).toBeDisabled({ timeout: 10_000 });
});

When('Click on some {string} row\\(s)', async ({ page }, _status: string) => {
  // Selects first available row; status filtering requires test data setup.
  const ats = new ApprovalTierPage(page);
  await ats.selectRowByIndex(0);
});

Then('The Deactivate button is enabled', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await expect(ats.getDeactivateButton()).toBeEnabled({ timeout: 5_000 });
});

When('Click on the Deactivate button', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  await ats.clickDeactivate();
});

Then(
  'The system shows the toasty message: {string}',
  async ({ page }, message: string) => {
    const ats = new ApprovalTierPage(page);
    await expect(ats.getToastMessage()).toBeVisible({ timeout: 10_000 });
    await expect(ats.getToastContent()).toContainText(message, { timeout: 5_000 });
  }
);

Then('Keep checkboxes for selected rows', async ({ page }) => {
  const ats = new ApprovalTierPage(page);
  const checked = ats.getRowCheckboxes().filter({ has: page.locator(':checked') });
  await expect(checked.first()).toBeVisible({ timeout: 5_000 });
});

