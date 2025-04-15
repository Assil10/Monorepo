import { View, Modal, TouchableWithoutFeedback, Animated } from "react-native";

import DatePicker from "react-native-modern-datepicker";
import React, { useEffect, useRef } from "react";
import { datePickerOptions, datePickerStyles } from "@/constants/styles";

export default function BirthdayPicker({
  isBirthdayPickerVisible,
  onSelectDate,
  setIsBirthdayPickerVisible,
}: {
  isBirthdayPickerVisible: boolean;
  onSelectDate: (date: string) => void;
  setIsBirthdayPickerVisible: (value: boolean) => void;
}) {
  const slideAnim = useRef(new Animated.Value(500)).current; // Start off-screen

  useEffect(() => {
    if (isBirthdayPickerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide into view
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isBirthdayPickerVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isBirthdayPickerVisible}
    >
      <TouchableWithoutFeedback
        onPress={() => setIsBirthdayPickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }], //TODO: the animation has a slight issue when sliding in
                padding: 16,
                borderRadius: 10,
              }}
            >
              <DatePicker
                onSelectedChange={(date) => {
                  onSelectDate(date);
                }}
                mode="calendar"
                style={datePickerStyles}
                options={datePickerOptions}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
