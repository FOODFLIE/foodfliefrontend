import apiClient from "../utils/apiClient";

// --- Seller Authentication ---

// Send Seller OTP
export const sendSellerOTP = async (phone) => {
  try {
    const response = await apiClient.post("/api/partner/send-otp", {
      phone,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

// Verify Seller OTP
export const verifySellerOTP = async (phone, otp) => {
  try {
    const response = await apiClient.post("/api/partner/verify-otp", {
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

// Register Seller
export const registerSeller = async (data) => {
  try {
    const response = await apiClient.post("/api/partner/register", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to register seller",
    );
  }
};
