/**
 * TypeScript interfaces for API requests and responses
 * Used for type-safe mocking and data generation
 */

/**
 * User entity from the user management API
 */
export interface User {
  userId: string;
  userName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
  accountType?: string;
  email?: string;
}

/**
 * Pagination metadata returned by list APIs
 */
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * User list API response structure
 */
export interface UserListResponse {
  users: User[];
  pagination: PaginationMeta;
}

/**
 * Generic API error response
 */
export interface ApiError {
  error: string;
  code: number;
  message?: string;
  details?: unknown;
}

/**
 * API request options for mocking
 */
export interface MockOptions {
  delay?: number;
  status?: number;
  headers?: Record<string, string>;
}
