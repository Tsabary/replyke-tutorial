import { useRouter } from "expo-router";
import { Button, View } from "react-native";
import { useAuth, useUser } from "replyke-expo";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  return (
    <View className="bg-red-500 flex-1 justify-center items-center gap-4">
      {user ? (
        <Button title="Sign out" onPress={signOut} />
      ) : (
        <Button title="Sign in" onPress={() => router.navigate("/sign-in")} />
      )}
    </View>
  );
}
