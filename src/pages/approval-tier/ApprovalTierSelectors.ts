/**
 * Selectors for Approval Tier Setting module.
 * Verified against Cypress constants and FE source.
 */
export const ApprovalTierSelectors = {
  navigation: {
    path: '/apm/ui/settings/approval-tier',
    pageHeading: 'h1',
  },

  searchArea: {
    rhqField: '[data-cy="select-rhq"]',
    officeField: '[data-cy="select-office"]',
    approverField: '[data-testid="input-search--approver"]',
    statusField: '[data-cy="select-search--status"]',
    costCodeField: '[data-testid="input-search--costCode"]',
    searchButton: '[data-testid="btn-search-approval-tier-setting"]',
    resetButton: '[data-testid="btn-reset-search-approval-tier-setting"]',
    collapseButton: '[data-testid="btn-collapse"]',
    expandAllFiltersButton: '[data-testid="btn-collapse"]',
    searchResultDropdown: '[role="listbox"]',
    searchResultItem: '[role="option"]',
    searchForm: '[data-testid="approval-tier--search--form"]',
    collapseFieldsForm: '[data-testid="collapseFieldsForm"]',
    statusActiveOption: '[data-testid="select-search--status__options__ACTIVE"]',
    statusInactiveOption: '[data-testid="select-search--status__options__INACTIVE"]',
    statusActiveCheckbox: '[data-testid="select-search--status__checkbox__ACTIVE"]',
    statusInactiveCheckbox: '[data-testid="select-search--status__checkbox__INACTIVE"]',
  },

  table: {
    gridContainer: '[data-testid="table-approval-tier"]',
    rowCheckboxes: 'tbody input[type="checkbox"]',
    allCheckbox: 'thead input[type="checkbox"]',
    sortButtons: 'th[aria-sort]',
    rhqSortButton: '[data-testid="sort-icon-button-rhqCode"]',
    statusSortButton: '[data-testid="sort-icon-button-status"]',
    paginationButtons: '[data-testid="approval-tier--pagination"]',
    paginationGroupShowItems: '[data-testid="select-single-pagination-group-number-of-items"]',
    totalItems: '[data-testid="totalWOs"]',
    paginationGroup: '[data-testid="pagination-group"]',
    nextPageButton: '[aria-label="go to next page"]',
    prevPageButton: '[aria-label="go to previous page"]',
    currentPage: '[aria-current="page"]',
  },

  actionButtons: {
    addRowButton: '[data-testid="Btn-New"]',
    addNewRowButton: '[data-testid="Btn-Add-New"]',
    exportButton: '[data-testid="Btn-CostCode-Export"]',
    importButton: '[data-testid="Btn-Approval-Tier-Import"]',
    copyButton: '[data-testid="Btn-copy"]',
    editButton: '[data-testid="Btn-Edit"]',
    deactivateButton: '[data-testid="Btn-Deactivate"]',
    saveButton: '[data-testid="Btn-Save-New"]',
    saveEditButton: '[data-testid="Btn-Save-Edit"]',
    cancelButton: '[data-testid="Btn-Cancel-New"]',
    cancelEditButton: '[data-testid="Btn-Cancel-Edit"]',
    resetRowButton: 'button:has-text("Reset")',
  },

  addRowForm: {
    rhqInput: '[data-cy="select-rhqCode"]',
    officeInput: '[data-cy="select-officeCode"]',
    approvalAmountLimitInput: '[data-testid="input-amount-limit"]',
    toleranceAmountLimitInput: '[data-testid="input-tolerance-amount-limit"]',
    tolerancePercentageInput: '[data-testid="input-tolerance-percentage"]',
    firstApproverInput: '[data-cy="select-usersApproval-firstApprover"]',
    finalApproverInput: '[data-cy="select-usersApproval-secondApprover"]',
    costCodeInput: '[data-cy="cost-code-tree-select-multi"]',
    validationMessage: '.form-item-explain-error',
    errorIcon: '[data-testid="error-icon"]',
    errorTooltip: '.mag-input__helperText',
  },

  editForm: {
    rhqInput: '[data-cy="select-rhqCode"]',
    officeInput: '[data-cy="select-officeCode"]',
    approvalAmountLimitInput: '[data-testid="input-amount-limit"]',
    toleranceAmountLimitInput: '[data-testid="input-tolerance-amount-limit"]',
    tolerancePercentageInput: '[data-testid="input-tolerance-percentage"]',
    firstApproverInput: '[data-cy="select-usersApproval-firstApprover"]',
    finalApproverInput: '[data-cy="select-usersApproval-secondApprover"]',
    resetRowButton: 'button:has-text("Reset")',
    validationMessage: '.form-item-explain-error',
  },

  confirmationPopup: {
    container: '[data-testid="confirm-dialog"]',
    title: '[role="dialog"] h2',
    body: '[role="dialog"] p',
    primaryButton: '[data-testid="button-action-yes"]',
    secondaryButton: '[data-testid="button-action-no"]',
  },

  toastMessage: {
    container: '.ant-message-notice, .ant-notification-notice',
    title: '.ant-notification-notice-message',
    content: '.ant-notification-notice-description',
  },
} as const;
