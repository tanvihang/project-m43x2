import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthMmkvStorage } from '../storage/mmkv';

export default function Index() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        const token = AuthMmkvStorage.getAccessToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null; // Or return a splash/loading screen
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/onBoarding" />;
}
