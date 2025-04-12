import React from "react";
import { View } from "react-native";

interface PaginationDotsProps {
  currentPage: number;
  total: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentPage,
  total,
}) => {
  return (
    <View className="flex-row justify-center mt-4 mb-5">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`w-2 h-2 mx-1 rounded-full ${
            currentPage === index ? "bg-blue-500" : "bg-gray-300"
          }`}
        />
      ))}
    </View>
  );
};

export default PaginationDots;
