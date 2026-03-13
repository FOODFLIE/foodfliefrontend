import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import MenuItem from "../../components/menuItem";
import CartFooter from "../../components/cartFooter";
import { RESTAURANTS } from "../../data";
import { Star, Clock, Zap, Search, Loader2 } from "lucide-react";
import { getProductsByPartner } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { useCart } from "../../context/cartContext";
import SEO from "../../components/common/seo";
import { 
  generateRestaurantSchema, 
  generateMenuSchema, 
  generateBreadcrumbSchema,
  generateFoodEstablishmentSchema
} from "../../utils/seoSchemas";

const RestaurantDetail = () => {
  const { id } = useParams();
  const localRestaurant = RESTAURANTS.find((r) => r.id === parseInt(id));
  const [restaurantData, setRestaurantData] = useState(localRestaurant || null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { refreshCartCount } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const responseData = await getProductsByPartner(id);
        console.log("Restaurant menu response:", responseData);

        let menuItemsData = [];
        let rData = null;

        if (responseData && !Array.isArray(responseData)) {
          // Check if it's the unified structure: { ..., products: [...] }
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

        setMenuItems(menuItemsData);

        // If we extracted restaurant info from the unified response, use it
        if (rData) {
          setRestaurantData(rData);
        } else if (
          !restaurantData &&
          menuItemsData.length > 0 &&
          menuItemsData[0].partner
        ) {
          // Fallback to getting partner info from the first product
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
  }, [id]);

  const handleAddToCart = async (item) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [item.sku]: true }));
      await addToCart(item.sku, 1);
      setCartCount((c) => c + 1);
      refreshCartCount();
      // alert("Added to cart!"); // Simple feedback for now
    } catch (err) {
      console.error("Failed to add to cart:", err);
      // alert("Failed to add to cart. Are you logged in?");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [item.sku]: false }));
    }
  };

  if (!restaurantData && !loading)
    return (
      <div className="p-20 text-center font-bold text-slate-800">
        Establishment not found
      </div>
    );

  // Still show loading if we don't have restaurant data yet
  if (!restaurantData && loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-10 h-10 text-brand animate-spin" />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Loading restaurant...
        </p>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "https://foodflie.com" },
    { name: "Restaurants", url: "https://foodflie.com/restaurants" },
    { name: restaurantData?.name || "Restaurant", url: `https://foodflie.com/restaurant/${id}` }
  ];

  const schemas = restaurantData ? [
    generateRestaurantSchema(restaurantData),
    generateFoodEstablishmentSchema(restaurantData),
    generateBreadcrumbSchema(breadcrumbs),
    ...(menuItems.length > 0 ? [generateMenuSchema(restaurantData, menuItems)] : [])
  ] : [];

  return (
    <div className="bg-white min-h-screen pb-40">
      <SEO 
        title={`${restaurantData?.name || "Restaurant"} - Order Online in 13 Minutes`}
        description={`Order from ${restaurantData?.name || "restaurant"} and get delivery in 13 minutes. ${restaurantData?.cuisines?.join ? restaurantData.cuisines.join(", ") : "Delicious food"} at menu prices. ${restaurantData?.rating ? `Rated ${restaurantData.rating} stars.` : ""} Free delivery on orders above ₹199.`}
        keywords={`${restaurantData?.name}, ${restaurantData?.name} menu, ${restaurantData?.name} delivery, food delivery, online order, ${restaurantData?.cuisines?.join ? restaurantData.cuisines.join(", ") : "restaurant"}, ${restaurantData?.city || "Hyderabad"} restaurants`}
        schema={schemas}
        canonical={`https://foodflie.com/restaurant/${id}`}
        type="restaurant"
      />
      <main className="responsive-container py-6 md:py-8">
        {/* Header Block */}
        <section className="bg-brand-grey/40 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 relative overflow-hidden">
          <div className="relative z-10 flex-1">
            <h1 className="text-3xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4 uppercase italic font-poppins">
              {restaurantData.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-500 font-bold text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-brand text-white px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-brand/10">
                  <Star size={12} fill="currentColor" /> {restaurantData.rating}
                </div>
                <span className="hidden text-red-500  sm:inline">
                  Menu Price
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand" />
                <span>{restaurantData.time} Delivery</span>
              </div>
              <p className="text-brand hidden sm:block">
                {restaurantData.cuisines?.join
                  ? restaurantData.cuisines.join(" • ")
                  : typeof restaurantData.cuisines === "string"
                    ? restaurantData.cuisines
                    : "Restaurant"}
              </p>
            </div>
          </div>

          <div className="relative z-10 bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-50 shadow-lg max-w-full md:max-w-xs w-full">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <Zap
                size={20}
                md:size={24}
                className="text-brand animate-pulse"
                fill="currentColor"
              />
              <h3 className="font-black text-slate-800 uppercase tracking-tighter italic text-sm md:text-base">
                Active Offer
              </h3>
            </div>
            <p className="text-brand font-black text-lg md:text-xl mb-1">
              {restaurantData.offer}
            </p>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Valid on all items above ₹199
            </p>
          </div>
        </section>

        {/* Categories Horizontal Scroll (Mobile/Tablet Only) */}
        <div className="lg:hidden flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 border-b border-slate-50">
          {["Signature Dishes", "Artisanal Sides", "Beverages", "Desserts"].map(
            (cat, i) => (
              <button
                key={cat}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all shadow-sm ${i === 0 ? "bg-brand text-white" : "bg-brand-grey/50 text-slate-500"}`}
              >
                {cat}
              </button>
            ),
          )}
        </div>

        {/* Menu Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Categories Sidebar (Desktop only) */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-28 h-fit">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6 pl-2 border-l-4 border-brand">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "10-mins delivery",
                "Artisanal Sides",
                "Beverages",
                "Desserts",
              ].map((cat, i) => (
                <li
                  key={cat}
                  className={`p-4 rounded-2xl font-bold text-sm cursor-pointer transition-all ${i === 0 ? "bg-brand-muted text-brand shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </aside>

          {/* Items List */}
          <div className="lg:col-span-9 space-y-8 md:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                Menu Items
              </h2>
              <div className="relative w-full sm:w-auto">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="text"
                  placeholder="Search dish..."
                  className="bg-slate-50 px-10 py-2.5 rounded-xl text-xs font-bold outline-none focus:bg-white border border-transparent focus:border-slate-100 transition-all w-full sm:w-64"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-brand animate-spin" />
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                  Fetching menu...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 font-bold mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-brand text-white rounded-xl font-bold text-sm"
                >
                  Retry
                </button>
              </div>
            ) : menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.id || item.sku}
                    name={item.name}
                    description={
                      item.description ||
                      "Premium selection with handpicked ingredients and artisanal seasoning."
                    }
                    price={item.price}
                    image={
                      item.image ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                    }
                    onAdd={() => handleAddToCart(item)}
                    isAdding={addingToCart[item.sku]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 font-bold">
                No items found for this restaurant.
              </div>
            )}
          </div>
        </div>
      </main>

      <CartFooter count={cartCount} />
    </div>
  );
};

export default RestaurantDetail;
