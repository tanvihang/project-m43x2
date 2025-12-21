import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="onBoarding" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="signUp/index" />
      <Stack.Screen name="(public)/fontSize" />
      <Stack.Screen name="(public)/language" />
    </Stack>
  );
}
