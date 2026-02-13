import React from "react";

/**
 * Footer component for the authentication modal
 * Handles mode toggle and displays terms/privacy policy
 * Sticky on mobile for better accessibility
 */
const AuthModalFooter = ({ isLogin, onToggle }) => (
  <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-4 sm:pb-0 border-t border-slate-100 -mx-4 sm:mx-0 px-4 sm:px-0 sm:static sm:border-t-0 sm:pt-6 sm:mt-8">
    {/* Toggle Button */}
    <div className="text-center mb-3 sm:mb-0">
      <p className="text-sm text-slate-500 font-medium">
        {isLogin ? "New to Food Flie?" : "Already have an account?"}{" "}
        <button
          onClick={onToggle}
          className="text-zepto-purple font-bold hover:underline active:scale-95 transition-transform inline-block min-h-[44px] sm:min-h-0 flex items-center justify-center"
        >
          {isLogin ? "Create Account" : "Login Now"}
        </button>
      </p>
    </div>

    {/* Terms - Hidden on mobile when sticky, visible on desktop */}
    <p className="hidden sm:block mt-6 text-[10px] text-slate-400 text-center font-medium leading-relaxed">
      By clicking continue, you agree to our{" "}
      <span className="underline cursor-pointer">Terms of Service</span> and{" "}
      <span className="underline cursor-pointer">Privacy Policy</span>
    </p>
  </div>
);

export default AuthModalFooter;
