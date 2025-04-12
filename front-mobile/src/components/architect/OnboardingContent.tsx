import React from "react";
import { View, Text, Animated, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { OutlinedButton, SolidButton } from "../ui/index";

interface OnboardingPage {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttonText: string;
  secondaryButtonText: string;
}

interface OnboardingContentProps {
  currentPage: number;
  pages: OnboardingPage[];
  fadeAnim: Animated.Value;
  dotAnimations: Animated.Value[];
  handleNext: () => void;
  handleSkip: () => void;
}

export default function OnboardingContent({
  currentPage,
  pages,
  fadeAnim,
  dotAnimations,
  handleNext,
  handleSkip,
}: OnboardingContentProps) {
  return (
    <LinearGradient
      colors={["#061B98", "#0366FF", "#F0F4FA", "#FFFFFF"]}
      locations={[0, 0.26, 0.51, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 w-full justify-between">
        <View className="flex-1 justify-center items-center">
          <Animated.Image
            source={pages[currentPage].image}
            style={{
              width: "90%",
              height: 250,
              opacity: fadeAnim,
              resizeMode: "contain",
            }}
          />
          <View style={{ width: "90%", paddingHorizontal: 20 }}>
            <Animated.Text
              className="text-4xl font-bold mt-4 text-[#0366FF]"
              style={{ textAlign: "center", lineHeight: 50, opacity: fadeAnim }}
            >
              {pages[currentPage].title}
            </Animated.Text>
          </View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text className="text-center text-gray-700 mt-2 px-8">
              {pages[currentPage].description}
            </Text>
          </Animated.View>
        </View>
        <View className="w-full px-8">
          <SolidButton
            title={pages[currentPage].buttonText}
            onPress={handleNext}
            width="w-full"
            height="h-14"
            paddingX="px-4"
            paddingY="py-3"
          />
          <View className="mt-4">
            <OutlinedButton
              title={pages[currentPage].secondaryButtonText}
              onPress={
                currentPage === pages.length - 1
                  ? () => console.log("Sign In pressed")
                  : handleSkip
              }
              width="w-full"
              height="h-14"
              paddingX="px-4"
              paddingY="py-3"
            />
          </View>
        </View>
        <View className="flex-row justify-center mt-4 mb-5">
          {pages.map((_, i) => {
            const scale = dotAnimations[i].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.3],
            });
            return (
              <Animated.View
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  marginHorizontal: 4,
                  borderRadius: 4,
                  backgroundColor: currentPage === i ? "#3B82F6" : "#D1D5DB",
                  transform: [{ scale }],
                }}
              />
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
}
