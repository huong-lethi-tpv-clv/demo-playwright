/**
 * Support Library Barrel Export
 *
 * Centralized exports for all support utilities
 */

// Helpers and logging
export {
  Logger,
  waitFor,
  ensureDirectoryExists,
  waitForCondition,
  retryOperation,
  redactSecret,
  isLikelySecret,
  maybeRedact,
} from './helpers';

// Fixture loading
export { FixtureLoader, UserCredentials, TestData, LoadOptions } from './fixture-loader';

// Authentication management
export { AuthenticationManager, Credentials, StorageState } from './AuthenticationManager';
