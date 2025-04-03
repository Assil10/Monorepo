import { View, Text, Image, TouchableOpacity } from "react-native";
import { OTPResetCard } from "@/components/architect/index";
import { router } from "expo-router";
const BackgroundImage = require("@/assets/background.png");
const BackButton = require("@/assets/back.png");
const OTP = require("@/assets/OTP.png");

export default function OTPReset() {
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
      <View className="flex-1 justify-center items-center">
        <Image
          source={OTP}
          style={{ width: 90, height: 90, resizeMode: "contain" }}
          className="mb-4 mt-[-40%]"
        />
        <Text className="text-4xl font-bold text-center text-[#F0F4FA] w-[80%]">
          Verify it's You
        </Text>
        <Text className="text-center text-[#F0F4FA] mb-6 text-xs w-[80%] italic">
          We've sent a 4-digit code to your email. Enter it below to continue.
        </Text>
        <OTPResetCard />
      </View>
    </View>
  );
}
