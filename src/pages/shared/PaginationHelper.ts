import { Locator, Page, expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { TableHelper } from './TableHelper';

/**
 * Generic pagination helper class for common pagination operations
 * Provides reusable methods for navigating and managing paginated content
 */
export interface PaginationSelectors {
  currentPageInput: string;
  nextButton: string;
  previousButton: string;
  firstButton: string;
  lastButton: string;
  totalPagesText: string;
}

export class PaginationHelper extends BasePage {
  private selectors: PaginationSelectors;

  constructor(page: Page, selectors: PaginationSelectors) {
    super(page);
    this.selectors = selectors;
  }

  /**
   * Helper function to get pagination helper from available page fixtures
   * Checks provided fixtures for one with paginationHelper
   * @param fixtures Object containing page fixtures with optional paginationHelper and tableHelper
   * @returns Object with paginationHelper and optional tableHelper, or null if not found
   */
  static getPaginationContext(fixtures: {
    agreementInquiryListPage?: { paginationHelper?: PaginationHelper; tableHelper?: TableHelper };
    tariffObjectPage?: { paginationHelper?: PaginationHelper; tableHelper?: TableHelper };
  }): {
    paginationHelper: PaginationHelper;
    tableHelper?: TableHelper;
  } | null {
    const pageFixtures = ['agreementInquiryListPage', 'tariffObjectPage'];

    for (const fixtureName of pageFixtures) {
      const pageObject = fixtures[fixtureName as keyof typeof fixtures];
      if (pageObject?.paginationHelper) {
        return {
          paginationHelper: pageObject.paginationHelper,
          tableHelper: pageObject.tableHelper,
        };
      }
    }

    return null;
  }

  /**
   * Gets the current page input locator
   * @returns Locator for the current page input element
   */
  getCurrentPageInput(): Locator {
    return this.page.locator(this.selectors.currentPageInput);
  }

  /**
   * Gets the current page number from the page input field
   * @returns Current page number
   */
  async getCurrentPageNumber(): Promise<number> {
    const pageInput = this.page.locator(this.selectors.currentPageInput);
    const value = await pageInput.inputValue();
    return parseInt(value, 10);
  }

  /**
   * Gets the total number of pages
   * @returns Total pages count
   */
  async getTotalPages(): Promise<number> {
    const totalPagesText = await this.getTotalPagesText();
    // Extract number from text like "of 5" or "Total: 5"
    const match = totalPagesText.match(/(\d+)/);
    if (!match) {
      throw new Error(`Could not parse total pages from: ${totalPagesText}`);
    }
    return parseInt(match[1], 10);
  }

  /**
   * Gets the total pages text
   * @returns Total pages text content
   */
  async getTotalPagesText(): Promise<string> {
    const totalPagesElement = this.page.locator(this.selectors.totalPagesText);
    return await this.getText(totalPagesElement);
  }

  /**
   * Clicks the next page button
   */
  async clickNextPage(): Promise<void> {
    await this.click(this.getNextPageButton());
    await this.waitUntilLoaderIsInvisible();
  }

  /**
   * Clicks the previous page button
   */
  async clickPreviousPage(): Promise<void> {
    await this.click(this.getPreviousPageButton());
    await this.waitUntilLoaderIsInvisible();
  }

  /**
   * Clicks the first page button
   */
  async clickFirstPage(): Promise<void> {
    await this.click(this.getFirstPageButton());
    await this.waitUntilLoaderIsInvisible();
  }

  /**
   * Clicks the last page button
   */
  async clickLastPage(): Promise<void> {
    await this.click(this.getLastPageButton());
    await this.waitUntilLoaderIsInvisible();
  }

  /**
   * Checks if a pagination button is visible
   * @param button Button type: 'next' | 'previous' | 'first' | 'last'
   * @returns True if button is visible
   */
  async isPaginationButtonVisible(button: 'next' | 'previous' | 'first' | 'last'): Promise<boolean> {
    const buttonElement = this.getPaginationButton(button);
    return await buttonElement.isVisible().catch(() => false);
  }

  /**
   * Checks if a pagination button is enabled
   * @param button Button type: 'next' | 'previous' | 'first' | 'last'
   * @returns True if button is enabled
   */
  async isPaginationButtonEnabled(button: 'next' | 'previous' | 'first' | 'last'): Promise<boolean> {
    const buttonElement = this.getPaginationButton(button);
    return await buttonElement.isEnabled().catch(() => false);
  }

  /**
   * Verifies the state of a pagination button
   * @param button Button type: 'next' | 'previous' | 'first' | 'last'
   * @param isEnabled Expected enabled state
   */
  async verifyButtonState(button: 'next' | 'previous' | 'first' | 'last', isEnabled: boolean): Promise<void> {
    const buttonElement = this.getPaginationButton(button);

    // Verify button is visible
    await expect(buttonElement).toBeVisible();

    // Verify button enabled state matches expectation
    const buttonEnabled = await buttonElement.isEnabled();
    expect(buttonEnabled).toBe(isEnabled);
  }

  /**
   * Gets a pagination button locator by type
   * @param button Button type: 'next' | 'previous' | 'first' | 'last'
   * @returns Locator for the button
   */
  private getPaginationButton(button: 'next' | 'previous' | 'first' | 'last'): Locator {
    const buttonSelectorMap: Record<string, string> = {
      next: this.selectors.nextButton,
      previous: this.selectors.previousButton,
      first: this.selectors.firstButton,
      last: this.selectors.lastButton,
    };

    const selector = buttonSelectorMap[button];
    if (!selector) {
      throw new Error(`Invalid button type: ${button}`);
    }

    return this.page.locator(selector);
  }

  /**
   * Gets the next page button locator
   */
  private getNextPageButton(): Locator {
    return this.page.locator(this.selectors.nextButton);
  }

  /**
   * Gets the previous page button locator
   */
  private getPreviousPageButton(): Locator {
    return this.page.locator(this.selectors.previousButton);
  }

  /**
   * Gets the first page button locator
   */
  private getFirstPageButton(): Locator {
    return this.page.locator(this.selectors.firstButton);
  }

  /**
   * Gets the last page button locator
   */
  private getLastPageButton(): Locator {
    return this.page.locator(this.selectors.lastButton);
  }

  /**
   * Verifies the state of the pagination based on page type
   * @param pageType Page type: 'Next' | 'Previous' | 'Last' | 'First'
   * @param tableHelper Optional table helper for verifying table data exists
   */
  async verifyPaginationState(
    pageType: 'Next' | 'Previous' | 'Last' | 'First',
    tableHelper?: { verifyTableDataExists(): Promise<void> }
  ): Promise<void> {
    const currentPageValue = await this.getCurrentPageInput().inputValue();
    const currentPage = parseInt(currentPageValue, 10);
    const totalPages = await this.getTotalPages();

    switch (pageType) {
      case 'Next':
        expect(currentPage).toBeGreaterThan(1);
        break;
      case 'Previous':
        expect(currentPage).toBeGreaterThan(0);
        break;
      case 'Last':
        expect(currentPage).toBe(totalPages);
        await this.verifyButtonState('next', false);
        await this.verifyButtonState('previous', true);
        break;
      case 'First':
        expect(currentPage).toBe(1);
        await this.verifyButtonState('previous', false);
        if (totalPages > 1) {
          await this.verifyButtonState('next', true);
        }
        break;
    }

    if (tableHelper) {
      await tableHelper.verifyTableDataExists();
    }
  }
}
