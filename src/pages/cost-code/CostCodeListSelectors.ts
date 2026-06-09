/**
 * Selectors for Cost Code List module.
 * Verified against FE source: om-apm-meta/apps/om-apm-frontend
 */
export const CostCodeListSelectors = {
  navigation: {
    path: '/apm/ui/settings/cost-code',
    pageHeading: 'h1',
  },

  searchArea: {
    collapseButton: '[data-testid="btn-collapse"]',
    expandButton: '[data-testid="btn-collapse"]',
    collapseFieldsForm: '[data-testid="collapseFieldsForm"]',
    searchForm: '[data-testid="cost-code--search--form"]',
    costCodeField: '[data-testid="input-search--costCode"]',
    costCodeDescriptionField: '[data-testid="input-search--description"]',
    createdByField: '[data-testid="input-search--createdBy"]',
    decidedByField: '[data-testid="input-search--decidedBy"]',
    searchButton: '[data-testid="btn-search-cost-code"]',
    resetButton: '[data-testid="btn-reset-search-cost-code"]',
    erpAccountCodeField: '[data-testid="select-search--status"]',
    statusField: '[data-testid="select-search--status"]',
    costSubCategoryField: 'input[placeholder*="Cost Sub-Category"]',
    activityDateField: 'input[placeholder*="Activity Date"]',
    moduleField: 'input[placeholder*="Module"]',
    legacyAutoCostCodeField: 'input[placeholder*="Legacy Auto Cost Code"]',
    legacyAccrualFlagField: 'input[placeholder*="Legacy Accrual Flag"]',
    svvdRequiredField: 'input[placeholder*="SVVD Required"]',
    dropdownList: '[role="listbox"]',
    dropdownOption: '[role="option"]',
  },

  toolbar: {
    addRowButton: '[data-testid="Btn-New"]',
    addNewRowButton: '[data-testid="Btn-Add-New"]',
    importButton: '[data-testid="Btn-CostCode-Import"]',
    exportButton: '[data-testid="Btn-CostCode-Export"]',
    editButton: '[data-testid="Btn-Edit"]',
    copyButton: '[data-testid="Btn-copy"]',
    copySaveButton: '[data-testid="Btn-copy-save"]',
    copyCancelButton: '[data-testid="Btn-copy-cancel"]',
    deactivateButton: '[data-testid="Btn-Deactivate"]',
    reactivateButton: '[data-testid="Btn-Reactivate"]',
    saveButton: '[data-testid="Btn-Save-New"]',
    saveEditButton: '[data-testid="Btn-Save-Edit"]',
    cancelButton: '[data-testid="Btn-Cancel-Edit"]',
    approveButton: '[data-testid="Btn-Final-Approver-Approve"]',
    firstRejectButton: '[data-testid="Btn-First-Approver-Reject"]',
    firstRejectConfirmButton: '[data-testid="Btn-First-Approver--Reject--Confirm"]',
    finalRejectButton: '[data-testid="Btn-Final-Approver-Reject"]',
    finalRejectConfirmButton: '[data-testid="Btn-Final-Approver--Reject--Confirm"]',
    rejectButton: '[data-testid="Btn-Approver-Reject"]',
    assignErpButton: '[data-testid="Btn-First-Approver-Assign-erp"]',
    confirmButton: '[data-testid="Btn-First-Approver-Confirm"]',
    finalApprovalButton: '[data-testid="Btn-Final-Approver-Approve"]',
    totalSelectedItems: '.total-selected',
  },

  table: {
    grid: '[data-testid="table-cost-code"]',
    rows: 'tbody tr',
    rowCheckboxes: 'tbody tr input[type="checkbox"]',
    selectAllCheckbox: '[data-testid="container-checkbox"]',
    costCodeDescriptionCell: '[data-testid="tableCostCode-row-costCodeDescription"]',
    detailCodeCell: '[data-testid="tableCostCode-row-detailCode"]',
    newRow: 'tr.new-row, tbody tr:last-child',
    highlightedRow: 'tr.highlighted',
    columnHeader: 'th',
    checkboxColumn: 'th:first-child, [col-id="checkbox"]',
  },

  rowActions: {
    removeIcon: 'button[aria-label="Remove"], .remove-icon',
    resetIcon: 'button[aria-label="Reset"], .reset-icon',
  },

  editFields: {
    costCategoryField: 'input[placeholder*="Cost Category"]',
    costSubCategoryField: 'input[placeholder*="Cost Sub-Category"]',
    detailCodeField: 'input[placeholder*="Detail Code"]',
    rejectReasonField: '[data-testid="input--rejectReason"]',
    autoGenerateCheckbox: '[data-testid="costCode-auto-generate"]',
  },

  assignErpPanel: {
  erpAccountCodeField: '[data-testid="select-ERPAccountCode"]',
  clearButton: 'button[aria-label="Clear"], .clear-icon',
  dropdownList: '[role="listbox"]',
  dropdownOption: '[role="option"]',
  },

  pagination: {
    pageNumbers: '[data-testid="pagination-group"]',
    showItemsSetting: '[data-testid="select-single-pagination-group-number-of-items"]',
    showItems50Option: '[data-testid="select-single-pagination-group-number-of-items__options__50"]',
    totalItems: '[data-testid="totalWOs"]',
    nextPageButton: '[aria-label="go to next page"]',
    prevPageButton: '[aria-label="go to previous page"]',
    currentPage: '[aria-current="page"]',
  },

  dialogs: {
    warningDialog: '[role="dialog"]:has-text("Warning")',
    confirmDialog: '[data-testid="confirm-dialog"]',
    dialogTitle: '[role="dialog"] h2',
    dialogMessage: '[role="dialog"] p',
    dialogOkButton: '[data-testid="button-action-yes"]',
    dialogCancelButton: '[data-testid="button-action-no"]',
    discardChangeDialog: '[role="dialog"]:has-text("Discard")',
  },

  messages: {
    successToast: '.toast-success, .notification-success',
    warningToast: '.toast-warning, .notification-warning',
    toastTitle: '.notification-title',
    toastMessage: '.notification-message',
  },
} as const;
