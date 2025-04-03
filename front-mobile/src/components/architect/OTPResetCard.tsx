import { View, Text } from "react-native";

import { SolidButton, OTPInput, PressableText } from "../ui/index";
import { router } from "expo-router";

export default function OTPResetCard() {
  return (
    <View className="w-[90%] h-[200px] bg-[#F0F4FA] rounded-2xl shadow-2xl shadow-gray-400 p-6 justify-center">
      <View className="items-center mb-3">
        <OTPInput />
      </View>
      <SolidButton
        title="Verify & Continue"
        onPress={() => {
          console.log("verify button pressed");
          router.push("auth/Login/forgotPassword/resetPassword");
        }}
      />
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
