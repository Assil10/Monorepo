import { useState } from "react";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";

export default function RememberMeCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View className="flex-row items-center">
        <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#0366FF" : "#A0A0A0"}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
            width: 13,
            height: 13,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: isChecked ? "#4F46E5" : "#A0A0A0",
            }}
        />
        <Text className="ml-2 text-gray-400 text-xs font-semibold leading-none">
            Remember me
        </Text>
    </View>
  );
}
