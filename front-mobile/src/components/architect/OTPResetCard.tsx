import React, { useState } from "react";
import { View, Text } from "react-native";
import { SolidButton, OTPInput, PressableText } from "../ui/index";
import { router } from "expo-router";

export default function OTPResetCard() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = () => {
    setErrorMessage("");

    const code = otp.join("");
    if (code.length < 4) {
      setErrorMessage("Please enter the full 4-digit code.");
      return;
    }

    console.log("OTP Verified:", code);
    router.push("auth/Login/forgotPassword/resetPassword");
  };

  return (
    <View className="w-[90%] h-auto bg-[#09090b] rounded-2xl border border-[#3f3f46] p-5">
      <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
        Verify it's You
      </Text>
      <Text className="ml-1 text-[#a1a1aa] mb-6 text-small">
        We've sent a 4-digit code to your email. Enter it below to continue.
      </Text>
      <View className="items-center mb-3">
        <OTPInput otp={otp} setOtp={setOtp} />
      </View>
      <SolidButton title="Verify & Continue" onPress={handleVerify} />
      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      ) : null}
      <View className="flex-row justify-center items-center pt-4">
        <Text className="ml-2 text-gray-400 text-xs font-semibold">
          Didn't receive any code?{" "}
        </Text>
        <PressableText
          text="Resend Code"
          onPress={() => {
            console.log("Resend Code pressed");
          }}
        />
      </View>
    </View>
  );
}
