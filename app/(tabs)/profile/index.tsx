import { View, Button } from "react-native";
import React from "react";
import { useAuth, useUser } from "replyke-expo";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
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
};

export default ProfileScreen;
