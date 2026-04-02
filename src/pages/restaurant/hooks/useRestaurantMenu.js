import { useState, useEffect } from "react";
import { getProductsByPartner } from "../../../services/productService";
import { fetchCategories } from "../../../services/categoryServices";
import { addToCart as apiAddToCart, updateCartItem, removeFromCart, getCart } from "../../../services/cartService";
import { getGuestCart } from "../../../services/guestCartService";
import { useCart } from "../../../context/cartContext";
import { useAuth } from "../../../context/authContext";
import { trackAddToCart } from "../../../utils/metaPixel";
import { useUserLocation } from "../../../context/locationContext";

export const useRestaurantMenu = (id, initialRestaurant = null) => {
  const [restaurantData, setRestaurantData] = useState(initialRestaurant);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([{ id: "All", name: "All" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [quantities, setQuantities] = useState({});
  const [cartItemsMap, setCartItemsMap] = useState({});

  const { refreshCartCount, addToGuestCart, cartCount, guestCartCount } =
    useCart();
  const { isAuthenticated } = useAuth();
  const { coords } = useUserLocation();

  const displayCount = isAuthenticated ? cartCount : guestCartCount;

  useEffect(() => {
    const fetchMenuAndCart = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const responseData = await getProductsByPartner(id);
        console.log("responseData", responseData);

        // Fetch Cart Items to initialize quantities and map
        let currentCartItems = [];
        if (isAuthenticated) {
          try {
            const cartRes = await getCart();
            currentCartItems = cartRes?.items || [];
          } catch (err) {
            console.error("Failed to fetch authenticated cart:", err);
          }
        } else {
          currentCartItems = getGuestCart();
        }

        // Initialize state from cart
        const initQuantities = {};
        const initCartMap = {};
        currentCartItems.forEach((item) => {
          initQuantities[item.sku] = item.quantity;
          if (item.id) {
            initCartMap[item.sku] = item.id;
          }
        });
        setQuantities(initQuantities);
        setCartItemsMap(initCartMap);

        let menuItemsData = [];
        let rData = null;

        if (responseData && !Array.isArray(responseData)) {
          if (Array.isArray(responseData.products)) {
            menuItemsData = responseData.products;
            rData = {
              ...responseData,
              name: responseData.store_name || responseData.name,
              rating: responseData.rating || 4.0,
              time: responseData.time || "13 MINS",
              cuisines: responseData.cuisines || ["Restaurant"],
              offer: responseData.offer || "Special Offer",
            };
          } else if (Array.isArray(responseData.data)) {
            menuItemsData = responseData.data;
          }
        } else if (Array.isArray(responseData)) {
          menuItemsData = responseData;
        }

        let allCategories = [];
        try {
          allCategories = await fetchCategories(
            coords?.latitude,
            coords?.longitude,
          );
        } catch (catErr) {
          console.error("Failed to fetch categories metadata:", catErr);
        }

        const categoryMap = new Map();
        const enrichedItems = menuItemsData.map((item) => {
          let catEntity = null;

          if (item.category && typeof item.category === "object") {
            catEntity =
              allCategories.find(
                (c) =>
                  c.id === item.category.id ||
                  c.name?.toLowerCase() === item.category.name?.toLowerCase(),
              ) || item.category;
          } else if (item.category_id) {
            catEntity = allCategories.find(
              (c) => String(c.id) === String(item.category_id),
            );
          } else if (item.category) {
            catEntity = allCategories.find(
              (c) =>
                String(c.id) === String(item.category) ||
                c.name?.toLowerCase() === String(item.category).toLowerCase(),
            );
          }

          const catId =
            catEntity?.id || item.category_id || item.category?.id || "Other";
          const catName = catEntity?.name || "Other";

          if (!categoryMap.has(catId)) {
            categoryMap.set(
              catId,
              catEntity && typeof catEntity === "object"
                ? { ...catEntity, id: catId, name: catName }
                : { id: catId, name: catName },
            );
          }

          return { ...item, resolvedCategoryId: catId };
        });

        setMenuItems(enrichedItems);
        const EnrichedCats = [
          { id: "All", name: "All" },
          ...Array.from(categoryMap.values()),
        ];
        setCategories(EnrichedCats);

        if (rData) {
          setRestaurantData(rData);
        } else if (
          !restaurantData &&
          menuItemsData.length > 0 &&
          menuItemsData[0].partner
        ) {
          const p = menuItemsData[0].partner;
          setRestaurantData({
            ...p,
            name: p.store_name || p.name,
            rating: p.rating || 4.0,
            time: p.time || "13 MINS",
            cuisines: p.cuisines || ["Restaurant"],
            offer: p.offer || "Special Offer",
          });
        }

        setError(null);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuAndCart();
  }, [id, coords, isAuthenticated]);

const handleUpdateQuantity = async (item, change, variantSku = null) => {
  const sku = variantSku || item.sku;
  const currentQty = quantities[sku] || 0;
  const newQty = currentQty + change;

  if (newQty < 0) return;

  setAddingToCart(prev => ({ ...prev, [sku]: true }));

  try {
    if (isAuthenticated) {
      // 🔥 FIRST TIME ADD (or adding again if somehow map was lost)
      if (!cartItemsMap[sku] && change > 0) {
        const res = await apiAddToCart(sku, change);

        setCartItemsMap(prev => ({
          ...prev,
          [sku]: res.cart_item_id || res.id // Handle potential backend naming variations
        }));

        setQuantities(prev => ({
          ...prev,
          [sku]: change
        }));

        refreshCartCount();
        if (currentQty === 0) trackAddToCart(item, change);
      }
      // 🔥 UPDATE EXISTING ITEM
      else if (cartItemsMap[sku]) {
        const itemId = cartItemsMap[sku];

        if (newQty === 0) {
          await removeFromCart(itemId);

          setCartItemsMap(prev => {
            const copy = { ...prev };
            delete copy[sku];
            return copy;
          });

          setQuantities(prev => ({
            ...prev,
            [sku]: 0
          }));
        } else {
          await updateCartItem(itemId, newQty);

          setQuantities(prev => ({
            ...prev,
            [sku]: newQty
          }));
        }

        refreshCartCount();
      }
    } else {
      // Guest cart handling
      const partnerId = restaurantData?.id || item.partner_id || null;
      if (newQty === 0) {
        // We'll treat 0 as removing from guest cart
        addToGuestCart(sku, item.name, item.price, -currentQty, String(partnerId));
        setQuantities(prev => ({
          ...prev,
          [sku]: 0
        }));
      } else {
        addToGuestCart(sku, item.name, item.price, change, String(partnerId));
        setQuantities(prev => ({
          ...prev,
          [sku]: newQty
        }));
        if (change === 1 && currentQty === 0) {
          trackAddToCart(item, 1);
        }
      }
    }
  } catch (err) {
    console.error("Cart error:", err);
  } finally {
    setAddingToCart(prev => ({ ...prev, [sku]: false }));
  }
};

  return {
    restaurantData,
    menuItems,
    categories: categories || [{ id: "All", name: "All" }],
    loading,
    error,
    addingToCart,
    quantities,
    cartCount: displayCount,
    onUpdateQuantity: handleUpdateQuantity,
  };
};
