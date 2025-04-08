import { useState } from "react";
import { View, Text } from "react-native";
import { SolidButton, PasswordBarInput } from "../ui/index";
import { router } from "expo-router";

export default function PasswordResetCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = () => {
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    console.log("Password updated:", password);
    router.push("auth/Login/forgotPassword/resetDone");
  };

  return (
    <View className="w-[90%] h-auto bg-[#09090b] rounded-2xl border border-[#3f3f46] p-5">
      <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
        Create a strong Password
      </Text>
      <Text className="ml-1 text-[#a1a1aa] mb-6 text-small">
        Use at least 8 characters, including one uppercase letter, one lowercase
        letter, one number, and one special character.
      </Text>
      <PasswordBarInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <PasswordBarInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <SolidButton title="Update Password" onPress={handleUpdatePassword} />
      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      ) : null}
    </View>
  );
}
