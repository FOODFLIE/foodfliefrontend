import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantChainCard from "../cards/RestaurantChainCard";

const RestaurantChainSection = ({ title, restaurants }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-8">
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
