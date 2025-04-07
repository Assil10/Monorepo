import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
const blueEye = require("@/assets/blueEye.png");
const grayEye = require("@/assets/grayEye.png");
interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({
  placeholder,
  value,
  onChangeText,
}: PasswordInputProps): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View className="w-full relative">
      <TextInput
        className="border border-[#3f3f46] rounded-xl px-4 h-12 text-base text-[#fafafa] w-full py-3 bg-[#09090b] mb-3"
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />

      {/* Eye Icon Button */}
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        className="absolute right-1 transform -translate-y-1 flex items-center justify-center h-12 w-10"
      >
        <Image
          source={isPasswordVisible ? blueEye : grayEye}
          className="w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
}
