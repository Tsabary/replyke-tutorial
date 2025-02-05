import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import validator from "validator";
import { useAuth, useUser } from "@replyke/expo";

const SignUpScreen = () => {
  const router = useRouter();
  const { signUpWithEmailAndPassword } = useAuth();
  const { user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!validator.isEmail(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (validator.isEmpty(password)) {
      newErrors.password = "Password cannot be empty.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      // Proceed with sign-up logic

      await signUpWithEmailAndPassword?.({ email, password });
    }
  };

  if (user) return <Redirect href="/" />;

  return (
    <View className="flex-1 bg-white justify-center p-6">
      <Text className="text-2xl font-bold text-center mb-6">Sign Up</Text>

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
        <Text className="text-red-500 text-sm mb-4">{errors.password}</Text>
      ) : null}

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        className={`border rounded-lg px-4 py-3 mb-2 text-gray-700 ${
          errors.confirmPassword ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.confirmPassword ? (
        <Text className="text-red-500 text-sm mb-6">
          {errors.confirmPassword}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-blue-500 py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-medium">Sign Up</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 mb-4">
        Already have an account?{" "}
        <Text
          onPress={() => router.replace("/sign-in")}
          className="text-blue-500 font-medium"
        >
          Sign in instead
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

export default SignUpScreen;
