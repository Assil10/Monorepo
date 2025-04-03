import { View, Text, Image, TouchableOpacity } from "react-native";
import { OTPCard } from "@/components/architect";
import { useLocalSearchParams, useRouter } from "expo-router";

const BackgroundImage = require("@/assets/background.png");
const BackButton = require("@/assets/back.png");
const OTP = require("@/assets/OTP.png");

export default function VerificationScreen() {
  const router = useRouter();
  // Only email is required to verify
  const { email } = useLocalSearchParams();

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

      <View className="flex-1 justify-center items-center">
        <Image
          source={OTP}
          style={{ width: 90, height: 90, resizeMode: "contain" }}
          className="mb-4 mt-[-40%]"
        />
        <OTPCard email={email as string} />
      </View>
    </View>
  );
}
