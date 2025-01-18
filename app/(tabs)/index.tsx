import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="bg-red-500 flex-1 justify-center items-center">
      <Button title="Sign in" onPress={() => router.navigate("/sign-in")} />
    </View>
  );
}
