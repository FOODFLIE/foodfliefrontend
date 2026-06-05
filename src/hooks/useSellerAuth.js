import { useState } from "react";
import {
  loginSeller,
  sendSellerOTP,
  verifySellerOTP,
  registerSeller,
} from "../services/sellerAuthService";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for Seller Authentication
 */
export const useSellerAuth = () => {
  const [step, setStep] = useState(1); // 1: Phone/Password, 2: OTP (registration), 3: Register
  const [isLogin, setIsLogin] = useState(true); // true: Login, false: Register
  const [registrationStep, setRegistrationStep] = useState(1); // 1: Info, 2: Docs, 3: Menu/Ops, 4: Contract
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { partnerLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    otp: "",
    name: "",
    email: "",
    store_name: "",
    outlet_type: "",
    address: "",
    area: "",
    pan_number: "",
    gst_number: "",
    fssai_number: "",
    bank_account_holder_name: "",
    bank_account_number: "",
    bank_ifsc: "",
    whatsapp_updates: true,
    opening_time: "09:00",
    closing_time: "21:00",
    working_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    menu_file: null,
    terms_accepted: false,
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    setError("");
  };

  // Handle Working Days Toggle
  const toggleWorkingDay = (day) => {
    setFormData((prev) => {
      const days = prev.working_days.includes(day)
        ? prev.working_days.filter((d) => d !== day)
        : [...prev.working_days, day];
      return { ...prev, working_days: days };
    });
  };

  // Navigation handlers
  const nextRegistrationStep = () =>
    setRegistrationStep((prev) => Math.min(prev + 1, 4));
  const prevRegistrationStep = () =>
    setRegistrationStep((prev) => Math.max(prev - 1, 1));

  // Step 1: Login or Send OTP for Registration
  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        // Login with password
        if (!formData.password) {
          setError("Please enter your password");
          return;
        }
        const response = await loginSeller(formData.phone, formData.password);
        partnerLogin(response.seller, response.token);
        navigate("/partner/dashboard");
      } else {
        // Send OTP for registration
        await sendSellerOTP(formData.phone);
        setStep(2);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await verifySellerOTP(formData.phone, formData.otp);

      // Check if existing user (token present) or new user (isNewUser: true)
      if (response.token && response.seller) {
        // Existing seller - login immediately
        partnerLogin(response.seller, response.token);
        navigate("/partner/dashboard"); // Redirect to dashboard
      } else if (response.isNewUser) {
        // New seller - proceed to registration
        setStep(3);
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Register
  const handleRegister = async () => {
    if (!formData.terms_accepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const { otp, menu_file, terms_accepted, ...payload } = formData;

 

      const response = await registerSeller(payload);
      if (response.token && response.seller) {
        partnerLogin(response.seller, response.token);
        setSuccess(true); // Show success message
        setTimeout(() => {
          navigate("/partner/dashboard");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetStep = () => {
    setStep(1);
    setRegistrationStep(1);
    setError("");
    setFormData(prev => ({ ...prev, password: "", otp: "" }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData(prev => ({ ...prev, password: "", otp: "" }));
  };

  return {
    step,
    isLogin,
    registrationStep,
    nextRegistrationStep,
    prevRegistrationStep,
    loading,
    success,
    error,
    formData,
    handleInputChange,
    toggleWorkingDay,
    handleSubmitAuth,
    handleVerifyOTP,
    handleRegister,
    resetStep,
    toggleAuthMode,
  };
};
