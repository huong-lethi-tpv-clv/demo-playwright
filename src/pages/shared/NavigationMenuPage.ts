import { Page, Locator } from '@playwright/test';

import { Logger } from '@support/shared/lib/helpers';

import { BasePage } from './BasePage';

/**
 * Selectors for the OmLayout sidebar navigation (om-ui component).
 *
 * The om-ui sidebar uses CSS classes to manage state:
 * - 'expaned' (sic) on local-menu-container = pinned open
 * - 'hover-expaned' = temporarily expanded due to mouse hover
 * - neither = collapsed
 */
export const NavigationMenuSelectors = {
  collapseIconContainer: '.om-com-collapse-icon-container',
  localMenuContainer: '.om-com-local-menu-container',
};

export class NavigationMenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getCollapseToggle(): Locator {
    return this.page.locator(NavigationMenuSelectors.collapseIconContainer);
  }

  getMenuContainer(): Locator {
    return this.page.locator(NavigationMenuSelectors.localMenuContainer);
  }

  /** Click the toggle to collapse the sidebar. Ensures it's pinned-expanded first. */
  async clickCollapseMenu(): Promise<void> {
    // The sidebar may start in hover-expanded or collapsed state.
    // We need to ensure it's pinned expanded first, then click to collapse.
    const menuClass = await this.page.evaluate(() => {
      return document.querySelector('.om-com-local-menu-container')?.className ?? '';
    });
    const isPinned = menuClass.includes('expaned') && !menuClass.includes('hover-expaned');

    const toggle = this.getCollapseToggle();
    await toggle.waitFor({ state: 'visible', timeout: 10000 });

    if (!isPinned) {
      // Menu is not pinned open — click once to pin it, then again to collapse
      await toggle.click();
      await this.page.waitForTimeout(300);
    }
    // Now pinned — click to collapse
    await toggle.click();
    await this.page.waitForTimeout(300);
    Logger.info('Clicked the toggle to collapse the sidebar');
  }

  /** Click the toggle to expand (pin) the sidebar */
  async clickExpandMenu(): Promise<void> {
    const toggle = this.getCollapseToggle();
    await toggle.waitFor({ state: 'visible', timeout: 10000 });
    await toggle.click();
    await this.page.waitForTimeout(300);

    // Verify it's now pinned expanded; if not, click again
    const isPinned = await this.isPinnedExpanded();
    if (!isPinned) {
      await toggle.click();
      await this.page.waitForTimeout(300);
    }
    Logger.info('Clicked the toggle to expand the sidebar');
  }

  /**
   * Check if the sidebar is pinned open (expanded) by examining CSS classes.
   * The 'expaned' class (typo in om-ui) indicates the menu is pinned open.
   * The 'hover-expaned' class means it's only temporarily expanded due to hover.
   */
  async isPinnedExpanded(): Promise<boolean> {
    const classList = await this.getMenuClassList();
    return classList.includes('expaned') && !classList.includes('hover-expaned');
  }

  /**
   * Check if the sidebar is collapsed (not pinned open).
   * Collapsed = no 'expaned' class, or only 'hover-expaned'.
   */
  async isCollapsed(): Promise<boolean> {
    return !(await this.isPinnedExpanded());
  }

  private async getMenuClassList(): Promise<string> {
    return await this.page.evaluate(() => {
      return document.querySelector('.om-com-local-menu-container')?.className ?? '';
    });
  }

  /** Get a menu label locator by text within the sidebar */
  getMenuLabel(text: string): Locator {
    return this.getMenuContainer().locator(`text=${text}`).first();
  }

  /** Get the "Object Inquiry" sub-menu item locator */
  getObjectInquirySubMenu(): Locator {
    return this.getMenuContainer().locator('text=Object Inquiry').first();
  }
}
