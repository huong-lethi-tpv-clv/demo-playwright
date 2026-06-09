import { expect } from '@playwright/test';
import { test as base } from 'playwright-bdd';

import { LoginPage } from '@pages/authentication';
import { InvoiceCreationPage, UploadInvoiceModal } from '@pages/invoice-creation';
import { InvoiceInquiryPage } from '@pages/invoice-inquiry';
import { MenuBarPage } from '@pages/menu-bar';

export type CustomFixtures = {
  loginPage: LoginPage;
  // Phase 1 — APM Invoice + Menu Bar
  invoiceCreationPage: InvoiceCreationPage;
  uploadInvoiceModal: UploadInvoiceModal;
  invoiceInquiryPage: InvoiceInquiryPage;
  menuBarPage: MenuBarPage;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  invoiceCreationPage: async ({ page }, use) => {
    await use(new InvoiceCreationPage(page));
  },

  uploadInvoiceModal: async ({ page }, use) => {
    await use(new UploadInvoiceModal(page));
  },

  invoiceInquiryPage: async ({ page }, use) => {
    await use(new InvoiceInquiryPage(page));
  },

  menuBarPage: async ({ page }, use) => {
    await use(new MenuBarPage(page));
  },
});

export { expect };
