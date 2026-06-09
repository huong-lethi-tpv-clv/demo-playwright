/**
 * Selectors for APM Menu Bar navigation.
 *
 * ⚠️  TODO: Verify each selector against the live APM UI.
 *     data-testid values taken from Cypress accessToCostCodeList.js page object.
 */
export const MenuBarSelectors = {
  collapseExpandToggle: '[data-testid="minimize-nav-menu-button"]',

  categoryHeaders: {
    invoiceManagement: '[data-testid="header-Invoice-Management"]',
    invoiceSetup: '[data-testid="header-Invoice-Setup"]',
    costCodeManagement: '[data-testid="header-Cost-Code-Management"]',
    workOrderManagement: '[data-testid="header-Work-Order-Management"]',
  },

  navItems: {
    invoiceCreation: '[data-testid="navItem-Invoice-Creation"]',
    invoiceInquiry: '[data-testid="navItem-Invoice-Inquiry"]',
    costCodeList: '[data-testid="navItem-Cost-Code-List"]',
    workOrderCreation: '[data-testid="navItem-Work-Order-Creation"]',
    vendorCostDescriptionMapping:
      '[data-testid="navItem-Vendor/Yard-Cost-Description-Mapping"]',
    approvalTierSetting: '[data-testid="navItem-Approval-Tier-Setting"]',
  },
} as const;

/** Maps user-facing label → nav item data-testid selector */
export function getNavItemSelectorByLabel(label: string): string {
  const map: Record<string, string> = {
    'Invoice Creation': MenuBarSelectors.navItems.invoiceCreation,
    'Invoice Inquiry': MenuBarSelectors.navItems.invoiceInquiry,
    'Cost Code List': MenuBarSelectors.navItems.costCodeList,
    'Work Order Creation': MenuBarSelectors.navItems.workOrderCreation,
    'Vendor/Yard Cost Description Mapping':
      MenuBarSelectors.navItems.vendorCostDescriptionMapping,
    'Approval Tier Setting': MenuBarSelectors.navItems.approvalTierSetting,
  };
  const selector = map[label];
  if (!selector)
    throw new Error(
      `Unknown menu label: "${label}". Add it to getNavItemSelectorByLabel.`
    );
  return selector;
}
