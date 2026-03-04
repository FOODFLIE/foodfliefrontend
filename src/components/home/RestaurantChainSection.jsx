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
  console.log("User coordinates in RestaurantChainSection:", coords);
  console.log("lat", coords.latitude, "lng", coords.longitude);

  React.useEffect(() => {
    console.log("useEffect triggered with coords:", coords);
    
    const fetchStores = async () => {
      console.log("fetchStores called");
      console.log("Checking coords - lat:", coords.latitude, "lng:", coords.longitude);
      
      if (!coords.latitude || !coords.longitude) {
        console.log("Coords not available, returning early");
        return;
      }
      
      try {
        console.log("Starting API call with:", coords.latitude, coords.longitude);
        setLoading(true);
        const data = await getAllStores(coords.latitude, coords.longitude);
        console.log("Fetched stores data:", data);
        console.log("Data type:", typeof data, "Is array:", Array.isArray(data));

        // Handle various response structures
        const storesList = Array.isArray(data) ? data : data?.data || [];

        // Map API data to component structure
        const mappedStores = storesList
          .map((item) => ({
            ...item,
            name: item.store_name || item.name,
            location: item.area || item.address || "Local",
            rating: item.rating || 4.2 + Math.random() * 0.5,
            time: item.time || "25-30 mins",
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
        console.log("Setting loading to false");
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
