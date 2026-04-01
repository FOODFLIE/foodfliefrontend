import { useState, useEffect } from "react";
import { getProductsByPartner } from "../../../services/productService";
import { fetchCategories } from "../../../services/categoryServices";
import { addToCart as apiAddToCart } from "../../../services/cartService";
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

  const { refreshCartCount, addToGuestCart, cartCount, guestCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { coords } = useUserLocation();
  
  const displayCount = isAuthenticated ? cartCount : guestCartCount;

  useEffect(() => {
    const fetchMenu = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const responseData = await getProductsByPartner(id);

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
          allCategories = await fetchCategories(coords?.latitude, coords?.longitude);
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
                  c.name?.toLowerCase() === item.category.name?.toLowerCase()
              ) || item.category;
          } else if (item.category_id) {
            catEntity = allCategories.find((c) => String(c.id) === String(item.category_id));
          } else if (item.category) {
            catEntity = allCategories.find(
              (c) =>
                String(c.id) === String(item.category) ||
                c.name?.toLowerCase() === String(item.category).toLowerCase()
            );
          }

          const catId = catEntity?.id || item.category_id || item.category?.id || "Other";
          const catName = catEntity?.name || "Other";

          if (!categoryMap.has(catId)) {
            categoryMap.set(
              catId,
              catEntity && typeof catEntity === "object"
                ? { ...catEntity, id: catId, name: catName }
                : { id: catId, name: catName }
            );
          }

          return { ...item, resolvedCategoryId: catId };
        });

        setMenuItems(enrichedItems);
        const EnrichedCats = [{ id: "All", name: "All" }, ...Array.from(categoryMap.values())];
        setCategories(EnrichedCats);

        if (rData) {
          setRestaurantData(rData);
        } else if (!restaurantData && menuItemsData.length > 0 && menuItemsData[0].partner) {
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

    fetchMenu();
  }, [id, coords]);

  const handleAddToCart = async (item) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [item.sku]: true }));
      if (isAuthenticated) {
        await apiAddToCart(item.sku, 1);
        refreshCartCount();
      } else {
        const partnerId = restaurantData?.id || item.partner_id || null;
        addToGuestCart(item.sku, item.name, item.price, 1, String(partnerId));
      }
      
      // Track AddToCart event with Meta Pixel
      trackAddToCart(item, 1);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [item.sku]: false }));
    }
  };

  return {
    restaurantData,
    menuItems,
    categories: categories || [{ id: "All", name: "All" }],
    loading,
    error,
    addingToCart,
    cartCount: displayCount,
    handleAddToCart,
  };
};
