import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { InvoiceCreationSelectors } from './InvoiceCreationSelectors';

/**
 * InvoiceCreationPage — main list / creation screen for APM Invoice Creation.
 *
 * Responsibilities:
 *  - Navigate to the Invoice Creation screen
 *  - Interact with the Vendor Invoice area (show, upload)
 *  - Interact with Work Order line items (collapse/expand, checkboxes)
 *  - Interact with the CNTR Select button
 *
 * All selectors live in InvoiceCreationSelectors.ts.
 * Modal interactions are delegated to UploadInvoiceModal.ts.
 */
export class InvoiceCreationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToInvoiceCreation(): Promise<void> {
    await this.navigate(InvoiceCreationSelectors.navigation.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate directly to an existing invoice by its URL (opens on detail view).
   */
  async openInvoiceByUrl(invoiceUrl: string): Promise<void> {
    await this.page.goto(invoiceUrl, { waitUntil: 'domcontentloaded' });
  }

  getInvoiceTitle(): Locator {
    return this.page.locator(InvoiceCreationSelectors.navigation.invoiceTitle);
  }

  getConfirmButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.navigation.confirmButton);
  }

  // ─── Vendor Invoice Area ───────────────────────────────────────────────────

  getShowVendorInvoiceButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.vendorInvoiceArea.showVendorInvoiceButton).first();
  }

  getUploadButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.vendorInvoiceArea.uploadButton).first();
  }

  getVendorInvoiceContainer(): Locator {
    return this.page.locator(InvoiceCreationSelectors.vendorInvoiceArea.vendorInvoiceContainer);
  }

  getUploadedFileEntry(): Locator {
    return this.page.locator(InvoiceCreationSelectors.vendorInvoiceArea.uploadedFileEntry);
  }

  async clickShowVendorInvoice(): Promise<void> {
    await this.click(this.getShowVendorInvoiceButton());
  }

  async clickUploadButton(): Promise<void> {
    await this.click(this.getUploadButton());
  }

  async isVendorInvoiceAreaVisible(): Promise<boolean> {
    return this.getVendorInvoiceContainer().isVisible();
  }

  async isUploadedFileVisible(): Promise<boolean> {
    return this.getUploadedFileEntry().isVisible();
  }

  // ─── Work Order Line Items ─────────────────────────────────────────────────

  getExpandButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.workOrderLineItem.expandButton).first();
  }

  getCollapseButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.workOrderLineItem.collapseButton).first();
  }

  getLineItemTable(): Locator {
    return this.page.locator(InvoiceCreationSelectors.workOrderLineItem.lineItemTable);
  }

  getAllCheckbox(): Locator {
    return this.page.locator(InvoiceCreationSelectors.workOrderLineItem.allCheckbox);
  }

  getLineItemCheckboxes(): Locator {
    return this.page.locator(InvoiceCreationSelectors.workOrderLineItem.lineItemCheckboxes);
  }

  async clickExpandButton(): Promise<void> {
    await this.click(this.getExpandButton());
  }

  async clickCollapseButton(): Promise<void> {
    await this.click(this.getCollapseButton());
  }

  async isLineItemTableVisible(): Promise<boolean> {
    return this.getLineItemTable().isVisible();
  }

  async isExpandButtonVisible(): Promise<boolean> {
    return this.getExpandButton().isVisible();
  }

  async isCollapseButtonVisible(): Promise<boolean> {
    return this.getCollapseButton().isVisible();
  }

  async tickAllCheckbox(): Promise<void> {
    await this.getAllCheckbox().check();
  }

  async untickAllCheckbox(): Promise<void> {
    await this.getAllCheckbox().uncheck();
  }

  async areAllLineItemCheckboxesChecked(): Promise<boolean> {
    const checkboxes = this.getLineItemCheckboxes();
    const count = await checkboxes.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      if (!(await checkboxes.nth(i).isChecked())) return false;
    }
    return true;
  }

  async areAllLineItemCheckboxesUnchecked(): Promise<boolean> {
    const checkboxes = this.getLineItemCheckboxes();
    const count = await checkboxes.count();
    if (count === 0) return true;
    for (let i = 0; i < count; i++) {
      if (await checkboxes.nth(i).isChecked()) return false;
    }
    return true;
  }

  async tickAllIndividualCheckboxes(): Promise<void> {
    const checkboxes = this.getLineItemCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
  }

  async isAllCheckboxChecked(): Promise<boolean> {
    return this.getAllCheckbox().isChecked();
  }

  async untickFirstLineItemCheckbox(): Promise<void> {
    await this.getLineItemCheckboxes().first().uncheck();
  }

  // ─── CNTR Select ──────────────────────────────────────────────────────────

  getCntrSelectButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.containerAttached.cntrSelectButton);
  }

  async isCntrSelectEnabled(): Promise<boolean> {
    return this.getCntrSelectButton().isEnabled();
  }

  async isCntrSelectDisabled(): Promise<boolean> {
    return this.getCntrSelectButton().isDisabled();
  }
}
