import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const LocationContext = createContext();

export const useUserLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("Detecting location...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        {
          headers: {
            "Accept-Language": "en",
          },
        },
      );
      const data = await response.json();

      if (data && data.address) {
        // Construct a readable city/area name
        const displayName =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.display_name.split(",")[0];

        const fullArea = `${displayName}${data.address.city ? `, ${data.address.city}` : ""}`;
        setAddress(fullArea);
      } else {
        setAddress(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      }
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      setAddress(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
    }
  };

  const updateLocation = useCallback((lat, lng) => {
    if (lat && lng) {
      setCoords({ latitude: lat, longitude: lng });
      setLoading(false);
      fetchAddress(lat, lng);
      return;
    }

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
        setCoords({ latitude, longitude });
        setLoading(false);
        fetchAddress(latitude, longitude);
        console.log("📍 Location coordinates obtained:", {
          latitude,
          longitude,
        });
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        setAddress("Location access denied");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, []);

  // Try to get location on mount
  useEffect(() => {
    updateLocation();
  }, [updateLocation]);

  return (
    <LocationContext.Provider
      value={{
        coords,
        address,
        loading,
        error,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
