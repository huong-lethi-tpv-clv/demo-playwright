import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { InvoiceCreationSelectors } from './InvoiceCreationSelectors';

/**
 * UploadInvoiceModal — handles the "Upload Invoice" dialog.
 *
 * The modal is opened via InvoiceCreationPage.clickUploadButton().
 * File upload is handled by setting the file input path directly
 * (no OS file picker interaction needed with Playwright).
 */
export class UploadInvoiceModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Locators ─────────────────────────────────────────────────────────────

  getContainer(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.container);
  }

  getSelectFileLink(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.selectFileLink);
  }

  getFileInput(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.fileInput);
  }

  getUploadActionButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.uploadActionButton);
  }

  getCancelButton(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.cancelButton);
  }

  getUploadingIndicator(): Locator {
    return this.page.locator(InvoiceCreationSelectors.uploadModal.uploadingIndicator);
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async isVisible(): Promise<boolean> {
    return this.getContainer().isVisible();
  }

  async isHidden(): Promise<boolean> {
    return this.getContainer().isHidden();
  }

  async clickSelectFileLink(): Promise<void> {
    await this.click(this.getSelectFileLink());
  }

  /**
   * Set the file to upload using Playwright's setInputFiles — bypasses OS picker.
   * @param filePath Absolute path to the file to upload.
   */
  async selectFile(filePath: string): Promise<void> {
    await this.getFileInput().setInputFiles(filePath);
  }

  async clickUpload(): Promise<void> {
    await this.click(this.getUploadActionButton());
  }

  async clickCancel(): Promise<void> {
    await this.click(this.getCancelButton());
  }

  /**
   * Wait for the modal to close (hidden) after an upload completes or is cancelled.
   */
  async waitUntilClosed(timeoutMs = 15_000): Promise<void> {
    await this.getContainer().waitFor({ state: 'hidden', timeout: timeoutMs });
  }

  /**
   * Full upload flow: click Select File → set file → click Upload → wait for close.
   * @param filePath Absolute path to the file to upload.
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.clickSelectFileLink();
    await this.selectFile(filePath);
    await this.clickUpload();
    await this.waitUntilClosed();
  }
}
