import { Page, Locator, expect } from '@playwright/test';

import { Logger, waitForCondition, maybeRedact } from '@support/shared/lib/helpers';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    Logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Deterministic click with visibility, enabled and retry semantics.
   */
  async click(locator: Locator, opts: { retries?: number; timeoutMs?: number } = {}): Promise<void> {
    await this.safeClick(locator, opts);
  }

  /**
   * Deterministic fill with clearing & retry semantics.
   */
  async fill(locator: Locator, text: string, opts: { retries?: number; timeoutMs?: number } = {}): Promise<void> {
    await this.safeFill(locator, text, opts);
  }

  private async safeClick(
    locator: Locator,
    { retries = 2, timeoutMs = 5000 }: { retries?: number; timeoutMs?: number }
  ): Promise<void> {
    let attempt = 0;
    const start = Date.now();
    const action = async () => {
      await locator.waitFor({ state: 'visible', timeout: timeoutMs });
      // Additional enabled check where possible
      try {
        await expect(locator).toBeEnabled({ timeout: 1000 });
      } catch (_) {
        // proceed; some roles may not support enabled state
      }
      await locator.click({ timeout: timeoutMs / 2 });
    };

    // retry loop
    while (attempt <= retries && Date.now() - start <= timeoutMs * (retries + 1)) {
      try {
        Logger.info(`Clicking element (attempt ${attempt + 1}): ${locator}`);
        await action();
        return;
      } catch (err) {
        attempt++;
        if (attempt > retries || Date.now() - start > timeoutMs * (retries + 1)) {
          Logger.error(`safeClick failed after ${attempt} attempts: ${(err as Error).message}`);
          throw err;
        }
        await waitForCondition(async () => true, 50, 25); // micro backoff
      }
    }
  }

  private async safeFill(
    locator: Locator,
    text: string,
    { retries = 2, timeoutMs = 5000 }: { retries?: number; timeoutMs?: number }
  ): Promise<void> {
    let attempt = 0;
    const start = Date.now();
    // retry loop
    while (attempt <= retries && Date.now() - start <= timeoutMs * (retries + 1)) {
      try {
        Logger.info(`Filling text (attempt ${attempt + 1}): ${maybeRedact(text)}`);
        await locator.waitFor({ state: 'visible', timeout: timeoutMs });
        await locator.fill('');
        await locator.type(text, { delay: 10 });
        // verify value
        const current = await locator.inputValue().catch(() => '');
        if (current === text) return;
        throw new Error(`Value mismatch after fill: expected='${text}' actual='${current}'`);
      } catch (err) {
        attempt++;
        if (attempt > retries || Date.now() - start > timeoutMs * (retries + 1)) {
          Logger.error(`safeFill failed after ${attempt} attempts: ${(err as Error).message}`);
          throw err;
        }
        await waitForCondition(async () => true, 75, 25);
      }
    }
  }

  async getText(locator: Locator): Promise<string> {
    const text = (await locator.textContent()) || '';
    Logger.info(`Getting text: ${text}`);
    return text;
  }

  async isVisible(locator: Locator): Promise<boolean> {
    const visible = await locator.isVisible();
    Logger.info(`Element visible: ${visible}`);
    return visible;
  }

  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    Logger.info(`Waiting for element with timeout: ${timeout}ms`);
    await locator.waitFor({ state: 'visible', timeout });
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    Logger.info(`Page title: ${title}`);
    return title;
  }

  async getUrl(): Promise<string> {
    const url = this.page.url();
    Logger.info(`Current URL: ${url}`);
    return url;
  }

  async takeScreenshot(path: string): Promise<void> {
    Logger.info(`Taking screenshot: ${path}`);
    await this.page.screenshot({ path, fullPage: true });
  }

  async waitForNavigation(): Promise<void> {
    Logger.info('Waiting for navigation...');
    await this.page.waitForLoadState('networkidle');
  }

  async pressKey(key: string): Promise<void> {
    Logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  async waitUntilLoaderIsInvisible(): Promise<void> {
    const loader = this.page.locator('div.table-loading:has-text("Loading")');
    await loader.waitFor({ state: 'hidden', timeout: 10000 });
  }
}
