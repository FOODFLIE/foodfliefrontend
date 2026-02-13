import React from "react";

/**
 * Header component for the authentication modal
 * Displays dynamic title and subtitle based on auth state
 * Optimized for mobile with responsive sizing and spacing
 */
const AuthModalHeader = ({ isLogin, step, phone }) => (
  <div className="mb-6 md:mb-8">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1.5 md:mb-2">
      {step === "send"
        ? isLogin
          ? "Welcome Back"
          : "Join Food Flie"
        : "Verify OTP"}
    </h2>
    <p className="text-sm sm:text-base text-slate-500 font-medium">
      {step === "send"
        ? isLogin
          ? "Enter your phone number to login"
          : "Create an account to start ordering"
        : `We've sent a 6-digit code to ${phone}`}
    </p>
  </div>
);

export default AuthModalHeader;
