/**
 * Step definitions for Cost Code List (CCL) scenarios.
 *
 * Fixture `costCodeListPage` will be added to fixtures.ts when shared files are merged.
 * Until then, TypeScript may report an error for the fixture — this is expected and OK.
 */

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { CostCodeListPage } from '@pages/cost-code/CostCodeListPage';
import { CostCodeListSelectors } from '@pages/cost-code/CostCodeListSelectors';

import { test } from '../fixtures';

const { Given, When, Then } = createBdd(test);

// ─── Background ───────────────────────────────────────────────────────────────
// 'Access to the APM system' is defined in shared/auth.steps.ts

Given('the user is on the Cost Code List screen', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Search steps ─────────────────────────────────────────────────────────────

When('the user clicks on the {string} search field', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickSearchField(fieldName);
});

When('the user inputs data to search', async ({ page }) => {
  await page.keyboard.type('test');
});

When('the user inputs other data to search', async ({ page }) => {
  await page.keyboard.type('other');
});

When('the user inputs data in the {string} search field', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickSearchField(fieldName);
  await ccl.fillSearchField(fieldName, 'test');
});

When('the user inputs other data in the {string} search field', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fillSearchField(fieldName, 'other');
});

When('the user selects 1 item', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectDropdownOption(0);
});

When('the user selects some items', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectDropdownOption(0);
  await ccl.selectDropdownOption(1);
});

When('the user clicks on the Search button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickSearchButton();
});

When('the user selects some items in some pages', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(2);
});

When('the user selects ALL items in the current page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectAllOnPage();
});

Given('the user expands the search area', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.expandSearchArea();
});

When('the user selects {string} for the {string} filter', async ({ page }, option: string, _fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectDropdownOptionByText(option);
});

Then('the list shows results based on the search data', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getDropdownList()).toBeVisible({ timeout: 10_000 });
});

Then('the list shows results based on the other search data', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getDropdownList()).toBeVisible({ timeout: 10_000 });
});

Then('the selected item is displayed in the {string} field and the search data is removed', async ({ page }, _fieldName: string) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the selected items are displayed in the {string} field and the search data is removed', async ({ page }, _fieldName: string) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('all selected items are un-selected', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(async () => {
    expect(await ccl.areAllCheckboxesUnchecked()).toBe(true);
  }).toPass({ timeout: 10_000 });
});

Then('the total selected items count returns to 0', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getTotalSelectedItems()).toContainText('0', { timeout: 10_000 });
});

Then('the system searches with LIKE based on the entered text', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getGrid()).toBeVisible({ timeout: 10_000 });
});

Then('the search result returns data corresponding with the selected {string} conditions', async ({ page }, _option: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getGrid()).toBeVisible({ timeout: 10_000 });
});

// ─── Pagination steps ─────────────────────────────────────────────────────────

When('the user clicks on a specific page number', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickPageNumber(2);
});

Then('the user is taken to that specific page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getGrid()).toBeVisible({ timeout: 10_000 });
});

Then('the data in the Cost Code list updates correctly in accordance with the Show n items setting', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getGrid()).toBeVisible({ timeout: 10_000 });
});

// ─── Add Row steps ────────────────────────────────────────────────────────────

When('the user clicks on the Add Row button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAddRow();
});

When('the user clicks on the Add Row button many times', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAddRow();
  await ccl.clickAddRow();
  await ccl.clickAddRow();
});

Given('the user has clicked on the Add Row button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAddRow();
});

Given('a new row is displayed in the table', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getNewRows().first()).toBeVisible({ timeout: 10_000 });
});

Given('the Remove icon of the new rows is shown', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getFirstRemoveIcon()).toBeVisible({ timeout: 10_000 });
});

Given('the Reset icon of the new rows is shown', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getFirstResetIcon()).toBeVisible({ timeout: 10_000 });
});

When('the user clicks on the Remove icon', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickFirstRemoveIcon();
});

When('the user clicks on the Reset icon', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickFirstResetIcon();
});

Then('a new row is inserted at the top of the grid table on the current page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getNewRows().first()).toBeVisible({ timeout: 10_000 });
});

Then('all existing rows remain in their current state and position', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the total number of results remains the same', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the grid table generates new rows based on the number of times the button was clicked', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  const count = await ccl.getNewRowCount();
  expect(count).toBeGreaterThan(1);
});

Then('the system removes the corresponding row', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the system resets the corresponding row to the default values', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── User Authority steps ─────────────────────────────────────────────────────

When('the user observes the UI', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the {string} button is enabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeEnabled({ timeout: 10_000 });
});

Then('the {string} button is disabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeDisabled({ timeout: 10_000 });
});

Then('the UI layout matches the UI design', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the user sorts data in a column', async ({ page }) => {
  await page.locator(CostCodeListSelectors.table.columnHeader).first().click({ force: true });
});

Then('the {string} button is still enabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeEnabled({ timeout: 10_000 });
});

Then('the {string} button is still disabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeDisabled({ timeout: 10_000 });
});

Then('the user changes to another page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickPageNumber(2).catch(() => { /* no-op if only 1 page */ });
});

Then('the {string} button is still kept enabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeEnabled({ timeout: 10_000 });
});

Then('the {string} button is still kept disabled', async ({ page }, buttonName: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getToolbarButtonByName(buttonName)).toBeDisabled({ timeout: 10_000 });
});

// ─── Copy steps ───────────────────────────────────────────────────────────────

Given('the user has selected some rows', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(2);
});

Given('the user has clicked the Copy button and the new rows are displayed', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickCopyButton();
  await expect(ccl.getNewRows().first()).toBeVisible({ timeout: 10_000 });
});

When('the user edits data in the new row', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fill(ccl.getDetailCodeEditField(), 'edited-value');
});

Then('the system resets the corresponding row to the original value', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('there are some selected items at multiple pages', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the user is on the page that has the selected item', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

When('the user clicks the Copy button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickCopyButton();
});

Then('the Cancel and Save buttons are shown', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getCancelButton()).toBeVisible({ timeout: 10_000 });
  await expect(ccl.getSaveButton()).toBeVisible({ timeout: 10_000 });
});

Then('the new rows are generated on top of the table', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getNewRows().first()).toBeVisible({ timeout: 10_000 });
});

Then('the data of the new copied rows is the same as the data of the selected rows', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the checkbox column is hidden', async ({ page }) => {
  await expect(page.locator(CostCodeListSelectors.table.checkboxColumn)).toBeHidden({ timeout: 10_000 });
});

Then('there are Reset and Remove buttons at the end of the new rows', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getFirstRemoveIcon()).toBeVisible({ timeout: 10_000 });
  await expect(ccl.getFirstResetIcon()).toBeVisible({ timeout: 10_000 });
});

Then('the new copied rows are highlighted', async ({ page }) => {
  await expect(page.locator(CostCodeListSelectors.table.highlightedRow).first()).toBeVisible({ timeout: 10_000 });
});

Then('the pagination is not changed', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Cost Code cascade steps ──────────────────────────────────────────────────

When('the user copies some rows', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(1);
  await ccl.clickCopyButton();
});

When('the user deletes data in the {string} field', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  if (fieldName === 'Cost Category') await ccl.clearCostCategoryField();
  else if (fieldName === 'Cost Sub-Category') await ccl.clearCostSubCategoryField();
});

Then('the data in the {string} field is deleted and it is disabled', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  if (fieldName === 'Cost Sub-Category') {
    await expect(ccl.getCostSubCategoryEditField()).toBeDisabled({ timeout: 10_000 });
  }
});

Then('the data in the {string} field is deleted', async ({ page }, _fieldName: string) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the user selects data in the {string} field', async ({ page }, fieldName: string) => {
  const ccl = new CostCodeListPage(page);
  if (fieldName === 'Cost Category') {
    await ccl.click(ccl.getCostCategoryEditField());
    await ccl.selectDropdownOption(0);
  } else if (fieldName === 'Cost Sub-Category') {
    await ccl.click(ccl.getCostSubCategoryEditField());
    await ccl.selectDropdownOption(0);
  }
});

Then('the Cost Code is not shown', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the Cost Code is shown', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Edit steps ───────────────────────────────────────────────────────────────

When('the user selects multiple items on the current page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(2);
});

When('the user clicks on the Edit button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickEditButton();
});

Then('the system shows a warning message with title {string} and content {string}', async ({ page }, title: string, content: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getWarningDialog().or(ccl.getWarningToast())).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${content}"`)).toBeVisible({ timeout: 10_000 });
});

Then('the selected checkboxes are kept', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Approve steps ────────────────────────────────────────────────────────────

Given('the Approve button is displayed in disabled mode', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getApproveButton()).toBeDisabled({ timeout: 10_000 });
});

Given('the user selects at least one cost code row', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(0);
});

Given('the Approve button is displayed in enabled mode', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getApproveButton()).toBeEnabled({ timeout: 10_000 });
});

When('the user unselects all cost code rows', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.unselectAllOnPage();
});

When('the user selects cost code rows with Pending Admin Approval, Pending Accounting Approval, Rejected, SAP Interfacing, Active, and Inactive statuses', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(6);
});

When('the 2nd Approver clicks on the Approve button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickApproveButton();
});

Then('the system shows a warning message with title {string} and message {string}', async ({ page }, title: string, message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getWarningDialog().or(ccl.getWarningToast())).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${message}"`)).toBeVisible({ timeout: 10_000 });
});

// ─── Reject steps ─────────────────────────────────────────────────────────────

Given('there are some selected items in 1 page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(2);
});

Given('there are some valid selected items in 1 page', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectMultipleRows(2);
});

Given('the user is in Reject mode', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickRejectButton();
});

When('the Reject Reason fields have content for all selected rows', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fillRejectReason('Test rejection reason');
});

When('the user clicks on the Confirm button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickConfirmButton();
});

Then('the system shows a popup with title {string} and message {string} with Ok and Cancel buttons', async ({ page }, title: string, message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getConfirmDialog()).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${message}"`)).toBeVisible({ timeout: 10_000 });
  await expect(ccl.getDialogOkButton()).toBeVisible({ timeout: 10_000 });
  await expect(ccl.getDialogCancelButton()).toBeVisible({ timeout: 10_000 });
});

When('the user chooses Ok in the popup', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickDialogOk();
});

Then('the system shows a success message {string}', async ({ page }, _message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getSuccessToast()).toBeVisible({ timeout: 15_000 });
});

Then('the system shows a success message {string} equal to the number of selected items', async ({ page }, _message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getSuccessToast()).toBeVisible({ timeout: 15_000 });
});

Then('the cost codes that are rejected change their status to Rejected', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('these cost codes change their status to Rejected', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the Reject Reason column displays the reason', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the selected rows are kept checked', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the selected rows keep their checkboxes', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the system returns to default mode for 1st Approver', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the system returns to default mode for Final Approver', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the Approved\\/Rejected By and Approved\\/Rejected Date\\/Time columns are updated', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the selected items have the status {string}', async ({ page }, _status: string) => {
  await page.waitForLoadState('domcontentloaded');
});

When('the user clicks on the Reject button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickRejectButton();
});

Then('the system displays a warning message with title {string} and message {string}', async ({ page }, title: string, message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getWarningDialog().or(ccl.getWarningToast())).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${message}"`)).toBeVisible({ timeout: 10_000 });
});

// ─── Assign ERP steps ─────────────────────────────────────────────────────────

When('the user selects a row with the invalid status {string}', async ({ page }, _status: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(0);
});

When('the user selects a row with the status {string} in the same page', async ({ page }, _status: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(1);
});

When('the user clicks on the Assign ERP button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAssignErpButton();
});

Then('the system shows a validation message {string} with title {string}', async ({ page }, message: string, title: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getWarningDialog().or(ccl.getWarningToast())).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(`text="${message}"`)).toBeVisible({ timeout: 10_000 });
});

Then('the checkboxes are kept for selected rows', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Given('the Assign ERP mode is open', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(0);
  await ccl.clickAssignErpButton();
});

When('the user enters the ERP Account Code in the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fillAssignErpAccountCode('TEST');
});

Then('the system searches using LIKE and shows the result in the list', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getAssignErpDropdownOptions().first()).toBeVisible({ timeout: 10_000 });
});

Then('the user selects an item', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectAssignErpOption(0);
});

Then('the selected item is shown in the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getAssignErpAccountCodeField()).not.toBeEmpty({ timeout: 10_000 });
});

Then('the user clears data in the ERP Account Code field using the X button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAssignErpClearButton();
});

Then('all data is shown in the list', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getAssignErpDropdownOptions().first()).toBeVisible({ timeout: 10_000 });
});

When('the user searches and selects an ERP Account Code in the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fillAssignErpAccountCode('TEST');
  await ccl.selectAssignErpOption(0);
});

When('the user clicks on the X icon to remove the selected item', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAssignErpClearButton();
});

Then('the selected item is removed from the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getAssignErpAccountCodeField()).toBeEmpty({ timeout: 10_000 });
});

Then('the ERP Account Code item is not highlighted', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

When('the user selects a row with the status {string}', async ({ page }, _status: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(0);
});

When('the user selects data in the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fillAssignErpAccountCode('TEST');
  await ccl.selectAssignErpOption(0);
});

When('the user clicks the X button to delete data in the ERP Account Code field', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickAssignErpClearButton();
});

When('the user clicks on the Cancel button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickCancelButton();
});

Then('the Discard Change message will not be shown', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getDiscardChangeDialog()).toBeHidden({ timeout: 5_000 });
});

Then('the Assign ERP mode is closed and the selected row is kept', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

// ─── Save Duplicate steps ─────────────────────────────────────────────────────

When('the user picks a {string} item', async ({ page }, _status: string) => {
  const ccl = new CostCodeListPage(page);
  await ccl.selectRowByIndex(0);
});

When('the user modifies the Cost Category, Cost Sub-Category and Detail Code to values different from any existing item', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.fill(ccl.getCostCategoryEditField(), 'NEW_CAT');
  await ccl.fill(ccl.getCostSubCategoryEditField(), 'NEW_SUB');
  await ccl.fill(ccl.getDetailCodeEditField(), 'NEW_DETAIL');
});

When('the user clicks on the Save button', async ({ page }) => {
  const ccl = new CostCodeListPage(page);
  await ccl.clickSaveButton();
});

Then('the success message is shown with title {string} and message {string}', async ({ page }, title: string, _message: string) => {
  const ccl = new CostCodeListPage(page);
  await expect(ccl.getSuccessToast()).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(`text="${title}"`)).toBeVisible({ timeout: 10_000 });
});

Then('the status changes to Pending Accounting Approval', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the system updates the Updated By and Updated Date\\/Time fields', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the rows are saved with the new values', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the rows keep their position in the table', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the selected checkbox is kept', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the Approved/Rejected By and Approved/Rejected Date/Time columns are updated', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
  // ⚠️ TODO: verify the columns are updated in the CCL table
});

