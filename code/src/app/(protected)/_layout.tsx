import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import { Routes } from "../../navigation/routes";

export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null; // Or a loading screen
  }

  if (!isAuthenticated) {
    // Redirect to sign-in if not authenticated
    return <Redirect href={Routes.signIn} />;
  }

  // User is authenticated, render the protected content
  return (<Drawer
    screenOptions={{
      headerShown: false
    }}
  >
    <Drawer.Screen
      name="(tabs)"
      options={{
        drawerLabel: "Home",
        title: "Main"
      }}
    />
    <Drawer.Screen
      name="settings"
      options={{
        drawerLabel: "Settings",
        title: "Settings"
      }}
    />
  </Drawer>);
}
