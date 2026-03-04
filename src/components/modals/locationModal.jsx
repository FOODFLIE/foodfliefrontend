import React, { useState } from "react";
import {
  X,
  MapPin,
  Loader2,
  AlertCircle,
  Target,
  Navigation,
  Search,
  Plus,
  Home,
  ChevronRight,
} from "lucide-react";
import { useUserLocation } from "../../context/locationContext";
import MapPicker from "../maps/mapPicker";
import AddressDetailsModal from "./AddressDetailsModal";

const LocationModal = ({ isOpen, onClose }) => {
  const { coords, address, error, loading, updateLocation } = useUserLocation();

  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
    address: "",
    shortAddress: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleMapConfirm = (lat, lng, addr, shortAddr) => {
    setSelectedLocation({ lat, lng, address: addr, shortAddress: shortAddr });
    setShowMapPicker(false);
    setShowAddressDetails(true);
  };

  const handleEditLocation = () => {
    setShowAddressDetails(false);
    setShowMapPicker(true);
  };

  const handleFinalSave = (details) => {
    console.log("Saving full address details:", details);
    updateLocation(details.coords.lat, details.coords.lng, details);
    setShowAddressDetails(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-800 capitalize">
              Your Location
            </h2>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Search */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={18} />
                </div>

                <input
                  type="text"
                  placeholder="Search for a new address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5F5FA] h-12 pl-12 pr-4 rounded-xl text-sm outline-none"
                />
              </div>

              {/* Use Current Location */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      {loading ? (
                        <Target size={20} className="animate-spin" />
                      ) : (
                        <Navigation size={20} className="rotate-45" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-purple-600">
                        Use My Current Location
                      </span>

                      <span className="text-xs text-slate-400">
                        Enable your current location for better services
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={updateLocation}
                    disabled={loading}
                    className="px-4 py-1.5 border text-purple-600 text-xs font-bold rounded-lg"
                  >
                    {loading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      "Enable"
                    )}
                  </button>
                </div>

                {address && !loading && (
                  <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">
                    📍 {address}
                  </div>
                )}
              </div>

              {/* Add New Address */}
              <button
                onClick={() => setShowMapPicker(true)}
                className="w-full bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-pink-50 text-pink-500">
                    <Plus size={20} />
                  </div>

                  <span className="text-sm font-bold text-pink-500">
                    Add New Address
                  </span>
                </div>

                <ChevronRight size={18} />
              </button>

              {/* Saved Addresses */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase">
                  Saved Addresses
                </h3>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                    <MapPin size={20} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      Hostel
                    </span>

                    <p className="text-xs text-slate-400">
                      Kukatpally, KPHB Phase 1, Hyderabad
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                    <Home size={20} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      Home
                    </span>

                    <p className="text-xs text-slate-400">
                      Kukatpally, KPHB Phase 1, Hyderabad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3 text-red-500 bg-red-50 p-4 rounded-2xl">
                <AlertCircle size={16} />
                <span className="text-xs font-bold">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Picker */}
      {showMapPicker && (
        <MapPicker
          initialCoords={coords}
          onClose={() => setShowMapPicker(false)}
          onConfirm={handleMapConfirm}
        />
      )}

      {/* Address Details Modal */}
      {showAddressDetails && (
        <AddressDetailsModal
          isOpen={showAddressDetails}
          onClose={() => setShowAddressDetails(false)}
          address={selectedLocation.address}
          shortAddress={selectedLocation.shortAddress}
          coords={selectedLocation}
          onSave={handleFinalSave}
          onEdit={handleEditLocation}
        />
      )}
    </>
  );
};

export default LocationModal;
