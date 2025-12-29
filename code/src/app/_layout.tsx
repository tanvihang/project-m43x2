import { Platform } from "react-native";
import React from "react";
import "../localization/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as ExpoDevice from "expo-device";
import { useSyncQueriesExternal } from "react-query-external-sync";
import Toast from 'react-native-toast-message';
import { storage } from "../storage/mmkv/mmkvInstance";
import ThemeProvider from "../context/themeContext";
import { NormalizedError } from "../utils/error";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      // Global error handler for all mutations
      onError: (error: unknown) => {
        const normalizedError = error as NormalizedError;

        console.log("Global Mutation Error Handler:", normalizedError);

        //* Toast for 401 & 403 errors
        if (
          normalizedError.statusCode === 401 ||
          normalizedError.statusCode === 403
        ) {
          Toast.show({
            type: "error",
            text1: "Session Expired",
            text2: "Please log in again.",
            position: "top",
            visibilityTime: 4000,
          });
        }

        //* Toast for 500++ errors
        if (normalizedError.statusCode >= 500) {
          let title;

          switch (normalizedError.statusCode) {
            case 500:
              title = "Internal Server Error";
              break;
            case 502:
              title = "Bad Gateway";
              break;
            case 503:
              title = "Service Unavailable";
              break;
            case 504:
              title = "Gateway Timeout";
              break;
            default:
              title = "Server Error";
          }

          Toast.show({
            type: "error",
            text1: title,
            text2: normalizedError.message,
            position: "top",
            visibilityTime: 4000,
          });
        }
      },
      // Mutations typically shouldn't auto-retry
      retry: false,
    },
  },
});

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

function AppContent() {

  //* External Sync for React Native DevTools
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831", // Default port for React Native DevTools
    deviceName: Platform?.OS || "web", // Platform detection
    platform: Platform?.OS || "web", // Use appropriate platform identifier
    deviceId: Platform?.OS || "web", // Use a PERSISTENT identifier (see note below)
    isDevice: ExpoDevice.isDevice, // Automatically detects real devices vs emulators
    extraDeviceInfo: {
      // Optional additional info about your device
      appVersion: "1.0.0",
      // Add any relevant platform info
    },
    enableLogs: false,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
      // Add any private environment variables you want to monitor
      // Public environment variables are automatically loaded
    },
    // Storage monitoring with CRUD operations
    mmkvStorage: storage, // MMKV storage for ['#storage', 'mmkv', 'key'] queries + monitoring
    // asyncStorage: AsyncStorage, // AsyncStorage for ['#storage', 'async', 'key'] queries + monitoring
    // secureStorage: SecureStore, // SecureStore for ['#storage', 'secure', 'key'] queries + monitoring
    secureStorageKeys: [
      "userToken",
      "refreshToken",
      "biometricKey",
      "deviceId",
    ], // SecureStore keys to monitor
  });

  return (
    <Stack screenOptions={{headerShown:false}}>
      {/* Initial redirect */}
      <Stack.Screen name="index" />

      {/* Auth routes - accessible when not authenticated */}
      <Stack.Screen name="(auth)" />

      {/* Protected routes - requires authentication */}
      <Stack.Screen name="(protected)" />
    </Stack>
  );
}

export default RootLayout;
