import { TouchableOpacity, Text, View, Image } from "react-native";

const GoogleLogo = require("@/assets/google.png");
export default function GoogleButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center bg-[#09090b] border border-[#3f3f46] rounded-xl py-3 "
      onPress={onPress}
    >
      <Image
        className="w-6 h-6 mr-2"
        source={GoogleLogo}
        resizeMode="contain"
      />

      <Text className="text-[#fafafa] text-md font-bold">{text}</Text>
    </TouchableOpacity>
  );
}
