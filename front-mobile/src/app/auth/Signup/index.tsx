import { View, Text, Image } from "react-native";
import { SignupCard } from "@/components/architect";
import { useRouter } from "expo-router";
const addAccount = require("@/assets/add-account.png");
export default function Signup() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-neutral-950">
      <View className="flex-1 justify-center items-center">
        <Image source={addAccount} className="w-20 h-20 mb-10" />
        {/* Renders the sign up form for personal details */}
        <SignupCard />
      </View>
    </View>
  );
}
