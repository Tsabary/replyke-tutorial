import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true, // Enable swipe gestures
        animation: "default",
        presentation: "transparentModal", // or 'modal', 'card', etc.
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
