import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { InvoiceInquirySelectors } from './InvoiceInquirySelectors';

/**
 * InvoiceInquiryPage — the Invoice Inquiry list screen for APM.
 *
 * Responsibilities:
 *  - Navigate to the Invoice Inquiry screen
 *  - Click "New Invoice" to open Invoice Creation in a new tab
 *  - Interact with the invoice list table
 */
export class InvoiceInquiryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToInvoiceInquiry(): Promise<void> {
    await this.navigate(InvoiceInquirySelectors.navigation.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Locators ─────────────────────────────────────────────────────────────

  getNewInvoiceButton(): Locator {
    return this.page.locator(InvoiceInquirySelectors.toolbar.newInvoiceButton);
  }

  getTableRows(): Locator {
    return this.page.locator(InvoiceInquirySelectors.table.tableRows);
  }

  getInvoiceNumberLink(index: number): Locator {
    return this.page.locator(InvoiceInquirySelectors.table.invoiceNumberLink(index));
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  /**
   * Click "New Invoice" and return the new tab's Page instance.
   * The Invoice Creation page opens in a new browser tab.
   */
  async clickNewInvoice(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.click(this.getNewInvoiceButton()),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async isInvoiceCreationPageDisplayed(newPage: Page): Promise<boolean> {
    const heading = newPage.locator(
      '[data-testid="page-title-invoice-creation"], h1'
    );
    await heading.waitFor({ state: 'visible', timeout: 15_000 });
    return heading.isVisible();
  }
}
