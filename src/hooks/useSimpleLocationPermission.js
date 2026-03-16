import { useEffect } from 'react';
import { useUserLocation } from '../context/locationContext';
import { trackEvent } from '../utils/analytics';

const LOCATION_ASKED_KEY = 'foodflie_location_asked';

export const useSimpleLocationPermission = () => {
  const { updateLocation } = useUserLocation();

  useEffect(() => {
    const askForLocation = () => {
      // Check if we've already asked
      const hasAsked = localStorage.getItem(LOCATION_ASKED_KEY);
      
      if (hasAsked) {
        return;
      }

      // Check if geolocation is supported
      if ('geolocation' in navigator) {
        // Ask for location permission and fetch location if granted
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location granted:', position.coords);
            const { latitude, longitude } = position.coords;
            
            // Update location context with the fetched coordinates
            updateLocation(latitude, longitude);
            
            // Track location permission granted
            trackEvent('location_permission_granted', 'user_interaction', 'geolocation');
            
            localStorage.setItem(LOCATION_ASKED_KEY, 'granted');
          },
          (error) => {
            console.log('Location denied or error:', error.message);
            
            // Track location permission denied
            trackEvent('location_permission_denied', 'user_interaction', 'geolocation', error.code);
            
            localStorage.setItem(LOCATION_ASKED_KEY, 'denied');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        );
      } else {
        console.log('Geolocation not supported');
        trackEvent('geolocation_not_supported', 'browser_capability', 'geolocation');
        localStorage.setItem(LOCATION_ASKED_KEY, 'not_supported');
      }
    };

    // Ask for location after a short delay to let the page load
    const timer = setTimeout(askForLocation, 1500);
    
    return () => clearTimeout(timer);
  }, [updateLocation]);
};