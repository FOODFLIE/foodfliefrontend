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
    const existing = getGuestCart();
    
    // Enforce single-restaurant rule: if there are items from a different partner, clear cart
    if (partnerId && existing.length > 0 && existing[0].partnerId && String(existing[0].partnerId) !== String(partnerId)) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify([]));
      // Re-fetch after clearing
      var currentCart = [];
    } else {
      var currentCart = existing;
    }

    const idx = currentCart.findIndex((item) => item.sku === sku);

    if (idx !== -1) {
      currentCart[idx].quantity += quantity;
      if (currentCart[idx].quantity <= 0) {
        currentCart.splice(idx, 1);
      }
    } else if (quantity > 0) {
      currentCart.push({ sku, name, price, quantity, partnerId });
    }

    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(currentCart));
    return currentCart;
  } catch (err) {
    console.error("addToGuestCart error:", err);
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
