import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SolidButton } from "@/components/ui/index";

const BackButton = require("@/assets/back.png");

export default function SignupSuccess() {
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
      <Text className="mt-12 text-6xl font-bold text-[#fafafa] mb-1 ml-1">
        All Done!
      </Text>
      <Text className="ml-1 text-[#a1a1aa] text-2xl">
        Your Account has been Created Successfully!
      </Text>
      <View className="flex-1" />
      <SolidButton
        title="Login"
        onPress={() => router.push("auth/Login")}
        width="35"
      />
      <View className="mt-5" />
    </View>
  );
}
