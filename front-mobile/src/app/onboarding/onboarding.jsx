import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import pages from "@/data/onboardingPages";
import OnboardingContent from "@/components/architect/OnboardingContent";

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const dotAnimations = useRef(
    pages.map((_, i) => new Animated.Value(i === currentPage ? 1 : 0)),
  ).current;

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSkip = () => setCurrentPage(pages.length - 1);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);

  useEffect(() => {
    Animated.parallel(
      dotAnimations.map((anim, i) =>
        Animated.timing(anim, {
          toValue: currentPage === i ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [currentPage]);

  return (
    <OnboardingContent
      currentPage={currentPage}
      //error
      pages={pages}
      fadeAnim={fadeAnim}
      dotAnimations={dotAnimations}
      handleNext={handleNext}
      handleSkip={handleSkip}
    />
  );
}
