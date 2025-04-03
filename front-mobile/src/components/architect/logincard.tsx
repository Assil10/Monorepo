import React, { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

import {
  EmailInput,
  PasswordInput,
  SolidButton,
  GoogleButton,
  DividerWithText,
  RememberMeCheckbox,
  PressableText,
} from "../ui";
import { signin } from "@/api/signin";

export default function LoginCard(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Add state for error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignin = async (): Promise<void> => {
    // Reset error message on each signin attempt
    setErrorMessage("");

    // Validate fields
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const responseData = await signin({ email, password });
      console.log("Sign-in successful:", responseData);
      // You can navigate after sign-in:
      // router.replace("/Home/home");
    } catch (error: any) {
      // Display error message instead of using Alert
      setErrorMessage(error.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <View className="w-[90%] h-auto bg-[#09090b] rounded-2xl border border-[#3f3f46] p-5">
      <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
        Sign in to your Account
      </Text>
      <Text className="ml-1 text-[#a1a1aa] mb-6 text-small">
        Enter your email and password to log in
      </Text>
      <GoogleButton
        text="Continue with Google"
        onPress={() => {
          console.log("Google button pressed");
        }}
      />

      <DividerWithText text="Or login with" />

      {/* Email Input */}
      <EmailInput
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />

      {/* Password Input */}
      <PasswordInput
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
      />

      {/* Login Button */}
      <SolidButton title="Log in" onPress={handleSignin} />

      {/* Show error message if any */}
      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2 mb-2">{errorMessage}</Text>
      ) : null}

      <View className="flex-row items-center pt-1 justify-between mx-1">
        <RememberMeCheckbox />
        <PressableText
          text="Forgot password?"
          onPress={() => {
            router.push("auth/Login/forgotPassword/forgotPassword");
          }}
        />
      </View>

      <View className="flex-row justify-center items-center pt-4">
        <Text className="ml-2 text-gray-400 text-xs font-semibold">
          Don't have an account?{" "}
        </Text>
        <PressableText
          text="Sign up"
          onPress={() => {
            router.push("auth/Signup/signup");
          }}
        />
      </View>
    </View>
  );
}
