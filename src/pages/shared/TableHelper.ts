import { Locator, Page, expect } from '@playwright/test';

import { BasePage } from './BasePage';

/**
 * Generic table helper class for common table operations
 * Provides reusable methods for extracting and manipulating table data
 */
export class TableHelper extends BasePage {
  private tableLocator: Locator;
  private dataRowSelector: string | undefined;

  constructor(page: Page, tableSelector: string, dataRowSelector?: string) {
    super(page);
    this.tableLocator = this.page.locator(tableSelector);
    this.dataRowSelector = dataRowSelector;
  }

  /**
   * Gets text content from multiple locators
   * @param locator The Locator to extract text from
   * @returns Array of trimmed text content
   */
  private async getListItemText(locator: Locator): Promise<string[]> {
    const listItemText: string[] = [];
    const count = await locator.count();

    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).textContent();
      listItemText.push(text?.trim() || '');
    }

    return listItemText;
  }

  /**
   * Gets the row count in the table
   * @param rowSelector CSS/XPath selector for table rows
   * @returns Number of rows
   */
  async getRowCount(rowSelector: string): Promise<number> {
    const rows = this.tableLocator.locator(rowSelector);
    return await rows.count();
  }

  /**
   * Checks if table contains any data
   * @param rowSelector CSS/XPath selector for table rows
   * @returns True if table has rows, false otherwise
   */
  async hasTableData(rowSelector: string): Promise<boolean> {
    const count = await this.getRowCount(rowSelector);
    return count > 0;
  }

  /**
   * Waits for table to be visible and loaded
   */
  async waitForTableLoaded(): Promise<void> {
    await this.tableLocator.waitFor({ state: 'visible', timeout: 5000 });
    await this.waitUntilLoaderIsInvisible();
  }

  /**
   * Gets text content from a specific row and column
   * @param rowSelector CSS/XPath selector for row
   * @param columnIndex Index of the column (0-based)
   * @returns Text content of the cell
   */
  async getCellValue(rowSelector: string, columnIndex: number): Promise<string> {
    const row = this.tableLocator.locator(rowSelector).first();
    const cell = row.locator('td, th').nth(columnIndex);
    return await this.getText(cell);
  }

  /**
   * Gets background color of a specific element
   * @param elementSelector CSS/XPath selector for the element
   * @returns Background color as a CSS value
   */
  async getBackgroundColor(elementSelector: string): Promise<string> {
    const element = this.page.locator(elementSelector);
    const backgroundColor = await element.evaluate((el: HTMLElement) => {
      return getComputedStyle(el).getPropertyValue('background-color').trim();
    });
    return backgroundColor;
  }

  /**
   * Gets the count of table data rows
   * @returns Number of data rows in the table
   */
  async getTableDataCount(): Promise<number> {
    if (!this.dataRowSelector) {
      throw new Error('Data row selector not provided to TableHelper');
    }
    const dataRowLocator = this.page.locator(this.dataRowSelector);
    await this.waitForElement(dataRowLocator);
    return await dataRowLocator.count();
  }

  /**
   * Checks if table data is visible
   * @returns True if table data is visible, false otherwise
   */
  async isTableDataVisible(): Promise<boolean> {
    if (!this.dataRowSelector) {
      throw new Error('Data row selector not provided to TableHelper');
    }
    const dataRowLocator = this.page.locator(this.dataRowSelector);
    return await dataRowLocator.isVisible().catch(() => false);
  }

  /**
   * Gets column values by mapping column names to selectors
   * @param columnName The name of the column to retrieve values for
   * @param columnMap Map of column names to their CSS selectors
   * @returns Array of text content from cells in the column
   */
  async getColumnValuesByName(columnName: string, columnMap: Record<string, string>): Promise<string[]> {
    const selector = columnMap[columnName];
    if (!selector) {
      throw new Error(`No column selector defined for: ${columnName}`);
    }

    // Wait for table to be visible and loaded
    await this.tableLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Chain the column selector to the table locator
    const columnLocator = this.tableLocator.locator(selector);
    return await this.getListItemText(columnLocator);
  }

  /**
   * Verifies that table data exists by checking row count
   * Passes if >= 1 rows exist in the table
   * @param columnSelector CSS/XPath selector for the column to verify (defaults to data row selector)
   */
  async verifyTableDataExists(columnSelector?: string): Promise<void> {
    const selector = columnSelector || this.dataRowSelector;
    if (!selector) {
      throw new Error('Column selector not provided and no data row selector configured');
    }

    const columnLocator = this.page.locator(selector);

    // Check row count - passes if >= 1 rows exist
    const count = await columnLocator.count();
    expect(count).toBeGreaterThan(0);
  }
}
