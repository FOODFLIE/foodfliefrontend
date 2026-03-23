import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantChainCard from "../cards/restaurantChainCard";
import { getAllStores } from "../../services/productService";
import { useUserLocation } from "../../context/locationContext";

const RestaurantChainSection = ({ title }) => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const scrollRef = React.useRef(null);
  const { coords } = useUserLocation();
 

  React.useEffect(() => {

    
    const fetchStores = async () => {
   
      if (!coords.latitude || !coords.longitude) {
      
        return;
      }
      
      try {
   
        setLoading(true);
        const data = await getAllStores(coords.latitude, coords.longitude);
  

        // Handle various response structures
        const storesList = Array.isArray(data) ? data : data?.data || [];
    

        // Map API data to component structure
        const mappedStores = storesList
          .map((item) => ({
            ...item,
            name: item.store_name || item.name,
            location: item.area || item.address || "Local",
            rating: item.rating || 4.2 ,
            time: item.time || "13 mins",
            cuisine: item.cuisine || "Indian, Fast Food",
            image:
              item.image ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
          }))
          .slice(0, 10);

        setRestaurants(mappedStores);
      } catch (error) {
        console.error("Failed to fetch stores for chain section:", error);
      } finally {
      
        setLoading(false);
      }
    };

    fetchStores();
  }, [coords.latitude, coords.longitude]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return null;
  
  if (restaurants.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📍</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">
            No restaurants nearby
          </h3>
          <p className="text-slate-500 text-sm">
            We don't deliver to your area yet. We're expanding soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 border-b border-slate-100">
      <div className="flex items-center justify-between mb-2 px-4 sm:px-0">
        <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
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
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-3 px-4 sm:px-0 scrollbar-hide snap-x"
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantChainCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantChainSection;
