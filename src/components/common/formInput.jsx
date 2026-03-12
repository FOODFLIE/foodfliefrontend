import React from "react";

/**
 * Reusable form input component with icon and consistent styling
 */
const FormInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  maxLength,
  autoFocus = false,
  className = "",
}) => {
  return (
    <div className="group">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand/20 h-12 ${Icon ? "pl-12" : "pl-4"} pr-4 rounded-xl text-sm font-semibold transition-all outline-none disabled:opacity-75 ${className}`}
        />
      </div>
    </div>
  );
};

export default FormInput;
