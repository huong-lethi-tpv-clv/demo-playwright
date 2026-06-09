/**
 * Selectors for Vendor Cost Description Mapping module.
 * Verified against FE source: om-apm-meta/apps/om-apm-frontend
 */
export const VendorCostDescriptionSelectors = {
  navigation: {
    path: '/apm/ui/settings/vendor-cost',
    pageHeading: 'h1',
  },

  searchArea: {
    collapseButton: '[data-testid="btn-collapse"]',
    expandFiltersButton: '[data-testid="btn-collapse"]',
    collapseFiltersButton: '[data-testid="btn-collapse"]',
    collapseFieldsForm: '[data-testid="collapseFieldsForm"]',
    searchForm: '[data-testid="vendor-cost--search--form"]',
    rhqField: 'input[placeholder*="RHQ"]',
    yardField: '[data-cy="select-multi--input-txt-yardCode"]',
    vendorField: '[data-cy="select-multi--input-txt-vendorCode"]',
    statusField: '[data-testid="select-vendorCostStatus"]',
    chorusCostCodeField: '[data-cy="select-multi--input-txt-chorusCostCode"]',
    erpAccountCodeField: '[data-cy="select-multi--input-txt-erpAccountCode"]',
    vendorCostDescriptionField: '[data-testid="search-input-vendorDescription"]',
    approverRejecterField: '[data-testid="search-input-approveBy"]',
    dropdownListItem: '[data-testid^="select-search-vendorCode__options__"]',
    searchButton: '[data-testid="btn-search-vendor-cost"]',
    resetButton: 'button:has-text("Reset")',
  },

  table: {
    container: 'table',
    allCheckbox: '[data-testid="testid-checkbox-item-all"]',
    rowCheckboxes: 'tbody input[type="checkbox"]',
    rows: 'tbody tr',
    statusCell: 'td.status-cell',
    totalResultsLabel: '.total-results',
    inlineDeleteIcon: 'button[aria-label="Delete row"], .delete-icon',
  },

  checkboxes: {
    headerCheckbox: 'th#checkbox',
    rowCheckbox: '.mag-checkbox__input',
  },

  editForm: {
    rhqField: 'input[placeholder*="RHQ"]',
    yardCodeField: 'input[placeholder*="Yard"]',
    vendorField: 'input[placeholder*="Vendor"]',
    vendorCostDescriptionField: 'input[placeholder*="Vendor Cost"]',
    moduleField: 'input[placeholder*="Module"]',
    chorusCostCodeField: 'input[placeholder*="CHORUS"]',
    effectiveDateField: 'input[placeholder*="Effective"]',
    expirationDateField: 'input[placeholder*="Expiration"]',
    searchResultItem: '.dropdown-menu li, [role="option"]',
  },

  newVendorCost: {
    addRowButton: '[data-testid="Btn-Additional-New"]',
    vendorField: '[data-cy="select-vendor"]',
    vendorDropdownOptions: '#1_vendorCode--floating-list button',
    rhqDropdownOptions: '#1_rhqCode--floating-list button',
    yardDropdownOptions: '#1_yardCode--floating-list button',
    costCodeDropdownOptions: '#1_costCode--floating-list button',
    chorusCostCodeField: 'input[placeholder*="CHORUS Cost Code"]',
    yardField: 'input[placeholder*="Yard"]',
    dropdownResultItem: '#1_vendorCode--floating-list button',
    inlineDeleteIcon: 'button[aria-label="Delete"], .delete-icon',
  },

  approvalActions: {
    approveButton: '[data-testid="Btn-Vendor-Approve"]',
    rejectButton: '[data-testid="Btn-Vendor-Reject"]',
    confirmApproveYesButton: '[data-testid="button-action-yes"]',
    confirmApproveNoButton: '[data-testid="button-action-no"]',
    warningMessage: '.toast-warning',
    successMessage: '.toast-success',
    approveConfirmDialog: '[data-testid="confirm-dialog"]',
  },

  deleteActions: {
    deleteButton: '[data-testid="Btn-Vendor-Delete"]',
    confirmDeleteDialog: '[data-testid="confirm-dialog"]',
    confirmDeleteYesButton: '[data-testid="button-action-yes"]',
    confirmDeleteNoButton: '[data-testid="button-action-no"]',
    deleteConfirmationMessage:
      'This action can not be undone. Are you sure you want to remove the selected items from the list?',
    toastMessage: '.toast-message',
  },

  exportButton: {
    exportButton: 'button:has-text("Export")',
    exportPopup: '[role="dialog"]:has-text("Export")',
    allPagesOption: 'input[value="all"], label:has-text("All pages")',
    excelOption: 'input[value="excel"], label:has-text("Excel")',
    exportActionButton: '[role="dialog"] button:has-text("Export")',
    exportingMessage: '.toast:has-text("being exported")',
    exportSuccessMessage: '.toast:has-text("exported successfully")',
    viewFileLink: 'a:has-text("View file")',
  },

  pagination: {
    container: '.pagination',
    pageNumbers: '.pagination .page-item:not(.prev):not(.next)',
    nextButton: '.pagination .next, button[aria-label="Next"]',
    previousButton: '.pagination .prev, button[aria-label="Previous"]',
    firstButton: '.pagination .first, button[aria-label="First"]',
    lastButton: '.pagination .last, button[aria-label="Last"]',
    showItemsSetting: 'select[name="pageSize"], .page-size-select',
    activePageIndicator: '.pagination .active',
  },

  buttonRoles: {
    newButton: '[data-testid="Btn-Vendor-New"]',
    editButton: '[data-testid="Btn-Vendor-Edit"]',
    deleteButton: '[data-testid="Btn-Vendor-Delete"]',
    copyButton: '[data-testid="Btn-Vendor-Copy"]',
    extendButton: '[data-testid="Btn-Vendor-Extend"]',
    importButton: '[data-testid="Btn-Vendor-Import"]',
    saveButton: '[data-testid="Btn-Save-New"]',
    saveNewButton: '[data-testid="Btn-Save-New"]',
    cancelNewButton: '[data-testid="Btn-Cancel-New"]',
    saveEditButton: '[data-testid="Btn-Save-Edit"]',
    cancelEditButton: '[data-testid="Btn-Cancel-Edit"]',
    saveCopyButton: '[data-testid="Btn-Save-Copy"]',
    cancelCopyButton: '[data-testid="Btn-Cancel-Copy"]',
    saveRejectButton: '[data-testid="Btn-Save-Reject"]',
    cancelRejectButton: '[data-testid="Btn-Cancel-Reject"]',
  },

  extendExpiration: {
    extendButton: '[data-testid="Btn-Vendor-Extend"]',
    extendPopup: '[data-testid="modal-extendVendorCost"]',
    applyButton: '[data-testid="extend-button-apply"]',
    cancelButton: '[data-testid="extend-button-cancel"]',
    closeButton: '[data-testid="close-icon"]',
    validationToast: '.toast:has-text("Approved")',
  },

  saveActions: {
    saveNewButton: '[data-testid="Btn-Save-New"]',
    saveEditButton: '[data-testid="Btn-Save-Edit"]',
    saveButton: '[data-testid="Btn-Save-New"]',
    successToast: '.toast:has-text("save successfully")',
    updatedByCell: 'td.updated-by',
    updateDateTimeCell: 'td.update-datetime',
  },

  manualStatus: {
    approveButton: '[data-testid="Btn-Vendor-Approve"]',
    confirmYesButton: '[data-testid="button-action-yes"]',
    confirmDialog: '[data-testid="confirm-dialog"]',
    successToast: '[data-testid="toast-message-id"]',
  },
} as const;
