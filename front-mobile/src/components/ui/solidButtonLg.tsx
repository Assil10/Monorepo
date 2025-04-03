import { Text, TouchableOpacity } from "react-native";

interface SolidButtonProps {
  title: string;
  onPress: () => void;
  width?: string;
  height?: string;
  paddingX?: string;
  paddingY?: string;
}

export default function SolidButtonLg({
  title,
  onPress,
  width = "w-auto",
  height = "11",
  paddingX = "px-4",
  paddingY = "py-3",
}: SolidButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center bg-[#fafafa] rounded-xl w-${width} h-14 px-${paddingX} py-${paddingY}`}
      onPress={onPress}
    >
      <Text className="font-medium text-[#09090b] text-center text-xl">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
