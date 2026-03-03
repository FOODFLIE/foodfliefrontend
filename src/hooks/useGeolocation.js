import { useState, useEffect, useCallback } from "react";

/**
 * useGeolocation Hook
 *
 * Fetches and tracks the user's GPS coordinates using the Browser Geolocation API.
 *
 * @returns {Object} { location, error, loading, getLocation }
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by your browser";
      setError(errorMsg);
      console.error(errorMsg);
      return;
    }

    setLoading(true);
    setError(null);

    // Options for high accuracy
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });
      setLoading(false);

      // Print to console as requested
      console.log(`📍 Location Captured: Lat ${latitude}, Lng ${longitude}`);
    };

    const handleError = (error) => {
      let errorMsg = "";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMsg = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          errorMsg = "An unknown error occurred.";
          break;
        default:
          errorMsg = "An error occurred while fetching location.";
      }

      setError(errorMsg);
      setLoading(false);
      console.error(`❌ Geolocation Error: ${errorMsg}`);
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options,
    );
  }, []);

  return { location, error, loading, getLocation };
};
