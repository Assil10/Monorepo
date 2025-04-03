import axios from "axios";
import API_URL from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Signin API Call
export const signin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign-in`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = response.data;

    // Store the authentication token (or any relevant data) using AsyncStorage
    if (responseData.token) {
      await AsyncStorage.setItem("authToken", responseData.token);
    }

    return responseData; // Return the response data to handle in your component
  } catch (error: any) {
    // Handle error response gracefully
    throw error.response?.data || { message: "Signin failed" };
  }
};

// Function to retrieve the token (if needed)
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken"); // Retrieve the token
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

// Function to remove the token (Logout)
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken"); // Remove the token
  } catch (error) {
    console.error("Error removing auth token:", error);
  }
};
