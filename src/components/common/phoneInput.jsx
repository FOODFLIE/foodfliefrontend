import React, { useState } from "react";
import { Phone, AlertCircle } from "lucide-react";

/**
 * Specialized phone number input component with +91 country code
 */
const PhoneInput = ({ value, onChange, disabled = false, error, onValidation }) => {
  const [localError, setLocalError] = useState("");
  
  const validatePhone = (phoneValue) => {
    if (!phoneValue) {
      return "Phone number is required";
    }
    if (phoneValue.length < 10) {
      return "Phone number must be 10 digits";
    }
    if (!/^[6-9]/.test(phoneValue)) {
      return "Phone number must start with 6, 7, 8, or 9";
    }
    return "";
  };
  
  // Check if phone is valid (exactly 10 digits, starts with 6-9)
  const isValidPhone = value && value.length === 10 && /^[6-9]\d{9}$/.test(value);
  
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Only allow digits
    const numericValue = inputValue.replace(/\D/g, '');
    
    // Prevent input if it would exceed 10 digits
    if (numericValue.length > 10) {
      return; // Don't update if trying to enter more than 10 digits
    }
    
    // Validate the phone number
    const validationError = validatePhone(numericValue);
    setLocalError(validationError);
    
    // Call parent validation callback if provided
    if (onValidation) {
      onValidation(!validationError && numericValue.length === 10);
    }
    
    // Create a new event object with the filtered value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: numericValue
      }
    };
    
    onChange(syntheticEvent);
  };
  
  const displayError = error || localError;
  const hasError = !!displayError;
  return (
    <div className="group">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
        Phone Number
      </label>
      <div className="relative flex">
        <div className="flex items-center justify-center px-4 bg-slate-100 border border-r-0 border-slate-100 rounded-l-xl text-sm font-bold text-slate-500">
          +91
        </div>
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors">
            <Phone size={18} />
          </div>
          <input
            required
            disabled={disabled}
            type="tel"
            name="phone"
            value={value}
            onChange={handlePhoneChange}
            placeholder="9876543210"
            maxLength="10"
            pattern="[0-9]{10}"
            className={`w-full bg-slate-50 border focus:bg-white h-12 pl-12 pr-4 rounded-r-xl text-sm font-semibold transition-all outline-none disabled:opacity-75 ${
              hasError 
                ? 'border-red-300 focus:border-red-400' 
                : 'border-slate-100 focus:border-brand/20'
            }`}
          />
        </div>
      </div>
      {displayError && (
        <div className="flex items-center gap-2 mt-2 text-red-500">
          <AlertCircle size={14} />
          <span className="text-xs font-medium">{displayError}</span>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
