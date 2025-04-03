import { View, Text, Image } from "react-native";

import { LoginCard } from "@/components/architect/index";

const BackgroundImage = require("@/assets/background.png");
const Logo = require("@/assets/logo.png");
export default function Login() {
  return (
    <View className="flex-1 bg-neutral-950">
      <View className="flex-1 justify-center items-center">
        <Image
          source={Logo}
          style={{ width: 90, height: 90, resizeMode: "contain" }}
          className="mb-6 mt-[-25%]"
        />
        <LoginCard />
      </View>
    </View>
  );
}
