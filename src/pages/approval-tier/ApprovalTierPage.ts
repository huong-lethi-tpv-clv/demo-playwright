import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { ApprovalTierSelectors } from './ApprovalTierSelectors';

/**
 * ApprovalTierPage — main grid / settings screen for APM Approval Tier Setting.
 *
 * Responsibilities:
 *  - Navigate to the Approval Tier Setting screen
 *  - Search (RHQ, Office, Approver, Status, Cost Code) and reset
 *  - Add Row / Edit / Save / Cancel operations
 *  - Tolerance Amount Limit and Tolerance Percentage fields
 *  - Deactivate action
 *  - Confirmation popup interactions
 *
 * All selectors live in ApprovalTierSelectors.ts.
 */
export class ApprovalTierPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToApprovalTier(): Promise<void> {
    await this.navigate(ApprovalTierSelectors.navigation.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Search area ──────────────────────────────────────────────────────────

  getRhqSearchField(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.rhqField).first();
  }

  getOfficeSearchField(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.officeField).first();
  }

  getApproverSearchField(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.approverField).first();
  }

  getStatusSearchField(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.statusField).first();
  }

  getCostCodeSearchField(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.costCodeField).first();
  }

  getSearchButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.searchButton).first();
  }

  getResetButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.resetButton).first();
  }

  getExpandAllFiltersButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.expandAllFiltersButton).first();
  }

  getSearchResultDropdown(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.searchResultDropdown);
  }

  getSearchResultItems(): Locator {
    return this.page.locator(ApprovalTierSelectors.searchArea.searchResultItem);
  }

  async fillRhqSearch(value: string): Promise<void> {
    await this.fill(this.getRhqSearchField(), value);
  }

  async fillOfficeSearch(value: string): Promise<void> {
    await this.fill(this.getOfficeSearchField(), value);
  }

  async fillApproverSearch(value: string): Promise<void> {
    await this.fill(this.getApproverSearchField(), value);
  }

  async fillStatusSearch(value: string): Promise<void> {
    await this.fill(this.getStatusSearchField(), value);
  }

  async fillCostCodeSearch(value: string): Promise<void> {
    await this.fill(this.getCostCodeSearchField(), value);
  }

  async clickSearch(): Promise<void> {
    await this.click(this.getSearchButton());
  }

  async clickReset(): Promise<void> {
    await this.click(this.getResetButton());
  }

  async clickExpandAllFilters(): Promise<void> {
    await this.click(this.getExpandAllFiltersButton());
  }

  async selectFirstSearchResult(): Promise<void> {
    await this.click(this.getSearchResultItems().first());
  }

  async isSearchResultDropdownVisible(): Promise<boolean> {
    return this.getSearchResultDropdown().isVisible();
  }

  // ─── Table ────────────────────────────────────────────────────────────────

  getGridContainer(): Locator {
    return this.page.locator(ApprovalTierSelectors.table.gridContainer);
  }

  getRowCheckboxes(): Locator {
    return this.page.locator(ApprovalTierSelectors.table.rowCheckboxes);
  }

  getAllCheckbox(): Locator {
    return this.page.locator(ApprovalTierSelectors.table.allCheckbox).first();
  }

  async selectRowByIndex(index: number): Promise<void> {
    await this.getRowCheckboxes().nth(index).check();
  }

  async selectMultipleRows(count: number): Promise<void> {
    const checkboxes = this.getRowCheckboxes();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
  }

  // ─── Action buttons ───────────────────────────────────────────────────────

  getAddRowButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.addRowButton).first();
  }

  getExportButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.exportButton).first();
  }

  getImportButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.importButton).first();
  }

  getCopyButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.copyButton).first();
  }

  getEditButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.editButton).first();
  }

  getDeactivateButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.deactivateButton).first();
  }

  getSaveButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.saveButton).first();
  }

  getCancelButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.cancelButton).first();
  }

  getResetRowButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.actionButtons.resetRowButton).first();
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

  async clickCancel(): Promise<void> {
    await this.click(this.getCancelButton());
  }

  async clickResetRow(): Promise<void> {
    await this.click(this.getResetRowButton());
  }

  async clickDeactivate(): Promise<void> {
    await this.click(this.getDeactivateButton());
  }

  async isAddRowButtonVisible(): Promise<boolean> {
    return this.getAddRowButton().isVisible();
  }

  async isExportButtonEnabled(): Promise<boolean> {
    return this.getExportButton().isEnabled();
  }

  async isImportButtonEnabled(): Promise<boolean> {
    return this.getImportButton().isEnabled();
  }

  async isCopyButtonEnabled(): Promise<boolean> {
    return this.getCopyButton().isEnabled();
  }

  async isEditButtonEnabled(): Promise<boolean> {
    return this.getEditButton().isEnabled();
  }

  async isDeactivateButtonEnabled(): Promise<boolean> {
    return this.getDeactivateButton().isEnabled();
  }

  async isDeactivateButtonDisabled(): Promise<boolean> {
    return this.getDeactivateButton().isDisabled();
  }

  // ─── Add Row Form ─────────────────────────────────────────────────────────

  getAddFormRhqInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.rhqInput).first();
  }

  getAddFormOfficeInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.officeInput).first();
  }

  getAddFormApprovalAmountLimitInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.approvalAmountLimitInput).first();
  }

  getAddFormToleranceAmountLimitInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.toleranceAmountLimitInput).first();
  }

  getAddFormTolerancePercentageInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.tolerancePercentageInput).first();
  }

  getValidationMessage(): Locator {
    return this.page.locator(ApprovalTierSelectors.addRowForm.validationMessage).first();
  }

  async fillAddFormRhq(value: string): Promise<void> {
    await this.fill(this.getAddFormRhqInput(), value);
  }

  async fillAddFormApprovalAmountLimit(value: string): Promise<void> {
    await this.fill(this.getAddFormApprovalAmountLimitInput(), value);
  }

  async fillAddFormToleranceAmountLimit(value: string): Promise<void> {
    await this.fill(this.getAddFormToleranceAmountLimitInput(), value);
  }

  async fillAddFormTolerancePercentage(value: string): Promise<void> {
    await this.fill(this.getAddFormTolerancePercentageInput(), value);
  }

  async isAddFormOfficeInputEnabled(): Promise<boolean> {
    return this.getAddFormOfficeInput().isEnabled();
  }

  async blurFocusedField(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  // ─── Edit Form ────────────────────────────────────────────────────────────

  getEditFormApprovalAmountLimitInput(): Locator {
    return this.page.locator(ApprovalTierSelectors.editForm.approvalAmountLimitInput).first();
  }

  getEditFormResetRowButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.editForm.resetRowButton).first();
  }

  async clearEditFormApprovalAmountLimit(): Promise<void> {
    const input = this.getEditFormApprovalAmountLimitInput();
    await input.waitFor({ state: 'visible' });
    await input.fill('');
  }

  async clickEditFormResetRow(): Promise<void> {
    await this.click(this.getEditFormResetRowButton());
  }

  // ─── Confirmation popup ───────────────────────────────────────────────────

  getConfirmationPopup(): Locator {
    return this.page.locator(ApprovalTierSelectors.confirmationPopup.container);
  }

  getConfirmationTitle(): Locator {
    return this.page.locator(ApprovalTierSelectors.confirmationPopup.title);
  }

  getConfirmationBody(): Locator {
    return this.page.locator(ApprovalTierSelectors.confirmationPopup.body);
  }

  getConfirmationPrimaryButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.confirmationPopup.primaryButton);
  }

  getConfirmationSecondaryButton(): Locator {
    return this.page.locator(ApprovalTierSelectors.confirmationPopup.secondaryButton);
  }

  async isConfirmationPopupVisible(): Promise<boolean> {
    return this.getConfirmationPopup().isVisible();
  }

  async clickConfirmationYes(): Promise<void> {
    await this.click(this.getConfirmationPrimaryButton());
  }

  async clickConfirmationCancel(): Promise<void> {
    await this.click(this.getConfirmationSecondaryButton());
  }

  // ─── Toast message ────────────────────────────────────────────────────────

  getToastMessage(): Locator {
    return this.page.locator(ApprovalTierSelectors.toastMessage.container).first();
  }

  getToastTitle(): Locator {
    return this.page.locator(ApprovalTierSelectors.toastMessage.title).first();
  }

  getToastContent(): Locator {
    return this.page.locator(ApprovalTierSelectors.toastMessage.content).first();
  }

  async isToastVisible(): Promise<boolean> {
    return this.getToastMessage().isVisible();
  }
}
