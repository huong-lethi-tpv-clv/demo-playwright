import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/shared/BasePage';

import { MenuBarSelectors, getNavItemSelectorByLabel } from './MenuBarSelectors';

/**
 * MenuBarPage — APM sidebar navigation menu.
 *
 * Responsibilities:
 *  - Expand / collapse the sidebar menu
 *  - Open all category headers
 *  - Click a nav item and verify it opens in a new tab
 */
export class MenuBarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Locators ─────────────────────────────────────────────────────────────

  getCollapseExpandToggle(): Locator {
    return this.page.locator(MenuBarSelectors.collapseExpandToggle);
  }

  getCategoryHeader(key: keyof typeof MenuBarSelectors.categoryHeaders): Locator {
    return this.page.locator(MenuBarSelectors.categoryHeaders[key]);
  }

  getNavItem(key: keyof typeof MenuBarSelectors.navItems): Locator {
    return this.page.locator(MenuBarSelectors.navItems[key]);
  }

  getNavItemByLabel(label: string): Locator {
    return this.page.locator(getNavItemSelectorByLabel(label));
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async expandMenuBar(): Promise<void> {
    const toggle = this.getCollapseExpandToggle();
    // Only click if currently collapsed (aria-expanded="false" or similar)
    const isExpanded = await toggle.getAttribute('aria-expanded');
    if (isExpanded === 'false' || isExpanded === null) {
      await this.click(toggle);
    }
  }

  /**
   * Open all category headers so nav items are visible.
   * Each header is a collapsible section; click if not already expanded.
   */
  async openAllCategories(): Promise<void> {
    for (const key of Object.keys(MenuBarSelectors.categoryHeaders) as Array<
      keyof typeof MenuBarSelectors.categoryHeaders
    >) {
      const header = this.getCategoryHeader(key);
      const isVisible = await header.isVisible().catch(() => false);
      if (isVisible) {
        await header.click();
      }
    }
  }

  /**
   * Click a nav item by its user-facing label.
   * The page opens in a new tab — returns the new tab's Page instance.
   */
  async clickNavItemAndGetNewTab(label: string): Promise<Page> {
    const navItem = this.getNavItemByLabel(label);
    // Remove `target="_blank"` so we can intercept the new tab
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.click(navItem),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
