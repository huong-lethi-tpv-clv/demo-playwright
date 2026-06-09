import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { CostCodeListSelectors } from './CostCodeListSelectors';

/**
 * CostCodeListPage — main list screen for APM Cost Code List.
 *
 * Responsibilities:
 *  - Navigate to the Cost Code List screen
 *  - Search / filter cost codes (dropdowns, text fields, expand search area)
 *  - Toolbar actions: Add Row, Import, Export, Edit, Copy, Save, Cancel,
 *    Approve, Reject, Assign ERP, Confirm
 *  - Row actions: Remove, Reset
 *  - Edit inline fields: Cost Category, Cost Sub-Category, Detail Code, Reject Reason
 *  - Assign ERP panel interactions
 *  - Pagination navigation
 *  - Dialog handling (confirm, warning, discard-change)
 *
 * All selectors live in CostCodeListSelectors.ts.
 */
export class CostCodeListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToCostCodeList(): Promise<void> {
    await this.navigate(CostCodeListSelectors.navigation.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Search Area ──────────────────────────────────────────────────────────

  getSearchFieldByName(fieldName: string): Locator {
    const map: Record<string, string> = {
      'ERP Account Code': CostCodeListSelectors.searchArea.erpAccountCodeField,
      Status: CostCodeListSelectors.searchArea.statusField,
      'Cost Sub-Category': CostCodeListSelectors.searchArea.costSubCategoryField,
      'Activity Date': CostCodeListSelectors.searchArea.activityDateField,
      Module: CostCodeListSelectors.searchArea.moduleField,
      'Legacy Auto Cost Code': CostCodeListSelectors.searchArea.legacyAutoCostCodeField,
      'Legacy Accrual Flag': CostCodeListSelectors.searchArea.legacyAccrualFlagField,
      'Cost Code': CostCodeListSelectors.searchArea.costCodeField,
      'Cost Code Description': CostCodeListSelectors.searchArea.costCodeDescriptionField,
      'SVVD Required?': CostCodeListSelectors.searchArea.svvdRequiredField,
    };
    const selector = map[fieldName];
    if (!selector) throw new Error(`Unknown search field: "${fieldName}"`);
    return this.page.locator(selector).first();
  }

  getExpandSearchButton(): Locator {
    return this.page.locator(CostCodeListSelectors.searchArea.expandButton).first();
  }

  getSearchButton(): Locator {
    return this.page.locator(CostCodeListSelectors.searchArea.searchButton).first();
  }

  getDropdownList(): Locator {
    return this.page.locator(CostCodeListSelectors.searchArea.dropdownList);
  }

  getDropdownOptions(): Locator {
    return this.page.locator(CostCodeListSelectors.searchArea.dropdownOption);
  }

  async expandSearchArea(): Promise<void> {
    await this.click(this.getExpandSearchButton());
  }

  async clickSearchField(fieldName: string): Promise<void> {
    await this.click(this.getSearchFieldByName(fieldName));
  }

  async fillSearchField(fieldName: string, text: string): Promise<void> {
    await this.fill(this.getSearchFieldByName(fieldName), text);
  }

  async clickSearchButton(): Promise<void> {
    await this.click(this.getSearchButton());
  }

  async selectDropdownOption(index: number = 0): Promise<void> {
    await this.click(this.getDropdownOptions().nth(index));
  }

  async selectDropdownOptionByText(text: string): Promise<void> {
    await this.click(
      this.page.locator(CostCodeListSelectors.searchArea.dropdownOption).filter({ hasText: text }).first()
    );
  }

  // ─── Toolbar Buttons ──────────────────────────────────────────────────────

  getAddRowButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.addRowButton).first();
  }

  getImportButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.importButton).first();
  }

  getExportButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.exportButton).first();
  }

  getEditButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.editButton).first();
  }

  getCopyButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.copyButton).first();
  }

  getDeactivateButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.deactivateButton).first();
  }

  getReactivateButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.reactivateButton).first();
  }

  getSaveButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.saveButton).first();
  }

  getCancelButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.cancelButton).first();
  }

  getApproveButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.approveButton).first();
  }

  getRejectButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.rejectButton).first();
  }

  getAssignErpButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.assignErpButton).first();
  }

  getConfirmButton(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.confirmButton).first();
  }

  getTotalSelectedItems(): Locator {
    return this.page.locator(CostCodeListSelectors.toolbar.totalSelectedItems);
  }

  getToolbarButtonByName(name: string): Locator {
    const map: Record<string, Locator> = {
      'Add Row': this.getAddRowButton(),
      Import: this.getImportButton(),
      Export: this.getExportButton(),
      Edit: this.getEditButton(),
      Copy: this.getCopyButton(),
      Deactivate: this.getDeactivateButton(),
      Reactivate: this.getReactivateButton(),
      Save: this.getSaveButton(),
      Cancel: this.getCancelButton(),
      Approve: this.getApproveButton(),
      Reject: this.getRejectButton(),
      'Assign ERP': this.getAssignErpButton(),
      Confirm: this.getConfirmButton(),
    };
    const locator = map[name];
    if (!locator) throw new Error(`Unknown toolbar button: "${name}"`);
    return locator;
  }

  async clickAddRow(): Promise<void> {
    await this.click(this.getAddRowButton());
  }

  async clickEditButton(): Promise<void> {
    await this.click(this.getEditButton());
  }

  async clickCopyButton(): Promise<void> {
    await this.click(this.getCopyButton());
  }

  async clickSaveButton(): Promise<void> {
    await this.click(this.getSaveButton());
  }

  async clickCancelButton(): Promise<void> {
    await this.click(this.getCancelButton());
  }

  async clickApproveButton(): Promise<void> {
    await this.click(this.getApproveButton());
  }

  async clickRejectButton(): Promise<void> {
    await this.click(this.getRejectButton());
  }

  async clickAssignErpButton(): Promise<void> {
    await this.click(this.getAssignErpButton());
  }

  async clickConfirmButton(): Promise<void> {
    await this.click(this.getConfirmButton());
  }

  async isButtonEnabled(buttonName: string): Promise<boolean> {
    return this.getToolbarButtonByName(buttonName).isEnabled();
  }

  async isButtonDisabled(buttonName: string): Promise<boolean> {
    return this.getToolbarButtonByName(buttonName).isDisabled();
  }

  // ─── Table / Rows ─────────────────────────────────────────────────────────

  getGrid(): Locator {
    return this.page.locator(CostCodeListSelectors.table.grid);
  }

  getRows(): Locator {
    return this.page.locator(CostCodeListSelectors.table.rows);
  }

  getRowCheckboxes(): Locator {
    return this.page.locator(CostCodeListSelectors.table.rowCheckboxes);
  }

  getSelectAllCheckbox(): Locator {
    return this.page.locator(CostCodeListSelectors.table.selectAllCheckbox);
  }

  getNewRows(): Locator {
    return this.page.locator(CostCodeListSelectors.table.newRow);
  }

  getHighlightedRows(): Locator {
    return this.page.locator(CostCodeListSelectors.table.highlightedRow);
  }

  getColumnHeaders(): Locator {
    return this.page.locator(CostCodeListSelectors.table.columnHeader);
  }

  getCheckboxColumn(): Locator {
    return this.page.locator(CostCodeListSelectors.table.checkboxColumn);
  }

  async getRowCount(): Promise<number> {
    return this.getRows().count();
  }

  async getNewRowCount(): Promise<number> {
    return this.getNewRows().count();
  }

  async selectRowByIndex(index: number): Promise<void> {
    await this.getRowCheckboxes().nth(index).click();
  }

  async unselectRowByIndex(index: number): Promise<void> {
    await this.getRowCheckboxes().nth(index).click();
  }

  async selectMultipleRows(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.selectRowByIndex(i);
    }
  }

  async selectAllOnPage(): Promise<void> {
    await this.getSelectAllCheckbox().click();
  }

  async unselectAllOnPage(): Promise<void> {
    await this.getSelectAllCheckbox().click();
  }

  async areAllCheckboxesUnchecked(): Promise<boolean> {
    const checkboxes = this.getRowCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      if (await checkboxes.nth(i).isChecked()) return false;
    }
    return true;
  }

  // ─── Row Actions ──────────────────────────────────────────────────────────

  getRemoveIconForRow(rowIndex: number): Locator {
    return this.getRows().nth(rowIndex).locator(CostCodeListSelectors.rowActions.removeIcon).first();
  }

  getResetIconForRow(rowIndex: number): Locator {
    return this.getRows().nth(rowIndex).locator(CostCodeListSelectors.rowActions.resetIcon).first();
  }

  getFirstRemoveIcon(): Locator {
    return this.page.locator(CostCodeListSelectors.rowActions.removeIcon).first();
  }

  getFirstResetIcon(): Locator {
    return this.page.locator(CostCodeListSelectors.rowActions.resetIcon).first();
  }

  async clickFirstRemoveIcon(): Promise<void> {
    await this.click(this.getFirstRemoveIcon());
  }

  async clickFirstResetIcon(): Promise<void> {
    await this.click(this.getFirstResetIcon());
  }

  // ─── Edit Inline Fields ───────────────────────────────────────────────────

  getCostCategoryEditField(): Locator {
    return this.page.locator(CostCodeListSelectors.editFields.costCategoryField).first();
  }

  getCostSubCategoryEditField(): Locator {
    return this.page.locator(CostCodeListSelectors.editFields.costSubCategoryField).first();
  }

  getDetailCodeEditField(): Locator {
    return this.page.locator(CostCodeListSelectors.editFields.detailCodeField).first();
  }

  getRejectReasonField(): Locator {
    return this.page.locator(CostCodeListSelectors.editFields.rejectReasonField).first();
  }

  async fillRejectReason(reason: string): Promise<void> {
    await this.fill(this.getRejectReasonField(), reason);
  }

  async clearCostCategoryField(): Promise<void> {
    await this.getCostCategoryEditField().clear();
  }

  async clearCostSubCategoryField(): Promise<void> {
    await this.getCostSubCategoryEditField().clear();
  }

  // ─── Assign ERP Panel ─────────────────────────────────────────────────────

  getAssignErpAccountCodeField(): Locator {
    return this.page.locator(CostCodeListSelectors.assignErpPanel.erpAccountCodeField).first();
  }

  getAssignErpClearButton(): Locator {
    return this.page.locator(CostCodeListSelectors.assignErpPanel.clearButton).first();
  }

  getAssignErpDropdownOptions(): Locator {
    return this.page.locator(CostCodeListSelectors.assignErpPanel.dropdownOption);
  }

  async fillAssignErpAccountCode(text: string): Promise<void> {
    await this.fill(this.getAssignErpAccountCodeField(), text);
  }

  async clickAssignErpClearButton(): Promise<void> {
    await this.click(this.getAssignErpClearButton());
  }

  async selectAssignErpOption(index: number = 0): Promise<void> {
    await this.click(this.getAssignErpDropdownOptions().nth(index));
  }

  // ─── Pagination ───────────────────────────────────────────────────────────

  getPageNumbers(): Locator {
    return this.page.locator(CostCodeListSelectors.pagination.pageNumbers);
  }

  async clickPageNumber(pageNum: number): Promise<void> {
    await this.click(
      this.page
        .locator(CostCodeListSelectors.pagination.pageNumbers)
        .filter({ hasText: String(pageNum) })
        .first()
    );
  }

  async clickNextPage(): Promise<void> {
    await this.click(this.page.locator(CostCodeListSelectors.pagination.pageNumbers).filter({ hasText: '>' }).first());
  }

  // ─── Dialogs ──────────────────────────────────────────────────────────────

  getWarningDialog(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.warningDialog);
  }

  getConfirmDialog(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.confirmDialog);
  }

  getDialogTitle(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.dialogTitle).first();
  }

  getDialogMessage(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.dialogMessage).first();
  }

  getDialogOkButton(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.dialogOkButton).first();
  }

  getDialogCancelButton(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.dialogCancelButton).first();
  }

  getDiscardChangeDialog(): Locator {
    return this.page.locator(CostCodeListSelectors.dialogs.discardChangeDialog);
  }

  async clickDialogOk(): Promise<void> {
    await this.click(this.getDialogOkButton());
  }

  async clickDialogCancel(): Promise<void> {
    await this.click(this.getDialogCancelButton());
  }

  async isDialogVisible(): Promise<boolean> {
    return this.getWarningDialog()
      .isVisible()
      .catch(() => this.getConfirmDialog().isVisible());
  }

  async isDiscardChangeDialogVisible(): Promise<boolean> {
    return this.getDiscardChangeDialog().isVisible();
  }

  // ─── Messages / Toasts ────────────────────────────────────────────────────

  getSuccessToast(): Locator {
    return this.page.locator(CostCodeListSelectors.messages.successToast);
  }

  getWarningToast(): Locator {
    return this.page.locator(CostCodeListSelectors.messages.warningToast);
  }

  async isSuccessToastVisible(): Promise<boolean> {
    return this.getSuccessToast().isVisible();
  }

  async isWarningToastVisible(): Promise<boolean> {
    return this.getWarningToast().isVisible();
  }
}
