import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import validator from "validator";
import { useAuth, useUser } from "replyke-expo";

const SignInScreen = () => {
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSignIn = async () => {
    const newErrors = { email: "", password: "" };

    if (!validator.isEmail(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (validator.isEmpty(password)) {
      newErrors.password = "Password cannot be empty.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      // Proceed with sign-in logic
      await signInWithEmailAndPassword?.({
        email,
        password,
      });
    }
  };

  if (user) return <Redirect href="/" />;

  return (
    <View className="flex-1 bg-white justify-center p-6">
      <Text className="text-2xl font-bold text-center mb-6">Sign In</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className={`border rounded-lg px-4 py-3 mb-2 text-gray-700 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email ? (
        <Text className="text-red-500 text-sm mb-4">{errors.email}</Text>
      ) : null}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className={`border rounded-lg px-4 py-3 mb-2 text-gray-700 ${
          errors.password ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.password ? (
        <Text className="text-red-500 text-sm mb-6">{errors.password}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-500 py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-medium">Log In</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 mb-4">
        Don't have an account?{" "}
        <Text
          onPress={() => router.replace("/sign-up")}
          className="text-blue-500 font-medium"
        >
          Sign up instead
        </Text>
      </Text>

      <Text className="text-xs text-center text-gray-400 mt-auto">
        By continuing, you agree to the{" "}
        <Text className="text-blue-500 underline">terms and conditions</Text>{" "}
        and our <Text className="text-blue-500 underline">privacy policy</Text>.
      </Text>
    </View>
  );
};

export default SignInScreen;
