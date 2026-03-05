import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Search, Navigation, MapPin, X, Target, Info } from "lucide-react";
import { getFlieOptions } from "../../utils/flieUtils";

const flies = getFlieOptions();
const googleMapsApiKey = flies.googleMapsApiKey;
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function MapPicker({ initialCoords, onClose, onConfirm }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: initialCoords?.latitude || 17.385,
    lng: initialCoords?.longitude || 78.486,
  });
  const [address, setAddress] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [isPinMoving, setIsPinMoving] = useState(false);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const lastFetchedMapCenter = useRef({ lat: null, lng: null });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "Accept-Language": "en",
          },
        },
      );
      const data = await response.json();
      if (data && data.address) {
        setAddress(data.display_name);

        // Extract a meaningful short name
        const short =
          data.address.neighbourhood ||
          data.address.suburb ||
          data.address.road ||
          data.address.city ||
          "Selected Location";
        setShortAddress(short);
      } else {
        const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        setAddress(fallback);
        setShortAddress(fallback);
      }
    } catch (err) {
      const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setAddress(fallback);
      setShortAddress(fallback);
    }
  };

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onIdle = useCallback(() => {
    if (map) {
      const newCenter = map.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();

      const latStr = lat.toFixed(6);
      const lngStr = lng.toFixed(6);

      if (
        lastFetchedMapCenter.current.lat === latStr &&
        lastFetchedMapCenter.current.lng === lngStr
      ) {
        // Prevent panTo/getCenter coordinate drift infinite loop
        return;
      }
      lastFetchedMapCenter.current = { lat: latStr, lng: lngStr };

      setCenter({ lat, lng });
      setIsPinMoving(false);
      setIsLocationSet(true);
      fetchAddress(lat, lng);
    }
  }, [map]);

  const onDragStart = () => {
    setIsPinMoving(true);
  };

  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCenter({ lat, lng });
        map?.panTo({ lat, lng });
      }
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCenter(newCoords);
        map?.panTo(newCoords);
      });
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between relative z-50">
        <h2 className="text-lg font-black text-slate-800">
          Location Information
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col bg-[#F5F5FA]">
        {/* Search Bar - Top Floating */}
        <div className="absolute top-4 left-0 right-0 z-40 px-6">
          <div className="max-w-md mx-auto relative bg-white rounded-xl shadow-lg border border-slate-100 flex items-center px-4 h-12">
            <Search size={18} className="text-slate-400 mr-2 shrink-0" />
            <Autocomplete
              onLoad={(auto) => setAutocomplete(auto)}
              onPlaceChanged={onPlaceSelected}
              className="flex-1"
            >
              <input
                type="text"
                placeholder="Search for a new address"
                className="w-full h-full text-sm outline-none placeholder:text-slate-400"
              />
            </Autocomplete>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative mt-[1px]">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={17}
            onLoad={onMapLoad}
            onIdle={onIdle}
            onDragStart={onDragStart}
            options={mapOptions}
          >
            {/* Fixed Center Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-8px)] pointer-events-none z-20">
              <div
                className={`flex flex-col items-center transition-transform duration-200 ease-out ${
                  isPinMoving
                    ? "-translate-y-4 scale-110"
                    : "translate-y-0 scale-100"
                }`}
              >
                {/* Bubble Tooltip */}
                <div className="relative group">
                  <div className="bg-[#0D0D12] text-white px-4 py-3 rounded-xl mb-3 shadow-2xl flex flex-col items-center gap-0.5 min-w-[200px] text-center">
                    <span className="text-xs font-black leading-tight">
                      Order will be delivered here
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium leading-tight">
                      Place the pin to your exact location
                    </span>

                    {/* Triangle pointer */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D0D12] rotate-45" />
                  </div>
                </div>

                <div className="relative mt-[-4px]">
                  <div className="w-10 h-10 bg-[#FC105F] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin size={24} className="text-white fill-current" />
                  </div>
                  {/* Shadow */}
                  <div
                    className={`w-8 h-1.5 bg-black/20 rounded-full blur-[2px] mx-auto mt-2 transition-transform duration-200 ${
                      isPinMoving
                        ? "scale-50 opacity-30"
                        : "scale-100 opacity-100"
                    }`}
                  />
                </div>
              </div>
            </div>
          </GoogleMap>

          {/* Locate Me Button - Floating Targeted */}
          <button
            onClick={handleLocateMe}
            className="absolute bottom-6 right-6 z-40 bg-white p-3 rounded-full shadow-2xl text-pink-600 hover:text-pink-700 transition-all border border-slate-100 active:scale-90"
            title="Reset to current location"
          >
            <Target size={24} />
          </button>
        </div>

        {/* Bottom Panel - Dynamic States */}
        {!isLocationSet ? (
          /* State 1: Intro/Initial */
          <div className="bg-white rounded-t-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] p-8 pt-6 z-50 flex flex-col gap-6 animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1 bg-slate-100 rounded-full self-center mb-2" />
            <h3 className="text-xl font-black text-center text-slate-800">
              Select a delivery location
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => {}} // Could trigger search focus
                className="flex-1 border-2 border-pink-500 text-pink-500 h-14 rounded-2xl font-bold text-sm hover:bg-pink-50 transition-colors flex items-center justify-center px-4"
              >
                Search Location
              </button>
              <button
                onClick={handleLocateMe}
                className="flex-1 bg-pink-500 text-white h-14 rounded-2xl font-bold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center px-4"
              >
                Current Location
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Active/Confirmed */
          <div className="bg-white rounded-t-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] p-8 pt-6 z-50 flex flex-col gap-6 animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1 bg-slate-100 rounded-full self-center mb-2" />

            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 rounded-2xl text-pink-500 shrink-0">
                <MapPin size={28} className="fill-current" />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden min-h-[60px]">
                <h3 className="text-xl font-black text-slate-800 leading-tight truncate">
                  {shortAddress || "Selected Location"}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1.5 line-clamp-2">
                  {address || "Fetching address..."}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onConfirm(center.lat, center.lng, address, shortAddress)
              }
              className="w-full bg-[#FC105F] text-white h-14 rounded-2xl font-bold text-base hover:bg-[#E50E56] transition-colors shadow-lg shadow-pink-100 flex items-center justify-center active:scale-[0.98]"
            >
              Confirm & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
