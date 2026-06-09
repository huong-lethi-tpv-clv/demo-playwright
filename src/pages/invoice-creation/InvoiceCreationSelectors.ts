/**
 * Selectors for Invoice Creation module.
 * Verified against FE source: om-apm-meta/apps/om-apm-frontend
 */
export const InvoiceCreationSelectors = {
  navigation: {
    path: '/apm/ui/invoice/create',
    pageHeading: 'h1',
    invoiceTitle: '[data-cy="invoice-title"]',
    invoiceStatus: '[data-cy="invoice-status"]',
    invoiceDetails: '[data-cy="invoice-details"]',
    confirmButton: '[data-testid="id-button-popup-asa-confirm"]',
  },

  headerForm: {
    invoiceNo: '[data-cy="txt-invoiceNo"]',
    invoiceSource: '[data-cy="txt-invoiceSource"]',
    creationDate: '[data-cy="txt-creationDate"]',
    asaNo: '[data-cy="txt-asaNo"]',
    fromLocation: '[data-cy="txt-fromLocation"]',
    toLocation: '[data-cy="txt-toLocation"]',
    callingSequence: '[data-cy="txt-callingSequence"]',
    description: '[data-cy="textarea-description"]',
    invoiceAmount: '[data-cy="text-invoiceAmount"]',
    totalAmount: '[data-cy="text-totalAmount"]',
    invoiceAmountInput: '[data-testid="input-invoice-amount"]',
    invoiceNoInput: '[data-testid="input-invoice_no"]',
  },

  vendorInvoiceArea: {
    showVendorInvoiceButton: '[data-cy="btn-show-vender-inv"]',
    showVendorInvTestId: '[data-testid="show-vendor-inv"]',
    uploadButton: '[data-testid="btn-import-invoice"]',
    uploadedFilesList: '[data-testid="uploaded-files-list"]',
    uploadedFileEntry: '[data-testid="uploaded-files-list"] li',
    vendorInvoiceContainer: '[data-testid="uploaded-files-list"]',
    collapseButton: '[data-testid="btn-collapse"]',
  },

  uploadModal: {
    container: '[role="dialog"]:has-text("Upload Invoice")',
    selectFileLink: '[role="dialog"] a:has-text("Select file to upload")',
    fileInput: 'input[type="file"]',
    uploadActionButton: '[data-testid="uploadRail--import--submit"]',
    cancelButton: '[role="dialog"] button:has-text("Cancel")',
    uploadingIndicator: '.upload-progress-bar',
  },

  workOrderLineItem: {
    collapseButton: '[data-testid="btn-collapse"]',
    expandButton: '[data-testid="btn-collapse"]',
    lineItemTable: '[data-testid="layout-wo-list-table"]',
    allCheckbox: 'thead input[type="checkbox"]',
    lineItemCheckboxes: 'tbody input[type="checkbox"]',
  },

  workOrderSection: {
    addWoButton: '[data-testid="btn-addWO"]',
    addWorkOrderButton: '[data-cy="btn-add-workOrder"]',
    removeWOsButton: '[data-testid="btn-removeWOs"]',
    woListTable: '[data-testid="layout-wo-list-table"]',
    selectedItemsTable: '[data-testid="layout-wo-selected-items-table"]',
    selectedItemsTab: '[data-testid="selected-items-tab"]',
    totalSelectedWo: '[data-testid="total-selected-wo"]',
    woFilterDoor: '[data-testid="input-woFilterDoor"]',
    woNoInput: '[data-testid="input-wo_no"]',
  },

  containerAttached: {
    cntrSelectButton: '[data-testid="show-cntr-select-button"]',
    applyButton: '[data-testid="apply-cntr-attach-btn"]',
    cancelButton: '[data-testid="cancel-cntr-attach-btn"]',
    attachPopupBkgNo: '[data-testid="attach-container-popup-bkgNo"]',
    attachPopupRefNo: '[data-testid="attach-container-popup-refNo"]',
    attachPopupSearchBtn: '[data-testid="attach-container-popup-searchBtn"]',
    attachPopupResetBtn: '[data-testid="attach-container-popup-resetBtn"]',
    containers20: '[data-testid="containers-size-20"]',
    containers40: '[data-testid="containers-size-40"]',
  },

  applyToInvoice: {
    applyButton: '[data-testid="button-apply-to-invoice"]',
  },

  submitActions: {
    submitButton: '[data-testid="work-order--header--btn-submit"]',
    resetButton: '[data-testid="work-order--header--btn-reset"]',
    previewSubmit: '[data-testid="preview--submit"]',
    previewCancel: '[data-testid="preview--cancel"]',
    previewPaymentVendor: '[data-testid="preview--payment-vendor"]',
    confirmButton: '[data-testid="id-button-popup-asa-confirm"]',
    cancelPopupButton: '[data-testid="id-button-popup-cancel"]',
    rejectPopupButton: '[data-testid="id-button-popup-reject"]',
    rejectReasonTextarea: '[data-testid="id-textarea-reject-reason"]',
  },

  exRate: {
    adjustExRateButton: '[data-cy="btn-adjustExRate"]',
    adjustExRateModal: '[data-testid="modal-adjustExchangeRate"]',
    applyButton: '[data-testid="exrate-button-apply"]',
    cancelButton: '[data-testid="exrate-cancel-button"]',
    swapCurrency: '[data-testid="exrate-button-swap-currency"]',
    adjustExInput: '[data-testid="adjust-ex-input"]',
  },

  totalAmount: {
    woAmount: '[data-cy="totalWoAmount--amount"]',
    woCurrency: '[data-cy="totalWoAmount--currency"]',
  },

  selectAll: {
    button: '[data-cy="select-all-btn"]',
    testId: '[data-testid="select-all-btn"]',
  },

  draftLabel: '[data-testid="draft-label"]',
} as const;
