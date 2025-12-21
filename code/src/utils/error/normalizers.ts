import { AxiosError } from 'axios';
import { ClientError } from 'graphql-request';
import { ErrorSource, ErrorType, NormalizedError, ErrorContext } from './types';

export class ErrorNormalizer {
  /**
   * Normalize Axios REST API errors
   */
  static normalizeRestError(error: AxiosError, context: ErrorContext): NormalizedError {
    const statusCode = error.response?.status;
    const responseData = error.response?.data as Record<string, unknown> | undefined;

    return {
      type: this.getErrorTypeFromStatus(statusCode),
      source: ErrorSource.REST,
      message: (responseData?.message as string) || error.message || 'An error occurred',
      statusCode,
      errorCode: (responseData?.code as string) || (responseData?.error as string),
      originalError: error,
      context,
      timestamp: new Date().toISOString(),
      isRetryable: this.isRetryableError(statusCode, error),
    };
  }

  /**
   * Normalize GraphQL errors (graphql-request ClientError)
   */
  static normalizeGraphQLError(error: unknown, context: ErrorContext): NormalizedError {
    // Check if it's a ClientError from graphql-request

    if (error instanceof ClientError) {
      const firstError = error.response?.errors?.[0];
      const statusCode = error.response?.status;
      const errorCode = (firstError?.extensions?.code as string) || undefined;
      const errorMessage = firstError?.message || error.message || 'GraphQL request failed';

      return {
        type: this.getGraphQLErrorType(errorCode, statusCode, errorMessage),
        source: ErrorSource.GRAPHQL,
        message: errorMessage,
        statusCode,
        errorCode,
        originalError: error,
        context,
        timestamp: new Date().toISOString(),
        isRetryable: this.isRetryableGraphQLError(errorCode, statusCode),
      };
    }

    

    // Fallback for non-ClientError GraphQL errors
    const errorMessage = error instanceof Error ? error.message : 'GraphQL error occurred';
    return {
      type: ErrorType.UNKNOWN,
      source: ErrorSource.GRAPHQL,
      message: errorMessage,
      originalError: error,
      context,
      timestamp: new Date().toISOString(),
      isRetryable: false,
    };
  }

  /**
   * Normalize unknown/generic errors
   */
  static normalizeGenericError(error: unknown, context: ErrorContext): NormalizedError {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      type: ErrorType.UNKNOWN,
      source: context.source || ErrorSource.UNKNOWN,
      message: errorMessage,
      originalError: error,
      context,
      timestamp: new Date().toISOString(),
      isRetryable: false,
    };
  }

  /**
   * Determine error type from HTTP status code
   */
  private static getErrorTypeFromStatus(statusCode?: number): ErrorType {
    if (!statusCode) return ErrorType.NETWORK;

    if (statusCode === 401 || statusCode === 403) {
      return ErrorType.AUTH;
    }
    if (statusCode >= 400 && statusCode < 500) {
      return ErrorType.CLIENT;
    }
    if (statusCode >= 500) {
      return ErrorType.SERVER;
    }
    return ErrorType.UNKNOWN;
  }

  /**
   * Determine GraphQL error type based on error code and message
   */
  private static getGraphQLErrorType(errorCode?: string, statusCode?: number, message?: string): ErrorType {
    // Check message for common validation patterns (even if code is INTERNAL_SERVER_ERROR)
    const lowerMessage = message?.toLowerCase() || '';
    const isValidationMessage = 
      lowerMessage.includes('unrecognized') ||
      lowerMessage.includes('invalid') ||
      lowerMessage.includes('incorrect') ||
      lowerMessage.includes('wrong') ||
      lowerMessage.includes('does not exist') ||
      lowerMessage.includes('not found') ||
      lowerMessage.includes('must be') ||
      lowerMessage.includes('required');

    // Auth errors
    if (errorCode === 'UNAUTHENTICATED' || errorCode === 'UNAUTHORIZED' || statusCode === 401) {
      return ErrorType.AUTH;
    }
    
    // Validation errors by code
    if (errorCode === 'BAD_USER_INPUT' || errorCode === 'VALIDATION_ERROR') {
      return ErrorType.VALIDATION;
    }
    
    // Validation errors by message pattern (even if code says INTERNAL_SERVER_ERROR)
    if (isValidationMessage) {
      return ErrorType.VALIDATION;
    }
    
    // Server errors
    if (errorCode === 'INTERNAL_SERVER_ERROR' || (statusCode && statusCode >= 500)) {
      return ErrorType.SERVER;
    }
    
    return ErrorType.CLIENT;
  }

  /**
   * Check if REST error is retryable
   */
  private static isRetryableError(statusCode?: number, error?: AxiosError): boolean {
    // Network errors are retryable
    if (!statusCode && error?.code === 'ECONNABORTED') return true;
    
    // 401 is retryable (token refresh)
    if (statusCode === 401) return true;
    
    // 5xx server errors are retryable
    if (statusCode && statusCode >= 500) return true;
    
    return false;
  }

  /**
   * Check if GraphQL error is retryable
   */
  private static isRetryableGraphQLError(errorCode?: string, statusCode?: number): boolean {
    // Auth errors are retryable (token refresh)
    if (errorCode === 'UNAUTHENTICATED' || statusCode === 401) return true;
    
    // Server errors are retryable
    if (errorCode === 'INTERNAL_SERVER_ERROR' || (statusCode && statusCode >= 500)) {
      return true;
    }
    
    return false;
  }
}
