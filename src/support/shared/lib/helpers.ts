import { createHash } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Logger - Buffered async logging with scenario prefixing
// ============================================================================

export class Logger {
  private static logDir = path.join(process.cwd(), 'reports');
  private static logFile = path.join(Logger.logDir, 'test.log');
  private static stream: fs.WriteStream | null = null;
  private static buffer: string[] = [];
  private static flushing = false;
  private static scenarioTag: string | undefined;

  private static ensureStream(): void {
    if (!this.stream) {
      ensureDirectoryExists(this.logDir);
      this.stream = fs.createWriteStream(this.logFile, { flags: 'a' });
    }
  }

  static setScenario(name: string): void {
    // Slugify/shorten
    this.scenarioTag = name.replace(/\s+/g, '_').slice(0, 80);
  }

  static clearScenario(): void {
    this.scenarioTag = undefined;
  }

  static close(): void {
    if (this.stream) {
      this.flushSync();
      this.stream.end();
      this.stream = null;
    }
  }

  private static format(message: string): string {
    const timestamp = new Date().toISOString();
    const prefix = this.scenarioTag ? `[scenario=${this.scenarioTag}]` : '';
    return `[${timestamp}]${prefix} ${message}`;
  }

  private static enqueue(formatted: string): void {
    this.buffer.push(formatted + '\n');
    if (!this.flushing) {
      this.flushing = true;
      setImmediate(() => this.flushAsync());
    }
  }

  /**
   * Prepares buffer data for writing and clears the buffer
   */
  private static prepareBufferData(): { data: string; wasEmpty: boolean } {
    if (this.buffer.length === 0) {
      return { data: '', wasEmpty: true };
    }
    const data = this.buffer.join('');
    this.buffer = [];
    return { data, wasEmpty: false };
  }

  private static flushAsync(): void {
    this.ensureStream();
    if (!this.stream) return; // safety

    const { data, wasEmpty } = this.prepareBufferData();
    if (wasEmpty) {
      this.flushing = false;
      return;
    }

    this.stream.write(data, () => {
      this.flushing = false;
    });
  }

  private static flushSync(): void {
    this.ensureStream();
    if (!this.stream) return;

    const { data, wasEmpty } = this.prepareBufferData();
    if (!wasEmpty) {
      this.stream.write(data);
    }
  }

  static log(message: string): void {
    const line = this.format(message);
    // Always echo to console for real-time feedback
    // eslint-disable-next-line no-console
    console.log(line);
    this.enqueue(line);
  }

  static info(message: string): void {
    this.log(`ℹ️  INFO: ${message}`);
  }

  static error(message: string): void {
    this.log(`❌ ERROR: ${message}`);
  }

  static success(message: string): void {
    this.log(`✅ SUCCESS: ${message}`);
  }

  static warn(message: string): void {
    this.log(`⚠️  WARNING: ${message}`);
  }
}

// ============================================================================
// Wait Utilities
// ============================================================================

export async function waitFor(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function waitForCondition(
  predicate: () => Promise<boolean>,
  timeout = 3000,
  interval = 100
): Promise<void> {
  const started = Date.now();

  while (Date.now() - started <= timeout) {
    if (await predicate()) {
      return;
    }
    await new Promise(r => setTimeout(r, interval));
  }

  throw new Error('waitForCondition: timeout exceeded');
}

/**
 * Generic retry operation utility for scenarios where each attempt performs
 * an action and you want to check if it succeeded.
 *
 * Unlike `waitForCondition` (which polls a predicate), this function is
 * designed for retry scenarios where each attempt may have side effects
 * (e.g., changing form fields, clicking buttons, making API calls).
 *
 * @example
 * ```typescript
 * const { success, result } = await retryOperation({
 *   maxAttempts: 5,
 *   operation: async (attemptNumber) => {
 *     await changeSomeField(attemptNumber);
 *     return await checkIfSucceeded();
 *   },
 *   successCondition: (result) => result === true,
 * });
 * ```
 *
 * @template T The type of the result returned by the operation
 * @param options Configuration for the retry operation
 * @returns Object containing success status, final result, and attempt count
 */
export async function retryOperation<T>(options: {
  maxAttempts: number;
  operation: (attemptNumber: number) => Promise<T>;
  successCondition: (result: T) => boolean;
}): Promise<{
  success: boolean;
  result: T | null;
  attempts: number;
}> {
  const { maxAttempts, operation, successCondition } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await operation(attempt);

    if (successCondition(result)) {
      return {
        success: true,
        result,
        attempts: attempt + 1,
      };
    }
  }

  return {
    success: false,
    result: null,
    attempts: maxAttempts,
  };
}

// ============================================================================
// Filesystem Utilities
// ============================================================================

export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ============================================================================
// Secret Redaction Utilities
// ============================================================================

/**
 * Deterministic redaction that never leaks raw secret characters.
 * Modes:
 *  - strict: always returns '(redacted)'
 *  - hash (default): returns '(redacted:<sha256-8>)' to distinguish different secrets safely.
 */
export function redactSecret(value: string | undefined | null, options?: { mode?: 'strict' | 'hash' }): string {
  if (!value) return '';
  const mode = options?.mode || (process.env.E2E_REDACT_MODE as 'strict' | 'hash') || 'hash';

  if (mode === 'strict') {
    return '(redacted)';
  }

  const hash = createHash('sha256').update(value).digest('hex').slice(0, 8);
  return `(redacted:${hash})`;
}

/**
 * Heuristic: err on the side of redaction
 */
export function isLikelySecret(value: string | undefined | null): boolean {
  if (!value) return false;

  const lowered = value.toLowerCase();
  if (/(pass|pwd|secret|token|key|auth|bearer)/.test(lowered)) {
    return true;
  }

  // Mixed-case alphanumeric strings >= 10 chars (potential secrets)
  if (value.length >= 10 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value)) {
    return true;
  }

  return false;
}

/**
 * Conditional redaction helper for generic input logging
 */
export function maybeRedact(value: string): string {
  return isLikelySecret(value) ? redactSecret(value) : value;
}
