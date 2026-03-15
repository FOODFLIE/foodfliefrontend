import apiClient from "../utils/apiClient";

// --- Registration ---
export const sendRegisterOTP = async (phone, name, email) => {
  try {
    const response = await apiClient.post("/api/customer/register/send-otp", {
      phone,
      name,
      email,
    });
   
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

export const verifyRegisterOTP = async (phone, otp) => {
  try {
    const response = await apiClient.post("/api/customer/register/verify-otp", {
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

// --- Login ---
export const sendLoginOTP = async (phone) => {
  try {
    const response = await apiClient.post("/api/customer/login/send-otp", {
      phone,
    });
 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

export const verifyLoginOTP = async (phone, otp) => {
  try {
    const response = await apiClient.post("/api/customer/login/verify-otp", {
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};
