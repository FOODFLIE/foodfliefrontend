// Google Analytics utility functions
export const GA_TRACKING_ID = 'G-NGH4FR14V1';

// Enable debug mode for development
const isDebugMode = process.env.NODE_ENV === 'development';

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      debug_mode: isDebugMode,
    });
    
    if (isDebugMode) {
      console.log('GA: Page view tracked:', url);
    }
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      debug_mode: isDebugMode,
    });
    
    if (isDebugMode) {
      console.log('GA: Event tracked:', { action, category, label, value });
    }
  }
};

// E-commerce tracking
export const trackPurchase = (transactionId, value, currency = 'INR', items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

// Track add to cart
export const trackAddToCart = (currency = 'INR', value, items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

// Track remove from cart
export const trackRemoveFromCart = (currency = 'INR', value, items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

// Track begin checkout
export const trackBeginCheckout = (currency = 'INR', value, items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

// Track search
export const trackSearch = (searchTerm) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};

// Track user engagement
export const trackUserEngagement = (engagementTime) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      engagement_time_msec: engagementTime,
    });
  }
};