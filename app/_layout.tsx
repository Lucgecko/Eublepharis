import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "none" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
      <Stack.Screen name="+not-found" options={{ animation: "none" }} />
    </Stack>
  );
}