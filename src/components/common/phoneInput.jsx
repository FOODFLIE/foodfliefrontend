import React from "react";
import { Phone } from "lucide-react";

/**
 * Specialized phone number input component with +91 country code
 */
const PhoneInput = ({ value, onChange, disabled = false }) => {
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
            onChange={onChange}
            placeholder="9876543210"
            className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand/20 h-12 pl-12 pr-4 rounded-r-xl text-sm font-semibold transition-all outline-none disabled:opacity-75"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
