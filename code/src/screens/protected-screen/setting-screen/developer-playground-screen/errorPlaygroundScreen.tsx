import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import * as Sentry from "@sentry/react-native";
import { NormalizedError } from "../../../../utils/error";
import apiClient from "../../../../api/apiClient";
import { graphQLRequestWithNormalizedError } from "../../../../api/graphqlClient";
import CtaButton from "../../../../components/ui/button/CtaButton";
import ErrorBoundary from "../../../../components/common/ErrorBoundary";

const ErrorPlayGroundScreen = () => {
  const [shouldThrowRenderError, setShouldThrowRenderError] = useState(false);
  const [shouldAccessUndefined, setShouldAccessUndefined] = useState(false);
  const [shouldShowBrokenComponent, setShouldShowBrokenComponent] =
    useState(false);
  const [shouldThrowRootError, setShouldThrowRootError] = useState(false);
  const [shouldThrowLifecycleError, setShouldThrowLifecycleError] =
    useState(false);

  // Custom fallback states
  const [showMinimalError, setShowMinimalError] = useState(false);
  const [showNavigationError, setShowNavigationError] = useState(false);
  const [showRefreshError, setShowRefreshError] = useState(false);
  const [showSupportError, setShowSupportError] = useState(false);
  const [showInlineError, setShowInlineError] = useState(false);

  const showError = (title: string, error: NormalizedError) => {
    Alert.alert(
      title,
      `Type: ${error.type}\nSource: ${error.source}\nStatus: ${error.statusCode}\nMessage: ${error.message}\nRetryable: ${error.isRetryable}`,
      [{ text: "OK" }]
    );
  };

  //* 400 - Validation Error, prompt user to correct input
  const rest400Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.post("https://httpbin.org/status/400", {
        invalid: "data",
      });
    },
    onError: (error: unknown) => {
      showError("REST 400 - Validation Error", error as NormalizedError);
    },
  });

  //* 401 - Auth Error, prompt user to login (handled in QueryClient)
  const rest401Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get("https://httpbin.org/status/401");
    },
  });

  //* 403 - Auth Error, inform user they lack permissions (handled in QueryClient)
  const rest403Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get("https://httpbin.org/status/403");
    },
  });

  //* 404 - Client Error, inform user resource not found (such as wrong URL)
  const rest404Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get("https://httpbin.org/status/404");
    },
    onError: (error: unknown) => {
      showError("REST 404 - Not Found", error as NormalizedError);
    },
  });

  //* 500 - Internal Server Error (handled in QueryClient)
  const rest500Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get("https://httpbin.org/status/500");
    },
  });

  //* 503 - Server Unavailable, inform user to try later (handled in QueryClient)
  const rest503Mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get("https://httpbin.org/status/503");
    },
  });

  const restTimeoutMutation = useMutation({
    mutationFn: async () => {
      // This will timeout after axios default timeout
      return await apiClient.get("https://httpbin.org/delay/100");
    },
    onError: (error: unknown) => {
      showError("REST Timeout - Network Error", error as NormalizedError);
    },
  });

  //* Invalid URL
  const restInvalidUrlMutation = useMutation({
    mutationFn: async () => {
      return await apiClient.get(
        "https://invalid-domain-that-does-not-exist-12345.com"
      );
    },
    onError: (error: unknown) => {
      showError("REST Invalid URL - Network Error", error as NormalizedError);
    },
  });

  // GraphQL Error Tests with TanStack Query
  const graphqlAuthMutation = useMutation({
    mutationFn: async () => {
      const query = `
        query {
          protectedData {
            id
            name
          }
        }
      `;
      return await graphQLRequestWithNormalizedError(query);
    },
    onError: (error: unknown) => {
      showError("GraphQL Auth Error", error as NormalizedError);
    },
  });

  //* GraphQL Validation Error - invalid field in query
  const graphqlValidationMutation = useMutation({
    mutationFn: async () => {
      const query = `
        query {
          invalidField {
            nonExistentField
          }
        }
      `;
      return await graphQLRequestWithNormalizedError(query);
    },
    onError: (error: unknown) => {
      showError("GraphQL Validation Error", error as NormalizedError);
    },
  });

  //* GraphQL Server Error - server-side error
  const graphqlServerErrorMutation = useMutation({
    mutationFn: async () => {
      const query = `
        mutation {
          causeServerError(input: { invalid: true })
        }
      `;
      return await graphQLRequestWithNormalizedError(query);
    },
    onError: (error: unknown) => {
      showError("GraphQL Server Error", error as NormalizedError);
    },
  });

  //* GraphQL Network Error - invalid endpoint
  const graphqlNetworkMutation = useMutation({
    mutationFn: async () => {
      const query = `query { test }`;
      return await graphQLRequestWithNormalizedError(query);
    },
    onError: (error: unknown) => {
      showError("GraphQL Network Error", error as NormalizedError);
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Error Testing Playground</Text>
      <Text style={styles.description}>
        Test different types of errors to see how they are handled
      </Text>

      <Text style={styles.sectionTitle}>
        🏔️ Root-Level Error Boundary Tests
      </Text>
      <Text style={styles.helpText}>
        These errors propagate to the ROOT Error Boundary in _layout.tsx
      </Text>
      <Text style={styles.warningText}>
        ⚠️ Warning: These will reset the ENTIRE app to error state
      </Text>

      <CtaButton
        title="💥 Throw Root-Level Render Error"
        onPress={() => setShouldThrowRootError(true)}
      />
      {shouldThrowRootError && <RootLevelErrorComponent />}

      <CtaButton
        title="💥 Throw Lifecycle Error (useEffect)"
        onPress={() => setShouldThrowLifecycleError(true)}
      />
      {shouldThrowLifecycleError && <LifecycleErrorComponent />}

      <Text style={styles.sectionTitle}>🛡️ Error Boundary Tests</Text>
      <Text style={styles.helpText}>
        These errors are caught by LOCAL Error Boundary and show fallback UI
      </Text>

      <ErrorBoundary>
        <CtaButton
          title="Throw Error in Render"
          onPress={() => setShouldThrowRenderError(true)}
        />
        {shouldThrowRenderError && <ComponentThatThrows />}
      </ErrorBoundary>

      <ErrorBoundary>
        <CtaButton
          title="Access Undefined Property"
          onPress={() => setShouldAccessUndefined(true)}
        />
        {shouldAccessUndefined && <ComponentWithUndefined />}
      </ErrorBoundary>

      <ErrorBoundary>
        <CtaButton
          title="Component That Crashes on Mount"
          onPress={() => setShouldShowBrokenComponent(true)}
        />
        {shouldShowBrokenComponent && <BrokenComponent />}
      </ErrorBoundary>

      <Text style={styles.sectionTitle}>🎨 Custom Fallback UI Examples</Text>
      <Text style={styles.helpText}>
        Common patterns for custom error handling UI
      </Text>

      {/* 1. Minimal Inline Error */}
      <ErrorBoundary
        fallback={(error, reset) => (
          <View style={styles.minimalError}>
            <Text style={styles.minimalErrorText}>⚠️ Failed to load</Text>
            <TouchableOpacity onPress={reset}>
              <Text style={styles.minimalRetry}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <CtaButton
          title="1. Minimal Inline Error (Widget)"
          onPress={() => setShowMinimalError(true)}
        />
        {showMinimalError && <ComponentThatThrows />}
      </ErrorBoundary>

      {/* 2. Navigation Error with Back Button */}
      <ErrorBoundary
        fallback={(error, reset) => (
          <View style={styles.navigationError}>
            <Text style={styles.errorIcon}>🚫</Text>
            <Text style={styles.navigationErrorTitle}>
              Unable to load this content
            </Text>
            <Text style={styles.navigationErrorText}>{error.message}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.back()}
              >
                <Text style={styles.secondaryButtonText}>← Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={reset}>
                <Text style={styles.primaryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <CtaButton
          title="2. Navigation Error (Go Back + Retry)"
          onPress={() => setShowNavigationError(true)}
        />
        {showNavigationError && <ComponentThatThrows />}
      </ErrorBoundary>

      {/* 3. Refresh Data Error */}
      <ErrorBoundary
        fallback={(error, reset) => (
          <View style={styles.refreshError}>
            <Text style={styles.refreshIcon}>🔄</Text>
            <Text style={styles.refreshTitle}>Failed to refresh data</Text>
            <Text style={styles.refreshSubtitle}>
              We couldn not update the latest information
            </Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => {
                console.log("Refreshing data...");
                reset();
              }}
            >
              <Text style={styles.refreshButtonText}>↻ Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reset}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <CtaButton
          title="3. Refresh Data Error (Data Loading)"
          onPress={() => setShowRefreshError(true)}
        />
        {showRefreshError && <ComponentThatThrows />}
      </ErrorBoundary>

      {/* 4. Support Contact Error */}
      <ErrorBoundary
        fallback={(error, reset) => (
          <View style={styles.supportError}>
            <Text style={styles.supportIcon}>💬</Text>
            <Text style={styles.supportTitle}>Something went wrong</Text>
            <Text style={styles.supportText}>
              If this keeps happening, please contact support
            </Text>
            <View style={styles.supportButtonGroup}>
              <TouchableOpacity
                style={styles.supportButton}
                onPress={() =>
                  Alert.alert("Support", "Contact support feature")
                }
              >
                <Text style={styles.supportButtonText}>Contact Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.retryButtonAlt} onPress={reset}>
                <Text style={styles.retryButtonAltText}>Try Again</Text>
              </TouchableOpacity>
            </View>
            {__DEV__ && <Text style={styles.devError}>{error.message}</Text>}
          </View>
        )}
      >
        <CtaButton
          title="4. Support Contact Error (Critical)"
          onPress={() => setShowSupportError(true)}
        />
        {showSupportError && <ComponentThatThrows />}
      </ErrorBoundary>

      {/* 5. Compact Inline Error for Cards/Lists */}
      <ErrorBoundary
        fallback={(error, reset) => (
          <View style={styles.compactError}>
            <View style={styles.compactErrorContent}>
              <Text style={styles.compactIcon}>⚠️</Text>
              <View style={styles.compactTextContainer}>
                <Text style={styles.compactTitle}>Item unavailable</Text>
                <Text style={styles.compactSubtext}>Tap to retry</Text>
              </View>
            </View>
            <TouchableOpacity onPress={reset} style={styles.compactRetry}>
              <Text style={styles.compactRetryText}>↻</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <CtaButton
          title="5. Compact Inline Error (List Item)"
          onPress={() => setShowInlineError(true)}
        />
        {showInlineError && <ComponentThatThrows />}
      </ErrorBoundary>

      <Text style={styles.sectionTitle}>Navigation Errors</Text>
      <CtaButton
        title="Trigger 404 Page Error"
        onPress={() => {
          //@ts-expect-error // Intentionally navigating to a non-existent route to trigger 404
          router.push("/non-existent-route");
        }}
      />

      <Text style={styles.sectionTitle}>REST API Errors</Text>

      <CtaButton
        title="REST 400 - Bad Request (Validation)"
        onPress={() => rest400Mutation.mutate()}
      />

      <CtaButton
        title="REST 401 - Unauthorized (Auth)"
        onPress={() => rest401Mutation.mutate()}
      />

      <CtaButton
        title="REST 403 - Forbidden (Auth)"
        onPress={() => rest403Mutation.mutate()}
      />

      <CtaButton
        title="REST 404 - Not Found (Client)"
        onPress={() => rest404Mutation.mutate()}
      />

      <CtaButton
        title="REST 500 - Internal Server Error"
        onPress={() => rest500Mutation.mutate()}
      />

      <CtaButton
        title="REST 503 - Service Unavailable"
        onPress={() => rest503Mutation.mutate()}
      />

      <CtaButton
        title="REST Timeout (Network)"
        onPress={() => restTimeoutMutation.mutate()}
      />

      <CtaButton
        title="REST Invalid URL (Network)"
        onPress={() => restInvalidUrlMutation.mutate()}
      />

      <Text style={styles.sectionTitle}>GraphQL Errors</Text>

      <CtaButton
        title="GraphQL Auth Error (UNAUTHENTICATED)"
        onPress={() => graphqlAuthMutation.mutate()}
      />

      <CtaButton
        title="GraphQL Validation Error"
        onPress={() => graphqlValidationMutation.mutate()}
      />

      <CtaButton
        title="GraphQL Server Error"
        onPress={() => graphqlServerErrorMutation.mutate()}
      />

      <CtaButton
        title="GraphQL Network Error"
        onPress={() => graphqlNetworkMutation.mutate()}
      />

      <Text style={styles.sectionTitle}>Sentry Error</Text>

      <CtaButton
        title="Trigger Sentry Error"
        onPress={() => {
          Sentry.captureException(new Error("🔥 Test Sentry Error from Playground"));
        }}
      />
    </ScrollView>
  );
};

// Root-Level Error Test Components (NO local Error Boundary wrapper)
const RootLevelErrorComponent = () => {
  throw new Error(
    "🔥 ROOT LEVEL ERROR: This error propagates to _layout.tsx Error Boundary!"
  );
};

const LifecycleErrorComponent = () => {
  React.useEffect(() => {
    // This error happens in lifecycle and will propagate to root
    throw new Error(
      "🔥 LIFECYCLE ERROR: Error in useEffect propagates to root!"
    );
  }, []);

  return <Text>This component will crash in useEffect...</Text>;
};

// Test Components for Local Error Boundary
const ComponentThatThrows = () => {
  throw new Error("💥 This is a deliberate render error!");
};

const ComponentWithUndefined = () => {
  const data: any = undefined;
  // This will throw: Cannot read property 'value' of undefined
  return <Text>{data.value.nested.property}</Text>;
};

const BrokenComponent = () => {
  // Simulate a broken component that tries to call undefined function
  const brokenFunction: any = null;
  return <View>{brokenFunction()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    color: "#ff6b6b",
    fontStyle: "italic",
    marginBottom: 12,
    fontWeight: "600",
  },
  // Custom Fallback Styles
  // 1. Minimal Inline Error
  minimalError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff3cd",
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#ffc107",
    marginVertical: 4,
  },
  minimalErrorText: {
    fontSize: 14,
    color: "#856404",
  },
  minimalRetry: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  // 2. Navigation Error
  navigationError: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  navigationErrorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  navigationErrorText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },
  // 3. Refresh Data Error
  refreshError: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  refreshIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  refreshTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  refreshSubtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  skipText: {
    fontSize: 13,
    color: "#6c757d",
    textDecorationLine: "underline",
  },
  // 4. Support Error
  supportError: {
    backgroundColor: "#fff5f5",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#feb2b2",
  },
  supportIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c53030",
    marginBottom: 8,
  },
  supportText: {
    fontSize: 13,
    color: "#742a2a",
    textAlign: "center",
    marginBottom: 16,
  },
  supportButtonGroup: {
    width: "100%",
    gap: 8,
  },
  supportButton: {
    backgroundColor: "#e53e3e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  supportButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  retryButtonAlt: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e53e3e",
  },
  retryButtonAltText: {
    color: "#e53e3e",
    fontSize: 14,
    fontWeight: "600",
  },
  devError: {
    marginTop: 12,
    fontSize: 11,
    color: "#999",
    fontFamily: "monospace",
  },
  // 5. Compact Inline Error
  compactError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f5c6cb",
    marginVertical: 4,
  },
  compactErrorContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  compactIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  compactTextContainer: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#721c24",
  },
  compactSubtext: {
    fontSize: 11,
    color: "#856a6d",
  },
  compactRetry: {
    padding: 6,
  },
  compactRetryText: {
    fontSize: 20,
    color: "#721c24",
  },
});

export default ErrorPlayGroundScreen;
