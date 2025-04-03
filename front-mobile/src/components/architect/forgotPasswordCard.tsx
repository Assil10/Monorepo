import { View } from "react-native";

import { SolidButton, EmailInput } from "../ui/index";
import { router } from "expo-router";

export default function ForgotPasswordCard() {
  return (
    <View className="w-[90%] h-[170px] bg-[#F0F4FA] rounded-2xl shadow-2xl shadow-gray-400 p-6">
      <EmailInput placeholder="email" />
      <SolidButton
        title="Send Reset Link"
        onPress={() => {
          console.log("next button pressed");
          router.push("auth/Login/forgotPassword/OTPReset");
        }}
      />
    </View>
  );
}
