import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthMmkvStorage } from '../storage/mmkv';
import { ErrorService, ErrorType, NormalizedError } from '../utils/error';

/**
 * Global error handler hook
 * Set this up once in your app root to handle all errors globally
 */
export function useGlobalErrorHandler() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = ErrorService.addErrorListener((error: NormalizedError) => {
      // Get user-friendly error message
      const message = ErrorService.getUserMessage(error);

      // Log in development
      if (__DEV__) {
        console.log('🔴 Global Error Handler:', {
          type: error.type,
          source: error.source,
          message,
          statusCode: error.statusCode,
        });
      }

      // Show toast only for system-level errors
      // Don't show for validation/client errors (handled in components)
      const shouldShowToast = 
        error.type === ErrorType.SERVER ||      // 500+ server errors
        error.type === ErrorType.NETWORK ||     // Network/connectivity issues
        error.statusCode === 429;               // Rate limiting
      
      // Skip validation and client errors - these should be handled in forms
      const shouldSkipToast = 
        error.type === ErrorType.VALIDATION ||  // Form validation errors
        error.type === ErrorType.CLIENT;        // Client errors (4xx)
      
      if (shouldShowToast && !shouldSkipToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
          visibilityTime: 4000,
          position: 'top',
        });
      }

      // Handle authentication errors - redirect to login
      if (ErrorService.shouldLogout(error)) {
        if (__DEV__) {
          console.log('🔐 Auth error detected - redirecting to login');
        }
        AuthMmkvStorage.clearAuth();
        router.replace('/(auth)/login');
      }

      // Handle network errors differently
      if (error.type === ErrorType.NETWORK) {
        if (__DEV__) {
          console.log('🌐 Network error - check connection');
        }
        // TODO: Show offline indicator or banner
      }

      // TODO: Track errors in analytics
      // analytics.trackError({
      //   type: error.type,
      //   source: error.source,
      //   message: error.message,
      // });
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, [router]);
}
