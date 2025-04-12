import { View, Text, Image, TouchableOpacity } from "react-native";
import { PasswordResetCard } from "@/components/architect/index";
import { router } from "expo-router";

const BackButton = require("@/assets/back.png");
const OTP = require("@/assets/OTP.png");

export default function ResetPassword() {
  return (
    <View className="flex-1 bg-neutral-950">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="mt-2"
      >
        <Image source={BackButton} className="h-12 w-12" />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center pb-28">
        <Image
          source={OTP}
          style={{ resizeMode: "contain" }}
          className="w-28 h-28 mb-6"
        />
        <PasswordResetCard />
      </View>
    </View>
  );
}
