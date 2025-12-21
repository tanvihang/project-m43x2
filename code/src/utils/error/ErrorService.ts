import { AxiosError } from 'axios';
import { ClientError } from 'graphql-request';
import type { GraphQLError } from 'graphql';
import { ErrorNormalizer } from './normalizers';
import { 
  ErrorContext, 
  ErrorHandlerOptions, 
  ErrorSource, 
  ErrorType, 
  NormalizedError 
} from './types';

class ErrorServiceClass {
  private errorListeners: Array<(error: NormalizedError) => void> = [];

  /**
   * Main error handler - handles any type of error
   */
  handleError(
    error: unknown,
    context: ErrorContext,
    options: ErrorHandlerOptions = {}
  ): NormalizedError {
    const normalizedError = this.normalizeError(error, context);

    // Log to console in development
    if (options.logToConsole !== false && __DEV__) {
      this.logToConsole(normalizedError);
    }

    // Log to remote service (Sentry, Bugsnag, etc.)
    if (options.logToRemote !== false) {
      this.logToRemote(normalizedError);
    }

    // Notify listeners (e.g., for toast notifications)
    this.notifyListeners(normalizedError);

    return normalizedError;
  }

  /**
   * Handle REST API errors specifically
   */
  handleRestError(
    error: AxiosError,
    endpoint?: string,
    method?: string,
    options?: ErrorHandlerOptions
  ): NormalizedError {
    return this.handleError(
      error,
      {
        source: ErrorSource.REST,
        endpoint,
        method,
      },
      options
    );
  }

  /**
   * Handle GraphQL errors specifically
   * @param error - Can be ClientError (from graphql-request) containing GraphQLError[], or any error
   * @param operation - GraphQL operation name
   * @param variables - GraphQL variables
   * @param options - Error handling options
   * @returns NormalizedError
   * 
   * Note: The error parameter is typically ClientError which contains GraphQLError[] 
   * in error.response.errors. Access them via error.originalError in the returned NormalizedError.
   */
  handleGraphQLError(
    error: ClientError | unknown,
    operation?: string,
    variables?: Record<string, unknown>,
    options?: ErrorHandlerOptions
  ): NormalizedError {
    return this.handleError(
      error,
      {
        source: ErrorSource.GRAPHQL,
        operation,
        variables,
      },
      options
    );
  }

  /**
   * Check if error is an authentication error
   */
  isAuthError(error: NormalizedError): boolean {
    return error.type === ErrorType.AUTH;
  }

  /**
   * Extract GraphQL errors from a NormalizedError
   * @param error - NormalizedError that may contain GraphQL errors
   * @returns Array of GraphQLError, empty if not a GraphQL error
   */
  getGraphQLErrors(error: NormalizedError): GraphQLError[] {
    if (error.source !== ErrorSource.GRAPHQL) {
      return [];
    }
    
    const originalError = error.originalError;
    if (originalError instanceof ClientError) {
      return (originalError.response?.errors || []) as GraphQLError[];
    }
    
    return [];
  }

  /**
   * Check if error should trigger logout
   */
  shouldLogout(error: NormalizedError): boolean {
    return error.type === ErrorType.AUTH && !error.isRetryable;
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: NormalizedError, customMessage?: string): string {
    if (customMessage) return customMessage;

    switch (error.type) {
      case ErrorType.AUTH:
        return 'Authentication failed. Please log in again.';
      case ErrorType.NETWORK:
        return 'Network error. Please check your connection.';
      case ErrorType.SERVER:
        return 'Server error. Please try again later.';
      case ErrorType.VALIDATION:
        return error.message || 'Invalid input. Please check your data.';
      default:
        return error.message || 'Something went wrong. Please try again.';
    }
  }

  /**
   * Add error listener (for UI components, toast, etc.)
   */
  addErrorListener(listener: (error: NormalizedError) => void): () => void {
    this.errorListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.errorListeners = this.errorListeners.filter(l => l !== listener);
    };
  }

  /**
   * Normalize different error types
   */
  private normalizeError(error: unknown, context: ErrorContext): NormalizedError {
    // Check error type and normalize accordingly

    const source = context.source;

    switch (source) {
      case ErrorSource.REST:
        return ErrorNormalizer.normalizeRestError(error as AxiosError, context);
      case ErrorSource.GRAPHQL:
        return ErrorNormalizer.normalizeGraphQLError(error, context);
      default:
        return ErrorNormalizer.normalizeGenericError(error, context);
    }
  }

  /**
   * Log error to console with formatting
   */
  private logToConsole(error: NormalizedError): void {
    const logStyle = this.getLogStyle(error.type);
    
    console.group(
      `%c[${error.source}] ${error.type}`,
      logStyle
    );
    console.log('Message:', error.message);
    console.log('Context:', error.context);
    if (error.statusCode) console.log('Status:', error.statusCode);
    if (error.errorCode) console.log('Code:', error.errorCode);
    console.log('Time:', error.timestamp);
    console.log('Original Error:', error.originalError);
    console.groupEnd();
  }

  /**
   * Get console log styling based on error type
   */
  private getLogStyle(type: ErrorType): string {
    const styles: Record<ErrorType, string> = {
      [ErrorType.AUTH]: 'color: orange; font-weight: bold',
      [ErrorType.NETWORK]: 'color: red; font-weight: bold',
      [ErrorType.SERVER]: 'color: red; font-weight: bold',
      [ErrorType.CLIENT]: 'color: yellow; font-weight: bold',
      [ErrorType.VALIDATION]: 'color: blue; font-weight: bold',
      [ErrorType.UNKNOWN]: 'color: gray; font-weight: bold',
    };
    
    return styles[type];
  }

  /**
   * Log to remote error tracking service
   */
  private logToRemote(_error: NormalizedError): void {
    // TODO: Implement integration with Sentry, Bugsnag, or other services
    // Example:
    // Sentry.captureException(error.originalError, {
    //   tags: {
    //     source: error.source,
    //     type: error.type,
    //   },
    //   extra: {
    //     context: error.context,
    //     statusCode: error.statusCode,
    //   },
    // });
    
    if (!__DEV__) {
      // Only log in production
      // Your remote logging implementation here
    }
  }

  /**
   * Notify all error listeners
   */
  private notifyListeners(error: NormalizedError): void {
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (listenerError) {
        console.error('Error in error listener:', listenerError);
      }
    });
  }
}

export const ErrorService = new ErrorServiceClass();
