import React, { useState } from "react";
import {
  X,
  MapPin,
  Loader2,
  AlertCircle,
  Compass,
  Target,
  Globe,
  Navigation,
  Search,
  Plus,
  Home,
  ChevronRight,
} from "lucide-react";
import { useUserLocation } from "../../context/locationContext";

const LocationModal = ({ isOpen, onClose }) => {
  const { coords, address, error, loading, updateLocation } = useUserLocation();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom sm:zoom-in-95 duration-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-800 font-poppins capitalize">
            Your Location
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-zepto-purple transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search for a new address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F5FA] border border-transparent focus:bg-white focus:border-zepto-purple/20 h-12 pl-12 pr-4 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>

            {/* Use My Current Location Section */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:border-zepto-purple/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 relative flex items-center justify-center">
                    <div
                      className={`p-2 rounded-xl bg-zepto-purple/5 text-zepto-purple ${loading ? "animate-pulse" : ""}`}
                    >
                      {loading ? (
                        <Target size={20} className="animate-spin" />
                      ) : (
                        <Navigation
                          size={20}
                          fill="currentColor"
                          className="rotate-45"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-[#5e17eb]">
                      Use My Current Location
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">
                      Enable your current location for better services
                    </span>
                  </div>
                </div>
                <button
                  onClick={updateLocation}
                  disabled={loading}
                  className="px-4 py-1.5 bg-white border-2 border-zepto-purple/10 text-zepto-purple text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zepto-purple/5 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    "Enable"
                  )}
                </button>
              </div>

              {/* Radar Scan Visual in loading state */}
              {loading && (
                <div className="mt-4 py-8 flex flex-col items-center justify-center relative border-t border-slate-50 animate-fade-in">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border border-zepto-purple/10 rounded-full animate-pulse"></div>
                    <div
                      className="absolute inset-0 rounded-full animate-radar origin-center"
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(94, 23, 235, 0.1) 0%, transparent 20%)",
                      }}
                    ></div>
                    <MapPin
                      size={24}
                      className="text-zepto-purple"
                      fill="currentColor"
                    />
                  </div>
                  <span className="text-[9px] font-black text-zepto-purple mt-4 uppercase tracking-[0.2em] animate-pulse">
                    Scanning Satellites...
                  </span>
                </div>
              )}

              {address && address !== "Detecting..." && !loading && (
                <div className="mt-3 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-200 animate-fade-in">
                  📍 {address}
                </div>
              )}
            </div>

            {/* Add New Address Option */}
            <button className="w-full bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:border-zepto-purple/20 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-50 text-pink-500 group-hover:bg-pink-100 transition-colors">
                  <Plus size={20} strokeWidth={3} />
                </div>
                <span className="text-sm font-black text-pink-500">
                  Add New Address
                </span>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-300 group-hover:text-pink-500 transition-all group-hover:translate-x-1"
              />
            </button>

            {/* Saved Addresses Section */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">
                Saved Addresses
              </h3>

              {/* Hostel */}
              <div className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer rounded-2xl border border-transparent hover:border-slate-100">
                <div className="mt-1 p-2 rounded-xl bg-slate-100 text-slate-500">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-black text-slate-800">
                    Hostel
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                    4th floor, sri baljai mens pg, Kukatpally, K P H B Phase 1,
                    Hyderabad
                  </p>
                </div>
              </div>

              {/* Home */}
              <div className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer rounded-2xl border border-transparent hover:border-slate-100">
                <div className="mt-1 p-2 rounded-xl bg-slate-100 text-slate-500">
                  <Home size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-black text-slate-800">
                    Home
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                    123, Kukatpally, K P H B Phase 1, Hyderabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="px-6 pb-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3 text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
              <AlertCircle size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {error}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
