// Error types and interfaces

export enum ErrorSource {
  REST = 'REST',
  GRAPHQL = 'GraphQL',
  UNKNOWN = 'Unknown'
}

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',       // Connection issues
  AUTH = 'AUTH_ERROR',             // 401, 403, UNAUTHENTICATED
  VALIDATION = 'VALIDATION_ERROR', // Bad input
  SERVER = 'SERVER_ERROR',         // 500+
  CLIENT = 'CLIENT_ERROR',         // 400-499
  UNKNOWN = 'UNKNOWN_ERROR'        // Other
}

export type ErrorContext = {
  source: ErrorSource;
  endpoint?: string;
  operation?: string;
  method?: string;
  variables?: any;
  metadata?: Record<string, any>;
}

export type NormalizedError = {
  type: ErrorType;
  source: ErrorSource;
  message: string;
  statusCode?: number;
  errorCode?: string;
  originalError: any;
  context: ErrorContext;
  timestamp: string;
  isRetryable: boolean;
}

export type ErrorHandlerOptions = {
  showToast?: boolean;
  logToConsole?: boolean;
  logToRemote?: boolean;
  customMessage?: string;
}
