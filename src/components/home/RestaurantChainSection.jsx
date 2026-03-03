import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantChainCard from "../cards/restaurantChainCard";
import { getAllStores } from "../../services/productService";

const RestaurantChainSection = ({ title }) => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const data = await getAllStores();

        // Handle various response structures
        const storesList = Array.isArray(data) ? data : data?.data || [];

        // Map API data to component structure
        const mappedStores = storesList
          .map((item) => ({
            ...item,
            name: item.store_name || item.name,
            location: item.area || item.address || "Local",
            rating: item.rating || 4.2 + Math.random() * 0.5, // Fallback rating for display
            time: item.time || "25-30 mins",
            cuisine: item.cuisine || "Indian, Fast Food",
            image:
              item.image ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
          }))
          .slice(0, 10); // Limit to top 10 for "chain" view

        setRestaurants(mappedStores);
      } catch (error) {
        console.error("Failed to fetch stores for chain section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return null; // Or a subtle skeleton
  if (restaurants.length === 0) return null;

  return (
    <div className="py-8 border-b border-slate-100">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ChevronRight size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-4 sm:px-0 scrollbar-hide snap-x"
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantChainCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantChainSection;
