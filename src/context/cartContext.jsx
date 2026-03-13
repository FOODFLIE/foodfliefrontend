import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart, syncGuestCart } from "../services/cartService";
import { getGuestCart, getGuestCartCount, clearGuestCart, addToGuestCart as addToGuestCartService } from "../services/guestCartService";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [guestCartCount, setGuestCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Refresh authenticated cart count from DB
  const refreshCartCount = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const cart = await getCart();
        setCartCount(cart?.items?.length || 0);
      } catch (err) {
        console.error("Failed to fetch cart count:", err);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
    setLoading(false);
  }, [isAuthenticated]);

  // Refresh guest cart count from localStorage
  const refreshGuestCartCount = useCallback(() => {
    setGuestCartCount(getGuestCartCount());
  }, []);

  // Add item to guest cart (for unauthenticated users)
  const addToGuestCart = useCallback((sku, name, price, quantity = 1, partnerId = null) => {
    addToGuestCartService(sku, name, price, quantity, partnerId);
    refreshGuestCartCount();
  }, [refreshGuestCartCount]);

  // Sync guest cart to DB after login, then clear localStorage
  const syncAndClearGuestCart = useCallback(async () => {
    const guestItems = getGuestCart();
    if (guestItems.length === 0) return;

    setSyncing(true);
    try {
      const itemsPayload = guestItems.map(({ sku, quantity }) => ({ sku, quantity }));
      await syncGuestCart(itemsPayload);
      clearGuestCart();
      setGuestCartCount(0);
      // Refresh the authenticated cart count now
      const cart = await getCart();
      setCartCount(cart?.items?.length || 0);
    } catch (err) {
      console.error("Guest cart sync failed:", err);
    } finally {
      setSyncing(false);
    }
  }, []);

  // On mount, set guest cart count from localStorage
  useEffect(() => {
    refreshGuestCartCount();
  }, [refreshGuestCartCount]);

  // When auth state changes, refresh DB cart count
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  // When user becomes authenticated, sync the guest cart to their account
  useEffect(() => {
    if (isAuthenticated) {
      syncAndClearGuestCart();
    }
  }, [isAuthenticated, syncAndClearGuestCart]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        guestCartCount,
        loading,
        syncing,
        refreshCartCount,
        refreshGuestCartCount,
        addToGuestCart,
        syncAndClearGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
