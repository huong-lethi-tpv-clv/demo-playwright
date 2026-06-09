import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { VendorCostDescriptionSelectors } from './VendorCostDescriptionSelectors';

/**
 * VendorCostDescriptionPage — main screen for APM Vendor Cost Description Mapping.
 *
 * Responsibilities:
 *  - Navigate to the VCDM screen
 *  - Search/filter vendor costs (RHQ, Yard, Vendor, Status, CHORUS Cost Code, ERP Account Code,
 *    Vendor Cost Description, Approver/Rejecter fields; expand/collapse search panel)
 *  - Checkbox interactions (header select-all, row checkboxes)
 *  - Add Row, Edit, Save, Delete, Approve, Reject, Copy, Extend, Export, Import actions
 *  - Pagination navigation
 *  - Extend Expiration Date popup
 *
 * All selectors live in VendorCostDescriptionSelectors.ts.
 */
export class VendorCostDescriptionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToVCDM(): Promise<void> {
    await this.navigate(VendorCostDescriptionSelectors.navigation.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Search Area ──────────────────────────────────────────────────────────

  getExpandFiltersButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.expandFiltersButton).first();
  }

  getCollapseFiltersButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.collapseFiltersButton).first();
  }

  getRhqField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.rhqField).first();
  }

  getYardField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.yardField).first();
  }

  getVendorField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.vendorField).first();
  }

  getStatusField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.statusField).first();
  }

  getChorusCostCodeField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.chorusCostCodeField).first();
  }

  getErpAccountCodeField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.erpAccountCodeField).first();
  }

  getVendorCostDescriptionField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.vendorCostDescriptionField).first();
  }

  getApproverRejecterField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.approverRejecterField).first();
  }

  getDropdownListItem(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.searchArea.dropdownListItem);
  }

  async clickExpandFilters(): Promise<void> {
    await this.click(this.getExpandFiltersButton());
  }

  async clickCollapseFilters(): Promise<void> {
    await this.click(this.getCollapseFiltersButton());
  }

  async getRhqFieldValue(): Promise<string> {
    return this.getRhqField().inputValue();
  }

  async getYardFieldValue(): Promise<string> {
    return this.getYardField().inputValue();
  }

  async getVendorFieldValue(): Promise<string> {
    return this.getVendorField().inputValue();
  }

  async getStatusFieldValue(): Promise<string> {
    return this.getStatusField().inputValue();
  }

  async searchInDropdown(field: Locator, query: string): Promise<void> {
    await this.click(field);
    await this.fill(field, query);
  }

  async selectDropdownItem(nth: number = 0): Promise<void> {
    await this.page.locator(VendorCostDescriptionSelectors.searchArea.dropdownListItem).nth(nth).click();
  }

  async clearField(field: Locator): Promise<void> {
    await field.fill('');
  }

  // ─── Table / Checkboxes ───────────────────────────────────────────────────

  getHeaderCheckbox(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.checkboxes.headerCheckbox);
  }

  getRowCheckboxes(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.checkboxes.rowCheckbox);
  }

  getTableRows(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.table.rows);
  }

  async tickHeaderCheckbox(): Promise<void> {
    await this.getHeaderCheckbox().click();
  }

  async untickHeaderCheckbox(): Promise<void> {
    await this.getHeaderCheckbox().click();
  }

  async isHeaderCheckboxChecked(): Promise<boolean> {
    return this.getHeaderCheckbox().isChecked();
  }

  async areAllRowCheckboxesChecked(): Promise<boolean> {
    const checkboxes = this.getRowCheckboxes();
    const count = await checkboxes.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      if (!(await checkboxes.nth(i).isChecked())) return false;
    }
    return true;
  }

  async areAllRowCheckboxesUnchecked(): Promise<boolean> {
    const checkboxes = this.getRowCheckboxes();
    const count = await checkboxes.count();
    if (count === 0) return true;
    for (let i = 0; i < count; i++) {
      if (await checkboxes.nth(i).isChecked()) return false;
    }
    return true;
  }

  async tickAllIndividualRowCheckboxes(): Promise<void> {
    const checkboxes = this.getRowCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).click();
    }
  }

  async untickFirstRowCheckbox(): Promise<void> {
    await this.getRowCheckboxes().first().click();
  }

  async selectRowByStatus(status: string): Promise<void> {
    const row = this.page.locator(`tbody tr:has-text("${status}")`).first();
    await row.locator('.mag-checkbox__input').click();
  }

  async selectFirstRow(): Promise<void> {
    await this.getRowCheckboxes().first().click();
  }

  async unselectFirstRow(): Promise<void> {
    await this.getRowCheckboxes().first().click();
  }

  // ─── Header Action Buttons ────────────────────────────────────────────────

  getAddRowButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.addRowButton).first();
  }

  getEditButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.buttonRoles.editButton).first();
  }

  getSaveButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.buttonRoles.saveButton).first();
  }

  getDeleteButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.deleteActions.deleteButton).first();
  }

  getApproveButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.approvalActions.approveButton).first();
  }

  getRejectButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.approvalActions.rejectButton).first();
  }

  getCopyButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.buttonRoles.copyButton).first();
  }

  getExtendButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.extendExpiration.extendButton).first();
  }

  getExportButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.exportButton).first();
  }

  getImportButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.buttonRoles.importButton).first();
  }

  async clickAddRow(): Promise<void> {
    await this.click(this.getAddRowButton());
  }

  async clickEdit(): Promise<void> {
    await this.click(this.getEditButton());
  }

  async clickSave(): Promise<void> {
    await this.click(this.getSaveButton());
  }

  async clickDelete(): Promise<void> {
    await this.click(this.getDeleteButton());
  }

  async clickApprove(): Promise<void> {
    await this.click(this.getApproveButton());
  }

  async clickReject(): Promise<void> {
    await this.click(this.getRejectButton());
  }

  async clickExtend(): Promise<void> {
    await this.click(this.getExtendButton());
  }

  async clickExport(): Promise<void> {
    await this.click(this.getExportButton());
  }

  async isApproveButtonEnabled(): Promise<boolean> {
    return this.getApproveButton().isEnabled();
  }

  async isApproveButtonDisabled(): Promise<boolean> {
    return this.getApproveButton().isDisabled();
  }

  async isDeleteButtonEnabled(): Promise<boolean> {
    return this.getDeleteButton().isEnabled();
  }

  async isDeleteButtonDisabled(): Promise<boolean> {
    return this.getDeleteButton().isDisabled();
  }

  async isEditButtonEnabled(): Promise<boolean> {
    return this.getEditButton().isEnabled();
  }

  // ─── New Row (Add Row) ────────────────────────────────────────────────────

  getNewRowVendorField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.vendorField).first();
  }

  getNewRowChorusCostCodeField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.chorusCostCodeField).first();
  }

  getNewRowYardField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.yardField).first();
  }

  getNewRowInlineDeleteIcon(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.inlineDeleteIcon).first();
  }

  getNewRowDropdownItem(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.newVendorCost.dropdownResultItem);
  }

  async clickInlineDeleteOnNewRow(): Promise<void> {
    await this.click(this.getNewRowInlineDeleteIcon());
  }

  async selectNewRowDropdownItem(nth: number = 0): Promise<void> {
    await this.getNewRowDropdownItem().nth(nth).click();
  }

  // ─── Edit Form ────────────────────────────────────────────────────────────

  getEditRhqField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.editForm.rhqField).first();
  }

  getEditVendorField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.editForm.vendorField).first();
  }

  getEditVendorCostDescriptionField(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.editForm.vendorCostDescriptionField).first();
  }

  getEditSearchResultItem(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.editForm.searchResultItem);
  }

  async editVendorCostDescription(value: string): Promise<void> {
    await this.fill(this.getEditVendorCostDescriptionField(), value);
  }

  // ─── Approval Actions ────────────────────────────────────────────────────

  getApproveWarningMessage(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.approvalActions.warningMessage);
  }

  getApproveSuccessMessage(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.approvalActions.successMessage);
  }

  getApproveConfirmYesButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.approvalActions.confirmApproveYesButton).first();
  }

  async clickApproveConfirmYes(): Promise<void> {
    await this.click(this.getApproveConfirmYesButton());
  }

  // ─── Delete (Hard Delete) Actions ─────────────────────────────────────────

  getDeleteConfirmDialog(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.deleteActions.confirmDeleteDialog);
  }

  getDeleteConfirmYesButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.deleteActions.confirmDeleteYesButton).first();
  }

  getDeleteConfirmNoButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.deleteActions.confirmDeleteNoButton).first();
  }

  getDeleteToastMessage(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.deleteActions.toastMessage);
  }

  async clickDeleteConfirmYes(): Promise<void> {
    await this.click(this.getDeleteConfirmYesButton());
  }

  async clickDeleteConfirmNo(): Promise<void> {
    await this.click(this.getDeleteConfirmNoButton());
  }

  // ─── Export ───────────────────────────────────────────────────────────────

  getExportPopup(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.exportPopup);
  }

  getExportConfirmButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.exportActionButton).first();
  }

  getExportingMessage(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.exportingMessage);
  }

  getExportSuccessMessage(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.exportSuccessMessage);
  }

  getViewFileLink(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.exportButton.viewFileLink);
  }

  async clickExportConfirm(): Promise<void> {
    await this.click(this.getExportConfirmButton());
  }

  // ─── Extend Expiration ────────────────────────────────────────────────────

  getExtendPopup(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.extendExpiration.extendPopup);
  }

  getExtendPopupCloseButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.extendExpiration.closeButton).first();
  }

  getExtendValidationToast(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.extendExpiration.validationToast);
  }

  async clickExtendPopupClose(): Promise<void> {
    await this.click(this.getExtendPopupCloseButton());
  }

  // ─── Pagination ───────────────────────────────────────────────────────────

  getNextPageButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.pagination.nextButton).first();
  }

  getPreviousPageButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.pagination.previousButton).first();
  }

  getFirstPageButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.pagination.firstButton).first();
  }

  getLastPageButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.pagination.lastButton).first();
  }

  getPageNumbers(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.pagination.pageNumbers);
  }

  async clickPageNumber(pageNum: number): Promise<void> {
    await this.page
      .locator(`${VendorCostDescriptionSelectors.pagination.pageNumbers}:has-text("${pageNum}")`)
      .first()
      .click();
  }

  async clickNextPage(): Promise<void> {
    await this.click(this.getNextPageButton());
  }

  async clickPreviousPage(): Promise<void> {
    await this.click(this.getPreviousPageButton());
  }

  async clickFirstPage(): Promise<void> {
    await this.click(this.getFirstPageButton());
  }

  async clickLastPage(): Promise<void> {
    await this.click(this.getLastPageButton());
  }

  // ─── Save ────────────────────────────────────────────────────────────────

  getSaveSuccessToast(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.saveActions.successToast);
  }

  // ─── Manual Status ───────────────────────────────────────────────────────

  getManualStatusSuccessToast(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.manualStatus.successToast);
  }

  getManualStatusConfirmDialog(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.manualStatus.confirmDialog);
  }

  getManualStatusConfirmYesButton(): Locator {
    return this.page.locator(VendorCostDescriptionSelectors.manualStatus.confirmYesButton).first();
  }

  async clickManualStatusConfirmYes(): Promise<void> {
    await this.click(this.getManualStatusConfirmYesButton());
  }
}
