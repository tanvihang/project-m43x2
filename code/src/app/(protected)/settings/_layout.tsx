import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="developer-playground/index"
        options={{
          title: "Developer Playground",
        }}
      />
    </Stack>
  );
}
