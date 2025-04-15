import React, { useState } from "react";
import { View, Text } from "react-native";
import { SolidButton, EmailInput } from "../ui/index";
import { router } from "expo-router";

export default function ForgotPasswordCard() {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendLink = () => {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    // Proceed
    console.log("Reset link sent to:", email);
    router.push("auth/Login/forgotPassword/OTPReset");
  };

  return (
    <View className="w-[90%] h-auto bg-[#09090b] rounded-2xl border border-[#3f3f46] p-5">
      <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
        Forgot Password?
      </Text>
      <Text className="ml-1 text-[#a1a1aa] mb-6 text-small">
        Enter your email to reset your password.
      </Text>
      <EmailInput
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />
      <SolidButton title="Send Reset Link" onPress={handleSendLink} />
      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      ) : null}
    </View>
  );
}
