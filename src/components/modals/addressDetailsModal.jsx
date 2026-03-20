import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Home,
  Briefcase,
  MapPin,
  MapPinIcon,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { saveAddress } from "../../services/addressService";

// Validation rules
const validators = {
  buildingName: (value) => {
    if (!value.trim()) return "Building name / Flat no is required";
    if (value.trim().length < 2) return "Too short (min 2 characters)";
    return "";
  },
  receiverName: (value) => {
    if (!value.trim()) return "Receiver name is required";
    if (value.trim().length < 2) return "Name too short (min 2 characters)";
    if (!/^[a-zA-Z\s]+$/.test(value.trim()))
      return "Name should only contain letters";
    return "";
  },
  receiverNumber: (value) => {
    if (!value.trim()) return "Phone number is required";
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length !== 10) return "Phone number must be exactly 10 digits";
    return "";
  },
};

const AddressDetailsModal = ({
  isOpen,
  onClose,
  address,
  shortAddress,
  coords,
  onSave,
  onEdit,
}) => {
  const { user } = useAuth();
  const [addressCategory, setAddressCategory] = useState("home");
  const [formData, setFormData] = useState({
    companyFloor: "",
    buildingName: "",
    landmark: "",
    receiverName: "",
    receiverNumber: "",
   
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const buildingRef = useRef(null);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        receiverName: user.name || "",
        receiverNumber: user.phone?.replace("+91", "") || "",
      }));
    }
  }, [user]);

  // Auto-focus the building name field when modal opens
  useEffect(() => {
    if (isOpen && buildingRef.current) {
      setTimeout(() => buildingRef.current.focus(), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For pincode & phone: only allow digits
   
    if (name === "receiverNumber" && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was already touched
    if (touched[name] && validators[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Trim whitespace on blur
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    if (validators[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const error = validators[key](formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      buildingName: true,
      receiverName: true,
      receiverNumber: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateAll()) return;

    setIsSaving(true);

    try {
      const payload = {
        address_line1: `${formData.buildingName}${
          formData.companyFloor ? `, ${formData.companyFloor}` : ""
        }${formData.landmark ? `, Near ${formData.landmark}` : ""}`,
        city: shortAddress || "Unknown",
       
        latitude: coords?.lat || 0,
        longitude: coords?.lng || 0,
        address_type: addressCategory,
        is_default: false,
        building_name: formData.buildingName,
        company_floor: formData.companyFloor,
        landmark: formData.landmark,
        receiver_name: formData.receiverName,
        receiver_number: formData.receiverNumber,
      };

      await saveAddress(payload);

      onSave({
        ...formData,
        category: addressCategory,
        coords,
        fullAddress: address,
        shortAddress: shortAddress,
      });
    } catch (error) {
      console.error("Failed to save address:", error);
      setErrorMsg(
        typeof error === "string"
          ? error
          : error?.message || "Failed to save address. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const getFieldClasses = (fieldName) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `w-full h-14 bg-white border rounded-xl px-4 text-sm outline-none transition-all duration-200 ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
    }`;
  };

  const categories = [
    { key: "home", label: "Home", Icon: Home },
    { key: "work", label: "Work", Icon: Briefcase },
    { key: "other", label: "Others", Icon: MapPinIcon },
  ];

  const isFormValid =
    formData.buildingName.trim() &&
    
    formData.receiverName.trim() &&
    formData.receiverNumber.trim() &&
    Object.values(errors).every((e) => !e);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg max-h-[95vh] rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800">
            Add Address Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Address Preview */}
          <div className="bg-[#F8F8FD] rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-700">
              <div className="p-2 bg-slate-900 rounded-full">
                <Home size={16} className="text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-800 truncate">
                  {shortAddress || "Selected Location"}
                </h3>
                <button
                  onClick={onEdit}
                  className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shrink-0 ml-2"
                >
                  Edit
                </button>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {address}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Save Address As */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Save Address as
              </label>
              <div className="flex items-center gap-3">
                {categories.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAddressCategory(key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
                      addressCategory === key
                        ? "bg-brand-muted border-brand text-brand shadow-sm"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <div>
                <input
                  ref={buildingRef}
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Building name / Flat no *"
                  className={getFieldClasses("buildingName")}
                  aria-invalid={!!errors.buildingName}
                  maxLength={100}
                />
                {touched.buildingName && errors.buildingName && (
                  <p
                    className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.buildingName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="companyFloor"
                  value={formData.companyFloor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Company name / Floor (Optional)"
                  className="w-full h-14 bg-white border border-slate-200 rounded-xl px-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  maxLength={100}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Landmark (Optional)"
                  className="w-full h-14 bg-white border border-slate-200 rounded-xl px-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  maxLength={100}
                />
              </div>

     
            </div>

            {/* Receiver Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Receiver Details
              </p>

              <div>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Receiver Name *"
                  className={getFieldClasses("receiverName")}
                  aria-invalid={!!errors.receiverName}
                  maxLength={50}
                />
                {touched.receiverName && errors.receiverName && (
                  <p
                    className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.receiverName}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none z-10">
                  <img
                    src="https://flagcdn.com/in.svg"
                    className="w-5 rounded-sm"
                    alt="India"
                  />
                  <span className="text-sm text-slate-500 font-medium">
                    +91
                  </span>
                </div>
                <input
                  type="text"
                  name="receiverNumber"
                  inputMode="numeric"
                  value={formData.receiverNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Phone Number *"
                  className={`${getFieldClasses("receiverNumber")} pl-[5.5rem]`}
                  aria-invalid={!!errors.receiverNumber}
                  maxLength={10}
                />
                {touched.receiverNumber && errors.receiverNumber && (
                  <p
                    className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.receiverNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Global Error */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-xs font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full h-14 rounded-2xl font-bold text-base transition-all duration-200 mt-2 flex items-center justify-center gap-2 ${
                isFormValid && !isSaving
                  ? "bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-xl active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressDetailsModal;
