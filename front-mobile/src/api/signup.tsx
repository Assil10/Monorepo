import axios from "axios";
import API_URL from "@/constants/api";

interface SignupData {
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  password: string;
  // phone: string; // omitted or never used
}

export const signupUser = async (data: SignupData) => {
  // No phone in the payload
  const response = await axios.post(`${API_URL}/auth/sign-up`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const verifySignUp = async (email: string, code: string) => {
  const response = await axios.post(`${API_URL}/auth/verifysign`, {
    email,
    code,
  });
  return response.data;
};
