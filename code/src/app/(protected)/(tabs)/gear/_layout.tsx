import { Stack } from "expo-router";

export default function GearLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="gearWiki"/>
      <Stack.Screen name="detail/[id]"
        options={{
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}
