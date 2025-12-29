import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";;
import { useMutation } from "@tanstack/react-query";
import { NormalizedError } from "../../../../utils/error";
import apiClient from "../../../../api/apiClient";
import { graphQLRequestWithNormalizedError } from "../../../../api/graphqlClient";
import CtaButton from "../../../../components/ui/button/CtaButton";

const ErrorPlaygroundScreen = () => {
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ErrorPlaygroundScreen;
