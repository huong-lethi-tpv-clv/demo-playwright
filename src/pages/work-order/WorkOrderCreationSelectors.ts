/**
 * Selectors for Work Order Creation module.
 * Verified against FE source: om-apm-meta/apps/om-apm-frontend
 */
export const WorkOrderCreationSelectors = {
  navigation: {
    path: '/apm/ui/work-order/create',
    pageHeading: 'h1',
  },

  subHeader: {
    container: '.wo-sub-header',
    vendorField: '[data-cy="select-vendor"]',
    officeField: '[data-cy="select-office"]',
    workOrderNoField: '[data-cy="txt-workOrderNo"]',
    poNoField: '[data-cy="txt-PoNo"]',
    creationDateField: '[data-cy="txt-creationDate"]',
    sourceField: '[data-cy="txt-workOrderSource"]',
    workOrderTypeField: '[data-testid="select-single-workOrderType"]',
    sourceModuleField: '[data-cy="select-sourceModule"]',
    terminalYardField: 'input[placeholder="Search for Terminal/Yard"]',
    activityDateField: 'input[placeholder="YYYY-MM-DD"]',
    activityDateLabel: ':text("Activity Date")',
    serviceLaneField: '[data-cy="txt-laneCode"]',
    arrivalDateField: '[data-cy="txt-arrivalDate"]',
    berthDateField: '[data-cy="txt-berthDate"]',
    departureDateField: '[data-cy="txt-departureDate"]',
    callingSequenceField: '[data-testid="callingSequence"]',
    fromLocationField: '[data-testid="fromLocation"]',
    toLocationField: '[data-testid="toLocation"]',
    laneCodeField: '[data-testid="laneCode"]',
    costModeField: '[data-testid="costMode"]',
  },

  vvdFields: {
    vesselCodeField: '[data-cy="select-vvdVessel"]',
    voyageNoField: '[data-cy="select-vvdVoyage"]',
    directionField: '[data-cy="select-vvdDirection"]',
    vvdContainer: '.vvd-section',
    deleteIcon: '.delete-icon',
  },

  actionButtons: {
    saveButton: '[data-testid="work-order--actions--save"]',
    confirmButton: '[data-testid="work-order--actions--confirm"]',
    cancelButton: '[data-testid="work-order--actions--cancel"]',
    saveAsDraftButton: '[data-testid="work-order--actions--saveAsDraft"]',
    saveAsTemplateButton: '[data-testid="work-order--actions--saveAsTemplate"]',
    reactivateButton: '[data-testid="work-order--actions--reactivate"]',
    issueButton: '[data-testid="work-order--actions--issue"]',
    submitButton: '[data-testid="work-order--header--btn-submit"]',
    resetButton: '[data-testid="work-order--header--btn-reset"]',
  },

  gridTable: {
    container: '[data-testid="work-order--details--table"]',
    addRowButton: '[data-testid="work-order--details--actions-add"]',
    editCancelButton: '[data-testid="work-order--details--actions-edit-cancel"]',
    addAdditionButton: '[data-testid="work-order--details--actions-add-addition"]',
    noCostCodeMessage: 'td:has-text("No Data")',
    trashIcon: '[data-testid="Btn-wo-Delete"]',
    editIcon: '[data-testid="Btn-wo-Edit"]',
    tableRow: 'tbody tr',
    firstRow: 'tbody tr:first-child',
    workOrderItems: '[data-testid="work-order-items"]',
    costCodeField: '[data-testid="select-table-costCode"]',
    rateTypeField: '[data-testid="select-single-table-rateType"]',
    rateField: '[data-testid="input-table-rate"]',
    quantityField: '[data-testid="input-table-quantity"]',
    paginationShowItems: '[data-testid="select-single-pagination-group-number-of-items"]',
    totalResult: '[data-testid="totalWOs"]',
    emptyTable: '.table-body--empty',
    costCodeColumnHeader: '[data-testid="container-costCode"]',
    rateTypeColumnHeader: '[data-testid="container-rateType"]',
    rateColumnHeader: '[data-testid="container-rate"]',
    currencyColumnHeader: '[data-testid="container-currency"]',
    quantityColumnHeader: '[data-testid="container-quantity"]',
    amountColumnHeader: '[data-testid="container-amount"]',
  },

  collapseButton: '[data-testid="btn-collapse"]',
  collapseFieldsForm: '[data-testid="collapseFieldsForm"]',
} as const;
