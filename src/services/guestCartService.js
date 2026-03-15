const GUEST_CART_KEY = "foodflie_guest_cart";

/**
 * Get the current guest cart from localStorage.
 * @returns {Array} Array of { sku, name, price, quantity }
 */
export const getGuestCart = () => {
  try {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Add or update an item in the guest cart.
 * @param {string} sku
 * @param {string} name
 * @param {number} price
 * @param {number} quantity
 * @param {string} partnerId - Used to enforce single-restaurant rule guest-side.
 */
export const addToGuestCart = (sku, name, price, quantity = 1, partnerId = null) => {
  try {
    const cart = getGuestCart();

    // Enforce single-restaurant rule: if there are items from a different partner, clear cart
    if (partnerId && cart.length > 0 && cart[0].partnerId && cart[0].partnerId !== partnerId) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify([]));
    }

    const existing = getGuestCart();
    const idx = existing.findIndex((item) => item.sku === sku);

    if (idx !== -1) {
      existing[idx].quantity += quantity;
    } else {
      existing.push({ sku, name, price, quantity, partnerId });
    }

    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(existing));
    return existing;
  } catch {
    return [];
  }
};

/**
 * Clear the entire guest cart from localStorage.
 */
export const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch {
    // Silently fail
  }
};

/**
 * Get the total number of unique items in the guest cart.
 */
export const getGuestCartCount = () => {
  return getGuestCart().length;
};
