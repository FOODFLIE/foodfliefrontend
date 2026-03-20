/**
 * Meta Pixel Tracking Utility
 * Handles all Facebook Pixel events for the food delivery app
 */

/**
 * Check if Meta Pixel is loaded
 * @returns {boolean}
 */
const isPixelLoaded = () => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Track AddToCart event
 * @param {Object} item - Product item details
 * @param {string} item.name - Product name
 * @param {number} item.price - Product price
 * @param {string} item.sku - Product SKU
 * @param {number} quantity - Quantity added
 */
export const trackAddToCart = (item, quantity = 1) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    window.fbq('track', 'AddToCart', {
      content_name: item.name,
      content_ids: [item.sku],
      content_type: 'product',
      value: parseFloat(item.price) * quantity,
      currency: 'INR',
      quantity: quantity,
    });
    console.log('Meta Pixel: AddToCart tracked', item.name);
  } catch (error) {
    console.error('Meta Pixel AddToCart error:', error);
  }
};

/**
 * Track Purchase event
 * @param {Object} orderData - Order details
 * @param {string} orderData.orderId - Order ID
 * @param {number} orderData.totalAmount - Total order amount
 * @param {Array} orderData.items - Array of order items
 */
export const trackPurchase = (orderData) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    const contentIds = orderData.items?.map(item => item.sku || item.id) || [];
    
    window.fbq('track', 'Purchase', {
      content_ids: contentIds,
      content_type: 'product',
      value: parseFloat(orderData.totalAmount),
      currency: 'INR',
      num_items: orderData.items?.length || 0,
      order_id: orderData.orderId,
    });
    console.log('Meta Pixel: Purchase tracked', orderData.orderId);
  } catch (error) {
    console.error('Meta Pixel Purchase error:', error);
  }
};

/**
 * Track ViewContent event
 * @param {Object} content - Content details
 * @param {string} content.name - Content name (restaurant/product name)
 * @param {string} content.id - Content ID
 * @param {string} content.type - Content type (restaurant/product)
 * @param {number} content.value - Optional value
 */
export const trackViewContent = (content) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    window.fbq('track', 'ViewContent', {
      content_name: content.name,
      content_ids: [content.id],
      content_type: content.type || 'product',
      value: content.value ? parseFloat(content.value) : undefined,
      currency: 'INR',
    });
    console.log('Meta Pixel: ViewContent tracked', content.name);
  } catch (error) {
    console.error('Meta Pixel ViewContent error:', error);
  }
};

/**
 * Track InitiateCheckout event
 * @param {Object} cartData - Cart details
 * @param {number} cartData.totalAmount - Total cart amount
 * @param {Array} cartData.items - Array of cart items
 */
export const trackInitiateCheckout = (cartData) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    const contentIds = cartData.items?.map(item => item.sku || item.id) || [];
    
    window.fbq('track', 'InitiateCheckout', {
      content_ids: contentIds,
      content_type: 'product',
      value: parseFloat(cartData.totalAmount),
      currency: 'INR',
      num_items: cartData.items?.length || 0,
    });
    console.log('Meta Pixel: InitiateCheckout tracked');
  } catch (error) {
    console.error('Meta Pixel InitiateCheckout error:', error);
  }
};

/**
 * Track Search event
 * @param {string} searchQuery - Search query string
 */
export const trackSearch = (searchQuery) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    window.fbq('track', 'Search', {
      search_string: searchQuery,
    });
    console.log('Meta Pixel: Search tracked', searchQuery);
  } catch (error) {
    console.error('Meta Pixel Search error:', error);
  }
};

/**
 * Track custom event
 * @param {string} eventName - Custom event name
 * @param {Object} params - Event parameters
 */
export const trackCustomEvent = (eventName, params = {}) => {
  if (!isPixelLoaded()) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  try {
    window.fbq('trackCustom', eventName, params);
    console.log('Meta Pixel: Custom event tracked', eventName);
  } catch (error) {
    console.error('Meta Pixel custom event error:', error);
  }
};
