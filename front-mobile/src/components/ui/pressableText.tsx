import { View, Text, TouchableOpacity } from "react-native";

export default function PressableText({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-[#a1a1aa] text-xs underline">{text}</Text>
    </TouchableOpacity>
  );
}
