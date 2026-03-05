import React, { useState, useEffect } from "react";
import {
  X,
  Home,
  Briefcase,
  MapPin,
  MapPinIcon,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { saveAddress } from "../../services/addressService";

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
  const [addressCategory, setAddressCategory] = useState("Home");
  const [formData, setFormData] = useState({
    companyFloor: "",
    buildingName: "",
    landmark: "",
    receiverName: "",
    receiverNumber: "",
    pincode: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        receiverName: user.name || "",
        receiverNumber: user.phone || "",
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      // Map to the required API payload structure
      const payload = {
        address_line1: `${formData.buildingName}${
          formData.companyFloor ? `, ${formData.companyFloor}` : ""
        }${formData.landmark ? `, ${formData.landmark}` : ""}`,
        city: shortAddress || "Unknown",
        pincode: formData.pincode || "000000",
        latitude: coords?.lat || 0,
        longitude: coords?.lng || 0,
        address_type: addressCategory.toLowerCase(),
        is_default: false,
      };

      await saveAddress(payload);

      // Continue to the original local state save behavior
      onSave({
        ...formData,
        category: addressCategory,
        coords,
        fullAddress: address,
        shortAddress: shortAddress,
      });
    } catch (error) {
      console.error("Failed to save address:", error);
      setErrorMsg("Failed to save address. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="p-6 space-y-8 overflow-y-auto">
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
                  className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Edit
                </button>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {address}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Save Address As */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Save Address as
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAddressCategory("Home")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    addressCategory === "Home"
                      ? "bg-white border-[#FC105F] text-[#FC105F]"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  <Home size={18} />
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => setAddressCategory("Work")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    addressCategory === "Work"
                      ? "bg-white border-[#FC105F] text-[#FC105F]"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  <Briefcase size={18} />
                  Work
                </button>
                <button
                  type="button"
                  onClick={() => setAddressCategory("Others")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    addressCategory === "Others"
                      ? "bg-white border-[#FC105F] text-[#FC105F]"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  <MapPinIcon size={18} />
                  Others
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="companyFloor"
                  value={formData.companyFloor}
                  onChange={handleChange}
                  placeholder="Company name / Floor (Optional)"
                  className="w-full h-14 bg-white border border-slate-100 rounded-xl px-4 text-sm outline-none focus:border-slate-300 transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  placeholder="Building name / Flat no *"
                  required
                  className="w-full h-14 bg-white border border-slate-100 rounded-xl px-4 text-sm outline-none focus:border-slate-300 transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Landmark (Optional)"
                  className="w-full h-14 bg-white border border-slate-100 rounded-xl px-4 text-sm outline-none focus:border-slate-300 transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode *"
                  required
                  className="w-full h-14 bg-white border border-slate-100 rounded-xl px-4 text-sm outline-none focus:border-slate-300 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="relative">
                <span className="absolute left-4 -top-2.5 px-1 bg-white text-[10px] font-bold text-slate-400 uppercase">
                  Receiver Name
                </span>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-slate-200 rounded-xl px-4 text-sm outline-none focus:border-slate-400 transition-colors"
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 -top-2.5 px-1 bg-white text-[10px] font-bold text-slate-400 uppercase">
                  Receiver Number
                </span>
                <input
                  type="text"
                  name="receiverNumber"
                  value={formData.receiverNumber}
                  onChange={handleChange}
                  className="w-full h-14 bg-white border border-slate-200 rounded-xl px-4 text-sm outline-none focus:border-slate-400 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <img
                    src="https://flagcdn.com/in.svg"
                    className="w-5 rounded-sm"
                    alt="India"
                  />
                  <ChevronRight
                    size={14}
                    className="text-slate-400 rotate-90"
                  />
                </span>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-medium text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className={`w-full h-14 rounded-2xl font-bold text-base transition-all mt-4 flex items-center justify-center ${
                formData.buildingName && formData.pincode && !isSaving
                  ? "bg-[#FC105F] text-white shadow-lg shadow-pink-100 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!formData.buildingName || !formData.pincode || isSaving}
            >
              {isSaving ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressDetailsModal;
