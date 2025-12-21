import { Redirect, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthMmkvStorage } from '../../storage/mmkv';


export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      try {
        const token = AuthMmkvStorage.getAccessToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null; // Or a loading screen
  }

  if (!isAuthenticated) {
    // Redirect to sign-in if not authenticated
    return <Redirect href="/(auth)/signIn" />;
  }

  // User is authenticated, render the protected content
  return <Slot />;
}
