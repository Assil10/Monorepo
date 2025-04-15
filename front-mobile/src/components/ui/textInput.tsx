import { View, TextInput } from "react-native";

export default function Input({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View>
      <TextInput
        className="border border-[#3f3f46] rounded-xl px-4 h-12 text-base text-[#fafafa] w-full py-3 bg-[#09090b] mb-3"
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        multiline={false}
        value={value}
        onChangeText={onChangeText} // Capture input
      />
    </View>
  );
}
