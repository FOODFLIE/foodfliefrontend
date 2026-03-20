import { useState } from "react";
import {
  sendLoginOTP,
  sendRegisterOTP,
  verifyLoginOTP,
  verifyRegisterOTP,
} from "../services/authService";

/**
 * Custom hook for handling OTP-based authentication
 * @param {Function} onSuccess - Callback when authentication succeeds
 * @returns {Object} - State and handlers for OTP authentication
 */
export const useOTPAuth = (onSuccess) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("send"); // 'send' or 'verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    otp: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Format phone number with country code
  const getFullPhone = () => `+91${formData.phone}`;

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullPhone = getFullPhone();
      let response;
     if (isLogin) {
      response = await sendLoginOTP(fullPhone);
    } else {
      response = await sendRegisterOTP(
        fullPhone,
        formData.name,
        formData.email
      );
    }
    console.log("OTP Response:", response);
        // 🔥 NEW LOGIC: check if backend already returned token
    if (response?.token && response?.customer) {
      onSuccess(response.customer, response.token, isLogin);
    } else {
      // fallback to OTP step
      setStep("verify");
    }
    } catch (err) {
      setError(err.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullPhone = getFullPhone();
      let response;
      if (isLogin) {
        response = await verifyLoginOTP(fullPhone, formData.otp);
      } else {
        response = await verifyRegisterOTP(fullPhone, formData.otp);
      }

      // Handle the specific structure: { token, customer }
      const userData = response.customer || response.user || response;
      const userToken = response.token;

      if (userData && userToken) {
        onSuccess(userData, userToken, isLogin);
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setStep("send");
    setError("");
    setFormData({ phone: "", name: "", email: "", otp: "" });
  };

  // Reset to send step
  const resetToSend = () => {
    setStep("send");
    setFormData({ ...formData, otp: "" });
  };

  // Reset all state
  const resetAuth = () => {
    setStep("send");
    setError("");
    setFormData({ phone: "", name: "", email: "", otp: "" });
  };

  return {
    // State
    isLogin,
    step,
    loading,
    error,
    formData,
    // Handlers
    handleInputChange,
    handleSendOTP,
    handleVerifyOTP,
    toggleAuthMode,
    resetToSend,
    resetAuth,
  };
};
