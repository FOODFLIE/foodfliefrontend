import React, { useEffect, useState } from "react";
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
  Briefcase,
} from "lucide-react";
import { useUserLocation } from "../../context/locationContext";
import { useCartLocation } from "../../context/cartLocationContext";
import MapPicker from "../maps/mapPicker";
import AddressDetailsModal from "./addressDetailsModal";
import { fetchAddresses } from "../../services/addressService";

const LocationModal = ({ isOpen, onClose, hideCurrentLocation = false, useCartContext = false }) => {
  // Use different context based on prop
  let locationContext;
  try {
    locationContext = useCartContext ? useCartLocation() : useUserLocation();
  } catch (error) {
    // Fallback to regular location context if cart context is not available
    locationContext = useUserLocation();
  }
  
  const { coords, address, error, loading, updateLocation } = locationContext;

  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
    address: "",
    shortAddress: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAddresses();
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const data = await fetchAddresses();
      // Handle cases where the API returns an object wrapping the array (e.g. { data: [...] } or { addresses: [...] })
      const addressArray = Array.isArray(data)
        ? data
        : data?.data || data?.addresses || [];
      setSavedAddresses(addressArray);
    } catch (err) {
      console.error("Failed to load saved addresses", err);
      setSavedAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

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
   
    updateLocation(details.coords.lat, details.coords.lng, details);
    setShowAddressDetails(false);
    onClose();
  };

  const handleSelectSavedAddress = (addr) => {
    const addressDetails = {
      buildingName: addr.building_name || addr.address_line1,
      companyFloor: addr.company_floor || "",
      landmark: addr.landmark || "",
      receiverName: addr.receiver_name || "",
      receiverNumber: addr.receiver_number || "",
      pincode: addr.pincode,
      category: addr.address_type,
      coords: { lat: addr.latitude, lng: addr.longitude },
      fullAddress: addr.address_line1,
      shortAddress: addr.city,
    };
    updateLocation(addr.latitude, addr.longitude, addressDetails);
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
              {!hideCurrentLocation && (
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-brand-muted text-brand">
                        {loading ? (
                          <Target size={20} className="animate-spin" />
                        ) : (
                          <Navigation size={20} className="rotate-45" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-brand">
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
                      className="px-4 py-1.5 border text-brand text-xs font-bold rounded-lg"
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
              )}

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

                {loadingAddresses ? (
                  <div className="flex justify-center p-4">
                    <Loader2
                      size={24}
                      className="animate-spin text-slate-400"
                    />
                  </div>
                ) : savedAddresses.length > 0 ? (
                  savedAddresses.map((addr) => {
                    const isHome = addr.address_type?.toLowerCase() === "home";
                    const isWork = addr.address_type?.toLowerCase() === "work";
                    const Icon = isHome ? Home : isWork ? Briefcase : MapPin;

                    return (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                      >
                        <div className="p-2 rounded-xl bg-slate-100 text-slate-500 shrink-0">
                          <Icon size={20} />
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-bold text-slate-800 capitalize">
                            {addr.address_type || "Other"}
                          </span>

                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {addr.address_line1}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {addr.city}, {addr.pincode}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    No saved addresses found.
                  </div>
                )}
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
