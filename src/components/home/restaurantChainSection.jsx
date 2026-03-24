import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantChainCard from "../cards/restaurantChainCard";
import { getAllStores } from "../../services/productService";
import { useUserLocation } from "../../context/locationContext";
import NoStoresFound from "../common/NoStoresFound";

const RestaurantChainSection = ({ title }) => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const scrollRef = React.useRef(null);
  const { coords } = useUserLocation();

  React.useEffect(() => {
    const fetchStores = async () => {
      if (!coords?.latitude || !coords?.longitude) return;

      try {
        setLoading(true);

        const data = await getAllStores(
          coords.latitude,
          coords.longitude
        );
        console.log("data", data);

        const storesList = Array.isArray(data) ? data : data?.data || [];

        const mappedStores = storesList
          .map((item) => ({
            ...item,
            name: item.store_name || item.name,
            location: item.area || item.address || "Local",
            rating: item.rating || 4.2,
            time: item.time || "13 mins",
            cuisine: item.cuisine || "Indian, Fast Food",
            image:
              item.image ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
          }))
          .slice(0, 10);

        setRestaurants(mappedStores);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [coords?.latitude, coords?.longitude]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return null;

  if (restaurants.length === 0) {
    return <NoStoresFound compact title="No Restaurants Nearby" description="We couldn't find any restaurants serving your area. Try changing your location." />;
  }

  return (
    <div className="py-2 border-b border-slate-100">
      <div className="flex justify-between mb-2 px-4 sm:px-0">
        <h2 className="text-xl font-black">{title}</h2>

        <div className="flex gap-2">
          <button onClick={() => scroll("left")}>
            <ChevronLeft />
          </button>
          <button onClick={() => scroll("right")}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto gap-4 px-4">
        {restaurants.map((restaurant, index) => (
          <RestaurantChainCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantChainSection;