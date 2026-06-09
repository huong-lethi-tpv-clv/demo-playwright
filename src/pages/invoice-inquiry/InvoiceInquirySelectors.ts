/**
 * Selectors for Invoice Inquiry module.
 * Verified against FE source: om-apm-meta/apps/om-apm-frontend
 */
export const InvoiceInquirySelectors = {
  navigation: {
    path: '/apm/ui/invoice/inquiry',
    pageHeading: 'h1',
  },

  searchArea: {
    searchForm: '[data-testid="invoice-inquiry--search--form"]',
    searchButton: '[data-testid="btn-search-invoice-inquiry"]',
    resetButton: '[data-testid="btn-reset-search-invoice-inquiry"]',
    vendorCodeInput: '[data-cy="select-multi--input-txt-vendorCode"]',
    pagination: '[data-testid="tax--pagination"]',
  },

  toolbar: {
    newInvoiceButton: 'button:has-text("New Invoice")',
  },

  table: {
    tableRows: '[data-testid="table-inquiry"] tbody tr',
    tableContainer: '[data-testid="table-inquiry"]',
    invoiceNumberLink: (index: number) =>
      `[data-testid="table-inquiry"] tbody tr:nth-child(${index}) a`,
  },

  statusTags: {
    opusCsrStatus: '[data-testid="tag-opus-csr-status"]',
    opusInvoiceInterfaceStatus: '[data-testid="tag-opus-invoice-interface-status"]',
  },
} as const;
