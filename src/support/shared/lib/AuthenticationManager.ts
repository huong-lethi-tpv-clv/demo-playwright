import * as fs from 'fs';
import * as path from 'path';

import { Page, BrowserContext } from '@playwright/test';

import { LoginPage } from '@pages/authentication/LoginPage';

export interface Credentials {
  username: string;
  password: string;
}

export type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

/**
 * Manages authentication state and login operations.
 * Handles credential resolution, login flow, state caching, and persistence.
 */
export class AuthenticationManager {
  private cachedStorageState: StorageState | undefined;
  private authStoragePath: string;

  constructor(authStoragePath: string = 'playwright/.auth/user.json') {
    this.authStoragePath = authStoragePath;
  }

  /**
   * Ensure the user is authenticated. Handles login if needed.
   * @param page - The page instance to use for login
   * @param context - The browser context for storing auth state
   * @param isAlreadyAuthenticated - Flag indicating if already authenticated in this session
   * @returns Promise that resolves when authentication is confirmed
   */
  async ensureAuthenticated(page: Page, context: BrowserContext, isAlreadyAuthenticated?: boolean): Promise<void> {
    // Fast path: already authenticated in this session
    if (this.cachedStorageState && isAlreadyAuthenticated) {
      return;
    }

    if (isAlreadyAuthenticated) {
      return;
    }

    const credentials = this.getCredentials();
    const wasAlreadyAuthenticated = await this.checkIfAlreadyAuthenticated(page);

    if (wasAlreadyAuthenticated) {
      // eslint-disable-next-line no-console
      console.log('✅ Already authenticated (redirected from login page)');
      return;
    }

    await this.performLogin(page, credentials);
    await this.verifyAuthentication(page);
    await this.saveAuthState(context);
  }

  /**
   * Load authentication state from persistent storage if available.
   * @returns StorageState if available, undefined otherwise
   */
  async loadAuthState(): Promise<StorageState | undefined> {
    const authFile = path.join(process.cwd(), this.authStoragePath);

    if (fs.existsSync(authFile)) {
      try {
        const state = JSON.parse(fs.readFileSync(authFile, 'utf-8')) as StorageState;
        this.cachedStorageState = state;
        return state;
      } catch (e) {
        console.warn(`⚠️  Could not load auth state from disk: ${(e as Error).message}`);
      }
    }

    return this.cachedStorageState;
  }

  /**
   * Get the in-memory cached storage state.
   * @returns Cached storage state or undefined
   */
  getCachedState(): StorageState | undefined {
    return this.cachedStorageState;
  }

  /**
   * Save authentication state to both memory and disk.
   * @param context - The browser context to extract state from
   */
  async saveAuthState(context: BrowserContext): Promise<void> {
    try {
      // Save to memory cache
      this.cachedStorageState = await context.storageState();

      // Save to persistent file
      const authFile = path.join(process.cwd(), this.authStoragePath);
      const authDir = path.dirname(authFile);

      // Ensure directory exists
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }

      // Save storage state to disk
      await context.storageState({ path: authFile });
      // eslint-disable-next-line no-console
      console.log(`✅ Authentication state saved to ${authFile} for future test runs`);
    } catch (e) {
      // Non-fatal - tests can still proceed with in-memory state
      console.warn(`⚠️  Could not save auth state to disk: ${(e as Error).message}`);
    }
  }

  /**
   * Resolve credentials from environment variables.
   * Priority order: E2E_USER/E2E_PASS > USERNAME/PASSWORD
   * @returns Credentials object
   * @throws Error if credentials are missing
   */
  private getCredentials(): Credentials {
    const username = process.env.E2E_USER || process.env.USERNAME;
    const password = process.env.E2E_PASS || process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('Missing credentials: set E2E_USER and E2E_PASS (preferred) or USERNAME / PASSWORD in env');
    }

    return { username, password };
  }

  /**
   * Check if already authenticated by navigating to login and checking for redirect.
   * @param page - The page instance
   * @returns true if already authenticated, false otherwise
   */
  private async checkIfAlreadyAuthenticated(page: Page): Promise<boolean> {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    // Wait for navigation to settle — either we land on login or get redirected
    await page.waitForLoadState('domcontentloaded');

    // Check if we're still on the login page or got redirected (already authenticated)
    const currentUrl = page.url();
    return !currentUrl.includes('/login');
  }

  /**
   * Perform login operation.
   * @param page - The page instance
   * @param credentials - User credentials
   * @throws Error if login fails
   */
  private async performLogin(page: Page, credentials: Credentials): Promise<void> {
    const loginPage = new LoginPage(page);

    // Wait for username field and perform login
    await loginPage.waitForUsernameField();
    await loginPage.login(credentials.username, credentials.password);

    // Wait for post-login URL pattern
    try {
      await loginPage.waitForLoginSuccess(/chorus|home|dashboard/i);
    } catch (e) {
      // Capture screenshot to help diagnose login flake
      const screenshotPath = `./reports/screenshots/login-failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.error(`❌ Login failed. Screenshot saved to ${screenshotPath}`);
      throw e;
    }
  }

  /**
   * Verify authentication by checking session cookies and URL state.
   * @param page - The page instance
   */
  private async verifyAuthentication(page: Page): Promise<void> {
    // Wait for the page to finish loading after login
    await page.waitForLoadState('domcontentloaded');

    // Verify we're no longer on the login page (session cookies and auth tokens are set)
    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
  }
}
