import { View, Text, Image, TouchableOpacity } from "react-native";
import { SolidButton } from "@/components/ui";
import { router } from "expo-router";
const BackgroundImage = require("@/assets/background.png");
const BackButton = require("@/assets/back.png");
const OTP = require("@/assets/OTP.png");

export default function ResetDone() {
  return (
    <View className="flex-1">
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <Image source={BackgroundImage} className="h-1/2 w-[100%]" />
        <View className="h-1/2 bg-[#F0F4FA]" />
      </View>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="mt-2"
      >
        <Image source={BackButton} className="h-12 w-12" />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Image
          source={Checked}
          style={{ width: 80, height: 80, resizeMode: "contain" }}
          className="mb-6 mt-[25%]"
        />
        <Text className="text-4xl font-bold text-center text-[#F0F4FA] w-[80%]">
          You're All Set!
        </Text>
        <Text className="text-center text-[#F0F4FA] mb-6 text-xs w-[80%] italic">
          Your password has been changed successfully. You can now log in with
          your new password.
        </Text>
        <View className="flex-1" />
        <View className="w-[90%] mb-[7%]">
          <SolidButton
            title="Log In"
            onPress={() => router.push("/Login/login")}
          />
        </View>
      </View>
    </View>
  );
}
