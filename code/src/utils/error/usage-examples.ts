// How to handle normalized errors in your code

import React from "react";
import apiClient from "../../api/apiClient";
import { graphQLRequestWithNormalizedError } from "../../api/graphqlClient";
import { ErrorSource, ErrorType, NormalizedError } from "./types";

/**
 * Example 1: Basic error handling with normalized errors
 */
export async function fetchUserData() {
  try {
    const response = await apiClient.get('/api/users');
    return response.data;
  } catch (error) {
    // Error is now a NormalizedError!
    const normalizedError = error as NormalizedError;
    
    console.log('Error type:', normalizedError.type);
    console.log('Error source:', normalizedError.source);
    console.log('Status code:', normalizedError.statusCode);
    console.log('Message:', normalizedError.message);
    
    // Handle specific error types
    if (normalizedError.type === ErrorType.AUTH) {
      // Navigate to login
      console.log('Auth error - redirect to login');
    }
    
    if (normalizedError.type === ErrorType.NETWORK) {
      // Show offline indicator
      console.log('Network error - show offline UI');
    }
    
    throw error;
  }
}

/**
 * Example 2: GraphQL with normalized errors
 */
export async function fetchGraphQLData() {
  try {
    const data = await graphQLRequestWithNormalizedError(
      `query { user { id name } }`,
      {}
    );
    return data;
  } catch (error) {
    // Error is now a NormalizedError!
    const normalizedError = error as NormalizedError;
    
    // Check if it came from GraphQL
    if (normalizedError.source === ErrorSource.GRAPHQL) {
      console.log('GraphQL operation:', normalizedError.context.operation);
      console.log('Error code:', normalizedError.errorCode);
    }
    
    throw error;
  }
}

/**
 * Example 3: Type guard for normalized errors
 */
function isNormalizedError(error: unknown): error is NormalizedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'source' in error &&
    'message' in error &&
    'timestamp' in error
  );
}

export async function safeApiCall() {
  try {
    return await apiClient.get('/api/data');
  } catch (error) {
    if (isNormalizedError(error)) {
      // TypeScript knows it's a NormalizedError now
      console.log(`[${error.source}] ${error.type}: ${error.message}`);
      
      // Access original error if needed
      console.log('Original error:', error.originalError);
      
      // Check if retryable
      if (error.isRetryable) {
        console.log('This error can be retried');
      }
    }
    
    throw error;
  }
}

/**
 * Example 4: Switch on error type
 */
export async function handleWithSwitch() {
  try {
    return await apiClient.post('/api/submit', { data: 'test' });
  } catch (error) {
    const normalizedError = error as NormalizedError;
    
    switch (normalizedError.type) {
      case ErrorType.AUTH:
        // Redirect to login
        console.log('Authentication required');
        break;
        
      case ErrorType.VALIDATION:
        // Show validation errors
        console.log('Validation error:', normalizedError.message);
        break;
        
      case ErrorType.NETWORK:
        // Show network error
        console.log('Connection issue');
        break;
        
      case ErrorType.SERVER:
        // Show server error
        console.log('Server error, try again later');
        break;
        
      default:
        console.log('Unknown error');
    }
    
    throw error;
  }
}

/**
 * Example 5: React component usage
 */
export function useApiCall() {
  const [error, setError] = React.useState<NormalizedError | null>(null);
  
  const fetchData = async () => {
    try {
      const data = await apiClient.get('/api/data');
      setError(null);
      return data;
    } catch (err) {
      // Store normalized error in state
      setError(err as NormalizedError);
      
      // Show appropriate UI based on error
      const normalizedError = err as NormalizedError;
      if (normalizedError.type === ErrorType.NETWORK) {
        // Show offline banner
      }
    }
  };
  
  return { fetchData, error };
}

/**
 * Example 6: Accessing original error when needed
 */
export async function needOriginalError() {
  try {
    return await apiClient.get('/api/data');
  } catch (error) {
    const normalizedError = error as NormalizedError;
    
    // Access the original Axios error if needed
    const axiosError = normalizedError.originalError;
    
    // Now you can access Axios-specific properties
    if (axiosError.response) {
      console.log('Response data:', axiosError.response.data);
      console.log('Response headers:', axiosError.response.headers);
    }
    
    throw error;
  }
}

/**
 * Example 7: Check source and handle differently
 */
export async function handleBySource() {
  try {
    // Could be either REST or GraphQL
    return await apiClient.get('/api/data');
  } catch (error) {
    const normalizedError = error as NormalizedError;
    
    if (normalizedError.source === ErrorSource.REST) {
      console.log('REST API error');
      console.log('Endpoint:', normalizedError.context.endpoint);
      console.log('Method:', normalizedError.context.method);
    }
    
    if (normalizedError.source === ErrorSource.GRAPHQL) {
      console.log('GraphQL error');
      console.log('Operation:', normalizedError.context.operation);
      console.log('Variables:', normalizedError.context.variables);
    }
    
    throw error;
  }
}
