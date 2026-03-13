import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart } from "../services/cartService";
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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount, loading }}>
      {children}
    </CartContext.Provider>
  );
};
