import { View, Text, Image, TouchableOpacity } from "react-native";
import { PasswordCard } from "@/components/architect";
import { useLocalSearchParams, useRouter } from "expo-router";

const BackgroundImage = require("@/assets/background.png");
const BackButton = require("@/assets/back.png");
const Lock = require("@/assets/lock.png");

export default function PasswordSignupInput() {
  const router = useRouter();
  // These are the params passed from the first step (SignupCard)
  const { name, surname, email, phone, birthdate } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-neutral-950">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="mt-2"
      >
        <Image source={BackButton} className="h-12 w-12" />
      </TouchableOpacity>

      <View className="flex-1 justify-center items-center">
        <Image source={Lock} className="w-20 h-20 mb-10 mt-[-40%]" />

        {/* PasswordCard now needs to know the user's name/surname/email/phone/birthdate */}
        <PasswordCard
          name={name as string}
          surname={surname as string}
          email={email as string}
          birthdate={birthdate as string}
        />
      </View>
    </View>
  );
}
