/**
 * Fixture Loader
 *
 * Centralized fixture loading with caching and type safety.
 * Provides convenient methods for loading test data from fixtures.
 *
 * @example
 * // Load user credentials
 * const creds = FixtureLoader.loadUserCredentials('validUser');
 *
 * // Load API response
 * const response = FixtureLoader.loadApiResponse<UserListResponse>('users', 'list-success');
 *
 * // Load custom fixture
 * const data = FixtureLoader.load<MyType>('custom/path/data.json');
 */

import * as fs from 'fs';
import * as path from 'path';

import { testConfig } from '@config/testConfig';

import { Logger, redactSecret } from './helpers';

export interface UserCredentials {
  username: string;
  password: string;
  description?: string;
}

export interface TestData {
  [key: string]: UserCredentials;
}

export interface LoadOptions {
  forceReload?: boolean;
  basePath?: string;
}

export class FixtureLoader {
  private static cache = new Map<string, unknown>();
  private static readonly FIXTURES_BASE = path.join(process.cwd(), testConfig.paths.fixtures);

  /**
   * Load fixture from file with caching
   *
   * @param relativePath - Path relative to fixtures/data/ directory
   * @param options - Load options (forceReload, basePath)
   * @returns Parsed fixture data
   */
  static load<T>(relativePath: string, options: LoadOptions = {}): T {
    const { forceReload = false, basePath = this.FIXTURES_BASE } = options;
    const absolutePath = path.resolve(basePath, relativePath);
    const cacheKey = absolutePath;

    try {
      // Return cached data if available
      if (!forceReload && this.cache.has(cacheKey)) {
        Logger.info(`📦 Using cached fixture: ${relativePath}`);
        return this.cache.get(cacheKey) as T;
      }

      // Load from file
      Logger.info(`📂 Loading fixture from: ${relativePath}`);
      const fileContent = fs.readFileSync(absolutePath, 'utf-8');
      const data = JSON.parse(fileContent);

      // Cache the data
      this.cache.set(cacheKey, data);
      Logger.success(`Fixture loaded successfully: ${relativePath}`);

      return data as T;
    } catch (error) {
      Logger.error(`Failed to load fixture from ${relativePath}: ${error}`);
      throw error;
    }
  }

  /**
   * Load user credentials from login fixtures
   *
   * @param userKey - User key in users.json (e.g., 'validUser', 'wrongPassword')
   * @returns User credentials
   */
  static loadUserCredentials(userKey: string): UserCredentials {
    const testData = this.load<TestData>('authentication/fixtures/login/users.json');

    if (!testData[userKey]) {
      throw new Error(`User credentials not found for key: ${userKey}`);
    }

    const creds = { ...testData[userKey] };

    // Override with environment variables if available (for CI/CD)
    // E2E_USER and E2E_PASS take precedence over fixture file
    if (userKey === 'validUser') {
      if (process.env.E2E_USER) {
        creds.username = process.env.E2E_USER;
      }
      if (process.env.E2E_PASS) {
        creds.password = process.env.E2E_PASS;
      }
    }

    // Log with redacted password
    Logger.info(
      `Loaded credentials for: ${userKey} ` + `(username=${creds.username}, password=${redactSecret(creds.password)})`
    );

    return creds;
  }

  /**
   * Load all users from login fixtures
   *
   * @returns All user credentials
   */
  static loadAllUsers(): TestData {
    return this.load<TestData>('authentication/fixtures/login/users.json');
  }

  /**
   * Load API response mock from fixtures
   *
   * @example
   * const success = FixtureLoader.loadApiResponse<UserListResponse>('users', 'list-success');
   * const empty = FixtureLoader.loadApiResponse<UserListResponse>('users', 'list-empty');
   * const error = FixtureLoader.loadApiResponse<ApiError>('users', 'list-error');
   *
   * @param domain - API domain (e.g., 'users', 'auth', 'workflows')
   * @param scenario - Scenario name (e.g., 'list-success', 'list-empty', 'error')
   * @returns Parsed API response object
   */
  static loadApiResponse<T>(domain: string, scenario: string): T {
    const relativePath = `${domain}/fixtures/${scenario}.json`;
    return this.load<T>(relativePath);
  }

  /**
   * Clear all cached fixtures
   * Useful when fixtures are modified during test execution
   */
  static clearCache(): void {
    this.cache.clear();
    Logger.info('🧹 Fixture cache cleared');
  }

  /**
   * Clear specific cached fixture
   *
   * @param relativePath - Path to clear from cache
   */
  static clearCacheFor(relativePath: string): void {
    const absolutePath = path.resolve(this.FIXTURES_BASE, relativePath);
    this.cache.delete(absolutePath);
    Logger.info(`🧹 Cleared cache for: ${relativePath}`);
  }

  /**
   * Check if fixture exists
   *
   * @param relativePath - Path relative to fixtures/data/
   * @returns true if fixture file exists
   */
  static exists(relativePath: string): boolean {
    const absolutePath = path.resolve(this.FIXTURES_BASE, relativePath);
    return fs.existsSync(absolutePath);
  }

  /**
   * List all fixtures in a directory
   *
   * @param directoryPath - Directory path relative to fixtures/data/
   * @returns Array of fixture filenames
   */
  static list(directoryPath: string): string[] {
    const absolutePath = path.resolve(this.FIXTURES_BASE, directoryPath);

    if (!fs.existsSync(absolutePath)) {
      return [];
    }

    return fs.readdirSync(absolutePath).filter(file => file.endsWith('.json'));
  }
}
