/**
 * Base GraphQL Mock Class
 *
 * Provides reusable GraphQL mocking logic for all GraphQL operations.
 * Extend this class to create domain-specific mocks.
 *
 * @example
 * export class UserManagementMock extends GraphQLMockBase {
 *   mockGetListUser(users: User[]): void {
 *     this.mockOperation('getListUser', { data: { getListUser: { user: users } } });
 *   }
 * }
 */

import { Page, Route } from '@playwright/test';

import { Logger } from '../lib';
import { MockOptions } from '../types/common';

export abstract class GraphQLMockBase {
  protected page: Page;
  protected endpoint = '/chorus/bff/graphql';
  private activeRoutes: Set<string> = new Set();

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Mock a GraphQL operation with custom response
   *
   * @param operationName - GraphQL operation name (e.g., 'getListUser')
   * @param response - Response data to return
   * @param options - Optional delay, status, headers
   */
  protected async mockOperation(
    operationName: string,
    response: Record<string, unknown>,
    options?: MockOptions
  ): Promise<void> {
    const delay = options?.delay || 0;
    const status = options?.status || 200;

    await this.page.route(
      url => url.href.includes(this.endpoint),
      async (route: Route) => {
        const method = route.request().method();
        const postData = route.request().postDataJSON();

        // Only intercept matching GraphQL operation
        if (method === 'POST' && postData && postData.operationName === operationName) {
          Logger.info(`🎯 INTERCEPTED: GraphQL ${operationName}`);

          // Simulate network delay if specified
          if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }

          await route.fulfill({
            status,
            contentType: 'application/json',
            headers: {
              'Access-Control-Allow-Origin': '*',
              ...options?.headers,
            },
            body: JSON.stringify(response),
          });
        } else {
          // Pass through other GraphQL requests
          await route.continue();
        }
      }
    );

    this.activeRoutes.add(operationName);
    Logger.info(`✅ Mocked GraphQL operation: ${operationName}`);
  }

  /**
   * Mock a GraphQL operation error
   *
   * @param operationName - GraphQL operation name
   * @param statusCode - HTTP status code (500, 403, etc.)
   * @param message - Error message
   */
  protected async mockOperationError(operationName: string, statusCode: number, message?: string): Promise<void> {
    const errorMessage = message || this.getDefaultErrorMessage(statusCode);

    // GraphQL errors are returned with 200 status but errors array
    const errorResponse = {
      errors: [
        {
          message: errorMessage,
          extensions: {
            code: this.getErrorCode(statusCode),
            http: { status: statusCode },
          },
        },
      ],
      data: null,
    };

    await this.mockOperation(operationName, errorResponse, { status: 200 });
    Logger.warn(`⚠️  Mocked GraphQL error: ${operationName} (${statusCode})`);
  }

  /**
   * Clear all mocks for this instance
   */
  async clearMocks(): Promise<void> {
    try {
      await this.page.unroute(this.endpoint);
      this.activeRoutes.clear();
      Logger.info('🧹 Cleared GraphQL mocks');
    } catch (error) {
      Logger.warn(`Could not clear mocks: ${(error as Error).message}`);
    }
  }

  /**
   * Get default error message for status code
   */
  private getDefaultErrorMessage(status: number): string {
    const messages: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden - You do not have permission to access this resource',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    };

    return messages[status] || `HTTP Error ${status}`;
  }

  /**
   * Get GraphQL error code from HTTP status
   */
  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHENTICATED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
    };

    return codes[status] || 'ERROR';
  }
}
