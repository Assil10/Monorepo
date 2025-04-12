import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import * as Progress from "react-native-progress";

const blueEye = require("@/assets/blueEye.png");
const grayEye = require("@/assets/grayEye.png");

interface PasswordInputProps {
  placeholder: string;
  value: string; // pass in from parent
  onChangeText: (val: string) => void; // parent updates the state
}

export default function PasswordInput({
  placeholder,
  value,
  onChangeText,
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Simple criteria to determine password strength
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length > 0) score += 0.2;
    if (password.length >= 6) score += 0.3;
    if (/[A-Z]/.test(password)) score += 0.2;
    if (/[0-9]/.test(password)) score += 0.2;
    if (/[\W_]/.test(password)) score += 0.1;
    return Math.min(score, 1);
  };

  const passwordStrength = calculatePasswordStrength(value);

  return (
    <View className="w-full relative mb-3">
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

      {/* Progress Bar to indicate password strength */}
      <Progress.Bar
        progress={passwordStrength}
        width={passwordStrength > 0 ? 175 : 0}
        height={3}
        color={
          passwordStrength < 0.4
            ? "#FF4D4D" // Weak
            : passwordStrength < 0.7
            ? "#FFA500" // Medium
            : "#00C851" // Strong
        }
        unfilledColor="#D3D3D3"
        borderWidth={0}
        style={{ marginHorizontal: 5, marginTop: -3 }}
      />
    </View>
  );
}
