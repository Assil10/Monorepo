import { View, Text } from "react-native";
import { SolidButton, OTPInput, PressableText } from "../ui";
import { useRouter } from "expo-router";
import { verifySignUp } from "@/api/signup";
import { useState } from "react";

interface OTPCardProps {
  email: string;
}

export default function OTPCard({ email }: OTPCardProps) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    // Reset error message on each attempt
    setErrorMessage("");

    const code = otp.join(""); // e.g. ["1","2","3","4"] => "1234"
    if (code.length < 4) {
      setErrorMessage("Please enter the 4-digit code.");
      return;
    }

    try {
      await verifySignUp(email, code);
      // If successful, route to next screen
      router.replace("/Login/login");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error?.message || "Verification failed. Please try again."
      );
    }
  };

  return (
    <View className="w-[90%] h-auto bg-[#09090b] rounded-2xl border border-[#3f3f46] p-5">
      <Text className="text-4xl font-bold text-[#fafafa] mb-1 ml-1">
        Verify Your Account
      </Text>
      <Text className="ml-1 text-[#a1a1aa] mb-6 text-small">
        We've sent a 4-digit code to your email. Enter it below to continue.
      </Text>

      <View className="items-center mb-3">
        <OTPInput otp={otp} setOtp={setOtp} />
      </View>

      <SolidButton title="Verify & Continue" onPress={handleVerify} />

      {/* Show error message if any */}
      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      ) : null}

      <View className="flex-row justify-center items-center pt-4 mb-3">
        <Text className="ml-2 text-gray-400 text-xs font-semibold">
          Didn't receive any code?
        </Text>
        <PressableText
          text=" Resend Code"
          onPress={() => {
            // Optionally call an endpoint to resend the code
            console.log("Resend Code pressed");
            router.push("auth/Signup/signupDone.tsx");
          }}
        />
      </View>
    </View>
  );
}
