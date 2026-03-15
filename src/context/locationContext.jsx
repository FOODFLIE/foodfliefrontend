import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchAddresses } from "../services/addressService";

const LocationContext = createContext();

const STORAGE_KEY = "foodflie_selected_address";
const CART_STORAGE_KEY = "foodflie_cart_address";

// Helper to load persisted address from localStorage
const loadPersistedAddress = (isCartContext = false) => {
  try {
    const key = isCartContext ? CART_STORAGE_KEY : STORAGE_KEY;
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load persisted address:", e);
  }
  return null;
};

// Helper to persist the current address to localStorage
const persistAddress = (coords, address, addressDetails, isCartContext = false) => {
  try {
    const key = isCartContext ? CART_STORAGE_KEY : STORAGE_KEY;
    localStorage.setItem(
      key,
      JSON.stringify({ coords, address, addressDetails }),
    );
  } catch (e) {
    console.warn("Failed to persist address:", e);
  }
};

export const useUserLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children, isCartContext = false }) => {
  // Try to restore from localStorage immediately
  const persisted = loadPersistedAddress(isCartContext);

  const [coords, setCoords] = useState(
    persisted?.coords || { latitude: null, longitude: null },
  );
  const [address, setAddress] = useState(persisted?.address || "");
  const [addressDetails, setAddressDetails] = useState(
    persisted?.addressDetails || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        {
          headers: { "Accept-Language": "en" },
        },
      );
      const data = await response.json();

      if (data && data.address) {
        const displayName =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.display_name.split(",")[0];

        const fullArea = `${displayName}${data.address.city ? `, ${data.address.city}` : ""}`;
        return fullArea;
      }
      return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    }
  };

  // Called when user explicitly selects/saves an address, or sets coordinates
  const updateLocation = useCallback((lat, lng, details = null) => {
    // If lat/lng provided, set the address directly
    if (lat && lng) {
      const newCoords = { latitude: lat, longitude: lng };
      setCoords(newCoords);
      setLoading(false);

      if (details) {
        setAddressDetails(details);
        const displayAddr =
          details.shortAddress || details.buildingName || "Custom Location";
        setAddress(displayAddr);
        persistAddress(newCoords, displayAddr, details, isCartContext);
      } else {
        setAddressDetails(null);
        fetchReverseGeocode(lat, lng).then((resolvedAddr) => {
          setAddress(resolvedAddr);
          persistAddress(newCoords, resolvedAddr, null, isCartContext);
        });
      }
      return;
    }

    // No coords provided → user is requesting browser geolocation explicitly
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    setLoading(true);
    setError(null);
    setAddress("Detecting...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoords = { latitude, longitude };
        setCoords(newCoords);
        setLoading(false);
        setAddressDetails(null);

        fetchReverseGeocode(latitude, longitude).then((resolvedAddr) => {
          setAddress(resolvedAddr);
          persistAddress(newCoords, resolvedAddr, null, isCartContext);
        });
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        setAddress("Location access denied");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [isCartContext]);

  // On mount: load from localStorage → fallback to default saved address from API → no auto-detect
  useEffect(() => {
    const initializeAddress = async () => {
      // 1. Already have a persisted address? Use it. Do nothing further.
      if (persisted?.address && persisted?.coords?.latitude) {
        return;
      }

      // 2. No persisted address: try to fetch saved addresses from API
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setLoading(true);
          const data = await fetchAddresses();
          const addressList = Array.isArray(data)
            ? data
            : data?.data || data?.addresses || [];

          if (addressList.length > 0) {
            // Find the default address, or use the first one
            const defaultAddr =
              addressList.find((a) => a.is_default) || addressList[0];

            const newCoords = {
              latitude: defaultAddr.latitude,
              longitude: defaultAddr.longitude,
            };
            const displayAddr = `${defaultAddr.address_line1}, ${defaultAddr.city}`;
            const details = {
              buildingName: defaultAddr.address_line1,
              fullAddress: `${defaultAddr.address_line1}, ${defaultAddr.city} - ${defaultAddr.pincode}`,
              shortAddress: defaultAddr.city,
              category: defaultAddr.address_type,
            };

            setCoords(newCoords);
            setAddress(displayAddr);
            setAddressDetails(details);
            persistAddress(newCoords, displayAddr, details, isCartContext);
            setLoading(false);
            return;
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn("Could not fetch saved addresses:", err);
        setLoading(false);
      }

      // 3. No saved addresses and no persistence: show empty state, don't auto-detect
      setAddress("");
    };

    initializeAddress();
  }, []); // Run only once on mount

  return (
    <LocationContext.Provider
      value={{
        coords,
        address,
        addressDetails,
        loading,
        error,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
