import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReplykeProvider } from "@replyke/expo";
import { SheetManagerProvider } from "../context/SheetManagerContext";
import CommentSectionSheet from "../components/shared/CommentSectionSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CollectionsSheet from "../components/shared/CollectionsSheet";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ReplykeProvider projectId={process.env.EXPO_PUBLIC_REPLYKE_PROJECT_ID!}>
        <SheetManagerProvider>
          <SafeAreaProvider>
            <SafeAreaView className="flex-1">
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              <CommentSectionSheet />
              <CollectionsSheet />
            </SafeAreaView>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </SheetManagerProvider>
      </ReplykeProvider>
    </GestureHandlerRootView>
  );
}
