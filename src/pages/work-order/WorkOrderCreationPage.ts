import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { WorkOrderCreationSelectors } from './WorkOrderCreationSelectors';

/**
 * WorkOrderCreationPage — main creation screen for APM Work Orders.
 *
 * Responsibilities:
 *  - Navigate to the Work Order Creation screen
 *  - Interact with the sub-header fields (Vendor, Terminal/Yard, Activity Date)
 *  - Interact with VVD fields (Vessel Code, Voyage No, Direction)
 *  - Interact with the cost item grid table (Add Row, Trash icon)
 *
 * All selectors live in WorkOrderCreationSelectors.ts.
 */
export class WorkOrderCreationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToWorkOrderCreation(): Promise<void> {
    await this.navigate(this.navigate(WorkOrderCreationSelectors.href.path));
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Sub-Header ───────────────────────────────────────────────────────────

  getSubHeaderContainer(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.subHeader.container);
  }

  getVendorField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.subHeader.vendorField).first();
  }

  getTerminalYardField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.subHeader.terminalYardField).first();
  }

  getActivityDateField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.subHeader.activityDateField).first();
  }

  getActivityDateLabel(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.subHeader.activityDateLabel).first();
  }

  async isSubHeaderVisible(): Promise<boolean> {
    return this.getSubHeaderContainer().isVisible();
  }

  async isVendorFieldVisible(): Promise<boolean> {
    return this.getVendorField().isVisible();
  }

  async isTerminalYardFieldVisible(): Promise<boolean> {
    return this.getTerminalYardField().isVisible();
  }

  async isActivityDateFieldVisible(): Promise<boolean> {
    return this.getActivityDateField().isVisible();
  }

  async isActivityDateLabelVisible(): Promise<boolean> {
    return this.getActivityDateLabel().isVisible();
  }

  async fillVendorField(searchTerm: string): Promise<void> {
    const wrapper = WorkOrderCreationSelectors.subHeader.vendorField;
    await this.page.locator(wrapper).click();
    await this.page.locator(`${wrapper} input`).fill(searchTerm);
  }

  async getActivityDateFieldValue(): Promise<string> {
    return this.getActivityDateField().inputValue();
  }

  // ─── VVD Fields ───────────────────────────────────────────────────────────

  getVesselCodeField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.vvdFields.vesselCodeField).first();
  }

  getVoyageNoField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.vvdFields.voyageNoField).first();
  }

  getDirectionField(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.vvdFields.directionField).first();
  }

  async isVoyageNoDisabled(): Promise<boolean> {
    return this.getVoyageNoField().isDisabled();
  }

  async getVesselCodePlaceholder(): Promise<string> {
    return (await this.getVesselCodeField().locator('input').getAttribute('placeholder')) ?? '';
  }

  async getVoyageNoPlaceholder(): Promise<string> {
    return (await this.getVoyageNoField().locator('input').getAttribute('placeholder')) ?? '';
  }

  async getDirectionPlaceholder(): Promise<string> {
    return (await this.getDirectionField().locator('input').getAttribute('placeholder')) ?? '';
  }

  // ─── Grid Table ───────────────────────────────────────────────────────────

  getGridTableContainer(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.container);
  }

  getNoCostCodeMessage(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.noCostCodeMessage);
  }

  getAddRowButton(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.addRowButton).first();
  }

  getTrashIcon(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.trashIcon).first();
  }

  getTableRows(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.tableRow);
  }

  getFirstTableRow(): Locator {
    return this.page.locator(WorkOrderCreationSelectors.gridTable.firstRow);
  }

  async isGridTableVisible(): Promise<boolean> {
    return this.getGridTableContainer().isVisible();
  }

  async isNoCostCodeMessageVisible(): Promise<boolean> {
    return this.getNoCostCodeMessage().isVisible();
  }

  async isAddRowButtonVisible(): Promise<boolean> {
    return this.getAddRowButton().isVisible();
  }

  async clickAddRowButton(): Promise<void> {
    await this.click(this.getAddRowButton());
  }

  async clickTrashIcon(): Promise<void> {
    const perRowTrash = this.page.locator('[data-testid^="action-remove-"]').first();
    if (await perRowTrash.isVisible()) {
      await this.click(perRowTrash);
      return;
    }
    const cancelNew = this.page.locator('[data-testid="Btn-Cancel-New"]');
    if (await cancelNew.isVisible()) {
      await this.click(cancelNew);
      const confirmYes = this.page.getByRole('dialog').getByRole('button', { name: 'Yes' });
      await confirmYes.waitFor({ state: 'visible', timeout: 5000 });
      await this.click(confirmYes);
      return;
    }
    await this.click(this.getTrashIcon());
  }

  async getTableRowCount(): Promise<number> {
    const noData = this.page.locator(WorkOrderCreationSelectors.gridTable.noCostCodeMessage);
    if (await noData.isVisible()) return 0;
    return this.getTableRows().count();
  }
}
