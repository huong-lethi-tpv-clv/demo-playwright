import { Page, Locator } from '@playwright/test';

import { testConfig } from '@config/testConfig';
import { BasePage } from '@pages/shared';
import { waitForCondition } from '@support/shared';

export class LoginPage extends BasePage {
  // Common validation element selectors
  private static readonly VALIDATION_SELECTORS = '[role="alert"], .alert, .error, .error-message';

  constructor(page: Page) {
    super(page);
  }

  // ============================================================================
  // Locator Helpers
  // ============================================================================

  getUsernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'User ID' });
  }

  getPasswordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  getSignInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  getRememberMeCheckbox(): Locator {
    return this.page.getByRole('checkbox', { name: 'Remember me' });
  }

  // ============================================================================
  // Navigation
  // ============================================================================

  /**
   * Navigate to the login page
   */
  async navigateToLogin(): Promise<void> {
    // Navigate explicitly to login path (baseUrl may already include trailing slash)
    const loginUrl = new URL('/chorus/login', testConfig.baseUrl).toString();
    await this.page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Get the current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  // ============================================================================
  // Form Interactions
  // ============================================================================

  /**
   * Fill the username field
   */
  async fillUsername(username: string): Promise<void> {
    await this.fill(this.getUsernameInput(), username);
  }

  /**
   * Fill the password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.fill(this.getPasswordInput(), password);
  }

  /**
   * Click the Sign In button
   */
  async clickSignIn(): Promise<void> {
    await this.click(this.getSignInButton());
  }

  /**
   * Check Remember Me checkbox
   */
  async checkRememberMe(): Promise<void> {
    const checkbox = this.getRememberMeCheckbox();
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /**
   * Complete login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  // ============================================================================
  // Password Visibility
  // ============================================================================

  /**
   * Toggle password visibility
   * Clicks the eye button next to the password field
   */
  async togglePasswordVisibility(): Promise<void> {
    const passwordField = this.getPasswordInput();
    const container = passwordField.locator('..');

    // Try to find toggle button with accessible name first
    let eyeButton = container.getByRole('button', { name: /show|hide/i });

    // Fallback: any visible button in the container
    if (!(await eyeButton.first().isVisible())) {
      eyeButton = container.locator('button:visible');
    }

    const firstButton = eyeButton.first();
    if (!(await firstButton.isVisible())) {
      throw new Error('Password visibility toggle button not found');
    }

    await firstButton.click();
  }

  /**
   * Check if password is visible (input type is 'text')
   */
  async isPasswordVisible(): Promise<boolean> {
    const inputType = await this.getPasswordInput().getAttribute('type');
    return inputType === 'text';
  }

  // ============================================================================
  // Validation & Verification
  // ============================================================================

  /**
   * Verify if user is on the login page
   */
  async isOnLoginPage(): Promise<boolean> {
    return await this.isVisible(this.getSignInButton());
  }

  /**
   * Check if a specific field has aria-invalid attribute
   */
  async isFieldInvalid(field: 'user id' | 'password'): Promise<boolean> {
    const locator = field === 'user id' ? this.getUsernameInput() : this.getPasswordInput();
    const ariaInvalid = await locator.getAttribute('aria-invalid');
    return ariaInvalid === 'true';
  }

  /**
   * Returns a locator for a validation message text
   * Uses multiple strategies to find validation messages
   */
  getValidationMessageLocator(message: string): Locator {
    const escaped = message.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');

    // Strategy 1: Exact text match
    const exact = this.page.getByText(message, { exact: true });

    // Strategy 2: Case-insensitive match
    const caseInsensitive = this.page.getByText(regex);

    // Strategy 3: Alert/error regions containing the message
    const alertRegion = this.page.locator(LoginPage.VALIDATION_SELECTORS).filter({ hasText: regex });

    return exact.or(caseInsensitive).or(alertRegion);
  }

  /**
   * Check if a specific validation message is visible
   */
  async isValidationMessageVisible(message: string): Promise<boolean> {
    const locator = this.getValidationMessageLocator(message);
    if (await locator.isVisible()) {
      return true;
    }

    // Fallback: scan body text for near-match (ignoring case/whitespace)
    const bodyText = (await this.page.locator('body').innerText()).toLowerCase();
    const normalizedExpected = message.toLowerCase().replaceAll(/\s+/g, ' ').trim();
    return bodyText.includes(normalizedExpected);
  }

  // ============================================================================
  // Wait Helpers
  // ============================================================================

  /**
   * Wait for navigation after login
   */
  async waitForLoginSuccess(urlPattern: string | RegExp = /\/chorus$/): Promise<void> {
    // Handle possible callbackUrl redirect flows. Accept landing variants.
    const patterns: (string | RegExp)[] = [urlPattern, /\/chorus(\/?$)/, /\/chorus\/home/, /\/chorus\/dashboard/];
    await waitForCondition(
      async () => {
        const current = this.page.url();
        return patterns.some(p => (typeof p === 'string' ? current.includes(p) : p.test(current)));
      },
      15000,
      300
    );
  }

  /**
   * Wait for username field to be ready
   */
  async waitForUsernameField(timeout = 10000): Promise<void> {
    await this.waitForElement(this.getUsernameInput(), timeout);
  }
}
