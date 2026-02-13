import React from "react";
import { X, User, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useOTPAuth } from "../hooks/useOTPAuth";
import FormInput from "./common/FormInput";
import PhoneInput from "./common/PhoneInput";
import AuthModalHeader from "./auth/AuthModalHeader";
import AuthModalFooter from "./auth/AuthModalFooter";

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  // Use custom hook for all authentication logic
  const {
    isLogin,
    step,
    loading,
    error,
    formData,
    handleInputChange,
    handleSendOTP,
    handleVerifyOTP,
    toggleAuthMode,
    resetToSend,
  } = useOTPAuth((userData, userToken, isLoginMode) => {
    login(userData, userToken);
    alert(isLoginMode ? "Welcome back!" : "Account created successfully!");
    onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pt-12 sm:pt-10 pb-4 sm:pb-8">
          {/* Header */}
          <AuthModalHeader
            isLogin={isLogin}
            step={step}
            phone={formData.phone}
          />

          {/* Form */}
          <form
            onSubmit={step === "send" ? handleSendOTP : handleVerifyOTP}
            className="space-y-4"
          >
            <div className="space-y-4">
              {/* Registration Fields */}
              {!isLogin && step === "send" && (
                <>
                  <FormInput
                    label="Full Name"
                    icon={User}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <FormInput
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </>
              )}

              {/* Phone Input */}
              <PhoneInput
                value={formData.phone}
                onChange={handleInputChange}
                disabled={step === "verify"}
              />

              {/* OTP Input */}
              {step === "verify" && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <FormInput
                    label="6-Digit OTP"
                    icon={ShieldCheck}
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="123456"
                    maxLength={6}
                    autoFocus
                    required
                    className="tracking-[0.5em] font-black"
                  />
                  <button
                    type="button"
                    onClick={resetToSend}
                    className="mt-2 text-xs font-bold text-zepto-purple hover:underline min-h-[44px] sm:min-h-0 flex items-center"
                  >
                    Edit Phone Number?
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs font-bold text-rose-500 bg-rose-50 p-3 rounded-lg border border-rose-100 mt-4">
                {error}
              </p>
            )}

            {/* Submit Button - Larger touch target on mobile */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-zepto-purple text-white h-14 sm:h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-zepto-purple/20 hover:bg-zepto-dark active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all font-bold text-sm mt-6 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {step === "send" ? "Send OTP" : "Verify & Sign In"}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          {/* Extra spacing for sticky footer on mobile */}
          <div className="h-20 sm:h-0" />
        </div>

        {/* Sticky Footer */}
        <AuthModalFooter isLogin={isLogin} onToggle={toggleAuthMode} />
      </div>
    </div>
  );
};

export default AuthModal;
