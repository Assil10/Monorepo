import { View, Text, Image, TouchableOpacity } from "react-native";
import { SolidButton } from "@/components/ui";
import { router } from "expo-router";

const BackButton = require("@/assets/back.png");
const Checked = require("@/assets/checked.png");

export default function ResetDone() {
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
      <View className="flex-1 items-center">
        <Image
          source={Checked}
          style={{ resizeMode: "contain" }}
          className="w-28 h-28 mb-6 mt-28"
        />
        <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
          You're All Set!
        </Text>
        <Text className="text-[#a1a1aa] mb-6 text-small text-center ml-5 mr-5">
          Your password has been changed successfully. You can now log in with
          your new password.
        </Text>
        <View className="flex-1" />
        <View className="w-[90%] mb-[7%]">
          <SolidButton
            title="Log In"
            onPress={() => router.push("auth/Login")}
          />
        </View>
      </View>
    </View>
  );
}
