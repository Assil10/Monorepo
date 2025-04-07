import { View, TextInput, TouchableOpacity, Image } from "react-native";

const calendarIcon = require("@/assets/calendar.png");

export default function DateInput({
  value = "",
  placeholder,
  onPress,
}: {
  value?: string;
  placeholder: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity className="w-full relative" onPress={onPress}>
      <TextInput
        className="border border-[#3f3f46] text-[#fafafa] rounded-xl px-4 h-12 text-base w-full pr-12 py-3 bg-[#09090b] mb-3"
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        editable={false} // Make it non-editable so users can only change via the picker
      />
      <View className="absolute right-1 flex items-center justify-center h-12 w-10">
        <Image
          source={calendarIcon}
          className="w-5 h-5 transform -translate-y-1"
        />
      </View>
    </TouchableOpacity>
  );
}
