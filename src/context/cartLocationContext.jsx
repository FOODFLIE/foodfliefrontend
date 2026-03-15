import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchAddresses } from "../services/addressService";

const CartLocationContext = createContext();

const CART_STORAGE_KEY = "foodflie_cart_address";

// Helper to load persisted cart address from localStorage
const loadPersistedCartAddress = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load persisted cart address:", e);
  }
  return null;
};

// Helper to persist the cart address to localStorage
const persistCartAddress = (coords, address, addressDetails) => {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ coords, address, addressDetails }),
    );
  } catch (e) {
    console.warn("Failed to persist cart address:", e);
  }
};

// Helper to clear cart address from localStorage
const clearCartAddress = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear cart address:", e);
  }
};

export const useCartLocation = () => {
  const context = useContext(CartLocationContext);
  if (!context) {
    throw new Error("useCartLocation must be used within a CartLocationProvider");
  }
  return context;
};

export const CartLocationProvider = ({ children }) => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Called when user explicitly selects/saves an address for cart
  const updateCartLocation = useCallback((lat, lng, details = null) => {
    if (lat && lng) {
      const newCoords = { latitude: lat, longitude: lng };
      setCoords(newCoords);
      setLoading(false);

      if (details) {
        setAddressDetails(details);
        const displayAddr =
          details.shortAddress || details.buildingName || "Custom Location";
        setAddress(displayAddr);
        persistCartAddress(newCoords, displayAddr, details);
      }
      return;
    }
  }, []);

  // Clear cart address
  const clearAddress = useCallback(() => {
    setCoords({ latitude: null, longitude: null });
    setAddress("");
    setAddressDetails(null);
    clearCartAddress();
  }, []);

  // Validate if persisted address still exists in saved addresses
  const validatePersistedAddress = useCallback(async (persistedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        clearAddress();
        return false;
      }

      const data = await fetchAddresses();
      const addressList = Array.isArray(data)
        ? data
        : data?.data || data?.addresses || [];

      // If no addresses exist, clear persisted data
      if (addressList.length === 0) {
        clearAddress();
        return false;
      }

      // Check if persisted address still exists in saved addresses
      const addressExists = addressList.some(addr => 
        addr.latitude === persistedData.coords?.latitude &&
        addr.longitude === persistedData.coords?.longitude
      );

      if (!addressExists) {
        clearAddress();
        return false;
      }

      return true;
    } catch (err) {
      console.warn("Failed to validate persisted address:", err);
      clearAddress();
      return false;
    }
  }, [clearAddress]);

  // Initialize cart address on mount
  useEffect(() => {
    const initializeCartAddress = async () => {
      setLoading(true);
      
      // Check persisted address first
      const persisted = loadPersistedCartAddress();
      
      if (persisted?.address && persisted?.coords?.latitude) {
        // Validate if this address still exists
        const isValid = await validatePersistedAddress(persisted);
        if (isValid) {
          setCoords(persisted.coords);
          setAddress(persisted.address);
          setAddressDetails(persisted.addressDetails);
          setLoading(false);
          return;
        }
      }

      // No valid persisted address, try to load default from API
      try {
        const token = localStorage.getItem("token");
        if (token) {
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
            persistCartAddress(newCoords, displayAddr, details);
          }
        }
      } catch (err) {
        console.warn("Could not fetch saved addresses for cart:", err);
      }
      
      setLoading(false);
    };

    initializeCartAddress();
  }, [validatePersistedAddress]);

  return (
    <CartLocationContext.Provider
      value={{
        coords,
        address,
        addressDetails,
        loading,
        error,
        updateLocation: updateCartLocation,
        clearAddress,
      }}
    >
      {children}
    </CartLocationContext.Provider>
  );
};