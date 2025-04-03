import { View, Text } from "react-native";

export default function DividerWithText({ text }: { text: string }) {
  return (
    <View className="flex-row items-center w-full my-4">
      {/* Left Line */}
      <View className="flex-1 h-[1px] bg-[#3f3f46]" />

      {/* Text */}
      <Text className="text-[#a1a1aa] mx-4 text-sm">{text}</Text>

      {/* Right Line */}
      <View className="flex-1 h-[1px] bg-[#3f3f46]" />
    </View>
  );
}
