
import { ClientError, GraphQLClient } from "graphql-request";
import { GraphQLError } from "graphql";
import { AuthMmkvStorage } from "../storage/mmkv";
import { API_CONFIG } from "../config";
import { ErrorService } from "../utils/error";

/**
 * Type guard to check if error is a GraphQL ClientError
 */
function isGraphQLClientError(error: unknown): error is ClientError {
    return error instanceof ClientError && 
           'response' in error && 
           error.response !== undefined;
}

/**
 * Extract GraphQL errors from ClientError
 */
function getGraphQLErrors(error: unknown): GraphQLError[] {
    if (isGraphQLClientError(error)) {
        return (error.response?.errors || []) as GraphQLError[];
    }
    return [];
}

export const graphQLClient = new GraphQLClient(
    API_CONFIG.GRAPH_QL_API as string,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
)



/**
 * Unified GraphQL client that automatically handles authentication
 * - If token exists: adds Authorization header and handles token refresh on auth errors
 * - If no token: makes unauthenticated request
 * 
 * @throws {NormalizedError} All errors are normalized and thrown as NormalizedError
 */
export const graphQLRequestWithNormalizedError = async <T = unknown>(
    graphQLDocument: string, 
    variables?: Record<string, unknown>
): Promise<T> => {
    const makeRequest = async (token?: string): Promise<T> => {
        if (token) {
            graphQLClient.setHeader('Authorization', `Bearer ${token}`);
        } else {
            // Remove Authorization header if no token
            graphQLClient.setHeader('Authorization', '');
        }

        return await graphQLClient.request<T>(graphQLDocument, variables);
    };

    try {
        const token = AuthMmkvStorage.getAccessToken();

        // Make request (with or without token)
        return await makeRequest(token || undefined);
        
    } catch (error: unknown) {

        const token = AuthMmkvStorage.getAccessToken();
        
        // Log error through centralized error service and get normalized error
        const normalizedError = ErrorService.handleGraphQLError(
            error,
            token ? 'AuthenticatedRequest' : 'UnauthenticatedRequest',
            variables,
            { logToConsole: true, logToRemote: true }
        );
        
        // Type-safe GraphQL error extraction
        const graphQLErrors = getGraphQLErrors(error);

        const hasAuthError = graphQLErrors.some((err: GraphQLError) => 
            ['UNAUTHENTICATED', 'UNAUTHORIZED'].includes(err.extensions?.code as string)
        );
        const isAuthError = isGraphQLClientError(error) && (
            hasAuthError || error.response?.status === 401
        );


        // If auth error but no token, clear auth just in case
        if (isAuthError && !token) {
            AuthMmkvStorage.clearAuth();
        }

        // Throw normalized error
        throw normalizedError;
    }
};

// Export helpers for use in other files
export { isGraphQLClientError, getGraphQLErrors };
export type { GraphQLError };
